/**
 * engine/ParticleSystem.ts — 粒子 TTL + matrix
 *
 * M2.1 由 agent-engine 实现。V1 骨架:共享 VoxelRenderer 的粒子池,暂不激活粒子。
 */

import type { InstancedMesh } from 'three';
import type { Vec3 } from '../core/types';

export class ParticleSystem {
  /** 与 VoxelRenderer 共享的粒子 InstancedMesh(256 池,V2 由本类写矩阵) */
  readonly mesh: InstancedMesh;

  constructor(mesh: InstancedMesh) {
    this.mesh = mesh;
  }

  /** 在池中找空闲实例写粒子(V2 填充:TTL + 颜色) */
  spawn(_position: Vec3, _count: number, _color: string): void {
    /* TODO M2.1: 激活池中粒子 */
  }

  /** 每帧推进粒子 TTL / 重力 / matrix(V2 填充) */
  update(_dt: number): void {
    /* TODO M2.1: TTL 递减 + 重力 + matrix 写入 */
  }

  dispose(): void {
    /* V1: 无自持资源 */
  }
}
