// src/components/MaskSelect.tsx — 面具选择(GamePhase.MASK_SELECT)
// D4 决策落地:mask 选择 = 任务 intro(HM 范式,简报并入选择屏)。
// 双入口复用同一 UI:
//   - 任务 intro(MISSION_SELECT → MASK_SELECT):顶部显示任务名 + 一行简报,
//     点面具 / Enter / Tab → 直接开打(MISSION_PLAY);
//   - 奖励流(SCORE → MASK_SELECT):选面具 → 回 MISSION_SELECT(原有语义)。
// 角色立绘区:05 §2 玩家 sprite(idle)放大版,选中面具时蒙面替换为面具主题色(§4)。
// 2026-08-09 重置:引擎 sprites 已移除,画布预览待重建,当前用面具主题色占位。
import * as React from 'react';
import { useEffect } from 'react';
import { MASK_TABLE } from '../core/data/masks';
import type { MaskId } from '../core/types';
import { sendUiCommand, useUiStore } from '../store';

const MASK_IDS: MaskId[] = ['red_face', 'black_face', 'white_face', 'blue_face', 'green_face', 'gold_face'];

/** 玩家立绘(05 §2 idle 帧放大版;activeMask 变化时重绘,蒙面换主题色) */
function CharacterPortrait(): React.JSX.Element {
  const activeMask = useUiStore((s) => s.activeMask);
  const themeColor = activeMask ? MASK_TABLE[activeMask]?.themeColor : undefined;
  return (
    <div
      className="flex h-48 w-48 flex-col items-center justify-center gap-2 border-2 bg-shanghai-ink/60 text-center text-sm text-shanghai-paper"
      style={{ borderColor: themeColor ?? 'rgba(245,230,184,0.3)' }}
      aria-label="玩家立绘"
    >
      <span
        className="block h-6 w-6 border border-shanghai-paper/50"
        style={{ backgroundColor: themeColor ?? '#4a4a52' }}
      />
      <span>立绘待重建</span>
    </div>
  );
}

export function MaskSelect(): React.JSX.Element {
  const unlocks = useUiStore((s) => s.unlocks);
  const activeMask = useUiStore((s) => s.activeMask);
  const missionName = useUiStore((s) => s.mission.nameZh);
  const brief = useUiStore((s) => s.mission.brief);
  // M0 解锁表为空 = 全部可选;M1 起解锁表由引擎持久化填充后按表锁定
  const allOpen = unlocks.masks.length === 0;

  // Enter = 用当前选中面具(未选 = 不戴面具)直接开打;Tab 由引擎 pause 输入处理(intro 入口)
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendUiCommand({ kind: 'selectMask', maskId: activeMask });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMask]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-shanghai-ink/80 px-6">
      <div className="text-shadow-pixel text-5xl tracking-[0.2em] text-shanghai-ivory">选择脸谱</div>
      <div className="mt-2 text-base text-shanghai-steel">FACE SELECT · 脸谱是你在夜色里的第二张脸</div>
      {/* D4:任务 intro —— 任务名 + 一行简报并入选择屏顶部 */}
      <div className="clip-corner mt-5 w-[44rem] max-w-full border-2 border-shanghai-paper/40 bg-shanghai-ink/90 px-6 py-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-2xl tracking-widest text-shanghai-lantern">{missionName || '任务准备中'}</span>
          <span className="text-xs tracking-[0.25em] text-shanghai-steel">MISSION INTRO</span>
        </div>
        <p className="mt-1 text-sm leading-5 text-shanghai-paper">{brief || '任务简报加载中…(M1 后由引擎下发)'}</p>
      </div>
      {/* 立绘区 + 面具网格 */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
        <CharacterPortrait />
        <div className="grid grid-cols-3 gap-3">
          {MASK_IDS.map((id) => {
            const spec = MASK_TABLE[id];
            const locked = !allOpen && !unlocks.masks.includes(id);
            const selected = activeMask === id;
            return (
              <button
                key={id}
                type="button"
                disabled={locked}
                onClick={() => sendUiCommand({ kind: 'selectMask', maskId: id })}
                className={`clip-corner pointer-events-auto border-2 px-4 py-3 text-left transition-colors ${
                  locked
                    ? 'cursor-not-allowed border-shanghai-steel bg-shanghai-ink/40 opacity-50'
                    : `cursor-pointer ${
                        selected
                          ? 'border-shanghai-muzzle bg-shanghai-lantern/20'
                          : 'border-shanghai-jade bg-shanghai-ink/60 hover:bg-shanghai-jade/20'
                      }`
                }`}
              >
                <div className="text-2xl text-shanghai-ivory">{spec?.nameZh ?? id}</div>
                <div className="mt-1 text-xs tracking-widest text-shanghai-jade">{spec?.nameEn ?? ''}</div>
                <div className="mt-2 text-xs leading-4 text-shanghai-paper">
                  {spec?.description ?? '(M1 后由引擎下发)'}
                </div>
                {locked && <div className="mt-2 text-sm text-shanghai-rust">未解锁 LOCKED</div>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex items-baseline gap-6 text-base">
        <button
          type="button"
          className="pointer-events-auto cursor-pointer border-b border-shanghai-lantern text-shanghai-lantern transition-colors hover:text-shanghai-muzzle"
          onClick={() => sendUiCommand({ kind: 'selectMask', maskId: null })}
        >
          不勾脸谱 →
        </button>
        <span className="text-shanghai-steel">Enter / Tab 开打 · Esc 返回标题</span>
      </div>
    </div>
  );
}
