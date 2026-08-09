// rc-lab/main.ts —— RC Lab 页面入口：UI + 自动运行 + window.__rcLab 调试钩子。

import { RcLabPipeline, DEFAULT_LAB_CONFIG, type LabPipelineConfig } from './pipeline';
import { LAB_SCENES } from './scenes';
import { runAll, runScene, type LabReport, type SceneReport } from './verify';

declare global {
  interface Window {
    __rcLab?: {
      status: 'idle' | 'running' | 'done' | 'error';
      lastReport: LabReport | null;
      runAll: (skipIds?: string[]) => LabReport;
      runScene: (id: string) => SceneReport;
      debug: {
        state: () => { width: number; height: number; jfaPasses: number; renderCount: number };
        readStage: (stage: 'seed' | 'sdf' | 'radiance' | 'final') => number[];
        readStageFloat: (stage: 'sdf' | 'radiance') => number[];
        contextLost: () => boolean;
        glError: () => number;
        runSceneWith: (id: string, cfg: Partial<LabPipelineConfig>) => SceneReport;
        rcUniforms: () => Array<[string, boolean]>;
      };
    };
  }
}

const canvas = document.querySelector<HTMLCanvasElement>('#view');
const statusEl = document.querySelector<HTMLDivElement>('#status');
const reportEl = document.querySelector<HTMLDivElement>('#report');
const sceneSelect = document.querySelector<HTMLSelectElement>('#sceneSelect');
const cascadeSelect = document.querySelector<HTMLSelectElement>('#cascadeSelect');
const intervalInput = document.querySelector<HTMLInputElement>('#intervalInput');
const ditherCheck = document.querySelector<HTMLInputElement>('#ditherCheck');
const runAllBtn = document.querySelector<HTMLButtonElement>('#runAllBtn');
const runSceneBtn = document.querySelector<HTMLButtonElement>('#runSceneBtn');

const stageSeed = document.querySelector<HTMLCanvasElement>('#stageSeed');
const stageSdf = document.querySelector<HTMLCanvasElement>('#stageSdf');
const stageRadiance = document.querySelector<HTMLCanvasElement>('#stageRadiance');

function setStatus(text: string, ok: boolean): void {
  if (statusEl === null) return;
  statusEl.textContent = text;
  statusEl.className = ok ? 'status ok' : 'status bad';
}

function currentConfig(): LabPipelineConfig {
  return {
    ...DEFAULT_LAB_CONFIG,
    cascadeCount: Number(cascadeSelect?.value ?? 3),
    baseIntervalPx: Number(intervalInput?.value ?? DEFAULT_LAB_CONFIG.baseIntervalPx),
    ditherEnabled: ditherCheck?.checked ?? false,
  };
}

function sceneById(id: string): (typeof LAB_SCENES)[number] {
  const scene = LAB_SCENES.find((s) => s.id === id);
  if (scene === undefined) throw new Error(`未知场景: ${id}`);
  return scene;
}

/** 把 bottom-up 读回数据翻成 top-down 并画到小画布 */
function drawStage(
  canvas: HTMLCanvasElement | null,
  data: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
  mode: 'rgb' | 'gray' | 'boost',
): void {
  if (canvas === null) return;
  const out = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const src = ((height - 1 - y) * width) * 4;
    for (let x = 0; x < width; x += 1) {
      const si = src + x * 4;
      const di = (y * width + x) * 4;
      if (mode === 'gray') {
        const v = data[si];
        out[di] = v;
        out[di + 1] = v;
        out[di + 2] = v;
      } else if (mode === 'boost') {
        out[di] = Math.min(255, data[si] * 3);
        out[di + 1] = Math.min(255, data[si + 1] * 3);
        out[di + 2] = Math.min(255, data[si + 2] * 3);
      } else {
        out[di] = data[si];
        out[di + 1] = data[si + 1];
        out[di + 2] = data[si + 2];
      }
      out[di + 3] = 255;
    }
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx === null) return;
  ctx.imageSmoothingEnabled = false;
  ctx.putImageData(new ImageData(out, width, height), 0, 0);
}

/** float 目标（RGBA32F）画到小画布 */
function drawStageFloat(
  canvas: HTMLCanvasElement | null,
  data: Float32Array,
  width: number,
  height: number,
  mode: 'gray' | 'boost',
): void {
  if (canvas === null) return;
  const bytes = new Uint8ClampedArray(width * height * 4);
  const toByte = (x: number): number => Math.max(0, Math.min(255, x * 255));
  for (let i = 0; i < width * height; i += 1) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    if (mode === 'gray') {
      bytes[i * 4] = toByte(r);
      bytes[i * 4 + 1] = toByte(r);
      bytes[i * 4 + 2] = toByte(r);
    } else {
      bytes[i * 4] = toByte(r * 3);
      bytes[i * 4 + 1] = toByte(g * 3);
      bytes[i * 4 + 2] = toByte(b * 3);
    }
    bytes[i * 4 + 3] = 255;
  }
  drawStage(canvas, bytes, width, height, 'rgb');
}

function renderSceneReport(report: SceneReport): void {
  const defaultVariant = report.variants.find((v) => v.label === 'default');
  const timings = defaultVariant?.timings;
  const parts: string[] = [];
  parts.push(
    `<div class="scene ${report.ok ? 'pass' : 'fail'}">` +
      `<b>[${report.sceneId}] ${report.name}</b> — ${report.ok ? 'PASS' : 'FAIL'}` +
      (timings === undefined
        ? ''
        : ` — ${timings.total.toFixed(1)}ms (prep ${timings.prepscene.toFixed(2)} / jfa ${timings.jfa.toFixed(2)} / ` +
          `sdf ${timings.distfield.toFixed(2)} / cascade ${timings.cascade.toFixed(2)} / final ${timings.final.toFixed(2)})`) +
      ` — lights=${report.lightCount} det=${report.determinism.diffPixels}px diff` +
      (report.error !== undefined ? ` — ERROR: ${report.error}` : '') +
      '</div>',
  );
  for (const c of report.checks) {
    parts.push(
      `<div class="check ${c.pass ? 'pass' : 'fail'}">${c.pass ? '✓' : '✗'} ${c.desc} ` +
        `<span class="dim">(got ${c.actual}, want ${c.expected})</span></div>`,
    );
  }
  if (reportEl !== null) reportEl.insertAdjacentHTML('beforeend', parts.join(''));
}

function renderReport(report: LabReport): void {
  if (reportEl === null) return;
  reportEl.innerHTML = '';
  for (const scene of report.scenes) renderSceneReport(scene);
  reportEl.insertAdjacentHTML(
    'beforeend',
    `<div class="summary ${report.ok ? 'pass' : 'fail'}">` +
      `总计 ${report.totalChecks} 项断言：通过 ${report.passedChecks} / 失败 ${report.failedChecks}，` +
      `全部 ${report.scenes.length} 个场景用时 ${report.totalMs.toFixed(0)}ms — ${report.ok ? 'ALL PASS' : 'HAS FAILURE'}</div>`,
  );
}

let lastSceneReport: SceneReport | null = null;

function drawStages(sceneId: string): void {
  lastSceneReport = runScene(pipeline, sceneById(sceneId), currentConfig());
  renderStages();
}

function renderStages(): void {
  void lastSceneReport;
  const w = pipeline.state.width;
  const h = pipeline.state.height;
  drawStage(stageSeed, pipeline.readTarget('seed'), w, h, 'rgb');
  drawStageFloat(stageSdf, pipeline.readTargetFloat('sdf'), w, h, 'gray');
  drawStageFloat(stageRadiance, pipeline.readTargetFloat('radiance'), w, h, 'boost');
  drawStage(canvas, pipeline.readTarget('final'), w, h, 'rgb');
}

let pipeline: RcLabPipeline;

try {
  pipeline = new RcLabPipeline(canvas as HTMLCanvasElement);
  setStatus('WebGL2 + EXT_color_buffer_float OK', true);
} catch (e) {
  setStatus(`初始化失败: ${e instanceof Error ? e.message : String(e)}`, false);
  throw e;
}

function installLabApi(report: LabReport): void {
  window.__rcLab = {
    status: 'done',
    lastReport: report,
    runAll: (skipIds?: string[]) => {
      const r = runAll(pipeline, new Set(skipIds ?? []), currentConfig());
      renderReport(r);
      return r;
    },
    runScene: (id: string) => {
      const r = runScene(pipeline, sceneById(id), currentConfig());
      renderSceneReport(r);
      return r;
    },
    debug: {
      state: () => pipeline.state,
      readStage: (stage) => Array.from(pipeline.readTarget(stage)),
      readStageFloat: (stage) => Array.from(pipeline.readTargetFloat(stage)),
      contextLost: () => pipeline.isContextLost(),
      glError: () => pipeline.glError,
      runSceneWith: (id, cfg) => runScene(pipeline, sceneById(id), cfg),
      rcUniforms: () => pipeline.debugUniforms(),
    },
  };
}

canvas?.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  console.error('[rc-lab] WebGL context LOST');
});
canvas?.addEventListener('webglcontextrestored', () => {
  console.error('[rc-lab] WebGL context restored');
});

runAllBtn?.addEventListener('click', () => {
  const report = runAll(pipeline, new Set(), currentConfig());
  renderReport(report);
  setStatus(`全部场景 ${report.ok ? 'ALL PASS' : 'HAS FAILURE'}（${report.totalMs.toFixed(0)}ms）`, report.ok);
  installLabApi(report);
});

runSceneBtn?.addEventListener('click', () => {
  if (reportEl === null) return;
  reportEl.innerHTML = '';
  const id = sceneSelect?.value ?? LAB_SCENES[0].id;
  const scene = sceneById(id);
  const report = runScene(pipeline, scene, currentConfig());
  renderSceneReport(report);
  lastSceneReport = report;
  renderStages();
  setStatus(`场景 ${scene.id} ${report.ok ? 'PASS' : 'FAIL'}`, report.ok);
});

// 自动运行：进页面即验证全部场景（含压力测试），便于浏览器冒烟/Playwright 门禁
const autoReport = runAll(pipeline, new Set(['stress']));
renderReport(autoReport);
installLabApi(autoReport);
setStatus(`自动验证完成：${autoReport.passedChecks}/${autoReport.totalChecks} 通过`, autoReport.ok);

// 默认展示 S5 家具房间的阶段视图
drawStages('furniture-room');
