import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { LINE_POOLS } from '../core/data/lines';

// 02 §9：ui.title / ui.subtitle / ui.menu.start
const TITLE = 'Boss 的焦虑';
const SUBTITLE = '一场独角戏 · 一个等观众的人';
const START_LABEL = '开始演出';

// intro 字幕：content 侧 LINE_POOLS['TITLE'] 为空时的降级文案（05 §4 0:00 L_TITLE）
const FALLBACK_INTRO: string[] = ['又是新的一天。', '王座厅里，只有蜡烛还醒着。', '——演出，即将开始。'];
const INTRO_MAX_MS = 8000;
const INTRO_LINE_MS = 2600;

// 模块级标记：intro 完成状态跨挂载保留（暂停恢复重挂载时不重播字幕）
let introFinished = false;

export default function Menu() {
  const screen = useUiStore((s) => s.menu.screen);
  const [introDone, setIntroDone] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);

  const introLines = useMemo(
    () => (LINE_POOLS['TITLE']?.length ? LINE_POOLS['TITLE'].map((l) => l.text) : FALLBACK_INTRO),
    [],
  );

  const finishIntro = useCallback(() => {
    introFinished = true;
    setIntroDone(true);
  }, []);

  const startRun = useCallback(() => {
    introFinished = false;
    setIntroDone(false);
    setLineIdx(0);
    useUiStore.getState().setMenu('intro');
    sendUiCommand({ kind: 'startRun' });
  }, []);

  // intro 字幕时序：≤8s 自动结束；任意键跳过
  useEffect(() => {
    if (screen !== 'intro' || introFinished) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setLineIdx(1), INTRO_LINE_MS));
    timers.push(window.setTimeout(() => setLineIdx(2), INTRO_LINE_MS * 2));
    timers.push(window.setTimeout(finishIntro, INTRO_MAX_MS));
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [screen, introFinished, finishIntro]);

  // 标题：Enter/空格 开始；intro：任意键跳过
  useEffect(() => {
    if (screen === 'intro') {
      const onKey = () => finishIntro();
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    if (screen === 'title') {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          startRun();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return;
  }, [screen, startRun, finishIntro]);

  if (screen === 'intro') {
    if (introDone || introFinished) return null;
    return (
      <div
        className="no-select fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-abyss/80 blackout-fade"
        onClick={finishIntro}
      >
        <p
          key={lineIdx}
          className="rise-in max-w-2xl text-center text-2xl leading-relaxed text-paper/90"
        >
          {introLines[lineIdx] ?? ''}
        </p>
        <div className="absolute bottom-10 text-sm text-paper/40">按任意键跳过</div>
      </div>
    );
  }

  return (
    <div className="no-select fixed inset-0 z-[70] flex flex-col items-center justify-center bg-abyss blackout-fade">
      <p className="mb-3 text-sm tracking-[0.5em] text-candle/70">{SUBTITLE}</p>
      <h1 className="mb-10 text-6xl font-bold tracking-[0.1em] text-paper">{TITLE}</h1>
      <button
        onClick={startRun}
        className="rounded border border-candle/70 bg-candle/15 px-10 py-3 text-xl font-semibold text-candle transition-all hover:-translate-y-0.5 hover:bg-candle/25 hover:shadow-[0_0_24px_rgba(255,154,60,0.3)]"
      >
        {START_LABEL}
      </button>
      <p className="mt-8 text-xs text-paper/35">Enter / 空格 开始 · M 静音</p>
    </div>
  );
}
