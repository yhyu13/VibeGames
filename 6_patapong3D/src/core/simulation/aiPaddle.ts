/**
 * core/simulation/aiPaddle.ts — AI 追踪(冻结接口,见 TDD §5.5)
 *
 * M1.3 由 agent-core 实现。当前是 M0 骨架。
 */

import {
  AI_LERP_RATE,
  AI_MISALIGN_DURATION,
  AI_MISALIGN_PROB,
  AI_MISALIGN_RANGE_MAX,
  AI_MISALIGN_RANGE_MIN,
  AI_PREDICT_TIME,
  AI_TARGET_SPEED,
  PADDLE_BOUND_Y_MAX,
  PADDLE_BOUND_Y_MIN,
} from '../constants';
import { clamp, damp, makeRng } from '../math';
import type { Ball, Paddle } from '../types';

interface AiState {
  misalignUntil: number;
  misalignOffset: number;
  rng: () => number;
  lastRngRoll: number;
}

const state = new WeakMap<Paddle, AiState>();

export function aiStep(ai: Paddle, ball: Ball, dt: number, _elapsed: number): void {
  let s = state.get(ai);
  if (!s) {
    s = {
      misalignUntil: 0,
      misalignOffset: 0,
      rng: makeRng(42),
      lastRngRoll: 0,
    };
    state.set(ai, s);
  }

  // 预判(球在 AI 半区时)
  let targetY = 0;
  if (ball.position.x > 0) {
    targetY = ball.position.y + ball.velocity.y * AI_PREDICT_TIME;
  } else {
    targetY = ai.targetY;
  }

  // 5% 错位(每秒掷骰 1 次)
  if (s.lastRngRoll === 0 || _elapsed - s.lastRngRoll > 1) {
    s.lastRngRoll = _elapsed;
    if (s.rng() < AI_MISALIGN_PROB) {
      s.misalignUntil = _elapsed + AI_MISALIGN_DURATION;
      s.misalignOffset =
        AI_MISALIGN_RANGE_MIN +
        s.rng() * (AI_MISALIGN_RANGE_MAX - AI_MISALIGN_RANGE_MIN);
    }
  }
  if (_elapsed < s.misalignUntil) {
    targetY += s.misalignOffset;
  }

  ai.targetY = clamp(targetY, PADDLE_BOUND_Y_MIN, PADDLE_BOUND_Y_MAX);

  // 平滑插值到 targetVy
  const targetVy = Math.sign(ai.targetY - ai.position.y) * AI_TARGET_SPEED;
  ai.velocity.y = damp(ai.velocity.y, targetVy, AI_LERP_RATE, dt);
  ai.position.y = clamp(
    ai.position.y + ai.velocity.y * dt,
    PADDLE_BOUND_Y_MIN,
    PADDLE_BOUND_Y_MAX,
  );
}
