import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';
import { AudioManager } from './AudioManager';
import { useGameStore } from '../store';
import {
  PlayerState, EnemyState, ProjectileState, Particle,
  EnemyType, AIState, ProjectileType, Vector3, InputState, FireMode
} from '../types';
import { getWeapon } from '../data/weapons';
import { getEnemyDef } from '../data/enemies';
import { getBoss } from '../data/bosses';
import {
  FIXED_TIMESTEP, PLAYER_SIZE,
  WORLD_SIZE, WORLD_SIZE_Y, BOSS_WAVE_INTERVAL, MAX_ENEMIES, MAX_PROJECTILES,
  INVULN_DURATION, BOOST_SPEED_MULT, COMBO_TIMEOUT,
  CONTROL_K, BRAKE_K, DODGE_SPEED_MULT, DODGE_DURATION, DODGE_COOLDOWN, DODGE_INVULN
} from '../utils/constants';
import { vec3Add, vec3Sub, vec3Scale, vec3Dist, vec3Normalize, lerp, clamp, randRange, randInt } from '../utils/math';
import { audioManager } from './AudioManager';

let nextId = 1;
function genId() { return nextId++; }

export class GameEngine {
  scene: SceneManager;
  input: InputManager;
  audio: AudioManager;
  canvas: HTMLCanvasElement;
  players: PlayerState[] = [];
  enemies: EnemyState[] = [];
  projectiles: ProjectileState[] = [];
  particles: Particle[] = [];
  active = false;
  private velocities: Vector3[] = [];
  private fireTimers: number[] = [];
  private dodgeTimer = 0;
  private dodgeCooldown = 0;
  private accumulator = 0;
  private lastTime = 0;
  private animFrameId = 0;
  private enemySpawnTimer = 0;
  private waveTimer = 0;
  private levelSpawned = 0;
  private bossCount = 0;
  private currentBossIndex = -1;
  private bossPhase = 1;
  private bossAttackTimer = 0;
  private comboTimeout: number[] = [0];
  private lockTargets: (number | null)[] = [null];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new SceneManager(canvas, canvas.width, canvas.height);
    this.input = new InputManager(0);
    this.input.setCanvasSize(canvas.width, canvas.height);
    this.audio = new AudioManager();
  }

  start() {
    const store = useGameStore.getState();
    this.players = store.players.map(p => ({ ...p }));
    this.velocities = this.players.map(() => ({ x: 0, y: 0, z: 0 }));
    this.fireTimers = this.players.map(() => 0);
    this.dodgeTimer = 0;
    this.dodgeCooldown = 0;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.bossCount = 0;
    this.currentBossIndex = -1;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;
    this.enemySpawnTimer = 0;
    this.waveTimer = 0;
    this.active = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    nextId = 1;

    // Create player meshes
    this.players.forEach((p, i) => {
      const color = i === 0 ? new THREE.Color(0x4488ff) : new THREE.Color(0xff6644);
      const mesh = this.scene.createPlayerMesh(color);
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      this.scene.playerMeshes.set(p.id, mesh);
      this.scene.scene.add(mesh);
    });

    audioManager.init();
    audioManager.startBGM();

    this.gameLoop(performance.now());
  }

  stop() {
    this.active = false;
    cancelAnimationFrame(this.animFrameId);
    audioManager.stopBGM();
    this.scene.playerMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.enemyMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.bossMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.projectileMeshes.forEach(m => this.scene.scene.remove(m));
    this.scene.playerMeshes.clear();
    this.scene.enemyMeshes.clear();
    this.scene.bossMeshes.clear();
    this.scene.projectileMeshes.clear();
  }

resize(width: number, height: number) {
    this.scene.resize(width, height);
    this.input.setCanvasSize(width, height);
  }

  private gameLoop = (time: number) => {
    if (!this.active) return;
    this.animFrameId = requestAnimationFrame(this.gameLoop);

    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.accumulator += dt;

    while (this.accumulator >= FIXED_TIMESTEP) {
      this.update(FIXED_TIMESTEP);
      this.accumulator -= FIXED_TIMESTEP;
    }

this.render(dt);
  };

  private update(dt: number) {
    const store = useGameStore.getState();
    const game = store.game;
    const inputs = [this.input.getState()];

    this.updatePlayers(dt, inputs);
    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updateParticles(dt);
    this.checkCollisions();
    this.spawnEnemies(dt);
    this.updateUI(dt);
    this.updateBoss(dt);
  }

private updatePlayers(dt: number, inputs: InputState[]) {
    this.players.forEach((p, i) => {
      if (!p.alive) return;
      const inp = inputs[i];
      const mesh = this.scene.playerMeshes.get(p.id);
      if (!mesh) return;

      const vel = this.velocities[i];
      const ax = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
      const ay = (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
      const az = (inp.forward ? 1 : 0) - (inp.backward ? 1 : 0);
      const inputLen = Math.sqrt(ax * ax + ay * ay + az * az);
      const boostMult = inp.boost ? BOOST_SPEED_MULT : 1;
      const maxSpeed = p.speed * boostMult;
      const k = inp.brake ? BRAKE_K : CONTROL_K;

      // Dodge — 双击空格闪避冲刺（含无敌帧）
      this.dodgeCooldown -= dt;
      if (inp.dodge && this.dodgeCooldown <= 0) {
        this.dodgeTimer = DODGE_DURATION;
        this.dodgeCooldown = DODGE_COOLDOWN;
        p.invulnTimer = Math.max(p.invulnTimer, DODGE_INVULN);
        audioManager.playDodge();
      }

      // 闪避期间：速度强行推向瞄准方向，忽略常规输入
      if (this.dodgeTimer > 0) {
        this.dodgeTimer -= dt;
        const aim = this.computeAimDir(p);
        vel.x = aim.x * p.speed * DODGE_SPEED_MULT;
        vel.y = aim.y * p.speed * DODGE_SPEED_MULT;
        vel.z = aim.z * p.speed * DODGE_SPEED_MULT;
        p.pos.x += vel.x * dt;
        p.pos.y += vel.y * dt;
        p.pos.z += vel.z * dt;
      } else {
        // 3D 飞行：目标速度趋近（lerp）
        let desiredX = 0, desiredY = 0, desiredZ = 0;
        if (inputLen > 0.001) {
          const inv = 1 / inputLen;
          desiredX = (ax * inv) * maxSpeed;
          desiredY = (ay * inv) * maxSpeed;
          desiredZ = (az * inv) * maxSpeed;
        }
        const f = 1 - Math.exp(-k * dt);
        vel.x += (desiredX - vel.x) * f;
        vel.y += (desiredY - vel.y) * f;
        vel.z += (desiredZ - vel.z) * f;

        p.pos.x += vel.x * dt;
        p.pos.y += vel.y * dt;
        p.pos.z += vel.z * dt;
      }

      // Clamp to world
      p.pos.x = clamp(p.pos.x, -WORLD_SIZE, WORLD_SIZE);
      p.pos.y = clamp(p.pos.y, -WORLD_SIZE_Y, WORLD_SIZE_Y);
      p.pos.z = clamp(p.pos.z, -WORLD_SIZE, WORLD_SIZE);

      // 朝向：偏航对准瞄准方向，俯仰跟随瞄准，侧移横滚
      const aim = this.computeAimDir(p);
      p.rot.y = Math.atan2(aim.x, aim.z);
      const pitchTarget = -Math.asin(clamp(aim.y, -1, 1));
      p.rot.x = lerp(p.rot.x, pitchTarget, 0.15);
      const bank = clamp(vel.x / maxSpeed, -1, 1) * 0.35;
      p.rot.z = lerp(p.rot.z, bank, 0.15);
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      mesh.rotation.set(p.rot.x, p.rot.y, p.rot.z);

      // Lock target
      const weapon = getWeapon(p.weapon);
      if (inp.lockTarget && weapon.lockRange > 0) {
        let nearest: EnemyState | null = null;
        let nearestDist = weapon.lockRange;
        for (const e of this.enemies) {
          if (e.hp <= 0) continue;
          const d = vec3Dist(p.pos, e.pos);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = e;
          }
        }
        this.lockTargets[i] = nearest ? nearest.id : null;
      } else {
        this.lockTargets[i] = null;
      }

      // Shooting — fireRate 生效，助推（空格）与射击可同时进行
      this.fireTimers[i] -= dt;
      if (inp.shoot && this.fireTimers[i] <= 0) {
        this.playerShoot(p, i);
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

  private computeAimDir(player: PlayerState): { x: number; y: number; z: number } {
    const cam = this.scene.camera;
    const ndcX = (this.input.getMouseNormX() - 0.5) * 2;
    const ndcY = (0.5 - this.input.getMouseNormY()) * 2;
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion);
    const tanFov = Math.tan((cam.fov * Math.PI) / 360);
    const dir = new THREE.Vector3()
      .addScaledVector(fwd, 1)
      .addScaledVector(right, ndcX * tanFov * cam.aspect)
      .addScaledVector(up, ndcY * tanFov)
      .normalize();

    // Enemy under the crosshair → aim exactly at it (vertical included)
    let bestT = Infinity;
    let best: EnemyState | null = null;
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      const radius = e.type === EnemyType.Boss ? 4 : 1.5;
      const ox = cam.position.x - e.pos.x;
      const oy = cam.position.y - e.pos.y;
      const oz = cam.position.z - e.pos.z;
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

    // Fallback: fire horizontally in the crosshair's direction at the player's height
    const depth = 120;
    const target = new THREE.Vector3(
      cam.position.x + dir.x * depth,
      player.pos.y,
      cam.position.z + dir.z * depth
    );
    return vec3Normalize({ x: target.x - player.pos.x, y: target.y - player.pos.y, z: target.z - player.pos.z });
  }

private playerShoot(player: PlayerState, playerIndex: number) {
    const weapon = getWeapon(player.weapon);
    const mesh = this.scene.playerMeshes.get(player.id);
    if (!mesh) return;

    // Lock check
    const lockTargetId = this.lockTargets[playerIndex];
    const lockEnemy = lockTargetId !== null
      ? this.enemies.find(e => e.id === lockTargetId && e.hp > 0)
      : null;

    if (weapon.fireMode === FireMode.LockRequired && !lockEnemy) {
      return;
    }

    // Determine fire direction: toward lock target if locked, else screen-space aim
    let fireDir: { x: number; y: number; z: number };
    if (lockEnemy) {
      fireDir = vec3Normalize(vec3Sub(lockEnemy.pos, player.pos));
    } else {
      fireDir = this.computeAimDir(player);
    }

    const isLockShortRange = weapon.fireMode === FireMode.LockShortRange && lockEnemy;

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
        const mesh3 = this.scene.createProjectileMesh(weapon.color, weapon.type);
        mesh3.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
        this.scene.projectileMeshes.set(proj.id, mesh3);
        this.scene.scene.add(mesh3);
      }
    }

    audioManager.playShoot(600 + Math.random() * 400);
  }

  private useSpecial(player: PlayerState, playerIndex: number) {
    audioManager.playSpecial();
    audioManager.playSpecialAnnounce();

    // Full screen beam attack
    this.enemies.forEach(e => {
      if (vec3Dist(e.pos, player.pos) < 50) {
        e.hp -= 150;
        this.scene.createExplosion(e.pos, '#00ffff', 2);
      }
    });
  }

  private updateEnemies(dt: number) {
    this.enemies.forEach(e => {
      if (e.hp <= 0) {
        this.scene.createExplosion(e.pos, e.type === EnemyType.Boss ? '#ff4400' : '#ff6644', e.type === EnemyType.Boss ? 3 : 1);
        audioManager.playExplosion();
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

      const mesh = e.type === EnemyType.Boss
        ? this.scene.bossMeshes.get(e.id)
        : this.scene.enemyMeshes.get(e.id);
      if (!mesh) return;

// AI
      const target = this.players.find(p => p.alive);
      if (!target) return;
      const dist = vec3Dist(e.pos, target.pos);
      const def = getEnemyDef(e.type);

      // Per-type AI behavior
      switch (e.type) {
        case EnemyType.Scout:
          this.updateAIScout(e, target, dist, def, dt);
          break;
        case EnemyType.Assault:
          this.updateAIAssault(e, target, dist, def, dt);
          break;
        case EnemyType.Sniper:
          this.updateAISniper(e, target, dist, def, dt);
          break;
        case EnemyType.Shield:
          this.updateAIShield(e, target, dist, def, dt);
          break;
        case EnemyType.Bomber:
          this.updateAIBomber(e, target, dist, def, dt);
          break;
        case EnemyType.Commander:
          this.updateAICommander(e, target, dist, def, dt);
          break;
        default:
          this.updateAIDefault(e, target, dist, def, dt);
      }

      // Patrol drift — enemies slowly close in so far spawns still engage
      if (e.state === AIState.Patrol && e.type !== EnemyType.Boss) {
        const drift = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(drift, e.speed * 0.4 * dt));
      }

      // Health check - flee at low HP (except bosses and bombers)
      if (e.hp < def.hp * 0.3 && e.type !== EnemyType.Boss && e.type !== EnemyType.Bomber) {
        if (e.state !== AIState.Flee) e.state = AIState.Flee;
      }

      // Update mesh
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.rotation.y += dt * 2;

      // Boss rotation
      if (e.type === EnemyType.Boss) {
        mesh.rotation.x += dt * 0.5;
      }
    });

    // Remove dead enemies
    this.enemies = this.enemies.filter(e => {
      if (e.hp <= 0) {
        const mesh = e.type === EnemyType.Boss
          ? this.scene.bossMeshes.get(e.id)
          : this.scene.enemyMeshes.get(e.id);
        if (mesh) {
          this.scene.scene.remove(mesh);
          this.scene.enemyMeshes.delete(e.id);
          this.scene.bossMeshes.delete(e.id);
        }
        return false;
      }
      return true;
    });
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
      const mesh = this.scene.createProjectileMesh(def.color, 'bullet');
      mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
      this.scene.projectileMeshes.set(proj.id, mesh);
      this.scene.scene.add(mesh);
    }
  }

  private updateAIDefault(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.8 + Math.random() * 0.6;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIScout(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.3) e.state = AIState.Chase;
        // Strafe around target
        const orbitDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        const strafe = { x: -orbitDir.z, y: 0, z: orbitDir.x };
        e.pos = vec3Add(e.pos, vec3Scale(strafe, e.speed * 0.8 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.5 + Math.random() * 0.5;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIAssault(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        // Rush aggressively toward target
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        if (dist < def.attackRange) e.state = AIState.Attack;
        break;
      case AIState.Attack:
        // Keep moving toward target while shooting
        const atkDir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(atkDir, e.speed * 0.5 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.3 + Math.random() * 0.3;
        }
        if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAISniper(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) {
          e.state = AIState.Attack;
        } else {
          // Move toward target but keep distance
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        // Maintain distance - back away if too close
        if (dist < def.attackRange * 0.5) {
          const backDir = vec3Normalize(vec3Sub(e.pos, target.pos));
          e.pos = vec3Add(e.pos, vec3Scale(backDir, e.speed * dt));
        } else if (dist > def.attackRange * 1.2) {
          e.state = AIState.Chase;
        }
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 1.0 + Math.random() * 0.5;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIShield(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        // Move toward target slowly, body-blocking
        const approach = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(approach, e.speed * 0.3 * dt));
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 1.2 + Math.random() * 0.8;
        }
        if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateAIBomber(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
      case AIState.Attack:
        // Rush directly at target at full speed
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        break;
    }
    // Bomber explosion on contact
    if (dist < 3) {
      this.scene.createExplosion(e.pos, '#ff4400', 2);
      audioManager.playExplosion();
      target.hp -= def.damage;
      target.invulnTimer = INVULN_DURATION;
      e.hp = 0;
    }
  }

  private updateAICommander(e: EnemyState, target: PlayerState, dist: number, def: any, dt: number) {
    // Buff nearby enemies
    this.enemies.forEach(other => {
      if (other.id === e.id || other.hp <= 0) return;
      const d = vec3Dist(e.pos, other.pos);
      if (d < 30) {
        other.speed = def.speed * 1.3;
      }
    });

    switch (e.state) {
      case AIState.Patrol:
        if (dist < def.alertRange) e.state = AIState.Chase;
        break;
      case AIState.Chase:
        if (dist < def.attackRange) e.state = AIState.Attack;
        else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
        else {
          const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
          e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
        }
        break;
      case AIState.Attack:
        if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
        e.attackTimer -= dt;
        if (e.attackTimer <= 0) {
          this.enemyShoot(e, target);
          e.attackTimer = 0.6 + Math.random() * 0.4;
        }
        break;
      case AIState.Flee:
        if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
        const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
        break;
    }
  }

  private updateProjectiles(dt: number) {
    this.projectiles.forEach(p => {
      p.pos = vec3Add(p.pos, vec3Scale(p.vel, dt));
      p.lifetime -= dt;

      const mesh = this.scene.projectileMeshes.get(p.id);
      if (mesh) {
        mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
        if (p.type === ProjectileType.Missile) {
          mesh.rotation.x += dt * 5;
        }
      }
    });

    // Remove expired projectiles
    this.projectiles = this.projectiles.filter(p => {
      if (p.lifetime <= 0) {
        const mesh = this.scene.projectileMeshes.get(p.id);
        if (mesh) {
          this.scene.scene.remove(mesh);
          this.scene.projectileMeshes.delete(p.id);
        }
        return false;
      }
      return true;
    });
  }

  private updateParticles(dt: number) {
    // Particle update is handled in SceneManager.createExplosion
  }

  private checkCollisions() {
// Player projectiles hit enemies
    this.projectiles.forEach(p => {
      if (p.owner >= 10000) return; // Enemy projectile

      this.enemies.forEach(e => {
        const hitRadius = e.type === EnemyType.Boss ? 4 : 1.5;
        if (vec3Dist(p.pos, e.pos) < hitRadius) {
          e.hp -= p.damage;
          p.lifetime = 0;
          this.scene.createExplosion(p.pos, '#ffaa00', 0.5);
          audioManager.playHit();
        }
      });
    });

    // Enemy projectiles hit players
    this.projectiles.forEach(p => {
      if (p.owner < 10000) return; // Player projectile

      this.players.forEach(player => {
        if (!player.alive || player.invulnTimer > 0) return;
        if (vec3Dist(p.pos, player.pos) < PLAYER_SIZE) {
          player.hp -= p.damage;
          p.lifetime = 0;
          player.invulnTimer = INVULN_DURATION;
          this.scene.createExplosion(p.pos, '#ff4444', 0.5);
          audioManager.playHit();

          if (player.hp <= 0) {
            player.alive = false;
            this.scene.createExplosion(player.pos, '#4488ff', 3);
          }
        }
      });
    });
  }

  private spawnEnemies(dt: number) {
    const store = useGameStore.getState();
    const game = store.game;

    // Fresh game: the run starts at level 1
    if (game.wave < 1) {
      this.levelSpawned = 0;
      this.enemySpawnTimer = 0;
      this.waveTimer = 0;
      store.setGame({ wave: 1 });
      return;
    }

    // Intermission between levels: count down, no new spawns
    if (this.waveTimer > 0) {
      this.waveTimer -= dt;
      return;
    }

    const isBossLevel = game.wave % BOSS_WAVE_INTERVAL === 0;

    // Boss level: spawn the boss once, no regular set
    if (isBossLevel && this.currentBossIndex < 0) {
      this.spawnBoss();
      return;
    }

    // Regular level: burst-spawn the fixed enemy set
    const setSize = isBossLevel ? 0 : Math.min(6 + game.wave, MAX_ENEMIES);
    this.enemySpawnTimer += dt;
    if (this.levelSpawned < setSize && this.enemies.length < MAX_ENEMIES && this.enemySpawnTimer >= 0.15) {
      this.enemySpawnTimer = 0;

      const types = [EnemyType.Scout, EnemyType.Assault, EnemyType.Shield];
      if (game.wave > 2) types.push(EnemyType.Sniper);
      if (game.wave > 3) types.push(EnemyType.Bomber);
      if (game.wave > 4) types.push(EnemyType.Commander);
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
          y: clamp(this.players[0].pos.y + Math.sin(pitch) * dist, -WORLD_SIZE_Y * 0.5, WORLD_SIZE_Y * 0.5),
          z: this.players[0].pos.z + Math.cos(angle) * dist,
        };
      } while (this.players.some(p => vec3Dist(pos, p.pos) < 20));

      const enemy: EnemyState = {
        id: genId(),
        type,
        pos,
        rot: { x: 0, y: 0, z: 0 },
        hp: def.hp * (1 + game.wave * 0.1),
        maxHp: def.hp,
        speed: def.speed * (1 + game.wave * 0.05),
        state: AIState.Patrol,
        targetId: 0,
        attackTimer: 1 + Math.random(),
      };

      this.enemies.push(enemy);
      const mesh = this.scene.createEnemyMesh(new THREE.Color(def.color), def.size, type);
      mesh.position.set(pos.x, pos.y, pos.z);
      this.scene.enemyMeshes.set(enemy.id, mesh);
      this.scene.scene.add(mesh);
      this.levelSpawned++;
    }

    // Level clear: set exhausted (or boss dead) and nothing left alive
    const bossAlive = this.enemies.some(e => e.type === EnemyType.Boss);
    const enemiesAlive = this.enemies.some(e => e.hp > 0);
    const cleared = isBossLevel
      ? this.currentBossIndex >= 0 && !bossAlive
      : this.levelSpawned >= setSize && !enemiesAlive;
    if (cleared) {
      // Sweep stragglers (e.g. boss minions) before starting the intermission
      this.enemies.forEach(e => {
        const mesh = e.type === EnemyType.Boss
          ? this.scene.bossMeshes.get(e.id)
          : this.scene.enemyMeshes.get(e.id);
        if (mesh) {
          this.scene.scene.remove(mesh);
          this.scene.enemyMeshes.delete(e.id);
          this.scene.bossMeshes.delete(e.id);
        }
      });
      this.enemies = [];
      this.levelSpawned = 0;
      this.enemySpawnTimer = 0;
      this.currentBossIndex = -1;
      this.waveTimer = 2.5;
      store.setGame({ wave: game.wave + 1 });
    }
  }

  private spawnBoss() {
    const bossIndex = this.bossCount % 3;
    this.currentBossIndex = bossIndex;
    this.bossCount++;
    this.bossPhase = 1;
    this.bossAttackTimer = 0;

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
    };

    this.enemies.push(enemy);
    const mesh = this.scene.createBossMesh(new THREE.Color(bossDef.color), bossDef.size);
    mesh.position.set(pos.x, pos.y, pos.z);
    this.scene.bossMeshes.set(enemy.id, mesh);
    this.scene.scene.add(mesh);

    audioManager.playBossWarning();
    audioManager.playBossAnnounce(bossDef.name);
    useGameStore.getState().setGame({ bossFight: true, bossName: bossDef.name });
  }

  private updateBoss(dt: number) {
    const boss = this.enemies.find(e => e.type === EnemyType.Boss);
    if (!boss) {
      if (useGameStore.getState().game.bossFight) {
        useGameStore.getState().setGame({ bossFight: false, bossName: '' });
      }
      return;
    }

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
      const pattern = phase.attackPattern;

switch (pattern) {
        case 'spread':
          // Circular bullet spread
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dir = { x: Math.cos(angle), y: 0, z: Math.sin(angle) };
            const proj: ProjectileState = {
              id: genId(), pos: { ...boss.pos }, vel: vec3Scale(dir, 10),
              damage: 5, owner: boss.id + 10000, type: ProjectileType.BossBullet,
              lifetime: 4, radius: 0.3, color: '#ff4444',
            };
            this.projectiles.push(proj);
            const mesh = this.scene.createProjectileMesh('#ff4444', 'bullet');
            mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
            this.scene.projectileMeshes.set(proj.id, mesh);
            this.scene.scene.add(mesh);
          }
          break;
        case 'laser':
case 'finalBeam': {
          const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
          const proj: ProjectileState = {
            id: genId(), pos: { ...boss.pos }, vel: vec3Scale(dir, 30),
            damage: 25, owner: boss.id + 10000, type: ProjectileType.Laser,
            lifetime: 2, radius: 0.5, color: '#ff0000',
          };
          this.projectiles.push(proj);
          const mesh = this.scene.createProjectileMesh('#ff0000', 'beam');
          mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
          mesh.scale.set(1, 1, 3);
          this.scene.projectileMeshes.set(proj.id, mesh);
          this.scene.scene.add(mesh);
          break;
        }
        case 'missile':
          for (let i = 0; i < 5; i++) {
            const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
            const spread = { x: (Math.random() - 0.5) * 2, y: 0, z: (Math.random() - 0.5) * 2 };
const proj: ProjectileState = {
              id: genId(), pos: { ...boss.pos }, vel: vec3Scale(vec3Add(dir, spread), 8),
              damage: 10, owner: boss.id + 10000, type: ProjectileType.Missile,
              lifetime: 5, radius: 0.4, color: '#ffaa00',
            };
            this.projectiles.push(proj);
            const mesh = this.scene.createProjectileMesh('#ffaa00', 'missile');
            mesh.position.set(proj.pos.x, proj.pos.y, proj.pos.z);
            this.scene.projectileMeshes.set(proj.id, mesh);
            this.scene.scene.add(mesh);
          }
          break;
        case 'rush':
          boss.speed = 20;
          const rushDir = vec3Normalize(vec3Sub(target.pos, boss.pos));
          boss.pos = vec3Add(boss.pos, vec3Scale(rushDir, boss.speed * dt));
          break;
        case 'spawn':
          if (phase.minionSpawn) {
            for (let i = 0; i < 3; i++) {
              const enemy: EnemyState = {
                id: genId(), type: EnemyType.Scout,
                pos: { x: boss.pos.x + randRange(-5, 5), y: 0, z: boss.pos.z + randRange(-5, 5) },
                rot: { x: 0, y: 0, z: 0 }, hp: 20, maxHp: 20, speed: 10,
                state: AIState.Chase, targetId: 0, attackTimer: 1,
              };
this.enemies.push(enemy);
              const mesh = this.scene.createEnemyMesh(new THREE.Color(0x44aaff), 1, 'scout');
              mesh.position.set(enemy.pos.x, enemy.pos.y, enemy.pos.z);
              this.scene.enemyMeshes.set(enemy.id, mesh);
              this.scene.scene.add(mesh);
            }
          }
          break;
      }
    }

    // Move boss toward player slowly
    const target = this.players.find(p => p.alive);
    if (target && boss.phase && boss.phase > 1) {
      const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      boss.pos = vec3Add(boss.pos, vec3Scale(dir, boss.speed * dt * 0.3));
    }
  }

  private updateUI(dt: number) {
    const store = useGameStore.getState();
    const game = store.game;

    // Check game over
    if (!this.players[0].alive && !game.gameOver) {
      store.setGame({ gameOver: true, screen: 'result' });
      this.stop();
    }

    store.setPlayers(this.players);
    store.setGame({
      score: this.players.reduce((s, p) => s + p.score, 0),
    });
  }

private render(dt: number) {
    this.players.forEach((p, i) => {
      this.scene.updateCamera(p.pos, dt, p.rot.y);

      // Lock indicator
      const lockTargetId = this.lockTargets[i];
      const lockEnemy = lockTargetId !== null
        ? this.enemies.find(e => e.id === lockTargetId && e.hp > 0)
        : null;
      this.scene.updateLockIndicator(p.id, p.pos, lockEnemy ? lockEnemy.pos : null);
    });
    this.scene.render();
  }
}

