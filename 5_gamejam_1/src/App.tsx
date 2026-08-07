import { useEffect, useState } from 'react';
import { useUiStore } from './store';
import type { GamePhase } from './core/types';
import GameCanvas, { sendUiCommand } from './components/GameCanvas';
import Menu from './components/Menu';
import HUD from './components/HUD';
import Dialogue from './components/Dialogue';
import ScriptPicker from './components/ScriptPicker';
import RatingSheet from './components/RatingSheet';
import Diary from './components/Diary';
import Archive from './components/Archive';
import PauseOverlay from './components/PauseOverlay';
import Ending from './components/Ending';
import MouseRhythmOverlay from './components/MouseRhythmOverlay';
import AudienceBarrage from './components/AudienceBarrage';

// 05 §1.1：run 内阶段（HUD / 各 overlay 的挂载条件）
const RUN_PHASES = new Set<GamePhase>(['WAIT', 'SENSE', 'PERFORM', 'EVALUATE', 'DIARY']);

export default function App() {
  const phase = useUiStore((s) => s.runState.phase);
  const runActive = useUiStore((s) => s.runState.runActive);
  const menuScreen = useUiStore((s) => s.menu.screen);
  const dialogueActive = useUiStore((s) => s.dialogue.active);
  const [prevScreen, setPrevScreen] = useState<'title' | 'intro' | 'pause' | 'ending'>('title');

  const inRun = runActive && RUN_PHASES.has(phase);
  const paused = menuScreen === 'pause' || phase === 'PAUSE';

  // 全局 Esc：非暂停时打开暂停（记录来源屏幕）；暂停中由 PauseOverlay 自处理
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const s = useUiStore.getState();
      if (s.menu.screen === 'pause' || s.runState.phase === 'PAUSE') return;
      if (s.runState.runActive && (s.menu.screen === 'title' || s.menu.screen === 'intro')) {
        setPrevScreen(s.menu.screen);
        s.setMenu('pause');
        sendUiCommand({ kind: 'pauseToggle' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-abyss">
      <GameCanvas />
      {(menuScreen === 'intro' || (menuScreen === 'title' && !runActive)) && <Menu />}
      {inRun && <HUD />}
      <AudienceBarrage />
      {inRun && phase === 'PERFORM' && <MouseRhythmOverlay />}
      {inRun && phase === 'WAIT' && <ScriptPicker />}
      {inRun && phase === 'WAIT' && <Archive />}
      {inRun && phase === 'EVALUATE' && <RatingSheet />}
      {inRun && phase === 'DIARY' && <Diary />}
      {dialogueActive && !paused && <Dialogue />}
      {paused && <PauseOverlay prevScreen={prevScreen} />}
      {(phase === 'ENDING_NORMAL' || phase === 'ENDING_HIDDEN') && <Ending />}
    </div>
  );
}
