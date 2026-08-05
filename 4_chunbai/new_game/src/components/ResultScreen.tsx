import React from 'react';
import { useGameStore } from '../store';

const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#FFEE00" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#FFEE00" strokeWidth="2" />
  </svg>
);

const CP_FAINT = 'rgba(255, 238, 0, 0.30)';
const CP_DIM = 'rgba(255, 238, 0, 0.55)';
const CP_YELLOW = '#FFEE00';
const CP_RED = '#ff3030';

const ResultScreen: React.FC = () => {
  const { game, players } = useGameStore();
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="cp-bg w-full h-full flex flex-col items-center justify-center">
      <div className="cp-watermark" />

      <div className="relative z-10 cp-frame cp-frame-danger px-8 py-3 mb-6">
        <span className="cp-corner-bl" />
        <span className="cp-corner-br" />
        <h1 className="cp-title text-center leading-none tracking-[0.15em]" style={{ fontSize: '34px', color: CP_RED }}>
          GAME OVER
        </h1>
      </div>

      <div className="relative z-10 cp-frame cp-frame-dim w-[360px] max-w-[90vw] px-5 py-4 mb-6">
        <span className="cp-corner-bl" />
        <span className="cp-corner-br" />
        <h3 className="cp-label text-[14px] mb-3">战 绩</h3>
        {players.map((p, i) => (
          <div key={p.id} className="cp-num flex justify-between text-[13px] mb-1.5">
            <span className="cp-text-white">P{i + 1}</span>
            <span className="cp-text">
              KILLS:{String(p.kills).padStart(3, '0')}  SCORE:{String(p.score).padStart(6, '0')}
            </span>
          </div>
        ))}
        <div className="cp-num flex justify-between text-[13px] mt-2 pt-2"
          style={{ borderTop: '1px solid rgba(255, 238, 0, 0.30)' }}>
          <span className="cp-text-white">关卡</span>
          <span className="cp-text">LEVEL {String(game.wave).padStart(2, '0')}</span>
        </div>
        <div className="cp-num flex justify-between text-[13px] mt-1">
          <span className="cp-text-white">用时</span>
          <span className="cp-text">
            {Math.floor(game.time / 60).toString().padStart(2, '0')}:
            {Math.floor(game.time % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-2 w-[280px]">
        <button
          onClick={() => {
            useGameStore.getState().resetGame();
            setGame({ screen: 'pve', gameMode: 'pve' });
          }}
          className="cp-btn w-full py-2 text-base"
        >
          再来一局
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

      <div className="mt-6 flex items-center gap-2">
        <PhixcatLogo size={28} opacity={0.6} />
        <span className="cp-num text-[10px] tracking-wider" style={{ color: CP_FAINT }}>
          FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79
        </span>
      </div>
    </div>
  );
};

export default ResultScreen;