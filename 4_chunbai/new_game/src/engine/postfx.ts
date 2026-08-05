import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// 纯白枪骑兵原版无后处理 Bloom；保留 SMAA（仅作抗锯齿），整体走 Flash 平面风格。
// 这些常量保留以便外部代码不报错，但不再被任何 Pass 引用。
export const BLOOM_STRENGTH = 0;
export const BLOOM_RADIUS = 0;
export const BLOOM_THRESHOLD = 1;

export class PostFX {
  readonly composer: EffectComposer;
  private readonly outputPass: OutputPass;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    width: number,
    height: number
  ) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
    this.composer.setSize(width, height);
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  render(deltaTime?: number) {
    this.composer.render(deltaTime);
  }

  dispose() {
    this.composer.dispose();
    this.outputPass.dispose();
  }
}
