/**
 * engine/IntroEngine.ts — intro 觉醒 cinematic 主编排(渲染适配器版)
 *
 * 节拍/输入/store 行为全部保留(风险清单:墙钟节拍键下即时评级、
 * launch 前 160ms setTimeout、5 固定帧撞击 hold、500ms MISS 恢复、
 * event.code 映射 + repeat 过滤、弹坑种子 round(5+power*4)、碎屑池 64 /
 * 体腔上限 240 / boss 单元 ≤2200、beatPulse 触发 DOM 重放、
 * canvas 挂 #three-canvas-container)。
 *
 * 渲染经 SceneRenderer 适配器:probeCapabilities() →
 * RaytraceAdapter(IntroSceneBuilder,默认)/ IntroRasterAdapter(回退,
 * 画面与今天完全一致)。物理/状态机共享 engine/introStage.ts。
 * 夜间光照:ambient/skyExposure 随觉醒进度(power)+ 撞击闪光(impact)
 * 逐帧经 uniform 驱动(零 emissive 改动)。
 */

import * as THREE from 'three';
import { usePatapongStore, type IntroState } from '../store';
import type { NoteType } from '../intro/types';
import type { UiCommand } from '../store';
import { BEAT_SECONDS, INTRO_COMMANDS, distanceToBeat, resolveIntroCommand, timingGrade, timingPower, type TimingGrade } from '../intro/rhythm';
import { IntroRasterAdapter } from './IntroRasterAdapter';
import type { IntroStageDriver } from './introStage';
import { probeCapabilities } from './raytrace/capability';
import { IntroSceneBuilder } from './raytrace/introScene';
import { RaytraceAdapter } from './raytrace/RaytraceAdapter';
import type { CameraState, LightingState, SceneRenderer, VisualState } from './raytrace/SceneContract';

const FIXED_DT = 1 / 60;
const KEY_NOTES: Record<string, NoteType> = { KeyW: 'PATA', KeyA: 'PON', KeyS: 'DON', KeyD: 'CHAKA' };
const NOTE_KEYS: Record<NoteType, string> = { PATA: 'W', PON: 'A', DON: 'S', CHAKA: 'D' };

// ─── intro 相机(静止;(2.2,7.2,28) 看向 (0,0.65,0),FOV 30) ───
const INTRO_FOV = 30;

function buildCameraState(): CameraState {
  const cam = new THREE.PerspectiveCamera(INTRO_FOV, 1, 0.1, 100);
  cam.position.set(2.2, 7.2, 28);
  cam.lookAt(0, 0.65, 0);
  cam.updateMatrixWorld();
  return {
    position: cam.position.clone(),
    right: new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0),
    up: new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1),
    fwd: new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 2).negate(),
    tanHalfFov: Math.tan(THREE.MathUtils.degToRad(INTRO_FOV) / 2),
  };
}

export class IntroEngine {
  private input: NoteType[] = [];
  private lastTime = 0;
  private accumulator = 0;
  private beatClock = 0;
  private grades: TimingGrade[] = [];
  private selectedCommand = 'ATTACK';
  private running = false;
  private rafId = 0;
  private renderer: THREE.WebGLRenderer | null = null;
  private adapter: SceneRenderer<IntroState> | null = null;
  private driver: IntroStageDriver | null = null;
  private keyHandler: ((event: KeyboardEvent) => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private readonly camState: CameraState = buildCameraState();
  /** 夜间光照基线:弱暖阳 + 月光主光源;ambient/skyExposure 每帧随觉醒/撞击调制 */
  private readonly lighting: LightingState = {
    sunDir: new THREE.Vector3(0.55, 0.35, 0.45).normalize(),
    sunColor: new THREE.Color(0.32, 0.28, 0.4),
    moonDir: new THREE.Vector3(-0.42, 0.42, -0.62).normalize(),
    moonColor: new THREE.Color(0.85, 0.95, 1.15),
    moonIntensity: 1.25,
    ambientScale: 0.5,
    skyExposure: 0.5,
  };
  private readonly visual: VisualState = { lighting: this.lighting };

  start(): void {
    if (this.running) return;
    const container = document.getElementById('three-canvas-container');
    if (!container) {
      requestAnimationFrame(() => this.start());
      return;
    }
    this.running = true;
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const callbacks = {
      onImpact: (debris: number, crater: number) =>
        this.patch({ stage: 'impact', debrisCount: debris, craterVoxels: crater }),
      onEnding: () =>
        this.patch({
          stage: 'ending',
          complete: true,
          finalCommand: this.selectedCommand,
          finalGrade: this.grades.at(-1) ?? null,
        }),
    };
    const capability = probeCapabilities();
    if (capability.kind === 'raytrace') {
      const builder = new IntroSceneBuilder(callbacks);
      this.adapter = new RaytraceAdapter<IntroState>(renderer, builder);
      this.driver = builder;
    } else {
      const raster = new IntroRasterAdapter(renderer, callbacks);
      this.adapter = raster;
      this.driver = raster;
    }
    this.adapter.activate();
    this.adapter.setSize(container.clientWidth, container.clientHeight);
    usePatapongStore.setState({ rendererMode: this.adapter.kind });

    this.keyHandler = (event: KeyboardEvent) => {
      if (event.code === 'KeyR') {
        this.reset();
        return;
      }
      const note = KEY_NOTES[event.code];
      if (note && !event.repeat) this.accept(note);
    };
    window.addEventListener('keydown', this.keyHandler);
    this.resizeHandler = () => {
      this.adapter?.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', this.resizeHandler);

    this.reset();
    const frame = (time: number) => {
      if (!this.running) return;
      const dt = Math.min(0.05, this.lastTime ? (time - this.lastTime) / 1000 : 0);
      this.lastTime = time;
      const state = usePatapongStore.getState().intro;
      if (state.stage === 'input') {
        this.beatClock += dt;
        if (this.beatClock >= BEAT_SECONDS) {
          this.beatClock -= BEAT_SECONDS;
          this.patch({ beatPulse: state.beatPulse + 1, timing: 'ready' });
        }
      }
      this.accumulator += dt;
      let loops = 0;
      while (this.accumulator >= FIXED_DT && loops++ < 5) {
        this.driver?.update(FIXED_DT, time);
        this.accumulator -= FIXED_DT;
      }
      // 夜间光照调制:觉醒进度抬环境,撞击闪光短促提亮
      const impact = this.driver?.impact ?? 0;
      this.lighting.ambientScale = 0.5 + 0.3 * state.power + 1.1 * impact;
      this.lighting.skyExposure = 0.5 + 0.25 * state.power + 0.9 * impact;
      this.adapter?.render(state, this.visual, this.camState, time / 1000);
      this.rafId = requestAnimationFrame(frame);
    };
    this.rafId = requestAnimationFrame(frame);
  }

  /** 停止 rAF / 移除监听 / 释放 WebGL 资源(battle 接管画布时调用;之后不可复用) */
  stop(): void {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.rafId);
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    this.keyHandler = null;
    this.resizeHandler = null;
    this.adapter?.dispose();
    this.adapter = null;
    this.driver = null;
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
      this.renderer = null;
    }
  }

  handleUiCommand(command: UiCommand): void {
    if (command === 'replay' || command === 'skipIntro') this.reset();
  }

  private accept(note: NoteType): void {
    const state = usePatapongStore.getState().intro;
    if (state.stage !== 'input') return;
    const key = NOTE_KEYS[note];
    const prefix = [...this.input.map((item) => NOTE_KEYS[item]), key];
    const candidates = INTRO_COMMANDS.filter((command) => command.keys.slice(0, prefix.length).every((expected, index) => expected === prefix[index]));
    if (candidates.length === 0) {
      this.fail('MISS - COMMAND RESET');
      return;
    }
    const grade = timingGrade(distanceToBeat(this.beatClock));
    this.input.push(note);
    this.grades.push(grade);
    const power = this.grades.reduce((sum, item) => sum + timingPower(item), 0) / this.grades.length;
    const command = prefix.length === 4 ? resolveIntroCommand(prefix) : candidates[0];
    this.selectedCommand = command?.name ?? candidates[0]?.name ?? 'ATTACK';
    this.driver?.pulseDance(this.input.length / 4);
    this.patch({
      input: [...this.input],
      grades: [...this.grades],
      power,
      selectedCommand: this.selectedCommand,
      timing: grade === 'OFF BEAT' ? 'miss' : 'ready',
      message: this.input.length === 4 ? `${this.selectedCommand}!` : grade,
    });
    if (this.input.length === 4) {
      this.patch({ stage: 'flight' });
      window.setTimeout(() => this.driver?.launch(power), 160);
    }
  }

  private fail(message: string): void {
    this.input = [];
    this.patch({ input: [], timing: 'miss', message });
    window.setTimeout(() => {
      if (usePatapongStore.getState().intro.stage === 'input') this.patch({ timing: 'ready', message: 'COMMAND THE ARMY' });
    }, 500);
  }

  private reset(): void {
    this.input = [];
    this.grades = [];
    this.selectedCommand = 'ATTACK';
    this.accumulator = 0;
    this.beatClock = 0;
    this.driver?.reset();
    usePatapongStore.setState({
      intro: {
        stage: 'input',
        input: [],
        grades: [],
        power: 0,
        complete: false,
        beatPulse: 0,
        timing: 'ready',
        message: 'COMMAND THE ARMY',
        debrisCount: 0,
        craterVoxels: 0,
        finalGrade: null,
        selectedCommand: 'ATTACK',
        finalCommand: null,
      },
    });
  }

  private patch(patch: Partial<IntroState>): void {
    const current = usePatapongStore.getState().intro;
    usePatapongStore.setState({ intro: { ...current, ...patch } });
  }
}

export { NOTE_KEYS };
