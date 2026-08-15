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
  kerrTracePhotonAdaptive,
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
  kerrTracePhotonAdaptive: typeof kerrTracePhotonAdaptive
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
  /** Low-res capture/escape mask of the shadow via the adaptive tracer (GPU-parity reference). */
  renderCaptureMask: (opts: {
    dist: number
    tilt: number
    w: number
    h: number
    fovDeg: number
    aspect: number
    spin: number
  }) => number[][]
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
    kerrTracePhotonAdaptive,
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
    renderCaptureMask: ({ dist, tilt, w, h, fovDeg, aspect, spin }) => {
      // Mirror the shader's camera ray (uCamFwd/Right/Up from SceneManager).
      const tanFov = Math.tan((fovDeg * Math.PI) / 360)
      const ro = v3(dist * Math.cos(tilt), 0, dist * Math.sin(tilt))
      const fwd = norm(v3(-ro.x, -ro.y, -ro.z))
      const right = v3(0, 1, 0)
      const up = v3(-Math.sin(tilt), 0, Math.cos(tilt))
      const mask: number[][] = new Array(h)
      for (let py = 0; py < h; py++) {
        mask[py] = new Array(w)
        // py = 0 is the top row (ndc.y = +1), matching screenshot row order.
        const ndcY = 1 - (2 * (py + 0.5)) / h
        for (let px = 0; px < w; px++) {
          const ndcX = (2 * (px + 0.5)) / w - 1
          const rd = norm(v3(
            fwd.x + right.x * (ndcX * tanFov * aspect) + up.x * (ndcY * tanFov),
            fwd.y + right.y * (ndcX * tanFov * aspect) + up.y * (ndcY * tanFov),
            fwd.z + right.z * (ndcX * tanFov * aspect) + up.z * (ndcY * tanFov),
          ))
          const fate = kerrTracePhotonAdaptive(ro, rd, spin, 24, false, { rtol: 1e-8 }).fate
          mask[py][px] = fate === 'captured' ? 1 : 0
        }
      }
      return mask
    },
  }
  ;(window as unknown as { __blackhole: BlackHoleDebugApi }).__blackhole = api
  ;(window as unknown as { __store: typeof useStore }).__store = useStore
  return api
}
