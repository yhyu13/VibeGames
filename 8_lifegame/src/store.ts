import { create } from 'zustand'
import type { DraftOrder, GameState, Origin, TradingRealism } from './core/types'
import { CAMPUS_SEMESTER_WEEKS, INTRO_TURN_LIMIT, WINTER_BREAK_WEEKS } from './core/types'
import {
  createInitialState,
  chooseDestination,
  arrive,
  roll,
  advanceToEvent,
  chooseEvent,
  chooseSpecialChoice,
  makeInvestment,
  markHintSeen,
  finishCoach,
  awakeningTierFor,
} from './core/simulation/Simulation'
import { mulberry32, freshSeed, mulberry32Rng, type RngHandle } from './engine/rng'
import {
  accountValue,
  aggregateCandles,
  allPrices,
  buildCandles,
  createPaperAccount,
  endPriceAt,
  executeOrder,
  frameCandlesFor,
  infoQuality,
  investAdvice,
  maTimingSignalFor,
  maTimingUnlockedFor,
  priceAt,
  resolveOrder,
  resolveOrders,
  unrealizedPnl,
} from './core/simulation/invest'
import { tierFactorFor } from './core/simulation/events'
import { mentorHitProbFor } from './core/simulation/events'
import { mentorComprehensionFor } from './core/simulation/events'
import { LOCATION_EVENTS, MENTOR_EVENTS_BY_TRACK, mentorEventsFor } from './core/data/locationEvents'
import { ASSETS } from './core/data/assets'
import { MARKET_NEWS } from './core/data/marketNews'
import { CAMPUS_LOCATION_GUIDES } from './core/data/cells'
import { applyRelationshipChoice, relationshipEventFor } from './core/data/relationshipEvents'
import { SPECIAL_EVENTS, SPECIAL_EVENT_TRIGGER_PROB, specialEventsFor } from './core/data/specialEvents'
import {
  DYNASTY_PAPER_GOAL,
  LOVE_FIRST_TURN,
  LOVE_SECOND_TURN,
  LOVE_THIRD_TURN,
  MENTOR_FAVOR_HIT_BONUS,
  MENTOR_FAVOR_MAX,
  TOWN_PAPER_GOAL,
  paperGoalProgressFor,
} from './core/constants'
import { PAPER_INITIAL_CAPITAL } from './core/simulation/Simulation'
import { LIFE_TIMELINE, NEXT_SEMESTER_YEAR, SEMESTER_YEAR } from './core/data/timeline'
import {
  CHRISTMAS_EVENT,
  CHRISTMAS_TURN,
  LOVE_COGNITION_THRESHOLD,
  LOVE_FIRST_EVENT,
  LOVE_SECOND_EVENT,
  LOVE_THIRD_EVENT,
  LOVE_WELLBEING_THRESHOLD,
  NEXT_SEMESTER_MENTOR_BLOCKED_EVENT,
  NEXT_SEMESTER_TURN,
  WINTER_GROWTH_EVENT,
  WINTER_GROWTH_TURN,
  WINTER_REFLECTION_EVENT,
  WINTER_REUNION_EVENT,
  WINTER_REUNION_TURN,
  christmasContext,
  christmasImpressionFor,
  loveEventFor,
  loveStageAfterChoice,
  shouldReunite,
  wellbeingOf,
} from './core/data/seasonEvents'

interface Store {
  state: GameState
  rand: () => number
  runId: number // bump on restart so UI-only state (the opening card) can reset
  chooseDestination: (cellId: string) => void
  arrive: () => void
  roll: () => void
  advanceToEvent: () => void
  chooseEvent: (choiceId: string) => void
  chooseSpecialChoice: (choiceId: string) => void
  invest: (orders: DraftOrder[]) => void
  setTradingRealism: (realism: TradingRealism) => void
  markHintSeen: (hintId: string) => void
  finishTurn: () => void
  restart: (origin?: Origin) => void
}

// ═══ P0 save/load — persist {GameState, rand-state, runId} to localStorage so a run resumes
// on refresh, byte-for-byte seed-reproducible. The PRNG's internal `a` is what makes an exact
// resume possible (the GameState alone can't replay the stream); the run's opening seed is the
// shareable/reproducible key. We keep the live RNG in a module handle so `subscribe` can read
// its position at write time. ═══════════════════════════════════════════════════════════════
const SAVE_KEY = '8_lifegame.save.v1'

interface SavePayload {
  state: GameState
  randState: number
  runId: number
}

function loadSave(): SavePayload | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as Partial<SavePayload>
    // Light structural validation — a corrupted/foreign payload must not crash the game.
    if (!data || typeof data.randState !== 'number' || !data.state || !data.state.player || !data.state.paper) return null
    return { state: data.state, randState: data.randState, runId: typeof data.runId === 'number' ? data.runId : 0 }
  } catch {
    return null
  }
}

function persistSave(s: Store) {
  try {
    const payload: SavePayload = { state: s.state, randState: rngObj.state(), runId: s.runId }
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
  } catch {
    /* localStorage unavailable (private mode / quota) — the run just won't survive a refresh */
  }
}

// The live PRNG handle — recreated on restart/hydration so the stream position is always knowable.
let rngObj: RngHandle
const saved = loadSave()
rngObj = mulberry32Rng(saved?.randState ?? freshSeed())

export const useGameStore = create<Store>((set) => ({
  state: saved?.state ?? createInitialState(),
  rand: () => rngObj.next(),
  runId: saved?.runId ?? 0,
  chooseDestination: (cellId) => set((s) => ({ state: chooseDestination(s.state, cellId) })),
  arrive: () => set((s) => ({ state: arrive(s.state, s.rand) })),
  roll: () => set((s) => ({ state: roll(s.state, s.rand) })),
  advanceToEvent: () => set((s) => ({ state: advanceToEvent(s.state) })),
  chooseEvent: (choiceId) => set((s) => ({ state: chooseEvent(s.state, choiceId, s.rand) })),
  chooseSpecialChoice: (choiceId) => set((s) => ({ state: chooseSpecialChoice(s.state, choiceId) })),
  invest: (orders) => set((s) => ({ state: makeInvestment(s.state, orders) })),
  setTradingRealism: (realism) => set((s) => ({ state: { ...s.state, tradingRealism: realism } })),
  markHintSeen: (hintId) => set((s) => ({ state: markHintSeen(s.state, hintId) })),
  finishTurn: () => set((s) => ({ state: finishCoach(s.state, s.rand) })),
  restart: (origin) => set((s) => {
    const nextOrigin = origin === 'finance_dynasty' && s.state.financeDynastyUnlocked ? origin : 'town_exam_kid'
    rngObj = mulberry32Rng(freshSeed()) // new run — fresh seed + fresh stream, then persisted on next write
    return {
      state: createInitialState(nextOrigin, s.state.financeDynastyUnlocked),
      rand: () => rngObj.next(),
      runId: s.runId + 1,
    }
  }),
}))

// Write-through save on every state change (turn advance, trade, restart). Pure — no effect on
// the zustand store; only the localStorage snapshot changes, and it's read back on the next load.
useGameStore.subscribe(persistSave)

// DEV-only scripted-verification handle (repo convention: window.__sim) — lets
// scripts/showcase.mjs assert seeded mechanics (drawn events, infoQuality bands, tier factors)
// via page.evaluate, per spec §7.7/§9.
if (import.meta.env.DEV) {
  ;(window as unknown as { __sim: unknown }).__sim = {
    getState: () => useGameStore.getState().state,
    store: useGameStore,
    checks: {
      infoQuality,
      buildCandles,
      investAdvice,
      priceAt,
      endPriceAt,
      accountValue,
      allPrices,
      createPaperAccount,
      executeOrder,
      resolveOrder,
      resolveOrders,
      unrealizedPnl,
      aggregateCandles,
      frameCandlesFor,
      tierFactorFor,
      LOCATION_EVENTS,
      CAMPUS_LOCATION_GUIDES,
      ASSETS,
      MARKET_NEWS,
      SPECIAL_EVENTS,
      SPECIAL_EVENT_TRIGGER_PROB,
      LIFE_TIMELINE,
      SEMESTER_YEAR,
      NEXT_SEMESTER_YEAR,
      INTRO_TURN_LIMIT,
      CAMPUS_SEMESTER_WEEKS,
      WINTER_BREAK_WEEKS,
      CHRISTMAS_TURN,
      WINTER_GROWTH_TURN,
      WINTER_REUNION_TURN,
      NEXT_SEMESTER_TURN,
      LOVE_COGNITION_THRESHOLD,
      LOVE_WELLBEING_THRESHOLD,
      LOVE_FIRST_TURN,
      LOVE_SECOND_TURN,
      LOVE_THIRD_TURN,
      CHRISTMAS_EVENT,
      LOVE_FIRST_EVENT,
      LOVE_SECOND_EVENT,
      LOVE_THIRD_EVENT,
      WINTER_GROWTH_EVENT,
      WINTER_REUNION_EVENT,
      WINTER_REFLECTION_EVENT,
      NEXT_SEMESTER_MENTOR_BLOCKED_EVENT,
      christmasImpressionFor,
      christmasContext,
      loveEventFor,
      loveStageAfterChoice,
      shouldReunite,
      wellbeingOf,
      mentorHitProbFor,
      mentorEventsFor,
      mentorComprehensionFor,
      awakeningTierFor,
      maTimingSignalFor,
      maTimingUnlockedFor,
      MENTOR_EVENTS_BY_TRACK,
      specialEventsFor,
      MENTOR_FAVOR_HIT_BONUS,
      MENTOR_FAVOR_MAX,
      createInitialState,
      chooseDestination,
      arrive,
      roll,
      advanceToEvent,
      chooseEvent,
      chooseSpecialChoice,
      makeInvestment,
      finishCoach,
      relationshipEventFor,
      applyRelationshipChoice,
      mulberry32,
      paperGoalProgressFor,
      TOWN_PAPER_GOAL,
      DYNASTY_PAPER_GOAL,
      PAPER_INITIAL_CAPITAL,
    },
  }
}
