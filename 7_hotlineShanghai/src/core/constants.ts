// src/core/constants.ts — 冻结常量(冻结契约 = TDD.md §5.2,数值表 = §4.4,v2)
//
// 全部为 UPPER_SNAKE。绝对不要写魔法数 — 任何数值必须先在这里登记。

// ─── 玩家(§4.4.1)───
export const PLAYER_SPEED_MAX = 8;
export const PLAYER_ACCEL = 60;
export const PLAYER_DECEL = 80;
// v1.1: viewport 改为 32u × 18u(1080p 下每个 tile 渲染 60 像素,匹配 HM 真机比例)
export const PLAYER_BOUND_X: [number, number] = [-16, 16];
export const PLAYER_BOUND_Y: [number, number] = [-9, 9];
export const PLAYER_RADIUS = 0.5;
export const PLAYER_MELEE_RANGE = 1.4;
export const PLAYER_MELEE_ARC_DEG = 60;
export const PLAYER_MELEE_DURATION = 0.2;
export const PLAYER_DASH_SPEED = 14;
export const PLAYER_DASH_DURATION = 0.2;
export const PLAYER_DASH_COOLDOWN = 1.0;
export const PLAYER_DODGE_INVULN = 0.4;
export const PLAYER_DODGE_COOLDOWN = 1.5;
export const PLAYER_RELOAD_DURATION = 1.5;
export const PLAYER_HITS_TO_KILL_BOSS = 3;
// v2:模式切换硬直(F 收放武器)/ E 长按投掷阈值(R13 / R14)
// v3 V5 / C6(2026-08-09):F 切换硬直定稿为 0s(瞬时切换,节奏靠音效)。
export const MODE_SWITCH_DURATION = 0;
export const THROW_HOLD_DURATION = 0.25;
// B23:投掷物落地后不可被自动/交互拾取的时长(s)。否则投掷物生成在玩家脚边,
// 下一 tick 自动拾取半径 1.5u 立刻捡回 → 投掷 = 原地变戏法。
export const THROWN_PICKUP_DELAY_S = 0.5;

// ─── 武器(§4.4.2)— 完整数据在 core/data/weapons.ts ───
// WEAPON_TABLE: Record<WeaponId, WeaponSpec>,v1 锁 8 件。
// 扩展路线(§4.4.2b,M2+ 里程碑,非 v1 冻结;签名同 §4.4.2):
//   M2: axe / stiletto(melee)、shotgun / revolver(ranged)、molotov / cleaver(throw)
//   M3: bayonet / nunchaku / brick、browning / sniper / flare_gun
//   M4+: 其余至 35 件;每件必须差异手感,禁止纯数值换皮。

// ─── 面具(§4.4.3)— 完整数据在 core/data/masks.ts ───
// MASK_TABLE: Record<MaskId, MaskSpec>,v1 锁 6 个。
// 扩展路线(§4.4.3b,M2+ 里程碑,非 v1 冻结;签名同 §4.4.3):
//   M2: tiger / pig / owl   M3: fox / wolf / horse   M4+: 其余至 25 个;
//   新增 MaskEffect kind 需走 [TDD-CONTRACT-CHANGE]。

// ─── 敌人(§4.4.4)───
export const ENEMY_VIEW_DISTANCE = 8;
export const ENEMY_VIEW_ARC_DEG = 60;
export const ENEMY_HEAR_DISTANCE = 4;
export const ENEMY_FIRE_DISTANCE = 14;
export const ENEMY_SPEED_PATROL = 3;
export const ENEMY_SPEED_ALERT = 5;
export const ENEMY_REACT_TIME = 0.4;
export const ENEMY_FIRE_RATE = 1.5;
export const ENEMY_HITS_TO_KILL = 1;
export const BOSS_HITS = 3;

// ─── 光暗机制(2026-08-09 v3.1;TDD §4.4.1 + 09 §2)───
export const LIGHT_SHIELD_THRESHOLD = 0.3;      // lightAt(enemy) > 0.30 → 光下无敌
export const LIGHT_EXPOSED_THRESHOLD = 0.1;     // lightAt(player) > 0.10 → 暴露(≤0.10 暗中隐身)
export const LIGHT_SOURCE_OFF_THRESHOLD = 0.5;  // 灯自身强度 < 0.5 视为熄灭(deadLight)
export const BREAKABLE_LIGHT_HP = 2;            // 可拆灯 HP(印刷间硬灯在房间布局 override 为 3)
export const BREAKABLE_LIGHT_DAMAGE_MELEE = 1;
export const BREAKABLE_LIGHT_DAMAGE_THROW = 1;
export const LIGHT_POOL_DOWN_S = 0.1;           // 灯碎 → 敌人转"暗中可杀"的延迟(视觉确认窗口)
export const LAMP_FLICKER_HZ = 12;
export const LAMP_FLICKER_AMP_MIN = 0.4;
export const LAMP_FLICKER_AMP_MAX = 0.6;
export const FLASH_RADIUS = 0.4;                // lampmaker 闪灯:脚下临时光池半径
export const FLASH_DURATION = 0.5;
export const FORTUNETELLER_FAKE_LIGHT = 1;      // 假灯数量(每房间 1)
export const FORTUNETELLER_DARKNESS_S = 0.3;    // 揭示瞬间全房灯熄时长
export const SHADOW_SHOT_MISS = true;           // 玩家暗中 → 敌弹 100% 落空
export const ENEMY_AIM_TELEGRAPH_S = 0.4;       // 敌人开火前瞄准提示(HM "!")
export const AIMFOCUS_PUSH_DIST = 0.4;          // Shift 长按冻结瞄准 + 相机沿瞄准线轻推
export const LMB_LIGHT_PRIORITY_RANGE = 2.0;    // aimTarget 距离 ≤2u 且为灯 → 拆灯优先于打人
export const FLASHLIGHT_CONE_ARC_DEG = 50;      // flashlight_patrol RC 灯锥锥角
export const FLASHLIGHT_SWEEP_HZ = 0.6;         // 灯锥扫速
export const FLASHLIGHT_SWEEP_AMPLITUDE_DEG = 22;
export const PATROL_SPEED = 0.8;
export const DETECTION_MEMORY_S = 0.25;
export const DETECTION_WARNING_S = 0.55;
export const ENEMY_INVULN_WHILE_LIT = true;     // 光下无敌(受光护甲)

// ─── 任务 / 房间(§4.4.5)───
export const MISSION_DURATION_TARGET = 180;
export const ROOM_ENTER_FADE = 1.0;
// B01:房间进入 play 后的敌人感知宽限期(秒)。期间敌人视野/听觉归零,
// 只巡逻不开火,保证玩家在出生点有基本反应时间(教学房不可"出生即死")。
export const ROOM_START_GRACE_S = 1.0;
export const ROOM_CLEAR_DELAY = 0.8;
export const ROOM_EXIT_FADE = 0.5;
// B03:清房后玩家须走到出口门(D tile 中心)此半径内才触发切房(u)
export const EXIT_REACH_RADIUS = 1.2;
export const VISION_NEAR_DISTANCE = 2.5;
export const VISION_FAR_DISTANCE = 8;
export const PLAYER_WALK_SPEED = 3.2;
export const SUSPICION_DURATION_S = 1.0;
export const SUSPICION_PROMOTE_S = 1.5;
export const DEATH_RESPAWN_DELAY = 1.2;
export const BRIEF_TYPEWRITER_SPEED = 0.04;
export const TASKS_TOTAL = 4;
export const HIDDEN_TASK_REQUIRED_S = 3;
export const SCORE_S_THRESHOLD = 90;
export const SCORE_A_THRESHOLD = 75;
export const SCORE_B_THRESHOLD = 60;
export const SCORE_C_THRESHOLD = 0;

// ─── RC 管线(§4.4.6)— v2 按 radiance-cascades-demo 真实算法 ───
export const RC_CASCADE_COUNT = 3;
export const RC_BASE_RAY_COUNT = 4;
export const RC_BASE_INTERVAL_PX = 0.5;
export const RC_JFA_PASSES = -1;     // -1 = 运行时按 log2(min(W,H)) 计算(1080p≈10-11,R15)
export const RC_JFA_RESOLUTION_SCALE = 1.0;
export const RC_LIGHT_RADIUS_FALLOFF = 'inverse-square';
export const RC_LIGHT_INTENSITY_GAMMA = 2.2;
export const RC_MAX_ACTIVE_LIGHTS = 16;
export const RC_HALF_RES_SCALE = 0.5;
export const RC_DITHER_MATRIX_SIZE = 4;   // 4×4 Bayer
export const RC_RAY_BUDGET_PER_PIXEL = 16;
export const RC_RAY_BUDGET_TOTAL_HARD_CAP = 64;
export const RC_MAX_RAY_STEPS = 128;      // demo rc.frag 常量
export const RC_EPS = 0.0005;             // demo rc.frag 常量
export const RC_PROPAGATION_RATE = 0.85;  // demo uPropagationRate(光传播衰减)
export const RC_MIX_FACTOR = 0.5;         // demo uMixFactor(scene / 上一帧光混合比)
// 06-rendering-readability §2 F3:加法合成(修 S3 全黑)——radiance 只携带光贡献
// §7 P1 亮度定档(2026-08-08 实机扫描):0.2×1.0 = 地板/墙/门可辨 + 油灯暖光可见;
// 0.3 起被同心环光斑冲刷成米色糊(墙/地对比 <1.1×),0.4 起全白过曝。
export const RC_LIGHT_SCALE = 1.35;       // final.frag uLightScale(加法合成光增益,0..4;B28 定档)
export const RC_AMBIENT_INTENSITY = 0.12;  // rc.frag uAmbientIntensity(环境光强度,0..2;B28 去伪光后重新定档)
export const RC_PERF_DEGRADE_FRAMES = 3;
export const RC_RECOVERY_FRAMES = 120;

// ─── RC 光源(§4.4.7)— 完整数据在 core/data/lights.ts ───
// RC_LIGHT_TABLE: Record<RcLightKind, RcLightSpec>,8 类(muzzle_flash / explosion /
// oil_lamp / neon_sign / searchlight / surgical / disco / blood_splash)。

// ─── 主循环(§4.2)───
export const FIXED_DT = 1 / 60;
export const MAX_FRAME_ACCUM = 5;
export const STORE_SYNC_INTERVAL = 2;

// ─── 调色板 v2(§4.4.8,v1.1 推更 saturated,对照 HM 真机)───
export const PAL_INK = '#0a0910';
export const PAL_PLASTER = '#2a2638';
export const PAL_RUST = '#7a2a1c';
export const PAL_TEAL = '#1a5a5a';
export const PAL_LANTERN = '#e54a1a';
export const PAL_NEON = '#ff2a44';
export const PAL_PAPER = '#e8dca0';
export const PAL_IVORY = '#f5e6b8';
export const PAL_JADE = '#2a9a6a';
export const PAL_STEEL = '#4a4a52';
export const PAL_MUZZLE = '#ffaa3a';
export const PAL_BLOOD = '#d8201a';

// ─── HM-借鉴色(v1.1 新增,用于条带地板 + 强色块 + 砖块墙)───
export const PAL_STRIPE_PURPLE = '#6a3a8a';
export const PAL_STRIPE_TEAL = '#2a8a7a';
export const PAL_STRIPE_PINK = '#c84a7a';
export const PAL_WALL_RED_BRICK = '#8a3a2a';
export const PAL_WALL_BLUE_BLOCK = '#3a5a8a';
export const PAL_WALL_PLASTER_W = '#c8b896';
export const PAL_FLOOR_PLASTER = '#5a5048';
export const PAL_FLOOR_WOOD = '#6a4a2a';
export const PAL_EXTERIOR_GRAY = '#4a4a5a';
export const PAL_NEON_CYAN = '#2a9aff';

// ─── viewport(v1.1 新增,匹配 HM 真机比例)───
export const VIEWPORT_W = 32;
export const VIEWPORT_H = 18;
export const TILE_PIXELS = 60;     // 渲染时每 tile = 60 像素(1920 / 32)
export const STRIPE_HEIGHT = 2;    // 条带地板每 2u 切换一次颜色

// ─── 家具类型(v1.1 新增,对应 HM 标志家具集)───
export type FurnitureKind =
  | 'sofa' | 'round_table' | 'bed' | 'bookshelf' | 'plant'
  | 'fridge' | 'tea_table' | 'mahjong_table' | 'neon_sign'
  | 'oil_lamp' | 'searchlight' | 'sandbag';
export const FURNITURE_SOLID: ReadonlySet<FurnitureKind> = new Set([
  'sofa', 'round_table', 'bed', 'bookshelf', 'fridge',
  'tea_table', 'mahjong_table', 'sandbag',
]);
// 'plant' / 'neon_sign' / 'oil_lamp' / 'searchlight' = 半透 / 装饰 / 灯位(不挡子弹)
