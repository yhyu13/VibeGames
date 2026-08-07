// engine/GameEngine.ts — V2 编排器：rAF 固定步 → TickInput 组装 → sim.update
// → 事件聚合 → store 快照 → scene.render；鼠标谱生命周期 + 观众调度 + 对白排队。

import * as THREE from 'three';
import {
  FIXED_DT, MAX_CLAMP_DT, MAX_SIM_STEPS, RHYTHM_COMBO_MILESTONES, RHYTHM_MISS_AFTER,
} from '../core/constants';
import type { SimApi, SimState } from '../core/simulation/Simulation';
import { Simulation } from '../core/simulation/Simulation';
import type { EventConsumer, SimEvent } from '../core/simulation/events';
import type { ArchiveEntry, RatingAxisId, Speaker, TickInput, UiCommand } from '../core/types';
import { useUiStore, type UiSnapshot } from '../store';
import { InputManager, type PollResult } from './InputManager';
import { SceneManager } from './SceneManager';
import { storage } from './storage';
import { installDevTools } from './devtools';
import { ARCHIVE_PRESETS } from '../core/data/archives';
import { DIARY_ENTRIES } from '../core/data/diary';
import {
  createAudienceBarrageScheduler,
  type AudienceBurstSize,
  type AudienceScene,
  type ScheduledAudienceBarrage,
} from '../core/simulation/audienceBarrage';
import {
  generateMouseRhythmChart,
  judgeHoldHead,
  judgeRhythmClick,
  type MouseRhythmChart,
  type RhythmJudgement,
  type RhythmTarget,
} from '../core/simulation/mouseRhythm';

const BAND_SHAKE: Record<string, number> = { calm: 0, nervous: 0.15, shaky: 0.35, panic: 0.6 };
const BAND_DETUNE: Record<string, number> = { calm: 0, nervous: 5, shaky: 15, panic: 30 };
const AUDIENCE_VISIBLE_SECONDS = 10.5;
const AMBIENT_INTERVAL = 9;

interface DialogueAgg {
  queue: { lineId: string; text: string; speaker: Speaker }[];
  active: { lineId: string; text: string; speaker: Speaker } | null;
  remaining: number;
}

interface RhythmAgg {
  chart: MouseRhythmChart | null;
  beatKey: string | null;
  elapsed: number;
  targetIndex: number;
  combo: number;
  lastJudgement: RhythmJudgement | null;
  lastJudgementEarly: boolean;
  hold: { target: RhythmTarget; held: number; head: RhythmJudgement } | null;
  holdProgress: number | null;
  fixture: boolean;
}

interface EndingAgg {
  variant: 'curtainA' | 'curtainB' | 'early' | 'hidden' | null;
  stats: unknown;
}

export class GameEngine {
  private sim: SimApi;
  private consumers: EventConsumer[];
  private scene: SceneManager;
  private input: InputManager;
  private running = false;
  private rafId = 0;
  private lastNow = 0;
  private accumulator = 0;
  private simTime = 0;
  private frames = 0;
  private lastPhase = 'MENU';
  private pendingUi: UiCommand[] = [];
  private dialogueAgg: DialogueAgg = { queue: [], active: null, remaining: 0 };
  private rhythmAgg: RhythmAgg = { chart: null, beatKey: null, elapsed: 0, targetIndex: 0, combo: 0, lastJudgement: null, lastJudgementEarly: false, hold: null, holdProgress: null, fixture: false };
  private completedRhythmBeatKey: string | null = null;
  private audienceScheduler = createAudienceBarrageScheduler(240807);
  private audienceAgg: { item: ScheduledAudienceBarrage; bornAt: number }[] = [];
  private nextAmbientAt = 4;
  private barrageEnabled = true;
  private barrageDensity: 'standard' | 'sparse' = 'standard';
  private soundEnabled = true;
  private ratingAgg: UiSnapshot['rating'] = {
    sheetOpen: false,
    axes: {
      mobility: { stars: 0, auto: false },
      delivery: { stars: 0, auto: false },
      visual: { stars: 0, auto: false },
      remembered: { stars: 0, auto: true },
    },
    facts: null,
    submitted: false,
    countdown: 10,
  };
  private diaryAgg = { open: false, options: [...DIARY_ENTRIES], writeCount: 0, countdown: 8 };
  private archiveAgg: ArchiveEntry[] = (() => {
    const loaded = storage.load<ArchiveEntry[] | unknown>('archive');
    const generated = Array.isArray(loaded)
      ? (loaded as ArchiveEntry[]).filter((e) => e.generated && !ARCHIVE_PRESETS.some((p) => p.id === e.id))
      : [];
    return [...ARCHIVE_PRESETS, ...generated];
  })();
  private archiveGenSeq = 2000 + Math.floor(Math.random() * 90000);
  private viewers = 3;
  private bandPrompt: string | null = null;
  private promptKey = 0;
  private endingAgg: EndingAgg = { variant: null, stats: null };
  private statsAgg: unknown = null;
  audio: (EventConsumer & { setEnabled?(v: boolean): void }) | null = null;
  private shadowScreen = { x: 0.5, y: 0.5 };

  constructor(sim: SimApi, consumers: EventConsumer[], scene: SceneManager, input: InputManager) {
    this.sim = sim;
    this.consumers = consumers;
    this.scene = scene;
    this.input = input;
    const settings = storage.load<{ barrageEnabled?: boolean; barrageDensity?: 'standard' | 'sparse'; soundEnabled?: boolean }>('settings');
    this.barrageEnabled = settings?.barrageEnabled ?? true;
    this.barrageDensity = settings?.barrageDensity ?? 'standard';
    this.soundEnabled = settings?.soundEnabled ?? true;
  }

  addConsumer(c: EventConsumer): void {
    this.consumers.push(c);
  }

  queueUi(cmd: UiCommand): void {
    this.pendingUi.push(cmd);
  }

  tick(now: number): void {
    if (!this.running) return;
    const dtRaw = this.lastNow === 0 ? 0 : Math.min((now - this.lastNow) / 1000, MAX_CLAMP_DT);
    this.lastNow = now;
    const state = this.sim.getState();
    const paused = state.phase === 'PAUSE';
    let dirty = false;

    if (!paused) {
      this.accumulator += dtRaw;
      let steps = 0;
      while (this.accumulator >= FIXED_DT && steps < MAX_SIM_STEPS) {
        const polled = this.input.poll();
        const ui = this.takeUi(polled);
        this.consumeUi(ui, polled);
        if (this.tickRhythm(polled)) dirty = true;
        const input = this.buildInput(polled, ui);
        const events = this.sim.update(input);
        this.simTime += FIXED_DT;
        this.dispatch(events);
        if (this.tickDialogueAutoAdvance()) dirty = true;
        if (this.tickAmbientAudience()) dirty = true;
        if (events.length > 0) dirty = true;
        this.accumulator -= FIXED_DT;
        steps++;
      }
    } else {
      const polled = this.input.poll();
      const ui = this.takeUi(polled);
      this.consumeUi(ui, polled);
      dirty = true;
    }

    this.frames++;
    if (this.sim.getState().phase !== this.lastPhase) {
      this.lastPhase = this.sim.getState().phase;
      dirty = true;
    }
    if (dirty || this.frames % 30 === 0) this.pushSnapshot();
    this.scene.render(dtRaw);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastNow = performance.now();
    const loop = (now: number): void => {
      if (!this.running) return;
      this.tick(now);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  // ============ 内部 ============
  private takeUi(polled: PollResult): UiCommand | null {
    const q = polled.ui.length > 0 ? polled.ui : this.pendingUi.splice(0, this.pendingUi.length);
    if (q.length === 0) return null;
    if (q !== polled.ui) return q[0];
    this.pendingUi.push(...q.slice(1));
    return q[0];
  }

  private consumeUi(ui: UiCommand | null, polled: PollResult): void {
    if (!ui) return;
    if (ui.kind === 'scriptPick') this.emitAudience('script', 4);
    if (ui.kind === 'dialogueNext') {
      const phase = this.sim.getState().phase;
      if (phase === 'MENU') {
        this.pendingUi.unshift({ kind: 'startRun' });
      } else if (phase === 'ENDING_NORMAL' || phase === 'ENDING_HIDDEN') {
        this.pendingUi.unshift({ kind: 'restartRun' });
      } else {
        this.dialogueNext();
      }
    }
    if (ui.kind === 'barrageToggle') {
      this.barrageEnabled = ui.enabled;
    }
    if (ui.kind === 'barrageDensity') {
      this.barrageDensity = ui.density;
    }
    if (ui.kind === 'soundToggle') {
      this.soundEnabled = ui.enabled;
      this.audio?.setEnabled?.(ui.enabled);
    }
    void polled;
  }

  private dialogueNext(): void {
    const next = this.dialogueAgg.queue.shift();
    if (next) {
      this.dialogueAgg.active = next;
      this.dialogueAgg.remaining = durationOf(next.text);
    } else {
      this.dialogueAgg.active = null;
    }
  }

  private buildInput(polled: PollResult, ui: UiCommand | null): TickInput {
    const st = this.sim.getState();
    // WASD 按相机坐标：屏幕右/上 → 相机右向/前向的地面投影（固定机位下恒定，但始终跟随真实相机）
    const axes = this.scene.getGroundAxes();
    const screen = polled.controls.move;
    const worldMove = {
      x: screen.x * axes.right.x + screen.z * axes.forward.x,
      y: 0,
      z: screen.x * axes.right.z + screen.z * axes.forward.z,
    };
    return {
      time: this.simTime,
      dt: FIXED_DT,
      player: st.player,
      controls: { ...polled.controls, move: worldMove },
      ui,
      rhythm: this.rhythmResult,
      barrageBurst: this.barrageBurstThisFrame,
    };
  }

  private rhythmResult: TickInput['rhythm'] = null;
  private barrageBurstThisFrame = false;

  private dispatch(events: SimEvent[]): void {
    for (const e of events) {
      for (const c of this.consumers) c.onSimEvent(e);
      this.collectForStore(e);
    }
  }

  // ============ 鼠标谱生命周期 ============
  private tickRhythm(polled: PollResult): boolean {
    this.rhythmResult = null;
    this.barrageBurstThisFrame = false;
    const st = this.sim.getState();
    const wasActive = this.rhythmAgg.chart !== null;
    if (st.phase !== 'PERFORM' || st.beat?.type !== 'attack') {
      if (this.rhythmAgg.chart) {
        this.rhythmAgg.chart = null;
        this.rhythmAgg.hold = null;
        this.rhythmBeatKey = null;
        return true;
      }
      return false;
    }
    const beatKey = `${st.round}:${st.boss.stageIndex}:${st.boss.beatIndex}`;
    if (!this.rhythmAgg.chart) {
      if (beatKey === this.completedRhythmBeatKey) return false;
      this.beginRhythm(st, beatKey);
      return true;
    }
    if (this.rhythmBeatKey !== beatKey) {
      this.beginRhythm(st, beatKey);
      return true;
    }

    const chart = this.rhythmAgg.chart;
    this.rhythmAgg.elapsed += FIXED_DT;
    const target = chart.targets[this.rhythmAgg.targetIndex];
    if (!target) return wasActive;
    const windowScale = 1 + st.stanceReward * 0.12;

    // 长按进行中
    const hold = this.rhythmAgg.hold;
    if (hold) {
      if (polled.controls.attackHeld) {
        hold.held += FIXED_DT;
        this.rhythmAgg.holdProgress = Math.min(1, hold.held / (hold.target.holdDuration ?? 1));
        if (hold.held >= (hold.target.holdDuration ?? 0)) {
          this.finishHold(hold.head);
        }
      } else {
        this.finishHold('miss'); // 提前松手 → 落空
      }
      return true;
    }

    if (polled.clickPressed) {
      if (target.kind === 'hold') {
        const head = judgeHoldHead(chart, target, this.rhythmAgg.elapsed, polled.pointer, windowScale);
        if (head.judgement === 'miss') {
          this.recordJudgement('miss', head.early);
          this.rhythmAgg.targetIndex += 1;
        } else {
          this.rhythmAgg.hold = { target, held: 0, head: head.judgement };
          this.rhythmAgg.holdProgress = 0;
        }
      } else {
        // shadow 目标：以光标 vs 替身当前屏幕位置判定
        const r = judgeRhythmClick(chart, target, this.rhythmAgg.elapsed, polled.pointer, windowScale);
        this.recordJudgement(r.judgement, r.early);
        this.rhythmAgg.targetIndex += 1;
      }
      this.afterJudgement();
      return true;
    }

    // 超时落空
    if (this.rhythmAgg.elapsed > target.hitAt + RHYTHM_MISS_AFTER) {
      this.recordJudgement('miss', false);
      this.rhythmAgg.targetIndex += 1;
      this.afterJudgement();
      return true;
    }
    return wasActive;
  }

  private rhythmBeatKey: string | null = null;

  private beginRhythm(st: SimState, beatKey: string): void {
    const round = st.round;
    const style = st.boss.script === 'mad' ? 'mad' : st.boss.script === 'tragic' ? 'tragic' : 'dignity';
    const seed = round * 1000 + st.boss.stageIndex * 100 + st.boss.beatIndex + Math.floor(this.simTime * 10);
    // V2 提速：更多目标、更快 BPM、R2 起长按、R3 起追踪目标
    const targetCount = Math.min(12, 4 + round * 2);
    const bpm = style === 'mad' ? 96 + round * 6 : style === 'tragic' ? 74 + round * 3 : 84 + round * 4;
    const holdCount = round >= 2 ? (round >= 3 ? 2 : 1) : 0;
    const movingCount = round >= 4 ? 2 : round >= 3 ? 1 : 0;
    this.rhythmAgg = {
      chart: generateMouseRhythmChart(seed, { style, targetCount, bpm, holdCount, movingCount, round }),
      beatKey,
      elapsed: 0,
      targetIndex: 0,
      combo: this.rhythmAgg.combo,
      lastJudgement: null,
      lastJudgementEarly: false,
      hold: null,
      holdProgress: null,
      fixture: false,
    };
    this.rhythmBeatKey = beatKey;
  }

  private finishHold(head: RhythmJudgement): void {
    if (!this.rhythmAgg.hold) return;
    this.rhythmAgg.hold = null;
    this.rhythmAgg.holdProgress = null;
    this.recordJudgement(head, false);
    this.rhythmAgg.targetIndex += 1;
    this.afterJudgement();
  }

  private afterJudgement(): void {
    if (!this.rhythmAgg.chart) return;
    if (this.rhythmAgg.targetIndex >= this.rhythmAgg.chart.targets.length) {
      this.rhythmAgg.chart = null;
      this.rhythmAgg.hold = null;
      this.completedRhythmBeatKey = this.rhythmBeatKey;
    }
  }

  private recordJudgement(judgement: RhythmJudgement, early: boolean): void {
    this.rhythmAgg.lastJudgement = judgement;
    this.rhythmAgg.lastJudgementEarly = early;
    this.rhythmResult = { judgement, early, combo: this.rhythmAgg.combo };
    if (judgement === 'miss') {
      this.rhythmAgg.combo = 0;
      this.emitAudience('miss', 4);
    } else {
      this.rhythmAgg.combo += 1;
      if (judgement === 'perfect') {
        this.emitAudience('perfect', 4);
        this.scene.onSimEvent({ type: 'fx', fx: 'sparkle', strength: 1 });
        this.scene.onSimEvent({ type: 'bossAnim', anim: 'attack' });
      } else if (this.rhythmAgg.combo >= 2) {
        this.emitAudience('combo', 2);
      }
      if (RHYTHM_COMBO_MILESTONES.includes(this.rhythmAgg.combo)) {
        this.emitAudience('combo', 8);
      }
    }
  }

  // ============ 观众调度 ============
  private emitAudience(scene: AudienceScene, size: AudienceBurstSize): void {
    const st = this.sim.getState();
    const items = this.audienceScheduler.burst({ scene, size, script: st.boss.script, density: this.barrageDensity });
    this.audienceAgg.push(...items.map((item) => ({ item, bornAt: this.simTime })));
    if (this.audienceAgg.length > 30) this.audienceAgg.splice(0, this.audienceAgg.length - 30);
    this.barrageBurstThisFrame = true;
    if (scene === 'perfect' || scene === 'combo' || scene === 'ending' || scene === 'knockdown') {
      this.audio?.onSimEvent?.({ type: 'sound', kind: 'crowdBurst' } as SimEvent);
    }
  }

  private tickAmbientAudience(): boolean {
    const st = this.sim.getState();
    if (this.simTime < this.nextAmbientAt) return false;
    const phase = st.phase;
    if (phase !== 'WAIT' && phase !== 'SENSE' && phase !== 'PERFORM') return false;
    const items = this.audienceScheduler.ambient({ density: this.barrageDensity });
    this.audienceAgg.push(...items.map((item) => ({ item, bornAt: this.simTime })));
    if (this.audienceAgg.length > 30) this.audienceAgg.splice(0, this.audienceAgg.length - 30);
    this.barrageBurstThisFrame = true;
    this.nextAmbientAt = this.simTime + AMBIENT_INTERVAL;
    return true;
  }

  // ============ 事件聚合 ============
  private collectForStore(e: SimEvent): void {
    switch (e.type) {
      case 'dialogue': {
        const line = { lineId: e.lineId, text: e.text, speaker: e.speaker };
        if (!this.dialogueAgg.active) {
          this.dialogueAgg.active = line;
          this.dialogueAgg.remaining = durationOf(line.text);
        } else {
          this.dialogueAgg.queue.push(line);
        }
        if (e.pool === 'L_PANIC') this.emitAudience('forgot', 4);
        break;
      }
      case 'attackJudgement':
        break;
      case 'bossAnim':
        if (e.anim === 'knockdown') this.emitAudience('knockdown', 8);
        if (e.anim === 'breakCharacter') this.emitAudience('break', 8);
        break;
      case 'anxietyBand':
        this.bandPrompt = e.prompt;
        this.promptKey += 1;
        break;
      case 'phase':
        if (e.phase === 'SENSE') this.emitAudience('entrance', 4);
        if (e.phase === 'EVALUATE') {
          this.ratingAgg.sheetOpen = true;
          this.ratingAgg.countdown = 10;
          this.ratingAgg.submitted = false;
          this.ratingAgg.facts = { ...this.sim.getState().facts };
          this.emitAudience('evaluate', 4);
        }
        if (e.phase === 'DIARY') {
          this.diaryAgg = { open: true, options: [...DIARY_ENTRIES], writeCount: 0, countdown: 8 };
        }
        if (e.phase === 'WAIT') {
          this.ratingAgg.sheetOpen = false;
          this.diaryAgg.open = false;
          this.dialogueAgg = { queue: [], active: null, remaining: 0 };
        }
        if (e.phase === 'ENDING_NORMAL' || e.phase === 'ENDING_HIDDEN') {
          this.emitAudience('ending', 8);
          this.dialogueAgg = { queue: [], active: null, remaining: 0 };
        }
        break;
      case 'rating':
        this.ratingAgg.axes[e.axis as RatingAxisId] = { stars: e.stars, auto: e.axis === 'remembered', evidence: e.evidence };
        break;
      case 'roundEnd': {
        this.ratingAgg.facts = e.result.facts;
        this.diaryAgg.writeCount = 0;
        this.generateArchive(e.result);
        break;
      }
      case 'viewers':
        this.viewers = e.count;
        break;
      case 'persist': {
        storage.save(e.key, e.value);
        if (e.key === 'archive' && Array.isArray(e.value)) this.archiveAgg = e.value as ArchiveEntry[];
        if (e.key === 'stats') this.statsAgg = e.value;
        break;
      }
      case 'ending': {
        this.endingAgg = { variant: e.variant, stats: e.stats };
        this.bandPrompt = null;
        break;
      }
      default:
        break;
    }
  }

  private generateArchive(result: { round: number; totalRating: number; verdict: string; facts: { maxCombo: number; perfectCount: number } }): void {
    const entry: ArchiveEntry = {
      id: `L_ARCH_GEN_${this.archiveGenSeq++}`,
      name: `第${result.round}轮观众`,
      lines: [
        `评分 ${result.totalRating.toFixed(1)} · ${result.verdict === 'perfect' ? '完美' : result.verdict === 'qualified' ? '合格' : '未及格'}`,
        `最大连击 ×${result.facts.maxCombo} · 完美 ${result.facts.perfectCount} 次`,
        '评价：想再看一次。',
      ],
      generated: true,
    };
    this.archiveAgg = [...this.archiveAgg, entry];
    storage.save('archive', this.archiveAgg);
  }

  private tickDialogueAutoAdvance(): boolean {
    if (!this.dialogueAgg.active) return false;
    this.dialogueAgg.remaining -= FIXED_DT;
    if (this.dialogueAgg.remaining > 0) return false;
    const next = this.dialogueAgg.queue.shift();
    if (next) {
      this.dialogueAgg.active = next;
      this.dialogueAgg.remaining = durationOf(next.text);
    } else {
      this.dialogueAgg.active = null;
    }
    return true;
  }

  private pushSnapshot(): void {
    const st = this.sim.getState();
    const now = this.simTime;
    const band = st.boss.band;
    this.shadowScreen = this.scene.getShadowScreen();
    const barrages = this.audienceAgg
      .filter((a) => this.barrageEnabled && (a.item.density !== 'sparse' || this.barrageDensity === 'sparse') && now - a.bornAt < AUDIENCE_VISIBLE_SECONDS)
      .map((a) => a.item);
    const snap: UiSnapshot = {
      phase: st.phase,
      round: st.round,
      paused: st.phase === 'PAUSE',
      runActive: st.phase !== 'MENU',
      anxietyBand: band,
      shakeIntensity: BAND_SHAKE[band] ?? 0,
      stringDetune: BAND_DETUNE[band] ?? 0,
      beat: st.beat,
      rhythm: {
        active: this.rhythmAgg.chart !== null,
        chart: this.rhythmAgg.chart,
        elapsed: this.rhythmAgg.elapsed,
        targetIndex: this.rhythmAgg.targetIndex,
        combo: this.rhythmAgg.combo,
        lastJudgement: this.rhythmAgg.lastJudgement,
        lastJudgementEarly: this.rhythmAgg.lastJudgementEarly,
        holdProgress: this.rhythmAgg.holdProgress ?? null,
        fixture: this.rhythmAgg.fixture,
      },
      audienceBarrage: barrages,
      barrageEnabled: this.barrageEnabled,
      barrageDensity: this.barrageDensity,
      soundEnabled: this.soundEnabled,
      shadowScreen: this.shadowScreen,      viewers: this.viewers,
      rating: this.ratingAgg,
      dialogueQueue: this.dialogueAgg.queue,
      activeDialogue: this.dialogueAgg.active,
      diaryOpen: this.diaryAgg.open,
      diaryOptions: this.diaryAgg.options,
      diaryWriteCount: this.diaryAgg.writeCount,
      diaryCountdown: this.diaryAgg.countdown,
      archiveEntries: this.archiveAgg,
      archiveUnread: this.archiveAgg.length,
      bandPrompt: this.bandPrompt,
      promptKey: this.promptKey,
      stats: this.statsAgg as never,
      ending: { variant: this.endingAgg.variant, stats: this.endingAgg.stats as never },
      scriptName: st.script?.name ?? (st.boss.script ? SCRIPT_NAMES[st.boss.script] : null),
    };
    useUiStore.getState().syncFromEngine(snap);
  }
}

const SCRIPT_NAMES: Record<string, string> = { dignity: '庄重威严', tragic: '悲情独白', mad: '癫狂戏剧' };

function durationOf(text: string): number {
  return Math.max(2.4, Math.min(6, text.length / 7));
}

/** UI 层唯一挂载入口 */
export function createGame(canvas: HTMLCanvasElement): { dispose(): void } {
  const sim = new Simulation(storage);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new SceneManager(renderer, () => sim.getState());
  const input = new InputManager();
  input.attach();
  const engine = new GameEngine(sim, [scene], scene, input);
  engine.start();

  const onUiCommand = (ev: Event): void => {
    const detail = (ev as CustomEvent<{ kind?: string }>).detail;
    if (detail && typeof detail === 'object' && typeof detail.kind === 'string') {
      engine.queueUi(detail as unknown as UiCommand);
    }
  };
  document.addEventListener('uiCommand', onUiCommand);

  const onResize = (): void => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    scene.resize(w, h);
  };
  window.addEventListener('resize', onResize);

  installDevTools({ sim, engine });

  void (async () => {
    try {
      const mod = await import('./audio/AudioManager');
      const AudioManagerClass = (mod as { AudioManager?: unknown }).AudioManager;
      if (typeof AudioManagerClass === 'function') {
        const AudioManagerCtor = AudioManagerClass as new (opts?: unknown) => EventConsumer;
        const audio = new AudioManagerCtor({ storage });
        engine.audio = audio as never;
        engine.addConsumer(audio);
        audio.onSimEvent?.({ type: 'sound', kind: 'throneCreak' } as never);
      }
    } catch {
      // 无声可玩
    }
  })();

  return {
    dispose: () => {
      engine.stop();
      input.dispose();
      document.removeEventListener('uiCommand', onUiCommand);
      window.removeEventListener('resize', onResize);
      scene.dispose();
      renderer.dispose();
    },
  };
}
