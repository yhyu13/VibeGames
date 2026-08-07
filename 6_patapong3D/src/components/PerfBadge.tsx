/**
 * components/PerfBadge.tsx — DEV: 显示 perf degradation 状态
 *
 * M3.3 由 agent-ui 实现完整版(目前是 M0 占位)
 */

export function PerfBadge() {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white/50">
      TODO M3.3 · PerfWatchdog
    </div>
  );
}
