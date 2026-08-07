/**
 * App.tsx — 顶层容器
 *
 * M1.5 by agent-ui:
 * - 全屏容器 + #three-canvas-container(absolute inset-0,GameEngine 挂 canvas)
 * - 覆盖层容器 pointer-events-none,可点击元素(菜单 / 结算按钮)各自 pointer-events-auto
 * - 各覆盖层组件按 store.phase 自行决定显示:
 *   Menu(MENU)/ HUD(READY/PLAY/POINT)/ ReadyCountdown(READY)/
 *   PointOverlay(POINT)/ WinScreen(MATCH_OVER)/ PerfBadge(恒渲染,仅 DEV)
 */

import { HUD } from './components/HUD';
import { Menu } from './components/Menu';
import { PerfBadge } from './components/PerfBadge';
import { PointOverlay } from './components/PointOverlay';
import { ReadyCountdown } from './components/ReadyCountdown';
import { WinScreen } from './components/WinScreen';

export function App() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* 3D 球场:GameEngine.start() 自建 canvas 挂到这里 */}
      <div id="three-canvas-container" className="absolute inset-0" />

      {/* React UI 覆盖层(整体不挡鼠标,可点击元素单独放开) */}
      <div className="pointer-events-none absolute inset-0">
        <HUD />
        <ReadyCountdown />
        <PointOverlay />
        <WinScreen />
        <Menu />
        <PerfBadge />
      </div>
    </div>
  );
}
