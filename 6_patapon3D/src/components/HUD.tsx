/**
 * components/HUD.tsx — v2.0 战斗 HUD(SONG 阶段)
 *
 * 左上:3 单位军队 HP(角色配色点 + 血条,defeat 灰化);
 * 右上:boss Moloch HP 条(enrage 金框)+ 预告攻击(telegraph);
 * 底部:4 拍命令槽(commandBeats)+ combo / fever;
 * 中央:判定飘字(judgementFeed,key 变化重触发动画)。
 */

import { usePatapongStore } from '../store';
import { getCharacterById } from '../core/data/patapons';
import type { Judgement, NoteType } from '../core/types';

const DRUM_LETTER: Record<NoteType, string> = {
  PATA: 'P',
  PON: 'O',
  DON: 'D',
  CHAKA: 'C',
};

const JUDGE_STYLE: Record<Judgement, { text: string; className: string }> = {
  300: { text: 'PERFECT', className: 'text-[#ffd83a] [text-shadow:0_0_18px_#ffd83a]' },
  100: { text: 'GOOD', className: 'text-[#3affc8] [text-shadow:0_0_14px_#3affc8]' },
  50: { text: 'NORMAL', className: 'text-white/80 [text-shadow:0_0_10px_rgba(255,255,255,0.6)]' },
  0: { text: 'MISS', className: 'text-[#ff3a3a] [text-shadow:0_0_14px_#ff3a3a]' },
};

export function HUD() {
  const phase = usePatapongStore((s) => s.phase);
  const army = usePatapongStore((s) => s.army);
  const boss = usePatapongStore((s) => s.boss);
  const rhythm = usePatapongStore((s) => s.rhythm);
  const fever = usePatapongStore((s) => s.fever);
  const feed = usePatapongStore((s) => s.judgementFeed);

  if (phase !== 'SONG') return null;

  const judge = feed ? JUDGE_STYLE[feed.judgement] : null;

  return (
    <div className="pointer-events-none absolute inset-0 font-mono">
      {/* 军队 HP(左上) */}
      <div className="absolute left-6 top-5 flex flex-col gap-1.5">
        <div className="text-[10px] tracking-[0.3em] text-[#3affc8]/70">ARMY</div>
        {army.units.map((u) => {
          const ch = getCharacterById(u.characterId);
          const pct = Math.max(0, Math.min(1, u.hp / u.maxHp));
          return (
            <div
              key={u.id}
              className={`flex items-center gap-2 ${u.state === 'defeat' ? 'opacity-30' : ''}`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ch.bodyColor, boxShadow: `0 0 6px ${ch.bodyColor}` }}
              />
              <div className="h-2 w-24 overflow-hidden rounded bg-white/10">
                <div
                  className="h-full rounded transition-all duration-150"
                  style={{ width: `${pct * 100}%`, backgroundColor: ch.bodyColor }}
                />
              </div>
              <span className="text-[10px] text-white/50">
                {u.hp % 1 === 0 ? u.hp : u.hp.toFixed(1)}/{u.maxHp}
              </span>
            </div>
          );
        })}
      </div>

      {/* boss HP + telegraph(右上) */}
      <div className="absolute right-6 top-5 flex w-64 flex-col items-end gap-1.5">
        <div className="text-[10px] tracking-[0.3em] text-[#ff3a3a]/80">
          MOLOCH {boss.enraged ? '· ENRAGED' : ''}
        </div>
        <div
          className={`h-3 w-full overflow-hidden rounded bg-white/10 ${
            boss.enraged ? 'ring-2 ring-[#ffd83a]' : ''
          }`}
        >
          <div
            className="h-full rounded bg-[#ff3a3a] transition-all duration-150 [box-shadow:0_0_12px_#ff3a3a]"
            style={{ width: `${Math.max(0, Math.min(1, boss.hp / boss.maxHp)) * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-white/50">
          {boss.hp % 1 === 0 ? boss.hp : boss.hp.toFixed(1)}/{boss.maxHp}
        </div>
        {boss.telegraph && (
          <div className="mt-1 animate-pulse rounded border border-[#ffd83a]/60 bg-black/50 px-3 py-1 text-xs font-bold tracking-[0.2em] text-[#ffd83a]">
            ⚠ {boss.telegraph} INCOMING
          </div>
        )}
      </div>

      {/* 判定飘字(中央) */}
      {judge && (
        <div
          key={feed!.id}
          className={`score-pop absolute left-1/2 top-1/3 -translate-x-1/2 text-4xl font-black italic ${judge.className}`}
        >
          {judge.text}
        </div>
      )}

      {/* 命令槽 + combo(底部) */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => {
            const note = rhythm.commandBeats[i];
            return (
              <span
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded border-2 text-sm font-bold ${
                  note
                    ? 'border-[#ffd83a] bg-[#ffd83a]/15 text-[#ffd83a] [text-shadow:0_0_10px_#ffd83a]'
                    : 'border-white/20 bg-black/40 text-white/25'
                }`}
              >
                {note ? DRUM_LETTER[note] : '_'}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-sm tracking-[0.25em]">
          <span className={fever.active ? 'font-bold text-[#ffd83a] [text-shadow:0_0_12px_#ffd83a]' : 'text-white/70'}>
            {fever.active ? `FEVER ×${rhythm.combo}` : `COMBO ×${rhythm.combo}`}
          </span>
          {army.lastCommand && (
            <span className="text-[#3affc8]/80">LAST: {army.lastCommand}</span>
          )}
        </div>
      </div>
    </div>
  );
}
