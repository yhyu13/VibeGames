import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import type { Speaker } from '../core/types';

// 05 §2.3：底部对话盒 —— 打字机 40ms/字、点击/空格推进、▼ 待播队列提示
const CHAR_MS = 40;

interface Choice {
  key: 'A' | 'B' | 'C';
  text: string;
}

const SPEAKER_LABEL: Record<Speaker, string> = { boss: '魔王 · 洛根', system: '系统' };

export default function Dialogue() {
  const active = useUiStore((s) => s.dialogue.active);
  const queue = useUiStore((s) => s.dialogue.queue);
  const paused = useUiStore((s) => s.runState.paused);
  const [chars, setChars] = useState(0);

  const lineId = active?.lineId ?? '';
  const text = active?.text ?? '';
  const isBarrage = lineId.startsWith('L_BARRAGE');
  const isFree = lineId.startsWith('L_FREE'); // 即兴（打断出戏）：暖橙 #ffb36b，完整无断续
  const isPanic = lineId.startsWith('L_PANIC'); // 忘词补白：琥珀 #ff9a76，完整无断续
  const instant = isFree || isPanic;
  const pending = queue.filter((q) => !q.lineId.startsWith('L_BARRAGE')).length;

  const choices = useMemo<Choice[] | null>(() => {
    const ext = active as { choices?: Choice[] } | null;
    return ext?.choices?.length ? ext.choices : null;
  }, [active]);

  // 打字机：切换台词时重置
  useEffect(() => {
    if (!active || instant) {
      setChars(text.length);
      return;
    }
    setChars(0);
    const t = window.setInterval(() => {
      setChars((c) => (c < text.length ? c + 1 : c));
    }, CHAR_MS);
    return () => window.clearInterval(t);
  }, [active, instant, text]);

  const advance = useCallback(() => {
    if (isBarrage) return; // 弹幕不占用对话盒
    if (chars < text.length) {
      setChars(text.length);
      return;
    }
    if (choices?.length) return; // 有选项时须点击选项
    sendUiCommand({ kind: 'dialogueNext' });
  }, [chars, text.length, choices, isBarrage]);

  useEffect(() => {
    if (!active || paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, paused, advance]);

  if (!active || isBarrage) return null;

  const label = isFree ? '即兴' : SPEAKER_LABEL[active.speaker];
  const labelColor = isFree ? '#ffb36b' : active.speaker === 'boss' ? '#d9a441' : '#8a9bb5';
  const textColor = isFree ? '#ffb36b' : isPanic ? '#ff9a76' : undefined;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[40] flex justify-center px-[20%]">
      <div
        className="pointer-events-auto w-full max-w-3xl cursor-pointer rounded-lg border border-cold bg-cold/85 p-4 shadow-lg"
        onClick={advance}
      >
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-lg font-semibold" style={{ color: labelColor }}>
            {label}
          </span>
          {pending > 0 && <span className="text-xs text-paper/40">▼ 还有 {pending} 句</span>}
        </div>
        <p
          className={`min-h-[2.5em] text-[22px] leading-relaxed text-paper/95 ${instant ? '' : 'type-caret'}`}
          style={{ color: textColor }}
        >
          {text.slice(0, chars)}
        </p>
        {choices && (
          <div className="mt-3 flex flex-col gap-2">
            {choices.map((c) => (
              <button
                key={c.key}
                onClick={(e) => {
                  e.stopPropagation();
                  sendUiCommand({ kind: 'dialogueChoice', choice: c.key });
                }}
                className="rounded border border-candle/40 bg-abyss/60 px-3 py-1.5 text-left text-base text-paper hover:border-candle hover:bg-abyss/80"
              >
                <span className="mr-2 font-bold text-candle">{c.key}</span>
                {c.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
