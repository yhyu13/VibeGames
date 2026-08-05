// core/world/world.ts — 世界清单（TDD §5.4 冻结）
// 单一事实源：王座厅边界、标记点、碰撞体、灯光锚点。

import type { WorldManifest } from '../types';

export const WORLD: WorldManifest = {
  roomBounds: {
    min: { x: -18, y: 0, z: -14 },
    max: { x: 18, y: 10, z: 14 },
  },
  thronePos: { x: -8, y: 0, z: 0 },
  stageMarkers: [
    { x: -2, y: 0, z: -4 },
    { x: -2, y: 0, z: 0 },
    { x: -2, y: 0, z: 4 },
  ],
  shadowPath: { from: { x: 18, y: 0, z: 0 }, to: { x: -8, y: 0, z: 0 } },
  colliders: [
    { center: { x: -12, y: 0, z: -8 }, radius: 0.6 },
    { center: { x: -12, y: 0, z: 8 }, radius: 0.6 },
    { center: { x: 10, y: 0, z: -8 }, radius: 0.6 },
    { center: { x: 10, y: 0, z: 8 }, radius: 0.6 },
  ],
  lightAnchors: {
    candle: { x: -8, y: 3.2, z: 3 },
    spot: { x: 0, y: 8, z: 0 },
  },
} as const;
