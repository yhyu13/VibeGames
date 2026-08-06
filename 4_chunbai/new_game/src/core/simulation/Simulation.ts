import {
  PlayerState, EnemyState, ProjectileState, EnemyType, AIState, ProjectileType,
  Vector3, InputState, FireMode,
} from '../types';
import { WEAPONS, getWeapon } from '../data/weapons';
import { getEnemyDef } from '../data/enemies';
import { getBoss } from '../data/bosses';
import {
  MAX_ENEMIES, MAX_PROJECTILES, INVULN_DURATION, BOOST_SPEED_MULT, BOOST_EN_DRAIN,
  COMBO_TIMEOUT, LOCK_RANGE, LOCK_DROP_RANGE, LOCK_AIM_STICK, CONTROL_K, BRAKE_K,
  FLEE_DURATION, DODGE_SPEED_MULT, DODGE_DURATION, DODGE_COOLDOWN, DODGE_INVULN,
  YAW_TURN_RATE, PITCH_TURN_RATE,
} from '../constants';
import { vec3Add, vec3Sub, vec3Scale, vec3Dist, vec3Normalize, clamp, randRange, randInt } from '../math';
import { SimEvent } from './events';
import { updateEnemyAI, EnemyAIContext } from './enemyAI';
import { runBossAttack, BossPatternState } from './bossAttacks';
import { hitRadiusFor, enemyTypesForWave, isBossWave } from '../world/world';

let nextId = 1;
function genId() { return nextId++; }

// 导弹制导：玩家导弹最大转向速率（rad/s），Boss 导弹低速率保持可躲闪
const MISSILE_TURN_RATE = 4;
const BOSS_MISSILE_TURN_RATE = 1.5;

// 浮游炮（Funnel）：环绕参数与突袭参数
const FUNNEL_COUNT = 3;
const FUNNEL_ORBIT_TIME = 0.6;
const FUNNEL_ORBIT_RADIUS = 2.5;
const FUNNEL_ORBIT_SPEED = 6;
const FUNNEL_DART_SPEED = 60;
const FUNNEL_LIFETIME = 4;

/** 每固定步进入仿真的输入帧 — 全部为纯数据，由适配层（引擎）组装。 */
export interface TickInput {
  input: InputState;
  /** 原始鼠标归一化坐标（0..1），锁定粘滞的基准 */
  rawAim: { x: number; y: number };
  /** 准星世界方向（适配层按相机矩阵计算，玩家高度水平投影） */
  crosshairDir: Vector3;
  /** 射线拾取原点（相机世界坐标） */
  aimOrigin: Vector3;
  /** 智能圈内最近敌兵 id（适配层按屏幕空间计算） */
  smartTargetId: number | null;
  /** 当前锁定目标的归一化屏幕坐标（适配层投影；未锁定为 null） */
  lockStickPoint: { x: number; y: number } | null;
}

/**
 * 平台无关的仿真核心（C.A.T「C」+「A」）：
 * 规则/状态/AI 全部在此，零 THREE/DOM/store 依赖；副作用通过事件流出。
 * 适配层每固定步调用 update()，读取实体状态渲染，消费返回的事件。
 */
export class Simulation {
  players: PlayerState[] = [];
  enemies: EnemyState[] = [];
  projectiles: ProjectileState[] = [];
  wave = 0;
  lockOn = false;
  lockTargetId: number | null = null;
  aimNormX = 0.5;
  aimNormY = 0.5;
  /** 速度估计表（智能提前量用）— 适配层读取做 HUD 落点 */
  enemyVels: Map<number, Vector3> = new Map();
  /** 当前速度（FOV 呼吸 / 适配层视觉用） */
  velocities: Vector3[] = [];
  currentBossIndex = -1;

  private fireTimers: number[] = [];
  private dodgeTimer = 0;
  private dodgeCooldown = 0;
  private enemySpawnTimer = 0;
  private waveTimer = 0;
  private levelSpawned = 0;
  private bossCount = 0;
  private bossPhase = 1;
  private bossAttackTimer = 0;
  private bossSweepAngle = 0;
  private bossNetAngle = 0;
  private comboTimeout: number[] = [0];
  private enemyLastPos: Map<number, Vector3> = new Map();
  private firstKillDone = false;
  private events: SimEvent[] = [];

  start(players: PlayerState[]) {
    this.players = players.map(p => ({ ...p }));
    this.velocities = this.players.map(() => ({ x: 0, y: 0, z: 0 }));
    this.fireTimers = this.players.map(() => 0);
    this.dodgeTimer = 0;
    this.dodgeCooldown = 0;
    this.enemies = [];
    this.projectiles = [];
    this.bossCount = 0;
    this.currentBossIndex = -1;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;
    this.bossSweepAngle = 0;
    this.bossNetAngle = 0;
    this.enemySpawnTimer = 0;
    this.waveTimer = 0;
    this.wave = 0;
    this.lockOn = false;
    this.lockTargetId = null;
    this.enemyLastPos.clear();
    this.enemyVels.clear();
    this.firstKillDone = false;
    this.aimNormX = 0.5;
    this.aimNormY = 0.5;
    nextId = 1;
  }

  /** 一个固定步（FIXED_TIMESTEP）。返回本步产生的仿真事件。 */
  update(dt: number, tick: TickInput): SimEvent[] {
    this.events = [];
    this.updatePlayers(dt, [tick.input], tick);
    this.updateEnemies(dt, tick);
    this.updateProjectiles(dt);
    this.checkCollisions();
    this.spawnEnemies(dt);
    this.updateBoss(dt);
    return this.events;
  }

  private emit(e: SimEvent) {
    this.events.push(e);
  }

  private explode(pos: Vector3, color: string, size: number) {
    this.emit({ type: 'explosion', pos: { ...pos }, color, size });
  }

  private updatePlayers(dt: number, inputs: InputState[], tick: TickInput) {
    this.players.forEach((p, i) => {
      if (!p.alive) return;
      const inp = inputs[i];

      // 武器解锁：wave（关卡号）达到解锁关后发放武器，幂等；当前武器无效时切回首发武器
      for (const w of WEAPONS) {
        if (this.wave >= w.unlockLevel && !p.weapons.includes(w.id)) {
          p.weapons.push(w.id);
        }
      }
      if (p.weapon === 0 || !p.weapons.includes(p.weapon)) {
        p.weapon = p.weapons[0];
      }

      const vel = this.velocities[i];
      const ax = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
      const ay = (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
      const az = (inp.forward ? 1 : 0) - (inp.backward ? 1 : 0);
      const inputLen = Math.sqrt(ax * ax + ay * ay + az * az);
      const canBoost = inp.boost && p.energy > 0;
      const boostMult = canBoost ? BOOST_SPEED_MULT : 1;
      const maxSpeed = p.speed * boostMult;
      const k = inp.brake ? BRAKE_K : CONTROL_K;
      if (canBoost) {
        p.energy = Math.max(0, p.energy - BOOST_EN_DRAIN * dt);
      } else {
        p.energy = Math.min(p.maxEnergy, p.energy + (p.maxEnergy * 0.25) * dt);
      }

      // 锁定子系统（Tab 切换 / 目标保持与自动切换 / 准星粘滞）
      this.updateLock(inp, p, tick);

      // 相机相对移动基向量：W 朝准星方向（屏幕内侧），A/D 侧移，Shift/Ctrl 垂直
      const aim = tick.crosshairDir;
      const right = { x: -aim.z, y: 0, z: aim.x };
      const moveWorld = (fx: number, fy: number, fz: number) => ({
        x: fz * aim.x + fx * right.x,
        y: fy,
        z: fz * aim.z + fx * right.z,
      });

      // Dodge — 双击空格闪避冲刺（含无敌帧）
      this.dodgeCooldown -= dt;
      if (inp.dodge && this.dodgeCooldown <= 0) {
        this.dodgeTimer = DODGE_DURATION;
        this.dodgeCooldown = DODGE_COOLDOWN;
        p.invulnTimer = Math.max(p.invulnTimer, DODGE_INVULN);
        this.emit({ type: 'sound', sound: 'dodge' });
      }

      // 闪避期间：沿 WASD 移动方向冲刺（无移动输入时沿准星方向）
      if (this.dodgeTimer > 0) {
        this.dodgeTimer -= dt;
        let dx = 0, dy = 0, dz = 0;
        if (inputLen > 0.001) {
          const inv = 1 / inputLen;
          const wd = moveWorld(ax, ay, az);
          dx = wd.x * inv; dy = wd.y * inv; dz = wd.z * inv;
        } else {
          const a = this.computeAimDir(p, tick);
          dx = a.x; dy = a.y; dz = a.z;
        }
        vel.x = dx * p.speed * DODGE_SPEED_MULT;
        vel.y = dy * p.speed * DODGE_SPEED_MULT;
        vel.z = dz * p.speed * DODGE_SPEED_MULT;
        p.pos.x += vel.x * dt;
        p.pos.y += vel.y * dt;
        p.pos.z += vel.z * dt;
      } else {
        // 3D 飞行：目标速度趋近（lerp），方向为相机相对（朝准星飞）
        let desiredX = 0, desiredY = 0, desiredZ = 0;
        if (inputLen > 0.001) {
          const inv = 1 / inputLen;
          const wd = moveWorld(ax, ay, az);
          desiredX = wd.x * maxSpeed * inv;
          desiredY = wd.y * maxSpeed * inv;
          desiredZ = wd.z * maxSpeed * inv;
        }
        const f = 1 - Math.exp(-k * dt);
        vel.x += (desiredX - vel.x) * f;
        vel.y += (desiredY - vel.y) * f;
        vel.z += (desiredZ - vel.z) * f;

        // 气动阻力：松开输入后机体自然减速沉降
        const drag = Math.exp(-1.2 * dt);
        vel.x *= drag;
        vel.y *= drag;
        vel.z *= drag;

        p.pos.x += vel.x * dt;
        p.pos.y += vel.y * dt;
        p.pos.z += vel.z * dt;
      }

      // Clamp to world
      p.pos.x = clamp(p.pos.x, -200, 200);
      p.pos.y = clamp(p.pos.y, -60, 60);
      p.pos.z = clamp(p.pos.z, -200, 200);

      // 朝向：以最大转体速度转向准星方向（不强制锁定目标），侧移横滚
      const targetYaw = Math.atan2(aim.x, aim.z);
      let dy = targetYaw - p.rot.y;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      p.rot.y += clamp(dy, -YAW_TURN_RATE * dt, YAW_TURN_RATE * dt);
      const pitchTarget = -Math.asin(clamp(aim.y, -1, 1));
      const dp = pitchTarget - p.rot.x;
      p.rot.x += clamp(dp, -PITCH_TURN_RATE * dt, PITCH_TURN_RATE * dt);
      const bank = clamp(vel.x / maxSpeed, -1, 1) * 0.35;
      p.rot.z = (p.rot.z + (bank - p.rot.z) * 0.15);

      // Shooting — fireRate 生效，助推（空格）与射击可同时进行
      this.fireTimers[i] -= dt;
      if (inp.shoot && this.fireTimers[i] <= 0) {
        this.playerShoot(p, i, tick);
        this.fireTimers[i] = getWeapon(p.weapon).fireRate;
      }

      // Weapon switching
      if (inp.weaponSwitch > 0 && p.weapons.includes(inp.weaponSwitch)) {
        p.weapon = inp.weaponSwitch;
      }

      // Timers
      if (p.invulnTimer > 0) p.invulnTimer -= dt;

      // Special gauge
      p.specialGauge = Math.min(p.specialGauge + dt * 2, p.maxSpecialGauge);

      // Special attack
      if (inp.special && p.specialGauge >= 100) {
        this.useSpecial(p, i);
        p.specialGauge = 0;
      }

      // Combo timeout
      if (p.combo > 0) {
        this.comboTimeout[i] -= dt;
        if (this.comboTimeout[i] <= 0) p.combo = 0;
      }
    });
  }

  // === 锁定子系统（切换 / 目标保持与自动切换 / 准星粘滞）===
  private updateLock(inp: InputState, p: PlayerState, tick: TickInput) {
    if (inp.lockToggle) {
      this.lockOn = !this.lockOn;
      if (!this.lockOn) this.lockTargetId = null;
    }
    if (!this.lockOn) {
      this.lockTargetId = null;
      this.aimNormX = tick.rawAim.x;
      this.aimNormY = tick.rawAim.y;
      return;
    }
    const current = this.lockTargetId !== null
      ? this.enemies.find(e => e.id === this.lockTargetId && e.hp > 0)
      : null;
    if (!current || vec3Dist(current.pos, p.pos) > LOCK_DROP_RANGE) {
      let nearest: EnemyState | null = null;
      let nearestDist = LOCK_DROP_RANGE;
      for (const e of this.enemies) {
        if (e.hp <= 0) continue;
        const d = vec3Dist(p.pos, e.pos);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = e;
        }
      }
      this.lockTargetId = nearest ? nearest.id : null;
    }
    // 准星粘滞：以原始鼠标为基准拉向目标屏幕位置（保留 ~10-20% 自由度，不随时间收敛）
    let aimX = tick.rawAim.x;
    let aimY = tick.rawAim.y;
    const lk = this.lockTargetId !== null
      ? this.enemies.find(e => e.id === this.lockTargetId && e.hp > 0)
      : null;
    if (lk && tick.lockStickPoint) {
      const dist = vec3Dist(p.pos, lk.pos);
      const pull = LOCK_AIM_STICK * Math.max(0, 1 - dist / LOCK_DROP_RANGE);
      aimX = aimX + (tick.lockStickPoint.x - aimX) * pull;
      aimY = aimY + (tick.lockStickPoint.y - aimY) * pull;
    }
    this.aimNormX = clamp(aimX, 0, 1);
    this.aimNormY = clamp(aimY, 0, 1);
  }

  getLockEnemy(): EnemyState | null {
    if (!this.lockOn || this.lockTargetId === null) return null;
    return this.enemies.find(e => e.id === this.lockTargetId && e.hp > 0) || null;
  }

  // 射线拾取：准星射线对敌兵球体求交（命中即精确瞄准，含垂直分量）；无目标按准星方向
  private computeAimDir(player: PlayerState, tick: TickInput): Vector3 {
    const dir = tick.crosshairDir;
    const origin = tick.aimOrigin;
    let bestT = Infinity;
    let best: EnemyState | null = null;
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      const radius = hitRadiusFor(e.type);
      const ox = origin.x - e.pos.x;
      const oy = origin.y - e.pos.y;
      const oz = origin.z - e.pos.z;
      const b = ox * dir.x + oy * dir.y + oz * dir.z;
      const c = ox * ox + oy * oy + oz * oz - radius * radius;
      const disc = b * b - c;
      if (disc < 0) continue;
      const t = -b - Math.sqrt(disc);
      if (t >= 0 && t < bestT) {
        bestT = t;
        best = e;
      }
    }
    if (best) {
      return vec3Normalize(vec3Sub(best.pos, player.pos));
    }
    return tick.crosshairDir;
  }

  // 提前量：目标位置 + 速度 × 弹道飞行时间（迭代一次收敛），保证命中直线运动目标
  private computeLeadDir(player: PlayerState, enemy: EnemyState, speed: number): Vector3 {
    const vel = this.enemyVels.get(enemy.id) || { x: 0, y: 0, z: 0 };
    const t0 = speed > 0.001 ? vec3Dist(player.pos, enemy.pos) / speed : 0;
    let lead = vec3Add(enemy.pos, vec3Scale(vel, t0));
    const d1 = vec3Dist(player.pos, lead);
    if (speed > 0.001 && d1 > 0.001) {
      lead = vec3Add(enemy.pos, vec3Scale(vel, d1 / speed));
    }
    return vec3Normalize(vec3Sub(lead, player.pos));
  }

  private playerShoot(player: PlayerState, playerIndex: number, tick: TickInput) {
    const weapon = getWeapon(player.weapon);

    const lockTargetId = this.lockOn ? this.lockTargetId : null;
    const lockEnemy = lockTargetId !== null
      ? this.enemies.find(e => e.id === lockTargetId && e.hp > 0)
      : null;
    const lockDist = lockEnemy ? vec3Dist(lockEnemy.pos, player.pos) : Infinity;
    const effectiveRange = Math.max(weapon.lockRange, LOCK_RANGE);
    const lockInRange = lockEnemy !== null && lockDist <= effectiveRange;

    if (weapon.fireMode === FireMode.LockRequired && !lockInRange) {
      return;
    }

    // 智能瞄准：锁定目标（射程内）优先，否则取智能圈内最近目标；均算提前量保证命中；
    // 无目标时按准星方向射击
    let fireDir: Vector3;
    const smart = tick.smartTargetId !== null
      ? this.enemies.find(e => e.id === tick.smartTargetId && e.hp > 0) || null
      : null;
    const leadTarget = lockEnemy && lockInRange ? lockEnemy : smart;
    if (leadTarget) {
      fireDir = this.computeLeadDir(player, leadTarget, weapon.speed);
    } else {
      fireDir = this.computeAimDir(player, tick);
    }

    const isLockShortRange = weapon.fireMode === FireMode.LockShortRange && lockInRange;

    if (weapon.type === ProjectileType.Funnel) {
      // 浮游炮：生成 3 个环绕单位，先绕玩家飞行，再扑向最近敌人
      for (let i = 0; i < FUNNEL_COUNT; i++) {
        const proj: ProjectileState = {
          id: genId(),
          pos: { ...player.pos },
          vel: { x: 0, y: 0, z: 0 },
          damage: weapon.damage,
          owner: player.id,
          type: ProjectileType.Funnel,
          lifetime: FUNNEL_LIFETIME,
          radius: 0.3,
          color: weapon.color,
          phase: 'orbit',
          phaseTimer: FUNNEL_ORBIT_TIME,
          orbitAngle: (i / FUNNEL_COUNT) * Math.PI * 2,
        };
        if (this.projectiles.length < MAX_PROJECTILES) {
          this.projectiles.push(proj);
        }
      }
    } else {
      for (let i = 0; i < (weapon.type === ProjectileType.Spread ? 5 : 1); i++) {
        const spread = weapon.spread * (Math.random() - 0.5) * 2;
        const pdir = vec3Normalize(vec3Add(
          fireDir,
          { x: spread, y: spread * 0.5, z: 0 }
        ));

        const proj: ProjectileState = {
          id: genId(),
          pos: { ...player.pos },
          vel: vec3Scale(pdir, weapon.speed),
          damage: weapon.damage,
          owner: player.id,
          type: weapon.type,
          lifetime: 3,
          radius: 0.3,
          color: weapon.color,
        };

        // LockShortRange bonus: projectiles home toward locked target
        if (isLockShortRange && lockEnemy) {
          proj.vel = vec3Scale(vec3Normalize(vec3Sub(lockEnemy.pos, player.pos)), weapon.speed);
        }

        if (this.projectiles.length < MAX_PROJECTILES) {
          this.projectiles.push(proj);
        }
      }
    }

    this.emit({ type: 'sound', sound: 'shoot', freq: 600 + Math.random() * 400 });
  }

  private useSpecial(player: PlayerState, playerIndex: number) {
    this.emit({ type: 'sound', sound: 'special' });
    this.emit({ type: 'sound', sound: 'specialAnnounce' });

    // Full screen beam attack
    this.enemies.forEach(e => {
      if (vec3Dist(e.pos, player.pos) < 50) {
        e.hp -= 150;
        this.explode(e.pos, '#00ffff', 2);
      }
    });
  }

  private updateEnemies(dt: number, tick: TickInput) {
    this.enemies.forEach(e => {
      if (e.hp <= 0) {
        this.explode(e.pos, e.type === EnemyType.Boss ? '#ff4400' : '#ff6644', e.type === EnemyType.Boss ? 3 : 1);
        this.emit({ type: 'sound', sound: 'explosion' });
        this.enemyLastPos.delete(e.id);
        this.enemyVels.delete(e.id);

        // C4: 第一次击杀 — 屏幕边缘黄色脉冲 + 0.2s 子弹时间 + 故障音效
        if (!this.firstKillDone) {
          this.firstKillDone = true;
          this.emit({ type: 'fx', fx: 'edgePulse' });
          this.emit({ type: 'fx', fx: 'timeDilation', value: 0.2 });
          this.emit({ type: 'sound', sound: 'glitch' });
          this.emit({ type: 'fx', fx: 'shake', value: 0.25 });
        }

        // Score
        this.players.forEach((p, pi) => {
          const score = e.type === EnemyType.Boss
            ? getBoss(this.currentBossIndex + 1).score
            : getEnemyDef(e.type).score;
          p.score += score;
          p.kills++;
          p.combo++;
          this.comboTimeout[pi] = COMBO_TIMEOUT;
        });
        return;
      }

      const target = this.players.find(p => p.alive);
      if (!target) return;
      const dist = vec3Dist(e.pos, target.pos);
      const def = getEnemyDef(e.type);

      const aiCtx: EnemyAIContext = {
        enemies: this.enemies,
        invulnDuration: INVULN_DURATION,
        fire: (enemy, tgt) => this.enemyShoot(enemy, tgt),
        onBomberContact: (enemy, tgt, damage) => {
          this.explode(enemy.pos, '#ff4400', 2);
          this.emit({ type: 'sound', sound: 'explosion' });
          tgt.hp -= damage;
          tgt.invulnTimer = INVULN_DURATION;
          enemy.hp = 0;
        },
      };
      updateEnemyAI(e, target, dist, def, dt, aiCtx);

      // Patrol drift — enemies slowly close in so far spawns still engage
      if (e.state === AIState.Patrol && e.type !== EnemyType.Boss) {
        const drift = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(drift, e.speed * 0.4 * dt));
      }

      // Flee is time-limited and happens once per enemy, so low-HP enemies
      // re-engage instead of drifting away forever (level-clear requires kills)
      if (e.state === AIState.Flee && e.fleeTimer !== undefined) {
        e.fleeTimer -= dt;
        if (e.fleeTimer <= 0) e.state = AIState.Chase;
      }

      // Health check - flee at low HP (except bosses and bombers)
      if (e.hp < def.hp * 0.3 && e.type !== EnemyType.Boss && e.type !== EnemyType.Bomber) {
        if (e.state !== AIState.Flee && e.fleeTimer === undefined) {
          e.state = AIState.Flee;
          e.fleeTimer = FLEE_DURATION;
        }
      }

      // Clamp to world bounds so enemies can never escape the arena
      e.pos.x = clamp(e.pos.x, -200, 200);
      e.pos.y = clamp(e.pos.y, -60, 60);
      e.pos.z = clamp(e.pos.z, -200, 200);

      // 速度估计（用于智能提前量）
      const lastPos = this.enemyLastPos.get(e.id);
      if (lastPos) {
        this.enemyVels.set(e.id, vec3Scale(vec3Sub(e.pos, lastPos), 1 / Math.max(dt, 1e-4)));
      } else {
        this.enemyVels.set(e.id, { x: 0, y: 0, z: 0 });
      }
      this.enemyLastPos.set(e.id, { x: e.pos.x, y: e.pos.y, z: e.pos.z });
    });

    // Remove dead enemies
    this.enemies = this.enemies.filter(e => e.hp > 0);
  }

  private enemyShoot(enemy: EnemyState, target: PlayerState) {
    const dir = vec3Normalize(vec3Sub(target.pos, enemy.pos));
    const def = getEnemyDef(enemy.type);
    const proj: ProjectileState = {
      id: genId(),
      pos: { ...enemy.pos },
      vel: vec3Scale(dir, 25),
      damage: def.damage,
      owner: enemy.id + 10000,
      type: ProjectileType.BossBullet,
      lifetime: 4,
      radius: 0.3,
      color: def.color,
    };
    if (this.projectiles.length < MAX_PROJECTILES) {
      this.projectiles.push(proj);
    }
  }

  private updateProjectiles(dt: number) {
    this.projectiles.forEach(p => {
      if (p.type === ProjectileType.Missile) {
        this.steerMissile(p, dt);
      } else if (p.type === ProjectileType.Funnel) {
        this.updateFunnel(p, dt);
      }

      p.pos = vec3Add(p.pos, vec3Scale(p.vel, dt));
      p.lifetime -= dt;
    });

    // Remove expired projectiles
    this.projectiles = this.projectiles.filter(p => p.lifetime > 0);
  }

  // 导弹制导：锁定目标优先，其次最近目标；速度方向按最大转向速率旋转，速率保持不变
  private steerMissile(p: ProjectileState, dt: number) {
    const isBoss = p.owner >= 10000;
    const maxTurn = (isBoss ? BOSS_MISSILE_TURN_RATE : MISSILE_TURN_RATE) * dt;

    let wantedDir: Vector3 | null = null;
    if (isBoss) {
      let nearest: PlayerState | null = null;
      let nd = Infinity;
      for (const pl of this.players) {
        if (!pl.alive) continue;
        const d = vec3Dist(p.pos, pl.pos);
        if (d < nd) { nd = d; nearest = pl; }
      }
      if (nearest) wantedDir = vec3Normalize(vec3Sub(nearest.pos, p.pos));
    } else {
      let target: EnemyState | null = null;
      const lockId = this.lockOn ? this.lockTargetId : null;
      if (lockId !== null && lockId !== undefined) {
        const locked = this.enemies.find(e => e.id === lockId && e.hp > 0);
        if (locked) target = locked;
      }
      if (!target) {
        let nd = Infinity;
        for (const e of this.enemies) {
          if (e.hp <= 0) continue;
          const d = vec3Dist(p.pos, e.pos);
          if (d < nd) { nd = d; target = e; }
        }
      }
      if (target) wantedDir = vec3Normalize(vec3Sub(target.pos, p.pos));
    }

    if (!wantedDir) return;

    const speed = Math.sqrt(p.vel.x * p.vel.x + p.vel.y * p.vel.y + p.vel.z * p.vel.z);
    if (speed < 0.0001) return;
    const curDir = vec3Normalize(p.vel);
    const dot = clamp(curDir.x * wantedDir.x + curDir.y * wantedDir.y + curDir.z * wantedDir.z, -1, 1);
    const angle = Math.acos(dot);
    if (angle <= maxTurn || angle < 1e-6) {
      p.vel = vec3Scale(wantedDir, speed);
      return;
    }

    // 绕 curDir × wantedDir 轴旋转 maxTurn 弧度（Rodrigues）
    let ax = curDir.y * wantedDir.z - curDir.z * wantedDir.y;
    let ay = curDir.z * wantedDir.x - curDir.x * wantedDir.z;
    let az = curDir.x * wantedDir.y - curDir.y * wantedDir.x;
    const alen = Math.sqrt(ax * ax + ay * ay + az * az);
    if (alen < 1e-6) {
      const ref = Math.abs(curDir.y) < 0.9 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 };
      ax = curDir.y * ref.z - curDir.z * ref.y;
      ay = curDir.z * ref.x - curDir.x * ref.z;
      az = curDir.x * ref.y - curDir.y * ref.x;
    } else {
      ax /= alen; ay /= alen; az /= alen;
    }
    const c = Math.cos(maxTurn);
    const s = Math.sin(maxTurn);
    p.vel = {
      x: (curDir.x * c + (ay * curDir.z - az * curDir.y) * s) * speed,
      y: (curDir.y * c + (az * curDir.x - ax * curDir.z) * s) * speed,
      z: (curDir.z * c + (ax * curDir.y - ay * curDir.x) * s) * speed,
    };
  }

  // 浮游炮：环绕玩家 ~0.6s 后高速扑向最近存活敌人，命中或 4s 后过期
  private updateFunnel(p: ProjectileState, dt: number) {
    const player = this.players.find(pl => pl.id === p.owner);
    if (!player || !player.alive) return;

    if (p.phase !== 'strike') {
      p.phaseTimer = (p.phaseTimer ?? FUNNEL_ORBIT_TIME) - dt;
      const angle = (p.orbitAngle ?? 0) + FUNNEL_ORBIT_SPEED * dt;
      p.orbitAngle = angle;
      p.pos = {
        x: player.pos.x + Math.cos(angle) * FUNNEL_ORBIT_RADIUS,
        y: player.pos.y + Math.sin(angle * 3) * 0.6,
        z: player.pos.z + Math.sin(angle) * FUNNEL_ORBIT_RADIUS,
      };
      p.vel = { x: 0, y: 0, z: 0 };

      if (p.phaseTimer <= 0) {
        let target: EnemyState | null = null;
        let nd = Infinity;
        for (const e of this.enemies) {
          if (e.hp <= 0) continue;
          const d = vec3Dist(p.pos, e.pos);
          if (d < nd) { nd = d; target = e; }
        }
        if (target) {
          p.phase = 'strike';
          p.vel = vec3Scale(vec3Normalize(vec3Sub(target.pos, p.pos)), FUNNEL_DART_SPEED);
        } else {
          p.phase = 'orbit';
          p.phaseTimer = FUNNEL_ORBIT_TIME;
        }
      }
    }
  }

  private checkCollisions() {
    // Player projectiles hit enemies
    this.projectiles.forEach(p => {
      if (p.owner >= 10000) return;

      this.enemies.forEach(e => {
        const hitRadius = hitRadiusFor(e.type);
        if (vec3Dist(p.pos, e.pos) < hitRadius) {
          e.hp -= (e.shieldTimer || 0) > 0 ? p.damage * 0.5 : p.damage;
          p.lifetime = 0;
          this.explode(p.pos, '#ffaa00', 0.5);
          this.emit({ type: 'sound', sound: 'hit' });
        }
      });
    });

    // Enemy projectiles hit players
    this.projectiles.forEach(p => {
      if (p.owner < 10000) return;

      this.players.forEach(player => {
        if (!player.alive || player.invulnTimer > 0) return;
        if (vec3Dist(p.pos, player.pos) < 1.5) {
          player.hp -= p.damage;
          p.lifetime = 0;
          player.invulnTimer = INVULN_DURATION;
          this.emit({ type: 'fx', fx: 'shake', value: 0.15 });
          this.explode(p.pos, '#ff4444', 0.5);
          this.emit({ type: 'sound', sound: 'hit' });

          if (player.hp <= 0) {
            player.alive = false;
            this.explode(player.pos, '#4488ff', 3);
          }
        }
      });
    });
  }

  private spawnEnemies(dt: number) {
    // Fresh game: the run starts at level 1
    if (this.wave < 1) {
      this.levelSpawned = 0;
      this.enemySpawnTimer = 0;
      this.waveTimer = 0;
      this.wave = 1;
      return;
    }

    // Intermission between levels: count down, no new spawns
    if (this.waveTimer > 0) {
      this.waveTimer -= dt;
      return;
    }

    const isBossLevel = isBossWave(this.wave);

    // Boss level: spawn the boss once; when it dies the level clears below
    if (isBossLevel && !this.enemies.some(e => e.type === EnemyType.Boss)) {
      if (this.currentBossIndex < 0) {
        this.spawnBoss();
        return;
      }
    }

    // Regular level: burst-spawn the fixed enemy set
    const setSize = isBossLevel ? 0 : Math.min(6 + this.wave, MAX_ENEMIES);
    this.enemySpawnTimer += dt;
    if (this.levelSpawned < setSize && this.enemies.length < MAX_ENEMIES && this.enemySpawnTimer >= 0.15) {
      this.enemySpawnTimer = 0;

      const types = enemyTypesForWave(this.wave);
      const type = types[randInt(0, types.length - 1)];
      const def = getEnemyDef(type);

      // Spawn at a distance that gives the player reaction time while staying near aggro range
      let pos: Vector3;
      do {
        const dist = randRange(30, Math.min(def.alertRange + 25, 80));
        const angle = Math.random() * Math.PI * 2;
        const pitch = randRange(-0.5, 0.5);
        pos = {
          x: this.players[0].pos.x + Math.sin(angle) * dist,
          y: clamp(this.players[0].pos.y + Math.sin(pitch) * dist, -30, 30),
          z: this.players[0].pos.z + Math.cos(angle) * dist,
        };
      } while (this.players.some(p => vec3Dist(pos, p.pos) < 20));

      const enemy: EnemyState = {
        id: genId(),
        type,
        pos,
        rot: { x: 0, y: 0, z: 0 },
        hp: def.hp * (1 + this.wave * 0.1),
        maxHp: def.hp,
        speed: def.speed * (1 + this.wave * 0.05),
        state: AIState.Patrol,
        targetId: 0,
        attackTimer: 1 + Math.random(),
      };

      this.enemies.push(enemy);
      this.levelSpawned++;
    }

    // Level clear: set exhausted (or boss dead) and nothing left alive
    const bossAlive = this.enemies.some(e => e.type === EnemyType.Boss);
    const enemiesAlive = this.enemies.some(e => e.hp > 0);
    const cleared = isBossLevel
      ? this.currentBossIndex >= 0 && !bossAlive
      : this.levelSpawned >= setSize && !enemiesAlive;
    if (cleared) {
      this.enemies = [];
      this.levelSpawned = 0;
      this.enemySpawnTimer = 0;
      this.currentBossIndex = -1;
      this.waveTimer = 2.5;
      this.wave += 1;
    }
  }

  private spawnBoss() {
    const bossIndex = this.bossCount % 3;
    this.currentBossIndex = bossIndex;
    this.bossCount++;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;
    this.bossSweepAngle = 0;
    this.bossNetAngle = 0;

    const bossDef = getBoss(bossIndex + 1);
    const pos = { x: randRange(-30, 30), y: 5, z: -50 };

    const enemy: EnemyState = {
      id: genId(),
      type: EnemyType.Boss,
      pos,
      rot: { x: 0, y: 0, z: 0 },
      hp: 200 * (1 + this.bossCount * 0.2),
      maxHp: 200,
      speed: 5,
      state: AIState.Phase1,
      targetId: 0,
      attackTimer: 2,
      phase: 1,
      shieldTimer: 0,
    };

    this.enemies.push(enemy);

    this.emit({ type: 'sound', sound: 'bossWarning' });
    this.emit({ type: 'sound', sound: 'bossAnnounce', param: bossDef.name });
  }

  private updateBoss(dt: number) {
    const boss = this.enemies.find(e => e.type === EnemyType.Boss);
    if (!boss) return;

    const bossDef = getBoss(this.currentBossIndex + 1);
    const hpPercent = boss.hp / boss.maxHp;

    // Phase transitions
    bossDef.phases.forEach((phase, i) => {
      if (hpPercent <= phase.hpPercent && (boss.phase || 1) <= i) {
        boss.phase = i + 1;
        boss.speed = phase.speed;
        boss.state = (['phase1', 'phase2', 'phase3', 'phase4'] as AIState[])[i];
      }
    });

    // Boss attacks
    this.bossAttackTimer += dt;
    if (this.bossAttackTimer > 2) {
      this.bossAttackTimer = 0;
      const target = this.players.find(p => p.alive);
      if (!target) return;

      const phase = bossDef.phases[(boss.phase || 1) - 1];
      const patternState: BossPatternState = { sweepAngle: this.bossSweepAngle, netAngle: this.bossNetAngle };
      runBossAttack(phase.attackPattern, boss, phase, dt, {
        genId,
        target,
        patternState,
        spawnProjectile: proj => {
          proj.owner = boss.id + 10000;
          this.projectiles.push(proj);
        },
        spawnMinion: enemy => {
          this.enemies.push(enemy);
        },
      });
      this.bossSweepAngle = patternState.sweepAngle;
      this.bossNetAngle = patternState.netAngle;
    }

    // Boss chases the player at phase speed in all phases
    const chaseTarget = this.players.find(p => p.alive);
    if (chaseTarget) {
      const phase = bossDef.phases[(boss.phase || 1) - 1];
      const dir = vec3Normalize(vec3Sub(chaseTarget.pos, boss.pos));
      boss.pos = vec3Add(boss.pos, vec3Scale(dir, (phase ? phase.speed : boss.speed) * dt));
    }

    // Shield timer decays
    if ((boss.shieldTimer || 0) > 0) {
      boss.shieldTimer = Math.max(0, (boss.shieldTimer || 0) - dt);
    }
  }
}
