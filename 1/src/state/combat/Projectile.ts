// Projectile helpers.

import { signal } from '../signals.js';
import type { Projectile } from '../types.js';
import { asProjectileId } from '../id.js';
import { Env } from '../../app/Env.js';
import { WEAPON_DEFS_BY_ID } from '../ship/weapons.js';

let counter = 0;
function nextId() { counter++; return asProjectileId(`p-${counter}`); }

export function spawnProjectile(
  lane: Projectile['lane'],
  arc: number,
  archetype: Projectile['archetype'],
  owner: 'player' | 'earth' = 'player'
): Projectile {
  const def = WEAPON_DEFS_BY_ID[archetype];
  return {
    id: nextId(),
    archetype,
    lane,
    arc,
    vArc: def ? def.projectileSpeed / 6 : 2.0,
    element: def?.element ?? ('plasma' as never),
    baseDamage: def?.baseDamage ?? 10,
    ttl: def?.range ?? Env.PROJECTILE_TTL_SEC,
    owner,
    flags: {},
  };
}

export function tickProjectile(p: Projectile, dt: number): boolean {
  p.arc += p.vArc * dt;
  p.ttl -= dt;
  return p.ttl > 0;
}