export const TERRAIN_LAYOUT = {
  xMin: -18,
  xMax: 18,
  zMin: -5,
  zMax: 6,
  tilePitch: 1,
  tileFootprint: 1.04,
  topThickness: 0.32,
  earthDepth: 1.35,
} as const;

export const SCENERY_COUNTS = {
  trees: 7,
  branches: 18,
  roots: 14,
  canopyClusters: 28,
  floatingIslands: 5,
  mountainLayers: 3,
  clouds: 9,
} as const;

export const MIN_SCENERY_COUNTS = {
  trees: 6,
  branches: 12,
  roots: 10,
  canopyClusters: 20,
  floatingIslands: 4,
  mountainLayers: 3,
  clouds: 7,
} as const;
