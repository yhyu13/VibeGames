import type { ElementId, WeaponId } from '../id.js';

export type WeaponFamily = 'plasma' | 'kinetic' | 'electric' | 'corrosive' | 'gravity' | 'signal';

export interface WeaponBranch {
  name: string;
  effect: string;
  multiplier: number;
}

export interface WeaponOvercharge {
  name: string;
  effect: string;
  duration: number;
}

export interface WeaponDef {
  id: WeaponId;
  family: WeaponFamily;
  name: string;
  element: ElementId;
  baseDamage: number;
  cost: number;
  cooldownSec: number;
  heat: number;
  range: number;
  projectileSpeed: number;
  branches: { a: WeaponBranch; b: WeaponBranch };
  overcharge: WeaponOvercharge;
  description: string;
}