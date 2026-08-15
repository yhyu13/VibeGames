/**
 * Engine adapter: Three.js renderer + fullscreen geodesic raytracer + bloom
 * composer + orbit camera. Reads params from the store each frame.
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import {
  CAMERA_DISTANCE_DEFAULT,
  CAMERA_DISTANCE_MAX,
  CAMERA_DISTANCE_MIN,
  CAMERA_FOV,
  CAMERA_POLAR_MAX,
  CAMERA_POLAR_MIN,
  CAMERA_TILT_DEFAULT,
  DEFAULT_PARAMS,
} from '../core/constants'
import { useStore } from '../store'
import { blackholeFragment, blackholeVertex } from './shaders/blackhole'
import { installDevtools } from './devtools'

export class SceneManager {
  private renderer: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private geometry: THREE.BufferGeometry
  private material: THREE.ShaderMaterial
  private uniforms: Record<string, THREE.IUniform>
  private lastTime = performance.now()
  private raf = 0
  private host: HTMLElement
  private fwd = new THREE.Vector3()
  private right = new THREE.Vector3()
  private up = new THREE.Vector3()
  private frames = 0
  private lastFpsAt = performance.now()
  private onResize: () => void

  constructor(host: HTMLElement) {
    this.host = host
    const w = host.clientWidth || window.innerWidth
    const h = host.clientHeight || window.innerHeight

    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = DEFAULT_PARAMS.exposure
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, 0.1, 1000)
    this.camera.up.set(0, 1, 0)
    const dist = CAMERA_DISTANCE_DEFAULT
    const tilt = CAMERA_TILT_DEFAULT
    this.camera.position.set(dist * Math.cos(tilt), dist * Math.sin(tilt), 0)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.minDistance = CAMERA_DISTANCE_MIN
    this.controls.maxDistance = CAMERA_DISTANCE_MAX
    this.controls.minPolarAngle = CAMERA_POLAR_MIN
    this.controls.maxPolarAngle = CAMERA_POLAR_MAX
    this.controls.autoRotateSpeed = 0.6

    // Fullscreen triangle — the vertex shader emits raw NDC, ignoring the camera.
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    )

    this.uniforms = {
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3() },
      uCamUp: { value: new THREE.Vector3() },
      uCamFwd: { value: new THREE.Vector3() },
      uTanFov: { value: 0 },
      uAspect: { value: w / h },
      uDiskTempK: { value: DEFAULT_PARAMS.diskTempK },
      uDiskBrightness: { value: DEFAULT_PARAMS.diskBrightness },
      uDiskOuter: { value: DEFAULT_PARAMS.diskOuter },
      uStarDensity: { value: DEFAULT_PARAMS.starDensity },
      uSteps: { value: DEFAULT_PARAMS.steps },
      uTime: { value: 0 },
      uShowDisk: { value: 1 },
      uLensing: { value: 1 },
    }

    this.material = new THREE.ShaderMaterial({
      vertexShader: blackholeVertex,
      fragmentShader: blackholeFragment,
      uniforms: this.uniforms,
      toneMapped: false, // OutputPass tone-maps after bloom
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(this.geometry, this.material)
    mesh.frustumCulled = false
    const scene = new THREE.Scene()
    scene.add(mesh)

    this.composer = new EffectComposer(
      this.renderer,
      new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType }),
    )
    this.composer.addPass(new RenderPass(scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), DEFAULT_PARAMS.bloomStrength, 0.25, 0.4)
    this.composer.addPass(this.bloom)
    this.composer.addPass(new OutputPass())

    this.onResize = () => {
      const cw = host.clientWidth || window.innerWidth
      const ch = host.clientHeight || window.innerHeight
      this.renderer.setSize(cw, ch)
      this.composer.setSize(cw, ch)
      this.camera.aspect = cw / ch
      this.camera.updateProjectionMatrix()
      this.uniforms.uAspect.value = cw / ch
    }
    window.addEventListener('resize', this.onResize)

    installDevtools()
  }

  start(): void {
    this.lastTime = performance.now()
    const tick = () => {
      this.raf = requestAnimationFrame(tick)
      const now = performance.now()
      const dt = Math.min((now - this.lastTime) / 1000, 0.1)
      this.lastTime = now
      const params = useStore.getState().params

      this.controls.autoRotate = params.autoOrbit
      this.controls.update()

      // Camera basis for ray construction
      this.camera.getWorldDirection(this.fwd)
      this.right.crossVectors(this.fwd, this.camera.up).normalize()
      this.up.crossVectors(this.right, this.fwd).normalize()

      const u = this.uniforms
      ;(u.uCamPos.value as THREE.Vector3).copy(this.camera.position)
      ;(u.uCamRight.value as THREE.Vector3).copy(this.right)
      ;(u.uCamUp.value as THREE.Vector3).copy(this.up)
      ;(u.uCamFwd.value as THREE.Vector3).copy(this.fwd)
      u.uTanFov.value = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2)
      u.uAspect.value = this.camera.aspect
      u.uTime.value += dt
      u.uDiskTempK.value = params.diskTempK
      u.uDiskBrightness.value = params.diskBrightness
      u.uDiskOuter.value = params.diskOuter
      u.uStarDensity.value = params.starDensity
      u.uSteps.value = params.steps
      u.uShowDisk.value = params.showDisk ? 1 : 0
      u.uLensing.value = params.lensing ? 1 : 0

      this.bloom.strength = params.bloomStrength
      this.renderer.toneMappingExposure = params.exposure

      this.composer.render()
      this.tickFps()
    }
    this.raf = requestAnimationFrame(tick)
  }

  private tickFps(): void {
    this.frames++
    const now = performance.now()
    const elapsed = now - this.lastFpsAt
    if (elapsed >= 500) {
      useStore.getState().setFps(Math.round((this.frames * 1000) / elapsed))
      this.frames = 0
      this.lastFpsAt = now
    }
  }

  dispose(): void {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.onResize)
    this.controls.dispose()
    this.geometry.dispose()
    this.material.dispose()
    this.composer.dispose()
    this.renderer.dispose()
    if (this.renderer.domElement.parentElement === this.host) {
      this.host.removeChild(this.renderer.domElement)
    }
  }
}
