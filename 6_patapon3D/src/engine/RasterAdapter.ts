/**
 * engine/RasterAdapter.ts — SceneRenderer 的 raster(PBR)回退实现
 *
 * 包装现有 SceneManager(场景/灯光/观众)+ VoxelRenderer(军队/boss/球场)
 * + ParticleSystem + postfx bloom,作为能力探测失败或持续掉帧时的回退路径。
 * 相机完全由引擎经 CameraState 驱动(与 raytrace 同一视角),本适配器只做换算。
 *
 * 质量阶梯:setQuality(level) ≥1 关 bloom(光栅侧无更细档位,
 * 更激进的降级由引擎的 raytrace 阶梯承担,兜底才换到本适配器)。
 */

import type { PerspectiveCamera, WebGLRenderer } from 'three';
import type { SimSnapshot, Vec3 } from '../core/types';
import { ParticleSystem } from './ParticleSystem';
import { setupPostfx } from './postfx';
import type { PostFxComposer } from './postfx';
import { SceneManager } from './SceneManager';
import type { CheerIntensity } from './SceneManager';
import { VoxelRenderer } from './VoxelRenderer';
import type { CameraState, SceneRenderer, VisualState } from './raytrace/SceneContract';

/** 光栅路径 devicePixelRatio 上限(与 intro 一致) */
const MAX_PIXEL_RATIO = 2;

export class RasterAdapter implements SceneRenderer<SimSnapshot> {
  readonly kind = 'raster' as const;

  private readonly renderer: WebGLRenderer;
  private readonly sceneManager = new SceneManager();
  private camera: PerspectiveCamera | null = null;
  private voxel: VoxelRenderer | null = null;
  private particles: ParticleSystem | null = null;
  private composer: PostFxComposer | null = null;
  private qualityLevel = 0;
  private lastElapsed = 0;

  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
  }

  activate(): void {
    // raytrace 曾把 pixelRatio 压到 ≤1.25 且关闭 tone mapping;切回光栅要复位
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    const { scene, camera } = this.sceneManager.attach(this.renderer);
    this.camera = camera;
    this.voxel = new VoxelRenderer(scene);
    this.particles = new ParticleSystem(this.voxel.particleMesh);
    this.composer = setupPostfx(this.renderer, scene, camera);
    this.lastElapsed = 0;
  }

  render(snapshot: SimSnapshot, _visual: VisualState, camera: CameraState, elapsed: number): void {
    if (!this.camera || !this.voxel || !this.composer) return;
    const dt = Math.max(0, elapsed - this.lastElapsed);
    this.lastElapsed = elapsed;

    // CameraState(射线基向量)→ PerspectiveCamera
    this.camera.position.copy(camera.position);
    this.camera.up.copy(camera.up);
    this.camera.lookAt(
      camera.position.x + camera.fwd.x,
      camera.position.y + camera.fwd.y,
      camera.position.z + camera.fwd.z,
    );

    this.voxel.sync(snapshot);
    this.particles?.update(dt);
    this.sceneManager.updateAudience(dt);
    this.composer.setBloom(this.qualityLevel < 1);
    this.composer.render();
  }

  /** 粒子爆发(仅光栅路径有粒子池;raytrace 忽略粒子 juice) */
  spawnBurst(position: Vec3, count: number, color: string): void {
    this.particles?.spawn(position, count, color);
  }

  /** 观众欢呼(仅光栅路径有 instanced 观众) */
  cheer(intensity: CheerIntensity): void {
    this.sceneManager.cheer(intensity);
  }

  setQuality(level: number): void {
    this.qualityLevel = Math.max(0, Math.floor(level));
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
    if (this.camera) {
      this.camera.aspect = width / Math.max(1, height);
      this.camera.updateProjectionMatrix();
    }
    this.composer?.setSize(width, height);
  }

  dispose(): void {
    this.particles?.dispose();
    this.voxel?.dispose();
    this.composer?.dispose();
    this.sceneManager.dispose();
    this.particles = null;
    this.voxel = null;
    this.composer = null;
    this.camera = null;
  }
}
