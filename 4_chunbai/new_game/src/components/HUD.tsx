import React from 'react';
import { useGameStore } from '../store';
import { getWeapon } from '../core/data/weapons';
import { FireMode } from '../core/types';

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
  // Boss 血条：数值来自 store（GameEngine.syncStore 每步同步仿真的真值），无 Boss 时按空条处理
  const bossHpPct = game.bossMaxHp > 0 ? Math.max(0, Math.min(100, (game.bossHp / game.bossMaxHp) * 100)) : 0;
  // SPEED 读数 = store 里由 GameEngine 每步同步的实时速度。此前读的是 p.speed——那是加速上限的
  // 基数（boost/dodge 都拿它当乘数），出生时写一次、此后没人再写，所以 boost 把速度翻三倍时
  // 这块表盘仍印着 020。旁边的 TIME 一直是活的，这一格现在才是。
  const speed = Math.round(game.playerSpeed);

  const slide = (delayMs: number, fromX = 0, fromY = 12): React.CSSProperties => ({
    opacity: showHud ? 1 : 0,
    transform: showHud ? 'translate(0,0)' : `translate(${fromX}px, ${fromY}px)`,
    transition: `opacity 0.4s ease-out ${delayMs}ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${delayMs}ms`,
    pointerEvents: showHud ? 'auto' : 'none',
  });

  return (
    <>
      {/* 顶行：识别 / 操作提示 / 关卡。这三块从前是三个各自绝对定位的兄弟，彼此看不见对方，
          所以提示的右端能不能撞上 LEVEL 面板，只由视口宽度决定：实测静止态 1280/1152/1024px
          分别还剩 163/99/35px 的空隙，到 900px 是 −7px、800px 是 −32px（此时 left:50% 已经
          把提示压成两行，宽度从 490 掉到 450/400，照样插进面板里）。
          写成一行 flex 之后，两侧面板保持固有宽度，中间那格拿走剩下的空间并换行，≥1024px 的
          三种宽度与改前逐像素相同，1280px 下提示依旧正中（395→885）。
          但"不再重叠"不是几何保证出来的，上一版这里写着"重叠在几何上不再可能"——量出来是假的：
          中间那格是 min-w-0，480px 视口下它的盒子只剩 18px，而提示里最长的不可断词
          （SHIFT/CTRL，9px 字加 0.15em 字距）宽 62.11px——字比盒子宽，就一定会画到盒子外面，
          实测墨水越进 LEVEL 面板 49px，375px 下到 249px。真正拦住它的是 overflow-hidden：
          宁可截断，也不许盖住 LEVEL。代价是 480px 下提示被截掉一截、375px 下整块被裁光
          （量像素的通道在那两个宽度上读到的是"没有东西越界"，因为 375px 时它已经什么都画不出来）。
          一行放得下完整提示要约 524px，窄于此就只能取舍。
          窄于约 954px 时它比视口中线偏左 25px——EN 面板的 min-w 是 170px、LEVEL 是 220px，
          两个 flex-1 占位因此不等宽；这是窄屏下的第二笔代价。 */}
      <div className="absolute top-3 inset-x-3 flex items-start gap-3">
        {/* 左：玩家识别 / EN 能量 */}
        <div className="flex-1 flex justify-start" style={slide(800, -20, 0)}>
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

        {/* 中：操作提示。这一行是全局唯一活着的操作面——主菜单的「操作指南」是个 disabled 占位，
            所以它必须跟着 InputManager 的绑定走：Shift/Ctrl 垂直、Tab 锁定、双击空格闪避都绑在那里，
            漏一个就等于那个键不存在（Shift 一秒能把机体推 10 米，玩家却无从得知）。 */}
        <div className="min-w-0 overflow-hidden" style={slide(1500, 0, -8)}>
          <div
            className="cp-num px-3 py-1 bg-black/70 text-[9px] tracking-[0.15em] text-center"
            style={{ color: CP_FAINT }}
          >
            WASD · SHIFT/CTRL · MOUSE · LMB · SPACE · SPACE×2 · E · 1-6 · Z · TAB · ESC
          </div>
        </div>

        {/* 右：关卡 / Boss */}
        <div className="flex-1 flex justify-end" style={slide(900, 20, 0)}>
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
                <div className="mt-1.5 mb-0.5 flex items-center justify-between cp-num text-[10px]">
                  <span style={{ color: CP_RED }}>HP</span>
                  <span className="cp-text-white">
                    {String(Math.ceil(game.bossHp)).padStart(3, '0')}/{Math.ceil(game.bossMaxHp)}
                  </span>
                </div>
                <Bar pct={bossHpPct} variant="hp" />
              </>
            )}
          </CorneredFrame>
        </div>
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

    </>
  );
};

export default HUD;