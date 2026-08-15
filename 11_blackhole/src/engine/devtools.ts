/**
 * Debug handle exposed on `window.__blackhole`. Mirrors the repo convention of
 * exposing the pure simulation for browser smoke tests / state checks.
 */
import { B_CRIT, ISCO_R, PHOTON_SPHERE_R, SHADOW_R } from '../core/constants'
import {
  diskEmissivity,
  frequencyShift,
  impactParameter,
  norm,
  orbitalSpeedC,
  tracePhoton,
  v3,
} from '../core/physics/geodesics'
import { computeReadout } from '../core/physics/readouts'
import { useStore } from '../store'

export interface BlackHoleDebugApi {
  constants: { B_CRIT: number; ISCO_R: number; PHOTON_SPHERE_R: number; SHADOW_R: number }
  tracePhoton: typeof tracePhoton
  impactParameter: typeof impactParameter
  orbitalSpeedC: typeof orbitalSpeedC
  frequencyShift: typeof frequencyShift
  diskEmissivity: typeof diskEmissivity
  computeReadout: typeof computeReadout
  /** Trace the ray through a camera looking at the origin from `dist` bhu at `tilt` rad. */
  traceCenter: (
    dist: number,
    tilt: number,
    steps?: number,
    diskOuter?: number,
  ) => ReturnType<typeof tracePhoton>
}

export function installDevtools(): BlackHoleDebugApi {
  const api: BlackHoleDebugApi = {
    constants: { B_CRIT, ISCO_R, PHOTON_SPHERE_R, SHADOW_R },
    tracePhoton,
    impactParameter,
    orbitalSpeedC,
    frequencyShift,
    diskEmissivity,
    computeReadout,
    traceCenter: (dist, tilt, steps = 256, diskOuter = 24) => {
      const ro = v3(dist * Math.cos(tilt), dist * Math.sin(tilt), 0)
      const rd = norm(v3(-ro.x, -ro.y, -ro.z))
      return tracePhoton(ro, rd, steps, diskOuter, true)
    },
  }
  ;(window as unknown as { __blackhole: BlackHoleDebugApi }).__blackhole = api
  ;(window as unknown as { __store: typeof useStore }).__store = useStore
  return api
}
