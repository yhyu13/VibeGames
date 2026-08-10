import { BREAKABLE_LIGHT_HP, BULLET_HIT_RADIUS, CLATTER_NOISE_RADIUS, DETECTION_MEMORY_S, DETECTION_WARNING_S, EXIT_REACH_RADIUS, FLASHLIGHT_CONE_ARC_DEG, FLASHLIGHT_SWEEP_AMPLITUDE_DEG, FLASHLIGHT_SWEEP_HZ, FOOTSTEP_INTERVAL_S, FOOTSTEP_NOISE_RADIUS, GUNSHOT_NOISE_RADIUS, INTRO_START_AMMO, LAMP_SMASH_NOISE_RADIUS, LIGHT_POOL_DOWN_S, NOISE_RING_TTL_S, PATROL_LANE_LENGTH, PATROL_SPEED, PLAYER_MELEE_FAN_ARC_DEG, PLAYER_MELEE_DURATION, PLAYER_MELEE_POINT_BLANK, PLAYER_MELEE_RANGE, PLAYER_MELEE_TARGET_RADIUS, PLAYER_SPEED_MAX, PLAYER_WALK_SPEED, RC_MAX_ACTIVE_LIGHTS, ROOM_START_GRACE_S, SHOUT_NOISE_RADIUS, SUSPICION_DURATION_S, SUSPICION_PROMOTE_S, THROWN_HIT_RADIUS, THROWN_REST_SPEED_EPS, VISION_FAR_DISTANCE, VISION_NEAR_DISTANCE } from '../constants';
import { createEnemy } from '../data/enemies';
import { RC_LIGHT_TABLE } from '../data/lights';
import { MISSIONS } from '../data/missions';
import { WEAPON_TABLE } from '../data/weapons';
import { tokenizeRoom } from '../world/roomTokenizer';
import { buildTileMap, worldToTile } from '../world/tileMap';
import { hasLineOfSight } from '../world/lineOfSight';
import { damageEnemy, lightSmash } from './damage';
import { playerAttack, throwCurrentWeapon, updateThrownWeapons } from './weapons';
import { GamePhase as GP } from '../types';
import type { ActiveRcLight, Enemy, GamePhase, ISimulation, LightSource, NoiseKind, NoiseStimulus, Player, PlayerInput, RoomLayout, SimEvent, SimSnapshot, ThrownWeapon, Vec2 } from '../types';

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
  private enemies = this.room.enemySpawns.map((spawn, i) => createEnemy('flashlight_patrol', `patrol_${i + 1}`, spawn));
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
    this.enemies = this.room.enemySpawns.map((spawn, i) => createEnemy('flashlight_patrol', `patrol_${i + 1}`, spawn));
    this.patrolLanes.clear(); this.patrolProgress.clear(); this.suspicionRemaining.clear(); this.suspicionElapsed.clear();
    this.enemies.forEach((foe, i) => this.patrolLanes.set(foe.id, { x0: this.room.enemySpawns[i].x, y: this.room.enemySpawns[i].y }));
    this.lightSources = buildLightSources(this.room);
    this.activeLights = this.lightSources.map(asActiveLight);
    this.invalidationTimer = -1;
    this.melee = [];
    this.graceRemaining = ROOM_START_GRACE_S;
    this.warningRemaining = 0;
    this.warningEnemyId = null;
    this.detectionMemory = 0;
    this.playerFireCooldown = 0; this.bullets = []; this.thrownWeapons = []; this.noises = []; this.clatteredThrown.clear(); this.footstepTimer = 0;
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
    this.player.position.x = Math.max(1.45, Math.min(this.room.width - 1.45, this.player.position.x + vx * dt));
    this.player.position.y = Math.max(1.45, Math.min(this.room.height - 1.45, this.player.position.y + vy * dt));
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
          if (damageEnemy(foe, b.damage, 'weapon')) {
            this.player.kills++; foe.velocity = { x: 0, y: 0 };
            this.clearWarningIfOwner(foe);
            this.emit({ kind: 'enemyKilled', enemyId: foe.id, position: { ...foe.position } });
          }
          dead = true; break;
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
            if (damageEnemy(foe, 1, 'throw')) {
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
      if (foe.state === 'patrol') {
        // v3.5 巡逻:朝向 = 行进方向 + 手电扫掠叠加,端点平滑掉头(≤6 rad/s,取代旧版
        // 永远朝下扫的"横滑"假巡逻);suspicious/alert 驻足或查看——边滑边瞪读作"没做巡逻"
        let lane = this.patrolLanes.get(foe.id);
        if (!lane) { lane = { x0: foe.position.x, y: foe.position.y }; this.patrolLanes.set(foe.id, lane); } // 兜底:运行时注入的敌人以当前位置为锚,只注册一次
        const progress = ((this.patrolProgress.get(foe.id) ?? 0) + PATROL_SPEED * dt) % (PATROL_LANE_LENGTH * 2);
        this.patrolProgress.set(foe.id, progress);
        const patrolX = progress <= PATROL_LANE_LENGTH ? lane.x0 + progress : lane.x0 + PATROL_LANE_LENGTH * 2 - progress;
        foe.velocity = { x: (patrolX - foe.position.x) / Math.max(dt, 1 / 60), y: 0 };
        foe.position.x = patrolX;
        foe.position.y = lane.y;
        const forward = progress <= PATROL_LANE_LENGTH ? 0 : Math.PI;
        const sweep = Math.sin(this.elapsed * Math.PI * 2 * FLASHLIGHT_SWEEP_HZ) * FLASHLIGHT_SWEEP_AMPLITUDE_DEG * Math.PI / 180;
        foe.facingAngle = turnToward(foe.facingAngle, forward + sweep, 6 * dt);
      } else if (foe.state === 'suspicious' && foe.lastSuspiciousPosition) {
        // v3.6 S4:起疑查看——走向最后疑点(PATROL_SPEED),到位 <0.3u 驻足凝视
        const to = foe.lastSuspiciousPosition;
        const d = distanceBetween(foe.position, to);
        if (d > 0.3) {
          foe.velocity = { x: ((to.x - foe.position.x) / d) * PATROL_SPEED, y: ((to.y - foe.position.y) / d) * PATROL_SPEED };
          foe.position.x = Math.max(1.2, Math.min(this.room.width - 1.2, foe.position.x + foe.velocity.x * dt));
          foe.position.y = Math.max(1.2, Math.min(this.room.height - 1.2, foe.position.y + foe.velocity.y * dt));
        } else {
          foe.velocity = { x: 0, y: 0 };
        }
        foe.facingAngle = Math.atan2(to.y - foe.position.y, to.x - foe.position.x);
      } else {
        foe.velocity = { x: 0, y: 0 };
      }
      const distance = distanceBetween(foe.position, this.player.position);
      const inCone = this.graceRemaining <= 0 && this.inFlashlightCone(foe.position, foe.facingAngle, this.player.position);
      const near = distance <= VISION_NEAR_DISTANCE && inCone;
      const farSprint = distance > VISION_NEAR_DISTANCE && distance <= VISION_FAR_DISTANCE && inCone && sprinting;
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
      const ownerInCone = this.graceRemaining <= 0 && this.inFlashlightCone(owner.position, owner.facingAngle, this.player.position);
      const ownerNear = distanceBetween(owner.position, this.player.position) <= VISION_NEAR_DISTANCE && ownerInCone;
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
  }

  snapshot(): SimSnapshot {
    return {
      phase: this.phase, paused: false, player: { ...this.player, position: { ...this.player.position }, velocity: { ...this.player.velocity } },
      enemies: this.enemies.map((e) => ({ ...e, position: { ...e.position }, velocity: { ...e.velocity } })),
      bullets: this.bullets.map((b) => ({ ...b, position: { ...b.position }, velocity: { ...b.velocity } })),
      melee: this.melee.map((s) => ({ ...s, position: { ...s.position } })), grenades: [],
      thrownWeapons: this.thrownWeapons.map((t) => ({ ...t, position: { ...t.position }, velocity: { ...t.velocity } })),
      noises: this.noises.map((n) => ({ ...n, position: { ...n.position } })),
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
    if (lamp.state === 'dead' && this.invalidationTimer < 0 && !lamp.invalidated) this.invalidationTimer = LIGHT_POOL_DOWN_S;
    if (result.hit) return;
    // v3.6 S4:近战取触及范围内第一个活敌(单敌行为不变)
    const enemy = this.enemies.find((e) => e.hp > 0 && this.meleeReach(e.position));
    if (!enemy) return;
    if (!lamp.invalidated) {
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
        position: { x: p.position.x + Math.cos(p.facingAngle) * 0.6, y: p.position.y + Math.sin(p.facingAngle) * 0.6 },
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

  private inFlashlightCone(origin: Vec2, facing: number, target: Vec2): boolean {
    if (distanceBetween(origin, target) > 5) return false;
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
    if (Math.abs(Math.atan2(Math.sin(angle - facing), Math.cos(angle - facing))) > FLASHLIGHT_CONE_ARC_DEG * Math.PI / 360) return false;
    // v3.6 S3:视觉不再穿墙——'#' 墙与 'X' 掩体都挡视线
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
