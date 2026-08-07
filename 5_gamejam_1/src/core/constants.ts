// core/constants.ts — 冻结调参常量（TDD v1.0 §4.4.2 逐项抄录）
// 默认值必须等于 TDD §4.4.2 数值表；修改需走契约变更流程。

// ============ 通用 ============
export const FIXED_DT = 1 / 60;
export const MAX_SIM_STEPS = 5;
export const MAX_CLAMP_DT = 0.25;
export const BOSS_MAX_HP = 100;

// ============ 轮次升级表（01 §2.2） ============
export const ROUND_TABLE = [
  { approachSpeed: 1.0, damage: 20, dodgeNormal: 0.20, dodgePerfect: 0.10, barrageMax: 1, anxietyBase: 30, seenCarry: 0 },
  { approachSpeed: 1.15, damage: 22, dodgeNormal: 0.30, dodgePerfect: 0.15, barrageMax: 2, anxietyBase: 34, seenCarry: 0.6 },
  { approachSpeed: 1.3, damage: 25, dodgeNormal: 0.40, dodgePerfect: 0.20, barrageMax: 3, anxietyBase: 38, seenCarry: 0.6 },
  { approachSpeed: 1.5, damage: 30, dodgeNormal: 0.50, dodgePerfect: 0.25, barrageMax: 3, anxietyBase: 42, seenCarry: 0.6 },
] as const;
export const MAX_ROUNDS = 4;

// ============ 焦虑来源 S01–S13（01 §3.1） ============
export const S_BASE = 30;            // S01 基线
export const S_ROUND = 4;            // S02 +4×(R−1)
export const S_SCRIPT_DIFFICULTY: Record<string, number> = { dignity: 8, tragic: 12, mad: 18 }; // S03
export const S_FIRST_GLIMPSE = 8;    // S04 首见 +8（单次）
export const S_STEADY_APPROACH = 1.4; // S05 稳步逼近 +1.4/s
export const S_HESITATE = 0.6;       // S06 犹豫 +0.6/s
export const S_BARRAGE = 12;         // S07 弹幕 +12/条
export const S_HIT = 5;              // S08 命中 +5
export const S_PERFECT_DODGE = 10;   // S09 完美闪避 +10
export const S_NORMAL_DODGE = 3;     // S10 普通闪避 +3
export const S_MISS = 2;             // S11 落空 +2
export const S_FORGOT = 6;           // S12 忘词 +6
export const S_INTERRUPT = 15;       // S13 打断 +15

// ============ 衰减与安抚 R01–R11（01 §3.3） ============
export const R_DECAY = 2;            // R01 自然 −2/s（3s 无源后）
export const R_DECAY_DELAY = 3;      // R01 无源 3s 后启动
export const R_EVALUATE = 4;         // R02 评估 −4/s（不跌破 10，最多 −40）
export const R_EVALUATE_FLOOR = 10;
export const R_EVALUATE_CAP = 40;
export const R_STAGE_DONE = 8;       // R03 阶段完成 −8
export const R_SCRIPT_DONE = 10;     // R04 全本 −10
export const R_RATING_5 = 15;        // R05 自评 5★ −15（总评 ≥4.5）
export const R_RATING_4 = 6;         // R06 4★ −6
export const R_RATING_3 = 2;         // R07 3★ −2
export const R_RATING_LOW = 4;       // R08 ≤2★ +4
export const R_DIARY_POSITIVE = 10;  // R09 日记正面 −10
export const R_DIARY_NEGATIVE = 8;   // R10 日记负面 +8
export const R_PLAYER_5STAR = 12;    // R11 玩家 5★ −12

// ============ 焦虑分带（01 §3.2） ============
export const BAND_CALM_MIN = 0;
export const BAND_NERVOUS_MIN = 31;
export const BAND_SHAKY_MIN = 61;
export const BAND_PANIC_MIN = 86;
export const BAND_EFFECTS = [
  { band: 'calm', attackSpeed: 1.0, lineRate: 1.0, power: 1.0, spread: 0, miss: 0, extra: '' },
  { band: 'nervous', attackSpeed: 0.95, lineRate: 0.9, power: 1.05, spread: 2, miss: 0.05, extra: '起手犹豫 +0.1s' },
  { band: 'shaky', attackSpeed: 0.85, lineRate: 0.65, power: 1.15, spread: 5, miss: 0.15, extra: '拔剑僵直 +0.3s' },
  { band: 'panic', attackSpeed: 0.7, lineRate: 0.4, power: 1.3, spread: 10, miss: 0.3, extra: '5% 脱手' },
] as const;
export const PANIC_DROP = 70;        // 恐慌崩溃后回落至 70
export const SWORD_DROP_CHANCE = 0.05; // 恐慌带脱手概率
export const SWORD_PICKUP_TIME = 1.2;  // 捡剑 1.2s
export const PANIC_KNEEL_TIME = 2;     // 恐慌崩溃 2s

// ============ 台词退化掷骰（01 §3.2） ============
export const DEGRADE_SHAKY_RATE = 0.35;   // shaky 每句退化 35%
export const DEGRADE_SHAKY_FORGET = 0.15; // 其中 15% 整句遗忘
export const DEGRADE_SHAKY_STAMMER = 0.20;
export const DEGRADE_PANIC_RATE = 0.6;    // panic 每句退化 60%
export const DEGRADE_PANIC_FORGET = 0.3;
export const DEGRADE_PANIC_BROKEN = 0.3;
export const SILENCE_TIME = 1.5;          // 遗忘 → 静默 1.5s
export const PANIC_FILL_CHANCE = 0.6;     // 遗忘后 60% 补 L_PANIC

// ============ 评分阈值（01 §4.1） ============
export const RATING_PERFECT = 4.5;  // 总评 ≥4.5 完美
export const RATING_QUALIFIED = 3.5; // 总评 ≥3.5 合格
export const A1_STANCE_HIT = 90;    // 站位命中 ≥90%
export const A1_JITTER = 5;         // 抖动 <5%
export const A2_COMPLETENESS = 95;  // 台词完整率 ≥95%
export const A4_SEEN_5STAR = 80;    // 被看见 ≥80 → 5★
export const COMBO_A3 = 4;          // 连击 ≥4 → A3 5★

// ============ 心态结转（01 §4.4） ============
export const CARRY_PERFECT_ANXIETY = -5;   // 完美 → 下轮起始 −5
export const CARRY_PERFECT_LINE = 0.05;    // 完美 → 完整率 +5%
export const CARRY_FAIL_ANXIETY = 4;       // 失格 → +4
export const CARRY_FAIL_SELFDOUBT = 0.3;   // 失格 → 首句 30% L_SELFDOUBT

// ============ 计时器 / 阶段（TDD §4.3） ============
export const WAIT_MIN_TIME = 8;       // Wait 最短保护 8s
export const WAIT_PICK_WINDOW = 10;   // 10–12s 倒计时
export const WAIT_MAX_TIME = 12;
export const SENSE_TRIGGER_DIST = 12; // 影子 <12m → Perform
export const PERFORM_STAGE_TIME = 30; // 每阶段 30s
export const PERFORM_MAX_TIME = 90;   // 90s 强制收尾
export const EVALUATE_COUNTDOWN = 10; // 自评表 10s 倒计时
export const DIARY_COUNTDOWN = 8;     // 日记 8s
export const HIT_RECOVER_TIME = 0.8;  // 倒地动画 0.8s
export const HAIR_TIDY_TIME = 1.5;    // 整理发型 1.5s
export const BREAK_CHARACTER_TIME = 0.5; // 出戏动画 0.5s
export const KNOCKDOWN_EARLY_END = 3; // 3 次击倒 → 提前谢幕

// ============ 打断条件（01 §5.4） ============
export const BREAK_ON_HIT = true;         // ① line beat 中玩家命中
export const BREAK_ON_BARRAGE = true;     // ② 弹幕在 line beat 中刷新
export const BREAK_ON_FORGET_TWICE = true; // ③ 同阶段内忘词 2 次
export const BREAK_FREE_TIME = 0.8;       // 剩余剧本时间 ×0.8
export const BREAK_POWER_MIN = 1.2;       // 威力随机 ×[1.2–1.6]
export const BREAK_POWER_MAX = 1.6;
export const BREAK_SPREAD_MULT = 2;       // 散射 ×2
export const BREAK_MISS_MULT = 1.5;       // 落空 ×1.5
export const BREAK_BAND_FLOOR = 61;       // 焦虑带下限提升（最低 61）

// ============ 玩家替身（01 §10 / TDD §4.4.2） ============
export const PLAYER_DODGE_PERFECT_WINDOW = 0.18; // ±0.18s 完美
export const PLAYER_DODGE_NORMAL_WINDOW = 0.35;  // ±0.35s 普通
export const PLAYER_APPROACH_MIN = 0.6;          // 犹豫 <0.9 m/s
export const PLAYER_APPROACH_STEADY = 0.9;
export const PLAYER_APPROACH_MAX = 1.5;
export const PLAYER_AGGR_WEIGHT_SPEED = 0.5;
export const PLAYER_AGGR_WEIGHT_HIT = 0.5;
export const PLAYER_LINGER_BASE = 2;   // 轮末停留基础秒数
export const BARRAGE_ACTIVE_WINDOW = 4; // 单条弹幕展示 4s
export const PLAYER_ATTACK_RATE = 0.12; // 替身攻击尝试率 次/s（≈8s 一次尝试；5 击一次击倒 ≈ 50s）
export const PLAYER_HIT_INTERVAL = 8; // 替身命中结算间隔 s（±20% 抖动；90s 演出 ≈ 11 次判定；无输入约 1 次击倒/回合，3 击倒落在 R3 中段）
export const PLAYER_HIT_CHANCES = [0.55, 0.6, 0.65, 0.7]; // 各轮次替身命中概率（R1..R4）

// ============ 被看见度（A4 / 灯光代理） ============
export const SEEN_PERFECT_ROUND = 10;  // 完美一轮 +10
export const SEEN_FREE_PLAY = 10;      // 出戏观众席阴影 +10
export const SEEN_LIGHT_FLOOR = 0.2;   // Wait 灯光 20%
export const SEEN_LIGHT_CAP = 1.0;

// ============ Stretch 门控（TDD §2.6 R06/R07） ============
export const STRETCH_FLAGS = {
  madScript: true,
  hiddenEnding: true,
  playerTyping: false,
} as const;

// ============ 性能 / 预算（TDD §3.5，供引擎引用） ============
export const MAX_PARTICLES = 128;
export const MAX_AUDIO_VOICES = 8;
export const MAX_DRAW_CALLS = 60;
export const MAX_MATERIALS = 15;
