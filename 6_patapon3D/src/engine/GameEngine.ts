/**
 * engine/GameEngine.ts - main orchestration (rAF + fixed-step sim + render)
 *
 * v2.0 - divine-drums army-vs-boss.
 * Main loop: fixed-step sim (slow-mo only affects sim dt), real dt drives the
 * visual layer, zustand sync every STORE_SYNC_INTERVAL frames, events drained
 * then dispatched.
 *
 * FSM 4 phases: MENU -> READY (not used; startMatch goes straight to SONG)
 * -> SONG -> MATCH_OVER. Actual flow: MENU -> PLAY -> startMatch() -> SONG
 * -> MATCH_OVER -> toMenu / rematch.
 */

import { WebGLRenderer } from 'three';
import type { PerspectiveCamera, Scene } from 'three';
import {
  AUDIO_VOLUME_DEFAULT,
  BOSS_INITIAL_X,
  FIXED_DT,
  MAX_FRAME_ACCUM,
  STORE_SYNC_INTERVAL,
} from '../core/constants';
import { COLORS } from '../core/data/colors';
import { Simulation } from '../core/simulation/Simulation';
import type { GamePhase, Lane, NoteType, PersistedSettings, PersistedStats, SimEvent } from '../core/types';
import { usePatapongStore } from '../store';
import { AudioManager } from './AudioManager';
import { CameraShake } from './CameraShake';
import { installDevtools } from './devtools';
import { InputManager } from './InputManager';
import type { UiCommand } from './InputManager';
import { drumPosition, IntroDirector } from './IntroDirector';
import { NoteRenderer } from './NoteRenderer';
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
  private noteRenderer: NoteRenderer | null = null;
  private particles: ParticleSystem | null = null;
  private composer: PostFxComposer | null = null;
  private intro: IntroDirector | null = null;
  private lastPhase: GamePhase | null = null;

  private rafId: number | null = null;
  private accumulator = 0;
  private lastTime = 0;
  private frameCount = 0;
  private running = false;
  private startRetries = 0;
  /** Current mute/volume (mirrored from storage so toggleMute can write back). */
  private audioMuted = false;
  private audioVolume = AUDIO_VOLUME_DEFAULT;

  constructor(sim: Simulation) {
    this.sim = sim;
    this.input = new InputManager((cmd) => this.handleUiCommand(cmd));
  }

  /** Create renderer, attach to #three-canvas-container, start rAF (self-retries). */
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
    const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.sceneCtx = this.sceneManager.attach(renderer);
    this.voxel = new VoxelRenderer(this.sceneCtx.scene);
    this.noteRenderer = new NoteRenderer();
    for (const mesh of this.noteRenderer.getMeshes()) {
      this.sceneCtx.scene.add(mesh);
    }
    this.particles = new ParticleSystem(this.voxel.particleMesh);
    this.composer = setupPostfx(renderer, this.sceneCtx.scene, this.sceneCtx.camera);
    this.intro = new IntroDirector({
      audio: this.audio,
      voxel: this.voxel,
      sceneManager: this.sceneManager,
      onDrum: (lane, note) => this.onIntroDrum(lane, note),
      onAwaken: () => this.onIntroAwaken(),
    });
    this.intro.reset();
    this.lastPhase = null;
    this.input.attach();
    renderer.domElement.addEventListener('click', this.onCanvasClick);
    window.addEventListener('resize', this.onResize);
    installDevtools(this.sim);

    // Load persisted settings -> audio + store (UI reads store)
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

  stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** Release all resources. */
  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.renderer?.domElement.removeEventListener('click', this.onCanvasClick);
    this.input.dispose();
    this.particles?.dispose();
    this.voxel?.dispose();
    this.noteRenderer?.dispose();
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

  /** UI command entry (UI clicks / R / Esc / M all go through here). */
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
      case 'skipIntro':
        this.intro?.skip();
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

    // Input buffer (single-frame edge)
    const input = this.input.poll();
    if (input.launch) this.audio.ensureAudio();
    this.sim.setP1Input({ type: input.type });

    // Fixed-step sim (slow-mo only affects sim dt)
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
    if (snap.phase !== this.lastPhase) {
      if (snap.phase === 'MENU') this.intro?.reset();
      this.lastPhase = snap.phase;
    }
    if (snap.phase === 'MENU') {
      this.intro?.tick(elapsed, input);
    }

    // Event dispatch
    this.dispatchEvents(this.sim.drainEvents());

    // Visual layer uses real elapsed dt (never slowed)
    this.cameraShake.update(elapsed);
    this.sceneManager.applyCameraOffset(this.cameraShake.getOffset());
    this.voxel?.sync(snap);
    this.noteRenderer?.sync(snap.rhythm);

    // Perf degradation (applied each frame)
    const degradation = this.watchdog.degradation();
    if (this.particles) {
      this.particles.halveBursts = degradation.includes('PARTICLE_BURST_HALF');
      this.particles.update(elapsed);
    }
    this.composer?.setBloom(!degradation.includes('BLOOM_OFF'));
    this.sceneManager.updateAudience(elapsed);
    this.composer?.render();

    // Sync zustand every STORE_SYNC_INTERVAL frames
    this.frameCount++;
    if (this.frameCount % STORE_SYNC_INTERVAL === 0) {
      usePatapongStore.setState({ ...snap, perfDegradation: degradation });
    }

    this.watchdog.tick(frameMs);
    this.rafId = requestAnimationFrame(this.tick);
  };

  /** Store extension fields (stats / settings) written explicitly. */
  private setStoreExtra(patch: Record<string, unknown>): void {
    usePatapongStore.setState(
      patch as unknown as Partial<ReturnType<typeof usePatapongStore.getState>>,
    );
  }

  /** Event dispatch: persist -> storage; shake/particles/sfx/cheer/matchOver -> subsystems. */
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
        case 'beatHit':
          this.setStoreExtra({
            judgementFeed: {
              id: this.frameCount * 1000 + ev.payload.combo,
              judgement: ev.payload.judgement,
              type: ev.payload.type,
              combo: ev.payload.combo,
            },
          });
          break;
        case 'playerMiss':
          this.setStoreExtra({
            judgementFeed: {
              id: this.frameCount * 1000 + 999,
              judgement: 0,
              type: ev.payload.type,
              combo: 0,
            },
          });
          break;
        case 'matchOver': {
          // v2.0: persist match stats on match end
          const prev = readStats();
          const winner = ev.payload.winner;
          const next: PersistedStats = {
            totalMatches: prev.totalMatches + 1,
            p1Wins: prev.p1Wins + (winner === 'P1' ? 1 : 0),
            bossWins: prev.bossWins + (winner === 'BOSS' ? 1 : 0),
            longestCombo: Math.max(prev.longestCombo, this.sim.snapshot().rhythm.maxCombo),
            lastMatchAt: Date.now(),
          };
          writeStats(next);
          this.setStoreExtra({ stats: next });
          break;
        }
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

  /** Intro drum hit: particles + micro shake at the tapped drum pad. */
  private onIntroDrum(lane: Lane, note: NoteType): void {
    const pos = drumPosition(lane);
    const colorByNote: Record<NoteType, string> = {
      PATA: COLORS.NOTE_PATA,
      PON: COLORS.NOTE_PON,
      DON: COLORS.NOTE_DON,
      CHAKA: COLORS.NOTE_CHAKA,
    };
    this.particles?.spawn(pos, 8, colorByNote[note] ?? COLORS.HIGHLIGHT);
    this.cameraShake.start(0.12, 0.12);
  }

  /** Intro awakening: boss roar shake + red burst + audience cheer. */
  private onIntroAwaken(): void {
    this.cameraShake.start(0.45, 0.5);
    this.sceneManager.cheer('large');
    this.particles?.spawn({ x: BOSS_INITIAL_X, y: 0, z: 0 }, 24, COLORS.BOSS_BODY);
  }

  /** Click during the cinematic fast-forwards to the interactive beats. */
  private onCanvasClick = (): void => {
    this.audio.ensureAudio();
    this.intro?.handleClick();
  };
}
