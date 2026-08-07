import { useUiStore } from '../store';
import { phaseLabel } from './Menu';
import { sendUiCommand } from './GameCanvas';
import type { AnxietyBand } from '../core/types';

const BAND_META: Record<AnxietyBand, { label: string; color: string }> = {
  calm: { label: '从容', color: '#9fd8a8' },
  nervous: { label: '紧张', color: '#8fd3f4' },
  shaky: { label: '发抖', color: '#ffb03a' },
  panic: { label: '恐慌', color: '#ff5a3c' },
};

const SCRIPT_NAMES: Record<string, string> = { dignity: '庄重威严', tragic: '悲情独白', mad: '癫狂戏剧', freePlay: '即兴' };

export default function HUD() {
  const phase = useUiStore((s) => s.runState.phase);
  const round = useUiStore((s) => s.runState.round);
  const band = useUiStore((s) => s.anxiety.band);
  const viewers = useUiStore((s) => s.viewers);
  const barrageEnabled = useUiStore((s) => s.barrageEnabled);
  const beat = useUiStore((s) => s.beat);
  const scriptName = useUiStore((s) => s.scriptName);

  const meta = BAND_META[band];

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* 左上：轮次 + 阶段 */}
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((r) => (
            <div
              key={r}
              className={`h-1.5 w-6 rounded-full ${r <= round ? 'bg-amber-300 shadow-[0_0_8px_rgba(255,210,125,0.8)]' : 'bg-indigo-400/25'}`}
            />
          ))}
          <span className="ml-2 text-[10px] tracking-widest text-indigo-200/60">第 {round} 幕</span>
        </div>
        <div className="text-[10px] tracking-[0.35em] text-indigo-300/70">
          {phaseLabel(phase)}
          {scriptName && <span className="ml-2 text-amber-200/80">{scriptName}</span>}
        </div>
      </div>

      {/* 右上：观众 + 弹幕开关 */}
      <div className="absolute right-4 top-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-indigo-300/20 bg-[#0d1228]/70 px-3 py-1 text-xs text-indigo-100">
          <span className="text-[10px] text-indigo-300/70">观众</span>
          <span className="font-bold text-amber-200">{viewers}</span>
        </div>
        <button
          className="v2-btn pointer-events-auto px-2.5 py-1 text-[10px]"
          onClick={() => sendUiCommand({ kind: 'barrageToggle', enabled: !barrageEnabled })}
        >
          弹幕 {barrageEnabled ? '开' : '关'}
        </button>
      </div>

      {/* 左下：焦虑代理（隐藏值 → 心跳 + 文字带） */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className={`heartbeat-anim text-lg ${band === 'calm' ? 'opacity-40' : ''}`}
            style={{ color: meta.color }}
          >
            ♥
          </span>
          <span className="text-sm font-bold tracking-widest" style={{ color: meta.color }}>
            {meta.label}
          </span>
          {band === 'panic' && <span className="text-[10px] text-red-300/80">剑快握不住了…</span>}
        </div>
        <div className="h-1 w-28 overflow-hidden rounded-full bg-indigo-400/15">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${band === 'calm' ? 18 : band === 'nervous' ? 40 : band === 'shaky' ? 66 : 88}%`,
              background: meta.color,
              boxShadow: `0 0 8px ${meta.color}`,
            }}
          />
        </div>
      </div>

      {/* 底部中央：节拍提示 */}
      {beat && phase === 'PERFORM' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="rounded-full border border-indigo-300/20 bg-[#0d1228]/70 px-4 py-1.5 text-xs text-indigo-100/90">
            {beat.type === 'move' && (
              <span>
                走位目标 <span className="text-amber-200">金色光圈</span> · 剩余 {Math.ceil(beat.remaining)}s
              </span>
            )}
            {beat.type === 'attack' && <span className="text-indigo-100/90">攻击节拍 · 缩圈重合时点击</span>}
            {beat.type === 'line' && <span className="text-indigo-100/90">台词时间</span>}
            {beat.type === 'vfx' && <span className="text-indigo-100/90">仪式光效</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export function scriptName(id: string): string {
  return SCRIPT_NAMES[id] ?? id;
}
