/**
 * Debug handle exposed on `window.__blackhole`. Mirrors the repo convention of
 * exposing the pure simulation for browser smoke tests / state checks.
 */
import { B_CRIT, ISCO_R, PHOTON_SPHERE_R, SHADOW_R, M_BHU, SPIN_MAX } from '../core/constants'
import {
  diskEmissivity,
  frequencyShift,
  impactParameter,
  norm,
  orbitalSpeedC,
  tracePhoton,
  v3,
} from '../core/physics/geodesics'
import {
  kerrTracePhoton,
  kerrISCO,
  kerrHorizons,
  kerrShadowOutline,
  kerrSeed,
  kerrRedshift,
  kerrKeplerianOmega,
  kerrUt,
} from '../core/physics/kerr'
import { computeReadout } from '../core/physics/readouts'
import { useStore } from '../store'

export interface BlackHoleDebugApi {
  constants: {
    B_CRIT: number
    ISCO_R: number
    PHOTON_SPHERE_R: number
    SHADOW_R: number
    M_BHU: number
    SPIN_MAX: number
  }
  tracePhoton: typeof tracePhoton
  impactParameter: typeof impactParameter
  orbitalSpeedC: typeof orbitalSpeedC
  frequencyShift: typeof frequencyShift
  diskEmissivity: typeof diskEmissivity
  computeReadout: typeof computeReadout
  kerrTracePhoton: typeof kerrTracePhoton
  kerrISCO: typeof kerrISCO
  kerrHorizons: typeof kerrHorizons
  kerrShadowOutline: typeof kerrShadowOutline
  kerrSeed: typeof kerrSeed
  kerrRedshift: typeof kerrRedshift
  kerrKeplerianOmega: typeof kerrKeplerianOmega
  kerrUt: typeof kerrUt
  /** Trace a ray through a camera at `dist` bhu, `tilt` rad above the disk plane (spin = +z). */
  traceCenter: (
    dist: number,
    tilt: number,
    steps?: number,
    diskOuter?: number,
    spin?: number,
  ) => ReturnType<typeof kerrTracePhoton>
}

export function installDevtools(): BlackHoleDebugApi {
  const api: BlackHoleDebugApi = {
    constants: { B_CRIT, ISCO_R, PHOTON_SPHERE_R, SHADOW_R, M_BHU, SPIN_MAX },
    tracePhoton,
    impactParameter,
    orbitalSpeedC,
    frequencyShift,
    diskEmissivity,
    computeReadout,
    kerrTracePhoton,
    kerrISCO,
    kerrHorizons,
    kerrShadowOutline,
    kerrSeed,
    kerrRedshift,
    kerrKeplerianOmega,
    kerrUt,
    traceCenter: (dist, tilt, steps = 256, diskOuter = 24, spin = 0) => {
      // spin-axis = z, disk at z = 0, camera in the xz-plane (tilt above disk).
      const ro = v3(dist * Math.cos(tilt), 0, dist * Math.sin(tilt))
      const rd = norm(v3(-ro.x, -ro.y, -ro.z))
      return kerrTracePhoton(ro, rd, spin, steps, diskOuter, true)
    },
  }
  ;(window as unknown as { __blackhole: BlackHoleDebugApi }).__blackhole = api
  ;(window as unknown as { __store: typeof useStore }).__store = useStore
  return api
}
