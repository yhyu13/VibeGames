import type { AdaptationId } from '../id.js';

export interface AdaptationBenefit {
  energyRegenBonus?: number;
  hullRegenPerSec?: number;
  droneCount?: number;
  puzzleHintOnFail?: boolean;
  debrisSalvage?: number;
  copyDefenseAbility?: number;
  voidStepEnabled?: boolean;
  counterIntelTimeBonus?: number;
  comboDamageBonus?: number;
  phaseChance?: number;
  oncePerRunEclipse?: boolean;
  fireWhileCloaked?: boolean;
}

export interface AdaptationDrawback {
  missedShotHeatSpike?: number;
  fireReducesHullMax?: number;
  inputDelayOnEvents?: number;
  counterLearnBonus?: number;
  pickupAttraction?: number;
  factionTargetErrorChance?: number;
  instabilityOnUse?: number;
  panicOnCounterActivate?: number;
  comboBreakDamage?: number;
  instabilityPerPhase?: number;
  instabilityAfterUse?: number;
  cloakDurationHalf?: number;
}

export interface AdaptationDef {
  id: AdaptationId;
  name: string;
  description: string;
  instabilityCost: number;
  benefit: AdaptationBenefit;
  drawback: AdaptationDrawback;
}