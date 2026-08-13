/**
 * core/simulation/squash.ts - v2.0 squash apply/decay (army units + boss)
 */

import { SQUASH_DURATION_FAST } from '../constants';

export interface Squashable {
  squashAmount: number;
}

export function applySquash(target: Squashable, amount: number): void {
  target.squashAmount = amount;
}

export function tickSquash(target: Squashable, dt: number): void {
  const diff = target.squashAmount - 1;
  if (diff === 0) return;
  const decay = SQUASH_DURATION_FAST > 0 ? dt / SQUASH_DURATION_FAST : 1;
  const next = 1 + diff * Math.max(0, 1 - decay);
  target.squashAmount = Math.abs(next - 1) < 0.001 ? 1 : next;
}
