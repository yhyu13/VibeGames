// Scene assembly: scene + ortho rig + lighting + composer.

import { Scene, Color, Fog } from 'three';
import { OrthographicRig } from './OrthographicRig.js';
import { setupLighting } from './Lighting.js';
import { PostFX } from './PostFX.js';
import type { WebGLRenderer } from 'three';

export class GameScene {
  readonly scene: Scene;
  readonly rig: OrthographicRig;
  postFX: PostFX;
  readonly background: Color;

  constructor() {
    this.scene = new Scene();
    this.background = new Color('#050610');
    this.scene.background = this.background;
    this.scene.fog = new Fog(this.background, 20, 80);

    this.rig = new OrthographicRig();
    // postFX is initialized via init() once the renderer exists
    this.postFX = null as unknown as PostFX;
  }

  init(renderer: WebGLRenderer): void {
    this.postFX = new PostFX(renderer, this.rig.camera, this.scene);
    setupLighting(this.scene, renderer);
  }

  resize(width: number, height: number): void {
    this.rig.setViewport(width, height);
    this.postFX.setSize(width, height);
  }

  render(_renderer: WebGLRenderer, instability: number): void {
    this.postFX.updateInstability(instability);
    this.postFX.render(_renderer);
  }
}