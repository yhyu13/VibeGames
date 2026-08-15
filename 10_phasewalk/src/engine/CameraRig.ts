// engine/CameraRig.ts — fixed 3/4 cutaway follow camera (tower diorama view).
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(7, 5.5, 8)
const DAMP = 8

export class CameraRig {
  cam: THREE.PerspectiveCamera
  private target = new THREE.Vector3()
  private desired = new THREE.Vector3()

  constructor(aspect: number) {
    this.cam = new THREE.PerspectiveCamera(55, aspect, 0.1, 200)
  }

  update(playerPos: { x: number; y: number; z: number }, dt: number): void {
    this.target.set(playerPos.x, playerPos.y, playerPos.z)
    this.desired.set(playerPos.x + OFFSET.x, playerPos.y + OFFSET.y, playerPos.z + OFFSET.z)
    const k = 1 - Math.exp(-DAMP * dt)
    this.cam.position.lerp(this.desired, k)
    this.cam.lookAt(this.target.x, this.target.y + 0.8, this.target.z)
  }

  resize(aspect: number): void {
    this.cam.aspect = aspect
    this.cam.updateProjectionMatrix()
  }
}
