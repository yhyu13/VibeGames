import React from 'react';
import { useGameStore } from './store';
import Menu from './components/Menu';
import GameCanvas from './components/GameCanvas';
import HUD from './components/HUD';
import PauseMenu from './components/PauseMenu';
import ResultScreen from './components/ResultScreen';

// C4: 屏幕边缘黄色脉冲 — 监听 store.edgePulseAt 变化，渲染一次 0.45s 动画
const EdgePulse: React.FC = () => {
  const edgePulseAt = useGameStore(s => s.game.edgePulseAt);
  if (!edgePulseAt) return null;
  // 用 key 重置动画（每次触发都从 0 开始）
  return (
    <div
      key={edgePulseAt}
      className="fixed inset-0 pointer-events-none z-30 edge-pulse"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 35%, rgba(255, 238, 0, 0.85) 100%)',
      }}
    />
  );
};

const App: React.FC = () => {
  const game = useGameStore(s => s.game);

  const renderScreen = () => {
    switch (game.screen) {
      case 'menu':
        return <Menu />;
      case 'pve':
        return (
          <div className="w-full h-full relative">
            <GameCanvas />
            <HUD />
            <EdgePulse />
          </div>
        );
      case 'pause':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-black/30" />
            <PauseMenu />
          </div>
        );
      case 'result':
        return <ResultScreen />;
      default:
        return <Menu />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden font-pixel">
      {renderScreen()}
    </div>
  );
};

export default App;