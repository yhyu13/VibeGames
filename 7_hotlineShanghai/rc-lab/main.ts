// rc-lab/main.ts —— RC Lab 页面入口：UI + 自动运行 + window.__rcLab 调试钩子。

import { RcLabPipeline, DEFAULT_LAB_CONFIG, type LabPipelineConfig } from './pipeline';
import { LAB_SCENES } from './scenes';
import { runAll, runScene, type LabReport, type SceneReport } from './verify';
import { runPortCheck } from './port-check';

declare global {
  interface Window {
    __rcLab?: {
      status: 'idle' | 'running' | 'done' | 'error';
      lastReport: LabReport | null;
      runAll: (skipIds?: string[]) => LabReport;
      runScene: (id: string) => SceneReport;
      debug: {
        state: () => { width: number; height: number; jfaPasses: number; renderCount: number };
        readPixel: (stage: 'seed' | 'sdf' | 'radiance' | 'final', x: number, y: number) => number[];
        showStage: (stage: 'seed' | 'sdf' | 'radiance' | 'final', boost?: number) => void;
        contextLost: () => boolean;
        glError: () => number;
        runSceneWith: (id: string, cfg: Partial<LabPipelineConfig>) => SceneReport;
        rcUniforms: () => Array<[string, boolean]>;
        markRadiance: () => number[];
        readCascade: (stopIndex: number) => { width: number; height: number };
        readJfa: (stage: 'jfaA' | 'jfaB' | 'jfaOut', x: number, y: number) => number[];
        readFbStatus: () => { boundOk: boolean; statusHex: string; isCascadeA: boolean; isCascadeB: boolean };
        probeReadback: () => { readOk: boolean; drawBindingOk: boolean; bytes: number[] };
        readSizes: () => Array<[number, number, number]>;
      };
    };
    __rcPortCheck?: {
      status: 'idle' | 'running' | 'done' | 'error';
      lastReport: LabReport | null;
      run: () => LabReport;
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
const portCheckBtn = document.querySelector<HTMLButtonElement>('#portCheckBtn');

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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('canvas 截图加载失败'));
    img.src = src;
  });
}

/** 用 GPU passthrough 把阶段纹理画到 WebGL canvas，再 toDataURL 拷到小画布 */
async function copyStageTo(target: HTMLCanvasElement | null, stage: 'seed' | 'sdf' | 'radiance', boost = 1): Promise<void> {
  if (target === null) return;
  pipeline.debugShowStage(stage, boost);
  const url = (canvas as HTMLCanvasElement).toDataURL('image/png');
  const img = await loadImage(url);
  target.width = img.width;
  target.height = img.height;
  const ctx = target.getContext('2d');
  if (ctx === null) return;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);
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

function renderPortReport(report: LabReport): void {
  if (reportEl === null) return;
  reportEl.insertAdjacentHTML(
    'beforeend',
    `<div class="summary ${report.ok ? 'pass' : 'fail'}" style="margin-top:6px">` +
      `[src/engine/RcPipeline 移植版] 通过 ${report.passedChecks}/${report.totalChecks}` +
      `，${report.totalMs.toFixed(0)}ms — ${report.ok ? 'PORT PASS' : 'PORT FAIL'}</div>`,
  );
}

let lastSceneReport: SceneReport | null = null;

async function drawStages(sceneId: string): Promise<void> {
  lastSceneReport = runScene(pipeline, sceneById(sceneId), currentConfig());
  await renderStages();
}

async function renderStages(): Promise<void> {
  void lastSceneReport;
  await copyStageTo(stageSeed, 'seed', 1);
  await copyStageTo(stageSdf, 'sdf', 1);
  await copyStageTo(stageRadiance, 'radiance', 3);
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
      readPixel: (stage, x, y) => Array.from(pipeline.readPixel(stage, x, y)),
      showStage: (stage, boost = 1) => pipeline.debugShowStage(stage, boost),
      contextLost: () => pipeline.isContextLost(),
      glError: () => pipeline.glError,
      runSceneWith: (id, cfg) => runScene(pipeline, sceneById(id), cfg),
      rcUniforms: () => pipeline.debugUniforms(),
      markRadiance: () => pipeline.debugMarkRadiance(),
      readCascade: (stopIndex: number) => pipeline.debugRenderCascade(stopIndex),
      readJfa: (stage, x, y) => Array.from(pipeline.readJfa(stage, x, y)),
      readFbStatus: () => pipeline.debugReadFbStatus(),
      probeReadback: () => pipeline.debugProbeReadback(),
      readSizes: () => pipeline.debugReadSizes(),
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
  void renderStages();
  setStatus(`场景 ${scene.id} ${report.ok ? 'PASS' : 'FAIL'}`, report.ok);
});

function runPortAll(): LabReport {
  const report = runPortCheck();
  renderPortReport(report);
  window.__rcPortCheck = { status: 'done', lastReport: report, run: runPortAll };
  setStatus(`移植版验证：${report.passedChecks}/${report.totalChecks} 通过`, report.ok);
  return report;
}

portCheckBtn?.addEventListener('click', () => {
  runPortAll();
});

// 自动运行：进页面即验证全部场景（含压力测试），便于浏览器冒烟/Playwright 门禁
const autoReport = runAll(pipeline, new Set(['stress']));
renderReport(autoReport);
installLabApi(autoReport);
setStatus(`自动验证完成：${autoReport.passedChecks}/${autoReport.totalChecks} 通过`, autoReport.ok);

// 自动验证游戏侧移植版（同一套断言）
const portReport = runPortAll();
void portReport;

// 默认展示 S5 家具房间的阶段视图
void drawStages('furniture-room');
