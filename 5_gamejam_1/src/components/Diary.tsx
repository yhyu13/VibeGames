import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import type { DiaryEntry } from '../core/types';

// 05 §2.5：日记本（羊皮纸 320×400，翻页 0.4s）—— 候选句 chips（情绪色标）、8s 未选自动写默认
// content 侧 diary.options 为空时降级为 1 条自动写入（entryId null）

const MOOD_COLOR: Record<DiaryEntry['mood'], string> = {
  positive: '#7ac97a',
  negative: '#8a9bb5',
  neutral: '#e8a25a',
};

interface Option {
  id: string | null;
  text: string;
  mood: DiaryEntry['mood'];
}

const FALLBACK_OPTIONS: Option[] = [{ id: null, text: '（今天……先不写了。）', mood: 'neutral' }];

export default function Diary() {
  const diary = useUiStore((s) => s.diary);
  const dialogueActive = useUiStore((s) => s.dialogue.active);
  const paused = useUiStore((s) => s.runState.paused);
  const [idx, setIdx] = useState(0);
  const [stamped, setStamped] = useState(false);
  const autoRef = useRef(false);

  const options = useMemo<Option[]>(() => (diary.options.length ? diary.options : FALLBACK_OPTIONS), [diary.options]);

  const choose = useCallback(
    (i: number) => {
      if (stamped || paused) return;
      const opt = options[i];
      if (!opt) return;
      setStamped(true);
      sendUiCommand({ kind: 'diaryPick', entryId: opt.id });
    },
    [stamped, paused, options],
  );

  // 8s 倒计时到 0 自动写入（⛔ 降级：auto diaryPick null）
  useEffect(() => {
    if (paused || stamped || autoRef.current) return;
    if (diary.countdown <= 0) {
      autoRef.current = true;
      sendUiCommand({ kind: 'diaryPick', entryId: null });
    }
  }, [diary.countdown, paused, stamped]);

  useEffect(() => {
    if (paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIdx((i) => (i + (e.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length);
      } else if (e.key >= '1' && e.key <= '9') {
        const n = Number(e.key) - 1;
        if (n < options.length) setIdx(n);
      } else if ((e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') && !dialogueActive) {
        e.preventDefault();
        choose(idx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paused, idx, options.length, dialogueActive, choose]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[50]">
      <div className="pointer-events-auto page-open absolute right-8 top-1/2 w-[320px] -translate-y-1/2">
        <div className="rounded-lg border border-paper/30 bg-paper p-5 text-abyss shadow-2xl">
          <h2 className="mb-4 text-lg font-bold">魔王日记 · 第 {diary.writeCount + 1} 页</h2>
          <div className="flex flex-col gap-2.5">
            {options.map((o, i) => (
              <button
                key={o.id ?? 'fallback'}
                onClick={() => choose(i)}
                onMouseEnter={() => setIdx(i)}
                className={`relative rounded border px-3 py-2 text-left text-sm transition-all ${
                  stamped && i === idx ? 'stamp-in' : ''
                } ${i === idx ? 'border-abyss/60 bg-abyss/5' : 'border-abyss/20'}`}
              >
                <span className="mr-2 text-xs font-bold text-abyss/50">{i + 1}</span>
                <span style={{ color: MOOD_COLOR[o.mood] }}>{o.text}</span>
                {stamped && i === idx && (
                  <span className="absolute right-2 top-1 -rotate-6 text-xs font-bold text-blood">已盖章</span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-abyss/50">
            ↑↓ 选择 · 空格 盖章
            {diary.countdown > 0 ? ` · ${Math.ceil(diary.countdown)}s 后自动写入` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
