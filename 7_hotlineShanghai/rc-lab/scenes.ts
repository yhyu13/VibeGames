// rc-lab/scenes.ts —— RC 算法确定性测试场景。
//
// 每个场景 = 程序化 occlusion/emission/base 纹理 + 探针点 + 可判定断言。
// 断言全部是“相对/阈值”形式，容忍 GPU 差异，不做死值黄金图对比。

import type { LabPipelineConfig } from './pipeline';

export interface LabLight {
  x: number;               // 像素（显示坐标，y 向下）
  y: number;
  radius: number;          // 像素
  rgb: [number, number, number]; // 0..1
  intensity: number;
}

export interface LabProbe {
  x: number;
  y: number;
}

export type LabCheck =
  | { kind: 'luma'; probe: string; op: 'gt' | 'lt'; ref: number | string; desc: string }
  | { kind: 'hue'; probe: string; rMinusB?: number; gMinusB?: number; bMinusR?: number; desc: string }
  | { kind: 'seedAlpha'; x: number; y: number; want: 0 | 1; desc: string }
  | { kind: 'seedColor'; x: number; y: number; minLuma: number; desc: string }
  | { kind: 'sdf'; x: number; y: number; tol?: number; desc: string }
  | { kind: 'determinism'; maxDiffPixels?: number; desc: string }
  | { kind: 'variantGt'; probe: string; low: string; high: string; minRatio: number; minDiff?: number; desc: string };

export interface LabScene {
  id: string;
  name: string;
  desc: string;
  grid: string[];          // 每行长度相同；'#' = 墙/家具 occluder，其他 = 地板
  scale: number;           // 每字符 = 多少像素（w = cols*scale, h = rows*scale）
  lights: LabLight[];
  floorRgb: [number, number, number]; // 0..1
  wallRgb: [number, number, number];
  probes: Record<string, LabProbe>;
  checks: LabCheck[];
  config?: Partial<LabPipelineConfig>;
  compareMerging?: boolean; // 自动加 cascadeCount=1 变体，验证多级合并的价值
}

const bordered = (inner: string): string => '#' + inner + '#';
const open40 = ' '.repeat(38);
const borderRow40 = '#' + '#'.repeat(38) + '#';

function fullOpenGrid(rows: number, cols = 40): string[] {
  const border = '#' + '#'.repeat(cols - 2) + '#';
  return Array.from({ length: rows }, (_, r) => (r === 0 || r === rows - 1 ? border : bordered(open40)));
}

function gridWithSlab(rows: number, slabRowStart: number, slabRowEnd: number, slabColStart = 19, slabColEnd = 20): string[] {
  const inner = ' '.repeat(slabColStart) + '#'.repeat(slabColEnd - slabColStart + 1) + ' '.repeat(38 - slabColEnd - 1);
  return Array.from({ length: rows }, (_, r) => {
    if (r === 0 || r === rows - 1) return borderRow40;
    if (r >= slabRowStart && r <= slabRowEnd) return bordered(inner);
    return bordered(open40);
  });
}

const ORANGE: [number, number, number] = [1.0, 0.62, 0.18];
const WARM_LAMP: [number, number, number] = [1.0, 0.79, 0.4];
const RED: [number, number, number] = [1.0, 0.12, 0.08];
const CYAN: [number, number, number] = [0.1, 0.85, 1.0];
const NEON: [number, number, number] = [0.23, 0.85, 1.0];
const MUZZLE: [number, number, number] = [1.0, 0.72, 0.3];

export const LAB_SCENES: LabScene[] = [
  {
    id: 'empty-lamp',
    name: 'S1 空房单灯',
    desc: '径向衰减 + 色相保持：灯心 > 中距 > 远距，无墙干扰。含 seed/JFA/SDF 阶段检查。',
    grid: fullOpenGrid(18),
    scale: 12,
    lights: [{ x: 120, y: 135, radius: 48, rgb: ORANGE, intensity: 0.9 }],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      lamp: { x: 120, y: 135 },
      mid: { x: 240, y: 135 },
      far: { x: 380, y: 135 },
      corner: { x: 450, y: 30 },
    },
    checks: [
      { kind: 'luma', probe: 'lamp', op: 'gt', ref: 'mid', desc: '灯心亮度 > 中距' },
      { kind: 'luma', probe: 'mid', op: 'gt', ref: 'far', desc: '中距亮度 > 远距（径向衰减）' },
      { kind: 'luma', probe: 'corner', op: 'gt', ref: 0.15, desc: '最远角落仍有光（环境 + 远端合并）' },
      { kind: 'hue', probe: 'lamp', rMinusB: 0.25, gMinusB: 0.1, desc: '灯心保持暖橙（r>b, g>b）' },
      { kind: 'seedAlpha', x: 20, y: 20, want: 0, desc: '地板为空（alpha=0，白=空）' },
      { kind: 'seedColor', x: 120, y: 135, minLuma: 0.1, desc: '灯心光斑进入 seed（发射色）' },
      { kind: 'sdf', x: 380, y: 135, desc: 'JFA/SDF 距离 = CPU 参考（归一化）' },
      { kind: 'determinism', desc: '同场景两帧输出逐字节一致' },
    ],
  },
  {
    id: 'wall-shadow',
    name: 'S2 墙影',
    desc: '单墙遮挡：光不能穿墙；墙下端缺口允许绕射，绕射区亮于深影区。',
    grid: gridWithSlab(18, 1, 11, 19, 20),
    scale: 12,
    lights: [{ x: 96, y: 90, radius: 44, rgb: ORANGE, intensity: 0.85 }],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      open: { x: 96, y: 90 },
      shadow: { x: 372, y: 90 },
    },
    checks: [
      { kind: 'luma', probe: 'open', op: 'gt', ref: 'shadow', desc: '开敞区亮于影区' },
      { kind: 'luma', probe: 'open', op: 'gt', ref: 0.5, desc: '灯心区显著可见' },
      { kind: 'luma', probe: 'shadow', op: 'lt', ref: 0.5, desc: '深影区无漏光（12px 墙不可穿透）' },
      { kind: 'seedAlpha', x: 240, y: 90, want: 1, desc: '墙像素是 seed（alpha=1，黑=墙）' },
      { kind: 'seedAlpha', x: 30, y: 30, want: 0, desc: '地板为空（alpha=0，白=空）' },
      { kind: 'seedColor', x: 96, y: 90, minLuma: 0.1, desc: '灯心光斑进入 seed' },
      { kind: 'sdf', x: 372, y: 90, desc: '影区 SDF = 到墙右缘/光斑最近距离' },
      { kind: 'determinism', desc: '同场景两帧输出逐字节一致' },
    ],
  },
  {
    id: 'two-lights',
    name: 'S4 双色灯 + 合并',
    desc: '红/青双灯：中心点保持各自色相；cascade=3 远场可达，cascade=1 远场缺失（验证合并）。',
    grid: fullOpenGrid(18),
    scale: 12,
    lights: [
      { x: 132, y: 135, radius: 54, rgb: RED, intensity: 0.9 },
      { x: 348, y: 135, radius: 54, rgb: CYAN, intensity: 0.9 },
    ],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      red: { x: 132, y: 135 },
      cyan: { x: 348, y: 135 },
      mid: { x: 240, y: 135 },
    },
    checks: [
      { kind: 'hue', probe: 'red', rMinusB: 0.25, desc: '红灯心保持红色（r-b>0.25）' },
      { kind: 'hue', probe: 'cyan', bMinusR: 0.25, desc: '青灯心保持青色（b-r>0.25）' },
      {
        kind: 'variantGt', probe: 'mid', low: 'cascade1', high: 'default', minRatio: 1.15, minDiff: 0.02,
        desc: '3 级合并不劣于单级（当前远场合并增益较小，仅作回归）',
      },
      { kind: 'determinism', desc: '同场景两帧输出逐字节一致' },
    ],
    compareMerging: true,
  },
  {
    id: 'furniture-room',
    name: 'S5 家具房间',
    desc: '贴近游戏：沙发/茶几遮挡 + 油灯/霓虹双光源；沙发后深影、两灯色相、base 可读。',
    grid: (() => {
      const sofa = ' '.repeat(19) + '###' + ' '.repeat(16);
      const table = ' '.repeat(20) + '###' + ' '.repeat(15);
      const rows: string[] = [];
      for (let r = 0; r < 18; r += 1) {
        if (r === 0 || r === 17) rows.push(borderRow40);
        else if (r >= 4 && r <= 6) rows.push(bordered(sofa));
        else if (r >= 11 && r <= 13) rows.push(bordered(table));
        else rows.push(bordered(open40));
      }
      return rows;
    })(),
    scale: 12,
    lights: [
      { x: 60, y: 60, radius: 40, rgb: WARM_LAMP, intensity: 0.75 },
      { x: 390, y: 54, radius: 40, rgb: NEON, intensity: 0.8 },
    ],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      lamp: { x: 60, y: 60 },
      neon: { x: 390, y: 54 },
      sofaShadow: { x: 300, y: 66 },
      cornerDark: { x: 30, y: 180 },
    },
    checks: [
      { kind: 'luma', probe: 'lamp', op: 'gt', ref: 'sofaShadow', desc: '油灯侧亮于沙发后深影' },
      { kind: 'luma', probe: 'neon', op: 'gt', ref: 'sofaShadow', desc: '霓虹侧亮于沙发后深影' },
      { kind: 'luma', probe: 'sofaShadow', op: 'gt', ref: 0.1, desc: '深影区 base 仍可读（加法合成不清洗）' },
      { kind: 'luma', probe: 'sofaShadow', op: 'lt', ref: 0.5, desc: '沙发后无漏光' },
      { kind: 'hue', probe: 'lamp', rMinusB: 0.2, desc: '油灯保持暖橙' },
      { kind: 'hue', probe: 'neon', bMinusR: 0.2, desc: '霓虹保持青色' },
      { kind: 'seedAlpha', x: 2, y: 2, want: 1, desc: '边框墙是 seed（alpha=1）' },
      { kind: 'sdf', x: 300, y: 66, desc: '沙发后 SDF = CPU 参考' },
      { kind: 'determinism', desc: '同场景两帧输出逐字节一致' },
    ],
  },
  {
    id: 'muzzle-flash',
    name: 'S6 枪火瞬光',
    desc: '小半径高强瞬时光（枪火）应显著亮于常亮油灯；远处仅环境光。',
    grid: fullOpenGrid(18),
    scale: 12,
    lights: [
      { x: 72, y: 66, radius: 36, rgb: WARM_LAMP, intensity: 0.6 },
      { x: 240, y: 135, radius: 10, rgb: MUZZLE, intensity: 2.2 },
    ],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      muzzle: { x: 240, y: 135 },
      lantern: { x: 72, y: 66 },
      farDark: { x: 420, y: 180 },
    },
    checks: [
      { kind: 'luma', probe: 'muzzle', op: 'gt', ref: 'lantern', desc: '枪火中心亮于油灯中心' },
      { kind: 'hue', probe: 'muzzle', rMinusB: 0.08, gMinusB: 0.03, desc: '枪火保持暖黄白（中心钳制后仍可辨）' },
      { kind: 'seedColor', x: 240, y: 135, minLuma: 0.2, desc: '枪火光斑进入 seed' },
      { kind: 'luma', probe: 'farDark', op: 'lt', ref: 'muzzle', desc: '远角明显更暗' },
      { kind: 'luma', probe: 'farDark', op: 'gt', ref: 0.1, desc: '远角仍有环境光' },
      { kind: 'determinism', desc: '同场景两帧输出逐字节一致' },
    ],
  },
  {
    id: 'stress',
    name: 'S7 压力（16 灯 + 柱阵）',
    desc: '性能/稳定压力：16 个多色光源 + 柱阵遮挡，640x360；自动门只验证确定性 + 完成。',
    grid: (() => {
      const cols = 40;
      const rows = 18;
      const pillars = new Set<string>([
        '3,2', '4,2', '12,4', '13,4', '22,5', '23,5', '32,3', '33,3',
        '7,9', '8,9', '16,10', '17,10', '27,8', '28,8', '36,11',
        '5,14', '6,14', '14,15', '15,15', '24,13', '25,13', '34,15',
      ]);
      const out: string[] = [];
      for (let r = 0; r < rows; r += 1) {
        let s = '';
        for (let c = 0; c < cols; c += 1) {
          const isBorder = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
          s += isBorder || pillars.has(`${c},${r}`) ? '#' : ' ';
        }
        out.push(s);
      }
      return out;
    })(),
    scale: 16, // 640x360
    lights: (() => {
      const kinds: [number, number, number][] = [ORANGE, RED, CYAN, NEON, MUZZLE, WARM_LAMP];
      const out: LabLight[] = [];
      for (let i = 0; i < 16; i += 1) {
        const col = (i % 4) * 8 + 4;
        const row = Math.floor(i / 4) * 4 + 2;
        out.push({
          x: col * 16 + 8,
          y: row * 16 + 8,
          radius: 20 + (i % 3) * 8,
          rgb: kinds[i % kinds.length],
          intensity: 0.7 + (i % 4) * 0.15,
        });
      }
      return out;
    })(),
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      l0: { x: 72, y: 40 },
      l5: { x: 200, y: 168 },
      l10: { x: 328, y: 168 },
      l15: { x: 456, y: 232 },
      corner: { x: 620, y: 340 },
    },
    checks: [
      { kind: 'luma', probe: 'l0', op: 'gt', ref: 0.3, desc: '灯 0 中心可见' },
      { kind: 'luma', probe: 'l5', op: 'gt', ref: 0.3, desc: '灯 5 中心可见' },
      { kind: 'luma', probe: 'l10', op: 'gt', ref: 0.3, desc: '灯 10 中心可见' },
      { kind: 'luma', probe: 'l15', op: 'gt', ref: 0.3, desc: '灯 15 中心可见' },
      { kind: 'luma', probe: 'corner', op: 'lt', ref: 0.6, desc: '远角不过曝' },
      { kind: 'determinism', desc: '压力场景两帧逐字节一致' },
    ],
  },
];

export function sceneSize(scene: LabScene): { width: number; height: number } {
  const cols = scene.grid[0]?.length ?? 0;
  return { width: cols * scene.scale, height: scene.grid.length * scene.scale };
}

/** 生成三张输入纹理（ImageData 行序 = 顶部在 row 0） */
export function buildSceneTextures(scene: LabScene): {
  width: number;
  height: number;
  occlusion: ImageData;
  emission: ImageData;
  sceneColor: ImageData;
} {
  const { width, height } = sceneSize(scene);
  for (let r = 0; r < scene.grid.length; r += 1) {
    const row = scene.grid[r] ?? '';
    if (row.length !== scene.grid[0]?.length) {
      throw new Error(`场景 ${scene.id} 第 ${r} 行长度 ${row.length} != ${scene.grid[0]?.length}`);
    }
  }

  const occlusion = new ImageData(width, height);
  const sceneColor = new ImageData(width, height);
  const floor = scene.floorRgb.map((v) => Math.round(v * 255));
  const wall = scene.wallRgb.map((v) => Math.round(v * 255));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const col = Math.floor(x / scene.scale);
      const ch = scene.grid[Math.floor(y / scene.scale)]?.[col] ?? ' ';
      const idx = (y * width + x) * 4;
      if (ch === '#') {
        occlusion.data[idx] = 0;
        occlusion.data[idx + 1] = 0;
        occlusion.data[idx + 2] = 0;
        occlusion.data[idx + 3] = 255;
        sceneColor.data[idx] = wall[0];
        sceneColor.data[idx + 1] = wall[1];
        sceneColor.data[idx + 2] = wall[2];
      } else {
        occlusion.data[idx] = 255;
        occlusion.data[idx + 1] = 255;
        occlusion.data[idx + 2] = 255;
        occlusion.data[idx + 3] = 255;
        sceneColor.data[idx] = floor[0];
        sceneColor.data[idx + 1] = floor[1];
        sceneColor.data[idx + 2] = floor[2];
      }
      sceneColor.data[idx + 3] = 255;
    }
  }

  return {
    width,
    height,
    occlusion,
    emission: bakeEmission(scene),
    sceneColor,
  };
}

/** 光斑烘焙：与 demo/旧 bakeEmission 同公式（intensity / (1+(d/r)^2) * 柔边），多灯取亮 */
function bakeEmission(scene: LabScene): ImageData {
  const { width, height } = sceneSize(scene);
  const img = new ImageData(width, height);
  const d = img.data;
  for (let i = 0; i < width * height; i += 1) d[i * 4 + 3] = 255;

  for (const lt of scene.lights) {
    const r = Math.max(1, Math.round(lt.radius));
    const r2 = r * r;
    const cx = Math.round(lt.x);
    const cy = Math.round(lt.y);
    for (let dy = -r; dy <= r; dy += 1) {
      for (let dx = -r; dx <= r; dx += 1) {
        const d2 = dx * dx + dy * dy;
        if (d2 > r2) continue;
        // Solid light surface like the demo's light brush: the emitter disk is
        // uniformly bright, so rays that clip its edge return full light instead
        // of a near-black falloff that would block cascade merging. Scale so the
        // brightest channel stays <= 1.0, preserving the light's hue.
        const maxChannel = Math.max(lt.rgb[0], lt.rgb[1], lt.rgb[2]);
        const v = Math.min(lt.intensity, maxChannel > 0 ? 1 / maxChannel : 1);
        if (v <= 1 / 255) continue;
        const px = cx + dx;
        const py = cy + dy;
        if (px < 0 || py < 0 || px >= width || py >= height) continue;
        const idx = (py * width + px) * 4;
        const existing = (d[idx] + d[idx + 1] + d[idx + 2]) / 765; // 背景 (0,0,0) → 0
        if (v <= existing) continue;
        d[idx] = Math.round(lt.rgb[0] * 255 * v);
        d[idx + 1] = Math.round(lt.rgb[1] * 255 * v);
        d[idx + 2] = Math.round(lt.rgb[2] * 255 * v);
        d[idx + 3] = 255;
      }
    }
  }
  return img;
}

/** 所有 seed 像素（墙 + 光斑），用于 CPU 参考 SDF */
export function seedPixelSet(scene: LabScene): Set<number> {
  const { width, height } = sceneSize(scene);
  const set = new Set<number>();
  for (let y = 0; y < height; y += 1) {
    const row = scene.grid[Math.floor(y / scene.scale)] ?? '';
    for (let x = 0; x < width; x += 1) {
      if ((row[Math.floor(x / scene.scale)] ?? ' ') === '#') set.add(y * width + x);
    }
  }
  for (const lt of scene.lights) {
    const r = Math.max(1, Math.round(lt.radius));
    const cx = Math.round(lt.x);
    const cy = Math.round(lt.y);
    for (let dy = -r; dy <= r; dy += 1) {
      for (let dx = -r; dx <= r; dx += 1) {
        const d2 = dx * dx + dy * dy;
        if (d2 > r * r) continue;
        const maxChannel = Math.max(lt.rgb[0], lt.rgb[1], lt.rgb[2]);
        const v = Math.min(lt.intensity, maxChannel > 0 ? 1 / maxChannel : 1);
        if (v <= 1 / 255) continue;
        const px = cx + dx;
        const py = cy + dy;
        if (px >= 0 && py >= 0 && px < width && py < height) set.add(py * width + px);
      }
    }
  }
  return set;
}

/** CPU 参考 SDF：最近 seed 的欧氏距离 / 场景高（与 jfa.frag 的归一化度量一致） */
export function cpuSdfAt(scene: LabScene, seeds: Set<number>, x: number, y: number): number {
  const { width, height } = sceneSize(scene);
  let best = Infinity;
  for (const key of seeds) {
    const sy = Math.floor(key / width);
    const sx = key - sy * width;
    const d = Math.hypot(sx - x, sy - y);
    if (d < best) best = d;
  }
  return best === Infinity ? 1 : best / height;
}
