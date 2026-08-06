// engine/devtools.ts — DEV 钩子（TDD §3.4）：__gameManifest / __sim / renderer.info + 可选 Tweakpane 桥。
// 仅 import.meta.env.DEV 注册；生产构建不引用、不注入。

import type { SimApi } from '../core/simulation/Simulation';

declare global {
  interface Window {
    __gameManifest?: () => string; // worldText.buildPromptContext(sim) 全文
    __sim?: unknown; // Simulation 实例（只读调试）
    __rendererInfo?: () => string; // renderer.info 读数（draw calls / tris）
  }
}

export interface DevToolsHooks {
  sim: SimApi;
  rendererInfo: () => string;
}

export function installDevTools(hooks: DevToolsHooks): void {
  if (!import.meta.env.DEV) return;
  window.__gameManifest = () => hooks.sim.getManifestText();
  window.__sim = hooks.sim;
  window.__rendererInfo = hooks.rendererInfo;
  void installTweakpane();
}

/**
 * Tweakpane 为可选依赖（TDD §2.4/§3.2 不进生产依赖图）：
 * 用 @vite-ignore 绕过 Rollup 静态解析，未安装时动态 import 失败 → 静默跳过。
 */
async function installTweakpane(): Promise<void> {
  try {
    // 非字面量 specifier：绕过 TS/Rollup 静态解析，未安装时运行期 reject → catch
    const specifier = 'tweakpane';
    const mod = await import(/* @vite-ignore */ specifier);
    const Ctor = (mod as { Pane?: unknown }).Pane ?? (mod as { default?: unknown }).default;
    if (typeof Ctor !== 'function') return;
    const Pane = Ctor as new (opts?: unknown) => { addBinding?: (t: unknown, k: string, o?: unknown) => unknown };
    const pane = new Pane({ title: 'Boss 焦虑 DEV' });
    if (typeof pane.addBinding !== 'function') return;
    const state = { bloomPulse: 0, vignetteBoost: 0, flash: 0 };
    pane.addBinding(state, 'bloomPulse', { min: 0, max: 1, step: 0.05 });
    pane.addBinding(state, 'vignetteBoost', { min: 0, max: 0.5, step: 0.05 });
    pane.addBinding(state, 'flash', { min: 0, max: 1, step: 0.05 });
  } catch {
    // tweakpane 未安装 → 忽略
  }
}
