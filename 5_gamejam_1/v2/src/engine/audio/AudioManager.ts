// engine/AudioManager.ts — Web Audio 合成（BGM 分层 + SFX 合成，零资源）

import type { EventConsumer, SimEvent } from '../../core/simulation/events';
import type { AnxietyBand, SoundKind } from '../../core/types';
import type { StoragePort } from '../../core/simulation/Simulation';

const BAND_BGM: Record<AnxietyBand, { bpm: number; root: number; detune: number; filter: number }> = {
  calm: { bpm: 72, root: 220, detune: 0, filter: 900 },
  nervous: { bpm: 76, root: 233, detune: 6, filter: 750 },
  shaky: { bpm: 82, root: 247, detune: 14, filter: 600 },
  panic: { bpm: 90, root: 262, detune: 28, filter: 480 },
};

const ARP = [0, 7, 12, 7, 5, 12, 7, 5];

export class AudioManager implements EventConsumer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private crowdGain: GainNode | null = null;
  private bpmTimer: number | null = null;
  private band: AnxietyBand = 'calm';
  private stepCount = 0;
  private enabled = true;
  private seen = 0;
  private storage: StoragePort;

  constructor(opts?: { storage?: StoragePort }) {
    this.storage = opts?.storage ?? { load: () => null, save: () => {} };
    const settings = this.storage.load<{ soundEnabled?: boolean }>('settings');
    this.enabled = settings?.soundEnabled ?? true;
  }

  onSimEvent(e: SimEvent): void {
    if (e.type === 'anxietyBand') this.band = e.band;
    if (e.type === 'phase' && e.phase === 'MENU') this.stopBGM();
    if (e.type === 'sound') this.play(e.kind);
  }

  private ensure(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.55;
        this.master.connect(this.ctx.destination);
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.value = 0.4;
        this.bgmGain.connect(this.master);
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.9;
        this.sfxGain.connect(this.master);
        this.crowdGain = this.ctx.createGain();
        this.crowdGain.gain.value = 0;
        this.crowdGain.connect(this.master);
      } catch {
        this.ctx = null;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  startBGM(): void {
    const ctx = this.ensure();
    if (!ctx || this.bpmTimer !== null) return;
    // 低音底噪（弦乐）
    this.droneOsc = ctx.createOscillator();
    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.value = 55;
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 500;
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0.05;
    this.droneOsc.connect(this.droneFilter).connect(this.droneGain).connect(this.bgmGain!);
    this.droneOsc.start();
    // 琶音音序器
    this.scheduleArp();
    this.bpmTimer = window.setInterval(() => this.scheduleArp(), 15000);
    // 观众底噪
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    noise.buffer = buffer;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = 1200;
    noise.connect(nf).connect(this.crowdGain!);
    noise.start();
    if (this.crowdGain) this.crowdGain.gain.value = 0.012 * (this.seen / 50);
  }

  private scheduleArp(): void {
    const ctx = this.ctx;
    if (!ctx || !this.bgmGain) return;
    const cfg = BAND_BGM[this.band];
    const step = 60 / cfg.bpm / 2;
    const now = ctx.currentTime + 0.05;
    for (let i = 0; i < 16; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      const freq = cfg.root * Math.pow(2, (ARP[(i + this.stepCount) % ARP.length] + (i % 4 === 3 ? 12 : 0)) / 12);
      osc.frequency.value = freq;
      osc.detune.value = cfg.detune * (this.band === 'panic' ? 3 : 1);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now + i * step);
      g.gain.linearRampToValueAtTime(0.07, now + i * step + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * step + step * 0.9);
      osc.connect(g).connect(this.bgmGain);
      osc.start(now + i * step);
      osc.stop(now + i * step + step);
    }
    this.stepCount += 16;
    // 心跳：恐慌带
    if (this.band === 'panic') {
      for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 70;
        const g = ctx.createGain();
        const t0 = now + i * 0.45;
        g.gain.setValueAtTime(0.22, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
        osc.connect(g).connect(this.sfxGain!);
        osc.start(t0);
        osc.stop(t0 + 0.25);
      }
    }
  }

  stopBGM(): void {
    if (this.bpmTimer !== null) {
      clearInterval(this.bpmTimer);
      this.bpmTimer = null;
    }
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
      } catch {
        // 已停止
      }
      this.droneOsc = null;
    }
    if (this.droneGain) this.droneGain.gain.value = 0;
  }

  setSeen(seen: number): void {
    this.seen = seen;
    if (this.crowdGain && this.ctx) {
      this.crowdGain.gain.value = 0.008 + 0.012 * (seen / 100);
    }
  }

  setEnabled(v: boolean): void {
    this.enabled = v;
    if (!v) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
  }

  play(kind: SoundKind): void {
    const ctx = this.ensure();
    const dest = this.sfxGain;
    if (!ctx || !dest) return;
    const t = ctx.currentTime;
    const env = (g: GainNode, dur: number, peak = 0.3): void => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    };
    const tone = (freq: number, dur: number, type: OscillatorType, peak = 0.3, glide = 0): void => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (glide !== 0) osc.frequency.linearRampToValueAtTime(freq + glide, t + dur);
      const g = ctx.createGain();
      env(g, dur, peak);
      osc.connect(g).connect(dest);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    };
    const noise = (dur: number, peak: number, freq = 2400): void => {
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * peak;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = freq;
      const g = ctx.createGain();
      env(g, dur, 0.5);
      src.connect(f).connect(g).connect(dest);
      src.start(t);
    };

    switch (kind) {
      case 'perfectHit': tone(880, 0.28, 'sine', 0.3, 440); break;
      case 'goodHit': tone(660, 0.24, 'sine', 0.25, 220); break;
      case 'normalHit': tone(440, 0.2, 'triangle', 0.2, 0); break;
      case 'missHit': tone(150, 0.3, 'square', 0.15, -60); break;
      case 'swordSwing': noise(0.25, 0.25, 1800); break;
      case 'swordDrop': tone(320, 0.5, 'triangle', 0.2, -200); break;
      case 'swordClash': tone(900, 0.4, 'square', 0.2, -300); noise(0.15, 0.3, 3200); break;
      case 'impact': tone(90, 0.35, 'sine', 0.5, -30); noise(0.12, 0.3, 600); break;
      case 'dodgeWhiff': noise(0.18, 0.2, 900); break;
      case 'step': noise(0.06, 0.06, 700); break;
      case 'heartbeat': tone(70, 0.18, 'sine', 0.4, -10); break;
      case 'gong': tone(180, 1.8, 'sine', 0.4, -10); tone(270, 1.4, 'triangle', 0.2, 0); break;
      case 'paper': noise(0.12, 0.12, 3000); break;
      case 'breath': noise(0.4, 0.1, 500); break;
      case 'barrageWhoosh': noise(0.3, 0.16, 1600); break;
      case 'piano': tone(520, 0.5, 'triangle', 0.2, 0); break;
      case 'stringTremolo': {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 330;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 22;
        const lg = ctx.createGain();
        lg.gain.value = 60;
        lfo.connect(lg).connect(osc.frequency);
        const g = ctx.createGain();
        env(g, 0.9, 0.12);
        osc.connect(g).connect(dest);
        osc.start(t);
        osc.stop(t + 1);
        lfo.start(t);
        lfo.stop(t + 1);
        break;
      }
      case 'crowdChatter': noise(0.5, 0.1, 1500); break;
      case 'crowdBurst': noise(0.8, 0.25, 2000); break;
      case 'cameraShutter': noise(0.05, 0.2, 4000); tone(1400, 0.08, 'sine', 0.1, 0); break;
      case 'throneCreak': tone(120, 0.6, 'triangle', 0.15, 60); break;
      case 'armorRattle': noise(0.08, 0.15, 3000); break;
      case 'silence':
        break;
    }
  }

  dispose(): void {
    this.stopBGM();
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
  }
}
