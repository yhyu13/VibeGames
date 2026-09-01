/**
 * main.tsx — React 入口(intro → battle)
 *
 * 两套引擎并行:
 *  - IntroEngine:觉醒 cinematic(raytrace 默认 / raster 回退),负责 intro 演出与画布。
 *  - GameEngine:战斗主循环,真正调用 Simulation.step(dt),把冻结 FSM 跑起来。
 * intro 完成后标题卡提供 START BATTLE(→ SONG)与 REPLAY;战斗中由快照驱动 HUD。
 * UI 命令桥:组件只发命令,IntroEngine 与 GameEngine 各自消费自己的分支。
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { usePatapongStore } from './store';
import { GameEngine } from './engine/GameEngine';
import { IntroEngine } from './engine/IntroEngine';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found in index.html');
}

const intro = new IntroEngine();
const game = new GameEngine();

// UI 命令桥:组件只发命令,引擎消费(store 不写模拟)
// intro 命令(replay/skipIntro)归 IntroEngine;战斗命令(startMatch/rematch/toMenu…)归 GameEngine
usePatapongStore.getState().setUiBridge((cmd) => {
  intro.handleUiCommand(cmd);
  game.handleUiCommand(cmd);
});

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// 等 React 首次提交挂载 #three-canvas-container 后再启动引擎(engine.start 内部也会自愈重试)
requestAnimationFrame(() => {
  intro.start();
  game.start();
});
