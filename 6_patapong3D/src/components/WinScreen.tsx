/**
 * components/WinScreen.tsx — MATCH_OVER 结算屏
 *
 * M1.5 by agent-ui(占位级)。'MATCH OVER' + 最终比分 + '按 R 重赛' 提示
 * + REMATCH / MENU 按钮(sendUiCommand('rematch' | 'toMenu'),FSM §4.6)。
 * 胜负判定:先到 SCORE_TO_WIN(7)者胜,p1.score > ai.score 即 P1 胜。
 */

import { usePatapongStore } from '../store';

export function WinScreen() {
  const phase = usePatapongStore((s) => s.phase);
  const score = usePatapongStore((s) => s.score);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MATCH_OVER') return null;

  const p1Won = score.p1 > score.ai;

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-7 bg-black/70">
      <div className="text-sm tracking-[0.5em] text-[#ff3aaa] [text-shadow:0_0_15px_#ff3aaa]">
        MATCH OVER
      </div>

      {/* 胜负大字 */}
      <div
        className={
          p1Won
            ? 'text-7xl font-black text-[#3affc8] [text-shadow:0_0_40px_#3affc8]'
            : 'text-7xl font-black text-[#ff7a3a] [text-shadow:0_0_40px_#ff7a3a]'
        }
      >
        {p1Won ? '胜利！' : '落败'}
      </div>

      {/* 最终比分 */}
      <div className="font-mono text-4xl font-bold text-white/90">
        {score.p1} <span className="text-[#ff3aaa]">—</span> {score.ai}
      </div>

      <p className="text-sm text-white/50">按 R 重赛 · Esc 返回菜单</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => sendUiCommand('rematch')}
          className="rounded-lg border-2 border-[#3affc8] bg-[#3affc8]/15 px-10 py-3 text-xl font-bold text-[#3affc8] shadow-[0_0_20px_rgba(58,255,200,0.35)] transition-transform hover:scale-105 active:scale-95"
        >
          再来一局
        </button>
        <button
          type="button"
          onClick={() => sendUiCommand('toMenu')}
          className="rounded-lg border-2 border-[#ff3aaa] bg-[#ff3aaa]/15 px-10 py-3 text-xl font-bold text-[#ff3aaa] transition-transform hover:scale-105 active:scale-95"
        >
          返回菜单
        </button>
      </div>
    </div>
  );
}
