// Post-FX chain: RenderPass + Selective Bloom + Halftone + Chromatic + Grain + Output.

import { Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { Scene, Camera, WebGLRenderer } from 'three';
import halftoneFrag from '../shaders/postfx/halftone.frag?raw';
import chromaticFrag from '../shaders/postfx/chromatic.frag?raw';
import grainFrag from '../shaders/postfx/grain.frag?raw';

export class PostFX {
  readonly composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private halftonePass: ShaderPass;
  private chromaticPass: ShaderPass;
  private grainPass: ShaderPass;
  private lastInstability = 0;

  constructor(renderer: WebGLRenderer, camera: Camera, scene: Scene) {
    const composer = new EffectComposer(renderer);
    this.composer = composer;

    composer.addPass(new RenderPass(scene, camera));

    this.bloom = new UnrealBloomPass(new Vector2(1, 1), 0.7, 0.4, 0.85);
    composer.addPass(this.bloom);

    this.halftonePass = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, intensity: { value: 0.05 }, resolution: { value: new Vector2(1, 1) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: halftoneFrag,
    });
    composer.addPass(this.halftonePass);

    this.chromaticPass = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, intensity: { value: 0.0 }, resolution: { value: new Vector2(1, 1) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: chromaticFrag,
    });
    composer.addPass(this.chromaticPass);

    this.grainPass = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, time: { value: 0 }, intensity: { value: 0.05 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: grainFrag,
    });
    composer.addPass(this.grainPass);

    composer.addPass(new OutputPass());
  }

  setSize(width: number, height: number): void {
    this.composer.setSize(width, height);
    this.halftonePass.uniforms['resolution']!.value = new Vector2(width, height);
    this.chromaticPass.uniforms['resolution']!.value = new Vector2(width, height);
  }

  updateInstability(value: number): void {
    this.lastInstability = value;
    this.chromaticPass.uniforms['intensity']!.value = value * 0.015;
    this.halftonePass.uniforms['intensity']!.value = 0.05 + value * 0.15;
    this.grainPass.uniforms['intensity']!.value = 0.04 + value * 0.08;
    this.grainPass.uniforms['time']!.value = performance.now() / 1000;
  }

  render(renderer: WebGLRenderer): void {
    this.composer.render();
  }

  get instability(): number { return this.lastInstability; }
}