/**
 * engine/GameEngine.ts — 主编排:rAF + 固定步 sim + render
 *
 * M1.4 由 agent-engine 实现。
 * 主循环见 TDD §4.2:固定步 sim(慢镜只影响 sim dt)、真实 dt 驱动视觉层、
 * 每 STORE_SYNC_INTERVAL 帧同步 zustand、事件排空后分发。
 */

import { WebGLRenderer } from 'three';
import type { PerspectiveCamera, Scene } from 'three';
import {
  AUDIO_VOLUME_DEFAULT,
  FIXED_DT,
  MAX_FRAME_ACCUM,
  STORE_SYNC_INTERVAL,
} from '../core/constants';
import { Simulation } from '../core/simulation/Simulation';
import type { PersistedSettings, PersistedStats, SimEvent } from '../core/types';
import { usePatapongStore } from '../store';
import { AudioManager } from './AudioManager';
import { CameraShake } from './CameraShake';
import { installDevtools } from './devtools';
import { InputManager } from './InputManager';
import type { UiCommand } from './InputManager';
import { ParticleSystem } from './ParticleSystem';
import { PerfWatchdog } from './PerfWatchdog';
import { setupPostfx } from './postfx';
import type { PostFxComposer } from './postfx';
import { SceneManager } from './SceneManager';
import { readSettings, readStats, resetAll, writeSettings, writeStats } from './storage';
import { VoxelRenderer } from './VoxelRenderer';

const CONTAINER_ID = 'three-canvas-container';

export class GameEngine {
  private readonly sim: Simulation;
  private readonly sceneManager = new SceneManager();
  private readonly audio = new AudioManager();
  private readonly cameraShake = new CameraShake();
  private readonly watchdog = new PerfWatchdog();
  private readonly input: InputManager;

  private renderer: WebGLRenderer | null = null;
  private sceneCtx: { scene: Scene; camera: PerspectiveCamera } | null = null;
  private voxel: VoxelRenderer | null = null;
  private particles: ParticleSystem | null = null;
  private composer: PostFxComposer | null = null;

  private rafId: number | null = null;
  private accumulator = 0;
  private lastTime = 0;
  private frameCount = 0;
  private running = false;
  private startRetries = 0;
  /** 当前静音态 / 音量(镜像 storage,供 toggleMute 写回) */
  private audioMuted = false;
  private audioVolume = AUDIO_VOLUME_DEFAULT;

  constructor(sim: Simulation) {
    this.sim = sim;
    this.input = new InputManager((cmd) => this.handleUiCommand(cmd));
  }

  /** 创建渲染器并挂入 #three-canvas-container,启动 rAF 主循环(容器未就绪时自愈重试) */
  start(): void {
    if (this.running) return;
    const container = document.getElementById(CONTAINER_ID);
    if (!container) {
      this.startRetries++;
      if (this.startRetries <= 120) {
        requestAnimationFrame(() => this.start());
      } else {
        console.error(`GameEngine.start(): 120 帧内未找到 #${CONTAINER_ID}`);
      }
      return;
    }
    this.startRetries = 0;
    const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.sceneCtx = this.sceneManager.attach(renderer);
    this.voxel = new VoxelRenderer(this.sceneCtx.scene);
    this.particles = new ParticleSystem(this.voxel.particleMesh);
    this.composer = setupPostfx(renderer, this.sceneCtx.scene, this.sceneCtx.camera);
    this.input.attach();
    window.addEventListener('resize', this.onResize);
    installDevtools(this.sim);

    // 载入持久化设置 → 应用到音频 + store(UI 读)
    const settings = readSettings();
    this.audioMuted = settings.muted;
    this.audioVolume = settings.volume;
    this.audio.setMuted(settings.muted);
    this.audio.setVolume(settings.volume);
    this.setStoreExtra({ settings, stats: readStats() });

    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  /** 停止主循环 */
  stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** 释放全部资源(renderer / 输入 / 音频 / 体素) */
  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.input.dispose();
    this.particles?.dispose();
    this.voxel?.dispose();
    this.sceneManager.dispose();
    this.composer?.dispose();
    this.audio.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
    this.renderer = null;
    this.sceneCtx = null;
  }

  /** UI 命令入口(UI 点击 / R / Esc / M 都走这里):startMatch / rematch → 开赛,toMenu → 回菜单 */
  handleUiCommand(cmd: UiCommand): void {
    this.audio.ensureAudio();
    switch (cmd) {
      case 'startMatch':
      case 'rematch':
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
        this.setStoreExtra({ settings });
        break;
      }
      case 'resetData':
        resetAll();
        this.setStoreExtra({ stats: readStats(), settings: readSettings() });
        break;
    }
  }

  getSim(): Simulation {
    return this.sim;
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    const frameMs = now - this.lastTime;
    this.lastTime = now;
    const elapsed = Math.min(frameMs / 1000, MAX_FRAME_ACCUM * FIXED_DT);
    this.accumulator += elapsed;

    // 输入缓冲(每帧一次;launch 是单帧边沿)
    const input = this.input.poll();
    if (input.launch) this.audio.ensureAudio();
    this.sim.setP1Input(input);

    // 固定步推进 sim(慢镜只影响 sim dt)
    const slowMo = this.sim.snapshot().juice.slowMo;
    const slowMoFactor = slowMo.timeLeft > 0 ? slowMo.factor : 1;
    let steps = 0;
    while (this.accumulator >= FIXED_DT && steps < MAX_FRAME_ACCUM) {
      this.accumulator -= FIXED_DT;
      this.sim.step(FIXED_DT * slowMoFactor);
      steps++;
    }
    if (this.accumulator >= FIXED_DT * MAX_FRAME_ACCUM) this.accumulator = 0;

    // 事件分发
    this.dispatchEvents(this.sim.drainEvents());

    // 视觉层(真实 elapsed dt,不快不慢)
    this.cameraShake.update(elapsed);
    this.sceneManager.applyCameraOffset(this.cameraShake.getOffset());
    const snap = this.sim.snapshot();
    this.voxel?.sync(snap);

    // 性能降级:每帧读取并应用(幂等)
    const degradation = this.watchdog.degradation();
    if (this.particles) {
      this.particles.halveBursts = degradation.includes('PARTICLE_BURST_HALF');
      this.particles.update(elapsed);
    }
    this.composer?.setBloom(!degradation.includes('BLOOM_OFF'));
    this.sceneManager.updateAudience(elapsed);
    this.composer?.render();

    // 同步 zustand(每 STORE_SYNC_INTERVAL 帧,省 React re-render;降级状态覆盖快照)
    this.frameCount++;
    if (this.frameCount % STORE_SYNC_INTERVAL === 0) {
      usePatapongStore.setState({ ...snap, perfDegradation: degradation });
    }

    this.watchdog.tick(frameMs);
    this.rafId = requestAnimationFrame(this.tick);
  };

  /**
   * 写入 store 的扩展字段(settings / stats)。
   * 注:store 的这两个字段由 agent-ui 并行落地,当前镜像尚未同步,显式展开绕过类型报错。
   */
  private setStoreExtra(patch: Record<string, unknown>): void {
    usePatapongStore.setState(
      patch as unknown as Partial<ReturnType<typeof usePatapongStore.getState>>,
    );
  }

  /** 事件分发:persist → storage;cameraShake / particleBurst / sfx / audienceCheer → 对应子系统 */
  private dispatchEvents(events: SimEvent[]): void {
    for (const ev of events) {
      switch (ev.type) {
        case 'persist':
          if (ev.payload.key === 'stats') {
            writeStats(ev.payload.value as PersistedStats);
            this.setStoreExtra({ stats: readStats() });
          } else {
            writeSettings(ev.payload.value as PersistedSettings);
          }
          break;
        case 'cameraShake':
          this.cameraShake.start(ev.payload.intensity, ev.payload.duration);
          break;
        case 'particleBurst':
          this.particles?.spawn(ev.payload.position, ev.payload.count, ev.payload.color);
          break;
        case 'sfx':
          this.audio.play(ev.payload.id, ev.payload.volume);
          break;
        case 'audienceCheer':
          this.sceneManager.cheer(ev.payload.intensity);
          break;
      }
    }
  }

  private onResize = (): void => {
    const container = document.getElementById(CONTAINER_ID);
    if (!container || !this.renderer || !this.sceneCtx) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    this.renderer.setSize(w, h);
    this.sceneCtx.camera.aspect = w / h;
    this.sceneCtx.camera.updateProjectionMatrix();
    this.composer?.setSize(w, h);
  };
}
