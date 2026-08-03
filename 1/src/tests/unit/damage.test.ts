import { describe, it, expect } from 'vitest';
import { computeDamage, elementMultiplier, counterMultiplier, instabilityPenalty } from '../../state/combat/Damage.js';
import { createEarthState } from '../../state/earth/EarthState.js';
import { createShipState } from '../../state/ship/ShipState.js';
import { asElementId, asProjectileId } from '../../state/id.js';
import type { Projectile, Defense } from '../../state/types.js';

function makeProjectile(element: string): Projectile {
  return {
    id: asProjectileId('p1'),
    archetype: element as never,
    lane: 'low',
    arc: 0,
    vArc: 2,
    element: asElementId(element),
    baseDamage: 10,
    ttl: 2,
    owner: 'player',
    flags: {},
  };
}

function makeDefense(resistance: string, weakness: string): Defense {
  return {
    id: 'd1' as never,
    type: 'turret',
    regionId: 'r1' as never,
    lane: 'low',
    arc: 0,
    hp: 100,
    shield: 0,
    resistance: asElementId(resistance),
    weakness: asElementId(weakness),
    cooldown: 0,
  };
}

describe('Damage', () => {
  it('element multiplier: weakness gives 1.8x', () => {
    const earth = createEarthState();
    const p = makeProjectile('plasma');
    const d = makeDefense('kinetic', 'plasma');
    expect(elementMultiplier(p, d, earth)).toBeGreaterThanOrEqual(1.5);
  });

  it('element multiplier: resistance gives 0.45x', () => {
    const earth = createEarthState();
    const p = makeProjectile('plasma');
    const d = makeDefense('plasma', 'kinetic');
    expect(elementMultiplier(p, d, earth)).toBeLessThan(0.6);
  });

  it('element multiplier: neutral gives 1.0x', () => {
    const earth = createEarthState();
    const p = makeProjectile('plasma');
    const d = makeDefense('kinetic', 'electric');
    expect(elementMultiplier(p, d, earth)).toBeCloseTo(1.0);
  });

  it('counter multiplier halves damage for countered elements', () => {
    const earth = createEarthState();
    earth.activeCounter.value = {
      id: 'kinetic-counter',
      name: 'Reactive Armor',
      description: '',
      triggerCondition: () => 1,
      effect: 'global:kinetic-resist',
      telegraphTicks: 180,
    };
    expect(counterMultiplier(asElementId('kinetic'), earth)).toBe(0.5);
    expect(counterMultiplier(asElementId('plasma'), earth)).toBe(1.0);
  });

  it('instability penalty scales down damage at high tiers', () => {
    const ship = createShipState();
    ship.instability.value = 0;
    const stable = instabilityPenalty(ship);
    ship.instability.value = 100;
    const collapsed = instabilityPenalty(ship);
    expect(stable).toBeGreaterThan(collapsed);
  });

  it('computeDamage returns expected fields', () => {
    const earth = createEarthState();
    const ship = createShipState();
    const p = makeProjectile('plasma');
    const d = makeDefense('kinetic', 'plasma');
    const r = computeDamage({ projectile: p, target: d, earth, ship });
    expect(r.final).toBeGreaterThan(0);
    expect(r.breakdown.elementMul).toBeGreaterThan(1.5);
  });
});