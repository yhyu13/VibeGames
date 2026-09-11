// src/main.ts —— RC Demo page entry: UI + auto-run + window.__rcDemo debug hook.
// Adapted from rc-lab/main.ts; uses the RcBackend interface (via backendFactory)
// instead of the raw-GL RcLabPipeline class.

import { backendFactory, type RcBackend } from './backend/RcBackend';
import type { LabPipelineConfig, LabReadStage } from './types';
import { DEFAULT_LAB_CONFIG } from './types';
import { LAB_SCENES } from './scenes';
import { runAll, runScene, type LabReport, type SceneReport } from './verify';
import { runPortCheck } from './port-check';

declare global {
  interface Window {
    __rcDemo?: {
      status: 'idle' | 'running' | 'done' | 'error';
      lastReport: LabReport | null;
      runAll: (skipIds?: string[]) => LabReport;
      runScene: (id: string) => SceneReport;
      debug: {
        state: () => { width: number; height: number; jfaPasses: number; renderCount: number };
        readPixel: (stage: LabReadStage, x: number, y: number) => number[];
        showStage: (stage: LabReadStage, boost?: number) => void;
        contextLost: () => boolean;
        glError: () => number;
        runSceneWith: (id: string, cfg: Partial<LabPipelineConfig>) => SceneReport;
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
  if (scene === undefined) throw new Error(`unknown scene: ${id}`);
  return scene;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('canvas screenshot load failed'));
    img.src = src;
  });
}

/** Draw a stage texture via the GPU passthrough, then copy via toDataURL to the mini canvas. */
async function copyStageTo(target: HTMLCanvasElement | null, stage: LabReadStage, boost = 1): Promise<void> {
  if (target === null) return;
  backend.debugShowStage(stage, boost);
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
      `Total ${report.totalChecks} assertions: passed ${report.passedChecks} / failed ${report.failedChecks}, ` +
      `all ${report.scenes.length} scenes in ${report.totalMs.toFixed(0)}ms — ${report.ok ? 'ALL PASS' : 'HAS FAILURE'}</div>`,
  );
}

function renderPortReport(report: LabReport): void {
  if (reportEl === null) return;
  reportEl.insertAdjacentHTML(
    'beforeend',
    `<div class="summary ${report.ok ? 'pass' : 'fail'}" style="margin-top:6px">` +
      `[port reference impl] passed ${report.passedChecks}/${report.totalChecks}` +
      `, ${report.totalMs.toFixed(0)}ms — ${report.ok ? 'PORT PASS' : 'PORT FAIL'}</div>`,
  );
}

let lastSceneReport: SceneReport | null = null;

async function drawStages(sceneId: string): Promise<void> {
  lastSceneReport = runScene(backend, sceneById(sceneId), currentConfig());
  await renderStages();
}

async function renderStages(): Promise<void> {
  void lastSceneReport;
  await copyStageTo(stageSeed, 'seed', 1);
  await copyStageTo(stageSdf, 'sdf', 1);
  await copyStageTo(stageRadiance, 'radiance', 3);
}

let backend: RcBackend;

try {
  backend = backendFactory('webgl');
  backend.init(canvas as HTMLCanvasElement);
  setStatus('WebGL2 backend OK (three.js RawShaderMaterial)', true);
} catch (e) {
  setStatus(`init failed: ${e instanceof Error ? e.message : String(e)}`, false);
  throw e;
}

function installLabApi(report: LabReport): void {
  window.__rcDemo = {
    status: 'done',
    lastReport: report,
    runAll: (skipIds?: string[]) => {
      const r = runAll(backend, new Set(skipIds ?? []), currentConfig());
      renderReport(r);
      return r;
    },
    runScene: (id: string) => {
      const r = runScene(backend, sceneById(id), currentConfig());
      renderSceneReport(r);
      return r;
    },
    debug: {
      state: () => backend.state,
      readPixel: (stage, x, y) => Array.from(backend.readPixel(stage, x, y)),
      showStage: (stage, boost = 1) => backend.debugShowStage(stage, boost),
      contextLost: () => backend.isContextLost(),
      glError: () => backend.glError(),
      runSceneWith: (id, cfg) => runScene(backend, sceneById(id), cfg),
      markRadiance: () => Array.from(backend.debugMarkRadiance()),
      readCascade: (stopIndex: number) => backend.debugRenderCascade(stopIndex),
      readJfa: (stage, x, y) => Array.from(backend.readJfa(stage, x, y)),
      readFbStatus: () => backend.debugReadFbStatus(),
      probeReadback: () => backend.debugProbeReadback(),
      readSizes: () => backend.debugReadSizes(),
    },
  };
}

// Context-loss/restore is expected during browser teardown (SwiftShader releases
// the context on unload), so log at 'warn' — the assertion gate only fails on
// console.error, and a render-time loss would surface there anyway via render().
canvas?.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  console.warn('[rc-demo] WebGL context LOST');
});
canvas?.addEventListener('webglcontextrestored', () => {
  console.warn('[rc-demo] WebGL context restored');
});

runAllBtn?.addEventListener('click', () => {
  const report = runAll(backend, new Set(), currentConfig());
  renderReport(report);
  setStatus(`all scenes ${report.ok ? 'ALL PASS' : 'HAS FAILURE'} (${report.totalMs.toFixed(0)}ms)`, report.ok);
  installLabApi(report);
});

runSceneBtn?.addEventListener('click', () => {
  if (reportEl === null) return;
  reportEl.innerHTML = '';
  const id = sceneSelect?.value ?? LAB_SCENES[0].id;
  const scene = sceneById(id);
  const report = runScene(backend, scene, currentConfig());
  renderSceneReport(report);
  lastSceneReport = report;
  void renderStages();
  setStatus(`scene ${scene.id} ${report.ok ? 'PASS' : 'FAIL'}`, report.ok);
});

function runPortAll(): LabReport {
  const report = runPortCheck();
  renderPortReport(report);
  window.__rcPortCheck = { status: 'done', lastReport: report, run: runPortAll };
  setStatus(`port reference validation: ${report.passedChecks}/${report.totalChecks} passed`, report.ok);
  return report;
}

portCheckBtn?.addEventListener('click', () => {
  runPortAll();
});

// Auto-run: validate all scenes on load (excluding the heavy stress scene for the
// default pass), enabling browser smoke / Playwright gating.
let autoReport: LabReport;
try {
  autoReport = runAll(backend, new Set(['stress']));
} catch (e) {
  autoReport = {
    ok: false,
    scenes: [],
    totalChecks: 0,
    passedChecks: 0,
    failedChecks: 0,
    totalMs: 0,
  };
  setStatus(`auto-run crashed: ${e instanceof Error ? e.message : String(e)}`, false);
  throw e;
}
renderReport(autoReport);
installLabApi(autoReport);
setStatus(`auto validation done: ${autoReport.passedChecks}/${autoReport.totalChecks} passed`, autoReport.ok);

// Validate the port reference implementation (same assertion suite).
const portReport = runPortAll();
void portReport;

// Default to the S5 furniture-room stage view.
void drawStages('furniture-room');
