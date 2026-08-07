// core/simulation/Simulation.ts — V2 模拟编排器（FSM + 焦虑 + 剧本执行 + 替身攻防）

import {
  A1_JITTER, A1_STANCE_HIT, A2_COMPLETENESS, A4_SEEN_5STAR, BAND_EFFECTS, BAND_NERVOUS_MIN,
  BAND_PANIC_MIN, BAND_PROMPTS, BAND_SHAKY_MIN, BOSS_MAX_HP, BREAK_BAND_FLOOR,
  BREAK_CHARACTER_TIME, BREAK_ON_BARRAGE, BREAK_ON_FORGET_TWICE, BREAK_ON_HIT,
  CARRY_FAIL_ANXIETY, CARRY_FAIL_SELFDOUBT, CARRY_PERFECT_ANXIETY, CARRY_PERFECT_LINE,
  COMBO_A3, DEGRADE_PANIC_BROKEN, DEGRADE_PANIC_FORGET, DEGRADE_PANIC_RATE,
  DEGRADE_SHAKY_FORGET, DEGRADE_SHAKY_RATE, DEGRADE_SHAKY_STAMMER, DIARY_COUNTDOWN,
  EVALUATE_COUNTDOWN, FIXED_DT, HIT_RECOVER_TIME, KNOCKDOWN_EARLY_END, MAX_ROUNDS, PANIC_DROP,
  PANIC_FILL_CHANCE, PANIC_KNEEL_TIME, PERFORM_MAX_TIME, PLAYER_HIT_CHANCES,
  RATING_PERFECT, RATING_QUALIFIED, R_DECAY, R_DECAY_DELAY, R_DIARY_NEGATIVE,
  R_DIARY_POSITIVE, R_EVALUATE, R_EVALUATE_CAP, R_EVALUATE_FLOOR, R_PLAYER_5STAR,
  R_RATING_3, R_RATING_4, R_RATING_5, R_RATING_LOW, R_SCRIPT_DONE, R_STAGE_DONE,
  RHYTHM_MISS_PENALTY_ANXIETY, RHYTHM_PERFECT_BONUS_ANXIETY, ROUND_TABLE, S_BARRAGE,
  S_BASE, S_FIRST_GLIMPSE, S_FORGOT, S_HESITATE, S_HIT, S_INTERRUPT, S_MISS,
  S_NORMAL_DODGE, S_PERFECT_DODGE, S_ROUND, S_SCRIPT_DIFFICULTY, S_STEADY_APPROACH,
  SEEN_FREE_PLAY, SEEN_PERFECT_ROUND, STRETCH_FLAGS, SWORD_DROP_CHANCE,
  VIEWERS_BASE, VIEWERS_PER_ROUND, VIEWERS_PER_SEEN, VIEWERS_RATING_BONUS, WAIT_MAX_TIME,
  WAIT_MIN_TIME,
} from '../constants';
import type {
  AnxietyBand, AttackJudgement, Beat, BeatType, BossState, DialogueLine, EndingVariant,
  GamePhase, PersistedStats, PlayerPresence, RatingAxisId, RatingFacts, RoundResult,
  ScriptDef, TickInput, UiCommand, Vector3, Verdict,
} from '../types';import { LINE_POOLS } from '../data/lines';
import { SCRIPTS } from '../data/scripts';
import { RATING_AXES } from '../data/ratingAxes';
import { DIARY_ENTRIES } from '../data/diary';
import { WORLD } from '../world/world';
import { clamp, dampAngle, dist2, mulberry32, pick } from '../math';
import * as playerModel from './playerModel';
import type { SimEvent } from './events';

export interface BeatInfo {
  type: BeatType;
  duration: number;
  remaining: number;
  targetPos?: Vector3;
}

export interface SimState {
  phase: GamePhase;
  round: number;
  runActive: boolean;
  boss: BossState;
  player: PlayerPresence;
  beat: BeatInfo | null;
  script: ScriptDef | null;
  lastVerdict: Verdict | null;
  facts: RatingFacts;
  stanceReward: number;         // V2：站位奖励（引擎读取 → 判定窗口倍率）
}

export interface StoragePort {
  load<T>(key: string): T | null;
  save(key: string, value: unknown): void;
}

export interface SimApi {
  getState(): SimState;
  update(input: TickInput): SimEvent[];
  resetRun(): void;
  beginRun(): SimEvent[];
}

const EMPTY_FACTS: RatingFacts = {
  stanceAccuracy: 0,
  jitterRatio: 0,
  lineCompleteness: 0,
  forgotLines: 0,
  maxCombo: 0,
  perfectCount: 0,
  stagesCompleted: 0,
  lingerTime: 0,
  barrageCount: 0,
};

function freshBoss(): BossState {
  return {
    id: 'boss',
    innerState: 'IDLE',
    pos: { x: 0, y: 0, z: 1.4 },
    rot: { x: 0, y: 0, z: 0 },
    facingYaw: 0,
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
  };
}

function freshState(): SimState {
  return {
    phase: 'MENU',
    round: 1,
    runActive: false,
    boss: freshBoss(),
    player: playerModel.sample({ round: 1, phaseTime: 0, phase: 'MENU', boss: freshBoss(), barrageActive: false }),
    beat: null,
    script: null,
    lastVerdict: null,
    facts: { ...EMPTY_FACTS },
    stanceReward: 0,
  };
}

const DEFAULT_STATS: PersistedStats = {
  totalRounds: 0,
  notGoodEnoughCount: 0,
  seenEndings: [],
  lastVerdicts: [],
  bestCombo: 0,
  perfectTotal: 0,
  viewerPeak: 0,
};

export class Simulation implements SimApi {
  private state = freshState();
  private storage: StoragePort;
  private rand = mulberry32(20260807);
  private phaseTime = 0;
  private beatIdx = -1;
  private beatTime = 0;
  private firstGlimpseDone = false;
  private lastSourceAt = 0;
  private stanceHits = 0;
  private stanceTargets = 0;
  private stanceReward = 0;
  private moveFrames = 0;
  private sharpTurns = 0;
  private lastMoveX = 0;
  private lastMoveZ = 0;
  private rhythmPerfect = 0;
  private rhythmMisses = 0;
  private rhythmMaxCombo = 0;
  private rating: Record<RatingAxisId, number> = { mobility: 0, delivery: 0, visual: 0, remembered: 0 };
  private totalRating = 0;
  private verdict: Verdict = 'fail';
  private notGoodEnoughRun = 0;
  private wasAttacking = false;
  private windupDodged = false;
  private stageForgetCount = 0;
  private linesAttempted = 0;
  private linesCompleted = 0;
  private runStats: PersistedStats;
  private viewers = VIEWERS_BASE;
  private endChoiceAsked = false;
  private hiddenAsked = false;
  private evaluateDone = false;
  private diaryDone = false;
  private lastBarrageBreak = false;
  private pausedFrom: GamePhase = 'PERFORM';
  private lineBonusCarry = 0;
  private freePlayBeats: Beat[] = [];
  private diaryPool = [...DIARY_ENTRIES];

  constructor(storage: StoragePort) {
    this.storage = storage;
    this.runStats = { ...DEFAULT_STATS, ...(storage.load<Partial<PersistedStats>>('stats') ?? {}) };
  }

  getState(): SimState {
    return this.state;
  }

  resetRun(): void {
    this.state = freshState();
    this.phaseTime = 0;
    this.beatIdx = -1;
    this.beatTime = 0;
    this.firstGlimpseDone = false;
    this.stanceHits = 0;
    this.stanceTargets = 0;
    this.stanceReward = 0;
    this.rhythmPerfect = 0;
    this.rhythmMisses = 0;
    this.rhythmMaxCombo = 0;
    this.rating = { mobility: 0, delivery: 0, visual: 0, remembered: 0 };
    this.totalRating = 0;
    this.verdict = 'fail';
    this.notGoodEnoughRun = 0;
    this.wasAttacking = false;
    this.windupDodged = false;
    this.stageForgetCount = 0;
    this.linesAttempted = 0;
    this.linesCompleted = 0;
    this.viewers = VIEWERS_BASE;
    this.endChoiceAsked = false;
    this.hiddenAsked = false;
    this.evaluateDone = false;
    this.diaryDone = false;
    this.lastBarrageBreak = false;
    this.lineBonusCarry = 0;
    this.freePlayBeats = [];
    this.diaryPool = [...DIARY_ENTRIES];
  }

  beginRun(): SimEvent[] {
    this.resetRun();
    const st = this.state;
    st.runActive = true;
    st.phase = 'WAIT';
    st.boss.innerState = 'IDLE';
    return [
      { type: 'phase', phase: 'WAIT' },
      { type: 'dialogue', lineId: 'L_SYS_01', text: '直播间：观众已连接。', speaker: 'system' },
      { type: 'dialogue', lineId: 'L_INTRO_01', text: '……奇怪。明明只是排练。', speaker: 'boss' },
      { type: 'dialogue', lineId: 'L_INTRO_02', text: '是谁打开了摄像头？', speaker: 'boss' },
      { type: 'sound', kind: 'throneCreak' },
      { type: 'viewers', count: this.viewers },
    ];
  }

  update(input: TickInput): SimEvent[] {
    const events: SimEvent[] = [];
    const st = this.state;
    const ui = input.ui;

    // ============ 命令（边沿） ============
    if (ui) this.handleCommand(ui, events);

    if (st.phase === 'PAUSE' || st.phase === 'MENU') return events;

    const dt = input.dt;
    this.phaseTime += dt;
    this.state.stanceReward = this.stanceReward;

    // 替身采样
    st.player = playerModel.sample({
      round: st.round,
      phaseTime: this.phaseTime,
      phase: st.phase,
      boss: st.boss,
      barrageActive: st.player.barrageActive,
    });

    // ============ 焦虑 ============
    this.tickAnxiety(input, events);

    // ============ 节奏反馈（引擎注入） ============
    if (input.rhythm) this.applyRhythm(input.rhythm, events);

    switch (st.phase) {
      case 'WAIT':
        this.tickWait(input, events);
        break;
      case 'SENSE':
        this.tickSense(events);
        break;
      case 'PERFORM':
        this.tickPerform(input, events);
        break;
      case 'EVALUATE':
        this.tickEvaluate(input.dt, events);
        break;
      case 'DIARY':
        this.tickDiary(events);
        break;
      case 'ENDING_NORMAL':
      case 'ENDING_HIDDEN':
        this.tickEnding(events);
        break;
      default:
        break;
    }

    // 走位（WAIT/SENSE/PERFORM 可动）
    if (st.phase === 'WAIT' || st.phase === 'SENSE' || st.phase === 'PERFORM') {
      this.applyMove(input.controls.move, dt);
    }

    this.updateViewers(events);
    return events;
  }

  // ============ 命令 ============
  private handleCommand(ui: UiCommand, events: SimEvent[]): void {
    const st = this.state;
    switch (ui.kind) {
      case 'startRun':
      case 'restartRun':
        if (st.phase === 'MENU' || st.phase === 'ENDING_NORMAL' || st.phase === 'ENDING_HIDDEN') {
          events.push(...this.beginRun());
        }
        break;
      case 'quitToTitle':
        this.resetRun();
        events.push({ type: 'phase', phase: 'MENU' });
        break;
      case 'pauseToggle':
        if (st.phase !== 'PAUSE') {
          this.pausedFrom = st.phase;
          st.phase = 'PAUSE';
          events.push({ type: 'phase', phase: 'PAUSE' });
        } else {
          st.phase = this.pausedFrom;
          events.push({ type: 'phase', phase: this.pausedFrom });
        }
        break;
      case 'scriptPick':
        if (st.phase === 'WAIT') {
          const def = SCRIPTS[ui.script];
          st.script = def;
          st.boss.script = ui.script;
          st.boss.performMode = 'scripted';
          st.boss.anxiety = clamp(st.boss.anxiety + S_SCRIPT_DIFFICULTY[ui.script], 0, 100);
          events.push({ type: 'dialogue', lineId: 'L_SYS_02', text: `剧本已选择：${def.name}。检测到摄像头开启。`, speaker: 'system' });
          events.push({ type: 'sound', kind: 'paper' });
          this.enterPhase('SENSE', events);
        }
        break;
      case 'ratingSubmit': {
        if (st.phase !== 'EVALUATE') break;
        this.rating = { ...ui.stars };
        this.finishEvaluate(events);
        break;
      }
      case 'diaryPick': {
        if (st.phase !== 'DIARY' || !ui.entryId) break;
        const entry = this.diaryPool.find((d) => d.id === ui.entryId);
        this.applyDiary(entry ? entry.mood : 'neutral', entry?.countsAsNotGoodEnough ?? false, entry?.id ?? null, events);
        break;
      }
      case 'diaryCustom': {
        if (st.phase !== 'DIARY') break;
        if (!STRETCH_FLAGS.playerTyping) break;
        const text = ui.text.trim();
        if (text.length === 0) break;
        const saved = this.storage.load<{ id: string; text: string }[]>('diary') ?? [];
        saved.push({ id: `custom_${saved.length + 1}`, text });
        this.storage.save('diary', saved);
        this.applyDiary('neutral', false, null, events);
        break;
      }
      case 'dialogueChoice':
        if (st.phase === 'ENDING_NORMAL' && this.endChoiceAsked && ui.choice === 'B') {
          if (STRETCH_FLAGS.hiddenEnding && st.boss.script === 'mad' && this.notGoodEnoughRun >= 2) {
            this.runStats.seenEndings.push('hidden');
            events.push({ type: 'persist', key: 'stats', value: this.runStats });
            events.push({ type: 'ending', variant: 'hidden', stats: { ...this.runStats } });
            events.push({ type: 'dialogue', lineId: 'L_END_HIDDEN', text: '你选择毁掉舞台。灯碎了，弹幕却疯了一样刷屏——今晚，你终于被所有人记住了。', speaker: 'system' });
            this.enterPhase('ENDING_HIDDEN', events);
          }
        }
        break;
      case 'barrageToggle':
      case 'barrageDensity':
      case 'soundToggle': {
        const settings = this.storage.load<Record<string, unknown>>('settings') ?? {};
        if (ui.kind === 'barrageToggle') settings.barrageEnabled = ui.enabled;
        else if (ui.kind === 'soundToggle') settings.soundEnabled = ui.enabled;
        else settings.barrageDensity = ui.density;
        this.storage.save('settings', settings);
        break;
      }
      default:
        break;
    }
  }

  // ============ 阶段切换 ============
  private enterPhase(phase: GamePhase, events: SimEvent[]): void {
    this.state.phase = phase;
    this.phaseTime = 0;
    this.beatIdx = -1;
    this.beatTime = 0;
    events.push({ type: 'phase', phase });
    if (phase === 'EVALUATE') {
      this.state.boss.innerState = 'EVALUATE';
      this.state.boss.anim = 'hairTidy';
    }
  }

  // ============ WAIT ============
  private tickWait(input: TickInput, events: SimEvent[]): void {
    const st = this.state;
    if (this.phaseTime > WAIT_MIN_TIME) {
      st.boss.anxiety = clamp(st.boss.anxiety + S_HESITATE * input.dt, 0, 100);
      this.lastSourceAt = 0;
    }
    if (this.phaseTime > WAIT_MAX_TIME) {
      st.script = null;
      st.boss.script = null;
      st.boss.performMode = 'freePlay';
      events.push({ type: 'dialogue', lineId: 'L_SYS_03', text: '录制中……你没有选剧本，观众开始起哄。', speaker: 'system' });
      events.push({ type: 'sound', kind: 'barrageWhoosh' });
      this.enterPhase('SENSE', events);
    }
  }

  // ============ SENSE ============
  private tickSense(events: SimEvent[]): void {
    const st = this.state;
    if (!this.firstGlimpseDone) {
      this.firstGlimpseDone = true;
      st.boss.anxiety = clamp(st.boss.anxiety + S_FIRST_GLIMPSE, 0, 100);
      this.lastSourceAt = 0;
      events.push({ type: 'sound', kind: 'heartbeat' });
    }
    // 稳步逼近压力
    st.boss.anxiety = clamp(st.boss.anxiety + S_STEADY_APPROACH * FIXED_DT, 0, 100);
    // 影子踏上舞台前区 → 开演；最迟 7s 强切
    const reachedStage = st.player.pos.z <= 3.5 || st.player.distanceToThrone <= 6;
    if (reachedStage || this.phaseTime > 7) {
      this.enterPhase('PERFORM', events);
      st.boss.innerState = 'PERFORM';
      st.boss.anim = 'standUp';
      events.push({ type: 'dialogue', lineId: 'L_INTRO_03', text: '嘘——观众上线了。', speaker: 'system' });
      events.push({ type: 'sound', kind: 'gong' });
      this.beginScript(events);
    }
  }

  // ============ 剧本执行 ============
  private beginScript(events: SimEvent[]): void {
    const st = this.state;
    if (!st.script) {
      const markers = WORLD.stageMarkers;
      this.freePlayBeats = [
        { type: 'move', duration: 5, targetPos: markers[0], tolerance: 1.1 },
        { type: 'attack', duration: 5, power: 1, rhythm: { style: 'dignity', targetCount: 3, bpm: 72 } },
        { type: 'move', duration: 5, targetPos: markers[1], tolerance: 1.1 },
        { type: 'attack', duration: 5, power: 1, rhythm: { style: 'dignity', targetCount: 3, bpm: 72 } },
        { type: 'move', duration: 5, targetPos: markers[3], tolerance: 1.1 },
        { type: 'attack', duration: 6, power: 1, rhythm: { style: 'dignity', targetCount: 4, bpm: 78 } },
      ];
      this.stanceReward = 0;
      this.startBeat(0, events);
      return;
    }
    this.startBeat(0, events);
  }

  private stageBeats(): Beat[] {
    const st = this.state;
    if (st.script) {
      const stage = st.script.stages[st.boss.stageIndex];
      return stage ? stage.beats : [];
    }
    return this.freePlayBeats;
  }

  private startBeat(index: number, events: SimEvent[]): void {
    const beats = this.stageBeats();
    if (index >= beats.length) {
      this.stageDone(events);
      return;
    }
    this.beatIdx = index;
    this.beatTime = 0;
    const beat = beats[index];
    const st = this.state;
    st.boss.beatIndex = index;
    st.beat = { type: beat.type, duration: beat.duration, remaining: beat.duration, targetPos: beat.targetPos };
    events.push({ type: 'beat', beat: st.beat });
    switch (beat.type) {
      case 'move': {
        this.stanceTargets += 1;
        break;
      }
      case 'line': {
        this.playLine(beat, events);
        break;
      }
      case 'attack': {
        this.stanceReward = 0; // 走位奖励只服务一组谱
        events.push({ type: 'sound', kind: 'swordSwing' });
        break;
      }
      case 'vfx': {
        events.push({ type: 'fx', fx: beat.vfx ?? 'lightSweep', strength: 0.7 });
        events.push({ type: 'sound', kind: 'stringTremolo' });
        break;
      }
      default:
        break;
    }
  }

  private playLine(beat: Beat, events: SimEvent[]): void {
    const st = this.state;
    const pool = LINE_POOLS[st.boss.script ?? 'dignity'] ?? LINE_POOLS.dignity;
    const base = beat.lineId ? pool.find((l) => l.id === beat.lineId) : null;
    const fallback = pick(this.rand, pool);
    const line: DialogueLine = base ?? fallback;
    const band = st.boss.band;
    this.linesAttempted += 1;
    let degraded: DialogueLine | null = null;

    if (band === 'shaky' && this.rand() < DEGRADE_SHAKY_RATE) {
      if (this.rand() < DEGRADE_SHAKY_FORGET) {
        degraded = this.forgetLine(events);
      } else if (this.rand() < DEGRADE_SHAKY_STAMMER) {
        degraded = { ...line, text: line.text.replace(/(。|！|？)/, '……$1') };
      }
    } else if (band === 'panic' && this.rand() < DEGRADE_PANIC_RATE) {
      if (this.rand() < DEGRADE_PANIC_FORGET) {
        degraded = this.forgetLine(events);
      } else if (this.rand() < DEGRADE_PANIC_BROKEN) {
        this.breakCharacter(events);
        degraded = { ...line, text: '（台词崩了）' };
      }
    }

    if (degraded) {
      events.push({
        type: 'dialogue',
        lineId: degraded.id,
        text: degraded.text,
        speaker: degraded.speaker,
        pool: degraded.id.startsWith('L_PANIC') ? 'L_PANIC' : undefined,
      });
    } else {
      this.linesCompleted += 1;
      events.push({ type: 'dialogue', lineId: line.id, text: line.text, speaker: line.speaker });
    }
  }

  private forgetLine(events: SimEvent[]): DialogueLine | null {
    const st = this.state;
    st.boss.anxiety = clamp(st.boss.anxiety + S_FORGOT, 0, 100);
    this.lastSourceAt = 0;
    st.facts.forgotLines += 1;
    this.stageForgetCount += 1;
    events.push({ type: 'sound', kind: 'silence' });
    let out: DialogueLine | null = null;
    if (this.rand() < PANIC_FILL_CHANCE) {
      out = pick(this.rand, LINE_POOLS.panic);
    }
    if (this.stageForgetCount >= 2 && BREAK_ON_FORGET_TWICE) {
      this.breakCharacter(events);
    }
    if (!out) {
      out = { id: 'L_SILENCE', text: '……', speaker: 'boss' };
    }
    return out;
  }

  private breakCharacter(events: SimEvent[]): void {
    const st = this.state;
    st.boss.innerState = 'BREAK_CHARACTER';
    st.boss.anim = 'breakCharacter';
    st.boss.anxiety = clamp(st.boss.anxiety + S_INTERRUPT, 0, 100);
    st.boss.anxiety = Math.max(st.boss.anxiety, BREAK_BAND_FLOOR);
    this.lastSourceAt = 0;
    events.push({ type: 'bossAnim', anim: 'breakCharacter' });
    events.push({ type: 'sound', kind: 'swordDrop' });
  }

  private stageDone(events: SimEvent[]): void {
    const st = this.state;
    const script = st.script;
    if (!script) {
      this.finishPerform(events);
      return;
    }
    if (st.boss.stageIndex + 1 >= script.stages.length) {
      this.finishPerform(events);
      return;
    }
    st.boss.stageIndex += 1;
    st.boss.beatIndex = 0;
    st.facts.stagesCompleted += 1;
    st.boss.anxiety = clamp(st.boss.anxiety - R_STAGE_DONE, 0, 100);
    this.lastSourceAt = 0;
    events.push({ type: 'fx', fx: 'lightSweep', strength: 0.5 });
    this.startBeat(0, events);
  }

  private finishPerform(events: SimEvent[]): void {
    const st = this.state;
    st.boss.anxiety = clamp(st.boss.anxiety - R_SCRIPT_DONE, 0, 100);
    this.lastSourceAt = 0;
    if (st.boss.performMode === 'freePlay') {
      st.boss.seen = clamp(st.boss.seen + SEEN_FREE_PLAY, 0, 100);
    }
    st.facts.maxCombo = Math.max(st.facts.maxCombo, this.rhythmMaxCombo);
    st.facts.perfectCount += this.rhythmPerfect;
    st.facts.stanceAccuracy = this.stanceTargets > 0 ? (this.stanceHits / this.stanceTargets) * 100 : 0;
    st.facts.jitterRatio = this.moveFrames > 0 ? (this.sharpTurns / this.moveFrames) * 100 : 0;
    st.facts.lineCompleteness = Math.min(100, (this.linesAttempted > 0 ? (this.linesCompleted / this.linesAttempted) * 100 : 100) + this.lineBonusCarry * 100);
    st.beat = null;
    events.push({ type: 'beat', beat: null });
    events.push({ type: 'rhythmComplete', perfectCount: this.rhythmPerfect, maxCombo: this.rhythmMaxCombo, misses: this.rhythmMisses });
    this.enterPhase('EVALUATE', events);
  }

  // ============ PERFORM ============
  private tickPerform(input: TickInput, events: SimEvent[]): void {
    const st = this.state;
    if (st.phase !== 'PERFORM') return;
    this.handleShadowAttack(input, events);
    if (st.phase !== 'PERFORM') return;

    const beats = this.stageBeats();
    if (this.beatIdx >= beats.length) {
      this.finishPerform(events);
      return;
    }
    if (this.beatIdx < 0) {
      this.startBeat(0, events);
      return;
    }
    const beat = beats[this.beatIdx];
    const info = st.beat;
    if (!info) return;

    // 出戏恢复（BREAK_CHARACTER 0.5s 后继续）
    if (st.boss.innerState === 'BREAK_CHARACTER') {
      st.boss.breakdownTimer += input.dt;
      if (st.boss.breakdownTimer >= BREAK_CHARACTER_TIME) {
        st.boss.innerState = 'PERFORM';
        st.boss.breakdownTimer = 0;
      }
      return;
    }

    // 命中恢复
    if (st.boss.innerState === 'RECOVER' || (st.boss.innerState === 'HIT' && st.boss.breakdownTimer >= PANIC_KNEEL_TIME)) {
      st.boss.breakdownTimer += input.dt;
      if (st.boss.breakdownTimer >= (st.boss.innerState === 'RECOVER' ? HIT_RECOVER_TIME : PANIC_KNEEL_TIME)) {
        st.boss.innerState = 'PERFORM';
        st.boss.breakdownTimer = 0;
      }
      return;
    }

    this.beatTime += input.dt;
    info.remaining = Math.max(0, info.duration - this.beatTime);

    switch (beat.type) {
      case 'move': {
        if (info.targetPos) {
          const d = dist2(st.boss.pos.x, st.boss.pos.z, info.targetPos.x, info.targetPos.z);
          if (d <= (beat.tolerance ?? 0.9)) {
            this.stanceHits += 1;
            this.stanceReward = Math.min(1, this.stanceReward + 0.2);
            events.push({ type: 'fx', fx: 'dust', strength: 0.4 });
            events.push({ type: 'sound', kind: 'step' });
            this.nextBeat(events);
            return;
          }
        }
        break;
      }
      case 'line': {
        if (BREAK_ON_BARRAGE && input.barrageBurst && !this.lastBarrageBreak) {
          this.lastBarrageBreak = true;
          this.breakCharacter(events);
          events.push({ type: 'dialogue', lineId: 'L_BREAK', text: '（弹幕太密了，你被吓到出戏）', speaker: 'system' });
        }
        break;
      }
      default:
        break;
    }

    if (this.beatTime >= beat.duration) this.nextBeat(events);
    if (this.phaseTime > PERFORM_MAX_TIME) this.finishPerform(events);
  }

  private nextBeat(events: SimEvent[]): void {
    this.lastBarrageBreak = false;
    this.startBeat(this.beatIdx + 1, events);
  }

  // ============ 替身攻防 ============
  private handleShadowAttack(input: TickInput, events: SimEvent[]): void {
    const st = this.state;
    const player = st.player;

    // 前摇反制：windup 中按下（边沿）闪避；完美窗口 0.55+（+10），过早按普通闪避（+3）。
    // 不设 windup 上界：最后一帧按下与出招同帧时仍算成功反制（避免 1 帧竞态）。
    const pressEdge = input.controls.attackPressed && !input.controls.attackHeld;
    if (pressEdge && player.windup > 0.3 && !this.wasAttacking) {
      if (!this.windupDodged) {
        this.windupDodged = true;
        st.player.dodgeCount += 1;
        const perfect = player.windup >= 0.55;
        st.player.dodgeTimingQuality = perfect ? 1 : 0.5;
        st.boss.anxiety = clamp(st.boss.anxiety + (perfect ? S_PERFECT_DODGE : S_NORMAL_DODGE), 0, 100);
        this.lastSourceAt = 0;
        events.push({ type: 'sound', kind: 'dodgeWhiff' });
        if (perfect) events.push({ type: 'bossAnim', anim: 'windup' });
      }
    }
    if (player.windup < 0.3) this.windupDodged = false;

    // 出招命中结算（边沿）
    if (player.attacking && !this.wasAttacking) {
      if (!this.windupDodged) {
        const chance = PLAYER_HIT_CHANCES[Math.min(st.round, MAX_ROUNDS) - 1];
        if (this.rand() < chance) {
          const table = ROUND_TABLE[Math.min(st.round, MAX_ROUNDS) - 1];
          st.player.hitsLanded += 1;
          st.boss.hp = Math.max(0, st.boss.hp - table.damage);
          st.boss.anxiety = clamp(st.boss.anxiety + S_HIT, 0, 100);
          this.lastSourceAt = 0;
          st.boss.knockdownCount += 1;
          st.boss.innerState = 'HIT';
          st.boss.anim = 'knockdown';
          st.boss.breakdownTimer = 0;
          events.push({ type: 'bossAnim', anim: 'knockdown' });
          events.push({ type: 'sound', kind: 'impact' });
          events.push({ type: 'fx', fx: 'screenFlash', strength: 0.6 });
          if (st.beat?.type === 'line' && BREAK_ON_HIT) this.breakCharacter(events);
          if (st.boss.knockdownCount >= KNOCKDOWN_EARLY_END) {
            this.finishRound(events, true);
          }
        } else {
          events.push({ type: 'sound', kind: 'dodgeWhiff' });
        }
      }
    }
    this.wasAttacking = player.attacking;
  }

  // ============ 节奏反馈 ============
  private applyRhythm(r: { judgement: AttackJudgement; early: boolean; combo: number }, events: SimEvent[]): void {
    const st = this.state;
    switch (r.judgement) {
      case 'perfect':
        st.boss.anxiety = clamp(st.boss.anxiety + RHYTHM_PERFECT_BONUS_ANXIETY, 0, 100);
        st.boss.seen = clamp(st.boss.seen + 0.5, 0, 100);
        this.rhythmPerfect += 1;
        this.rhythmMaxCombo = Math.max(this.rhythmMaxCombo, r.combo);
        events.push({ type: 'sound', kind: 'perfectHit' });
        break;
      case 'good':
      case 'normal':
        this.rhythmMaxCombo = Math.max(this.rhythmMaxCombo, r.combo);
        events.push({ type: 'sound', kind: r.judgement === 'good' ? 'goodHit' : 'normalHit' });
        break;
      case 'miss':
        st.boss.anxiety = clamp(st.boss.anxiety + RHYTHM_MISS_PENALTY_ANXIETY + S_MISS, 0, 100);
        this.lastSourceAt = 0;
        this.rhythmMisses += 1;
        events.push({ type: 'sound', kind: 'missHit' });
        break;
    }
  }

  // ============ EVALUATE ============
  private tickEvaluate(dt: number, events: SimEvent[]): void {
    const st = this.state;
    const amount = Math.min(R_EVALUATE * dt, st.boss.anxiety - R_EVALUATE_FLOOR);
    if (amount > 0) st.boss.anxiety = clamp(st.boss.anxiety - amount, R_EVALUATE_FLOOR, R_EVALUATE_CAP);
    if (this.phaseTime > EVALUATE_COUNTDOWN + 1 && !this.evaluateDone) {
      this.rating.mobility = this.rating.mobility || this.autoMobility();
      this.rating.delivery = this.rating.delivery || this.autoDelivery();
      this.rating.visual = this.rating.visual || 3;
      this.rating.remembered = this.rating.remembered || this.autoRemembered();
      this.finishEvaluate(events);
    }
  }

  private autoMobility(): number {
    const f = this.state.facts;
    if (f.stanceAccuracy >= A1_STANCE_HIT) return 5;
    if (f.stanceAccuracy >= 70) return 4;
    if (f.stanceAccuracy >= 45) return 3;
    if (f.stanceAccuracy >= 20) return 2;
    return 1;
  }

  private autoDelivery(): number {
    const f = this.state.facts;
    if (f.lineCompleteness >= A2_COMPLETENESS) return 5;
    if (f.lineCompleteness >= 80) return 4;
    if (f.lineCompleteness >= 60) return 3;
    if (f.lineCompleteness >= 35) return 2;
    return 1;
  }

  private autoRemembered(): number {
    const st = this.state;
    const f = st.facts;
    if (st.boss.seen >= A4_SEEN_5STAR) return 5;
    if (f.maxCombo >= COMBO_A3 && f.jitterRatio <= A1_JITTER) return 4;
    if (st.boss.seen >= 40) return 3;
    if (st.boss.seen >= 15) return 2;
    return 1;
  }

  private finishEvaluate(events: SimEvent[]): void {
    if (this.evaluateDone) return;
    this.evaluateDone = true;
    const st = this.state;
    const axis = this.rating;
    axis.mobility = axis.mobility || this.autoMobility();
    axis.delivery = axis.delivery || this.autoDelivery();
    axis.visual = axis.visual || 3;
    axis.remembered = axis.remembered || this.autoRemembered();

    for (const def of RATING_AXES) {
      const stars = axis[def.id];
      events.push({ type: 'rating', axis: def.id, stars, evidence: def.thresholds[stars as 1 | 2 | 3 | 4 | 5] });
    }

    const avg = (axis.mobility + axis.delivery + axis.visual + axis.remembered) / 4;
    this.totalRating = avg;
    this.verdict = avg >= RATING_PERFECT ? 'perfect' : avg >= RATING_QUALIFIED ? 'qualified' : 'fail';

    if (avg >= RATING_PERFECT) {
      st.boss.anxiety = clamp(st.boss.anxiety - R_RATING_5, 0, 100);
      if (st.boss.band === 'panic') st.boss.anxiety = clamp(st.boss.anxiety - R_PLAYER_5STAR, 0, 100);
    } else if (avg >= RATING_QUALIFIED) {
      st.boss.anxiety = clamp(st.boss.anxiety - R_RATING_4, 0, 100);
    } else if (avg >= 3) {
      st.boss.anxiety = clamp(st.boss.anxiety - R_RATING_3, 0, 100);
    } else {
      st.boss.anxiety = clamp(st.boss.anxiety + R_RATING_LOW, 0, 100);
    }

    this.enterPhase('DIARY', events);
    events.push({ type: 'sound', kind: 'paper' });
  }

  // ============ DIARY ============
  private tickDiary(events: SimEvent[]): void {
    if (this.phaseTime > DIARY_COUNTDOWN + 1 && !this.diaryDone) {
      this.applyDiary('neutral', false, null, events);
    }
  }

  private applyDiary(mood: 'positive' | 'negative' | 'neutral', countsAsNotGoodEnough: boolean, entryId: string | null, events: SimEvent[]): void {
    if (this.diaryDone) return;
    this.diaryDone = true;
    const st = this.state;
    if (mood === 'positive') {
      st.boss.anxiety = clamp(st.boss.anxiety - R_DIARY_POSITIVE, 0, 100);
    } else if (mood === 'negative') {
      st.boss.anxiety = clamp(st.boss.anxiety + R_DIARY_NEGATIVE, 0, 100);
      if (countsAsNotGoodEnough) {
        this.notGoodEnoughRun += 1;
        this.runStats.notGoodEnoughCount += 1;
      }
    }
    if (entryId) {
      const saved = this.storage.load<{ id: string; text: string }[]>('diary') ?? [];
      const entry = this.diaryPool.find((d) => d.id === entryId);
      if (entry) {
        saved.push({ id: entry.id, text: entry.text });
        this.storage.save('diary', saved);
      }
    }
    this.finishRound(events, false);
  }

  // ============ 轮次收尾 ============
  private finishRound(events: SimEvent[], earlyEnd: boolean): void {
    const st = this.state;
    const facts: RatingFacts = {
      ...st.facts,
      maxCombo: Math.max(st.facts.maxCombo, this.rhythmMaxCombo),
      perfectCount: st.facts.perfectCount + this.rhythmPerfect,
      lingerTime: st.player.lingerTime,
      barrageCount: 0,
    };

    const result: RoundResult = {
      round: st.round,
      script: st.boss.script ?? 'freePlay',
      stagesCompleted: facts.stagesCompleted,
      knockdowns: st.player.hitsLanded,
      broken: st.boss.innerState === 'BREAK_CHARACTER',
      axisRatings: { ...this.rating },
      totalRating: this.totalRating,
      verdict: this.verdict,
      facts,
      anxietyDelta: st.boss.anxiety - S_BASE,
      playerScore: null,
    };
    st.lastVerdict = this.verdict;
    this.runStats.lastVerdicts.push(this.verdict);
    if (this.runStats.lastVerdicts.length > 6) this.runStats.lastVerdicts.shift();

    events.push({ type: 'roundEnd', result });

    if (earlyEnd || this.notGoodEnoughRun >= 3) {
      events.push({ type: 'persist', key: 'stats', value: this.runStats });
      this.enterEnding(earlyEnd ? 'early' : 'curtainB', events);
      return;
    }

    if (st.round >= MAX_ROUNDS) {
      const variant: EndingVariant =
        this.totalRating >= RATING_QUALIFIED || st.boss.seen >= 60 ? 'curtainA' : 'curtainB';
      if (variant === 'curtainA') {
        st.boss.seen = clamp(st.boss.seen + SEEN_PERFECT_ROUND, 0, 100);
      }
      this.runStats.seenEndings.push(variant);
      events.push({ type: 'persist', key: 'stats', value: this.runStats });
      this.enterEnding(variant, events);
      return;
    }

    // 下一轮
    st.round += 1;
    st.boss.anxiety = clamp(st.boss.anxiety + S_ROUND * (st.round - 1), 0, 100);
    if (this.verdict === 'perfect') {
      st.boss.anxiety = clamp(st.boss.anxiety + CARRY_PERFECT_ANXIETY, 0, 100);
      this.lineBonusCarry = CARRY_PERFECT_LINE;
    } else if (this.verdict === 'fail') {
      st.boss.anxiety = clamp(st.boss.anxiety + CARRY_FAIL_ANXIETY, 0, 100);
      if (this.rand() < CARRY_FAIL_SELFDOUBT) {
        const doubt = pick(this.rand, LINE_POOLS.selfDoubt);
        events.push({ type: 'dialogue', lineId: doubt.id, text: doubt.text, speaker: doubt.speaker });
      }
    }
    this.evaluateDone = false;
    this.diaryDone = false;
    this.rhythmPerfect = 0;
    this.rhythmMisses = 0;
    this.rhythmMaxCombo = 0;
    this.stanceHits = 0;
    this.stanceTargets = 0;
    this.moveFrames = 0;
    this.sharpTurns = 0;
    this.linesAttempted = 0;
    this.linesCompleted = 0;
    this.stageForgetCount = 0;
    st.facts = { ...EMPTY_FACTS };
    st.boss.stageIndex = 0;
    st.boss.beatIndex = 0;
    this.enterPhase('WAIT', events);
    events.push({ type: 'roundStart', round: st.round });
  }

  private enterEnding(variant: EndingVariant, events: SimEvent[]): void {
    const st = this.state;
    st.boss.innerState = 'EVALUATE';
    st.boss.anim = 'bow';
    if (variant === 'early') {
      events.push({ type: 'dialogue', lineId: 'L_END_EARLY', text: '（三次被击倒。演出提前谢幕。）', speaker: 'system' });
    } else if (variant === 'curtainA') {
      events.push({ type: 'dialogue', lineId: 'L_END_01', text: '……掌声。原来真的会有掌声。', speaker: 'boss' });
      events.push({ type: 'dialogue', lineId: 'L_END_02', text: '谢谢你们，看完一个反派的自尊。', speaker: 'boss' });
      this.endChoiceAsked = true;
    } else {
      events.push({ type: 'dialogue', lineId: 'L_END_B', text: '（观众走了。屏幕暗下去。）', speaker: 'system' });
      events.push({ type: 'dialogue', lineId: 'L_END_B2', text: '……明天还会有人来吗。', speaker: 'boss' });
      this.endChoiceAsked = true;
    }
    this.enterPhase('ENDING_NORMAL', events);
    events.push({ type: 'sound', kind: 'gong' });
    this.finishStats(events);
  }

  private finishStats(events: SimEvent[]): void {
    const stats = this.runStats;
    stats.totalRounds += 1;
    stats.bestCombo = Math.max(stats.bestCombo, this.rhythmMaxCombo);
    stats.perfectTotal += this.rhythmPerfect;
    stats.viewerPeak = Math.max(stats.viewerPeak, this.viewers);
    events.push({ type: 'persist', key: 'stats', value: stats });
  }

  // ============ ENDING ============
  private tickEnding(events: SimEvent[]): void {
    const st = this.state;
    if (st.phase === 'ENDING_NORMAL' && this.endChoiceAsked && !this.hiddenAsked) {
      if (STRETCH_FLAGS.hiddenEnding && st.boss.script === 'mad' && this.notGoodEnoughRun >= 2) {
        this.hiddenAsked = true;
        events.push({ type: 'dialogue', lineId: 'L_END_CHOICE', text: '（屏幕角落亮起一行小字：选 B，毁掉这场演出？）', speaker: 'system' });
      }
    }
  }

  // ============ 焦虑 ============
  private tickAnxiety(input: TickInput, events: SimEvent[]): void {
    const st = this.state;

    if (this.phaseTime - this.lastSourceAt > R_DECAY_DELAY && st.boss.anxiety > 0) {
      st.boss.anxiety = clamp(st.boss.anxiety - R_DECAY * input.dt, 0, 100);
    }

    if (input.barrageBurst) {
      st.boss.anxiety = clamp(st.boss.anxiety + S_BARRAGE, 0, 100);
      this.lastSourceAt = 0;
    }

    const band = bandOf(st.boss.anxiety);
    if (band !== st.boss.band) {
      st.boss.band = band;
      events.push({ type: 'anxietyBand', band, prompt: BAND_PROMPTS[band] });
      if (band === 'panic') events.push({ type: 'sound', kind: 'heartbeat' });
    }

    // 恐慌脱手
    if (band === 'panic' && this.rand() < SWORD_DROP_CHANCE * input.dt * 60) {
      st.boss.innerState = 'HIT';
      st.boss.anim = 'kneelPanic';
      st.boss.breakdownTimer = 0;
      events.push({ type: 'bossAnim', anim: 'kneelPanic' });
      events.push({ type: 'sound', kind: 'swordDrop' });
      events.push({ type: 'dialogue', lineId: 'L_PANIC_06', text: '（剑脱手了。全场安静。）', speaker: 'system', pool: 'L_PANIC' });
      st.boss.anxiety = Math.min(st.boss.anxiety, PANIC_DROP);
    }
  }

  private updateViewers(events: SimEvent[]): void {
    const st = this.state;
    const bonus = this.totalRating >= 4 ? VIEWERS_RATING_BONUS : 0;
    const next = VIEWERS_BASE
      + Math.floor(st.boss.seen / 10) * VIEWERS_PER_SEEN
      + (st.round - 1) * VIEWERS_PER_ROUND
      + bonus;
    if (next !== this.viewers) {
      this.viewers = next;
      events.push({ type: 'viewers', count: next });
    }
  }

  // ============ 走位 ============
  private applyMove(move: Vector3, dt: number): void {
    const st = this.state;
    const speed = 3.1;
    const vx = move.x * speed * dt;
    const vz = move.z * speed * dt;
    if (vx !== 0 || vz !== 0) {
      const b = st.boss;
      b.pos.x = clamp(b.pos.x + vx, WORLD.roomBounds.min.x + 0.6, WORLD.roomBounds.max.x - 0.6);
      b.pos.z = clamp(b.pos.z + vz, WORLD.roomBounds.min.z + 0.6, WORLD.roomBounds.max.z - 0.6);
      for (const c of WORLD.colliders) {
        const d = dist2(b.pos.x, b.pos.z, c.center.x, c.center.z);
        if (d < c.radius + 0.5 && d > 0.001) {
          const push = (c.radius + 0.5 - d) / d;
          b.pos.x += (b.pos.x - c.center.x) * push;
          b.pos.z += (b.pos.z - c.center.z) * push;
        }
      }
      const targetYaw = Math.atan2(vx, vz);
      b.facingYaw = dampAngle(b.facingYaw, targetYaw, 10, dt);
      b.rot.y = b.facingYaw;
      const mag = Math.abs(vx) + Math.abs(vz);
      const prevMag = Math.abs(this.lastMoveX) + Math.abs(this.lastMoveZ);
      if (this.moveFrames > 0 && prevMag > 0.01 && Math.abs(mag - prevMag) / prevMag > 0.8) this.sharpTurns += 1;
      this.moveFrames += 1;
      this.lastMoveX = vx;
      this.lastMoveZ = vz;
    } else {
      // 面向目标 / 替身
      const b = st.boss;
      let tx = 0;
      let tz = 0;
      if (st.beat?.targetPos) {
        tx = st.beat.targetPos.x - b.pos.x;
        tz = st.beat.targetPos.z - b.pos.z;
      } else if (st.phase === 'PERFORM' && st.player.state === 'engaging') {
        tx = st.player.pos.x - b.pos.x;
        tz = st.player.pos.z - b.pos.z;
      }
      if (Math.abs(tx) + Math.abs(tz) > 0.01) {
        b.facingYaw = dampAngle(b.facingYaw, Math.atan2(tx, tz), 4, dt);
        b.rot.y = b.facingYaw;
      }
    }
  }
}

export function bandOf(anxiety: number): AnxietyBand {
  if (anxiety >= BAND_PANIC_MIN) return 'panic';
  if (anxiety >= BAND_SHAKY_MIN) return 'shaky';
  if (anxiety >= BAND_NERVOUS_MIN) return 'nervous';
  return 'calm';
}

export function bandEffects(band: AnxietyBand): (typeof BAND_EFFECTS)[number] {
  return BAND_EFFECTS.find((e) => e.band === band) ?? BAND_EFFECTS[0];
}
