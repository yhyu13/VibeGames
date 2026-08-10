/**
 * engine/raytrace/introScene.ts — intro 觉醒 cinematic 的 raytrace 体素构建器
 *
 * VoxelSceneBuilder<IntroState> + IntroStageDriver:逻辑状态由
 * engine/introStage.ts 的 IntroStageState 持有(raster 回退共享同一状态机),
 * 本类把每一帧状态画成体素:
 * - 静态层:地形双层(草皮/泥土 + 悬崖边)+ 7 棵树(干/枝/根/双层树冠)。
 *   远山/浮岛/云/日轮不写体素 —— raycaster 着色器的程序化夜空·月亮·远山
 *   取而代之(已批准的夜间方向);树从 z=-16..-19 收进网格 z≈-14.5..-15.5。
 * - 动态层:3 个 patapon(舞蹈姿态:身体 squash + 四肢角度 + 弓)、
 *   boss(暗红椭球 + 腹/口镶嵌 + 金角;弹坑 = EMPTY 镂空 + INTERIOR 腔体)、
 *   箭矢(沿速度方向的杆 + 尖)、碎屑(≤64)。
 *
 * 光照不在这里设置 —— 全部经 VisualState.lighting uniform 驱动(零 emissive)。
 */

import { SCENERY_COUNTS, TERRAIN_LAYOUT } from '../../intro/stageVisuals';
import type { IntroState } from '../../store';
import {
  BOSS_RADII,
  GROUND_Y,
  INTRO_ARMY,
  IntroStageState,
  type ArmyPose,
  type IntroStageCallbacks,
  type IntroStageDriver,
} from '../introStage';
import type { VoxelSceneBuilder } from './SceneContract';
import {
  GRID_MIN,
  GRID_SIZE,
  GRID_STEP,
  MAT,
  fillBox,
  fillEllipsoid,
  fillSphere,
  setVoxel,
} from './VoxelRaycaster';

// ─── 军队配色 → 材质(emerald/gold/blue → lime/gold/teal) ───
function accentMat(accent: number): number {
  switch (accent) {
    case 0x42a878:
      return MAT.FEATHER_LIME;
    case 0x3e78b7:
      return MAT.FEATHER_TEAL;
    default:
      return MAT.FEATHER_GOLD;
  }
}

// ─── 静态层 ───
function buildStatic(g: Uint8Array): void {
  // 地形:草皮层 + 泥土层,边界一格为泥土(悬崖读感)
  const topY = Math.floor((GROUND_Y - GRID_MIN.y) / GRID_STEP);
  const earthY = topY - 1;
  const xMin = TERRAIN_LAYOUT.xMin - 0.5;
  const xMax = TERRAIN_LAYOUT.xMax + 0.5;
  const zMin = TERRAIN_LAYOUT.zMin - 0.5;
  const zMax = TERRAIN_LAYOUT.zMax + 0.5;
  for (let x = 0; x < GRID_SIZE[0]!; x++) {
    for (let z = 0; z < GRID_SIZE[2]!; z++) {
      const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
      const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
      if (wx < xMin || wx > xMax || wz < zMin || wz > zMax) continue;
      const edge =
        wx + GRID_STEP > xMax || wx - GRID_STEP < xMin ||
        wz + GRID_STEP > zMax || wz - GRID_STEP < zMin;
      setVoxel(g, x, topY, z, edge ? MAT.EARTH : MAT.TERRAIN_TOP);
      setVoxel(g, x, earthY, z, MAT.EARTH);
    }
  }

  // 树(7 棵;原 z=-16-(i%3) 超出网格,收进 z=-14.5-(i%3)*0.5)
  const treeX = [-16, -12, -8.5, -4.5, 5, 10.5, 15.5] as const;
  const treeZ = (i: number) => -14.5 - (i % 3) * 0.5;
  for (let i = 0; i < treeX.length; i++) {
    fillBox(g, treeX[i]!, 3.1 + (i % 2) * 0.7, treeZ(i), 0.52, 5, 0.52, MAT.TREE_TRUNK);
  }
  for (let i = 0; i < SCENERY_COUNTS.branches; i++) {
    fillBox(
      g,
      treeX[i % treeX.length]! + (i % 2 ? 1.15 : -1.15),
      6 + (i % 3) * 1.1,
      treeZ(i),
      1.1, 0.24, 0.27,
      MAT.TREE_BRANCH,
    );
  }
  for (let i = 0; i < SCENERY_COUNTS.roots; i++) {
    fillBox(
      g,
      treeX[i % treeX.length]! + (i % 2 ? 0.8 : -0.8),
      -1.2,
      treeZ(i),
      0.9, 0.21, 0.35,
      MAT.TREE_ROOT,
    );
  }
  for (let i = 0; i < SCENERY_COUNTS.canopyClusters; i++) {
    fillBox(
      g,
      treeX[i % treeX.length]! + ((i % 4) - 1.5) * 1.15,
      8.1 + (i % 3) * 1.15,
      treeZ(i),
      1.2, 1.07, 1.05,
      MAT.CANOPY_DARK,
    );
  }
  for (let i = 0; i < 18; i++) {
    fillBox(
      g,
      treeX[i % treeX.length]! + ((i % 3) - 1) * 1.45,
      9.2 + (i % 2),
      treeZ(i) + 0.4,
      0.82, 0.72, 0.8,
      MAT.CANOPY_LIGHT,
    );
  }
}

// ─── patapon(姿态来自 IntroStageState.armyPose) ───
function drawLimb(
  g: Uint8Array,
  px: number,
  py: number,
  pz: number,
  angleZ: number,
  length: number,
): void {
  // rotation.z = a:原 limb 网格指向 -y,旋转后方向 (sin a, -cos a)
  const dx = Math.sin(angleZ);
  const dy = -Math.cos(angleZ);
  for (const t of [0.3, 0.62, 0.94]) {
    fillSphere(g, px + dx * length * t, py + dy * length * t, pz, 0.3, MAT.LIMB);
  }
}

function drawPatapon(
  g: Uint8Array,
  unit: (typeof INTRO_ARMY)[number],
  pose: ArmyPose,
): void {
  // 舞蹈 tap → 轻微 squash(身体旋转在体素下用 squash 近似)
  const sx = 1 - pose.tap * 0.06;
  const sy = 1 + pose.tap * 0.12;
  const x = unit.x;
  const y = pose.y;
  const z = unit.z;

  fillEllipsoid(g, x, y, z, 1.05 * sx, 1.02 * sy, 0.72, MAT.ARMY_BODY);
  fillSphere(g, x, y + 0.05 * sy, z + 0.62, 0.55, MAT.EYE_WHITE);
  fillSphere(g, x + 0.05, y + 0.05 * sy, z + 0.95, 0.22, MAT.PUPIL);

  const feathers: ReadonlyArray<readonly [number, number, number]> = [
    [-0.42, 1.8, MAT.FEATHER_RED],
    [0, 2.05, accentMat(unit.accent)],
    [0.42, 1.82, MAT.FEATHER_GOLD],
  ];
  for (const [px, h, id] of feathers) {
    fillBox(g, x + px, y + ((1.05 + h) / 2) * sy, z, 0.07, ((h - 1.05) / 2) * sy, 0.07, id);
  }

  drawLimb(g, x - 0.92, y + 0.45 * sy, z, pose.leftArmZ, 0.9);
  drawLimb(g, x + 0.92, y + 0.45 * sy, z, pose.rightArmZ, 0.9);
  drawLimb(g, x - 0.43, y - 0.75 * sy, z, pose.leftLegZ, 0.9);
  drawLimb(g, x + 0.43, y - 0.75 * sy, z, pose.rightLegZ, 0.9);

  if (unit.archer) {
    for (let i = -8; i <= 8; i += 2) {
      fillSphere(g, x + 0.9 + Math.abs(i) * 0.045, y + i * 0.15, z + 0.35, 0.26, MAT.BOW_GOLD);
    }
    fillBox(g, x + 0.92, y, z + 0.35, 0.03, 1.2, 0.03, MAT.BOW_GOLD);
  }
}

// ─── boss(暗红;弹坑 = 镂空 + 腔体) ───
function drawBoss(g: Uint8Array, state: IntroStageState): void {
  const bx = state.bossPos.x;
  const by = state.bossPos.y;
  const bz = state.bossPos.z;

  fillEllipsoid(g, bx, by, bz, BOSS_RADII.x, BOSS_RADII.y, BOSS_RADII.z, MAT.BOSS_DARK);
  // 腹部 + 口(camera 侧 +z 镶嵌)
  fillEllipsoid(g, bx, by + 0.5, bz + 1.72, 1.5, 1.4, 0.48, MAT.BELLY);
  fillEllipsoid(g, bx, by + 0.5, bz + 2.12, 0.68, 0.7, 0.3, MAT.MOUTH);
  // 双角(外侧 + 上扬)
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < 15; i++) {
      fillBox(g, bx + side * (1.2 + i * 0.065), by + 2.7 + i * 0.18, bz, 0.16, 0.16, 0.16, MAT.FEATHER_GOLD);
    }
  }
  // 弹坑:先镂空再填腔体(随 bossPos 移动)
  if (state.crater) {
    const cw = state.crater.local;
    const cx = bx + cw.x;
    const cy = by + cw.y;
    const cz = bz + cw.z;
    fillSphere(g, cx, cy, cz, state.crater.radius, MAT.EMPTY);
    fillSphere(g, cx - 0.3, cy, cz, state.crater.radius * 0.62, MAT.INTERIOR);
  }
}

function drawArrow(g: Uint8Array, state: IntroStageState): void {
  if (!state.arrowVisible) return;
  const p = state.arrowPosition;
  const d = state.arrowDirection;
  for (const t of [-0.9, -0.3, 0.3, 0.9]) {
    fillSphere(g, p.x + d.x * t, p.y + d.y * t, p.z + d.z * t, 0.28, MAT.ARROW_WOOD);
  }
  fillSphere(g, p.x + d.x * 1.38, p.y + d.y * 1.38, p.z + d.z * 1.38, 0.28, MAT.ARROW_TIP);
}

export class IntroSceneBuilder implements VoxelSceneBuilder<IntroState>, IntroStageDriver {
  private readonly state: IntroStageState;

  constructor(callbacks: IntroStageCallbacks) {
    this.state = new IntroStageState(callbacks);
  }

  get impact(): number {
    return this.state.impact;
  }

  pulseDance(progress: number): void {
    this.state.pulseDance(progress);
  }

  launch(power?: number): void {
    this.state.launch(power);
  }

  reset(): void {
    this.state.reset();
  }

  update(dt: number, timeMs: number): void {
    this.state.update(dt, timeMs);
  }

  buildStatic(g: Uint8Array): void {
    buildStatic(g);
  }

  drawDynamic(g: Uint8Array, _snapshot: IntroState): void {
    for (let i = 0; i < INTRO_ARMY.length; i++) {
      drawPatapon(g, INTRO_ARMY[i]!, this.state.armyPose[i]!);
    }
    drawBoss(g, this.state);
    drawArrow(g, this.state);
    for (const piece of this.state.debris) {
      if (!piece.active) continue;
      fillSphere(g, piece.p.x, piece.p.y, piece.p.z, Math.max(0.26, piece.size * 0.9), MAT.DEBRIS);
    }
  }
}
