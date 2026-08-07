// core/constants.ts — V2 调参常量（承接 v1 已验证手感 + V2 增强参数）

// ============ 通用 ============
export const FIXED_DT = 1 / 60;
export const MAX_SIM_STEPS = 5;
export const MAX_CLAMP_DT = 0.25;
export const BOSS_MAX_HP = 100;

// ============ 轮次升级表（R1..R4） ============
export const ROUND_TABLE = [
  { approachSpeed: 1.0, damage: 20, dodgeNormal: 0.2, dodgePerfect: 0.1, barrageMax: 1, anxietyBase: 30, seenCarry: 0, windowScale: 1.0, targetCount: 3 },
  { approachSpeed: 1.15, damage: 22, dodgeNormal: 0.3, dodgePerfect: 0.15, barrageMax: 2, anxietyBase: 34, seenCarry: 0.6, windowScale: 0.92, targetCount: 5 },
  { approachSpeed: 1.3, damage: 25, dodgeNormal: 0.4, dodgePerfect: 0.2, barrageMax: 3, anxietyBase: 38, seenCarry: 0.6, windowScale: 0.84, targetCount: 7 },
  { approachSpeed: 1.5, damage: 30, dodgeNormal: 0.5, dodgePerfect: 0.25, barrageMax: 3, anxietyBase: 42, seenCarry: 0.6, windowScale: 0.76, targetCount: 9 },
] as const;
export const MAX_ROUNDS = 4;

// ============ 焦虑来源 S01–S13 ============
export const S_BASE = 30;
export const S_ROUND = 4;
export const S_SCRIPT_DIFFICULTY: Record<string, number> = { dignity: 8, tragic: 12, mad: 18 };
export const S_FIRST_GLIMPSE = 8;
export const S_STEADY_APPROACH = 1.4;
export const S_HESITATE = 0.6;
export const S_BARRAGE = 12;
export const S_HIT = 5;
export const S_PERFECT_DODGE = 10;
export const S_NORMAL_DODGE = 3;
export const S_MISS = 2;
export const S_FORGOT = 6;
export const S_INTERRUPT = 15;

// ============ 衰减与安抚 R01–R11 ============
export const R_DECAY = 2;
export const R_DECAY_DELAY = 3;
export const R_EVALUATE = 4;
export const R_EVALUATE_FLOOR = 10;
export const R_EVALUATE_CAP = 40;
export const R_STAGE_DONE = 8;
export const R_SCRIPT_DONE = 10;
export const R_RATING_5 = 15;
export const R_RATING_4 = 6;
export const R_RATING_3 = 2;
export const R_RATING_LOW = 4;
export const R_DIARY_POSITIVE = 10;
export const R_DIARY_NEGATIVE = 8;
export const R_PLAYER_5STAR = 12;
export const R_PERFECT_HIT = 1;       // V2：完美命中小幅安抚

// ============ 焦虑分带 ============
export const BAND_CALM_MIN = 0;
export const BAND_NERVOUS_MIN = 31;
export const BAND_SHAKY_MIN = 61;
export const BAND_PANIC_MIN = 86;
export const BAND_EFFECTS = [
  { band: 'calm', attackSpeed: 1.0, lineRate: 1.0, power: 1.0, spread: 0, miss: 0, extra: '' },
  { band: 'nervous', attackSpeed: 0.95, lineRate: 0.9, power: 1.05, spread: 2, miss: 0.05, extra: '起手犹豫' },
  { band: 'shaky', attackSpeed: 0.85, lineRate: 0.65, power: 1.15, spread: 5, miss: 0.15, extra: '手抖' },
  { band: 'panic', attackSpeed: 0.7, lineRate: 0.4, power: 1.3, spread: 10, miss: 0.3, extra: '恐慌' },
] as const;
export const PANIC_DROP = 70;
export const SWORD_DROP_CHANCE = 0.05;
export const SWORD_PICKUP_TIME = 1.2;
export const PANIC_KNEEL_TIME = 2;

// V2：焦虑文本代理（HUD 频段提示，随 band 变化弹 toast）
export const BAND_PROMPTS: Record<string, string> = {
  calm: '呼吸平稳。台下还看不见你。',
  nervous: '心跳开始加速……先深呼吸。',
  shaky: '手在抖。观众已经发现了。',
  panic: '完蛋了。他们全在看着你。',
};

// ============ 台词退化掷骰 ============
export const DEGRADE_SHAKY_RATE = 0.35;
export const DEGRADE_SHAKY_FORGET = 0.15;
export const DEGRADE_SHAKY_STAMMER = 0.2;
export const DEGRADE_PANIC_RATE = 0.6;
export const DEGRADE_PANIC_FORGET = 0.3;
export const DEGRADE_PANIC_BROKEN = 0.3;
export const SILENCE_TIME = 1.5;
export const PANIC_FILL_CHANCE = 0.6;

// ============ 评分阈值 ============
export const RATING_PERFECT = 4.5;
export const RATING_QUALIFIED = 3.5;
export const A1_STANCE_HIT = 90;
export const A1_JITTER = 5;
export const A2_COMPLETENESS = 95;
export const A4_SEEN_5STAR = 80;
export const COMBO_A3 = 4;

// ============ V2 鼠标谱（osu 式缩圈） ============
export const APPROACH_OVERSCALE = 3.2;        // approach 圈初始倍率，缩到 1.0 = 判定圈
export const RHYTHM_PERFECT_WINDOW = 0.12;    // ±秒
export const RHYTHM_GOOD_MULT = 1.5;
export const RHYTHM_NORMAL_MULT = 2.25;
export const RHYTHM_MISS_AFTER = 0.42;        // 节拍点后 0.42s 未点 → 落空
export const RHYTHM_WINDOW_DIFFICULTY_REF = 12;
export const RHYTHM_COMBO_MILESTONES = [4, 8, 12];
export const RHYTHM_PERFECT_BONUS_ANXIETY = -1;
export const RHYTHM_MISS_PENALTY_ANXIETY = 2;
export const HOLD_PERFECT_DRIFT = 0.14;       // 长按头尾容差
export const HOLD_MIN_DURATION = 0.8;
export const HOLD_MAX_DURATION = 2.2;

// ============ 攻击节拍判定（Perform 手感层） ============
export const ATTACK_PERFECT_WINDOW = 0.12;
export const ATTACK_GOOD_WINDOW_MULT = 1.5;
export const ATTACK_NORMAL_WINDOW_MULT = 2.25;
export const ATTACK_WINDOW_DIFFICULTY_REFERENCE = 12;
export const ATTACK_PERFECT_RELIEF = 2;
export const BPM_BASE = 72;
export const BAND_TEMPO = { calm: 72, nervous: 72, shaky: 78, panic: 84 } as const;

// ============ 心态结转 ============
export const CARRY_PERFECT_ANXIETY = -5;
export const CARRY_PERFECT_LINE = 0.05;
export const CARRY_FAIL_ANXIETY = 4;
export const CARRY_FAIL_SELFDOUBT = 0.3;

// ============ 计时器 / 阶段 ============
export const WAIT_MIN_TIME = 8;
export const WAIT_PICK_WINDOW = 10;
export const WAIT_MAX_TIME = 12;
export const SENSE_TRIGGER_DIST = 12;
export const PERFORM_STAGE_TIME = 30;
export const PERFORM_MAX_TIME = 90;
export const EVALUATE_COUNTDOWN = 10;
export const DIARY_COUNTDOWN = 8;
export const HIT_RECOVER_TIME = 0.8;
export const HAIR_TIDY_TIME = 1.5;
export const BREAK_CHARACTER_TIME = 0.5;
export const KNOCKDOWN_EARLY_END = 3;

// ============ 打断条件 ============
export const BREAK_ON_HIT = true;
export const BREAK_ON_BARRAGE = true;
export const BREAK_ON_FORGET_TWICE = true;
export const BREAK_FREE_TIME = 0.8;
export const BREAK_POWER_MIN = 1.2;
export const BREAK_POWER_MAX = 1.6;
export const BREAK_SPREAD_MULT = 2;
export const BREAK_MISS_MULT = 1.5;
export const BREAK_BAND_FLOOR = 61;

// ============ 玩家替身（V2：带前摇预告） ============
export const PLAYER_DODGE_PERFECT_WINDOW = 0.18;
export const PLAYER_DODGE_NORMAL_WINDOW = 0.35;
export const PLAYER_APPROACH_MIN = 0.6;
export const PLAYER_APPROACH_STEADY = 0.9;
export const PLAYER_APPROACH_MAX = 1.5;
export const PLAYER_AGGR_WEIGHT_SPEED = 0.5;
export const PLAYER_AGGR_WEIGHT_HIT = 0.5;
export const PLAYER_LINGER_BASE = 2;
export const BARRAGE_ACTIVE_WINDOW = 4;
export const PLAYER_ATTACK_RATE = 0.12;
export const PLAYER_HIT_INTERVAL = 8;
export const PLAYER_HIT_CHANCES = [0.55, 0.6, 0.65, 0.7];
export const PLAYER_WINDUP_TIME = 1.1;        // V2：出招前摇秒数（可反制窗口）
export const PLAYER_DODGE_WINDOW_S = 0.5;     // V2：前摇期间点击 = 完美闪避窗口

// ============ 被看见度 / 观众 ============
export const SEEN_PERFECT_ROUND = 10;
export const SEEN_FREE_PLAY = 10;
export const SEEN_LIGHT_FLOOR = 0.2;
export const SEEN_LIGHT_CAP = 1.0;
export const VIEWERS_BASE = 3;                // V2：初始观众
export const VIEWERS_PER_SEEN = 2;            // V2：每 10 被看见 +2
export const VIEWERS_PER_ROUND = 5;           // V2：每轮 +5
export const VIEWERS_RATING_BONUS = 3;        // V2：总评 ≥4 ★ +3

// ============ 相机 / 表现代理（V2） ============
export const CAMERA_DISTANCE_BASE = 13;
export const CAMERA_DISTANCE_PANIC = 10.2;    // 恐慌推进
export const CAMERA_FOV_BASE = 55;
export const CAMERA_FOV_HIGH = 66;            // 高速/恐慌 FOV
export const CAMERA_SHAKE = { calm: 0, nervous: 0.03, shaky: 0.09, panic: 0.16 };
export const VIGNETTE = { calm: 0.15, nervous: 0.25, shaky: 0.4, panic: 0.6 };

// ============ Stretch 门控（V2：玩家打字 ON） ============
export const STRETCH_FLAGS = {
  madScript: true,
  hiddenEnding: true,
  playerTyping: true,
} as const;

// ============ 性能预算 ============
export const MAX_PARTICLES = 160;
export const MAX_AUDIO_VOICES = 10;
export const MAX_DRAW_CALLS = 80;
export const MAX_MATERIALS = 20;
