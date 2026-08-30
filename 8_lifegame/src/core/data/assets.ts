import type { Asset } from '../types'

// Mocked market — deterministic per-turn % ticks (not live data). See TDD.md §4, GDD.md §2.
// Live 2013-2032 real market API is explicitly deferred (source doc appendix Q3: "MVP阶段够用",
// but wiring one is out of scope for the 17-week intro calendar).
//
// v2.4: each asset now has a real PRICE LEVEL and ~40 weeks of PRE-SEMESTER history so the
// trading panel shows an actual tape from day one instead of a chart that starts at week 1.
// basePrice = the price at the semester open (2014-fall-plausible); preHistory = weekly
// % returns for 2014 leading into it, generated deterministically (per-asset drift/vol tuned
// to 2014 reality: A股 bull run, gold decline, BTC boom-bust) with an inline seeded PRNG so
// core/data stays pure (no engine import). ticks = the frozen 17 in-semester moves.

function seededGen(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Weekly % returns with a target drift (mean) and volatility (sd), rounded to 0.1%.
function genHistory(seed: number, drift: number, vol: number, n = 40): number[] {
  const rand = seededGen(seed)
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    // Box–Muller-ish via sum of 3 uniforms (cheap, deterministic, roughly normal).
    const u = (rand() + rand() + rand()) / 3 - 0.5
    const r = drift + u * vol * 2.5
    out.push(Math.round(r * 10) / 10)
  }
  return out
}

// v2.4 K线周期: split every weekly % move into 5 deterministic daily moves that compound back
// to exactly the same weekly total (4 jittered + 1 remainder), so the chart can switch
// 日K/周K/月K/半年K/年K without inventing new data. Purely presentational — prices stay weekly.
function dailyReturnsFor(seed: number, weeks: number[]): number[] {
  const rand = seededGen(seed)
  const out: number[] = []
  for (const w of weeks) {
    const partials: number[] = []
    let acc = 1
    for (let i = 0; i < 4; i++) {
      const d = w / 5 + (rand() - 0.5) * 2.4
      partials.push(Math.round(d * 100) / 100)
      acc *= 1 + partials[partials.length - 1] / 100
    }
    const last = ((w / 100 + 1) / acc - 1) * 100
    out.push(...partials, Math.round(last * 100) / 100)
  }
  return out
}

function withDaily(seed: number, asset: Omit<Asset, 'daily'>): Asset {
  return { ...asset, daily: dailyReturnsFor(seed + 1000, [...asset.preHistory, ...asset.ticks]) }
}

export const ASSETS: Asset[] = [
  withDaily(11, {
    id: 'money_fund', label: '货币基金', icon: '💵', risk: 'cash',
    basePrice: 1.0, decimals: 2,
    preHistory: genHistory(11, 0.03, 0.01),
    ticks: [0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1],
  }),
  withDaily(23, {
    id: 'bond', label: '债券', icon: '📜', risk: 'low',
    basePrice: 98, decimals: 2,
    preHistory: genHistory(23, 0.06, 0.12),
    ticks: [0.6, -0.3, 0.8, 0.4, -0.2, 0.7, 0.5, -0.4, 0.9, 0.3, 0.6, -0.2, 0.8, 0.4, -0.1, 0.7, 0.5],
  }),
  withDaily(37, {
    id: 'gold', label: '黄金', icon: '🥇', risk: 'low',
    basePrice: 265, decimals: 2,
    preHistory: genHistory(37, -0.25, 1.4),
    ticks: [1.2, -0.8, 1.6, -0.5, 2.1, -1.1, 1.4, 0.9, -1.5, 1.8, -0.6, 1.3, 2.2, -0.7, 1.5, 0.4, -1.2],
  }),
  withDaily(53, {
    id: 'index_fund', label: '指数基金', icon: '🧺', risk: 'medium',
    basePrice: 1.07, decimals: 3,
    preHistory: genHistory(53, 0.5, 1.2),
    ticks: [1, -1.5, 2.5, 0.5, 2, -1, 1.5, 3, -2, 3.5, 1, -2.5, 4, 1.5, -1, 2.5, 0.8],
  }),
  withDaily(71, {
    id: 'a_index', label: 'A股指数', icon: '📈', risk: 'medium',
    basePrice: 2100, decimals: 0,
    preHistory: genHistory(71, 1.0, 2.2),
    ticks: [2, -3, 5, 1, 4, -2, 3, 6, -4, 7, 2, -5, 8, -2, 5, 1, -3],
  }),
  withDaily(89, {
    id: 'hk_index', label: '港股指数', icon: '🌊', risk: 'medium',
    basePrice: 22800, decimals: 0,
    preHistory: genHistory(89, 0.3, 1.8),
    ticks: [-1, 4, 2, -4, 6, 1, -2, 5, 3, -3, 7, -1, 4, 2, -3, 5, 1],
  }),
  withDaily(97, {
    id: 'btc', label: 'BTC', icon: '🪙', risk: 'high',
    basePrice: 3100, decimals: 4,
    preHistory: genHistory(97, -0.8, 8),
    ticks: [8, -12, 15, -6, 20, -8, 10, 25, -22, 14, -10, 22, 30, -15, 18, -7, 24],
  }),
]

export function getAssetById(id: string): Asset {
  const asset = ASSETS.find((a) => a.id === id)
  if (!asset) throw new Error(`unknown asset id: ${id}`)
  return asset
}

export function tickForTurn(asset: Asset, turn1Based: number): number {
  const idx = Math.max(0, Math.min(asset.ticks.length - 1, turn1Based - 1))
  return asset.ticks[idx] ?? 0
}
