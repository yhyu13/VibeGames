import * as THREE from 'three';

export class ChaseCam {
  private target = new THREE.Vector3();
  private pos = new THREE.Vector3();
  shake = 0;

  constructor(private camera: THREE.PerspectiveCamera) {}

  update(dt: number, shipPos: THREE.Vector3, forward: THREE.Vector3): void {
    const desired = shipPos.clone().addScaledVector(forward, -13).add(new THREE.Vector3(0, 4.5, 0));
    this.pos.lerp(desired, 1 - Math.pow(0.001, dt));
    this.target.lerp(shipPos.clone().addScaledVector(forward, 10), 1 - Math.pow(0.001, dt));
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 3);
      const s = this.shake;
      this.pos.x += (Math.random() - 0.5) * s;
      this.pos.y += (Math.random() - 0.5) * s;
      this.pos.z += (Math.random() - 0.5) * s;
    }
    this.camera.position.copy(this.pos);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.target);
  }
}
