import { useCallback, useEffect, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';

// 05 §2.6：档案侧栏 —— 右缘堆叠（≤3 可见）、E/点击/方向键翻面、未读角标
// entries 为空时渲染透明占位（不阻塞游戏）

export default function Archive() {
  const entries = useUiStore((s) => s.archive.entries);
  const unread = useUiStore((s) => s.archive.unread);
  const paused = useUiStore((s) => s.runState.paused);
  const [selected, setSelected] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const flip = useCallback(
    (i: number) => {
      if (paused) return;
      setOpenIdx((cur) => (cur === i ? null : i));
      sendUiCommand({ kind: 'archiveFlip', index: i });
    },
    [paused],
  );

  useEffect(() => {
    if (paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (!entries.length) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const dir = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
        const next = (selected + dir + entries.length) % entries.length;
        setSelected(next);
        flip(next);
      } else if (e.key === 'e' || e.key === 'E') {
        flip(selected);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paused, entries.length, selected, flip]);

  if (!entries.length) {
    return (
      <div className="pointer-events-none fixed right-6 top-1/2 z-[35] -translate-y-1/2">
        <div className="flex h-[120px] w-[200px] items-center justify-center rounded border border-paper/10 bg-paper/5 text-sm text-paper/25">
          档案整理中……
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-[35] -translate-y-1/2">
      <div className="flex flex-col items-end gap-3">
        {entries.slice(0, 3).map((e, i) => {
          const isOpen = openIdx === i;
          return (
            <button
              key={e.id}
              onClick={() => flip(i)}
              onMouseEnter={() => setSelected(i)}
              className={`flip-scene pointer-events-auto relative transition-all duration-500 ${
                isOpen ? 'h-[240px] w-[360px]' : 'h-[120px] w-[200px]'
              } ${i === selected ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className={`flip-inner relative h-full w-full ${isOpen ? 'flipped' : ''}`}>
                <div className="flip-face absolute inset-0 rounded border border-paper/25 bg-paper p-3 text-left text-abyss shadow-lg">
                  <p className="font-semibold">{e.name}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed">{e.lines[0] ?? '（无评语）'}</p>
                  {i === 0 && unread > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blood px-1 text-xs font-bold text-paper">
                      {unread}
                    </span>
                  )}
                </div>
                <div className="flip-face flip-back absolute inset-0 overflow-hidden rounded border border-paper/25 bg-paper p-4 text-abyss shadow-xl">
                  <p className="text-sm font-semibold">{e.name}</p>
                  <div className="mt-2 flex flex-col gap-1.5 text-xs leading-relaxed">
                    {e.lines.map((l, j) => (
                      <p key={j}>{l}</p>
                    ))}
                  </div>
                </div>
              </div>
              <span className="absolute -bottom-5 right-1 text-[10px] text-paper/30">
                {i === 0 ? 'E / 点击 翻开' : ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
