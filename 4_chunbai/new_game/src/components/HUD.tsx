import React from 'react';
import { useGameStore } from '../store';
import { getWeapon } from '../data/weapons';
import { FireMode } from '../types';

const FIRE_MODE_LABELS: Record<FireMode, string> = {
  [FireMode.FreeFire]: 'FR',
  [FireMode.LockShortRange]: 'SR',
  [FireMode.LockRequired]: 'LCK',
};

// 原版 HUD 颜色（参考截图）
const C_FRAME_BLUE = '#6a7fff';
const C_EN_GREEN = '#33ff66';
const C_HP_RED = '#ff3030';
const C_SP_YELLOW = '#ffdd44';
const C_TEXT_WHITE = '#ffffff';
const C_TEXT_DIM = 'rgba(255,255,255,0.55)';
const C_TEXT_FAINT = 'rgba(255,255,255,0.35)';

const Frame: React.FC<{ children: React.ReactNode; className?: string; color?: string }> = ({ children, className = '', color = C_FRAME_BLUE }) => (
  <div className={`relative border-2 bg-black/80 ${className}`} style={{ borderColor: color }}>
    {children}
  </div>
);

const Bar: React.FC<{ pct: number; fill: string }> = ({ pct, fill }) => (
  <div className="relative w-full h-[10px] border border-white/30 bg-black/85 overflow-hidden">
    <div className="h-full" style={{ width: `${pct}%`, background: fill }} />
  </div>
);

const HUD: React.FC = () => {
  const { game, players } = useGameStore();
  const p = players[0];
  if (!p) return null;

  // C0: 开场动画期间 HUD 不可见；introActive 翻转后整组 HUD 由各子块自身 transition 滑入
  const showHud = !game.introActive;

  const weapon = getWeapon(p.weapon);
  const hpPct = Math.max(0, (p.hp / p.maxHp) * 100);
  const enPct = Math.max(0, (p.energy / p.maxEnergy) * 100);
  const spPct = Math.max(0, (p.specialGauge / p.maxSpecialGauge) * 100);
  const speed = Math.round(p.speed);

  // 共用过渡：opacity + translateY；从外部统一传入 delay 与偏移
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
        <Frame className="px-3 py-2 min-w-[150px]">
          <div className="flex items-center justify-between text-[11px] tracking-wider mb-1">
            <span style={{ color: C_TEXT_WHITE }}>P1</span>
            <span style={{ color: C_EN_GREEN }}>EN</span>
          </div>
          <Bar pct={enPct} fill={C_EN_GREEN} />
          <div className="flex items-center justify-between text-[10px] mt-0.5" style={{ color: C_TEXT_DIM }}>
            <span>{Math.ceil(p.energy)}/{p.maxEnergy}</span>
          </div>
        </Frame>
      </div>

      {/* Top-right: 关卡 / Boss */}
      <div className="absolute top-3 right-3" style={slide(900, 20, 0)}>
        <Frame className="px-3 py-2 min-w-[200px]" color={game.bossFight ? C_HP_RED : C_FRAME_BLUE}>
          <div className="flex items-center justify-between text-[11px] tracking-wider mb-1">
            <span style={{ color: C_TEXT_WHITE }}>LEVEL {game.wave}</span>
            <span style={{ color: game.bossFight ? C_HP_RED : C_TEXT_DIM }}>
              {game.bossFight ? 'BOSS' : 'PVE'}
            </span>
          </div>
          {game.bossFight && (
            <>
              <div className="text-[10px] mb-1" style={{ color: C_HP_RED }}>{game.bossName}</div>
              <Bar pct={100} fill={C_HP_RED} />
            </>
          )}
        </Frame>
      </div>

      {/* Bottom-left: 玩家 HP + SP + 武器 */}
      <div className="absolute bottom-3 left-3" style={slide(1000, -20, 0)}>
        <Frame className="px-3 py-2 min-w-[260px]">
          <div className="flex items-center justify-between text-[11px] tracking-wider mb-1">
            <span style={{ color: C_TEXT_WHITE }}>ARMOR</span>
            <span style={{ color: C_TEXT_WHITE }}>{Math.ceil(p.hp)}/{p.maxHp}</span>
          </div>
          <Bar pct={hpPct} fill={C_HP_RED} />

          <div className="flex items-center justify-between text-[11px] tracking-wider mt-2 mb-1">
            <span style={{ color: C_TEXT_WHITE }}>SP</span>
            <span style={{ color: C_SP_YELLOW }}>{Math.ceil(p.specialGauge)}%</span>
          </div>
          <Bar pct={spPct} fill={C_SP_YELLOW} />

          <div className="flex items-center gap-2 mt-2 text-[10px]" style={{ color: C_TEXT_DIM }}>
            <span style={{ color: C_TEXT_FAINT }}>WPN</span>
            <span style={{ color: C_TEXT_WHITE }}>{weapon.name}</span>
            <span>DMG:{weapon.damage}</span>
            <span style={{ color: C_TEXT_WHITE }}>[{FIRE_MODE_LABELS[weapon.fireMode]}]</span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: C_TEXT_DIM }}>
            <span style={{ color: C_TEXT_FAINT }}>SCORE</span>
            <span style={{ color: C_TEXT_WHITE }}>{p.score}</span>
            {p.combo > 1 && (
              <span style={{ color: C_SP_YELLOW }}>x{p.combo}</span>
            )}
          </div>
        </Frame>
      </div>

      {/* Bottom-center: 速度表盘（参考原版） */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2" style={slide(1200, 0, 12)}>
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 border-2 bg-black/80" style={{ borderColor: C_FRAME_BLUE }}>
            <div className="text-[10px] tracking-widest" style={{ color: C_TEXT_FAINT }}>SPEED</div>
            <div className="font-mono text-2xl leading-none" style={{ color: C_SP_YELLOW }}>
              {String(speed).padStart(3, '0')}
            </div>
          </div>
          <div className="px-3 py-2 border-2 bg-black/80" style={{ borderColor: C_FRAME_BLUE }}>
            <div className="text-[10px] tracking-widest" style={{ color: C_TEXT_FAINT }}>TIME</div>
            <div className="font-mono text-2xl leading-none" style={{ color: C_TEXT_WHITE }}>
              {Math.floor(game.time / 60).toString().padStart(2, '0')}:{Math.floor(game.time % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-right: 武器槽（黄色方块图标 + 黑色武器剪影） */}
      <div className="absolute bottom-3 right-3" style={slide(1100, 20, 0)}>
        <Frame className="px-2 py-2">
          <div className="text-[10px] mb-1 tracking-wider" style={{ color: C_TEXT_FAINT }}>WEAPON</div>
          <div className="flex items-center gap-1.5">
            {p.weapons.map(w => {
              const wpn = getWeapon(w);
              const active = w === p.weapon;
              return (
                <div
                  key={w}
                  className="w-9 h-9 flex items-center justify-center border"
                  style={{
                    background: '#ffdd44',
                    borderColor: active ? '#ffffff' : '#000000',
                  }}
                  title={wpn.name}
                >
                  <span style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>
                    {w}
                  </span>
                </div>
              );
            })}
          </div>
        </Frame>
      </div>

      {/* Top-center: 操作提示 */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2" style={slide(1500, 0, -8)}>
        <div className="px-3 py-1 bg-black/70 text-[9px] tracking-wider" style={{ color: C_TEXT_FAINT }}>
          WASD MOVE · MOUSE AIM · LMB FIRE · SPACE BOOST · E BRAKE · 1-4 SWITCH · Z SPECIAL · ESC PAUSE
        </div>
      </div>
    </>
  );
};

export default HUD;
