/**
 * core/simulation/describe.ts — world-as-text 描述(用于 __gameManifest())
 *
 * M1.3 由 agent-core 实现。只读 sim.snapshot()(公共 API),不触碰内部状态。
 */

import {
  AI_LERP_RATE,
  AI_MISALIGN_DURATION,
  AI_MISALIGN_PROB,
  AI_MISALIGN_RANGE_MAX,
  AI_MISALIGN_RANGE_MIN,
  AI_PREDICT_TIME,
  AI_TARGET_SPEED,
  AUDIENCE_BOUND_BACK,
  AUDIENCE_COUNT,
  BALL_ANGLE_MAX,
  BALL_RESTITUTION_Y,
  BALL_SIZE,
  BALL_SPEED_INCREMENT,
  BALL_SPEED_INITIAL,
  BALL_SPEED_MAX,
  BALL_VY_RANGE_MAX,
  BALL_VY_RANGE_MIN,
  BALL_VZ_FIXED,
  BALL_X_FAIL_LEFT,
  BALL_X_FAIL_RIGHT,
  CAMERA_SHAKE_DURATION,
  CAMERA_SHAKE_INTENSITY_BASE,
  CAMERA_SHAKE_INTENSITY_MAX,
  CAMERA_SHAKE_INTENSITY_PER_SPEED,
  COURT_SIZE_X,
  COURT_SIZE_Y,
  COURT_SIZE_Z,
  MILESTONE_THRESHOLDS,
  PADDLE_ACCEL_P1,
  PADDLE_BOUND_Y_MAX,
  PADDLE_BOUND_Y_MIN,
  PADDLE_DECEL_P1,
  PADDLE_SIZE_X,
  PADDLE_SIZE_Y,
  PADDLE_SIZE_Z,
  PADDLE_SQUASH_AMOUNT,
  PADDLE_SQUASH_DURATION,
  PADDLE_TARGET_SPEED_P1,
  PARTICLE_COUNT_MAX,
  PARTICLE_COUNT_MIN,
  PARTICLE_GRAVITY,
  PARTICLE_LIFE_MAX,
  PARTICLE_LIFE_MIN,
  PARTICLE_SIZE,
  PERF_DEGRADATION_FRAMES,
  PERF_FRAME_BUDGET_MS,
  PERF_RECOVERY_FRAMES,
  POINT_DURATION,
  RALLY_HITS_RESET_ON_POINT,
  READY_COUNTDOWN,
  SCORE_TO_WIN,
  SLOWMO_DURATIONS,
  SLOWMO_FACTORS,
} from '../constants';
import { DEFAULT_AUDIENCE } from '../data/audience';
import { DEFAULT_COURT_VOXELS } from '../data/court';
import type { Simulation } from './Simulation';

/** 数字格式化为 2 位小数 */
const fmt = (n: number): string => n.toFixed(2);

/** 世界文本:phase / 比分 / 球 / 球拍 / 球场规模 */
export function describeWorld(sim: Simulation): string {
  const s = sim.snapshot();
  return [
    'Patapong 3D — world',
    `phase=${s.phase} score=P1:${s.score.p1}/AI:${s.score.ai} bestOf=${s.score.bestOf} rally=${s.score.rallyHits}`,
    `ball pos=(${fmt(s.ball.position.x)},${fmt(s.ball.position.y)},${fmt(s.ball.position.z)}) speed=${fmt(s.ball.speed)} lastHitBy=${s.ball.lastHitBy ?? '-'}`,
    `p1 pos=(${fmt(s.p1.position.x)},${fmt(s.p1.position.y)},${fmt(s.p1.position.z)}) char=${s.p1.characterId}`,
    `ai pos=(${fmt(s.ai.position.x)},${fmt(s.ai.position.y)},${fmt(s.ai.position.z)}) char=${s.ai.characterId}`,
    `court floorVoxels=${DEFAULT_COURT_VOXELS.length} audience=${DEFAULT_AUDIENCE.length}`,
  ].join('\n');
}

/** 规则文本:物理常量表(TDD §4.4 全量关键值) */
export function describeRules(_sim: Simulation): string {
  return [
    'Patapong 3D — rules(物理常量表,见 TDD §4.4)',
    `ball: initial=${BALL_SPEED_INITIAL} increment=+${BALL_SPEED_INCREMENT}/hit max=${BALL_SPEED_MAX} angleMax=${BALL_ANGLE_MAX}deg vz=${BALL_VZ_FIXED} size=${BALL_SIZE} vyRange=[${BALL_VY_RANGE_MIN},${BALL_VY_RANGE_MAX}] xFail=[${BALL_X_FAIL_LEFT},${BALL_X_FAIL_RIGHT}] restitutionY=${BALL_RESTITUTION_Y}`,
    `paddle: size=${PADDLE_SIZE_X}x${PADDLE_SIZE_Y}x${PADDLE_SIZE_Z} accel=${PADDLE_ACCEL_P1} decel=${PADDLE_DECEL_P1} targetSpeed=${PADDLE_TARGET_SPEED_P1} boundY=[${PADDLE_BOUND_Y_MIN},${PADDLE_BOUND_Y_MAX}] squash=${PADDLE_SQUASH_AMOUNT}x/${PADDLE_SQUASH_DURATION}s`,
    `ai: speed=${AI_TARGET_SPEED} lerp=${AI_LERP_RATE}/s predict=${AI_PREDICT_TIME}s misalign=${Math.round(AI_MISALIGN_PROB * 100)}%/${AI_MISALIGN_DURATION}s range=[${AI_MISALIGN_RANGE_MIN},${AI_MISALIGN_RANGE_MAX}]`,
    `match: firstTo=${SCORE_TO_WIN} ready=${READY_COUNTDOWN}s point=${POINT_DURATION}s rallyResetOnPoint=${RALLY_HITS_RESET_ON_POINT}`,
    `juice: shake=${CAMERA_SHAKE_DURATION}s intensity=${CAMERA_SHAKE_INTENSITY_BASE}+(${CAMERA_SHAKE_INTENSITY_PER_SPEED}/u) max=${CAMERA_SHAKE_INTENSITY_MAX}`,
    `particle: count=${PARTICLE_COUNT_MIN}-${PARTICLE_COUNT_MAX} life=${PARTICLE_LIFE_MIN}-${PARTICLE_LIFE_MAX}s gravity=${PARTICLE_GRAVITY} size=${PARTICLE_SIZE}`,
    `milestone: thresholds=[${MILESTONE_THRESHOLDS.join('/')}] slowmoFactor=[${SLOWMO_FACTORS.join('/')}] slowmoDur=[${SLOWMO_DURATIONS.join('/')}]s`,
    `court: size=${COURT_SIZE_X}x${COURT_SIZE_Y}x${COURT_SIZE_Z} audience=${AUDIENCE_COUNT} boundBack=${AUDIENCE_BOUND_BACK}`,
    `perf: frameBudget=${PERF_FRAME_BUDGET_MS}ms degradeFrames=${PERF_DEGRADATION_FRAMES} recoveryFrames=${PERF_RECOVERY_FRAMES}`,
  ].join('\n');
}

/** 实体清单:体素 / 观众 / 球拍 characterId / 球 */
export function describeEntities(sim: Simulation): string {
  const s = sim.snapshot();
  const audienceIds = DEFAULT_AUDIENCE.map((a) => a.id).join(',');
  return [
    'Patapong 3D — entities',
    `court.voxels=${DEFAULT_COURT_VOXELS.length}(floor+decor)`,
    `court.audience=${DEFAULT_AUDIENCE.length}: ${audienceIds}`,
    `paddle.P1=${s.p1.characterId} paddle.AI=${s.ai.characterId}`,
    'ball=ball@center',
  ].join('\n');
}
