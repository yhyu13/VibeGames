// Frozen contract — see ../../TDD.md §3. Changes require a TDD.md changelog row.
// v1.2: free movement + location event tables + mood→info distortion.
// Amendment list: docs/design/02-v1.2-campus-world-design.md §7.

export type Origin = 'town_exam_kid' | 'urban_middle' | 'overseas_elite' | 'finance_dynasty'
export type Era = 'web2' | 'post_mobile' | 'ai_year' | 'next_era'
export type CellType = 'learn' | 'work' | 'mentor' | 'special' | 'rest' | 'start'
export type ZoneId = 'campus' | 'city' | 'overseas' | 'special'
export type DiceTier = 'big_fail' | 'fail' | 'success' | 'big_success' | 'awaken'
export type AttributionDimension = 'origin' | 'era' | 'cognition' | 'emotion'
// v1.2 turn state machine (spec §6): 'map'→'choose_destination', 'coach'→'results', +'walking'.
export type TurnPhase = 'choose_destination' | 'walking' | 'dice' | 'event' | 'invest' | 'results' | 'summary'
export type LoveImpression = 'none' | 'ordinary' | 'good'
// v2.5: the love line moved INTO the semester — first encounter on campus (turn 2+),
// 期中 library meeting (6+), 期末 party (10+); Christmas is a reunion or first meeting.
export type LoveStage = 'none' | 'met' | 'knowing' | 'close'

export interface Cell {
  id: string
  zone: ZoneId
  type: CellType
  label: string
  icon: string
  locked: boolean
}

export interface PlayerState {
  origin: Origin
  era: Era
  wealth: number
  cognition: number
  stamina: number
  mood: number
  turn: number
  position: string
  awakened: boolean
  log: TurnResult[]
}

// "平行命运" — a lightweight second life-trajectory for PARALLEL_FATE_ORIGIN (finance_dynasty),
// advanced turn-by-turn using the SAME physical dice + SAME location + SAME event + SAME
// investment tick as the real player, but resolved through a different origin's coefficients
// (and the twin's OWN tier, from rollAltDice, for event-outcome scaling). No board position
// or turn log of its own. See core/simulation/{dice,events,invest}.ts.
export interface ParallelState {
  origin: Origin
  wealth: number
  cognition: number
  stamina: number
  mood: number
  awakened: boolean
}

// The four stats an event/special-event can move. Display deltas (what the UI shows as "+12/-8")
// use this, NOT Partial<PlayerState> — a delta can never touch origin/position/log/awakened.
export type NumericStat = 'wealth' | 'cognition' | 'stamina' | 'mood'
export type StatDelta = Partial<Record<NumericStat, number>>

export interface DiceRollResult {
  rolls: [number, number]
  originMod: number
  eraMod: number
  stateMod: number
  eventMod: number
  total: number
  tier: DiceTier
  // v1.2: cellsToMove retired — tiers now scale event outcomes (spec §3 factor table).
  // true when stamina AND mood are simultaneously at an extreme (both ≥60, or both <30) —
  // computed in dice.ts where the raw stats live, so attribution.ts can key its 情绪 override
  // off the actual state rather than |stateMod| (which the post-awaken +1 can push to ±2
  // without any extreme state being present).
  extremeState: boolean
}

// v1.2: choices are DATA, not closures — tier scaling needs the raw base delta (spec §3).
// coefficient/coefficientStats: which origin multiplier applies to WHICH stats (v1.1 parity:
// learn scales cognition only, work wealth only, rest stamina-recovery only; null = flat).
export interface LocationEventChoice {
  id: string
  label: string
  description: string
  delta: StatDelta
  coefficient: 'learn' | 'work' | 'rest' | null
  coefficientStats: NumericStat[]
}

export type LocationEventKind = 'opportunity' | 'neutral' | 'trap'

export interface LocationEvent {
  id: string
  cellType: CellType // drives attribution (NOT the Cell's type — 宿舍 events carry 'rest')
  kind: LocationEventKind
  weight: number // 0 for the mentor pseudo-table (probability-driven, not weight-drawn)
  eventMod: number // v1.2: eventMod is a property of the DRAWN event, not the departure cell
  scaledStats: NumericStat[] // which deltas the tier factor multiplies
  title: string
  text: string
  choices: LocationEventChoice[]
}

// v1.2: the pending event IS the drawn LocationEvent (mentorRoll only for the mentor office).
export interface EventOffer {
  event: LocationEvent
  mentorRoll?: number // raw rand() draw for mentor cells only — shared with the parallel-fate hit check
  mentorTrusted?: boolean // v1.6 §2: the draw used MENTOR_TRUST_HIT_PROB (有能力 × 对口) — the UI surfaces the 同道中人 line
}

export type AssetRisk = 'cash' | 'low' | 'medium' | 'high'

// v2.4: real price levels instead of a chart that starts at week 1. basePrice = the asset's
// price at the semester OPEN (2015-spring-plausible); preHistory = weekly % returns for the
// ~40 weeks BEFORE the semester (deterministic, 2014-plausible trends); ticks = the 17
// in-semester weekly % moves. price(k) = base × ∏(1 + preHistory) × ∏(1 + ticks[0..k-1]).
export interface Asset {
  id: string
  label: string
  icon: string
  risk: AssetRisk
  maxLeverage: number
  basePrice: number // ¥ price at semester open (turn 1)
  preHistory: number[] // weekly % returns before the semester (2014 history)
  ticks: number[] // deterministic % price curve, index by turn (0-based)
  daily: number[] // v2.4: 5 deterministic daily % moves per merged week (日K/周K 周期切换, presentation only)
  decimals: number // price/units display precision
}

// v2.4: a held position — units bought at price, cost basis for P&L (avg-cost method).
export interface PaperPosition {
  units: number
  costBasis: number // total ¥ paid for the current units
}

// v2.4: the 模拟盘 paper-trading account — its own cash, holdings, and banked realized P&L,
// separate from the life 财富 ledger. Initial capital = the origin's starting wealth
// (小镇做题家 ¥100,000 / 金融世家 ¥300,000).
export interface PaperAccount {
  cash: number
  positions: Partial<Record<string, PaperPosition>>
  realizedPnl: number // ¥ banked on sells
  initialCapital: number // ¥ at account opening (origin's starting wealth)
}

// v2.4: one executed market order at the current price (spot, fee = TRADE_FEE_RATE).
export interface OrderResult {
  assetId: string
  side: 'buy' | 'sell'
  units: number
  price: number
  amount: number // ¥ notional of the executed fill
  fee: number
}

export interface InvestmentResult {
  assetId: string
  side: 'buy' | 'sell' | 'hold' // 'hold' = 不操作,继续持有 (no order executed)
  units: number
  price: number
  amount: number
  fee: number
  // v2.4: account-level P&L for the turn — mark-to-market of ALL positions at the week's
  // closing price (including asset shocks) plus the executed order's realized part.
  weekPnlAbs: number
  totalValue: number // 模拟盘 总资产 at week's close
  totalPnlAbs: number // vs initial capital
  initialCapital: number
}

// v1.3 §2: one K-line candle, synthesized deterministically from the tick history
// (base ¥100, open = prev close). The chart shows PAST turns only — no future leak.
export interface Candle {
  open: number
  close: number
  high: number
  low: number
}

// v1.3 §3: 热点新闻 — one headline per asset per turn. spin is the mood-filtered
// 解读 layered on top of the headline (pessimistic reads bearish, overconfident bullish).
export interface MarketNews {
  headline: string
  spin: 'bearish' | 'neutral' | 'bullish'
}

// v1.5 §1: cognition → advice quality. band drives faithfulness (blind = 「看不懂」, no
// rand draw); a faithful label tracks the coming tick's bucket (≥+2 适宜 / ≤−2 不适宜 /
// else 谨慎参与), an unfaithful one inverts it. Mood distorts what you SEE (candles);
// cognition decides whether you get usable JUDGMENT.
export type AdviceLabel = '适宜投资' | '谨慎参与' | '不适宜投资' | '看不懂'
export interface InvestAdvice {
  band: 'blind' | 'noisy' | 'clear' | 'sharp'
  label: AdviceLabel
  faithful: boolean
}

// v1.6 §2: 选方向 — the career-track bet at the 职业规划课 beat (first 教学楼 visit after
// 开户). 贵人信任's 对口 check keys off this; null = never chose (hidden line 2 stays
// invisible all game if you never walk into the lecture hall).
export type TrackId = 'finance' | 'industry' | 'ai' | 'academia'

// v1.2 §4: mood distorts the invest PREVIEW, never the asset. narrowed = cognition ≥ 60
// shrinks the distortion window from last-3 ticks to last-1.
export interface InfoQuality {
  quality: 'pessimistic' | 'rational' | 'overconfident'
  narrowed: boolean
}

export interface CoachOutput {
  dominant: AttributionDimension
  dominantShare: number
  line: string
  hint: string // v1.2 §5: forward-looking "下次试试…" per dominant dimension
}

export interface TurnResult {
  turn: number
  cellId: string
  locationEvent: LocationEvent // v1.2: the drawn event, for per-location logs/summary
  dice: DiceRollResult
  eventChoiceId: string
  eventDelta: StatDelta
  investment: InvestmentResult | null // v1.3 §1: null on the turn-1 开户 beat (no trade yet)
  coach: CoachOutput
  microAwakening: boolean
}

export interface ParallelFateSnapshot {
  diceTotal: number
  diceTier: DiceTier
  eventDelta: StatDelta
  mentorHit: boolean | null // null when the cell this turn wasn't a mentor cell
  investmentPnlAbs: number
}

// ⚡特殊事件 (Ch04 §4.4: 牛市/熊市/政策/黑天鹅, "财富±30%, 心态±20, 无预兆") -- a probabilistic per-turn
// shock, independent of location. Exists to keep the intro from reading as a flat sequence of
// similar-sized outcomes ("mediocre life" per playtest feedback) -- this governs SHOCK (how
// hard fortune swings); v1.2's tier-scaled location events govern the local texture.
// v2.3: the pool grows from 11 world-market shocks to ~49 themed 小镇 life surprises — friends,
// family/hometown, health, small money, and everyday surprises — each carrying a one-line `text`
// so every shock lands as a story. `text` is required (a shock without a story is just a number);
// `unexpected` gates the "· 无预兆" banner suffix (true only for true no-warning shocks).
export interface SpecialEvent {
  id: string
  label: string
  icon: string
  weight: number
  wealthPct: number
  delta: StatDelta
  text: string
  // v2.3: true = a "no-warning" shock (market moves, sudden breakdowns) → banner shows "· 无预兆".
  // false = a narrative daily-life event whose text already carries the surprise.
  unexpected: boolean
  // v2.4: optional decision — the event becomes a choice card (shown before the location card)
  // instead of a passive banner; the chosen option sets the outcome. Deltas are applied at
  // choice time, so `wealthPct`/`delta` are ignored when `choices` is present.
  choices?: SpecialEventChoice[]
  // v2.4: optional one-time move of a specific asset's price THIS week — world/life events can
  // move the market ("受到历史事件或随机事件影响"). Applied at arrival, consumed at turn end.
  assetShock?: { assetId: string; pct: number }
  // v2.5: 贵人好感 — a story event where a benefactor notices you. Each point raises the
  // mentor office hit probability (MENTOR_FAVOR_HIT_BONUS), capped at MENTOR_FAVOR_MAX.
  // 贵人系统多元化的 "好感" 通道: 老教授/学长内推/行业前辈 can 推你一把 before you walk in.
  mentorFavor?: number
}

export interface SpecialEventChoice {
  id: string
  label: string
  wealthPct: number
  delta: StatDelta
}

export interface SpecialEventResult {
  event: SpecialEvent
  wealthAbs: number
  altWealthAbs: number
  playerDelta: StatDelta
  altDelta: StatDelta
}

export interface TimelineMilestone {
  year: number
  label: string
  detail: string
  icon: string
}

export interface GameState {
  player: PlayerState
  altPlayer: ParallelState
  phase: TurnPhase
  pendingDestinationId: string | null // v1.2: set during 'walking', consumed at arrival
  pendingDice: DiceRollResult | null
  pendingEvent: EventOffer | null
  pendingEventChoiceId: string | null
  pendingInvestment: InvestmentResult | null
  pendingCoach: CoachOutput | null
  pendingMicroAwakening: boolean
  pendingRealEventDelta: StatDelta | null
  pendingAltFate: ParallelFateSnapshot | null
  pendingSpecialEvent: SpecialEventResult | null
  // v2.4: a choice-based special event is pending — the EventModal shows it as a decision card
  // (icon + text + choices) before the location card. null when the turn has no such event.
  pendingSpecialChoice: { event: SpecialEvent } | null
  // v2.4: the 模拟盘 paper-trading accounts — player + parallel-fate twin. Trading P&L lives
  // here, NOT in 财富 (which stays the life-sim ledger).
  paper: PaperAccount
  altPaper: PaperAccount
  // v2.4: one-time asset price moves this week from a special event's `assetShock`
  // (assetId → %). Applied to the week's closing price, consumed at turn end.
  shockPct: Partial<Record<string, number>>
  // v1.3 §1: the sim account is locked until the turn-1 开户 story beat resolves.
  investUnlocked: boolean
  // v1.4: 贵人办公室 sits outside an ordinary origin's 认知 — locked until the library
  // discovery beat (first library visit after the 开户 turn) reveals it exists.
  mentorUnlocked: boolean
  // v1.7 §1: 健身房 starts locked — the first post-开户 宿舍 visit forces the 办卡 beat.
  // (对外交流中心 needs no flag: its gate is DERIVED — cognition ≥ EXCHANGE_COGNITION_THRESHOLD.)
  gymUnlocked: boolean
  // v1.3 §2: distorted per-asset K-line candle history (PAST turns only), built when
  // entering the invest phase (post-event mood) from the seeded rand stream.
  pendingAssetPreviews: Record<string, Candle[]> | null
  // v1.3 §3: per-asset 热点新闻 for the current turn, same lifecycle as the candles.
  pendingMarketNews: Record<string, MarketNews> | null
  // v1.5 §1: per-asset cognition-gated 投资建议, same lifecycle as the candles/news.
  pendingMarketAdvices: Record<string, InvestAdvice> | null
  // v1.6 §1: reviewed-trade count — drives advice fidelity (REVIEW_BAND_CREDITS). +1 at
  // turn end when the turn had a REAL trade (allocation > 0) AND cognition ≥ 60 (复盘能力).
  reviewCredits: number
  // v1.6 §2: the chosen 方向 (职业规划课 beat), null until chosen.
  track: TrackId | null
  // v1.9: finance-dynasty relationship line — hidden until that origin is unlocked.
  relationshipTrust: number
  relationshipCrisis: number
  relationshipResolved: boolean
  // v2.2: origin-independent love line. It records Christmas impression and the optional
  // winter-break reunion, but never contributes to mentor trust, awakening, or victory.
  loveImpression: LoveImpression
  loveReunion: boolean
  // v2.5: the love line's semester progression — 初次相遇(2+) → 期中偶遇(6+) → 期末之约(10+).
  loveStage: LoveStage
  // v2.5: 贵人好感 (0..MENTOR_FAVOR_MAX) — story events can push the office hit probability up.
  mentorFavor: number
  // v2.5: 人生目标 — 财富目标 established at the opening card (出身 x 时代 framing),
  // checked on the summary screen. The love goal is stage-derived (close/reunion).
  lifeGoalWealth: number
  financeDynastyUnlocked: boolean
  finished: boolean
}

export const INTRO_TURN_LIMIT = 17
export const CAMPUS_SEMESTER_WEEKS = 13
export const WINTER_BREAK_WEEKS = 3
export const PARALLEL_FATE_ORIGIN: Origin = 'finance_dynasty'
