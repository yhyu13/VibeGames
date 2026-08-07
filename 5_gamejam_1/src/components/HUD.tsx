import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useUiStore } from '../store';
import type { AnxietyBand, BeatType } from '../core/types';

// 05 §2.1：焦虑三层代理 —— L1 vignette / L2 波形 mini meter / L3 Boss 体态（engine 侧）。
// 颜色仅作辅助（色盲安全），主线索是波形形状（平→尖）+ 透明度递增。

const BAND_VIGNETTE: Record<AnxietyBand, number> = {
  calm: 0,
  nervous: 0.08,
  shaky: 0.18,
  panic: 0.32,
};
const BAND_COLOR: Record<AnxietyBand, string> = {
  calm: '#4a90d9',
  nervous: '#4a90d9',
  shaky: '#f5a623',
  panic: '#d93025',
};
const BAND_FILL: Record<AnxietyBand, number> = { calm: 15, nervous: 45, shaky: 72, panic: 92 };

interface WaveCfg {
  amp: number;
  freq: number;
  shape: 'flat' | 'sine' | 'saw' | 'spike';
}
const BAND_WAVE: Record<AnxietyBand, WaveCfg> = {
  calm: { amp: 1, freq: 0, shape: 'flat' },
  nervous: { amp: 1.5, freq: 0.8, shape: 'sine' },
  shaky: { amp: 2.5, freq: 2, shape: 'saw' },
  panic: { amp: 4, freq: 3.5, shape: 'spike' },
};

const W = 120;
const H = 12;

// beat 圈：数据来自 store.beat（引擎每帧同步）；无 beat 时 idle（05 §2.3）。
export interface BeatRingInfo {
  type: BeatType;
  remaining: number;
  duration: number;
}
const BEAT_ICON: Record<BeatType, string> = {
  move: '走位',
  attack: '攻击',
  line: '台词',
  vfx: '特效',
};
const BEAT_HINT: Record<BeatType, string> = {
  move: 'WASD 走进光圈',
  attack: '左键出手！',
  line: '念台词…',
  vfx: '仪式进行中',
};

export interface HUDProps {
  beat?: BeatRingInfo | null;
  combo?: number;
}

function wavePath(cfg: WaveCfg, t: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    const u = x / W;
    let y = H / 2;
    const phase = u * Math.PI * 2 + t * cfg.freq * Math.PI * 2;
    switch (cfg.shape) {
      case 'flat':
        y = H / 2;
        break;
      case 'sine':
        y = H / 2 + Math.sin(phase) * cfg.amp;
        break;
      case 'saw':
        y = H / 2 + (Math.abs(Math.sin(phase)) - 0.5) * 2 * cfg.amp;
        break;
      case 'spike': {
        const s = Math.sin(u * Math.PI * 4 + t * cfg.freq * Math.PI * 2);
        y = H / 2 + Math.sign(s) * Math.pow(Math.abs(s), 4) * cfg.amp;
        break;
      }
    }
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
}

function BeatRing({ beat }: { beat?: BeatRingInfo | null }) {
  const R = 30;
  const C = 2 * Math.PI * R;
  const frac = beat ? Math.max(0, Math.min(1, beat.remaining / Math.max(0.001, beat.duration))) : 0;
  const type = beat?.type ?? null;
  const isAttack = type === 'attack';
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <div className={`relative h-20 w-20 ${isAttack ? 'soft-pulse' : ''}`}>
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={R} fill="none" stroke="#e8e0cc" strokeOpacity={0.15} strokeWidth={3} />
          {beat && (
            <circle
              cx="40"
              cy="40"
              r={R}
              fill="none"
              stroke={isAttack ? '#d6223a' : '#ff9a3c'}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - frac)}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          )}
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${isAttack ? 'text-blood' : 'text-candle/80'}`}>
          {type ? BEAT_ICON[type] : '·'}
        </div>
      </div>
      <p
        className={`mt-1 text-center text-[11px] tracking-widest ${isAttack ? 'font-semibold text-blood' : 'text-paper/45'}`}
      >
        {beat ? BEAT_HINT[type ?? 'move'] : '等待节拍'}
      </p>
    </div>
  );
}

function ComboPill({ combo }: { combo: number }) {
  return (
    <div className="absolute bottom-36 left-1/2 -translate-x-1/2 rounded-full border border-candle/50 bg-abyss/60 px-4 py-1 text-sm text-candle">
      连击 ×{combo}
    </div>
  );
}

export default function HUD({ beat: beatProp = null, combo: comboProp = 0 }: HUDProps) {
  const band = useUiStore((s) => s.anxiety.band);
  const round = useUiStore((s) => s.runState.round);
  const beat = useUiStore((s) => s.beat) ?? beatProp;
  const combo = comboProp;
  const [meterFaded, setMeterFaded] = useState(false);

  const wavePathRef = useRef<SVGPathElement | null>(null);
  const shakeRef = useRef<HTMLDivElement | null>(null);

  // 焦虑 <40（calm）且 5s 无增量 → meter 淡至 20% 透明度
  useEffect(() => {
    setMeterFaded(false);
    const t = window.setTimeout(() => {
      if (useUiStore.getState().anxiety.band === 'calm') setMeterFaded(true);
    }, 5000);
    return () => window.clearTimeout(t);
  }, [band]);

  // 波形（弦动感）与手抖：单 rAF 驱动，每帧读 store 最新值，避免频繁重渲染
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const s = useUiStore.getState();
      const cfg = BAND_WAVE[s.anxiety.band];
      const path = wavePath(cfg, t);
      if (wavePathRef.current) wavePathRef.current.setAttribute('d', path);
      if (shakeRef.current) {
        const sh = s.anxiety.shakeIntensity;
        if (sh > 0.001) {
          const a = 2 + sh * 4;
          const dx = Math.sin(now * 0.041) * a;
          const dy = Math.cos(now * 0.053) * a;
          shakeRef.current.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
        } else {
          shakeRef.current.style.transform = 'none';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const vignetteStyle: CSSProperties = {
    background: 'radial-gradient(ellipse at center, transparent 52%, rgba(0, 0, 0, 0.85) 100%)',
    opacity: BAND_VIGNETTE[band],
    transition: 'opacity 0.5s ease',
  };

  return (
    <div className="no-select pointer-events-none fixed inset-0 z-[20]">
      <div className={`absolute inset-0 ${band === 'panic' ? 'vignette-flicker' : ''}`} style={vignetteStyle} />
      <div ref={shakeRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        {/* 轮次标记 */}
        <div className="absolute left-6 top-6 text-sm tracking-widest text-paper/50">第 {round} 幕</div>
        {/* L2 mini meter：波形 + 胶囊填充（无数字） */}
        <div
          className="absolute bottom-6 left-6"
          style={{ opacity: meterFaded ? 0.2 : 1, transition: 'opacity 0.8s ease' }}
        >
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="mb-1 overflow-visible">
            <path
              ref={wavePathRef}
              d={`M0 ${H / 2} L${W} ${H / 2}`}
              fill="none"
              stroke={BAND_COLOR[band]}
              strokeWidth={1.4}
            />
            {band === 'panic' && (
              <text x={W - 6} y={2} fill="#d93025" fontSize={9} fontWeight={700}>
                !
              </text>
            )}
          </svg>
          <div className="h-2.5 w-[120px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${BAND_FILL[band]}%`,
                background: BAND_COLOR[band],
                transition: 'width 0.5s ease, background 0.5s ease',
              }}
            />
          </div>
        </div>
        {/* beat 圈 + 连击 */}
        <BeatRing beat={beat} />
        {combo >= 2 && <ComboPill combo={combo} />}
      </div>
    </div>
  );
}
