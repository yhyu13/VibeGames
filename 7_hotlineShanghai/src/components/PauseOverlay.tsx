// src/components/PauseOverlay.tsx — 暂停遮罩(B04)
// Tab 暂停时模拟冻结;本层提示玩家状态与恢复方式。
import * as React from 'react';

export function PauseOverlay(): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-shanghai-ink/70">
      <div className="text-shadow-pixel text-7xl tracking-[0.4em] text-shanghai-ivory">已暂停</div>
      <div className="mt-6 text-2xl text-shanghai-paper">Tab 继续 · Esc 返回标题</div>
    </div>
  );
}
