// engine/CameraRig.ts — zoom 0..1 lerp orbit ↔ courtyard tile. Camera-only; no picking.
import * as THREE from 'three'

const ORBIT = new THREE.Vector3(0, 72, 410)
const TILE = new THREE.Vector3(0, 22, 0.4)
const LOOK_ORBIT = new THREE.Vector3(0, -40, 40)
const LOOK_TILE = new THREE.Vector3(0, 0, 0)

export class CameraRig {
  cam: THREE.PerspectiveCamera
  zoom01 = 0
  private desired = 0
  private look = new THREE.Vector3()
  private pos = new THREE.Vector3()

  constructor(aspect: number) {
    this.cam = new THREE.PerspectiveCamera(42, aspect, 0.1, 2500)
    this.cam.position.copy(ORBIT)
    this.cam.lookAt(LOOK_ORBIT)
  }

  setZoomDelta(delta: number): void {
    this.desired = Math.min(1, Math.max(0, this.desired + delta))
  }

  setZoom01(v: number): void {
    this.desired = Math.min(1, Math.max(0, v))
  }

  followVip(pos: { x: number; z: number }, locked: boolean): void {
    if (locked && this.zoom01 >= 0.72) {
      LOOK_TILE.set(pos.x * 0.35, 0, pos.z * 0.35)
    } else {
      LOOK_TILE.set(0, 0, 0)
    }
  }

  update(dt: number): void {
    const k = 1 - Math.exp(-4.2 * dt)
    this.zoom01 += (this.desired - this.zoom01) * k
    this.pos.lerpVectors(ORBIT, TILE, this.zoom01)
    this.look.lerpVectors(LOOK_ORBIT, LOOK_TILE, this.zoom01)
    this.cam.position.copy(this.pos)
    this.cam.fov = 38 - this.zoom01 * 2
    this.cam.updateProjectionMatrix()
    this.cam.lookAt(this.look)
  }

  resize(aspect: number): void {
    this.cam.aspect = aspect
    this.cam.updateProjectionMatrix()
  }
}
