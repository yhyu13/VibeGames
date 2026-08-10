/**
 * engine/GameEngine.ts — v2.0 主编排(rAF + 固定步进 sim + 渲染适配器)
 *
 * divine-drums army-vs-boss。渲染经 SceneRenderer 适配器:
 * 启动时 probeCapabilities() → RaytraceAdapter(默认)/ RasterAdapter(回退);
 * raytrace 阶梯满级仍持续超预算 → 运行时换 RasterAdapter,**sim 不重置**。
 *
 * 主循环:固定步进 sim(fever slow-mo 只影响 sim dt),真实 dt 驱动视觉层,
 * 每 STORE_SYNC_INTERVAL 帧同步 zustand,事件随 drainEvents 分发。
 */

import { Color, MathUtils, PerspectiveCamera, Vector3, WebGLRenderer } from 'three';
import {
  AUDIO_VOLUME_DEFAULT,
  FIXED_DT,
  MAX_FRAME_ACCUM,
  STORE_SYNC_INTERVAL,
} from '../core/constants';
import { Simulation } from '../core/simulation/Simulation';
import type { PersistedSettings, PersistedStats, SimEvent, SimSnapshot } from '../core/types';
import { usePatapongStore } from '../store';
import { AudioManager } from './AudioManager';
import { CameraShake } from './CameraShake';
import { installDevtools } from './devtools';
import { InputManager } from './InputManager';
import type { UiCommand } from './InputManager';
import { PerfWatchdog } from './PerfWatchdog';
import { RasterAdapter } from './RasterAdapter';
import { probeCapabilities } from './raytrace/capability';
import { RaytraceAdapter } from './raytrace/RaytraceAdapter';
import type { CameraState, LightingState, SceneRenderer, VisualState } from './raytrace/SceneContract';
import { battleScene } from './raytrace/battleScene';
import { readSettings, readStats, resetAll, writeSettings, writeStats } from './storage';

const CONTAINER_ID = 'three-canvas-container';

// ─── 相机(与 v1 街机俯视一致:FOV 40°,(0,2,18) 看向原点) ───
const CAMERA_FOV = 40;
const CAMERA_BASE = { x: 0, y: 2, z: 18 } as const;
const CAMERA_LOOK = { x: 0, y: 0, z: 0 } as const;

/** raytrace 满级降级下仍超预算的连续帧数 → 运行时换 raster */
const RASTER_FALLBACK_FRAMES = 240;

export class GameEngine {
  private readonly sim: Simulation;
  private readonly audio = new AudioManager();
  private readonly cameraShake = new CameraShake();
  private readonly watchdog = new PerfWatchdog();
  private readonly input: InputManager;

  private renderer: WebGLRenderer | null = null;
  private adapter: SceneRenderer<SimSnapshot> | null = null;
  private container: HTMLElement | null = null;

  /** 相机基向量计算辅助(不直接渲染) */
  private readonly camHelper = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
  private readonly camState: CameraState = {
    position: new Vector3(),
    right: new Vector3(1, 0, 0),
    up: new Vector3(0, 1, 0),
    fwd: new Vector3(0, 0, -1),
    tanHalfFov: Math.tan(MathUtils.degToRad(CAMERA_FOV) / 2),
  };
  /** 夜战光照:弱暖阳 + 月光主光源(Phase 5 水面反射同源) */
  private readonly lighting: LightingState = {
    sunDir: new Vector3(0.55, 0.35, 0.45),
    sunColor: new Color(0.4, 0.36, 0.45),
    moonDir: new Vector3(-0.42, 0.42, -0.62),
    moonColor: new Color(0.85, 0.95, 1.15),
    moonIntensity: 1.15,
    ambientScale: 0.95,
    skyExposure: 0.95,
  };
  private readonly visual: VisualState = { lighting: this.lighting };

  private rafId: number | null = null;
  private accumulator = 0;
  private lastTime = 0;
  private elapsedTotal = 0;
  private frameCount = 0;
  private running = false;
  private startRetries = 0;
  private audioMuted = false;
  private audioVolume = AUDIO_VOLUME_DEFAULT;
  private qualityLevel = 0;
  /** raytrace 满级仍超预算的连续帧计数 */
  private slowAtMaxQuality = 0;
  /** 会话战绩(sim persist 事件值;合并进持久化时取增量) */
  private lastSessionStats: PersistedStats = {
    totalMatches: 0,
    p1Wins: 0,
    bossWins: 0,
    longestCombo: 0,
    lastMatchAt: 0,
  };

  constructor(sim: Simulation) {
    this.sim = sim;
    this.input = new InputManager((cmd) => this.handleUiCommand(cmd));
  }

  /** 创建 renderer + 适配器(能力探测),挂到 #three-canvas-container,启动 rAF */
  start(): void {
    if (this.running) return;
    const container = document.getElementById(CONTAINER_ID);
    if (!container) {
      this.startRetries++;
      if (this.startRetries <= 120) {
        requestAnimationFrame(() => this.start());
      } else {
        console.error(`GameEngine.start(): #${CONTAINER_ID} not found after 120 frames`);
      }
      return;
    }
    this.startRetries = 0;
    this.container = container;

    const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const capability = probeCapabilities();
    this.adapter = this.createAdapter(capability.kind);
    this.adapter.setSize(container.clientWidth, container.clientHeight);
    usePatapongStore.setState({ rendererMode: this.adapter.kind, qualityLevel: 0 });

    this.input.attach();
    window.addEventListener('resize', this.onResize);
    installDevtools(this.sim);

    // 持久化设置 → 音频 + store(UI 读 store)
    const settings = readSettings();
    this.audioMuted = settings.muted;
    this.audioVolume = settings.volume;
    this.audio.setMuted(settings.muted);
    this.audio.setVolume(settings.volume);
    usePatapongStore.setState({ settings, stats: readStats() });

    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.input.dispose();
    this.adapter?.dispose();
    this.adapter = null;
    this.audio.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
    this.renderer = null;
    this.container = null;
  }

  /** UI 命令入口(UI 点击 / R / Esc / M 全部走这里) */
  handleUiCommand(cmd: UiCommand): void {
    this.audio.ensureAudio();
    switch (cmd) {
      case 'startMatch':
      case 'rematch':
        usePatapongStore.setState({ winner: null });
        this.sim.startMatch();
        break;
      case 'toMenu':
        this.sim.toMenu();
        break;
      case 'toggleMute': {
        this.audioMuted = !this.audioMuted;
        this.audio.setMuted(this.audioMuted);
        const settings: PersistedSettings = { muted: this.audioMuted, volume: this.audioVolume };
        writeSettings(settings);
        usePatapongStore.setState({ settings });
        break;
      }
      case 'resetData':
        resetAll();
        usePatapongStore.setState({ stats: readStats(), settings: readSettings() });
        break;
      case 'skipIntro':
        // battle 阶段无 intro 可跳(main.tsx 的桥在 intro 未完成前不会路由到这里)
        break;
    }
  }

  getSim(): Simulation {
    return this.sim;
  }

  private createAdapter(kind: 'raytrace' | 'raster'): SceneRenderer<SimSnapshot> {
    const renderer = this.renderer!;
    const adapter: SceneRenderer<SimSnapshot> =
      kind === 'raytrace'
        ? new RaytraceAdapter<SimSnapshot>(renderer, battleScene)
        : new RasterAdapter(renderer);
    adapter.activate();
    return adapter;
  }

  /** 运行时回退:raytrace 满级仍超预算 → 换 raster;sim / 视角 / store 不动 */
  private swapToRaster(): void {
    if (!this.renderer || !this.adapter || this.adapter.kind !== 'raytrace') return;
    console.warn('[raytrace] 满级降级仍持续超预算,运行时回退 raster(sim 不重置)');
    this.adapter.dispose();
    this.adapter = new RasterAdapter(this.renderer);
    this.adapter.activate();
    if (this.container) {
      this.adapter.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    this.adapter.setQuality(1); // raster 侧先关 bloom
    this.qualityLevel = 1;
    usePatapongStore.setState({ rendererMode: 'raster', qualityLevel: this.qualityLevel });
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    const frameMs = now - this.lastTime;
    this.lastTime = now;
    const elapsed = Math.min(frameMs / 1000, MAX_FRAME_ACCUM * FIXED_DT);
    this.elapsedTotal += elapsed;
    this.accumulator += elapsed;

    // 输入缓冲(单帧边沿)
    const input = this.input.poll();
    if (input.launch) this.audio.ensureAudio();
    this.sim.setP1Input({ type: input.type });

    // 固定步进 sim(fever slow-mo 只影响 sim dt)
    let steps = 0;
    while (this.accumulator >= FIXED_DT && steps < MAX_FRAME_ACCUM) {
      this.accumulator -= FIXED_DT;
      const fever = this.sim.snapshot().fever;
      const slowMoFactor = fever.active ? fever.factor : 1;
      this.sim.step(FIXED_DT * slowMoFactor);
      steps++;
    }
    if (this.accumulator >= FIXED_DT * MAX_FRAME_ACCUM) this.accumulator = 0;

    const snap = this.sim.snapshot();

    // 事件分发
    this.dispatchEvents(this.sim.drainEvents());

    // 相机:基准位 + 震动偏移(视觉层用真实 dt,永不 slow-mo)
    this.cameraShake.update(elapsed);
    const off = this.cameraShake.getOffset();
    this.camHelper.position.set(CAMERA_BASE.x + off.x, CAMERA_BASE.y + off.y, CAMERA_BASE.z + off.z);
    this.camHelper.lookAt(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
    this.camHelper.updateMatrixWorld();
    this.camState.position.copy(this.camHelper.position);
    this.camState.right.setFromMatrixColumn(this.camHelper.matrixWorld, 0);
    this.camState.up.setFromMatrixColumn(this.camHelper.matrixWorld, 1);
    this.camState.fwd.setFromMatrixColumn(this.camHelper.matrixWorld, 2).negate();

    // 性能降级 → 适配器质量阶梯(watchdog 0..6;raster 侧只需 0/1 关 bloom);
    // raytrace 满级(6)仍持续超预算 → 换 raster
    const degradation = this.watchdog.degradation();
    const rawLevel = this.watchdog.qualityLevel();
    const level = this.adapter?.kind === 'raster' ? Math.min(rawLevel, 1) : rawLevel;
    if (this.adapter && level !== this.qualityLevel) {
      this.qualityLevel = level;
      this.adapter.setQuality(level);
    }
    if (this.adapter?.kind === 'raytrace' && rawLevel >= 6) {
      this.slowAtMaxQuality++;
      if (this.slowAtMaxQuality >= RASTER_FALLBACK_FRAMES) this.swapToRaster();
    } else {
      this.slowAtMaxQuality = 0;
    }

    // 渲染
    this.adapter?.render(snap, this.visual, this.camState, this.elapsedTotal);

    // zustand 同步(降频)
    this.frameCount++;
    if (this.frameCount % STORE_SYNC_INTERVAL === 0) {
      usePatapongStore.setState({
        ...snap,
        perfDegradation: degradation,
        rendererMode: this.adapter?.kind ?? 'raster',
        qualityLevel: this.qualityLevel,
      });
    }

    this.watchdog.tick(frameMs);
    this.rafId = requestAnimationFrame(this.tick);
  };

  /** 事件分发:persist → storage(会话增量合并);shake/sfx → 子系统;粒子/欢呼仅 raster */
  private dispatchEvents(events: SimEvent[]): void {
    for (const ev of events) {
      switch (ev.type) {
        case 'persist':
          if (ev.payload.key === 'stats') {
            const session = ev.payload.value as PersistedStats;
            const stored = readStats();
            const last = this.lastSessionStats;
            const next: PersistedStats = {
              totalMatches: stored.totalMatches + (session.totalMatches - last.totalMatches),
              p1Wins: stored.p1Wins + (session.p1Wins - last.p1Wins),
              bossWins: stored.bossWins + (session.bossWins - last.bossWins),
              longestCombo: Math.max(stored.longestCombo, session.longestCombo),
              lastMatchAt: session.lastMatchAt,
            };
            this.lastSessionStats = session;
            writeStats(next);
            usePatapongStore.setState({ stats: next });
          } else {
            writeSettings(ev.payload.value as PersistedSettings);
          }
          break;
        case 'cameraShake':
          this.cameraShake.start(ev.payload.intensity, ev.payload.duration);
          break;
        case 'particleBurst':
          if (this.adapter instanceof RasterAdapter) {
            this.adapter.spawnBurst(ev.payload.position, ev.payload.count, ev.payload.color);
          }
          break;
        case 'sfx':
          this.audio.play(ev.payload.id, ev.payload.volume);
          break;
        case 'audienceCheer':
          if (this.adapter instanceof RasterAdapter) {
            this.adapter.cheer(ev.payload.intensity);
          }
          break;
        case 'beatHit':
          usePatapongStore.setState({
            judgementFeed: {
              id: this.frameCount * 4 + ev.payload.combo,
              judgement: ev.payload.judgement,
              type: ev.payload.type,
              combo: ev.payload.combo,
            },
          });
          break;
        case 'playerMiss':
          usePatapongStore.setState({
            judgementFeed: {
              id: this.frameCount * 4 + 3,
              judgement: 0,
              type: ev.payload.type,
              combo: 0,
            },
          });
          break;
        case 'matchOver':
          // 战绩持久化由随后的 persist 事件完成;这里只更新 UI 胜负
          usePatapongStore.setState({ winner: ev.payload.winner });
          break;
      }
    }
  }

  private onResize = (): void => {
    if (!this.container || !this.adapter) return;
    this.adapter.setSize(this.container.clientWidth, this.container.clientHeight);
  };
}
