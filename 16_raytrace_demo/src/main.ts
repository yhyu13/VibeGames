/**
 * src/main.ts — demo 启动引导
 *
 * 1. probeCapabilities();若 WebGL2 + Data3DTexture 可用 → 实例化 WebGL 后端 +
 *    backend 接口 + demoWorld;否则显示清晰的回退消息(复用返回的 reason)。
 * 2. 读取容器尺寸,动画轨道相机,暴露 window.__rtDemo 调试钩子。
 * 3. 监听 webglcontextlost 并 preventDefault()(允许恢复)。
 */

import './style.css';
import { probeCapabilities } from './engine/raytrace/capability';
import type { CapabilityResult } from './engine/raytrace/capability';
import type { RaytraceBackend } from './backend/RaytraceBackend';
import { RaytraceWebglBackend } from './backend/RaytraceWebglBackend';
import { demoWorld } from './scene/demoWorld';
import {
  createCameraState,
  createLightingState,
  makeSnapshot,
  updateCameraState,
} from './snapshot';
import type { VisualState } from './engine/raytrace/SceneContract';

interface RtdemoDebug {
  readonly kind: string;
  setQuality(level: number): void;
  fps: number;
  contextLost: boolean;
}

const container = document.getElementById('canvas') as HTMLElement;
const infoEl = document.getElementById('info-toggle') as HTMLElement | null;
const badgeEl = document.getElementById('qual-badge') as HTMLElement | null;

const capability: CapabilityResult = probeCapabilities();

function showFallback(reason: string | undefined): void {
  infoEl && (infoEl.style.display = 'block');
  const fallbackMsg = document.getElementById('fallback') as HTMLElement;
  const msg = document.getElementById('fallback-reason') as HTMLElement;
  fallbackMsg.style.display = 'block';
  msg.textContent = reason ?? 'unknown';
}

/** 更新顶部质量徽章文本 */
function renderQualityBadge(ctx: RtdemoDebug): void {
  if (!badgeEl) return;
  badgeEl.textContent = `kind=${ctx.kind} · fps=${Math.round(ctx.fps)} · contextLost=${ctx.contextLost}`;
}

if (capability.kind === 'raytrace') {
  const backend: RaytraceBackend = new RaytraceWebglBackend(demoWorld);
  backend.init(container);

  // 尺寸:跟随容器
  const onResize = (): void => {
    backend.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
  };
  window.addEventListener('resize', onResize);
  onResize();

  // 上下文丢失:preventDefault 允许恢复;恢复后标记并继续
  let contextLost = false;
  const canvas = (backend as RaytraceWebglBackend).canvas;
  canvas.addEventListener('webglcontextlost', (e: Event) => {
    e.preventDefault();
    contextLost = true;
    console.warn('[rtdemo] webglcontextlost — awaiting restore');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    onResize();
    console.info('[rtdemo] webglcontextrestored');
  });

  // 动画循环
  const camera = createCameraState();
  const lighting = createLightingState();
  const visual: VisualState = { lighting };
  let last = performance.now();
  let fps = 0;
  let frames = 0;
  let fpsWindowStart = performance.now();

  function frame(now: number): void {
    const elapsed = (now - last) / 1000;
    last = now;

    const snapshot = makeSnapshot(now / 1000);
    updateCameraState(camera, snapshot);
    backend.render(snapshot, visual, camera, elapsed);

    // 简单 FPS(1s 平滑窗口)
    frames += 1;
    if (now - fpsWindowStart >= 1000) {
      fps = Math.round((frames * 1000) / (now - fpsWindowStart));
      frames = 0;
      fpsWindowStart = now;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const dbg: RtdemoDebug = {
    kind: backend.kind,
    setQuality(level: number): void {
      backend.setQuality(level);
    },
    get fps(): number {
      return fps;
    },
    get contextLost(): boolean {
      return contextLost;
    },
  };
  window.__rtDemo = dbg;
  renderQualityBadge(dbg);
} else {
  showFallback(capability.reason);
  const dbg: RtdemoDebug = {
    kind: capability.kind,
    setQuality(): void {
      /* 无后端 */
    },
    fps: 0,
    contextLost: false,
  };
  window.__rtDemo = dbg;
}
