/**
 * engine/SceneManager.ts — scene + camera + lights(占位)
 *
 * M1.4 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { Scene, Camera, WebGLRenderer } from 'three';

export class SceneManager {
  // TODO M1.4: 实例化 scene / camera / lights
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attach(_renderer: WebGLRenderer): { scene: Scene; camera: Camera } {
    throw new Error('TODO M1.4: SceneManager.attach');
  }
}
