/**
 * components/PerfBadge.tsx — DEV: 显示性能降级状态(M2 完善 by agent-ui)
 *
 * 仅 DEV 渲染(生产不显示)。读 store.perfDegradation:
 * 空数组 → 'PERF: OK'(青绿);非空 → 逐项映射英文标签
 * ('PARTICLE_BURST_HALF'→'PARTICLE HALF'、'BLOOM_OFF'→'BLOOM OFF',橙色)。
 */

import { usePatapongStore } from '../store';
import type { PerfDegradation } from '../core/types';

const DEGRADATION_LABELS: Record<PerfDegradation, string> = {
  PARTICLE_BURST_HALF: 'PARTICLE HALF',
  BLOOM_OFF: 'BLOOM OFF',
};

export function PerfBadge() {
  const perfDegradation = usePatapongStore((s) => s.perfDegradation);

  if (!import.meta.env.DEV) return null;

  return (
    <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px]">
      {perfDegradation.length === 0 ? (
        <span className="text-[#3affc8]">PERF: OK</span>
      ) : (
        <span className="text-[#ff7a3a]">
          PERF: {perfDegradation.map((d) => DEGRADATION_LABELS[d]).join(' · ')}
        </span>
      )}
    </div>
  );
}
