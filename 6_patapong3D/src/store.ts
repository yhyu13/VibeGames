/**
 * store.ts — zustand 状态
 *
 * 当前是 M0 骨架(M1.5 由 agent-ui 实现完整 UI 状态)
 * 冻结规则:store 只读 sim snapshot,不写
 */

import { create } from 'zustand';
import type { GamePhase } from './core/types';

interface PatapongStore {
  phase: GamePhase;
  setPhase: (p: GamePhase) => void;
}

export const usePatapongStore = create<PatapongStore>((set) => ({
  phase: 'MENU',
  setPhase: (phase) => set({ phase }),
}));
