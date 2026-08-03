export type SfxName = "laser" | "explosion" | "nukeWarning" | "hit" | "uiClick" | "convert" | "hack" | "victory" | "defeat";

export class AudioSynth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;

  init(): void {
    if (this.ctx) return;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.master.connect(this.ctx.destination);
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.5;
  }

  play(name: SfxName): void {
    if (!this.ctx || !this.master || this.muted) return;
    switch (name) {
      case "laser":
        this.tone(880, 0.08, "square", 0.15, 1200);
        break;
      case "explosion":
        this.noise(0.6, 300);
        this.tone(60, 0.5, "sine", 0.4, 40);
        break;
      case "nukeWarning":
        this.tone(440, 0.4, "sawtooth", 0.2, 660);
        setTimeout(() => this.tone(440, 0.4, "sawtooth", 0.2, 660), 500);
        break;
      case "hit":
        this.tone(220, 0.1, "triangle", 0.2, 110);
        break;
      case "uiClick":
        this.tone(660, 0.05, "square", 0.1, 880);
        break;
      case "convert":
        this.tone(523, 0.12, "sine", 0.2, 784);
        setTimeout(() => this.tone(784, 0.18, "sine", 0.2, 1046), 120);
        break;
      case "hack":
        this.tone(300, 0.06, "sawtooth", 0.15, 1200);
        setTimeout(() => this.tone(300, 0.06, "sawtooth", 0.15, 1200), 80);
        break;
      case "victory":
        [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone(f, 0.3, "triangle", 0.25, f), i * 180));
        break;
      case "defeat":
        [440, 349, 262].forEach((f, i) => setTimeout(() => this.tone(f, 0.4, "sawtooth", 0.2, f * 0.5), i * 250));
        break;
    }
  }

  private tone(freq: number, dur: number, type: OscillatorType, vol: number, glideTo?: number): void {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, glideTo), this.ctx.currentTime + dur);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.ctx.currentTime + dur + 0.05);
  }

  private noise(dur: number, lowpassFreq: number): void {
    if (!this.ctx || !this.master) return;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = lowpassFreq;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.5;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start();
  }
}
