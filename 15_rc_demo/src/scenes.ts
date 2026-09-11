// src/scenes.ts —— RC deterministic test scenes (ported verbatim from rc-lab/scenes.ts).
//
// Each scene = procedural occlusion/emission/base texture + probe points + predicate
// assertions. Assertions are all relative/threshold form (GPU-difference tolerant);
// no dead-value golden image comparison.

import type { LabPipelineConfig } from './types';

export interface LabLight {
  x: number;               // pixels (display coords, y downward)
  y: number;
  radius: number;          // pixels
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
  | { kind: 'variantGt'; probe: string; low: string; high: string; minRatio: number; minDiff?: number; desc: string }
  | { kind: 'radialSmooth'; x: number; y: number; stepPx: number; samples: number; maxUpwardJump: number; minFalloff: number; desc: string }
  | { kind: 'centroid'; x: number; y: number; radiusPx: number; maxOffsetPx: number; desc: string };

export interface LabScene {
  id: string;
  name: string;
  desc: string;
  grid: string[];          // each row same length; '#' = wall/furniture occluder, other = floor
  scale: number;           // pixels per character
  lights: LabLight[];
  floorRgb: [number, number, number];
  wallRgb: [number, number, number];
  probes: Record<string, LabProbe>;
  checks: LabCheck[];
  config?: Partial<LabPipelineConfig>;
  compareMerging?: boolean;
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
    name: 'S1 empty-room single lamp',
    desc: 'Radial falloff + hue conservation: lamp core > mid > far, no wall interference. Includes seed/JFA/SDF stage checks.',
    grid: fullOpenGrid(18),
    scale: 12,
    lights: [{ x: 120, y: 135, radius: 48, rgb: ORANGE, intensity: 0.9 }],
    floorRgb: [0.09, 0.08, 0.12],
    wallRgb: [0.48, 0.16, 0.11],
    probes: {
      lamp: { x: 120, y: 135 },
      mid: { x: 160, y: 135 },
      far: { x: 380, y: 135 },
      corner: { x: 450, y: 30 },
    },
    checks: [
      { kind: 'luma', probe: 'lamp', op: 'gt', ref: 'mid', desc: 'lamp core luma > mid' },
      { kind: 'luma', probe: 'mid', op: 'gt', ref: 'far', desc: 'mid luma > far (radial falloff)' },
      { kind: 'luma', probe: 'corner', op: 'gt', ref: 0.08, desc: 'farthest corner still lit (ambient + far merge)' },
      { kind: 'hue', probe: 'lamp', rMinusB: 0.25, gMinusB: 0.1, desc: 'lamp stays warm-orange (r>b, g>b)' },
      { kind: 'seedAlpha', x: 20, y: 20, want: 0, desc: 'floor empty (alpha=0)' },
      { kind: 'seedColor', x: 120, y: 135, minLuma: 0.1, desc: 'lamp blob enters seed' },
      { kind: 'sdf', x: 380, y: 135, desc: 'JFA/SDF distance = CPU reference (normalized)' },
      { kind: 'determinism', desc: 'two frames byte-identical' },
      { kind: 'radialSmooth', x: 120, y: 135, stepPx: 10, samples: 8, maxUpwardJump: 0.02, minFalloff: 0.03, desc: 'no ring artifacts in radial profile' },
      { kind: 'centroid', x: 120, y: 135, radiusPx: 60, maxOffsetPx: 6, desc: 'luminance centroid ≈ lamp core (≤6px)' },
    ],
  },
  {
    id: 'wall-shadow',
    name: 'S2 wall shadow',
    desc: 'Single wall occlusion: light cannot pass through; gap at wall bottom allows diffraction, lit area > deep shadow.',
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
      { kind: 'luma', probe: 'open', op: 'gt', ref: 'shadow', desc: 'open area brighter than shadow' },
      { kind: 'luma', probe: 'open', op: 'gt', ref: 0.5, desc: 'lamp core clearly visible' },
      { kind: 'luma', probe: 'shadow', op: 'lt', ref: 0.5, desc: 'no light bleed into deep shadow (12px wall impenetrable)' },
      { kind: 'seedAlpha', x: 240, y: 90, want: 1, desc: 'wall pixel is seed (alpha=1)' },
      { kind: 'seedAlpha', x: 30, y: 30, want: 0, desc: 'floor empty (alpha=0)' },
      { kind: 'seedColor', x: 96, y: 90, minLuma: 0.1, desc: 'lamp blob enters seed' },
      { kind: 'sdf', x: 372, y: 90, desc: 'shadow SDF = nearest wall/blob distance' },
      { kind: 'determinism', desc: 'two frames byte-identical' },
    ],
  },
  {
    id: 'two-lights',
    name: 'S4 two-color lamps + merge',
    desc: 'Red/cyan lamps: center keeps each hue; cascade=3 reaches far field, cascade=1 misses it (validates merge).',
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
      mid: { x: 250, y: 135 },
    },
    checks: [
      { kind: 'hue', probe: 'red', rMinusB: 0.25, desc: 'red lamp keeps red (r-b>0.25)' },
      { kind: 'hue', probe: 'cyan', bMinusR: 0.25, desc: 'cyan lamp keeps cyan (b-r>0.25)' },
      {
        kind: 'variantGt', probe: 'mid', low: 'cascade1', high: 'default', minRatio: 0.98,
        desc: '3-level merge not worse than single-level',
      },
      { kind: 'determinism', desc: 'two frames byte-identical' },
    ],
    compareMerging: true,
  },
  {
    id: 'furniture-room',
    name: 'S5 furniture room',
    desc: 'Near-game: sofa/table occlusion + oil-lamp/neon dual sources; deep shadow behind sofa, two hues, base readable.',
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
      { kind: 'luma', probe: 'lamp', op: 'gt', ref: 'sofaShadow', desc: 'oil-lamp side brighter than sofa shadow' },
      { kind: 'luma', probe: 'neon', op: 'gt', ref: 'sofaShadow', desc: 'neon side brighter than sofa shadow' },
      { kind: 'luma', probe: 'sofaShadow', op: 'gt', ref: 0.08, desc: 'base still readable in deep shadow (additive not washed)' },
      { kind: 'luma', probe: 'sofaShadow', op: 'lt', ref: 0.5, desc: 'no light bleed behind sofa' },
      { kind: 'hue', probe: 'lamp', rMinusB: 0.2, desc: 'oil-lamp keeps warm-orange' },
      { kind: 'hue', probe: 'neon', bMinusR: 0.2, desc: 'neon keeps cyan' },
      { kind: 'seedAlpha', x: 2, y: 2, want: 1, desc: 'border wall is seed (alpha=1)' },
      { kind: 'sdf', x: 300, y: 66, desc: 'SDF behind sofa = CPU reference' },
      { kind: 'determinism', desc: 'two frames byte-identical' },
    ],
  },
  {
    id: 'muzzle-flash',
    name: 'S6 gun flash transient',
    desc: 'Small-radius high-intensity transient (gun flash) should be significantly brighter than the constant oil lamp; far is ambient-only.',
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
      { kind: 'luma', probe: 'muzzle', op: 'gt', ref: 'lantern', desc: 'muzzle center brighter than lantern center' },
      { kind: 'hue', probe: 'muzzle', rMinusB: 0.08, gMinusB: 0.03, desc: 'muzzle keeps warm-white' },
      { kind: 'seedColor', x: 240, y: 135, minLuma: 0.2, desc: 'muzzle blob enters seed' },
      { kind: 'luma', probe: 'farDark', op: 'lt', ref: 'muzzle', desc: 'far corner clearly darker' },
      { kind: 'luma', probe: 'farDark', op: 'gt', ref: 0.08, desc: 'far corner has ambient light' },
      { kind: 'determinism', desc: 'two frames byte-identical' },
    ],
  },
  {
    id: 'stress',
    name: 'S7 stress (16 lights + pillar grid)',
    desc: 'Performance/stability stress: 16 multicolor sources + pillar occlusion, 640x360; auto-gate only validates determinism + completion.',
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
      { kind: 'luma', probe: 'l0', op: 'gt', ref: 0.3, desc: 'lamp 0 center visible' },
      { kind: 'luma', probe: 'l5', op: 'gt', ref: 0.3, desc: 'lamp 5 center visible' },
      { kind: 'luma', probe: 'l10', op: 'gt', ref: 0.3, desc: 'lamp 10 center visible' },
      { kind: 'luma', probe: 'l15', op: 'gt', ref: 0.3, desc: 'lamp 15 center visible' },
      { kind: 'luma', probe: 'corner', op: 'lt', ref: 0.6, desc: 'far corner not overexposed' },
      { kind: 'determinism', desc: 'stress scene two frames byte-identical' },
    ],
  },
];

export function sceneSize(scene: LabScene): { width: number; height: number } {
  const cols = scene.grid[0]?.length ?? 0;
  return { width: cols * scene.scale, height: scene.grid.length * scene.scale };
}

/** Generate the three input textures (ImageData row order = top at row 0). */
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
      throw new Error(`scene ${scene.id} row ${r} length ${row.length} != ${scene.grid[0]?.length}`);
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

/** Light blob baking: two-layer composite disc (core plateau + wide soft skirt). */
function bakeEmission(scene: LabScene): ImageData {
  const { width, height } = sceneSize(scene);
  const img = new ImageData(width, height);
  const d = img.data;
  for (let i = 0; i < width * height; i += 1) d[i * 4 + 3] = 255;

  for (const lt of scene.lights) {
    const r1 = Math.max(1, Math.round(lt.radius));
    const r2 = Math.max(r1 + 1, Math.round(lt.radius * 1.7));
    const plateau = 0.4 * r1;
    const cx = Math.round(lt.x);
    const cy = Math.round(lt.y);
    const maxChannel = Math.max(lt.rgb[0], lt.rgb[1], lt.rgb[2]);
    const v = Math.min(lt.intensity, maxChannel > 0 ? 1 / maxChannel : 1);
    if (v <= 1 / 255) continue;
    for (let dy = -r2; dy <= r2; dy += 1) {
      for (let dx = -r2; dx <= r2; dx += 1) {
        const dist = Math.hypot(dx, dy);
        let gain = 0;
        if (dist <= r1) {
          if (dist <= plateau) {
            gain = 1.0;
          } else {
            const t = (1 - dist / r1) / 0.6;
            gain = Math.max(gain, t * t);
          }
        }
        const t2 = 1 - dist / r2;
        if (t2 > 0) gain = Math.max(gain, 0.4 * t2 * t2);
        if (gain <= 1 / 255) continue;
        const px = cx + dx;
        const py = cy + dy;
        if (px < 0 || py < 0 || px >= width || py >= height) continue;
        const idx = (py * width + px) * 4;
        const val = v * gain;
        const existing = (d[idx] + d[idx + 1] + d[idx + 2]) / 765;
        if (val <= existing) continue;
        d[idx] = Math.round(lt.rgb[0] * 255 * val);
        d[idx + 1] = Math.round(lt.rgb[1] * 255 * val);
        d[idx + 2] = Math.round(lt.rgb[2] * 255 * val);
        d[idx + 3] = 255;
      }
    }
  }
  return img;
}

/** All seed pixels (walls + light blobs), for CPU reference SDF. */
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
    const r2 = Math.max(2, Math.round(lt.radius * 1.7));
    const cx = Math.round(lt.x);
    const cy = Math.round(lt.y);
    for (let dy = -r2; dy <= r2; dy += 1) {
      for (let dx = -r2; dx <= r2; dx += 1) {
        if (dx * dx + dy * dy > r2 * r2) continue;
        const px = cx + dx;
        const py = cy + dy;
        if (px >= 0 && py >= 0 && px < width && py < height) set.add(py * width + px);
      }
    }
  }
  return set;
}

/** CPU reference SDF: distance to nearest seed / scene height (matches jfa.frag metric). */
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
