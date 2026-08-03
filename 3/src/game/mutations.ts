import type { RunState } from '../core/types';
import type { RNG } from '../core/rng';
import type { EventBus } from '../core/events';
import { MUTATIONS, getMutation } from '../data/mutations';
import { pushLog } from './propaganda';

export function offerMutations(run: RunState, rng: RNG, count = 3): string[] {
  const owned = new Set(run.mutations.map((m) => m.id));
  const pool = Object.keys(MUTATIONS).filter((id) => !owned.has(id));
  return rng.shuffle(pool).slice(0, count);
}

export function applyMutation(run: RunState, id: string, bus: EventBus): void {
  if (run.mutations.some((m) => m.id === id)) return;
  const def = getMutation(id);
  run.mutations.push(def);
  if (def.hullBonus) {
    run.ship.maxHull = Math.max(50, run.ship.maxHull + def.hullBonus);
    run.ship.hull = Math.min(run.ship.hull, run.ship.maxHull);
  }
  if (def.repairBonus) {
    run.ship.repairRate += def.repairBonus;
  }
  if (id === 'chrono-accelerators') {
    run.combatTimeBonus += 30;
  }
  pushLog(run, `Mutation acquired: ${def.name} — ${def.benefit} | Bane: ${def.bane}`, bus);
}

export function baneActive(run: RunState, defId: string): boolean {
  const def = run.mutations.find((m) => m.id === defId);
  return def !== undefined && run.day >= def.baneDelay + 1;
}

export function applyBanes(run: RunState, rng: RNG, bus: EventBus): void {
  const push = (t: string) => pushLog(run, t, bus);
  if (baneActive(run, 'hull-weavers')) {
    const heal = Math.round((run.ship.maxHull * run.ship.repairRate) / 100);
    run.ship.hull = Math.min(run.ship.maxHull, run.ship.hull + heal);
    push(`Hull Weavers repair ${heal} hull.`);
    if (rng.chance(0.5)) {
      const dmg = Math.round(run.ship.maxHull * 0.08);
      run.ship.hull = Math.max(1, run.ship.hull - dmg);
      push(`Earth mines strike: -${dmg} hull.`);
    }
  }
  if (baneActive(run, 'overclocked-cortex') && run.day % 3 === 0) {
    run.ship.hull = Math.max(1, run.ship.hull - 5);
    push('Earth counter-hack: -5 hull.');
  }
  if (baneActive(run, 'black-sun-core')) {
    run.missileInterceptChance = Math.max(0.1, 0.5 - 0.4);
  }
  run.ship.hull = Math.min(run.ship.hull, run.ship.maxHull);
  bus.emit('hull:changed', { hull: run.ship.hull, maxHull: run.ship.maxHull });
}
