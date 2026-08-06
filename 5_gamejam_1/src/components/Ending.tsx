import { useCallback, useEffect } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { LINE_POOLS } from '../core/data/lines';
import type { EndingVariant } from '../core/types';

// 05 §1.2 / 02 §8.2：结局屏 —— curtainA（被看见度≥60 暖）/ curtainB（冷）/ early（提前谢幕）/ hidden
// 谢幕文案优先取 content 侧 LINE_POOLS['END_N'|'END_H']，为空时降级为 02 §8 定稿文案

const FALLBACK: Record<EndingVariant, { title: string; sub: string; cta: string }> = {
  curtainA: {
    title: '第一万零一次谢幕',
    sub: '他还在等。等你来，等被看见，等下一次鞠躬。',
    cta: '再来一轮 —— 王座等你',
  },
  curtainB: {
    title: '第一万零一次谢幕',
    sub: '烛火暗了。他还在等一个也许不会再来的人。',
    cta: '再来一轮 —— 王座等你',
  },
  early: {
    title: '提前谢幕',
    sub: '谢幕。……下一场，我想演得好一点。',
    cta: '再来一轮',
  },
};

const HIDDEN_FALLBACK = {
  title: '两把椅子',
  sub: '勇者没有再来。但王座旁，多了一壶凉透的茶。',
  cta: '重新开始 —— 从第一页日记',
};

export default function Ending() {
  const phase = useUiStore((s) => s.runState.phase);
  const variant = useUiStore((s) => s.menu.endingVariant);
  const isHidden = phase === 'ENDING_HIDDEN';
  const copy = isHidden ? HIDDEN_FALLBACK : FALLBACK[variant ?? 'curtainA'];

  const endLines = LINE_POOLS[isHidden ? 'END_H' : 'END_N'] ?? [];
  const curtainText = endLines.length ? endLines.map((l) => l.text).join('\n') : '';

  const restart = useCallback(() => {
    useUiStore.getState().setMenu('intro');
    sendUiCommand({ kind: 'startRun' });
  }, []);

  const toTitle = useCallback(() => {
    useUiStore.getState().setMenu('title');
    sendUiCommand({ kind: 'quitToTitle' });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') {
        e.preventDefault();
        restart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restart]);

  return (
    <div className="no-select fixed inset-0 z-[70] flex flex-col items-center justify-center bg-abyss blackout-fade">
      {curtainText && (
        <p className="mb-8 max-w-xl whitespace-pre-line text-center text-base leading-loose text-paper/75">
          {curtainText}
        </p>
      )}
      <h1 className="mb-3 text-5xl font-bold tracking-[0.1em] text-paper">{copy.title}</h1>
      <p className="mb-10 max-w-md text-center text-lg leading-relaxed text-paper/60">{copy.sub}</p>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={restart}
          className="rounded border border-candle/60 bg-candle/15 px-8 py-2.5 text-lg font-semibold text-candle transition-all hover:-translate-y-0.5 hover:bg-candle/25"
        >
          {copy.cta}
        </button>
        <button onClick={toTitle} className="text-sm text-paper/40 hover:text-paper/70">
          返回标题
        </button>
      </div>
      <div className="mt-12 text-center">
        <p className="mb-2 text-sm tracking-[0.4em] text-paper/40">演 职 人 员</p>
        <div className="flex gap-6 text-xs text-paper/35">
          <span>设计 · 剧作 · 程序</span>
          <span>美术 · 动画</span>
          <span>音乐 · 音效</span>
          <span>测试 · 校对</span>
        </div>
        <p className="mt-2 text-xs text-paper/25">72h 游戏开发挑战 · 全程程序化生成 · 零资源文件</p>
      </div>
    </div>
  );
}
