// src/core/data/lights.ts — 8 类 RC 光源(v1 冻结;v1.1 调色板同步)
import type { RcLightSpec } from '../types';
import { PAL_MUZZLE, PAL_BLOOD } from '../constants';

export const RC_LIGHT_TABLE: Record<RcLightSpec['kind'], RcLightSpec> = {
  muzzle_flash: {
    kind: 'muzzle_flash',
    colorHex: PAL_MUZZLE,
    intensity: 1.4,
    radius: 4,
    ttl: 0.05,
  },
  explosion: {
    kind: 'explosion',
    colorHex: PAL_MUZZLE,
    intensity: 2.0,
    radius: 6,
    ttl: 0.2,
  },
  oil_lamp: {
    kind: 'oil_lamp',
    colorHex: '#ffc966',
    intensity: 0.55,
    radius: 3.5,
    pulse: null,
  },
  neon_sign: {
    kind: 'neon_sign',
    colorHex: '#3ad8ff',
    intensity: 0.75,
    radius: 4.5,
    pulse: 'sine',
    pulseHz: 0.5,
  },
  searchlight: {
    kind: 'searchlight',
    colorHex: '#e0e0ff',
    intensity: 0.9,
    radius: 5,
    pulse: 'rotate',
    pulseHz: 0.2,
  },
  surgical: {
    kind: 'surgical',
    colorHex: '#ffffff',
    intensity: 0.7,
    radius: 4,
    pulse: null,
  },
  disco: {
    kind: 'disco',
    colorHex: '#ff5cb4',
    intensity: 0.5,
    radius: 5,
    pulse: 'sine',
    pulseHz: 1.0,
  },
  blood_splash: {
    kind: 'blood_splash',
    colorHex: PAL_BLOOD,
    intensity: 0.3,
    radius: 2,
    ttl: 0.5,
  },
};
