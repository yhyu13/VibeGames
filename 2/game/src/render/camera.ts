import * as THREE from "three";
import { ORBIT_RADIUS, PLAYABLE_PITCH } from "../core/types";
import type { ShipState } from "../core/types";

export class FollowCamera {
  readonly camera: THREE.PerspectiveCamera;
  private readonly target: THREE.Object3D;
  private pos = new THREE.Vector3();
  private lookAt = new THREE.Vector3();

  constructor(camera: THREE.PerspectiveCamera, target: THREE.Object3D) {
    this.camera = camera;
    this.target = target;
  }

  update(dt: number): void {
    const desired = this.desiredPosition();
    this.pos.lerp(desired, Math.min(1, dt * 6));
    this.lookAt.lerp(this.target.position, Math.min(1, dt * 8));
    this.camera.position.copy(this.pos);
    this.camera.lookAt(this.lookAt);
  }

  snap(): void {
    this.pos.copy(this.desiredPosition());
    this.lookAt.copy(this.target.position);
    this.camera.position.copy(this.pos);
    this.camera.lookAt(this.lookAt);
  }

  private desiredPosition(): THREE.Vector3 {
    const shipPos = this.target.position.clone();
    const up = shipPos.clone().normalize();
    const forward = this.target.getWorldDirection(new THREE.Vector3()).clone();
    forward.y = 0;
    forward.normalize();
    if (forward.lengthSq() < 0.001) forward.set(0, 0, 1);
    const offset = forward.clone().multiplyScalar(9).add(up.clone().multiplyScalar(4));
    return shipPos.clone().add(offset);
  }
}

export function cameraTargetFromShip(ship: ShipState): THREE.Object3D {
  const obj = new THREE.Object3D();
  updateShipObject(obj, ship);
  return obj;
}

export function updateShipObject(obj: THREE.Object3D, ship: ShipState): void {
  const cosP = Math.cos(ship.pitch);
  obj.position.set(
    ORBIT_RADIUS * cosP * Math.cos(ship.yaw),
    ORBIT_RADIUS * Math.sin(ship.pitch),
    -ORBIT_RADIUS * cosP * Math.sin(ship.yaw)
  );
  obj.up.set(Math.cos(ship.pitch) * Math.cos(ship.yaw), Math.sin(ship.pitch), -Math.cos(ship.pitch) * Math.sin(ship.yaw)).normalize();
  const forward = new THREE.Vector3(
    cosP * Math.cos(ship.yaw + Math.PI / 2),
    0,
    -cosP * Math.sin(ship.yaw + Math.PI / 2)
  ).normalize();
  obj.lookAt(obj.position.clone().add(forward));
}

export function clampPlayablePitch(pitch: number): number {
  return Math.max(-PLAYABLE_PITCH, Math.min(PLAYABLE_PITCH, pitch));
}
