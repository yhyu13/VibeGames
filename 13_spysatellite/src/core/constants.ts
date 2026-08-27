// core/constants.ts — frozen numeric tables (Design §2 / TDD).

export const FIXED_DT = 1 / 60
export const MISSION_TIME = 90
export const SHOT_TIME = 80
export const LOCK_SHOT_HOLD = 2
export const FAILS_TO_ABORT = 2

export const COURTYARD_SIZE = 20
export const COURTYARD_ZOOM = 0.72

export const SAR_HEAT_RISE = 0.18
export const SAR_HEAT_COOL = 0.12
export const SAR_OVERHEAT_DROP = 2.5

export const LOCK_CANOPY_DROP = 0.4
export const LOCK_SAR_OFF_DROP = 0.6

export const PALETTE = {
  ink: '#030508',
  cyan: '#3dff9a',
  heat: '#7cffd4',
  van: '#ffaa44',
  kt: '#ff5533',
  warn: '#ffcc33',
  dim: '#1a2a28',
} as const
