// src/core/simulation/rating.test.ts — A1–A4 评分 / 总评 / verdict / 心态结转（TDD §4.4.2 冻结）
import { describe, expect, it } from 'vitest';
import type { RatingFacts } from '../types';
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
  ROUND_TABLE,
} from '../constants';
import { carryDown, computeRating, seenProxy } from './rating';

const facts = (over: Partial<RatingFacts> = {}): RatingFacts => ({
  stanceAccuracy: 100,
  jitterRatio: 0,
  lineCompleteness: 100,
  forgotLines: 0,
  maxCombo: 0,
  stagesCompleted: 0,
  lingerTime: 0,
  barrageCount: 0,
  ...over,
});

describe('frozen rating constants (TDD §4.4.2)', () => {
  it('verdict thresholds are 4.5 / 3.5', () => {
    expect(RATING_PERFECT).toBe(4.5);
    expect(RATING_QUALIFIED).toBe(3.5);
  });

  it('axis thresholds match the frozen table', () => {
    expect(A1_STANCE_HIT).toBe(90);
    expect(A1_JITTER).toBe(5);
    expect(A2_COMPLETENESS).toBe(95);
    expect(A4_SEEN_5STAR).toBe(80);
    expect(COMBO_A3).toBe(4);
  });

  it('mindset carryover constants match the frozen table', () => {
    expect(CARRY_PERFECT_ANXIETY).toBe(-5);
    expect(CARRY_PERFECT_LINE).toBe(0.05);
    expect(CARRY_FAIL_ANXIETY).toBe(4);
    expect(CARRY_FAIL_SELFDOUBT).toBe(0.3);
  });
});

describe('A1 mobility (stance ≥90% + jitter <5% → 5★)', () => {
  it('gives 5★ at exactly 90% and jitter 4', () => {
    expect(computeRating(facts({ stanceAccuracy: 90, jitterRatio: 4 }), ROUND_TABLE).axes.mobility).toBe(5);
  });

  it('drops to 4★ when jitter is exactly 5 (strict <)', () => {
    expect(computeRating(facts({ stanceAccuracy: 90, jitterRatio: 5 }), ROUND_TABLE).axes.mobility).toBe(4);
  });

  it('tiers: ≥75 → 4, ≥55 → 3, ≥35 → 2, else 1', () => {
    const r = (stanceAccuracy: number) =>
      computeRating(facts({ stanceAccuracy, jitterRatio: 0 }), ROUND_TABLE).axes.mobility;
    expect(r(75)).toBe(4);
    expect(r(55)).toBe(3);
    expect(r(35)).toBe(2);
    expect(r(34)).toBe(1);
  });
});

describe('A2 delivery (completeness ≥95% + zero forgets → 5★)', () => {
  it('gives 5★ at exactly 95% with zero forgets', () => {
    expect(computeRating(facts({ lineCompleteness: 95, forgotLines: 0 }), ROUND_TABLE).axes.delivery).toBe(5);
  });

  it('drops to 4★ with a single forgotten line', () => {
    expect(computeRating(facts({ lineCompleteness: 95, forgotLines: 1 }), ROUND_TABLE).axes.delivery).toBe(4);
  });

  it('tiers: ≥80 → 4, ≥60 → 3, ≥40 → 2, else 1', () => {
    const r = (lineCompleteness: number) =>
      computeRating(facts({ lineCompleteness, forgotLines: 0 }), ROUND_TABLE).axes.delivery;
    expect(r(80)).toBe(4);
    expect(r(60)).toBe(3);
    expect(r(40)).toBe(2);
    expect(r(39)).toBe(1);
  });
});

describe('A3 visual (3/3 stages + combo ≥4 → 5★)', () => {
  it('gives 5★ at 3/3 stages with combo 4', () => {
    expect(computeRating(facts({ stagesCompleted: 3, maxCombo: 4 }), ROUND_TABLE).axes.visual).toBe(5);
  });

  it('gives 4★ at 3/3 stages with combo 3', () => {
    expect(computeRating(facts({ stagesCompleted: 3, maxCombo: 3 }), ROUND_TABLE).axes.visual).toBe(4);
  });

  it('tiers: ≥2 → 3, ≥1 → 2, else 1', () => {
    const r = (stagesCompleted: number) => computeRating(facts({ stagesCompleted }), ROUND_TABLE).axes.visual;
    expect(r(2)).toBe(3);
    expect(r(1)).toBe(2);
    expect(r(0)).toBe(1);
  });
});

describe('A4 remembered (seen proxy: linger×5 + barrage×10, ≥80 → 5★)', () => {
  it('seenProxy clamps to [0, 100]', () => {
    expect(seenProxy(facts())).toBe(0);
    expect(seenProxy(facts({ lingerTime: 100, barrageCount: 100 }))).toBe(100);
    expect(seenProxy(facts({ lingerTime: 20, barrageCount: 0 }))).toBe(100);
  });

  it('seenProxy combines lingerTime and barrageCount', () => {
    expect(seenProxy(facts({ lingerTime: 10, barrageCount: 5 }))).toBe(100);
    expect(seenProxy(facts({ lingerTime: 8, barrageCount: 0 }))).toBe(40);
  });

  it('tiers: ≥80 → 5, ≥60 → 4, ≥40 → 3, ≥20 → 2, else 1', () => {
    const r = (lingerTime: number) => computeRating(facts({ lingerTime }), ROUND_TABLE).axes.remembered;
    expect(r(16)).toBe(5); // seen 80
    expect(r(15.8)).toBe(4); // seen 79
    expect(r(12)).toBe(4); // seen 60
    expect(r(8)).toBe(3); // seen 40
    expect(r(4)).toBe(2); // seen 20
    expect(r(3.9)).toBe(1); // seen 19.5
  });
});

describe('total rating (mean of A1–A4) and verdict', () => {
  it('all-5 axes → total 5, perfect', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 95, jitterRatio: 2, lineCompleteness: 98, stagesCompleted: 3, maxCombo: 5, lingerTime: 16 }),
      ROUND_TABLE,
    );
    expect(result.axes).toEqual({ mobility: 5, delivery: 5, visual: 5, remembered: 5 });
    expect(result.total).toBe(5);
    expect(result.verdict).toBe('perfect');
  });

  it('total exactly 4.5 → perfect (≥4.5)', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 95, jitterRatio: 2, lineCompleteness: 98, stagesCompleted: 3, maxCombo: 5, lingerTime: 8 }),
      ROUND_TABLE,
    );
    expect(result.total).toBe(4.5);
    expect(result.verdict).toBe('perfect');
  });

  it('total 4.25 → qualified (≥3.5)', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 95, jitterRatio: 2, lineCompleteness: 80, stagesCompleted: 3, maxCombo: 3, lingerTime: 12 }),
      ROUND_TABLE,
    );
    expect(result.total).toBe(4.25);
    expect(result.verdict).toBe('qualified');
  });

  it('total exactly 3.5 → qualified (≥3.5)', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 75, jitterRatio: 0, lineCompleteness: 60, stagesCompleted: 2, lingerTime: 12 }),
      ROUND_TABLE,
    );
    expect(result.axes).toEqual({ mobility: 4, delivery: 3, visual: 3, remembered: 4 });
    expect(result.total).toBe(3.5);
    expect(result.verdict).toBe('qualified');
  });

  it('total 3.25 → fail (<3.5)', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 75, jitterRatio: 0, lineCompleteness: 60, stagesCompleted: 2, lingerTime: 8 }),
      ROUND_TABLE,
    );
    expect(result.total).toBe(3.25);
    expect(result.verdict).toBe('fail');
  });

  it('all-3 axes → total 3, fail', () => {
    const result = computeRating(
      facts({ stanceAccuracy: 55, jitterRatio: 0, lineCompleteness: 60, stagesCompleted: 2, lingerTime: 8 }),
      ROUND_TABLE,
    );
    expect(result.total).toBe(3);
    expect(result.verdict).toBe('fail');
  });
});

describe('carryDown (mindset carryover, TDD §4.4.2)', () => {
  it('perfect → −5 anxiety / +5% line rate / no self-doubt', () => {
    expect(carryDown({ verdict: 'perfect' })).toEqual({
      anxietyDelta: CARRY_PERFECT_ANXIETY,
      lineRateDelta: CARRY_PERFECT_LINE,
      selfDoubtFirstLine: 0,
    });
  });

  it('qualified → no correction', () => {
    expect(carryDown({ verdict: 'qualified' })).toEqual({
      anxietyDelta: 0,
      lineRateDelta: 0,
      selfDoubtFirstLine: 0,
    });
  });

  it('fail → +4 anxiety / 30% first-line self-doubt', () => {
    expect(carryDown({ verdict: 'fail' })).toEqual({
      anxietyDelta: CARRY_FAIL_ANXIETY,
      lineRateDelta: 0,
      selfDoubtFirstLine: CARRY_FAIL_SELFDOUBT,
    });
  });
});
