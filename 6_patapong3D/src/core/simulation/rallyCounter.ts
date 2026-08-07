/**
 * core/simulation/rallyCounter.ts — rally hits 累加 + milestone 触发
 *
 * M2 由 agent-core 实现:精确阈值 3/5/7/10 各触发一次(防重),
 * 第 10+ 拍进入重复档(10/13/16/…,见 docs/design/01 §3.2 与 GDD D03:
 * 「重复 7 拍效果,不升级」),milestonesHit 按已触发值防同值重复。
 */

import { MILESTONE_THRESHOLDS } from '../constants';
import type { Score, SimEvent } from '../types';

/** 重复档下标:最后一档(index 3,hits=10 档)的节奏复用 */
const REPEAT_TIER_INDEX = MILESTONE_THRESHOLDS.length - 1;
/** 重复档阈值:>= 该拍数进入重复档(10/13/16/…) */
const REPEAT_THRESHOLD = MILESTONE_THRESHOLDS[MILESTONE_THRESHOLDS.length - 1]!; // 冻结表非空([3,5,7,10])
/** 重复周期:每 N 拍重复一次(10→13→16,不升级) */
const REPEAT_PERIOD = 3;

/** 是否落在重复档序列(10/13/16/…):>= 阈值且距阈值相差整周期 */
function isRepeatHit(hits: number): boolean {
  return hits >= REPEAT_THRESHOLD && (hits - REPEAT_THRESHOLD) % REPEAT_PERIOD === 0;
}

export function incrementRally(score: Score, emit: (e: SimEvent) => void): Score {
  const next: Score = { ...score, rallyHits: score.rallyHits + 1 };
  const hits = next.rallyHits;
  // 精确阈值(3/5/7/10)或 10+ 重复档都触发 milestone;milestonesHit 防同值重复
  const exactIdx = MILESTONE_THRESHOLDS.indexOf(hits as (typeof MILESTONE_THRESHOLDS)[number]);
  const idx = exactIdx >= 0 ? exactIdx : isRepeatHit(hits) ? REPEAT_TIER_INDEX : -1;
  if (idx >= 0 && !next.milestonesHit.includes(hits)) {
    next.milestonesHit = [...next.milestonesHit, hits];
    emit({ type: 'milestone', payload: { hits, index: idx } });
  }
  return next;
}

export function resetRally(score: Score): Score {
  return { ...score, rallyHits: 0, milestonesHit: [] };
}
