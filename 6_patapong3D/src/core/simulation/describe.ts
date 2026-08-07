/**
 * core/simulation/describe.ts — world-as-text 描述(用于 __gameManifest())
 *
 * M1.3 由 agent-core 实现。只读 sim.snapshot()(公共 API),不触碰内部状态。
 */

import {
  AI_LERP_RATE,
  AI_MISALIGN_DURATION,
  AI_MISALIGN_PROB,
  AI_PREDICT_TIME,
  AI_TARGET_SPEED,
  BALL_ANGLE_MAX,
  BALL_SPEED_INCREMENT,
  BALL_SPEED_INITIAL,
  BALL_SPEED_MAX,
  BALL_VZ_FIXED,
  CAMERA_SHAKE_DURATION,
  PADDLE_ACCEL_P1,
  PADDLE_BOUND_Y_MAX,
  PADDLE_BOUND_Y_MIN,
  PADDLE_DECEL_P1,
  PADDLE_SIZE_X,
  PADDLE_SIZE_Y,
  PADDLE_SIZE_Z,
  PADDLE_SQUASH_DURATION,
  PADDLE_TARGET_SPEED_P1,
  POINT_DURATION,
  READY_COUNTDOWN,
  SCORE_TO_WIN,
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

/** 规则文本:物理常量表(TDD §4.4) */
export function describeRules(_sim: Simulation): string {
  return [
    'Patapong 3D — rules(物理常量表,见 TDD §4.4)',
    `ball: initialSpeed=${BALL_SPEED_INITIAL} increment=+${BALL_SPEED_INCREMENT}/hit max=${BALL_SPEED_MAX} angleMax=${BALL_ANGLE_MAX}deg vz=${BALL_VZ_FIXED}`,
    `paddle: size=${PADDLE_SIZE_X}x${PADDLE_SIZE_Y}x${PADDLE_SIZE_Z} accel=${PADDLE_ACCEL_P1} decel=${PADDLE_DECEL_P1} targetSpeed=${PADDLE_TARGET_SPEED_P1} boundY=[${PADDLE_BOUND_Y_MIN},${PADDLE_BOUND_Y_MAX}]`,
    `ai: speed=${AI_TARGET_SPEED} lerp=${AI_LERP_RATE}/s predict=${AI_PREDICT_TIME}s misalign=${Math.round(AI_MISALIGN_PROB * 100)}%/${AI_MISALIGN_DURATION}s`,
    `match: firstTo=${SCORE_TO_WIN} ready=${READY_COUNTDOWN}s point=${POINT_DURATION}s`,
    `juice: shake=${CAMERA_SHAKE_DURATION}s squash=${PADDLE_SQUASH_DURATION}s`,
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
