// engine/SceneManager.ts — builds the 4-layer toon scene from LayerData; phase swap = material swap.
import * as THREE from 'three'
import type { GameState, LayerData, PhaseId } from '../core/types'
import { addOutline, makePhaseMaterials, PHASE_PALETTE, PhaseMaterials } from './ToonRenderer'

const GHOST_PARALLAX = 0.15   // per-layer paper thickness offset (art-direction §3.4)
const PHASES: PhaseId[] = ['solid', 'liquid', 'gas', 'plasma']

interface Traversable {
  userData: { [k: string]: unknown }
  material?: THREE.Material | THREE.Material[]
  parent: THREE.Object3D | null
}

export class SceneManager {
  scene = new THREE.Scene()
  readonly groups: Record<PhaseId, THREE.Group>
  readonly mats: Record<PhaseId, PhaseMaterials>
  private shardMeshes = new Map<string, THREE.Mesh>()
  private flowDots: Array<{ points: THREE.Points; curve: THREE.CatmullRomCurve3; speed: number; len: number; n: number }> = []
  private gateRing!: THREE.Mesh
  private gateDisc!: THREE.Mesh
  private playerGroup = new THREE.Group()
  private playerBody!: THREE.Mesh
  private playerHead!: THREE.Mesh
  private playerShell!: THREE.Mesh
  private current: PhaseId = 'solid'
  private layer: LayerData

  constructor(layer: LayerData) {
    this.layer = layer
    this.mats = {
      solid: makePhaseMaterials('solid'),
      liquid: makePhaseMaterials('liquid'),
      gas: makePhaseMaterials('gas'),
      plasma: makePhaseMaterials('plasma'),
    }
    this.groups = { solid: new THREE.Group(), liquid: new THREE.Group(), gas: new THREE.Group(), plasma: new THREE.Group() }
    for (const p of PHASES) this.scene.add(this.groups[p])

    this.buildBackdrop()
    this.buildPlatforms()
    this.buildPipes()
    this.buildVents()
    this.buildWires()
    this.buildShards()
    this.buildGate()
    this.buildSpawnPatch()
    this.buildPlayer()
    this.setPhase('solid')
  }

  private buildBackdrop(): void {
    this.scene.background = new THREE.Color('#1a1b2e')
    this.scene.fog = new THREE.Fog(0x1a1b2e, 24, 48)
    const [hx, , hz] = this.layer.hallHalf
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(hx * 2 + 6, hz * 2 + 6),
      new THREE.MeshBasicMaterial({ color: '#14162a' }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.02
    ground.receiveShadow = true
    this.scene.add(ground)
    const wallMat = new THREE.MeshBasicMaterial({ color: '#22243c' })
    const mkWall = (w: number, h: number, x: number, z: number, ry: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat)
      m.position.set(x, h / 2 - 0.02, z)
      m.rotation.y = ry
      this.scene.add(m)
    }
    mkWall(hz * 2 + 6, 18, -hx - 3, 0, Math.PI / 2)
    mkWall(hz * 2 + 6, 18, hx + 3, 0, -Math.PI / 2)
    mkWall(hx * 2 + 6, 18, 0, -hz - 3, 0)
    const sun = new THREE.DirectionalLight(0xfff2dd, 2.4)
    sun.position.set(12, 16, 9)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.camera.left = -20
    sun.shadow.camera.right = 20
    sun.shadow.camera.top = 20
    sun.shadow.camera.bottom = -20
    sun.shadow.camera.far = 60
    this.scene.add(sun)
    this.scene.add(new THREE.HemisphereLight(0x8a86b8, 0x14162a, 1.1))
  }

  private buildPlatforms(): void {
    for (const pl of this.layer.platforms) {
      const w = pl.max.x - pl.min.x
      const h = pl.max.y - pl.min.y
      const d = pl.max.z - pl.min.z
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.mats[pl.phase].solid)
      mesh.position.set((pl.min.x + pl.max.x) / 2, (pl.min.y + pl.max.y) / 2, (pl.min.z + pl.max.z) / 2)
      mesh.castShadow = true
      mesh.receiveShadow = true
      const shell = addOutline(mesh, this.mats[pl.phase])
      shell.userData.isShell = true
      mesh.userData.shell = shell
      mesh.userData.phaseMat = this.mats[pl.phase]
      this.groups[pl.phase].add(mesh)
    }
  }

  private buildPipes(): void {
    // Open flow trough (polish U3): rings along the curve + animated flow dots — never a solid wall.
    for (const pipe of this.layer.pipes) {
      const curve = new THREE.CatmullRomCurve3(pipe.points.map((p) => new THREE.Vector3(p.x, p.y, p.z)))
      const len = curve.getLength()
      const ringCount = Math.max(6, Math.floor(len / 0.55))
      for (let i = 0; i <= ringCount; i++) {
        const p = curve.getPointAt(i / ringCount)
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(pipe.radius, 0.05, 8, 26),
          new THREE.MeshBasicMaterial({ color: PHASE_PALETTE.liquid.ink, transparent: true, opacity: 0.8 }),
        )
        ring.position.copy(p)
        ring.userData.baseOpacity = 0.8
        this.groups.liquid.add(ring)
      }
      // flow dots
      const n = Math.floor(len / 0.9)
      const positions = new Float32Array(n * 3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const dots = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: PHASE_PALETTE.liquid.highlight, size: 0.14, transparent: true, opacity: 0.9, depthWrite: false }),
      )
      dots.frustumCulled = false
      dots.userData.baseOpacity = 0.9
      this.groups.liquid.add(dots)
      this.flowDots.push({ points: dots, curve, speed: pipe.flowSpeed, len, n })
    }
  }

  private buildVents(): void {
    for (const v of this.layer.vents) {
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(v.radius, 0.06, 8, 32),
          new THREE.MeshBasicMaterial({ color: PHASE_PALETTE.gas.lit, transparent: true, opacity: 0.5 }),
        )
        ring.position.set(v.position.x, v.position.y + i * 0.7, v.position.z)
        ring.rotation.x = Math.PI / 2
        ring.userData.baseOpacity = 0.5
        this.groups.gas.add(ring)
      }
    }
  }

  private buildWires(): void {
    for (const wire of this.layer.wires) {
      const curve = new THREE.CatmullRomCurve3(wire.points.map((p) => new THREE.Vector3(p.x, p.y, p.z)))
      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 40, 0.06, 6, false),
        new THREE.MeshBasicMaterial({ color: PHASE_PALETTE.plasma.highlight }),
      )
      this.groups.plasma.add(mesh)
    }
  }

  private buildShards(): void {
    for (const sh of this.layer.shards) {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.28),
        new THREE.MeshToonMaterial({
          color: PHASE_PALETTE[sh.phase].paper,
          emissive: PHASE_PALETTE[sh.phase].highlight,
          emissiveIntensity: 1.2,
        }),
      )
      mesh.position.set(sh.position.x, sh.position.y, sh.position.z)
      const shell = addOutline(mesh, this.mats[sh.phase], 1.15)
      shell.userData.isShell = true
      mesh.userData.shell = shell
      mesh.userData.phaseMat = this.mats[sh.phase]
      this.groups[sh.phase].add(mesh)
      this.shardMeshes.set(sh.id, mesh)
    }
  }

  private buildGate(): void {
    const e = this.layer.exit
    this.gateRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.09, 10, 40),
      new THREE.MeshBasicMaterial({ color: '#8a6d2a' }),
    )
    this.gateRing.position.set(e.x, e.y, e.z)
    this.gateRing.rotation.x = Math.PI / 2
    this.scene.add(this.gateRing)
    this.gateDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1.05, 40),
      new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.12 }),
    )
    this.gateDisc.position.set(e.x, e.y - 0.01, e.z)
    this.gateDisc.rotation.x = -Math.PI / 2
    this.scene.add(this.gateDisc)
  }

  private buildSpawnPatch(): void {
    const s = this.layer.spawn
    const patch = new THREE.Mesh(new THREE.CircleGeometry(1.8, 40), new THREE.MeshBasicMaterial({ color: '#cfcfd4' }))
    patch.rotation.x = -Math.PI / 2
    patch.position.set(s.x, 0.01, s.z)
    this.scene.add(patch)
  }

  private buildPlayer(): void {
    this.playerBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.5, 6, 12), this.mats.solid.solid.clone())
    this.playerBody.castShadow = true
    this.playerBody.position.y = 0.8
    this.playerHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 16),
      new THREE.MeshToonMaterial({
        color: PHASE_PALETTE.solid.paper,
        emissive: PHASE_PALETTE.solid.highlight,
        emissiveIntensity: 0.9,
      }),
    )
    this.playerHead.position.y = 1.25
    this.playerShell = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.29, 0.55, 6, 12),
      new THREE.MeshBasicMaterial({ color: PHASE_PALETTE.solid.ink, side: THREE.BackSide, transparent: true }),
    )
    this.playerShell.scale.setScalar(1.03)
    this.playerShell.position.y = 0.8
    this.playerGroup.add(this.playerBody, this.playerHead, this.playerShell)
    this.scene.add(this.playerGroup)
  }

  setPhase(phase: PhaseId): void {
    this.current = phase
    for (const p of PHASES) {
      const isCurrent = p === phase
      this.groups[p].traverse((obj) => {
        const m = obj as THREE.Mesh & Traversable
        if (!(obj instanceof THREE.Mesh)) return
        if (m.userData.isShell === true) {
          ;(m.material as THREE.MeshBasicMaterial).opacity = isCurrent ? 1 : 0.25
        } else if (m.userData.phaseMat) {
          const mats = m.userData.phaseMat as PhaseMaterials
          m.material = isCurrent ? mats.solid : mats.ghost
        } else if (m.userData.baseOpacity !== undefined) {
          ;(m.material as THREE.MeshBasicMaterial).opacity =
            (m.userData.baseOpacity as number) * (isCurrent ? 1 : 0.35)
        }
      })
      const idx = PHASES.indexOf(p)
      const curIdx = PHASES.indexOf(phase)
      this.groups[p].position.y = (idx - curIdx) * GHOST_PARALLAX
    }
    const pal = PHASE_PALETTE[phase]
    ;(this.playerBody.material as THREE.MeshToonMaterial).color.set(pal.paper)
    ;(this.playerHead.material as THREE.MeshToonMaterial).color.set(pal.paper)
    ;(this.playerHead.material as THREE.MeshToonMaterial).emissive.set(pal.highlight)
    ;(this.playerShell.material as THREE.MeshBasicMaterial).color.set(pal.ink)
  }

  sync(s: GameState, t: number): void {
    if (s.player.phase !== this.current) this.setPhase(s.player.phase)
    this.playerGroup.position.set(s.player.position.x, s.player.position.y, s.player.position.z)
    // flow dots animation
    for (const fd of this.flowDots) {
      const attr = fd.points.geometry.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < fd.n; i++) {
        const u = ((t * fd.speed) / fd.len + i / fd.n) % 1
        const p = fd.curve.getPointAt(u)
        attr.setXYZ(i, p.x, p.y, p.z)
      }
      attr.needsUpdate = true
    }
    for (const sh of s.shards) {
      const mesh = this.shardMeshes.get(sh.id)
      if (!mesh) continue
      mesh.visible = !sh.collected
      mesh.position.y = sh.position.y + Math.sin(t * 2 + sh.bobPhase) * 0.12
    }
    const open = s.shards.filter((sh) => sh.collected).length >= 3
    ;(this.gateDisc.material as THREE.MeshBasicMaterial).opacity = open ? 0.85 : 0.12
    ;(this.gateRing.material as THREE.MeshBasicMaterial).color.set(open ? '#ffd166' : '#8a6d2a')
  }
}
