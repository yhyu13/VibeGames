// src/components/HUD.tsx — 战斗 HUD(HP / 弹药 / 当前武器+模式 / 任务进度;GamePhase.MISSION_PLAY/DEATH/END)
import * as React from 'react';
import { PLAYER_RELOAD_DURATION } from '../core/constants';
import { WEAPON_TABLE } from '../core/data/weapons';
import type { WeaponMode } from '../core/types';
import { useUiStore } from '../store';

const MODE_LABEL: Record<WeaponMode, string> = {
  melee: '近战 MELEE',
  ranged: '远程 RANGED',
  throwing: '投掷 THROW',
};

export function HUD(): React.JSX.Element {
  const player = useUiStore((s) => s.player);
  const enemies = useUiStore((s) => s.enemies);
  const mission = useUiStore((s) => s.mission);
  const room = useUiStore((s) => s.room);
  const lampsDestroyed = useUiStore((s) => s.lampsDestroyed);
  const grace = useUiStore((s) => s.spawnGraceRemaining);
  const warning = useUiStore((s) => s.detectionWarningRemaining);

  const spec = player.weapon ? WEAPON_TABLE[player.weapon] : undefined;
  const weaponName = spec?.nameZh ?? (player.weapon ? player.weapon : '拳头');
  const ammoText = spec?.ammo === Infinity ? '∞' : String(player.ammo);
  const roomLabel =
    room.roomCount > 0 && room.roomIndex >= 0
      ? `${room.roomName} ${room.roomIndex + 1}/${room.roomCount}`
      : '房间加载中…';

  return (
      <div className="pointer-events-none absolute inset-0 z-10 select-none">
        <div className="absolute left-1/2 top-12 w-[min(32rem,88vw)] -translate-x-1/2 border border-shanghai-lantern/60 bg-shanghai-ink/75 px-3 py-2 text-center text-shanghai-paper sm:top-3 sm:w-[min(32rem,70vw)] sm:px-4">
          <div className="text-sm text-shanghai-ivory sm:text-lg">拆掉油灯，在暗处了结巡逻兵</div>
          <div className="mt-1 text-xs sm:text-sm">油灯 {lampsDestroyed}/1 · 巡逻兵 {player.kills}/1</div>
       </div>
       {grace > 0 && <div className="absolute left-1/2 top-28 -translate-x-1/2 text-xs text-shanghai-jade sm:top-20 sm:text-base">观察手电路线… {grace.toFixed(1)}s</div>}
       {warning > 0 && <div className="absolute inset-3 animate-pulse border-4 border-shanghai-blood"><div className="mt-24 text-center text-4xl text-shanghai-blood">被发现！{warning.toFixed(1)}s</div></div>}
      {/* 左上:击杀(B05:一击必杀,不显示 HP,对齐 art direction) */}
      <div className="text-shadow-pixel absolute left-3 top-3 text-base text-shanghai-ivory sm:left-4 sm:top-4 sm:text-xl">
        <span className="text-shanghai-muzzle">击杀</span> <span className="text-shanghai-paper">{player.kills}</span>
      </div>
      {/* 右上:任务 + 房间进度 + 敌情 */}
      <div className="text-shadow-pixel absolute right-3 top-3 text-right text-sm text-shanghai-ivory sm:right-4 sm:top-4 sm:text-xl">
        <div>{mission.nameZh || '任务加载中…'}</div>
        <div className="mt-1 hidden text-base text-shanghai-paper sm:block">{roomLabel}</div>
        <div
          className={`mt-1 text-xs sm:text-base ${
            enemies.alive > 0 ? 'text-shanghai-lantern' : 'text-shanghai-jade'
          }`}
        >
          敌 ×{enemies.alive}
          {enemies.boss ? ' · BOSS' : ''}
        </div>
      </div>
      {/* 左下:当前武器 + 模式 + 弹药 + 换弹进度 */}
      <div className="text-shadow-pixel absolute bottom-3 left-3 text-base text-shanghai-ivory sm:bottom-4 sm:left-4 sm:text-xl">
        <div className="flex items-baseline gap-3">
          <span className="text-shanghai-muzzle">{weaponName}</span>
          <span className="text-base text-shanghai-paper">{MODE_LABEL[player.mode]}</span>
          <span className="text-shanghai-flash">{ammoText}</span>
        </div>
        {player.reloading > 0 && (
          <div className="mt-2 h-2 w-40 border border-shanghai-paper/50">
            <div
              className="h-full bg-shanghai-lantern"
              style={{
                width: `${Math.min(100, (player.reloading / PLAYER_RELOAD_DURATION) * 100)}%`,
              }}
            />
          </div>
        )}
      </div>
      {/* 右下:操作提示 */}
      <div className="absolute bottom-3 right-3 max-w-[58vw] text-right text-[10px] leading-4 text-shanghai-steel sm:bottom-4 sm:right-4 sm:max-w-none sm:text-sm sm:leading-5">
        WASD 移动 · 鼠标瞄准 · LMB 挥刀/拆灯
        <br />
        油灯需命中两次 · 光下巡逻兵会格挡
      </div>
    </div>
  );
}
