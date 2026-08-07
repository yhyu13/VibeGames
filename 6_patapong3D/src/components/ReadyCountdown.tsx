/**
 * components/ReadyCountdown.tsx — READY 3-2-1 大字倒计时(M3 完善 by agent-ui)
 *
 * 本地定时器从 3 倒数,每秒换字(纯 UI 动画,不驱动模拟;
 * 实际 READY 时长由 sim 的 READY_COUNTDOWN=3.0s 控制)。
 * 数字用 countdown-pop keyframe 缩放弹入(0.5→1.4→1.5 + 渐出);
 * 下方 '准备…' 小字文案。phase 离开 READY 时 effect cleanup 清除定时器。
 */

import { useEffect, useState } from 'react';
import { usePatapongStore } from '../store';

/** 本地字面量:READY 3-2-1 共 3 秒(UI 层允许,与 READY_COUNTDOWN=3.0 对齐) */
const COUNTDOWN_START = 3;

export function ReadyCountdown() {
  const phase = usePatapongStore((s) => s.phase);
  const [count, setCount] = useState(COUNTDOWN_START);

  useEffect(() => {
    if (phase !== 'READY') return;
    setCount(COUNTDOWN_START);
    const id = window.setInterval(() => {
      setCount((c) => (c > 1 ? c - 1 : c));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  if (phase !== 'READY') return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      {/* key 切换触发 countdown-pop 动画重新播放 */}
      <div
        key={count}
        className="countdown-pop font-arcade text-[160px] font-black leading-none text-[#3affc8] [text-shadow:0_0_40px_#3affc8]"
      >
        {count}
      </div>
      <div className="mt-2 text-sm tracking-[0.5em] text-white/60">准备…</div>
    </div>
  );
}
