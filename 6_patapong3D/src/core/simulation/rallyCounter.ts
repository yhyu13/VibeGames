/**
 * core/simulation/rallyCounter.ts — rally hits 累加 + milestone 触发
 *
 * M1.3 由 agent-core 实现(M1 占位,M2 填 milestone 触发)
 */

import { MILESTONE_THRESHOLDS } from '../constants';
import type { Score, SimEvent } from '../types';

export function incrementRally(score: Score, emit: (e: SimEvent) => void): Score {
  const next: Score = { ...score, rallyHits: score.rallyHits + 1 };
  // Milestone 触发(M1 占位:M2 实际 emit 'milestone' 事件 + 'slowmo' + 'audienceCheer')
  const idx = MILESTONE_THRESHOLDS.indexOf(next.rallyHits as (typeof MILESTONE_THRESHOLDS)[number]);
  if (idx >= 0 && !next.milestonesHit.includes(next.rallyHits)) {
    next.milestonesHit = [...next.milestonesHit, next.rallyHits];
    emit({ type: 'milestone', payload: { hits: next.rallyHits, index: idx } });
  }
  return next;
}

export function resetRally(score: Score): Score {
  return { ...score, rallyHits: 0, milestonesHit: [] };
}
