/**
 * components/WinScreen.tsx — MATCH_OVER 结算屏(M3 完善 by agent-ui)
 *
 * 'MATCH OVER' + 胜负大字 'VICTORY'(金色)/ 'DEFEAT'(暗红)+ 中文小字;
 * 最终比分大字;M3 新增:本局最长 rally 统计(score.rallyHits 局末残余值,
 * 为 0 显示 '—');'再来一局'(rematch)+ '返回菜单'(toMenu)按钮。
 * 胜负判定:先到 SCORE_TO_WIN(7)者胜,p1.score > ai.score 即 P1 胜。
 */

import { usePatapongStore } from '../store';

export function WinScreen() {
  const phase = usePatapongStore((s) => s.phase);
  const score = usePatapongStore((s) => s.score);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MATCH_OVER') return null;

  const p1Won = score.p1 > score.ai;
  const bestRally = score.rallyHits > 0 ? score.rallyHits : null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70">
      <div className="text-sm tracking-[0.5em] text-[#ff3aaa] [text-shadow:0_0_15px_#ff3aaa]">
        MATCH OVER
      </div>

      {/* 胜负大字:VICTORY 金色 / DEFEAT 暗红 */}
      <div
        className={
          p1Won
            ? 'font-arcade text-7xl font-black italic tracking-tight text-[#ffd83a] drop-shadow-[0_0_30px_rgba(255,216,58,0.5)]'
            : 'font-arcade text-7xl font-black italic tracking-tight text-[#b91c1c] drop-shadow-[0_0_30px_rgba(185,28,28,0.5)]'
        }
      >
        {p1Won ? 'VICTORY' : 'DEFEAT'}
      </div>
      <p className="-mt-3 text-sm tracking-[0.4em] text-white/60">{p1Won ? '胜利!' : '落败'}</p>

      {/* 最终比分 */}
      <div className="font-mono text-4xl font-bold text-white/90">
        {score.p1} <span className="text-[#ff3aaa]">—</span> {score.ai}
      </div>

      {/* 本局统计 */}
      <div className="font-mono text-sm text-white/70">
        本局最长 rally <span className="text-[#ffd83a]">{bestRally ?? '—'}</span> 拍
      </div>

      <p className="text-sm text-white/50">按 R 重赛 · Esc 返回菜单</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => sendUiCommand('rematch')}
          className="btn-pata rounded-lg border-2 border-[#3affc8] bg-[#3affc8]/15 px-10 py-3 text-xl font-bold text-[#3affc8] shadow-[0_0_20px_rgba(58,255,200,0.35)]"
        >
          再来一局
        </button>
        <button
          type="button"
          onClick={() => sendUiCommand('toMenu')}
          className="btn-pata rounded-lg border-2 border-[#ff3aaa] bg-[#ff3aaa]/15 px-10 py-3 text-xl font-bold text-[#ff3aaa] shadow-[0_0_20px_rgba(255,58,170,0.35)]"
        >
          返回菜单
        </button>
      </div>
    </div>
  );
}
