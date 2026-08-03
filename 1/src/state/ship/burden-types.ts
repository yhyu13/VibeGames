import type { BurdenId } from '../id.js';

export type BurdenTier = 'minor' | 'major' | 'volatile' | 'collapse';

export interface BurdenTrigger {
  instabilityMin: number;
}

export interface BurdenEffect {
  elementDriftOnOp?: number;
  resolveRegenOnShield?: number;
  puzzleTimeMul?: number;
  puzzleRewardMul?: number;
  heatFalseWarnings?: boolean;
  debrisHostileChance?: number;
  repairExposureGain?: number;
  weaponGlitchIntensity?: number;
  collapseTimerSec?: number;
}

export interface BurdenDef {
  id: BurdenId;
  name: string;
  description: string;
  tier: BurdenTier;
  trigger: BurdenTrigger;
  effect: BurdenEffect;
}