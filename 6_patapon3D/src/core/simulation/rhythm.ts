/**
 * core/simulation/rhythm.ts — timing-only 判定(冻结窗口,见 TDD §4.1)
 *
 * 判定只看时间误差,不看按的是哪面鼓(lane glyph 装饰)。
 */

import {
  JUDGE_WINDOW_GOOD_MS,
  JUDGE_WINDOW_NORMAL_MS,
  JUDGE_WINDOW_PERFECT_MS,
  JUDGEMENT_GOOD,
  JUDGEMENT_MISS,
  JUDGEMENT_NORMAL,
  JUDGEMENT_PERFECT,
  QUALITY_GOOD,
  QUALITY_NORMAL,
  QUALITY_PERFECT,
} from '../constants.js';
import type { Judgement } from '../types.js';

/** 绝对时间误差(ms) → 判定分值;超出 NORMAL 窗口 = MISS */
export function judgeBeat(absErrorMs: number): Judgement {
  if (absErrorMs <= JUDGE_WINDOW_PERFECT_MS) return JUDGEMENT_PERFECT;
  if (absErrorMs <= JUDGE_WINDOW_GOOD_MS) return JUDGEMENT_GOOD;
  if (absErrorMs <= JUDGE_WINDOW_NORMAL_MS) return JUDGEMENT_NORMAL;
  return JUDGEMENT_MISS;
}

/** 判定 → 命令 quality 系数(GDD §3:1.0 / 0.7 / 0.4 / MISS 0) */
export function judgementQuality(j: Judgement): number {
  switch (j) {
    case JUDGEMENT_PERFECT:
      return QUALITY_PERFECT;
    case JUDGEMENT_GOOD:
      return QUALITY_GOOD;
    case JUDGEMENT_NORMAL:
      return QUALITY_NORMAL;
    default:
      return 0;
  }
}
