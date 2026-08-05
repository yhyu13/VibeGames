// core/simulation/Simulation.ts — 模拟权威（TDD §5.6 冻结签名）
// 单真相源：GamePhase 编排 + Boss FSM + 焦虑 + 剧本导演 + 替身 + 评分 + 结局。
// TODO agent-core: 填充实现（bossFSM / anxietyModel / scriptDirector / playerModel / rating / dialogueEngine / worldState）。

import type { BossState, GamePhase, PlayerPresence, TickInput, UiCommand } from '../types';
import type { SimEvent } from './events';

export interface SimState {
  boss: BossState;
  phase: GamePhase;
  round: number;
  player: PlayerPresence;
  time: number;
}

export interface SimApi {
  update(input: TickInput): SimEvent[];  // 推进一固定步，返回本步事件（engine 分发）
  getState(): Readonly<SimState>;        // 只读快照
  beginRun(seed?: number): void;         // MENU→WAIT，注入 RNG 种子（可复现）
  getManifestText(): string;             // worldText.buildPromptContext 入口
  resetRun(): void;                      // 重开（持久化保留）
}

export interface PersistPort {           // engine/storage.ts 实现
  load<T>(key: 'diary' | 'archive' | 'stats' | 'settings'): T | null;
  save(key: 'diary' | 'archive' | 'stats' | 'settings', value: unknown): void;
}

const freshBoss = (): BossState => ({
  id: 'boss',
  innerState: 'IDLE',
  pos: { x: -8, y: 0, z: 0 },
  rot: { x: 0, y: 0, z: 0 },
  hp: 100,
  maxHp: 100,
  anxiety: 30,
  seen: 0,
  band: 'calm',
  script: null,
  stageIndex: 0,
  beatIndex: 0,
  performMode: 'scripted',
  recovering: false,
  knockdownCount: 0,
  breakdownTimer: 0,
  anim: 'idleSway',
});

const freshPlayer = (): PlayerPresence => ({
  approachSpeed: 0,
  distanceToThrone: 40,
  dodgeCount: 0,
  hitsLanded: 0,
  dodgeTimingQuality: 0,
  barrageActive: false,
  aggression: 0,
  lingerTime: 0,
  state: 'gone',
});

export class Simulation implements SimApi {
  private state: SimState = {
    boss: freshBoss(),
    phase: 'MENU',
    round: 1,
    player: freshPlayer(),
    time: 0,
  };
  private pendingUi: UiCommand | null = null;

  update(input: TickInput): SimEvent[] {
    this.state.time = input.time;
    if (input.ui) this.pendingUi = input.ui;
    const ui = this.pendingUi;
    this.pendingUi = null;
    // TODO agent-core: 完整固定步逻辑（phase 转移 / bossFSM / anxiety / director / playerModel / rating / diary / endings）
    void ui;
    return [];
  }

  getState(): Readonly<SimState> {
    return this.state;
  }

  beginRun(_seed?: number): void {
    this.state = { boss: freshBoss(), phase: 'WAIT', round: 1, player: freshPlayer(), time: 0 };
  }

  getManifestText(): string {
    // TODO agent-core: worldText.buildPromptContext(this.state)
    return 'manifest TODO';
  }

  resetRun(): void {
    this.state = { boss: freshBoss(), phase: 'MENU', round: 1, player: freshPlayer(), time: 0 };
  }
}
