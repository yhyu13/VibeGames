import { describe, it, expect } from 'vitest';
import { tierOf, evaluateBurdens, commitBurdens, applyInstability, createInstabilityTracker } from '../../state/ship/Instability.js';
import { createShipState } from '../../state/ship/ShipState.js';

describe('Instability', () => {
  it('tierOf maps values to tiers', () => {
    expect(tierOf(0)).toBe('stable');
    expect(tierOf(24)).toBe('stable');
    expect(tierOf(25)).toBe('strained');
    expect(tierOf(49)).toBe('strained');
    expect(tierOf(50)).toBe('volatile');
    expect(tierOf(74)).toBe('volatile');
    expect(tierOf(75)).toBe('critical');
    expect(tierOf(99)).toBe('critical');
    expect(tierOf(100)).toBe('collapse');
  });

  it('applyInstability clamps to 0..100', () => {
    const ship = createShipState();
    applyInstability(ship, 200);
    expect(ship.instability.peek()).toBe(100);
    applyInstability(ship, -500);
    expect(ship.instability.peek()).toBe(0);
  });

  it('evaluateBurdens returns exactly one burden per tier crossing', () => {
    const ship = createShipState();
    const tracker = createInstabilityTracker();
    expect(evaluateBurdens(ship, tracker)).toHaveLength(0);
    applyInstability(ship, 30);
    const b = evaluateBurdens(ship, tracker);
    expect(b.length).toBe(1);
    commitBurdens(ship, b);
    applyInstability(ship, 30); // cross to volatile
    const b2 = evaluateBurdens(ship, tracker);
    expect(b2.length).toBe(1);
    for (const id of b) expect(b2).not.toContain(id);
  });
});