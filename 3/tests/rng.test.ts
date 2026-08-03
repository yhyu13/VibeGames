import { describe, expect, it } from 'vitest';
import { RNG, hashString, mulberry32, seedFromDate } from '../src/core/rng';

describe('rng', () => {
  it('mulberry32 is deterministic for same seed', () => {
    const a = mulberry32(12345);
    const b = mulberry32(12345);
    for (let i = 0; i < 100; i++) expect(a()).toBe(b());
  });

  it('produces values in [0,1)', () => {
    const rng = new RNG(1);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('int respects inclusive bounds', () => {
    const rng = new RNG(7);
    for (let i = 0; i < 500; i++) {
      const v = rng.int(2, 5);
      expect(v).toBeGreaterThanOrEqual(2);
      expect(v).toBeLessThanOrEqual(5);
      expect(Number.isInteger(v)).toBe(true);
    }
  });

  it('pick returns members of the array', () => {
    const rng = new RNG(99);
    const arr = ['a', 'b', 'c', 'd'];
    for (let i = 0; i < 200; i++) expect(arr).toContain(rng.pick(arr));
  });

  it('shuffle preserves elements', () => {
    const rng = new RNG(42);
    const src = [1, 2, 3, 4, 5, 6];
    const out = rng.shuffle([...src]);
    expect([...out].sort()).toEqual(src);
  });

  it('hashString differs for different inputs', () => {
    expect(hashString('a')).not.toBe(hashString('b'));
    expect(hashString('hello world')).toBe(hashString('hello world'));
  });

  it('seedFromDate is stable within a day and changes across days', () => {
    const d1 = new Date('2026-08-04T00:00:00Z');
    const d2 = new Date('2026-08-04T23:59:59Z');
    const d3 = new Date('2026-08-05T00:00:00Z');
    expect(seedFromDate(d1)).toBe(seedFromDate(d2));
    expect(seedFromDate(d1)).not.toBe(seedFromDate(d3));
  });

  it('weighted picks only listed entries', () => {
    const rng = new RNG(5);
    for (let i = 0; i < 200; i++) {
      const v = rng.weighted([['x', 1] as const, ['y', 1000] as const]);
      expect(['x', 'y']).toContain(v);
    }
  });
});
