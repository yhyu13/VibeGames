/**
 * core/constants.ts — v2.0 冻结默认值(参见 TDD §4)
 *
 * v2.0 divine-drums 重写。任何变更走 TDD §0 流程:changelog + 通知 +
 * `[TDD-CONTRACT-CHANGE]` commit。
 * 硬规则:所有数值以本文件为唯一来源,代码其它位置禁止 magic number。
 */

// ─── 鼓 & 判定(TDD §4.1) ───

export const JUDGE_WINDOW_PERFECT_MS = 60;
export const JUDGE_WINDOW_GOOD_MS = 120;
export const JUDGE_WINDOW_NORMAL_MS = 200;

/** 判定分值(冻结) */
export const JUDGEMENT_PERFECT = 300;
export const JUDGEMENT_GOOD = 100;
export const JUDGEMENT_NORMAL = 50;
export const JUDGEMENT_MISS = 0;

/** 判定 → 命令 quality 系数(GDD §3:1.0 / 0.7 / 0.4) */
export const QUALITY_PERFECT = 1.0;
export const QUALITY_GOOD = 0.7;
export const QUALITY_NORMAL = 0.4;

// ─── 命令系统(TDD §4.2) ───

export const COMMAND_LENGTH = 4;
export const ATTACK_DAMAGE = 2.0;
export const CHARGE_DAMAGE = 4.0;
export const HEAVY_DAMAGE = 3.0;
export const VOLLEY_DAMAGE = 1.5;
export const RALLY_HEAL = 3;
export const DEFEND_REDUCTION = 0.5;
export const BERSERK_TURNS = 2;
export const BERSERK_DAMAGE_MULT = 2.0;
export const MARCH_DISTANCE = 0.8;
export const PROXIMITY_MAX_BONUS = 0.5;
export const PROXIMITY_FULL_RANGE = 8;

// ─── 军队 / boss(TDD §4.3) ───

export const ARMY_UNIT_COUNT = 3;
export const UNIT_HP_MAX = 5;
export const ARMY_INITIAL_X = -4;
export const ARMY_MIN_X = -5;
export const ARMY_MAX_X = 4.5;

export const BOSS_HP_MAX = 24;
export const BOSS_INITIAL_X = 6;
export const BOSS_SWIPE_DAMAGE = 1;
export const BOSS_SLAM_DAMAGE = 1;
export const BOSS_FIREBALL_DAMAGE = 2;
export const BOSS_ENRAGE_HP = 12;
export const BOSS_ENRAGE_DAMAGE_MULT = 1.5;
export const BOSS_AUTO_TURN_S = 6;

// ─── Fever(TDD §4.4) ───

export const FEVER_TRIGGERS = [8, 16, 24] as const;
export const FEVER_SLOWMO_FACTORS = [0.8, 0.7, 0.6] as const;
export const FEVER_DURATIONS = [3, 3, 3] as const;
export const FEVER_DAMAGE_MULT = 1.5;

// ─── 主循环 / 谱面 / 存储(TDD §4.5) ───

export const FIXED_DT = 1 / 60; // s
export const MAX_FRAME_ACCUM = 5;
export const STORE_SYNC_INTERVAL = 2; // 帧
export const NOTE_SCROLL_SPEED = 1.6;
export const SONG_COUNT = 3;
export const SONG_DURATION_S = 60;

export const STORAGE_KEY_STATS = 'patapong.v2.stats' as const;
export const STORAGE_KEY_SETTINGS = 'patapong.v2.settings' as const;

// ─── 谱面生成(非冻结:拍间隔与歌曲结构) ───

/** 拍速(Patapon 手感 120 BPM → 0.5s/拍) */
export const SONG_BPM = 120;
/** 谱面开头留白(给玩家进入状态) */
export const SONG_LEAD_IN_S = 2;

// ─── 阵型派生(非冻结:单位世界位置布局) ───

/** 相邻单位 X 间距(相对 formationOffset) */
export const UNIT_SPACING_X = 1.2;
/** 单位 Z 排布(前后错开,读阵型更清楚) */
export const UNIT_Z_OFFSETS = [-1, 0.4, -0.4] as const;
export const UNIT_Y = 0;
export const BOSS_Y = 0;
export const BOSS_Z = 0;

// ─── 瞬时状态 / squash(非冻结:手感) ───

/** 瞬时姿态(march/attack/hit 等)展示时长(s) */
export const UNIT_STATE_FLASH_S = 0.3;
export const BOSS_ATTACK_FLASH_S = 0.4;
/** squash 施加量(1 = 无)与衰减(指数趋近 1) */
export const SQUASH_APPLY_AMOUNT = 1.5;
export const SQUASH_DECAY_RATE = 8;

// ─── 相机震动(Camera Shake) ───

export const CAMERA_SHAKE_DURATION = 0.25; // s
export const CAMERA_SHAKE_INTENSITY_BASE = 0.15;
export const CAMERA_SHAKE_INTENSITY_MAX = 0.5;

// ─── 粒子(Particle;TDD §3 预算:<=200,池 256) ───

export const PARTICLE_COUNT_MIN = 8;
export const PARTICLE_COUNT_MAX = 20;
export const PARTICLE_LIFE_MIN = 0.5; // s
export const PARTICLE_LIFE_MAX = 0.8; // s
export const PARTICLE_GRAVITY = 9.8; // u/s²
export const PARTICLE_SIZE = 0.3;
export const PARTICLE_POOL_SIZE = 256;

// ─── 音频(Audio;TDD §3 预算) ───

export const AUDIO_VOICE_LIMIT = 6;
export const AUDIO_VOICE_HARD_LIMIT = 8;
export const AUDIO_VOLUME_DEFAULT = 0.5;

// ─── 球场(Court) ───

export const COURT_SIZE_X = 24;
export const COURT_SIZE_Y = 16;
export const COURT_SIZE_Z = 10;
export const AUDIENCE_COUNT = 12;
export const AUDIENCE_BOUND_BACK = -8;
/** 装饰节奏条(DOM 节奏 UI 之外的场景内基线) */
export const RHYTHM_BAR_LENGTH_X = 16;
export const RHYTHM_BAR_Y = -5.5;

// ─── 性能降级(Perf Degradation;TDD §3.6) ───

export const PERF_DEGRADATION_FRAMES = 3; // 连续 N 窗口 > 14ms 触发
export const PERF_RECOVERY_FRAMES = 120; // 连续 N 窗口 < 10ms 恢复
export const PERF_FRAME_BUDGET_MS = 14;
export const PERF_RECOVERY_BUDGET_MS = 10;
