/**
 * demo/demoScene.ts — `?demo` 展示场景内容(从 VoxelRaycaster 抽取)
 *
 * 舞台圆盘 + 四色霓虹环 + 12 观众(静态层);
 * 鼓垫脉冲 + 军队上下浮 + boss 呼吸侧移(动态层,按 snap.t 驱动)。
 * 渲染核心在 engine/raytrace/VoxelRaycaster.ts,本文件只描述场景。
 */

import type { VoxelSceneBuilder } from '../engine/raytrace/SceneContract';
import {
  GRID_MIN,
  GRID_SIZE,
  GRID_STEP,
  MAT,
  fillBox,
  fillEllipsoid,
  fillSphere,
  setVoxel,
} from '../engine/raytrace/VoxelRaycaster';

/** demo 场景的 snapshot:仅一个时间轴(原 animate(dt, t) 的 t) */
export interface DemoSnapshot {
  t: number;
}

// ─── 舞台 / 军队 / boss 数据 ───
const STAGE_RADIUS = 9.5;
const FLOOR_Y = -2.25;
const PAD_Z = 3.4;
const PAD_X = [-4.5, -1.5, 1.5, 4.5] as const;
const PAD_ID = [MAT.PAD_PATA, MAT.PAD_PON, MAT.PAD_DON, MAT.PAD_CHAKA] as const;
const ARMY_ROOT_Y = -0.35;
const ARMY = [
  { x: -7.9, z: 0.8, accent: MAT.FEATHER_CYAN },
  { x: -6.8, z: -1.1, accent: MAT.FEATHER_LIME },
  { x: -5.4, z: 0.9, accent: MAT.FEATHER_TEAL },
] as const;
const BOSS_X = 6.8;
const BOSS_Y = 0.55;
const BOSS_Z = -0.3;
const HORN_BOXES = [
  { dz: 1.15, dy: 2.8, hx: 0.22, hy: 0.75 },
  { dz: 1.3, dy: 3.7, hx: 0.19, hy: 0.7 },
  { dz: 1.45, dy: 4.6, hx: 0.16, hy: 0.6 },
] as const;
const AUDIENCE_Y = [-1.72, -1.02, -0.32] as const;

function audId(color: string): number {
  switch (color) {
    case '#3affc8':
      return MAT.AUD_PATA;
    case '#ffd83a':
      return MAT.AUD_PON;
    case '#3a8aff':
      return MAT.AUD_DON;
    default:
      return MAT.AUD_CHAKA;
  }
}

// ─── 静态场景(地面 + 舞台 + 霓虹环 + 观众) ───
function buildStatic(g: Uint8Array): void {
  // 地面层(全场)
  for (let x = 0; x < GRID_SIZE[0]!; x++) {
    for (let z = 0; z < GRID_SIZE[2]!; z++) {
      setVoxel(g, x, 0, z, MAT.GROUND);
    }
  }
  // 舞台圆盘 + 四色霓虹环
  const iy = Math.floor((FLOOR_Y - GRID_MIN.y) / GRID_STEP);
  for (let x = 0; x < GRID_SIZE[0]!; x++) {
    for (let z = 0; z < GRID_SIZE[2]!; z++) {
      const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
      const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
      if (wx * wx + wz * wz > STAGE_RADIUS * STAGE_RADIUS) continue;
      const edge =
        (wx + GRID_STEP) * (wx + GRID_STEP) + wz * wz > STAGE_RADIUS * STAGE_RADIUS ||
        (wx - GRID_STEP) * (wx - GRID_STEP) + wz * wz > STAGE_RADIUS * STAGE_RADIUS ||
        wx * wx + (wz + GRID_STEP) * (wz + GRID_STEP) > STAGE_RADIUS * STAGE_RADIUS ||
        wx * wx + (wz - GRID_STEP) * (wz - GRID_STEP) > STAGE_RADIUS * STAGE_RADIUS;
      if (edge) {
        const quadrant = Math.floor(((Math.atan2(wz, wx) + Math.PI + Math.PI / 4) % (Math.PI * 2)) / (Math.PI / 2));
        setVoxel(g, x, iy, z, MAT.RING_PATA + quadrant);
      } else {
        setVoxel(g, x, iy, z, MAT.FLOOR);
      }
    }
  }
  // 观众(12 个 mini 体素)
  for (let i = 0; i < 12; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const color = ['#3affc8', '#ffd83a', '#3a8aff', '#ff3a8a'][col]!;
    fillBox(g, -5.5 + col * 3.6, AUDIENCE_Y[row]!, -5.5, 0.275, 0.275, 0.275, audId(color));
  }
}

// ─── 动态绘制(鼓垫脉冲 + 军队上下浮 + boss 呼吸) ───
function drawPatapon(g: Uint8Array, x: number, rootY: number, z: number, accent: number): void {
  fillEllipsoid(g, x, rootY, z, 1.05, 1.02, 0.72, MAT.ARMY_BODY);
  fillSphere(g, x, rootY + 0.05, z + 0.62, 0.55, MAT.EYE_WHITE);
  fillSphere(g, x, rootY + 0.05, z + 1.0, 0.15, MAT.PUPIL);
  const feathers: ReadonlyArray<readonly [number, number, number]> = [
    [-0.42, 1.8, MAT.FEATHER_RED],
    [0, 2.05, accent],
    [0.42, 1.82, MAT.FEATHER_GOLD],
  ];
  for (const [px, h, id] of feathers) {
    fillBox(g, x + px, rootY + (1.05 + h) / 2, z, 0.07, (h - 1.05) / 2, 0.07, id);
  }
  fillBox(g, x - 0.92, rootY + 0.05, z, 0.08, 0.45, 0.08, MAT.LIMB);
  fillBox(g, x + 0.92, rootY + 0.05, z, 0.08, 0.45, 0.08, MAT.LIMB);
  fillBox(g, x - 0.43, rootY - 1.15, z, 0.08, 0.6, 0.08, MAT.LIMB);
  fillBox(g, x + 0.43, rootY - 1.15, z, 0.08, 0.6, 0.08, MAT.LIMB);
}

function drawBoss(g: Uint8Array, bx: number, breath: number): void {
  fillEllipsoid(g, bx, BOSS_Y, BOSS_Z, 3.2, 4.45 * breath, 2.15, MAT.BOSS_BODY);
  for (const side of [-1, 1] as const) {
    for (const horn of HORN_BOXES) {
      fillBox(g, bx, BOSS_Y + horn.dy, BOSS_Z + side * horn.dz, horn.hx, horn.hy, horn.hx, MAT.HORN);
    }
  }
  fillSphere(g, bx - 3.15, 1.3, -0.95, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.15, 1.3, 0.35, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.5, 1.3, -0.95, 0.17, MAT.BOSS_PUPIL);
  fillSphere(g, bx - 3.5, 1.3, 0.35, 0.17, MAT.BOSS_PUPIL);
}

export const demoScene: VoxelSceneBuilder<DemoSnapshot> = {
  buildStatic,

  drawDynamic(g, snap) {
    const t = snap.t;
    // 鼓垫厚度脉冲
    for (let i = 0; i < 4; i++) {
      const phase = 0.5 + 0.5 * Math.sin(t * 1.8 - i * Math.PI * 0.5);
      fillBox(g, PAD_X[i]!, FLOOR_Y + 0.7, PAD_Z, 0.675, 0.12 + 0.06 * phase, 0.675, PAD_ID[i]!);
    }
    // 军队上下浮动
    ARMY.forEach((unit, i) => {
      const rootY = ARMY_ROOT_Y + 0.06 * Math.sin(t * 2.2 + i * 2.1);
      drawPatapon(g, unit.x, rootY, unit.z, unit.accent);
    });
    // boss 呼吸 + 侧移
    const bx = BOSS_X + 0.05 * Math.sin(t * 0.7);
    const breath = 1 + 0.02 * Math.sin(t * 1.3);
    drawBoss(g, bx, breath);
  },
};
