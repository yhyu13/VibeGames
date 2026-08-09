// src/core/simulation/Simulation.ts — 最小 stub(2026-08-09 重置)
// 关卡内容 / 场景渲染 / 玩家移动已移除并归档至 `_archive-2026-08-09/`。
// 当前只提供空快照:无任务、无房间、无玩家移动;phase 恒为 TITLE,由 UI store 驱动。
// 重建时按 ISimulation 契约实现(TDD §4.2 / §5.1)。
import { GamePhase as GP } from '../types';
import type { GamePhase, ISimulation, PlayerInput, SimEvent, SimSnapshot } from '../types';
import { RC_LIGHT_TABLE } from '../data/lights';

const PLAYER_EMPTY: SimSnapshot['player'] = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  facingAngle: 0,
  hp: 1,
  ammo: 0,
  reloading: 0,
  weapon: null,
  mode: 'melee',
  modeSwitchTimer: 0,
  activeMask: null,
  dodgeTimer: 0,
  dodgeCooldown: 0,
  dashTimer: 0,
  dashCooldown: 0,
  kills: 0,
  hitsTaken: 0,
};

const EMPTY_SNAPSHOT: SimSnapshot = {
  phase: GP.TITLE,
  paused: false,
  player: PLAYER_EMPTY,
  enemies: [],
  bullets: [],
  melee: [],
  grenades: [],
  thrownWeapons: [],
  activeLights: [],
  currentRoom: null,
  currentMission: null,
  missionScore: null,
  lights: RC_LIGHT_TABLE,
};

export class Simulation implements ISimulation {
  readonly phase: GamePhase = GP.TITLE;
  readonly events: SimEvent[] = [];

  step(_dt: number): void {
    // 重置期无模拟:不推进任何状态。
  }

  input(_action: PlayerInput): void {
    // 重置期无输入处理。
  }

  snapshot(): SimSnapshot {
    return EMPTY_SNAPSHOT;
  }
}
