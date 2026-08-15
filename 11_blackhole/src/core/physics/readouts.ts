/**
 * Mass -> SI physical readouts for the HUD. Pure functions, no THREE.
 */
import { B_CRIT, ISCO_R, PHOTON_SPHERE_R, RS_PER_MSUN_KM } from '../constants'
import type { PhysicalReadout } from '../types'
import { orbitalSpeedC } from './geodesics'

export function computeReadout(massMsun: number): PhysicalReadout {
  const rsKm = massMsun * RS_PER_MSUN_KM
  const photonSphereKm = rsKm * PHOTON_SPHERE_R
  const iscoKm = rsKm * ISCO_R
  const bCritKm = rsKm * B_CRIT
  const captureAreaKm2 = Math.PI * bCritKm * bCritKm
  const iscoSpeedC = orbitalSpeedC(ISCO_R)
  return { rsKm, photonSphereKm, iscoKm, bCritKm, captureAreaKm2, iscoSpeedC }
}
