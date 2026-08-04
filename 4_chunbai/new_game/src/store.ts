import { create } from 'zustand';
import { GameState, PlayerState, InputState } from './types';
import { MAX_PLAYER_HP, MAX_SPECIAL_GAUGE } from './utils/constants';

interface GameStore {
  game: GameState;
  players: PlayerState[];
  inputs: InputState[];
  setGame: (partial: Partial<GameState>) => void;
  setPlayers: (players: PlayerState[]) => void;
  setInputs: (inputs: InputState[]) => void;
  resetGame: () => void;
}

const defaultGame: GameState = {
  screen: 'menu', gameMode: null, score: 0, wave: 0, time: 0,
  paused: false, gameOver: false, result: null,
  p1Wins: 0, p2Wins: 0, matchTime: 0,
  bossFight: false, bossName: '',
};

function makePlayer(id: number): PlayerState {
  return {
    id, pos: { x: id === 0 ? -20 : 20, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 },
    hp: MAX_PLAYER_HP, maxHp: MAX_PLAYER_HP, speed: 20, weapon: 1,
    weapons: [1, 2, 3], skillCooldowns: [0, 0, 0],
    specialGauge: 0, maxSpecialGauge: MAX_SPECIAL_GAUGE,
    shieldTimer: 0, invulnTimer: 0, alive: true, score: 0, kills: 0,
    combo: 0, boostTimer: 0, slowTimer: 0, warpTimer: 0,
  };
}

function makeInput(): InputState {
  return {
    forward: false, backward: false, left: false, right: false,
    up: false, down: false, shoot: false,
    aimX: 0, aimY: 0, weaponSwitch: 0,
    skill1: false, skill2: false, skill3: false,
    special: false, boost: false, lockTarget: false, pause: false,
  };
}

export const useGameStore = create<GameStore>((set) => ({
  game: { ...defaultGame },
  players: [makePlayer(0), makePlayer(1)],
  inputs: [makeInput(), makeInput()],
  setGame: (partial) => set((s) => ({ game: { ...s.game, ...partial } })),
  setPlayers: (players) => set({ players }),
  setInputs: (inputs) => set({ inputs }),
  resetGame: () => set({
    game: { ...defaultGame },
    players: [makePlayer(0), makePlayer(1)],
    inputs: [makeInput(), makeInput()],
  }),
}));
