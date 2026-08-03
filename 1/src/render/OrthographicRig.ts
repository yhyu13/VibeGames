// Orthographic camera rig with viewport-aware scaling.

import { OrthographicCamera, Vector2 } from 'three';
import { Env } from '../app/Env.js';

export class OrthographicRig {
  readonly camera: OrthographicCamera;
  private viewport = new Vector2(1, 1);
  private baseFrustum = Env.WORLD_UNITS_ACROSS;

  constructor() {
    this.camera = new OrthographicCamera(0, 0, 0, 0, 0.1, 200);
    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(0, 0, 0);
    this.updateFrustum();
  }

  setViewport(width: number, height: number): void {
    this.viewport.set(width, height);
    this.updateFrustum();
  }

  private updateFrustum(): void {
    const aspect = this.viewport.x / this.viewport.y;
    const halfH = this.baseFrustum / 2;
    const halfW = halfH * aspect;
    this.camera.left = -halfW;
    this.camera.right = halfW;
    this.camera.top = halfH;
    this.camera.bottom = -halfH;
    this.camera.updateProjectionMatrix();
  }

  worldUnitsAcross(): number {
    return this.baseFrustum;
  }
}