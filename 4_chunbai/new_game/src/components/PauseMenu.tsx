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

const PauseMenu: React.FC = () => {
  const { game, setGame } = useGameStore();

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative px-8 py-6 pixel-border bg-black/80">
        {cornerTL('#00f0ff')}
        {cornerTR('#00f0ff')}
        {cornerBL('#00f0ff')}
        {cornerBR('#00f0ff')}
        <h2 className="font-pixel-title text-xl text-neon-cyan mb-8 pixel-text-glow text-center tracking-wider">
          PAUSED
        </h2>
        <div className="space-y-3 w-64">
          <button
            onClick={() => setGame({ screen: 'pve', paused: false })}
            className="pixel-btn w-full py-2 text-base tracking-[0.15em]"
          >
            CONTINUE
          </button>
          <button
            onClick={() => {
              useGameStore.getState().resetGame();
              setGame({ screen: 'menu' });
            }}
            className="pixel-btn-danger w-full py-2 text-base tracking-[0.15em]"
          >
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
