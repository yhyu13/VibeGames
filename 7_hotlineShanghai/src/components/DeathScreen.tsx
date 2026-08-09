// src/components/DeathScreen.tsx — 死亡画面(GamePhase.MISSION_DEATH;重生延迟 §4.4.5)
// 06 §7 P4:按 store.deathCause(playerKilled 事件写入)渲染死亡原因文案。
import * as React from 'react';
import { useEffect } from 'react';
import { DEATH_RESPAWN_DELAY } from '../core/constants';
import type { DeathCause } from '../core/types';
import { sendUiCommand, useUiStore } from '../store';

/** 死亡原因 → 中文文案(06 §7 P4 冻结文案) */
const CAUSE_COPY: Record<DeathCause, string> = {
  bullet: '你被占领军的子弹击中',
  melee: '你被特务的刀放倒',
  grenade: '你被手雷炸死了',
  unknown: '你在黑暗中倒下了',
};

export function DeathScreen(): React.JSX.Element {
  const deathCause = useUiStore((s) => s.deathCause);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendUiCommand({ kind: 'retryMission' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const causeText = CAUSE_COPY[deathCause ?? 'unknown'];

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-shanghai-ink/75">
      <div className="text-shadow-pixel animate-flicker text-8xl tracking-[0.2em] text-shanghai-blood">
        YOU DIED
      </div>
      <div className="mt-3 text-3xl tracking-[0.4em] text-shanghai-lantern">你死了</div>
      <div className="mt-6 text-2xl text-shanghai-blood">{causeText}</div>
      <div className="mt-8 text-xl text-shanghai-paper">
        电话线断了。{DEATH_RESPAWN_DELAY}s 后从任务第一个房间重新开始。
      </div>
      <div className="mt-10 flex gap-6 text-2xl">
        <button
          type="button"
          className="pointer-events-auto cursor-pointer border-2 border-shanghai-lantern px-8 py-1 text-shanghai-ivory transition-colors hover:bg-shanghai-lantern hover:text-shanghai-ink"
          onClick={() => sendUiCommand({ kind: 'retryMission' })}
        >
          重新开始
        </button>
        <button
          type="button"
          className="pointer-events-auto cursor-pointer border-b border-shanghai-paper/50 text-shanghai-paper transition-colors hover:text-shanghai-ivory"
          onClick={() => sendUiCommand({ kind: 'quitToTitle' })}
        >
          返回标题
        </button>
      </div>
    </div>
  );
}
