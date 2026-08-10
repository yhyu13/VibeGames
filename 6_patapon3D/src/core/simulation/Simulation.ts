/**
 * core/simulation/Simulation.ts — v2.0 模拟主类(冻结接口,见 TDD §5)
 *
 * divine-drums:timing-only 判定 + 4 拍命令语法 + 3 单位军队 vs Moloch。
 * FSM:MENU → SONG → MATCH_OVER(READY 声明保留但不用)。
 *
 * 硬规则:此文件**禁止** import three / react / zustand / DOM。
 * 所有 side effect 必须经 SimEvent 走 EventBus。
 * RNG 只有构造注入的种子 rng;谱面种子在 data/songSeeds.ts。
 */

import {
  ARMY_INITIAL_X,
  ARMY_MAX_X,
  ARMY_MIN_X,
  ARMY_UNIT_COUNT,
  ATTACK_DAMAGE,
  BERSERK_DAMAGE_MULT,
  BERSERK_TURNS,
  BOSS_AUTO_TURN_S,
  BOSS_HP_MAX,
  BOSS_INITIAL_X,
  BOSS_Y,
  BOSS_Z,
  CHARGE_DAMAGE,
  COMMAND_LENGTH,
  HEAVY_DAMAGE,
  JUDGE_WINDOW_NORMAL_MS,
  MARCH_DISTANCE,
  NOTE_SCROLL_SPEED,
  RALLY_HEAL,
  SONG_DURATION_S,
  SQUASH_APPLY_AMOUNT,
  UNIT_HP_MAX,
  UNIT_SPACING_X,
  UNIT_STATE_FLASH_S,
  UNIT_Y,
  UNIT_Z_OFFSETS,
  VOLLEY_DAMAGE,
} from '../constants.js';
import { lookupCommand } from '../data/commands.js';
import { SONG_SEEDS } from '../data/songSeeds.js';
import { makeRng } from '../math.js';
import type {
  ArmyState,
  BossState,
  CommandName,
  FeverState,
  GamePhase,
  NoteType,
  PersistedStats,
  RhythmState,
  Side,
  SimEvent,
  SimSnapshot,
  SimulationConfig,
  Unit,
  UnitState,
} from '../types.js';
import { executeBossAttack, pickBossAttack, startTelegraph, updateEnrage } from './boss.js';
import { commandDamage, damageBoss, healUnit, livingUnits } from './combat.js';
import {
  describeEntities as describeEntitiesText,
  describeRules as describeRulesText,
  describeWorld as describeWorldText,
} from './describe.js';
import { EventBus } from './events.js';
import { feverLevelForCombo, makeFever, startFever, tickFever } from './fever.js';
import {
  emitBeatJuice,
  emitBossAttackJuice,
  emitBossHitJuice,
  emitCommandJuice,
  emitMatchOverJuice,
  emitTelegraphJuice,
} from './juiceEvents.js';
import { checkMatchOver } from './matchOver.js';
import { judgementQuality, judgeBeat } from './rhythm.js';
import { generateChart, generateCharts } from './songGenerator.js';
import { decaySquash } from './squash.js';

const DEFAULT_CONFIG: SimulationConfig = {
  seed: 42,
  audioMuted: false,
  audioVolume: 0.5,
};

const UNIT_CHARACTER_IDS = ['pata-emerald', 'pata-lime', 'pata-teal'] as const;

export class Simulation {
  private readonly config: SimulationConfig;
  private phase: GamePhase = 'MENU';
  private army: ArmyState = Simulation.makeArmy();
  private boss: BossState = Simulation.makeBoss();
  private rhythm: RhythmState = Simulation.makeRhythm();
  private fever: FeverState = makeFever();
  private readonly events = new EventBus();
  private readonly rng: () => number;

  /** 自上次命令结算的停滞计时(>BOSS_AUTO_TURN_S 强制 boss 出手) */
  private stallTimer = 0;
  /** 单帧输入缓冲(step 内消费) */
  private pendingNote: NoteType | null = null;

  /** 会话战绩(persist 事件值;跨会话合并由 engine 负责) */
  private stats: PersistedStats = {
    totalMatches: 0,
    p1Wins: 0,
    bossWins: 0,
    longestCombo: 0,
    lastMatchAt: 0,
  };

  constructor(config: Partial<SimulationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.rng = makeRng(this.config.seed);
  }

  private static makeArmy(): ArmyState {
    const units: Unit[] = [];
    for (let i = 0; i < ARMY_UNIT_COUNT; i++) {
      units.push({
        id: `unit-${i}`,
        side: 'P1',
        hp: UNIT_HP_MAX,
        maxHp: UNIT_HP_MAX,
        position: { x: ARMY_INITIAL_X, y: UNIT_Y, z: UNIT_Z_OFFSETS[i] ?? 0 },
        state: 'idle',
        stateTimeLeft: 0,
        squashAmount: 1,
        characterId: UNIT_CHARACTER_IDS[i] ?? 'pata-emerald',
      });
    }
    return {
      units,
      formationOffset: ARMY_INITIAL_X,
      defendTurns: 0,
      retreatTurns: 0,
      berserkTurns: 0,
      lastCommand: null,
    };
  }

  private static makeBoss(): BossState {
    return {
      hp: BOSS_HP_MAX,
      maxHp: BOSS_HP_MAX,
      position: { x: BOSS_INITIAL_X, y: BOSS_Y, z: BOSS_Z },
      state: 'idle',
      stateTimeLeft: 0,
      telegraph: null,
      enraged: false,
      attackCount: 0,
      squashAmount: 1,
    };
  }

  private static makeRhythm(): RhythmState {
    return {
      songTime: 0,
      songIndex: 0,
      charts: generateCharts(),
      activeNoteIndex: 0,
      noteScrollSpeed: NOTE_SCROLL_SPEED,
      commandBeats: [],
      commandJudgements: [],
      combo: 0,
      maxCombo: 0,
    };
  }

  // ── 主步进(固定步 dt;fever slow-mo 已被引擎折算进 dt) ──

  step(dt: number): void {
    if (this.phase !== 'SONG') {
      this.pendingNote = null;
      return;
    }

    this.rhythm.songTime += dt;
    this.stallTimer += dt;

    this.consumeInput();
    this.expireNotes();
    this.decayTransientStates(dt);
    if (tickFever(this.fever, dt)) {
      this.emit({ type: 'feverEnd', payload: {} });
    }

    // 停滞强制 boss 回合
    if (this.stallTimer >= BOSS_AUTO_TURN_S) {
      this.runBossTurn();
      this.stallTimer = 0;
      this.checkEnd();
    }

    // 歌曲推进(循环 SONG_COUNT 张谱面)
    if (this.rhythm.songTime >= SONG_DURATION_S) {
      this.emit({ type: 'songEnd', payload: { songIndex: this.rhythm.songIndex } });
      this.rhythm.songIndex = (this.rhythm.songIndex + 1) % this.rhythm.charts.length;
      this.rhythm.charts[this.rhythm.songIndex] = generateChart(SONG_SEEDS[this.rhythm.songIndex] ?? 0);
      this.rhythm.songTime = 0;
      this.rhythm.activeNoteIndex = 0;
      this.emit({ type: 'songStart', payload: { songIndex: this.rhythm.songIndex } });
    }

    this.checkEnd();
  }

  /** 消费一帧输入:命中窗口内 → 判定;窗口外 → 空挥 miss */
  private consumeInput(): void {
    const note = this.pendingNote;
    this.pendingNote = null;
    if (!note) return;

    const chart = this.rhythm.charts[this.rhythm.songIndex];
    const active = chart?.[this.rhythm.activeNoteIndex];
    const errorMs = active ? Math.abs(this.rhythm.songTime - active.time) * 1000 : Infinity;

    if (!active || errorMs > JUDGE_WINDOW_NORMAL_MS) {
      this.applyMiss(note);
      return;
    }

    const judgement = judgeBeat(errorMs);
    active.status = 'hit';
    this.rhythm.activeNoteIndex += 1;
    this.rhythm.combo += 1;
    this.rhythm.maxCombo = Math.max(this.rhythm.maxCombo, this.rhythm.combo);
    this.rhythm.commandBeats.push(note);
    this.rhythm.commandJudgements.push(judgement);

    this.emit({ type: 'beatHit', payload: { type: note, judgement, combo: this.rhythm.combo } });
    emitBeatJuice(note, judgement, this.rhythm.combo, this.boss.position, (e) => this.emit(e));

    // fever 触发(combo 8/16/24)
    const level = feverLevelForCombo(this.rhythm.combo);
    if (level >= 0) {
      startFever(this.fever, level);
      this.emit({ type: 'feverStart', payload: { level, factor: this.fever.factor } });
      this.emit({ type: 'sfx', payload: { id: 'feverStart', volume: 1 } });
    }

    if (this.rhythm.commandBeats.length === COMMAND_LENGTH) {
      this.resolveCommand();
    }
  }

  /** 过期未击的音符自动 miss(>NORMAL 窗口) */
  private expireNotes(): void {
    const chart = this.rhythm.charts[this.rhythm.songIndex];
    if (!chart) return;
    const windowS = JUDGE_WINDOW_NORMAL_MS / 1000;
    while (true) {
      const active = chart[this.rhythm.activeNoteIndex];
      if (!active || this.rhythm.songTime <= active.time + windowS) return;
      active.status = 'miss';
      this.rhythm.activeNoteIndex += 1;
      this.applyMiss(active.type);
    }
  }

  /** miss:重置 combo 与命令条(冻结契约) */
  private applyMiss(note: NoteType | null): void {
    this.rhythm.combo = 0;
    this.rhythm.commandBeats = [];
    this.rhythm.commandJudgements = [];
    this.emit({ type: 'playerMiss', payload: { type: note } });
  }

  /**
   * 第 4 拍落地 → 查表解析命令。已知序列执行效果;未知序列 commandFailed
   * (重置命令条,**保留 combo**)。命令结算后跑 boss 回合。
   * engine/UI 永远不得自行推进此状态(冻结契约)。
   */
  private resolveCommand(): void {
    const sequence = [...this.rhythm.commandBeats];
    const judgements = [...this.rhythm.commandJudgements];
    this.rhythm.commandBeats = [];
    this.rhythm.commandJudgements = [];

    const command = lookupCommand(sequence);
    if (!command) {
      this.emit({ type: 'commandFailed', payload: { sequence } });
      return;
    }

    const quality =
      judgements.reduce<number>((sum, j) => sum + judgementQuality(j), 0) / Math.max(1, judgements.length);

    this.executeCommand(command, quality);
    this.army.lastCommand = command;
    this.emit({ type: 'commandResolved', payload: { command, quality } });
    emitCommandJuice(command, (e) => this.emit(e));

    this.runBossTurn();
    this.stallTimer = 0;
    this.checkEnd();
  }

  /** 命令效果(冻结数值,见 TDD §4.2) */
  private executeCommand(command: CommandName, quality: number): void {
    const mods = {
      quality,
      feverMult: this.fever.damageMult,
      berserkMult: this.army.berserkTurns > 0 ? BERSERK_DAMAGE_MULT : 1,
    };
    const hitBoss = (base: number, useProximity: boolean): void => {
      const dmg = commandDamage(
        base,
        { ...mods, useProximity },
        this.army.formationOffset,
        this.boss.position.x,
      );
      damageBoss(this.boss, dmg);
      updateEnrage(this.boss);
      this.boss.squashAmount = SQUASH_APPLY_AMOUNT;
      this.emit({ type: 'damageDealt', payload: { target: 'boss', amount: dmg } });
      this.emit({ type: 'bossHit', payload: { damage: dmg, hp: this.boss.hp } });
      emitBossHitJuice(dmg, this.boss.position, (e) => this.emit(e));
    };
    const flashUnits = (state: UnitState): void => {
      for (const u of livingUnits(this.army)) {
        u.state = state;
        u.stateTimeLeft = UNIT_STATE_FLASH_S;
      }
    };

    switch (command) {
      case 'MARCH':
        this.army.formationOffset = Math.min(ARMY_MAX_X, this.army.formationOffset + MARCH_DISTANCE);
        flashUnits('march');
        break;
      case 'RETREAT':
        this.army.formationOffset = Math.max(ARMY_MIN_X, this.army.formationOffset - MARCH_DISTANCE);
        this.army.retreatTurns = 1;
        flashUnits('retreat');
        break;
      case 'ATTACK':
        flashUnits('attack');
        hitBoss(ATTACK_DAMAGE, true);
        break;
      case 'CHARGE':
        flashUnits('charge');
        hitBoss(CHARGE_DAMAGE, true);
        break;
      case 'HEAVY':
        flashUnits('heavy');
        hitBoss(HEAVY_DAMAGE, true);
        break;
      case 'VOLLEY':
        flashUnits('volley');
        hitBoss(VOLLEY_DAMAGE, false);
        break;
      case 'DEFEND':
        this.army.defendTurns = 1;
        flashUnits('defend');
        break;
      case 'RALLY':
        for (const u of livingUnits(this.army)) {
          healUnit(u, RALLY_HEAL);
          this.emit({ type: 'healApplied', payload: { unitId: u.id, amount: RALLY_HEAL } });
        }
        flashUnits('idle');
        break;
      case 'BERSERK':
        this.army.berserkTurns = BERSERK_TURNS;
        flashUnits('attack');
        break;
      case 'MIRACLE': {
        const level = Math.min(this.fever.level + 1, 2);
        startFever(this.fever, level);
        this.emit({ type: 'feverStart', payload: { level, factor: this.fever.factor } });
        this.emit({ type: 'sfx', payload: { id: 'feverStart', volume: 1 } });
        break;
      }
    }
  }

  /**
   * boss 回合:预告中的攻击落地(DEFEND 减半 / RETREAT 闪避)→ 新预告开始。
   * 回合计数器(defend/retreat/berserk)在攻击结算后递减。
   */
  private runBossTurn(): void {
    const result = executeBossAttack(this.boss, this.army, this.rng);
    if (result) {
      for (const u of this.army.units) {
        if (u.state === 'hit' || u.state === 'defeat') {
          this.emit({ type: 'damageDealt', payload: { target: 'unit', amount: result.damage, unitId: u.id } });
          this.emit({ type: 'unitSquash', payload: { unitId: u.id, amount: SQUASH_APPLY_AMOUNT } });
          u.squashAmount = SQUASH_APPLY_AMOUNT;
        }
      }
      this.emit({
        type: 'bossAttack',
        payload: { attack: result.attack, damage: result.damage, dodged: result.dodged },
      });
      emitBossAttackJuice(
        result.dodged,
        livingUnits(this.army).map((u) => ({ ...u.position })),
        (e) => this.emit(e),
      );
    }

    if (this.army.defendTurns > 0) this.army.defendTurns -= 1;
    if (this.army.retreatTurns > 0) this.army.retreatTurns -= 1;
    if (this.army.berserkTurns > 0) this.army.berserkTurns -= 1;

    const next = pickBossAttack(this.rng);
    startTelegraph(this.boss, next);
    this.emit({ type: 'bossTelegraph', payload: { attack: next } });
    emitTelegraphJuice((e) => this.emit(e));
  }

  /** 瞬时姿态 / squash 衰减;telegraph 不过期(等到命令结算) */
  private decayTransientStates(dt: number): void {
    for (let i = 0; i < this.army.units.length; i++) {
      const u = this.army.units[i]!;
      u.squashAmount = decaySquash(u.squashAmount, dt);
      if (u.state !== 'defeat' && u.stateTimeLeft > 0) {
        u.stateTimeLeft -= dt;
        if (u.stateTimeLeft <= 0) u.state = 'idle';
      }
      // 单位世界位置由 formationOffset 派生(冻结布局)
      u.position.x = this.army.formationOffset + i * UNIT_SPACING_X - UNIT_SPACING_X;
    }
    this.boss.squashAmount = decaySquash(this.boss.squashAmount, dt);
    if (this.boss.state !== 'telegraph' && this.boss.stateTimeLeft > 0) {
      this.boss.stateTimeLeft -= dt;
      if (this.boss.stateTimeLeft <= 0) this.boss.state = 'idle';
    }
  }

  /** 胜负检查(冻结:boss 0 HP → P1;军队全灭 → BOSS) */
  private checkEnd(): void {
    if (this.phase !== 'SONG') return;
    const winner = checkMatchOver(this.army, this.boss);
    if (!winner) return;
    this.phase = 'MATCH_OVER';
    this.emit({ type: 'matchOver', payload: { winner } });
    emitMatchOverJuice(winner, (e) => this.emit(e));
    this.emit({ type: 'persist', payload: { key: 'stats', value: this.accumulateStats(winner) } });
  }

  private accumulateStats(winner: Side): PersistedStats {
    this.stats.totalMatches += 1;
    if (winner === 'P1') this.stats.p1Wins += 1;
    else this.stats.bossWins += 1;
    this.stats.longestCombo = Math.max(this.stats.longestCombo, this.rhythm.maxCombo);
    this.stats.lastMatchAt = Date.now();
    return { ...this.stats };
  }

  // ── UI 命令(GameEngine.handleUiCommand 调用) ──

  /** 开赛(MENU/MATCH_OVER → SONG):重置军队 / boss / 节奏 / fever,并给出首个预告 */
  startMatch(): void {
    this.army = Simulation.makeArmy();
    this.boss = Simulation.makeBoss();
    this.rhythm = Simulation.makeRhythm();
    this.fever = makeFever();
    this.stallTimer = 0;
    this.pendingNote = null;
    this.phase = 'SONG';
    this.emit({ type: 'songStart', payload: { songIndex: 0 } });
    const first = pickBossAttack(this.rng);
    startTelegraph(this.boss, first);
    this.emit({ type: 'bossTelegraph', payload: { attack: first } });
  }

  /** 重赛(= startMatch;冻结签名) */
  rematch(): void {
    this.startMatch();
  }

  /** 回菜单(任意状态 → MENU) */
  toMenu(): void {
    this.phase = 'MENU';
    this.army = Simulation.makeArmy();
    this.boss = Simulation.makeBoss();
    this.rhythm = Simulation.makeRhythm();
    this.fever = makeFever();
    this.stallTimer = 0;
    this.pendingNote = null;
  }

  // ── 快照(UI / 渲染器只读) ──

  snapshot(): SimSnapshot {
    return {
      phase: this.phase,
      army: {
        ...this.army,
        units: this.army.units.map((u) => ({ ...u, position: { ...u.position } })),
      },
      boss: { ...this.boss, position: { ...this.boss.position } },
      rhythm: {
        ...this.rhythm,
        commandBeats: [...this.rhythm.commandBeats],
        commandJudgements: [...this.rhythm.commandJudgements],
      },
      fever: { ...this.fever },
      perfDegradation: [],
    };
  }

  // ── 输入(InputManager → GameEngine → 这里;type = 本帧按下的鼓) ──

  setP1Input(input: { type: NoteType | null }): void {
    if (input.type) this.pendingNote = input.type;
  }

  // ── 事件订阅 ──

  onEvent(handler: (e: SimEvent) => void): () => void {
    return this.events.subscribe(handler);
  }

  drainEvents(): SimEvent[] {
    return this.events.drain();
  }

  private emit(e: SimEvent): void {
    this.events.emit(e);
  }

  // ── 调试(devtools) ──

  describeWorld(): string {
    return describeWorldText(this);
  }

  describeRules(): string {
    return describeRulesText(this);
  }

  describeEntities(): string {
    return describeEntitiesText(this);
  }

  recentEvents(n: number): SimEvent[] {
    return this.events.recent(n);
  }
}
