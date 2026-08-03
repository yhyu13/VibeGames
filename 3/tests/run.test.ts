import { describe, expect, it } from 'vitest';
import { RNG } from '../src/core/rng';
import { EventBus } from '../src/core/events';
import {
  applyCounterattack,
  autoResolve,
  checkWin,
  createRun,
  dayDefenses,
  destroyTarget,
  doomsday,
  primaryTargets,
  scoreRun,
  startDay,
} from '../src/game/run';
import { escalation } from '../src/game/earth';
import { compromise } from '../src/game/virus';
import { applyConversion } from '../src/game/propaganda';
import { applyMutation } from '../src/game/mutations';
import { getCondition } from '../src/data/conditions';
import { computeProfile } from '../src/game/earth';

function simulateDays(run: ReturnType<typeof createRun>, days: number, bus: EventBus): void {
  for (let d = 0; d < days; d++) {
    startDay(run, bus);
    dayDefenses(run, bus);
    for (const t of run.targets) {
      if (t.isPrimary) continue;
      t.hp = 0;
      t.destroyed = true;
    }
    applyCounterattack(run, bus);
  }
}

describe('run lifecycle', () => {
  it('createRun initializes a coherent state', () => {
    const run = createRun(10, ['plasma-lance', 'kinetic-rods']);
    expect(run.day).toBe(1);
    expect(run.ship.hull).toBe(100);
    expect(primaryTargets(run)).toHaveLength(3);
    expect(run.segments).toHaveLength(4);
    expect(run.nodes).toHaveLength(5);
    expect(run.outcome).toBe('none');
    expect(run.missileInterceptChance).toBe(0.5);
  });

  it('escalation follows the GDD schedule', () => {
    const run = createRun(10, ['plasma-lance']);
    expect(escalation(1, run).turrets).toBe(3);
    expect(escalation(1, run).nukes).toBe(0);
    expect(escalation(3, run).fighters).toBeGreaterThan(0);
    expect(escalation(4, run).nukes).toBe(1);
    expect(escalation(6, run).nukes).toBe(3);
  });

  it('orbital compromise reduces obstacle escalation', () => {
    const plain = createRun(10, ['plasma-lance']);
    const run = createRun(10, ['plasma-lance']);
    compromise(run, 'orbital', new EventBus());
    expect(escalation(6, run).obstacles).toBeLessThan(escalation(6, plain).obstacles);
  });

  it('dayDefenses adds escalating defenses to run targets', () => {
    const run = createRun(11, ['plasma-lance']);
    const bus = new EventBus();
    startDay(run, bus);
    run.day = 5;
    startDay(run, bus);
    const defs = dayDefenses(run, bus);
    expect(defs.length).toBeGreaterThan(0);
    expect(defs.every((t) => !t.isPrimary)).toBe(true);
  });

  it('annihilation win is detected when all primaries destroyed', () => {
    const run = createRun(12, ['plasma-lance']);
    for (const t of primaryTargets(run)) destroyTarget(run, t, new EventBus());
    expect(checkWin(run)).toBe('annihilation');
  });

  it('shutdown win at 4 nodes', () => {
    const run = createRun(13, ['plasma-lance']);
    for (const id of ['power', 'defense', 'missile', 'media'] as const) {
      compromise(run, id, new EventBus());
    }
    expect(checkWin(run)).toBe('shutdown');
  });

  it('conversion win requires all segments', () => {
    const run = createRun(14, ['plasma-lance']);
    for (const s of run.segments) {
      s.conviction = 100;
      s.converted = true;
    }
    applyConversion(run, 'civilian', new EventBus());
    expect(checkWin(run)).toBe('conversion');
  });

  it('doomsday respects the 2-day cooldown', () => {
    const run = createRun(15, ['plasma-lance']);
    const bus = new EventBus();
    const first = doomsday(run, bus);
    expect(first).toBeGreaterThan(0);
    expect(doomsday(run, bus)).toBe(0);
  });

  it('autoResolve damages and destroys targets', () => {
    const run = createRun(16, ['doomsday-ray']);
    run.profile = computeProfile([getCondition('iron-age')]);
    const bus = new EventBus();
    startDay(run, bus);
    const defs = dayDefenses(run, bus);
    const res = autoResolve(run, 30, new RNG(1));
    expect(res.damageDealt).toBeGreaterThan(0);
    expect(res.destroyedIds.length).toBeGreaterThan(0);
    const destroyedSet = new Set(run.targets.filter((t) => t.destroyed).map((t) => t.id));
    expect(res.destroyedIds.every((id) => destroyedSet.has(id))).toBe(true);
    const defIds = new Set(defs.map((d) => d.id));
    const dayDestroyed = res.destroyedIds.filter((id) => defIds.has(id)).length;
    expect(dayDestroyed).toBeGreaterThan(0);
  });

  it('autoResolve penalizes surviving defenses', () => {
    const run = createRun(17, ['plasma-lance']);
    const bus = new EventBus();
    startDay(run, bus);
    dayDefenses(run, bus);
    const hullBefore = run.ship.hull;
    const res = autoResolve(run, 2, new RNG(2));
    expect(run.ship.hull).toBeLessThan(hullBefore);
    expect(res.hullLoss).toBeGreaterThan(0);
  });

  it('counterattack with sabotage causes no nuke damage (fighters only)', () => {
    const run = createRun(18, ['plasma-lance']);
    run.day = 5;
    run.missileSabotaged = true;
    const hullBefore = run.ship.hull;
    applyCounterattack(run, new EventBus());
    expect(run.ship.hull).toBeGreaterThanOrEqual(hullBefore - 8);
  });

  it('full simulated invasion to day 7 completes without corrupting state', () => {
    const run = createRun(19, ['plasma-lance', 'kinetic-rods']);
    const bus = new EventBus();
    simulateDays(run, 6, bus);
    expect(run.day).toBe(7);
    expect(run.ship.hull).toBeGreaterThanOrEqual(0);
    expect(run.ship.hull).toBeLessThanOrEqual(run.ship.maxHull);
    expect(Number.isFinite(run.salvage)).toBe(true);
    expect(checkWin(run)).toBe('none');
  });

  it('scoreRun awards more for harder profiles', () => {
    const easy = createRun(20, ['plasma-lance']);
    easy.profile.difficulty = 0;
    easy.outcome = 'shutdown';
    const hard = createRun(21, ['plasma-lance']);
    hard.profile.difficulty = 3;
    hard.outcome = 'shutdown';
    expect(scoreRun(hard)).toBeGreaterThan(scoreRun(easy));
  });

  it('chrono-accelerators bane adds one nuke per day after delay', () => {
    const run = createRun(30, ['plasma-lance']);
    applyMutation(run, 'chrono-accelerators', new EventBus());
    run.day = 1;
    startDay(run, new EventBus());
    expect(run.nukesIncoming).toBe(0);
    run.day = 4;
    startDay(run, new EventBus());
    expect(run.nukesIncoming).toBeGreaterThanOrEqual(2);
  });
});
