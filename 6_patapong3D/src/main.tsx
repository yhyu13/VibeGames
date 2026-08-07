/**
 * main.tsx — React 入口
 *
 * M1.5 by agent-ui:挂载 App;创建 Simulation + GameEngine(import 自 core/engine);
 * 把引擎命令桥注册到 store(组件 sendUiCommand → engine.handleUiCommand,引擎驱动 FSM);
 * engine.start() 启动 rAF 主循环(引擎自建 canvas 挂到 #three-canvas-container)。
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { usePatapongStore } from './store';
import { Simulation } from './core/simulation/Simulation';
import { GameEngine } from './engine/GameEngine';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found in index.html');
}

const sim = new Simulation({
  seed: Math.floor(Date.now() / 1000) % 2147483647,
  audioMuted: false,
  audioVolume: 0.5,
});
const engine = new GameEngine(sim);

// UI 命令桥:组件只发命令,引擎消费(store 不写模拟)
usePatapongStore.getState().setUiBridge((cmd) => engine.handleUiCommand(cmd));

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// 等 React 首次提交挂载 #three-canvas-container 后再启动引擎(engine.start 内部也会自愈重试)
requestAnimationFrame(() => engine.start());
