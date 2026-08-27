// engine/OrbitShell.ts — sky / limb / cloud. No picking, no sim.
import * as THREE from 'three'

function starTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 8
  c.height = 8
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(4, 4, 0, 4, 4, 4)
  grd.addColorStop(0, '#ffffff')
  grd.addColorStop(0.4, '#d8fff0')
  grd.addColorStop(1, 'rgba(216,255,240,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 8, 8)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function earthTexture(): THREE.CanvasTexture {
  const size = 512
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = '#061018'
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < 28; i++) {
    const x = (i * 97) % size
    const y = (i * 53) % size
    const r = 20 + (i * 13) % 70
    const grd = g.createRadialGradient(x, y, 0, x, y, r)
    grd.addColorStop(0, i % 3 === 0 ? '#1a4a3a' : '#0a2838')
    grd.addColorStop(1, 'rgba(6,16,24,0)')
    g.fillStyle = grd
    g.beginPath()
    g.arc(x, y, r, 0, Math.PI * 2)
    g.fill()
  }
  g.fillStyle = 'rgba(255, 204, 120, 0.55)'
  for (let i = 0; i < 180; i++) {
    const x = (i * 137) % size
    const y = (i * 89) % size
    g.fillRect(x, y, 1 + (i % 2), 1)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function cloudTexture(): THREE.CanvasTexture {
  const size = 256
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = 'rgba(8,12,18,0.15)'
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < 48; i++) {
    const x = (i * 73) % size
    const y = (i * 131) % size
    const r = 18 + (i * 17) % 40
    const grd = g.createRadialGradient(x, y, 0, x, y, r)
    grd.addColorStop(0, 'rgba(220, 232, 242, 0.85)')
    grd.addColorStop(1, 'rgba(220, 232, 242, 0)')
    g.fillStyle = grd
    g.beginPath()
    g.arc(x, y, r, 0, Math.PI * 2)
    g.fill()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3.4, 3.4)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class OrbitShell {
  group = new THREE.Group()
  private cloud: THREE.Mesh
  private cloudMat: THREE.MeshBasicMaterial
  private limb: THREE.Mesh

  constructor() {
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(400, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0x040a16, side: THREE.BackSide }),
    )
    this.group.add(sky)

    const starCount = 900
    const pos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 180 + (i % 80)
      const th = (i * 12.9898) % (Math.PI * 2)
      const ph = ((i * 78.233) % Math.PI) * 0.7 + 0.15
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = 30 + r * Math.cos(ph) * 0.55
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th)
    }
    const stars = new THREE.BufferGeometry()
    stars.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.group.add(new THREE.Points(
      stars,
      new THREE.PointsMaterial({
        map: starTexture(),
        color: 0xe8fff8,
        size: 2.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    ))

    this.limb = new THREE.Mesh(
      new THREE.SphereGeometry(320, 64, 48),
      new THREE.MeshBasicMaterial({ map: earthTexture() }),
    )
    this.limb.position.set(0, -318, 0)
    this.group.add(this.limb)

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(324, 48, 16),
      new THREE.MeshBasicMaterial({
        color: 0x3a8cff,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    )
    glow.position.copy(this.limb.position)
    this.group.add(glow)

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(318, 328, 64),
      new THREE.MeshBasicMaterial({
        color: 0x5aa8ff,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 2.2
    this.group.add(ring)

    this.cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTexture(),
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      side: THREE.FrontSide,
    })
    this.cloud = new THREE.Mesh(new THREE.SphereGeometry(328, 48, 32), this.cloudMat)
    this.cloud.position.copy(this.limb.position)
    this.cloud.rotation.x = 1.15
    this.cloud.raycast = () => {}
    this.group.add(this.cloud)

    this.group.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) m.raycast = () => {}
    })
  }

  update(zoom01: number, sarOn: boolean, t: number): void {
    this.cloud.rotation.y = t * 0.012
    this.limb.rotation.y = t * 0.004
    const zoomFade = Math.max(0, 1.12 - zoom01 * 1.55)
    const pierce = sarOn ? 0.16 : 1
    this.cloudMat.opacity = zoomFade * pierce * 0.94
    this.cloud.visible = this.cloudMat.opacity > 0.02
    this.limb.visible = zoom01 < 0.62
  }
}
