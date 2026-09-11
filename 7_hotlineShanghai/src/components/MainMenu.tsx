// src/components/MainMenu.tsx — 标题画面(GamePhase.TITLE)
//
// 这里原先还印着战斗那一行(`hudVerbs()`),理由和 HUD 共用一行字是同一个:两份手抄的
// 字符串漂移过(B66)。共用一份解决了漂移,但没有解决另一半 —— 那九条在标题上一条也不
// 管用,而屏幕不会告诉玩家这一点。量出来的是 `.vts-probes/hs-keys.mjs`:标题上按 Space
// 什么也不会发生,而这一屏把它和 Enter 印在一起。
//
// 所以标题现在只印它这一屏真的接的键(`SCREEN_VERBS.title`)。代价要写下来:开局前看不
// 到完整操作表了 —— 战斗那一行的位置在 HUD 上,它在那儿九条全是活的,而且从第一帧就在
// 屏幕上。这一屏少一条句子,换的是"每一屏印的键在这一屏上都是活的"这句话没有例外。
import * as React from 'react';
import { useEffect } from 'react';
import { SCREEN_VERBS, VERB_SEPARATOR } from '../core/data/controls';
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
        {SCREEN_VERBS.title.join(VERB_SEPARATOR)}
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
