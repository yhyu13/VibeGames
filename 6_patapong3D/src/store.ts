/**
 * store.ts — zustand UI 状态(只读 sim 快照,不写模拟)
 *
 * M1.5 by agent-ui。字段与 core/types.ts 的 SimSnapshot 对齐:
 * phase / ball / p1 / ai / score / juice / perfDegradation。
 * GameEngine 每 STORE_SYNC_INTERVAL(2)帧调用 usePatapongStore.setState(snapshot)
 * 全量同步;本 store 只读,不 import Simulation / engine。
 *
 * UiCommand 冻结于 core/types.ts('startMatch' | 'toMenu' | 'rematch'),
 * agent-core 落地前在此镜像(结构等价,后续可改为 import)。
 */

import { create } from 'zustand';
import type {
  Ball,
  GamePhase,
  JuiceState,
  Paddle,
  PerfDegradation,
  Score,
  Side,
} from './core/types';
import {
  PADDLE_INITIAL_X_AI,
  PADDLE_INITIAL_X_P1,
  PADDLE_INITIAL_Y,
  SCORE_TO_WIN,
} from './core/constants';
import { getCharacterBySide } from './core/data/paddles';

/** UI → 引擎命令(UiCommand 镜像,冻结:startMatch / toMenu / rematch) */
export type UiCommand = 'startMatch' | 'toMenu' | 'rematch';

interface PatapongStore {
  phase: GamePhase;
  ball: Ball;
  p1: Paddle;
  ai: Paddle;
  score: Score;
  juice: JuiceState;
  perfDegradation: PerfDegradation[];
  /** 命令桥:由 main.tsx 注册为 engine.handleUiCommand */
  uiBridge: ((cmd: UiCommand) => void) | null;
  setUiBridge: (fn: ((cmd: UiCommand) => void) | null) => void;
  sendUiCommand: (cmd: UiCommand) => void;
}

const makePaddle = (side: Side, x: number): Paddle => ({
  side,
  position: { x, y: PADDLE_INITIAL_Y, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  targetY: 0,
  squashAmount: 0,
  characterId: getCharacterBySide(side).id,
});

const initialBall: Ball = {
  position: { x: 0, y: 0, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  speed: 0,
  lastHitBy: null,
  rallyHits: 0,
};

const initialScore: Score = {
  p1: 0,
  ai: 0,
  bestOf: SCORE_TO_WIN,
  rallyHits: 0,
  milestonesHit: [],
};

const initialJuice: JuiceState = {
  cameraShake: { intensity: 0, timeLeft: 0 },
  slowMo: { factor: 1, timeLeft: 0 },
  paddleSquash: { P1: 0, AI: 0 },
};

export const usePatapongStore = create<PatapongStore>((set, get) => ({
  // ── 初始占位值,首次引擎同步(2 帧内)即被真实快照覆盖 ──
  phase: 'MENU',
  ball: initialBall,
  p1: makePaddle('P1', PADDLE_INITIAL_X_P1),
  ai: makePaddle('AI', PADDLE_INITIAL_X_AI),
  score: initialScore,
  juice: initialJuice,
  perfDegradation: [],

  // ── UI 命令桥 ──
  uiBridge: null,
  setUiBridge: (fn) => set({ uiBridge: fn }),
  sendUiCommand: (cmd) => {
    const bridge = get().uiBridge;
    bridge?.(cmd);
  },
}));
