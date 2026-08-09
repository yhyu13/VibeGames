// src/App.tsx — 根组件:保留 #game-canvas 挂载点,按 GamePhase(§4.3)渲染覆盖层
import * as React from 'react';
import { lazy, Suspense, useEffect } from 'react';
import type { GamePhase } from './core/types';
import { GamePhase as GP } from './core/types';
import { IS_DEV, sendUiCommand, useUiStore } from './store';
import { Simulation } from './core/simulation/Simulation';
import { GameEngine } from './engine/GameEngine';
import { MainMenu } from './components/MainMenu';
import { MissionSelect } from './components/MissionSelect';
import { HUD } from './components/HUD';
import { MaskSelect } from './components/MaskSelect';
import { ScoreOverlay } from './components/ScoreOverlay';
import { DeathScreen } from './components/DeathScreen';
import { PauseOverlay } from './components/PauseOverlay';

// DevPanel:DEV-only 懒加载(生产构建 DevPanel 恒为 null,chunk 不会被请求)
const DevPanel = IS_DEV
  ? lazy(() => import('./components/DevPanel').then((m) => ({ default: m.DevPanel })))
  : null;

function LoadingOverlay(): React.JSX.Element {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-shanghai-ink/80">
      <div className="animate-flicker text-3xl tracking-[0.4em] text-shanghai-ivory">任务加载中…</div>
      <div className="mt-4 text-sm text-shanghai-steel">LOADING MISSION</div>
    </div>
  );
}

function MissionCompleteFlash(): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="text-shadow-pixel animate-flicker text-7xl tracking-[0.25em] text-shanghai-flash">
        任务完成
      </div>
    </div>
  );
}

/** B04:PLAY 阶段覆盖层 = HUD + 条件暂停遮罩 */
function PlayOverlay(): React.JSX.Element {
  const paused = useUiStore((s) => s.paused);
  return (
    <>
      <HUD />
      {paused && <PauseOverlay />}
    </>
  );
}

function renderOverlay(phase: GamePhase): React.JSX.Element | null {
  switch (phase) {
    case GP.TITLE:
      return <MainMenu />;
    case GP.MISSION_SELECT:
      return <MissionSelect />;
    case GP.MISSION_LOADING:
      return <LoadingOverlay />;
    case GP.MISSION_PLAY:
      return <PlayOverlay />;
    case GP.MISSION_DEATH:
      return (
        <>
          <HUD />
          <DeathScreen />
        </>
      );
    case GP.MISSION_END:
      return (
        <>
          <HUD />
          <MissionCompleteFlash />
        </>
      );
    case GP.SCORE:
      return <ScoreOverlay />;
    case GP.MASK_SELECT:
      return <MaskSelect />;
    default:
      return null;
  }
}

export function App(): React.JSX.Element {
  const phase = useUiStore((s) => s.phase);
  const showDevPanel = useUiStore((s) => s.showDevPanel);
  const setShowDevPanel = useUiStore((s) => s.setShowDevPanel);

  // 引擎启动接线:创建 Simulation + GameEngine(构造时注入 canvas + 注册 devtools/UI 桥),
  // 挂载即 start() 跑主循环。React 18 StrictMode 开发期双挂载:卸载时 stop() 并清掉
  // 注入的 canvas,避免重复构造 / 事件泄漏;生产环境单挂载,行为一致。
  useEffect(() => {
    const host = document.getElementById('game-canvas');
    if (!host) return;
    const sim = new Simulation();
    const engine = new GameEngine(sim, host);
    engine.start();
    return () => {
      engine.stop();
      host.querySelectorAll('canvas').forEach((c) => c.remove());
    };
  }, []);

  // 全局快捷键:Esc → 返回标题(命令经事件桥入队,引擎 M1 消费);Ctrl+Shift+D → DEV 面板
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && phase !== GP.TITLE) {
        sendUiCommand({ kind: 'quitToTitle' });
      }
      if (IS_DEV && e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        setShowDevPanel(!showDevPanel);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, showDevPanel, setShowDevPanel]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-shanghai-ink font-pixel text-shanghai-paper">
      {/* 引擎挂载点(M1 由 GameEngine 在此注入 canvas;M0 无引擎 → 空占位) */}
      <div id="game-canvas" className="absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-20">{renderOverlay(phase)}</div>
      {/* CRT 扫描线(mix-blend-multiply 叠加在所有内容之上,不挡交互) */}
      <div className="scanlines pointer-events-none absolute inset-0 z-40" aria-hidden="true" />
      {IS_DEV && showDevPanel && DevPanel !== null && (
        <Suspense fallback={null}>
          <div className="absolute right-2 top-2 z-50 w-72">
            <DevPanel />
          </div>
        </Suspense>
      )}
    </div>
  );
}
