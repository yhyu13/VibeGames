import React from 'react';
import { useGameStore } from './store';
import Menu from './components/Menu';
import GameCanvas from './components/GameCanvas';
import HUD from './components/HUD';
import PauseMenu from './components/PauseMenu';
import ResultScreen from './components/ResultScreen';

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
