/**
 * core/simulation/ballPhysics.ts — 球物理(冻结接口,见 TDD §5.4)
 *
 * M1.3 由 agent-core 实现:移动 + Y/Z 边界反弹 + 球拍命中(偏转分解 + 速度递增)+ X 出界失分。
 *
 * 球速分解公式(每次击拍后重算,见 GDD §3.1 / docs/design/01 §4):
 *   speed' = min(speed + BALL_SPEED_INCREMENT, BALL_SPEED_MAX)      // 速度递增,上限 18
 *   θ      = clamp((hitY − paddleY) / (PADDLE_SIZE_Y / 2), −1, 1) × BALL_ANGLE_MAX  // 偏转角 ±60°
 *   VY     = clamp(speed' · sin(θ), BALL_VY_RANGE_MIN, BALL_VY_RANGE_MAX)           // 垂直分量
 *   VX     = ±√(speed'² − VY²)                                        // 水平分量,背向球拍飞向对手
 *   VZ     = ±BALL_VZ_FIXED                                          // 透视深度,飞行方向不变
 *
 * 命中判定:X-Y 平面投影 AABB(球拍视为横贯 Z 的挡板,PADDLE_SIZE_Z 仅供渲染)。
 * 原因:VZ=14 u/s 时球在 z∈[−5,5] 内 0.71s 一个来回,严格 3D AABB(拍深 1u)会让命中率趋近 0,
 * 球拍命中退化为 2D Pong 语义;Z 仅作视觉深度(见"遗留问题")。
 */

import {
  BALL_ANGLE_MAX,
  BALL_RESTITUTION_Y,
  BALL_SIZE,
  BALL_SPEED_INCREMENT,
  BALL_SPEED_MAX,
  BALL_VY_RANGE_MAX,
  BALL_VY_RANGE_MIN,
  BALL_VZ_FIXED,
  BALL_X_FAIL_LEFT,
  BALL_X_FAIL_RIGHT,
  PADDLE_SIZE_X,
  PADDLE_SIZE_Y,
} from '../constants';
import { clamp, deg2rad } from '../math';
import type { Ball, Court, Paddle, SimEvent } from '../types';
import { emitHitJuice } from './juiceEvents';

/** 球半尺寸(碰撞用) */
const BALL_HALF_SIZE = BALL_SIZE / 2;
/** point 事件占位值(ballStep 不知比分,Simulation 会修正 loserScore) */
const POINT_LOSER_SCORE_PLACEHOLDER = 0;

/** 命中判定 X 半程:拍半宽 + 球半尺寸 */
const HIT_HALF_X = PADDLE_SIZE_X / 2 + BALL_HALF_SIZE;
/** 命中判定 Y 半程:拍半高 + 球半尺寸 */
const HIT_HALF_Y = PADDLE_SIZE_Y / 2 + BALL_HALF_SIZE;

/** 球拍命中检测(X-Y 平面投影:拍视为横贯 Z 的挡板,忽略 Z 深度) */
function hitsPaddle(ball: Ball, paddle: Paddle): boolean {
  return (
    Math.abs(ball.position.x - paddle.position.x) <= HIT_HALF_X &&
    Math.abs(ball.position.y - paddle.position.y) <= HIT_HALF_Y
  );
}

/** 命中重算:速度递增 + 偏转分解 + 事件(hit + 完整 juice 包) */
function applyPaddleHit(ball: Ball, paddle: Paddle, emit: (event: SimEvent) => void): void {
  // 速度递增(上限 BALL_SPEED_MAX)
  ball.speed = Math.min(ball.speed + BALL_SPEED_INCREMENT, BALL_SPEED_MAX);

  // 偏转角度:命中偏移 / 半拍高 → [-1,1] × BALL_ANGLE_MAX
  const offsetRatio = clamp((ball.position.y - paddle.position.y) / (PADDLE_SIZE_Y / 2), -1, 1);
  const angleDeg = offsetRatio * BALL_ANGLE_MAX;
  ball.velocity.y = clamp(
    ball.speed * Math.sin(deg2rad(angleDeg)),
    BALL_VY_RANGE_MIN,
    BALL_VY_RANGE_MAX,
  );

  // X 分量:保持 |(VX, VY)| = speed,方向背向球拍(飞向对手)
  const vx = Math.sqrt(Math.max(0, ball.speed * ball.speed - ball.velocity.y * ball.velocity.y));
  ball.velocity.x = (paddle.side === 'P1' ? 1 : -1) * vx;

  // Z 分量:固定 BALL_VZ_FIXED,飞行方向不变
  ball.velocity.z = (ball.velocity.z >= 0 ? 1 : -1) * BALL_VZ_FIXED;

  ball.lastHitBy = paddle.side;

  emit({ type: 'hit', payload: { side: paddle.side, hitPoint: { ...ball.position }, hitForce: ball.speed } });
  emitHitJuice(paddle.side, ball, emit);
}

/** 纯函数,无副作用(除了 emit event):移动 + 反弹 + paddle hit + out-of-bounds */
export function ballStep(
  ball: Ball,
  court: Court,
  p1: Paddle,
  ai: Paddle,
  dt: number,
  emit: (event: SimEvent) => void,
): void {
  // 1. 移动
  ball.position.x += ball.velocity.x * dt;
  ball.position.y += ball.velocity.y * dt;
  ball.position.z += ball.velocity.z * dt;

  // 2. Y 上下界反弹(BALL_RESTITUTION_Y = 1 完美反弹,角度不变)
  if (ball.position.y < court.bounds.minY) {
    ball.position.y = court.bounds.minY;
    ball.velocity.y = Math.abs(ball.velocity.y) * BALL_RESTITUTION_Y;
  } else if (ball.position.y > court.bounds.maxY) {
    ball.position.y = court.bounds.maxY;
    ball.velocity.y = -Math.abs(ball.velocity.y) * BALL_RESTITUTION_Y;
  }

  // 3. Z 前后界反弹(保持球在 [minZ, maxZ] 内飞行)
  if (ball.position.z < court.bounds.minZ) {
    ball.position.z = court.bounds.minZ;
    ball.velocity.z = Math.abs(ball.velocity.z);
  } else if (ball.position.z > court.bounds.maxZ) {
    ball.position.z = court.bounds.maxZ;
    ball.velocity.z = -Math.abs(ball.velocity.z);
  }

  // 4. X 出界 → 对方得分(loserScore 占位,Simulation 修正)
  if (ball.position.x <= BALL_X_FAIL_LEFT) {
    emit({ type: 'point', payload: { winner: 'AI', loserScore: POINT_LOSER_SCORE_PLACEHOLDER } });
    return;
  }
  if (ball.position.x >= BALL_X_FAIL_RIGHT) {
    emit({ type: 'point', payload: { winner: 'P1', loserScore: POINT_LOSER_SCORE_PLACEHOLDER } });
    return;
  }

  // 5. 球拍命中(X-Y 投影 + 仅当球朝该拍飞行,防止同拍连击)
  if (ball.velocity.x < 0 && hitsPaddle(ball, p1)) {
    applyPaddleHit(ball, p1, emit);
    return;
  }
  if (ball.velocity.x > 0 && hitsPaddle(ball, ai)) {
    applyPaddleHit(ball, ai, emit);
    return;
  }
}
