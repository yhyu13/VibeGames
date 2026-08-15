// src/core/types.ts — 冻结类型定义(冻结契约 = TDD.md §5.1,v2)
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。

// ─── 基础类型 ───
export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export const GamePhase = {
  TITLE: 'TITLE',
  BRIEF: 'BRIEF',
  MISSION_SELECT: 'MISSION_SELECT',
  MISSION_LOADING: 'MISSION_LOADING',
  MISSION_BRIEF_IN: 'MISSION_BRIEF_IN',
  MISSION_PLAY: 'MISSION_PLAY',
  MISSION_DEATH: 'MISSION_DEATH',
  MISSION_END: 'MISSION_END',
  SCORE: 'SCORE',
  MASK_SELECT: 'MASK_SELECT',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

// ─── 武器模式(v2 新增)───
export type WeaponMode = 'melee' | 'ranged' | 'throwing';
//   'throwing' = E 长按投掷当前武器时激活(瞬时,0.25s hold)
//   空手时 LMB = 拳头(1 击);投掷唯一入口 = E 长按(v2-cut 裁决 R16)

// ─── 武器 ───
export type WeaponId =
  | 'knife'
  | 'bat'
  | 'mauser_c96'
  | 'boxer'
  | 'thompson'
  | 'mosin'
  | 'grenade'
  | 'throwing_knife';
// M2+ 扩展 ID 通过同类型字面量扩展(axe / shotgun / molotov / ...)

export type WeaponType = 'melee' | 'ranged' | 'throw';

export interface WeaponSpec {
  id: WeaponId;
  nameZh: string;
  nameEn: string;
  type: WeaponType;
  damage: number;           // 击数(1 击必杀,除 BOSS)
  ammo: number;             // 弹匣(∞ 用 Infinity)
  fireRate: number;         // 1/s
  reloadTime: number;       // 秒
  range: number;            // u
  spread: number;           // 0..1 角度标准差
  projectileSpeed?: number; // u/s(ranged 适用,默认 60)
  explosionRadius?: number; // u(throw 适用,手雷)
  silent?: boolean;         // 不触发 ENEMY_HEAR(飞刀)
}

// ─── 脸谱(弃用动物面具:戏班子出身的特务,用京剧脸谱作第二张脸)───
export type MaskId =
  | 'red_face'
  | 'black_face'
  | 'white_face'
  | 'blue_face'
  | 'green_face'
  | 'gold_face';
// M2+ 扩展 ID: painted_fox / painted_ghost / ...(仍走同类型字面量扩展)

export interface MaskSpec {
  id: MaskId;
  nameZh: string;
  nameEn: string;
  description: string;
  effect: MaskEffect;
}

export type MaskEffect =
  | { kind: 'slowMoOnRoomEnter'; slowMoDuration: number; slowMoFactor: number }
  | { kind: 'ammoRefillOnPickup' }
  | { kind: 'meleeRangeBonus'; bonus: number }
  | { kind: 'dodgeCooldownMult'; multiplier: number }
  | { kind: 'enemySenseMult'; multiplier: number }
  | { kind: 'playerSpeedMult'; multiplier: number; requiresWeapon: 'ranged' | 'melee' | 'any' }
  | { kind: 'footstepSilent' };
// M2+ 新 kind(如 killSpeedMult / dropRateMult / hiddenReveal)必须走 [TDD-CONTRACT-CHANGE]

// ─── 实体 ───
export interface Player {
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;       // 弧度
  hp: number;                // 1(等于一击毙命)
  ammo: number;
  reloading: number;         // 0..reloadTime
  weapon: WeaponId | null;   // null = 空手(拳头)
  mode: WeaponMode;          // v2:当前模式(melee / ranged)
  modeSwitchTimer: number;   // v2:0..MODE_SWITCH_DURATION(切换硬直)
  activeMask: MaskId | null;
  dodgeTimer: number;        // 0..PLAYER_DODGE_INVULN
  dodgeCooldown: number;     // 0..PLAYER_DODGE_COOLDOWN
  dashTimer: number;
  dashCooldown: number;
  kills: number;             // 本任务
  hitsTaken: number;         // 本任务
}

export type EnemyArchetype = 'soldier' | 'policeman' | 'spy' | 'flashlight_patrol' | 'boss';

export interface Enemy {
  id: string;
  archetype: EnemyArchetype;
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;
  hp: number;                // boss=3, 其他=1
  state: 'patrol' | 'suspicious' | 'alert' | 'engaging';
  awareness: 'none' | 'suspicious' | 'detected';
  lastSuspiciousPosition: Vec2 | null;
  role: 'ground_patrol' | 'tower_guard';
  patrolAxis: 'horizontal' | 'vertical' | 'static';
  patrolLength: number;
  weapon: WeaponId;          // 简化:都是单发手枪
  patrolTarget: Vec2 | null; // patrol 时随机选
  lastSeenPlayerAt: Vec2 | null;
  alertTimer: number;
  fireCooldown: number;
}

export interface Bullet {
  id: string;
  ownerId: 'player' | string;  // 'player' 或 enemy.id
  position: Vec2;
  velocity: Vec2;
  damage: number;
  weaponId: WeaponId;
  ttl: number;               // 秒
}

export interface MeleeSwing {
  ownerId: 'player' | string;
  position: Vec2;
  facingAngle: number;
  range: number;
  arcDeg: number;
  ttl: number;
  damage: number;
  weaponId: WeaponId;
}

export interface Grenade {
  id: string;
  position: Vec2;
  velocity: Vec2;
  timer: number;             // 1.5s 后爆
  radius: number;
  damage: number;
}

export interface ThrownWeapon {   // v2:E 长按投掷的武器(地上弹跳物,可被捡回)
  id: string;
  weaponId: WeaponId;
  position: Vec2;
  velocity: Vec2;
  spin: number;              // 渲染旋转
  ttl: number;
}

// ─── 房间 ───
export type TileChar = '.' | '#' | 'D' | 'L' | 'N' | 'S' | 'X';
//   '.' = 地板  '#' = 墙    'D' = 门    'L' = 油灯  'N' = 霓虹  'S' = 探照灯   'X' = 静态掩体

// v1.1 新增:家具 + 墙图案(对照 HM 标志家具集)
export type FurnitureKind =
  | 'sofa' | 'round_table' | 'bed' | 'bookshelf' | 'plant'
  | 'fridge' | 'tea_table' | 'mahjong_table' | 'neon_sign'
  | 'oil_lamp' | 'searchlight' | 'sandbag';

export type WallPattern = 'red_brick' | 'blue_block' | 'plaster_white' | 'wood_dark' | 'tile_blue';

export interface FurniturePlacement {
  tile: Vec2;
  kind: FurnitureKind;
  size?: Vec2; // 默认 1×1,床 = 2×3 等
}

export interface DecorativeLight {
  tile: Vec2;
  kind: 'oil_lamp' | 'neon_sign' | 'searchlight' | 'surgical' | 'disco';
}

export interface EnemySpawn {
  position: Vec2;
  archetype?: EnemyArchetype;
  role?: 'ground_patrol' | 'tower_guard';
  patrolAxis?: 'horizontal' | 'vertical' | 'static';
  patrolLength?: number;
  facingAngle?: number;
}

export interface RoomLayout {
  id: string;
  nameZh: string;
  width: number;             // tile
  height: number;            // tile
  tileSize: number;          // u/tile,默认 1
  tiles: string[];           // 每行一字符串
  playerSpawn: Vec2;         // tile coords
  enemySpawns: EnemySpawn[];
  weaponSpawns: { tile: Vec2; weaponId: WeaponId }[];
  maskSpawns: { tile: Vec2; maskId: MaskId }[];
  reinforcementSpawns?: EnemySpawn[];  // 亮处击杀警报增援的刷入点(默认空;无则退化到出口/出生点)
  exitTile: Vec2 | null;
  // v1.1 新增(可选,旧 missions.ts 数据不强制):条带地板 + 墙图案 + 家具表 + 静态灯位表
  // M1 之后必须全部填写;PixelRenderer 根据这些字段画"条带"和"砖块墙"
  floorPalette?: string[];        // 2-3 个 hex,每 STRIPE_HEIGHT u 横条切换
  wallPattern?: WallPattern;      // 墙用哪种砖块/材质图案
  furniture?: FurniturePlacement[];
  decorativeLights?: DecorativeLight[];
}

export interface Mission {
  id: string;
  nameZh: string;
  rooms: RoomLayout[];
  finalBossId: string;       // 对应某个 enemy.id
  brief: string;             // 打字机文本
  ratingS: number;           // 分
  ratingA: number;
  ratingB: number;
}

// ─── 评分 ───
export type Rating = 'S' | 'A' | 'B' | 'C';

export interface MissionScore {
  missionId: string;
  timeSeconds: number;
  pickupRate: number;        // 0..1
  hitsTaken: number;
  total: number;             // 0..100
  rating: Rating;
}

// ─── RC 光源 ───
export type RcLightKind =
  | 'muzzle_flash'
  | 'explosion'
  | 'oil_lamp'
  | 'neon_sign'
  | 'searchlight'
  | 'surgical'
  | 'disco'
  | 'blood_splash';

export interface RcLightSpec {
  kind: RcLightKind;
  colorHex: string;          // '#rrggbb'
  intensity: number;         // 0..N
  radius: number;            // u
  ttl?: number;              // 秒,静态光源不设
  pulse?: 'sine' | 'rotate' | null;  // 静态光源可选脉动 / 旋转
  pulseHz?: number;
  breakable?: boolean;
  hp?: number;
}

export type LightSourceState = 'intact' | 'damaged' | 'flickering' | 'dead';

export interface LightSource {
  id: string;
  kind: 'oil_lamp' | 'neon_sign' | 'searchlight' | 'surgical' | 'disco' | 'temporary';
  position: Vec2;
  state: LightSourceState;
  hp: number;
  intensity: number;
  breakable: boolean;
  invalidated: boolean;
}

export interface ActiveRcLight {
  id: string;
  kind: RcLightKind;
  position: Vec2;
  colorRgb: { r: number; g: number; b: number };
  intensity: number;
  radius: number;
  ttl: number;               // 剩余 TTL(秒),静态 = Infinity
}

// ─── 事件(模拟 → 引擎 / UI)───
/** 玩家死亡原因(06 §7 P4:由最后命中来源写入,DeathScreen 按此渲染文案) */
export type DeathCause = 'bullet' | 'melee' | 'grenade' | 'unknown';

export type SimEvent =
  | { kind: 'fire'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'melee'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'throw'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; velocity: Vec2 }
  | { kind: 'explosion'; position: Vec2; radius: number; damage: number }
  | { kind: 'enemyKilled'; enemyId: string; position: Vec2 }
  | { kind: 'attackBlocked'; enemyId: string; position: Vec2 }
  | { kind: 'detectionWarning'; enemyId: string; position: Vec2; secondsRemaining: number }
  | { kind: 'playerKilled'; position: Vec2; cause: DeathCause }
  | { kind: 'weaponPicked'; weaponId: WeaponId }
  | { kind: 'maskPicked'; maskId: MaskId }
  | { kind: 'modeSwitch'; to: WeaponMode }          // v2 新增:F 切换
  | { kind: 'weaponThrown'; weaponId: WeaponId; position: Vec2 } // v2 新增:E 长按投掷
  | { kind: 'enemyAlert'; enemyId: string; position: Vec2 }
  | { kind: 'enemyAttack'; enemyId: string; position: Vec2 }
  | { kind: 'rcLightSpawned'; light: ActiveRcLight }
  | { kind: 'rcLightExpired'; lightId: string }
  | { kind: 'lightSmash'; lightId: string; position: Vec2; hp: number; state: LightSourceState; cause: 'melee' | 'throw' | 'weapon' }
  | { kind: 'invalidateLight'; lightId: string; position: Vec2 }
  | { kind: 'roomEnter'; roomId: string }
  | { kind: 'roomClear'; roomId: string }
  | { kind: 'missionEnd'; score: MissionScore }
  | { kind: 'sfx'; recipeId: string; volume?: number }
  | { kind: 'phaseChanged'; from: GamePhase; to: GamePhase };

// ─── 持久化 ───
export interface PersistedStats {
  totalMissions: number;
  bestScoreByMission: Record<string, number>;
  bestRatingByMission: Record<string, Rating>;
  lastMissionAt: number;       // unix ms
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;              // 0..1
  rcQuality: 'low' | 'med' | 'high';
}

export interface PersistedUnlocks {
  masks: MaskId[];
  missions: MissionId[];
}

export type MissionId = 'm1_workshop' | 'm2_teahouse' | 'm3_print' | 'm4_postman';

// ─── 输入(v2 增补 toggleMode / throwWeapon;v3.6 增补 fireStart)───
export type PlayerInput =
  | { kind: 'move'; dir: Vec2; speedMode: 'walk' | 'sprint' }
  | { kind: 'aim'; angle: number }
  | { kind: 'fireStart' }            // v3.6:LMB 按下(射击;仅持枪 ranged 时生效)
  | { kind: 'attackStart' }          // v3.6 起 = RMB 按下(近战挥击,灯优先)
  | { kind: 'attackEnd' }
  | { kind: 'toggleMode' }           // F:切换近战 / 远程(v2)
  | { kind: 'interactStart' }        // E 按下(v2:拾取 / 开门)
  | { kind: 'throwStart' }           // v3.6 起 = R 按下(掷出当前武器)
  | { kind: 'throwEnd' }
  | { kind: 'dash' }
  | { kind: 'dodge' }
  | { kind: 'reload' }
  | { kind: 'pause' }
  | { kind: 'quitToTitle' };

// ─── 噪音刺激(v3.6 广播系统):发射 tick 瞬时完成听觉判定;snapshot 仅用于扩散环可视化 ───
export type NoiseKind = 'gunshot' | 'lamp_smash' | 'footsteps' | 'clatter' | 'shout';
export interface NoiseStimulus { id: string; position: Vec2; radius: number; kind: NoiseKind; ttl: number }

// ─── Simulation 接口 ───
export interface ISimulation {
  readonly phase: GamePhase;
  step(dt: number): void;
  input(action: PlayerInput): void;
  snapshot(): SimSnapshot;
  events: SimEvent[];          // 最近 N 个
}

export interface SimSnapshot {
  phase: GamePhase;
  /** B04:Tab 暂停状态(引擎/UI 覆盖层读取) */
  paused: boolean;
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[];
  melee: MeleeSwing[];
  grenades: Grenade[];
  thrownWeapons: ThrownWeapon[];   // v2 新增
  noises: NoiseStimulus[];         // v3.6:存活中的噪音刺激(扩散环可视化;听觉判定在发射 tick 完成)
  activeLights: ActiveRcLight[];
  lightSources: LightSource[];
  currentRoom: RoomLayout | null;
  currentMission: Mission | null;
  missionScore: MissionScore | null;
  elapsedSeconds: number;
  spawnGraceRemaining: number;
  detectionWarningRemaining: number;
  lampsDestroyed: number;
  objective: 'find_lamp' | 'break_lamp' | 'kill_enemy' | 'escape';
  exitActive: boolean;
  awareness: 'none' | 'suspicious' | 'detected';
  lastSuspiciousPosition: Vec2 | null;
  weaponSpawns: { tile: Vec2; weaponId: WeaponId }[];  // B66:剩余可拾取武器(HUD 提示)
  lights: Record<RcLightKind, RcLightSpec>;
}
