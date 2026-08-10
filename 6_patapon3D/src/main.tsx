/**
 * main.tsx — React 入口(intro-only)
 *
 * IntroEngine 跑觉醒 cinematic(raytrace 默认 / raster 回退);
 * intro 完成后标题卡提供 REPLAY(回到输入阶段重玩)。
 * UI 命令桥:组件只发命令,全部路由到 IntroEngine。
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { usePatapongStore } from './store';
import { IntroEngine } from './engine/IntroEngine';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found in index.html');
}

const intro = new IntroEngine();

// UI 命令桥:组件只发命令,引擎消费(store 不写模拟)
usePatapongStore.getState().setUiBridge((cmd) => {
  intro.handleUiCommand(cmd);
});

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// 等 React 首次提交挂载 #three-canvas-container 后再启动引擎(engine.start 内部也会自愈重试)
requestAnimationFrame(() => intro.start());
