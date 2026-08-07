/**
 * engine/CameraShake.ts — 镜头震动
 *
 * M2.2 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { Camera } from 'three';

export class CameraShake {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(_intensity: number, _duration: number): void {
    /* TODO M2.2 */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_dt: number, _camera: Camera): void {
    /* TODO M2.2: 随机偏移 lerp 到 camera.position */
  }
}
