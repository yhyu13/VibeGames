// core/data/levels.ts — F1 启示厅 v4: compact central-tower hall.
// Design (2026-08-15 redesign): the golden gate sits atop a central tower; FOUR phases climb it via
// four DISTINCT movement verbs (固=跳 / 液=泳 / 气=飘 / 焰=爆冲) — no auto-ride. Ground collides for
// ALL phases (the world never swallows you); hazards + 相灵弹 (bullets) are the death sources.
import type { LayerData, Platform } from '../types'

function box(id: string, phase: LayerData['theme'], min: [number, number, number], max: [number, number, number], gold = false): Platform {
  return { id, phase, min: { x: min[0], y: min[1], z: min[2] }, max: { x: max[0], y: max[1], z: max[2] }, kind: 'static', gold }
}

const F1: LayerData = {
  id: 'F1_revelation_hall',
  name: '启示厅',
  subtitle: '四相裂变之后，你是唯一能同时站在四层上的人。',
  spawn: { x: 0, y: 0.7, z: 5 },
  exit: { x: 0, y: 8.6, z: 0 },
  theme: 'solid',
  hallHalf: [7, 8, 7],
  platforms: [
    // 出生台
    box('p0', 'solid', [-1.5, 0, 3.5], [1.5, 0.5, 5.5], true),
    // 固相路线：西面石阶盘旋而上（跳）
    box('p1', 'solid', [-2.6, 1.0, 2.6], [-1.6, 1.6, 3.4], true),
    box('p2', 'solid', [-2.6, 2.4, 1.4], [-1.6, 3.0, 2.2], true),
    box('p3', 'solid', [-2.6, 3.8, 0.2], [-1.6, 4.4, 1.0], true),
    box('p4', 'solid', [-2.6, 5.2, -1.0], [-1.6, 5.8, -0.2], true),
    box('p5', 'solid', [-4.0, 6.6, -1.0], [-3.0, 7.2, -0.2], true), // 西侧起跳台：移出 p6 正下方，向东跳上金门平台
    // 金门平台（塔顶，四路汇聚）
    box('p6', 'solid', [-2, 8.0, -2], [2, 8.3, 2], true),
    // 焰相路线起点台（东面）—— 也是固相造桥后的落脚点
    box('p10', 'solid', [2.6, 0, 1.2], [3.8, 1.2, 2.4], true),
  ],
  // 相液池：默认无形，固相走近凝成桥，跨过东侧无相区（固化造路）
  phaseFluids: [
    { id: 'pool1', min: { x: 1.5, y: 0.6, z: 1.2 }, max: { x: 2.6, y: 0.9, z: 2.4 }, solidified: false },
  ],
  // 相灵眼（发射器）：发射中性子弹，交互由玩家当前相决定
  emitters: [
    // 东侧守卫：横射焰/气路——气穿过（免疫）、焰吸收反弹拆塔
    { id: 'em1', position: { x: 5.0, y: 3.5, z: 0.5 }, aim: { x: -1, y: 0, z: 0 }, interval: 1.5, speed: 5, cooldown: 0.5, destroyed: false },
    // 出生台前：慢速教学弹，横穿主路——固被吃相、液被打散、气穿过、焰反射
    { id: 'em2', position: { x: -1.5, y: 1.0, z: 3.2 }, aim: { x: 1, y: 0, z: 0 }, interval: 2.8, speed: 3, cooldown: 1.5, destroyed: false },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.1, y: 4.9, z: 0.6 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: -3.0, y: 5.0, z: -2.5 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'plasma', position: { x: 4.0, y: 4.5, z: 0.5 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'gas', position: { x: 2.5, y: 7.5, z: -2.5 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    // 无相区（全相即死）—— 东侧地面缺口，固相凝池成桥跨过
    { id: 'hA', name: '无相区', phases: 'all', min: { x: 1.5, y: 0, z: 1.2 }, max: { x: 2.6, y: 0.7, z: 2.4 } },
    // 无相区——西侧坠台惩罚
    { id: 'hB', name: '无相区', phases: 'all', min: { x: -4.5, y: 0, z: -2.5 }, max: { x: -1.5, y: 0.8, z: -0.5 } },
    // 雷云（只杀气相）——气相碎片旁：井柱内悬停永远安全，向东飘错方向 = 撞入可见云团
    { id: 'hC', name: '雷云', phases: ['gas'], min: { x: 3.6, y: 7.4, z: -3.8 }, max: { x: 5.4, y: 8.6, z: -1.0 } },
  ],
}

export const LAYERS: LayerData[] = [F1]
