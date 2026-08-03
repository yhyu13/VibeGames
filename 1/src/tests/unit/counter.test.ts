import { describe, it, expect } from 'vitest';
import { pickCounter, getCounterPoolSize } from '../../state/progression/Counter.js';
import { signal } from '../../state/signals.js';
import { createRng } from '../../state/rng.js';
import type { PlayerBehavior } from '../../state/types.js';

function makeBehavior(): PlayerBehavior {
  return {
    weaponUse: signal<Record<string, number>>({}),
    laneUse: signal<Record<string, number>>({ high: 0, low: 0, atmosphere: 0 }),
    regionTargeting: signal({}),
    destructionRatio: signal(0.5),
    shieldReliance: signal(0),
  };
}

describe('Counter', () => {
  it('returns a counter from the pool', () => {
    const b = makeBehavior();
    const rng = createRng(1);
    const c = pickCounter(b, rng);
    expect(c).toBeDefined();
    expect(c.id).toBeDefined();
  });

  it('pool has multiple counters', () => {
    expect(getCounterPoolSize()).toBeGreaterThan(3);
  });

  it('picks kinetic counter when player uses kinetic heavily', () => {
    const b = makeBehavior();
    b.weaponUse.value = { kinetic: 100, plasma: 1, electric: 1 } as Record<string, number>;
    let foundKinetic = false;
    for (let i = 0; i < 20; i++) {
      const rng = createRng(i + 1);
      const c = pickCounter(b, rng);
      if (c.id === 'kinetic-counter') foundKinetic = true;
    }
    expect(foundKinetic).toBe(true);
  });

  it('pickCounter is deterministic with seeded RNG', () => {
    const b = makeBehavior();
    b.weaponUse.value = { plasma: 50, kinetic: 30, electric: 10 } as Record<string, number>;
    const r1 = createRng(42);
    const r2 = createRng(42);
    const a = pickCounter(b, r1);
    const c = pickCounter(b, r2);
    expect(a.id).toBe(c.id);
  });
});