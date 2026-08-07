import { describe, expect, it } from 'vitest';
import { createMouseRhythmFixture, generateMouseRhythmChart, judgeRhythmClick, targetPosition } from './mouseRhythm';

describe('mouse rhythm chart', () => {
  it('generates a deterministic 3-6 second sequence with a terminal target', () => {
    const a = generateMouseRhythmChart(7, 4.8, true);
    const b = generateMouseRhythmChart(7, 4.8, true);
    expect(a).toEqual(b);
    expect(a.duration).toBe(4.8);
    expect(a.targets).toHaveLength(4);
    expect(a.targets.at(-1)?.terminal).toBe(true);
    expect(a.targets.map((target) => target.rank)).toEqual(['R1', 'R2', 'R3', 'R4']);
  });

  it('uses four visual shapes and keeps fixture positions stable', () => {
    const chart = createMouseRhythmFixture({ seed: 99, positions: [{ x: 0.3, y: 0.4 }] });
    expect(chart.targets.map((target) => target.shape)).toEqual(['circle', 'diamond', 'triangle', 'square']);
    expect(chart.targets.every((target) => target.position.x === 0.3 && target.position.y === 0.4)).toBe(true);
  });

  it('grades timing and pointer distance in four bands', () => {
    const chart = createMouseRhythmFixture();
    const target = chart.targets[0];
    expect(target).toBeDefined();
    if (!target) return;
    expect(judgeRhythmClick(target, target.hitAt, target.position, 4).judgement).toBe('perfect');
    expect(judgeRhythmClick(target, target.hitAt + 0.18, target.position, 4).judgement).toBe('good');
    expect(judgeRhythmClick(target, target.hitAt + 0.35, target.position, 4).judgement).toBe('normal');
    expect(judgeRhythmClick(target, target.hitAt + 0.6, target.position, 4).judgement).toBe('miss');
  });

  it('moves only the non-fixture terminal target', () => {
    const chart = generateMouseRhythmChart(2, 4.8);
    const target = chart.targets.at(-1);
    expect(target).toBeDefined();
    if (!target) return;
    expect(targetPosition(target, target.appearAt)).toEqual(target.position);
    expect(targetPosition(target, target.hitAt)).not.toEqual(target.position);
  });
});
