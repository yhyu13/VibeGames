// Projectile pool: reusable meshes for player and Earth projectiles.

import {
  Mesh,
  Group,
  PlaneGeometry,
  MeshBasicMaterial,
  AdditiveBlending,
  Vector3,
} from 'three';
import type { Projectile } from '../../state/types.js';
import { WEAPON_DEFS_BY_ID } from '../../state/ship/weapons.js';
import { Env } from '../../app/Env.js';

export class ProjectilePool {
  readonly group: Group;
  private pool: Mesh[] = [];
  private active: Map<string, Mesh> = new Map();
  private readonly capacity: number;

  constructor(capacity: number = Env.MAX_PROJECTILES) {
    this.capacity = capacity;
    this.group = new Group();
    this.group.position.set(0, -Env.EARTH_RADIUS * 0.5, 0);
    for (let i = 0; i < capacity; i++) {
      const geo = new PlaneGeometry(0.6, 0.18);
      const mat = new MeshBasicMaterial({
        color: '#9b6cff',
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      const mesh = new Mesh(geo, mat);
      mesh.visible = false;
      this.pool.push(mesh);
      this.group.add(mesh);
    }
  }

  spawn(p: Projectile): void {
    if (this.active.size >= this.capacity) return;
    const mesh = this.pool.find((m) => !m.visible);
    if (!mesh) return;
    const def = WEAPON_DEFS_BY_ID[p.archetype];
    const mat = mesh.material as MeshBasicMaterial;
    const colorMap: Record<string, string> = {
      plasma: '#ff5b6c',
      kinetic: '#e8e8f0',
      electric: '#6cffff',
      corrosive: '#aaff6c',
      gravity: '#9b6cff',
      signal: '#ffb86c',
    };
    mat.color.set(colorMap[p.element] ?? '#9b6cff');
    mesh.userData['id'] = p.id;
    mesh.visible = true;
    this.active.set(p.id, mesh);
  }

  release(id: string): void {
    const mesh = this.active.get(id);
    if (mesh) {
      mesh.visible = false;
      this.active.delete(id);
    }
  }

  sync(projectiles: ReadonlyArray<Projectile>): void {
    const aliveIds = new Set(projectiles.map((p) => p.id));
    // Release dead
    for (const id of [...this.active.keys()]) {
      if (!aliveIds.has(id as never)) this.release(id);
    }
    // Spawn new
    for (const p of projectiles) {
      if (!this.active.has(p.id as never)) this.spawn(p);
    }
    // Sync transforms (Earth-centric to match group's origin)
    const radius = Env.EARTH_RADIUS + 2.5;
    for (const p of projectiles) {
      const mesh = this.active.get(p.id as never);
      if (!mesh) continue;
      const x = Math.sin(p.arc) * radius;
      const y = -Math.cos(p.arc) * radius + Env.EARTH_RADIUS;
      mesh.position.set(x, y, 0);
      mesh.lookAt(new Vector3(0, -Env.EARTH_RADIUS * 0.5, 0));
      mesh.rotateZ(Math.PI / 2);
    }
  }

  update(_dt: number): void {
    // No per-mesh animation for MVP
  }
}