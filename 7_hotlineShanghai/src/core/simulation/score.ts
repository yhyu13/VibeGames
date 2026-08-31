// src/core/simulation/score.ts — 评分纯函数(M2.3 评分完整化;C7 全拆灯 S 加成)
// 契约 = TDD.md §3 评分行 + GDD §0.5 C7:
//   total = 100 − elapsed×0.5 − hitsTaken×10 + pickupBonus(全拾取 +5) + lampBonus(全拆灯 +10),clamp 0..100
//   S 级配方自洽:45s / 0 受击 / 全拾取 / 全拆灯 → 100 − 22.5 + 5 + 10 = 92.5 ≥ 90 = S
// 阈值唯一来源 = constants.ts SCORE_*_THRESHOLD(S≥90/A≥75/B≥60)。
import { SCORE_A_THRESHOLD, SCORE_B_THRESHOLD, SCORE_S_THRESHOLD } from '../constants';
import type { Rating } from '../types';

export const SCORE_TIME_PENALTY_PER_S = 0.5;
export const SCORE_HIT_PENALTY = 10;
export const SCORE_PICKUP_BONUS = 5;
export const SCORE_LAMP_BONUS = 10; // C7:全拆灯 S 加成

export interface ScoreInput {
  elapsed: number;
  hitsTaken: number;
  /** 0..1;房间无初始武器时调用方传 1(空真) */
  pickupRate: number;
  /** 所有可破坏灯(hp 非 null)均为 dead;房间无 breakable 灯 = 空真 true */
  allBreakableLightsBroken: boolean;
}

export interface ComputedScore {
  total: number;
  rating: Rating;
  pickupBonus: number;
  lampBonus: number;
}

export function computeScore(input: ScoreInput): ComputedScore {
  const pickupBonus = input.pickupRate >= 1 ? SCORE_PICKUP_BONUS : 0;
  const lampBonus = input.allBreakableLightsBroken ? SCORE_LAMP_BONUS : 0;
  const raw = 100
    - input.elapsed * SCORE_TIME_PENALTY_PER_S
    - input.hitsTaken * SCORE_HIT_PENALTY
    + pickupBonus + lampBonus;
  const total = Math.max(0, Math.min(100, Math.round(raw)));
  const rating: Rating = total >= SCORE_S_THRESHOLD ? 'S' : total >= SCORE_A_THRESHOLD ? 'A' : total >= SCORE_B_THRESHOLD ? 'B' : 'C';
  return { total, rating, pickupBonus, lampBonus };
}
