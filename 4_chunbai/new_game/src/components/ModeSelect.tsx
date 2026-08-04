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

const ModeSelect: React.FC = () => {
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-dark-bg">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <h2 className="font-pixel text-2xl text-neon-cyan mb-12 pixel-text-glow tracking-[0.2em]">SELECT MODE</h2>

      <div className="flex gap-6">
        {/* PVE Card */}
        <div
          onClick={() => { setGame({ screen: 'pve', gameMode: 'pve' }); }}
          className="relative w-72 p-5 pixel-border bg-black/70 cursor-pointer
            transition-all hover:bg-black/90 group"
        >
          {cornerTL('#00f0ff')}
          {cornerTR('#00f0ff')}
          {cornerBL('#00f0ff')}
          {cornerBR('#00f0ff')}
          <div className="text-2xl mb-3 text-neon-cyan">[PVE]</div>
          <h3 className="font-pixel text-lg text-white mb-2 tracking-wider">SURVIVAL</h3>
          <p className="font-pixel text-sm text-white/40 mb-4 tracking-wide">
            Fight waves of enemies and challenge powerful bosses.
          </p>
          <div className="space-y-1.5 font-pixel text-xs text-white/30 tracking-wider">
            <div>&gt; 6 ENEMY TYPES</div>
            <div>&gt; 3 BOSSES</div>
            <div>&gt; 6 WEAPONS + SPECIAL</div>
            <div>&gt; ENDLESS WAVES</div>
          </div>
          <div className="mt-4 px-3 py-1.5 pixel-border text-center text-sm text-neon-cyan tracking-widest
            group-hover:bg-neon-cyan/10 transition-colors">
            START PVE
          </div>
        </div>

        {/* PVP Card */}
        <div
          onClick={() => { setGame({ screen: 'pvp', gameMode: 'pvp' }); }}
          className="relative w-72 p-5 pixel-border bg-black/70 cursor-pointer
            transition-all hover:bg-black/90 group"
          >
          {cornerTL('#ff6644')}
          {cornerTR('#ff6644')}
          {cornerBL('#ff6644')}
          {cornerBR('#ff6644')}
          <div className="text-2xl mb-3 text-neon-orange">[PVP]</div>
          <h3 className="font-pixel text-lg text-white mb-2 tracking-wider">1 VS 1</h3>
          <p className="font-pixel text-sm text-white/40 mb-4 tracking-wide">
            Local split-screen battle, best of 3.
          </p>
          <div className="space-y-1.5 font-pixel text-xs text-white/30 tracking-wider">
            <div>&gt; BEST OF 3</div>
            <div>&gt; 3 MIN PER ROUND</div>
            <div>&gt; ALL WEAPONS</div>
            <div>&gt; POWER-UP ITEMS</div>
          </div>
          <div className="mt-4 px-3 py-1.5 pixel-border-warning text-center text-sm text-neon-orange tracking-widest
            group-hover:bg-neon-orange/10 transition-colors">
            START PVP
          </div>
        </div>
      </div>

      <button
        onClick={() => setGame({ screen: 'menu' })}
        className="pixel-btn mt-8 px-6 py-1.5 text-sm tracking-[0.15em]"
      >
        ← BACK
      </button>
    </div>
  );
};

export default ModeSelect;
