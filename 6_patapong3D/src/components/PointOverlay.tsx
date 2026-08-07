/**
 * components/PointOverlay.tsx — 失分时 +1 飘字
 *
 * M1.5 由 agent-ui 实现完整版(目前是 M0 占位)
 */

import { usePatapongStore } from '../store';

export function PointOverlay() {
  const phase = usePatapongStore((s) => s.phase);
  if (phase !== 'POINT') return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
      <div className="text-5xl font-bold text-pink-pata [text-shadow:_0_0_20px_#ff3aaa]">
        +1
      </div>
    </div>
  );
}
