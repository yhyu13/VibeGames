// engine/CameraRig.ts — orbitable look-at follow camera (tower diorama view).
// The camera orbits the player around Y (yaw) while keeping lookAt on them, so puzzles can be viewed
// from any angle. yaw=0 is the canonical 3/4 cutaway (offset +x,+y,+z) — rotate() spins it in place.
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(7, 5.5, 8)
const DAMP = 8

export class CameraRig {
  cam: THREE.PerspectiveCamera
  private target = new THREE.Vector3()
  private desired = new THREE.Vector3()
  private yaw = 0

  constructor(aspect: number) {
    this.cam = new THREE.PerspectiveCamera(55, aspect, 0.1, 200)
  }

  // deltaYaw in radians — positive spins counter-clockwise (viewing from above). Called each frame
  // from Q/E keys and mouse-drag so the offset orbits smoothly around the player.
  rotate(deltaYaw: number): void {
    this.yaw += deltaYaw
  }

  update(playerPos: { x: number; y: number; z: number }, dt: number): void {
    this.target.set(playerPos.x, playerPos.y, playerPos.z)
    // orbit OFFSET around Y by yaw: ox = x·cos + z·sin, oz = -x·sin + z·cos
    const cos = Math.cos(this.yaw)
    const sin = Math.sin(this.yaw)
    const ox = OFFSET.x * cos + OFFSET.z * sin
    const oz = -OFFSET.x * sin + OFFSET.z * cos
    this.desired.set(playerPos.x + ox, playerPos.y + OFFSET.y, playerPos.z + oz)
    const k = 1 - Math.exp(-DAMP * dt)
    this.cam.position.lerp(this.desired, k)
    // Look ABOVE the player, not at their feet: at F1 spawn a look-target of +0.8 pitched the camera
    // down ~24°, clipping the golden gate (y≈8.6) above the frustum — the climb goal was invisible from
    // the start. +2.4 flattens the pitch to ~16° so both the player and the goal stay in frame (the
    // "tower diorama / cutaway" intent in the header).
    this.cam.lookAt(this.target.x, this.target.y + 2.4, this.target.z)
  }

  resize(aspect: number): void {
    this.cam.aspect = aspect
    this.cam.updateProjectionMatrix()
  }
}
