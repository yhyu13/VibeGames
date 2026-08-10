/**
 * store.ts — v2.0 zustand store
 *
 * 战斗字段 = SimSnapshot 平铺(phase/army/boss/rhythm/fever/perfDegradation),
 * 由 GameEngine 每 STORE_SYNC_INTERVAL 帧整体写入;组件只读 store,不碰模拟。
 * intro 字段由 IntroEngine 写入(觉醒 cinematic);battleReady 由 main.tsx
 * 在 battle 接管画布时置位。
 */

import { create } from 'zustand';
import { BOSS_HP_MAX, BOSS_INITIAL_X } from './core/constants';
import type {
  Judgement,
  NoteType,
  PersistedSettings,
  PersistedStats,
  Side,
  SimSnapshot,
} from './core/types';
import type { NoteType as IntroNoteType } from './intro/types';
import type { TimingGrade } from './intro/rhythm';

export type UiCommand =
  | 'startMatch'
  | 'toMenu'
  | 'rematch'
  | 'toggleMute'
  | 'resetData'
  | 'skipIntro'
  | 'replay';

export interface IntroState {
  stage: 'input' | 'flight' | 'impact' | 'ending';
  input: IntroNoteType[];
  grades: TimingGrade[];
  power: number;
  complete: boolean;
  beatPulse: number;
  timing: 'ready' | 'miss';
  message: string;
  debrisCount: number;
  craterVoxels: number;
  finalGrade: TimingGrade | null;
  selectedCommand: string;
  finalCommand: string | null;
}

/** 判定即时反馈(beatHit/playerMiss 事件 → HUD 飘字) */
export interface JudgementFeedItem {
  id: number;
  judgement: Judgement;
  type: NoteType | null;
  combo: number;
}

interface PatapongStore extends SimSnapshot {
  intro: IntroState;
  /** battle 引擎已接管画布(intro 完成或跳过) */
  battleReady: boolean;
  /** 上一局胜负(matchOver 事件写入;startMatch 清空) */
  winner: Side | null;
  stats: PersistedStats | null;
  settings: PersistedSettings | null;
  judgementFeed: JudgementFeedItem | null;
  rendererMode: 'raytrace' | 'raster';
  qualityLevel: number;
  uiBridge: ((command: UiCommand) => void) | null;
  setUiBridge: (bridge: ((command: UiCommand) => void) | null) => void;
  sendUiCommand: (command: UiCommand) => void;
}

const initialIntro: IntroState = {
  stage: 'input',
  input: [],
  grades: [],
  power: 0,
  complete: false,
  beatPulse: 0,
  timing: 'ready',
  message: 'COMMAND THE ARMY',
  debrisCount: 0,
  craterVoxels: 0,
  finalGrade: null,
  selectedCommand: 'ATTACK',
  finalCommand: null,
};

/** 引擎启动前的占位快照(组件在 battleReady 前也可能渲染) */
const initialSim: SimSnapshot = {
  phase: 'MENU',
  army: {
    units: [],
    formationOffset: 0,
    defendTurns: 0,
    retreatTurns: 0,
    berserkTurns: 0,
    lastCommand: null,
  },
  boss: {
    hp: BOSS_HP_MAX,
    maxHp: BOSS_HP_MAX,
    position: { x: BOSS_INITIAL_X, y: 0, z: 0 },
    state: 'idle',
    stateTimeLeft: 0,
    telegraph: null,
    enraged: false,
    attackCount: 0,
    squashAmount: 1,
  },
  rhythm: {
    songTime: 0,
    songIndex: 0,
    charts: [],
    activeNoteIndex: 0,
    noteScrollSpeed: 0,
    commandBeats: [],
    commandJudgements: [],
    combo: 0,
    maxCombo: 0,
  },
  fever: { active: false, factor: 1, timeLeft: 0, damageMult: 1, level: -1 },
  perfDegradation: [],
};

export const usePatapongStore = create<PatapongStore>((set, get) => ({
  ...initialSim,
  intro: initialIntro,
  battleReady: false,
  winner: null,
  stats: null,
  settings: null,
  judgementFeed: null,
  rendererMode: 'raytrace',
  qualityLevel: 0,
  uiBridge: null,
  setUiBridge: (bridge) => set({ uiBridge: bridge }),
  sendUiCommand: (command) => get().uiBridge?.(command),
}));
