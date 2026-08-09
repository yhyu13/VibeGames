import { create } from 'zustand';
import type { NoteType } from './intro/types';

export type UiCommand = 'replay' | 'skipIntro';

export interface IntroState {
  stage: 'input' | 'flight' | 'impact' | 'ending';
  input: NoteType[];
  complete: boolean;
  beatPulse: number;
  timing: 'ready' | 'miss';
  message: string;
  debrisCount: number;
  craterVoxels: number;
}

interface PatapongStore {
  intro: IntroState;
  uiBridge: ((command: UiCommand) => void) | null;
  setUiBridge: (bridge: ((command: UiCommand) => void) | null) => void;
  sendUiCommand: (command: UiCommand) => void;
}

const initialIntro: IntroState = {
  stage: 'input',
  input: [],
  complete: false,
  beatPulse: 0,
  timing: 'ready',
  message: 'COMMAND THE ARMY',
  debrisCount: 0,
  craterVoxels: 0,
};

export const usePatapongStore = create<PatapongStore>((set, get) => ({
  intro: initialIntro,
  uiBridge: null,
  setUiBridge: (bridge) => set({ uiBridge: bridge }),
  sendUiCommand: (command) => get().uiBridge?.(command),
}));
