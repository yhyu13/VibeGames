import React from 'react';
import { useGameStore } from '../store';

const cornerTL = (color: string) => (
  <svg className="absolute top-0 left-0 w-4 h-4" viewBox="0 0 16 16">
    <path d="M0 0h14v2H2v12H0z" fill={color} />
  </svg>
);
const cornerTR = (color: string) => (
  <svg className="absolute top-0 right-0 w-4 h-4" viewBox="0 0 16 16">
    <path d="M16 0H2v2h12v12h2z" fill={color} />
  </svg>
);
const cornerBL = (color: string) => (
  <svg className="absolute bottom-0 left-0 w-4 h-4" viewBox="0 0 16 16">
    <path d="M0 16h14v-2H2V2H0z" fill={color} />
  </svg>
);
const cornerBR = (color: string) => (
  <svg className="absolute bottom-0 right-0 w-4 h-4" viewBox="0 0 16 16">
    <path d="M16 16H2v-2h12V2h2z" fill={color} />
  </svg>
);

const Menu: React.FC = () => {
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-dark-bg">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Title */}
      <div className="text-center mb-16 relative">
        <div className="relative inline-block px-8 py-6 pixel-border bg-black/60">
          {cornerTL('#00f0ff')}
          {cornerTR('#00f0ff')}
          {cornerBL('#00f0ff')}
          {cornerBR('#00f0ff')}
          <h1 className="font-pixel-title text-2xl md:text-3xl text-neon-cyan mb-4 pixel-text-glow tracking-wide">
            纯白枪骑兵
          </h1>
          <p className="font-pixel text-lg text-white/40 tracking-[0.2em]">PURE WHITE LANCER</p>
          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-white/25">
            <span className="px-2 py-0.5 pixel-border-dim">3D ACTION</span>
            <span className="px-2 py-0.5 pixel-border-dim">REMAKE</span>
          </div>
        </div>
      </div>

      {/* Menu buttons */}
      <div className="space-y-3 w-64">
        <button
          onClick={() => setGame({ screen: 'modeSelect' })}
          className="pixel-btn w-full py-2.5 text-base tracking-[0.15em]"
        >
          START GAME
        </button>
        <div className="text-center mt-8">
          <p className="font-pixel text-xs text-white/20 tracking-wider">
            BASED ON THE FLASH ORIGINAL
          </p>
          <p className="font-pixel text-[10px] text-white/15 mt-1">
            ORIGINAL: phixcat | REMAKE: KIMI3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
