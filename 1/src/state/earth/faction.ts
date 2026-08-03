// Faction definitions and attitude modifiers.

import type { FactionDef } from './faction-types.js';
import { asFactionId } from '../id.js';

export const FACTION_DEFS: ReadonlyArray<FactionDef> = [
  { id: asFactionId('arctic-coalition'), name: 'Arctic Coalition', posture: 'militaristic', surrenderThreshold: 25, propagandaResistance: 0.6 },
  { id: asFactionId('corporate-bloc'), name: 'Corporate Bloc', posture: 'opportunistic', surrenderThreshold: 40, propagandaResistance: 0.4 },
  { id: asFactionId('storm-watchers'), name: 'Storm Watchers', posture: 'defensive', surrenderThreshold: 30, propagandaResistance: 0.5 },
  { id: asFactionId('highland-clans'), name: 'Highland Clans', posture: 'militaristic', surrenderThreshold: 20, propagandaResistance: 0.7 },
  { id: asFactionId('space-corps'), name: 'Space Corps', posture: 'militaristic', surrenderThreshold: 15, propagandaResistance: 0.8 },
  { id: asFactionId('silent-cabinet'), name: 'Silent Cabinet', posture: 'militaristic', surrenderThreshold: 10, propagandaResistance: 0.9 },
  { id: asFactionId('free-islands'), name: 'Free Islands', posture: 'defensive', surrenderThreshold: 35, propagandaResistance: 0.5 },
  { id: asFactionId('green-council'), name: 'Green Council', posture: 'pacifist', surrenderThreshold: 50, propagandaResistance: 0.3 },
  { id: asFactionId('fire-worshippers'), name: 'Fire Worshippers', posture: 'fanatic', surrenderThreshold: 5, propagandaResistance: 0.95 },
  { id: asFactionId('solar-monks'), name: 'Solar Monks', posture: 'pacifist', surrenderThreshold: 60, propagandaResistance: 0.4 },
  { id: asFactionId('dead-grid'), name: 'Dead Grid', posture: 'fanatic', surrenderThreshold: 5, propagandaResistance: 0.99 },
  { id: asFactionId('rival-cantons'), name: 'Rival Cantons', posture: 'opportunistic', surrenderThreshold: 45, propagandaResistance: 0.4 },
];

export const FACTION_DEFS_BY_ID: Readonly<Record<string, FactionDef>> = Object.freeze(
  FACTION_DEFS.reduce<Record<string, FactionDef>>((acc, f) => {
    acc[f.id] = f;
    return acc;
  }, {})
);