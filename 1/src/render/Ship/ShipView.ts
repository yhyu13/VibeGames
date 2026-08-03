// Ship view: procedural geometry with iridescent PBR material, observes ShipState.

import {
  Mesh,
  Group,
  IcosahedronGeometry,
  TorusGeometry,
  MeshPhysicalMaterial,
  ConeGeometry,
  Vector3,
} from 'three';
import { effect } from '@preact/signals-core';
import type { ShipState } from '../../state/types.js';
import type { OrbitalLane } from '../../state/id.js';
import { Env } from '../../app/Env.js';

export class ShipView {
  readonly group: Group;
  private hull: Mesh;
  private ring: Mesh;
  private glow: Mesh;
  private readonly state: ShipState;
  private prevPos: { lane: OrbitalLane; arc: number } = { lane: 'low', arc: 0 };
  private currPos: { lane: OrbitalLane; arc: number } = { lane: 'low', arc: 0 };

  constructor(state: ShipState) {
    this.state = state;
    this.group = new Group();

    // Hull (icosahedron with subdivision)
    const hullGeo = new IcosahedronGeometry(0.6, 1);
    const hullMat = new MeshPhysicalMaterial({
      color: '#3a3a55',
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      iridescence: 0.8,
      iridescenceIOR: 1.3,
      emissive: '#9b6cff',
      emissiveIntensity: 0.2,
    });
    this.hull = new Mesh(hullGeo, hullMat);
    this.group.add(this.hull);

    // Outer ring
    const ringGeo = new TorusGeometry(0.9, 0.06, 12, 64);
    const ringMat = new MeshPhysicalMaterial({
      color: '#6cff9b',
      emissive: '#6cff9b',
      emissiveIntensity: 1.2,
      metalness: 0.5,
      roughness: 0.3,
    });
    this.ring = new Mesh(ringGeo, ringMat);
    this.ring.rotation.x = Math.PI / 2;
    this.group.add(this.ring);

    // Glow cone (forward indicator)
    const glowGeo = new ConeGeometry(0.15, 0.4, 16);
    const glowMat = new MeshPhysicalMaterial({
      color: '#ff5b6c',
      emissive: '#ff5b6c',
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    this.glow = new Mesh(glowGeo, glowMat);
    this.glow.position.set(1.0, 0, 0);
    this.glow.rotation.z = -Math.PI / 2;
    this.group.add(this.glow);

    // Position above Earth
    this.group.position.set(0, Env.EARTH_RADIUS + 2.5, 0);

    // React to state
    effect(() => {
      const inst = state.instability.value;
      const hullMat = this.hull.material as MeshPhysicalMaterial;
      hullMat.iridescence = 0.4 + (inst / 100) * 0.6;
      hullMat.emissiveIntensity = 0.2 + (inst / 100) * 0.8;
    });

    effect(() => {
      // Read .value so the effect subscribes to position changes.
      const pos = state.position.value;
      this.currPos = { lane: pos.lane, arc: pos.arc };
    });

    this.prevPos = { ...this.currPos };
  }

  /** Update prev/curr for interpolation. Call before tick. */
  beginTick(): void {
    this.prevPos = { ...this.currPos };
    this.currPos = this.state.position.peek();
  }

  update(_dt: number, alpha: number): void {
    // Interpolated position along arc
    const arc = this.prevPos.arc + (this.currPos.arc - this.prevPos.arc) * alpha;
    const radius = Env.EARTH_RADIUS + 2.5;
    const x = Math.sin(arc) * radius;
    const y = -Math.cos(arc) * radius + Env.EARTH_RADIUS;
    this.group.position.set(x, y, 0);
    this.group.lookAt(new Vector3(0, -Env.EARTH_RADIUS * 0.5, 0));
    this.ring.rotation.z += 0.05;
  }
}