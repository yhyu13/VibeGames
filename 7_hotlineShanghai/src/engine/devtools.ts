// src/engine/devtools.ts — DEV 钩子(TDD §3.4)
// 仅 import.meta.env.DEV 时注入 window.__gameManifest / __sim / __simEvents / __rcPipeline;
// 生产构建(DEV === false)不注册、不引用。
/// <reference types="vite/client" />
import type { ISimulation, SimEvent } from '../core/types';
import { describeWorld, describeRules, describeEntities } from '../core/world/WorldManifest';
import { RC_LIGHT_TABLE } from '../core/data/lights';

// §3.4:__simEvents() 返回最近 64 个事件
const EVENT_WINDOW = 64;

/** __rcSetConfig 的调参形状(06 §7 P1 亮度定档扫描用;结构兼容 RcPipelineConfig 子集) */
export interface RcTweakConfig {
  cascadeCount?: number;
  lightScale?: number;
  ambientIntensity?: number;
  /** 调试染色:非 0 时 final.frag 把 RC radiance 层以纯色覆盖在压暗 base 上(对齐检查用) */
  debugTint?: [number, number, number];
}

declare global {
  interface Window {
    __gameManifest?: () => string; // describeWorld() + describeRules() + describeEntities() + sim 快照
    __sim?: unknown; // Simulation 实例(只读调试)
    __simEvents?: () => SimEvent[]; // 最近 64 个事件
    __rcPipeline?: unknown; // RC 管线状态(只读,形状见 §3.4 / §15.6)
    __rcSetConfig?: (tweak: RcTweakConfig) => void; // 运行时调 RC uniform(P1 定档扫描)
    __rcPipelineInstance?: unknown; // RC 管线实例(只读;readPixel/debugShowStage 阶段纹理调试)
  }
}

// 注入 DEV 钩子。rcState 传 RcPipeline.state() 的结果(只读);setRcConfig 为
// 引擎侧的 RcPipeline.setConfig 透传(P1 亮度定档用,生产构建不暴露)。
export function installDevtools(
  sim: ISimulation,
  rcState: unknown,
  setRcConfig?: (tweak: RcTweakConfig) => void,
  rcPipelineInstance?: unknown,
): void {
  if (!import.meta.env.DEV) return;

  window.__gameManifest = (): string => {
    const snap = sim.snapshot();
    return [
      describeWorld(snap),
      describeRules(),
      describeEntities(snap),
      '# Lights',
      ...Object.entries(RC_LIGHT_TABLE).map(
        ([kind, spec]) => `- ${kind}: ${spec.colorHex} i=${spec.intensity} r=${spec.radius}`,
      ),
      '# Sim Snapshot',
      JSON.stringify(snap, null, 2),
      '# RcPipeline',
      rcState === undefined ? 'null' : JSON.stringify(rcState, null, 2),
    ].join('\n\n');
  };

  window.__sim = sim;
  // B08:读 recentEvents(不被引擎 drain 清空),缺省回退 events
  window.__simEvents = (): SimEvent[] => {
    const s = sim as ISimulation & { recentEvents?: SimEvent[] };
    return (Array.isArray(s.recentEvents) ? s.recentEvents : sim.events).slice(-EVENT_WINDOW);
  };
  window.__rcPipeline = rcState;
  if (rcPipelineInstance !== undefined) {
    window.__rcPipelineInstance = rcPipelineInstance;
  }
  if (setRcConfig !== undefined) {
    window.__rcSetConfig = (tweak: RcTweakConfig): void => {
      setRcConfig(tweak);
    };
  }
}

// 卸载 DEV 钩子(仅 DEV 生效)
export function uninstallDevtools(): void {
  if (!import.meta.env.DEV) return;
  delete window.__gameManifest;
  delete window.__sim;
  delete window.__simEvents;
  delete window.__rcPipeline;
  delete window.__rcPipelineInstance;
  delete window.__rcSetConfig;
}
