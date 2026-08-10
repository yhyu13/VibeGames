import type { Asset, Candle, InfoQuality, InvestmentResult, MarketNews, PlayerState } from '../types'
import { ASSETS, getAssetById, tickForTurn } from '../data/assets'
import { MARKET_NEWS } from '../data/marketNews'
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

// v1.3 §2: K-line candles synthesized from the deterministic tick curve — base ¥100,
// open = prev close, wicks derived from tick magnitude. NO rand, and PAST turns only
// (turns before the current one): the v1.2 numeric row leaked all 8 ticks incl. future.
export function buildCandles(ticks: number[], upToTurn1Based: number): Candle[] {
  const candles: Candle[] = []
  let prev = 100
  const count = Math.min(upToTurn1Based - 1, ticks.length)
  for (let i = 0; i < count; i++) {
    const tick = ticks[i] ?? 0
    const open = prev
    const close = prev * (1 + tick / 100)
    const wick = (Math.abs(tick) + 1) / 200
    candles.push({
      open,
      close,
      high: Math.max(open, close) * (1 + wick),
      low: Math.min(open, close) * (1 - wick),
    })
    prev = close
  }
  return candles
}

// v1.3 §2: mood distortion now reshapes the last-window candles (window 3, or 1 when
// cognition ≥ 60 narrows it) — perception bends the RECENT tape, deep history stays honest.
// pessimistic: closes pressed down 2–5%; overconfident: up-candles inflated 2–5%,
// down-candles flattened to "没跌". rational: untouched, consumes NO rand (draw-order contract).
function distortCandles(candles: Candle[], info: InfoQuality, rand: () => number): Candle[] {
  const out = candles.map((c) => ({ ...c }))
  if (info.quality === 'rational') return out
  const windowSize = info.narrowed ? 1 : 3
  for (let i = Math.max(0, out.length - windowSize); i < out.length; i++) {
    const c = out[i]!
    const close =
      info.quality === 'pessimistic'
        ? c.close * (1 - (2 + Math.floor(rand() * 4)) / 100)
        : c.close >= c.open
          ? c.close * (1 + (2 + Math.floor(rand() * 4)) / 100)
          : c.open
    out[i] = { open: c.open, close, high: Math.max(c.open, close) * 1.005, low: Math.min(c.open, close) * 0.995 }
  }
  return out
}

// v1.3 §3: 热点新闻 — one headline per asset per turn, 80% faithful to the sign of the
// tick it PRECEDES (news breaks before the move: a noisy signal, not a cheat code).
// Mood doesn't change the headline; it changes the player's 解读 (spin), shown as a subline.
function pickNews(asset: Asset, turn1Based: number, quality: InfoQuality['quality'], rand: () => number): MarketNews {
  const templates = MARKET_NEWS[asset.id]
  const pair = templates?.[(turn1Based - 1) % (templates?.length || 1)]
  if (!pair) return { headline: '今日无大事。', spin: 'neutral' }
  const actualUp = tickForTurn(asset, turn1Based) >= 0
  const showUp = rand() < 0.8 ? actualUp : !actualUp
  const spin = quality === 'rational' ? 'neutral' : quality === 'pessimistic' ? 'bearish' : 'bullish'
  return { headline: showUp ? pair.up : pair.down, spin }
}

// v1.3: built when ENTERING the invest phase (post-event mood), from the seeded turn rand
// stream. Draw order per asset (ASSETS order): distortion draws (non-rational only), then
// the news-faithfulness draw. Only reachable once investUnlocked (Simulation gates it).
export function buildMarketView(
  player: PlayerState,
  rand: () => number,
): { candles: Record<string, Candle[]>; news: Record<string, MarketNews> } {
  const info = infoQuality(player)
  const candles: Record<string, Candle[]> = {}
  const news: Record<string, MarketNews> = {}
  for (const asset of ASSETS) {
    candles[asset.id] = distortCandles(buildCandles(asset.ticks, player.turn), info, rand)
    news[asset.id] = pickNews(asset, player.turn, info.quality, rand)
  }
  return { candles, news }
}
