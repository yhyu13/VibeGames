// src/store.ts — zustand UI 状态(仅 UI 层可写;模拟权威状态在 core/simulation,由引擎经 sync 同步进来)
import { create } from 'zustand';
import type {
  DeathCause,
  GamePhase,
  MaskId,
  MissionId,
  MissionScore,
  PersistedSettings,
  PersistedStats,
  Player,
  SimSnapshot,
  Vec2,
  WeaponId,
  WeaponMode,
} from './core/types';
import { GamePhase as GP } from './core/types';
import {
  RC_CASCADE_COUNT,
  RC_JFA_RESOLUTION_SCALE,
  RC_MIX_FACTOR,
  RC_PROPAGATION_RATE,
} from './core/constants';

// DEV 判定:仓库暂无 vite-env.d.ts(白名单外不可新建),运行时安全读取;
// 生产构建中 import.meta.env 不存在 → undefined?.DEV → false。
export const IS_DEV: boolean =
  (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV === true;

// ─── UI → 引擎命令(事件桥;引擎侧消费契约见 TDD §3.3 / §4.2)───
export type UiCommand =
  | { kind: 'startGame' }
  | { kind: 'selectMission'; missionId: MissionId }
  | { kind: 'selectMask'; maskId: MaskId | null }
  | { kind: 'retryMission' }
  | { kind: 'continueToNext' }
  | { kind: 'quitToTitle' }
  | { kind: 'setRcConfig'; config: Partial<UiRcConfig> }
  | { kind: 'resetData' };

export const UI_COMMAND_EVENT = 'uiCommand';
const UI_COMMAND_QUEUE_CAP = 32;

let uiBridge: ((cmd: UiCommand) => void) | null = null;
const pendingUiCommands: UiCommand[] = [];

// 事件桥:派发自定义 DOM 事件 'uiCommand'(detail = cmd);引擎 ref(setUiBridge)优先消费,
// 引擎不可用时入队(上限 32,丢最旧保最新)。M1 引擎二选一消费(注册 bridge 或监听事件),勿双收。
export function sendUiCommand(cmd: UiCommand): void {
  if (uiBridge) {
    uiBridge(cmd);
  } else {
    if (pendingUiCommands.length >= UI_COMMAND_QUEUE_CAP) {
      pendingUiCommands.shift();
    }
    pendingUiCommands.push(cmd);
  }
  window.dispatchEvent(new CustomEvent<UiCommand>(UI_COMMAND_EVENT, { detail: cmd }));
}

// 引擎注册消费 ref;注册时立即冲刷积压命令(队列上限内)
export function setUiBridge(fn: ((cmd: UiCommand) => void) | null): void {
  uiBridge = fn;
  if (fn) {
    while (pendingUiCommands.length > 0) {
      const cmd = pendingUiCommands.shift();
      if (cmd) fn(cmd);
    }
  }
}

// ─── RC 调参(§4.4.6 demo 同名 uniform;DevPanel 编辑 → setRcConfig 命令 → 引擎)───
export interface UiRcConfig {
  cascadeCount: number; // 1..3
  resolutionScale: number; // 0.5 | 1.0
  ditherEnabled: boolean;
  propagationRate: number; // demo uPropagationRate(光传播衰减)
  mixFactor: number; // demo uMixFactor(scene / 上一帧光混合比)
}

export const RC_DEFAULTS: UiRcConfig = {
  cascadeCount: RC_CASCADE_COUNT,
  resolutionScale: RC_JFA_RESOLUTION_SCALE,
  ditherEnabled: true,
  propagationRate: RC_PROPAGATION_RATE,
  mixFactor: RC_MIX_FACTOR,
};

export interface UiRcState extends UiRcConfig {
  lastFrameTimeMs: number;
  lightCount: number;
  jfaPasses: number;
  degraded: boolean;
}

// ─── 解锁提示(SCORE → MASK_SELECT 时引擎下发;UI 组件只读,消费此 store 字段或监听事件)───
export interface UnlockNotice {
  missionId: MissionId;
  maskId: MaskId;
  maskNameZh: string;
}

// ─── UI 可见状态形状 ───
export interface UiPlayerState {
  position: Vec2;
  weapon: WeaponId | null; // null = 空手(拳头)
  mode: WeaponMode;
  ammo: number;
  hp: number;
  kills: number;
  hitsTaken: number;
  reloading: number;
}

export interface UiEnemiesSummary {
  total: number;
  alive: number;
  boss: boolean;
}

export interface UiMissionState {
  missionId: string | null; // Mission.id(core 契约为 string)
  nameZh: string;
  brief: string;
}

export interface UiRoomState {
  roomId: string | null;
  roomName: string;
  roomIndex: number; // 0 基
  roomCount: number;
}

export interface UiState {
  phase: GamePhase;
  setPhase: (p: GamePhase) => void;
  paused: boolean;
  setPaused: (v: boolean) => void;
  player: UiPlayerState;
  updatePlayer: (partial: Partial<UiPlayerState>) => void;
  enemies: UiEnemiesSummary;
  updateEnemies: (partial: Partial<UiEnemiesSummary>) => void;
  mission: UiMissionState;
  setMission: (partial: Partial<UiMissionState>) => void;
  room: UiRoomState;
  setRoom: (partial: Partial<UiRoomState>) => void;
  score: MissionScore | null;
  setScore: (s: MissionScore | null) => void;
  /** 最近一次死亡原因(06 §7 P4:playerKilled 事件写入;DeathScreen 渲染文案) */
  deathCause: DeathCause | null;
  setDeathCause: (c: DeathCause | null) => void;
  spawnGraceRemaining: number;
  detectionWarningRemaining: number;
  lampsDestroyed: number;
  lampHp: number;
  objective: SimSnapshot['objective'];
  exitActive: boolean;
  rcConfig: UiRcConfig;
  setRcConfig: (partial: Partial<UiRcConfig>) => void;
  rcState: UiRcState | null;
  setRcState: (s: UiRcState | null) => void;
  unlocks: { masks: MaskId[]; missions: MissionId[] };
  setUnlocks: (u: { masks: MaskId[]; missions: MissionId[] }) => void;
  unlockNotice: UnlockNotice | null;
  setUnlockNotice: (n: UnlockNotice | null) => void;
  stats: PersistedStats | null;
  setStats: (s: PersistedStats | null) => void;
  activeMask: MaskId | null;
  setActiveMask: (m: MaskId | null) => void;
  settings: PersistedSettings;
  setSettings: (s: Partial<PersistedSettings>) => void;
  showDevPanel: boolean;
  setShowDevPanel: (v: boolean) => void;
  // 引擎每 2 帧调用一次(TDD §4.2 主循环):SimSnapshot → UI 状态
  sync: (snap: SimSnapshot) => void;
}

const PLAYER_DEFAULT: UiPlayerState = {
  position: { x: 0, y: 0 },
  weapon: null,
  mode: 'melee',
  ammo: 0,
  hp: 1,
  kills: 0,
  hitsTaken: 0,
  reloading: 0,
};

function mapPlayer(p: Player): UiPlayerState {
  return {
    position: p.position,
    weapon: p.weapon,
    mode: p.mode,
    ammo: p.ammo,
    hp: p.hp,
    kills: p.kills,
    hitsTaken: p.hitsTaken,
    reloading: p.reloading,
  };
}

function mapMission(snap: SimSnapshot): UiMissionState {
  return {
    missionId: snap.currentMission?.id ?? null,
    nameZh: snap.currentMission?.nameZh ?? '',
    brief: snap.currentMission?.brief ?? '',
  };
}

function mapRoom(snap: SimSnapshot): UiRoomState {
  const m = snap.currentMission;
  const r = snap.currentRoom;
  const roomIndex = m && r ? m.rooms.findIndex((x) => x.id === r.id) : -1;
  return {
    roomId: r?.id ?? null,
    roomName: r?.nameZh ?? '',
    roomIndex,
    roomCount: m?.rooms.length ?? 0,
  };
}

export const useUiStore = create<UiState>((set) => ({
  phase: GP.TITLE,
  setPhase: (p) => set({ phase: p }),
  paused: false,
  setPaused: (v) => set({ paused: v }),
  player: { ...PLAYER_DEFAULT },
  updatePlayer: (partial) => set((s) => ({ player: { ...s.player, ...partial } })),
  enemies: { total: 0, alive: 0, boss: false },
  updateEnemies: (partial) => set((s) => ({ enemies: { ...s.enemies, ...partial } })),
  mission: { missionId: null, nameZh: '', brief: '' },
  setMission: (partial) => set((s) => ({ mission: { ...s.mission, ...partial } })),
  room: { roomId: null, roomName: '', roomIndex: -1, roomCount: 0 },
  setRoom: (partial) => set((s) => ({ room: { ...s.room, ...partial } })),
  score: null,
  setScore: (score) => set({ score }),
  deathCause: null,
  setDeathCause: (deathCause) => set({ deathCause }),
  spawnGraceRemaining: 0,
  detectionWarningRemaining: 0,
  lampsDestroyed: 0,
  lampHp: 2,
  objective: 'find_lamp',
  exitActive: false,
  rcConfig: { ...RC_DEFAULTS },
  setRcConfig: (partial) => set((s) => ({ rcConfig: { ...s.rcConfig, ...partial } })),
  rcState: null,
  setRcState: (rcState) => set({ rcState }),
  unlocks: { masks: [], missions: [] },
  setUnlocks: (unlocks) => set({ unlocks }),
  unlockNotice: null,
  setUnlockNotice: (unlockNotice) => set({ unlockNotice }),
  stats: null,
  setStats: (stats) => set({ stats }),
  activeMask: null,
  setActiveMask: (m) => set({ activeMask: m }),
  settings: { muted: false, volume: 0.5, rcQuality: 'med' },
  setSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),
  showDevPanel: false,
  setShowDevPanel: (v) => set({ showDevPanel: v }),
  sync: (snap) =>
    set({
      phase: snap.phase,
      paused: snap.paused,
      player: mapPlayer(snap.player),
      enemies: {
        total: snap.enemies.length,
         alive: snap.enemies.filter((e) => e.hp > 0).length,
        boss: snap.enemies.some((e) => e.archetype === 'boss'),
      },
      mission: mapMission(snap),
      room: mapRoom(snap),
      score: snap.missionScore,
      spawnGraceRemaining: snap.spawnGraceRemaining,
      detectionWarningRemaining: snap.detectionWarningRemaining,
       lampsDestroyed: snap.lampsDestroyed,
       lampHp: snap.lightSources[0]?.hp ?? 0,
       objective: snap.objective,
       exitActive: snap.exitActive,
    }),
}));
