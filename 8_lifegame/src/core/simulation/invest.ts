import type { Asset, BlockedOrder, Candle, DraftOrder, InfoQuality, InvestAdvice, InvestmentResult, MarketNews, OrderResult, PaperAccount, PlayerState, TradingRealism } from '../types'
import { ASSETS, getAssetById, tickForTurn } from '../data/assets'
import { MARKET_NEWS } from '../data/marketNews'
import { COGNITION_INFO_THRESHOLD, REVIEW_BAND_CREDITS, TRADE_FEE_RATE, TRADING_RULES, MA_TIMING_FACTOR, MA_TIMING_MA_WINDOW } from '../constants'

// ═══ v2.4: real prices + 模拟盘 paper account ═════════════════════════════════════

// Price of an asset at the OPEN of semester turn k (1-based): semester-open base price × all
// pre-semester history × the k−1 already-closed semester ticks. No future leak.
export function priceAt(asset: Asset, turn1Based: number): number {
  let price = asset.basePrice
  for (const r of asset.preHistory) price *= 1 + r / 100
  for (let i = 0; i < Math.min(turn1Based - 1, asset.ticks.length); i++) price *= 1 + (asset.ticks[i] ?? 0) / 100
  return price
}

// The week's closing price: open × (1 + this turn's tick + the asset shock, if any).
// Positions are marked-to-market at this price on the results card.
export function endPriceAt(asset: Asset, turn1Based: number, shockPct?: Partial<Record<string, number>>): number {
  const shock = shockPct?.[asset.id] ?? 0
  return priceAt(asset, turn1Based) * (1 + (tickForTurn(asset, turn1Based) + shock) / 100)
}

export function createPaperAccount(initialCash: number): PaperAccount {
  return { cash: initialCash, positions: {}, realizedPnl: 0, initialCapital: initialCash }
}

export function roundUnits(units: number, decimals: number): number {
  const scale = 10 ** decimals
  return Math.round(units * scale) / scale
}

// v3.1 (Ch09): 分品种费率 + 真实度 — 新手档免佣, 真实档按品种 feeRate (回退 TRADE_FEE_RATE).
function feeRateFor(asset: Asset, realism: TradingRealism): number {
  return realism === 'novice' ? 0 : (TRADING_RULES[asset.id]?.feeRate ?? TRADE_FEE_RATE)
}

// v3.1 (Ch09): 均线择时 — 趋势信号 = 当周开盘价 vs 该品种近 MA_TIMING_MA_WINDOW 周收盘均线
// (endPriceAt 收盘序列, 确定性, 0 新随机源). 上行才买; 下行拦单「均线之下不接刀」.
// 注: 信号收盘序列不含历史 shock (确定性近似), 而 mark-to-market 含当周 shock — 趋势判定不受异动污染.
export function maTimingSignalFor(assetId: string, turn1Based: number): 'up' | 'down' {
  const asset = getAssetById(assetId)
  const open = priceAt(asset, turn1Based)
  const closes: number[] = []
  for (let k = Math.max(1, turn1Based - MA_TIMING_MA_WINDOW); k < turn1Based; k++) closes.push(endPriceAt(asset, k))
  if (closes.length === 0) return 'down' // 学期第 1 周无历史 → 无趋势, 不择时
  const ma = closes.reduce((s, v) => s + v, 0) / closes.length
  return open > ma ? 'up' : 'down'
}

// v3.1 (Ch09): 均线择时解锁门槛 — PDF「基础课解锁」, 复用 COGNITION_INFO_THRESHOLD=60.
export function maTimingUnlockedFor(cognition: number): boolean {
  return cognition >= COGNITION_INFO_THRESHOLD
}

// Execute one spot order at the given price. Buy clamps to affordable cash; sell clamps to
// the held position. Returns the mutated account + the executed fill (empty when nothing filled).
// v3.1 (Ch09): `realism` gates the fee (novice=0, real=per-asset feeRate).
export function executeOrder(
  account: PaperAccount,
  asset: Asset,
  side: 'buy' | 'sell',
  amount: number,
  price: number,
  realism: TradingRealism = 'real',
): { account: PaperAccount; order: OrderResult } {
  const feeRate = feeRateFor(asset, realism)
  const zero: OrderResult = { assetId: asset.id, side, units: 0, price, amount: 0, fee: 0 }
  if (!Number.isFinite(amount) || amount <= 0) return { account, order: zero }
  if (side === 'buy') {
    const maxAmount = account.cash / (1 + feeRate)
    const effAmount = Math.min(amount, maxAmount)
    if (effAmount <= 0) return { account, order: zero }
    let units = roundUnits(effAmount / price, asset.decimals)
    if (units <= 0) return { account, order: zero }
    // v2.10: roundUnits rounds to NEAREST, which can round UP and push cost+fee past cash,
    // driving the paper account negative. Floor to the largest affordable whole-unit amount.
    const scale = 10 ** asset.decimals
    const maxUnits = Math.floor((account.cash / ((1 + feeRate) * price)) * scale) / scale
    if (units > maxUnits) units = maxUnits
    if (units <= 0) return { account, order: zero }
    const cost = units * price
    const fee = cost * feeRate
    const prior = account.positions[asset.id]
    return {
      account: {
        ...account,
        cash: account.cash - cost - fee,
        positions: {
          ...account.positions,
          [asset.id]: { units: (prior?.units ?? 0) + units, costBasis: (prior?.costBasis ?? 0) + cost },
        },
      },
      order: { assetId: asset.id, side, units, price, amount: cost, fee },
    }
  }
  const prior = account.positions[asset.id]
  if (!prior || prior.units <= 0) return { account, order: zero }
  const units = roundUnits(Math.min(amount / price, prior.units), asset.decimals)
  if (units <= 0) return { account, order: zero }
  const proceeds = units * price
  const fee = proceeds * feeRate
  const soldFraction = units / prior.units
  const costReleased = prior.costBasis * soldFraction
  const realized = proceeds - fee - costReleased
  const leftUnits = prior.units - units
  const positions = { ...account.positions }
  if (leftUnits > 0) positions[asset.id] = { ...prior, units: leftUnits, costBasis: prior.costBasis - costReleased }
  else delete positions[asset.id]
  return {
    account: {
      ...account,
      cash: account.cash + proceeds - fee,
      realizedPnl: account.realizedPnl + realized,
      positions,
    },
    order: { assetId: asset.id, side, units, price, amount: proceeds, fee },
  }
}
// Total account value at a given set of prices: cash + Σ units × price.
export function accountValue(account: PaperAccount, prices: Record<string, number>): number {
  let value = account.cash
  for (const [id, position] of Object.entries(account.positions)) {
    if (!position) continue
    value += position.units * (prices[id] ?? 0)
  }
  return value
}

// Unrealized P&L of held positions (mark-to-market vs avg cost), shown in the panel.
export function unrealizedPnl(account: PaperAccount, prices: Record<string, number>): number {
  let pnl = 0
  for (const [id, position] of Object.entries(account.positions)) {
    if (!position) continue
    pnl += position.units * (prices[id] ?? 0) - position.costBasis
  }
  return pnl
}

export function allPrices(turn1Based: number): Record<string, number> {
  const out: Record<string, number> = {}
  for (const asset of ASSETS) out[asset.id] = priceAt(asset, turn1Based)
  return out
}

// v2.7: 市场温度 — derived from THIS week's deterministic tick moves across all assets, so it
// stays seed-stable (no new randomness). The average in-semester % move → 低迷 / 震荡 / 亢奋.
// Pure function; the UI reads it live each invest beat, so 温度 visibly shifts week to week.
export type MarketRegime = 'cold' | 'warm' | 'hot'
export interface MarketTemperature {
  regime: MarketRegime
  label: string
  emoji: string
  avgPct: number
}
export function marketTemperatureFor(assets: Asset[], turn1Based: number): MarketTemperature {
  let sum = 0
  let n = 0
  for (const asset of assets) {
    sum += tickForTurn(asset, turn1Based)
    n += 1
  }
  const avgPct = n ? sum / n : 0
  const regime: MarketRegime = avgPct < -1 ? 'cold' : avgPct > 1 ? 'hot' : 'warm'
  const label = regime === 'cold' ? '低迷' : regime === 'hot' ? '亢奋' : '震荡'
  const emoji = regime === 'cold' ? '📉' : regime === 'hot' ? '📈' : '🌡️'
  return { regime, label, emoji, avgPct }
}

// v2.11: the results-card investment summary for one turn — now a BASKET of N orders. `accountBefore`
// is the paper account at the START of the invest beat; each order executes at its asset's open
// price against the RUNNING account (a sell frees cash for a later buy; a buy clamps to remaining
// cash), then everything is marked to the week's close (open × (1 + tick + shock)).
//
// Determinism: orders execute in canonical PRODUCT order (ASSETS array index), NOT the user's
// add order — so the same visible basket always yields the same fills/account regardless of the
// order the drafts were added in. This path consumes NO rand() (the seeded stream is untouched).
export function resolveOrders(
  accountBefore: PaperAccount,
  orders: DraftOrder[],
  turn1Based: number,
  shockPct?: Partial<Record<string, number>>,
  realism: TradingRealism = 'real',
): { account: PaperAccount; result: InvestmentResult } {
  const openPrices = allPrices(turn1Based)
  const openValue = accountValue(accountBefore, openPrices)

  const assetIndex = (id: string) => {
    const i = ASSETS.findIndex((a) => a.id === id)
    return i === -1 ? Number.MAX_SAFE_INTEGER : i
  }
  const sorted = [...orders]
    .filter((o) => o && Number.isFinite(o.amount) && o.amount > 0)
    .sort((a, b) => assetIndex(a.assetId) - assetIndex(b.assetId))

  let account = accountBefore
  const fills: OrderResult[] = []
  const blocked: BlockedOrder[] = []

  for (const order of sorted) {
    const asset = getAssetById(order.assetId)
    const open = priceAt(asset, turn1Based)
    // v2.7: 真实交易规则 — A股/港股/基金 T+1 (今天买的明天才能卖). The gate reads the RUNNING
    // account's position, so a same-turn buy→sell of one asset can't evade it (sell sees boughtTurn=turn).
    // v3.1 (Ch09): 新手档免 T+1 (无摩擦).
    const rules = TRADING_RULES[order.assetId]
    const heldPos = account.positions[order.assetId]
    const tPlus1Blocked = realism === 'real' && order.side === 'sell' && rules?.tPlus1 === true && heldPos?.boughtTurn === turn1Based
    if (tPlus1Blocked) {
      blocked.push({ assetId: order.assetId, side: order.side, reason: `${asset.label} ${rules!.market} T+1 · 今天买的明天才能卖` })
      continue
    }

    // v3.1 (Ch09): 均线择时 — 当周内「开盘价买 + 收盘价卖」的 in-out 波段 (真实档 only). 当场闭合,
    // 不落 PaperPosition (避免与同资产买入持有持仓混淆); 收益直接实现到现金. 上行才买, 下行拦单.
    // 认知门 (≥60) 在 UI/store 侧强制 (InvestPanel 禁用 + 不发出择时委托); 此处信任调用方 (C.A.T: 纯函数层不做 UI 门).
    if (order.strategy === 'ma_timing' && order.side === 'buy' && realism === 'real') {
      const signal = maTimingSignalFor(order.assetId, turn1Based)
      if (signal === 'down') {
        blocked.push({ assetId: order.assetId, side: order.side, reason: `${asset.label} 均线之下不接刀 · 等趋势转上` })
        continue
      }
      const tick = tickForTurn(asset, turn1Based) + (shockPct?.[order.assetId] ?? 0)
      const feeRate = feeRateFor(asset, realism)
      const affordable = Math.min(order.amount, account.cash / (1 + feeRate))
      let units = roundUnits(affordable / open, asset.decimals)
      // v2.10 anti-round-up guard (same as executeOrder): floor to the largest affordable whole-unit
      // amount so cost+fee never pushes the paper account negative.
      const scale = 10 ** asset.decimals
      const maxUnits = Math.floor((account.cash / ((1 + feeRate) * open)) * scale) / scale
      if (units > maxUnits) units = maxUnits
      if (units <= 0) continue
      const cost = units * open
      const buyFee = cost * feeRate
      // 择时收盘价: open × (1 + tick × MA_TIMING_FACTOR) — 统一放大器, 择对多赚 / 假信号多亏.
      const strategyClose = open * (1 + (tick * MA_TIMING_FACTOR) / 100)
      const proceeds = units * strategyClose
      const sellFee = proceeds * feeRate
      const netReturn = proceeds - sellFee - (cost + buyFee) // 当周实现净收益 (可负)
      account = { ...account, cash: account.cash + netReturn, realizedPnl: account.realizedPnl + netReturn }
      fills.push({ assetId: order.assetId, side: 'buy', units, price: open, amount: cost, fee: buyFee + sellFee })
      continue
    }

    const executed = executeOrder(account, asset, order.side, order.amount, open, realism)
    account = executed.account
    if (executed.order.units > 0) {
      fills.push(executed.order)
      if (order.side === 'buy') {
        // record the buy turn so the T+1 sell gate knows when this position last changed hands
        const pos = account.positions[order.assetId]
        if (pos) account = { ...account, positions: { ...account.positions, [order.assetId]: { ...pos, boughtTurn: turn1Based } } }
      }
    }
  }

  const endPrices: Record<string, number> = {}
  for (const a of ASSETS) endPrices[a.id] = endPriceAt(a, turn1Based, shockPct)
  const totalValue = accountValue(account, endPrices)
  const weekPnlAbs = totalValue - openValue
  const capital = accountBefore.initialCapital

  const hasBuy = fills.some((f) => f.side === 'buy') || blocked.some((b) => b.side === 'buy')
  const hasSell = fills.some((f) => f.side === 'sell') || blocked.some((b) => b.side === 'sell')
  const side: InvestmentResult['side'] =
    fills.length === 0 && blocked.length === 0 ? 'hold'
    : hasBuy && hasSell ? 'mixed'
    : hasBuy ? 'buy'
    : 'sell'

  const firstFill = fills[0]
  return {
    account,
    result: {
      assetId: firstFill?.assetId ?? sorted[0]?.assetId ?? '',
      side,
      fills,
      blocked,
      units: fills.reduce((s, f) => s + f.units, 0),
      price: firstFill?.price ?? 0,
      amount: fills.reduce((s, f) => s + f.amount, 0),
      fee: fills.reduce((s, f) => s + f.fee, 0),
      weekPnlAbs,
      totalValue,
      totalPnlAbs: totalValue - capital,
      initialCapital: capital,
      blockedReason: blocked[0]?.reason,
    },
  }
}

// v2.4 legacy single-order entry point — kept as a thin wrapper over resolveOrders so the old
// (accountBefore, assetId, side, amount, turn, shockPct) signature and its 'hold'/'buy'/'sell'
// result shape survive for scripts/probes (showcase.mjs) and the __sim.checks dev handle.
export function resolveOrder(
  accountBefore: PaperAccount,
  assetId: string,
  side: 'buy' | 'sell' | 'hold',
  amount: number,
  turn1Based: number,
  shockPct?: Partial<Record<string, number>>,
): { account: PaperAccount; result: InvestmentResult } {
  const hold = side === 'hold' || amount <= 0
  const { account, result } = resolveOrders(accountBefore, hold ? [] : [{ assetId, side, amount }], turn1Based, shockPct)
  if (!hold) return { account, result }
  return {
    account,
    result: { ...result, assetId, side: 'hold', price: priceAt(getAssetById(assetId), turn1Based) },
  }
}

// ═══ v1.2 §4 — mood → information quality ══════════════════════════════════════════
//   mood < 30  → pessimistic   (预览被压低:噪音遮盖远端走势)
//   30 ≤ mood ≤ 60 → rational  (完整、诚实的预览 — 也是 mood=60 的"甜点")
//   mood > 60  → overconfident (预览被抬高:上行被放大,下行被抹平 "这次稳了")
// The ASSETS NEVER CHANGE — prices/P&L still read the untouched curve; only the preview is
// distorted. narrowed: cognition ≥ 60 shrinks the distortion window 3 ticks → 1.
export function infoQuality(entity: { mood: number; cognition: number }): InfoQuality {
  const narrowed = entity.cognition >= COGNITION_INFO_THRESHOLD
  if (entity.mood < 30) return { quality: 'pessimistic', narrowed }
  if (entity.mood > 60) return { quality: 'overconfident', narrowed }
  return { quality: 'rational', narrowed }
}

// v1.3 §2: K-line candles synthesized from a % return curve — open = prev close, wicks derived
// from tick magnitude. NO rand, PAST turns only (turns before the current one). v2.4 feeds the
// merged pre-history + semester curve, so the tape is rich from turn 1.
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

// ═══ v2.4: K线周期 (日K / 周K / 月K / 半年K / 年K) ══════════════════════════════════
// The market is weekly, so the daily series is a deterministic 5-day split of each weekly move
// (see assets.ts `daily`); coarser frames aggregate the (already mood-distorted) weekly tape.

export type ChartFrame = 'day' | 'week' | 'month' | 'halfYear' | 'year'

// max bars shown per frame (the window the user actually reads)
const FRAME_MAX: Record<ChartFrame, number> = { day: 60, week: 30, month: 12, halfYear: 3, year: 2 }

export function aggregateCandles(candles: Candle[], groupSize: number): Candle[] {
  const out: Candle[] = []
  for (let i = 0; i < candles.length; i += groupSize) {
    const group = candles.slice(i, i + groupSize)
    out.push({
      open: group[0]!.open,
      close: group[group.length - 1]!.close,
      high: Math.max(...group.map((c) => c.high)),
      low: Math.min(...group.map((c) => c.low)),
    })
  }
  return out
}

// Display candles for the selected frame. `weekly` is the mood-distorted weekly preview built
// at invest entry; day uses the raw deterministic daily tape (closed days only — no future leak).
export function frameCandlesFor(asset: Asset, turn1Based: number, frame: ChartFrame, weekly: Candle[]): Candle[] {
  if (frame === 'day') {
    const closedDays = 5 * (asset.preHistory.length + Math.max(0, turn1Based - 1))
    return buildCandles(asset.daily, closedDays + 1).slice(-FRAME_MAX.day)
  }
  if (frame === 'week') return weekly.slice(-FRAME_MAX.week)
  const group = { month: 4, halfYear: 24, year: 48 }[frame]
  return aggregateCandles(weekly, group).slice(-FRAME_MAX[frame])
}

// v1.3 §2: mood distortion reshapes the last-window candles (window 3, or 1 when cognition
// ≥ 60 narrows it) — perception bends the RECENT tape, deep history stays honest.
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
// tick it PRECEDES (news breaks before the move). Mood adds a spin subline.
function pickNews(asset: Asset, turn1Based: number, quality: InfoQuality['quality'], rand: () => number): MarketNews {
  const templates = MARKET_NEWS[asset.id]
  const pair = templates?.[Math.max(0, Math.min(templates.length - 1, turn1Based - 1))]
  if (!pair) return { headline: '今日无大事。', spin: 'neutral' }
  const actualUp = tickForTurn(asset, turn1Based) >= 0
  const showUp = rand() < 0.8 ? actualUp : !actualUp
  const spin = quality === 'rational' ? 'neutral' : quality === 'pessimistic' ? 'bearish' : 'bullish'
  return { headline: showUp ? pair.up : pair.down, spin }
}

// v1.6 §1: advice fidelity is driven by REVIEWED trades (0 blind / 1 noisy / 2 clear / 3+ sharp).
// Faithful = the label matches the coming tick's bucket; unfaithful inverts it. Exactly ONE rand
// draw per non-blind asset. (Asset shocks are rare world events — advice keys off the base tick.)
export function investAdvice(asset: Asset, turn1Based: number, reviewCredits: number, rand: () => number): InvestAdvice {
  const tick = tickForTurn(asset, turn1Based)
  const trueLabel = tick >= 2 ? '适宜投资' : tick <= -2 ? '不适宜投资' : '谨慎参与'
  if (reviewCredits < REVIEW_BAND_CREDITS.noisy) return { band: 'blind', label: '看不懂', faithful: false }
  const band =
    reviewCredits >= REVIEW_BAND_CREDITS.sharp ? 'sharp' : reviewCredits >= REVIEW_BAND_CREDITS.clear ? 'clear' : 'noisy'
  const p = band === 'sharp' ? 0.95 : band === 'clear' ? 0.85 : 0.7
  const faithful = rand() < p
  const label = faithful ? trueLabel : trueLabel === '适宜投资' ? '不适宜投资' : '适宜投资'
  return { band, label, faithful }
}

// v1.3: built when ENTERING the invest phase (post-event mood), from the seeded turn rand
// stream. v2.4: the candle window is the merged pre-history + semester curve, so charts show
// 2014 history plus semester progress (never a blank week-1 tape).
export function buildMarketView(
  player: PlayerState,
  reviewCredits: number,
  rand: () => number,
): { candles: Record<string, Candle[]>; news: Record<string, MarketNews>; advices: Record<string, InvestAdvice> } {
  const info = infoQuality(player)
  const candles: Record<string, Candle[]> = {}
  const news: Record<string, MarketNews> = {}
  const advices: Record<string, InvestAdvice> = {}
  for (const asset of ASSETS) {
    const merged = [...asset.preHistory, ...asset.ticks]
    candles[asset.id] = distortCandles(buildCandles(merged, asset.preHistory.length + player.turn), info, rand)
    news[asset.id] = pickNews(asset, player.turn, info.quality, rand)
    advices[asset.id] = investAdvice(asset, player.turn, reviewCredits, rand)
  }
  return { candles, news, advices }
}
