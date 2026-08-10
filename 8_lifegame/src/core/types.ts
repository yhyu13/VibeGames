// Frozen contract — see ../../TDD.md §3. Changes require a TDD.md changelog row.

export type Origin = 'town_exam_kid' | 'urban_middle' | 'overseas_elite' | 'finance_dynasty'
export type Era = 'web2' | 'post_mobile' | 'ai_year' | 'next_era'
export type CellType = 'learn' | 'work' | 'mentor' | 'special' | 'rest' | 'start'
export type ZoneId = 'campus' | 'city' | 'overseas' | 'special'
export type DiceTier = 'big_fail' | 'fail' | 'success' | 'big_success' | 'awaken'
export type AttributionDimension = 'origin' | 'era' | 'cognition' | 'emotion'
export type TurnPhase = 'map' | 'dice' | 'event' | 'invest' | 'coach' | 'summary'

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
// advanced turn-by-turn using the SAME physical dice + SAME event choice + SAME investment tick
// as the real player, but resolved through a different origin's coefficients. No board position
// or turn log of its own — it exists purely to isolate "origin" as the only varying input against
// otherwise-identical luck and decisions. See core/simulation/parallelFate.ts.
export interface ParallelState {
  wealth: number
  cognition: number
  stamina: number
  mood: number
  awakened: boolean
}

export interface DiceRollResult {
  rolls: [number, number]
  originMod: number
  eraMod: number
  stateMod: number
  eventMod: number
  total: number
  tier: DiceTier
  cellsToMove: number
}

export interface EventChoice {
  id: string
  label: string
  description: string
  apply: (s: PlayerState) => Partial<PlayerState>
}

export interface EventOffer {
  cellId: string
  cellType: CellType
  choices: EventChoice[]
  mentorRoll?: number // raw rand() draw for mentor cells only — shared with the parallel-fate hit check
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

export interface CoachOutput {
  dominant: AttributionDimension
  dominantShare: number
  line: string
}

export interface TurnResult {
  turn: number
  cellId: string
  dice: DiceRollResult
  eventChoiceId: string
  eventDelta: Partial<PlayerState>
  investment: InvestmentResult
  coach: CoachOutput
  microAwakening: boolean
}

export interface ParallelFateSnapshot {
  diceTotal: number
  diceTier: DiceTier
  eventDelta: Partial<ParallelState>
  mentorHit: boolean | null // null when the cell this turn wasn't a mentor cell
  investmentPnlAbs: number
}

// ⚡特殊事件 (Ch04 §4.4: 牛市/熊市/政策/黑天鹅, "财富±30%, 心态±20, 无预兆") -- a probabilistic per-turn
// shock, independent of which cell you land on. Exists to keep the intro from reading as a flat
// sequence of similar-sized outcomes ("mediocre life" per playtest feedback) -- the dice tiers
// govern PACE (how far you move), this governs SHOCK (how hard fortune swings).
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
  pendingDice: DiceRollResult | null
  pendingEvent: EventOffer | null
  pendingEventChoiceId: string | null
  pendingInvestment: InvestmentResult | null
  pendingCoach: CoachOutput | null
  pendingMicroAwakening: boolean
  pendingRealEventDelta: Partial<PlayerState> | null
  pendingAltFate: ParallelFateSnapshot | null
  pendingSpecialEvent: SpecialEventResult | null
  finished: boolean
}

export const INTRO_TURN_LIMIT = 8
export const PARALLEL_FATE_ORIGIN: Origin = 'finance_dynasty'
