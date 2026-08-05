import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const BLOOM_STRENGTH = 0.75;
export const BLOOM_RADIUS = 0.6;
export const BLOOM_THRESHOLD = 0.85;

export class PostFX {
  readonly composer: EffectComposer;
  readonly bloomPass: UnrealBloomPass;
  private readonly smaaPass: SMAAPass;
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
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      BLOOM_STRENGTH,
      BLOOM_RADIUS,
      BLOOM_THRESHOLD
    );
    this.composer.addPass(this.bloomPass);
    this.smaaPass = new SMAAPass(width, height);
    this.composer.addPass(this.smaaPass);
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
    this.bloomPass.dispose();
    this.smaaPass.dispose();
    this.outputPass.dispose();
  }
}
