/**
 * (mass, spin) -> SI physical readouts for the HUD. Pure functions, no THREE.
 * In bhu the black-hole mass is M = 1/2 (r_s = 2M = 1); `spin` is dimensionless â.
 */
import { M_BHU, RS_PER_MSUN_KM } from '../constants'
import type { PhysicalReadout } from '../types'
import { kerrHorizons, kerrISCO } from './kerr'

export function computeReadout(massMsun: number, spin: number): PhysicalReadout {
  const s = Math.min(Math.max(spin, 0), 0.9999)
  const rsKm = massMsun * RS_PER_MSUN_KM
  const a = s * M_BHU

  const { outer, inner } = kerrHorizons(a)
  const { pro, retro } = kerrISCO(s)

  // Equatorial ergosphere (static limit) = 2M = r_s, independent of spin.
  const ergosphereKm = rsKm

  // Accretion efficiency η = 1 − E(ISCO), E = √(1 − 2M / 3 r_ISCO).
  const eIsco = Math.sqrt(Math.max(1 - (2 * M_BHU) / (3 * pro), 0))
  const accretionEfficiency = 1 - eIsco

  return {
    spin: s,
    rsKm,
    outerHorizonKm: rsKm * outer,
    innerHorizonKm: rsKm * inner,
    ergosphereKm,
    iscoProKm: rsKm * pro,
    iscoRetroKm: rsKm * retro,
    accretionEfficiency,
  }
}
