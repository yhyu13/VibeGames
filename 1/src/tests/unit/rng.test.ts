import { describe, it, expect } from 'vitest';
import { createRng } from '../../state/rng.js';

describe('RNG', () => {
  it('is deterministic with the same seed', () => {
    const a = createRng(42);
    const b = createRng(42);
    expect(a.next()).toBe(b.next());
    expect(a.next()).toBe(b.next());
    expect(a.next()).toBe(b.next());
  });

  it('produces different sequences with different seeds', () => {
    const a = createRng(1);
    const b = createRng(2);
    const aVals = [a.next(), a.next(), a.next()];
    const bVals = [b.next(), b.next(), b.next()];
    expect(aVals).not.toEqual(bVals);
  });

  it('range produces values within bounds', () => {
    const r = createRng(7);
    for (let i = 0; i < 100; i++) {
      const v = r.range(5, 10);
      expect(v).toBeGreaterThanOrEqual(5);
      expect(v).toBeLessThanOrEqual(10);
    }
  });

  it('int produces integers within bounds', () => {
    const r = createRng(7);
    for (let i = 0; i < 100; i++) {
      const v = r.int(0, 3);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(3);
    }
  });

  it('pick returns an element from the list', () => {
    const r = createRng(7);
    const xs = ['a', 'b', 'c'];
    for (let i = 0; i < 50; i++) {
      expect(xs).toContain(r.pick(xs));
    }
  });

  it('shuffle preserves length and elements', () => {
    const r = createRng(7);
    const xs = [1, 2, 3, 4, 5];
    const out = r.shuffle(xs);
    expect(out).toHaveLength(xs.length);
    expect([...out].sort((a, b) => a - b)).toEqual(xs);
  });

  it('chance respects probability', () => {
    const r = createRng(7);
    const yes = Array.from({ length: 1000 }, () => r.chance(0.5)).filter(Boolean).length;
    expect(yes).toBeGreaterThan(400);
    expect(yes).toBeLessThan(600);
  });
});