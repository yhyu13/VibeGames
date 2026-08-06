import { useCallback, useEffect, useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';

// 05 §1.3 / 02 §9：暂停遮罩 —— 恢复 / 重演这一幕（R 需确认条）/ 提前谢幕
// Esc 键归属本组件（App 的全局 Esc 仅在非暂停时开启暂停，避免双重触发）

export default function PauseOverlay({
  prevScreen,
}: {
  prevScreen: 'title' | 'intro' | 'pause' | 'ending';
}) {
  const [confirming, setConfirming] = useState(false);

  const resume = useCallback(() => {
    useUiStore.getState().setMenu(prevScreen);
    sendUiCommand({ kind: 'pauseToggle' });
  }, [prevScreen]);

  const restart = useCallback(() => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    useUiStore.getState().setMenu('title');
    sendUiCommand({ kind: 'pauseToggle' });
  }, [confirming]);

  const quitToTitle = useCallback(() => {
    useUiStore.getState().setMenu('title');
    sendUiCommand({ kind: 'pauseToggle' });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (confirming) setConfirming(false);
        else resume();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (confirming) restart();
        else resume();
      } else if (e.key === 'r' || e.key === 'R') {
        restart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirming, resume, restart]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div className="blackout-fade w-[360px] rounded-lg border border-cold bg-abyss/95 p-6 text-center shadow-2xl">
        <h2 className="mb-5 text-2xl font-semibold tracking-widest text-paper">中场休息</h2>
        {confirming ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-paper/70">确定要重新开始吗？本轮进度将丢失</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={restart}
                className="rounded border border-blood/60 bg-blood/15 px-4 py-1.5 text-blood hover:bg-blood/25"
              >
                确认重来
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded border border-paper/30 px-4 py-1.5 text-paper/70 hover:border-paper/60"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={resume}
              className="rounded border border-candle/60 bg-candle/15 py-2 font-semibold text-candle hover:bg-candle/25"
            >
              回到舞台
            </button>
            <button
              onClick={restart}
              className="rounded border border-paper/30 py-2 text-paper/80 hover:border-paper/60"
            >
              重演这一幕
            </button>
            <button
              onClick={quitToTitle}
              className="rounded border border-paper/30 py-2 text-paper/80 hover:border-paper/60"
            >
              提前谢幕
            </button>
            <p className="mt-2 text-xs text-paper/40">Esc 恢复 · R 重开 · M 静音</p>
          </div>
        )}
      </div>
    </div>
  );
}
