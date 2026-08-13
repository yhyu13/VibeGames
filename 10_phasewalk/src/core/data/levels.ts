// core/data/levels.ts — F1 启示厅 v3: compact central-tower hall.
// Design (2026-08-14 playtest round 2): the golden gate sits atop a central tower; FOUR phase
// routes climb it from four sides (固=石阶 / 液=流槽 / 气=风井 / 焰=电线) — one glance from spawn
// shows four colored paths converging. Ground collides for ALL phases (the world never swallows
// you — falling is never lethal); hazards are the ONLY death sources and all are telegraphed.
import type { LayerData, Platform } from '../types'

function box(id: string, phase: LayerData['theme'], min: [number, number, number], max: [number, number, number], gold = false): Platform {
  return { id, phase, min: { x: min[0], y: min[1], z: min[2] }, max: { x: max[0], y: max[1], z: max[2] }, kind: 'static', gold }
}

const F1: LayerData = {
  id: 'F1_revelation_hall',
  name: '启示厅',
  subtitle: '四相裂变之后，你是唯一能同时站在四层上的人。',
  spawn: { x: 0, y: 0.7, z: 5 },
  exit: { x: 0, y: 8.3, z: 0 },
  theme: 'solid',
  hallHalf: [7, 8, 7],
  platforms: [
    // 出生台
    box('p0', 'solid', [-1.5, 0, 3.5], [1.5, 0.5, 5.5], true),
    // 固相路线：南面石阶盘旋而上
    box('p1', 'solid', [-2.6, 1.0, 2.6], [-1.6, 1.6, 3.4], true),
    box('p2', 'solid', [-2.6, 2.4, 1.4], [-1.6, 3.0, 2.2], true),
    box('p3', 'solid', [-2.6, 3.8, 0.2], [-1.6, 4.4, 1.0], true),
    box('p4', 'solid', [-2.6, 5.2, -1.0], [-1.6, 5.8, -0.2], true),
    box('p5', 'solid', [-1.4, 6.2, -1.2], [0.6, 6.8, 0], true),
    // 金门平台（塔顶，四路汇聚）
    box('p6', 'solid', [-2, 7.4, -2], [2, 8.0, 2], true),
    // 焰相路线起点台（东面）
    box('p10', 'solid', [2.6, 0, 1.2], [3.8, 1.2, 2.4], true),
  ],
  pipes: [
    // 液路：西面流槽，从出生台旁上到塔顶上方
    {
      id: 'pipe1',
      points: [
        { x: -3.2, y: 1.0, z: 2.5 },
        { x: -4.2, y: 1.6, z: 1 },
        { x: -4.2, y: 3.4, z: -0.5 },
        { x: -3, y: 5.6, z: -1.5 },
        { x: -1.5, y: 8.6, z: -1.2 }, // end 0.6m above p6 top — hold, switch, drop onto the gate platform
      ],
      radius: 0.7,
      flowSpeed: 4,
    },
  ],
  vents: [
    { id: 'vent1', position: { x: 2.2, y: 0.5, z: -2.5 }, radius: 1.4, impulse: { x: 0, y: 14, z: 0 } },
  ],
  wires: [
    {
      id: 'wire1',
      points: [
        { x: 3.2, y: 1.0, z: 1.8 },
        { x: 3.6, y: 3.0, z: 0 },
        { x: 3.2, y: 5.2, z: -1.2 },
        { x: 1.5, y: 7.0, z: -1.5 },
        { x: 0.5, y: 8.4, z: 0 }, // end above p6 — hold, exit-jump or switch, land on the platform
      ],
      slideSpeed: 12,
    },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.1, y: 4.9, z: 0.6 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: -3.6, y: 4.6, z: -1.0 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'plasma', position: { x: 3.4, y: 4.2, z: -0.6 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'gas', position: { x: 2.2, y: 7.6, z: -2.5 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    // 无相区（全相即死）——电线起点台右侧跳空惩罚
    { id: 'hA', name: '无相区', phases: 'all', min: { x: 4.4, y: 0, z: 0.8 }, max: { x: 6.4, y: 0.8, z: 2.8 } },
    // 无相区——石阶北侧坠台惩罚
    { id: 'hB', name: '无相区', phases: 'all', min: { x: -4.5, y: 0, z: -2.5 }, max: { x: -1.5, y: 0.8, z: -0.5 } },
    // 雷云（只杀气相）——风井东侧方向护栏：井柱内悬停永远安全，向东飘错方向 = 撞入可见云团
    { id: 'hC', name: '雷云', phases: ['gas'], min: { x: 3.6, y: 7.4, z: -3.8 }, max: { x: 5.4, y: 8.6, z: -1.0 } },
  ],
}

export const LAYERS: LayerData[] = [F1]
