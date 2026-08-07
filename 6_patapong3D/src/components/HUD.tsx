/**
 * components/HUD.tsx — 比分 / rally / milestone 提示
 *
 * M1.5 由 agent-ui 实现完整版(目前是 M0 占位,直接读 zustand 字段)
 */

import { usePatapongStore } from '../store';

export function HUD() {
  const phase = usePatapongStore((s) => s.phase);

  if (phase !== 'PLAY' && phase !== 'POINT') return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-between px-8 font-mono text-3xl">
      <div className="text-emerald-pata [text-shadow:_0_0_10px_#3affc8]">P1: 0</div>
      <div className="text-sm text-white/50">TODO M1.5 · HUD</div>
      <div className="text-coral-pata [text-shadow:_0_0_10px_#ff7a3a]">AI: 0</div>
    </div>
  );
}
