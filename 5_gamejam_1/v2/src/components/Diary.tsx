import { useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { STRETCH_FLAGS } from '../core/constants';

export default function Diary() {
  const diary = useUiStore((s) => s.diary);
  const [custom, setCustom] = useState('');
  const [wrote, setWrote] = useState(false);

  if (wrote) return null;

  const pick = (id: string): void => {
    setWrote(true);
    sendUiCommand({ kind: 'diaryPick', entryId: id });
  };

  const submitCustom = (): void => {
    if (custom.trim().length === 0) return;
    setWrote(true);
    sendUiCommand({ kind: 'diaryCustom', text: custom.trim() });
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b1024]/50">
      <div className="fade-in-up v2-panel w-full max-w-lg rounded-xl p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-serif-cn text-xl font-bold text-amber-100">写一句日记</h2>
          <span className="text-[10px] tracking-widest text-indigo-300/60">倒计时自动落笔</span>
        </div>
        <p className="mb-4 text-[11px] text-indigo-300/70">今天这场演出，给你留下了什么？</p>

        <div className="mb-4 flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
          {diary.options.map((entry) => (
            <button
              key={entry.id}
              className="cursor-pointer rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-4 py-2.5 text-left text-sm text-indigo-100 transition hover:border-amber-300/40 hover:bg-amber-400/10"
              onClick={() => pick(entry.id)}
            >
              {entry.text}
            </button>
          ))}
        </div>

        {STRETCH_FLAGS.playerTyping && (
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-indigo-300/25 bg-[#0d1228] px-3 py-2 text-sm text-indigo-50 outline-none focus:border-amber-300/50"
              placeholder="亲手写一句（V2 支持手打）…"
              value={custom}
              maxLength={60}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitCustom();
              }}
            />
            <button className="v2-btn-gold" onClick={submitCustom} disabled={custom.trim().length === 0}>
              写下
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
