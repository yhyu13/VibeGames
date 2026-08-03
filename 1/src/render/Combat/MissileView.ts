// Missile view: tracks incoming nuclear missiles.

import { Mesh, Group, SphereGeometry, MeshBasicMaterial } from 'three';
import type { Missile } from '../../state/types.js';
import { Env } from '../../app/Env.js';

export class MissileView {
  readonly group: Group;
  private meshes: Map<string, Mesh> = new Map();

  constructor() {
    this.group = new Group();
  }

  sync(missiles: ReadonlyArray<Missile>): void {
    const aliveIds = new Set(missiles.filter((m) => !m.intercepted).map((m) => m.id));
    for (const [id, mesh] of this.meshes) {
      if (!aliveIds.has(id as never)) {
        this.group.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as MeshBasicMaterial).dispose();
        this.meshes.delete(id);
      }
    }
    for (const m of missiles) {
      if (m.intercepted) continue;
      let mesh = this.meshes.get(m.id as never);
      if (!mesh) {
        const geo = new SphereGeometry(0.25, 16, 16);
        const mat = new MeshBasicMaterial({
          color: m.warheadType === 'nuclear' ? '#ff5b6c' : '#6cffff',
        });
        mesh = new Mesh(geo, mat);
        this.group.add(mesh);
        this.meshes.set(m.id as never, mesh);
      }
      // Animate from edge of orbit toward ship
      const t = 1 - m.eta / 6.0;
      const arc = -Math.PI * 0.4 + t * Math.PI * 0.8;
      const radius = Env.EARTH_RADIUS + 5 - t * 3;
      mesh.position.set(Math.sin(arc) * radius, -Math.cos(arc) * radius + Env.EARTH_RADIUS, 0);
    }
  }

  update(_dt: number): void {}
}