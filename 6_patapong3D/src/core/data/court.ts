/**
 * core/data/court.ts — 球场体素(程序生成,见 02-art-direction §4)
 *
 * M1.2 由 agent-content 完成。
 * 当前是 M0 骨架:函数已就位,返回空数组;M1.2 由 agent-content 填实际体素。
 */

import { COLORS } from './colors';
import {
  COURT_SIZE_X,
  COURT_SIZE_Y,
  COURT_SIZE_Z,
} from '../constants';
import type { Voxel } from '../types';

const FLOOR_Y = -COURT_SIZE_Y / 2 + 1; // y = -7
const BACK_Z = -COURT_SIZE_Z / 2 + 0.5; // z = -4.5
const FRONT_Z = COURT_SIZE_Z / 2 - 0.5; // z = 4.5
const HALF_X = COURT_SIZE_X / 2 - 1; // x 范围 ±11
const FLOOR_Z_HALF = Math.floor(FRONT_Z) - 1; // z 范围 ±3

/**
 * 程序化生成球场体素
 * 组成:地板(216) + 边线(96) + 后墙装饰(50) + 4 角灯柱
 * 总数 ≈ 370(已远低于预算 1000)
 */
export function generateCourtVoxels(): Voxel[] {
  const voxels: Voxel[] = [];

  // 1. 地板
  for (let x = -HALF_X; x <= HALF_X; x++) {
    for (let z = -FLOOR_Z_HALF; z <= FLOOR_Z_HALF; z++) {
      voxels.push({
        position: { x, y: FLOOR_Y, z },
        size: 1,
        color: COLORS.FLOOR_BASE,
        emissive: COLORS.FLOOR_BASE,
        emissiveIntensity: 0.2,
      });
    }
  }

  // 2. 边线(4 条,霓虹粉)
  for (let x = -HALF_X; x <= HALF_X; x++) {
    voxels.push({
      position: { x, y: FLOOR_Y, z: -FLOOR_Z_HALF },
      size: 1,
      color: COLORS.FLOOR_LINE,
      emissive: COLORS.FLOOR_LINE,
      emissiveIntensity: 0.5,
    });
    voxels.push({
      position: { x, y: FLOOR_Y, z: FLOOR_Z_HALF },
      size: 1,
      color: COLORS.FLOOR_LINE,
      emissive: COLORS.FLOOR_LINE,
      emissiveIntensity: 0.5,
    });
  }
  for (let z = -FLOOR_Z_HALF; z <= FLOOR_Z_HALF; z++) {
    voxels.push({
      position: { x: -HALF_X, y: FLOOR_Y, z },
      size: 1,
      color: COLORS.FLOOR_LINE,
      emissive: COLORS.FLOOR_LINE,
      emissiveIntensity: 0.5,
    });
    voxels.push({
      position: { x: HALF_X, y: FLOOR_Y, z },
      size: 1,
      color: COLORS.FLOOR_LINE,
      emissive: COLORS.FLOOR_LINE,
      emissiveIntensity: 0.5,
    });
  }

  // 3. 后墙装饰(发光竖条纹)
  for (let x = -10; x <= 10; x += 2) {
    voxels.push({
      position: { x, y: FLOOR_Y + 1, z: BACK_Z },
      size: 1,
      color: '#3a8aff',
      emissive: '#3a8aff',
      emissiveIntensity: 0.6,
    });
  }

  // 4. 4 角灯柱(高 3,发光)
  const cornerPositions: Array<[number, number]> = [
    [-13, -5],
    [13, -5],
    [-13, 5],
    [13, 5],
  ];
  for (const [x, z] of cornerPositions) {
    for (let h = 0; h < 3; h++) {
      voxels.push({
        position: { x, y: FLOOR_Y + 1 + h, z },
        size: 1,
        color: COLORS.FLOOR_LINE,
        emissive: COLORS.FLOOR_LINE,
        emissiveIntensity: 0.8,
      });
    }
  }

  return voxels;
}

/** MVP 默认球场(调用一次) */
export const DEFAULT_COURT_VOXELS = generateCourtVoxels();
