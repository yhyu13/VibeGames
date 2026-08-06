// engine/GameEngine.ts — 编排器（TDD §7 冻结管线）
// rAF → 固定步累加器（1/60, MAX_SIM_STEPS/MAX_CLAMP_DT 保护）→ TickInput 组装
// （InputManager.poll + playerModel.sample）→ sim.update → 事件分发 → store 批量同步 → SceneManager.render。
// 冻结导出：class GameEngine / createGame —— UI 层唯一挂载入口。

import { FIXED_DT, MAX_CLAMP_DT, MAX_SIM_STEPS } from '../core/constants';
import { Simulation } from '../core/simulation/Simulation';
import type { SimApi, SimState } from '../core/simulation/Simulation';
import { sample } from '../core/simulation/playerModel';
import type { EventConsumer, SimEvent } from '../core/simulation/events';
import type { AnxietyBand, BossControls, Speaker, TickInput, UiCommand } from '../core/types';
import { storage } from './storage';
import { InputManager } from './InputManager';
import { SceneManager } from './SceneManager';
import { installDevtools } from './devtools';
import { useUiStore } from '../store';
import type { UiSnapshot } from '../store';
import { LINE_POOLS } from '../core/data/lines';
import { DIARY_ENTRIES } from '../core/data/diary';
import { ARCHIVE_PRESETS } from '../core/data/archives';

const IDLE_CONTROLS: BossControls = { move: { x: 0, y: 0, z: 0 }, attackPressed: false, attackHeld: false };

interface DialText {
  lineId: string;
  text: string;
  speaker: Speaker;
}

export interface EngineDeps {
  scene: SceneManager;
  input: InputManager;
}

export class GameEngine {
  private rafId = 0;
  private running = false;
  private last = 0;
  private acc = 0;
  private simTime = 0;
  private paused = false;
  private uiQueue: UiCommand[] = [];
  private dialogueQueue: DialText[] = [];
  private activeDialogue: DialText | null = null;
  private ratingSheetOpen = false;
  private ratingAxes: Record<'mobility' | 'delivery' | 'visual' | 'remembered', { stars: number; auto: boolean; evidence?: string }> = {
    mobility: { stars: 0, auto: false },
    delivery: { stars: 0, auto: false },
    visual: { stars: 0, auto: false },
    remembered: { stars: 0, auto: true },
  };
  private diaryOpen = false;

  constructor(
    private sim: SimApi,
    private consumers: EventConsumer[],
    private deps?: EngineDeps,
  ) {}

  /** 音频代理合并后可动态挂载。 */
  addConsumer(c: EventConsumer): void {
    this.consumers.push(c);
  }

  /** UI 命令注入点（组件→engine→TickInput.ui，TDD §7 约束①）。 */
  sendUi(cmd: UiCommand): void {
    this.uiQueue.push(cmd);
  }

  /** 每帧：输入采样 → 固定步模拟 → 事件分发 → store 同步 → 渲染。 */
  tick(now: number): void {
    if (!this.running) return;
    if (!this.last) this.last = now;
    const frameDt = Math.min((now - this.last) / 1000, MAX_CLAMP_DT);
    this.last = now;

    const poll = this.deps?.input.poll();
    if (poll) this.uiQueue.push(...poll.ui);
    const controls = poll?.controls ?? IDLE_CONTROLS;

    const state = this.sim.getState();
    const paused = state.phase === 'PAUSE';

    if (paused) {
      // 暂停：不推进模拟；仅投递 UI 命令（恢复/重开）
      const ui = this.uiQueue.shift() ?? null;
      if (ui) {
        const input = this.buildInput(state, controls, ui, 0);
        this.dispatch(this.sim.update(input));
      }
    } else {
      this.acc += frameDt;
      let steps = 0;
      while (this.acc >= FIXED_DT && steps < MAX_SIM_STEPS) {
        this.simTime += FIXED_DT;
        const ui = this.uiQueue.shift() ?? null;
        const input = this.buildInput(state, controls, ui, FIXED_DT);
        this.dispatch(this.sim.update(input));
        this.acc -= FIXED_DT;
        steps += 1;
      }
      if (steps >= MAX_SIM_STEPS) this.acc = 0; // spiral-of-death 保护：丢弃积压
    }

    this.paused = paused;
    this.syncStore();

    const s = this.sim.getState();
    this.deps?.scene.setAnxiety(s.boss.anxiety, s.boss.band);
    this.deps?.scene.render(paused ? 0 : frameDt, s, this.simTime);
  }

  private buildInput(state: SimState, controls: BossControls, ui: UiCommand | null, dt: number): TickInput {
    const player = sample({
      round: state.round,
      time: this.simTime,
      phase: state.phase,
      boss: state.boss,
      barrageActive: state.player.barrageActive,
    });
    return { time: this.simTime, dt, player, controls, ui };
  }

  /** 同步分发（TDD §7 第 5 步：顺序保证，适配层不得重排）。 */
  dispatch(events: SimEvent[]): void {
    for (const e of events) {
      for (const c of this.consumers) c.onSimEvent(e);
      switch (e.type) {
        case 'dialogue':
          this.pushDialogue(e);
          break;
        case 'rating':
          this.ratingAxes = {
            ...this.ratingAxes,
            [e.axis]: { ...this.ratingAxes[e.axis], stars: e.stars, evidence: e.evidence },
          };
          break;
        case 'phase':
          if (e.phase === 'EVALUATE') this.ratingSheetOpen = true;
          else if (e.phase === 'DIARY') this.diaryOpen = true;
          else if (e.phase === 'WAIT' || e.phase === 'MENU') {
            this.ratingSheetOpen = false;
            this.diaryOpen = false;
          }
          break;
        case 'persist':
          storage.save(e.key, e.value);
          break;
        default:
          break; // sound/music/fx/explosion/bossAnim/barrage 由各自适配层消费
      }
    }
  }

  private pushDialogue(e: { lineId: string; pool: string; speaker: Speaker }): void {
    const found = (LINE_POOLS[e.pool] ?? []).find((l) => l.id === e.lineId);
    this.dialogueQueue.push({ lineId: e.lineId, text: found?.text ?? e.lineId, speaker: e.speaker });
    if (!this.activeDialogue) this.activeDialogue = this.dialogueQueue.shift() ?? null;
  }

  /** 事件批后一次性 store 同步（UiSnapshot，避免每事件重渲染）。 */
  private syncStore(): void {
    const s = this.sim.getState();
    const band = s.boss.band;
    const map: Record<AnxietyBand, [number, number]> = {
      calm: [0, 0],
      nervous: [0.25, 0.15],
      shaky: [0.5, 0.35],
      panic: [0.85, 0.6],
    };
    const [shakeIntensity, stringDetune] = map[band];
    const snapshot: UiSnapshot = {
      phase: s.phase,
      round: s.round,
      paused: this.paused,
      runActive: s.phase !== 'MENU',
      anxietyBand: band,
      shakeIntensity,
      stringDetune,
      rating: {
        sheetOpen: this.ratingSheetOpen,
        axes: this.ratingAxes,
        facts: null,
        submitted: false,
        countdown: 10,
      },
      dialogueQueue: this.dialogueQueue,
      activeDialogue: this.activeDialogue,
      diaryOpen: this.diaryOpen,
      diaryOptions: DIARY_ENTRIES,
      diaryWriteCount: 0,
      diaryCountdown: 8,
      archiveEntries: ARCHIVE_PRESETS,
      archiveUnread: 0,
    };
    useUiStore.getState().syncFromEngine(snapshot);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = 0;
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
}

/** UI 层唯一挂载入口：装配 SceneManager + InputManager + Simulation + 可选 AudioManager + devtools。 */
export function createGame(canvas: HTMLCanvasElement, opts?: { sim?: SimApi }): { dispose(): void } {
  const sim = opts?.sim ?? new Simulation();
  const scene = new SceneManager(canvas);
  const input = new InputManager();
  const engine = new GameEngine(sim, [scene], { scene, input });
  installDevtools(sim, scene);
  engine.start();
  attachAudio(engine);
  return {
    dispose: () => {
      engine.stop();
      input.dispose();
      scene.dispose();
    },
  };
}

/** 音频层可选挂载：agent-audio 尚未合并（文件为 stub / 无导出）时静默降级，不破坏主循环。 */
function attachAudio(engine: GameEngine): void {
  try {
    void import('./audio/AudioManager')
      .then((mod) => {
        const Ctor = (mod as { AudioManager?: new () => EventConsumer }).AudioManager;
        if (typeof Ctor === 'function') {
          try {
            engine.addConsumer(new Ctor());
          } catch {
            /* 构造失败 → 无音频 */
          }
        }
      })
      .catch(() => undefined);
  } catch {
    /* 模块缺失 → 无音频 */
  }
}
