import React from 'react';
import { useGameStore } from '../store';
import { getWeapon } from '../data/weapons';
import { FireMode } from '../types';

const FIRE_MODE_LABELS: Record<FireMode, string> = {
  [FireMode.FreeFire]: 'FR',
  [FireMode.LockShortRange]: 'SR',
  [FireMode.LockRequired]: 'LCK',
};

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

const MechaPanel: React.FC<{ children: React.ReactNode; className?: string; color?: string; noFrame?: boolean }> = ({ children, className = '', color = '#00f0ff', noFrame = false }) => (
  <div className={`relative ${noFrame ? '' : 'pixel-border'} bg-black/70 ${className}`}>
    {!noFrame && (
      <>
        {cornerTL(color)}
        {cornerTR(color)}
        {cornerBL(color)}
        {cornerBR(color)}
      </>
    )}
    {children}
  </div>
);

const HPBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
  const pct = (current / max) * 100;
  const color = pct > 50 ? '#00f0ff' : pct > 25 ? '#ff8800' : '#ff2244';
  const borderCls = pct > 50 ? 'pixel-border' : pct > 25 ? 'pixel-border-warning' : 'pixel-border-danger';
  return (
    <div className={`relative ${borderCls} bg-black/80`} style={{ height: 14 }}>
      <div className="pixel-bar-fill" style={{ width: pct + '%', background: color }} />
      {[20, 40, 60, 80].map(i => (
        <div key={i} className="pixel-bar-segment" style={{ left: i + '%' }} />
      ))}
    </div>
  );
};

const SPBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
  const pct = (current / max) * 100;
  return (
    <div className="relative pixel-border-dim bg-black/80" style={{ height: 10 }}>
      <div className="pixel-bar-fill" style={{ width: pct + '%', background: '#ffcc00' }} />
    </div>
  );
};

const HUD: React.FC = () => {
  const { game, players } = useGameStore();
  const p = players[0];
  if (!p) return null;

  const weapon = getWeapon(p.weapon);
  const hpPct = (p.hp / p.maxHp) * 100;
  const hpColor = hpPct > 50 ? '#00f0ff' : hpPct > 25 ? '#ff8800' : '#ff2244';

  return (
    <>
      {/* Top center - mode + wave */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <MechaPanel className="px-4 py-1.5">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-neon-cyan tracking-widest">[PVE MODE]</span>
            <span className="text-white/50">WAVE {game.wave}</span>
            {game.bossFight && (
              <span className="text-mecha-danger pixel-text-glow-red">BOSS: {game.bossName}</span>
            )}
          </div>
        </MechaPanel>
      </div>

      {/* Player panel - fixed bottom-left */}
      <div className="absolute bottom-3 left-3">
        <MechaPanel className="px-3 py-2 min-w-[220px]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs tracking-wider" style={{ color: hpColor }}>
              ARMOR
            </span>
            <span className="text-xs" style={{ color: hpColor }}>
              {Math.ceil(p.hp)}/{p.maxHp}
            </span>
          </div>
          <HPBar current={p.hp} max={p.maxHp} />

          {/* SP Gauge */}
          <div className="flex justify-between items-baseline mt-1.5 mb-0.5">
            <span className="text-[10px] text-yellow-400 tracking-wider">SP GAUGE</span>
            <span className="text-[10px] text-yellow-400/80">{Math.ceil(p.specialGauge)}%</span>
          </div>
          <SPBar current={p.specialGauge} max={p.maxSpecialGauge} />

          {/* Weapon */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] text-white/40">WPN</span>
            <span className="text-xs text-neon-cyan pixel-text-glow">{weapon.name}</span>
            <span className="text-[10px] text-white/30">DMG:{weapon.damage}</span>
            <span className={`text-[10px] ${FIRE_MODE_LABELS[weapon.fireMode] === 'LCK' ? 'text-mecha-danger' : 'text-neon-cyan'}`}>
              [{FIRE_MODE_LABELS[weapon.fireMode]}]
            </span>
          </div>

          {/* Score + Combo */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/40">SCORE</span>
            <span className="text-xs text-white">{p.score}</span>
            {p.combo > 1 && (
              <span className="text-xs text-mecha-warning pixel-text-glow">x{p.combo}</span>
            )}
          </div>
        </MechaPanel>
      </div>

      {/* Controls hint */}
      <div className="absolute top-3 right-3 z-10">
        <MechaPanel className="px-2 py-1.5" noFrame>
          <div className="text-[9px] text-white/25 leading-relaxed text-right tracking-wider">
            <div>WASD MOVE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SHIFT/CTRL UP-DOWN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MOUSE AIM</div>
            <div>LMB FIRE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPACE BOOST &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPACE x2 DODGE</div>
            <div>E BRAKE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1-4 SWITCH WPN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TAB LOCK</div>
            <div>Z SPECIAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ESC/ENTER PAUSE</div>
          </div>
        </MechaPanel>
      </div>
    </>
  );
};

export default HUD;
