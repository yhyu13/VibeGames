/**
 * demo/DemoShowcase.ts — 独立体素展示场景(separate demo scene,`?demo` 进入)
 *
 * 体素光线追踪版:场景体素化进 3D 纹理,GPU 片段着色器逐像素 DDA 步进,
 * 真实太阳光 + 软阴影 + 体素 AO + 镜面高光,零 emissive。
 * 太阳方位角缓慢旋转 → 阴影扫过全场(真实灯光巡游)。
 *
 * 与 intro / 战斗完全隔离;OrbitControls 自动环游,拖拽暂停 3s 恢复。
 * 零新增依赖、零运行时资源。
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RaytraceAdapter } from '../engine/raytrace/RaytraceAdapter';
import type { CameraState, LightingState } from '../engine/raytrace/SceneContract';
import { demoScene } from './demoScene';
import type { DemoSnapshot } from './demoScene';

const CAMERA_FOV = 38;
const CAMERA_START: [number, number, number] = [0, 5.5, 17];
const CAMERA_TARGET: [number, number, number] = [0, 1.2, 0];
const RENDER_SCALE = 0.8;

export class DemoShowcase {
  private renderer: THREE.WebGLRenderer | null = null;
  private adapter: RaytraceAdapter<DemoSnapshot> | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;
  private container: HTMLDivElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private raf = 0;
  private lastTime = 0;
  private resumeTimer = 0;
  private readonly lighting: LightingState = {
    sunDir: new THREE.Vector3(0.6, 0.55, 0.6),
    sunColor: new THREE.Color(1, 0.95, 0.85),
    moonDir: new THREE.Vector3(-0.42, 0.3, -0.85),
    moonColor: new THREE.Color(1, 0.95, 0.8),
    moonIntensity: 1,
    ambientScale: 1,
    skyExposure: 1,
  };
  private readonly camState: CameraState = {
    position: new THREE.Vector3(),
    right: new THREE.Vector3(1, 0, 0),
    up: new THREE.Vector3(0, 1, 0),
    fwd: new THREE.Vector3(0, 0, -1),
    tanHalfFov: 1,
  };

  start(): void {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;z-index:1;background:#05060f;';
    document.body.appendChild(container);
    this.container = container;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const adapter = new RaytraceAdapter<DemoSnapshot>(renderer, demoScene, {
      renderScale: RENDER_SCALE,
      maxPixelRatio: 1.25,
    });
    adapter.activate();
    adapter.setSize(width, height);
    this.adapter = adapter;

    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      width / Math.max(1, height),
      0.1,
      200,
    );
    camera.position.set(...CAMERA_START);
    camera.lookAt(...CAMERA_TARGET);
    this.camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_TARGET);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 9;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      this.resumeTimer = 3;
    });
    controls.addEventListener('end', () => {
      this.resumeTimer = 3;
    });
    this.controls = controls;

    this.buildOverlay();

    window.addEventListener('resize', this.onResize);
    this.lastTime = 0;
    const frame = (time: number): void => {
      this.raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, this.lastTime ? (time - this.lastTime) / 1000 : 0);
      this.lastTime = time;
      this.update(dt, time / 1000);
    };
    this.raf = requestAnimationFrame(frame);
  }

  dispose(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    this.controls?.dispose();
    this.adapter?.dispose();
    this.renderer?.dispose();
    this.container?.remove();
    this.overlay?.remove();
    this.renderer = null;
    this.adapter = null;
  }

  private update(dt: number, t: number): void {
    const controls = this.controls;
    if (controls) {
      if (this.resumeTimer > 0) {
        this.resumeTimer -= dt;
        if (this.resumeTimer <= 0) controls.autoRotate = true;
      }
      controls.update();
    }

    const adapter = this.adapter;
    if (!adapter) return;

    // 太阳缓慢旋转 → 阴影扫过全场
    const az = 0.9 + t * 0.05;
    this.lighting.sunDir.set(Math.cos(az) * 0.72, 0.55, Math.sin(az) * 0.72);

    // 相机 → 射线基向量
    const camera = this.camera;
    if (camera) {
      camera.updateMatrixWorld();
      this.camState.position.copy(camera.position);
      this.camState.right.setFromMatrixColumn(camera.matrixWorld, 0);
      this.camState.up.setFromMatrixColumn(camera.matrixWorld, 1);
      this.camState.fwd.setFromMatrixColumn(camera.matrixWorld, 2).negate();
      this.camState.tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    }

    adapter.render({ t }, { lighting: this.lighting }, this.camState, t);
  }

  private buildOverlay(): void {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10;font-family:system-ui,-apple-system,sans-serif;';
    overlay.innerHTML = `
      <div style="position:absolute;top:18px;left:22px;color:#ffd83a;font-weight:600;font-size:15px;letter-spacing:3px;text-shadow:0 0 14px rgba(255,216,58,.5);">
        PATAPON 3D · VOXEL RAY TRACE
      </div>
      <div style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.5);font-size:12px;letter-spacing:1px;text-align:center;">
        DRAG orbit · SCROLL zoom · sun light + voxel shadows
        <br><a href="/" style="color:#3affc8;pointer-events:auto;text-decoration:none;text-shadow:0 0 10px rgba(58,255,200,.5);">EXIT TO INTRO →</a>
      </div>`;
    document.body.appendChild(overlay);
    this.overlay = overlay;
  }

  private readonly onResize = (): void => {
    if (!this.renderer || !this.camera || !this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.adapter?.setSize(w, h);
  };
}
