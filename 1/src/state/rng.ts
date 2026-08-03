// Mulberry32: a small, fast, deterministic 32-bit PRNG.
// All run content must derive from a single seed; no Math.random in state/.

export interface RNG {
  next(): number;
  range(min: number, max: number): number;
  int(min: number, max: number): number;
  pick<T>(items: ReadonlyArray<T>): T;
  weighted<T>(items: ReadonlyArray<T>, weights: ReadonlyArray<number>): T;
  shuffle<T>(items: ReadonlyArray<T>): T[];
  chance(p: number): boolean;
  fork(): RNG;
}

export function createRng(seed: number): RNG {
  let state = seed >>> 0;
  if (state === 0) state = 0x9e3779b9;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    range(min, max) {
      return min + (max - min) * next();
    },
    int(min, max) {
      return Math.floor(min + (max - min + 1) * next());
    },
    pick<T>(items: ReadonlyArray<T>): T {
      if (items.length === 0) throw new Error('RNG.pick: empty list');
      const idx = Math.floor(next() * items.length);
      return items[idx]!;
    },
    weighted<T>(items: ReadonlyArray<T>, weights: ReadonlyArray<number>): T {
      if (items.length !== weights.length) throw new Error('RNG.weighted: length mismatch');
      let total = 0;
      for (const w of weights) total += w;
      let r = next() * total;
      for (let i = 0; i < items.length; i++) {
        r -= weights[i]!;
        if (r <= 0) return items[i]!;
      }
      return items[items.length - 1]!;
    },
    shuffle<T>(items: ReadonlyArray<T>): T[] {
      const out = items.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const a = out[i]!;
        const b = out[j]!;
        out[i] = b;
        out[j] = a;
      }
      return out;
    },
    chance(p) {
      return next() < p;
    },
    fork() {
      return createRng(Math.floor(next() * 0x7fffffff) || 1);
    },
  };
}

/** Stable hash for short strings (for deriving per-region seeds). */
export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}