/**
 * core/simulation/scoreTracker.ts — 计分(冻结接口,见 TDD §5.7)
 *
 * M1.3 由 agent-core 实现:给指定方 +1 分,达 bestOf(7 分)返回 matchOver。
 * matchOver 的 'matchOver' 事件由 Simulation 在 POINT 计时结束统一发射(避免重复)。
 */

import type { Score, Side, SimEvent } from '../types';

/** 给指定方 +1 分,返回新 score 与是否已达 bestOf 胜点 */
export function pointScored(
  side: Side,
  score: Score,
  emit: (event: SimEvent) => void,
): { newScore: Score; matchOver: boolean } {
  void emit; // 冻结签名保留;事件由 Simulation 统一发射
  const newScore: Score = { ...score, milestonesHit: [...score.milestonesHit] };
  if (side === 'P1') newScore.p1 += 1;
  else newScore.ai += 1;
  const matchOver = newScore.p1 >= newScore.bestOf || newScore.ai >= newScore.bestOf;
  return { newScore, matchOver };
}
