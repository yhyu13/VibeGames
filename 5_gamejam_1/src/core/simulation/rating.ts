// core/simulation/rating.ts — 表演评分（TDD §4.5 / 01 §4.1–§4.4 冻结阈值）
// 纯函数：A1–A4 星级、总评、verdict、心态结转（carryDown）。

import type { RatingAxisId, RatingFacts, Verdict } from '../types';
import {
  A1_JITTER,
  A1_STANCE_HIT,
  A2_COMPLETENESS,
  A4_SEEN_5STAR,
  CARRY_FAIL_ANXIETY,
  CARRY_FAIL_SELFDOUBT,
  CARRY_PERFECT_ANXIETY,
  CARRY_PERFECT_LINE,
  COMBO_A3,
  RATING_PERFECT,
  RATING_QUALIFIED,
} from '../constants';
import { clamp } from '../math';

/** 轮次表行（结构兼容 ROUND_TABLE；保留参数以备 A4/后续扩展使用） */
export interface RatingRoundsRow {
  approachSpeed: number;
  damage: number;
  dodgeNormal: number;
  dodgePerfect: number;
  barrageMax: number;
  anxietyBase: number;
  seenCarry: number;
}

export interface RatingResult {
  axes: Record<RatingAxisId, number>; // A1–A4，各 1–5 星
  total: number;                      // 四轴均值 1–5
  verdict: Verdict;
}

/** A4 被看见度代理：由证据字段换算（lingerTime 秒 ×5 + barrageCount 条 ×10），
 *  未来 RatingFacts 扩展真实 seen 字段时可替换；Simulation 亦可先加 seen 再调用。 */
export function seenProxy(facts: RatingFacts): number {
  return clamp(facts.lingerTime * 5 + facts.barrageCount * 10, 0, 100);
}

export function computeRating(facts: RatingFacts, roundsTable: readonly RatingRoundsRow[]): RatingResult {
  void roundsTable; // 当前实现不依赖轮次表（阈值全在 constants）

  // A1 走位流畅度：站位命中 ≥90% 且抖动 <5% → 5★；≥75% 且 <10% → 4★；≥55% → 3★；≥35% → 2★
  const a1 =
    facts.stanceAccuracy >= A1_STANCE_HIT && facts.jitterRatio < A1_JITTER ? 5 :
    facts.stanceAccuracy >= 75 && facts.jitterRatio < 10 ? 4 :
    facts.stanceAccuracy >= 55 ? 3 :
    facts.stanceAccuracy >= 35 ? 2 : 1;

  // A2 台词感染力：完整率 ≥95% 且忘词 0 → 5★；≥80% 且 ≤1 → 4★；≥60% → 3★；≥40% → 2★
  const a2 =
    facts.lineCompleteness >= A2_COMPLETENESS && facts.forgotLines === 0 ? 5 :
    facts.lineCompleteness >= 80 && facts.forgotLines <= 1 ? 4 :
    facts.lineCompleteness >= 60 ? 3 :
    facts.lineCompleteness >= 40 ? 2 : 1;

  // A3 视觉效果：3/3 阶段且连击 ≥4 → 5★；3/3 → 4★；2/3 → 3★；1/3 → 2★；0/3 → 1★
  const a3 =
    facts.stagesCompleted >= 3 && facts.maxCombo >= COMBO_A3 ? 5 :
    facts.stagesCompleted >= 3 ? 4 :
    facts.stagesCompleted >= 2 ? 3 :
    facts.stagesCompleted >= 1 ? 2 : 1;

  // A4 有没有让玩家记住（系统代填）：被看见 ≥80 → 5★；≥60 → 4★；≥40 → 3★；≥20 → 2★
  const seen = seenProxy(facts);
  const a4 = seen >= A4_SEEN_5STAR ? 5 : seen >= 60 ? 4 : seen >= 40 ? 3 : seen >= 20 ? 2 : 1;

  const axes: Record<RatingAxisId, number> = { mobility: a1, delivery: a2, visual: a3, remembered: a4 };
  const total = (a1 + a2 + a3 + a4) / 4;

  const verdict: Verdict =
    total >= RATING_PERFECT ? 'perfect' :
    total >= RATING_QUALIFIED ? 'qualified' : 'fail';

  return { axes, total, verdict };
}

// ============ 心态结转（01 §4.4 / TDD §4.4.2） ============

export interface CarryDownResult {
  anxietyDelta: number;        // 下轮起始焦虑修正
  lineRateDelta: number;       // 台词完整率修正（+5% 信心 buff）
  selfDoubtFirstLine: number;  // 首句替换 L_SELFDOUBT 的概率（0–1；Simulation 掷骰）
}

/** 完美 → −5/+5%/无；合格 → 无修正；失格 → +4/首句 30% 自我怀疑 */
export function carryDown(result: { verdict: Verdict }): CarryDownResult {
  switch (result.verdict) {
    case 'perfect':
      return { anxietyDelta: CARRY_PERFECT_ANXIETY, lineRateDelta: CARRY_PERFECT_LINE, selfDoubtFirstLine: 0 };
    case 'qualified':
      return { anxietyDelta: 0, lineRateDelta: 0, selfDoubtFirstLine: 0 };
    case 'fail':
      return { anxietyDelta: CARRY_FAIL_ANXIETY, lineRateDelta: 0, selfDoubtFirstLine: CARRY_FAIL_SELFDOUBT };
  }
}
