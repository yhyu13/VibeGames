// The only place randomness lives — core/ stays pure by taking `rand: () => number` as a parameter.
// mulberry32: tiny, fast, deterministic-from-seed PRNG (no crypto need for a board game roll).
export function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function rollD6(rand: () => number): number {
  return Math.floor(rand() * 6) + 1
}

export function freshSeed(): number {
  return (Date.now() ^ ((performance?.now?.() ?? 0) * 1000)) >>> 0
}
