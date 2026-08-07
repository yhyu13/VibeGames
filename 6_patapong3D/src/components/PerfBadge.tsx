/**
 * components/PerfBadge.tsx — DEV: 显示性能降级状态
 *
 * M1.5 by agent-ui。仅 DEV 渲染(生产不显示);
 * V1 无降级(数组为空)显示 'OK',有降级则列出路径名。
 */

import { usePatapongStore } from '../store';

export function PerfBadge() {
  const perfDegradation = usePatapongStore((s) => s.perfDegradation);

  if (!import.meta.env.DEV) return null;

  return (
    <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white/50">
      {perfDegradation.length === 0 ? 'PERF: OK' : `降级: ${perfDegradation.join(' / ')}`}
    </div>
  );
}
