/**
 * components/HUD.tsx — 比分 / rally 提示
 *
 * M1.5 by agent-ui。READY / PLAY / POINT 均显示:
 * P1 比分左上(青绿 #3affc8)、AI 比分右上(橙 #ff7a3a),
 * 中央顶部 rally 拍数 'RALLY ×N' 小字。
 */

import { usePatapongStore } from '../store';

export function HUD() {
  const phase = usePatapongStore((s) => s.phase);
  const score = usePatapongStore((s) => s.score);

  if (phase !== 'READY' && phase !== 'PLAY' && phase !== 'POINT') return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 flex items-start justify-between px-8 font-mono">
      {/* P1 比分(左上) */}
      <div className="flex flex-col items-start">
        <span className="text-[11px] tracking-[0.3em] text-[#3affc8]/70">P1</span>
        <span className="text-5xl font-black leading-none text-[#3affc8] [text-shadow:0_0_15px_#3affc8]">
          {score.p1}
        </span>
      </div>

      {/* rally 拍数(中央顶部) */}
      <div className="mt-1 text-sm tracking-[0.25em] text-white/70">
        RALLY ×{score.rallyHits}
      </div>

      {/* AI 比分(右上) */}
      <div className="flex flex-col items-end">
        <span className="text-[11px] tracking-[0.3em] text-[#ff7a3a]/70">AI</span>
        <span className="text-5xl font-black leading-none text-[#ff7a3a] [text-shadow:0_0_15px_#ff7a3a]">
          {score.ai}
        </span>
      </div>
    </div>
  );
}
