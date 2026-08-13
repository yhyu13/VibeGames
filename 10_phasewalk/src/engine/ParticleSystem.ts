// engine/ParticleSystem.ts — lightweight pooled Points bursts (collect/switch/death juice).
import * as THREE from 'three'

interface Particle {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  life: number; maxLife: number
  r: number; g: number; b: number
}

const MAX = 240

export class ParticleSystem {
  private points: THREE.Points
  private geo: THREE.BufferGeometry
  private pos: Float32Array
  private col: Float32Array
  private pool: Particle[] = []

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
  }

  burst(x: number, y: number, z: number, color: string, count: number, speed = 3): void {
    const c = new THREE.Color(color)
    for (let i = 0; i < count && this.pool.length < MAX; i++) {
      const a = Math.random() * Math.PI * 2
      const b = (Math.random() - 0.5) * Math.PI
      const sp = speed * (0.4 + Math.random() * 0.6)
      this.pool.push({
        x, y, z,
        vx: Math.cos(a) * Math.cos(b) * sp,
        vy: Math.abs(Math.sin(b)) * sp * 0.8 + 0.5,
        vz: Math.sin(a) * Math.cos(b) * sp,
        life: 0,
        maxLife: 0.5 + Math.random() * 0.4,
        r: c.r, g: c.g, b: c.b,
      })
    }
  }

  update(dt: number): void {
    let alive = 0
    for (let i = this.pool.length - 1; i >= 0; i--) {
      const p = this.pool[i]
      p.life += dt
      if (p.life >= p.maxLife) {
        this.pool.splice(i, 1)
        continue
      }
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.z += p.vz * dt
      p.vy -= 4 * dt
      this.pos[alive * 3] = p.x
      this.pos[alive * 3 + 1] = p.y
      this.pos[alive * 3 + 2] = p.z
      this.col[alive * 3] = p.r
      this.col[alive * 3 + 1] = p.g
      this.col[alive * 3 + 2] = p.b
      alive++
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.color.needsUpdate = true
    this.geo.setDrawRange(0, alive)
    this.points.visible = alive > 0
  }
}
