import { create } from 'zustand'
import { DEFAULT_PARAMS } from './core/constants'
import { computeReadout } from './core/physics/readouts'
import type { PhysicalReadout, RenderParams } from './core/types'

interface BlackHoleState {
  params: RenderParams
  readout: PhysicalReadout
  fps: number
  setParam: <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => void
  reset: () => void
  setFps: (fps: number) => void
}

export const useStore = create<BlackHoleState>((set) => ({
  params: DEFAULT_PARAMS,
  readout: computeReadout(DEFAULT_PARAMS.massMsun),
  fps: 0,
  setParam: (key, value) =>
    set((s) => {
      const params = { ...s.params, [key]: value }
      return { params, readout: computeReadout(params.massMsun) }
    }),
  reset: () => set({ params: DEFAULT_PARAMS, readout: computeReadout(DEFAULT_PARAMS.massMsun) }),
  setFps: (fps) => set({ fps }),
}))
