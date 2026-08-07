import { useEffect, useState } from 'react';
import { useUiStore } from './store';
import type { GamePhase } from './core/types';
import GameCanvas from './components/GameCanvas';
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

const RUN_PHASES = new Set<GamePhase>(['WAIT', 'SENSE', 'PERFORM', 'EVALUATE', 'DIARY']);

export default function App() {
  const phase = useUiStore((s) => s.runState.phase);
  const runActive = useUiStore((s) => s.runState.runActive);
  const dialogueActive = useUiStore((s) => s.dialogue.active);
  const showChoice = useUiStore((s) => s.dialogue.showChoice);
  const prompt = useUiStore((s) => s.anxiety.prompt);
  const promptKey = useUiStore((s) => s.anxiety.promptKey);
  const [prevScreen, setPrevScreen] = useState<'title' | 'intro' | 'pause' | 'ending'>('title');

  const inRun = runActive && RUN_PHASES.has(phase);
  const paused = phase === 'PAUSE';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const s = useUiStore.getState();
      if (s.runState.phase === 'PAUSE') return;
      if (s.runState.runActive) {
        setPrevScreen('title');
        document.dispatchEvent(new CustomEvent('uiCommand', { detail: { kind: 'pauseToggle' } }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-abyss">
      <GameCanvas />
      {phase === 'MENU' && <Menu />}
      {inRun && <HUD />}
      <AudienceBarrage />
      {inRun && phase === 'PERFORM' && <MouseRhythmOverlay />}
      {inRun && phase === 'WAIT' && <ScriptPicker />}
      {inRun && phase === 'WAIT' && <Archive />}
      {inRun && phase === 'EVALUATE' && <RatingSheet />}
      {inRun && phase === 'DIARY' && <Diary />}
      {dialogueActive && !paused && <Dialogue choice={showChoice} />}
      {paused && <PauseOverlay prevScreen={prevScreen} />}
      {(phase === 'ENDING_NORMAL' || phase === 'ENDING_HIDDEN') && <Ending />}
      {prompt && !paused && (
        <div key={promptKey} className="band-toast pointer-events-none fixed left-1/2 top-[16%] z-40 -translate-x-1/2 text-center">
          <div className="rounded-full border border-indigo-300/25 bg-[#0d1228]/80 px-5 py-2 font-serif-cn text-sm text-indigo-100">
            {prompt}
          </div>
        </div>
      )}
    </div>
  );
}
