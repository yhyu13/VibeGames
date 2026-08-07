/**
 * core/simulation/ballPhysics.ts — 球物理(冻结接口,见 TDD §5.4)
 *
 * M1.3 由 agent-core 实现。当前是 M0 骨架。
 */

import type { Ball, Court, Paddle, SimEvent } from '../types';

export function ballStep(
  _ball: Ball,
  _court: Court,
  _p1: Paddle,
  _ai: Paddle,
  _dt: number,
  _emit: (event: SimEvent) => void,
): void {
  /* TODO M1.3: 移动 + 反弹 + paddle hit + out-of-bounds */
}
