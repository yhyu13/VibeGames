import { describe, expect, it } from 'vitest';
import { BAND_TEMPO, ROUND_TABLE } from '../constants';
import type { RatingFacts } from '../types';
import { attackHits, attackWindows, judgeAttackTiming, nearestBeatOffset, resolveAttackJudgement } from './attackJudgement';
import { computeRating } from './rating';

describe('attack beat grid', () => {
  it('snaps to the nearest 72 BPM beat on both sides', () => {
    const beat = 60 / BAND_TEMPO.calm;
    expect(nearestBeatOffset(beat - 0.1, BAND_TEMPO.calm)).toBeCloseTo(0.1);
    expect(nearestBeatOffset(beat + 0.1, BAND_TEMPO.calm)).toBeCloseTo(0.1);
  });

  it('treats exact beat starts as zero offset', () => {
    const beat = 60 / BAND_TEMPO.panic;
    expect(nearestBeatOffset(beat * 7, BAND_TEMPO.panic)).toBeCloseTo(0);
  });
});

describe('attack timing windows', () => {
  it('uses round and script difficulty as independent scales', () => {
    const dignity = attackWindows(1, 'dignity', 'calm').perfect;
    const tragic = attackWindows(1, 'tragic', 'calm').perfect;
    const mad = attackWindows(1, 'mad', 'calm').perfect;
    expect(dignity).toBeGreaterThan(tragic);
    expect(tragic).toBeGreaterThan(mad);
    expect(attackWindows(4, 'tragic', 'calm').perfect).toBeLessThan(tragic);
  });

  it('narrows as anxiety-band tempo rises', () => {
    const calm = attackWindows(2, 'tragic', 'calm').perfect;
    const shaky = attackWindows(2, 'tragic', 'shaky').perfect;
    const panic = attackWindows(2, 'tragic', 'panic').perfect;
    expect(calm).toBeGreaterThan(shaky);
    expect(shaky).toBeGreaterThan(panic);
  });

  it('keeps ordered perfect, good, and normal windows', () => {
    const windows = attackWindows(3, 'mad', 'shaky');
    expect(windows.perfect).toBeGreaterThan(0);
    expect(windows.good).toBeGreaterThan(windows.perfect);
    expect(windows.normal).toBeGreaterThan(windows.good);
  });
});

describe('four-tier attack judgement', () => {
  it('classifies each window boundary', () => {
    const beat = 60 / BAND_TEMPO.calm;
    const windows = attackWindows(1, 'tragic', 'calm');
    expect(judgeAttackTiming(beat + windows.perfect - 1e-9, 1, 'tragic', 'calm')).toBe('perfect');
    expect(judgeAttackTiming(beat + windows.good - 1e-9, 1, 'tragic', 'calm')).toBe('good');
    expect(judgeAttackTiming(beat + windows.normal - 1e-9, 1, 'tragic', 'calm')).toBe('normal');
    expect(judgeAttackTiming(beat + windows.normal + 0.001, 1, 'tragic', 'calm')).toBe('miss');
  });
});

describe('attack hit roll', () => {
  it('makes perfect judgement hit without consuming rng', () => {
    let calls = 0;
    expect(attackHits('perfect', 0, () => { calls += 1; return 1; })).toBe(true);
    expect(calls).toBe(0);
  });

  it('makes miss fail without consuming rng', () => {
    let calls = 0;
    expect(attackHits('miss', 1, () => { calls += 1; return 0; })).toBe(false);
    expect(calls).toBe(0);
  });

  it('rolls good and normal judgements against hit chance', () => {
    expect(attackHits('good', 0.55, () => 0.54)).toBe(true);
    expect(attackHits('normal', 0.55, () => 0.55)).toBe(false);
  });

  it('accumulates combo and preserves max combo for A3 facts', () => {
    const outcome = resolveAttackJudgement('perfect', 0, 3, 3, () => 1);
    expect(outcome).toEqual({
      hit: true,
      combo: 4,
      maxCombo: 4,
      reaction: 'cheer',
    });
    const facts: RatingFacts = {
      stanceAccuracy: 0,
      jitterRatio: 0,
      lineCompleteness: 0,
      forgotLines: 0,
      maxCombo: outcome.maxCombo,
      stagesCompleted: 3,
      lingerTime: 0,
      barrageCount: 0,
    };
    expect(computeRating(facts, ROUND_TABLE).axes.visual).toBe(5);
  });

  it('breaks combo and emits mock reaction on a failed roll', () => {
    expect(resolveAttackJudgement('good', 0.5, 3, 4, () => 0.5)).toEqual({
      hit: false,
      combo: 0,
      maxCombo: 4,
      reaction: 'mock',
    });
  });
});
