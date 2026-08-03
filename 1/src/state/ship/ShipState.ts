// Ship state factory.

import { signal } from '../signals.js';
import type { ShipState, WeaponSlot, ShipModule } from '../types.js';
import { Env } from '../../app/Env.js';

export function createShipState(): ShipState {
  return {
    hull: signal(Env.STARTING_HULL),
    hullMax: signal(Env.STARTING_HULL),
    shield: signal(Env.STARTING_SHIELD),
    shieldMax: signal(Env.STARTING_SHIELD),
    energy: signal(Env.STARTING_ENERGY),
    energyMax: signal(Env.STARTING_ENERGY),
    heat: signal(0),
    signal: signal(Env.STARTING_SIGNAL),
    instability: signal(Env.STARTING_INSTABILITY),
    position: signal({ lane: 'low' as const, arc: 0 }),
    weapons: signal<WeaponSlot[]>([
      { id: 'slot-a', archetype: 'plasma' as never, branch: null, cooldown: 0, ammo: -1 },
      { id: 'slot-b', archetype: 'kinetic' as never, branch: null, cooldown: 0, ammo: -1 },
      { id: 'slot-c', archetype: 'electric' as never, branch: null, cooldown: 0, ammo: -1 },
    ]),
    modules: signal<ShipModule[]>([
      { id: 'm-shield', kind: 'shield', level: 1 },
      { id: 'm-engine', kind: 'engine', level: 1 },
    ]),
    adaptations: signal([]),
    activeBurdens: signal([]),
  };
}

export function damageShip(ship: ShipState, dmg: number): void {
  let remaining = dmg;
  const shield = ship.shield.peek();
  if (shield > 0) {
    const absorbed = Math.min(shield, remaining);
    ship.shield.value = shield - absorbed;
    remaining -= absorbed;
  }
  if (remaining > 0) {
    ship.hull.value = Math.max(0, ship.hull.peek() - remaining);
  }
}

export function regenShield(ship: ShipState, amount: number): void {
  ship.shield.value = Math.min(ship.shieldMax.peek(), ship.shield.peek() + amount);
}

export function consumeEnergy(ship: ShipState, amount: number): boolean {
  if (ship.energy.peek() < amount) return false;
  ship.energy.value = ship.energy.peek() - amount;
  return true;
}

export function addHeat(ship: ShipState, amount: number): void {
  ship.heat.value = Math.min(100, ship.heat.peek() + amount);
}

export function coolShip(ship: ShipState, amount: number): void {
  ship.heat.value = Math.max(0, ship.heat.peek() - amount);
}