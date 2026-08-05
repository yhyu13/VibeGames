import React from 'react';
import { useGameStore } from '../store';

const cornerTL = (color: string) => (
  <svg className="absolute top-0 left-0 w-3 h-3" viewBox="0 0 12 12">
    <path d="M0 0h10v2H2v8H0z" fill={color} />
  </svg>
);
const cornerTR = (color: string) => (
  <svg className="absolute top-0 right-0 w-3 h-3" viewBox="0 0 12 12">
    <path d="M12 0H2v2h8v8h2z" fill={color} />
  </svg>
);
const cornerBL = (color: string) => (
  <svg className="absolute bottom-0 left-0 w-3 h-3" viewBox="0 0 12 12">
    <path d="M0 12h10v-2H2V2H0z" fill={color} />
  </svg>
);
const cornerBR = (color: string) => (
  <svg className="absolute bottom-0 right-0 w-3 h-3" viewBox="0 0 12 12">
    <path d="M12 12H2v-2h8V2h2z" fill={color} />
  </svg>
);

const ResultScreen: React.FC = () => {
  const { game, players } = useGameStore();
  const setGame = useGameStore(s => s.setGame);

  const resultColor = '#ff2244';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-dark-bg">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative px-8 py-6 pixel-border bg-black/80 mb-8">
        {cornerTL(resultColor)}
        {cornerTR(resultColor)}
        {cornerBL(resultColor)}
        {cornerBR(resultColor)}
        <h1 className="font-pixel-title text-xl tracking-wider pixel-text-glow" style={{ color: resultColor }}>
          GAME OVER
        </h1>
      </div>

      <div className="relative px-5 py-4 pixel-border-dim bg-black/60 w-80 mb-8">
        {cornerTL('#00f0ff')}
        {cornerTR('#00f0ff')}
        {cornerBL('#00f0ff')}
        {cornerBR('#00f0ff')}
        <h3 className="font-pixel text-sm text-white/40 mb-3 tracking-wider">BATTLE STATS</h3>
        {players.map((p, i) => (
          <div key={p.id} className="flex justify-between font-pixel text-sm mb-1.5 tracking-wider">
            <span className="text-white/60">P{i + 1}</span>
            <span className="text-white">
              KILLS:{p.kills} SCORE:{p.score}
            </span>
          </div>
        ))}
        <div className="flex justify-between font-pixel text-sm mt-2 pt-2 tracking-wider" style={{ borderTop: '1px solid rgba(0,240,255,0.2)' }}>
          <span className="text-white/40">WAVE</span>
          <span className="text-white font-bold">{game.wave}</span>
        </div>
      </div>

      <div className="space-y-3 w-64">
        <button
          onClick={() => {
            useGameStore.getState().resetGame();
            setGame({ screen: 'pve', gameMode: 'pve' });
          }}
          className="pixel-btn w-full py-2 text-base tracking-[0.15em]"
        >
          PLAY AGAIN
        </button>
        <button
          onClick={() => {
            useGameStore.getState().resetGame();
            setGame({ screen: 'menu' });
          }}
          className="pixel-btn w-full py-2 text-base tracking-[0.15em]"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
