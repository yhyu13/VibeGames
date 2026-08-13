// core/data/levels.ts — F1 启示厅 (Revelation Hall): 4-phase converging routes.
// Design (2026-08-14 playtest): every phase has its own route to the golden gate; gate opens at
// 3/4 shards → the player MUST master ≥3 phases. Death (hazards/void) → respawn at spawn, phase
// reset to solid — no same-point retry. Reachability per TDD §4 (horizontal ≤6.5m, vertical ≤3.4m).
import type { LayerData, Platform } from '../types'

function box(id: string, phase: LayerData['theme'], min: [number, number, number], max: [number, number, number]): Platform {
  return { id, phase, min: { x: min[0], y: min[1], z: min[2] }, max: { x: max[0], y: max[1], z: max[2] }, kind: 'static' }
}

const F1: LayerData = {
  id: 'F1_revelation_hall',
  name: '启示厅',
  subtitle: '四相裂变之后，你是唯一能同时站在四层上的人。',
  spawn: { x: 0, y: 0.7, z: 8 },
  exit: { x: 0.5, y: 7.7, z: -7 },
  theme: 'solid',
  hallHalf: [11, 9, 10],
  platforms: [
    // ——— 固相路线（石阶，最稳最长）———
    box('p0', 'solid', [-2, 0, 7], [2, 0.5, 9]),
    box('p1', 'solid', [-5.5, 0.5, 5], [-2.5, 1.0, 7]),
    box('p2', 'solid', [-7, 1.0, 2], [-5, 2.2, 4]),
    box('p3', 'solid', [-7, 2.2, -1], [-5, 3.4, 1]),
    box('p4', 'solid', [-3, 3.4, -3], [-1, 4.6, -1]),
    box('p5', 'solid', [1, 4.6, -3], [3, 5.8, -1]),
    // 金门平台（四路汇聚点）
    box('p6', 'solid', [-1.5, 6.9, -8], [2.5, 7.5, -5.5]),
    // ——— 气相路线（风井 → 高台 → 金门）———
    box('p8', 'solid', [-9.5, 6.5, -1], [-7, 7.5, 1]),
    box('p9', 'solid', [-5.5, 7.0, -3], [-3.5, 8.0, -1]),
    // ——— 焰相路线（电线起点台）———
    box('p10', 'solid', [5.5, 0, 5], [8.5, 1.2, 7]),
  ],
  pipes: [
    // 液路主线：从 p1 沿渠上行至金门平台下方
    {
      id: 'pipe1',
      points: [
        { x: -4, y: 1.4, z: 6 },
        { x: -4, y: 0.8, z: 2 },
        { x: -6, y: 2.6, z: -1 },
        { x: -5, y: 4.8, z: -4 },
        // end 1m ABOVE p6 top (7.5) — rider holds at the end, switching to solid drops onto the gate platform
        { x: 0, y: 8.4, z: -6.5 },
      ],
      radius: 0.7,
      flowSpeed: 4,
    },
    // 引流管（陷阱）：入口在液路入口旁——走错入口 = 被吸进虚空
    {
      id: 'pipe2_drain',
      points: [
        { x: -4.6, y: 0.9, z: 4.6 },
        { x: -4.6, y: -0.5, z: 3.2 },
        { x: -4.6, y: -2.5, z: 1.5 },
      ],
      radius: 0.7,
      flowSpeed: 5,
      danger: true,
    },
  ],
  vents: [
    { id: 'vent1', position: { x: -8.5, y: 0.5, z: 0 }, radius: 1.4, impulse: { x: 0, y: 14, z: 0 } },
  ],
  wires: [
    {
      id: 'wire1',
      points: [
        { x: 7.5, y: 1.2, z: 6 },
        { x: 6, y: 2.5, z: 2 },
        { x: 4, y: 4.5, z: -2 },
        { x: 2.5, y: 6.5, z: -6 },
      ],
      slideSpeed: 12,
    },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2, y: 5.0, z: -2 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: -2.5, y: 6.7, z: -5.3 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'plasma', position: { x: 5, y: 3.5, z: 0 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'gas', position: { x: -8.5, y: 8.2, z: 0 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    // 无相区（全相即死）——固相路线跳空惩罚。拆成两块，夹住液管主线两侧
    // （管道中心线 x=-4 走廊安全——引流陷阱在入口，不在此处）
    { id: 'hA_left', name: '无相区', phases: 'all', min: { x: -5.6, y: 0, z: 3.2 }, max: { x: -4.6, y: 1.4, z: 4.4 } },
    { id: 'hA_right', name: '无相区', phases: 'all', min: { x: -3.4, y: 0, z: 3.2 }, max: { x: -2.4, y: 1.4, z: 4.4 } },
    // 无相区——电线起点台右侧跳空惩罚
    { id: 'hB', name: '无相区', phases: 'all', min: { x: 9, y: 0, z: 4.5 }, max: { x: 11, y: 1.4, z: 6.5 } },
    // 雷云（只杀气相）——风井上空悬停过头 = 死亡
    { id: 'hC', name: '雷云', phases: ['gas'], min: { x: -9.8, y: 8.6, z: -1.3 }, max: { x: -7.2, y: 9.8, z: 1.3 } },
  ],
}

export const LAYERS: LayerData[] = [F1]
