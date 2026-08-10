/**
 * engine/raytrace/battleScene.ts — v2.0 战斗场景(raytrace 体素构建器)
 *
 * 静态层(场景切换时构建一次):自然战场 —— 草皮/泥土两层地面
 * (与 introScene 同范围)+ 背景树木。霓虹 pong 竞技场(荧光地板 /
 * 洋红环 / 霓虹观众)已删除 —— 那是 v1 patapong 审美,不是 patapon。
 * 动态层(每帧重画):4 面木质战鼓节拍脉冲、3 单位军队(姿态来自
 * unit.state + squashAmount)、boss Moloch(telegraph 脉冲 / attack 突进 /
 * squash / enrage 角变色)。
 *
 * 姿态映射与 engine/VoxelRenderer.writeUnitGroup 保持一致(raster 回退同构)。
 * 光照不在此设置 —— 全部经 VisualState.lighting uniform 驱动(零 emissive)。
 */

import { SONG_BPM } from '../../core/constants';
import { getCharacterById } from '../../core/data/patapons';
import type { BossState, SimSnapshot, Unit } from '../../core/types';
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

// ─── 布局 ───
const GROUND_Y = -1.25; // 地面格中心(草皮顶面 = -1.0,与旧 GROUND 一致,兵种落点不变)
const FIELD_MIN_X = -18.5;
const FIELD_MAX_X = 18.5;
const FIELD_MIN_Z = -5.5;
const FIELD_MAX_Z = 6.5;
const DRUM_X = [-4.5, -1.5, 1.5, 4.5] as const;
const DRUM_Z = 4.0;
const DRUM_Y = -0.55;
const TREE_X = [-15, -10, -5, 4, 9, 14] as const;
const UNIT_ROOT_Y = 0.35;
const BOSS_ROOT_Y = 0.55;
const HORN_BOXES = [
  { dz: 1.15, dy: 2.8, hx: 0.22, hy: 0.75 },
  { dz: 1.3, dy: 3.7, hx: 0.19, hy: 0.7 },
  { dz: 1.45, dy: 4.6, hx: 0.16, hy: 0.6 },
] as const;

/** 羽毛 hex → 材质(02-art-direction §4:紫/青/黄 + 红/蓝绿/亮绿) */
function featherMat(color: string): number {
  switch (color) {
    case '#db4c34':
      return MAT.FEATHER_RED;
    case '#3ac8ff':
      return MAT.FEATHER_TEAL;
    case '#9aff3a':
      return MAT.FEATHER_LIME;
    case '#3affc8':
      return MAT.FEATHER_CYAN;
    case '#c83aff':
      return MAT.FEATHER_VIOLET;
    default:
      return MAT.FEATHER_GOLD;
  }
}

// ─── 静态场景(自然战场) ───
function buildStatic(g: Uint8Array): void {
  // 草皮 + 泥土两层地面(边缘露泥土截面,与 introScene 同手法)
  const topY = Math.floor((GROUND_Y - GRID_MIN.y) / GRID_STEP);
  const earthY = topY - 1;
  for (let x = 0; x < GRID_SIZE[0]!; x++) {
    for (let z = 0; z < GRID_SIZE[2]!; z++) {
      const wx = GRID_MIN.x + (x + 0.5) * GRID_STEP;
      const wz = GRID_MIN.z + (z + 0.5) * GRID_STEP;
      const inField =
        wx >= FIELD_MIN_X && wx <= FIELD_MAX_X && wz >= FIELD_MIN_Z && wz <= FIELD_MAX_Z;
      if (inField) {
        const edge =
          wx + GRID_STEP > FIELD_MAX_X || wx - GRID_STEP < FIELD_MIN_X ||
          wz + GRID_STEP > FIELD_MAX_Z || wz - GRID_STEP < FIELD_MIN_Z;
        setVoxel(g, x, topY, z, edge ? MAT.EARTH : MAT.TERRAIN_TOP);
        setVoxel(g, x, earthY, z, MAT.EARTH);
      }
    }
  }

  // 背景树(远处剪影;干 + 双球树冠)
  TREE_X.forEach((tx, i) => {
    const tz = -10 - (i % 3) * 1.5;
    const baseY = -1.0;
    fillBox(g, tx, baseY + 1.4, tz, 0.22, 1.4, 0.22, MAT.TREE_TRUNK);
    fillEllipsoid(g, tx, baseY + 3.4, tz, 1.3, 1.5, 1.3, MAT.CANOPY_DARK);
    fillEllipsoid(g, tx + 0.5, baseY + 4.1, tz + 0.3, 0.8, 0.9, 0.8, MAT.CANOPY_LIGHT);
  });
}

// ─── 军队单位(姿态映射同 VoxelRenderer.writeUnitGroup) ───
function drawUnit(g: Uint8Array, unit: Unit): void {
  const s = unit.squashAmount;
  let sx = 1 + (s - 1) * 0.5;
  let sy = 2 - sx;
  let lunge = 0;
  let defeated = false;
  switch (unit.state) {
    case 'march':
      lunge = 0.6;
      break;
    case 'attack':
    case 'charge':
    case 'heavy':
    case 'volley':
      lunge = 1.2;
      break;
    case 'defend':
      sy *= 0.5;
      break;
    case 'retreat':
      lunge = -0.5;
      break;
    case 'hit':
      lunge = -0.4;
      break;
    case 'defeat':
      defeated = true;
      sx = 1.3;
      sy = 0.15;
      break;
    default:
      break;
  }

  const x = unit.position.x + lunge;
  const rootY = UNIT_ROOT_Y + unit.position.y;
  const z = unit.position.z;

  fillEllipsoid(g, x, rootY, z, 1.05 * sx, 1.02 * sy, 0.72 * sx, MAT.ARMY_BODY);
  if (defeated) return; // 倒地:闭眼收羽

  // 单眼(朝 +Z 镜头)
  fillSphere(g, x, rootY + 0.05 * sy, z + 0.62, 0.55, MAT.EYE_WHITE);
  fillSphere(g, x, rootY + 0.05 * sy, z + 1.0, 0.15, MAT.PUPIL);

  // 羽毛(角色模板三色)
  const ch = getCharacterById(unit.characterId);
  const feathers: ReadonlyArray<readonly [number, number, number]> = [
    [-0.42, 1.8, featherMat(ch.featherColors[0])],
    [0, 2.05, featherMat(ch.featherColors[1])],
    [0.42, 1.82, featherMat(ch.featherColors[2])],
  ];
  for (const [px, h, id] of feathers) {
    fillBox(g, x + px * sx, rootY + ((1.05 + h) / 2) * sy, z, 0.07, ((h - 1.05) / 2) * sy, 0.07, id);
  }

  // 四肢
  fillBox(g, x - 0.92 * sx, rootY + 0.05, z, 0.08, 0.45 * sy, 0.08, MAT.LIMB);
  fillBox(g, x + 0.92 * sx, rootY + 0.05, z, 0.08, 0.45 * sy, 0.08, MAT.LIMB);
  fillBox(g, x - 0.43 * sx, rootY - 1.15 * sy, z, 0.08, 0.6 * sy, 0.08, MAT.LIMB);
  fillBox(g, x + 0.43 * sx, rootY - 1.15 * sy, z, 0.08, 0.6 * sy, 0.08, MAT.LIMB);
}

// ─── boss Moloch(姿态映射同 VoxelRenderer.writeBossGroup) ───
function drawBoss(g: Uint8Array, boss: BossState): void {
  const s = boss.squashAmount;
  const sx = 1 + (s - 1) * 0.5;
  const sy = 2 - sx;
  let lunge = 0;
  let pulse = 1;
  if (boss.state === 'telegraph') {
    pulse = 1 + 0.03 * Math.sin(boss.stateTimeLeft * 24);
    lunge = -0.2;
  } else if (boss.state === 'attack') {
    lunge = -1.6;
  } else if (boss.state === 'hit') {
    lunge = -0.7;
  }

  const bx = boss.position.x + lunge;
  const by = BOSS_ROOT_Y + boss.position.y;
  const bz = boss.position.z;

  fillEllipsoid(g, bx, by, bz, 3.2 * sx * pulse, 4.45 * sy * pulse, 2.15 * sx * pulse, MAT.BOSS_BODY);

  // 角(enrage → 血红)
  const hornMat = boss.enraged ? MAT.FEATHER_RED : MAT.HORN;
  for (const side of [-1, 1] as const) {
    for (const horn of HORN_BOXES) {
      fillBox(g, bx, by + horn.dy * pulse, bz + side * horn.dz, horn.hx, horn.hy, horn.hx, hornMat);
    }
  }

  // 双眼(朝 -X 军队一侧)
  fillSphere(g, bx - 3.15 * sx, by + 0.75, bz - 0.65, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.15 * sx, by + 0.75, bz + 0.65, 0.5, MAT.BOSS_EYE);
  fillSphere(g, bx - 3.5 * sx, by + 0.75, bz - 0.65, 0.17, MAT.BOSS_PUPIL);
  fillSphere(g, bx - 3.5 * sx, by + 0.75, bz + 0.65, 0.17, MAT.BOSS_PUPIL);
}

/** 木质战鼓:土色鼓身 + 浅色鼓皮 + 深色箍带;拍点上鼓皮起伏 */
function drawDrum(g: Uint8Array, x: number, phase: number): void {
  const skinLift = 0.05 + 0.1 * phase;
  fillBox(g, x, DRUM_Y, DRUM_Z, 0.6, 0.35, 0.6, MAT.EARTH);
  fillBox(g, x, DRUM_Y + 0.35 + skinLift, DRUM_Z, 0.62, 0.06, 0.62, MAT.ARROW_TIP);
  fillBox(g, x, DRUM_Y + 0.18, DRUM_Z, 0.64, 0.05, 0.64, MAT.TREE_TRUNK);
}

export const battleScene: VoxelSceneBuilder<SimSnapshot> = {
  buildStatic,

  drawDynamic(g, snap, _visual, elapsed) {
    // 战鼓:SONG 中按拍脉冲,否则缓慢呼吸
    const beatT = snap.phase === 'SONG' ? snap.rhythm.songTime : elapsed * 0.25;
    const beatHz = SONG_BPM / 60;
    for (let i = 0; i < 4; i++) {
      const phase = 0.5 + 0.5 * Math.sin(beatT * beatHz * Math.PI * 2 - (i * Math.PI) / 2);
      drawDrum(g, DRUM_X[i]!, phase);
    }

    for (const unit of snap.army.units) drawUnit(g, unit);
    drawBoss(g, snap.boss);
  },
};
