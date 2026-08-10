import type { InvestmentResult, PlayerState } from '../types'
import { getAssetById, tickForTurn } from '../data/assets'
import { INVEST_ALLOCATION_CAP_PCT } from '../constants'

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
