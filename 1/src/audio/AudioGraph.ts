// Audio graph: master mixer + escalation-aware layered music + SFX + voices.

export class AudioGraph {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private voiceBus: GainNode | null = null;
  private distortionNode: WaveShaperNode | null = null;
  private sfxConnectedToDistortion = false;

  init(): void {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.8;
    this.master.connect(this.ctx.destination);

    this.distortionNode = this.ctx.createWaveShaper();
    this.distortionNode.curve = new Float32Array([0, 0]);
    this.distortionNode.connect(this.master);

    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = 0.5;
    this.musicBus.connect(this.master);

    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.value = 0.7;
    this.sfxBus.connect(this.master);

    this.voiceBus = this.ctx.createGain();
    this.voiceBus.gain.value = 0.4;
    this.voiceBus.connect(this.master);
  }

  resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMusicVolume(v: number): void {
    if (this.musicBus) this.musicBus.gain.value = v;
  }

  setSfxVolume(v: number): void {
    if (this.sfxBus) this.sfxBus.gain.value = v;
  }

  setInstability(value: number): void {
    if (!this.distortionNode || !this.ctx) return;
    const samples = 256;
    const curve = new Float32Array(samples);
    const k = value * 8;
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + k) * x * 20 * Math.PI / 180) / (Math.PI + k * Math.abs(x));
    }
    this.distortionNode.curve = curve;
    // Route SFX through distortion once instability rises meaningfully
    if (!this.sfxConnectedToDistortion && value > 0.3 && this.sfxBus) {
      try {
        this.sfxBus.disconnect();
        this.sfxBus.connect(this.distortionNode);
        this.sfxConnectedToDistortion = true;
      } catch {
        /* ignore double-connect */
      }
    }
  }

  getSfxBus(): GainNode | null {
    return this.sfxBus;
  }

  getContext(): AudioContext | null {
    return this.ctx;
  }
}

export const audio = new AudioGraph();