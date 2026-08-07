/**
 * engine/postfx.ts — UnrealBloom + Vignette
 *
 * M3.3 由 agent-engine 实现。V1 占位:直接 renderer.render,无后处理。
 */

import type { Camera, Scene, WebGLRenderer } from 'three';

export interface PostFxComposer {
  /** 渲染当前帧(V1 直接渲染主场景) */
  render(): void;
  /** 切换 bloom(V1 no-op,M3.3 填 UnrealBloomPass) */
  setBloom(on: boolean): void;
}

/** 装配后处理链(V1 占位) */
export function setupPostfx(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
): PostFxComposer {
  return {
    render: () => {
      renderer.render(scene, camera);
    },
    setBloom: (_on: boolean) => {
      /* TODO M3.3: UnrealBloomPass.enabled */
    },
  };
}
