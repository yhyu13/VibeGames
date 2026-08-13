// store.ts — zustand store wrapping GameSim (repo convention).
import { create } from 'zustand'
import { createInitialState } from './core/simulation/GameSim'
import type { GameState } from './core/types'
import { loadProgress } from './engine/storage'

interface GameStore {
  sim: GameState | null
  version: number
  started: boolean
  start: () => void
  bump: () => void
}

export const useGame = create<GameStore>((set, get) => ({
  sim: null,
  version: 0,
  started: false,
  start: () => {
    const p = loadProgress()
    const sim = createInitialState(0, p.bestSwitches, p.totalPhaseDust)
    set({ sim, started: true })
  },
  bump: () => set({ version: get().version + 1 }),
}))

export function getSim(): GameState | null {
  return useGame.getState().sim
}
