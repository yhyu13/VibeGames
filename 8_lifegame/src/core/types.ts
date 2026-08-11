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

export interface Asset {
  id: string
  label: string
  icon: string
  ticks: number[] // deterministic % price curve, index by turn (0-based)
}

export interface InvestmentResult {
  assetId: string
  allocationPct: number
  pnlPct: number
  pnlAbs: number
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
export interface SpecialEvent {
  id: string
  label: string
  icon: string
  wealthPct: number
  moodDelta: number
}

export interface SpecialEventResult {
  event: SpecialEvent
  wealthAbs: number
  altWealthAbs: number
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
  financeDynastyUnlocked: boolean
  finished: boolean
}

export const INTRO_TURN_LIMIT = 13
export const PARALLEL_FATE_ORIGIN: Origin = 'finance_dynasty'
