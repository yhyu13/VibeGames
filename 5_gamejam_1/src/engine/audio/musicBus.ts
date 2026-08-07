// engine/audio/musicBus.ts — 音乐分层（04-audio-direction.md §1/§2/§4.2）
// 4 模式：calm（稀疏钢琴）/ tense（Ostinato 张力）/ freeplay（全编制）/ ending（Picardy 解决）
// 强度插值 + 焦虑分带 → detune 走音代理；lookahead 0.12s 调度（§6.2）。

import type { AnxietyBand, MusicMode } from '../../core/types';
import { BAND_TEMPO, BPM_BASE } from '../../core/constants';
import type { MasterChain } from './synth';
import { playPianoNote, playStringNote, playThump, playViolinNote, VIOLIN_MICRO_OFFSETS } from './synth';

const BAR = 4 * (60 / BPM_BASE); // 3.333s
const LOOP4 = BAR * 4;           // 13.333s
const LOOKAHEAD = 0.12;
const TICK_MS = 25;

const BAND_DETUNE: Record<AnxietyBand, number> = { calm: 4, nervous: 7, shaky: 14, panic: 25 };
const BAND_LPF: Record<AnxietyBand, number> = { calm: 9000, nervous: 6800, shaky: 4800, panic: 3400 };
const BAND_MUSIC: Record<AnxietyBand, number> = { calm: 1, nervous: 1.05, shaky: 1.12, panic: 1.18 };

/** §1.4 分带层增益表（freeplay 全编制用） */
const BAND_LAYER: Record<AnxietyBand, Record<Layer, number>> = {
  calm: { melody: 0.22, bass: 0.16, strings: 0, ostinato: 0, violin: 0, heartbeat: 0 },
  nervous: { melody: 0.26, bass: 0.2, strings: 0.1, ostinato: 0, violin: 0, heartbeat: 0 },
  shaky: { melody: 0.3, bass: 0.24, strings: 0.22, ostinato: 0.12, violin: 0.18, heartbeat: 0.1 },
  panic: { melody: 0.34, bass: 0.28, strings: 0.3, ostinato: 0.18, violin: 0.26, heartbeat: 0.16 },
};

type Layer = 'melody' | 'bass' | 'strings' | 'ostinato' | 'violin' | 'heartbeat';
const LAYERS: readonly Layer[] = ['melody', 'bass', 'strings', 'ostinato', 'violin', 'heartbeat'];

const ZERO_GAINS: Record<Layer, number> = { melody: 0, bass: 0, strings: 0, ostinato: 0, violin: 0, heartbeat: 0 };

interface NoteEv {
  at: number;      // 循环内偏移（72 BPM 基准秒）
  dur: number;
  layer: Layer;
  midis: number[];
  gain?: number;
}

interface Pattern {
  notes: NoteEv[];
  loopDur: number;
}

// ---------- §1.1 谱面数据（A 小调 4/4 @72BPM） ----------

const MELODY_FULL: [number, number, number][] = [
  [0, 76, 0.833], [0.833, 81, 0.833], [1.667, 79, 0.417], [2.083, 76, 0.417], [2.5, 74, 0.833],
  [3.333, 72, 0.833], [4.167, 69, 0.833], [5.0, 72, 0.833], [5.833, 74, 0.833],
  [6.667, 76, 0.833], [7.5, 79, 0.833], [8.333, 76, 0.417], [8.75, 72, 0.417], [9.167, 74, 0.833],
  [10, 71, 0.833], [10.833, 74, 0.833], [11.667, 79, 1.667],
];

/** WAIT 稀疏化（§1.1）：删 2/3 小节第 4 拍与 1 小节 3.5 拍 */
const MELODY_SPARSE: [number, number, number][] = MELODY_FULL.filter(
  ([t]) => t !== 2.083 && t !== 5.833 && t !== 9.167,
);

const BASS: [number, number, number][] = [
  [0, 45, 1.667], [1.667, 52, 1.667],
  [3.333, 41, 1.667], [5, 48, 1.667],
  [6.667, 48, 1.667], [8.333, 55, 1.667],
  [10, 43, 1.667], [11.667, 50, 1.667],
];

/** §1.2 每和弦 4 音弦乐（高声部密集排列） */
const CHORDS: [number, number[]][] = [
  [0, [57, 64, 69, 76]],     // Am
  [3.333, [53, 57, 60, 65]], // F
  [6.667, [60, 64, 67, 72]], // C
  [10, [55, 59, 62, 67]],    // G
];

function themePattern(sparse: boolean): Pattern {
  const notes: NoteEv[] = [];
  const mel = sparse ? MELODY_SPARSE : MELODY_FULL;
  for (const [t, m, d] of mel) notes.push({ at: t, dur: d, layer: 'melody', midis: [m] });
  if (!sparse) for (const [t, m, d] of BASS) notes.push({ at: t, dur: d, layer: 'bass', midis: [m] });
  notes.sort((a, b) => a.at - b.at);
  return { notes, loopDur: LOOP4 };
}

/** §2 sense：A2/A3 八分交替 Ostinato + Am/F 和声（第 3 小节 G# 小三度）+ 每 4 小节 A5 长音 */
function tensePattern(): Pattern {
  const notes: NoteEv[] = [];
  for (let i = 0; i < 32; i++) {
    notes.push({ at: i * 0.4167, dur: 0.4, layer: 'ostinato', midis: [i % 2 === 0 ? 45 : 57] });
  }
  for (const [t, ms] of [
    [0, [57, 64, 69, 76]],
    [3.333, [53, 57, 60, 65]],
    [6.667, [56, 57, 64, 69, 76]],
    [10, [53, 57, 60, 65]],
  ] as [number, number[]][]) {
    notes.push({ at: t, dur: 2.5, layer: 'strings', midis: ms });
  }
  notes.push({ at: 0.833, dur: 2.5, layer: 'melody', midis: [81], gain: 0.7 });
  notes.sort((a, b) => a.at - b.at);
  return { notes, loopDur: LOOP4 };
}

/** §2 perform：完整主题 + 弦乐 + Ostinato + 心跳（每 2 小节双响）+ 小提琴层 */
function freeplayPattern(): Pattern {
  const notes: NoteEv[] = [];
  for (const [t, m, d] of MELODY_FULL) notes.push({ at: t, dur: d, layer: 'melody', midis: [m] });
  for (const [t, m, d] of BASS) notes.push({ at: t, dur: d, layer: 'bass', midis: [m] });
  for (const [t, ms] of CHORDS) notes.push({ at: t, dur: 2.5, layer: 'strings', midis: ms });
  for (let i = 0; i < 32; i++) {
    notes.push({ at: i * 0.4167, dur: 0.4, layer: 'ostinato', midis: [i % 2 === 0 ? 45 : 57], gain: 0.9 });
  }
  for (let bar = 0; bar < 4; bar += 2) {
    notes.push({ at: bar * BAR, dur: 0.1, layer: 'heartbeat', midis: [55] });
    notes.push({ at: bar * BAR + 0.18, dur: 0.1, layer: 'heartbeat', midis: [55], gain: 0.7 });
  }
  for (const [t, m, d] of MELODY_FULL) notes.push({ at: t, dur: d, layer: 'violin', midis: [m] });
  notes.sort((a, b) => a.at - b.at);
  return { notes, loopDur: LOOP4 };
}

// ---------- §2 横移时长表 ----------

function xfadeDuration(from: MusicMode, to: MusicMode): number {
  if (to === 'ending') return 4;
  if (from === 'calm' && to === 'tense') return 1.2;
  if (from === 'tense' && to === 'freeplay') return 2.5;
  if (from === 'freeplay' && to === 'calm') return 3;
  return 1.5;
}

function modeTempo(mode: MusicMode, band: AnxietyBand): number {
  return mode === 'freeplay' ? BAND_TEMPO[band] : BPM_BASE;
}

function layerTargets(mode: MusicMode, band: AnxietyBand, intensity: number): Record<Layer, number> {
  const i = 0.5 + 0.5 * Math.min(1, Math.max(0, intensity));
  switch (mode) {
    case 'calm':
      return { ...ZERO_GAINS, melody: BAND_LAYER[band].melody * i };
    case 'tense':
      return { ...ZERO_GAINS, melody: 0.08 * i, strings: 0.1 * i, ostinato: 0.12 * i };
    case 'freeplay': {
      const b = BAND_LAYER[band];
      return {
        melody: b.melody * i,
        bass: b.bass * i,
        strings: b.strings * i,
        ostinato: b.ostinato * i,
        violin: b.violin * i,
        heartbeat: b.heartbeat * i,
      };
    }
    case 'ending':
      return { ...ZERO_GAINS };
    default:
      return { ...ZERO_GAINS };
  }
}

// ---------- lookahead 调度器（§6.2） ----------

class Scheduler {
  private timer: number | null = null;
  private pattern: Pattern | null = null;
  private nextIndex = 0;
  private nextTime = 0;
  private tempo = BPM_BASE;
  private tempoRamp: { from: number; to: number; t0: number; dur: number } | null = null;

  constructor(
    private readonly ctx: AudioContext,
    private readonly onEvent: (ev: NoteEv, t: number) => void,
  ) {}

  start(): void {
    if (this.timer !== null) return;
    this.timer = window.setInterval(() => this.tick(), TICK_MS);
  }

  setPattern(p: Pattern): void {
    this.pattern = p;
    this.nextIndex = 0;
    this.nextTime = this.ctx.currentTime + 0.06;
  }

  setTempo(bpm: number, rampDur: number): void {
    if (bpm === this.tempo) return;
    if (rampDur > 0.05) {
      this.tempoRamp = { from: this.tempo, to: bpm, t0: this.ctx.currentTime, dur: rampDur };
    } else {
      this.tempo = bpm;
    }
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.pattern = null;
  }

  private tick(): void {
    const now = this.ctx.currentTime;
    if (this.tempoRamp) {
      const k = Math.min(1, (now - this.tempoRamp.t0) / this.tempoRamp.dur);
      this.tempo = this.tempoRamp.from + (this.tempoRamp.to - this.tempoRamp.from) * k;
      if (k >= 1) this.tempoRamp = null;
    }
    const p = this.pattern;
    if (!p) return;
    const scale = BPM_BASE / this.tempo;
    let guard = 0;
    while (this.nextTime < now + LOOKAHEAD && guard < 128) {
      const ev = p.notes[this.nextIndex];
      this.onEvent(ev, this.nextTime);
      const nxt = p.notes[(this.nextIndex + 1) % p.notes.length];
      let delta = (nxt.at - ev.at) * scale;
      if (nxt.at <= ev.at) delta += p.loopDur * scale;
      this.nextTime += Math.max(0.001, delta);
      this.nextIndex = (this.nextIndex + 1) % p.notes.length;
      guard++;
    }
  }
}

// ---------- MusicBus ----------

export interface MusicBusOptions {
  onRiser?: () => void; // §2 sense→perform 横移 2.0s 处触发
}

export interface MusicBus {
  setMode(mode: MusicMode, intensity: number): void;
  setAnxiety(band: AnxietyBand): void;
  getStringDetuneCents(): number;
  silenceAll(): void;
  dispose(): void;
}

export function createMusicBus(ctx: AudioContext, chain: MasterChain, opts: MusicBusOptions = {}): MusicBus {
  const musicOut = ctx.createGain();
  musicOut.gain.value = 1;
  const musicScale = ctx.createGain();
  musicScale.gain.value = 1;
  const musicSend = ctx.createGain();
  musicSend.gain.value = 0.08;
  musicOut.connect(musicScale);
  musicScale.connect(chain.musicIn);
  musicOut.connect(musicSend);
  musicSend.connect(chain.wet);

  const layerGains = {} as Record<Layer, GainNode>;
  for (const l of LAYERS) {
    const g = ctx.createGain();
    g.gain.value = 0;
    g.connect(musicOut);
    layerGains[l] = g;
  }

  let mode: MusicMode = 'calm';
  let band: AnxietyBand = 'calm';
  let intensity = 0.5;

  const scheduler = new Scheduler(ctx, (ev, t) => dispatchNote(ev, t));

  function rampGains(targets: Record<Layer, number>, dur: number): void {
    const now = ctx.currentTime;
    for (const l of LAYERS) {
      layerGains[l].gain.cancelScheduledValues(now);
      layerGains[l].gain.setValueAtTime(Math.max(layerGains[l].gain.value, 0.0001), now);
      layerGains[l].gain.linearRampToValueAtTime(Math.max(targets[l], 0.0001), now + dur);
    }
  }

  function setTempoForMode(m: MusicMode, dur: number): void {
    scheduler.setTempo(modeTempo(m, band), Math.min(dur, 2.5));
  }

  function dispatchNote(ev: NoteEv, t: number): void {
    const hub = layerGains[ev.layer];
    if (hub.gain.value <= 0.001) return;
    const base = ev.gain ?? 1;
    switch (ev.layer) {
      case 'melody':
        for (const m of ev.midis) {
          playPianoNote(ctx, hub, { midi: m, when: t, gain: base * 0.9, dur: ev.dur, cutoff: 3500 });
        }
        break;
      case 'bass':
        for (const m of ev.midis) {
          playPianoNote(ctx, hub, { midi: m, when: t, gain: base * 0.9, dur: ev.dur, cutoff: 1600 });
        }
        break;
      case 'strings': {
        const attack = 1.2 + Math.random() * 0.8;
        const cutoff = 1200 + Math.random() * 600;
        for (const m of ev.midis) {
          playStringNote(ctx, hub, {
            midi: m,
            when: t,
            gain: base * 0.22,
            attack,
            release: 2.5,
            cutoff,
            detune: BAND_DETUNE[band],
          });
        }
        break;
      }
      case 'ostinato':
        for (const m of ev.midis) {
          playPianoNote(ctx, hub, { midi: m, when: t, gain: base * 0.8, dur: ev.dur, cutoff: 2500 });
        }
        break;
      case 'violin': {
        if (band !== 'shaky' && band !== 'panic') return;
        let midi = ev.midis[0];
        if (band === 'panic' && Math.random() < 0.1) midi -= 7; // §1.3 手抖跳音
        const depth = band === 'panic' ? 52 + Math.random() * 8 : 35 + Math.random() * 15;
        playViolinNote(ctx, hub, {
          midi,
          when: t,
          gain: base * 0.7,
          dur: ev.dur,
          wobbleRate: 5 + Math.random() * 4,
          wobbleDepth: depth,
          micro: VIOLIN_MICRO_OFFSETS[Math.floor(Math.random() * VIOLIN_MICRO_OFFSETS.length)],
          wanderRate: 0.8 + Math.random() * 0.5,
        });
        break;
      }
      case 'heartbeat':
        for (const m of ev.midis) {
          playThump(ctx, hub, { freq: m, when: t, gain: base, dur: ev.dur });
        }
        break;
      default:
        break;
    }
  }

  function applyAnxiety(): void {
    const now = ctx.currentTime;
    chain.musicLPF.frequency.cancelScheduledValues(now);
    chain.musicLPF.frequency.setValueAtTime(Math.max(chain.musicLPF.frequency.value, 10), now);
    chain.musicLPF.frequency.setTargetAtTime(BAND_LPF[band], now, 0.5);
    musicScale.gain.cancelScheduledValues(now);
    musicScale.gain.setValueAtTime(Math.max(musicScale.gain.value, 0.0001), now);
    musicScale.gain.setTargetAtTime(BAND_MUSIC[band] * (0.5 + 0.5 * intensity), now, 0.5);
  }

  function startMode(m: MusicMode, xfade: number): void {
    const prev = mode;
    mode = m;
    rampGains(layerTargets(m, band, intensity), xfade);
    setTempoForMode(m, xfade);
    if (m === 'calm') {
      scheduler.setPattern(themePattern(true));
    } else if (m === 'tense') {
      scheduler.setPattern(tensePattern());
    } else if (m === 'freeplay') {
      scheduler.setPattern(freeplayPattern());
      if (prev === 'tense' && opts.onRiser) {
        window.setTimeout(() => opts.onRiser?.(), 2000);
      }
    } else if (m === 'ending') {
      playEnding(xfade);
      return;
    }
    scheduler.start();
  }

  function playEnding(xfade: number): void {
    scheduler.stop();
    rampGains(ZERO_GAINS, xfade);
    const now = ctx.currentTime;
    chain.musicLPF.frequency.cancelScheduledValues(now);
    chain.musicLPF.frequency.setValueAtTime(chain.musicLPF.frequency.value, now);
    chain.musicLPF.frequency.linearRampToValueAtTime(2000, now + xfade);
    window.setTimeout(() => {
      // §2 ending：Am Picardy 三度 A–C#–E（57/61/64），保持 6s
      for (const m of [57, 61, 64]) {
        playPianoNote(ctx, layerGains.melody, { midi: m, when: ctx.currentTime, gain: 0.1, dur: 6 });
      }
      window.setTimeout(() => {
        const c = ctx.currentTime;
        musicOut.gain.cancelScheduledValues(c);
        musicOut.gain.setValueAtTime(musicOut.gain.value, c);
        musicOut.gain.linearRampToValueAtTime(0.0001, c + 1.5);
      }, 6000);
    }, xfade * 1000);
  }

  return {
    setMode(m: MusicMode, i: number): void {
      intensity = Math.min(1, Math.max(0, i));
      if (m === 'ending') {
        startMode('ending', xfadeDuration(mode, 'ending'));
        return;
      }
      startMode(m, xfadeDuration(mode, m));
    },

    setAnxiety(b: AnxietyBand): void {
      band = b;
      applyAnxiety();
      if (mode === 'freeplay') {
        rampGains(layerTargets(mode, band, intensity), 0.5);
        scheduler.setTempo(BAND_TEMPO[band], 2.5);
      }
    },

    getStringDetuneCents(): number {
      return BAND_DETUNE[band];
    },

    silenceAll(): void {
      scheduler.stop();
      const now = ctx.currentTime;
      rampGains(ZERO_GAINS, 0.4);
      musicScale.gain.cancelScheduledValues(now);
      musicScale.gain.setValueAtTime(musicScale.gain.value, now);
      musicScale.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    },

    dispose(): void {
      scheduler.stop();
      rampGains(ZERO_GAINS, 0.2);
      for (const l of LAYERS) layerGains[l].disconnect();
      musicOut.disconnect();
      musicScale.disconnect();
      musicSend.disconnect();
    },
  };
}
