import { BREAKABLE_LIGHT_HP, BULLET_HIT_RADIUS, CLATTER_NOISE_RADIUS, DETECTION_MEMORY_S, DETECTION_WARNING_S, EXIT_REACH_RADIUS, FLASHLIGHT_CONE_ARC_DEG, FLASHLIGHT_SWEEP_AMPLITUDE_DEG, FLASHLIGHT_SWEEP_HZ, FOOTSTEP_INTERVAL_S, FOOTSTEP_NOISE_RADIUS, FURNITURE_SOLID, GUNSHOT_NOISE_RADIUS, INTRO_START_AMMO, LAMP_BULLET_HIT_RADIUS, LAMP_SMASH_NOISE_RADIUS, LIGHT_POOL_DOWN_S, NOISE_RING_TTL_S, PATROL_LANE_LENGTH, PICKUP_RANGE, PATROL_SPEED, PLAYER_MELEE_FAN_ARC_DEG, PLAYER_MELEE_DURATION, PLAYER_MELEE_POINT_BLANK, PLAYER_MELEE_RANGE, PLAYER_MELEE_TARGET_RADIUS, PLAYER_SPEED_MAX, PLAYER_WALK_SPEED, RC_MAX_ACTIVE_LIGHTS, ROOM_START_GRACE_S, SHOUT_NOISE_RADIUS, SUSPICION_DURATION_S, SUSPICION_PROMOTE_S, THROWN_HIT_RADIUS, THROWN_REST_SPEED_EPS, VISION_FAR_DISTANCE, VISION_NEAR_DISTANCE } from '../constants';
import { createEnemy } from '../data/enemies';
import { RC_LIGHT_TABLE } from '../data/lights';
import { MISSIONS } from '../data/missions';
import { WEAPON_TABLE } from '../data/weapons';
import { tokenizeRoom } from '../world/roomTokenizer';
import { buildTileMap, worldToTile } from '../world/tileMap';
import { hasLineOfSight } from '../world/lineOfSight';
import { damageEnemy, lightSmash } from './damage';
import { playerAttack, throwCurrentWeapon, updateThrownWeapons, pickupWeapon } from './weapons';
import { GamePhase as GP } from '../types';
import type { ActiveRcLight, Enemy, EnemySpawn, GamePhase, ISimulation, LightSource, NoiseKind, NoiseStimulus, Player, PlayerInput, RoomLayout, SimEvent, SimSnapshot, ThrownWeapon, Vec2, WeaponId } from '../types';

const mission = MISSIONS[0];

function makePlayer(room: RoomLayout): Player {
  return {
    position: { ...room.playerSpawn }, velocity: { x: 0, y: 0 }, facingAngle: -Math.PI / 2,
    // v3.6:起始毛瑟 C96(WEAPON_TABLE 冻结 10 发,intro 覆盖为 6)+ 小刀 ∞ 近战(RMB)
    hp: 1, ammo: INTRO_START_AMMO, reloading: 0, weapon: 'mauser_c96', mode: 'ranged', modeSwitchTimer: 0,
    activeMask: null, dodgeTimer: 0, dodgeCooldown: 0, dashTimer: 0, dashCooldown: 0, kills: 0, hitsTaken: 0,
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

// 房间 tile 表(L / N / S)→ 光源列表。L = 可破坏目标灯(固定 lightSources[0],
// store / HUD / 校验脚本均按此索引读取),N / S = 不可破坏装饰灯,保证灯拆后仍有 RC 光源展示。
function buildLightSources(room: RoomLayout): LightSource[] {
  const sources: LightSource[] = [];
  let neonCount = 0;
  let searchlightCount = 0;
  for (const { tile, kind } of tokenizeRoom(room).lightTiles) {
    if (kind === 'lamp') {
      sources.unshift({ id: `oil_lamp_${sources.filter((s) => s.kind === 'oil_lamp').length + 1}`, kind: 'oil_lamp', position: { ...tile }, state: 'intact', hp: BREAKABLE_LIGHT_HP, intensity: RC_LIGHT_TABLE.oil_lamp.intensity, breakable: true, invalidated: false });
    } else if (kind === 'neon') {
      neonCount += 1;
      sources.push({ id: `neon_sign_${neonCount}`, kind: 'neon_sign', position: { ...tile }, state: 'intact', hp: Infinity, intensity: RC_LIGHT_TABLE.neon_sign.intensity, breakable: false, invalidated: false });
    } else {
      searchlightCount += 1;
      sources.push({ id: `searchlight_${searchlightCount}`, kind: 'searchlight', position: { ...tile }, state: 'intact', hp: Infinity, intensity: RC_LIGHT_TABLE.searchlight.intensity, breakable: false, invalidated: false });
    }
  }
  return sources;
}

function asActiveLight(source: LightSource): ActiveRcLight {
  const spec = RC_LIGHT_TABLE[source.kind as keyof typeof RC_LIGHT_TABLE] ?? RC_LIGHT_TABLE.oil_lamp;
  return { id: source.id, kind: spec.kind, position: { ...source.position }, colorRgb: hexToRgb(spec.colorHex), intensity: source.intensity, radius: spec.radius, ttl: Infinity };
}

export class Simulation implements ISimulation {
  phase: GamePhase = GP.TITLE;
  readonly events: SimEvent[] = [];
  readonly recentEvents: SimEvent[] = [];
  // v3.6 S5:房间改为实例字段(loadRoom 切换);mission 保持模块级(intro 单任务)
  private roomIndex = 0;
  private room: RoomLayout = mission.rooms[0];
  private tileMap = buildTileMap(this.room);
  private player = makePlayer(this.room);
  private enemies = this.room.enemySpawns.map((spawn, i) => this.createRoomEnemy(spawn, i));
  private lightSources = buildLightSources(this.room);
  private activeLights: ActiveRcLight[] = [];
  private move: Vec2 = { x: 0, y: 0 };
  private invalidationTimer = -1;
  private melee: SimSnapshot['melee'] = [];
  private elapsed = 0;
  private graceRemaining = ROOM_START_GRACE_S;
  private warningRemaining = 0;
  private warningEnemyId: string | null = null;
  private missionScore: SimSnapshot['missionScore'] = null;
  private detectionMemory = 0;
  // v3.6 S4:逐敌状态(巡逻进度 / 起疑计时),按 enemy.id  keyed;巡逻段锚定各自出生点
  private patrolProgress = new Map<string, number>();
  private patrolLanes = new Map<string, { x0: number; y: number }>();
  private suspicionRemaining = new Map<string, number>();
  private suspicionElapsed = new Map<string, number>();
  private speedMode: 'walk' | 'sprint' = 'walk';
  // v3.6 S2:射击 / 投掷 / 噪音状态
  private playerFireCooldown = 0;
  private bullets: SimSnapshot['bullets'] = [];
  private thrownWeapons: ThrownWeapon[] = [];
  private noises: NoiseStimulus[] = [];
  private noiseSeq = 0;
  private clatteredThrown = new Set<string>(); // 已播过一次落地声的投掷物(墙停 / 静止各只响一次)
  private footstepTimer = 0;                   // S3:冲刺脚步噪音节流(FOOTSTEP_INTERVAL_S)

  private pickedSpawnKeys = new Set<string>(); // B66:已拾取的武器出生点(键 = tile)
  private droppedWeapons: { tile: Vec2; weaponId: WeaponId }[] = []; // B66:拾取交换时掉落的旧武器
  private createRoomEnemy(spawn: EnemySpawn, index: number): Enemy {
    const foe = createEnemy(spawn.archetype ?? 'flashlight_patrol', `patrol_${index + 1}`, spawn.position);
    foe.role = spawn.role ?? 'ground_patrol';
    foe.patrolAxis = spawn.patrolAxis ?? (foe.role === 'tower_guard' ? 'static' : 'horizontal');
    foe.patrolLength = spawn.patrolLength ?? (foe.role === 'tower_guard' ? 0 : PATROL_LANE_LENGTH);
    foe.facingAngle = spawn.facingAngle ?? 0;
    return foe;
  }
  private isBlockedAt(position: Vec2): boolean {
    const tile = worldToTile(position, this.tileMap.tileSize);
    if (this.tileMap.isSolid(tile) || this.tileMap.isCover(tile)) return true;
    for (const furniture of this.room.furniture ?? []) {
      if (!FURNITURE_SOLID.has(furniture.kind)) continue;
      const sizeX = furniture.size?.x ?? 1;
      const sizeY = furniture.size?.y ?? 1;
      if (
        position.x >= furniture.tile.x &&
        position.x < furniture.tile.x + sizeX &&
        position.y >= furniture.tile.y &&
        position.y < furniture.tile.y + sizeY
      ) return true;
    }
    return false;
  }

  private movePlayer(dt: number, vx: number, vy: number): void {
    const radius = 0.34;
    const tryMove = (x: number, y: number): void => {
      const minX = radius;
      const maxX = this.room.width - radius;
      const minY = radius;
      const maxY = this.room.height - radius;
      const next = {
        x: Math.max(minX, Math.min(maxX, x)),
        y: Math.max(minY, Math.min(maxY, y)),
      };
      const samples = [
        next,
        { x: next.x - radius, y: next.y - radius },
        { x: next.x + radius, y: next.y - radius },
        { x: next.x - radius, y: next.y + radius },
        { x: next.x + radius, y: next.y + radius },
      ];
      if (samples.every((sample) => !this.isBlockedAt(sample))) {
        this.player.position = next;
      }
    };
    tryMove(this.player.position.x + vx * dt, this.player.position.y);
    tryMove(this.player.position.x, this.player.position.y + vy * dt);
  }

  private hasTowerPower(): boolean {
    return this.lightSources.some((light) => light.kind === 'searchlight' && !light.invalidated && light.intensity > 0);
  }

  private canNeutralize(foe: Enemy): boolean {
    return foe.role !== 'tower_guard' || !this.hasTowerPower();
  }

  private damageFoe(foe: Enemy, damage: number, source: 'weapon' | 'throw'): boolean {
    if (!this.canNeutralize(foe)) {
      this.emit({ kind: 'attackBlocked', enemyId: foe.id, position: { ...foe.position } });
      return false;
    }
    return damageEnemy(foe, damage, source);
  }

  private destroyTowerPower(): void {
    for (const searchlight of this.lightSources.filter((light) => light.kind === 'searchlight')) {
      searchlight.state = 'dead';
      searchlight.invalidated = true;
      searchlight.intensity = 0;
      this.activeLights = this.activeLights.filter((light) => light.id !== searchlight.id);
      this.emit({ kind: 'invalidateLight', lightId: searchlight.id, position: { ...searchlight.position } });
    }
    for (const tower of this.enemies.filter((enemy) => enemy.role === 'tower_guard' && enemy.hp > 0)) {
      tower.state = 'suspicious';
      tower.awareness = 'suspicious';
      tower.lastSuspiciousPosition = { ...this.player.position };
    }
  }


  start(): void {
    this.phase = GP.MISSION_PLAY;
    this.player = makePlayer(mission.rooms[0]);
    this.elapsed = 0;
    this.missionScore = null;
    this.loadRoom(0);
  }

  // v3.6 S5:切房——重建房间 / 导航 / 灯 / 敌人,重置每房间宽限期(B01)/ 警告 / 弹道 / 噪音;玩家武器弹药保留
  private loadRoom(index: number): void {
    this.roomIndex = index;
    this.room = mission.rooms[index];
    this.tileMap = buildTileMap(this.room);
    this.player.position = { ...this.room.playerSpawn };
    this.player.velocity = { x: 0, y: 0 };
    this.move = { x: 0, y: 0 };
    this.enemies = this.room.enemySpawns.map((spawn, i) => this.createRoomEnemy(spawn, i));
    this.patrolLanes.clear(); this.patrolProgress.clear(); this.suspicionRemaining.clear(); this.suspicionElapsed.clear();
    this.enemies.forEach((foe, i) => {
      const spawn = this.room.enemySpawns[i];
      this.patrolLanes.set(foe.id, { x0: spawn.position.x, y: spawn.position.y });
    });
    this.lightSources = buildLightSources(this.room);
    this.activeLights = this.lightSources.map(asActiveLight);
    this.invalidationTimer = -1;
    this.melee = [];
    this.graceRemaining = ROOM_START_GRACE_S;
    this.warningRemaining = 0;
    this.warningEnemyId = null;
    this.detectionMemory = 0;
    this.playerFireCooldown = 0; this.bullets = []; this.thrownWeapons = []; this.noises = []; this.clatteredThrown.clear(); this.footstepTimer = 0;
    this.pickedSpawnKeys = new Set(); this.droppedWeapons = [];
    this.emit({ kind: 'roomEnter', roomId: this.room.id });
  }

  step(dt: number): void {
    if (this.phase !== GP.MISSION_PLAY) return;
    this.elapsed += dt;
    this.graceRemaining = Math.max(0, this.graceRemaining - dt);
    const len = Math.hypot(this.move.x, this.move.y) || 1;
    const speed = this.speedMode === 'sprint' ? PLAYER_SPEED_MAX : PLAYER_WALK_SPEED;
    const vx = (this.move.x / len) * speed;
    const vy = (this.move.y / len) * speed;
    this.player.velocity = { x: vx, y: vy };
    this.movePlayer(dt, vx, vy);
    // v3.6 S3:冲刺脚步噪音(0.25s 节流,r4;听觉判定穿墙规则 = 仅 # 阻挡)
    const playerMoving = Math.hypot(vx, vy) > 0.1;
    this.footstepTimer = Math.max(0, this.footstepTimer - dt);
    if (playerMoving && this.speedMode === 'sprint' && this.footstepTimer === 0) {
      this.footstepTimer = FOOTSTEP_INTERVAL_S;
      this.emitNoise('footsteps', this.player.position, FOOTSTEP_NOISE_RADIUS);
    }
    // v3.6 S5:出口——最后一房通关计分,否则 loadRoom 进下一房
    if (this.enemies.every((e) => e.hp <= 0) && this.room.exitTile && distanceBetween(this.player.position, this.room.exitTile) <= EXIT_REACH_RADIUS) {
      if (this.roomIndex < mission.rooms.length - 1) this.loadRoom(this.roomIndex + 1);
      else this.finishMission();
    }
    this.melee = this.melee.map((s) => ({ ...s, ttl: s.ttl - dt })).filter((s) => s.ttl > 0);
    this.playerFireCooldown = Math.max(0, this.playerFireCooldown - dt);
    // v3.6 S2:子弹推进——分段采样(prev→next,0.25u 步长;60u/s × 1/60 ≈ 1u/tick 防穿墙/穿人)。
    // 子弹无视"光下无敌"(受光护甲只对近战生效,用户裁决)。
    for (let i = this.bullets.length - 1; i >= 0; i -= 1) {
      const b = this.bullets[i];
      b.ttl -= dt;
      const from = { ...b.position };
      b.position.x += b.velocity.x * dt;
      b.position.y += b.velocity.y * dt;
      const steps = Math.max(1, Math.ceil(distanceBetween(from, b.position) / 0.25));
      let dead = b.ttl <= 0;
      for (let s = 1; s <= steps && !dead; s++) {
        const px = from.x + (b.position.x - from.x) * (s / steps);
        const py = from.y + (b.position.y - from.y) * (s / steps);
        if (this.tileMap.blocksBullet(worldToTile({ x: px, y: py }, this.tileMap.tileSize))) {
          b.position = { x: px, y: py }; dead = true; break;
        }
        for (const foe of this.enemies) {
          if (foe.hp <= 0 || distanceBetween({ x: px, y: py }, foe.position) > BULLET_HIT_RADIUS) continue;
          b.position = { x: px, y: py };
          if (this.damageFoe(foe, b.damage, 'weapon')) {
            this.player.kills++; foe.velocity = { x: 0, y: 0 };
            this.clearWarningIfOwner(foe);
            this.emit({ kind: 'enemyKilled', enemyId: foe.id, position: { ...foe.position } });
          }
          dead = true; break;
        }
        // B66:子弹打灯——连射拆灯是最自然的直觉路径;命中按近战同伤害(1 击/颗)
        if (!dead) {
          const lamp = this.lightSources[0];
          if (lamp.state !== 'dead') {
            const lampDist = distanceBetween({ x: px, y: py }, lamp.position);
            if (lampDist <= LAMP_BULLET_HIT_RADIUS) {
              b.position = { x: px, y: py };
              const result = lightSmash(lamp, lampDist, 'weapon');
              if (result.hit) {
                this.emit({ kind: 'lightSmash', lightId: lamp.id, position: { ...lamp.position }, hp: result.hp, state: result.state, cause: 'weapon' });
                this.emitNoise('lamp_smash', lamp.position, LAMP_SMASH_NOISE_RADIUS);
                dead = true;
              }
            }
          }
        }
      }
      if (dead) this.bullets.splice(i, 1);
    }
    // v3.6 S2:投掷物——飞行中撞敌 = 1 击击倒(同子弹,无视光甲);撞墙即停;静止瞬间哐当(各只响一次)
    const thrownPrev = new Map(this.thrownWeapons.map((t) => [t.id, { ...t.position }]));
    updateThrownWeapons(this.thrownWeapons, dt);
    for (const t of this.thrownWeapons) {
      if (this.clatteredThrown.has(t.id)) continue;
      const speed = Math.hypot(t.velocity.x, t.velocity.y);
      if (speed > THROWN_REST_SPEED_EPS) {
        const from = thrownPrev.get(t.id) ?? t.position;
        const steps = Math.max(1, Math.ceil(distanceBetween(from, t.position) / 0.25));
        for (let s = 1; s <= steps; s++) {
          const px = from.x + (t.position.x - from.x) * (s / steps);
          const py = from.y + (t.position.y - from.y) * (s / steps);
          if (this.tileMap.blocksBullet(worldToTile({ x: px, y: py }, this.tileMap.tileSize))) {
            t.position = { x: px, y: py }; t.velocity = { x: 0, y: 0 };
            break;
          }
          const foe = this.enemies.find((e) => e.hp > 0 && distanceBetween({ x: px, y: py }, e.position) <= THROWN_HIT_RADIUS);
          if (foe) {
            t.position = { x: px, y: py }; t.velocity = { x: 0, y: 0 };
            if (this.damageFoe(foe, 1, 'throw')) {
              this.player.kills++; foe.velocity = { x: 0, y: 0 };
              this.clearWarningIfOwner(foe);
              this.emit({ kind: 'enemyKilled', enemyId: foe.id, position: { ...foe.position } });
            }
            break;
          }
        }
      }
      if (Math.hypot(t.velocity.x, t.velocity.y) <= THROWN_REST_SPEED_EPS) {
        this.clatteredThrown.add(t.id);
        this.emitNoise('clatter', t.position, CLATTER_NOISE_RADIUS);
      }
    }
    // 噪音扩散环 TTL 衰减(听觉判定在发射 tick 已完成,这里只为可视化)
    this.noises = this.noises.map((n) => ({ ...n, ttl: n.ttl - dt })).filter((n) => n.ttl > 0);
    // 短 TTL 光(枪口闪光)到期移除;静态灯 ttl = Infinity 不受影响
    for (let i = this.activeLights.length - 1; i >= 0; i -= 1) {
      const light = this.activeLights[i];
      if (light.ttl === Infinity) continue;
      light.ttl -= dt;
      if (light.ttl <= 0) { this.activeLights.splice(i, 1); this.emit({ kind: 'rcLightExpired', lightId: light.id }); }
    }
    // v3.6 S4:逐敌 FSM——巡逻(各自出生点锚定折返段)/ 起疑(走向最后疑点查看)/ 警报(单 owner 警告窗口)
    const moving = Math.hypot(this.player.velocity.x, this.player.velocity.y) > 0.1;
    const sprinting = moving && this.speedMode === 'sprint';
    for (const foe of this.enemies) {
      if (foe.hp <= 0) continue;
      const staticAnchor = foe.role === 'tower_guard'
        ? this.patrolLanes.get(foe.id)
        : undefined;
      if (staticAnchor) {
        foe.position.x = staticAnchor.x0;
        foe.position.y = staticAnchor.y;
      }
      if (foe.state === 'patrol') {
        const lane = this.patrolLanes.get(foe.id) ?? { x0: foe.position.x, y: foe.position.y };
        this.patrolLanes.set(foe.id, lane);
        const sweep = Math.sin(this.elapsed * Math.PI * 2 * FLASHLIGHT_SWEEP_HZ) * FLASHLIGHT_SWEEP_AMPLITUDE_DEG * Math.PI / 180;
        if (foe.role === 'tower_guard' || foe.patrolAxis === 'static') {
          foe.velocity = { x: 0, y: 0 };
          foe.facingAngle = Math.PI / 2 + sweep * 2.2;
        } else {
          const laneLength = Math.max(1, foe.patrolLength);
          const progress = ((this.patrolProgress.get(foe.id) ?? 0) + PATROL_SPEED * dt) % (laneLength * 2);
          this.patrolProgress.set(foe.id, progress);
          const offset = progress <= laneLength ? progress : laneLength * 2 - progress;
          const forward = progress <= laneLength ? 0 : Math.PI;
          if (foe.patrolAxis === 'vertical') {
            const patrolY = lane.y + offset;
            foe.velocity = { x: 0, y: (patrolY - foe.position.y) / Math.max(dt, 1 / 60) };
            foe.position.x = lane.x0;
            foe.position.y = patrolY;
            foe.facingAngle = turnToward(foe.facingAngle, forward + Math.PI / 2 + sweep, 6 * dt);
          } else {
            const patrolX = lane.x0 + offset;
            foe.velocity = { x: (patrolX - foe.position.x) / Math.max(dt, 1 / 60), y: 0 };
            foe.position.x = patrolX;
            foe.position.y = lane.y;
            foe.facingAngle = turnToward(foe.facingAngle, forward + sweep, 6 * dt);
          }
        }
      } else if (foe.state === 'suspicious' && foe.lastSuspiciousPosition) {
        // Tower guards may rotate/react after power loss, but their elevated position is invariant.
        const to = foe.lastSuspiciousPosition;
        if (staticAnchor) {
          foe.velocity = { x: 0, y: 0 };
        } else {
          // v3.6 S4:起疑查看——走向最后疑点(PATROL_SPEED),到位 <0.3u 驻足凝视
          const d = distanceBetween(foe.position, to);
          if (d > 0.3) {
            foe.velocity = { x: ((to.x - foe.position.x) / d) * PATROL_SPEED, y: ((to.y - foe.position.y) / d) * PATROL_SPEED };
            foe.position.x = Math.max(1.2, Math.min(this.room.width - 1.2, foe.position.x + foe.velocity.x * dt));
            foe.position.y = Math.max(1.2, Math.min(this.room.height - 1.2, foe.position.y + foe.velocity.y * dt));
          } else {
            foe.velocity = { x: 0, y: 0 };
          }
        }
        foe.facingAngle = Math.atan2(to.y - foe.position.y, to.x - foe.position.x);
      } else {
        foe.velocity = { x: 0, y: 0 };
      }
      if (staticAnchor) {
        foe.position.x = staticAnchor.x0;
        foe.position.y = staticAnchor.y;
        foe.velocity = { x: 0, y: 0 };
      }
      const distance = distanceBetween(foe.position, this.player.position);
      const towerGuard = foe.role === 'tower_guard';
      const towerActive = !towerGuard || this.hasTowerPower();
      const inCone = towerActive && this.graceRemaining <= 0 && this.inFlashlightCone(foe.position, foe.facingAngle, this.player.position, towerGuard ? 12 : 5);
      const near = distance <= (towerGuard ? 12 : VISION_NEAR_DISTANCE) && inCone;
      const farSprint = !towerGuard && distance > VISION_NEAR_DISTANCE && distance <= VISION_FAR_DISTANCE && inCone && sprinting;
      if (near && this.warningEnemyId === null) {
        this.warningEnemyId = foe.id;
        this.warningRemaining = DETECTION_WARNING_S;
        foe.state = 'alert';
        foe.awareness = 'detected'; foe.lastSuspiciousPosition = { ...this.player.position };
        this.emit({ kind: 'detectionWarning', enemyId: foe.id, position: { ...this.player.position }, secondsRemaining: DETECTION_WARNING_S });
        this.raiseAlert(foe);
      } else if (farSprint && this.warningEnemyId === null && foe.state !== 'suspicious') {
        foe.state = 'suspicious'; foe.awareness = 'suspicious'; foe.lastSuspiciousPosition = { ...this.player.position };
        this.suspicionRemaining.set(foe.id, SUSPICION_DURATION_S); this.suspicionElapsed.set(foe.id, 0);
      }
      if (foe.state === 'suspicious') {
        let remaining = this.suspicionRemaining.get(foe.id) ?? 0;
        if (farSprint) { remaining = SUSPICION_DURATION_S; this.suspicionElapsed.set(foe.id, 0); } else remaining = Math.max(0, remaining - dt);
        this.suspicionRemaining.set(foe.id, remaining);
        const elapsed = (this.suspicionElapsed.get(foe.id) ?? 0) + dt;
        this.suspicionElapsed.set(foe.id, elapsed);
        if (near || elapsed >= SUSPICION_PROMOTE_S) {
          this.warningEnemyId = foe.id; this.warningRemaining = DETECTION_WARNING_S; foe.state = 'alert'; foe.awareness = 'detected';
          this.raiseAlert(foe);
        }
        else if (remaining === 0) { foe.state = 'patrol'; foe.awareness = 'none'; foe.lastSuspiciousPosition = null; }
      }
    }
    // 单 owner 警告窗口(R1 不变式:warningEnemyId 至多指向一个敌人;主人在三条击杀路径即死即清)
    const owner = this.enemies.find((e) => e.id === this.warningEnemyId);
    if (owner && owner.hp > 0) {
      const ownerInCone = this.graceRemaining <= 0 && (owner.role !== 'tower_guard' || this.hasTowerPower()) && this.inFlashlightCone(owner.position, owner.facingAngle, this.player.position, owner.role === 'tower_guard' ? 12 : 5);
      const ownerNear = distanceBetween(owner.position, this.player.position) <= (owner.role === 'tower_guard' ? 12 : VISION_NEAR_DISTANCE) && ownerInCone;
      const detected = ownerNear || ownerInCone;
      if (!detected) {
        this.detectionMemory = Math.max(0, this.detectionMemory - dt);
        if (this.detectionMemory === 0) {
          this.warningEnemyId = null;
          this.warningRemaining = 0;
          owner.state = 'patrol';
          owner.awareness = 'none';
        }
      } else {
        this.detectionMemory = DETECTION_MEMORY_S;
        this.warningRemaining = Math.max(0, this.warningRemaining - dt);
        if (this.warningRemaining === 0) this.killPlayer();
      }
    } else if (this.warningEnemyId !== null) {
      // R1 兜底:主人已死但击杀路径未清(理论上到不了这里)
      this.warningEnemyId = null; this.warningRemaining = 0;
    }
    if (this.invalidationTimer >= 0) {
      this.invalidationTimer -= dt;
      if (this.invalidationTimer <= 0) {
        const lamp = this.lightSources[0];
        lamp.invalidated = true;
        lamp.intensity = 0;
        this.activeLights = this.activeLights.filter((light) => light.id !== lamp.id);
        this.invalidationTimer = -1;
        this.emit({ kind: 'invalidateLight', lightId: lamp.id, position: { ...lamp.position } });
      }
    }
  }

  input(action: PlayerInput): void {
    if (action.kind === 'move') { this.move = { ...action.dir }; this.speedMode = action.speedMode; }
    if (action.kind === 'aim') this.player.facingAngle = action.angle;
    if (action.kind === 'quitToTitle') this.phase = GP.TITLE;
    if (action.kind === 'attackStart' && this.phase === GP.MISSION_PLAY) this.attack();
    if (action.kind === 'fireStart' && this.phase === GP.MISSION_PLAY) this.fire();
    if (action.kind === 'throwStart' && this.phase === GP.MISSION_PLAY) this.throwWeapon();
    if (action.kind === 'interactStart' && this.phase === GP.MISSION_PLAY) this.tryPickup();
    if (action.kind === 'toggleMode' && this.phase === GP.MISSION_PLAY) this.togglePlayerMode();
  }

  // B66:E 拾取——修复"捡不了刀":交换语义(捡起地上武器,当前武器掉落在原地),
  // Hotline Miami 式的即捡即换。范围内取最近者。
  private tryPickup(): void {
    const p = this.player;
    const tileOf = (t: Vec2): Vec2 => ({ x: t.x + 0.5, y: t.y + 0.5 });
    const candidates: { source: 'spawn' | 'drop'; tile: Vec2; weaponId: WeaponId; dist: number }[] = [];
    for (const spawn of this.room.weaponSpawns) {
      const key = `${spawn.tile.x},${spawn.tile.y}`;
      if (this.pickedSpawnKeys.has(key)) continue;
      const dist = distanceBetween(p.position, tileOf(spawn.tile));
      if (dist <= PICKUP_RANGE) candidates.push({ source: 'spawn', tile: spawn.tile, weaponId: spawn.weaponId, dist });
    }
    for (const drop of this.droppedWeapons) {
      const dist = distanceBetween(p.position, tileOf(drop.tile));
      if (dist <= PICKUP_RANGE) candidates.push({ source: 'drop', tile: drop.tile, weaponId: drop.weaponId, dist });
    }
    candidates.sort((a, b) => a.dist - b.dist);
    const pick = candidates[0];
    if (pick === undefined) return;
    // 从来源移除
    if (pick.source === 'spawn') {
      this.pickedSpawnKeys.add(`${pick.tile.x},${pick.tile.y}`);
    } else {
      const idx = this.droppedWeapons.findIndex((d) => d.tile.x === pick.tile.x && d.tile.y === pick.tile.y && d.weaponId === pick.weaponId);
      if (idx >= 0) this.droppedWeapons.splice(idx, 1);
    }
    // 交换:旧武器掉落在拾取点
    if (p.weapon !== null && p.weapon !== pick.weaponId) {
      this.droppedWeapons.push({ tile: pick.tile, weaponId: p.weapon });
    }
    pickupWeapon(p, pick.weaponId);
    // 拾取后模式跟随武器类型(小刀→近战,枪械→远程)
    p.mode = WEAPON_TABLE[pick.weaponId].type === 'ranged' ? 'ranged' : 'melee';
    this.emit({ kind: 'weaponPicked', weaponId: pick.weaponId });
    this.emitNoise('clatter', tileOf(pick.tile), CLATTER_NOISE_RADIUS);
  }

  // B66:F 切换近战/远程(v2 设计里存在但从未接线)
  private togglePlayerMode(): void {
    const p = this.player;
    if (p.weapon === null || WEAPON_TABLE[p.weapon].type !== 'ranged') return;
    p.mode = p.mode === 'ranged' ? 'melee' : 'ranged';
    this.emit({ kind: 'modeSwitch', to: p.mode });
  }

  snapshot(): SimSnapshot {
    return {
      phase: this.phase, paused: false, player: { ...this.player, position: { ...this.player.position }, velocity: { ...this.player.velocity } },
      enemies: this.enemies.map((e) => ({ ...e, position: { ...e.position }, velocity: { ...e.velocity } })),
      bullets: this.bullets.map((b) => ({ ...b, position: { ...b.position }, velocity: { ...b.velocity } })),
      melee: this.melee.map((s) => ({ ...s, position: { ...s.position } })), grenades: [],
      thrownWeapons: this.thrownWeapons.map((t) => ({ ...t, position: { ...t.position }, velocity: { ...t.velocity } })),
      noises: this.noises.map((n) => ({ ...n, position: { ...n.position } })),
      // B66:剩余可拾取武器(出生点 - 已拾取 + 交换掉落),HUD 提示用
      weaponSpawns: [
        ...this.room.weaponSpawns
          .filter((spawn) => !this.pickedSpawnKeys.has(`${spawn.tile.x},${spawn.tile.y}`))
          .map((spawn) => ({ tile: { ...spawn.tile }, weaponId: spawn.weaponId })),
        ...this.droppedWeapons.map((drop) => ({ tile: { ...drop.tile }, weaponId: drop.weaponId })),
      ],
      activeLights: this.activeLights.map((l) => ({ ...l, position: { ...l.position } })),
      lightSources: this.lightSources.map((l) => ({ ...l, position: { ...l.position } })),
      currentRoom: this.phase === GP.TITLE ? null : this.room, currentMission: this.phase === GP.TITLE ? null : mission,
       missionScore: this.missionScore, elapsedSeconds: this.elapsed, spawnGraceRemaining: this.graceRemaining,
        detectionWarningRemaining: this.warningRemaining, lampsDestroyed: this.lightSources.filter((l) => l.state === 'dead').length,
        objective: this.lightSources[0].state !== 'dead' ? 'break_lamp' : this.enemies.some((e) => e.hp > 0) ? 'kill_enemy' : 'escape',
        exitActive: this.enemies.every((e) => e.hp <= 0) && this.lightSources[0].state === 'dead',
        // v3.6 S4:HUD 单值 = 全体活敌最大严重度(detected > suspicious > none)
        awareness: this.enemies.some((e) => e.hp > 0 && e.awareness === 'detected') ? 'detected' : this.enemies.some((e) => e.hp > 0 && e.awareness === 'suspicious') ? 'suspicious' : 'none',
        lastSuspiciousPosition: (this.enemies.find((e) => e.hp > 0 && e.awareness === 'detected') ?? this.enemies.find((e) => e.hp > 0 && e.awareness === 'suspicious'))?.lastSuspiciousPosition ?? null,
       lights: RC_LIGHT_TABLE,
    };
  }

  private attack(): void {
    this.melee.push({ ownerId: 'player', weaponId: 'knife', position: { ...this.player.position }, facingAngle: this.player.facingAngle, range: PLAYER_MELEE_RANGE + PLAYER_MELEE_TARGET_RADIUS, arcDeg: PLAYER_MELEE_FAN_ARC_DEG, ttl: PLAYER_MELEE_DURATION, damage: 1 });
    this.emit({ kind: 'melee', ownerId: 'player', weaponId: 'knife', position: { ...this.player.position }, angle: this.player.facingAngle });
    const lamp = this.lightSources[0];
    const result = lightSmash(lamp, this.meleeReach(lamp.position) ? distanceBetween(this.player.position, lamp.position) : Infinity, 'melee');
    if (result.hit) {
      this.emit({ kind: 'lightSmash', lightId: lamp.id, position: { ...lamp.position }, hp: result.hp, state: result.state, cause: 'melee' });
      this.emitNoise('lamp_smash', lamp.position, LAMP_SMASH_NOISE_RADIUS); // v3.6 S3:砸灯巨响 r6
    }
    if (lamp.state === 'dead' && this.invalidationTimer < 0 && !lamp.invalidated) {
      this.invalidationTimer = LIGHT_POOL_DOWN_S;
      this.destroyTowerPower();
    }
    if (result.hit) return;
    // v3.6 S4:近战取触及范围内第一个活敌(单敌行为不变)
    const enemy = this.enemies.find((e) => e.hp > 0 && this.meleeReach(e.position));
    if (!enemy) return;
    if (!lamp.invalidated) {
      this.emit({ kind: 'attackBlocked', enemyId: enemy.id, position: { ...enemy.position } });
      return;
    }
    if (!this.canNeutralize(enemy)) {
      this.emit({ kind: 'attackBlocked', enemyId: enemy.id, position: { ...enemy.position } });
      return;
    }
    if (damageEnemy(enemy, 1)) {
       this.player.kills++;
      enemy.velocity = { x: 0, y: 0 };
      this.clearWarningIfOwner(enemy);
      this.emit({ kind: 'enemyKilled', enemyId: enemy.id, position: { ...enemy.position } });
    }
  }

  // 扇形近战判定(v3.2):边缘距离(中心距 − 受击体半径)≤ PLAYER_MELEE_RANGE;
  // 贴身(≤ PLAYER_MELEE_POINT_BLANK)免瞄准,否则目标须落入 ±PLAYER_MELEE_FAN_ARC_DEG/2 扇形。
  private meleeReach(target: Vec2): boolean {
    const center = distanceBetween(this.player.position, target);
    if (center - PLAYER_MELEE_TARGET_RADIUS > PLAYER_MELEE_RANGE) return false;
    if (center <= PLAYER_MELEE_POINT_BLANK) return true;
    return this.aimsAt(target, PLAYER_MELEE_FAN_ARC_DEG * Math.PI / 360);
  }

  // v3.6 S2:LMB 射击。ranged 门(模式 + 持枪 + 武器表 ranged)——掷枪后 LMB 不得退化成免费近战(R3)。
  private fire(): void {
    const p = this.player;
    if (p.mode !== 'ranged' || p.weapon === null || WEAPON_TABLE[p.weapon].type !== 'ranged') return;
    const result = playerAttack(p, this.playerFireCooldown);
    if (!result || result.kind !== 'ranged') return;
    this.playerFireCooldown = result.cooldown;
    this.bullets.push(result.bullet);
    this.emit({ kind: 'fire', ownerId: 'player', weaponId: result.bullet.weaponId, position: { ...p.position }, angle: p.facingAngle });
    // 枪口闪光:短 TTL RC 光(预算 RC_MAX_ACTIVE_LIGHTS,满则跳过——R10 必须会过期)
    if (this.activeLights.length < RC_MAX_ACTIVE_LIGHTS) {
      const spec = RC_LIGHT_TABLE.muzzle_flash;
      const light: ActiveRcLight = {
        id: `muzzle_${(this.noiseSeq += 1)}`, kind: spec.kind,
        // B66:枪口锚点 = 玩家视觉中心(position+0.5)+ 0.6*朝向——旧代码从瓦片原点
        // 起算,枪口闪光整体偏上左 0.5 格(17px),呈现"闪光离枪太远"
        position: {
          x: p.position.x + 0.5 + Math.cos(p.facingAngle) * 0.6,
          y: p.position.y + 0.5 + Math.sin(p.facingAngle) * 0.6,
        },
        colorRgb: hexToRgb(spec.colorHex), intensity: spec.intensity, radius: spec.radius, ttl: 0.08,
      };
      this.activeLights.push(light);
      this.emit({ kind: 'rcLightSpawned', light });
    }
    this.emitNoise('gunshot', p.position, GUNSHOT_NOISE_RADIUS);
  }

  // v3.6 S2:R 掷枪——仅持 ranged 武器可掷(用户裁决:掷出即失去,命中 1 击击倒);掷后回到 ∞ 小刀
  private throwWeapon(): void {
    const p = this.player;
    if (p.weapon === null || WEAPON_TABLE[p.weapon].type !== 'ranged') return;
    const result = throwCurrentWeapon(p);
    if (!result || !('thrown' in result)) return;
    this.thrownWeapons.push(result.thrown);
    this.emit({ kind: 'throw', ownerId: 'player', weaponId: result.thrown.weaponId, position: { ...p.position }, velocity: { ...result.thrown.velocity } });
    this.emit({ kind: 'weaponThrown', weaponId: result.thrown.weaponId, position: { ...p.position } });
    p.weapon = 'knife'; p.ammo = Infinity; p.mode = 'melee';
  }

  // v3.6 噪音广播:推扩散环(snapshot 可视化)+ 发射 tick 瞬时听觉判定。
  // 听觉规则(S3):宽限期感知归零(B01);距离 ≤ radius;声索仅被 '#' 墙阻挡(X 掩体不挡声音)。
  private emitNoise(kind: NoiseKind, position: Vec2, radius: number): void {
    this.noises.push({ id: `noise_${(this.noiseSeq += 1)}`, position: { ...position }, radius, kind, ttl: NOISE_RING_TTL_S });
    if (this.graceRemaining > 0) return;
    for (const foe of this.enemies) {
      if (foe.hp <= 0 || foe.state !== 'patrol') continue;
      if (distanceBetween(foe.position, position) > radius) continue;
      if (!hasLineOfSight(this.tileMap, foe.position, position, 'sound')) continue;
      foe.state = 'suspicious';
      foe.awareness = 'suspicious';
      foe.lastSuspiciousPosition = { ...position };
      this.suspicionRemaining.set(foe.id, SUSPICION_DURATION_S);
      this.suspicionElapsed.set(foe.id, 0);
    }
  }

  // v3.6 S4:发现玩家 → enemyAlert 事件 + 呼叫(声索 r6,'#' 墙阻挡)——附近巡逻同伴起疑走向呼叫点
  private raiseAlert(foe: Enemy): void {
    this.emit({ kind: 'enemyAlert', enemyId: foe.id, position: { ...foe.position } });
    this.emitNoise('shout', foe.position, SHOUT_NOISE_RADIUS);
  }

  // R1:警告主人即死即清(近战 / 子弹 / 投掷三条击杀路径共用)——否则 0.55s 幽灵警告照样杀玩家
  private clearWarningIfOwner(foe: Enemy): void {
    if (this.warningEnemyId === foe.id) { this.warningEnemyId = null; this.warningRemaining = 0; }
  }

  private emit(event: SimEvent): void {
    this.events.push(event);
    this.recentEvents.push(event);
    if (this.recentEvents.length > 64) this.recentEvents.shift();
  }

  private aimsAt(target: Vec2, maxDelta: number): boolean {
    const angle = Math.atan2(target.y - this.player.position.y, target.x - this.player.position.x);
    return Math.abs(Math.atan2(Math.sin(angle - this.player.facingAngle), Math.cos(angle - this.player.facingAngle))) <= maxDelta;
  }

  private inFlashlightCone(origin: Vec2, facing: number, target: Vec2, maxDistance = 5): boolean {
    if (distanceBetween(origin, target) > maxDistance) return false;
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
    if (Math.abs(Math.atan2(Math.sin(angle - facing), Math.cos(angle - facing))) > FLASHLIGHT_CONE_ARC_DEG * Math.PI / 360) return false;
    return hasLineOfSight(this.tileMap, origin, target, 'vision');
  }

  private killPlayer(): void {
    if (this.phase !== GP.MISSION_PLAY) return;
    this.player.hp = 0;
    this.phase = GP.MISSION_DEATH;
    this.emit({ kind: 'playerKilled', position: { ...this.player.position }, cause: 'melee' });
  }

  private finishMission(): void {
    const total = Math.max(0, Math.round(100 - this.elapsed * 0.5));
    this.missionScore = { missionId: mission.id, timeSeconds: this.elapsed, pickupRate: 1, hitsTaken: this.player.hitsTaken, total, rating: total >= 90 ? 'S' : total >= 75 ? 'A' : total >= 60 ? 'B' : 'C' };
    this.phase = GP.SCORE;
    this.emit({ kind: 'roomClear', roomId: this.room.id });
    this.emit({ kind: 'missionEnd', score: this.missionScore });
  }
}

function distanceBetween(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }

// 平滑转向:角差包到 ±π 后按 maxDelta 限速逼近(巡逻掉头/扫掠跟踪用)
function turnToward(current: number, target: number, maxDelta: number): number {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + Math.max(-maxDelta, Math.min(maxDelta, delta));
}
