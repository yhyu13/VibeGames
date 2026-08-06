import { create } from 'zustand';
import { GameState, PlayerState, InputState } from './core/types';
import { MAX_PLAYER_HP, MAX_PLAYER_EN, MAX_SPECIAL_GAUGE, PLAYER_SPEED } from './core/constants';

interface GameStore {
  game: GameState;
  players: PlayerState[];
  inputs: InputState[];
  setGame: (partial: Partial<GameState>) => void;
  setPlayers: (players: PlayerState[]) => void;
  setInputs: (inputs: InputState[]) => void;
  /** C4: 触发屏幕边缘黄色脉冲 */
  triggerEdgePulse: () => void;
  /** C4: 触发子弹时间 */
  triggerTimeDilation: (duration: number) => void;
  resetGame: () => void;
}

const defaultGame: GameState = {
  screen: 'menu', gameMode: null, score: 0, wave: 0, time: 0,
  paused: false, gameOver: false,
  bossFight: false, bossName: '',
  introActive: false,
  edgePulseAt: 0,
  timeDilationUntil: 0,
  lockOn: false,
};

function makePlayer(id: number): PlayerState {
  return {
    id, pos: { x: 0, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 },
    hp: MAX_PLAYER_HP, maxHp: MAX_PLAYER_HP, energy: MAX_PLAYER_EN, maxEnergy: MAX_PLAYER_EN,
    speed: PLAYER_SPEED, weapon: 1, weapons: [1, 2, 3],
    specialGauge: 0, maxSpecialGauge: MAX_SPECIAL_GAUGE,
    invulnTimer: 0, alive: true, score: 0, kills: 0, combo: 0,
  };
}

function makeInput(): InputState {
  return {
    forward: false, backward: false, left: false, right: false,
    up: false, down: false, shoot: false,
    aimX: 0.5, aimY: 0.5, weaponSwitch: 0,
    boost: false, brake: false, dodge: false,
    special: false, lockToggle: false, pause: false,
  };
}

export const useGameStore = create<GameStore>((set) => ({
  game: { ...defaultGame },
  players: [makePlayer(0)],
  inputs: [makeInput()],
  setGame: (partial) => set((s) => ({ game: { ...s.game, ...partial } })),
  setPlayers: (players) => set({ players }),
  setInputs: (inputs) => set({ inputs }),
  /** C4: 触发屏幕边缘黄色脉冲（store timestamp 让 React overlay 渲染一次性动画） */
  triggerEdgePulse: () => set((s) => ({ game: { ...s.game, edgePulseAt: performance.now() } })),
  /** C4: 子弹时间（timeScale 持续时长，秒） */
  triggerTimeDilation: (duration: number) => set((s) => ({ game: { ...s.game, timeDilationUntil: performance.now() + duration * 1000 } })),
  resetGame: () => set({
    game: { ...defaultGame },
    players: [makePlayer(0)],
    inputs: [makeInput()],
  }),
}));
