// src/components/MainMenu.tsx — 标题画面(GamePhase.TITLE)
import * as React from 'react';
import { useEffect } from 'react';
import { sendUiCommand } from '../store';

export function MainMenu(): React.JSX.Element {
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendUiCommand({ kind: 'startGame' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-shanghai-ink/70">
      <h1 className="text-shadow-pixel animate-flicker text-7xl tracking-[0.15em] text-shanghai-lantern">
        HOTLINE SHANGHAI
      </h1>
      <div className="mt-3 text-4xl tracking-[0.6em] text-shanghai-ivory text-shadow-pixel">热线上海</div>
      <div className="mt-4 text-xl text-shanghai-paper/80">
        1937 · 上海孤岛期 · 一击必杀 · 2D Radiance Cascades
      </div>
      <button
        type="button"
        className="clip-corner pointer-events-auto mt-12 cursor-pointer border-2 border-shanghai-lantern bg-shanghai-ink/60 px-10 py-2 text-3xl text-shanghai-ivory transition-colors hover:bg-shanghai-lantern hover:text-shanghai-ink"
        onClick={() => sendUiCommand({ kind: 'startGame' })}
      >
        开始游戏
      </button>
      <div className="mt-10 text-center text-sm leading-6 text-shanghai-steel">
        WASD 移动 · 鼠标瞄准 · LMB 攻击 · F 切换近战/远程 · E 拾取/长按投掷
        <br />
        Shift 冲刺 · Space 翻滚 · Tab 暂停 · Esc 返回标题
      </div>
      <button
        type="button"
        className="pointer-events-auto mt-6 cursor-pointer border-b border-shanghai-steel text-base text-shanghai-steel transition-colors hover:text-shanghai-paper"
        onClick={() => sendUiCommand({ kind: 'resetData' })}
      >
        重置存档
      </button>
    </div>
  );
}
