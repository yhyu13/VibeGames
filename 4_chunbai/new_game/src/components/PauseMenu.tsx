import React from 'react';
import { useGameStore } from '../store';

const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#ffffff" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

const PauseMenu: React.FC = () => {
  const { game, setGame } = useGameStore();

  return (
    <div className="lancer-bg absolute inset-0 z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><polygon points=\'50,15 90,80 10,80\' fill=\'none\' stroke=\'%236a7fff\' stroke-width=\'2\'/><line x1=\'22\' y1=\'60\' x2=\'78\' y2=\'60\' stroke=\'%236a7fff\' stroke-width=\'1.5\'/></svg>")',
          backgroundSize: '180px 180px',
        }}
      />

      <div className="relative z-10 mx-auto w-[420px] max-w-[90vw] lancer-frame px-8 py-6">
        <h2 className="font-pixel-title text-center leading-none"
          style={{
            color: '#6a7fff',
            fontSize: '40px',
            textShadow: '2px 2px 0 #ffffff, -1px -1px 0 #ffffff',
            letterSpacing: '0.1em',
          }}>
          暂停
        </h2>
        <div className="text-center text-[10px] tracking-[0.3em] mt-1" style={{ color: '#8fa4ff' }}>
          PAUSED
        </div>

        <div className="mt-6 border-t border-lancer-blue/40 pt-4 space-y-2">
          <button
            onClick={() => setGame({ screen: 'pve', paused: false })}
            className="lancer-btn w-full py-2 text-base tracking-[0.2em]"
          >
            继续
          </button>
          <button
            onClick={() => {
              useGameStore.getState().resetGame();
              setGame({ screen: 'menu' });
            }}
            className="lancer-btn w-full py-2 text-base tracking-[0.2em]"
          >
            返回主菜单
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <PhixcatLogo size={32} opacity={0.5} />
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
