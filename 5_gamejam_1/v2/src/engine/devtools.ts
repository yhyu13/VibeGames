// engine/devtools.ts — DEV 构建暴露调试句柄

import type { SimApi } from '../core/simulation/Simulation';
import type { GameEngine } from './GameEngine';
import { WORLD } from '../core/world/world';

declare global {
  interface Window {
    __sim?: SimApi;
    __gameManifest?: () => unknown;
    __engine?: GameEngine;
  }
}

export function installDevTools(opts: { sim: SimApi; engine: GameEngine }): void {
  window.__sim = opts.sim;
  window.__engine = opts.engine;
  window.__gameManifest = () => ({
    world: WORLD,
    phase: opts.sim.getState().phase,
    boss: opts.sim.getState().boss,
  });
}
