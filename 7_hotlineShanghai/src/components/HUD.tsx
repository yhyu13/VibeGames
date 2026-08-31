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
  const grace = useUiStore((s) => s.spawnGraceRemaining);
  const warning = useUiStore((s) => s.detectionWarningRemaining);
  const objective = useUiStore((s) => s.objective);
  const exitActive = useUiStore((s) => s.exitActive);
  const lampHp = useUiStore((s) => s.lampHp);

  const spec = player.weapon ? WEAPON_TABLE[player.weapon] : undefined;
  const weaponName = spec?.nameZh ?? (player.weapon ? player.weapon : '拳头');
  const ammoText = spec?.ammo === Infinity ? '∞' : String(player.ammo);
  const roomLabel =
    room.roomCount > 0 && room.roomIndex >= 0
      ? `${room.roomName} ${room.roomIndex + 1}/${room.roomCount}`
      : '房间加载中…';

  return (
      <div className="pointer-events-none absolute inset-0 z-10 select-none">
        <div
          className="absolute left-1/2 top-12 w-[min(36rem,90vw)] -translate-x-1/2 text-center sm:top-3 sm:w-[min(36rem,70vw)]"
          style={{ textShadow: '2px 2px 0 rgba(10,9,16,0.95), 4px 4px 0 rgba(10,9,16,0.55)' }}
        >
          {/* B74:目标文案原为 m1 专属措辞(大院/东南石库门),m2 原样显示 —— 改为关卡中性表述 */}
          <div className="text-sm text-shanghai-ivory sm:text-lg">{objective === 'break_lamp' ? (lampHp === 1 ? '再击一次电源油灯 · 哨塔即将断电' : '潜入：摧毁电源油灯，关闭哨塔') : objective === 'kill_enemy' ? '哨塔断电：清除所有守卫' : objective === 'escape' ? '已清场：从撤离点离开' : '任务完成'}</div>
          <div className="mt-1 text-xs text-shanghai-paper/90 sm:text-sm">油灯 {'▮'.repeat(Math.max(0, lampHp))}{'▯'.repeat(Math.max(0, 2 - lampHp))} · 守卫 {player.kills}/{enemies.total}</div>
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
        WASD 慢走 · Shift+WASD 冲刺 · 鼠标瞄准 · LMB 射击 · RMB 挥刀 · R 掷枪 · E 拾取 · F 切换
        <br />
         {exitActive ? '出口已开启 · 走到绿色门标记' : '油灯需命中两次 · 灯灭敌人半盲可近身'}
      </div>
    </div>
  );
}
