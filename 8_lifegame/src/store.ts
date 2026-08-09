import { create } from 'zustand'
import type { GameState } from './core/types'
import {
  createInitialState,
  startRoll,
  advanceToEvent,
  chooseEvent,
  makeInvestment,
  finishCoach,
} from './core/simulation/Simulation'
import { mulberry32, freshSeed } from './engine/rng'

interface Store {
  state: GameState
  rand: () => number
  roll: () => void
  advanceToEvent: () => void
  chooseEvent: (choiceId: string) => void
  invest: (assetId: string, allocationPct: number) => void
  finishTurn: () => void
  restart: () => void
}

export const useGameStore = create<Store>((set, get) => ({
  state: createInitialState(),
  rand: mulberry32(freshSeed()),
  roll: () => set({ state: startRoll(get().state, get().rand) }),
  advanceToEvent: () => set((s) => ({ state: advanceToEvent(s.state) })),
  chooseEvent: (choiceId) => set((s) => ({ state: chooseEvent(s.state, choiceId) })),
  invest: (assetId, allocationPct) => set((s) => ({ state: makeInvestment(s.state, assetId, allocationPct) })),
  finishTurn: () => set({ state: finishCoach(get().state, get().rand) }),
  restart: () => set({ state: createInitialState(), rand: mulberry32(freshSeed()) }),
}))
