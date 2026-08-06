// core/data/scripts.ts — 剧本（TDD §5.4 冻结形状，02 §4）
// dignity（庄重威严，难度 8）+ tragic（悲情独白，难度 12）全量 3 阶段 × 3 beats；
// move 站位 = WORLD.stageMarkers，容差 0.8；line 锚点 = lines.ts 池内行 id；attack 威力 1.0–1.4；
// vfx = FxKind（bloomPulse / lightSweep / dust）；单 beat 4–10s，每阶段 ≈30s。
// mad（癫狂戏剧，难度 18）：⛔ stretch 占位——STRETCH_FLAGS.madScript=false，永不入选。

import type { ScriptDef } from '../types';
import { WORLD } from '../world/world';

export const SCRIPTS: ScriptDef[] = [
  {
    id: 'dignity',
    name: '庄重威严',
    difficulty: 8,
    stages: [
      {
        id: 'dignity_p1',
        beats: [
          { type: 'move', duration: 8, targetPos: WORLD.stageMarkers[0], tolerance: 0.8 },
          { type: 'line', duration: 10, lineId: 'L_DIG_101' },
          { type: 'vfx', duration: 8, vfx: 'dust' },
        ],
      },
      {
        id: 'dignity_p2',
        beats: [
          { type: 'move', duration: 5, targetPos: WORLD.stageMarkers[1], tolerance: 0.8 },
          { type: 'line', duration: 10, lineId: 'L_DIG_106' },
          { type: 'attack', duration: 10, power: 1.0 },
        ],
      },
      {
        id: 'dignity_p3',
        beats: [
          { type: 'vfx', duration: 6, vfx: 'bloomPulse' },
          { type: 'line', duration: 10, lineId: 'L_DIG_111' },
          { type: 'attack', duration: 10, power: 1.3 },
        ],
      },
    ],
  },
  {
    id: 'tragic',
    name: '悲情独白',
    difficulty: 12,
    stages: [
      {
        id: 'tragic_p1',
        beats: [
          { type: 'move', duration: 8, targetPos: WORLD.stageMarkers[0], tolerance: 0.8 },
          { type: 'line', duration: 10, lineId: 'L_TRG_201' },
          { type: 'line', duration: 10, lineId: 'L_TRG_203' },
        ],
      },
      {
        id: 'tragic_p2',
        beats: [
          { type: 'move', duration: 6, targetPos: WORLD.stageMarkers[1], tolerance: 0.8 },
          { type: 'line', duration: 10, lineId: 'L_TRG_206' },
          { type: 'attack', duration: 9, power: 1.0 },
        ],
      },
      {
        id: 'tragic_p3',
        beats: [
          { type: 'vfx', duration: 6, vfx: 'lightSweep' },
          { type: 'line', duration: 10, lineId: 'L_TRG_211' },
          { type: 'attack', duration: 10, power: 1.2 },
        ],
      },
    ],
  },
  {
    id: 'mad',
    name: '癫狂戏剧',
    difficulty: 18,
    stages: [],
  },
];
