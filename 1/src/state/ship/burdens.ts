// Burdens: drawbacks unlocked at Instability thresholds.

import type { BurdenDef } from './burden-types.js';
import { asBurdenId } from '../id.js';

export const BURDEN_DEFS: ReadonlyArray<BurdenDef> = [
  {
    id: asBurdenId('element-drift'),
    name: 'Element Drift',
    description: 'One weapon slot changes element after every operation.',
    tier: 'minor',
    trigger: { instabilityMin: 25 },
    effect: { elementDriftOnOp: 1 },
  },
  {
    id: asBurdenId('sympathetic-regen'),
    name: 'Sympathetic Regen',
    description: 'Shield regen also restores a small amount of Human Resolve.',
    tier: 'minor',
    trigger: { instabilityMin: 25 },
    effect: { resolveRegenOnShield: 0.5 },
  },
  {
    id: asBurdenId('rushed-puzzles'),
    name: 'Rushed Puzzles',
    description: 'Puzzle timers shorter; successful puzzles grant more Signal.',
    tier: 'minor',
    trigger: { instabilityMin: 25 },
    effect: { puzzleTimeMul: 0.8, puzzleRewardMul: 1.4 },
  },
  {
    id: asBurdenId('false-warnings'),
    name: 'False Warnings',
    description: 'High Heat creates false warning indicators.',
    tier: 'major',
    trigger: { instabilityMin: 50 },
    effect: { heatFalseWarnings: true },
  },
  {
    id: asBurdenId('hostile-debris'),
    name: 'Hostile Debris',
    description: 'Destroyed satellites have a chance to become hostile debris.',
    tier: 'major',
    trigger: { instabilityMin: 50 },
    effect: { debrisHostileChance: 0.25 },
  },
  {
    id: asBurdenId('loud-repairs'),
    name: 'Loud Repairs',
    description: 'Repairs increase Earth Alien Exposure.',
    tier: 'major',
    trigger: { instabilityMin: 50 },
    effect: { repairExposureGain: 2 },
  },
  {
    id: asBurdenId('glitch-weapons'),
    name: 'Glitch Weapons',
    description: 'Weapon quads occasionally displace in UV space.',
    tier: 'volatile',
    trigger: { instabilityMin: 75 },
    effect: { weaponGlitchIntensity: 0.4 },
  },
  {
    id: asBurdenId('collapse-countdown'),
    name: 'Collapse Countdown',
    description: 'Ship begins a final 60-second countdown at Instability 100.',
    tier: 'collapse',
    trigger: { instabilityMin: 100 },
    effect: { collapseTimerSec: 60 },
  },
];

export const BURDEN_DEFS_BY_ID: Readonly<Record<string, BurdenDef>> = Object.freeze(
  BURDEN_DEFS.reduce<Record<string, BurdenDef>>((acc, b) => {
    acc[b.id] = b;
    return acc;
  }, {})
);