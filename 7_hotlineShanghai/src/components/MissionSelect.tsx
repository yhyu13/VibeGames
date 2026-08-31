// src/components/MissionSelect.tsx — 任务选择(GamePhase.MISSION_SELECT)
import * as React from 'react';
import { HIDDEN_TASK_REQUIRED_S } from '../core/constants';
import type { MissionId, PersistedStats } from '../core/types';
import { MISSIONS } from '../core/data/missions';
import { sendUiCommand, useUiStore } from '../store';

// Phase 0 / 修 5: 同步任务名到 core/data/missions.ts 的权威数据
// 之前 UI 层硬编码 修械所/茶馆/印书局,数据层是 电车公司/夜航船/墨水账,文字不一致
const MISSION_DESC: Record<MissionId, { nameEn: string; desc: string; hidden: boolean }> = {
  m1_workshop: {
    nameEn: 'THE COMPOUND',
    desc: '只此一院。石库门哨塔大院:拆灯断电,清场撤离。',
    hidden: false,
  },
  m2_teahouse: {
    nameEn: 'THE TEAHOUSE',
    desc: '春申茶馆。线人的情报交换点:后门潜入,拆灯清场。',
    hidden: false,
  },
  m3_print: {
    nameEn: 'THE INK LEDGER',
    desc: '法租界的印书局与诊所。保住最后那台印刷机。',
    hidden: false,
  },
  m4_postman: {
    nameEn: 'THE POSTMAN',
    desc: '黄浦江渡船 → 租界路卡 → 四行仓库残垣 → 屋顶。???',
    hidden: true,
  },
};

interface MissionCardMeta {
  id: MissionId;
  nameZh: string;
  nameEn: string;
  desc: string;
  hidden: boolean;
}

const MISSION_CARDS: MissionCardMeta[] = MISSIONS.map((m) => ({
  id: m.id as MissionId,
  nameZh: m.nameZh,
  ...MISSION_DESC[m.id as MissionId],
}));

// 解锁规则:m1 恒可用;m2/m3 需完成前一任务(解锁表含前一 id);m4 隐藏任务需 3 个 S 级评分(§4.4.5)
function isUnlocked(
  id: MissionId,
  unlocks: { missions: MissionId[] },
  stats: PersistedStats | null,
): boolean {
  if (unlocks.missions.includes(id)) return true;
  if (id === 'm4_postman') {
    const sRanks = Object.values(stats?.bestRatingByMission ?? {}).filter((r) => r === 'S').length;
    return sRanks >= HIDDEN_TASK_REQUIRED_S;
  }
  const idx = MISSION_CARDS.findIndex((c) => c.id === id);
  if (idx <= 0) return true;
  return unlocks.missions.includes(MISSION_CARDS[idx - 1].id);
}

export function MissionSelect(): React.JSX.Element {
  const unlocks = useUiStore((s) => s.unlocks);
  const stats = useUiStore((s) => s.stats);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-shanghai-ink/80">
      <div className="text-shadow-pixel text-5xl tracking-[0.2em] text-shanghai-ivory">选择任务</div>
      <div className="mt-2 text-base text-shanghai-steel">MISSION SELECT · 选任务后择面具开打</div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {MISSION_CARDS.map((card) => {
          const locked = !isUnlocked(card.id, unlocks, stats);
          const bestScore = stats?.bestScoreByMission[card.id];
          const bestRating = stats?.bestRatingByMission[card.id];
          return (
            <button
              key={card.id}
              type="button"
              disabled={locked}
              onClick={() => sendUiCommand({ kind: 'selectMission', missionId: card.id })}
              className={`clip-corner pointer-events-auto border-2 px-6 py-4 text-left transition-colors ${
                locked
                  ? 'cursor-not-allowed border-shanghai-steel bg-shanghai-ink/40 opacity-60'
                  : 'cursor-pointer border-shanghai-jade bg-shanghai-ink/60 hover:bg-shanghai-jade/20'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-3xl text-shanghai-ivory">{card.nameZh}</span>
                <span className="text-sm tracking-widest text-shanghai-jade">{card.nameEn}</span>
              </div>
              {card.hidden && (
                <div className="mt-1 text-xs tracking-[0.3em] text-shanghai-rust">隐藏任务 HIDDEN</div>
              )}
              <div className="mt-2 text-sm leading-5 text-shanghai-paper">{card.desc}</div>
              <div className="mt-3 text-xs text-shanghai-steel">
                {locked
                  ? card.id === 'm4_postman'
                    ? `完成 ${HIDDEN_TASK_REQUIRED_S} 个 S 级评分后解锁`
                    : '未解锁 · 完成前一任务后开启'
                  : `BEST ${bestScore ?? '--'} · ${bestRating ?? '-'}`}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 text-sm text-shanghai-steel">Esc 返回标题</div>
    </div>
  );
}
