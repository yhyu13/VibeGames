// Planet conditions: randomized per run. Each grants a resistance/weakness pair
// and a gameplay-side hook.

import type { ConditionDef } from './condition-types.js';
import type { ConditionId, ElementId } from '../id.js';
import { asConditionId, asElementId } from '../id.js';

export const CONDITION_DEFS: ReadonlyArray<ConditionDef> = [
  {
    id: asConditionId('perpetual-storms'),
    name: 'Perpetual Storms',
    resistance: asElementId('thermal'),
    weakness: asElementId('electric'),
    effect: 'lightning may chain to ship',
    valid: true,
  },
  {
    id: asConditionId('reinforced-megacities'),
    name: 'Reinforced Megacities',
    resistance: asElementId('kinetic'),
    weakness: asElementId('corrosive'),
    effect: 'destruction creates debris',
    valid: true,
  },
  {
    id: asConditionId('solar-shield-network'),
    name: 'Solar Shield Network',
    resistance: asElementId('plasma'),
    weakness: asElementId('emp'),
    effect: 'orbital targeting periodically blocked',
    valid: true,
  },
  {
    id: asConditionId('dense-satellite-web'),
    name: 'Dense Satellite Web',
    resistance: asElementId('digital'),
    weakness: asElementId('gravity'),
    effect: 'orbit contains more obstacles and salvage',
    valid: true,
  },
  {
    id: asConditionId('polarized-atmosphere'),
    name: 'Polarized Atmosphere',
    resistance: asElementId('electric'),
    weakness: asElementId('kinetic'),
    effect: 'projectiles curve near magnetic zones',
    valid: true,
  },
  {
    id: asConditionId('global-blackout'),
    name: 'Global Blackout Protocol',
    resistance: asElementId('digital'),
    weakness: asElementId('thermal'),
    effect: 'networks disappear until power sites restored',
    valid: true,
  },
  {
    id: asConditionId('subterranean-command'),
    name: 'Subterranean Command',
    resistance: asElementId('plasma'),
    weakness: asElementId('gravity'),
    effect: 'key targets appear in short scan windows',
    valid: true,
  },
  {
    id: asConditionId('fragmented-governments'),
    name: 'Fragmented Governments',
    resistance: asElementId('signal'),
    weakness: asElementId('emp'),
    effect: 'factions act independently and unpredictably',
    valid: true,
  },
  {
    id: asConditionId('aurora-curtain'),
    name: 'Aurora Curtain',
    resistance: asElementId('electric'),
    weakness: asElementId('plasma'),
    effect: 'visual distortion over polar lanes',
    valid: true,
  },
  {
    id: asConditionId('dead-grid'),
    name: 'Dead Grid',
    resistance: asElementId('digital'),
    weakness: asElementId('thermal'),
    effect: 'cyber operations take longer but grant more progress',
    valid: true,
  },
  {
    id: asConditionId('seismic-storms'),
    name: 'Seismic Storms',
    resistance: asElementId('kinetic'),
    weakness: asElementId('gravity'),
    effect: 'gravity weapons pull harder but also affect the ship',
    valid: true,
  },
  {
    id: asConditionId('mirror-array'),
    name: 'Mirror Array',
    resistance: asElementId('plasma'),
    weakness: asElementId('electric'),
    effect: 'reflects 10% of energy weapons back',
    valid: true,
  },
];

export const CONDITION_DEFS_BY_ID: Readonly<Record<string, ConditionDef>> = Object.freeze(
  CONDITION_DEFS.reduce<Record<string, ConditionDef>>((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {})
);

export function pickRandomConditions(rng: { shuffle<T>(items: ReadonlyArray<T>): T[]; pick<T>(items: ReadonlyArray<T>): T }, count: number): ReadonlyArray<ConditionId> {
  return rng.shuffle(CONDITION_DEFS).slice(0, count).map((c) => c.id);
}