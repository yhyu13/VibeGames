import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';

export default function Dialogue({ choice }: { choice: boolean }) {
  const active = useUiStore((s) => s.dialogue.active);
  const queueLen = useUiStore((s) => s.dialogue.queue.length);
  if (!active) return null;

  const isSystem = active.speaker === 'system';
  const next = (): void => sendUiCommand({ kind: 'dialogueNext' });

  return (
    <div className="absolute inset-x-0 bottom-16 z-30 flex justify-center px-6">
      <div className="dialogue-box v2-panel max-w-2xl flex-1 rounded-xl px-6 py-4">
        <div className="mb-1 flex items-center justify-between">
          <span className={`text-xs font-bold tracking-widest ${isSystem ? 'text-indigo-300' : 'text-amber-200'}`}>
            {isSystem ? '系统' : 'Boss'}
          </span>
          {queueLen > 0 && <span className="text-[10px] text-indigo-300/60">还有 {queueLen} 句</span>}
        </div>
        <div className="font-serif-cn min-h-[2.4rem] text-base leading-relaxed text-indigo-50">{active.text}</div>
        {choice ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="v2-btn" onClick={() => sendUiCommand({ kind: 'dialogueChoice', choice: 'A' })}>A · 继续谢幕</button>
            <button className="v2-btn-danger" onClick={() => sendUiCommand({ kind: 'dialogueChoice', choice: 'B' })}>B · 毁掉这场演出</button>
            <button className="v2-btn" onClick={() => sendUiCommand({ kind: 'dialogueChoice', choice: 'C' })}>C · 假装什么都没发生</button>
          </div>
        ) : (
          <button className="mt-2 text-[10px] tracking-widest text-indigo-300/50" onClick={next}>
            点击 / Enter 跳过 ▸
          </button>
        )}
      </div>
    </div>
  );
}
