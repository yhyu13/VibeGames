/**
 * components/WinScreen.tsx — VICTORY / DEFEAT 弹窗
 *
 * M3.1 由 agent-ui 实现完整版(目前是 M0 占位)
 */

import { usePatapongStore } from '../store';

export function WinScreen() {
  const phase = usePatapongStore((s) => s.phase);
  const setPhase = usePatapongStore((s) => s.setPhase);

  if (phase !== 'MATCH_OVER') return null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/70">
      <div className="text-7xl font-bold text-emerald-pata [text-shadow:_0_0_40px_#3affc8]">
        VICTORY
      </div>
      <div className="text-3xl text-white/80">7 - 0</div>
      <div className="flex gap-4">
        <button
          type="button"
          className="rounded border-2 border-emerald-pata bg-emerald-pata/20 px-8 py-2 text-emerald-pata transition hover:bg-emerald-pata/30"
          onClick={() => setPhase('READY')}
        >
          REMATCH
        </button>
        <button
          type="button"
          className="rounded border-2 border-coral-pata bg-coral-pata/20 px-8 py-2 text-coral-pata transition hover:bg-coral-pata/30"
          onClick={() => setPhase('MENU')}
        >
          MENU
        </button>
      </div>
    </div>
  );
}
