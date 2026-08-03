// Alien adaptations: powerful but increase Instability.

import type { AdaptationDef } from './adaptation-types.js';
import { asAdaptationId } from '../id.js';

export const ADAPTATION_DEFS: ReadonlyArray<AdaptationDef> = [
  {
    id: asAdaptationId('recursive-reactor'),
    name: 'Recursive Reactor',
    description: 'Energy generation rises after every weapon combo. Missed attacks cause Heat spikes.',
    instabilityCost: 18,
    benefit: { energyRegenBonus: 0.4 },
    drawback: { missedShotHeatSpike: 12 },
  },
  {
    id: asAdaptationId('living-armor'),
    name: 'Living Armor',
    description: 'Hull slowly regenerates. Fire damage permanently reduces max Hull for the encounter.',
    instabilityCost: 22,
    benefit: { hullRegenPerSec: 0.5 },
    drawback: { fireReducesHullMax: 4 },
  },
  {
    id: asAdaptationId('split-consciousness'),
    name: 'Split Consciousness',
    description: 'Control two drones independently. Input delays during high Instability events.',
    instabilityCost: 25,
    benefit: { droneCount: 2 },
    drawback: { inputDelayOnEvents: 0.15 },
  },
  {
    id: asAdaptationId('memory-parasite'),
    name: 'Memory Parasite',
    description: 'Failed puzzles reveal one correct step. Cyber defenses learn faster.',
    instabilityCost: 20,
    benefit: { puzzleHintOnFail: true },
    drawback: { counterLearnBonus: 0.2 },
  },
  {
    id: asAdaptationId('void-stomach'),
    name: 'Void Stomach',
    description: 'Consume orbital debris for resources. Nearby pickups become dangerous projectiles.',
    instabilityCost: 15,
    benefit: { debrisSalvage: 1.5 },
    drawback: { pickupAttraction: 1.0 },
  },
  {
    id: asAdaptationId('mimetic-signal'),
    name: 'Mimetic Signal',
    description: 'Copy one Earth defense ability. Repeated use may target the wrong faction.',
    instabilityCost: 28,
    benefit: { copyDefenseAbility: 1 },
    drawback: { factionTargetErrorChance: 0.1 },
  },
  {
    id: asAdaptationId('void-step'),
    name: 'Void Step',
    description: 'Teleport short distance between lanes.',
    instabilityCost: 12,
    benefit: { voidStepEnabled: true },
    drawback: { instabilityOnUse: 4 },
  },
  {
    id: asAdaptationId('eye-of-the-void'),
    name: 'Eye of the Void',
    description: 'Counter counters are visible for longer and reveal weaknesses.',
    instabilityCost: 16,
    benefit: { counterIntelTimeBonus: 1.5 },
    drawback: { panicOnCounterActivate: 5 },
  },
  {
    id: asAdaptationId('resonance-cascade'),
    name: 'Resonance Cascade',
    description: 'Consecutive hits on the same target deal bonus damage.',
    instabilityCost: 20,
    benefit: { comboDamageBonus: 0.15 },
    drawback: { comboBreakDamage: 6 },
  },
  {
    id: asAdaptationId('phase-lance'),
    name: 'Phase Lance',
    description: 'Projectiles occasionally ignore shields.',
    instabilityCost: 18,
    benefit: { phaseChance: 0.2 },
    drawback: { instabilityPerPhase: 2 },
  },
  {
    id: asAdaptationId('mass-eclipse'),
    name: 'Mass Eclipse',
    description: 'Once per run, darken a region to 0 visibility for 5 seconds.',
    instabilityCost: 14,
    benefit: { oncePerRunEclipse: true },
    drawback: { instabilityAfterUse: 8 },
  },
  {
    id: asAdaptationId('broken-horizon'),
    name: 'Broken Horizon',
    description: 'Can fire while cloaked. Detection no longer breaks cloak.',
    instabilityCost: 22,
    benefit: { fireWhileCloaked: true },
    drawback: { cloakDurationHalf: 0.5 },
  },
];

export const ADAPTATION_DEFS_BY_ID: Readonly<Record<string, AdaptationDef>> = Object.freeze(
  ADAPTATION_DEFS.reduce<Record<string, AdaptationDef>>((acc, a) => {
    acc[a.id] = a;
    return acc;
  }, {})
);