import type { RunState, TargetState } from '../core/types';
import { RNG } from '../core/rng';
import type { EventBus } from '../core/events';
import { generateDayDefenses, generateEarth, generateProfile, escalation } from './earth';
import { findWeapon, effectiveDamage } from './arsenal';
import { defaultSegments } from './propaganda';
import { defaultNodes, shutdownCount } from './virus';
import { pushLog } from './propaganda';

export function createRun(seed: number, weaponIds: string[], difficultyBudget = 2): RunState {
  const rng = new RNG(seed);
  const profile = generateProfile(rng, difficultyBudget);
  const earth = generateEarth(rng, profile);
  const ship = {
    hull: 100,
    maxHull: 100,
    weaponIds: [...weaponIds],
    weaponMods: {} as Record<string, number>,
    cortex: 1,
    broadcast: 1,
    repairRate: 0,
    drones: 0,
    doomCooldown: 0,
  };
  return {
    seed,
    day: 1,
    ship,
    profile,
    earthName: earth.name,
    targets: earth.targets,
    segments: defaultSegments(),
    nodes: defaultNodes(),
    convertedApplied: [],
    mutations: [],
    salvage: 10,
    jammedUntil: 0,
    doomsdayUsed: -3,
    autoDisables: 0,
    missileSabotaged: false,
    missileInterceptChance: 0.5,
    nukesIncoming: 0,
    combatTimeBonus: 0,
    log: [],
    outcome: 'none',
    alienium: 0,
  };
}

export function primaryTargets(run: RunState): TargetState[] {
  return run.targets.filter((t) => t.isPrimary);
}

export function allPrimaryDestroyed(run: RunState): boolean {
  return primaryTargets(run).every((t) => t.destroyed);
}

export function allSegmentsConverted(run: RunState): boolean {
  return run.segments.every((s) => s.converted);
}

export function checkWin(run: RunState): RunState['outcome'] {
  if (allPrimaryDestroyed(run)) return 'annihilation';
  if (shutdownCount(run) >= 4) return 'shutdown';
  if (allSegmentsConverted(run)) return 'conversion';
  return 'none';
}

export function startDay(run: RunState, bus: EventBus): void {
  run.day += 1;
  run.ship.doomCooldown = Math.max(0, run.ship.doomCooldown - 1);
  const esc = escalation(run.day, run);
  run.nukesIncoming = run.missileSabotaged ? 0 : esc.nukes;
  if (run.mutations.some((m) => m.id === 'chrono-accelerators' && run.day >= m.baneDelay + 1)) {
    run.nukesIncoming += 1;
  }
  bus.emit('day:started', { day: run.day });
  pushLog(run, `--- Day ${run.day} --- ${run.earthName} escalates: ${esc.turrets} turrets, ${esc.fighters} fighters, ${esc.obstacles} obstacles, ${run.nukesIncoming} nukes.`, bus);
}

export function dayDefenses(run: RunState, _bus: EventBus): TargetState[] {
  const defs = generateDayDefenses(run);
  run.targets = [...run.targets, ...defs];
  return defs;
}

export function destroyTarget(run: RunState, target: TargetState, bus: EventBus): void {
  if (target.destroyed) return;
  target.destroyed = true;
  target.hp = 0;
  bus.emit('target:destroyed', { id: target.id, name: target.name });
  pushLog(run, `${target.name} destroyed.`, bus);
  if (!target.isPrimary) {
    const gain = Math.round((3 + run.day * 2) * run.profile.salvageMult);
    run.salvage += gain;
    bus.emit('salvage:changed', { salvage: run.salvage });
  }
}

export function doomsday(run: RunState, bus: EventBus): number {
  if (run.day <= run.doomsdayUsed + 2) return 0;
  run.doomsdayUsed = run.day;
  const rng = new RNG(run.seed + run.day * 104729);
  const targets = run.targets.filter((t) => !t.destroyed && !t.isPrimary);
  const prims = primaryTargets(run).filter((t) => !t.destroyed);
  const pool = targets.length ? targets : prims;
  if (!pool.length) return 0;
  let total = 0;
  for (const t of pool) {
    if (rng.chance(0.8)) {
      const dmg = 150 / pool.length + rng.int(0, 30);
      t.hp -= dmg;
      total += dmg;
      if (t.hp <= 0) destroyTarget(run, t, bus);
    }
  }
  pushLog(run, `Doomsday Ray strikes Earth: ${Math.round(total)} damage across ${pool.length} targets.`, bus);
  return total;
}

export function applyCounterattack(run: RunState, bus: EventBus): void {
  const nukes = run.nukesIncoming;
  const rng = new RNG(run.seed + run.day * 15485863);
  let damage = 0;
  for (let i = 0; i < nukes; i++) {
    if (rng.chance(run.missileInterceptChance)) {
      pushLog(run, 'A nuclear missile is intercepted in orbit.', bus);
      continue;
    }
    const dmg = rng.int(8, 16);
    damage += dmg;
    pushLog(run, `Nuclear missile hits the ship: -${dmg} hull.`, bus);
  }
  if (damage > 0) {
    run.ship.hull = Math.max(0, run.ship.hull - damage);
    bus.emit('hull:changed', { hull: run.ship.hull, maxHull: run.ship.maxHull });
  }
  const esc = escalation(run.day, run);
  const disables = run.autoDisables;
  if (disables > 0) {
    const alive = run.targets.filter((t) => !t.destroyed && !t.isPrimary);
    for (let i = 0; i < disables && i < alive.length; i++) {
      destroyTarget(run, alive[i], bus);
    }
    pushLog(run, `Converted defenders disable ${Math.min(disables, alive.length)} defenses.`, bus);
  }
  if (esc.fighters > 0 && rng.chance(0.6)) {
    const dmg = rng.int(3, 8);
    run.ship.hull = Math.max(0, run.ship.hull - dmg);
    bus.emit('hull:changed', { hull: run.ship.hull, maxHull: run.ship.maxHull });
    pushLog(run, `Fighter strafing run: -${dmg} hull.`, bus);
  }
  run.ship.hull = Math.max(0, run.ship.hull);
}

export interface AssaultResult {
  destroyedIds: string[];
  hullLoss: number;
  damageDealt: number;
}

export function autoResolve(run: RunState, seconds: number, rng: RNG): AssaultResult {
  const targets = run.targets.filter((t) => !t.destroyed);
  const result: AssaultResult = { destroyedIds: [], hullLoss: 0, damageDealt: 0 };
  const time = Math.max(0, seconds);
  const steps = Math.floor(time * 4);
  const weapons = run.ship.weaponIds.map(findWeapon);
  for (let s = 0; s < steps; s++) {
    const alive = targets.filter((t) => !t.destroyed);
    if (!alive.length || !weapons.length) break;
    for (const w of weapons) {
      if (rng.chance(w.fireRate / 4)) {
        const target = rng.pick(alive);
        if (!rng.chance(w.accuracy)) continue;
        const dmg = Math.max(1, Math.round(effectiveDamage(w, target.armor, run)));
        target.hp -= dmg;
        result.damageDealt += dmg;
        if (target.hp <= 0 && !target.destroyed) {
          target.destroyed = true;
          target.hp = 0;
          result.destroyedIds.push(target.id);
        }
      }
    }
  }
  for (const id of result.destroyedIds) {
    const t = run.targets.find((x) => x.id === id);
    if (t && !t.isPrimary) {
      const gain = Math.round((3 + run.day * 2) * run.profile.salvageMult);
      run.salvage += gain;
    }
  }
  const survivors = run.targets.filter((t) => !t.destroyed && !t.isPrimary);
  if (survivors.length > 0) {
    const penalty = Math.min(20, Math.round(survivors.length * (2 + run.day * 0.5)));
    result.hullLoss = penalty;
    run.ship.hull = Math.max(0, run.ship.hull - penalty);
  }
  return result;
}

export function scoreRun(run: RunState): number {
  const base = 20 + run.profile.difficulty * 5;
  const bloodless = run.outcome !== 'annihilation' && run.outcome !== 'none' ? 30 : 0;
  const days = run.day * 2;
  run.alienium = Math.max(5, base + bloodless + days);
  return run.alienium;
}

export function describeProfile(run: RunState): string {
  const names = [run.profile.primary.name, ...run.profile.secondary.map((c) => c.name)];
  return `${run.earthName}: ${names.join(' / ')}`;
}

export function conditionSummary(run: RunState): string[] {
  const out: string[] = [describeProfile(run)];
  const mods = Object.entries(run.profile.damageMod).filter(([, v]) => v !== 1);
  if (mods.length) out.push('Damage: ' + mods.map(([t, v]) => `${t} ${v > 1 ? 'x' : 'x'}${v}`).join(', '));
  if (run.profile.defenseHpMod !== 0) out.push(`Defense HP ${run.profile.defenseHpMod > 0 ? '+' : ''}${Math.round(run.profile.defenseHpMod * 100)}%`);
  if (run.profile.propagandaMult !== 1) out.push(`Propaganda x${run.profile.propagandaMult}`);
  if (run.profile.virusMult !== 1) out.push(`Virus x${run.profile.virusMult}`);
  return out;
}

export function difficultyName(run: RunState): string {
  const d = run.profile.difficulty;
  if (d <= -1) return 'Easy';
  if (d === 0) return 'Normal';
  if (d <= 2) return 'Hard';
  return 'Brutal';
}
