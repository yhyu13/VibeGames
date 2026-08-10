/**
 * engine/raytrace/RaytraceAdapter.ts — SceneRenderer 的 raytrace 实现
 *
 * 持有一个场景无关的 VoxelRaycaster + 一个 VoxelSceneBuilder(场景内容):
 * 每帧 beginDynamic → builder.drawDynamic → commitDynamic → 相机/光照 uniform → 绘制。
 *
 * 质量阶梯(setQuality level,对应设计文档降级顺序的前几步;
 * 超范围由引擎换成 raster 适配器):
 *   0:全质量(scale 1.0,5-tap 阴影,逐帧上传)
 *   1:内部渲染分辨率 0.8
 *   2:内部渲染分辨率 0.66
 *   3:水面降级(Phase 5 接入:waves 3→1、反射降质;当前为占位)
 *   4:阴影 5-tap → 1-tap
 *   5:动态网格隔帧上传
 */

import * as THREE from 'three';
import type { CameraState, SceneRenderer, VisualState, VoxelSceneBuilder } from './SceneContract';
import { VoxelRaycaster } from './VoxelRaycaster';

export interface RaytraceAdapterOptions {
  /** 初始内部渲染分辨率倍率(默认 1) */
  renderScale?: number;
  /** devicePixelRatio 上限(默认 1.25,与 demo 一致) */
  maxPixelRatio?: number;
}

export class RaytraceAdapter<TSnapshot> implements SceneRenderer<TSnapshot> {
  readonly kind = 'raytrace' as const;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly raycaster: VoxelRaycaster;
  private readonly builder: VoxelSceneBuilder<TSnapshot>;
  private readonly maxPixelRatio: number;
  private renderScale: number;
  private qualityLevel = 0;
  private cssWidth = 1;
  private cssHeight = 1;

  constructor(
    renderer: THREE.WebGLRenderer,
    builder: VoxelSceneBuilder<TSnapshot>,
    options: RaytraceAdapterOptions = {},
  ) {
    this.renderer = renderer;
    this.builder = builder;
    this.raycaster = new VoxelRaycaster();
    this.renderScale = options.renderScale ?? 1;
    this.maxPixelRatio = options.maxPixelRatio ?? 1.25;
  }

  activate(): void {
    // 光线追踪在 shader 内做 ACES,renderer 必须关闭 tone mapping
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.maxPixelRatio));
    this.raycaster.writeStatic((grid) => this.builder.buildStatic(grid));
    this.applySize();
  }

  render(snapshot: TSnapshot, visual: VisualState, camera: CameraState, elapsed: number): void {
    const grid = this.raycaster.beginDynamic();
    this.builder.drawDynamic(grid, snapshot, visual, elapsed);
    this.raycaster.commitDynamic();
    this.raycaster.setTime(elapsed);
    this.raycaster.setLighting(visual.lighting);
    this.raycaster.setCamera(camera.position, camera.right, camera.up, camera.fwd, camera.tanHalfFov);
    this.raycaster.render(this.renderer);
  }

  setQuality(level: number): void {
    this.qualityLevel = Math.max(0, Math.min(5, Math.floor(level)));
    const l = this.qualityLevel;
    this.renderScale = l >= 2 ? 0.66 : l >= 1 ? 0.8 : 1.0;
    // level 3:水面降级(反射跳过体素 DDA 只取天空/远山,波浪 3→1 层)
    this.raycaster.setWaterQuality(l >= 3 ? 0 : 1, l >= 3 ? 1 : 3);
    this.raycaster.setShadowTaps(l >= 4 ? 1 : 5);
    this.raycaster.setDynamicUploadInterval(l >= 5 ? 2 : 1);
    this.applySize();
  }

  setSize(width: number, height: number): void {
    this.cssWidth = Math.max(1, width);
    this.cssHeight = Math.max(1, height);
    this.applySize();
  }

  dispose(): void {
    this.raycaster.dispose();
  }

  private applySize(): void {
    const w = Math.max(1, Math.round(this.cssWidth * this.renderScale));
    const h = Math.max(1, Math.round(this.cssHeight * this.renderScale));
    this.renderer.setSize(w, h, false);
    const el = this.renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    this.raycaster.setSize(el.width, el.height);
  }
}
