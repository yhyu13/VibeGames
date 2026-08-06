// engine/postfx.ts — 后处理链（TDD §3.5 / 03 §8.4）
// 管线：RenderPass → UnrealBloomPass → Vignette+血闪 合成 Pass → OutputPass。
// 暴露 setBloomPulse / setVignette / setFlash 三路脉冲式控制（攻击瞬间/命中/焦虑带）。

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/** 03 §8.4 冻结默认：strength 0.55 / threshold 0.75 / radius 0.4 */
export const BLOOM_BASE = 0.55;
export const BLOOM_THRESHOLD = 0.75;
export const BLOOM_RADIUS = 0.4;

const vignetteFlashShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uVig: { value: 0.55 },   // 暗角强度 0..0.75
    uFlash: { value: 0.0 },  // 血闪叠加 0..1（#8B0000，normal blending 不糊屏）
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uVig;
    uniform float uFlash;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      // 暗角：内半径 0.35 / 外半径 0.9（03 §8.4）
      float r = length(vUv - 0.5) * 1.41421;
      float vig = smoothstep(0.35, 0.9, r) * clamp(uVig, 0.0, 0.75);
      c.rgb *= 1.0 - vig;
      // 血闪：normal 混合的全屏血红，不参与 additive
      c.rgb = mix(c.rgb, vec3(0.545, 0.0, 0.0), clamp(uFlash, 0.0, 1.0));
      gl_FragColor = c;
    }
  `,
};

/** 后处理合成器。由 SceneManager 创建并每帧驱动 update + render。 */
export class PostFX {
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private fxPass: ShaderPass;
  private vignetteTarget = 0.55;
  private flashTarget = 0;
  private flashValue = 0;
  private pulse = 0;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ) {
    const w = Math.max(1, Math.floor(renderer.domElement.clientWidth * renderer.getPixelRatio()));
    const h = Math.max(1, Math.floor(renderer.domElement.clientHeight * renderer.getPixelRatio()));
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), BLOOM_BASE, BLOOM_RADIUS, BLOOM_THRESHOLD);
    this.composer.addPass(this.bloom);
    this.fxPass = new ShaderPass(vignetteFlashShader);
    this.composer.addPass(this.fxPass);
    this.composer.addPass(new OutputPass());
  }

  setSize(w: number, h: number): void {
    this.composer.setSize(w, h);
  }

  /** 攻击/谢幕瞬间的 Bloom 脉冲（叠加到基础强度，约 0.3s 回落）。 */
  setBloomPulse(v: number): void {
    this.pulse = Math.max(this.pulse, v);
  }

  /** 暗角目标值（命中 0.55→0.75；焦虑带叠加）。 */
  setVignette(v: number): void {
    this.vignetteTarget = Math.min(0.75, Math.max(0, v));
  }

  /** 血闪目标：0.15s 升入，0.45s 淡出。 */
  setFlash(v: number): void {
    this.flashTarget = Math.max(this.flashTarget, Math.min(0.35, v));
  }

  update(dt: number): void {
    // bloom 脉冲衰减（0.3s）
    this.pulse = Math.max(0, this.pulse - dt * 3.3);
    // 血闪：目标按 0.45s 衰减，实际值按 0.15s 逼近目标
    this.flashTarget = Math.max(0, this.flashTarget - dt * 2.2);
    this.flashValue += (this.flashTarget - this.flashValue) * Math.min(1, dt * 6.7);
    // 暗角为显式目标值（命中脉冲/焦虑带的回落由场景层用 timeline 管理）
    this.bloom.strength = BLOOM_BASE + this.pulse;
    this.fxPass.uniforms.uVig.value = this.vignetteTarget;
    this.fxPass.uniforms.uFlash.value = this.flashValue;
  }

  render(): void {
    this.composer.render();
  }

  dispose(): void {
    this.composer.dispose();
  }
}
