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
      // 「进行中」与「暂停」是同一局的两种状态，所以它们渲染同一棵树——暂停不是换一屏，
      // 是给这一屏盖上一层。
      //
      // 这两支此前是分开的：pause 只渲染一个遮罩加暂停菜单，不渲染 `<GameCanvas/>`。而整个游戏
      // 只有一个 `GameEngine`，它活在 `GameCanvas` 的 effect 里，卸载即 `engine.stop()`。于是
      // 按 Esc 等于把这一局连人带引擎丢掉，`继续` 拿回来的是新仿真：wave 从 1 回到 1、敌人清空
      // 重刷、3 秒开场动画重播，而分数与击杀却原样留着——「分数还在，关卡没了」。实测见
      // `.vts-probes/cb-resume.mjs`（两个 arm、同一支探针）。
      //
      // 保留画布不动的另一个好处是它本来就该如此：暂停时画面停在那里，玩家看得见自己停在哪。
      case 'pve':
      case 'pause':
        return (
          <div className="w-full h-full relative">
            <GameCanvas />
            <HUD />
            <EdgePulse />
            {game.screen === 'pause' && (
              <>
                <div className="absolute inset-0 z-40 bg-black/30" />
                <PauseMenu />
              </>
            )}
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