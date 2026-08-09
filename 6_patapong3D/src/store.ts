/**
 * store.ts - v2.0 zustand UI state (mirrors sim snapshot, never writes the sim)
 *
 * GameEngine pushes sim.snapshot() every STORE_SYNC_INTERVAL frames plus
 * judgementFeed items on beatHit/playerMiss so overlays never touch Simulation.
 */

import { create } from 'zustand';
import {
  ARMY_INITIAL_X,
  BOSS_HP_MAX,
  BOSS_HP_START,
  BOSS_INITIAL_X,
  FIGHTER_INITIAL_Y,
  UNIT_HP_MAX,
  UNIT_HP_START,
  UNIT_SPACING_X,
  UNIT_Z_OFFSETS,
} from './core/constants';
import type {
  ArmyState,
  BossState,
  FeverState,
  GamePhase,
  Judgement,
  NoteType,
  PerfDegradation,
  PersistedSettings,
  PersistedStats,
  RhythmState,
  SimSnapshot,
  Unit,
} from './core/types';

export type UiCommand =
  | 'startMatch'
  | 'toMenu'
  | 'rematch'
  | 'toggleMute'
  | 'resetData'
  | 'skipIntro';

/** Intro scene state (mirrored by IntroDirector; overlays read-only). */
export interface IntroState {
  stage: 'boot' | 'title' | 'reveal' | 'awaken' | 'ready';
  /** drums tapped during the awakening (0..4) */
  beats: NoteType[];
  /** true when the cinematic finished and the classic menu may show */
  complete: boolean;
  /** seconds until the next metronome beat (0..1) */
  nextBeatIn: number;
  /** awakening white flash (0..1) */
  flash: number;
  /** stage darkness (0..1) */
  darkness: number;
}

export interface JudgementFeedEvent {
  id: number;
  judgement: Judgement;
  type: NoteType | null;
  combo: number;
}

interface PatapongStore extends SimSnapshot {
  stats: PersistedStats | null;
  settings: PersistedSettings | null;
  judgementFeed: JudgementFeedEvent | null;
  intro: IntroState;
  uiBridge: ((cmd: UiCommand) => void) | null;
  setUiBridge: (fn: ((cmd: UiCommand) => void) | null) => void;
  sendUiCommand: (cmd: UiCommand) => void;
}

const UNIT_IDS = ['pata-emerald', 'pata-lime', 'pata-teal'] as const;

const makeUnit = (i: number): Unit => ({
  id: i,
  side: 'P1',
  hp: UNIT_HP_START,
  maxHp: UNIT_HP_MAX,
  position: {
    x: ARMY_INITIAL_X + (i - 1) * UNIT_SPACING_X,
    y: FIGHTER_INITIAL_Y,
    z: UNIT_Z_OFFSETS[i] ?? 0,
  },
  state: 'idle',
  stateTimeLeft: 0,
  squashAmount: 1,
  characterId: UNIT_IDS[i] ?? 'pata-emerald',
});

const initialArmy: ArmyState = {
  units: [makeUnit(0), makeUnit(1), makeUnit(2)],
  formationOffset: ARMY_INITIAL_X,
  defendTurns: 0,
  retreatTurns: 0,
  berserkTurns: 0,
  lastCommand: null,
};

const initialBoss: BossState = {
  hp: BOSS_HP_START,
  maxHp: BOSS_HP_MAX,
  position: { x: BOSS_INITIAL_X, y: FIGHTER_INITIAL_Y, z: 0 },
  state: 'idle',
  stateTimeLeft: 0,
  telegraph: null,
  enraged: false,
  attackCount: 0,
  squashAmount: 1,
};

const initialRhythm: RhythmState = {
  songTime: 0,
  songIndex: 0,
  charts: [],
  activeNoteIndex: 0,
  noteScrollSpeed: 0,
  commandBeats: [],
  commandJudgements: [],
  combo: 0,
  maxCombo: 0,
};

const initialFever: FeverState = {
  active: false,
  factor: 1,
  timeLeft: 0,
  level: 0,
};

const initialIntro: IntroState = {
  stage: 'boot',
  beats: [],
  complete: false,
  nextBeatIn: 1,
  flash: 0,
  darkness: 1,
};

export const usePatapongStore = create<PatapongStore>((set, get) => ({
  // SimSnapshot fields
  phase: 'MENU' as GamePhase,
  army: initialArmy,
  boss: initialBoss,
  rhythm: initialRhythm,
  fever: initialFever,
  perfDegradation: [] as PerfDegradation[],

  stats: null,
  settings: null,
  judgementFeed: null,
  intro: initialIntro,

  uiBridge: null,
  setUiBridge: (fn) => set({ uiBridge: fn }),
  sendUiCommand: (cmd) => {
    const bridge = get().uiBridge;
    bridge?.(cmd);
  },
}));
