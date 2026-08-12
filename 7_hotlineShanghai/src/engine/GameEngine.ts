import { FIXED_DT, MAX_FRAME_ACCUM, STORE_SYNC_INTERVAL } from '../core/constants';
import type { ISimulation, SimEvent } from '../core/types';
import type { UiCommand } from '../store';
import { setUiBridge, useUiStore } from '../store';
import { AudioManager } from './AudioManager';
import { InputManager } from './InputManager';
import { SceneManager } from './SceneManager';
import { RcPresenter } from './RcPresenter';
import { installDevtools, uninstallDevtools } from './devtools';

declare global {
  interface Window {
    __rcPresenterPlanes?: unknown;
  }
}

export class GameEngine {
  private readonly scene: SceneManager;
  private readonly input: InputManager;
  private readonly rc: RcPresenter;
  private readonly audio = new AudioManager();
  private frame = 0;
  private raf = 0;
  private last = 0;
  private accumulator = 0;
  private eventCursor = 0;
  constructor(private readonly sim: ISimulation, host: HTMLElement) {
    this.scene = new SceneManager(host);
    this.rc = new RcPresenter(host, this.scene.canvas);
    this.input = new InputManager(
      (action) => this.sim.input(action),
      (clientX, clientY) => this.scene.aimAngle(clientX, clientY, this.sim.snapshot().player.position),
    );
  }
  start(): void {
    setUiBridge(this.onUiCommand);
    this.input.start();
    installDevtools(this.sim, this.rc.state, (config) => this.rc.setConfig(config), this.rc.pipelineInstance);
    Object.defineProperty(window, '__rcPresenterPlanes', {
      configurable: true,
      get: () => this.rc.lastPlanes,
    });
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }
  stop(): void {
    cancelAnimationFrame(this.raf); this.input.stop(); this.rc.destroy(); this.scene.destroy(); this.audio.destroy(); setUiBridge(null); uninstallDevtools();
  }
  private loop = (now: number): void => {
    // DEV 冻结:__rcFreezeFrames=true 时停住 sim+render,debugShowStage 的阶段
    // 纹理截图不会被每帧 final blit 覆盖
    if (window.__rcFreezeFrames === true) {
      this.raf = requestAnimationFrame(this.loop);
      return;
    }
    const elapsed = Math.min((now - this.last) / 1000, FIXED_DT * MAX_FRAME_ACCUM); this.last = now; this.accumulator += elapsed;
    while (this.accumulator >= FIXED_DT) { this.input.update(); this.sim.step(FIXED_DT); this.accumulator -= FIXED_DT; this.frame++; }
    this.consumeEvents(); const snap = this.sim.snapshot(); this.scene.rcActive = this.rc.state.activeCascades > 0; this.scene.render(snap, elapsed); this.rc.render(snap, this.scene.shakeOffset); this.audio.update(elapsed);
    if (this.frame % STORE_SYNC_INTERVAL === 0) useUiStore.getState().sync(snap);
    this.raf = requestAnimationFrame(this.loop);
  };
  private onUiCommand = (cmd: UiCommand): void => {
    if (cmd.kind === 'startGame') { (this.sim as ISimulation & { start?: () => void }).start?.(); void this.audio.init(); }
    if (cmd.kind === 'retryMission' || cmd.kind === 'continueToNext') {
      (this.sim as ISimulation & { start?: () => void }).start?.();
      // v3.7: 重开/继续时清掉场景残留的全屏 flash/红闪,避免 restart 首帧被白/红覆盖增强
      this.scene.clearTransientEffects();
    }
    if (cmd.kind === 'quitToTitle') this.sim.input({ kind: 'quitToTitle' });
  };
  private consumeEvents(): void {
    while (this.eventCursor < this.sim.events.length) {
      const event = this.sim.events[this.eventCursor++]; this.scene.handle(event); this.playEvent(event);
    }
  }
  private playEvent(event: SimEvent): void {
    if (event.kind === 'lightSmash') this.audio.playSfx(event.state === 'dead' ? 'explosion' : 'thud_hit', event.state === 'dead' ? .38 : .55);
    else if (event.kind === 'melee') this.audio.playSfx('melee_swing', .45);
    else if (event.kind === 'attackBlocked') this.audio.playSfx('mode_switch', .8);
    else if (event.kind === 'enemyKilled') { this.audio.playSfx('thud_hit', .9); this.audio.playSfx('splash_blood', .65); }
    // v3.6:开火 / 掷枪音效;detectionWarning 改上行双哔(fire_pistol 让给真枪声,避免听觉歧义)
    else if (event.kind === 'fire') this.audio.playSfx('fire_pistol', .6);
    else if (event.kind === 'throw' || event.kind === 'weaponThrown') this.audio.playSfx('throw_weapon', .55);
    else if (event.kind === 'detectionWarning') this.audio.playSfx('pickup_weapon', .3);
    else if (event.kind === 'playerKilled') this.audio.playSfx('player_killed');
    else if (event.kind === 'missionEnd') this.audio.playSfx('mission_end_success');
  }
}
