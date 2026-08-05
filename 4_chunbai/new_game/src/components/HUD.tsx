import React from 'react';
import { useGameStore } from '../store';
import { getWeapon } from '../data/weapons';
import { FireMode } from '../types';

const FIRE_MODE_LABELS: Record<FireMode, string> = {
  [FireMode.FreeFire]: 'FR',
  [FireMode.LockShortRange]: 'SR',
  [FireMode.LockRequired]: 'LCK',
};

const CP_YELLOW = '#FFEE00';
const CP_RED = '#ff3030';
const CP_GREEN = '#88ff44';
const CP_DIM = 'rgba(255, 238, 0, 0.55)';
const CP_FAINT = 'rgba(255, 238, 0, 0.30)';

const CorneredFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dim' | 'warn' | 'danger';
}> = ({ children, className = '', variant = 'default' }) => {
  const variantCls =
    variant === 'dim' ? 'cp-frame-dim' :
    variant === 'warn' ? 'cp-frame-warn' :
    variant === 'danger' ? 'cp-frame-danger' : '';
  return (
    <div className={`cp-frame ${variantCls} ${className}`}>
      <span className="cp-corner-bl" />
      <span className="cp-corner-br" />
      {children}
    </div>
  );
};

const Bar: React.FC<{ pct: number; variant: 'en' | 'hp' | 'sp' }> = ({ pct, variant }) => {
  const cls = variant === 'en' ? 'cp-bar-en' : variant === 'hp' ? 'cp-bar-hp' : 'cp-bar-sp';
  return (
    <div className="cp-bar">
      <div className={`cp-bar-fill ${cls}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

const HUD: React.FC = () => {
  const { game, players } = useGameStore();
  const p = players[0];
  if (!p) return null;

  const showHud = !game.introActive;

  const weapon = getWeapon(p.weapon);
  const hpPct = Math.max(0, (p.hp / p.maxHp) * 100);
  const enPct = Math.max(0, (p.energy / p.maxEnergy) * 100);
  const spPct = Math.max(0, (p.specialGauge / p.maxSpecialGauge) * 100);
  const speed = Math.round(p.speed);

  const slide = (delayMs: number, fromX = 0, fromY = 12): React.CSSProperties => ({
    opacity: showHud ? 1 : 0,
    transform: showHud ? 'translate(0,0)' : `translate(${fromX}px, ${fromY}px)`,
    transition: `opacity 0.4s ease-out ${delayMs}ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${delayMs}ms`,
    pointerEvents: showHud ? 'auto' : 'none',
  });

  return (
    <>
      {/* Top-left: 玩家识别 / EN 能量 */}
      <div className="absolute top-3 left-3" style={slide(800, -20, 0)}>
        <CorneredFrame className="min-w-[170px]">
          <div className="flex items-center justify-between text-[11px] mb-1 cp-num">
            <span className="cp-text-white">P1</span>
            <span className="cp-label" style={{ color: CP_GREEN }}>EN</span>
          </div>
          <Bar pct={enPct} variant="en" />
          <div className="cp-num text-[10px] mt-1 text-right" style={{ color: CP_DIM }}>
            {Math.ceil(p.energy)}/{p.maxEnergy}
          </div>
        </CorneredFrame>
      </div>

      {/* Top-right: 关卡 / Boss */}
      <div className="absolute top-3 right-3" style={slide(900, 20, 0)}>
        <CorneredFrame className="min-w-[220px]" variant={game.bossFight ? 'danger' : 'default'}>
          <div className="flex items-center justify-between text-[11px] cp-num">
            <span className="cp-label">LEVEL</span>
            <span className="cp-num cp-text-white" style={{ fontSize: 16 }}>{String(game.wave).padStart(2, '0')}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] cp-num mt-1">
            <span style={{ color: CP_DIM }}>{game.bossFight ? 'BOSS' : 'PVE'}</span>
            <span style={{ color: game.lockOn ? CP_GREEN : game.bossFight ? CP_RED : CP_DIM }}>
              {game.lockOn ? 'LOCK' : game.bossFight ? game.bossName : 'ENGAGE'}
            </span>
          </div>
          {game.bossFight && (
            <>
              <div className="mt-1.5 mb-0.5 cp-num text-[10px]" style={{ color: CP_RED }}>HP</div>
              <Bar pct={100} variant="hp" />
            </>
          )}
        </CorneredFrame>
      </div>

      {/* Bottom-left: 玩家 HP + SP + 武器 */}
      <div className="absolute bottom-3 left-3" style={slide(1000, -20, 0)}>
        <CorneredFrame className="min-w-[280px]">
          <div className="flex items-center justify-between text-[11px] mb-1 cp-num">
            <span className="cp-label" style={{ color: CP_RED }}>ARMOR</span>
            <span className="cp-text-white">
              {String(Math.ceil(p.hp)).padStart(3, '0')}/{p.maxHp}
            </span>
          </div>
          <Bar pct={hpPct} variant="hp" />

          <div className="flex items-center justify-between text-[11px] mt-2 mb-1 cp-num">
            <span className="cp-label" style={{ color: CP_YELLOW }}>SP</span>
            <span className="cp-text-white">
              {String(Math.ceil(p.specialGauge)).padStart(3, '0')}%
            </span>
          </div>
          <Bar pct={spPct} variant="sp" />

          <div className="flex items-center gap-2 mt-2 text-[10px] cp-num">
            <span style={{ color: CP_FAINT }}>WPN</span>
            <span className="cp-text-white">{weapon.name}</span>
            <span style={{ color: CP_DIM }}>DMG:{weapon.damage}</span>
            <span style={{ color: CP_DIM }}>[{FIRE_MODE_LABELS[weapon.fireMode]}]</span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[10px] cp-num">
            <span style={{ color: CP_FAINT }}>SCORE</span>
            <span className="cp-text">{String(p.score).padStart(6, '0')}</span>
            {p.combo > 1 && (
              <span style={{ color: CP_YELLOW }}>×{p.combo}</span>
            )}
          </div>
        </CorneredFrame>
      </div>

      {/* Bottom-center: 速度 / 时间 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3" style={slide(1200, 0, 12)}>
        <CorneredFrame className="px-3 py-1.5">
          <div className="cp-label text-[9px] tracking-[0.25em]">SPEED</div>
          <div className="cp-num cp-text text-2xl leading-none mt-0.5" style={{ color: CP_YELLOW }}>
            {String(speed).padStart(3, '0')}
          </div>
        </CorneredFrame>
        <CorneredFrame className="px-3 py-1.5">
          <div className="cp-label text-[9px] tracking-[0.25em]">TIME</div>
          <div className="cp-num cp-text-white text-2xl leading-none mt-0.5">
            {Math.floor(game.time / 60).toString().padStart(2, '0')}:
            {Math.floor(game.time % 60).toString().padStart(2, '0')}
          </div>
        </CorneredFrame>
      </div>

      {/* Bottom-right: 武器槽 */}
      <div className="absolute bottom-3 right-3" style={slide(1100, 20, 0)}>
        <CorneredFrame className="px-2 py-2">
          <div className="cp-label text-[9px] mb-1 tracking-[0.25em]">WEAPON</div>
          <div className="flex items-center gap-1.5">
            {p.weapons.map(w => {
              const active = w === p.weapon;
              return (
                <div
                  key={w}
                  className="w-9 h-9 flex items-center justify-center cp-num"
                  style={{
                    background: '#FFEE00',
                    color: '#000',
                    fontSize: 18,
                    fontWeight: 'bold',
                    boxShadow: active ? '0 0 8px #FFEE00' : 'none',
                    outline: active ? '1.5px solid #ffffff' : 'none',
                    outlineOffset: '1.5px',
                  }}
                >
                  {w}
                </div>
              );
            })}
          </div>
        </CorneredFrame>
      </div>

      {/* Top-center: 操作提示 */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2" style={slide(1500, 0, -8)}>
        <div className="cp-num px-3 py-1 bg-black/70 text-[9px] tracking-[0.15em]" style={{ color: CP_FAINT }}>
          WASD · MOUSE · LMB · SPACE · E · 1-4 · Z · ESC
        </div>
      </div>
    </>
  );
};

export default HUD;