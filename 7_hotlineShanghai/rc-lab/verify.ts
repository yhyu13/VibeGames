// rc-lab/verify.ts —— 逐场景运行管线 + 数据驱动断言，输出可序列化报告。

import {
  DEFAULT_LAB_CONFIG,
  type LabPipelineConfig,
  type LabReadStage,
  type LabSceneInput,
  type LabStageTimings,
} from './pipeline';
import {
  LAB_SCENES,
  buildSceneTextures,
  cpuSdfAt,
  seedPixelSet,
  type LabCheck,
  type LabScene,
} from './scenes';

export interface LabCheckResult {
  id: string;
  desc: string;
  pass: boolean;
  actual: string;
  expected: string;
}

export interface LabVariantResult {
  label: string;
  timings: LabStageTimings;
  probes: Record<string, { r: number; g: number; b: number; luma: number }>;
}

export interface SceneReport {
  sceneId: string;
  name: string;
  ok: boolean;
  checks: LabCheckResult[];
  variants: LabVariantResult[];
  determinism: { pass: boolean; diffPixels: number };
  lightCount: number;
  error?: string;
}

export interface LabReport {
  ok: boolean;
  scenes: SceneReport[];
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  totalMs: number;
}

export interface LabRunOptions {
  skipIds?: ReadonlySet<string>;
  configOverride?: Partial<LabPipelineConfig>;
}

/**
 * 可运行的管线（结构类型）：rc-lab 本地管线与 src/engine/RcPipeline 移植版都满足。
 * 这样 port-check 能用同一套 35 条断言验证游戏侧实现。
 */
export interface RcRunner {
  render(input: LabSceneInput, config: LabPipelineConfig): LabStageTimings;
  readPixel(stage: LabReadStage, x: number, y: number): [number, number, number, number];
}

interface VariantPlan {
  label: string;
  config: LabPipelineConfig;
}

function buildVariantPlans(scene: LabScene, override: Partial<LabPipelineConfig>): VariantPlan[] {
  const base: LabPipelineConfig = { ...DEFAULT_LAB_CONFIG, ...scene.config, ...override };
  if (scene.compareMerging) {
    return [
      { label: 'default', config: base },
      { label: 'cascade1', config: { ...base, cascadeCount: 1 } },
    ];
  }
  return [{ label: 'default', config: base }];
}

function luma(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function runScene(
  pipeline: RcRunner,
  scene: LabScene,
  configOverride: Partial<LabPipelineConfig> = {},
): SceneReport {
  const plans = buildVariantPlans(scene, configOverride);
  const report: SceneReport = {
    sceneId: scene.id,
    name: scene.name,
    ok: false,
    checks: [],
    variants: [],
    determinism: { pass: false, diffPixels: -1 },
    lightCount: scene.lights.length,
  };

  try {
    const input = buildSceneTextures(scene);
    const seeds = seedPixelSet(scene);
    const finalA: Record<number, [number, number, number, number]> = {};

    // 每个变体跑一遍，读回 final
    for (const plan of plans) {
      const timings = pipeline.render(input, plan.config);
      const probes: Record<string, { r: number; g: number; b: number; luma: number }> = {};
      for (const [name, p] of Object.entries(scene.probes)) {
        // 3x3 均值：抗单像素抖动/penumbra 边缘，保证断言稳定
        let rr = 0;
        let gg = 0;
        let bb = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const [r, g, b] = pipeline.readPixel('final', p.x + dx, p.y + dy);
            rr += r;
            gg += g;
            bb += b;
          }
        }
        rr /= 9;
        gg /= 9;
        bb /= 9;
        probes[name] = { r: rr / 255, g: gg / 255, b: bb / 255, luma: luma(rr, gg, bb) / 255 };
      }
      report.variants.push({ label: plan.label, timings, probes });
      if (plan.label === 'default') {
        // 确定性采样网格（32x18 ≈ 576 点）
        const stepX = Math.max(1, Math.floor(input.width / 32));
        const stepY = Math.max(1, Math.floor(input.height / 18));
        for (let gy = 0; gy < input.height; gy += stepY) {
          for (let gx = 0; gx < input.width; gx += stepX) {
            finalA[gy * input.width + gx] = pipeline.readPixel('final', gx, gy);
          }
        }
      }
    }

    const defaultVariant = report.variants[0];
    if (defaultVariant === undefined) throw new Error('没有默认变体');

    // 确定性：默认变体再跑一遍，比较 final 读回
    pipeline.render(input, plans[0].config);
    let diffPixels = 0;
    for (const [key, first] of Object.entries(finalA)) {
      const idx = Number(key);
      const gx = idx % input.width;
      const gy = Math.floor(idx / input.width);
      const second = pipeline.readPixel('final', gx, gy);
      if (first[0] !== second[0] || first[1] !== second[1] || first[2] !== second[2]) diffPixels += 1;
    }
    report.determinism = { pass: diffPixels === 0, diffPixels };

    // 阶段纹理（默认变体）
    const resolveRef = (ref: number | string): number => {
      if (typeof ref === 'number') return ref;
      const probe = defaultVariant.probes[ref];
      if (probe === undefined) throw new Error(`未知探针引用: ${ref}`);
      return probe.luma;
    };

    const evalCheck = (check: LabCheck, idx: number): LabCheckResult => {
      const base = { id: `${scene.id}-${idx}`, desc: check.desc };
      switch (check.kind) {
        case 'luma': {
          const actual = defaultVariant.probes[check.probe]?.luma ?? 0;
          const expected = resolveRef(check.ref);
          const pass = check.op === 'gt' ? actual > expected : actual < expected;
          return { ...base, pass, actual: actual.toFixed(3), expected: `${check.op} ${expected.toFixed(3)}` };
        }
        case 'hue': {
          const p = defaultVariant.probes[check.probe];
          const r = p?.r ?? 0;
          const g = p?.g ?? 0;
          const b = p?.b ?? 0;
          const parts: string[] = [];
          const pass =
            (check.rMinusB === undefined || r - b > check.rMinusB) &&
            (check.gMinusB === undefined || g - b > check.gMinusB) &&
            (check.bMinusR === undefined || b - r > check.bMinusR);
          if (check.rMinusB !== undefined) parts.push(`r-b>${check.rMinusB} (${(r - b).toFixed(3)})`);
          if (check.gMinusB !== undefined) parts.push(`g-b>${check.gMinusB} (${(g - b).toFixed(3)})`);
          if (check.bMinusR !== undefined) parts.push(`b-r>${check.bMinusR} (${(b - r).toFixed(3)})`);
          return { ...base, pass, actual: parts.join(' '), expected: '色相条件成立' };
        }
        case 'seedAlpha': {
          const [, , , a] = pipeline.readPixel('seed', check.x, check.y);
          return {
            ...base,
            pass: (check.want === 1 && a === 255) || (check.want === 0 && a === 0),
            actual: `alpha=${a}`,
            expected: `alpha=${check.want * 255}`,
          };
        }
        case 'seedColor': {
          const [r, g, b] = pipeline.readPixel('seed', check.x, check.y);
          const actual = luma(r, g, b) / 255;
          return {
            ...base,
            pass: actual > check.minLuma,
            actual: `seedLuma=${actual.toFixed(3)}`,
            expected: `>${check.minLuma}`,
          };
        }
        case 'sdf': {
          const [r] = pipeline.readPixel('sdf', check.x, check.y);
          const actual = r / 255;
          const expected = cpuSdfAt(scene, seeds, check.x, check.y);
          const tol = check.tol ?? 0.04;
          return {
            ...base,
            pass: Math.abs(actual - expected) <= tol,
            actual: `sdf=${actual.toFixed(4)}`,
            expected: `cpu=${expected.toFixed(4)} ±${tol}`,
          };
        }
        case 'determinism': {
          const max = check.maxDiffPixels ?? 0;
          return {
            ...base,
            pass: report.determinism.diffPixels <= max,
            actual: `diff=${report.determinism.diffPixels}px`,
            expected: `≤${max}px`,
          };
        }
        case 'variantGt': {
          const high = report.variants.find((v) => v.label === check.high)?.probes[check.probe]?.luma ?? 0;
          const low = report.variants.find((v) => v.label === check.low)?.probes[check.probe]?.luma ?? 0;
          const ratioOk = low <= 0 ? high > 0 : high / low >= check.minRatio;
          const diffOk = check.minDiff === undefined || high - low > check.minDiff;
          return {
            ...base,
            pass: ratioOk && diffOk,
            actual: `high=${high.toFixed(3)} low=${low.toFixed(3)} ratio=${(low <= 0 ? Infinity : high / low).toFixed(2)}`,
            expected: `ratio≥${check.minRatio}${check.minDiff !== undefined ? `, diff>${check.minDiff}` : ''}`,
          };
        }
      }
    };

    report.checks = scene.checks.map(evalCheck);
    report.ok = report.checks.every((c) => c.pass) && report.determinism.pass;
  } catch (e) {
    report.error = e instanceof Error ? e.message : String(e);
    report.ok = false;
  }

  return report;
}

export function runAll(
  pipeline: RcRunner,
  skipIds: ReadonlySet<string> = new Set(),
  configOverride: Partial<LabPipelineConfig> = {},
): LabReport {
  const t0 = performance.now();
  const scenes = LAB_SCENES.filter((s) => !skipIds.has(s.id));
  const sceneReports = scenes.map((scene) => runScene(pipeline, scene, configOverride));
  const checks = sceneReports.flatMap((r) => r.checks);
  const report: LabReport = {
    ok: sceneReports.every((r) => r.ok),
    scenes: sceneReports,
    totalChecks: checks.length,
    passedChecks: checks.filter((c) => c.pass).length,
    failedChecks: checks.filter((c) => !c.pass).length,
    totalMs: performance.now() - t0,
  };
  return report;
}
