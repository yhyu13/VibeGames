import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { WebGPURenderer } from 'three/webgpu'
import {
  BALL_GAP,
  BALL_RADIUS,
  BG_COLOR,
  KEY_LIGHT_HEIGHT,
  KEY_LIGHT_RADIUS,
  LATENT_RESOLUTION,
  PEDESTAL_COLOR,
  TONE_MAPPING_EXPOSURE,
} from '../core/constants'
import { BAKED_LATENT } from './baked'
import { createNeuralMaterial, type NeuralMaterialHandle } from './NeuralMaterial'

export interface SceneHandle {
  renderer: WebGPURenderer
  setLightAngle: (a: number) => void
  lightWorld: THREE.Vector3
}

function latentAtlasTexture(): THREE.DataTexture {
  const n = LATENT_RESOLUTION
  const w = n * 8
  const data = new Uint8Array(w * n * 4)
  for (let y = 0; y < n; y++) {
    for (let tile = 0; tile < 8; tile++) {
      for (let x = 0; x < n; x++) {
        const z = BAKED_LATENT[(y * n + x) * 8 + tile] ?? 0
        const g = Math.max(0, Math.min(255, Math.round(z * 255)))
        const i = (y * w + tile * n + x) * 4
        data[i] = g
        data[i + 1] = g
        data[i + 2] = g
        data[i + 3] = 255
      }
    }
  }
  const tex = new THREE.DataTexture(data, w, n, THREE.RGBAFormat)
  tex.needsUpdate = true
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.colorSpace = THREE.NoColorSpace
  return tex
}

function pedestal(x: number): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(0.38, 0.48, 0.18, 32)
  const mat = new THREE.MeshStandardMaterial({
    color: PEDESTAL_COLOR,
    roughness: 0.85,
    metalness: 0.05,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(x, -BALL_RADIUS - 0.12, 0)
  return mesh
}

export async function createScene(host: HTMLElement): Promise<SceneHandle> {
  const renderer = new WebGPURenderer({ antialias: true })
  await renderer.init()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = TONE_MAPPING_EXPOSURE
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(BG_COLOR)
  scene.fog = new THREE.Fog(BG_COLOR, 8, 18)

  const camera = new THREE.PerspectiveCamera(
    42,
    (host.clientWidth || window.innerWidth) / (host.clientHeight || window.innerHeight),
    0.1,
    40,
  )
  camera.position.set(0, 1.15, 5.4)
  camera.lookAt(0, 0.1, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.minDistance = 3.2
  controls.maxDistance = 9
  controls.maxPolarAngle = Math.PI * 0.49
  controls.target.set(0, 0.05, 0)
  controls.update()

  const neural: NeuralMaterialHandle = createNeuralMaterial()

  const sphereGeo = new THREE.SphereGeometry(BALL_RADIUS, 96, 64)
  for (let i = 0; i < 3; i++) {
    const mesh = new THREE.Mesh(sphereGeo, neural.material)
    mesh.position.set((i - 1) * BALL_GAP, 0, 0)
    scene.add(mesh)
    scene.add(pedestal((i - 1) * BALL_GAP))
  }

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(7, 64),
    new THREE.MeshStandardMaterial({ color: 0x0a0c12, roughness: 0.95, metalness: 0 }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -BALL_RADIUS - 0.21
  scene.add(floor)

  const hemi = new THREE.HemisphereLight(0x1a2438, 0x08060a, 0.35)
  scene.add(hemi)
  const fill = new THREE.DirectionalLight(0x334466, 0.25)
  fill.position.set(-2, 3, 1)
  scene.add(fill)

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffd8a8, toneMapped: false }),
  )
  scene.add(lamp)

  const atlas = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 0.45),
    new THREE.MeshBasicMaterial({ map: latentAtlasTexture(), toneMapped: false }),
  )
  atlas.position.set(0, -1.55, 1.6)
  atlas.rotation.x = -0.35
  scene.add(atlas)

  const lightWorld = new THREE.Vector3()
  const onResize = (): void => {
    const w = host.clientWidth || window.innerWidth
    const h = host.clientHeight || window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })

  return {
    renderer,
    lightWorld,
    setLightAngle: (a: number) => {
      neural.setLightAngle(a)
      lamp.position.set(
        KEY_LIGHT_RADIUS * Math.cos(a),
        KEY_LIGHT_HEIGHT,
        KEY_LIGHT_RADIUS * Math.sin(a),
      )
      lightWorld.copy(lamp.position)
    },
  }
}
