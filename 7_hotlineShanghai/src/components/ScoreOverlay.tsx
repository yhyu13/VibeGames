// src/components/ScoreOverlay.tsx — 评分结算(GamePhase.SCORE;评分规则 §4.4.5)
import * as React from 'react';
import { useEffect } from 'react';
import type { Rating } from '../core/types';
import { sendUiCommand, useUiStore } from '../store';

const RATING_CLASS: Record<Rating, string> = {
  S: 'text-shanghai-flash',
  A: 'text-shanghai-jade',
  B: 'text-shanghai-paper',
  C: 'text-shanghai-rust',
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function ScoreOverlay(): React.JSX.Element {
  const score = useUiStore((s) => s.score);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendUiCommand({ kind: 'continueToNext' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const rating = score?.rating ?? 'C';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-shanghai-ink/85">
      <div className="text-shadow-pixel text-5xl tracking-[0.3em] text-shanghai-ivory">任务结算</div>
      <div className={`text-shadow-pixel mt-6 text-9xl leading-none ${RATING_CLASS[rating]}`}>
        {rating}
      </div>
      <div className="mt-8 w-80 space-y-2 text-2xl text-shanghai-paper">
        <div className="flex justify-between">
          <span>用时</span>
          <span>{score ? formatTime(score.timeSeconds) : '--:--'}</span>
        </div>
        <div className="flex justify-between">
          <span>拾取率</span>
          <span>{score ? `${Math.round(score.pickupRate * 100)}%` : '--'}</span>
        </div>
        <div className="flex justify-between">
          <span>受击</span>
          <span>{score ? String(score.hitsTaken) : '--'}</span>
        </div>
        <div className="flex justify-between border-t border-shanghai-paper/30 pt-2 text-shanghai-flash">
          <span>总分</span>
          <span>{score ? String(score.total) : '--'}</span>
        </div>
      </div>
      {/* B09:S 级配方透明化(隐藏任务解锁条件) */}
      <div className="mt-4 text-sm tracking-[0.2em] text-shanghai-steel">
        S 级配方:45s 内 · 0 受击 · 全拾取
      </div>
      {!score && (
        <div className="mt-4 text-sm text-shanghai-rust">评分数据未就绪(M1 后由引擎下发)</div>
      )}
      <div className="mt-10 flex gap-6 text-2xl">
        <button
          type="button"
          className="pointer-events-auto cursor-pointer border-2 border-shanghai-jade px-8 py-1 text-shanghai-ivory transition-colors hover:bg-shanghai-jade hover:text-shanghai-ink"
          onClick={() => sendUiCommand({ kind: 'continueToNext' })}
        >
          CONTINUE → 面具
        </button>
        <button
          type="button"
          className="pointer-events-auto cursor-pointer border-b border-shanghai-paper/50 text-shanghai-paper transition-colors hover:text-shanghai-ivory"
          onClick={() => sendUiCommand({ kind: 'retryMission' })}
        >
          再战一次
        </button>
      </div>
      <div className="mt-4 text-sm text-shanghai-steel">Enter 继续</div>
    </div>
  );
}
