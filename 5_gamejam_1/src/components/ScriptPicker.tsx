import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { SCRIPTS } from '../core/data/scripts';
import type { ScriptDef } from '../core/types';

// 05 §2.2：剧本选择 —— 3 张（SCRIPT_COUNT ≥2 自适应）、1/2/3 键或点击、白化收缩 0.25s
// content 侧 SCRIPTS 为空时渲染 1 张降级占位卡（不可选，游戏仍可继续）

const FALLBACK_SCRIPT: ScriptDef = {
  id: 'dignity',
  name: '（剧本筹备中）',
  difficulty: 8,
  stages: [],
};

function difficultyOf(d: number): { stars: number; label: string } {
  if (d >= 15) return { stars: 3, label: '失控' };
  if (d >= 11) return { stars: 2, label: '吃力' };
  return { stars: 1, label: '从容' };
}

export default function ScriptPicker() {
  const round = useUiStore((s) => s.runState.round);
  const paused = useUiStore((s) => s.runState.paused);
  const [picked, setPicked] = useState<string | null>(null);

  const cards = useMemo<ScriptDef[]>(() => (SCRIPTS.length ? SCRIPTS : [FALLBACK_SCRIPT]), []);

  const pick = useCallback(
    (idx: number) => {
      if (picked || paused) return;
      const script = SCRIPTS[idx];
      if (!script) return;
      setPicked(script.id);
      window.setTimeout(() => sendUiCommand({ kind: 'scriptPick', script: script.id }), 250);
    },
    [picked, paused],
  );

  useEffect(() => {
    if (paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '3') {
        const idx = Number(e.key) - 1;
        if (idx < SCRIPTS.length) pick(idx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paused, pick]);

  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-[18%] z-[40] flex flex-col items-center">
      {round === 1 && <p className="mb-3 text-sm text-paper/50">难度越高，开场越紧张</p>}
      <div className="flex gap-6">
        {cards.map((s, i) => {
          const d = difficultyOf(s.difficulty);
          return (
            <button
              key={s.id}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`relative h-[150px] w-[240px] rounded-lg border border-cold bg-cold/70 p-4 text-left shadow-md transition-all duration-150 hover:-translate-y-1.5 hover:border-candle/70 hover:shadow-[0_0_18px_rgba(255,154,60,0.25)] ${
                picked === s.id ? 'card-whiteout' : ''
              } ${SCRIPTS.length ? 'rise-in' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-lg font-semibold text-paper">{s.name}</p>
              <p className="mt-2 text-sm text-candle">
                {'★'.repeat(d.stars)}
                {'☆'.repeat(3 - d.stars)}
                <span className="ml-1 text-paper/50">{d.label}</span>
              </p>
              <p className="mt-1 text-xs text-paper/40">
                {s.stages.length > 0
                  ? `${s.stages.length} 幕 · ${s.stages.reduce((n, st) => n + st.beats.length, 0)} 拍`
                  : '内容编排中……'}
              </p>
              <span className="absolute bottom-3 right-3 rounded border border-paper/30 px-1.5 text-xs text-paper/60">
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
