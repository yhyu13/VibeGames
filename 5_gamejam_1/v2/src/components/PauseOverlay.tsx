import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';

export default function PauseOverlay({ prevScreen }: { prevScreen: 'title' | 'intro' | 'pause' | 'ending' }) {
  const barrageEnabled = useUiStore((s) => s.barrageEnabled);
  const density = useUiStore((s) => s.barrageDensity);
  const soundEnabled = useUiStore((s) => s.soundEnabled);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0b1024]/70 backdrop-blur-sm">
      <div className="fade-in-up v2-panel flex w-72 flex-col gap-3 rounded-xl p-6">
        <h2 className="font-serif-cn mb-1 text-center text-xl font-bold text-amber-100">暂停</h2>
        <button className="v2-btn-gold" onClick={() => sendUiCommand({ kind: 'pauseToggle' })}>
          继续演出
        </button>
        <button
          className="v2-btn"
          onClick={() => {
            sendUiCommand({ kind: 'pauseToggle' });
            sendUiCommand({ kind: 'restartRun' });
          }}
        >
          重新开始
        </button>
        <button className="v2-btn" onClick={() => sendUiCommand({ kind: 'quitToTitle' })}>
          返回标题
        </button>
        <div className="mt-2 flex flex-col gap-2 border-t border-indigo-400/10 pt-3 text-xs text-indigo-200/80">
          <label className="flex items-center justify-between">
            弹幕
            <input
              type="checkbox"
              checked={barrageEnabled}
              onChange={(e) => sendUiCommand({ kind: 'barrageToggle', enabled: e.target.checked })}
            />
          </label>
          <label className="flex items-center justify-between">
            稀疏模式
            <input
              type="checkbox"
              checked={density === 'sparse'}
              onChange={(e) => sendUiCommand({ kind: 'barrageDensity', density: e.target.checked ? 'sparse' : 'standard' })}
            />
          </label>
          <label className="flex items-center justify-between">
            音效
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => sendUiCommand({ kind: 'soundToggle', enabled: e.target.checked })}
            />
          </label>
        </div>
        <div className="text-center text-[10px] text-indigo-400/50">Esc 继续 · 来源：{prevScreen}</div>
      </div>
    </div>
  );
}
