// core/simulation/mouseRhythm.test.ts

import { describe, expect, it } from 'vitest';
import {
  createFixedChart,
  generateMouseRhythmChart,
  judgeHoldTail,
  judgeRhythmClick,
  rhythmProgress,
} from './mouseRhythm';

describe('generateMouseRhythmChart', () => {
  it('generates deterministic charts from a seed', () => {
    const a = generateMouseRhythmChart(42, { style: 'dignity', targetCount: 5, bpm: 72 });
    const b = generateMouseRhythmChart(42, { style: 'dignity', targetCount: 5, bpm: 72 });
    expect(a.targets.map((t) => `${t.id}:${t.x.toFixed(3)}:${t.y.toFixed(3)}:${t.hitAt.toFixed(3)}`)).toEqual(
      b.targets.map((t) => `${t.id}:${t.x.toFixed(3)}:${t.y.toFixed(3)}:${t.hitAt.toFixed(3)}`),
    );
  });

  it('respects target counts including hold and shadow targets', () => {
    const chart = generateMouseRhythmChart(7, { style: 'mad', targetCount: 9, bpm: 96, holdCount: 2, movingCount: 2 });
    expect(chart.targets).toHaveLength(9);
    expect(chart.targets.filter((t) => t.kind === 'hold')).toHaveLength(2);
    expect(chart.targets.filter((t) => t.kind === 'shadow')).toHaveLength(2);
    expect(chart.targets.every((t) => t.rank >= 1)).toBe(true);
  });

  it('keeps targets inside the play area', () => {
    const chart = generateMouseRhythmChart(3, { style: 'tragic', targetCount: 8, bpm: 66 });
    for (const t of chart.targets) {
      expect(t.x).toBeGreaterThan(0.05);
      expect(t.x).toBeLessThan(0.95);
      expect(t.y).toBeGreaterThan(0.05);
      expect(t.y).toBeLessThan(0.9);
    }
  });

  it('hold targets carry a duration within bounds', () => {
    const chart = generateMouseRhythmChart(11, { style: 'mad', targetCount: 5, bpm: 90, holdCount: 2 });
    for (const t of chart.targets.filter((t) => t.kind === 'hold')) {
      expect(t.holdDuration).toBeGreaterThanOrEqual(0.8);
      expect(t.holdDuration).toBeLessThanOrEqual(2.2);
    }
  });
});

describe('judgeRhythmClick (osu 式)', () => {
  const chart = createFixedChart();

  it('perfect inside circle at hit time', () => {
    const r = judgeRhythmClick(chart, chart.targets[0], 2.0, { x: 0.4, y: 0.5 });
    expect(r.judgement).toBe('perfect');
    expect(r.completed).toBe(true);
    expect(r.inside).toBe(true);
  });

  it('early/late flags are directional', () => {
    const early = judgeRhythmClick(chart, chart.targets[0], 2.0 - 0.05, { x: 0.4, y: 0.5 });
    const late = judgeRhythmClick(chart, chart.targets[0], 2.0 + 0.05, { x: 0.4, y: 0.5 });
    expect(early.early).toBe(true);
    expect(late.early).toBe(false);
    expect(early.judgement).toBe('perfect');
    expect(late.judgement).toBe('perfect');
  });

  it('tiered windows: perfect < good < normal', () => {
    const good = judgeRhythmClick(chart, chart.targets[0], 2.0 + 0.16, { x: 0.4, y: 0.5 });
    const normal = judgeRhythmClick(chart, chart.targets[0], 2.0 + 0.24, { x: 0.4, y: 0.5 });
    expect(good.judgement).toBe('good');
    expect(normal.judgement).toBe('normal');
  });

  it('miss outside the window or outside the circle', () => {
    const tooLate = judgeRhythmClick(chart, chart.targets[0], 2.0 + 0.5, { x: 0.4, y: 0.5 });
    expect(tooLate.judgement).toBe('miss');
    const outside = judgeRhythmClick(chart, chart.targets[0], 2.0, { x: 0.8, y: 0.5 });
    expect(outside.judgement).toBe('miss');
    expect(outside.inside).toBe(false);
  });
});

describe('judgeHoldTail', () => {
  const chart = createFixedChart();
  const hold = chart.targets[1]; // hitAt 4, hold 1s → end 5

  it('perfect release at tail', () => {
    const r = judgeHoldTail(chart, hold, 5.0);
    expect(r.judgement).toBe('perfect');
    expect(r.completed).toBe(true);
  });

  it('early release degrades', () => {
    const r = judgeHoldTail(chart, hold, 4.3);
    expect(r.judgement).toBe('miss');
  });

  it('late release degrades to normal', () => {
    const r = judgeHoldTail(chart, hold, 5.3);
    expect(['good', 'normal', 'miss']).toContain(r.judgement);
  });
});

describe('rhythmProgress', () => {
  it('shrinks approach ring 0 → 1 onto the judgment ring', () => {
    const chart = createFixedChart();
    const t = chart.targets[0];
    const early = rhythmProgress(t, t.hitAt - 1.8); // lead 1.76s
    const at = rhythmProgress(t, t.hitAt);
    expect(early).toBe(0);
    expect(at).toBe(1);
  });
});
