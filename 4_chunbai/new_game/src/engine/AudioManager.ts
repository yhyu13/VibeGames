const BGM_BPM = 120;
const SIXTEENTH = 60 / BGM_BPM / 4;
const BGM_PATTERN_LENGTH = 64;
const BGM_LOOKAHEAD = 0.12;
const SCHEDULE_INTERVAL_MS = 25;

const CHORD_PROGRESSION = [
  { root: 45, tones: [57, 60, 64] },
  { root: 41, tones: [53, 57, 60] },
  { root: 38, tones: [50, 53, 57] },
  { root: 40, tones: [52, 55, 59] },
] as const;

const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private initialized = false;

  private bgmTimer: number | null = null;
  private bgmActiveOscs: OscillatorNode[] = [];
  private nextStepTime = 0;
  private step = 0;
  private noiseBuffer: AudioBuffer | null = null;

  init() {
    if (this.initialized) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.3;
    this.masterGain.connect(this.ctx.destination);
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.15;
    this.bgmGain.connect(this.masterGain);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.masterGain);
    this.initialized = true;
  }

  private ensureCtx() { if (!this.ctx) this.init(); }

  playShoot(freq: number = 800) {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playExplosion() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    source.connect(gain);
    gain.connect(this.sfxGain);
    source.start();
  }

  playHit() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSpecial() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  // C4: 故障音效 — 短促的方波 + 白噪声叠加（首杀奖励音）
  playGlitch() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    // 方波快速滑音
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1600, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.18);
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.2);

    // 白噪声 burst
    const bufLen = this.ctx.sampleRate * 0.15;
    const noiseBuf = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const noise = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) noise[i] = (Math.random() - 0.5) * (1 - i / bufLen);
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    noiseSrc.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noiseSrc.start(t);
  }

  playDodge() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playBossWarning() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + i * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.3 + 0.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(this.ctx.currentTime + i * 0.3);
      osc.stop(this.ctx.currentTime + i * 0.3 + 0.2);
    }
  }

  startBGM() {
    this.ensureCtx();
    if (!this.ctx || !this.bgmGain || this.bgmTimer !== null) return;
    this.step = 0;
    this.nextStepTime = this.ctx.currentTime + 0.1;
    this.bgmTimer = window.setInterval(() => this.scheduleBgmAhead(), SCHEDULE_INTERVAL_MS);
  }

  stopBGM() {
    if (this.bgmTimer !== null) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    for (const osc of this.bgmActiveOscs) {
      try { osc.stop(); } catch {}
    }
    this.bgmActiveOscs.length = 0;
    this.step = 0;
    this.nextStepTime = 0;
  }

  private scheduleBgmAhead() {
    if (!this.ctx || !this.bgmGain) return;
    while (this.nextStepTime < this.ctx.currentTime + BGM_LOOKAHEAD) {
      this.scheduleStep(this.step, this.nextStepTime);
      this.nextStepTime += SIXTEENTH;
      this.step = (this.step + 1) % BGM_PATTERN_LENGTH;
    }
  }

  private scheduleStep(step: number, t: number) {
    const bar = Math.floor(step / 16);
    const pos = step % 16;
    const chord = CHORD_PROGRESSION[bar];
    if (pos === 0) this.schedulePad(chord, t);
    if (pos === 0 || pos === 8) this.scheduleBass(chord, pos === 8, t);
    if (pos % 8 === 4) this.scheduleHat(t);
  }

  private schedulePad(chord: (typeof CHORD_PROGRESSION)[number], t: number) {
    if (!this.ctx || !this.bgmGain) return;
    const barDur = 16 * SIXTEENTH;
    const attack = 0.06;
    const release = 0.4;
    for (const note of chord.tones) {
      for (const cents of [-6, 5]) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = midiToFreq(note);
        osc.detune.value = cents;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.022, t + attack);
        gain.gain.setValueAtTime(0.022, t + barDur - release);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + barDur - 0.02);
        osc.connect(gain);
        gain.connect(this.bgmGain);
        this.trackBgmOsc(osc);
        osc.start(t);
        osc.stop(t + barDur);
      }
    }
  }

  private scheduleBass(chord: (typeof CHORD_PROGRESSION)[number], isFifth: boolean, t: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = midiToFreq(chord.root - 12 + (isFifth ? 7 : 0));
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + 0.3);
    filter.Q.value = 2;
    const dur = isFifth ? 0.2 : 0.24;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);
    this.trackBgmOsc(osc);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  private scheduleHat(t: number) {
    if (!this.ctx || !this.bgmGain) return;
    const buffer = this.getNoiseBuffer();
    if (!buffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6500;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    src.connect(hp);
    hp.connect(gain);
    gain.connect(this.bgmGain);
    src.start(t);
    src.stop(t + 0.08);
  }

  private getNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    if (this.noiseBuffer) return this.noiseBuffer;
    const len = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buffer;
    return buffer;
  }

  private trackBgmOsc(osc: OscillatorNode) {
    this.bgmActiveOscs.push(osc);
    osc.onended = () => {
      const i = this.bgmActiveOscs.indexOf(osc);
      if (i >= 0) this.bgmActiveOscs.splice(i, 1);
    };
  }

  playBossAnnounce(name: string) {
    this.ensureCtx();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const base = 120 + (hash % 60);
    const interval = 1 + ((hash >> 3) % 5) / 10;
    this.voiceChip(t, {
      freq: base,
      duration: 0.42,
      waveA: 'sawtooth', waveB: 'square', waveC: 'triangle',
      pulseHz: 34, depth: 0.55,
      gainA: 0.26, gainB: 0.14, gainC: 0.1,
      glideTo: base * 0.92,
    });
    this.voiceChip(t + 0.3, {
      freq: base * interval,
      duration: 0.55,
      waveA: 'sawtooth', waveB: 'square', waveC: 'triangle',
      pulseHz: 30, depth: 0.5,
      gainA: 0.24, gainB: 0.13, gainC: 0.09,
      glideTo: base * interval * 0.9,
    });
  }

  playSpecialAnnounce() {
    this.ensureCtx();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const base = 330;
    this.voiceChip(t, {
      freq: base,
      duration: 0.8,
      waveA: 'square', waveB: 'sawtooth', waveC: 'sine',
      pulseHz: 46, depth: 0.6,
      gainA: 0.2, gainB: 0.14, gainC: 0.12,
      glideTo: base * 1.8,
    });
    this.voiceChip(t + 0.15, {
      freq: base * 1.25,
      duration: 0.6,
      waveA: 'square', waveB: 'sawtooth', waveC: 'sine',
      pulseHz: 52, depth: 0.55,
      gainA: 0.18, gainB: 0.12, gainC: 0.1,
      glideTo: base * 1.25 * 1.5,
    });
  }

  private voiceChip(start: number, opts: {
    freq: number;
    duration: number;
    waveA: OscillatorType;
    waveB: OscillatorType;
    waveC: OscillatorType;
    pulseHz: number;
    depth: number;
    gainA: number;
    gainB: number;
    gainC: number;
    glideTo: number;
  }) {
    if (!this.ctx || !this.sfxGain) return;
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.0001, start);
    master.gain.exponentialRampToValueAtTime(1, start + 0.01);
    master.gain.setValueAtTime(1, start + opts.duration * 0.45);
    master.gain.exponentialRampToValueAtTime(0.0001, start + opts.duration);

    const formant = this.ctx.createGain();
    formant.gain.value = 0.5;
    const lfo = this.ctx.createOscillator();
    const lfoDepth = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = opts.pulseHz;
    lfoDepth.gain.value = opts.depth;
    lfo.connect(lfoDepth);
    lfoDepth.connect(formant.gain);
    lfo.start(start);
    lfo.stop(start + opts.duration);

    const voices: Array<[OscillatorType, number, number]> = [
      [opts.waveA, opts.freq, opts.gainA],
      [opts.waveB, opts.freq * 1.005, opts.gainB],
      [opts.waveC, opts.freq * 2.01, opts.gainC],
    ];
    for (const [wave, freq, gain] of voices) {
      const osc = this.ctx.createOscillator();
      const og = this.ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(opts.glideTo * (freq / opts.freq), start + opts.duration);
      og.gain.value = gain;
      osc.connect(og);
      og.connect(formant);
      osc.start(start);
      osc.stop(start + opts.duration + 0.02);
    }

    formant.connect(master);
    master.connect(this.sfxGain);
  }

  // C0 开场音：~3s — 低音上升铺底 → 合成器上滑 → 0.8s 次低音重击
  playIntroSting() {
    this.ensureCtx();
    if (!this.ctx || !this.sfxGain) return;
    const t0 = this.ctx.currentTime;

    const pad = this.ctx.createOscillator();
    const padGain = this.ctx.createGain();
    const padFilter = this.ctx.createBiquadFilter();
    pad.type = 'sawtooth';
    pad.frequency.setValueAtTime(55, t0);
    pad.frequency.exponentialRampToValueAtTime(110, t0 + 3);
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(200, t0);
    padFilter.frequency.exponentialRampToValueAtTime(900, t0 + 3);
    padGain.gain.setValueAtTime(0.0001, t0);
    padGain.gain.exponentialRampToValueAtTime(0.15, t0 + 1.5);
    padGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 3);
    pad.connect(padFilter).connect(padGain).connect(this.sfxGain);
    pad.start(t0);
    pad.stop(t0 + 3);

    const sw = this.ctx.createOscillator();
    const swGain = this.ctx.createGain();
    sw.type = 'sawtooth';
    sw.frequency.setValueAtTime(220, t0 + 0.8);
    sw.frequency.exponentialRampToValueAtTime(880, t0 + 1.6);
    swGain.gain.setValueAtTime(0.0001, t0 + 0.8);
    swGain.gain.exponentialRampToValueAtTime(0.12, t0 + 1.2);
    swGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);
    sw.connect(swGain).connect(this.sfxGain);
    sw.start(t0 + 0.8);
    sw.stop(t0 + 2.2);

    const thump = this.ctx.createOscillator();
    const thumpGain = this.ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(90, t0 + 0.8);
    thump.frequency.exponentialRampToValueAtTime(40, t0 + 1.2);
    thumpGain.gain.setValueAtTime(0.0001, t0 + 0.8);
    thumpGain.gain.exponentialRampToValueAtTime(0.35, t0 + 0.82);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3);
    thump.connect(thumpGain).connect(this.sfxGain);
    thump.start(t0 + 0.8);
    thump.stop(t0 + 1.3);
  }
}

export const audioManager = new AudioManager();
