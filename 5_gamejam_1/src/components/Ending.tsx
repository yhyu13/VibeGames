import { useCallback, useEffect, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { LINE_POOLS } from '../core/data/lines';
import type { EndingVariant } from '../core/types';

// 05 §1.2 / 02 §8.2：结局屏 —— curtainA（被看见度≥60 暖）/ curtainB（冷）/ early（提前谢幕）/ hidden
//
// 谢幕（02 §8.1）是一段演出，不是一段正文。这里原本把整池台词 join('\n') 印成一整块居中散文：
//   · 001 被引擎推给对话盒后又被整个盖住（Ending 是 z-[70] 不透明 bg-abyss，Dialogue 是 z-[40]）；
//   · 002 / 003 从未被"演"过 —— 三条带节拍触发的谢幕词，一次全印出来，节拍也就不存在了；
//   · 隐藏结局更把 §7.1 / 7.2 / 7.3 三条分支共 18 行一次性印出：两个互斥的结局（安静结局与真剑
//     结局）同时出现在同一屏，并且溢出视口顶端（实测 top:-54，视口高 860）。
// 现在：谢幕逐句落到舞台上（2.8s 一拍，与 HIDDEN_CHAIN_LINES 同拍长），幕布透明——舞台上魔王
// 正朝观众鞠躬（Simulation.enterEnding → setBossAnim 'bow'，定住不循环），灯光收暗后才落到
// §8.2 的定稿卡片（标题 / 副文案 / 按钮 / 演职员）。谢幕期间任意键或点击可跳过。

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

// 01 §6 步骤 4：双方沉默 10s（黑场渐入）后再浮现谢幕与 Credits
const HIDDEN_BLACKOUT_MS = 10000;
// 02 §8.1 三拍谢幕的拍长；首拍前的一息沉默复用同一时长（"玩家离开，门关上" → 鞠躬）
const CURTAIN_HOLD_MS = 2800;
// curtain.bow.03「灯光收暗，进入结局屏」—— 与 .blackout-fade 的 1.4s 同长
const LIGHTS_DOWN_MS = 1400;

const NO_LINES: ReadonlyArray<{ text: string }> = [];

export default function Ending() {
  const phase = useUiStore((s) => s.runState.phase);
  const variant = useUiStore((s) => s.menu.endingVariant);
  const isHidden = phase === 'ENDING_HIDDEN';
  const copy = isHidden ? HIDDEN_FALLBACK : FALLBACK[variant ?? 'curtainA'];

  // 幕布只属于正常结局：§7 的分支树是结局之前的链（HIDDEN_CHAIN_LINES），不是谢幕。
  const curtain = isHidden ? NO_LINES : (LINE_POOLS.END_N ?? NO_LINES);

  const [bow, setBow] = useState(0); // 已念到第几句；0 = 还没开口
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setBow(0);
    setRevealed(false);
    if (isHidden) {
      const t = window.setTimeout(() => setRevealed(true), HIDDEN_BLACKOUT_MS);
      return () => window.clearTimeout(t);
    }
    if (!curtain.length) {
      setRevealed(true);
      return;
    }
    let shown = 0;
    let timer = 0;
    const advance = () => {
      shown += 1;
      setBow(shown);
      const more = shown < curtain.length;
      timer = window.setTimeout(more ? advance : () => setRevealed(true), more ? CURTAIN_HOLD_MS : LIGHTS_DOWN_MS);
    };
    timer = window.setTimeout(advance, LIGHTS_DOWN_MS);
    return () => window.clearTimeout(timer);
  }, [isHidden, curtain]);

  const restart = useCallback(() => {
    if (isHidden) sendUiCommand({ kind: 'quitToTitle' }); // 隐藏结局：引擎仅接受 MENU/ENDING_NORMAL 的 startRun，先复位
    useUiStore.getState().setMenu('intro');
    sendUiCommand({ kind: 'startRun' });
  }, [isHidden]);

  const toTitle = useCallback(() => {
    useUiStore.getState().setMenu('title');
    sendUiCommand({ kind: 'quitToTitle' });
  }, []);

  const skip = useCallback(() => setRevealed(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!revealed) {
        setRevealed(true); // 谢幕期间任意键跳过
        return;
      }
      if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') {
        e.preventDefault();
        restart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, restart]);

  const line = curtain[bow - 1];

  return (
    <div
      className={`no-select fixed inset-0 z-[70] ${revealed ? 'bg-abyss blackout-fade' : ''}`}
      onClick={revealed ? undefined : skip}
    >
      {!revealed ? (
        // 谢幕进行中：幕布透明，台词落在舞台上（和对话盒同一个声音、同一个位置感）
        isHidden ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm tracking-[0.35em] text-paper/20">……</p>
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-24 flex justify-center px-6">
            {line && (
              <div key={bow} className="rise-in max-w-3xl border-l-2 border-candle/40 bg-abyss/45 px-5 py-3">
                <p className="mb-1 text-xs tracking-[0.2em] text-candle">魔王 · 洛根</p>
                <p className="whitespace-pre-line text-base leading-loose text-paper/85">{line.text}</p>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
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
      )}
    </div>
  );
}
