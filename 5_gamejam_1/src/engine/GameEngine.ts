// engine/GameEngine.ts — 编排器（TDD §7 冻结管线）
// rAF → 固定步累加器（FIXED_DT / MAX_SIM_STEPS / MAX_CLAMP_DT）→ TickInput 组装
// （InputManager.poll + playerModel.sample + pendingUi）→ sim.update → dispatch（按生成序）
// → 事件聚合 → useUiStore.syncFromEngine(UiSnapshot) → SceneManager.render。
// 冻结导出：class GameEngine + createGame（UI 层唯一挂载入口）。

import * as THREE from 'three';
import { FIXED_DT, MAX_CLAMP_DT, MAX_SIM_STEPS, BARRAGE_ACTIVE_WINDOW } from '../core/constants';
import type { SimApi, SimState } from '../core/simulation/Simulation';
import { Simulation } from '../core/simulation/Simulation';
import * as playerModel from '../core/simulation/playerModel';
import type { EventConsumer, SimEvent } from '../core/simulation/events';
import type { ArchiveEntry, RatingAxisId, TickInput, UiCommand } from '../core/types';
import { useUiStore, type UiSnapshot } from '../store';
import { InputManager, type PollResult } from './InputManager';
import { SceneManager } from './SceneManager';
import { storage } from './storage';
import { installDevTools } from './devtools';
import { LINE_POOLS } from '../core/data/lines';
import { ARCHIVE_PRESETS } from '../core/data/archives';

function findLineText(lineId: string): { text: string } | null {
  for (const pool of Object.values(LINE_POOLS)) {
    const hit = pool.find((l) => l.id === lineId);
    if (hit) return hit;
  }
  return null;
}

const BAND_SHAKE: Record<string, number> = { calm: 0, nervous: 0.15, shaky: 0.35, panic: 0.6 };
const BAND_DETUNE: Record<string, number> = { calm: 0, nervous: 5, shaky: 15, panic: 30 };

interface EngineDeps {
  renderer: THREE.WebGLRenderer;
  input: InputManager;
  scene: SceneManager;
}

interface DialogueAgg {
  queue: UiSnapshot['dialogueQueue'];
  active: UiSnapshot['activeDialogue'];
}

export class GameEngine {
  private sim: SimApi;
  private consumers: EventConsumer[];
  private deps: EngineDeps | null;
  private running = false;
  private rafId = 0;
  private lastNow = 0;
  private accumulator = 0;
  private simTime = 0;
  private frames = 0;
  private lastPhase: string = 'MENU';
  private pendingUi: UiCommand[] = [];
  private dialogueAgg: DialogueAgg = { queue: [], active: null };
  private barrageAgg: { lineId: string; text: string; bornAt: number }[] = [];
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
  private diaryAgg = { open: false, options: [], writeCount: 0, countdown: 8 };
  private archiveAgg: ArchiveEntry[] = (() => {
    const loaded = storage.load<ArchiveEntry[] | unknown>('archive');
    const generated = Array.isArray(loaded) ? (loaded as ArchiveEntry[]).filter((e) => e.generated) : [];
    return [...ARCHIVE_PRESETS, ...generated];
  })();

  constructor(sim: SimApi, consumers: EventConsumer[], deps?: EngineDeps) {
    this.sim = sim;
    this.consumers = consumers;
    this.deps = deps ?? null;
  }

  addConsumer(c: EventConsumer): void {
    this.consumers.push(c);
  }

  queueUi(cmd: UiCommand): void {
    this.pendingUi.push(cmd);
  }

  tick(now: number): void {
    if (!this.running || !this.deps) return;
    const deps = this.deps;
    const dtRaw = this.lastNow === 0 ? 0 : Math.min((now - this.lastNow) / 1000, MAX_CLAMP_DT);
    this.lastNow = now;
    const state = this.sim.getState();
    const paused = state.phase === 'PAUSE';
    let dirty = false;

    if (!paused) {
      this.accumulator += dtRaw;
      let steps = 0;
      while (this.accumulator >= FIXED_DT && steps < MAX_SIM_STEPS) {
        const polled = deps.input.poll();
        const ui = this.takeUi(polled);
        if (ui && ui.kind === 'startRun' && (state.phase === 'MENU' || state.phase === 'ENDING_NORMAL')) {
          this.sim.resetRun();
          this.sim.beginRun();
        }
        if (ui && ui.kind === 'quitToTitle') {
          this.sim.resetRun(); // phase → MENU，runActive=false → App 切回标题
          this.dialogueAgg = { queue: [], active: null };
          this.barrageAgg = [];
          this.ratingAgg.sheetOpen = false;
          this.diaryAgg.open = false;
          dirty = true;
        }
        if (ui && ui.kind === 'dialogueNext') {
          let next = this.dialogueAgg.queue.shift();
          while (next && next.lineId.startsWith('L_BARRAGE')) next = this.dialogueAgg.queue.shift();
          if (next) this.dialogueAgg.active = next;
          dirty = true;
        }
        const input = this.buildInput(polled, this.sim.getState(), ui);
        const events = this.sim.update(input);
        this.simTime += FIXED_DT;
        this.dispatch(events);
        if (events.length > 0) dirty = true;
        this.accumulator -= FIXED_DT;
        steps++;
      }
    } else {
      // 暂停：模拟不推进，仅捕捉 pauseToggle 恢复
      const polled = deps.input.poll();
      const ui = this.takeUi(polled);
      if (ui && ui.kind === 'pauseToggle') {
        this.sim.update(this.buildInput(polled, state, ui));
        dirty = true;
      }
    }

    this.frames++;
    if (this.sim.getState().phase !== this.lastPhase) {
      this.lastPhase = this.sim.getState().phase;
      dirty = true;
    }
    if (dirty || this.frames % 30 === 0) this.pushSnapshot();
    deps.scene.render(dtRaw);
  }

  dispatch(events: SimEvent[]): void {
    for (const e of events) {
      for (const c of this.consumers) c.onSimEvent(e);
      this.collectForStore(e);
    }
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

  private buildInput(polled: PollResult, state: Readonly<SimState>, ui: UiCommand | null): TickInput {
    const player = playerModel.sample({
      round: state.round,
      time: this.simTime,
      phase: state.phase,
      boss: state.boss,
      barrageActive: state.player.barrageActive,
    });
    // dialogueNext/quitToTitle 由引擎直接消费，不进入模拟
    const uiForSim = ui && (ui.kind === 'dialogueNext' || ui.kind === 'quitToTitle') ? null : ui;
    return { time: this.simTime, dt: FIXED_DT, player, controls: polled.controls, ui: uiForSim };
  }

  private collectForStore(e: SimEvent): void {
    switch (e.type) {
      case 'dialogue': {
        const lineDef = findLineText(e.lineId);
        const line = { lineId: e.lineId, text: lineDef?.text ?? e.lineId, speaker: e.speaker };
        // 模拟逐句播报：新台词直接替换当前行（旧行已说完）
        this.dialogueAgg.queue = [];
        this.dialogueAgg.active = line;
        break;
      }
      case 'barrage': {
        this.barrageAgg.push({ lineId: `L_BARRAGE_${this.barrageAgg.length + 1}`, text: e.text, bornAt: this.simTime });
        break;
      }
      case 'rating': {
        this.ratingAgg.sheetOpen = true;
        this.ratingAgg.axes[e.axis as RatingAxisId] = {
          stars: e.stars,
          auto: e.axis === 'remembered',
          evidence: e.evidence,
        };
        break;
      }
      case 'persist': {
        storage.save(e.key, e.value);
        if (e.key === 'archive' && Array.isArray(e.value)) this.archiveAgg = e.value as ArchiveEntry[];
        break;
      }
      case 'phase': {
        if (e.phase === 'EVALUATE') {
          this.ratingAgg.sheetOpen = true;
          this.ratingAgg.countdown = 10;
          this.ratingAgg.submitted = false;
        }
        if (e.phase === 'DIARY') {
          this.diaryAgg = { open: true, options: this.diaryAgg.options, writeCount: this.diaryAgg.writeCount, countdown: 8 };
        }
        if (e.phase === 'WAIT') {
          this.ratingAgg.sheetOpen = false;
          this.diaryAgg.open = false;
        }
        if (e.phase === 'WAIT' || e.phase === 'ENDING_NORMAL' || e.phase === 'ENDING_HIDDEN') {
          this.dialogueAgg = { queue: [], active: null };
          this.barrageAgg = [];
        }
        break;
      }
      default:
        break;
    }
  }

  private pushSnapshot(): void {
    const st = this.sim.getState();
    const band = st.boss.band;
    const now = this.simTime;
    const barrages = this.barrageAgg
      .filter((b) => now - b.bornAt < BARRAGE_ACTIVE_WINDOW)
      .map((b) => ({ lineId: b.lineId, text: b.text, speaker: 'system' as const }));
    const snap: UiSnapshot = {
      phase: st.phase,
      round: st.round,
      paused: st.phase === 'PAUSE',
      runActive: st.phase !== 'MENU',
      anxietyBand: band,
      shakeIntensity: BAND_SHAKE[band] ?? 0,
      stringDetune: BAND_DETUNE[band] ?? 0,
      beat: st.beat,
      rating: this.ratingAgg,
      dialogueQueue: [...this.dialogueAgg.queue, ...barrages],
      activeDialogue: this.dialogueAgg.active,
      diaryOpen: this.diaryAgg.open,
      diaryOptions: this.diaryAgg.options,
      diaryWriteCount: this.diaryAgg.writeCount,
      diaryCountdown: this.diaryAgg.countdown,
      archiveEntries: this.archiveAgg,
      archiveUnread: this.archiveAgg.length,
    };
    useUiStore.getState().syncFromEngine(snap);
  }
}

/** UI 层唯一挂载入口：装配 SceneManager + InputManager + Simulation + （可选）AudioManager + devtools。 */
export function createGame(canvas: HTMLCanvasElement, opts?: { sim?: SimApi }): { dispose(): void } {
  const sim = opts?.sim ?? new Simulation(storage);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new SceneManager(renderer, () => sim.getState());
  const input = new InputManager();
  const engine = new GameEngine(sim, [scene], { renderer, input, scene });
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

  installDevTools({ sim, rendererInfo: () => JSON.stringify(renderer.info) });

  // 音频代理（agent-audio）：缺失时静默降级为无声运行，不阻塞游戏。
  void (async () => {
    try {
      const mod = await import('./audio/AudioManager');
      const AudioManagerClass = (mod as { AudioManager?: unknown }).AudioManager;
      if (typeof AudioManagerClass === 'function') {
        const AudioManagerCtor = AudioManagerClass as new (opts?: unknown) => EventConsumer;
        engine.addConsumer(new AudioManagerCtor({ storage }));
      }
    } catch {
      // agent-audio 未交付 → 无声音可玩
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
