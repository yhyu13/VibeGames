/**
 * components/Menu.tsx — 主菜单
 *
 * M1.5 由 agent-ui 实现完整版(目前是 M0 占位)
 */

import { usePatapongStore } from '../store';

export function Menu() {
  const phase = usePatapongStore((s) => s.phase);
  const setPhase = usePatapongStore((s) => s.setPhase);

  if (phase !== 'MENU') return null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/40">
      <h1 className="text-7xl font-bold text-ball-pata [text-shadow:_0_0_30px_#ffd83a]">
        PATAPONG
      </h1>
      <p className="text-sm uppercase tracking-[0.3em] text-pink-pata">
        3D voxel · vibe pong
      </p>
      <button
        type="button"
        className="mt-6 rounded border-2 border-emerald-pata bg-emerald-pata/20 px-12 py-3 text-lg font-bold text-emerald-pata transition hover:bg-emerald-pata/30"
        onClick={() => setPhase('READY')}
      >
        PLAY
      </button>
      <div className="mt-2 text-xs text-white/50">
        W/S: Move · Space: Launch · R: Rematch · Esc: Menu
      </div>
    </div>
  );
}
