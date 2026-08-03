import { describe, expect, it } from 'vitest';
import { checkPuzzle, compromise, generatePuzzle, shutdownCount } from '../src/game/virus';
import { createRun } from '../src/game/run';
import { EventBus } from '../src/core/events';

describe('virus system', () => {
  it('generatePuzzle is deterministic for a given seed', () => {
    const a = generatePuzzle(1234, 'power', 2, 0);
    const b = generatePuzzle(1234, 'power', 2, 0);
    expect(a.sequence).toEqual(b.sequence);
    expect(a.pads).toBe(b.pads);
    expect(a.timeLimit).toBe(b.timeLimit);
  });

  it('different nodes produce different puzzles', () => {
    const a = generatePuzzle(1234, 'power', 2, 0);
    const b = generatePuzzle(1234, 'missile', 2, 0);
    expect(a.sequence).not.toEqual(b.sequence);
  });

  it('puzzle difficulty grows with day', () => {
    const early = generatePuzzle(1, 'power', 1, 0);
    const late = generatePuzzle(1, 'power', 8, 0);
    expect(late.sequence.length).toBeGreaterThanOrEqual(early.sequence.length);
  });

  it('cortex bonus extends time limit', () => {
    const base = generatePuzzle(7, 'power', 3, 0);
    const boosted = generatePuzzle(7, 'power', 3, 2);
    expect(boosted.timeLimit).toBeCloseTo(base.timeLimit + 2);
  });

  it('checkPuzzle validates exact sequences', () => {
    const puzzle = generatePuzzle(42, 'media', 2, 0);
    expect(checkPuzzle(puzzle, [...puzzle.sequence])).toBe(true);
    const wrong = [...puzzle.sequence];
    wrong[0] = (wrong[0] + 1) % puzzle.pads;
    expect(checkPuzzle(puzzle, wrong)).toBe(false);
    expect(checkPuzzle(puzzle, puzzle.sequence.slice(0, -1))).toBe(false);
  });

  it('compromise applies node effects and is idempotent', () => {
    const run = createRun(9, ['plasma-lance']);
    const bus = new EventBus();
    compromise(run, 'power', bus);
    expect(run.nodes.find((n) => n.id === 'power')!.compromised).toBe(true);
    expect(run.autoDisables).toBe(1);
    compromise(run, 'power', bus);
    expect(run.autoDisables).toBe(1);

    compromise(run, 'missile', bus);
    expect(run.missileSabotaged).toBe(true);
    compromise(run, 'media', bus);
    expect(run.profile.propagandaMult).toBeGreaterThan(1);
  });

  it('shutdownCount tracks compromised nodes', () => {
    const run = createRun(9, ['plasma-lance']);
    expect(shutdownCount(run)).toBe(0);
    compromise(run, 'power', new EventBus());
    compromise(run, 'defense', new EventBus());
    compromise(run, 'orbital', new EventBus());
    expect(shutdownCount(run)).toBe(3);
  });
});
