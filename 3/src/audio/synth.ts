let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let musicStarted = false;

export function initAudio(): void {
  if (ctx) return;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0.8;
  master.connect(ctx.destination);
  musicGain = ctx.createGain();
  musicGain.gain.value = 0.5;
  musicGain.connect(master);
}

function now(): number {
  return ctx ? ctx.currentTime : 0;
}

function osc(type: OscillatorType, freq: number, dur: number, gain: number, sweepTo?: number): void {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, now());
  if (sweepTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, sweepTo), now() + dur);
  g.gain.setValueAtTime(gain, now());
  g.gain.exponentialRampToValueAtTime(0.0001, now() + dur);
  o.connect(g);
  g.connect(master);
  o.start();
  o.stop(now() + dur + 0.02);
}

function noise(dur: number, gain: number, filterFreq: number): void {
  if (!ctx || !master) return;
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = filterFreq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, now());
  g.gain.exponentialRampToValueAtTime(0.0001, now() + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start();
}

export function playSfx(id: string): void {
  if (!ctx || !master) return;
  switch (id) {
    case 'laser':
      osc('sawtooth', 880, 0.18, 0.16, 220);
      break;
    case 'rail':
      osc('sine', 140, 0.4, 0.3, 40);
      noise(0.25, 0.2, 800);
      break;
    case 'enemy':
      osc('square', 300, 0.14, 0.08, 120);
      break;
    case 'boom':
      noise(0.7, 0.5, 600);
      osc('sine', 90, 0.6, 0.35, 30);
      break;
    case 'hit':
      noise(0.15, 0.25, 1200);
      break;
    case 'ui':
      osc('triangle', 660, 0.06, 0.12);
      break;
    case 'alarm':
      osc('square', 440, 0.25, 0.14, 440);
      setTimeout(() => playSfx('alarm'), 350);
      break;
  }
}

export function startMusic(): void {
  if (!ctx || !musicGain || musicStarted) return;
  musicStarted = true;
  const freqs = [55, 82.4, 110, 164.8];
  for (const f of freqs) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.03 + Math.random() * 0.02;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + Math.random() * 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    o.connect(g);
    g.connect(musicGain);
    o.start();
    lfo.start();
  }
}

export function setSfxVolume(v: number): void {
  if (master) master.gain.value = v;
}

export function setMusicVolume(v: number): void {
  if (musicGain) musicGain.gain.value = v;
}
