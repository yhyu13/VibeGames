import React from 'react';
import { useGameStore } from '../store';

const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#FFEE00" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#FFEE00" strokeWidth="2" />
  </svg>
);

const PauseMenu: React.FC = () => {
  const { setGame } = useGameStore();

  return (
    <div className="cp-bg absolute inset-0 z-50 flex flex-col items-center justify-center">
      <div className="cp-watermark" />

      <div className="relative z-10 mx-auto w-[440px] max-w-[90vw] cp-frame px-8 py-6">
        <span className="cp-corner-bl" />
        <span className="cp-corner-br" />
        <h2 className="cp-title text-center leading-none" style={{ fontSize: '42px' }}>
          暂停
        </h2>
        <div className="cp-label text-center text-[10px] tracking-[0.3em] mt-1">PAUSED</div>

        <div className="mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2">
          <button
            onClick={() => setGame({ screen: 'pve', paused: false })}
            className="cp-btn w-full py-2 text-base"
          >
            继续
          </button>
          <button
            onClick={() => {
              useGameStore.getState().resetGame();
              setGame({ screen: 'menu' });
            }}
            className="cp-btn w-full py-2 text-base"
          >
            返回主菜单
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <PhixcatLogo size={32} opacity={0.6} />
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;