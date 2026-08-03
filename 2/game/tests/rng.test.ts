import { describe, expect, it } from "vitest";
import { mulberry32, hashStringToSeed } from "../src/core/rng";

describe("mulberry32", () => {
  it("is deterministic for the same seed", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 100 }, () => a.next());
    const seqB = Array.from({ length: 100 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  it("produces values in [0,1)", () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("int respects bounds", () => {
    const rng = mulberry32(99);
    for (let i = 0; i < 1000; i++) {
      const v = rng.int(2, 5);
      expect(v).toBeGreaterThanOrEqual(2);
      expect(v).toBeLessThanOrEqual(5);
      expect(Number.isInteger(v)).toBe(true);
    }
  });

  it("shuffle returns a permutation", () => {
    const rng = mulberry32(1);
    const input = [1, 2, 3, 4, 5];
    const out = rng.shuffle(input);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(out).not.toEqual(input);
  });

  it("hashStringToSeed is stable", () => {
    expect(hashStringToSeed("hello")).toBe(hashStringToSeed("hello"));
    expect(hashStringToSeed("hello")).not.toBe(hashStringToSeed("hellp"));
  });
});
