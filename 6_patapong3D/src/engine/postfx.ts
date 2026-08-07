/**
 * engine/postfx.ts — UnrealBloom + Vignette
 *
 * M3.3 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { WebGLRenderer, Scene, Camera } from 'three';

export interface PostFxComposer {
  render(): void;
  dispose(): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildComposer(_renderer: WebGLRenderer, _scene: Scene, _camera: Camera): PostFxComposer {
  /* TODO M3.3: EffectComposer + RenderPass + UnrealBloomPass + custom Vignette */
  return {
    render: () => {
      /* fallback: nothing */
    },
    dispose: () => {
      /* nothing */
    },
  };
}
