// rc-showcase/main.ts —— RC 展示场景（1937 上海客厅）
//
// 用游戏侧移植版 src/engine/RcPipeline 实时渲染一个带家具/双光源/遮挡的客厅，
// 展示：油灯暖光、霓虹青色、探照灯、沙发深影、霓虹脉动。
// 访问：npm run dev 后打开 http://localhost:5184/rc-showcase/

import {
  DEFAULT_RC_CONFIG,
  RcPipeline,
  type RcPipelineConfig,
  type RcReadStage,
} from '../src/engine/RcPipeline';
import { buildSceneTextures, type LabScene } from '../rc-lab/scenes';

declare global {
  interface Window {
    __rcShowcase?: {
      status: 'idle' | 'running' | 'done' | 'error';
      getState: () => {
        fps: number;
        lastFrameMs: number;
        activeCascades: number;
        jfaPasses: number;
        width: number;
        height: number;
        lightCount: number;
        degraded: boolean;
      };
    };
  }
}

function buildRow(segments: ReadonlyArray<readonly [number, number]>): string {
  const chars = new Array<string>(40).fill(' ');
  for (const [from, to] of segments) {
    for (let c = from; c <= to; c += 1) chars[c] = '#';
  }
  return chars.join('');
}

const border = [[0, 0], [39, 39]] as const;
const showcaseScene: LabScene = {
  id: 'rc-showcase-room',
  name: '1937 上海客厅',
  desc: 'RC 展示：油灯 + 霓虹 + 探照灯 + 家具遮挡（port 自 src/engine/RcPipeline）',
  grid: [
    buildRow([[0, 39]]),
    buildRow(border),
    buildRow(border),
    buildRow(border),
    buildRow([[0, 0], [20, 22], [39, 39]]),
    buildRow([[0, 0], [20, 22], [39, 39]]),
    buildRow([[0, 0], [20, 22], [39, 39]]),
    buildRow([[0, 0], [30, 33], [39, 39]]),
    buildRow([[0, 0], [30, 33], [39, 39]]),
    buildRow([[0, 0], [30, 33], [39, 39]]),
    buildRow(border),
    buildRow([[0, 0], [12, 14], [39, 39]]),
    buildRow([[0, 0], [12, 14], [39, 39]]),
    buildRow([[0, 0], [12, 14], [39, 39]]),
    buildRow([[0, 0], [6, 6], [39, 39]]),
    buildRow(border),
    buildRow(border),
    buildRow([[0, 39]]),
  ],
  scale: 12,
  lights: [
    { x: 60, y: 60, radius: 40, rgb: [1.0, 0.79, 0.4], intensity: 0.75 },   // 油灯（暖）
    { x: 390, y: 54, radius: 38, rgb: [0.23, 0.85, 1.0], intensity: 0.8 },  // 霓虹（青）
    { x: 390, y: 150, radius: 46, rgb: [0.88, 0.88, 1.0], intensity: 0.85 }, // 探照灯
    { x: 150, y: 150, radius: 30, rgb: [0.95, 0.55, 0.28], intensity: 0.6 }, // 桌灯
  ],
  floorRgb: [0.1, 0.085, 0.13],
  wallRgb: [0.48, 0.16, 0.11],
  probes: {
    lamp: { x: 60, y: 60 },
    neon: { x: 390, y: 54 },
    sofaShadow: { x: 300, y: 66 },
    corner: { x: 30, y: 180 },
  },
  checks: [],
};

const canvas = document.querySelector<HTMLCanvasElement>('#view');
const statusEl = document.querySelector<HTMLDivElement>('#status');
const probesEl = document.querySelector<HTMLDivElement>('#probes');
const stageSeed = document.querySelector<HTMLCanvasElement>('#stageSeed');
const stageSdf = document.querySelector<HTMLCanvasElement>('#stageSdf');
const stageRadiance = document.querySelector<HTMLCanvasElement>('#stageRadiance');
const stageFinal = document.querySelector<HTMLCanvasElement>('#stageFinal');

function readConfig(): RcPipelineConfig {
  return {
    ...DEFAULT_RC_CONFIG, // 并行会话新增字段(mergeMode / canonicalSpacing 等)默认跟随,不再逐字段补
    cascadeCount: Number((document.querySelector('#cascade') as HTMLSelectElement).value),
    baseIntervalPx: Number((document.querySelector('#interval') as HTMLInputElement).value),
    lightScale: Number((document.querySelector('#lightScale') as HTMLInputElement).value),
    ambientIntensity: Number((document.querySelector('#ambient') as HTMLInputElement).value),
    ditherEnabled: (document.querySelector('#dither') as HTMLInputElement).checked,
    twoLoop: (document.querySelector('#twoLoop') as HTMLInputElement).checked,
  };
}

function modulatedLights(t: number): LabScene['lights'] {
  const pulseOn = (document.querySelector('#pulse') as HTMLInputElement).checked;
  const [lamp, neon, searchlight, desk] = showcaseScene.lights;
  if (!pulseOn) return showcaseScene.lights;
  return [
    { ...lamp, intensity: lamp.intensity * (0.95 + 0.05 * Math.sin(t * 13.7)) },
    { ...neon, intensity: neon.intensity * (0.72 + 0.28 * Math.sin(t * Math.PI)) },
    { ...searchlight, intensity: searchlight.intensity * (0.85 + 0.15 * Math.sin(t * 0.4 * Math.PI)) },
    { ...desk, intensity: desk.intensity * (0.95 + 0.05 * Math.sin(t * 9.1 + 1.3)) },
  ];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('canvas 截图加载失败'));
    img.src = src;
  });
}

async function copyStageTo(target: HTMLCanvasElement | null, stage: RcReadStage, boost: number): Promise<void> {
  if (target === null || canvas === null) return;
  pipeline.debugShowStage(stage, boost);
  const img = await loadImage(canvas.toDataURL('image/png'));
  target.width = img.width;
  target.height = img.height;
  const ctx = target.getContext('2d');
  if (ctx === null) return;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);
}

let pipeline: RcPipeline;
try {
  pipeline = new RcPipeline(canvas as HTMLCanvasElement, { ditherEnabled: true });
  if (statusEl !== null) {
    statusEl.textContent = 'WebGL2 OK — 渲染中';
    statusEl.style.color = '#7ee787';
  }
} catch (e) {
  if (statusEl !== null) {
    statusEl.textContent = `初始化失败: ${e instanceof Error ? e.message : String(e)}`;
    statusEl.style.color = '#ff7b72';
  }
  throw e;
}

let frames = 0;
let fps = 0;
let lastFpsAt = performance.now();
let lastFrameMs = 0;

async function frame(t: number): Promise<void> {
  const scene: LabScene = {
    ...showcaseScene,
    lights: modulatedLights(t / 1000),
  };
  const images = buildSceneTextures(scene);
  const config = readConfig();

  const t0 = performance.now();
  pipeline.render(images, config);
  lastFrameMs = performance.now() - t0;

  // 阶段视图（passthrough 直出 + toDataURL）
  await copyStageTo(stageFinal, 'final', 1);
  await copyStageTo(stageSeed, 'seed', 1);
  await copyStageTo(stageSdf, 'sdf', 1);
  await copyStageTo(stageRadiance, 'radiance', 3);
  // 主画布恢复 final
  pipeline.debugShowStage('final', 1);

  frames += 1;
  const now = performance.now();
  if (now - lastFpsAt >= 500) {
    fps = Math.round((frames * 1000) / (now - lastFpsAt));
    frames = 0;
    lastFpsAt = now;
    const state = pipeline.state();
    const probes = scene.probes;
    const luma = (x: number, y: number): string => {
      const [r, g, b] = pipeline.readPixel('final', x, y);
      return ((0.299 * r + 0.587 * g + 0.114 * b) / 255).toFixed(2);
    };
    if (probesEl !== null) {
      probesEl.textContent =
        `fps=${fps} frame=${lastFrameMs.toFixed(1)}ms jfa=${state.jfaPasses} cascades=${state.activeCascades} ` +
        `degraded=${state.degraded} | ` +
        `油灯=${luma(probes.lamp.x, probes.lamp.y)} 霓虹=${luma(probes.neon.x, probes.neon.y)} ` +
        `沙发影=${luma(probes.sofaShadow.x, probes.sofaShadow.y)} 角落=${luma(probes.corner.x, probes.corner.y)}`;
    }
    window.__rcShowcase = {
      status: 'done',
      getState: () => ({
        fps,
        lastFrameMs,
        activeCascades: state.activeCascades,
        jfaPasses: state.jfaPasses,
        width: images.width,
        height: images.height,
        lightCount: scene.lights.length,
        degraded: state.degraded,
      }),
    };
  }
  requestAnimationFrame(frame);
}

void frame(performance.now());
