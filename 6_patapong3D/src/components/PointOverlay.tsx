/**
 * components/PointOverlay.tsx — POINT 阶段 '+1' 得分飘字(M2 完善 by agent-ui)
 *
 * 居中显示 '+1' 大号飘字 + 得分方标签('P1 得分' / 'AI 得分'),
 * 入场动画 scale 1.2→1 + 上浮(pata-point-pop keyframe),1.2s 内淡出
 * (= POINT_DURATION,phase 离开 POINT 组件自动卸载)。
 * 得分方判定:进入 POINT 时与上一次非 POINT 的比分比较,谁 +1 谁得分
 * (store 只读快照、无事件可订阅,这是 UI 层能做到的最小侵入方式)。
 */

import { useEffect, useRef } from 'react';
import { usePatapongStore } from '../store';
import type { Side } from '../core/types';

export function PointOverlay() {
  const phase = usePatapongStore((s) => s.phase);
  const score = usePatapongStore((s) => s.score);
  const prevScore = useRef<{ p1: number; ai: number } | null>(null);
  const winner = useRef<Side | null>(null);

  useEffect(() => {
    if (phase === 'POINT') {
      // 进入 POINT:与上次非 POINT 的比分对比,定位得分方
      const prev = prevScore.current;
      if (prev !== null) {
        if (score.p1 > prev.p1) winner.current = 'P1';
        else if (score.ai > prev.ai) winner.current = 'AI';
        else winner.current = null;
      }
    } else {
      // 记录当前比分,供下次 POINT 对比
      prevScore.current = { p1: score.p1, ai: score.ai };
    }
  }, [phase, score.p1, score.ai]);

  if (phase !== 'POINT') return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="point-pop font-arcade flex items-baseline gap-3 text-7xl font-black italic tracking-tight">
        <span className="text-[#ffd83a] [text-shadow:0_0_30px_#ffd83a]">+1</span>
        {winner.current !== null && (
          <span
            className={
              winner.current === 'P1'
                ? 'text-[#3affc8] [text-shadow:0_0_30px_#3affc8]'
                : 'text-[#ff7a3a] [text-shadow:0_0_30px_#ff7a3a]'
            }
          >
            {winner.current === 'P1' ? 'P1 得分' : 'AI 得分'}
          </span>
        )}
      </div>
    </div>
  );
}
