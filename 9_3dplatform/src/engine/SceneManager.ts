// Renderer + scene graph + fixed 3/4 follow camera rig. WebGL2 raster tier only
// for this P0 (prisms / SSR / WebGPU RT are later P0s, out of scope here).
import * as THREE from 'three'
import { PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../core/constants'
import type { AABB, Vec3 } from '../core/types'

export interface SceneHandle {
  renderer: THREE.WebGLRenderer
  update: (playerPos: Vec3, dt: number) => void
  render: () => void
  playerMesh: THREE.Mesh
  solids: AABB[]
}

// A lit box platform: a visual mesh + its matching AABB collider.
interface Platform {
  mesh: THREE.Mesh
  collider: AABB
}

export function createScene(container: HTMLElement): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#1a1330')
  scene.fog = new THREE.Fog('#2a1840', 40, 120)

  // Warm dusk sun (low angle) + soft fill.
  const sun = new THREE.DirectionalLight('#ffb347', 2.4)
  sun.position.set(-12, 18, 8)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  scene.add(sun)
  scene.add(new THREE.HemisphereLight('#8f7bd6', '#241730', 0.7))

  // --- Platforms: ground + one raised island + a couple of ledges ---
  const platforms: Platform[] = []
  const addBox = (
    cx: number, cy: number, cz: number,
    sx: number, sy: number, sz: number,
    color: number
  ): void => {
    const geo = new THREE.BoxGeometry(sx, sy, sz)
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(cx, cy, cz)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
    platforms.push({
      mesh,
      collider: {
        min: { x: cx - sx / 2, y: cy - sy / 2, z: cz - sz / 2 },
        max: { x: cx + sx / 2, y: cy + sy / 2, z: cz + sz / 2 }
      }
    })
  }

  // Ground (large, low).
  addBox(0, -0.5, 0, 60, 1, 60, 0x6b5a3a)
  // Raised island platform (a step up).
  addBox(0, 1.0, -8, 10, 2, 10, 0x8a6f45)
  // A side ledge to jump onto.
  addBox(7, 2.5, -4, 4, 1, 4, 0x9a7c48)
  // A floating gap-crossing pad.
  addBox(-7, 3.0, -14, 3, 0.6, 3, 0x7a6b9a)

  // Player mesh: a small lit keeper box (capsule visual, AABB collider behind it).
  const playerGeo = new THREE.CapsuleGeometry(PLAYER_RADIUS, PLAYER_HALF_HEIGHT * 2 - PLAYER_RADIUS * 2, 8, 16)
  const playerMat = new THREE.MeshStandardMaterial({ color: '#e8d6a0', metalness: 0.2, roughness: 0.5 })
  const playerMesh = new THREE.Mesh(playerGeo, playerMat)
  playerMesh.castShadow = true
  scene.add(playerMesh)

  // Fixed 3/4 low-angle follow camera: pos = player + (0, 4.2, 6.5), damped spring.
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 4.2, 6.5)
  const lookAt = new THREE.Vector3(0, 1, 0)
  const camTarget = new THREE.Vector3()
  const lookTarget = new THREE.Vector3()

  // Landing-squash + launch-stretch juice, derived purely from the position
  // stream the renderer already receives (no core change, no interface change).
  // Land: a real fall (prevVy ~ -11 from a jump, up to -25 from a ledge) whose
  // velocity the floor suddenly kills becomes a brief stamp of the capsule. ~7
  // m/s isolates genuine jumps/falls from tiny step-offs, so it reads as an
  // impact, never a spurious squish. Launch: the reverse beat — a standing
  // player (vy ~ 0) whose velocity suddenly springs to ~JUMP_VELOCITY stretches
  // tall-and-thin, so taking off reads as an effortful spring rather than a
  // teleport. Symmetric to the land, it closes the jump loop: launch = stretch,
  // land = squash.
  let prevY = 0
  let prevVy = 0
  let landSquash = 0
  let launchStretch = 0

  const update = (playerPos: Vec3, dt: number): void => {
    const dtSafe = Math.max(dt, 1e-4)
    const vy = (playerPos.y - prevY) / dtSafe
    if (prevVy < -7 && vy > -2) landSquash = Math.min(0.45, 0.03 * -prevVy)
    // Launch: near-rest vertical velocity (grounded body) that springs to a jump.
    if (prevVy < 2 && vy >= 6) launchStretch = Math.min(0.4, 0.03 * vy)
    prevVy = vy
    prevY = playerPos.y
    landSquash *= Math.exp(-dtSafe * 14)
    launchStretch *= Math.exp(-dtSafe * 14)

    // Position the player mesh at the AABB bottom-center + half height.
    playerMesh.position.set(playerPos.x, playerPos.y + PLAYER_HALF_HEIGHT, playerPos.z)
    // Land squashes (wide+short); launch stretches (tall+thin). Only one is
    // active at a moment (land needs a fall, launch needs a stand→spring).
    const sx = (1 + landSquash * 0.55) * (1 - launchStretch * 0.35)
    const sy = (1 - landSquash) * (1 + launchStretch)
    playerMesh.scale.set(sx, sy, sx)

    // Damped spring camera toward the fixed offset.
    camTarget.set(playerPos.x, playerPos.y + 4.2, playerPos.z + 6.5)
    const lambda = 6
    const t = 1 - Math.exp(-lambda * dt)
    camera.position.lerp(camTarget, t)
    lookTarget.set(playerPos.x, playerPos.y + 1, playerPos.z)
    lookAt.lerp(lookTarget, t)
    camera.lookAt(lookAt)
  }

  const render = (): void => {
    renderer.render(scene, camera)
  }

  const onResize = (): void => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  return { renderer, update, render, playerMesh, solids: platforms.map((p) => p.collider) }
}
