/**
 * engine/GameEngine.ts — v2.0 战斗主循环(接线层,非核心逻辑)
 *
 * 核心是 src/core/simulation/Simulation.ts 的冻结 FSM(MENU → SONG → MATCH_OVER),
 * 但它从未被实例化——本引擎把它真正跑起来:
 *  - rAF 主循环逐帧调用 Simulation.step(dt);step 仅在 SONG 实际推进。
 *  - W/A/S/D → NoteType → Simulation.setP1Input(单帧输入缓冲)。
 *  - 每 STORE_SYNC_INTERVAL 帧把 Simulation.snapshot() 整体写入 zustand store,
 *    渲染/UI 只消费快照,不碰模拟(冻结契约)。
 *  - Simulation 的 SimEvent 经 onEvent 消费:matchOver→winner、persist→localStorage+stats、
 *    beatHit/playerMiss→判定飘字。
 *  - UI 命令桥:组件只发 UiCommand,全部路由到这里的 handleUiCommand。
 *
 * 渲染仍由 IntroEngine 的 three 画布承担(背景演出);本引擎专注状态推进与快照同步。
 */

import { STORE_SYNC_INTERVAL, STORAGE_KEY_SETTINGS, STORAGE_KEY_STATS } from '../core/constants';
import { Simulation } from '../core/simulation/Simulation';
import type {
  NoteType,
  PersistedSettings,
  PersistedStats,
  SimEvent,
  SimSnapshot,
} from '../core/types';
import { usePatapongStore, type UiCommand } from '../store';

const KEY_NOTES: Record<string, NoteType> = {
  KeyW: 'PATA',
  KeyA: 'PON',
  KeyS: 'DON',
  KeyD: 'CHAKA',
};

export class GameEngine {
  private readonly sim = new Simulation();
  private running = false;
  private lastTime = 0;
  private syncCounter = 0;
  private rafId = 0;
  private keyHandler: ((event: KeyboardEvent) => void) | null = null;

  /** 启动主循环。step/snapshot 是纯核心调用;本方法只做编排。 */
  start(): void {
    if (this.running) return;
    this.running = true;

    this.loadPersisted();
    this.sim.onEvent((event) => this.handleEvent(event));

    this.keyHandler = (event: KeyboardEvent) => {
      const note = KEY_NOTES[event.code];
      // 不在 SONG 阶段的输入会被 step() 清空(安全);仍统一喂入缓冲
      if (note && !event.repeat) this.sim.setP1Input({ type: note });
    };
    window.addEventListener('keydown', this.keyHandler);

    const frame = (time: number) => {
      if (!this.running) return;
      const dt = Math.min(0.05, this.lastTime ? (time - this.lastTime) / 1000 : 0);
      this.lastTime = time;

      this.sim.step(dt); // 仅 SONG 推进;MENU/MATCH_OVER 早退

      if (++this.syncCounter >= STORE_SYNC_INTERVAL) {
        this.syncCounter = 0;
        this.syncSnapshot();
      }
      this.rafId = requestAnimationFrame(frame);
    };
    this.rafId = requestAnimationFrame(frame);
  }

  stop(): void {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.rafId);
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = null;
  }

  /** UI 命令桥入口(与 IntroEngine 共用;intro 相关命令由 IntroEngine 分支处理) */
  handleUiCommand(command: UiCommand): void {
    switch (command) {
      case 'startMatch':
        this.sim.startMatch();
        usePatapongStore.setState({ winner: null });
        break;
      case 'rematch':
        this.sim.rematch();
        usePatapongStore.setState({ winner: null });
        break;
      case 'toMenu':
        this.sim.toMenu();
        usePatapongStore.setState({ winner: null });
        break;
      case 'skipIntro':
        this.sim.startMatch();
        usePatapongStore.setState({ winner: null });
        break;
      case 'toggleMute':
        this.toggleMute();
        break;
      case 'resetData':
        localStorage.removeItem(STORAGE_KEY_STATS);
        localStorage.removeItem(STORAGE_KEY_SETTINGS);
        usePatapongStore.setState({ stats: null, settings: null });
        break;
      default:
        break; // 'replay' 属 intro,由 IntroEngine 处理
    }
  }

  /** Simulation 副作用出口:写到 store/localStorage,绝不反向改模拟(冻结契约) */
  private handleEvent(event: SimEvent): void {
    switch (event.type) {
      case 'matchOver':
        usePatapongStore.setState({ winner: event.payload.winner });
        break;
      case 'persist':
        if (event.payload.key === 'stats') {
          const stats = event.payload.value as PersistedStats;
          localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
          usePatapongStore.setState({ stats });
        } else if (event.payload.key === 'settings') {
          const settings = event.payload.value as PersistedSettings;
          localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
          usePatapongStore.setState({ settings });
        }
        break;
      case 'beatHit':
        usePatapongStore.setState({
          judgementFeed: {
            id: Date.now(),
            judgement: event.payload.judgement,
            type: event.payload.type,
            combo: event.payload.combo,
          },
        });
        break;
      case 'playerMiss':
        usePatapongStore.setState({
          judgementFeed: { id: Date.now(), judgement: 0, type: event.payload.type, combo: 0 },
        });
        break;
      default:
        break;
    }
  }

  /** 整帧快照写入 store(渲染/UI 只读这个) */
  private syncSnapshot(): void {
    const snap: SimSnapshot = this.sim.snapshot();
    usePatapongStore.setState(snap);
  }

  private toggleMute(): void {
    const current = usePatapongStore.getState().settings?.muted ?? false;
    const settings: PersistedSettings = {
      muted: !current,
      volume: usePatapongStore.getState().settings?.volume ?? 0.5,
    };
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    usePatapongStore.setState({ settings });
  }

  /** 启动时回读已持久化战绩(展示 best across sessions) */
  private loadPersisted(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STATS);
      if (raw) usePatapongStore.setState({ stats: JSON.parse(raw) as PersistedStats });
      const rawSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (rawSettings) usePatapongStore.setState({ settings: JSON.parse(rawSettings) as PersistedSettings });
    } catch {
      /* 损坏数据忽略,引擎继续以默认值运行 */
    }
  }
}
