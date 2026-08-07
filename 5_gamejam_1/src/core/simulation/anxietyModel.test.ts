// src/core/simulation/anxietyModel.test.ts — S01–S13 / R01–R11 / 分带 / 退化掷骰（TDD §4.4.2 冻结）
import { describe, expect, it } from 'vitest';
import {
  BAND_CALM_MIN,
  BAND_NERVOUS_MIN,
  BAND_PANIC_MIN,
  BAND_SHAKY_MIN,
  R_DECAY,
  R_DECAY_DELAY,
  R_EVALUATE,
  R_EVALUATE_CAP,
  R_EVALUATE_FLOOR,
  S_BARRAGE,
  S_BASE,
  S_FIRST_GLIMPSE,
  S_FORGOT,
  S_HESITATE,
  S_HIT,
  S_INTERRUPT,
  S_MISS,
  S_NORMAL_DODGE,
  S_PERFECT_DODGE,
  S_ROUND,
  S_SCRIPT_DIFFICULTY,
  S_STEADY_APPROACH,
} from '../constants';
import {
  applyDecay,
  applySources,
  bandEffects,
  computeBand,
  degradeRoll,
  evaluateSoothing,
  sourceDelta,
  totalDelta,
} from './anxietyModel';

const seq = (vals: number[]): (() => number) => {
  const q = [...vals];
  return () => (q.length > 0 ? (q.shift() as number) : 0.5);
};

describe('frozen S/R constants (TDD §4.4.2)', () => {
  it('S01–S13 source constants', () => {
    expect(S_BASE).toBe(30);
    expect(S_ROUND).toBe(4);
    expect(S_SCRIPT_DIFFICULTY).toEqual({ dignity: 8, tragic: 12, mad: 18 });
    expect(S_FIRST_GLIMPSE).toBe(8);
    expect(S_STEADY_APPROACH).toBe(1.4);
    expect(S_HESITATE).toBe(0.6);
    expect(S_BARRAGE).toBe(12);
    expect(S_HIT).toBe(5);
    expect(S_PERFECT_DODGE).toBe(10);
    expect(S_NORMAL_DODGE).toBe(3);
    expect(S_MISS).toBe(2);
    expect(S_FORGOT).toBe(6);
    expect(S_INTERRUPT).toBe(15);
  });

  it('R01/R02 decay constants', () => {
    expect(R_DECAY).toBe(2);
    expect(R_DECAY_DELAY).toBe(3);
    expect(R_EVALUATE).toBe(4);
    expect(R_EVALUATE_FLOOR).toBe(10);
    expect(R_EVALUATE_CAP).toBe(40);
  });

  it('band boundary constants', () => {
    expect(BAND_CALM_MIN).toBe(0);
    expect(BAND_NERVOUS_MIN).toBe(31);
    expect(BAND_SHAKY_MIN).toBe(61);
    expect(BAND_PANIC_MIN).toBe(86);
  });
});

describe('sourceDelta S01–S13', () => {
  it('S01 base', () => {
    expect(sourceDelta({ kind: 'base' })).toBe(S_BASE);
  });

  it('S02 round fatigue +4×(R−1)', () => {
    expect(sourceDelta({ kind: 'round', round: 1 })).toBe(0);
    expect(sourceDelta({ kind: 'round', round: 2 })).toBe(4);
    expect(sourceDelta({ kind: 'round', round: 3 })).toBe(8);
    expect(sourceDelta({ kind: 'round', round: 4 })).toBe(12);
  });

  it('S03 script difficulty', () => {
    expect(sourceDelta({ kind: 'script', script: 'dignity' })).toBe(8);
    expect(sourceDelta({ kind: 'script', script: 'tragic' })).toBe(12);
    expect(sourceDelta({ kind: 'script', script: 'mad' })).toBe(18);
  });

  it('S04–S13 discrete increments', () => {
    expect(sourceDelta({ kind: 'firstGlimpse' })).toBe(S_FIRST_GLIMPSE);
    expect(sourceDelta({ kind: 'barrage' })).toBe(S_BARRAGE);
    expect(sourceDelta({ kind: 'hit' })).toBe(S_HIT);
    expect(sourceDelta({ kind: 'perfectDodge' })).toBe(S_PERFECT_DODGE);
    expect(sourceDelta({ kind: 'normalDodge' })).toBe(S_NORMAL_DODGE);
    expect(sourceDelta({ kind: 'miss' })).toBe(S_MISS);
    expect(sourceDelta({ kind: 'forgot' })).toBe(S_FORGOT);
    expect(sourceDelta({ kind: 'interrupt' })).toBe(S_INTERRUPT);
  });

  it('S05/S06 per-second rates scale with dt', () => {
    expect(sourceDelta({ kind: 'steady', dt: 1 })).toBeCloseTo(S_STEADY_APPROACH);
    expect(sourceDelta({ kind: 'steady', dt: 0.5 })).toBeCloseTo(0.7);
    expect(sourceDelta({ kind: 'hesitate', dt: 1 })).toBeCloseTo(S_HESITATE);
    expect(sourceDelta({ kind: 'hesitate', dt: 2 })).toBeCloseTo(1.2);
  });
});

describe('applySources / totalDelta', () => {
  it('sums events and clamps to [0, 100]', () => {
    expect(applySources(30, [{ kind: 'base' }])).toBe(60);
    expect(applySources(5, [{ kind: 'hit' }])).toBe(10);
    expect(applySources(98, [{ kind: 'hit' }])).toBe(100);
    expect(applySources(95, [{ kind: 'base' }])).toBe(100);
    expect(applySources(30, [{ kind: 'base' }, { kind: 'hit' }, { kind: 'miss' }])).toBe(67);
  });

  it('totalDelta reports the batch sum', () => {
    expect(totalDelta([])).toBe(0);
    expect(totalDelta([{ kind: 'steady', dt: 1 }, { kind: 'hesitate', dt: 1 }])).toBeCloseTo(2);
    expect(totalDelta([{ kind: 'hit' }, { kind: 'forgot' }])).toBe(11);
  });
});

describe('applyDecay R01 natural decay', () => {
  it('does nothing before the 3s no-source delay', () => {
    expect(applyDecay(50, 1, 0)).toBe(50);
    expect(applyDecay(50, 1, 2.9)).toBe(50);
  });

  it('decays −2/s once 3s of no source elapses', () => {
    expect(applyDecay(50, 1, 3)).toBe(48);
    expect(applyDecay(50, 0.5, 5)).toBe(49);
  });

  it('stops below anxiety 10 (calm floor)', () => {
    expect(applyDecay(9, 1, 5)).toBe(9);
    expect(applyDecay(10, 1, 5)).toBe(8);
  });

  it('never decays below 0', () => {
    expect(applyDecay(50, 100, 5)).toBe(0);
  });
});

describe('evaluateSoothing R02', () => {
  it('soothes −4/s by elapsed', () => {
    expect(evaluateSoothing(50, 1 / 60, 1)).toBe(46);
    expect(evaluateSoothing(100, 1 / 60, 5)).toBe(80);
  });

  it('caps at −40 and floors at 10', () => {
    expect(evaluateSoothing(50, 1 / 60, 10)).toBe(10);
    expect(evaluateSoothing(50, 1 / 60, 100)).toBe(10);
    expect(evaluateSoothing(30, 1 / 60, 10)).toBe(10);
    expect(evaluateSoothing(5, 1 / 60, 0)).toBe(10);
  });
});

describe('computeBand band derivation at boundaries', () => {
  it('maps 0–100 to the four bands at the frozen cuts', () => {
    expect(computeBand(0)).toBe('calm');
    expect(computeBand(30)).toBe('calm');
    expect(computeBand(31)).toBe('nervous');
    expect(computeBand(60)).toBe('nervous');
    expect(computeBand(61)).toBe('shaky');
    expect(computeBand(85)).toBe('shaky');
    expect(computeBand(86)).toBe('panic');
    expect(computeBand(99)).toBe('panic');
    expect(computeBand(100)).toBe('panic');
  });
});

describe('bandEffects', () => {
  it('returns the frozen effect row per band', () => {
    expect(bandEffects('calm')).toMatchObject({ attackSpeed: 1, lineRate: 1, power: 1, spread: 0, miss: 0 });
    expect(bandEffects('nervous')).toMatchObject({ attackSpeed: 0.95, lineRate: 0.9, power: 1.05, spread: 2, miss: 0.05 });
    expect(bandEffects('shaky')).toMatchObject({ attackSpeed: 0.85, lineRate: 0.65, power: 1.15, spread: 5, miss: 0.15 });
    expect(bandEffects('panic')).toMatchObject({ attackSpeed: 0.7, lineRate: 0.4, power: 1.3, spread: 10, miss: 0.3 });
  });
});

describe('degradeRoll', () => {
  it('calm never degrades', () => {
    expect(degradeRoll('calm', () => 0)).toEqual({ degraded: false, kind: null });
  });

  it('nervous degrades to stammer 10% of the time', () => {
    expect(degradeRoll('nervous', () => 0.05)).toEqual({ degraded: true, kind: 'stammer' });
    expect(degradeRoll('nervous', () => 0.0999999)).toEqual({ degraded: true, kind: 'stammer' });
    expect(degradeRoll('nervous', () => 0.1)).toEqual({ degraded: false, kind: null });
    expect(degradeRoll('nervous', () => 0.5)).toEqual({ degraded: false, kind: null });
  });

  it('shaky degrades 35%: forget (15/35) vs stammer (20/35)', () => {
    expect(degradeRoll('shaky', () => 0.35)).toEqual({ degraded: false, kind: null });
    expect(degradeRoll('shaky', seq([0, 0]))).toEqual({ degraded: true, kind: 'forget' });
    expect(degradeRoll('shaky', seq([0, 0.4285]))).toEqual({ degraded: true, kind: 'forget' });
    expect(degradeRoll('shaky', seq([0, 0.4286]))).toEqual({ degraded: true, kind: 'stammer' });
    expect(degradeRoll('shaky', seq([0, 0.9]))).toEqual({ degraded: true, kind: 'stammer' });
    expect(degradeRoll('shaky', () => 0.5)).toEqual({ degraded: false, kind: null });
  });

  it('panic degrades 60%: forget (30/60) vs broken (30/60)', () => {
    expect(degradeRoll('panic', () => 0.6)).toEqual({ degraded: false, kind: null });
    expect(degradeRoll('panic', seq([0, 0]))).toEqual({ degraded: true, kind: 'forget' });
    expect(degradeRoll('panic', seq([0, 0.4999]))).toEqual({ degraded: true, kind: 'forget' });
    expect(degradeRoll('panic', seq([0, 0.5]))).toEqual({ degraded: true, kind: 'broken' });
    expect(degradeRoll('panic', seq([0, 0.9]))).toEqual({ degraded: true, kind: 'broken' });
    expect(degradeRoll('panic', () => 0.9)).toEqual({ degraded: false, kind: null });
  });
});
