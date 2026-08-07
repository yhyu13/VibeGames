/**
 * engine/VoxelRenderer.ts — InstancedMesh 管理(4 个 mesh: court/paddle/ball/particle)
 *
 * M1.4 由 agent-engine 实现。当前是 M0 骨架。
 */

import type { SimSnapshot } from '../core/types';

export class VoxelRenderer {
  // TODO M1.4: 实例化 4 个 InstancedMesh
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sync(_snap: SimSnapshot): void {
    /* M1.4: 写 matrix 到 InstancedMesh */
  }

  dispose(): void {
    /* M1.4: 释放 */
  }
}
