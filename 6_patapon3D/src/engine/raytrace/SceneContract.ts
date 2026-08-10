/**
 * engine/raytrace/SceneContract.ts — 共享渲染适配契约
 *
 * 设计来源:docs/design/2026-08-10-global-voxel-raytrace-water-design.md
 * - VoxelRaycaster 是 intro / gameplay 共用的渲染适配器,core 模拟保持渲染无关。
 * - 渲染器消费 snapshot + 视觉/相机状态;能力探测失败或持续掉帧时切换到
 *   现有 raster PBR 适配器,且 gameplay 状态不得重置。
 *
 * 本文件只定义契约,不依赖具体渲染实现。
 */

import type * as THREE from 'three';

/** 相机状态(射线基向量形式,raytrace 直接消费;raster 可由 PerspectiveCamera 换算) */
export interface CameraState {
  position: THREE.Vector3;
  right: THREE.Vector3;
  up: THREE.Vector3;
  fwd: THREE.Vector3;
  tanHalfFov: number;
}

/** 光照状态:全部亮度来自太阳/环境/天空,无 emissive。intro 明暗节拍只改这些 uniform */
export interface LightingState {
  sunDir: THREE.Vector3;
  sunColor: THREE.Color;
  moonDir: THREE.Vector3;
  moonColor: THREE.Color;
  /** 月亮强度 0..1(intro 觉醒节拍可调) */
  moonIntensity: number;
  /** 半球环境光倍率(intro 压暗用) */
  ambientScale: number;
  /** 天空/远山/雾曝光倍率(intro 压暗用) */
  skyExposure: number;
}

/** 渲染器-only 的每帧视觉状态(不含任何模拟数据) */
export interface VisualState {
  lighting: LightingState;
}

/**
 * 体素场景构建器:把某一时刻的场景画进材质 ID 网格。
 * static 只在场景切换时构建一次;dynamic 每帧(或按上传节流)重画。
 */
export interface VoxelSceneBuilder<TSnapshot> {
  buildStatic(grid: Uint8Array): void;
  drawDynamic(grid: Uint8Array, snapshot: TSnapshot, visual: VisualState, elapsed: number): void;
}

/**
 * 渲染适配器。引擎持有一个实例;能力/看门狗切换时整体替换,不触碰 Simulation。
 * setQuality(level):0 全质量,逐级降级(见 RaytraceAdapter 的阶梯);超出 raytrace
 * 阶梯范围时由引擎换成 raster 适配器。
 */
export interface SceneRenderer<TSnapshot> {
  readonly kind: 'raytrace' | 'raster';
  /** 构造后调用一次:应用 renderer 级状态(tone mapping 等)并构建静态场景 */
  activate(): void;
  render(snapshot: TSnapshot, visual: VisualState, camera: CameraState, elapsed: number): void;
  setQuality(level: number): void;
  setSize(width: number, height: number): void;
  dispose(): void;
}
