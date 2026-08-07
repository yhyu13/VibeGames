/**
 * components/ReadyCountdown.tsx — READY 3-2-1 大字倒计时
 *
 * M1.5 by agent-ui。本地定时器从 3 倒数,每秒换字(纯 UI 动画,不驱动模拟;
 * 实际 READY 时长由 sim 的 READY_COUNTDOWN=3.0s 控制)。
 * 本地用字面量 3(UI 层允许,见 TDD §4.4:不 import core 常量);
 * phase 离开 READY 时 effect cleanup 清除定时器。
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
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* key 切换触发 countdown-pop 动画重新播放 */}
      <div
        key={count}
        className="countdown-pop text-[160px] font-black leading-none text-[#3affc8] [text-shadow:0_0_40px_#3affc8]"
      >
        {count}
      </div>
    </div>
  );
}
