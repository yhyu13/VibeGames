// Instability tier evaluation and burden assignment.
// GDD §8.3: crossing a threshold adds one Burden at a time.

import type { ShipState } from '../types.js';
import { Env } from '../../app/Env.js';
import { BURDEN_DEFS } from './burdens.js';
import type { BurdenId } from '../id.js';
import type { RNG } from '../rng.js';
import { signal } from '../signals.js';

export type InstabilityTier = 'stable' | 'strained' | 'volatile' | 'critical' | 'collapse';

let instabilityRng: RNG | null = null;

export function setInstabilityRng(rng: RNG): void {
  instabilityRng = rng;
}

export function tierOf(instability: number): InstabilityTier {
  if (instability >= 100) return 'collapse';
  if (instability >= 75) return 'critical';
  if (instability >= 50) return 'volatile';
  if (instability >= 25) return 'strained';
  return 'stable';
}

export function tierIndex(t: InstabilityTier): number {
  return { stable: 0, strained: 1, volatile: 2, critical: 3, collapse: 4 }[t];
}

export function applyInstability(ship: ShipState, delta: number): void {
  ship.instability.value = Math.max(0, Math.min(100, ship.instability.peek() + delta));
}

export function purgeInstability(ship: ShipState, amount: number): void {
  ship.instability.value = Math.max(0, ship.instability.peek() - amount);
}

/** Signal-backed tracker for the last evaluated instability tier (0..4). */
export type InstabilityTracker = ReturnType<typeof signal<number>>;

export function createInstabilityTracker(): InstabilityTracker {
  return signal(0);
}

export function evaluateBurdens(ship: ShipState, tracker: InstabilityTracker): BurdenId[] {
  const i = ship.instability.peek();
  const tier = tierIndex(tierOf(i));
  const owned = new Set(ship.activeBurdens.peek());
  const out: BurdenId[] = [];

  const last = tracker.peek();
  if (last !== undefined && tier > last) {
    for (let t = last + 1; t <= tier; t++) {
      const candidates = BURDEN_DEFS.filter(
        (b) => b.trigger.instabilityMin === t * 25 && !owned.has(b.id) && !out.includes(b.id)
      );
      if (candidates.length === 0) continue;
      const choice = instabilityRng ? instabilityRng.pick(candidates) : candidates[0]!;
      out.push(choice.id);
    }
    tracker.value = tier;
  } else if (last !== undefined && tier < last) {
    tracker.value = tier;
  } else if (last === undefined) {
    tracker.value = tier;
  }
  return out;
}

export function commitBurdens(ship: ShipState, ids: ReadonlyArray<BurdenId>): void {
  const cur = new Set(ship.activeBurdens.peek());
  for (const id of ids) cur.add(id);
  ship.activeBurdens.value = Array.from(cur);
}

export function tierThresholdMet(ship: ShipState, threshold: number): boolean {
  return ship.instability.peek() >= threshold;
}

export function tierVisualIntensity(ship: ShipState): number {
  const t = tierOf(ship.instability.peek());
  return { stable: 0, strained: 0.2, volatile: 0.5, critical: 0.8, collapse: 1.0 }[t];
}