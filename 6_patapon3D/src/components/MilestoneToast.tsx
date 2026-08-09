/**
 * components/MilestoneToast.tsx — rally 里程碑大字 toast(M2 by agent-ui)
 *
 * 监听 store.score.milestonesHit 长度变化(useEffect + 上次长度 ref 比较),
 * 新增时按最新阈值映射文案:3→'PATA-PATA!'、5→'PATA-PATA-PATA!'、7 或 10+→'PATA-PATA-PATA-PONG!'
 * (10/13/16… 均复用 PONG 文案)。屏幕中央大字 pop 入场,
 * 本地定时器 0.8s 后加 .milestone-fade(CSS transition 淡出),~1.1s 卸载。
 * 同值重复按事件次数弹,不去重;新一局清零只重置基线不弹。
 */

import { useEffect, useRef, useState } from 'react';
import { usePatapongStore } from '../store';

const TEXT_PATA = 'PATA-PATA!';
const TEXT_PATA_PATA = 'PATA-PATA-PATA!';
const TEXT_PONG = 'PATA-PATA-PATA-PONG!';

/** 阈值 → 文案:3 / 5 / 7+ 三档(与 TDD §4.4 MILESTONE_THRESHOLDS 对齐) */
function milestoneText(hits: number): string {
  if (hits >= 7) return TEXT_PONG;
  if (hits === 5) return TEXT_PATA_PATA;
  return TEXT_PATA;
}

/** 本地字面量:显示 0.8s 后淡出,淡出 0.3s 后卸载(纯 UI 计时,不驱动模拟) */
const SHOW_MS = 800;
const FADE_MS = 300;

export function MilestoneToast() {
  const milestonesHit = usePatapongStore((s) => s.score.milestonesHit);
  const prevLen = useRef(0);
  const [toast, setToast] = useState<{ key: number; text: string } | null>(null);
  const [fading, setFading] = useState(false);

  // 长度变化 = 新 milestone 入队;变短(新一局清零)只更新基线
  useEffect(() => {
    const len = milestonesHit.length;
    if (len === prevLen.current) return;
    const grew = len > prevLen.current;
    prevLen.current = len;
    if (!grew) return;
    const latest = milestonesHit[len - 1] ?? 0;
    setFading(false);
    setToast({ key: Date.now() + len, text: milestoneText(latest) });
  }, [milestonesHit]);

  // 本地定时器:0.8s 后淡出,淡出结束卸载
  useEffect(() => {
    if (toast === null) return;
    const fadeTimer = window.setTimeout(() => setFading(true), SHOW_MS);
    const clearTimer = window.setTimeout(() => {
      setFading(false);
      setToast(null);
    }, SHOW_MS + FADE_MS);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(clearTimer);
    };
  }, [toast]);

  if (toast === null) return null;

  const isPong = toast.text === TEXT_PONG;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* key 变更重挂载 → milestone-pop 动画重新播放 */}
      <div
        key={toast.key}
        className={`milestone-pop milestone-fade font-arcade text-6xl font-black italic tracking-tight ${
          isPong
            ? 'text-[#ffd83a] [text-shadow:0_0_40px_#ffd83a]'
            : 'text-[#3affc8] [text-shadow:0_0_40px_#3affc8]'
        } ${fading ? 'opacity-0' : 'opacity-100'}`}
      >
        {toast.text}
      </div>
    </div>
  );
}
