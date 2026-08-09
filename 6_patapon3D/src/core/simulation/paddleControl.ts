/**
 * core/simulation/paddleControl.ts — P1 加速度模型
 *
 * M1.3 由 agent-core 实现。当前是 M0 骨架。
 */

import { PADDLE_ACCEL_P1, PADDLE_BOUND_Y_MAX, PADDLE_BOUND_Y_MIN, PADDLE_DECEL_P1, PADDLE_TARGET_SPEED_P1 } from '../constants';
import { clamp } from '../math';
import type { Paddle } from '../types';

export interface P1Input {
  up: boolean;
  down: boolean;
  launch: boolean;
}

export function p1Step(paddle: Paddle, input: P1Input, dt: number): void {
  // 简单 P1 模型(预填,M1.3 由 agent-core 实现完整加速度曲线)
  if (input.up) {
    paddle.velocity.y = clamp(
      paddle.velocity.y + PADDLE_ACCEL_P1 * dt,
      -PADDLE_TARGET_SPEED_P1,
      PADDLE_TARGET_SPEED_P1,
    );
  } else if (input.down) {
    paddle.velocity.y = clamp(
      paddle.velocity.y - PADDLE_ACCEL_P1 * dt,
      -PADDLE_TARGET_SPEED_P1,
      PADDLE_TARGET_SPEED_P1,
    );
  } else {
    // 自由减速
    const decel = PADDLE_DECEL_P1 * dt;
    if (paddle.velocity.y > 0) {
      paddle.velocity.y = Math.max(0, paddle.velocity.y - decel);
    } else if (paddle.velocity.y < 0) {
      paddle.velocity.y = Math.min(0, paddle.velocity.y + decel);
    }
  }
  paddle.position.y = clamp(
    paddle.position.y + paddle.velocity.y * dt,
    PADDLE_BOUND_Y_MIN,
    PADDLE_BOUND_Y_MAX,
  );
}
