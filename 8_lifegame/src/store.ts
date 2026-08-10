import { create } from 'zustand'
import type { GameState } from './core/types'
import {
  createInitialState,
  chooseDestination,
  arrive,
  roll,
  advanceToEvent,
  chooseEvent,
  makeInvestment,
  finishCoach,
} from './core/simulation/Simulation'
import { mulberry32, freshSeed } from './engine/rng'
import { infoQuality } from './core/simulation/invest'
import { tierFactorFor } from './core/simulation/events'
import { LOCATION_EVENTS } from './core/data/locationEvents'

interface Store {
  state: GameState
  rand: () => number
  runId: number // bump on restart so UI-only state (the opening card) can reset
  chooseDestination: (cellId: string) => void
  arrive: () => void
  roll: () => void
  advanceToEvent: () => void
  chooseEvent: (choiceId: string) => void
  invest: (assetId: string, allocationPct: number) => void
  finishTurn: () => void
  restart: () => void
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
  invest: (assetId, allocationPct) => set((s) => ({ state: makeInvestment(s.state, assetId, allocationPct) })),
  finishTurn: () => set((s) => ({ state: finishCoach(s.state, s.rand) })),
  restart: () => set((s) => ({ state: createInitialState(), rand: mulberry32(freshSeed()), runId: s.runId + 1 })),
}))

// DEV-only scripted-verification handle (repo convention: window.__sim) — lets
// scripts/showcase.mjs assert seeded mechanics (drawn events, infoQuality bands, tier factors)
// via page.evaluate, per spec §7.7/§9.
if (import.meta.env.DEV) {
  ;(window as unknown as { __sim: unknown }).__sim = {
    getState: () => useGameStore.getState().state,
    store: useGameStore,
    checks: { infoQuality, tierFactorFor, LOCATION_EVENTS },
  }
}
