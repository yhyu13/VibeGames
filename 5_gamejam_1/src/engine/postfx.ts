// engine/postfx.ts — 后处理链：UnrealBloomPass → Vignette → Flash（03 §8.4 / TDD §3.5）
// 暴露 setBloomPulse(v) / setVignette(v) / setFlash(v)，pulse/flash 随帧自动回落。

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { clamp } from '../core/math';

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uInner: { value: 0.35 },
    uOuter: { value: 0.9 },
    uAmount: { value: 0.55 },
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
    uniform float uInner;
    uniform float uOuter;
    uniform float uAmount;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float d = distance(vUv, vec2(0.5));
      float a = smoothstep(uInner, uOuter, d) * uAmount;
      gl_FragColor = vec4(c.rgb * (1.0 - a), 1.0);
    }
  `,
};

const FlashShader = {
  uniforms: {
    tDiffuse: { value: null },
    uColor: { value: new THREE.Color(0x8b0000) },
    uOpacity: { value: 0.0 },
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
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(mix(c.rgb, uColor, uOpacity), 1.0);
    }
  `,
};

export class Postfx {
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private vignette: ShaderPass;
  private flash: ShaderPass;
  private pulse = 0;
  private vignetteBoost = 0;
  private flashLevel = 0;
  private readonly baseStrength = 0.25;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    width: number,
    height: number,
  ) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(width, height), this.baseStrength, 0.6, 0.8);
    this.composer.addPass(this.bloom);
    this.vignette = new ShaderPass(VignetteShader);
    this.composer.addPass(this.vignette);
    this.flash = new ShaderPass(FlashShader);
    this.composer.addPass(this.flash);
    this.composer.addPass(new OutputPass());
  }

  setBloomPulse(v: number): void {
    this.pulse = clamp(this.pulse + v, 0, 1.2);
  }

  setVignette(v: number): void {
    this.vignetteBoost = clamp(this.vignetteBoost + v, 0, 0.5);
  }

  setFlash(v: number): void {
    this.flashLevel = clamp(v, 0, 1);
  }

  update(dt: number): void {
    this.pulse = Math.max(0, this.pulse - dt * 0.8);
    this.vignetteBoost = Math.max(0, this.vignetteBoost - dt * 0.5);
    this.flashLevel = Math.max(0, this.flashLevel - dt * 1.1);
    this.bloom.strength = this.baseStrength + this.pulse;
    this.vignette.uniforms.uAmount.value = 0.55 + this.vignetteBoost;
    this.flash.uniforms.uOpacity.value = this.flashLevel;
  }

  setSize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  render(): void {
    this.composer.render();
  }

  dispose(): void {
    this.composer.dispose();
  }
}
