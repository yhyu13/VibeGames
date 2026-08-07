import { useEffect, useState } from 'react';
import { SCRIPTS } from '../core/data/scripts';
import { sendUiCommand } from './GameCanvas';
import type { ScriptId } from '../core/types';

const STYLE_NOTES: Record<ScriptId, { flavor: string; chart: string }> = {
  dignity: { flavor: '吐槽披风、站姿和装腔', chart: '大跨度 · 稀疏重拍' },
  tragic: { flavor: '一边催哭，一边嫌台词长', chart: '长连击 · 舒缓节拍' },
  mad: { flavor: '高速反应词 · 表情包 · 集体起哄', chart: '高速折返 · 密集短目标' },
  freePlay: { flavor: '观众开始随机起哄', chart: '即兴谱' },
};

export default function ScriptPicker() {
  const countdown = useCountdown(12);
  const list = Object.values(SCRIPTS);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b1024]/40">
      <div className="fade-in-up flex w-full max-w-3xl flex-col items-center gap-5 px-6">
        <div className="text-center">
          <div className="text-[10px] tracking-[0.5em] text-indigo-300/70">候场 · 选一个剧本</div>
          <div className="mt-1 text-xs text-indigo-300/60">
            超时未选将自动进入「即兴演出」（{countdown}s）
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          {list.map((s, i) => (
            <button
              key={s.id}
              className="v2-panel group flex cursor-pointer flex-col gap-2 rounded-xl p-5 text-left transition hover:border-amber-300/50 hover:bg-amber-400/10"
              onClick={() => sendUiCommand({ kind: 'scriptPick', script: s.id })}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif-cn text-xl font-bold text-amber-100 group-hover:text-amber-200">
                  {s.name}
                </span>
                <span className="text-[10px] text-indigo-300/70">按 {i + 1}</span>
              </div>
              <div className="text-[11px] text-indigo-200/80">{STYLE_NOTES[s.id].chart}</div>
              <div className="text-[11px] text-indigo-300/70">观众口味：{STYLE_NOTES[s.id].flavor}</div>
              <div className="mt-1 text-[10px] tracking-widest text-amber-200/70">
                {'★'.repeat(Math.min(5, s.difficulty / 4))}{' '}
                <span className="text-indigo-300/60">难度 {s.difficulty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function useCountdown(seconds: number): number {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return left;
}