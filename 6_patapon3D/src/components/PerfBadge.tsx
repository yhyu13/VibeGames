/**
 * components/PerfBadge.tsx — DEV: 渲染路径 + 质量档位 + 性能降级状态
 *
 * 仅 DEV 渲染。显示 rendererMode(RAYTRACE 青 / RASTER 橙)+ qualityLevel
 * + watchdog 降级标签(PARTICLE_BURST_HALF → 'PARTICLE HALF'、
 * BLOOM_OFF → 'BLOOM OFF')。
 */

import { usePatapongStore } from '../store';
import type { PerfDegradation } from '../core/types';

const DEGRADATION_LABELS: Record<PerfDegradation, string> = {
  PARTICLE_BURST_HALF: 'PARTICLE HALF',
  BLOOM_OFF: 'BLOOM OFF',
};

export function PerfBadge() {
  const rendererMode = usePatapongStore((s) => s.rendererMode);
  const qualityLevel = usePatapongStore((s) => s.qualityLevel);
  const perfDegradation = usePatapongStore((s) => s.perfDegradation);

  if (!import.meta.env.DEV) return null;

  return (
    <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px]">
      <span className={rendererMode === 'raytrace' ? 'text-[#3affc8]' : 'text-[#ff7a3a]'}>
        {rendererMode === 'raytrace' ? 'RAYTRACE' : 'RASTER'} q{qualityLevel}
      </span>
      {perfDegradation.length === 0 ? (
        <span className="text-[#3affc8]"> · PERF OK</span>
      ) : (
        <span className="text-[#ff7a3a]">
          {' · '}
          {perfDegradation.map((d) => DEGRADATION_LABELS[d]).join(' · ')}
        </span>
      )}
    </div>
  );
}
