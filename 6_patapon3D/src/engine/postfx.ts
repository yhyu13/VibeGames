/**
 * engine/postfx.ts — UnrealBloom + Output 后处理链
 *
 * M3.3 由 agent-engine 实现:EffectComposer + RenderPass + UnrealBloomPass + OutputPass,
 * setBloom 切换 UnrealBloomPass.enabled(性能降级 'BLOOM_OFF' 用)。
 */

import { Vector2 } from 'three';
import type { Camera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/** UnrealBloom 参数(02-art-direction §7.1,threshold 0.7 取高亮主体) */
const BLOOM_STRENGTH = 0.6;
const BLOOM_RADIUS = 0.6;
const BLOOM_THRESHOLD = 0.7;

export interface PostFxComposer {
  /** 渲染当前帧(走后处理链) */
  render(): void;
  /** 切换 bloom 开关(幂等,每帧调用) */
  setBloom(on: boolean): void;
  /** 画布尺寸变化时同步 composer 缓冲 */
  setSize(width: number, height: number): void;
  /** 释放 composer 渲染目标 */
  dispose(): void;
}

/** 可选 bloom 参数覆盖(默认见上方常量) */
export interface BloomOptions {
  strength?: number;
  radius?: number;
  threshold?: number;
}

/** 装配后处理链:RenderPass → UnrealBloomPass → OutputPass */
export function setupPostfx(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  options: BloomOptions = {},
): PostFxComposer {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new Vector2(renderer.domElement.width, renderer.domElement.height),
    options.strength ?? BLOOM_STRENGTH,
    options.radius ?? BLOOM_RADIUS,
    options.threshold ?? BLOOM_THRESHOLD,
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  composer.setSize(renderer.domElement.width, renderer.domElement.height);

  return {
    render: () => {
      composer.render();
    },
    setBloom: (on: boolean) => {
      bloom.enabled = on;
    },
    setSize: (width: number, height: number) => {
      composer.setSize(width, height);
    },
    dispose: () => {
      composer.dispose();
    },
  };
}
