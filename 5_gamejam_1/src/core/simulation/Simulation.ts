// core/simulation/Simulation.ts — 模拟权威（TDD §5.6 冻结签名）
// 单真相源：GamePhase 编排（G01–G13）+ Boss 内部 FSM（B01–B09）
// + 焦虑 S/R 表 + 剧本导演 + 替身输入 + 评分 + 日记 + 结局。
// 平台纯净：事件（SimEvent）是唯一副作用通道；内容池可能为空（优雅降级）。

import type {
  ArchiveEntry,
  Beat,
  BeatType,
  BossAnimKind,
  BossState,
  DiaryEntry,
  EndingVariant,
  GamePhase,
  PerformMode,
  PersistedStats,
  PlayerPresence,
  RatingAxisId,
  RatingFacts,
  RoundResult,
  ScriptDef,
  ScriptId,
  TickInput,
  UiCommand,
  Vector3,
} from '../types';
import type { SimEvent } from './events';
import {
  A4_SEEN_5STAR,
  BARRAGE_ACTIVE_WINDOW,
  BOSS_MAX_HP,
  BREAK_BAND_FLOOR,
  BREAK_CHARACTER_TIME,
  BREAK_FREE_TIME,
  BREAK_MISS_MULT,
  BREAK_POWER_MAX,
  BREAK_POWER_MIN,
  BREAK_SPREAD_MULT,
  DIARY_COUNTDOWN,
  EVALUATE_COUNTDOWN,
  HAIR_TIDY_TIME,
  HIT_RECOVER_TIME,
  KNOCKDOWN_EARLY_END,
  MAX_ROUNDS,
  PLAYER_APPROACH_MAX,
  PLAYER_APPROACH_STEADY,
  PLAYER_HIT_CHANCES,
  PLAYER_HIT_INTERVAL,
  PERFORM_MAX_TIME,
  PERFORM_STAGE_TIME,
  R_DIARY_NEGATIVE,
  R_DIARY_POSITIVE,
  R_PLAYER_5STAR,
  R_RATING_3,
  R_RATING_4,
  R_RATING_5,
  R_RATING_LOW,
  R_SCRIPT_DONE,
  R_STAGE_DONE,
  RATING_PERFECT,
  RATING_QUALIFIED,
  ROUND_TABLE,
  S_BASE,
  S_ROUND,
  SEEN_FREE_PLAY,
  SEEN_PERFECT_ROUND,
  SENSE_TRIGGER_DIST,
  STRETCH_FLAGS,
  WAIT_MAX_TIME,
  WAIT_PICK_WINDOW,
} from '../constants';
import { clamp, mulberry32, randRange, wrapAngle } from '../math';
import {
  applyDecay,
  applySources,
  computeBand,
  evaluateSoothing,
  totalDelta,
  type AnxietySourceEvent,
} from './anxietyModel';
import {
  afterBreakdown,
  isPanicBreakdown,
  nextBossState,
  PANIC_BREAKDOWN,
  shouldDropSword,
  SWORD_DROP,
  type BossFlags,
} from './bossFSM';
import {
  advanceBeat,
  stanceInTolerance,
  type DirectorInterrupts,
  type DirectorStance,
} from './scriptDirector';
import { carryDown, computeRating, type RatingResult } from './rating';
import { pickLine } from './dialogueEngine';
import { buildPromptContext } from '../world/worldText';
import { WORLD } from '../world/world';
import { ARCHIVE_GEN_TEMPLATES } from '../data/archives';
import { BARRAGE_LINES } from '../data/barrage';
import { DIARY_ENTRIES } from '../data/diary';
import { RATING_AXES } from '../data/ratingAxes';
import { SCRIPTS } from '../data/scripts';

export interface SimState {
  boss: BossState;
  phase: GamePhase;
  round: number;
  player: PlayerPresence;
  time: number;
  /** 当前节拍（引擎/HUD 消费：走位目标圈、攻击节拍圈、台词节拍）。null = 无节拍（WAIT/SENSE/收尾） */
  beat: {
    type: BeatType;
    duration: number;
    remaining: number;
    targetPos?: Vector3;
  } | null;
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

const BOSS_MOVE_SPEED = 3; // Boss 走位速度 m/s（WASD；无冻结常量，本地定义）

const freshBoss = (): BossState => ({
  id: 'boss',
  innerState: 'IDLE',
  pos: { x: -8, y: 0, z: 0 },
  rot: { x: 0, y: 0, z: 0 },
  hp: BOSS_MAX_HP,
  maxHp: BOSS_MAX_HP,
  anxiety: S_BASE,
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

// 占位剧本：SCRIPTS 池为空时的降级（3 阶段 × 1 move beat，快速走完循环）
const PLACEHOLDER_SCRIPT: ScriptDef = {
  id: 'dignity',
  name: '占位剧本',
  difficulty: 8,
  stages: [0, 1, 2].map((i) => ({ id: `PH_STAGE_${i + 1}`, beats: [{ type: 'move', duration: 1 }] })),
};

// 台词池前缀（按剧本 id；自由发挥 L_FREE 100% 完整）
const POOL_BY_SCRIPT: Record<ScriptId, string> = {
  dignity: 'L_DIG',
  tragic: 'L_TRG',
  mad: 'L_MAD',
  freePlay: 'L_FREE',
};

export class Simulation implements SimApi {
  private state: SimState = { boss: freshBoss(), phase: 'MENU', round: 1, player: freshPlayer(), time: 0, beat: null };
  private pendingUi: UiCommand | null = null;
  private rng: () => number = mulberry32(1);
  private readonly persist?: PersistPort;

  // 轮次运行态
  private currentScript: ScriptDef | null = null;
  private waitTimer = 0;
  private waitExitTime = WAIT_PICK_WINDOW;
  private performTimer = 0;
  private stageTimer = 0;
  private beatElapsed = 0;
  /** 当前 attack 节拍内玩家是否按过左键（LMB 是攻击的扳机） */
  private attackPressedDuringBeat = false;
  /** 第一幕操作提示是否已播（每局一次） */
  private performHintShown = false;
  private evaluateTimer = 0;
  private diaryTimer = 0;
  private prevPhase: GamePhase = 'MENU';
  private firstGlimpseDone = false;
  private musicMode: 'calm' | 'tense' | 'freeplay' | 'ending' | null = null;
  private stepTimer = 0;
  private broke = false;
  private roundKnockdowns = 0;
  private roundStartAnxiety = S_BASE;
  private beginPending = false;

  // 子行为计时（HIT/RECOVER/BREAK_CHARACTER/恐慌崩溃/捡剑）
  private hitTimer = 0;
  private playerHitTimer = 4;
  private recoverTimer = 0;
  private breakTimer = 0;
  private breakdownTimer = 0;
  private swordDropTimer = 0;

  // 出戏 / 自由发挥
  private freePlayTimer = 0;
  private freePlayLineTimer = 0;
  private freePlayAttackTimer = 0;
  private freePlayMissMult = 1;
  private freePlayPower = 1.2;

  // 焦虑记账
  private lastSourceTime = 0;
  private stageForgotCount = 0;

  // 弹幕（S07 / A4 证据）
  private barrageTimer = 0;
  private barrageEntryCount = 0;
  private barrageCount = 0;

  // 评分记账
  private stanceHits = 0;
  private stanceChecks = 0;
  private jitterAccum = 0;
  private jitterSamples = 0;
  private lineTotal = 0;
  private lineComplete = 0;
  private forgotLines = 0;
  private comboStreak = 0;
  private maxCombo = 0;
  private stagesCompleted = 0;
  private lineRateBonus = 0;
  private selfDoubtPending = false;
  private lingerObserved = 0;
  private prevHeading: number | null = null;

  // 打断标志（B06 ①②，每 tick 重置）
  private hitDuringLine = false;
  private barrageDuringLine = false;

  // 评分结果 / 持久化统计
  private lastRating: RatingResult | null = null;
  private lastRoundResult: RoundResult | null = null;
  private pendingFacts: RatingFacts | null = null;
  private ratingSubmitted = false;
  private stats: PersistedStats = { totalRounds: 0, notGoodEnoughCount: 0, seenEndings: [], lastVerdicts: [] };

  constructor(persist?: PersistPort) {
    this.persist = persist;
    const loaded = this.persist?.load<PersistedStats>('stats');
    if (loaded && typeof loaded.totalRounds === 'number') this.stats = loaded;
  }

  // ============ SimApi 实现 ============

  update(input: TickInput): SimEvent[] {
    const events: SimEvent[] = [];
    this.state.time = input.time;
    this.state.player = { ...input.player };
    if (input.ui) this.pendingUi = input.ui;
    const ui = this.pendingUi;
    this.pendingUi = null;

    if (ui) {
      switch (ui.kind) {
        case 'startRun':
          if (this.state.phase === 'MENU') this.beginRunInternal(events); // G01
          break;
        case 'scriptPick':
          if (this.state.phase === 'WAIT') this.pickScript(ui.script, events);
          break;
        case 'ratingSubmit':
          if (this.state.phase === 'EVALUATE') this.submitRating(ui.stars, events); // G06
          break;
        case 'diaryPick':
          if (this.state.phase === 'DIARY') this.pickDiary(ui.entryId, events); // G07
          break;
        case 'pauseToggle':
          this.togglePause(events); // G11/G12
          break;
        case 'archiveFlip':
          break; // 档案翻阅不改变模拟状态
        case 'dialogueChoice':
          break; // G09/G10 隐藏结局链：STRETCH_FLAGS.hiddenEnding=false 不注册分支
      }
    }

    if (this.state.phase === 'PAUSE') return events; // G11：暂停冻结一切模拟推进

    // 公开 beginRun 无事件通道 → 首个 update 补发 G01 事件（L_AMB/音乐/王座吱呀）
    if (this.beginPending) {
      this.beginPending = false;
      this.emitWaitEnter(events);
    }

    switch (this.state.phase) {
      case 'MENU':
      case 'ENDING_NORMAL':
      case 'ENDING_HIDDEN':
        break; // 菜单 / 结局静止
      case 'WAIT':
        this.tickWait(input, events);
        break;
      case 'SENSE':
        this.tickSense(input, events);
        break;
      case 'PERFORM':
        this.tickPerform(input, events);
        break;
      case 'EVALUATE':
        this.tickEvaluate(input, events);
        break;
      case 'DIARY':
        this.tickDiary(input, events);
        break;
    }
    return events;
  }

  getState(): Readonly<SimState> {
    return this.state;
  }

  beginRun(seed?: number): void {
    this.rng = mulberry32(seed ?? 1);
    this.resetRunState();
    this.state.phase = 'WAIT';
    this.state.boss.anxiety = S_BASE; // G01：R1 焦虑 30
    this.waitExitTime = randRange(this.rng, WAIT_PICK_WINDOW, WAIT_MAX_TIME);
    this.beginPending = true;
  }

  getManifestText(): string {
    return buildPromptContext(this.state);
  }

  resetRun(): void {
    this.rng = mulberry32(1);
    this.resetRunState();
    this.state.phase = 'MENU'; // G13：持久化数据保留（仅内存统计复位）
  }

  // ============ 通用小工具 ============

  private setPhase(phase: GamePhase, events: SimEvent[], performMode?: PerformMode): void {
    this.state.phase = phase;
    events.push({ type: 'phase', phase, ...(performMode ? { performMode } : {}) });
  }

  private setMusic(mode: 'calm' | 'tense' | 'freeplay' | 'ending', intensity: number, events: SimEvent[]): void {
    if (this.musicMode === mode) return;
    this.musicMode = mode;
    events.push({ type: 'music', mode, intensity });
  }

  private setBossAnim(boss: BossState, anim: BossAnimKind, events: SimEvent[], once = false): void {
    boss.anim = anim;
    events.push({ type: 'bossAnim', anim, once });
  }

  private emitPhaseMusic(events: SimEvent[]): void {
    switch (this.state.phase) {
      case 'WAIT':
      case 'DIARY':
        this.setMusic('calm', 0.3, events);
        break;
      case 'SENSE':
        this.setMusic('tense', 0.6, events);
        break;
      case 'PERFORM':
        this.setMusic(this.state.boss.performMode === 'freePlay' ? 'freeplay' : 'tense', 0.7, events);
        break;
      case 'ENDING_NORMAL':
      case 'ENDING_HIDDEN':
        this.setMusic('ending', 0.4, events);
        break;
      default:
        break;
    }
  }

  /** 焦虑批量记账：S 来源 → 无源计时 → R01 衰减 → 出戏带下限 → 分带派生 */
  private applyAnxiety(sources: readonly AnxietySourceEvent[], dt: number, events: SimEvent[]): void {
    void events;
    const boss = this.state.boss;
    const delta = totalDelta(sources);
    if (delta > 0) this.lastSourceTime = 0;
    else this.lastSourceTime += dt;
    let next = applySources(boss.anxiety, sources);
    if (this.state.phase !== 'EVALUATE') next = applyDecay(next, dt, this.lastSourceTime);
    if (boss.performMode === 'freePlay') next = Math.max(next, BREAK_BAND_FLOOR); // 出戏期间带下限 61
    boss.anxiety = clamp(next, 0, 100);
    boss.band = computeBand(boss.anxiety);
  }

  /** 安抚类修正（R03/R04/R05–R08/R09/R10/R11 等负向增量），不重置无源计时 */
  private relief(amount: number): void {
    const boss = this.state.boss;
    boss.anxiety = clamp(boss.anxiety - amount, 0, 100);
    boss.band = computeBand(boss.anxiety);
  }

  private makeFlags(over: Partial<BossFlags>): BossFlags {
    const boss = this.state.boss;
    return {
      hpZero: boss.hp <= 0,
      knockdowns: boss.knockdownCount,
      inPerform: this.state.phase === 'PERFORM',
      interrupt: false,
      recoverDone: false,
      breakDone: false,
      ...over,
    };
  }

  private findScript(id: ScriptId): ScriptDef {
    const found = SCRIPTS.find((s) => s.id === id);
    if (found) return found;
    return { ...PLACEHOLDER_SCRIPT, id }; // 池空降级
  }

  private currentBeatIsLine(): boolean {
    const script = this.currentScript;
    if (!script) return false;
    const stage = script.stages[this.state.boss.stageIndex];
    if (!stage) return false;
    const beat = stage.beats[this.state.boss.beatIndex];
    return beat?.type === 'line';
  }

  private currentJitterRatio(): number {
    return this.jitterSamples > 0 ? (this.jitterAccum / this.jitterSamples) * 100 : 0;
  }

  private deriveA4(seen: number): number {
    if (seen >= A4_SEEN_5STAR) return 5;
    if (seen >= 60) return 4; // 阈值同 rating.ts（60/40/20）
    if (seen >= 40) return 3;
    if (seen >= 20) return 2;
    return 1;
  }

  private finalizeRating(r: RatingResult, seen: number): RatingResult {
    const axes = { ...r.axes, remembered: this.deriveA4(seen) }; // A4 系统代填
    const total = (axes.mobility + axes.delivery + axes.visual + axes.remembered) / 4;
    const verdict: 'perfect' | 'qualified' | 'fail' =
      total >= RATING_PERFECT ? 'perfect' : total >= RATING_QUALIFIED ? 'qualified' : 'fail';
    return { axes, total, verdict };
  }

  // ============ 轮次状态机 ============

  private resetRunState(): void {
    this.state.boss = freshBoss();
    this.state.player = freshPlayer();
    this.state.round = 1;
    this.currentScript = null;
    this.waitTimer = 0;
    this.performTimer = 0;
    this.stageTimer = 0;
    this.beatElapsed = 0;
    this.attackPressedDuringBeat = false;
    this.performHintShown = false;
    this.state.beat = null;
    this.evaluateTimer = 0;
    this.diaryTimer = 0;
    this.prevPhase = 'MENU';
    this.firstGlimpseDone = false;
    this.musicMode = null;
    this.stepTimer = 0;
    this.broke = false;
    this.roundKnockdowns = 0;
    this.roundStartAnxiety = S_BASE;
    this.beginPending = false;
    this.hitTimer = 0;
    this.playerHitTimer = 4; // 首击缓冲：给玩家 4s 适应节拍
    this.recoverTimer = 0;
    this.breakTimer = 0;
    this.breakdownTimer = 0;
    this.swordDropTimer = 0;
    this.freePlayTimer = 0;
    this.freePlayLineTimer = 0;
    this.freePlayAttackTimer = 0;
    this.freePlayMissMult = 1;
    this.freePlayPower = 1.2;
    this.lastSourceTime = 0;
    this.stageForgotCount = 0;
    this.barrageTimer = 0;
    this.barrageEntryCount = 0;
    this.barrageCount = 0;
    this.stanceHits = 0;
    this.stanceChecks = 0;
    this.jitterAccum = 0;
    this.jitterSamples = 0;
    this.lineTotal = 0;
    this.lineComplete = 0;
    this.forgotLines = 0;
    this.comboStreak = 0;
    this.maxCombo = 0;
    this.stagesCompleted = 0;
    this.lineRateBonus = 0;
    this.selfDoubtPending = false;
    this.lingerObserved = 0;
    this.prevHeading = null;
    this.hitDuringLine = false;
    this.barrageDuringLine = false;
    this.lastRating = null;
    this.lastRoundResult = null;
    this.pendingFacts = null;
    this.ratingSubmitted = false;
  }

  private beginRunInternal(events: SimEvent[]): void {
    this.resetRunState();
    this.state.phase = 'WAIT';
    this.state.boss.anxiety = S_BASE;
    this.waitExitTime = randRange(this.rng, WAIT_PICK_WINDOW, WAIT_MAX_TIME);
    this.emitWaitEnter(events);
  }

  /** G01/G07：WAIT 进入事件（L_AMB 自语 + 王座吱呀 + 平静音乐） */
  private emitWaitEnter(events: SimEvent[]): void {
    this.setPhase('WAIT', events);
    this.setMusic('calm', 0.3, events);
    events.push({ type: 'sound', sound: 'throneCreak' });
    const amb = pickLine('L_AMB', this.rng, 'calm', 0);
    events.push({ type: 'dialogue', lineId: amb.line?.id ?? 'L_AMB_001', pool: 'L_AMB', speaker: 'boss' });
    this.setBossAnim(this.state.boss, 'idleSway', events, true);
  }

  private pickScript(script: ScriptId, events: SimEvent[]): void {
    // mad 为 stretch 占位剧本：未开启时不接受选择
    if (script === 'mad' && !STRETCH_FLAGS.madScript) return;
    this.currentScript = this.findScript(script);
    this.state.boss.script = script;
    this.applyAnxiety([{ kind: 'script', script }], 1 / 60, events); // S03 剧本难度加成
    events.push({ type: 'sound', sound: 'paper' });
    // 反馈：玩家主动选本后 2s 内开演（不再干等到 10–12s）
    if (this.state.phase === 'WAIT') {
      this.waitExitTime = Math.min(this.waitExitTime, this.waitTimer + 2);
    }
  }

  private togglePause(events: SimEvent[]): void {
    if (this.state.phase === 'PAUSE') {
      this.setPhase(this.prevPhase, events); // G12 恢复
      this.emitPhaseMusic(events);
    } else {
      this.prevPhase = this.state.phase;
      this.setPhase('PAUSE', events); // G11
    }
  }

  private tickWait(input: TickInput, events: SimEvent[]): void {
    const dt = input.dt;
    this.waitTimer += dt;
    this.applyAnxiety([], dt, events); // R01 自然衰减
    // 12s 未选剧本 → 自动选默认剧本
    if (!this.currentScript && this.waitTimer >= WAIT_MAX_TIME) this.pickScript('dignity', events);
    // G02：最短保护 8s（waitExitTime ∈ [10,12] 已满足）→ SENSE
    if (this.currentScript && this.waitTimer >= this.waitExitTime) this.enterSense(events);
  }

  private enterSense(events: SimEvent[]): void {
    const boss = this.state.boss;
    this.setPhase('SENSE', events);
    this.setMusic('tense', 0.6, events);
    boss.innerState = nextBossState(boss.innerState, this.makeFlags({ inPerform: false })); // B01 IDLE→ALERT
    if (!this.firstGlimpseDone) {
      this.firstGlimpseDone = true;
      this.applyAnxiety([{ kind: 'firstGlimpse' }], 1 / 60, events); // S04 首见 +8（单次）
    }
    this.setBossAnim(boss, 'armorFiddle', events, true);
    events.push({ type: 'sound', sound: 'armorRattle' });
    events.push({ type: 'sound', sound: 'step' });
    this.stepTimer = 1.4;
  }

  private tickSense(input: TickInput, events: SimEvent[]): void {
    const dt = input.dt;
    const player = input.player;
    // S05 稳步逼近 / S06 犹豫
    const sources: AnxietySourceEvent[] = [];
    if (player.state === 'approaching' || player.state === 'engaging') {
      if (player.approachSpeed >= PLAYER_APPROACH_STEADY && player.approachSpeed <= PLAYER_APPROACH_MAX) {
        sources.push({ kind: 'steady', dt });
      } else if (player.approachSpeed < PLAYER_APPROACH_STEADY) {
        sources.push({ kind: 'hesitate', dt });
      }
    }
    this.applyAnxiety(sources, dt, events);
    // 脚步渐强（周期性）
    this.stepTimer -= dt;
    if (this.stepTimer <= 0) {
      this.stepTimer = 1.4;
      events.push({ type: 'sound', sound: 'step', rate: 1 + (1 - clamp(player.distanceToThrone / 40, 0, 1)) * 0.4 });
    }
    // G03：影子 <12m → PERFORM
    if (player.distanceToThrone < SENSE_TRIGGER_DIST) this.enterPerform(events);
  }

  private enterPerform(events: SimEvent[]): void {
    const boss = this.state.boss;
    this.setPhase('PERFORM', events);
    this.setMusic('tense', 0.7, events);
    boss.innerState = nextBossState(boss.innerState, this.makeFlags({ inPerform: true })); // B02 → PERFORM
    boss.script = this.currentScript?.id ?? 'dignity';
    boss.stageIndex = 0;
    boss.beatIndex = 0;
    boss.performMode = 'scripted';
    boss.recovering = false;
    this.setBossAnim(boss, 'standUp', events, true);
    events.push({ type: 'sound', sound: 'gong' }); // 开演锣
    // 第一幕系统提示（教操作；每轮一次，循环以 round===1 限定）
    if (this.state.round === 1 && !this.performHintShown) {
      this.performHintShown = true;
      events.push({ type: 'dialogue', lineId: 'L_HINT_001', pool: 'L_HINT', speaker: 'system' });
    }
    this.performTimer = 0;
    this.stageTimer = 0;
    this.beatElapsed = 0;
    this.roundStartAnxiety = boss.anxiety; // 本轮净变化基准
    this.stageForgotCount = 0;
  }

  private tickPerform(input: TickInput, events: SimEvent[]): void {
    const dt = input.dt;
    const boss = this.state.boss;
    // 打断标志每 tick 清零（B06 ①② 由本 tick 事件置位）
    this.hitDuringLine = false;
    this.barrageDuringLine = false;

    // G04：90s 强制收尾
    this.performTimer += dt;
    if (this.performTimer >= PERFORM_MAX_TIME) {
      this.toEvaluate(events);
      return;
    }

    // 弹幕调度（S07 +12/条，轮次上限；B06 ② 弹幕在 line beat 中刷新 → 打断）
    this.tickBarrage(dt, events);
    // 玩家命中通道（S08 +5 → hp 伤害 / B03 击倒 / B06 ① line 中命中 → 打断）
    this.tickPlayerHits(input, events);

    // 子行为（HIT/RECOVER/BREAK_CHARACTER/恐慌崩溃/捡剑）：占用 tick 则不推进 beat
    if (!this.tickSubStates(dt, events)) return;

    // 逼近焦虑源 + 自然衰减
    const sources: AnxietySourceEvent[] = [];
    if (input.player.approachSpeed >= PLAYER_APPROACH_STEADY && input.player.approachSpeed <= PLAYER_APPROACH_MAX) {
      sources.push({ kind: 'steady', dt });
    } else if (input.player.approachSpeed < PLAYER_APPROACH_STEADY && input.player.approachSpeed > 0) {
      sources.push({ kind: 'hesitate', dt });
    }
    this.applyAnxiety(sources, dt, events);

    // WASD 走位 → 位置 + A1 抖动采样
    this.tickBossMove(input.controls.move, dt);

    if (boss.performMode === 'freePlay') this.tickFreePlay(dt, input, events);
    else this.tickScripted(dt, input, events);

    // G04：累计击倒 ≥3 → 提前收尾
    if (boss.knockdownCount >= KNOCKDOWN_EARLY_END) this.toEvaluate(events);
  }

  /** 子行为计时；返回 false 表示本 tick 被占用（攻击判定冻结） */
  private tickSubStates(dt: number, events: SimEvent[]): boolean {
    const boss = this.state.boss;
    switch (boss.innerState) {
      case 'HIT': {
        this.hitTimer -= dt;
        if (this.hitTimer <= 0) {
          boss.innerState = nextBossState('HIT', this.makeFlags({ recoverDone: true })); // B04 → RECOVER
          this.recoverTimer = HAIR_TIDY_TIME;
          this.setBossAnim(boss, 'hairTidy', events, true);
          events.push({ type: 'sound', sound: 'armorRattle' });
        }
        return false;
      }
      case 'RECOVER': {
        this.recoverTimer -= dt;
        if (this.recoverTimer <= 0) {
          boss.innerState = nextBossState('RECOVER', this.makeFlags({ recoverDone: true })); // B05 → PERFORM
          boss.recovering = false;
          this.beatElapsed = 0; // 恢复当前 beat 重来
        }
        return false;
      }
      case 'BREAK_CHARACTER': {
        this.breakTimer -= dt;
        if (this.breakTimer <= 0) {
          boss.innerState = nextBossState('BREAK_CHARACTER', this.makeFlags({ breakDone: true })); // B07 → PERFORM
          this.enterFreePlay(events);
        }
        return false;
      }
      default:
        break;
    }
    // 恐慌崩溃：焦虑 100 → 跪地 2s（判定冻结）→ 回落 70
    if (isPanicBreakdown(boss.anxiety) && this.breakdownTimer <= 0) {
      this.breakdownTimer = PANIC_BREAKDOWN.kneelTime;
      this.setBossAnim(boss, 'kneelPanic', events, true);
      events.push({ type: 'sound', sound: 'breath' });
      events.push({ type: 'fx', fx: 'vignette', value: 0.6 });
      return false;
    }
    if (this.breakdownTimer > 0) {
      this.breakdownTimer -= dt;
      if (this.breakdownTimer <= 0) {
        boss.anxiety = afterBreakdown(); // 回落至 70
        boss.band = computeBand(boss.anxiety);
      }
      return false;
    }
    // 剑脱手（恐慌带 5%）：捡剑 1.2s 喜感节拍
    if (this.swordDropTimer > 0) {
      this.swordDropTimer -= dt;
      return false;
    }
    return true;
  }

  /** 弹幕调度：每 4s 一条，≤ 轮次上限（S07 +12/条；A4 证据 barrageCount） */
  private tickBarrage(dt: number, events: SimEvent[]): void {
    const max = ROUND_TABLE[clamp(this.state.round - 1, 0, MAX_ROUNDS - 1)].barrageMax;
    this.barrageTimer -= dt;
    if (this.barrageTimer > 0 || this.barrageEntryCount >= max) return;
    this.barrageTimer = BARRAGE_ACTIVE_WINDOW;
    this.barrageEntryCount += 1;
    this.barrageCount += 1;
    const text =
      BARRAGE_LINES.length > 0
        ? BARRAGE_LINES[(this.barrageEntryCount - 1) % BARRAGE_LINES.length].text
        : `L_BARRAGE 占位 ${this.barrageEntryCount}`;
    events.push({ type: 'barrage', text, duration: BARRAGE_ACTIVE_WINDOW });
    events.push({ type: 'sound', sound: 'barrageWhoosh' });
    this.applyAnxiety([{ kind: 'barrage' }], dt, events); // S07
    this.barrageDuringLine = this.currentBeatIsLine(); // B06 ②
  }

  /** 玩家命中通道：替身命中率 × 0.9 次/s 掷骰；命中 → S08 + hp 伤害（B03 击倒） */
  private tickPlayerHits(input: TickInput, events: SimEvent[]): void {
    const boss = this.state.boss;
    const table = ROUND_TABLE[clamp(this.state.round - 1, 0, MAX_ROUNDS - 1)];
    // 间隔计时器：~6.5s 一次命中判定（±20% 抖动）；首次 4s 缓冲给玩家反应
    this.playerHitTimer -= input.dt;
    if (this.playerHitTimer > 0) return;
    this.playerHitTimer = PLAYER_HIT_INTERVAL * randRange(this.rng, 0.8, 1.2);
    // 命中概率按轮次表（R1 55% → R4 70%）
    const hitChance = PLAYER_HIT_CHANCES[clamp(this.state.round - 1, 0, MAX_ROUNDS - 1)];
    if (this.rng() >= hitChance) {
      // 挥空：无伤害（替身 miss，不算 S11——那是 Boss 攻击落空）
      events.push({ type: 'sound', sound: 'swordSwing', volume: 0.4 });
      return;
    }
    // S08 命中 +5；boss.hp −= 轮次伤害
    boss.hp = Math.max(0, boss.hp - table.damage);
    this.applyAnxiety([{ kind: 'hit' }], input.dt, events);
    events.push({ type: 'sound', sound: 'impact' });
    events.push({ type: 'fx', fx: 'screenFlash', value: 0.5 });
    this.hitDuringLine = this.currentBeatIsLine(); // B06 ①
    // B03：hp ≤ 0 且击倒 <3 → HIT 倒地（hp 恢复至满）
    if (boss.hp <= 0 && boss.knockdownCount < KNOCKDOWN_EARLY_END && boss.innerState === 'PERFORM') {
      boss.knockdownCount += 1;
      this.roundKnockdowns += 1;
      boss.hp = BOSS_MAX_HP;
      boss.innerState = nextBossState('PERFORM', this.makeFlags({ hpZero: true })); // B03 → HIT
      boss.recovering = true;
      this.hitTimer = HIT_RECOVER_TIME;
      this.setBossAnim(boss, 'knockdown', events, true);
      events.push({ type: 'sound', sound: 'impact' });
      events.push({ type: 'fx', fx: 'screenFlash', value: 1 });
      this.beatElapsed = 0;
    }
  }

  /** 剧本模式：beat 推进 / 打断检测 / 攻击判定 / 阶段计时上限 */
  private tickScripted(dt: number, input: TickInput, events: SimEvent[]): void {
    const boss = this.state.boss;
    const script = this.currentScript ?? this.findScript(boss.script ?? 'dignity');
    const stage = script.stages[boss.stageIndex];
    if (!stage || stage.beats.length === 0) {
      this.toEvaluate(events); // 空剧本 → 立即收尾
      return;
    }

    // LMB 扳机：attack 节拍内按过左键才算出手
    if (input.controls.attackPressed && stage.beats[boss.beatIndex]?.type === 'attack') {
      this.attackPressedDuringBeat = true;
    }

    // 阶段计时上限（单阶段 30s）
    this.stageTimer += dt;
    if (this.stageTimer >= PERFORM_STAGE_TIME) {
      this.stageTimer = 0;
      this.beatElapsed = 0;
      if (boss.stageIndex + 1 < script.stages.length) {
        boss.stageIndex += 1;
        boss.beatIndex = 0;
        this.stagesCompleted += 1;
        this.relief(R_STAGE_DONE); // R03 阶段完成 −8
        this.stageForgotCount = 0;
        this.comboStreak = 0;
        return; // 下 tick 进入新阶段第一拍
      }
      this.stagesCompleted = script.stages.length;
      this.toEvaluate(events); // 最后一阶段超时 → 全本收尾
      return;
    }

    // 打断标志（B06 ①②③ 由本 tick 事件产生）
    const interrupts: DirectorInterrupts = {
      hitDuringLine: this.hitDuringLine,
      barrageDuringLine: this.barrageDuringLine,
      forgotCount: this.stageForgotCount,
    };
    const prevStage = boss.stageIndex;
    const prevBeat = boss.beatIndex;
    const prevBeatDef = stage.beats[prevBeat];
    const stance: DirectorStance = { pos: boss.pos, jitterRatio: this.currentJitterRatio() };

    this.beatElapsed += dt;
    const result = advanceBeat(script, prevStage, prevBeat, this.beatElapsed, stance, interrupts, this.rng);

    // 发布当前节拍到状态（HUD 节拍圈 / 3D 走位目标圈）
    const curBeatDef = stage.beats[boss.beatIndex];
    if (curBeatDef) {
      this.state.beat = {
        type: curBeatDef.type,
        duration: curBeatDef.duration,
        remaining: Math.max(0, curBeatDef.duration - this.beatElapsed),
        targetPos: curBeatDef.targetPos,
      };
    } else {
      this.state.beat = null;
    }

    if (result.broke) {
      // B06 打断 → BREAK_CHARACTER（S13 +15 / 带下限 61 / 剩余 ×0.8 / 威力·散射·落空上调）
      this.enterBreak(dt, events);
      return;
    }

    // 本 tick 完成的 beat 结算
    const advanced = result.stageIndex !== prevStage || result.beatIndex !== prevBeat;
    if (advanced && prevBeatDef) {
      if (prevBeatDef.type === 'attack') {
        // LMB 是攻击扳机：没按 → 空挥落空（S11）；按了 → 按导演质量结算命中/闪避
        const pressed = this.attackPressedDuringBeat;
        this.attackPressedDuringBeat = false;
        if (!pressed) {
          this.applyAnxiety([{ kind: 'miss' }], dt, events);
          events.push({ type: 'sound', sound: 'swordSwing' });
          this.comboStreak = 0;
        } else {
          this.resolveAttackOutcome(result.attackHit, dt, input, events);
        }
      } else if (prevBeatDef.type === 'move') this.resolveMoveStance(prevBeatDef);
      else if (prevBeatDef.type === 'vfx' && prevBeatDef.vfx) events.push({ type: 'fx', fx: prevBeatDef.vfx });
    }

    // 阶段推进（R03 阶段完成 −8）
    if (result.stageIndex > prevStage) {
      this.stagesCompleted = result.stageIndex;
      this.relief(R_STAGE_DONE);
      this.stageForgotCount = 0;
      this.comboStreak = 0;
    }

    // 同步索引 + 新 beat 起始钩子（line 选台词 / attack 起手动画）
    if (advanced) {
      boss.stageIndex = result.stageIndex;
      boss.beatIndex = result.beatIndex;
      this.beatElapsed = 0;
      this.onBeatStart(script, boss.stageIndex, boss.beatIndex, dt, events);
    }

    if (result.done) {
      // 全本完成（R04 −10）→ G04 收尾
      this.stagesCompleted = Math.max(this.stagesCompleted, script.stages.length);
      this.relief(R_SCRIPT_DONE);
      this.toEvaluate(events);
    }
  }

  /** attack beat 完成结算：恐慌带脱手 / S11 落空 / S09·S10 闪避（连击记账） */
  private resolveAttackOutcome(attackHit: boolean, dt: number, input: TickInput, events: SimEvent[]): void {
    const boss = this.state.boss;
    if (shouldDropSword(boss.band, this.rng)) {
      // 剑脱手 → 捡剑 1.2s 喜感节拍
      this.swordDropTimer = SWORD_DROP.pickupTime;
      this.setBossAnim(boss, 'pickUpSword', events, true);
      events.push({ type: 'sound', sound: 'swordDrop' });
      return;
    }
    if (!attackHit) {
      this.applyAnxiety([{ kind: 'miss' }], dt, events); // S11 落空 +2
      events.push({ type: 'sound', sound: 'swordSwing' });
      this.comboStreak = 0;
      return;
    }
    // 攻击命中时机 → 替身闪避判定（playerModel 输出）
    const q = input.player.dodgeTimingQuality;
    if (q === 1) {
      this.applyAnxiety([{ kind: 'perfectDodge' }], dt, events); // S09 +10
      events.push({ type: 'sound', sound: 'dodgeWhiff' });
    } else if (q === 0.5) {
      this.applyAnxiety([{ kind: 'normalDodge' }], dt, events); // S10 +3
      events.push({ type: 'sound', sound: 'dodgeWhiff' });
    } else {
      events.push({ type: 'sound', sound: 'swordSwing' }); // 未闪避：攻击掠过
    }
    this.comboStreak += 1;
    this.maxCombo = Math.max(this.maxCombo, this.comboStreak);
  }

  /** move beat 完成结算：站位容差（A1） */
  private resolveMoveStance(beat: Beat): void {
    this.stanceChecks += 1;
    if (stanceInTolerance(beat, this.state.boss.pos)) this.stanceHits += 1;
  }

  /** 新 beat 起始钩子 */
  private onBeatStart(script: ScriptDef, stageIndex: number, beatIndex: number, dt: number, events: SimEvent[]): void {
    const beat = script.stages[stageIndex]?.beats[beatIndex];
    this.attackPressedDuringBeat = false;
    if (!beat) return;
    switch (beat.type) {
      case 'line':
        this.onLineBeat(dt, events);
        break;
      case 'attack':
        this.setBossAnim(this.state.boss, 'attack', events, true);
        events.push({ type: 'sound', sound: 'swordSwing' });
        break;
      case 'vfx':
        if (beat.vfx) events.push({ type: 'fx', fx: beat.vfx });
        break;
      case 'move':
        break;
    }
  }

  /** line beat 起始：pickLine 掷骰（遗忘 → 静默 1.5s + S12 +6 + 60% L_PANIC 补白） */
  private onLineBeat(dt: number, events: SimEvent[]): void {
    const boss = this.state.boss;
    const scriptId = boss.performMode === 'freePlay' ? 'freePlay' : (boss.script ?? 'dignity');
    let pool = POOL_BY_SCRIPT[scriptId] ?? 'L_FREE';
    if (this.selfDoubtPending) {
      pool = 'L_SELFDOUBT'; // 失格结转：首句自我怀疑替换
      this.selfDoubtPending = false;
    }
    const pick = pickLine(pool, this.rng, boss.band, this.stageForgotCount);
    if (pick.forgot) {
      this.forgotLines += 1;
      this.stageForgotCount += 1;
      this.lineTotal += 1;
      this.applyAnxiety([{ kind: 'forgot' }], dt, events); // S12 +6
      events.push({ type: 'sound', sound: 'silence', volume: 0.4 });
      if (pick.fill && pick.line) {
        events.push({ type: 'dialogue', lineId: pick.line.id, pool: 'L_PANIC', speaker: pick.line.speaker });
      }
      return;
    }
    this.lineTotal += 1;
    if (pick.line) {
      this.lineComplete += 1;
      events.push({ type: 'dialogue', lineId: pick.line.id, pool, speaker: pick.line.speaker });
    } else {
      // 池为空：视作完整输出（engine 端解析文本/降级）
      this.lineComplete += 1;
      events.push({ type: 'dialogue', lineId: `${pool}_EMPTY`, pool, speaker: 'boss' });
    }
  }

  /** B06 打断：S13 / 带下限 / 剩余 ×0.8 / 威力·散射·落空 / seen +10 / freeplay 音乐 */
  private enterBreak(dt: number, events: SimEvent[]): void {
    const boss = this.state.boss;
    boss.innerState = nextBossState('PERFORM', this.makeFlags({ interrupt: true })); // B06 → BREAK_CHARACTER
    this.breakTimer = BREAK_CHARACTER_TIME;
    this.broke = true;
    this.applyAnxiety([{ kind: 'interrupt' }], dt, events); // S13 +15
    boss.anxiety = Math.max(boss.anxiety, BREAK_BAND_FLOOR);
    boss.band = computeBand(boss.anxiety);
    const remaining = Math.max(0, PERFORM_MAX_TIME - this.performTimer);
    this.freePlayTimer = remaining * BREAK_FREE_TIME; // 剩余剧本时间 ×0.8
    this.freePlayPower = randRange(this.rng, BREAK_POWER_MIN, BREAK_POWER_MAX); // 威力 ×[1.2–1.6]
    this.freePlayMissMult = BREAK_MISS_MULT; // 落空 ×1.5
    boss.seen = Math.min(100, boss.seen + SEEN_FREE_PLAY); // 观众席阴影
    this.setBossAnim(boss, 'breakCharacter', events, true);
    events.push({ type: 'fx', fx: 'lightSweep', value: BREAK_SPREAD_MULT }); // 灯光转暖（散射 ×2 视觉代理）
    events.push({ type: 'sound', sound: 'stringTremolo' });
    this.setMusic('freeplay', 0.5, events);
  }

  /** B07 → freePlay：L_FREE 台词 100% 完整 + 攻击循环，剩余时间播完即 G05 收尾 */
  private enterFreePlay(events: SimEvent[]): void {
    const boss = this.state.boss;
    boss.performMode = 'freePlay';
    boss.script = 'freePlay';
    this.freePlayLineTimer = 1;
    this.freePlayAttackTimer = 1.5;
    this.setPhase('PERFORM', events, 'freePlay'); // 广播 performMode 变更
  }

  private tickFreePlay(dt: number, input: TickInput, events: SimEvent[]): void {
    this.state.beat = null; // 自由发挥无剧本节拍
    // G05：出戏剩余时间播完 → EVALUATE
    this.freePlayTimer -= dt;
    if (this.freePlayTimer <= 0) {
      this.toEvaluate(events);
      return;
    }
    // 台词：每 ~3.5s 一句 L_FREE（100% 完整）
    this.freePlayLineTimer -= dt;
    if (this.freePlayLineTimer <= 0) {
      this.freePlayLineTimer = 3.5;
      const pick = pickLine('L_FREE', this.rng, this.state.boss.band, 0);
      if (pick.line) {
        events.push({ type: 'dialogue', lineId: pick.line.id, pool: 'L_FREE', speaker: pick.line.speaker });
      } else {
        events.push({ type: 'dialogue', lineId: 'L_FREE_EMPTY', pool: 'L_FREE', speaker: 'boss' });
      }
    }
    // 攻击：每 ~2.5s 一次（落空 ×1.5；威力高时仅完美闪避可躲）
    this.freePlayAttackTimer -= dt;
    if (this.freePlayAttackTimer <= 0) {
      this.freePlayAttackTimer = 2.5;
      if (shouldDropSword(this.state.boss.band, this.rng)) {
        this.swordDropTimer = SWORD_DROP.pickupTime;
        this.setBossAnim(this.state.boss, 'pickUpSword', events, true);
        events.push({ type: 'sound', sound: 'swordDrop' });
        return;
      }
      if (this.rng() < 0.35 * this.freePlayMissMult) {
        this.applyAnxiety([{ kind: 'miss' }], dt, events); // S11
        events.push({ type: 'sound', sound: 'swordSwing' });
        this.comboStreak = 0;
        return;
      }
      const q = input.player.dodgeTimingQuality;
      const dodged = q === 1 || (q === 0.5 && this.freePlayPower < 1.4);
      if (dodged) {
        this.applyAnxiety([q === 1 ? { kind: 'perfectDodge' } : { kind: 'normalDodge' }], dt, events);
        events.push({ type: 'sound', sound: 'dodgeWhiff' });
        this.comboStreak += 1;
        this.maxCombo = Math.max(this.maxCombo, this.comboStreak);
      } else {
        this.comboStreak = 0;
        events.push({ type: 'sound', sound: 'swordSwing' });
      }
    }
  }

  /** WASD 走位：移动 Boss + A1 抖动采样（航向突变 >0.6rad 记抖动） */
  private tickBossMove(move: Vector3, dt: number): void {
    const boss = this.state.boss;
    const len = Math.hypot(move.x, move.z);
    if (len > 0.01) {
      boss.pos.x = clamp(boss.pos.x + (move.x / len) * BOSS_MOVE_SPEED * dt, WORLD.roomBounds.min.x, WORLD.roomBounds.max.x);
      boss.pos.z = clamp(boss.pos.z + (move.z / len) * BOSS_MOVE_SPEED * dt, WORLD.roomBounds.min.z, WORLD.roomBounds.max.z);
      const heading = Math.atan2(move.z, move.x);
      this.jitterSamples += 1;
      if (this.prevHeading !== null && Math.abs(wrapAngle(heading - this.prevHeading)) > 0.6) {
        this.jitterAccum += 1;
      }
      this.prevHeading = heading;
    } else {
      this.prevHeading = null;
      this.jitterSamples += 1; // 静止也计入采样（平滑）
    }
  }

  // ============ 评分 / 日记 / 结局 ============

  /** G04/G05：计算评分 → A4 自动揭示 → EVALUATE（stats 持久化） */
  private toEvaluate(events: SimEvent[]): void {
    if (this.state.phase !== 'PERFORM') return;
    const boss = this.state.boss;
    const raw = this.computeRoundRating();
    this.lastRating = this.finalizeRating(raw, boss.seen);
    // 被看见度：完美轮 +10（cap 100）→ 重推 A4
    boss.seen = Math.min(100, boss.seen + (this.lastRating.verdict === 'perfect' ? SEEN_PERFECT_ROUND : 0));
    this.lastRating = this.finalizeRating(raw, boss.seen);

    // A4 自动揭示事件（evidence 文案由 RATING_AXES 解析，池空则省略）
    events.push({ type: 'rating', axis: 'remembered', stars: this.lastRating.axes.remembered, evidence: this.a4Evidence() });

    // B08 → EVALUATE
    boss.innerState = nextBossState('PERFORM', this.makeFlags({ inPerform: false })); // B08 → EVALUATE
    boss.recovering = false;
    this.setBossAnim(boss, 'idleSway', events, true);
    this.setPhase('EVALUATE', events);
    this.setMusic('calm', 0.3, events);
    events.push({ type: 'dialogue', lineId: 'L_EVAL_001', pool: 'L_EVAL', speaker: 'boss' });
    events.push({ type: 'sound', sound: 'paper' });

    // 持久化 stats：totalRounds++ / lastVerdicts push（notGoodEnoughCount 在日记时更新）
    this.stats.totalRounds += 1;
    this.stats.lastVerdicts.push(this.lastRating.verdict);
    if (this.stats.lastVerdicts.length > 10) this.stats.lastVerdicts.shift();
    events.push({ type: 'persist', key: 'stats', value: this.stats });

    this.evaluateTimer = 0;
    this.ratingSubmitted = false;
    this.state.beat = null;
  }

  /** 构建 RatingFacts（评分时点） */
  private computeRoundRating(): RatingResult {
    const boss = this.state.boss;
    const lineBase = this.lineTotal > 0 ? (this.lineComplete / this.lineTotal) * 100 : 100;
    const facts: RatingFacts = {
      stanceAccuracy: this.stanceChecks > 0 ? (this.stanceHits / this.stanceChecks) * 100 : 100,
      jitterRatio: this.currentJitterRatio(),
      lineCompleteness: Math.min(100, lineBase * (1 + this.lineRateBonus)), // 完美结转 +5% 完整率
      forgotLines: this.forgotLines,
      maxCombo: this.maxCombo,
      stagesCompleted: this.stagesCompleted,
      lingerTime: 0, // EVALUATE 期间由替身停留补充（提交时并入 seen）
      barrageCount: this.barrageCount,
    };
    this.pendingFacts = facts;
    const raw = computeRating(facts, ROUND_TABLE);
    return this.finalizeRating(raw, boss.seen);
  }

  private a4Evidence(): string | undefined {
    const axis = RATING_AXES.find((a) => a.id === 'remembered');
    const stars = this.lastRating?.axes.remembered;
    if (!axis || !stars) return undefined;
    return axis.thresholds[stars as 1 | 2 | 3 | 4 | 5];
  }

  private defaultFacts(): RatingFacts {
    return {
      stanceAccuracy: 100,
      jitterRatio: 0,
      lineCompleteness: 100,
      forgotLines: 0,
      maxCombo: 0,
      stagesCompleted: 0,
      lingerTime: 0,
      barrageCount: 0,
    };
  }

  private tickEvaluate(input: TickInput, events: SimEvent[]): void {
    const dt = input.dt;
    const boss = this.state.boss;
    this.evaluateTimer += dt;
    // R02 评估安抚 −4/s（幂等：纯 elapsed，最多 −40 不破 10）
    boss.anxiety = evaluateSoothing(boss.anxiety, dt, this.evaluateTimer);
    boss.band = computeBand(boss.anxiety);
    // A4 停留证据（替身轮末停留 2–4s）
    if (input.player.lingerTime > this.lingerObserved) this.lingerObserved = input.player.lingerTime;
    // G06：10s 倒计时到 → 系统自评提交
    if (this.evaluateTimer >= EVALUATE_COUNTDOWN) {
      this.submitRating(
        this.lastRating?.axes ?? { mobility: 3, delivery: 3, visual: 3, remembered: 3 },
        events,
      );
    }
  }

  /** G06：星级修正（R05–R08）→ 玩家 5★ 惊喜（R11）→ RoundResult → DIARY */
  private submitRating(stars: Record<RatingAxisId, number>, events: SimEvent[]): void {
    const boss = this.state.boss;
    if (this.state.phase !== 'EVALUATE' || !this.lastRating || this.ratingSubmitted) return;
    this.ratingSubmitted = true;

    // 停留证据并入被看见度（+lingerTime/40，cap 100）→ 重推 A4/总评
    boss.seen = Math.min(100, boss.seen + this.lingerObserved / 40);
    const finalRating = this.finalizeRating(this.lastRating, boss.seen);

    // R05–R08：按提交星级均值应用修正（5★ 需总评 ≥4.5 才 −15）
    const avg = (stars.mobility + stars.delivery + stars.visual + stars.remembered) / 4;
    if (avg >= 4.5) {
      this.relief(finalRating.total >= RATING_PERFECT ? R_RATING_5 : R_RATING_4);
    } else if (avg >= 3.5) {
      this.relief(R_RATING_4);
    } else if (avg >= 2.5) {
      this.relief(R_RATING_3);
    } else {
      boss.anxiety = clamp(boss.anxiety + R_RATING_LOW, 0, 100);
      boss.band = computeBand(boss.anxiety);
    }

    // R11 玩家 5★ 惊喜：总评 ≥4 时 30% 概率 −12 + L_P5STAR 困惑台词
    let playerScore: number | null = Math.round(avg);
    if (finalRating.total >= 4 && this.rng() < 0.3) {
      this.relief(R_PLAYER_5STAR);
      playerScore = 5;
      events.push({ type: 'dialogue', lineId: 'L_P5STAR_01', pool: 'L_P5STAR', speaker: 'boss' });
    }

    // 心态结转（完美 −5/+5% / 失格 +4/30% 首句自我怀疑）
    const carry = carryDown({ verdict: finalRating.verdict });
    this.lineRateBonus = Math.min(0.2, this.lineRateBonus + carry.lineRateDelta);
    this.selfDoubtPending = carry.selfDoubtFirstLine > 0 && this.rng() < carry.selfDoubtFirstLine;

    // RoundResult（facts.lingerTime 补停留证据）
    const facts = this.pendingFacts ?? this.defaultFacts();
    facts.lingerTime = Math.round(this.lingerObserved * 10) / 10;
    this.lastRoundResult = {
      round: this.state.round,
      script: boss.script ?? 'dignity',
      stagesCompleted: this.stagesCompleted,
      knockdowns: this.roundKnockdowns,
      broken: this.broke,
      axisRatings: finalRating.axes,
      totalRating: finalRating.total,
      verdict: finalRating.verdict,
      facts,
      anxietyDelta: Math.round((boss.anxiety - this.roundStartAnxiety) * 10) / 10,
      playerScore,
    };
    this.lastRating = finalRating;

    // 持久化：archive 生成条目
    events.push({ type: 'persist', key: 'archive', value: this.buildArchiveEntry() });

    // G06 → DIARY
    this.diaryTimer = 0;
    this.setPhase('DIARY', events);
    this.setMusic('calm', 0.3, events);
    events.push({ type: 'sound', sound: 'paper' });
  }

  /** 上轮实录生成档案条目（ARCHIVE_GEN_TEMPLATES 池空降级）；返回完整档案数组（预设 + 既有实录 + 新条目） */
  private buildArchiveEntry(): ArchiveEntry[] {
    const r = this.lastRoundResult;
    const idx = clamp(this.state.round - 1, 0, Math.max(0, ARCHIVE_GEN_TEMPLATES.length - 1));
    const template = ARCHIVE_GEN_TEMPLATES.length > 0 ? ARCHIVE_GEN_TEMPLATES[idx] : null;
    const name = template?.name ?? `第 ${this.state.round} 轮挑战者`;
    const verdictZh = r?.verdict === 'perfect' ? '完美' : r?.verdict === 'qualified' ? '合格' : '失格';
    const scriptName = r?.script ? (this.findScript(r.script)?.name ?? r.script) : 'dignity';
    const fill = (s: string): string =>
      s.replaceAll('{round}', String(this.state.round)).replaceAll('{script}', scriptName).replaceAll('{verdict}', verdictZh);
    const lines = template?.lines.map(fill) ?? [
      `剧本：${scriptName}`,
      `阶段 ${r?.stagesCompleted ?? 0}/3 · 总评 ${r ? r.totalRating.toFixed(1) : '-'} 星`,
      `击倒 ${r?.knockdowns ?? 0} 次${r?.broken ? ' · 中途出戏' : ''}`,
    ];
    const existing = (this.persist?.load<ArchiveEntry[]>('archive') ?? []).filter(
      (e) => e.id !== `L_ARCH_GEN_${this.state.round}`,
    );
    return [...existing, { id: `L_ARCH_GEN_${this.state.round}`, name, lines, generated: true }];
  }

  private tickDiary(input: TickInput, events: SimEvent[]): void {
    this.diaryTimer += input.dt;
    this.applyAnxiety([], input.dt, events); // R01 自然衰减
    // G07：8s 倒计时到 → 未选择自动跳过
    if (this.diaryTimer >= DIARY_COUNTDOWN) this.pickDiary(null, events);
  }

  /** G07：日记修正（R09/R10 + notGoodEnough 计数）→ 下一轮 / G08 结局 */
  private pickDiary(entryId: string | null, events: SimEvent[]): void {
    if (this.state.phase !== 'DIARY') return;
    const boss = this.state.boss;
    const entry: DiaryEntry | null = entryId ? (DIARY_ENTRIES.find((e) => e.id === entryId) ?? null) : null;
    // R09 正面 −10 / R10 负面 +8
    if (entry) {
      if (entry.mood === 'positive') this.relief(R_DIARY_POSITIVE);
      else if (entry.mood === 'negative') boss.anxiety = clamp(boss.anxiety + R_DIARY_NEGATIVE, 0, 100);
      if (entry.countsAsNotGoodEnough) this.stats.notGoodEnoughCount += 1; // 隐藏链前置计数（不可达）
      boss.band = computeBand(boss.anxiety);
    }
    events.push({ type: 'persist', key: 'diary', value: { round: this.state.round, picked: entryId } });
    events.push({ type: 'persist', key: 'stats', value: this.stats });

    // G08：结局判定（提前谢幕 > 第 4 轮结束）
    if (boss.knockdownCount >= KNOCKDOWN_EARLY_END) {
      this.enterEnding('early', events);
      return;
    }
    if (this.state.round >= MAX_ROUNDS) {
      this.enterEnding(boss.seen >= 60 ? 'curtainA' : 'curtainB', events);
      return;
    }
    // G07 → 下一轮
    this.nextRound(events);
  }

  /** G07 → WAIT：轮次升级（seen ×0.6 / 起始焦虑 = 基线 + S02 + 结转） */
  private nextRound(events: SimEvent[]): void {
    const boss = this.state.boss;
    this.state.round += 1;
    const table = ROUND_TABLE[clamp(this.state.round - 1, 0, MAX_ROUNDS - 1)];
    boss.seen = Math.round(boss.seen * table.seenCarry); // 被看见度轮末继承（R2+ ×0.6）
    const carryDelta = this.lastRoundResult ? carryDown(this.lastRoundResult).anxietyDelta : 0;
    boss.anxiety = clamp(table.anxietyBase + S_ROUND * (this.state.round - 1) + carryDelta, 0, 100); // S02 轮次疲劳
    boss.band = computeBand(boss.anxiety);

    // 轮次复位（剧本难度在 WAIT 选择时加 S03）
    this.currentScript = null;
    boss.script = null;
    boss.innerState = 'IDLE'; // B09 复位
    boss.stageIndex = 0;
    boss.beatIndex = 0;
    boss.performMode = 'scripted';
    boss.recovering = false;
    this.setBossAnim(boss, 'idleSway', events, true);
    this.waitTimer = 0;
    this.waitExitTime = randRange(this.rng, WAIT_PICK_WINDOW, WAIT_MAX_TIME);
    this.performTimer = 0;
    this.stageTimer = 0;
    this.beatElapsed = 0;
    this.evaluateTimer = 0;
    this.diaryTimer = 0;
    this.firstGlimpseDone = false;
    this.stepTimer = 0;
    this.broke = false;
    this.roundKnockdowns = 0;
    this.hitTimer = 0;
    this.recoverTimer = 0;
    this.breakTimer = 0;
    this.breakdownTimer = 0;
    this.swordDropTimer = 0;
    this.freePlayTimer = 0;
    this.freePlayLineTimer = 0;
    this.freePlayAttackTimer = 0;
    this.freePlayMissMult = 1;
    this.freePlayPower = 1.2;
    this.lastSourceTime = 0;
    this.stageForgotCount = 0;
    this.barrageTimer = 0;
    this.barrageEntryCount = 0;
    this.barrageCount = 0;
    this.stanceHits = 0;
    this.stanceChecks = 0;
    this.jitterAccum = 0;
    this.jitterSamples = 0;
    this.lineTotal = 0;
    this.lineComplete = 0;
    this.forgotLines = 0;
    this.comboStreak = 0;
    this.maxCombo = 0;
    this.stagesCompleted = 0;
    this.lingerObserved = 0;
    this.prevHeading = null;
    this.lastRating = null;
    this.lastRoundResult = null;
    this.pendingFacts = null;
    this.ratingSubmitted = false;
    this.emitWaitEnter(events);
  }

  /** G08 → ENDING_NORMAL：curtainA（seen≥60）/ curtainB / early（击倒 3 次） */
  private enterEnding(variant: EndingVariant, events: SimEvent[]): void {
    this.stats.seenEndings.push(variant);
    events.push({ type: 'persist', key: 'stats', value: this.stats });
    this.setPhase('ENDING_NORMAL', events);
    this.setMusic('ending', 0.4, events);
    this.setBossAnim(this.state.boss, 'bow', events, true);
    events.push({ type: 'dialogue', lineId: 'L_END_N_001', pool: 'L_END_N', speaker: 'boss' });
  }
}
