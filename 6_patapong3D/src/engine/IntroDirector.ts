/**
 * engine/IntroDirector.ts - MENU-phase intro scene (觉醒仪式)
 *
 * v2.0 intro lives INSIDE the frozen MENU phase (no GamePhase contract
 * change, see docs/design/05-intro-scene-plan.md D1). Owns the timeline:
 * boot -> title -> reveal -> awaken (4 beats, timing-only) -> ready.
 * Audio/visual side effects go through AudioManager/VoxelRenderer/SceneManager;
 * the React overlays read the mirrored IntroState from the store.
 */

import { DRUM_PAD_DEFS } from '../core/data/court';
import type { Lane, NoteType } from '../core/types';
import { usePatapongStore, type IntroState } from '../store';
import { AudioManager } from './AudioManager';
import type { InputState } from './InputManager';
import { SceneManager } from './SceneManager';
import { VoxelRenderer } from './VoxelRenderer';

export type IntroStage = IntroState['stage'];

// ---------- timeline (engine-level presentation timings) ----------

const BOOT_DURATION = 1.2;
const BOOT_BEAT_AT = 0.4;
const TITLE_DURATION = 2.8;
const REVEAL_DURATION = 2.5;
const BEAT_INTERVAL = 1.0; // 60 BPM metronome
const HIT_WINDOW_S = 0.2; // mirrors NORMAL judgement window
const PULSE_DECAY_S = 0.2;
const AWAKEN_DURATION = 2.4;
const DARKNESS_EASE_S = 1.6;
const CAMERA_PUSH_EASE_S = 1.4;
const FLASH_DECAY_S = 0.3;
const REVEAL_CAMERA_PUSH = 3;

const NOTE_LANE: Record<NoteType, Lane> = {
  PATA: 0,
  PON: 1,
  DON: 2,
  CHAKA: 3,
};

const NOTE_SFX: Record<NoteType, Parameters<AudioManager['play']>[0]> = {
  PATA: 'pata',
  PON: 'pon',
  DON: 'don',
  CHAKA: 'chaka',
};

export interface IntroDirectorOptions {
  audio: AudioManager;
  voxel: VoxelRenderer;
  sceneManager: SceneManager;
  /** drum hit feedback (particles / shake) wired by GameEngine */
  onDrum?: (lane: Lane, note: NoteType) => void;
  /** awakening climax feedback (boss roar flash / shake) wired by GameEngine */
  onAwaken?: () => void;
}

export class IntroDirector {
  private readonly audio: AudioManager;
  private readonly voxel: VoxelRenderer;
  private readonly sceneManager: SceneManager;
  private readonly onDrum?: (lane: Lane, note: NoteType) => void;
  private readonly onAwaken?: () => void;

  private stage: IntroStage = 'boot';
  private elapsed = 0;
  private beats: NoteType[] = [];
  private complete = false;
  private beatCycle = 0;
  private awakeningElapsed = 0;
  private pulseTimers: number[] = [0, 0, 0, 0];
  private bootBeatPlayed = false;
  private darkness = 1;
  private darknessTarget = 1;
  private cameraPush = 0;
  private cameraPushTarget = 0;
  private flash = 0;
  private armyEyePop = 0;
  private bossEyePop = 0;
  private unitEyePops: number[] = [0, 0, 0];

  constructor(options: IntroDirectorOptions) {
    this.audio = options.audio;
    this.voxel = options.voxel;
    this.sceneManager = options.sceneManager;
    this.onDrum = options.onDrum;
    this.onAwaken = options.onAwaken;
  }

  /** Called when the game enters MENU (fresh cinematic every visit). */
  reset(): void {
    this.stage = 'boot';
    this.elapsed = 0;
    this.beats = [];
    this.complete = false;
    this.beatCycle = 0;
    this.awakeningElapsed = 0;
    this.pulseTimers = [0, 0, 0, 0];
    this.bootBeatPlayed = false;
    this.darkness = 1;
    this.darknessTarget = 1;
    this.cameraPush = 0;
    this.cameraPushTarget = 0;
    this.flash = 0;
    this.armyEyePop = 0;
    this.bossEyePop = 0;
    this.unitEyePops = [0, 0, 0];
    this.voxel.setArmyAwake(0);
    this.voxel.setBossSilhouette(true);
    this.voxel.pulseBossEyes(0);
    for (const lane of [0, 1, 2, 3] as const) this.voxel.pulseDrum(lane, 0);
    this.syncStore();
  }

  /** Skip the cinematic entirely (SKIP button / click). */
  skip(): void {
    if (this.complete) return;
    this.complete = true;
    this.stage = 'ready';
    this.beats = ['PATA', 'PON', 'DON', 'CHAKA'];
    this.voxel.setArmyAwake(1);
    this.voxel.setBossSilhouette(false);
    this.voxel.pulseBossEyes(1);
    this.darknessTarget = 0;
    this.cameraPushTarget = 0;
    this.flash = 0;
    this.armyEyePop = 1;
    this.bossEyePop = 1;
    this.unitEyePops = [1, 1, 1];
    this.audio.play('commandResolve', 0.5);
    this.syncStore();
  }

  /** Click-to-fast-forward: boot/title/reveal jump straight to the beats. */
  fastForward(): void {
    if (this.complete || this.stage === 'awaken' || this.stage === 'boot') return;
    this.stage = 'awaken';
    this.elapsed = 0;
    this.beatCycle = BEAT_INTERVAL * 0.5; // half-beat pickup before first ring
    this.cameraPushTarget = REVEAL_CAMERA_PUSH;
    this.darknessTarget = 1;
  }

  /** First user gesture on boot: play the opening drum and leave the black. */
  begin(): void {
    if (this.stage !== 'boot') return;
    this.audio.play('pata', 0.9);
    this.pulseTimers[0] = PULSE_DECAY_S;
    this.stage = 'title';
    this.elapsed = 0;
    this.syncStore();
  }

  /** Canvas click: boot -> begin; cinematic stages -> fast forward. */
  handleClick(): void {
    if (this.stage === 'boot') {
      this.begin();
    } else {
      this.fastForward();
    }
  }

  /** Advance the timeline. GameEngine calls this only while phase === 'MENU'. */
  tick(dt: number, input: InputState): void {
    if (!this.complete) {
      this.elapsed += dt;

      // keyboard fast paths: any drum key starts or skips the cinematic
      if (input.launch && input.type) {
        if (this.stage === 'boot') {
          this.begin();
        } else if (this.stage === 'title' || this.stage === 'reveal') {
          this.fastForward();
        }
      }

      switch (this.stage) {
        case 'boot':
          if (!this.bootBeatPlayed && this.elapsed >= BOOT_BEAT_AT) {
            this.bootBeatPlayed = true;
            this.audio.play('pata', 0.9);
            this.pulseTimers[0] = PULSE_DECAY_S;
          }
          if (this.elapsed >= BOOT_DURATION) {
            this.stage = 'title';
            this.elapsed = 0;
          }
          break;

        case 'title':
          if (this.elapsed >= TITLE_DURATION) {
            this.stage = 'reveal';
            this.elapsed = 0;
          }
          break;

        case 'reveal':
          this.cameraPushTarget = REVEAL_CAMERA_PUSH;
          if (this.elapsed >= REVEAL_DURATION) {
            this.stage = 'awaken';
            this.elapsed = 0;
            this.beatCycle = BEAT_INTERVAL * 0.5; // pickup: first beat in 0.5s
          }
          break;

        case 'awaken':
          this.cameraPushTarget = REVEAL_CAMERA_PUSH;
          this.darknessTarget = 1;
          if (this.beats.length < 4) {
            this.runMetronome(dt, input);
          } else {
            this.awakeningElapsed += dt;
            if (this.awakeningElapsed >= AWAKEN_DURATION) {
              this.stage = 'ready';
              this.complete = true;
              this.darknessTarget = 0;
              this.cameraPushTarget = 0;
            }
          }
          break;

        case 'ready':
          this.darknessTarget = 0;
          this.cameraPushTarget = 0;
          break;
      }

      this.updatePulses(dt);
    }

    // awakening eye pops decay back to a calm 1.0
    if (this.armyEyePop > 0) {
      this.armyEyePop = Math.max(1, this.armyEyePop - dt * 3);
      this.voxel.setArmyAwake(this.armyEyePop);
    }
    if (this.bossEyePop > 0) {
      this.bossEyePop = Math.max(1, this.bossEyePop - dt * 3);
      this.voxel.pulseBossEyes(this.bossEyePop);
    }
    for (let i = 0; i < this.unitEyePops.length; i++) {
      if (this.unitEyePops[i]! > 0) {
        this.unitEyePops[i] = Math.max(1, this.unitEyePops[i]! - dt * 3);
        this.voxel.setUnitAwake(i, this.unitEyePops[i]!);
      }
    }

    this.flash = Math.max(0, this.flash - dt / FLASH_DECAY_S);
    this.easeMood(dt);
    this.syncStore();
  }

  // ---------- timeline internals ----------

  private runMetronome(dt: number, input: InputState): void {
    this.beatCycle += dt;
    if (this.beatCycle >= BEAT_INTERVAL) {
      this.beatCycle -= BEAT_INTERVAL;
      this.audio.play('don', 0.1); // quiet metronome click
    }

    if (input.launch && input.type) {
      const timeToBeat = BEAT_INTERVAL - this.beatCycle;
      const distToBeat = Math.min(timeToBeat, BEAT_INTERVAL - timeToBeat);
      if (distToBeat <= HIT_WINDOW_S) {
        this.registerHit(input.type);
      }
    }
  }

  private registerHit(note: NoteType): void {
    this.beats.push(note);
    const lane = NOTE_LANE[note];
    this.pulseTimers[lane] = PULSE_DECAY_S;
    this.audio.play(NOTE_SFX[note], 0.85);
    this.onDrum?.(lane, note);

    const hitCount = this.beats.length;
    if (hitCount < 4) {
      // one eye opens per hit (unit index 0..2)
      this.unitEyePops[hitCount - 1] = 1.15;
    } else {
      // fourth hit: the whole army awakens
      this.armyEyePop = 1.25;
      this.bossEyePop = 1.4;
      this.voxel.setBossSilhouette(false);
      this.audio.play('commandResolve', 0.8);
      this.audio.play('audienceCheer', 0.6);
      this.audio.play('bossRoar', 0.85);
      this.flash = 1;
      this.onAwaken?.();
      this.awakeningElapsed = 0;
    }
  }

  private updatePulses(dt: number): void {
    for (let i = 0; i < this.pulseTimers.length; i++) {
      if (this.pulseTimers[i]! > 0) {
        this.pulseTimers[i] = Math.max(0, this.pulseTimers[i]! - dt);
        this.voxel.pulseDrum(i as Lane, this.pulseTimers[i]! / PULSE_DECAY_S);
      }
    }
  }

  private easeMood(dt: number): void {
    const darkSpeed = dt / DARKNESS_EASE_S;
    this.darkness += (this.darknessTarget - this.darkness) * darkSpeed;
    if (Math.abs(this.darkness - this.darknessTarget) < 0.005) {
      this.darkness = this.darknessTarget;
    }
    const pushSpeed = dt / CAMERA_PUSH_EASE_S;
    this.cameraPush += (this.cameraPushTarget - this.cameraPush) * pushSpeed;
    if (Math.abs(this.cameraPush - this.cameraPushTarget) < 0.02) {
      this.cameraPush = this.cameraPushTarget;
    }
    this.sceneManager.setIntroDarkness(this.darkness);
    this.sceneManager.setIntroCameraPush(this.cameraPush);
  }

  private syncStore(): void {
    const state: IntroState = {
      stage: this.stage,
      beats: [...this.beats],
      complete: this.complete,
      nextBeatIn: BEAT_INTERVAL - this.beatCycle,
      flash: this.flash,
      darkness: this.darkness,
    };
    usePatapongStore.setState({ intro: state });
  }
}

/** Drum pad world positions (for particles). */
export function drumPosition(lane: Lane): { x: number; y: number; z: number } {
  return DRUM_PAD_DEFS[lane]?.position ?? { x: 0, y: -6.5, z: 3 };
}
