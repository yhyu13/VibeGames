/**
 * core/simulation/Simulation.ts — 模拟主类(冻结接口,见 TDD §5.3)
 *
 * M1.3 由 agent-core 实现。完整 FSM:MENU → READY → PLAY → POINT → MATCH_OVER
 * (状态转移见 TDD §4.6;附加方法 startMatch()/toMenu() 由 GameEngine.handleUiCommand 调用)。
 *
 * 硬规则:此文件**禁止** import three / react / zustand / DOM。
 * 所有 side effect 必须经 SimEvent 走 EventBus。
 */

import {
  AI_TARGET_SPEED,
  BALL_SPEED_INITIAL,
  BALL_VZ_FIXED,
  BALL_X_FAIL_LEFT,
  BALL_X_FAIL_RIGHT,
  COURT_SIZE_Y,
  COURT_SIZE_Z,
  PADDLE_INITIAL_X_AI,
  PADDLE_INITIAL_X_P1,
  PADDLE_INITIAL_Y,
  PADDLE_SQUASH_DURATION,
  PADDLE_TARGET_SPEED_P1,
  POINT_DURATION,
  READY_COUNTDOWN,
  SCORE_TO_WIN,
} from '../constants';
import { DEFAULT_AUDIENCE } from '../data/audience';
import { DEFAULT_COURT_VOXELS } from '../data/court';
import { getCharacterBySide } from '../data/paddles';
import { makeRng } from '../math';
import type {
  Ball,
  Court,
  GamePhase,
  JuiceState,
  Paddle,
  PersistedStats,
  Score,
  Side,
  SimEvent,
  SimSnapshot,
  SimulationConfig,
} from '../types';
import { aiStep } from './aiPaddle';
import { ballStep } from './ballPhysics';
import { describeEntities as describeEntitiesText, describeRules as describeRulesText, describeWorld as describeWorldText } from './describe';
import { EventBus } from './events';
import { emitMatchOverJuice, emitMilestoneJuice, emitPointJuice } from './juiceEvents';
import { p1Step, type P1Input } from './paddleControl';
import { incrementRally, resetRally } from './rallyCounter';
import { pointScored } from './scoreTracker';

const DEFAULT_CONFIG: SimulationConfig = {
  seed: 42,
  audioMuted: false,
  audioVolume: 0.5,
};

/** 空球:静止在场中央,由 serveBall 启动 */
function makeBall(): Ball {
  return {
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    speed: 0,
    lastHitBy: null,
    rallyHits: 0,
  };
}

/** 空比分(bestOf = SCORE_TO_WIN) */
function makeScore(): Score {
  return { p1: 0, ai: 0, bestOf: SCORE_TO_WIN, rallyHits: 0, milestonesHit: [] };
}

/** 空 juice 状态 */
function makeJuice(): JuiceState {
  return {
    cameraShake: { intensity: 0, timeLeft: 0 },
    slowMo: { factor: 1, timeLeft: 0 },
    paddleSquash: { P1: 0, AI: 0 },
  };
}

export class Simulation {
  private config: SimulationConfig;
  private phase: GamePhase = 'MENU';
  private ball: Ball = makeBall();
  private p1: Paddle;
  private ai: Paddle;
  private court: Court;
  private score: Score = makeScore();
  private juice: JuiceState = makeJuice();
  private readonly events = new EventBus();
  private readonly rng: () => number;

  // ── FSM 计时(READY 倒计时 / POINT 计时) ──
  private readyTimer = 0;
  private pointTimer = 0;
  /** 失分后向失分方发球(该局下一球的方向) */
  private pendingRespawnSide: Side = 'AI';
  /** 最近一分是否已让某方达到 bestOf(满 7 分) */
  private matchPending = false;
  private matchWinner: Side = 'P1';

  // ── 输入缓冲(launch 为单帧边沿) ──
  private pendingInput: P1Input = { up: false, down: false, launch: false };
  private launchQueued = false;

  // ── 会话战绩(跨局累计,persist 事件值;跨会话合并由 engine 负责) ──
  private stats: PersistedStats = {
    totalMatches: 0,
    p1Wins: 0,
    aiWins: 0,
    longestRally: 0,
    lastMatchAt: 0,
  };
  private longestRallyHits = 0;

  constructor(config: Partial<SimulationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.rng = makeRng(this.config.seed);
    this.p1 = this.makePaddle('P1', PADDLE_INITIAL_X_P1);
    this.ai = this.makePaddle('AI', PADDLE_INITIAL_X_AI);
    this.court = {
      bounds: {
        minY: -COURT_SIZE_Y / 2 + 1, // -7(地板)
        maxY: COURT_SIZE_Y / 2 - 1, // +7
        minX: BALL_X_FAIL_LEFT, // -10
        maxX: BALL_X_FAIL_RIGHT, // +10
        minZ: -COURT_SIZE_Z / 2, // -5
        maxZ: COURT_SIZE_Z / 2, // +5
      },
      audience: DEFAULT_AUDIENCE,
      floorVoxels: DEFAULT_COURT_VOXELS,
      decorationVoxels: [],
    };
  }

  /** 创建一侧球拍(character 模板查 data/paddles) */
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

  // ── 主步进(引擎每帧调用,固定步 dt,慢镜已被引擎折算进 dt) ──
  step(dt: number): void {
    const launch = this.launchQueued;
    this.launchQueued = false;
    this.decayJuice(dt);
    switch (this.phase) {
      case 'MENU':
      case 'MATCH_OVER':
        break;
      case 'READY': {
        this.readyTimer -= dt;
        if (launch || this.readyTimer <= 0) this.startPlay();
        break;
      }
      case 'PLAY': {
        const emit = (e: SimEvent): void => this.handleEvent(e);
        ballStep(this.ball, this.court, this.p1, this.ai, dt, emit);
        p1Step(this.p1, this.pendingInput, dt);
        aiStep(this.ai, this.ball, dt, this.rng);
        break;
      }
      case 'POINT':
        this.stepPoint(dt);
        break;
    }
  }

  /** POINT 阶段:1.2s 计时 + 球拍回中;计时结束按 matchPending 决定 MATCH_OVER 或重新发球 */
  private stepPoint(dt: number): void {
    this.pointTimer -= dt;
    this.recenterPaddle(this.p1, PADDLE_TARGET_SPEED_P1, dt);
    this.recenterPaddle(this.ai, AI_TARGET_SPEED, dt);
    if (this.pointTimer > 0) return;
    if (this.matchPending) {
      this.phase = 'MATCH_OVER';
      const winner = this.matchWinner;
      this.emitRaw({
        type: 'matchOver',
        payload: { winner, finalScore: { p1: this.score.p1, ai: this.score.ai } },
      });
      emitMatchOverJuice(winner, (e) => this.emitRaw(e));
      this.emitRaw({ type: 'persist', payload: { key: 'stats', value: this.accumulateStats(winner) } });
    } else {
      this.phase = 'PLAY';
      this.serveBall(this.pendingRespawnSide);
    }
  }

  /** POINT 期间把球拍平滑移回 Y=0(上限速度,避免瞬移) */
  private recenterPaddle(paddle: Paddle, speed: number, dt: number): void {
    const dy = PADDLE_INITIAL_Y - paddle.position.y;
    const stepY = Math.min(Math.abs(dy), speed * dt);
    paddle.position.y += Math.sign(dy) * stepY;
    paddle.velocity.y = 0;
    paddle.targetY = PADDLE_INITIAL_Y;
  }

  /** 子模块事件统一入口:驱动计分 / rally / juice 状态,再转发到 EventBus */
  private handleEvent(e: SimEvent): void {
    switch (e.type) {
      case 'hit': {
        this.score = incrementRally(this.score, (ev) => this.handleEvent(ev));
        this.ball.rallyHits = this.score.rallyHits;
        this.longestRallyHits = Math.max(this.longestRallyHits, this.score.rallyHits);
        break;
      }
      case 'milestone': {
        emitMilestoneJuice(e.payload.hits, e.payload.index, (ev) => this.handleEvent(ev));
        break;
      }
      case 'point': {
        const winner = e.payload.winner;
        const loserScore = winner === 'P1' ? this.score.ai : this.score.p1;
        const { newScore, matchOver } = pointScored(winner, this.score, (ev) => this.handleEvent(ev));
        this.score = newScore;
        this.matchPending = matchOver;
        if (matchOver) this.matchWinner = winner;
        this.phase = 'POINT';
        this.pointTimer = POINT_DURATION;
        this.pendingRespawnSide = winner === 'P1' ? 'AI' : 'P1';
        this.score = resetRally(this.score);
        this.ball.rallyHits = 0;
        this.resetBall();
        emitPointJuice(winner, (ev) => this.handleEvent(ev));
        this.emitRaw({ type: 'point', payload: { winner, loserScore } });
        return; // 原始 point(占位 loserScore)不转发
      }
      case 'cameraShake':
        this.juice.cameraShake = { intensity: e.payload.intensity, timeLeft: e.payload.duration };
        break;
      case 'slowmo':
        this.juice.slowMo = { factor: e.payload.factor, timeLeft: e.payload.duration };
        break;
      case 'paddleSquash': {
        const ps = { ...this.juice.paddleSquash };
        if (e.payload.side === 'P1') ps.P1 = e.payload.amount;
        else ps.AI = e.payload.amount;
        this.juice.paddleSquash = ps;
        break;
      }
      default:
        break;
    }
    this.emitRaw(e);
  }

  /** juice 状态随时间衰减(cameraShake / slowMo 的 timeLeft、paddleSquash 的 amount) */
  private decayJuice(dt: number): void {
    const cs = this.juice.cameraShake;
    if (cs.timeLeft > 0) cs.timeLeft = Math.max(0, cs.timeLeft - dt);
    const sm = this.juice.slowMo;
    if (sm.timeLeft > 0) sm.timeLeft = Math.max(0, sm.timeLeft - dt);
    const squashDecay = dt / PADDLE_SQUASH_DURATION;
    const ps = this.juice.paddleSquash;
    ps.P1 = Math.max(0, ps.P1 - squashDecay);
    ps.AI = Math.max(0, ps.AI - squashDecay);
  }

  /** READY 结束(倒计时完或 Space 提前)→ PLAY,向 AI 发首球 */
  private startPlay(): void {
    this.phase = 'PLAY';
    this.serveBall('AI');
  }

  /** 发球:球到中心,以 BALL_SPEED_INITIAL 朝 direction 侧飞行(VZ 固定 +BALL_VZ_FIXED) */
  private serveBall(direction: Side): void {
    this.resetBall();
    this.ball.speed = BALL_SPEED_INITIAL;
    this.ball.velocity.x = direction === 'AI' ? BALL_SPEED_INITIAL : -BALL_SPEED_INITIAL;
    this.ball.velocity.y = 0;
    this.ball.velocity.z = BALL_VZ_FIXED;
    this.emitRaw({ type: 'ballLaunch', payload: { direction } });
  }

  /** 球回到场中央并静止(POINT 阶段与开局) */
  private resetBall(): void {
    this.ball.position = { x: 0, y: 0, z: 0 };
    this.ball.velocity = { x: 0, y: 0, z: 0 };
    this.ball.speed = 0;
    this.ball.lastHitBy = null;
    this.ball.rallyHits = 0;
  }

  /** 本局结束累计会话战绩(persist 'stats' 事件值;跨会话合并由 engine 负责) */
  private accumulateStats(winner: Side): PersistedStats {
    this.stats.totalMatches += 1;
    if (winner === 'P1') this.stats.p1Wins += 1;
    else this.stats.aiWins += 1;
    this.stats.longestRally = Math.max(this.stats.longestRally, this.longestRallyHits);
    this.stats.lastMatchAt = Date.now();
    this.longestRallyHits = 0;
    return { ...this.stats };
  }

  // ── UI 命令(GameEngine.handleUiCommand 调用) ──

  /** 开赛(MENU/MATCH_OVER → READY):重置比分 / 球 / 球拍 / rally / juice */
  startMatch(): void {
    this.phase = 'READY';
    this.readyTimer = READY_COUNTDOWN;
    this.pointTimer = 0;
    this.matchPending = false;
    this.score = makeScore();
    this.juice = makeJuice();
    this.resetBall();
    this.p1 = this.makePaddle('P1', PADDLE_INITIAL_X_P1);
    this.ai = this.makePaddle('AI', PADDLE_INITIAL_X_AI);
    this.launchQueued = false;
  }

  /** 回菜单(任意状态 → MENU):复位到初始场景 */
  toMenu(): void {
    this.phase = 'MENU';
    this.readyTimer = 0;
    this.pointTimer = 0;
    this.matchPending = false;
    this.score = makeScore();
    this.juice = makeJuice();
    this.resetBall();
    this.p1 = this.makePaddle('P1', PADDLE_INITIAL_X_P1);
    this.ai = this.makePaddle('AI', PADDLE_INITIAL_X_AI);
    this.launchQueued = false;
  }

  // ── 读取快照(UI 读这个;深拷贝,juice 用真实状态) ──
  snapshot(): SimSnapshot {
    return {
      phase: this.phase,
      ball: { ...this.ball, position: { ...this.ball.position }, velocity: { ...this.ball.velocity } },
      p1: { ...this.p1, position: { ...this.p1.position }, velocity: { ...this.p1.velocity } },
      ai: { ...this.ai, position: { ...this.ai.position }, velocity: { ...this.ai.velocity } },
      score: { ...this.score, milestonesHit: [...this.score.milestonesHit] },
      juice: {
        cameraShake: { ...this.juice.cameraShake },
        slowMo: { ...this.juice.slowMo },
        paddleSquash: { P1: this.juice.paddleSquash.P1, AI: this.juice.paddleSquash.AI },
      },
      perfDegradation: [],
    };
  }

  // ── 输入(来自 InputManager,只接受 P1 控制) ──

  /** 输入缓冲到 step() 内消费;launch 为单帧边沿(READY 时立即发球,MENU 时忽略) */
  setP1Input(input: { up: boolean; down: boolean; launch: boolean }): void {
    this.pendingInput = { ...input, launch: false };
    if (input.launch) this.launchQueued = true;
  }

  // ── 事件订阅 ──

  /** 事件订阅(返回退订函数) */
  onEvent(handler: (e: SimEvent) => void): () => void {
    return this.events.subscribe(handler);
  }

  /** 引擎每帧调用,排空事件队列 */
  drainEvents(): SimEvent[] {
    return this.events.drain();
  }

  /** 直接写入事件总线(不经状态联动) */
  private emitRaw(e: SimEvent): void {
    this.events.emit(e);
  }

  // ── 调试 ──

  /** 世界文本(球场 + 球拍 + 球 + 观众) */
  describeWorld(): string {
    return describeWorldText(this);
  }

  /** 物理常量表 */
  describeRules(): string {
    return describeRulesText(this);
  }

  /** 实体 ID 列表 */
  describeEntities(): string {
    return describeEntitiesText(this);
  }

  /** 最近 N 个事件(devtools 用) */
  recentEvents(n: number): SimEvent[] {
    return this.events.recent(n);
  }
}
