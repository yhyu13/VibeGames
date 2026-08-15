// engine/SceneManager.ts — builds the 4-layer toon scene from LayerData; phase swap = material swap.
// v4: renders 相液池 (phase-fluid pools) + 相灵眼 (emitters) + 相灵弹 (bullets) instead of pipes/wires/vents.
import * as THREE from 'three'
import type { GameState, LayerData, PhaseId } from '../core/types'
import { addOutline, makePhaseMaterials, PHASE_PALETTE, PhaseMaterials } from './ToonRenderer'
import { makeBackdropTexture, makePaperGrainTexture } from './PaperFX'

const GHOST_PARALLAX = 0.15   // per-layer paper thickness offset (art-direction §3.4)
const GHOST_RENDER_RADIUS = 8  // m — ghost layers beyond this from the player are culled (TDD §4 / review D2)
const REVEAL_DURATION = 0.3    // s — 四相同现 ghost fade-in (worldview-first §4 ⭐①)
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
  private poolMeshes = new Map<string, { mesh: THREE.Mesh; shell: THREE.Mesh; liquidMat: THREE.MeshBasicMaterial; frozenMat: THREE.MeshBasicMaterial }>()
  private emitterMeshes = new Map<string, { group: THREE.Group; ring: THREE.Mesh }>()
  private bulletMeshes = new Map<string, THREE.Mesh>()
  private bulletGeo = new THREE.SphereGeometry(0.26, 14, 10)
  private bulletMatNeutral = new THREE.MeshBasicMaterial({ color: '#f2f4ff' })
  private bulletMatReflect = new THREE.MeshBasicMaterial({ color: '#f2e4ff' })
  private hazardMeshes: Array<{ mesh: THREE.Mesh; kind: string; baseY: number }> = []
  private gateRing!: THREE.Mesh
  private gateDisc!: THREE.Mesh
  private playerGroup = new THREE.Group()
  private playerBody!: THREE.Mesh
  private playerHead!: THREE.Mesh
  private playerShell!: THREE.Mesh
  private current: PhaseId = 'solid'
  private layer: LayerData
  private revealAlpha = 0            // 0..1 — ghost layer opacity ramp (four-phase reveal, worldview-first §4 ⭐①)
  private revealed = false
  private groupCenters: Record<PhaseId, THREE.Vector3>
  private groupRadii: Record<PhaseId, number>

  constructor(layer: LayerData) {
    this.layer = layer
    const grain = makePaperGrainTexture()
    this.mats = {
      solid: makePhaseMaterials('solid', grain),
      liquid: makePhaseMaterials('liquid', grain),
      gas: makePhaseMaterials('gas', grain),
      plasma: makePhaseMaterials('plasma', grain),
    }
    this.groups = { solid: new THREE.Group(), liquid: new THREE.Group(), gas: new THREE.Group(), plasma: new THREE.Group() }
    for (const p of PHASES) this.scene.add(this.groups[p])

    this.buildBackdrop()
    this.buildPlatforms()
    this.buildPhaseFluids()
    this.buildEmitters()
    this.buildShards()
    this.buildHazards()
    this.buildGate()
    this.buildSpawnPatch()
    this.buildPlayer()

    // per-phase bounding sphere for ghost render-radius culling (TDD §4 / review D2)
    this.groupCenters = { solid: new THREE.Vector3(), liquid: new THREE.Vector3(), gas: new THREE.Vector3(), plasma: new THREE.Vector3() }
    this.groupRadii = { solid: 0, liquid: 0, gas: 0, plasma: 0 }
    for (const p of PHASES) {
      const box = new THREE.Box3().setFromObject(this.groups[p])
      if (!box.isEmpty()) {
        box.getCenter(this.groupCenters[p])
        this.groupRadii[p] = box.getSize(new THREE.Vector3()).length() / 2
      }
    }

    this.setPhase('solid')
  }

  private buildBackdrop(): void {
    // paper curtain: 幕布色 #1a1b2e + baked paper grain (art-direction §3.4; TDD §5.5 backdrop)
    this.scene.background = makeBackdropTexture()
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
    // central tower column (scenery — the four routes climb it)
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.4, 8.4, 20),
      new THREE.MeshBasicMaterial({ color: '#22243c' }),
    )
    tower.position.set(0, 4.2, 0)
    this.scene.add(tower)
    const towerRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.25, 0.06, 8, 32),
      new THREE.MeshBasicMaterial({ color: '#ffd166' }),
    )
    towerRim.rotation.x = Math.PI / 2
    towerRim.position.set(0, 8.4, 0)
    this.scene.add(towerRim)
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
      if (pl.gold) {
        // route platforms get the 锁链金 outline (art-direction §3.1 rule 3 — routes are the
        // cross-phase cue), a clone so the shared phase ink material stays untouched
        shell.material = new THREE.MeshBasicMaterial({ color: '#ffd166', side: THREE.BackSide, transparent: true })
      }
      shell.userData.isShell = true
      mesh.userData.shell = shell
      mesh.userData.phaseMat = this.mats[pl.phase]
      this.groups[pl.phase].add(mesh)
    }
  }

  private buildPhaseFluids(): void {
    // 相液池: translucent cyan puddle by default; SOLID freezes it into an opaque slab (固化造路).
    // Always visible (a world object, not a phase route) so a frozen bridge reads as solid.
    for (const pf of this.layer.phaseFluids) {
      const w = pf.max.x - pf.min.x
      const h = pf.max.y - pf.min.y
      const d = pf.max.z - pf.min.z
      const liquidMat = new THREE.MeshBasicMaterial({ color: '#2ec4b6', transparent: true, opacity: 0.32, depthWrite: false })
      const frozenMat = new THREE.MeshBasicMaterial({ color: '#6fe3d8', transparent: true, opacity: 0.95 })
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), liquidMat)
      mesh.position.set((pf.min.x + pf.max.x) / 2, (pf.min.y + pf.max.y) / 2, (pf.min.z + pf.max.z) / 2)
      const shell = new THREE.Mesh(
        new THREE.BoxGeometry(w * 1.03, h * 1.03, d * 1.03),
        new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0, side: THREE.BackSide }),
      )
      mesh.add(shell)
      this.scene.add(mesh)
      this.poolMeshes.set(pf.id, { mesh, shell, liquidMat, frozenMat })
    }
  }

  private buildEmitters(): void {
    // 相灵眼: dark orb + golden iris + pulsing ring (the ring charges as it nears a shot).
    for (const em of this.layer.emitters) {
      const g = new THREE.Group()
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 20, 16), new THREE.MeshBasicMaterial({ color: '#2a2a3c' }))
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffd166' }))
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.04, 8, 24),
        new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.4 }),
      )
      g.add(body, iris, ring)
      g.position.set(em.position.x, em.position.y, em.position.z)
      this.scene.add(g)
      this.emitterMeshes.set(em.id, { group: g, ring })
    }
  }

  private buildShards(): void {
    for (const sh of this.layer.shards) {
      const pal = PHASE_PALETTE[sh.phase]
      // shards keep their emissive glow in BOTH states — the phaseMat override was stomping the
      // highlight, so we give each shard its own current/ghost material pair instead
      const current = new THREE.MeshToonMaterial({
        color: pal.paper, emissive: pal.highlight, emissiveIntensity: 1.2,
      })
      const ghost = new THREE.MeshToonMaterial({
        color: pal.paper, emissive: pal.highlight, emissiveIntensity: 0.25,
        transparent: true, opacity: 0.35, depthWrite: false,
      })
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), current)
      mesh.position.set(sh.position.x, sh.position.y, sh.position.z)
      const shell = addOutline(mesh, this.mats[sh.phase], 1.15)
      shell.userData.isShell = true
      mesh.userData.isShard = true
      mesh.userData.shardCurrent = current
      mesh.userData.shardGhost = ghost
      this.groups[sh.phase].add(mesh)
      this.shardMeshes.set(sh.id, mesh)
    }
  }

  private buildHazards(): void {
    for (const hz of this.layer.hazards) {
      const w = hz.max.x - hz.min.x
      const d = hz.max.z - hz.min.z
      const cx = (hz.min.x + hz.max.x) / 2
      const cz = (hz.min.z + hz.max.z) / 2
      if (hz.name === '无相区') {
        // danger static patches (the Phaseless's touch) — ground-level plane; muted crimson so it
        // reads as lethal, NOT the safe gray spawn patch (which shares the old #cfcfd4)
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, d),
          new THREE.MeshBasicMaterial({ color: '#b0556a', transparent: true, opacity: 0.55 }),
        )
        m.rotation.x = -Math.PI / 2
        m.position.set(cx, hz.min.y + 0.02, cz)
        this.scene.add(m)
        this.hazardMeshes.push({ mesh: m, kind: 'void', baseY: hz.min.y + 0.02 })
      } else if (hz.name === '雷云') {
        // static cloud: cluster of mauve blobs, kills gas only; blob spread is clamped to the
        // hazard extents (the old hardcoded ±1.6 span was wider than the killbox → invisible deaths)
        const g = new THREE.Group()
        const mat = new THREE.MeshBasicMaterial({ color: '#9a6a7c', transparent: true, opacity: 0.6 })
        const h = hz.max.y - hz.min.y
        for (let i = 0; i < 5; i++) {
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.45 + Math.random() * 0.3, 12, 10), mat)
          s.position.set((Math.random() - 0.5) * (w - 1), (Math.random() - 0.5) * (h - 1), (Math.random() - 0.5) * (d - 1))
          g.add(s)
        }
        g.position.set(cx, (hz.min.y + hz.max.y) / 2, cz)
        this.scene.add(g)
        this.hazardMeshes.push({ mesh: g as unknown as THREE.Mesh, kind: 'cloud', baseY: (hz.min.y + hz.max.y) / 2 })
      }
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
    // golden start ring (gate color = start color)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 8, 40), new THREE.MeshBasicMaterial({ color: '#ffd166' }))
    ring.rotation.x = -Math.PI / 2
    ring.position.set(s.x, 0.03, s.z)
    this.scene.add(ring)
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
    const g = this.revealAlpha   // 0..1 ghost reveal factor (四相同现 fade-in)
    for (const p of PHASES) {
      const isCurrent = p === phase
      this.groups[p].traverse((obj) => {
        const m = obj as THREE.Mesh & Traversable
        if (!(obj instanceof THREE.Mesh) && !(obj instanceof THREE.Points)) return
        if (m.userData.isShell === true) {
          ;(m.material as THREE.MeshBasicMaterial).opacity = isCurrent ? 1 : 0.25 * g
        } else if (m.userData.phaseMat) {
          const mats = m.userData.phaseMat as PhaseMaterials
          m.material = isCurrent ? mats.solid : mats.ghost
        } else if (m.userData.isShard === true) {
          m.material = (isCurrent ? m.userData.shardCurrent : m.userData.shardGhost) as THREE.Material
        } else if (m.userData.baseOpacity !== undefined) {
          ;(m.material as THREE.MeshBasicMaterial).opacity =
            (m.userData.baseOpacity as number) * (isCurrent ? 1 : 0.35 * g)
        }
      })
      const idx = PHASES.indexOf(p)
      const curIdx = PHASES.indexOf(phase)
      this.groups[p].position.y = (idx - curIdx) * GHOST_PARALLAX
    }
    // shared ghost materials fade with the reveal (one material per phase, updated once)
    for (const p of PHASES) this.mats[p].ghost.opacity = 0.15 * g
    const pal = PHASE_PALETTE[phase]
    this.playerBody.material = this.mats[phase].solid   // swap gradientMap per phase (was only recoloring, keeping the solid ramp)
    ;(this.playerHead.material as THREE.MeshToonMaterial).color.set(pal.paper)
    ;(this.playerHead.material as THREE.MeshToonMaterial).emissive.set(pal.highlight)
    ;(this.playerShell.material as THREE.MeshBasicMaterial).color.set(pal.ink)
  }

  // Trigger the 四相同现 reveal: ghost layers fade 0 → 0.15 over REVEAL_DURATION (worldview-first §4 ⭐①).
  reveal(): void {
    this.revealed = true
  }

  private syncBullets(s: GameState): void {
    const seen = new Set<string>()
    for (const b of s.bullets) {
      seen.add(b.id)
      let m = this.bulletMeshes.get(b.id)
      if (!m) {
        m = new THREE.Mesh(this.bulletGeo, this.bulletMatNeutral)
        this.scene.add(m)
        this.bulletMeshes.set(b.id, m)
      }
      m.position.set(b.position.x, b.position.y, b.position.z)
      m.material = b.reflected ? this.bulletMatReflect : this.bulletMatNeutral
    }
    for (const [id, m] of this.bulletMeshes) {
      if (!seen.has(id)) {
        this.scene.remove(m)
        this.bulletMeshes.delete(id)
      }
    }
  }

  sync(s: GameState, t: number, dt: number): void {
    if (s.player.phase !== this.current) this.setPhase(s.player.phase)
    this.playerGroup.position.set(s.player.position.x, s.player.position.y, s.player.position.z)

    // ghost reveal animation (re-apply opacities while ramping 0 → 1)
    if (this.revealed && this.revealAlpha < 1) {
      this.revealAlpha = Math.min(1, this.revealAlpha + dt / REVEAL_DURATION)
      this.setPhase(this.current)
    }

    // ghost render-radius culling (TDD §4 / review D2): hide ghost layers far from the player
    const pp = this.playerGroup.position
    for (const p of PHASES) {
      if (p === this.current) {
        this.groups[p].visible = true
        continue
      }
      const d = Math.hypot(pp.x - this.groupCenters[p].x, pp.y - this.groupCenters[p].y, pp.z - this.groupCenters[p].z)
      this.groups[p].visible = d < GHOST_RENDER_RADIUS + this.groupRadii[p]
    }

    // bullets
    this.syncBullets(s)

    // emitters: hide destroyed, charge ring toward each shot
    for (const em of s.layer.emitters) {
      const m = this.emitterMeshes.get(em.id)
      if (!m) continue
      m.group.visible = !em.destroyed
      if (!em.destroyed) {
        const charge = 1 - Math.max(0, em.cooldown) / em.interval
        ;(m.ring.material as THREE.MeshBasicMaterial).opacity = 0.25 + charge * 0.65
        m.ring.scale.setScalar(0.8 + charge * 0.45)
      }
    }

    // phase-fluid pools: frozen → opaque slab + gold outline
    for (const pf of s.layer.phaseFluids) {
      const pm = this.poolMeshes.get(pf.id)
      if (!pm) continue
      pm.mesh.material = pf.solidified ? pm.frozenMat : pm.liquidMat
      ;(pm.shell.material as THREE.MeshBasicMaterial).opacity = pf.solidified ? 0.85 : 0
    }

    // hazard animation: gray patches pulse, cloud bobs
    for (const hz of this.hazardMeshes) {
      if (hz.kind === 'void') {
        ;(hz.mesh.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(t * 2.2) * 0.15
      } else if (hz.kind === 'cloud') {
        hz.mesh.position.y = hz.baseY + Math.sin(t * 1.1) * 0.25
      }
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
