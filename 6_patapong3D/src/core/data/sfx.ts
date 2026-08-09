/**
 * core/data/sfx.ts - v2.0 synthesized SFX recipes (design: GDD §6; the old
 * docs/design/03-audio-direction.md was deleted 2026-08-09 as v1.0-era)
 *
 * 4 drum SFX + cumulative drums + Fever + command/boss cues + win/lose.
 * AudioManager instantiates these node graphs; zero audio files.
 */

import type { SfxId } from '../types';

export interface SfxVoice {
  startAt: number;
  type: 'square' | 'noise' | 'sine' | 'triangle' | 'sawtooth';
  freq: number;
  freqRamp?: { to: number; duration: number };
  duration: number;
  envelope: { attack: number; decay: number; release: number };
  filter?: { type: 'lowpass' | 'highpass' | 'bandpass'; cutoff: number; q: number };
  volume: number;
}

export interface SfxRecipe {
  id: SfxId;
  voices: SfxVoice[];
  totalDuration: number;
  baseVolume: number;
  priority: 0 | 1 | 2 | 3 | 4 | 5;
}

// ---------- 4 drums ----------

const PATA: SfxRecipe = {
  id: 'pata',
  priority: 1,
  baseVolume: 0.8,
  totalDuration: 0.08,
  voices: [
    {
      startAt: 0, type: 'square', freq: 80, duration: 0.08,
      envelope: { attack: 0.005, decay: 0.06, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1500, q: 1 }, volume: 0.6,
    },
    {
      startAt: 0, type: 'square', freq: 120, duration: 0.08,
      envelope: { attack: 0.005, decay: 0.06, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1500, q: 1 }, volume: 0.3,
    },
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.015,
      envelope: { attack: 0.001, decay: 0.01, release: 0.004 },
      filter: { type: 'bandpass', cutoff: 600, q: 2 }, volume: 0.5,
    },
  ],
};

const PON: SfxRecipe = {
  id: 'pon',
  priority: 2,
  baseVolume: 0.8,
  totalDuration: 0.1,
  voices: [
    {
      startAt: 0, type: 'square', freq: 100, duration: 0.1,
      envelope: { attack: 0.005, decay: 0.08, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1800, q: 1 }, volume: 0.6,
    },
    {
      startAt: 0, type: 'square', freq: 150, duration: 0.1,
      envelope: { attack: 0.005, decay: 0.08, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 1800, q: 1 }, volume: 0.3,
    },
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.02,
      envelope: { attack: 0.001, decay: 0.015, release: 0.004 },
      filter: { type: 'bandpass', cutoff: 800, q: 2 }, volume: 0.5,
    },
  ],
};

const DON: SfxRecipe = {
  id: 'don',
  priority: 2,
  baseVolume: 0.7,
  totalDuration: 0.08,
  voices: [
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.08,
      envelope: { attack: 0.001, decay: 0.06, release: 0.019 },
      filter: { type: 'bandpass', cutoff: 400, q: 5 }, volume: 0.6,
    },
    {
      startAt: 0, type: 'square', freq: 400, duration: 0.008,
      envelope: { attack: 0.001, decay: 0.005, release: 0.002 }, volume: 0.4,
    },
  ],
};

const CHAKA: SfxRecipe = {
  id: 'chaka',
  priority: 3,
  baseVolume: 1.0,
  totalDuration: 0.15,
  voices: [
    {
      startAt: 0, type: 'square', freq: 200, duration: 0.15,
      envelope: { attack: 0.003, decay: 0.13, release: 0.017 },
      filter: { type: 'lowpass', cutoff: 2000, q: 1 }, volume: 0.7,
      freqRamp: { to: 80, duration: 0.08 },
    },
    {
      startAt: 0, type: 'square', freq: 100, duration: 0.15,
      envelope: { attack: 0.003, decay: 0.13, release: 0.017 },
      filter: { type: 'lowpass', cutoff: 1500, q: 1 }, volume: 0.5,
    },
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.03,
      envelope: { attack: 0.001, decay: 0.02, release: 0.009 },
      filter: { type: 'lowpass', cutoff: 2000, q: 1 }, volume: 0.6,
    },
  ],
};

// ---------- cumulative drums (fever) ----------

const PATA_PATA: SfxRecipe = {
  id: 'pataPata',
  priority: 2,
  baseVolume: 0.8,
  totalDuration: 0.24,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
  ],
};

const PATA_3: SfxRecipe = {
  id: 'pata3',
  priority: 3,
  baseVolume: 0.8,
  totalDuration: 0.4,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
    { ...PATA.voices[0]!, startAt: 0.16, freq: 130 },
  ],
};

const PATA_PATA_PONG: SfxRecipe = {
  id: 'pataPataPong',
  priority: 4,
  baseVolume: 0.9,
  totalDuration: 0.6,
  voices: [
    { ...PATA.voices[0]!, startAt: 0 },
    { ...PATA.voices[0]!, startAt: 0.08, freq: 100 },
    { ...PATA.voices[0]!, startAt: 0.16, freq: 130 },
    {
      startAt: 0.3, type: 'square', freq: 50, duration: 0.2,
      envelope: { attack: 0.005, decay: 0.18, release: 0.015 },
      filter: { type: 'lowpass', cutoff: 800, q: 1 }, volume: 0.7,
    },
    {
      startAt: 0.3, type: 'noise', freq: 0, duration: 0.08,
      envelope: { attack: 0.001, decay: 0.06, release: 0.019 },
      filter: { type: 'bandpass', cutoff: 2000, q: 2 }, volume: 0.5,
    },
  ],
};

const FEVER_START: SfxRecipe = {
  id: 'feverStart',
  priority: 5,
  baseVolume: 0.7,
  totalDuration: 0.7,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 261.6 },
    { ...PATA.voices[0]!, startAt: 0.1, freq: 329.6 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 392.0 },
    { ...PATA.voices[0]!, startAt: 0.3, freq: 523.2, duration: 0.4 },
  ],
};

const AUDIENCE_CHEER: SfxRecipe = {
  id: 'audienceCheer',
  priority: 2,
  baseVolume: 0.4,
  totalDuration: 0.3,
  voices: [
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.3,
      envelope: { attack: 0.01, decay: 0.25, release: 0.04 },
      filter: { type: 'bandpass', cutoff: 1400, q: 3 }, volume: 0.4,
      freqRamp: { to: 2000, duration: 0.3 },
    },
  ],
};

// ---------- command / boss cues ----------

/** command resolved: short rising chord */
const COMMAND_RESOLVE: SfxRecipe = {
  id: 'commandResolve',
  priority: 4,
  baseVolume: 0.7,
  totalDuration: 0.5,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 220, duration: 0.12 },
    { ...PATA.voices[0]!, startAt: 0.1, freq: 277.2, duration: 0.12 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 329.6, duration: 0.3 },
  ],
};

/** boss telegraph roar: low saw + noise growl */
const BOSS_ROAR: SfxRecipe = {
  id: 'bossRoar',
  priority: 5,
  baseVolume: 0.8,
  totalDuration: 0.5,
  voices: [
    {
      startAt: 0, type: 'sawtooth', freq: 55, duration: 0.45,
      envelope: { attack: 0.05, decay: 0.3, release: 0.1 },
      filter: { type: 'lowpass', cutoff: 500, q: 2 }, volume: 0.6,
      freqRamp: { to: 35, duration: 0.45 },
    },
    {
      startAt: 0.05, type: 'noise', freq: 0, duration: 0.35,
      envelope: { attack: 0.03, decay: 0.25, release: 0.07 },
      filter: { type: 'bandpass', cutoff: 300, q: 3 }, volume: 0.5,
    },
  ],
};

/** boss hit / army hit feedback: deep thump */
const BOSS_HIT: SfxRecipe = {
  id: 'bossHit',
  priority: 3,
  baseVolume: 0.6,
  totalDuration: 0.25,
  voices: [
    {
      startAt: 0, type: 'sine', freq: 70, duration: 0.2,
      envelope: { attack: 0.001, decay: 0.15, release: 0.05 },
      filter: { type: 'lowpass', cutoff: 700, q: 1 }, volume: 0.6,
      freqRamp: { to: 40, duration: 0.2 },
    },
    {
      startAt: 0, type: 'noise', freq: 0, duration: 0.1,
      envelope: { attack: 0.001, decay: 0.08, release: 0.02 },
      filter: { type: 'lowpass', cutoff: 1200, q: 1 }, volume: 0.4,
    },
  ],
};

// ---------- match outcome ----------

const WIN: SfxRecipe = {
  id: 'win',
  priority: 5,
  baseVolume: 0.7,
  totalDuration: 0.7,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 261.6 },
    { ...PATA.voices[0]!, startAt: 0.1, freq: 329.6 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 392.0 },
    { ...PATA.voices[0]!, startAt: 0.3, freq: 523.2, duration: 0.4 },
  ],
};

const LOSE: SfxRecipe = {
  id: 'lose',
  priority: 5,
  baseVolume: 0.6,
  totalDuration: 0.8,
  voices: [
    { ...PATA.voices[0]!, startAt: 0, freq: 392.0, duration: 0.2 },
    { ...PATA.voices[0]!, startAt: 0.2, freq: 329.6, duration: 0.2 },
    { ...PATA.voices[0]!, startAt: 0.4, freq: 261.6, duration: 0.4 },
  ],
};

const BG_PAD: SfxRecipe = {
  id: 'bgPad',
  priority: 0,
  baseVolume: 0.1,
  totalDuration: 1.0,
  voices: [
    {
      startAt: 0, type: 'square', freq: 50, duration: 1.0,
      envelope: { attack: 0.3, decay: 0.4, release: 0.3 },
      filter: { type: 'lowpass', cutoff: 400, q: 1 }, volume: 0.1,
    },
  ],
};

export const SFX_RECIPES: Record<SfxId, SfxRecipe> = {
  pata: PATA,
  pon: PON,
  don: DON,
  chaka: CHAKA,
  pataPata: PATA_PATA,
  pata3: PATA_3,
  pataPataPong: PATA_PATA_PONG,
  feverStart: FEVER_START,
  audienceCheer: AUDIENCE_CHEER,
  commandResolve: COMMAND_RESOLVE,
  bossRoar: BOSS_ROAR,
  bossHit: BOSS_HIT,
  win: WIN,
  lose: LOSE,
  bgPad: BG_PAD,
};
