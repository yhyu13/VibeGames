/**
 * core/simulation/scoreTracker.ts — 计分(冻结接口,见 TDD §5.7)
 *
 * M1.3 由 agent-core 实现。当前是 M0 骨架。
 */

import type { Score, Side, SimEvent } from '../types';

export function pointScored(
  _side: Side,
  _score: Score,
  _emit: (event: SimEvent) => void,
): { newScore: Score; matchOver: boolean } {
  /* TODO M1.3: 实际计分 + matchOver 判定 */
  return { newScore: { ..._score }, matchOver: false };
}
