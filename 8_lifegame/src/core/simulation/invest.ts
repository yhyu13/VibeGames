import type { InfoQuality, InvestmentResult, PlayerState } from '../types'
import { ASSETS, getAssetById, tickForTurn } from '../data/assets'
import { COGNITION_INFO_THRESHOLD, INVEST_ALLOCATION_CAP_PCT } from '../constants'

export function resolveInvestment(player: PlayerState, assetId: string, allocationPct: number): InvestmentResult {
  const clampedPct = Math.max(0, Math.min(INVEST_ALLOCATION_CAP_PCT, allocationPct))
  const asset = getAssetById(assetId)
  const pnlPct = tickForTurn(asset, player.turn)
  const stake = player.wealth * (clampedPct / 100)
  const pnlAbs = Math.round(stake * (pnlPct / 100))
  return { assetId, allocationPct: clampedPct, pnlPct, pnlAbs }
}

// "平行命运" counterfactual — the SAME market tick (pnlPct) and SAME allocation %, applied to
// the alt trajectory's own (different) wealth base. Investing itself isn't origin-gated in this
// scope (the mocked market has no origin-dependent access rules), only the principal differs.
export function resolveAltInvestment(altWealth: number, allocationPct: number, pnlPct: number): number {
  const stake = altWealth * (allocationPct / 100)
  return Math.round(stake * (pnlPct / 100))
}

// v1.2 §4 — mood → information quality. Reuses the frozen 30/60 mood bands (no new thresholds):
//   mood < 30  → pessimistic   (预览被压低:噪音遮盖远端走势)
//   30 ≤ mood ≤ 60 → rational  (完整、诚实的预览 — 也是 mood=60 的"甜点":拿 +1 骰子却不失真)
//   mood > 60  → overconfident (预览被抬高:上行被放大,下行被抹平 "这次稳了")
// The ASSETS NEVER CHANGE — resolveInvestment above still reads the untouched curve; only the
// preview is distorted. narrowed: cognition ≥ 60 shrinks the distortion window 3 ticks → 1
// (learning literally improves information).
export function infoQuality(entity: { mood: number; cognition: number }): InfoQuality {
  const narrowed = entity.cognition >= COGNITION_INFO_THRESHOLD
  if (entity.mood < 30) return { quality: 'pessimistic', narrowed }
  if (entity.mood > 60) return { quality: 'overconfident', narrowed }
  return { quality: 'rational', narrowed }
}

function distortTicks(ticks: number[], info: InfoQuality, rand: () => number): number[] {
  if (info.quality === 'rational') return [...ticks]
  const windowSize = info.narrowed ? 1 : 3
  const out = [...ticks]
  for (let i = out.length - windowSize; i < out.length; i++) {
    const t = out[i]!
    out[i] =
      info.quality === 'pessimistic'
        ? t - (2 + Math.floor(rand() * 4)) // shifted down 2–5 (seeded noise)
        : t > 0
          ? t + 2 + Math.floor(rand() * 4) // upside inflated +2–5
          : 0 // downside muted to flat
  }
  return out
}

// Built when ENTERING the invest phase (post-event mood), from the seeded turn rand stream.
export function buildAssetPreviews(player: PlayerState, rand: () => number): Record<string, number[]> {
  const info = infoQuality(player)
  const previews: Record<string, number[]> = {}
  for (const asset of ASSETS) {
    previews[asset.id] = distortTicks(asset.ticks, info, rand)
  }
  return previews
}
