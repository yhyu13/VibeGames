/**
 * components/ReadyCountdown.tsx — 3-2-1 大字
 *
 * M1.5 由 agent-ui 实现完整版(目前是 M0 占位)
 */

import { usePatapongStore } from '../store';

export function ReadyCountdown() {
  const phase = usePatapongStore((s) => s.phase);
  if (phase !== 'READY') return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="text-[160px] font-bold leading-none text-emerald-pata [text-shadow:_0_0_40px_#3affc8]">
        3
      </div>
    </div>
  );
}
