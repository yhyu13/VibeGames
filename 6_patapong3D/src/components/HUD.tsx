/**
 * components/HUD.tsx — 比分 / rally 提示(M2 完善 by agent-ui)
 *
 * READY / PLAY / POINT 均显示。左上角比分块:P1 vs AI 当前分大字亮色
 * (P1 青绿 #3affc8 / AI 橙 #ff7a3a),下方 'RALLY ×N'(N = score.rallyHits);
 * 某侧比分达到 bestOf(7)时该侧数字金色高亮(#ffd83a)。
 */

import { usePatapongStore } from '../store';

export function HUD() {
  const phase = usePatapongStore((s) => s.phase);
  const score = usePatapongStore((s) => s.score);

  if (phase !== 'READY' && phase !== 'PLAY' && phase !== 'POINT') return null;

  const p1Won = score.p1 >= score.bestOf;
  const aiWon = score.ai >= score.bestOf;

  return (
    <div className="pointer-events-none absolute left-6 top-5 flex flex-col gap-2 font-mono">
      {/* 比分 P1 vs AI(当前分大字,达到 bestOf 该侧金色高亮) */}
      <div className="flex items-end gap-3">
        <span className="text-[11px] tracking-[0.3em] text-[#3affc8]/70">P1</span>
        <span
          className={
            p1Won
              ? 'text-5xl font-black leading-none text-[#ffd83a] [text-shadow:0_0_15px_#ffd83a]'
              : 'text-5xl font-black leading-none text-[#3affc8] [text-shadow:0_0_15px_#3affc8]'
          }
        >
          {score.p1}
        </span>
        <span className="pb-1 text-xl text-white/40">—</span>
        <span
          className={
            aiWon
              ? 'text-5xl font-black leading-none text-[#ffd83a] [text-shadow:0_0_15px_#ffd83a]'
              : 'text-5xl font-black leading-none text-[#ff7a3a] [text-shadow:0_0_15px_#ff7a3a]'
          }
        >
          {score.ai}
        </span>
        <span className="text-[11px] tracking-[0.3em] text-[#ff7a3a]/70">AI</span>
      </div>

      {/* rally 拍数 */}
      <div className="text-sm tracking-[0.25em] text-white/70">RALLY ×{score.rallyHits}</div>
    </div>
  );
}
