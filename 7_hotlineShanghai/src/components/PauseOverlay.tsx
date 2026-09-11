// src/components/PauseOverlay.tsx — 暂停遮罩(B04)
// Tab 暂停时模拟冻结;本层提示玩家状态与恢复方式。
//
// 这一行从手抄改成读 controls.ts 的 SCREEN_VERBS.paused:它是同一类东西 —— 一句印在屏幕上、
// 玩家会照着按的话 —— 而手抄的那一份不被任何守卫看着(legend-check 的 D 段原先只渲染 HUD /
// 标题 / 结算三屏)。两个键在这一屏上都是活的:Tab 把 paused 从 true 翻回 false,由本层自己
// 的消失证明;Esc 走 App.tsx 的全局处理器,它的相位条件只排除 TITLE。
import * as React from 'react';
import { SCREEN_VERBS, VERB_SEPARATOR } from '../core/data/controls';

export function PauseOverlay(): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-shanghai-ink/70">
      <div className="text-shadow-pixel text-7xl tracking-[0.4em] text-shanghai-ivory">已暂停</div>
      <div className="mt-6 text-2xl text-shanghai-paper">{SCREEN_VERBS.paused.join(VERB_SEPARATOR)}</div>
    </div>
  );
}
