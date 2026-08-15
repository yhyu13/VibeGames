// store.ts — zustand store wrapping GameSim (repo convention).
import { create } from 'zustand'
import { advanceLayer, createInitialState } from './core/simulation/GameSim'
import type { GameState, PhaseId } from './core/types'
import { loadProgress } from './engine/storage'

export interface RadialState {
  active: boolean            // Tab held → menu visible
  highlighted: PhaseId | null // currently selected quadrant
}

interface GameStore {
  sim: GameState | null
  version: number
  started: boolean
  radial: RadialState
  start: () => void
  bump: () => void
  setRadial: (r: RadialState) => void
  advanceLayer: () => void
}

export const useGame = create<GameStore>((set, get) => ({
  sim: null,
  version: 0,
  started: false,
  radial: { active: false, highlighted: null },
  start: () => {
    const p = loadProgress()
    const sim = createInitialState(0, p.bestSwitches, p.totalPhaseDust)
    set({ sim, started: true })
  },
  bump: () => set({ version: get().version + 1 }),
  setRadial: (radial) => set({ radial }),
  advanceLayer: () => {
    const s = get().sim
    if (!s) return
    advanceLayer(s)          // mutates the existing state in place (repo convention: Object.assign)
    get().bump()             // drive the re-render so HUD/LayerIntro read the new floor
  },
}))

export function getSim(): GameState | null {
  return useGame.getState().sim
}
