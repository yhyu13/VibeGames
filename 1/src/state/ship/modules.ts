// Ship modules: shield, engine, cloaking, drone, hacking.

import type { ModuleDef } from './module-types.js';
import { asWeaponId } from '../id.js';

export const MODULE_DEFS: ReadonlyArray<ModuleDef> = [
  {
    id: 'shield',
    name: 'Shield Generator',
    description: 'Regenerates shield during combat.',
    maxLevel: 3,
    effects: [
      { regenPerSec: 4, shieldMaxBonus: 0 },
      { regenPerSec: 8, shieldMaxBonus: 10 },
      { regenPerSec: 14, shieldMaxBonus: 25 },
    ],
  },
  {
    id: 'engine',
    name: 'Orbital Engine',
    description: 'Movement speed and lane change cooldown.',
    maxLevel: 3,
    effects: [
      { speedMultiplier: 1.0 },
      { speedMultiplier: 1.3 },
      { speedMultiplier: 1.7 },
    ],
  },
  {
    id: 'cloaking',
    name: 'Cloaking Field',
    description: 'Reduces detection range, harder targeting.',
    maxLevel: 2,
    effects: [
      { detectionMultiplier: 0.7 },
      { detectionMultiplier: 0.4 },
    ],
  },
  {
    id: 'drone',
    name: 'Combat Drone',
    description: 'Autonomous ally fires on nearby defenses.',
    maxLevel: 3,
    effects: [
      { droneDamage: 4, droneRange: 5 },
      { droneDamage: 7, droneRange: 7 },
      { droneDamage: 10, droneRange: 9 },
    ],
  },
  {
    id: 'hacking',
    name: 'Hacking Suite',
    description: 'Puzzles are easier; can hack locked defenses mid-combat.',
    maxLevel: 2,
    effects: [
      { puzzleTimeBonus: 0.15 },
      { puzzleTimeBonus: 0.30 },
    ],
  },
];

export const MODULE_DEFS_BY_ID: Readonly<Record<string, ModuleDef>> = Object.freeze(
  MODULE_DEFS.reduce<Record<string, ModuleDef>>((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {})
);