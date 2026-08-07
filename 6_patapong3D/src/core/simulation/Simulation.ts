/**
 * core/simulation/Simulation.ts — 模拟主类(冻结接口,见 TDD §5.3)
 *
 * M1.3 由 agent-core 实现。当前是 M0 骨架。
 *
 * 硬规则:此文件**禁止** import three / react / zustand / DOM。
 * 所有 side effect 必须经 SimEvent 走 EventBus。
 */

import {
  BALL_SPEED_INITIAL,
  PADDLE_INITIAL_X_AI,
  PADDLE_INITIAL_X_P1,
  PADDLE_INITIAL_Y,
  SCORE_TO_WIN,
} from '../constants';
import { getCharacterBySide } from '../data/paddles';
import { DEFAULT_COURT_VOXELS } from '../data/court';
import { DEFAULT_AUDIENCE } from '../data/audience';
import type {
  Ball,
  Court,
  GamePhase,
  Paddle,
  Score,
  Side,
  SimEvent,
  SimSnapshot,
  SimulationConfig,
} from '../types';
import { EventBus } from './events';

const DEFAULT_CONFIG: SimulationConfig = {
  seed: 42,
  audioMuted: false,
  audioVolume: 0.5,
};

export class Simulation {
  private config: SimulationConfig;
  private phase: GamePhase = 'MENU';
  private ball: Ball;
  private p1: Paddle;
  private ai: Paddle;
  private court: Court;
  private score: Score;
  private readonly events = new EventBus();

  constructor(config: Partial<SimulationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.ball = {
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: -BALL_SPEED_INITIAL, y: 0, z: 0 },
      speed: BALL_SPEED_INITIAL,
      lastHitBy: null,
      rallyHits: 0,
    };
    this.p1 = this.makePaddle('P1', PADDLE_INITIAL_X_P1);
    this.ai = this.makePaddle('AI', PADDLE_INITIAL_X_AI);
    this.court = {
      bounds: { minY: -7, maxY: 7, minX: -10, maxX: 10, minZ: -5, maxZ: 5 },
      audience: DEFAULT_AUDIENCE,
      floorVoxels: DEFAULT_COURT_VOXELS,
      decorationVoxels: [],
    };
    this.score = {
      p1: 0,
      ai: 0,
      bestOf: SCORE_TO_WIN,
      rallyHits: 0,
      milestonesHit: [],
    };
  }

  private makePaddle(side: Side, x: number): Paddle {
    const ch = getCharacterBySide(side);
    return {
      side,
      position: { x, y: PADDLE_INITIAL_Y, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      targetY: 0,
      squashAmount: 0,
      characterId: ch.id,
    };
  }

  // ── 主步进 ──
  // M1.3 由 agent-core 实现
  // 当前:no-op
  step(_dt: number): void {
    /* TODO M1.3: ballPhysics + paddleControl + aiPaddle + scoreTracker + rallyCounter + juiceEvents */
    void this.config;
    void this.court;
  }

  // ── 读取快照(UI 读这个) ──
  snapshot(): SimSnapshot {
    return {
      phase: this.phase,
      ball: { ...this.ball, position: { ...this.ball.position }, velocity: { ...this.ball.velocity } },
      p1: { ...this.p1, position: { ...this.p1.position }, velocity: { ...this.p1.velocity } },
      ai: { ...this.ai, position: { ...this.ai.position }, velocity: { ...this.ai.velocity } },
      score: { ...this.score, milestonesHit: [...this.score.milestonesHit] },
      juice: {
        cameraShake: { intensity: 0, timeLeft: 0 },
        slowMo: { factor: 1, timeLeft: 0 },
        paddleSquash: { P1: 0, AI: 0 },
      },
      perfDegradation: [],
    };
  }

  // ── 输入(来自 InputManager,只接受 P1 控制) ──
  setP1Input(_input: { up: boolean; down: boolean; launch: boolean }): void {
    /* TODO M1.3: 缓冲到 sim,step() 内消费 */
  }

  // ── 事件订阅 ──
  onEvent(handler: (e: SimEvent) => void): () => void {
    return this.events.subscribe(handler);
  }

  /** 引擎每帧调用 */
  drainEvents(): SimEvent[] {
    return this.events.drain();
  }

  // ── 调试 ──
  describeWorld(): string {
    return `Patapong 3D — phase=${this.phase} score=P1:${this.score.p1}/AI:${this.score.ai} rally=${this.score.rallyHits}`;
  }

  describeRules(): string {
    return 'TODO M1.3: 物理常量表';
  }

  describeEntities(): string {
    return 'TODO M1.3: 实体 ID 列表';
  }

  recentEvents(n: number): SimEvent[] {
    return this.events.recent(n);
  }
}
