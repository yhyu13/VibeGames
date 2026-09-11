/**
 * src/scene/demoWorld.ts — 独立演示场景(VoxelSceneBuilder)
 *
 * 只依赖本仓库 src/engine/raytrace 下的拷贝文件(fillBox/fillSphere/fillEllipsoid/
 * MAT/GRID_*),不从 6_patapon3D 引入任何内容(introScene/store/stageVisuals 一概不用)。
 *
 * 内容:
 *   - 滚动程序化地形(正弦叠加 + 少量人为隆起,TERRAIN_TOP/EARTH)
 *   - 一个大型体素"太阳日轮"(高空金橙光球,演示一张体素几何在阳光直射下的受光)
 *   - 一座体素城堡 + 一小簇树(演示 sun/moon 光照与硬阴影)
 *   - drawDynamic 每帧驱动 visual.lighting 的昼夜循环(太阳/月亮/环境/天空曝光)
 */

import type { VoxelSceneBuilder, VisualState } from '../engine/raytrace/SceneContract';
import {
  MAT,
  fillBox,
  fillSphere,
  setVoxel,
  GRID_MIN,
  GRID_STEP,
} from '../engine/raytrace/VoxelRaycaster';
import { updateLightingState } from '../snapshot';
import type { RcSnapshot } from '../snapshot';

/** 把世界坐标量转到体素网格索引(与 fillBox 内部一致) */
function w2i(v: number, min: number): number {
  return Math.floor((v - min) / GRID_STEP);
}

const TERRAIN_TOP = MAT.TERRAIN_TOP;
const EARTH = MAT.EARTH;
const TREE_TRUNK = MAT.TREE_TRUNK;
const CANOPY_DARK = MAT.CANOPY_DARK;
const CANOPY_LIGHT = MAT.CANOPY_LIGHT;
const BRICK = MAT.BOSS_BODY; // 城堡砖(深红)
const GOLD = MAT.HORN; // 塔尖 / 细节(金)
const WINDOW = MAT.EYE_WHITE; // 窗户亮点
const DOOR = MAT.BOW_GOLD; // 门洞(金)
const SUN_CORE = MAT.RING_PATA; // 太阳日轮核心(亮青)
const SUN_CORONA = MAT.FEATHER_GOLD; // 太阳日轮光晕(金)

/** 地形高度:程序化起伏 + 两块人工隆起 + 中心压平整块城堡地基 */
function terrainH(x: number, z: number): number {
  let h =
    Math.sin(x * 0.4) * 0.9 +
    Math.cos(z * 0.35) * 0.8 +
    Math.sin((x + z) * 0.18) * 0.6 +
    Math.cos(Math.hypot(x, z) * 0.55) * 0.5;
  const h1 = Math.hypot(x - 9, z + 6);
  h += Math.max(0, 2.6 - h1 * 0.5) * 1.4;
  const h2 = Math.hypot(x + 11, z - 5);
  h += Math.max(0, 2.2 - h2 * 0.45) * 1.2;
  const center = Math.hypot(x, z + 2);
  if (center < 6) h *= 0.25;
  return h;
}

/** 在某 xz 格子把地形从底部填充到表面高度(顶面用 TERRAIN_TOP,以下是 EARTH) */
function paintTerrain(g: Uint8Array, x: number, z: number): void {
  const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
  const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
  const topY = terrainH(wx, wz);
  const topI = Math.max(0, w2i(topY, GRID_MIN.y));
  for (let y = 0; y <= topI; y++) {
    setVoxel(g, x, y, z, y === topI ? TERRAIN_TOP : EARTH);
  }
}

/** 简单体素树(树干 + 双层球冠) */
function paintTree(g: Uint8Array, wx: number, wz: number, scale: number): void {
  const baseY = terrainH(wx, wz);
  const trunkH = 3 * scale;
  fillBox(g, wx, baseY + trunkH / 2, wz, 0.5 * scale, trunkH / 2, 0.5 * scale, TREE_TRUNK);
  const canopyY = baseY + trunkH + 1.2 * scale;
  fillSphere(g, wx, canopyY, wz, 2.0 * scale, CANOPY_DARK);
  fillSphere(g, wx + 0.8 * scale, canopyY + 0.6 * scale, wz - 0.5 * scale, 1.3 * scale, CANOPY_LIGHT);
  fillSphere(g, wx - 0.7 * scale, canopyY + 0.3 * scale, wz + 0.6 * scale, 1.1 * scale, CANOPY_LIGHT);
}

/** 体素城堡:方形主体 + 中央主塔 + 四角角楼 + 城垛 + 窗/门 */
function paintCastle(g: Uint8Array, wx: number, wz: number): void {
  const baseY = terrainH(wx, wz);
  const bodyH = 6;
  const bodyHalf = 5;
  fillBox(g, wx, baseY + bodyH / 2, wz, bodyHalf, bodyH / 2, bodyHalf, BRICK);

  const topY = baseY + bodyH;
  // 城垛
  for (let ix = -bodyHalf; ix <= bodyHalf; ix += 2) {
    fillBox(g, wx + ix, topY + 0.6, wz - bodyHalf + 0.5, 1, 0.6, 1, BRICK);
    fillBox(g, wx + ix, topY + 0.6, wz + bodyHalf - 0.5, 1, 0.6, 1, BRICK);
    fillBox(g, wx - bodyHalf + 0.5, topY + 0.6, wz + ix, 1, 0.6, 1, BRICK);
    fillBox(g, wx + bodyHalf - 0.5, topY + 0.6, wz + ix, 1, 0.6, 1, BRICK);
  }
  // 中央主塔 + 金塔尖
  const towerR = 1.5;
  const towerH = 4.5;
  fillBox(g, wx, topY + towerH / 2, wz, towerR, towerR, towerR, BRICK);
  fillBox(g, wx, topY + towerH + 0.4, wz, towerR, 0.4, towerR, GOLD);
  // 窗户(四个面亮窗 + 金色门洞)
  fillBox(g, wx, topY - 1.5, wz - bodyHalf, 0.5, 0.6, 0.5, WINDOW);
  fillBox(g, wx + 2.5, topY - 1.5, wz - bodyHalf, 0.5, 0.6, 0.5, WINDOW);
  fillBox(g, wx - 2.5, topY - 1.5, wz - bodyHalf, 0.5, 0.6, 0.5, WINDOW);
  fillBox(g, wx, topY - 1.5, wz + bodyHalf, 0.5, 0.6, 0.5, WINDOW);
  fillBox(g, wx, baseY + 1, wz + bodyHalf + 0.2, 0.9, 1, 0.4, DOOR);
  // 四角角楼(显式写四个角,规避 noUncheckedIndexedAccess 对元组解构的报错)
  const corner = bodyHalf - 0.5;
  const corners: Array<[number, number]> = [
    [-corner, -corner],
    [corner, -corner],
    [-corner, corner],
    [corner, corner],
  ];
  for (const cornerPos of corners) {
    const sx = cornerPos[0];
    const sz = cornerPos[1];
    fillBox(g, wx + sx, topY + 1, wz + sz, 0.9, 1, 0.9, BRICK);
    fillBox(g, wx + sx, topY + 1.9, wz + sz, 0.5, 0.4, 0.5, GOLD);
  }
  // 门前台阶
  fillBox(g, wx, baseY + 0.3, wz + bodyHalf - 1, bodyHalf - 1.6, 0.3, 1, MAT.FLOOR);
}

/**
 * 演示场景构建器。buildStatic 一次生成地形 + 城堡 + 树簇 + 日轮;
 * drawDynamic 每帧驱动昼夜光照(不修改静态体素,只改 visual.lighting)。
 */
export const demoWorld: VoxelSceneBuilder<RcSnapshot> = {
  buildStatic(grid: Uint8Array): void {
    for (let x = 0; x < 320; x++) {
      for (let z = 0; z < 224; z++) {
        paintTerrain(grid, x, z);
      }
    }
    paintCastle(grid, 2, -3);
    // 树簇
    paintTree(grid, -7, -6, 1.1);
    paintTree(grid, 8, 3, 0.9);
    paintTree(grid, -9, 4, 0.8);
    paintTree(grid, 6, -9, 1.0);
    paintTree(grid, -4, 8, 0.85);
    // 大型体素日轮(高空):核心亮青 + 金色光晕 —— 体素几何在阳光直射下的演示
    fillSphere(grid, 8, 10.5, -10, 1.8, SUN_CORE);
    fillSphere(grid, 8, 10.5, -10, 2.2, SUN_CORONA);
  },

  drawDynamic(grid: Uint8Array, snapshot: RcSnapshot, visual: VisualState, _elapsed: number): void {
    // 光照由 demo 驱动:昼夜循环(sunDir/sunColor/moonDir/moonColor/
    // moonIntensity/ambientScale/skyExposure 全部从 snapshot.time 计算)
    updateLightingState(visual.lighting, snapshot);
    // 静态体素无需每帧重画;演示动画可在此处继续扩展。
    void grid;
    void _elapsed;
  },
};
