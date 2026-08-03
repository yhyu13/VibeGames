// Procedural SFX using WebAudio oscillators (no asset files for MVP).

import { audio } from './AudioGraph.js';

export function playFire(element: string): void {
  const ctx = audio.getContext();
  const bus = audio.getSfxBus();
  if (!ctx || !bus) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const freqMap: Record<string, number> = { plasma: 320, kinetic: 180, electric: 600, corrosive: 220, gravity: 80, signal: 440 };
  osc.frequency.value = freqMap[element] ?? 200;
  osc.type = 'sawtooth';
  gain.gain.setValueAtTime(0.0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.frequency.exponentialRampToValueAtTime((freqMap[element] ?? 200) * 0.5, ctx.currentTime + 0.3);
  osc.connect(gain).connect(bus);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

export function playHit(): void {
  const ctx = audio.getContext();
  const bus = audio.getSfxBus();
  if (!ctx || !bus) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 120;
  osc.type = 'square';
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(bus);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

export function playExplosion(): void {
  const ctx = audio.getContext();
  const bus = audio.getSfxBus();
  if (!ctx || !bus) return;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  src.connect(gain).connect(bus);
  src.start();
}

export function playMissileLaunch(): void {
  const ctx = audio.getContext();
  const bus = audio.getSfxBus();
  if (!ctx || !bus) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);
  osc.type = 'sawtooth';
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.0);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
  osc.connect(gain).connect(bus);
  osc.start();
  osc.stop(ctx.currentTime + 1.6);
}

export function playUiClick(): void {
  const ctx = audio.getContext();
  const bus = audio.getSfxBus();
  if (!ctx || !bus) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 880;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.connect(gain).connect(bus);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}