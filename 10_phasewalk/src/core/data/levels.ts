// core/data/levels.ts — F1 启示厅 (Revelation Hall): full 4-phase reveal.
// Layout verified for reachability per TDD §4 (horizontal ≤6.5m, vertical ≤3.4m per phase).
import type { LayerData, Platform, Shard } from '../types'

function box(id: string, phase: LayerData['theme'], min: [number, number, number], max: [number, number, number]): Platform {
  return { id, phase, min: { x: min[0], y: min[1], z: min[2] }, max: { x: max[0], y: max[1], z: max[2] }, kind: 'static' }
}

const F1: LayerData = {
  id: 'F1_revelation_hall',
  name: '启示厅',
  subtitle: '四相裂变之后，你是唯一能同时站在四层上的人。',
  spawn: { x: 0, y: 0.7, z: 8 },
  exit: { x: 2, y: 7.2, z: -7.5 },
  theme: 'solid',
  hallHalf: [11, 9, 10],
  platforms: [
    // 石阶 route (solid)
    box('p0', 'solid', [-2, 0, 7], [2, 0.5, 9]),
    box('p1', 'solid', [-5.5, 0.5, 5], [-2.5, 1.0, 7]),
    box('p2', 'solid', [-7, 1.0, 2], [-5, 2.2, 4]),
    box('p3', 'solid', [-7, 2.2, -1], [-5, 3.4, 1]),
    box('p4', 'solid', [-3, 3.4, -3], [-1, 4.6, -1]),
    box('p5', 'solid', [1, 4.6, -3], [3, 5.8, -1]),
    box('p6', 'solid', [1, 5.8, -6], [3, 7.0, -4]),
    // 管尾落点 + 通高台 (solid)
    box('p7', 'solid', [-3, 2.4, -7.5], [-0.5, 3.0, -5.5]),
    // 息井高台 (gas route landing)
    box('p8', 'solid', [-9.5, 6.5, -1], [-7, 7.5, 1]),
    box('p9', 'solid', [-4, 7.0, -2], [-2, 8.0, 0]),
    // 焰网起跳台 (plasma wire start)
    box('p10', 'solid', [5.5, 0, 5], [8.5, 1.2, 7]),
    // 金门前平台 (finale)
    box('p11', 'solid', [0.5, 6.6, -9], [3.5, 7.2, -7]),
    // 液相管道两端的"栅栏"视觉暗示：液相专用窄道 (liquid-only crossing the solid gap)
    box('g1', 'liquid', [-4.5, 3.6, -4.5], [-3.5, 5.4, -3.5]),
    // 气相风井平台外沿 (gas phase approach hints)
    box('g2', 'gas', [-9, 3.0, -1.5], [-7.5, 3.6, 0.5]),
  ],
  pipes: [
    {
      id: 'pipe1',
      points: [
        { x: -4, y: 1.4, z: 6 },
        { x: -4, y: 0.8, z: 2 },
        { x: -4, y: 1.4, z: -2 },
        { x: -1, y: 2.2, z: -7 },
      ],
      radius: 0.7,
      flowSpeed: 4,
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
    { id: 's1', phase: 'solid', position: { x: -6, y: 3.9, z: 0 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: -4, y: 1.6, z: 0 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'plasma', position: { x: 5, y: 3.5, z: 0 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'gas', position: { x: -8.5, y: 8.2, z: 0 }, collected: false, bobPhase: 3.6 },
  ] as Shard[],
}

export const LAYERS: LayerData[] = [F1]
