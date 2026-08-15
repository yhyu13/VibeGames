// engine/ParticleSystem.ts — lightweight pooled Points bursts (collect/switch/death juice).
//
// A true object pool, not a live-array mislabeled "pooled": MAX Particle objects are preallocated
// once and recycled through a free list, so burst()/trailPoint()/update() never heap-allocate in the
// per-frame path (round 13). Expiry uses swap-remove (O(1)) instead of splice (O(n)).
import * as THREE from 'three'

interface Particle {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  life: number; maxLife: number
  r: number; g: number; b: number
  trail: boolean            // trail points skip gravity (they stay on the momentum path)
}

const MAX = 240
const TRAIL_DURATION = 0.5    // s — 相弹 0.5s momentum trail (worldview-first §4 ⭐②)
const TRAIL_LIFE = 0.35       // s — per-trail-point lifetime

export class ParticleSystem {
  private points: THREE.Points
  private geo: THREE.BufferGeometry
  private pos: Float32Array
  private col: Float32Array
  private live: Particle[] = []       // particles currently on screen
  private free: Particle[] = []       // recycled pool (live.length + free.length === MAX)
  private colorBuf = new THREE.Color('#ffffff')
  private trailOn = false
  private trailTimer = 0
  private trailColor = new THREE.Color('#ffffff')

  constructor(scene: THREE.Scene) {
    this.geo = new THREE.BufferGeometry()
    this.pos = new Float32Array(MAX * 3)
    this.col = new Float32Array(MAX * 3)
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3))
    this.points = new THREE.Points(
      this.geo,
      new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }),
    )
    this.points.frustumCulled = false
    this.points.visible = false
    scene.add(this.points)
    // preallocate the whole pool up front so the hot path never allocates
    for (let i = 0; i < MAX; i++) {
      this.free.push({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, maxLife: 0, r: 0, g: 0, b: 0, trail: false })
    }
  }

  private acquire(): Particle | null {
    return this.free.pop() ?? null
  }

  // Clear live particles + the 相弹 momentum trail. restartLayer/restartRun/advanceLayer/death
  // teleport the player, but `particles` is constructed once (App) — without a reset a trail started
  // by a pre-reset air-switch keeps emitting and prior bursts keep rendering for up to their lifetime.
  reset(): void {
    for (const p of this.live) this.free.push(p)
    this.live.length = 0
    this.trailOn = false
    this.trailTimer = 0
    this.geo.setDrawRange(0, 0)
    this.points.visible = false
  }

  burst(x: number, y: number, z: number, color: string, count: number, speed = 3): void {
    this.colorBuf.set(color)
    for (let i = 0; i < count; i++) {
      const p = this.acquire()
      if (!p) break
      const a = Math.random() * Math.PI * 2
      const b = (Math.random() - 0.5) * Math.PI
      const sp = speed * (0.4 + Math.random() * 0.6)
      p.x = x; p.y = y; p.z = z
      p.vx = Math.cos(a) * Math.cos(b) * sp
      p.vy = Math.abs(Math.sin(b)) * sp * 0.8 + 0.5
      p.vz = Math.sin(a) * Math.cos(b) * sp
      p.life = 0
      p.maxLife = 0.5 + Math.random() * 0.4
      p.r = this.colorBuf.r; p.g = this.colorBuf.g; p.b = this.colorBuf.b
      p.trail = false
      this.live.push(p)
    }
  }

  // 相弹 momentum trail: emit a fading point at the player's position for TRAIL_DURATION.
  startTrail(color: string): void {
    this.trailOn = true
    this.trailTimer = TRAIL_DURATION
    this.trailColor.set(color)
  }

  // End the 相弹 momentum trail on ground contact — a trail armed mid-air must not keep stacking
  // fading points at the (now stationary) grounded position (a static blob instead of a momentum
  // ribbon). App calls this on ev.landed; reset() also clears it on teleports.
  stopTrail(): void {
    this.trailOn = false
    this.trailTimer = 0
  }

  trailPoint(x: number, y: number, z: number): void {
    if (!this.trailOn) return
    const p = this.acquire()
    if (!p) return
    p.x = x + (Math.random() - 0.5) * 0.06
    p.y = y + (Math.random() - 0.5) * 0.06
    p.z = z + (Math.random() - 0.5) * 0.06
    p.vx = 0; p.vy = 0; p.vz = 0
    p.life = 0
    p.maxLife = TRAIL_LIFE
    p.r = this.trailColor.r; p.g = this.trailColor.g; p.b = this.trailColor.b
    p.trail = true
    this.live.push(p)
  }

  update(dt: number): void {
    if (this.trailOn) {
      this.trailTimer -= dt
      if (this.trailTimer <= 0) this.trailOn = false
    }
    let alive = 0
    for (let i = 0; i < this.live.length;) {
      const p = this.live[i]
      p.life += dt
      if (p.life >= p.maxLife) {
        // swap-remove: move the last live particle into this slot, return the expired one to the pool
        this.free.push(p)
        this.live[i] = this.live[this.live.length - 1]
        this.live.pop()
        continue              // re-examine the swapped-in particle without advancing i
      }
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.z += p.vz * dt
      if (!p.trail) p.vy -= 4 * dt   // trail points stay on the momentum path
      this.pos[alive * 3] = p.x
      this.pos[alive * 3 + 1] = p.y
      this.pos[alive * 3 + 2] = p.z
      this.col[alive * 3] = p.r
      this.col[alive * 3 + 1] = p.g
      this.col[alive * 3 + 2] = p.b
      alive++
      i++
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.color.needsUpdate = true
    this.geo.setDrawRange(0, alive)
    this.points.visible = alive > 0
  }
}
