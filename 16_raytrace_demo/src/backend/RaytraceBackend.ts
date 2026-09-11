/**
 * src/backend/RaytraceBackend.ts — 后端接缝接口
 *
 * 这个接口是"demo 消费的 raytrace 路径"的最小表面。它把 SceneRenderer 契约
 * (来自 SceneContract.ts)包装成 demo 用得上的形态,并把 WebGL 与未来 WebGPU
 * 实现藏在同一个接口背后,让 main.ts 无需知道当前用哪个后端。
 *
 * 复用而非另造:
 *   - CameraState / VisualState / LightingState 直接来自 SceneContract.ts
 *     (它们已经是 raycast shader 与 SceneRenderer.render 消费的形态)
 *   - TSnapshot 是 demo 自定义的类型(见 src/snapshot.ts 的 RcSnapshot)
 *
 * 一个 RaytraceWebgpuBackend 只要实现这个接口,再换掉 init() 内部的结构即可,
 * 无需改动 main.ts 的调用。
 */

import type {
  CameraState,
  SceneRenderer,
  VoxelSceneBuilder,
  VisualState,
} from '../engine/raytrace/SceneContract';
import type { CapabilityResult } from '../engine/raytrace/capability';
import type { RcSnapshot } from '../snapshot';

export interface RaytraceBackend {
  /** 后端种类:'raytrace'(WebGL2) 或 'webgpu'(未实现) */
  readonly kind: 'raytrace' | 'webgpu';
  /** 能力探测结果(kind/reason/software),供 UI 与调试使用 */
  readonly capability: CapabilityResult;

  /** 构造后调用一次:创建渲染器、挂到容器、激活场景(buildStatic + applySize) */
  init(container: HTMLElement): void;
  /** 每帧渲染:写入动态体素 + 相机/光照 uniform + 绘制 */
  render(snapshot: RcSnapshot, visual: VisualState, camera: CameraState, elapsed: number): void;
  /** 覆盖容器尺寸(含渲染器 devicePixelRatio 与内部渲染分辨率) */
  setSize(width: number, height: number): void;
  /** 质量档位(0..N,见 RaytraceAdapter 阶梯) */
  setQuality(level: number): void;
  /** 释放 GPU 资源 */
  dispose(): void;
}

/**
 * 便捷辅助:把 SceneRenderer 包装成 RaytraceBackend。
 * 这是 WebGL 后端用到的通用接缝 —— 一个渲染适配器 + 一个场景构建器即可换一种后端。
 */
export interface RaytraceBackendDeps<TSnapshot> {
  /** 已创建的渲染适配器(持有 WebGLRenderer 或未来 WebGPU 设备) */
  adapter: SceneRenderer<TSnapshot>;
  /** 场景构建器(静态层 + 动态层) */
  builder: VoxelSceneBuilder<TSnapshot>;
  capability: CapabilityResult;
}
