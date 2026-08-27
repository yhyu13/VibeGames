// engine/CourtyardTile.ts — 20×20 m meshes + SAR swap + raycast ids.
import * as THREE from 'three'
import { WEST_WING, EAST_WING, CANOPY_BOX } from '../core/data/courtyard'
import type { EntityId, GameState } from '../core/types'

const HEAT: Record<EntityId, number> = {
  vip: 0x7cffd4,
  guard_w1: 0x3dff9a,
  guard_w2: 0x3dff9a,
  van: 0xffaa44,
  kt: 0xff5533,
  canopy: 0x3a5a40,
  east_alley: 0x1e3d36,
  west_alley: 0x1e3d36,
}

const OPTICAL = 0x0a1210

export class CourtyardTile {
  group = new THREE.Group()
  private pickables: THREE.Object3D[] = []
  private blobs = new Map<EntityId, THREE.Mesh>()
  private raycaster = new THREE.Raycaster()
  private ndc = new THREE.Vector2()
  private sarOn = false
  private scan: THREE.Mesh
  private scanMat: THREE.MeshBasicMaterial

  constructor() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({ color: 0x080c10 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    this.group.add(floor)

    const grid = new THREE.GridHelper(20, 20, 0x123028, 0x0c1814)
    grid.position.y = 0.01
    this.group.add(grid)

    this.addBuilding(WEST_WING, 'WEST')
    this.addBuilding(EAST_WING, 'EAST')
    this.addCanopy()
    this.addBlob('vip', 0.95, 1.7)
    this.addBlob('guard_w1', 0.72, 1.4)
    this.addBlob('guard_w2', 0.72, 1.4)
    this.addBlob('van', 1.7, 1.0)
    this.addBlob('kt', 0.7, 1.3)
    this.addMarker('east_alley', 3.6, 2.8)
    this.addMarker('west_alley', 3.0, 3.0)

    this.scanMat = new THREE.MeshBasicMaterial({
      color: 0x0a2018,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    })
    this.scan = new THREE.Mesh(new THREE.PlaneGeometry(20, 0.12), this.scanMat)
    this.scan.rotation.x = -Math.PI / 2
    this.scan.position.y = 0.04
    this.scan.raycast = () => {}
    this.group.add(this.scan)
  }

  private addBuilding(box: { min: { x: number; z: number }; max: { x: number; z: number }; h: number }, _label: string): void {
    const w = box.max.x - box.min.x
    const d = box.max.z - box.min.z
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, box.h, d),
      new THREE.MeshBasicMaterial({ color: 0x0c1418 }),
    )
    mesh.position.set((box.min.x + box.max.x) / 2, box.h / 2, (box.min.z + box.max.z) / 2)
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0x1e3d36 }),
    )
    mesh.add(edge)
    mesh.raycast = () => {}
    this.group.add(mesh)
  }

  private addCanopy(): void {
    const box = CANOPY_BOX
    const w = box.max.x - box.min.x
    const d = box.max.z - box.min.z
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.18, d),
      new THREE.MeshBasicMaterial({ color: 0x152018, transparent: true, opacity: 0.82 }),
    )
    mesh.position.set((box.min.x + box.max.x) / 2, 2.7, (box.min.z + box.max.z) / 2)
    mesh.userData.entityId = 'canopy'
    this.pickables.push(mesh)
    this.blobs.set('canopy', mesh)
    this.group.add(mesh)
  }

  private addBlob(id: EntityId, radius: number, height: number): void {
    const geo = id === 'van'
      ? new THREE.BoxGeometry(radius * 1.8, height, radius * 1.1)
      : new THREE.SphereGeometry(radius, 12, 10)
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: OPTICAL,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    }))
    if (id !== 'van') mesh.scale.y = height / radius
    mesh.userData.entityId = id
    this.pickables.push(mesh)
    this.blobs.set(id, mesh)
    this.group.add(mesh)
  }

  private addMarker(id: EntityId, w: number, d: number): void {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, d),
      new THREE.MeshBasicMaterial({ color: 0x102018, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = 0.03
    mesh.userData.entityId = id
    this.pickables.push(mesh)
    this.blobs.set(id, mesh)
    this.group.add(mesh)
  }

  update(s: GameState, t: number): void {
    this.sarOn = s.sensor.sarOn
    this.group.visible = s.zoom01 >= 0.28
    this.scan.visible = this.sarOn && this.group.visible
    this.scan.position.z = ((t * 3.2) % 20) - 10

    for (const [id, mesh] of this.blobs) {
      const e = s.entities[id]
      const mat = mesh.material as THREE.MeshBasicMaterial
      if (id === 'canopy') {
        mat.color.setHex(this.sarOn ? 0x3a5a40 : 0x152018)
        mat.opacity = this.sarOn ? 0.55 : 0.78
        continue
      }
      if (id === 'east_alley' || id === 'west_alley') {
        mesh.position.set(e.pos.x, 0.03, e.pos.z)
        mat.color.setHex(this.sarOn ? HEAT[id] : 0x0c1412)
        mat.opacity = this.sarOn ? 0.45 : 0.12
        continue
      }
      const y = id === 'van' ? 0.45 : 0.55
      mesh.position.set(e.pos.x, y, e.pos.z)
      mesh.visible = !e.down
      if (this.sarOn) {
        mat.color.setHex(HEAT[id])
        mat.opacity = id === 'vip' ? 1 : 0.88
        mat.blending = THREE.AdditiveBlending
      } else {
        mat.color.setHex(OPTICAL)
        mat.opacity = 0.55
        mat.blending = THREE.NormalBlending
      }
    }
  }

  pick(camera: THREE.Camera, clientX: number, clientY: number, canvas: HTMLCanvasElement): EntityId | null {
    if (!this.sarOn) return null
    const rect = canvas.getBoundingClientRect()
    this.ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1
    this.ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.ndc, camera)
    const hits = this.raycaster.intersectObjects(this.pickables, false)
    const id = hits[0]?.object.userData.entityId
    return typeof id === 'string' ? (id as EntityId) : null
  }
}
