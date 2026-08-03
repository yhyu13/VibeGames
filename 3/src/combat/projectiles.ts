import * as THREE from 'three';
import type { WeaponStats } from '../core/types';

export interface Projectile {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  radius: number;
  damage: number;
  friendly: boolean;
  life: number;
  alive: boolean;
  pierce: boolean;
  hitIds: Set<string>;
  weapon: WeaponStats | null;
}

const MAX = 256;

export class ProjectilePool {
  private pool: Projectile[] = [];
  private cursor = 0;

  constructor() {
    for (let i = 0; i < MAX; i++) {
      this.pool.push({
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        radius: 0.8,
        damage: 0,
        friendly: true,
        life: 0,
        alive: false,
        pierce: false,
        hitIds: new Set(),
        weapon: null,
      });
    }
  }

  spawn(
    pos: THREE.Vector3,
    vel: THREE.Vector3,
    radius: number,
    damage: number,
    friendly: boolean,
    weapon: WeaponStats | null,
    life = 6,
  ): Projectile {
    const p = this.pool[this.cursor];
    this.cursor = (this.cursor + 1) % MAX;
    p.pos.copy(pos);
    p.vel.copy(vel);
    p.radius = radius;
    p.damage = damage;
    p.friendly = friendly;
    p.life = life;
    p.alive = true;
    p.pierce = weapon?.pierce ?? false;
    p.hitIds.clear();
    p.weapon = weapon;
    return p;
  }

  update(dt: number): void {
    for (const p of this.pool) {
      if (!p.alive) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.alive = false;
        continue;
      }
      p.pos.addScaledVector(p.vel, dt);
    }
  }

  forEach(fn: (p: Projectile) => void): void {
    for (const p of this.pool) if (p.alive) fn(p);
  }
}
