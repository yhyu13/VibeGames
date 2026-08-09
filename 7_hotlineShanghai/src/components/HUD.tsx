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

  const spec = player.weapon ? WEAPON_TABLE[player.weapon] : undefined;
  const weaponName = spec?.nameZh ?? (player.weapon ? player.weapon : '拳头');
  const ammoText = spec?.ammo === Infinity ? '∞' : String(player.ammo);
  const roomLabel =
    room.roomCount > 0 && room.roomIndex >= 0
      ? `${room.roomName} ${room.roomIndex + 1}/${room.roomCount}`
      : '房间加载中…';

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {/* 左上:击杀(B05:一击必杀,不显示 HP,对齐 art direction) */}
      <div className="text-shadow-pixel absolute left-4 top-4 text-xl text-shanghai-ivory">
        <span className="text-shanghai-muzzle">击杀</span> <span className="text-shanghai-paper">{player.kills}</span>
      </div>
      {/* 右上:任务 + 房间进度 + 敌情 */}
      <div className="text-shadow-pixel absolute right-4 top-4 text-right text-xl text-shanghai-ivory">
        <div>{mission.nameZh || '任务加载中…'}</div>
        <div className="mt-1 text-base text-shanghai-paper">{roomLabel}</div>
        <div
          className={`mt-1 text-base ${
            enemies.alive > 0 ? 'text-shanghai-lantern' : 'text-shanghai-jade'
          }`}
        >
          敌 ×{enemies.alive}
          {enemies.boss ? ' · BOSS' : ''}
        </div>
      </div>
      {/* 左下:当前武器 + 模式 + 弹药 + 换弹进度 */}
      <div className="text-shadow-pixel absolute bottom-4 left-4 text-xl text-shanghai-ivory">
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
      <div className="absolute bottom-4 right-4 text-right text-sm leading-5 text-shanghai-steel">
        F 切换 · E 拾取/投掷
        <br />
        Shift 冲刺 · Space 翻滚
        <br />
        R 换弹
      </div>
      {/* B03:清房后提示走向门口 */}
      {enemies.alive === 0 && room.roomId !== null && (
        <div className="animate-flicker absolute bottom-24 left-1/2 -translate-x-1/2 text-2xl tracking-[0.3em] text-shanghai-muzzle">
          前往门口 →
        </div>
      )}
    </div>
  );
}
