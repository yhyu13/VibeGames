// store.ts — zustand wrapper around GameSim.
import { create } from 'zustand'
import { createInitialState, restart as restartSim } from './core/simulation/GameSim'
import type { GameState } from './core/types'

interface GameStore {
  sim: GameState | null
  version: number
  started: boolean
  start: () => void
  bump: () => void
  restart: () => void
}

export const useGame = create<GameStore>((set, get) => ({
  sim: null,
  version: 0,
  started: false,
  start: () => {
    const sim = createInitialState()
    sim.phase = 'playing'
    set({ sim, started: true, version: 0 })
  },
  bump: () => set({ version: get().version + 1 }),
  restart: () => {
    const s = get().sim
    if (!s) return
    restartSim(s)
    get().bump()
  },
}))

export function getSim(): GameState | null {
  return useGame.getState().sim
}
