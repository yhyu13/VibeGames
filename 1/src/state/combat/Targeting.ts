// Target selection: pick the weakest defense in the ship's lane.

import type { Defense, Projectile } from '../types.js';

export function pickTarget(defenses: ReadonlyArray<Defense>, projectile: Projectile): Defense | null {
  const inLane = defenses.filter((d) => d.lane === projectile.lane && d.hp > 0);
  if (inLane.length === 0) return null;
  // Score: lower hp + shield preferred, prefer weakness match
  let best = inLane[0]!;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const d of inLane) {
    const score = d.hp + d.shield * 0.5 + (d.weakness === projectile.element ? -30 : 0);
    if (score < bestScore) {
      best = d;
      bestScore = score;
    }
  }
  return best;
}

export function pickWeakestDefense(defenses: ReadonlyArray<Defense>): Defense | null {
  const alive = defenses.filter((d) => d.hp > 0);
  if (alive.length === 0) return null;
  return alive.reduce((a, b) => (a.hp + a.shield * 0.5 <= b.hp + b.shield * 0.5 ? a : b));
}

export function pickClosestDefense(defenses: ReadonlyArray<Defense>, arc: number): Defense | null {
  const alive = defenses.filter((d) => d.hp > 0);
  if (alive.length === 0) return null;
  return alive.reduce((a, b) => (Math.abs(a.arc - arc) <= Math.abs(b.arc - arc) ? a : b));
}