import { create } from 'zustand'
import { DEFAULT_PARAMS, SPIN_MAX } from './core/constants'
import { computeReadout } from './core/physics/readouts'
import type { PhysicalReadout, RenderParams } from './core/types'

/** localStorage key holding the persisted param preset. */
const STORAGE_KEY = 'blackhole.params.v1'

/** Merge a saved preset over DEFAULT_PARAMS, then re-validate the range. */
function loadSavedParams(): RenderParams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PARAMS
    const parsed = JSON.parse(raw) as Partial<RenderParams>
    const merged: RenderParams = { ...DEFAULT_PARAMS, ...parsed }
    // The store clamps spin on every setParam, but a corrupt/old preset bypassed
    // that path, so re-clamp here to guarantee the geometry stays valid.
    merged.spin = Math.min(Math.max(merged.spin, 0), SPIN_MAX)
    return merged
  } catch {
    // localStorage may be unavailable (private mode, SSR, blocked); fall back to defaults.
    return DEFAULT_PARAMS
  }
}

/** Persist the current preset so a tuned scene survives reloads. */
function saveParams(params: RenderParams): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params))
  } catch {
    // Non-fatal: persistence is best-effort.
  }
}

interface BlackHoleState {
  params: RenderParams
  readout: PhysicalReadout
  fps: number
  scienceMode: boolean
  setParam: <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => void
  reset: () => void
  setFps: (fps: number) => void
  setScienceMode: (on: boolean) => void
}

const initialParams = loadSavedParams()

export const useStore = create<BlackHoleState>((set) => ({
  params: initialParams,
  readout: computeReadout(initialParams.massMsun, initialParams.spin),
  fps: 0,
  scienceMode: false,
  setParam: (key, value) =>
    set((s) => {
      const params = { ...s.params, [key]: value }
      saveParams(params)
      return { params, readout: computeReadout(params.massMsun, params.spin) }
    }),
  reset: () => {
    const params = DEFAULT_PARAMS
    saveParams(params)
    return set({ params, readout: computeReadout(params.massMsun, params.spin) })
  },
  setFps: (fps) => set({ fps }),
  setScienceMode: (on) => set({ scienceMode: on }),
}))
