// Defense view: instantiates meshes for defenses and syncs from state.

import { Mesh, Group, IcosahedronGeometry, BoxGeometry, MeshStandardMaterial } from 'three';
import type { Defense } from '../../state/types.js';
import { Env } from '../../app/Env.js';

export class DefenseView {
  readonly group: Group;
  private meshes: Map<string, Mesh> = new Map();

  constructor() {
    this.group = new Group();
    this.group.position.set(0, -Env.EARTH_RADIUS * 0.5, 0);
  }

  sync(defenses: ReadonlyArray<Defense>): void {
    const aliveIds = new Set(defenses.map((d) => d.id));
    for (const [id, mesh] of this.meshes) {
      if (!aliveIds.has(id as never)) {
        this.group.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as MeshStandardMaterial).dispose();
        this.meshes.delete(id);
      }
    }
    for (const d of defenses) {
      let mesh = this.meshes.get(d.id as never);
      if (!mesh) {
        const geo = d.type === 'nuclear' ? new BoxGeometry(0.4, 0.4, 0.4) : new IcosahedronGeometry(0.3, 0);
        const mat = new MeshStandardMaterial({
          color: d.type === 'nuclear' ? '#ff5b6c' : '#a0a8c0',
          emissive: d.type === 'nuclear' ? '#ff5b6c' : '#3a4a6a',
          emissiveIntensity: d.type === 'nuclear' ? 0.6 : 0.2,
          metalness: 0.5,
          roughness: 0.5,
        });
        mesh = new Mesh(geo, mat);
        this.group.add(mesh);
        this.meshes.set(d.id as never, mesh);
      }
      const radius = Env.EARTH_RADIUS + 0.2;
      mesh.position.set(Math.sin(d.arc) * radius, -Math.cos(d.arc) * radius + Env.EARTH_RADIUS, 0);
      const visScale = Math.max(0.1, d.hp / 100);
      mesh.scale.setScalar(0.5 + visScale * 0.5);
    }
  }

  update(_dt: number): void {
    for (const m of this.meshes.values()) m.rotation.y += 0.01;
  }
}