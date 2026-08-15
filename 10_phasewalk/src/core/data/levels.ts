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
    // 焰相爆冲台（东侧）：固相凝池成桥跨过无相区后落脚，从此爆冲上取 s3 + 反射拆 em1
    box('p10', 'plasma', [2.6, 0, 1.2], [3.8, 1.2, 2.4], true),
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
    // 相灵守层者 石翁（固相反面）：追踪开火，焰相反射摧毁才开门
    { id: 'boss_stone', position: { x: 1.5, y: 7.2, z: 1.0 }, aim: 'player', interval: 2.4, speed: 4.5, cooldown: 1.2, destroyed: false, boss: true },
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
    // 雷云（只杀气相）——气相尘东侧护栏，向西取尘安全、向东漂撞云
    { id: 'hC', name: '雷云', phases: ['gas'], min: { x: 3.6, y: 7.4, z: -3.8 }, max: { x: 5.4, y: 8.6, z: -1.0 } },
  ],
  traps: [],
  // 密文石板 (password puzzle): step the four pads in the hidden order [石→流→息→焰] to unlock the
  // gate. The order is etched on the transparent 相玻 panel floating over the pads (hide-and-seek).
  password: ['solid', 'liquid', 'gas', 'plasma'],
  passwordPads: [
    { id: 'pad1', position: { x: -2.5, y: 0.05, z: 1.5 }, symbol: 'liquid' },
    { id: 'pad2', position: { x: -0.8, y: 0.05, z: 1.5 }, symbol: 'solid' },
    { id: 'pad3', position: { x: 0.8, y: 0.05, z: 1.5 }, symbol: 'plasma' },
    { id: 'pad4', position: { x: 2.5, y: 0.05, z: 0.2 }, symbol: 'gas' }, // 南移出无相区 hA 的 z 范围（min 1.2）
  ],
}

// F2 流廊 — teach LIQUID (泳 / 分离). The stone stair breaks at p3; a vertical water column rises
// through the 断口 — liquid swims up it (hold jump), a 4.2m gap solid's double-jump can't cross.
const F2: LayerData = {
  id: 'F2_flow_gallery',
  name: '流廊',
  subtitle: '石阶断了，但水记得上行的路。',
  spawn: { x: 0, y: 0.7, z: 4 },
  exit: { x: 0, y: 9.6, z: -1.5 },
  theme: 'liquid',
  hallHalf: [7, 10, 7],
  platforms: [
    // 出生台
    box('p0', 'solid', [-1.5, 0, 2.5], [1.5, 0.5, 4.5], true),
    // 断裂石阶（固相）：逐级而上，至 p3 断裂
    box('p1', 'solid', [-2.6, 1.0, 1.5], [-1.6, 1.6, 2.5], true),
    box('p2', 'solid', [-2.6, 2.4, 0.2], [-1.6, 3.0, 1.2], true),
    box('p3', 'solid', [-2.6, 3.8, -1.1], [-1.6, 4.4, -0.1], true),
    // 上段落台（仅液泳/气飘/焰爆冲可达——断口 4.2m 越过固相二段跳）
    box('p4', 'solid', [1.2, 8.6, -3.0], [3.0, 9.0, -1.4], true),
    box('p5', 'solid', [-1.5, 9.0, -2.5], [1.5, 9.3, -0.5], true),
    // 水柱中段歇脚（液相专属平台）
    box('p6', 'liquid', [0.0, 6.0, -1.6], [1.0, 6.4, -0.6], true),
  ],
  phaseFluids: [],
  emitters: [
    // 横穿水柱下段：液相被打散（软惩罚，教"液中弹打散"）
    { id: 'em1', position: { x: 3.0, y: 2.5, z: -1.0 }, aim: { x: -1, y: 0, z: 0 }, interval: 2.0, speed: 3, cooldown: 0.8, destroyed: false },
    // 相灵守层者 流姬（液相反面）：追踪开火，焰相反射摧毁才开门
    { id: 'boss_flow', position: { x: 1.5, y: 8.2, z: -1.5 }, aim: 'player', interval: 2.4, speed: 4.5, cooldown: 1.2, destroyed: false, boss: true },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.1, y: 5.0, z: -0.6 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: 0.5, y: 5.5, z: -1.0 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'gas', position: { x: 3.0, y: 7.6, z: 2.0 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'plasma', position: { x: 3.5, y: 4.8, z: 2.8 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    // 西侧坠台惩罚（无相者吃相）
    { id: 'hA', name: '无相区', phases: 'all', min: { x: -4.0, y: 0, z: -4.0 }, max: { x: -2.0, y: 0.8, z: -2.0 } },
    // 雷云（只杀气相）——气相尘东侧护栏，向西取尘安全、向东漂撞云
    { id: 'hB', name: '雷云', phases: ['gas'], min: { x: 4.0, y: 7.0, z: 1.5 }, max: { x: 5.5, y: 8.8, z: 3.0 } },
  ],
  traps: [],
}

// F3 息井 — teach GAS (飘 / 穿过). A step-less vertical shaft; ascend by hovering. Emitters fire
// bullets through the shaft — gas passes through (immune), every other phase is hit.
const F3: LayerData = {
  id: 'F3_breath_well',
  name: '息井',
  subtitle: '没有台阶的井，只有风知道往上。',
  spawn: { x: 0, y: 0.7, z: 4 },
  exit: { x: 0, y: 9.4, z: -1.0 },
  theme: 'gas',
  hallHalf: [6, 10, 6],
  platforms: [
    box('p0', 'solid', [-1.5, 0, 2.5], [1.5, 0.5, 4.5], true),
    // 气相歇脚（气相专属，教"飘"路径）
    box('p1', 'gas', [0.5, 3.5, -1.5], [1.8, 3.9, -0.7], true),
    box('p2', 'gas', [-1.8, 6.0, -1.5], [-0.5, 6.4, -0.7], true),
    box('p3', 'gas', [0.5, 8.0, -1.5], [1.8, 8.4, -0.7], true),
    // 其余三相的取尘落台
    box('p4', 'solid', [-2.8, 3.0, 1.5], [-1.6, 3.4, 2.7], true),
    box('p5', 'plasma', [2.2, 4.5, 2.0], [3.4, 4.9, 3.2], true),
    box('p6', 'liquid', [2.0, 6.5, 1.5], [3.2, 6.9, 2.7], true),
    box('p7', 'solid', [-1.5, 8.8, -2.0], [1.5, 9.1, -0.5], true),
  ],
  phaseFluids: [],
  emitters: [
    // 子弹横穿竖井（z≈-1）：气相穿过免疫，其余相中弹
    { id: 'em1', position: { x: 2.5, y: 4.0, z: -1.0 }, aim: { x: -1, y: 0, z: 0 }, interval: 1.8, speed: 4, cooldown: 0.4, destroyed: false },
    { id: 'em2', position: { x: -2.5, y: 7.0, z: -1.0 }, aim: { x: 1, y: 0, z: 0 }, interval: 1.8, speed: 4, cooldown: 1.2, destroyed: false },
    // 相灵守层者 息童（气相反面）：追踪开火，焰相反射摧毁才开门
    { id: 'boss_breath', position: { x: 1.5, y: 8.2, z: -0.5 }, aim: 'player', interval: 2.4, speed: 4.5, cooldown: 1.2, destroyed: false, boss: true },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.2, y: 4.4, z: 2.1 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: 2.6, y: 7.9, z: 2.1 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'gas', position: { x: 0.2, y: 5.5, z: -1.0 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'plasma', position: { x: 2.8, y: 5.9, z: 2.6 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    { id: 'hA', name: '无相区', phases: 'all', min: { x: -4.0, y: 0, z: -4.0 }, max: { x: -2.0, y: 0.8, z: -2.0 } },
    // 雷云（只杀气相）——气相尘东侧护栏
    { id: 'hB', name: '雷云', phases: ['gas'], min: { x: 3.0, y: 7.0, z: 0.5 }, max: { x: 4.5, y: 8.8, z: 2.5 } },
  ],
  traps: [
    // 相锁区：井内锁相，禁切任何相（phase 字段对 phase_lock 无实义）——进井前先切息相再飘升
    { id: 'lock1', kind: 'phase_lock', phase: 'gas', min: { x: -1.5, y: 0, z: -2.5 }, max: { x: 1.5, y: 4.0, z: -0.3 } },
    // 逆相栅（气栅）：气相无实形，直接穿过；z 覆盖整个锁区 [-2.5,-0.3]，不留后缝（否则液相可从井后游上去绕过）
    { id: 'fence1', kind: 'phase_fence', phase: 'gas', min: { x: -2.0, y: 4.5, z: -2.5 }, max: { x: 2.0, y: 4.7, z: 0.0 } },
  ],
}

// F4 焰网 — teach PLASMA (爆冲 / 吸收反弹). A net of emitters fires east across the burst route;
// plasma reflects the bullets back to destroy them; the 灯芯 (wick) sits at the top.
const F4: LayerData = {
  id: 'F4_flame_net',
  name: '焰网',
  subtitle: '相灵眼横射成网，焰把它们还回去。',
  spawn: { x: 0, y: 0.7, z: 4 },
  exit: { x: 0, y: 9.1, z: -2.0 },
  theme: 'plasma',
  hallHalf: [7, 9, 7],
  platforms: [
    box('p0', 'solid', [-1.5, 0, 2.5], [1.5, 0.5, 4.5], true),
    // 焰相爆冲路线（东侧逐级上升）
    box('p1', 'plasma', [2.6, 1.5, 2.0], [3.8, 1.9, 3.0], true),
    box('p2', 'plasma', [2.6, 3.3, 1.0], [3.8, 3.7, 2.0], true),
    box('p3', 'plasma', [2.6, 5.1, 0.0], [3.8, 5.5, 1.0], true),
    box('p4', 'plasma', [2.6, 6.9, -1.0], [3.8, 7.3, 0.0], true),
    box('p5', 'solid', [0.0, 8.4, -2.5], [2.0, 8.8, -1.0], true),
    // 其余三相取尘落台
    box('p6', 'solid', [-2.6, 2.5, 1.5], [-1.4, 2.9, 2.7], true),
    box('p7', 'liquid', [2.0, 4.0, 2.5], [3.2, 4.4, 3.7], true),
    box('p8', 'gas', [-1.5, 6.0, 1.0], [0.0, 6.4, 2.2], true),
  ],
  phaseFluids: [],
  emitters: [
    // 焰网：三层相灵眼横射 +x，焰相反射拆塔
    { id: 'em1', position: { x: -1.5, y: 2.0, z: 0.5 }, aim: { x: 1, y: 0, z: 0 }, interval: 1.5, speed: 5, cooldown: 0.3, destroyed: false },
    { id: 'em2', position: { x: -1.5, y: 4.5, z: 0.5 }, aim: { x: 1, y: 0, z: 0 }, interval: 1.5, speed: 5, cooldown: 1.0, destroyed: false },
    { id: 'em3', position: { x: -1.5, y: 7.0, z: 0.5 }, aim: { x: 1, y: 0, z: 0 }, interval: 1.5, speed: 5, cooldown: 0.6, destroyed: false },
    // 相灵守层者 焰司（焰相反面）：追踪开火，焰相反射摧毁才开门
    { id: 'boss_flame', position: { x: 1.5, y: 7.8, z: -1.8 }, aim: 'player', interval: 2.4, speed: 4.5, cooldown: 1.2, destroyed: false, boss: true },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.0, y: 3.9, z: 2.1 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: 2.6, y: 5.4, z: 3.1 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'gas', position: { x: -0.75, y: 7.4, z: 1.6 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'plasma', position: { x: 3.2, y: 8.0, z: -0.5 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    { id: 'hA', name: '无相区', phases: 'all', min: { x: -4.0, y: 0, z: -4.0 }, max: { x: -2.0, y: 0.8, z: -2.0 } },
  ],
  traps: [],
}

// F5 相核室 — finale: 4 连切一气呵成 (固跳 → 液泳 → 气飘 → 焰爆冲), 四相均衡收官.
const F5: LayerData = {
  id: 'F5_phase_core',
  name: '相核室',
  subtitle: '四相归一，最后一连切。',
  spawn: { x: 0, y: 0.7, z: 4 },
  exit: { x: 0, y: 10.8, z: -1.0 },
  theme: 'solid',
  hallHalf: [7, 11, 7],
  platforms: [
    box('p0', 'solid', [-1.5, 0, 2.5], [1.5, 0.5, 4.5], true),
    // 固跳（两连跳）
    box('p1', 'solid', [-2.6, 1.2, 1.5], [-1.6, 1.6, 2.5], true),
    box('p2', 'solid', [-2.6, 3.0, 0.2], [-1.6, 3.4, 1.2], true),
    // 液泳（水柱）
    box('p3', 'liquid', [0.0, 5.5, -1.5], [1.2, 5.9, -0.5], true),
    // 气飘（穿弹区）
    box('p4', 'gas', [-1.5, 7.5, -1.5], [-0.3, 7.9, -0.5], true),
    // 焰爆冲（登核）
    box('p5', 'plasma', [2.2, 9.0, -1.5], [3.4, 9.4, -0.5], true),
    box('p6', 'solid', [-1.5, 10.2, -2.0], [1.5, 10.5, -0.5], true),
  ],
  phaseFluids: [],
  emitters: [
    // 横穿气/焰路：气穿过、焰反射拆塔
    { id: 'em1', position: { x: 2.0, y: 7.0, z: -1.0 }, aim: { x: -1, y: 0, z: 0 }, interval: 1.5, speed: 4, cooldown: 0.5, destroyed: false },
  ],
  shards: [
    { id: 's1', phase: 'solid', position: { x: -2.1, y: 4.4, z: 0.7 }, collected: false, bobPhase: 0 },
    { id: 's2', phase: 'liquid', position: { x: 0.6, y: 6.9, z: -1.0 }, collected: false, bobPhase: 1.2 },
    { id: 's3', phase: 'gas', position: { x: -0.9, y: 8.9, z: -1.0 }, collected: false, bobPhase: 2.4 },
    { id: 's4', phase: 'plasma', position: { x: 2.8, y: 10.4, z: -1.0 }, collected: false, bobPhase: 3.6 },
  ],
  hazards: [
    { id: 'hA', name: '无相区', phases: 'all', min: { x: -4.0, y: 0, z: -4.0 }, max: { x: -2.0, y: 0.8, z: -2.0 } },
    // 雷云（只杀气相）——气相尘东侧护栏
    { id: 'hB', name: '雷云', phases: ['gas'], min: { x: 3.0, y: 8.5, z: 0.5 }, max: { x: 4.5, y: 9.8, z: 2.5 } },
  ],
  traps: [],
}

export const LAYERS: LayerData[] = [F1, F2, F3, F4, F5]
