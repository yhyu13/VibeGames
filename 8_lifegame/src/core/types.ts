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

export interface GameState {
  player: PlayerState
  phase: TurnPhase
  pendingDice: DiceRollResult | null
  pendingEvent: EventOffer | null
  pendingEventChoiceId: string | null
  pendingInvestment: InvestmentResult | null
  pendingCoach: CoachOutput | null
  pendingMicroAwakening: boolean
  finished: boolean
}

export const INTRO_TURN_LIMIT = 4
