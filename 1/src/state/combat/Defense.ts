// Defense factory and helpers.

import type { Defense, DefenseSpec } from '../types.js';
import { asDefenseId, type RegionId } from '../id.js';

let counter = 0;
function nextId() { counter++; return asDefenseId(`d-${counter}`); }

export function spawnDefenseFromSpec(
  regionId: RegionId,
  lane: Defense['lane'],
  arc: number,
  spec: DefenseSpec
): Defense {
  const d: Defense = {
    id: nextId(),
    type: spec.behavior,
    regionId,
    lane,
    arc,
    hp: spec.hp,
    shield: spec.shield,
    resistance: spec.resistance,
    weakness: spec.weakness,
    cooldown: 0,
  };
  if (spec.behavior === 'nuclear') {
    d.flags = { nuclear: true };
  }
  return d;
}

export function tickDefense(d: Defense, dt: number, onFire: (proj: Defense) => void): void {
  if (d.cooldown > 0) d.cooldown -= dt;
  if (d.cooldown <= 0 && d.hp > 0) {
    if (d.type === 'turret' || d.type === 'battery') {
      d.cooldown = 1.5;
      onFire(d);
    } else if (d.type === 'jammer') {
      d.cooldown = 2.0;
    }
  }
}