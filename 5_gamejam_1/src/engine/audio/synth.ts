// engine/audio/synth.ts — 参数化合成器（零音频文件，04-audio-direction.md §3/§4）
// 主链路（§4.1）：musicIn → musicLPF → musicDuck → master → compressor → limiter → dest
//                  compressor → wet → Convolver(房间IR) → limiter
// 复音账本（§6.1）：Synth 内部登记活跃声部，AudioManager 负责预算守卫（≤8 抢占）。

import type { SoundKind } from '../../core/types';

export interface PlayParams {
  volume?: number;   // 幅度缩放 0..1
  pan?: number;      // StereoPanner -1..1
  pitch?: number;    // 半音偏移
  rate?: number;     // 时间缩放（>1 更快，<1 更慢）
  when?: number;     // ctx 起始时刻（默认 currentTime）
  distance?: number; // 脚步距离（米）→ §3.3 距离三件套
  angle?: number;    // 脚步方向角 → pan = sin(angle)
}

export interface MasterChain {
  musicIn: GainNode;
  musicLPF: BiquadFilterNode;
  musicDuck: GainNode;
  sfxIn: GainNode;
  ambIn: GainNode;
  wet: GainNode;
  reverb: ConvolverNode;
  master: GainNode;
  limiter: DynamicsCompressorNode;
}

export const midiToFreq = (m: number): number => 440 * Math.pow(2, (m - 69) / 12);

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const KIND_DEFAULTS: Record<SoundKind, { wet: number; priority: number; vol?: number }> = {
  throneCreak: { wet: 0.1, priority: 6 },
  armorRattle: { wet: 0.2, priority: 6 },
  step: { wet: 0.04, priority: 2, vol: 0.8 },
  swordSwing: { wet: 0.2, priority: 3, vol: 0.8 },
  swordDrop: { wet: 0.2, priority: 4 },
  impact: { wet: 0.15, priority: 4 },
  dodgeWhiff: { wet: 0.2, priority: 2 },
  paper: { wet: 0.2, priority: 1 },
  breath: { wet: 0.02, priority: 1 },
  gong: { wet: 0.4, priority: 6 },
  piano: { wet: 0.2, priority: 5 },
  stringTremolo: { wet: 0.2, priority: 5 },
  barrageWhoosh: { wet: 0.2, priority: 5 },
  silence: { wet: 0, priority: 9 },
};

const VIOLIN_MICRO = [20, -14, 8, -27, 35, -22];

// ============ 房间脉冲（§4.1：1.2s 立体声 IR，20ms 预延迟内建） ============

export function createRoomImpulse(ctx: AudioContext, duration = 1.2): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * duration);
  const buf = ctx.createBuffer(2, len, sr);
  const preDelay = Math.floor(sr * 0.02);
  const taps: [number, number][] = [
    [8, 0.5], [13, 0.38], [17, 0.3], [22, 0.22], [30, 0.14], [41, 0.08],
  ];
  for (const [ms, g] of taps) {
    const idx = preDelay + Math.floor((ms / 1000) * sr);
    if (idx >= len) continue;
    const pan = (Math.random() * 2 - 1) * 0.8;
    buf.getChannelData(0)[idx] += g * (1 - pan);
    buf.getChannelData(1)[idx] += g * (1 + pan);
  }
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = preDelay; i < len; i++) {
      d[i] += (Math.random() * 2 - 1) * Math.exp((-3 * (i - preDelay)) / (1.1 * sr));
    }
  }
  let peak = 0;
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(d[i]));
  }
  const norm = peak > 0 ? 10 ** (-18 / 20) / peak : 1;
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] *= norm;
  }
  return buf;
}

// ============ 主链路（§4.1） ============

export function createMasterChain(ctx: AudioContext): MasterChain {
  const musicLPF = ctx.createBiquadFilter();
  musicLPF.type = 'lowpass';
  musicLPF.frequency.value = 9000;
  musicLPF.Q.value = 0.5;
  const musicDuck = ctx.createGain();
  musicDuck.gain.value = 1;
  const sfxIn = ctx.createGain();
  sfxIn.gain.value = 1;
  const ambIn = ctx.createGain();
  ambIn.gain.value = 1;
  const master = ctx.createGain();
  master.gain.value = 1;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.ratio.value = 3;
  compressor.knee.value = 6;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.15;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -6;
  limiter.ratio.value = 20;
  limiter.knee.value = 0;
  limiter.attack.value = 0.001;
  limiter.release.value = 0.06;
  const reverb = ctx.createConvolver();
  reverb.buffer = createRoomImpulse(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 1;
  musicLPF.connect(musicDuck);
  musicDuck.connect(master);
  sfxIn.connect(master);
  ambIn.connect(master);
  master.connect(compressor);
  compressor.connect(limiter);
  limiter.connect(ctx.destination);
  compressor.connect(wet);
  wet.connect(reverb);
  reverb.connect(limiter);
  return { musicIn: musicLPF, musicLPF, musicDuck, sfxIn, ambIn, wet, reverb, master, limiter };
}

// ============ 低层单音合成（musicBus / Synth 共用） ============

export interface NoteOpts {
  midi: number;
  when: number;
  gain: number;
  dur?: number;
  cutoff?: number;
}

/** §1.1 钢琴音色：triangle + sine×2(0.3) → 低通 3500 → A=0.005 / D=1.2 指数 */
export function playPianoNote(ctx: AudioContext, out: AudioNode, o: NoteOpts): AudioScheduledSourceNode[] {
  const f = midiToFreq(o.midi);
  const dur = o.dur ?? 0.833;
  const decay = Math.max(1.2, dur * 1.5);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = o.cutoff ?? 3500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, o.when);
  g.gain.linearRampToValueAtTime(o.gain, o.when + 0.005);
  g.gain.setTargetAtTime(0.0001, o.when + 0.005, decay / 3);
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = f;
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = f * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.3;
  osc.connect(g);
  osc2.connect(g2);
  g2.connect(g);
  g.connect(lp);
  lp.connect(out);
  const stopAt = o.when + decay * 3 + 1;
  osc.start(o.when);
  osc.stop(stopAt);
  osc2.start(o.when);
  osc2.stop(stopAt);
  return [osc, osc2];
}

export interface StringNoteOpts {
  midi: number;
  when: number;
  gain: number;
  attack?: number;
  release?: number;
  cutoff?: number;
  detune?: number;
  dual?: boolean;
  tremolo?: { rate: number; depth: number };
}

/** §1.2 弦乐音色：saw(+triangle) + 慢 LFO detune ±4 → 低通 1200-1800 → A 1.2-2s / R 2.5s */
export function playStringNote(ctx: AudioContext, out: AudioNode, o: StringNoteOpts): AudioScheduledSourceNode[] {
  const attack = o.attack ?? 1.5;
  const release = o.release ?? 2.5;
  const f = midiToFreq(o.midi);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = o.cutoff ?? 1500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, o.when);
  g.gain.linearRampToValueAtTime(o.gain, o.when + attack);
  g.gain.setTargetAtTime(0.0001, o.when + attack, release / 3);
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = f;
  osc.detune.value = o.detune ?? 0;
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.15 + Math.random() * 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 4;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.detune);
  osc.connect(g);
  const sources: AudioScheduledSourceNode[] = [osc, lfo];
  if (o.dual !== false) {
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = f;
    osc2.detune.value = (o.detune ?? 0) + 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.5;
    osc2.connect(g2);
    g2.connect(g);
    sources.push(osc2);
  }
  if (o.tremolo) {
    const trem = ctx.createOscillator();
    trem.type = 'sine';
    trem.frequency.value = o.tremolo.rate;
    const tremGain = ctx.createGain();
    tremGain.gain.value = o.tremolo.depth;
    trem.connect(tremGain);
    tremGain.connect(g.gain);
    sources.push(trem);
  }
  g.connect(lp);
  lp.connect(out);
  const stopAt = o.when + attack + release * 4 + 1;
  for (const s of sources) {
    s.start(o.when);
    s.stop(stopAt);
  }
  return sources;
}

export interface ViolinNoteOpts {
  midi: number;
  when: number;
  gain: number;
  dur: number;
  wobbleRate: number;
  wobbleDepth: number;
  micro: number;
  wanderRate: number;
}

/** §1.3 走音小提琴：saw + 低通 2200 + 颤音/微音程/漂移 三层 detune */
export function playViolinNote(ctx: AudioContext, out: AudioNode, o: ViolinNoteOpts): AudioScheduledSourceNode[] {
  const f = midiToFreq(o.midi);
  const tail = o.dur * 1.5 + 1.2;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2200;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, o.when);
  g.gain.linearRampToValueAtTime(o.gain, o.when + 0.3);
  g.gain.setTargetAtTime(0.0001, o.when + 0.3, tail / 3);
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = f;
  osc.detune.value = 6 + o.micro;
  const wobble = ctx.createOscillator();
  wobble.type = 'sine';
  wobble.frequency.value = o.wobbleRate;
  const wobbleGain = ctx.createGain();
  wobbleGain.gain.value = o.wobbleDepth;
  wobble.connect(wobbleGain);
  wobbleGain.connect(osc.detune);
  const wander = ctx.createOscillator();
  wander.type = 'sine';
  wander.frequency.value = o.wanderRate;
  const wanderGain = ctx.createGain();
  wanderGain.gain.value = 12;
  wander.connect(wanderGain);
  wanderGain.connect(osc.detune);
  osc.connect(g);
  g.connect(lp);
  lp.connect(out);
  const stopAt = o.when + tail + 1;
  osc.start(o.when);
  osc.stop(stopAt);
  wobble.start(o.when);
  wobble.stop(stopAt);
  wander.start(o.when);
  wander.stop(stopAt);
  return [osc, wobble, wander];
}

export interface ThumpOpts {
  freq: number;
  when: number;
  gain: number;
  dur: number;
}

/** §1.4 心跳 / 低频重踏：sine 下坠短促声 */
export function playThump(ctx: AudioContext, out: AudioNode, o: ThumpOpts): AudioScheduledSourceNode[] {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, o.when);
  g.gain.linearRampToValueAtTime(o.gain, o.when + 0.005);
  g.gain.setTargetAtTime(0.0001, o.when + 0.005, o.dur / 3);
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(o.freq, o.when);
  osc.frequency.exponentialRampToValueAtTime(o.freq * 0.7, o.when + o.dur);
  osc.connect(g);
  g.connect(out);
  osc.start(o.when);
  osc.stop(o.when + o.dur + 0.4);
  return [osc];
}

// ============ 复音账本 ============

interface VoiceRec {
  priority: number;
  dispose: () => void;
}

interface VoiceNodes {
  env: GainNode;
  nodes: AudioNode[];
  sources: AudioScheduledSourceNode[];
}

function envShape(ctx: AudioContext, peak: number, attack: number, tc: number, when: number): GainNode {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(peak, when + attack);
  g.gain.setTargetAtTime(0.0001, when + attack, tc);
  return g;
}

function stopAll(sources: AudioScheduledSourceNode[], nodes: AudioNode[]): void {
  for (const s of sources) {
    try {
      s.stop();
    } catch {
      /* 未 start 的节点 */
    }
  }
  for (const n of nodes) {
    try {
      n.disconnect();
    } catch {
      /* 已断开 */
    }
  }
}

// ============ Synth ============

export class Synth {
  private readonly voices = new Set<VoiceRec>();
  private noiseBuf: AudioBuffer | null = null;

  constructor(
    private readonly ctx: AudioContext,
    private readonly chain: MasterChain,
  ) {}

  getActiveCount(): number {
    return this.voices.size;
  }

  /** 抢占最低优先级声部（04 §6.1：偷最轻的音） */
  stealLowestPriority(): void {
    let victim: VoiceRec | null = null;
    for (const v of this.voices) {
      if (!victim || v.priority < victim.priority) victim = v;
    }
    if (victim) victim.dispose();
  }

  dispose(): void {
    for (const v of [...this.voices]) v.dispose();
    this.voices.clear();
  }

  play(kind: SoundKind, p: PlayParams = {}): void {
    switch (kind) {
      case 'throneCreak': this.throneCreak(p); break;
      case 'armorRattle': this.armorRattle(p); break;
      case 'step': this.step(p); break;
      case 'swordSwing': this.swordSwing(p); break;
      case 'swordDrop': this.swordDrop(p); break;
      case 'impact': this.impact(p); break;
      case 'dodgeWhiff': this.dodgeWhiff(p); break;
      case 'paper': this.paper(p); break;
      case 'breath': this.breath(p); break;
      case 'gong': this.gong(p); break;
      case 'piano': this.piano(p); break;
      case 'stringTremolo': this.stringTremolo(p); break;
      case 'barrageWhoosh': this.barrageWhoosh(p); break;
      case 'silence': break;
      default: break;
    }
  }

  // ---------- 配方内部 ----------

  private startVoice(wet: number, pan: number): VoiceNodes {
    const env = this.ctx.createGain();
    env.gain.value = 1;
    const pn = this.ctx.createStereoPanner();
    pn.pan.value = clamp(pan, -1, 1);
    const dry = this.ctx.createGain();
    dry.gain.value = 1;
    const send = this.ctx.createGain();
    send.gain.value = wet;
    env.connect(pn);
    pn.connect(dry);
    pn.connect(send);
    dry.connect(this.chain.sfxIn);
    send.connect(this.chain.wet);
    return { env, nodes: [env, pn, dry, send], sources: [] };
  }

  private track(priority: number, sources: AudioScheduledSourceNode[], dispose: () => void): void {
    let remaining = sources.length;
    let dead = false;
    const rec: VoiceRec = {
      priority,
      dispose: () => {
        dead = true;
        this.voices.delete(rec);
        dispose();
      },
    };
    const onEnd = (): void => {
      remaining -= 1;
      if (remaining <= 0 && !dead) this.voices.delete(rec);
    };
    for (const s of sources) s.addEventListener('ended', onEnd);
    this.voices.add(rec);
  }

  private noiseSource(): AudioBufferSourceNode {
    if (!this.noiseBuf) {
      const len = Math.ceil(this.ctx.sampleRate * 2);
      this.noiseBuf = this.ctx.createBuffer(2, len, this.ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = this.noiseBuf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
    }
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = false;
    return src;
  }

  private voiceParams(p: PlayParams): { t: number; ts: number; pf: number; v: number } {
    const rate = p.rate && p.rate > 0 ? p.rate : 1;
    return {
      t: p.when ?? this.ctx.currentTime,
      ts: 1 / rate,
      pf: Math.pow(2, (p.pitch ?? 0) / 12),
      v: p.volume ?? 1,
    };
  }

  /** §3.1 王座吱呀：双正弦下滑 + 噪声爆发 → 低通 900 */
  private throneCreak(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.throneCreak;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const g = this.ctx.createGain();
    g.gain.value = 1;
    const pn = this.ctx.createStereoPanner();
    pn.pan.value = clamp(p.pan ?? 0, -1, 1);
    const dry = this.ctx.createGain();
    dry.gain.value = 1;
    const send = this.ctx.createGain();
    send.gain.value = d.wet;
    lp.connect(g);
    g.connect(pn);
    pn.connect(dry);
    pn.connect(send);
    dry.connect(this.chain.sfxIn);
    send.connect(this.chain.wet);
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55 * pf, t);
    osc1.frequency.linearRampToValueAtTime(38 * pf, t + 0.9 * ts);
    const g1 = envShape(this.ctx, 0.25 * v, 0.05 * ts, 1.2 * ts, t);
    osc1.connect(g1);
    g1.connect(lp);
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(42 * pf, t + 0.3 * ts);
    osc2.frequency.linearRampToValueAtTime(31 * pf, t + 1.2 * ts);
    const g2 = envShape(this.ctx, 0.15 * v, 0.05 * ts, 1.2 * ts, t + 0.3 * ts);
    osc2.connect(g2);
    g2.connect(lp);
    const noise = this.noiseSource();
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 400;
    bp.Q.value = 4;
    const g3 = envShape(this.ctx, 0.12 * v, 0.005 * ts, 0.05 * ts, t);
    noise.connect(bp);
    bp.connect(g3);
    g3.connect(lp);
    const stopAt = t + 2.2 * ts;
    osc1.start(t);
    osc1.stop(stopAt);
    osc2.start(t + 0.3 * ts);
    osc2.stop(stopAt);
    noise.start(t);
    noise.stop(stopAt);
    this.track(d.priority, [osc1, osc2, noise], () => stopAll([osc1, osc2, noise], [lp, g, pn, dry, send, g1, g2, bp, g3]));
  }

  /** §3.2 盔甲摩擦：双带通噪声 + 7Hz AM 卡顿 */
  private armorRattle(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.armorRattle;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = (1800 + Math.random() * 400 - 200) * pf;
    bp.Q.value = 8;
    const am = this.ctx.createGain();
    am.gain.setValueAtTime(1, t);
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 7;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.6;
    lfo.connect(lfoGain);
    lfoGain.connect(am.gain);
    const env1 = envShape(this.ctx, 0.3 * v, 0.15 * ts, 0.65 * ts, t);
    const n1 = this.noiseSource();
    n1.connect(bp);
    bp.connect(am);
    am.connect(env1);
    env1.connect(vc.env);
    const bp2 = this.ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 3200 * pf;
    bp2.Q.value = 10;
    const env2 = envShape(this.ctx, 0.12 * v, 0.15 * ts, 0.65 * ts, t);
    const n2 = this.noiseSource();
    n2.connect(bp2);
    bp2.connect(env2);
    env2.connect(vc.env);
    const stopAt = t + 1.3 * ts;
    n1.start(t);
    n1.stop(stopAt);
    n2.start(t);
    n2.stop(stopAt);
    lfo.start(t);
    lfo.stop(stopAt);
    vc.sources.push(n1, n2, lfo);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [bp, am, lfoGain, env1, bp2, env2, ...vc.nodes]));
  }

  /** §3.3 脚步声：低频重踏 + 短噪，距离三件套 */
  private step(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.step;
    let vol = v * (d.vol ?? 1);
    let cutoff = 500;
    let wet = d.wet;
    let pan = p.pan ?? 0;
    if (p.distance !== undefined) {
      const dd = Math.max(0.1, p.distance);
      vol = clamp(8 / ((dd + 2) * (dd + 2)), 0.04, 1) * v * (d.vol ?? 1);
      cutoff = clamp(6000 / dd, 300, 5000);
      wet = 0.04 + dd / 25;
      pan = clamp(Math.sin(p.angle ?? 0), -1, 1);
    }
    const vc = this.startVoice(wet, pan);
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90 * pf, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, 60 * pf), t + 0.09 * ts);
    const env1 = envShape(this.ctx, 0.4 * vol, 0.002, 0.05 * ts, t);
    osc.connect(env1);
    env1.connect(vc.env);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = cutoff;
    const env2 = envShape(this.ctx, 0.2 * vol, 0.001, 0.03 * ts, t);
    const n = this.noiseSource();
    n.connect(lp);
    lp.connect(env2);
    env2.connect(vc.env);
    const stopAt = t + 0.4 * ts;
    osc.start(t);
    osc.stop(stopAt);
    n.start(t);
    n.stop(stopAt);
    vc.sources.push(osc, n);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [env1, env2, lp, ...vc.nodes]));
  }

  /** §3.5 剑风：带通噪声频率扫描 + 双向变体 + 声像 */
  private swordSwing(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.swordSwing;
    const pan = p.pan ?? (Math.random() < 0.5 ? -0.6 : 0.6);
    const vc = this.startVoice(d.wet, pan);
    const up = (p.pitch ?? 0) >= 0;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.setValueAtTime(2, t);
    bp.Q.linearRampToValueAtTime(6, t + 0.35 * ts);
    bp.frequency.setValueAtTime((up ? 300 : 2500) * pf, t);
    bp.frequency.linearRampToValueAtTime((up ? 2500 : 300) * pf, t + 0.35 * ts);
    const env = envShape(this.ctx, 0.3 * v * (d.vol ?? 1), 0.08 * ts, 0.32 * ts, t);
    const n = this.noiseSource();
    n.connect(bp);
    bp.connect(env);
    env.connect(vc.env);
    const stopAt = t + 0.7 * ts;
    n.start(t);
    n.stop(stopAt);
    vc.sources.push(n);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [bp, env, ...vc.nodes]));
  }

  /** 脱手落地：金属振铃 + 短噪 + 闷响 */
  private swordDrop(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.swordDrop;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const ring = this.ctx.createOscillator();
    ring.type = 'triangle';
    ring.frequency.value = 320 * pf;
    const ringEnv = envShape(this.ctx, 0.15 * v, 0.001, 0.12 * ts, t);
    ring.connect(ringEnv);
    ringEnv.connect(vc.env);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2500 * pf;
    bp.Q.value = 6;
    const nEnv = envShape(this.ctx, 0.25 * v, 0.001, 0.03 * ts, t);
    const n = this.noiseSource();
    n.connect(bp);
    bp.connect(nEnv);
    nEnv.connect(vc.env);
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(90 * pf, t);
    thud.frequency.exponentialRampToValueAtTime(Math.max(20, 50 * pf), t + 0.18 * ts);
    const thudEnv = envShape(this.ctx, 0.5 * v, 0.002, 0.06 * ts, t);
    thud.connect(thudEnv);
    thudEnv.connect(vc.env);
    const stopAt = t + 0.9 * ts;
    ring.start(t);
    ring.stop(stopAt);
    n.start(t);
    n.stop(stopAt);
    thud.start(t);
    thud.stop(stopAt);
    vc.sources.push(ring, n, thud);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [ringEnv, bp, nEnv, thudEnv, ...vc.nodes]));
  }

  /** §3.6 命中：噪声爆发 + 低频重击 + 瞬态点击 */
  private impact(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.impact;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1200;
    const nEnv = envShape(this.ctx, 0.5 * v, 0.002, 0.04 * ts, t);
    const n = this.noiseSource();
    n.connect(lp);
    lp.connect(nEnv);
    nEnv.connect(vc.env);
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(110 * pf, t);
    thud.frequency.exponentialRampToValueAtTime(Math.max(20, 45 * pf), t + 0.18 * ts);
    const thudEnv = envShape(this.ctx, 0.6 * v, 0.002, 0.05 * ts, t);
    thud.connect(thudEnv);
    thudEnv.connect(vc.env);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3000;
    const clickEnv = envShape(this.ctx, 0.15 * v, 0.001, 0.01 * ts, t);
    const click = this.noiseSource();
    click.connect(hp);
    hp.connect(clickEnv);
    clickEnv.connect(vc.env);
    const stopAt = t + 0.6 * ts;
    n.start(t);
    n.stop(stopAt);
    thud.start(t);
    thud.stop(stopAt);
    click.start(t);
    click.stop(stopAt);
    vc.sources.push(n, thud, click);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [lp, nEnv, thudEnv, hp, clickEnv, ...vc.nodes]));
  }

  /** §3.7 落空：带通噪声下行扫描 + 空中闷响 */
  private dodgeWhiff(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.dodgeWhiff;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 4;
    bp.frequency.setValueAtTime(1200 * pf, t);
    bp.frequency.linearRampToValueAtTime(700 * pf, t + 0.25 * ts);
    const env = envShape(this.ctx, 0.15 * v, 0.02 * ts, 0.08 * ts, t);
    const n = this.noiseSource();
    n.connect(bp);
    bp.connect(env);
    env.connect(vc.env);
    const air = this.ctx.createOscillator();
    air.type = 'sine';
    air.frequency.value = 70 * pf;
    const airEnv = envShape(this.ctx, 0.05 * v, 0.005, 0.03 * ts, t + 0.05 * ts);
    air.connect(airEnv);
    airEnv.connect(vc.env);
    const stopAt = t + 0.55 * ts;
    n.start(t);
    n.stop(stopAt);
    air.start(t + 0.05 * ts);
    air.stop(stopAt);
    vc.sources.push(n, air);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [bp, env, airEnv, ...vc.nodes]));
  }

  /** §3.8 翻档案：双翻变体（2500/3300 Hz 带通短噪） */
  private paper(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.paper;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2500 * pf;
    bp.Q.value = 1.5;
    const env = envShape(this.ctx, 0.25 * v, 0.005, 0.03 * ts, t);
    const n = this.noiseSource();
    n.connect(bp);
    bp.connect(env);
    env.connect(vc.env);
    const bp2 = this.ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 3300 * pf;
    bp2.Q.value = 1.5;
    const env2 = envShape(this.ctx, 0.15 * v, 0.005, 0.03 * ts, t + 0.09 * ts);
    const n2 = this.noiseSource();
    n2.connect(bp2);
    bp2.connect(env2);
    env2.connect(vc.env);
    const stopAt = t + 0.35 * ts;
    n.start(t);
    n.stop(stopAt);
    n2.start(t + 0.09 * ts);
    n2.stop(stopAt);
    vc.sources.push(n, n2);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [bp, env, bp2, env2, ...vc.nodes]));
  }

  /** §3.10 台词点（triangle 五声 blip）+ 合成呼吸声（滤波噪声 + 慢 LFO） */
  private breath(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.breath;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const scale = [72, 74, 76, 79, 81];
    const midi = scale[Math.floor(Math.random() * scale.length)];
    const blip = this.ctx.createOscillator();
    blip.type = 'triangle';
    blip.frequency.value = midiToFreq(midi) * pf;
    const blipEnv = envShape(this.ctx, 0.06 * v, 0.005, 0.02 * ts, t);
    blip.connect(blipEnv);
    blipEnv.connect(vc.env);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const am = this.ctx.createGain();
    am.gain.setValueAtTime(1, t);
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.8;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain);
    lfoGain.connect(am.gain);
    const breathEnv = envShape(this.ctx, 0.05 * v, 0.3 * ts, 0.2 * ts, t + 0.15 * ts);
    const n = this.noiseSource();
    n.connect(lp);
    lp.connect(am);
    am.connect(breathEnv);
    breathEnv.connect(vc.env);
    const stopAt = t + 1.2 * ts;
    blip.start(t);
    blip.stop(stopAt);
    n.start(t + 0.15 * ts);
    n.stop(stopAt);
    lfo.start(t);
    lfo.stop(stopAt);
    vc.sources.push(blip, n, lfo);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [blipEnv, lp, am, lfoGain, breathEnv, ...vc.nodes]));
  }

  /** §3.15/endChime 钟鸣：三连钟 + 失谐低音涌起（2.5s） */
  private gong(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.gong;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const sources: AudioScheduledSourceNode[] = [];
    const nodes: AudioNode[] = [];
    for (const [midi, off] of [
      [84, 0],
      [88, 0.12],
      [91, 0.24],
    ] as [number, number][]) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = midiToFreq(midi + (p.pitch ?? 0));
      const env = envShape(this.ctx, 0.15 * v, 0.01, 0.24 * ts, t + off * ts);
      osc.connect(env);
      env.connect(vc.env);
      osc.start(t + off * ts);
      osc.stop(t + 3 * ts);
      sources.push(osc);
      nodes.push(env);
    }
    for (const [freq, off] of [
      [220, 0],
      [221, 0.02],
    ] as [number, number][]) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq * pf;
      const env = envShape(this.ctx, 0.1 * v, 1.5 * ts, 0.7 * ts, t + off * ts);
      osc.connect(env);
      env.connect(vc.env);
      osc.start(t + off * ts);
      osc.stop(t + 5 * ts);
      sources.push(osc);
      nodes.push(env);
    }
    vc.sources.push(...sources);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [...nodes, ...vc.nodes]));
  }

  /** §1.1 钢琴单音（SFX 侧） */
  private piano(p: PlayParams): void {
    const { t, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.piano;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const sources = playPianoNote(this.ctx, vc.env, {
      midi: 69 + (p.pitch ?? 0),
      when: t,
      gain: 0.3 * v,
      dur: 0.833,
    });
    vc.sources.push(...sources);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, vc.nodes));
  }

  /** §1.2 弦乐颤音单音（SFX 侧） */
  private stringTremolo(p: PlayParams): void {
    const { t, ts, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.stringTremolo;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const sources = playStringNote(this.ctx, vc.env, {
      midi: 69 + (p.pitch ?? 0),
      when: t,
      gain: 0.22 * v,
      attack: 0.3 * ts,
      release: 1.5 * ts,
      cutoff: 1500,
      tremolo: { rate: 6, depth: 0.5 },
    });
    vc.sources.push(...sources);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, vc.nodes));
  }

  /** §3.12 升压过渡（弹幕/riser 用）：带通 200→4000 扫描，增益 0→0.25→0.10 */
  private barrageWhoosh(p: PlayParams): void {
    const { t, ts, pf, v } = this.voiceParams(p);
    const d = KIND_DEFAULTS.barrageWhoosh;
    const vc = this.startVoice(d.wet, p.pan ?? 0);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1;
    bp.frequency.setValueAtTime(200 * pf, t);
    bp.frequency.linearRampToValueAtTime(4000 * pf, t + 2.0 * ts);
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.25 * v, t + 1.6 * ts);
    env.gain.linearRampToValueAtTime(0.1 * v, t + 2.0 * ts);
    env.gain.setTargetAtTime(0.0001, t + 2.0 * ts, 0.15 * ts);
    const n = this.noiseSource();
    n.connect(bp);
    bp.connect(env);
    env.connect(vc.env);
    const stopAt = t + 2.6 * ts;
    n.start(t);
    n.stop(stopAt);
    vc.sources.push(n);
    this.track(d.priority, vc.sources, () => stopAll(vc.sources, [bp, env, ...vc.nodes]));
  }
}

/** 供 musicBus 复用的微音程集合（§1.3） */
export const VIOLIN_MICRO_OFFSETS: readonly number[] = VIOLIN_MICRO;
