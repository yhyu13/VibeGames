// Renderer + scene graph + fixed 3/4 follow camera rig. WebGL2 raster tier only
// for this P0 (prisms / SSR / WebGPU RT are later P0s, out of scope here).
import * as THREE from 'three'
import { PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../core/constants'
import type { AABB, Vec3 } from '../core/types'

export interface SceneHandle {
  renderer: THREE.WebGLRenderer
  update: (
    playerPos: Vec3,
    dt: number,
    bodyScaleX: number,
    bodyScaleY: number,
    bodyVelX: number,
    bodyVelZ: number,
    fellOut: boolean
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

  // --- Fit the sun's shadow window to the level, instead of leaving it at the engine's default ---
  //
  // A DirectionalLight's shadow camera is an ORTHOGRAPHIC window, and three.js defaults it to 10 m
  // square, centred on the light's axis through its target. Nothing in this file ever set it, so that
  // default was the whole story: the sun's shadow map covered a 10 m patch around the world origin,
  // while this level is a 60 m ground plate with three platforms strung out over 20 m of it. Measured
  // off the shipped build by switching the light's own `castShadow` on and off and counting the
  // pixels that move (`.vts-probes/plat-shadow.mjs`, two views, one control): from the spawn ledge
  // 2691 pixels changed; from the raised island — the platform the game is actually played on — 0
  // did. The keeper's shadow does not fade or soften with distance, it stops existing a few metres
  // from where they started, and the island they jump onto never had one to lose.
  //
  // So the window is DERIVED from the geometry rather than guessed at: the eight corners of
  // everything that casts or receives are pushed into the light's own space, and the window is the
  // box they enclose. There is deliberately no number here to have an opinion about — where the
  // keeper's shadow falls follows from where the keeper is, not from where the level happened to be
  // built.
  //
  // What it costs, stated rather than hidden: 2048² over the level's footprint is a 40.6 x 33.0 mm
  // texel — the window is a rectangle, and the depth axis is the finer of the two — where the old
  // 10 m window got 4.9 mm. The one patch of shadow this scene did have was sharper than anything
  // here will be. PCFSoft blurs a 4 cm texel into a soft edge, and a soft shadow under the keeper
  // everywhere is worth more than a crisp one that ends three metres from the spawn.
  //
  // The first cut of this derivation fitted left/right/top/bottom and far, and left `near` at the
  // engine's 0.5. That was invisible at the old size and is not at this one: the sun sits at
  // (-12, 18, 8), so once the window spans the level the light stands INSIDE the level's own
  // footprint and the -x/+z quarter of the ground plate is nearer to it than 0.5 m — behind the near
  // plane, where the shadow pass keeps nothing. Measured on the shipped build with the keeper's own
  // `castShadow` as the control (`.vts-probes/plat-shadow2.mjs`, which isolates the keeper's shadow
  // from the platforms' the way the round-40 probe could not): walking x = -24 -> -28 at z = 27 the
  // keeper's shadow reads 2202 px at a light-space depth of 0.75, 1173 px at 0.23, and then 0 px at
  // -0.29 and beyond — the cliff is standing exactly at near = 0.5. The blunt light-toggle reading
  // still showed 225 px there, because a platform's shadow reaches that corner even though the
  // keeper's own does not: an instrument that cannot tell the two apart reports success over the
  // defect. So `near` is fitted to the same box as `far`, and the level is whole in front of and
  // behind the light rather than in front of it only.
  // This one has a cost too, and it is the same kind: the depth range goes from 50.4 m to 57.4 m,
  // so the shadow map's depth precision is spread 14% thinner. Nothing overlaps in that extra span
  // — it is empty space on the far side of the light — and a map that keeps the whole level is
  // worth more than a map that spends its precision on 7 m of nothing.
  const shadowCam = sun.shadow.camera as THREE.OrthographicCamera
  // Make every world matrix current before anything is measured off them. Box3.expandByObject
  // refreshes the object's OWN matrix from its parent's and stops there, so a stale ancestor yields
  // a silently wrong box — with the scene's matrix left dirty, the island reports its local
  // (-5, 0, -13)..(5, 2, -3) and the window shrinks to nonsense without an error anywhere. One walk
  // at construction costs nothing and turns a precondition into a fact.
  scene.updateMatrixWorld(true)
  const casters = new THREE.Box3()
  for (const p of platforms) casters.expandByObject(p.mesh)
  casters.expandByObject(playerMesh)

  // Measure in the space the window lives in, built the way the shadow pass builds it: eye at the
  // light, looking at the light's target. In WORLD space a box is not a rectangle, so a fit done
  // there would be loose by exactly the amount the light sits off-axis.
  sun.target.updateMatrixWorld()
  const toLight = new THREE.Matrix4()
    .lookAt(sun.position, new THREE.Vector3().setFromMatrixPosition(sun.target.matrixWorld), shadowCam.up)
    .setPosition(sun.position)
    .invert()

  const corner = new THREE.Vector3()
  let left = Infinity
  let right = -Infinity
  let bottom = Infinity
  let top = -Infinity
  // The depth range is measured in the same pass, and is signed: a corner in front of the light has
  // a positive depth and one behind it a negative one. `near` is therefore allowed below zero on
  // purpose. `casters` always holds at least the keeper, so the loop always runs and both bounds
  // always end finite — there is no empty-box case to guard.
  let near = Infinity
  let far = -Infinity
  for (const x of [casters.min.x, casters.max.x]) {
    for (const y of [casters.min.y, casters.max.y]) {
      for (const z of [casters.min.z, casters.max.z]) {
        corner.set(x, y, z).applyMatrix4(toLight)
        left = Math.min(left, corner.x)
        right = Math.max(right, corner.x)
        bottom = Math.min(bottom, corner.y)
        top = Math.max(top, corner.y)
        // The shadow camera looks down -z, so a corner's distance in front of the light is -z.
        near = Math.min(near, -corner.z)
        far = Math.max(far, -corner.z)
      }
    }
  }
  shadowCam.left = left
  shadowCam.right = right
  shadowCam.bottom = bottom
  shadowCam.top = top
  shadowCam.near = near - 1
  shadowCam.far = far + 1
  shadowCam.updateProjectionMatrix()

  // Fixed 3/4 low-angle follow camera: pos = player + (0, 4.2, 6.5), damped spring.
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 4.2, 6.5)
  const lookAt = new THREE.Vector3(0, 1, 0)
  const camTarget = new THREE.Vector3()
  const lookTarget = new THREE.Vector3()

  // Landing-squash + launch-stretch juice. All three beats are SIGNALED by the sim, and so is the
  // SHAPE they produce: this function draws the scale it is handed and holds no opinion about it.
  // That is the point of the handover. The beats had to be signalled because playerPos is
  // interpolated between fixed steps, so a one-frame velocity edge read off the drawn stream smears
  // across several frames — the derived launch edge missed 4 of 12 press phases at 144Hz and the
  // derived land edge missed 8 of 12. The shape had to follow them out of here for a harder reason:
  // the sim collides against the box the shape makes, so while this function re-derived
  // `min(0.45, 0.03 * landImpact)` and its siblings from the sim's own telemetry it was a second
  // author of a fact the sim had already fixed. The drift was visible — a launch stretched the drawn
  // capsule taller than its collider, and under the level's one overhang the head drew itself inside
  // the ceiling while the collider stopped it short.
  // Radians of lean per m/s of horizontal speed. At the 8 m/s ground speed that is a little over
  // 18°, which swings the capsule's top 0.19 m off its own centre — about half its radius, and on
  // screen the difference between a keeper that is going somewhere and one that is merely elsewhere.
  // The number lives here rather than in the frozen core: the sim publishes m/s, and how far a metre
  // per second tilts a body is a question only the renderer has an opinion about.
  const LEAN_PER_SPEED = 0.04

  const update = (
    playerPos: Vec3,
    dt: number,
    bodyScaleX: number,
    bodyScaleY: number,
    bodyVelX: number,
    bodyVelZ: number,
    fellOut: boolean
  ): void => {
    const sx = bodyScaleX
    const sy = bodyScaleY
    playerMesh.scale.set(sx, sy, sx)
    // Lean into the direction of travel. Rotating a capsule about its centre changes its SILHOUETTE
    // and nothing else, which is the whole point: the body is a smooth solid with no front, so
    // without this the keeper reads the same going left, right, toward the camera or away from it,
    // and the player has no way to see which way their own momentum is pointing. The two axes are
    // independent because this camera has a FIXED yaw — it sits at playerPos + (0, 4.2, 6.5) and
    // looks at the keeper, so world +X is always screen-right and world +Z is always toward the
    // viewer. That is what makes this two multiplications instead of a projection.
    playerMesh.rotation.set(bodyVelZ * LEAN_PER_SPEED, 0, -bodyVelX * LEAN_PER_SPEED)
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
    lookTarget.set(playerPos.x, playerPos.y + 1, playerPos.z)
    if (fellOut) {
      // The catch is a CUT, so the camera cuts with it. A spring asked to follow a body that
      // jumped from below the world back to the spawn ledge would spend the better part of a
      // second swooping up from under the level, with the keeper off-frame the whole way — the
      // one beat in the game whose whole job is to be immediately legible, rendered illegible.
      camera.position.copy(camTarget)
      lookAt.copy(lookTarget)
    } else {
      const lambda = 6
      const t = 1 - Math.exp(-lambda * dt)
      camera.position.lerp(camTarget, t)
      lookAt.lerp(lookTarget, t)
    }
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
