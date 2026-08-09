/**
 * core/constants.ts — 冻结默认值(参见 TDD §4.4)
 *
 * M1.1 由 agent-core 完成。任何后续变更走 TDD §0 流程。
 * 硬规则:所有数值以本文件为唯一来源,代码其它位置禁止 magic number。
 */

// ─── 球(Ball) ───

export const BALL_SPEED_INITIAL = 8.0; // u/s
export const BALL_SPEED_INCREMENT = 0.6; // u/hit
export const BALL_SPEED_MAX = 18.0; // u/s(封顶)
export const BALL_ANGLE_MAX = 60; // 度
export const BALL_VZ_FIXED = 14.0; // u/s(透视深度)
export const BALL_VY_RANGE_MIN = -7;
export const BALL_VY_RANGE_MAX = 7;
export const BALL_X_FAIL_LEFT = -10;
export const BALL_X_FAIL_RIGHT = 10;
export const BALL_SIZE = 1.0;
export const BALL_RESTITUTION_Y = 1.0; // 完美反弹
export const BALL_EMISSIVE_INTENSITY = 1.0;

// ─── 球拍(Paddle) ───

export const PADDLE_SIZE_X = 3;
export const PADDLE_SIZE_Y = 4;
export const PADDLE_SIZE_Z = 1;
export const PADDLE_TARGET_SPEED_P1 = 12; // u/s
export const PADDLE_ACCEL_P1 = 60; // u/s²
export const PADDLE_DECEL_P1 = 80; // u/s²
export const PADDLE_BOUND_Y_MIN = -6;
export const PADDLE_BOUND_Y_MAX = 6;
export const PADDLE_SQUASH_AMOUNT = 1.2; // × 宽
export const PADDLE_SQUASH_DURATION = 0.08; // s
export const PADDLE_REBOUND_DURATION = 0.08; // s
export const PADDLE_INITIAL_X_P1 = -10;
export const PADDLE_INITIAL_X_AI = 10;
export const PADDLE_INITIAL_Y = 0;

// ─── AI ───

export const AI_TARGET_SPEED = 8; // u/s
export const AI_LERP_RATE = 4; // /s
export const AI_PREDICT_TIME = 0.2; // s
export const AI_MISALIGN_PROB = 0.05;
export const AI_MISALIGN_DURATION = 0.5; // s
export const AI_MISALIGN_RANGE_MIN = -2;
export const AI_MISALIGN_RANGE_MAX = 2;

// ─── 比赛 / 计分 ───

export const SCORE_TO_WIN = 7;
export const POINT_DURATION = 1.2; // s
export const READY_COUNTDOWN = 3.0; // s
export const RALLY_HITS_RESET_ON_POINT = true;

// ─── 相机震动(Camera Shake) ───

export const CAMERA_SHAKE_DURATION = 0.25; // s
export const CAMERA_SHAKE_INTENSITY_BASE = 0.15;
export const CAMERA_SHAKE_INTENSITY_PER_SPEED = 0.04;
export const CAMERA_SHAKE_INTENSITY_MAX = 0.5;

// ─── 粒子(Particle) ───

export const PARTICLE_COUNT_MIN = 8;
export const PARTICLE_COUNT_MAX = 20;
export const PARTICLE_LIFE_MIN = 0.5; // s
export const PARTICLE_LIFE_MAX = 0.8; // s
export const PARTICLE_GRAVITY = 9.8; // u/s²
export const PARTICLE_SIZE = 0.3;
export const PARTICLE_POOL_SIZE = 256;

// ─── Milestone ───

export const MILESTONE_THRESHOLDS = [3, 5, 7, 10] as const;
export const SLOWMO_FACTORS = [0.6, 0.5, 0.4, 0.4] as const;
export const SLOWMO_DURATIONS = [0.2, 0.25, 0.3, 0.3] as const;

// ─── 音频(Audio) ───

export const AUDIO_VOICE_LIMIT = 6;
export const AUDIO_VOICE_HARD_LIMIT = 8;
export const AUDIO_VOLUME_DEFAULT = 0.5;

// ─── 主循环 / 帧 ───

export const FIXED_DT = 1 / 60; // s
export const MAX_FRAME_ACCUM = 5;
export const STORE_SYNC_INTERVAL = 2; // 帧

// ─── 球场(Court) ───

export const COURT_SIZE_X = 24;
export const COURT_SIZE_Y = 16;
export const COURT_SIZE_Z = 10;
export const AUDIENCE_COUNT = 12;
export const AUDIENCE_BOUND_BACK = -8;

// ─── 性能降级(Perf Degradation) ───

export const PERF_DEGRADATION_FRAMES = 3; // 连续 N 帧 > 14ms 触发
export const PERF_RECOVERY_FRAMES = 120; // 连续 N 帧 < 10ms 恢复
export const PERF_FRAME_BUDGET_MS = 14;
export const PERF_RECOVERY_BUDGET_MS = 10;

// ─── localStorage 键名(冻结) ───

export const STORAGE_KEY_STATS = 'patapong.v1.stats' as const;
export const STORAGE_KEY_SETTINGS = 'patapong.v1.settings' as const;
