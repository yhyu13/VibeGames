// Renderer + scene graph + fixed 3/4 follow camera rig. WebGL2 raster tier only
// for this P0 (prisms / SSR / WebGPU RT are later P0s, out of scope here).
import * as THREE from 'three'
import { LAND_BEAT_MIN_IMPACT, PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../core/constants'
import type { AABB, Vec3 } from '../core/types'

export interface SceneHandle {
  renderer: THREE.WebGLRenderer
  update: (
    playerPos: Vec3,
    dt: number,
    deniedJump: boolean,
    landImpact: number,
    launchSpeed: number
  ) => void
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

  // Landing-squash + launch-stretch juice. Both impacts are SIGNALED by the sim,
  // never derived here: playerPos is interpolated between fixed steps, so a one-
  // frame velocity edge read off the drawn stream smears across several frames.
  // Measured on the real sim, the derived launch edge missed 4 of 12 press phases
  // at 144Hz — and the derived land edge missed 8 of 12 before it was signalled.
  // Land: a real fall (~10.5 m/s out of a jump, up to 25 off a ledge) whose
  // velocity the floor suddenly kills becomes a brief stamp of the capsule. The
  // > 7 m/s floor isolates genuine jumps/falls from tiny step-offs, so it reads as
  // an impact, never a spurious squish. Launch: the reverse beat — a standing
  // player whose velocity springs to ~JUMP_VELOCITY stretches tall-and-thin, so
  // taking off reads as an effortful spring rather than a teleport. Symmetric to
  // the land, it closes the jump loop: launch = stretch, land = squash.
  let landSquash = 0
  let launchStretch = 0
  // Denied-input beat: an air-jump press that had no jump left (both spent) and
  // couldn't reach ground or coyote. It does NOT move the body at all, so it is
  // invisible to the position stream — it had to be signaled, not derived. Edge-
  // triggered (one press = one squeeze), quick and small (a "nudge", not a thud),
  // and crosses out fast so it reads as a felt "no" rather than a persistent tint.
  let deniedSquash = 0

  const update = (
    playerPos: Vec3,
    dt: number,
    deniedJump: boolean,
    landImpact: number,
    launchSpeed: number
  ): void => {
    const dtSafe = Math.max(dt, 1e-4)
    // All three beats arrive SIGNALED by the sim (see the header comment above) —
    // this function no longer reads a velocity off the smoothed position stream.
    if (landImpact > LAND_BEAT_MIN_IMPACT) landSquash = Math.min(0.45, 0.03 * landImpact)
    if (launchSpeed > 0) launchStretch = Math.min(0.4, 0.03 * launchSpeed)
    if (deniedJump) deniedSquash = 0.18
    landSquash *= Math.exp(-dtSafe * 14)
    launchStretch *= Math.exp(-dtSafe * 14)
    deniedSquash *= Math.exp(-dtSafe * 30)

    // Land squashes (wide+short); launch stretches (tall+thin); a denied press
    // gives a small independent squeeze. Only one lands on a moment (land needs a
    // fall, launch needs a stand→spring, deny needs a spent press).
    const sx = (1 + landSquash * 0.55) * (1 - launchStretch * 0.35) * (1 + deniedSquash * 0.5)
    const sy = (1 - landSquash) * (1 + launchStretch) * (1 - deniedSquash)
    playerMesh.scale.set(sx, sy, sx)
    // Position by the FEET, not by the origin. three.js scales about the mesh origin
    // and CapsuleGeometry is centred on it, so the nominal half height would pivot the
    // body 0.6 m above the floor: a landing squash would lift its base 0.6*(1-sy) m
    // clear of the ground — 0.20 m at the 11 m/s impact of an ordinary jump, 0.27 m
    // arriving off the floating pad — and a launch stretch would sink it as far the
    // other way, where the ground box hides it. Scaling the offset by sy keeps the
    // base at playerPos.y, so the body compresses INTO the floor and drives UP off it.
    playerMesh.position.set(playerPos.x, playerPos.y + PLAYER_HALF_HEIGHT * sy, playerPos.z)

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
