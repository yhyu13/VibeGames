import { create } from 'zustand'
import type { GameState, Origin } from './core/types'
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
} from './core/simulation/Simulation'
import { mulberry32, freshSeed } from './engine/rng'
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
  priceAt,
  resolveOrder,
  unrealizedPnl,
} from './core/simulation/invest'
import { tierFactorFor } from './core/simulation/events'
import { mentorHitProbFor } from './core/simulation/events'
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
  invest: (assetId: string, side: 'buy' | 'sell' | 'hold', amount: number) => void
  markHintSeen: (hintId: string) => void
  finishTurn: () => void
  restart: (origin?: Origin) => void
}

export const useGameStore = create<Store>((set) => ({
  state: createInitialState(),
  rand: mulberry32(freshSeed()),
  runId: 0,
  chooseDestination: (cellId) => set((s) => ({ state: chooseDestination(s.state, cellId) })),
  arrive: () => set((s) => ({ state: arrive(s.state, s.rand) })),
  roll: () => set((s) => ({ state: roll(s.state, s.rand) })),
  advanceToEvent: () => set((s) => ({ state: advanceToEvent(s.state) })),
  chooseEvent: (choiceId) => set((s) => ({ state: chooseEvent(s.state, choiceId, s.rand) })),
  chooseSpecialChoice: (choiceId) => set((s) => ({ state: chooseSpecialChoice(s.state, choiceId) })),
  invest: (assetId, side, amount) => set((s) => ({ state: makeInvestment(s.state, assetId, side, amount) })),
  markHintSeen: (hintId) => set((s) => ({ state: markHintSeen(s.state, hintId) })),
  finishTurn: () => set((s) => ({ state: finishCoach(s.state, s.rand) })),
  restart: (origin) => set((s) => {
    const nextOrigin = origin === 'finance_dynasty' && s.state.financeDynastyUnlocked ? origin : 'town_exam_kid'
    return {
      state: createInitialState(nextOrigin, s.state.financeDynastyUnlocked),
      rand: mulberry32(freshSeed()),
      runId: s.runId + 1,
    }
  }),
}))

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
      MENTOR_EVENTS_BY_TRACK,
      specialEventsFor,
      MENTOR_FAVOR_HIT_BONUS,
      MENTOR_FAVOR_MAX,
      createInitialState,
      chooseDestination,
      arrive,
      chooseEvent,
      chooseSpecialChoice,
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
