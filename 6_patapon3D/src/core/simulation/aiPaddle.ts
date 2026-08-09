/**
 * core/simulation/aiPaddle.ts — AI 追踪(冻结接口,见 TDD §5.5)
 *
 * M1.3 由 agent-core 实现。行为见 docs/design/01 §5.1:
 * 球在 AI 半区时预判 AI_PREDICT_TIME(0.2s)后的 Y,lerp 平滑到目标速度,
 * 每秒掷骰 1 次,5% 概率错位 ±2u(持续 0.5s),Y 限 ±6。
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
import { clamp, damp } from '../math';
import type { Ball, Paddle } from '../types';

/** 掷骰周期:每秒掷骰 1 次(设计文档 §5.1,非冻结表数值) */
const AI_DICE_PERIOD = 1;

interface AiState {
  /** 内部模拟时钟(s,随 dt 累加) */
  elapsed: number;
  /** 上次掷骰时刻 */
  lastDiceAt: number;
  /** 错位生效截止时刻 */
  misalignUntil: number;
  /** 当前错位偏移(±2u 内) */
  misalignOffset: number;
}

const state = new WeakMap<Paddle, AiState>();

/** 纯函数,无副作用(只读 ball + 写 ai) */
export function aiStep(ai: Paddle, ball: Ball, dt: number, rng: () => number): void {
  let s = state.get(ai);
  if (!s) {
    s = { elapsed: 0, lastDiceAt: 0, misalignUntil: 0, misalignOffset: 0 };
    state.set(ai, s);
  }
  s.elapsed += dt;

  // 预判:球在 AI 半区(x > 0)时追踪 0.2s 后的 Y;否则保持上次目标
  let targetY = ai.targetY;
  if (ball.position.x > 0) {
    targetY = ball.position.y + ball.velocity.y * AI_PREDICT_TIME;
  }

  // 5% 错位:每秒掷骰 1 次,命中则错位 ±2u 持续 0.5s
  if (s.elapsed - s.lastDiceAt >= AI_DICE_PERIOD) {
    s.lastDiceAt = s.elapsed;
    if (rng() < AI_MISALIGN_PROB) {
      s.misalignUntil = s.elapsed + AI_MISALIGN_DURATION;
      s.misalignOffset =
        AI_MISALIGN_RANGE_MIN + rng() * (AI_MISALIGN_RANGE_MAX - AI_MISALIGN_RANGE_MIN);
    }
  }
  if (s.elapsed < s.misalignUntil) {
    targetY += s.misalignOffset;
  }

  ai.targetY = clamp(targetY, PADDLE_BOUND_Y_MIN, PADDLE_BOUND_Y_MAX);

  // 平滑插值到目标速度(上限 AI_TARGET_SPEED)
  const targetVy = Math.sign(ai.targetY - ai.position.y) * AI_TARGET_SPEED;
  ai.velocity.y = damp(ai.velocity.y, targetVy, AI_LERP_RATE, dt);
  ai.position.y = clamp(
    ai.position.y + ai.velocity.y * dt,
    PADDLE_BOUND_Y_MIN,
    PADDLE_BOUND_Y_MAX,
  );
}
