import React from 'react';
import { useGameStore } from '../store';

const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#ffffff" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

const ResultScreen: React.FC = () => {
  const { game, players } = useGameStore();
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="lancer-bg w-full h-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><polygon points=\'50,15 90,80 10,80\' fill=\'none\' stroke=\'%236a7fff\' stroke-width=\'2\'/><line x1=\'22\' y1=\'60\' x2=\'78\' y2=\'60\' stroke=\'%236a7fff\' stroke-width=\'1.5\'/></svg>")',
          backgroundSize: '180px 180px',
        }}
      />

      <div className="relative z-10 lancer-frame-danger px-8 py-3 mb-6">
        <h1 className="font-pixel-title text-center leading-none tracking-[0.15em]"
          style={{
            color: '#ff3030',
            fontSize: '32px',
            textShadow: '2px 2px 0 #ffffff, -1px -1px 0 #ffffff',
          }}>
          GAME OVER
        </h1>
      </div>

      <div className="relative z-10 lancer-frame-dim w-[340px] max-w-[90vw] px-5 py-4 mb-6">
        <h3 className="font-pixel text-[14px] mb-3 tracking-[0.2em]" style={{ color: '#6a7fff' }}>
          战 绩
        </h3>
        {players.map((p, i) => (
          <div key={p.id} className="flex justify-between text-[13px] mb-1.5 tracking-wider">
            <span style={{ color: '#ffffff' }}>P{i + 1}</span>
            <span style={{ color: '#ffdd44' }}>
              KILLS:{p.kills}  SCORE:{p.score}
            </span>
          </div>
        ))}
        <div className="flex justify-between text-[13px] mt-2 pt-2 tracking-wider"
          style={{ borderTop: '1px solid rgba(106,127,255,0.4)' }}>
          <span style={{ color: '#ffffff' }}>关卡</span>
          <span style={{ color: '#ffdd44' }}>LEVEL {game.wave}</span>
        </div>
        <div className="flex justify-between text-[13px] mt-1 tracking-wider">
          <span style={{ color: '#ffffff' }}>用时</span>
          <span style={{ color: '#ffdd44' }}>
            {Math.floor(game.time / 60).toString().padStart(2, '0')}:{Math.floor(game.time % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-2 w-[260px]">
        <button
          onClick={() => {
            useGameStore.getState().resetGame();
            setGame({ screen: 'pve', gameMode: 'pve' });
          }}
          className="lancer-btn w-full py-2 text-base tracking-[0.2em]"
        >
          再来一局
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

      <div className="mt-6 flex items-center gap-2">
        <PhixcatLogo size={28} opacity={0.5} />
        <span className="text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
          FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79
        </span>
      </div>
    </div>
  );
};

export default ResultScreen;
