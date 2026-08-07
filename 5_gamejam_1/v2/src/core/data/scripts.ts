// core/data/scripts.ts — 三个剧本 × 3 阶段（V2：attack beat 携带鼠标谱配置）

import type { ScriptDef } from '../types';

export const SCRIPTS: Record<string, ScriptDef> = {
  dignity: {
    id: 'dignity',
    name: '庄重威严',
    difficulty: 8,
    chartStyle: 'dignity',
    stages: [
      {
        id: 'D1',
        beats: [
          { type: 'move', duration: 6, targetPos: { x: -4.2, y: 0, z: 2.2 }, tolerance: 0.9 },
          { type: 'line', duration: 5, lineId: 'L_DIG_101' },
          { type: 'attack', duration: 6, power: 1, rhythm: { style: 'dignity', targetCount: 3, bpm: 72 } },
        ],
      },
      {
        id: 'D2',
        beats: [
          { type: 'move', duration: 5, targetPos: { x: 0.6, y: 0, z: 0.6 }, tolerance: 0.9 },
          { type: 'line', duration: 5, lineId: 'L_DIG_201' },
          { type: 'attack', duration: 7, power: 1.1, rhythm: { style: 'dignity', targetCount: 5, bpm: 78 } },
          { type: 'move', duration: 5, targetPos: { x: 4.4, y: 0, z: 2.6 }, tolerance: 0.9 },
        ],
      },
      {
        id: 'D3',
        beats: [
          { type: 'line', duration: 5, lineId: 'L_DIG_301' },
          { type: 'move', duration: 5, targetPos: { x: 0, y: 0, z: -3.4 }, tolerance: 1.0 },
          { type: 'attack', duration: 8, power: 1.25, rhythm: { style: 'dignity', targetCount: 7, bpm: 84 } },
          { type: 'vfx', duration: 3, vfx: 'lightSweep' },
          { type: 'line', duration: 5, lineId: 'L_DIG_302' },
        ],
      },
    ],
  },
  tragic: {
    id: 'tragic',
    name: '悲情独白',
    difficulty: 12,
    chartStyle: 'tragic',
    stages: [
      {
        id: 'T1',
        beats: [
          { type: 'line', duration: 6, lineId: 'L_TRA_101' },
          { type: 'move', duration: 5, targetPos: { x: -2.4, y: 0, z: -1.6 }, tolerance: 0.9 },
          { type: 'attack', duration: 7, power: 1, rhythm: { style: 'tragic', targetCount: 4, bpm: 66 } },
        ],
      },
      {
        id: 'T2',
        beats: [
          { type: 'move', duration: 5, targetPos: { x: 2.8, y: 0, z: -1.2 }, tolerance: 0.9 },
          { type: 'line', duration: 6, lineId: 'L_TRA_201' },
          { type: 'attack', duration: 8, power: 1.1, rhythm: { style: 'tragic', targetCount: 6, bpm: 66, holdCount: 1 } },
          { type: 'move', duration: 4, targetPos: { x: 0, y: 0, z: -3.4 }, tolerance: 0.9 },
        ],
      },
      {
        id: 'T3',
        beats: [
          { type: 'line', duration: 6, lineId: 'L_TRA_301' },
          { type: 'move', duration: 5, targetPos: { x: 0.6, y: 0, z: 0.6 }, tolerance: 0.95 },
          { type: 'attack', duration: 9, power: 1.25, rhythm: { style: 'tragic', targetCount: 8, bpm: 72, holdCount: 2 } },
          { type: 'vfx', duration: 3, vfx: 'dust' },
          { type: 'line', duration: 5, lineId: 'L_TRA_302' },
        ],
      },
    ],
  },
  mad: {
    id: 'mad',
    name: '癫狂戏剧',
    difficulty: 18,
    chartStyle: 'mad',
    stages: [
      {
        id: 'M1',
        beats: [
          { type: 'move', duration: 4, targetPos: { x: 2.8, y: 0, z: -1.2 }, tolerance: 1.0 },
          { type: 'attack', duration: 7, power: 1, rhythm: { style: 'mad', targetCount: 5, bpm: 90 } },
          { type: 'line', duration: 4, lineId: 'L_MAD_101' },
        ],
      },
      {
        id: 'M2',
        beats: [
          { type: 'move', duration: 4, targetPos: { x: -4.2, y: 0, z: 2.2 }, tolerance: 1.0 },
          { type: 'attack', duration: 8, power: 1.1, rhythm: { style: 'mad', targetCount: 7, bpm: 96, movingCount: 1 } },
          { type: 'line', duration: 4, lineId: 'L_MAD_201' },
          { type: 'move', duration: 4, targetPos: { x: 4.4, y: 0, z: 2.6 }, tolerance: 1.0 },
        ],
      },
      {
        id: 'M3',
        beats: [
          { type: 'line', duration: 4, lineId: 'L_MAD_301' },
          { type: 'attack', duration: 10, power: 1.3, rhythm: { style: 'mad', targetCount: 9, bpm: 102, holdCount: 2, movingCount: 2 } },
          { type: 'vfx', duration: 3, vfx: 'screenFlash' },
          { type: 'line', duration: 4, lineId: 'L_MAD_302' },
        ],
      },
    ],
  },
};

export const SCRIPT_LIST = Object.values(SCRIPTS);
