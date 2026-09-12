/**
 * (mass, spin) -> SI physical readouts for the HUD. Pure functions, no THREE.
 * In bhu the black-hole mass is M = 1/2 (r_s = 2M = 1); `spin` is dimensionless â.
 */
import { C, M_BHU, RS_PER_MSUN_KM } from '../constants'
import type { PhysicalReadout } from '../types'
import { kerrHorizons, kerrISCO, kerrKeplerianOmega, kerrPhotonOrbit } from './kerr'

export function computeReadout(massMsun: number, spin: number): PhysicalReadout {
  const s = Math.min(Math.max(spin, 0), 0.9999)
  const rsKm = massMsun * RS_PER_MSUN_KM
  const a = s * M_BHU

  const { outer, inner } = kerrHorizons(a)
  const { pro, retro } = kerrISCO(s)
  const photon = kerrPhotonOrbit(s)

  // Equatorial ergosphere (static limit) = 2M = r_s, independent of spin.
  const ergosphereKm = rsKm

  // Accretion efficiency η = 1 − E(ISCO), E = √(1 − 2M / 3 r_ISCO).
  const eIsco = Math.sqrt(Math.max(1 - (2 * M_BHU) / (3 * pro), 0))
  const accretionEfficiency = 1 - eIsco

  // Frame-dragging angular velocity Ω = √M / (r^1.5 + a√M) at the prograde ISCO
  // (kerrKeplerianOmega), converted bhu → SI. In bhu 1 unit of time = r_s/c, so
  // Ω_SI = Ω_bhu · c / r_s_meters. This is the rate the rotating hole drags local
  // inertial frames at the inner disk edge — the signature Kerr effect behind the
  // asymmetric shadow — surfaced as a number rather than left implicit.
  const frameDragOmega = (kerrKeplerianOmega(pro, a) * C) / (rsKm * 1000)

  return {
    spin: s,
    rsKm,
    outerHorizonKm: rsKm * outer,
    innerHorizonKm: rsKm * inner,
    ergosphereKm,
    iscoProKm: rsKm * pro,
    iscoRetroKm: rsKm * retro,
    photonOrbitProKm: rsKm * photon.pro,
    photonOrbitRetroKm: rsKm * photon.retro,
    accretionEfficiency,
    frameDragOmega,
  }
}
