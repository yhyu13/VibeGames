import type { Asset } from '../types'

// Mocked market — deterministic per-turn % ticks (not live data). See TDD.md §4, GDD.md §2.
// Live 2013-2032 real market API is explicitly deferred (source doc appendix Q3: "MVP阶段够用",
// but wiring one is out of scope for a 13-week intro semester).
export const ASSETS: Asset[] = [
  { id: 'a_index', label: 'A股指数', icon: '📈', ticks: [2, -3, 5, 1, 4, -2, 3, 6, -4, 7, 2, -5, 8] },
  { id: 'hk_index', label: '港股指数', icon: '🌊', ticks: [-1, 4, 2, -4, 6, 1, -2, 5, 3, -3, 7, -1, 4] },
  { id: 'btc', label: 'BTC', icon: '🪙', ticks: [8, -12, 15, -6, 20, -8, 10, 25, -18, 14, -10, 22, 30] },
]

export function getAssetById(id: string): Asset {
  const asset = ASSETS.find((a) => a.id === id)
  if (!asset) throw new Error(`unknown asset id: ${id}`)
  return asset
}

export function tickForTurn(asset: Asset, turn1Based: number): number {
  const idx = (turn1Based - 1) % asset.ticks.length
  return asset.ticks[idx] ?? 0
}
