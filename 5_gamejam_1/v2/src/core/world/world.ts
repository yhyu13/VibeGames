// core/world/world.ts — V2 王座厅世界清单

import type { WorldManifest } from '../types';

export const WORLD: WorldManifest = {
  roomBounds: {
    min: { x: -11, y: 0, z: -7 },
    max: { x: 11, y: 0, z: 9 },
  },
  thronePos: { x: 0, y: 0, z: 6.2 },
  stageMarkers: [
    { x: -4.2, y: 0, z: 2.2 },
    { x: 0.6, y: 0, z: 0.6 },
    { x: 4.4, y: 0, z: 2.6 },
    { x: -2.4, y: 0, z: -1.6 },
    { x: 2.8, y: 0, z: -1.2 },
    { x: 0, y: 0, z: -3.4 },
  ],
  shadowPath: { from: { x: 0, y: 0, z: 16 }, to: { x: 0, y: 0, z: 1.6 } },
  colliders: [
    { center: { x: -8.4, y: 0, z: -2.2 }, radius: 0.55 },
    { center: { x: 8.4, y: 0, z: -2.2 }, radius: 0.55 },
    { center: { x: -7.2, y: 0, z: 4.6 }, radius: 0.55 },
    { center: { x: 7.2, y: 0, z: 4.6 }, radius: 0.55 },
  ],
  lightAnchors: {
    candle: { x: -9.2, y: 1.6, z: 6.4 },
    spot: { x: 0, y: 7.5, z: 2.5 },
  },
  cameraAnchor: { x: 0, y: 3.4, z: -8.2 },
};
