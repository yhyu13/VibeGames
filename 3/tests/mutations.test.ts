import { describe, expect, it } from 'vitest';
import { applyMutation, baneActive, offerMutations } from '../src/game/mutations';
import { shipDamageMult } from '../src/game/arsenal';
import { createRun } from '../src/game/run';
import { EventBus } from '../src/core/events';
import { RNG } from '../src/core/rng';

describe('mutations & banes', () => {
  it('applyMutation records the mutation once', () => {
    const run = createRun(3, ['plasma-lance']);
    const bus = new EventBus();
    applyMutation(run, 'viral-spores', bus);
    applyMutation(run, 'viral-spores', bus);
    expect(run.mutations).toHaveLength(1);
    expect(run.mutations[0].id).toBe('viral-spores');
  });

  it('mind-static applies hull penalty', () => {
    const run = createRun(3, ['plasma-lance']);
    const maxBefore = run.ship.maxHull;
    applyMutation(run, 'mind-static', new EventBus());
    expect(run.ship.maxHull).toBe(maxBefore - 10);
    expect(run.ship.hull).toBeLessThanOrEqual(run.ship.maxHull);
  });

  it('hull-weavers raises repair rate', () => {
    const run = createRun(3, ['plasma-lance']);
    applyMutation(run, 'hull-weavers', new EventBus());
    expect(run.ship.repairRate).toBe(8);
  });

  it('bane activates after delay', () => {
    const run = createRun(3, ['plasma-lance']);
    applyMutation(run, 'viral-spores', new EventBus());
    run.day = 1;
    expect(baneActive(run, 'viral-spores')).toBe(false);
    run.day = 3;
    expect(baneActive(run, 'viral-spores')).toBe(true);
  });

  it('black-sun-core multiplies all damage types', () => {
    const run = createRun(3, ['plasma-lance']);
    applyMutation(run, 'black-sun-core', new EventBus());
    expect(shipDamageMult(run, 'kinetic')).toBeCloseTo(1.25);
    expect(shipDamageMult(run, 'emp')).toBeCloseTo(1.25);
  });

  it('offerMutations returns unique ids not already owned', () => {
    const run = createRun(3, ['plasma-lance']);
    applyMutation(run, 'viral-spores', new EventBus());
    const offers = offerMutations(run, new RNG(9), 3);
    expect(offers).toHaveLength(3);
    expect(new Set(offers).size).toBe(3);
    expect(offers).not.toContain('viral-spores');
  });

  it('chrono-accelerators extends the assault window', () => {
    const run = createRun(4, ['plasma-lance']);
    expect(run.combatTimeBonus).toBe(0);
    applyMutation(run, 'chrono-accelerators', new EventBus());
    expect(run.combatTimeBonus).toBe(30);
  });

  it('hollow-points boosts kinetic/energy but weakens bio', () => {
    const run = createRun(5, ['plasma-lance']);
    applyMutation(run, 'hollow-points', new EventBus());
    expect(shipDamageMult(run, 'kinetic')).toBeCloseTo(1.4);
    expect(shipDamageMult(run, 'energy')).toBeCloseTo(1.4);
    expect(shipDamageMult(run, 'bio')).toBeCloseTo(0.5);
  });
});
