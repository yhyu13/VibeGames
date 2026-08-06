import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { RATING_AXES } from '../core/data/ratingAxes';
import type { RatingAxisId, RatingFacts } from '../core/types';

// 05 §2.4：自评表 —— 四轴 × 1-5 星（形状 + 数字，色盲安全）、事实数据卡、10s 倒计时环、超时自动提交
// content 侧 RATING_AXES 为空时使用 §2.4 表格降级标签

const AXIS_ORDER: RatingAxisId[] = ['mobility', 'delivery', 'visual', 'remembered'];

const FALLBACK_LABEL: Record<RatingAxisId, string> = {
  mobility: '走位流畅度',
  delivery: '台词感染力',
  visual: '视觉效果',
  remembered: '有没有让玩家记住',
};

const STAR_LABELS = ['灾难', '勉强', '一般', '不错', '惊艳'];

function factsText(id: RatingAxisId, f: RatingFacts | null): string | null {
  if (!f) return null;
  switch (id) {
    case 'mobility':
      return `站位 ${f.stanceAccuracy}% · 抖动 ${f.jitterRatio}%`;
    case 'delivery':
      return `忘词 ×${f.forgotLines} · 完整率 ${f.lineCompleteness}%`;
    case 'visual':
      return `阶段 ${f.stagesCompleted}/3 · 最大连击 ${f.maxCombo}`;
    case 'remembered':
      return `停留 ${f.lingerTime}s · 弹幕 ${f.barrageCount} 条`;
  }
}

const clampStar = (n: number) => Math.max(1, Math.min(5, n));

export default function RatingSheet() {
  const sheet = useUiStore((s) => s.rating);
  const dialogueActive = useUiStore((s) => s.dialogue.active);
  const paused = useUiStore((s) => s.runState.paused);
  const [row, setRow] = useState(0);
  const [stars, setStars] = useState<Record<RatingAxisId, number>>(() => {
    const init = {} as Record<RatingAxisId, number>;
    for (const id of AXIS_ORDER) init[id] = sheet.axes[id]?.stars ?? 0;
    return init;
  });
  const submittedRef = useRef(false);

  const axes = useMemo(
    () =>
      AXIS_ORDER.map((id) => {
        const def = RATING_AXES.find((a) => a.id === id);
        return { id, label: def?.label ?? FALLBACK_LABEL[id] };
      }),
    [],
  );

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const out = {} as Record<RatingAxisId, number>;
    for (const id of AXIS_ORDER) {
      const st = sheet.axes[id];
      out[id] = st?.auto ? st.stars : Math.max(1, stars[id] ?? 0);
    }
    sendUiCommand({ kind: 'ratingSubmit', stars: out });
  }, [sheet.axes, stars]);

  // 10s 倒计时到 0 自动提交当前选择（不丢进度）
  useEffect(() => {
    if (paused || sheet.submitted) return;
    if (sheet.countdown <= 0) submit();
  }, [sheet.countdown, sheet.submitted, paused, submit]);

  useEffect(() => {
    if (paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setRow((r) => (r + (e.key === 'ArrowDown' ? 1 : AXIS_ORDER.length - 1)) % AXIS_ORDER.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const id = AXIS_ORDER[row];
        if (sheet.axes[id]?.auto) return;
        e.preventDefault();
        setStars((s0) => ({ ...s0, [id]: clampStar((s0[id] ?? 0) + (e.key === 'ArrowRight' ? 1 : -1)) }));
      } else if (e.key >= '1' && e.key <= '5') {
        const id = AXIS_ORDER[row];
        if (sheet.axes[id]?.auto) return;
        setStars((s0) => ({ ...s0, [id]: Number(e.key) }));
      } else if ((e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') && !dialogueActive) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [row, paused, dialogueActive, sheet.axes, submit]);

  const C = 2 * Math.PI * 20;
  const frac = Math.max(0, Math.min(1, sheet.countdown / 10));

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-[480px] rounded-lg border border-cold bg-abyss/90 p-5 shadow-2xl">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-paper">本场自评</h2>
          <div className="relative h-11 w-11">
            <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#1a2a4a" strokeWidth="3" />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={sheet.countdown <= 3 ? '#ff9a3c' : '#e8e0cc'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - frac)}
                style={{ transition: 'stroke-dashoffset 0.2s linear' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-paper">
              {Math.max(0, Math.ceil(sheet.countdown))}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {axes.map((axis, i) => {
            const st = sheet.axes[axis.id];
            const locked = st?.auto ?? false;
            const val = locked ? (st?.stars ?? 0) : (stars[axis.id] ?? 0);
            const ev = factsText(axis.id, sheet.facts);
            return (
              <div
                key={axis.id}
                onMouseEnter={() => setRow(i)}
                className={`rounded border p-2.5 transition-colors ${
                  i === row ? 'border-candle/60 bg-cold/40' : 'border-transparent bg-cold/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base text-paper">
                    {axis.label}
                    {locked && (
                      <span className="ml-2 rounded bg-cold px-1.5 py-0.5 text-xs text-paper/50">🔒 系统代填</span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        disabled={locked}
                        title={STAR_LABELS[n - 1]}
                        onClick={() => {
                          if (!locked) setStars((s0) => ({ ...s0, [axis.id]: n }));
                        }}
                        className={`text-lg transition-colors ${n <= val ? 'text-candle' : 'text-paper/25'}`}
                      >
                        {n <= val ? '★' : '☆'}
                      </button>
                    ))}
                    <span className="ml-1 w-8 text-sm text-paper/50">{val > 0 ? `${val}/5` : '–'}</span>
                  </div>
                </div>
                {ev && <p className="mt-1 text-xs text-paper/45">{ev}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-paper/40">↑↓ 选行 · ←→ / 1-5 打星 · 空格 提交</p>
          <button
            onClick={submit}
            className="rounded border border-candle/60 bg-candle/15 px-5 py-1.5 font-semibold text-candle hover:bg-candle/25"
          >
            提交自评
          </button>
        </div>
        {!sheet.facts && <p className="mt-3 text-xs text-paper/35">演出数据整理中……</p>}
      </div>
    </div>
  );
}
