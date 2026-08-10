/**
 * components/WinScreen.tsx — v2.0 MATCH_OVER 结算屏
 *
 * 'MATCH OVER' + VICTORY(金)/ DEFEAT(暗红)+ 本局 max combo + 生涯战绩;
 * REMATCH / MENU 按钮;R / Esc 快捷键提示。
 * 胜负来自 store.winner(sim matchOver 事件写入)。
 */

import { usePatapongStore } from '../store';

export function WinScreen() {
  const phase = usePatapongStore((s) => s.phase);
  const winner = usePatapongStore((s) => s.winner);
  const rhythm = usePatapongStore((s) => s.rhythm);
  const stats = usePatapongStore((s) => s.stats);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MATCH_OVER') return null;

  const p1Won = winner === 'P1';

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70">
      <div className="text-sm tracking-[0.5em] text-[#ff3aaa] [text-shadow:0_0_15px_#ff3aaa]">
        MATCH OVER
      </div>

      <div
        className={
          p1Won
            ? 'font-arcade text-7xl font-black italic tracking-tight text-[#ffd83a] drop-shadow-[0_0_30px_rgba(255,216,58,0.5)]'
            : 'font-arcade text-7xl font-black italic tracking-tight text-[#b91c1c] drop-shadow-[0_0_30px_rgba(185,28,28,0.5)]'
        }
      >
        {p1Won ? 'VICTORY' : 'DEFEAT'}
      </div>
      <p className="-mt-3 text-sm tracking-[0.4em] text-white/60">
        {p1Won ? 'THE DRUMS PREVAIL' : 'MOLOCH STANDS'}
      </p>

      <div className="font-mono text-sm text-white/70">
        match best combo <span className="text-[#ffd83a]">{rhythm.maxCombo}</span>
        <span className="mx-3 text-white/25">·</span>
        all-time <span className="text-[#ffd83a]">{stats?.longestCombo ?? '—'}</span>
      </div>

      <p className="text-sm text-white/50">R rematch · Esc menu</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => sendUiCommand('rematch')}
          className="btn-pata rounded-lg border-2 border-[#3affc8] bg-[#3affc8]/15 px-10 py-3 text-xl font-bold text-[#3affc8] shadow-[0_0_20px_rgba(58,255,200,0.35)]"
        >
          REMATCH
        </button>
        <button
          type="button"
          onClick={() => sendUiCommand('toMenu')}
          className="btn-pata rounded-lg border-2 border-[#ff3aaa] bg-[#ff3aaa]/15 px-10 py-3 text-xl font-bold text-[#ff3aaa] shadow-[0_0_20px_rgba(255,58,170,0.35)]"
        >
          MENU
        </button>
      </div>
    </div>
  );
}
