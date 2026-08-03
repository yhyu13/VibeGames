// Weapon families, branches, and overcharges.

import type { WeaponDef } from './weapon-types.js';
import { asWeaponId, asElementId } from '../id.js';

export const WEAPON_DEFS: ReadonlyArray<WeaponDef> = [
  {
    id: asWeaponId('plasma'),
    family: 'plasma',
    name: 'Plasma Lance',
    element: asElementId('plasma'),
    baseDamage: 18,
    cost: 12,
    cooldownSec: 0.5,
    heat: 8,
    range: 14,
    projectileSpeed: 16,
    branches: {
      a: { name: 'Continuous Beam', effect: 'continuous-damage', multiplier: 1.4 },
      b: { name: 'Plasma Bomb', effect: 'splash', multiplier: 1.8 },
    },
    overcharge: { name: 'Plasma Storm', effect: 'cone-damage', duration: 4 },
    description: 'High direct damage, significant heat.',
  },
  {
    id: asWeaponId('kinetic'),
    family: 'kinetic',
    name: 'Kinetic Slug',
    element: asElementId('kinetic'),
    baseDamage: 14,
    cost: 6,
    cooldownSec: 0.3,
    heat: 2,
    range: 16,
    projectileSpeed: 22,
    branches: {
      a: { name: 'Armor Piercer', effect: 'pierce', multiplier: 1.3 },
      b: { name: 'Cluster Munitions', effect: 'cluster', multiplier: 1.5 },
    },
    overcharge: { name: 'Saturation Fire', effect: 'rapid-fire', duration: 3 },
    description: 'Reliable, low-energy, armor-breaking upgrades.',
  },
  {
    id: asWeaponId('electric'),
    family: 'electric',
    name: 'EMP Burst',
    element: asElementId('electric'),
    baseDamage: 8,
    cost: 10,
    cooldownSec: 0.7,
    heat: 4,
    range: 10,
    projectileSpeed: 14,
    branches: {
      a: { name: 'Chain Lightning', effect: 'chain', multiplier: 1.2 },
      b: { name: 'Network Purge', effect: 'disable-network', multiplier: 1.0 },
    },
    overcharge: { name: 'Global Blackout', effect: 'disable-all-shields', duration: 5 },
    description: 'Disables shields and networks; low raw damage.',
  },
  {
    id: asWeaponId('corrosive'),
    family: 'corrosive',
    name: 'Corrosive Nanites',
    element: asElementId('corrosive'),
    baseDamage: 6,
    cost: 14,
    cooldownSec: 0.9,
    heat: 3,
    range: 8,
    projectileSpeed: 10,
    branches: {
      a: { name: 'Melting Plague', effect: 'dot', multiplier: 1.6 },
      b: { name: 'Hardened Cloud', effect: 'armor-strip', multiplier: 1.3 },
    },
    overcharge: { name: 'Nanite Storm', effect: 'global-dot', duration: 6 },
    description: 'DoT-based, strips armor; cleansed by countermeasure facilities.',
  },
  {
    id: asWeaponId('gravity'),
    family: 'gravity',
    name: 'Gravity Lance',
    element: asElementId('gravity'),
    baseDamage: 10,
    cost: 18,
    cooldownSec: 1.0,
    heat: 6,
    range: 12,
    projectileSpeed: 12,
    branches: {
      a: { name: 'Tractor Field', effect: 'pull', multiplier: 1.3 },
      b: { name: 'Crush Pulse', effect: 'shockwave', multiplier: 1.6 },
    },
    overcharge: { name: 'Reversed Gravity', effect: 'lane-invert', duration: 3 },
    description: 'Reposition enemies and weaponize debris.',
  },
  {
    id: asWeaponId('signal'),
    family: 'signal',
    name: 'Signal Lance',
    element: asElementId('signal'),
    baseDamage: 4,
    cost: 4,
    cooldownSec: 0.4,
    heat: 1,
    range: 18,
    projectileSpeed: 24,
    branches: {
      a: { name: 'Decoy Swarm', effect: 'decoy', multiplier: 1.4 },
      b: { name: 'False Orders', effect: 'confuse', multiplier: 1.2 },
    },
    overcharge: { name: 'Mirror Reality', effect: 'perfect-decoy', duration: 5 },
    description: 'Deception scales with Network Control, not raw damage.',
  },
];

export const WEAPON_DEFS_BY_ID: Readonly<Record<string, WeaponDef>> = Object.freeze(
  WEAPON_DEFS.reduce<Record<string, WeaponDef>>((acc, w) => {
    acc[w.id] = w;
    return acc;
  }, {})
);

export const WEAPON_DEFS_BY_ELEMENT: Readonly<Record<string, WeaponDef>> = Object.freeze(
  WEAPON_DEFS.reduce<Record<string, WeaponDef>>((acc, w) => {
    acc[w.element] = w;
    return acc;
  }, {})
);