/**
 * engine/ParticleSystem.ts — 粒子 TTL + matrix
 *
 * M2.1 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { Vec3 } from '../core/types';

export class ParticleSystem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  burst(_position: Vec3, _count: number, _color: string): void {
    /* TODO M2.1: 在 InstancedMesh<BoxGeometry> 中找空闲 instance 写入 */
  }

  update(_dt: number): void {
    /* TODO M2.1: TTL 递减 + 重力 + matrix 写入 */
  }
}
