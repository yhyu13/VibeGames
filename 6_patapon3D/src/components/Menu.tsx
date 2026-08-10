/**
 * components/Menu.tsx - v2.0 main menu
 *
 * Divine drummer intro + PLAY + command grammar preview + stats.
 */

import { usePatapongStore } from '../store';
import { COMMANDS } from '../core/data/commands';
import type { NoteType } from '../core/types';

const DRUM_LETTER: Record<NoteType, string> = {
  PATA: 'P',
  PON: 'O',
  DON: 'D',
  CHAKA: 'C',
};

export function Menu() {
  const phase = usePatapongStore((s) => s.phase);
  const stats = usePatapongStore((s) => s.stats);
  const settings = usePatapongStore((s) => s.settings);
  const introComplete = usePatapongStore((s) => s.intro.complete);
  const battleReady = usePatapongStore((s) => s.battleReady);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  // The intro cinematic runs first; the classic menu appears after the battle
  // engine has taken over the canvas (intro.complete → ENTER THE ARENA).
  if (phase !== 'MENU' || !introComplete || !battleReady) return null;

  const muted = settings?.muted ?? false;

  const handleReset = () => {
    if (window.confirm('Clear stats and settings? This cannot be undone.')) {
      sendUiCommand('resetData');
    }
  };

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-y-auto bg-black/60 py-6">
      <h1 className="pata-menu-in bg-gradient-to-r from-[#3affc8] via-[#ffd83a] to-[#ff3aaa] bg-clip-text font-arcade text-7xl font-black italic tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(255,216,58,0.35)]">
        PATAPONG 3D
      </h1>
      <p className="-mt-2 text-xs tracking-[0.5em] text-white/60">
        DIVINE DRUMS · ARMY vs BOSS
      </p>

      <button
        type="button"
        onClick={() => sendUiCommand('startMatch')}
        className="btn-pata pointer-events-auto rounded-lg border-2 border-[#ff3aaa] bg-[#1a1a3a] px-16 py-4 text-3xl font-bold tracking-[0.3em] text-white shadow-[0_0_25px_rgba(255,58,170,0.45)] hover:bg-[#2a2a4a]"
      >
        PLAY
      </button>

      <p className="text-[10px] tracking-[0.25em] text-[#ffd83a]/80">
        You are the drummer · 4 beats = 1 command
      </p>

      {/* command grammar */}
      <div className="grid max-w-2xl grid-cols-2 gap-x-8 gap-y-1 font-mono text-xs text-white/70">
        {COMMANDS.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="flex gap-0.5">
              {c.sequence.map((b: NoteType, i: number) => (
                <span
                  key={i}
                  className="flex h-5 w-5 items-center justify-center rounded border border-white/25 bg-black/40 text-[10px] font-bold text-[#ffd83a]"
                >
                  {DRUM_LETTER[b]}
                </span>
              ))}
            </span>
            <span className="font-bold text-white">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 font-mono text-sm text-white/70">
        <span>
          matches <span className="text-white">{stats?.totalMatches ?? '—'}</span>
        </span>
        <span className="text-white/25">·</span>
        <span>
          P1 wins <span className="text-[#3affc8]">{stats?.p1Wins ?? '—'}</span>
        </span>
        <span className="text-white/25">·</span>
        <span>
          boss wins <span className="text-[#ff3a3a]">{stats?.bossWins ?? '—'}</span>
        </span>
        <span className="text-white/25">·</span>
        <span>
          best combo <span className="text-[#ffd83a]">{stats?.longestCombo ?? '—'}</span>
        </span>
      </div>

      <div className="flex items-center gap-4 font-mono text-xs">
        <button
          type="button"
          onClick={() => sendUiCommand('toggleMute')}
          className="btn-pata rounded border border-[#ffd83a]/40 bg-[#1a1a3a] px-4 py-1.5 text-[#ffd83a]"
        >
          MUTE: {muted ? 'ON' : 'OFF'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn-pata rounded border border-white/20 bg-[#1a1a3a] px-4 py-1.5 text-white/60"
        >
          RESET DATA
        </button>
        <span className="text-white/40">R rematch · Esc menu · M mute</span>
      </div>
    </div>
  );
}
