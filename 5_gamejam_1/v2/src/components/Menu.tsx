import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { STRETCH_FLAGS } from '../core/constants';
import type { GamePhase } from '../core/types';

export default function Menu() {
  const stats = useUiStore((s) => s.ending.stats) as { totalRounds?: number; bestCombo?: number; perfectTotal?: number; seenEndings?: string[] } | null;
  const barragesEnabled = useUiStore((s) => s.barrageEnabled);
  const density = useUiStore((s) => s.barrageDensity);
  const soundEnabled = useUiStore((s) => s.soundEnabled);

  const start = (): void => sendUiCommand({ kind: 'startRun' });

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-[#0b1024]/70 via-[#0b1024]/85 to-[#0b1024]">
      <div className="fade-in-up flex flex-col items-center">
        <div className="mb-2 text-xs tracking-[0.6em] text-amber-200/60">V2 · 终场直播</div>
        <h1 className="title-glow font-serif-cn mb-3 text-6xl font-black tracking-[0.18em] text-amber-100">
          Boss 的焦虑
        </h1>
        <p className="font-serif-cn mb-8 max-w-md text-center text-sm leading-relaxed text-indigo-200/80">
          你是终场 Boss。空无一人的剧场突然开播——
          <br />
          观众不露脸，只用弹幕审判你的每一次走位、挥剑与忘词。
        </p>

        <div className="mb-8 flex flex-col items-center gap-3">
          <button className="v2-btn-gold px-10 py-3 text-base font-bold tracking-[0.3em]" onClick={start}>
            开始直播
          </button>
          <div className="text-xs text-indigo-300/60">或按 Enter / 空格</div>
        </div>

        {stats && (stats.totalRounds ?? 0) > 0 && (
          <div className="v2-panel mb-8 rounded-lg px-6 py-3 text-center text-xs text-indigo-200/80">
            生涯：<span className="text-amber-200">{stats.totalRounds}</span> 场直播 · 最佳连击
            <span className="text-amber-200"> ×{stats.bestCombo}</span> · 完美
            <span className="text-amber-200"> {stats.perfectTotal}</span> 次
            {stats.seenEndings && stats.seenEndings.length > 0 && (
              <span>
                {' '}· 见证结局 {stats.seenEndings.length} 种
              </span>
            )}
          </div>
        )}

        <div className="v2-panel flex flex-col gap-2 rounded-lg px-6 py-4 text-xs text-indigo-200/80">
          <div className="mb-1 font-bold tracking-widest text-indigo-100">操作</div>
          <div><span className="text-amber-200">WASD</span> 走位（屏幕相对） · <span className="text-amber-200">鼠标</span> 瞄准缩圈目标</div>
          <div><span className="text-amber-200">左键</span> 在 approach 圈缩到判定圈时点击 · 前摇窗口内按左键可闪避替身</div>
          <div><span className="text-amber-200">1 / 2 / 3</span> 选剧本 · <span className="text-amber-200">Enter / 空格</span> 推进对白 · <span className="text-amber-200">Esc</span> 暂停</div>
          <div className="mt-1 flex items-center gap-3 border-t border-indigo-400/10 pt-2">
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={barragesEnabled}
                onChange={(e) => sendUiCommand({ kind: 'barrageToggle', enabled: e.target.checked })}
              />
              弹幕
            </label>
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={density === 'sparse'}
                onChange={(e) => sendUiCommand({ kind: 'barrageDensity', density: e.target.checked ? 'sparse' : 'standard' })}
              />
              稀疏模式
            </label>
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => sendUiCommand({ kind: 'soundToggle', enabled: e.target.checked })}
              />
              音效
            </label>
          </div>
          {STRETCH_FLAGS.playerTyping && (
            <div className="text-indigo-400/60">日记支持手打（V2 新特性）</div>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 text-[10px] tracking-widest text-indigo-400/40">
        焦虑隐藏值 0–100 · 看镜头、听音色、读弹幕
      </div>
    </div>
  );
}

export function phaseLabel(p: GamePhase): string {
  switch (p) {
    case 'WAIT': return '候场';
    case 'SENSE': return '观众连接中';
    case 'PERFORM': return '演出中';
    case 'EVALUATE': return '自评';
    case 'DIARY': return '日记';
    default: return p;
  }
}
