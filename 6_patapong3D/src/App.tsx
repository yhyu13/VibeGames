/**
 * App.tsx — 顶层容器
 *
 * M0 骨架已挂上所有 6 个组件(M1.5 / M3.x 后续实现完整版)。
 * 当前各组件是占位,M1 起逐步填充。
 */

import { HUD } from './components/HUD';
import { Menu } from './components/Menu';
import { PerfBadge } from './components/PerfBadge';
import { PointOverlay } from './components/PointOverlay';
import { ReadyCountdown } from './components/ReadyCountdown';
import { WinScreen } from './components/WinScreen';

export function App() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 3D 球场(M1.4 由 GameEngine / SceneManager 渲染到 <canvas>,M0 是空 div) */}
      <div id="three-canvas-container" className="absolute inset-0" />

      {/* React UI 覆盖层 */}
      <HUD />
      <ReadyCountdown />
      <PointOverlay />
      <WinScreen />
      <Menu />
      <PerfBadge />
    </div>
  );
}
