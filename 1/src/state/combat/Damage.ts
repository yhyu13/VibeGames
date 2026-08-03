// Damage formula: base * element * branch * instability * adaptations.

import type { Projectile, Defense, EarthState, ShipState } from '../types.js';
import type { ElementId } from '../id.js';
import { WEAPON_DEFS_BY_ID } from '../ship/weapons.js';
import { CONDITION_DEFS_BY_ID } from '../earth/conditions.js';
import { tierOf } from '../ship/Instability.js';
import { getActiveCounterElementReduction } from '../progression/Counter.js';

export interface DamageInput {
  projectile: Projectile;
  target: Defense;
  earth: EarthState;
  ship: ShipState;
}

export interface DamageResult {
  raw: number;
  afterElement: number;
  afterBranch: number;
  afterCounter: number;
  afterInstability: number;
  final: number;
  breakdown: { elementMul: number; branchMul: number; counterMul: number; instMul: number };
}

const ELEMENT_MATCHUPS: { strong: number; weak: number; neutral: number } = {
  strong: 1.8,
  weak: 0.45,
  neutral: 1.0,
};

export function elementMultiplier(projectile: Projectile, target: Defense, earth: EarthState): number {
  const element = projectile.element;
  const baseMatch = ELEMENT_MATCHUPS;
  let mult = baseMatch.neutral;
  const resistance = target.resistance;
  const weakness = target.weakness;

  if (resistance === element) mult *= baseMatch.weak;
  if (weakness === element) mult *= baseMatch.strong;

  for (const condId of earth.activeConditions.peek()) {
    const cond = CONDITION_DEFS_BY_ID[condId];
    if (!cond) continue;
    if (cond.resistance === element) mult *= 0.75;
    if (cond.weakness === element) mult *= 1.2;
  }

  return mult;
}

export function branchMultiplier(projectile: Projectile, branch: 'a' | 'b' | null): number {
  if (!branch) return 1.0;
  const def = WEAPON_DEFS_BY_ID[projectile.archetype];
  if (!def) return 1.0;
  return def.branches[branch].multiplier;
}

export function counterMultiplier(element: ElementId, earth: EarthState): number {
  const id = earth.activeCounter.peek()?.id ?? null;
  return getActiveCounterElementReduction(element, id);
}

export function instabilityPenalty(ship: ShipState): number {
  const t = tierOf(ship.instability.peek());
  return { stable: 1.0, strained: 0.95, volatile: 0.88, critical: 0.78, collapse: 0.6 }[t];
}

export function computeDamage(input: DamageInput): DamageResult {
  const elemMul = elementMultiplier(input.projectile, input.target, input.earth);
  const brMul = branchMultiplier(input.projectile, null);
  const cntMul = counterMultiplier(input.projectile.element, input.earth);
  const instMul = instabilityPenalty(input.ship);

  const raw = input.projectile.baseDamage;
  const afterElement = raw * elemMul;
  const afterBranch = afterElement * brMul;
  const afterCounter = afterBranch * cntMul;
  const final = Math.max(1, afterCounter * instMul);

  return {
    raw,
    afterElement,
    afterBranch,
    afterCounter,
    afterInstability: final,
    final,
    breakdown: { elementMul: elemMul, branchMul: brMul, counterMul: cntMul, instMul },
  };
}

export function applyDamageToDefense(defense: Defense, amount: number, earth: EarthState): { absorbed: number; hullDamage: number } {
  let remaining = amount;
  let absorbed = 0;
  if (defense.shield > 0) {
    const a = Math.min(defense.shield, remaining);
    defense.shield -= a;
    remaining -= a;
    absorbed = a;
  }
  defense.hp = Math.max(0, defense.hp - remaining);
  if (defense.hp <= 0) {
    earth.alienExposure.value = Math.min(100, earth.alienExposure.peek() + 0.5);
  }
  return { absorbed, hullDamage: amount - absorbed };
}