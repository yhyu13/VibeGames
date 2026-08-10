/**
 * main.tsx — React 入口 + intro → battle 交接
 *
 * 默认流程:IntroEngine(觉醒 cinematic)先跑;intro 完成(或标题卡点
 * ENTER THE ARENA / skip)→ intro.stop() 释放画布,GameEngine(battle,
 * raytrace 默认 / raster 回退)接管同一 #three-canvas-container。
 * UI 命令桥:组件只发命令;intro 未完成时 replay/skipIntro 路由到 intro,
 * 其余命令路由到 battle 引擎。
 *
 * `?demo` → 独立体素展示场景(不挂 React UI)。
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { usePatapongStore } from './store';
import { Simulation } from './core/simulation/Simulation';
import { GameEngine } from './engine/GameEngine';
import { IntroEngine } from './engine/IntroEngine';
import { DemoShowcase } from './demo/DemoShowcase';
import './styles.css';

/** battle sim 种子(boss 随机;谱面种子在 core/data/songSeeds.ts) */
const SIM_SEED = 20260810;

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found in index.html');
}

// 独立体素展示场景:`?demo` 进入,不挂 React UI,与 intro 完全隔离
if (new URLSearchParams(window.location.search).has('demo')) {
  rootEl.replaceChildren();
  new DemoShowcase().start();
} else {
  const intro = new IntroEngine();
  let game: GameEngine | null = null;

  /** battle 接管:停 intro、释放其画布,起 GameEngine(幂等) */
  const startBattle = (): void => {
    if (game) return;
    intro.stop();
    game = new GameEngine(new Simulation({ seed: SIM_SEED }));
    game.start();
    usePatapongStore.setState({ battleReady: true });
  };

  // UI 命令桥:组件只发命令,引擎消费(store 不写模拟)
  usePatapongStore.getState().setUiBridge((cmd) => {
    if (cmd === 'replay' || cmd === 'skipIntro') {
      const state = usePatapongStore.getState();
      if (state.intro.complete || state.battleReady) {
        startBattle();
        return;
      }
      intro.handleUiCommand(cmd);
      return;
    }
    game?.handleUiCommand(cmd);
  });

  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  // 等 React 首次提交挂载 #three-canvas-container 后再启动引擎(engine.start 内部也会自愈重试)
  requestAnimationFrame(() => intro.start());
}
