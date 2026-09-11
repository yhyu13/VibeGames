/**
 * src/backend/RaytraceWebglBackend.ts — WebGL2 后端(实际渲染路径)
 *
 * 拥有一个 THREE.WebGLRenderer + 拷贝来的 VoxelRaycaster + 一个 VoxelSceneBuilder。
 * 复用 RaytraceAdapter.ts 的接线方式(它已经是"SceneRenderer 的 raytrace 实现"):
 *   构造:new THREE.WebGLRenderer() → new RaytraceAdapter(renderer, builder)
 *   激活:adapter.activate()(关闭 tone mapping、写静态层、applySize)
 *   每帧:adapter.render(snapshot, visual, camera, elapsed)
 *
 * 只做"初始化/分配/接线",渲染细节全部委托给 RaytraceAdapter —— 不重写任何东西。
 */

import * as THREE from 'three';
import { RaytraceAdapter } from '../engine/raytrace/RaytraceAdapter';
import { probeCapabilities } from '../engine/raytrace/capability';
import type { CapabilityResult } from '../engine/raytrace/capability';
import type { CameraState, VoxelSceneBuilder, VisualState } from '../engine/raytrace/SceneContract';
import type { RaytraceBackend } from './RaytraceBackend';
import type { RcSnapshot } from '../snapshot';

export class RaytraceWebglBackend implements RaytraceBackend {
  readonly kind = 'raytrace' as const;
  readonly capability: CapabilityResult;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly adapter: RaytraceAdapter<RcSnapshot>;

  constructor(builder: VoxelSceneBuilder<RcSnapshot>) {
    this.capability = probeCapabilities();
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.adapter = new RaytraceAdapter<RcSnapshot>(this.renderer, builder);
  }

  /** 后端渲染器对应的 canvas(供 webglcontextlost 监听) */
  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  init(container: HTMLElement): void {
    const el = this.renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.display = 'block';
    container.appendChild(el);
    this.adapter.activate();
    this.applySize(container);
  }

  render(
    snapshot: RcSnapshot,
    visual: VisualState,
    camera: CameraState,
    elapsed: number,
  ): void {
    this.adapter.render(snapshot, visual, camera, elapsed);
  }

  setSize(width: number, height: number): void {
    this.adapter.setSize(Math.max(1, width), Math.max(1, height));
  }

  setQuality(level: number): void {
    this.adapter.setQuality(level);
  }

  dispose(): void {
    this.adapter.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  private applySize(container: HTMLElement): void {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    this.adapter.setSize(w, h);
  }
}
