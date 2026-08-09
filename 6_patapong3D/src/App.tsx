/**
 * App.tsx - top-level container
 *
 * v2.0 divine drums - 4-phase FSM: MENU / READY / SONG / MATCH_OVER.
 * Overlays mount here; each component decides visibility from store.phase.
 */

import { FeverOverlay } from './components/FeverOverlay';
import { HUD } from './components/HUD';
import { IntroScene } from './components/IntroScene';
import { JudgementOverlay } from './components/JudgementOverlay';
import { Menu } from './components/Menu';
import { PerfBadge } from './components/PerfBadge';
import { ReadyCountdown } from './components/ReadyCountdown';
import { RhythmBar } from './components/RhythmBar';
import { WinScreen } from './components/WinScreen';

export function App() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* 3D court: GameEngine.start() attaches its own canvas here */}
      <div id="three-canvas-container" className="absolute inset-0" />

      {/* React UI overlay (pointer-events-none; clickable elements re-enable it) */}
      <div className="pointer-events-none absolute inset-0">
        <HUD />
        <ReadyCountdown />
        <RhythmBar />
        <JudgementOverlay />
        <FeverOverlay />
        <IntroScene />
        <WinScreen />
        <Menu />
        <PerfBadge />
      </div>
    </div>
  );
}
