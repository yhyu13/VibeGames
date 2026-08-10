// src/engine/RcPipeline.ts — 2D Radiance Cascades 全管线（M1.4 移植，rc-lab 已验 35/35）
//
// 算法源头: C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo
// 移植自:  rc-lab/pipeline.ts（干净 GLSL ES 3.00，零运行时补丁）
// 有意修正（详见 rc-lab/README.md「关键发现」）:
//   1. uEps uniform —— RGBA8 距离场命中阈值默认 3/255（demo 0.0005 仅适用 R16）
//   2. uDirectLighting 用 uv 采样（去掉 raylib 翻转残留 -uv.y）
//   3. 两轮 cascade（demo 原版: 直射→间接）默认开启；旧游戏单轮变体可用 twoLoop=false
//   4. 中间缓冲全部 RGBA8（TDD §3.5），无 EXT_color_buffer_float 依赖
//
// 输入契约（SceneManager 尚未接入，M1 集成时提供三张同尺寸纹理）:
//   occlusion  = 白=空 / 黑=墙（occluder seed）
//   emission   = 光斑（发光 seed）
//   sceneColor = final 合成的 base 色
//
// 注意（本机 ANGLE/SwiftShader 实测）: 整缓冲 readPixels 存在陈旧缓存 bug，
// 调试读取一律用 readPixel()（1×1）。生产不依赖 readPixels。

/// <reference types="vite/client" />

import prepsceneFrag from './shaders/prepscene.frag?raw';
import prepjfaFrag from './shaders/prepjfa.frag?raw';
import jfaFrag from './shaders/jfa.frag?raw';
import distfieldFrag from './shaders/distfield.frag?raw';
import rcIntervalFrag from './shaders/rc_interval.frag?raw';
import rcMergeFrag from './shaders/rc_merge.frag?raw';
import finalFrag from './shaders/final.frag?raw';
import passthroughFrag from './shaders/passthrough.frag?raw';
import fullscreenVert from './shaders/fullscreen.vert?raw';

// ── 默认值（TDD §4.4.6 / §15；标注处为 lab 实测修正，待 [TDD-CONTRACT-CHANGE]）──
const RC_CASCADE_COUNT = 3;
const RC_BASE_RAY_COUNT = 4;
const RC_BASE_INTERVAL_PX = 1.5;      // 契约 0.5：1080p 下 3 级最大可达仅 128px≈2.1u，灯半径 3.5u 照不亮房间
const RC_PROPAGATION_RATE = 0.85;
const RC_MIX_FACTOR = 0.5;
const RC_LIGHT_SCALE = 1.35;
const RC_AMBIENT_INTENSITY = 0.02;    // 每个 cascade pass 各加一次（×4≈0.08）；契约 0.12 累加会过曝
const RC_EPS = 3 / 255;               // > RGBA8 距离场量化步长 1/255
const RC_JFA_RESOLUTION_SCALE = 1.0;

export interface RcPipelineConfig {
  cascadeCount: number;      // 1..4；0 = RC 关闭回退 base color
  baseRayCount: number;      // 2..8（demo uBaseRayCount）
  baseIntervalPx: number;    // demo uBaseInterval（px）
  propagationRate: number;   // demo uPropagationRate
  mixFactor: number;         // demo uMixFactor
  lightScale: number;        // final.frag uLightScale（加法合成增益）
  ambientIntensity: number;  // rc.frag uAmbientIntensity（每 pass 累加）
  eps: number;               // rc.frag uEps（RGBA8 SDF 命中阈值）
  ditherEnabled: boolean;    // final.frag 4×4 Bayer 回压
  jfaPasses: number;         // -1 = 自动 ceil(log2(min(W,H)))；>=0 手动
  resolutionScale: number;   // 0.5 | 1.0（RC 半分辨率降级）
  twoLoop: boolean;          // demo 原版两轮 cascade（直射→间接）；false = 旧游戏单轮变体
  mergeMode: 0 | 1 | 2;      // 0=demo 镜像映射 1=本像素双线性 2=射线终点双线性
  canonicalSpacing?: boolean; // true=canonical(cascade0 最细) false/缺省=demo(反转)
}

/** 管线状态快照（TDD §15.6 / §3.4，供 __rcPipeline 使用） */
export interface RcPipelineState {
  activeCascades: number;
  resolutionScale: number;
  ditherEnabled: boolean;
  lastFrameTimeMs: number;
  lightCount: number;
  jfaPasses: number;
  propagationRate: number;
  mixFactor: number;
  lightScale: number;
  ambientIntensity: number;
  eps: number;
  twoLoop: boolean;
  degraded: boolean;
}

export const DEFAULT_RC_CONFIG: RcPipelineConfig = {
  cascadeCount: RC_CASCADE_COUNT,
  baseRayCount: RC_BASE_RAY_COUNT,
  baseIntervalPx: RC_BASE_INTERVAL_PX,
  propagationRate: RC_PROPAGATION_RATE,
  mixFactor: RC_MIX_FACTOR,
  lightScale: RC_LIGHT_SCALE,
  ambientIntensity: RC_AMBIENT_INTENSITY,
  eps: RC_EPS,
  ditherEnabled: true,
  jfaPasses: -1,
  resolutionScale: RC_JFA_RESOLUTION_SCALE,
  twoLoop: true,
  mergeMode: 0,
  canonicalSpacing: false,
};

/** 帧输入：三张同尺寸 WebGL 纹理（SceneManager 接入后由它提供） */
export interface RcFrameInput {
  width: number;
  height: number;
  occlusion: WebGLTexture;
  emission: WebGLTexture;
  sceneColor: WebGLTexture;
  lightCount?: number;
}

/** 便捷输入：ImageData（rc-lab 场景/调试用；上传后即 WebGL 纹理） */
export interface RcFrameImages {
  width: number;
  height: number;
  occlusion: ImageData;
  emission: ImageData;
  sceneColor: ImageData;
  lightCount?: number;
}

export interface RcStageTimings {
  prepscene: number;
  jfa: number;
  distfield: number;
  cascade: number;
  final: number;
  total: number;
}

export type RcReadStage = 'seed' | 'sdf' | 'radiance' | 'final';

export type RcDegradationKind =
  | 'RC_CASCADE_REDUCE'
  | 'RC_HALF_RES'
  | 'RC_GI_SINGLE_PASS'
  | 'RC_OFF';

interface RenderTarget {
  framebuffer: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
}

interface ShaderProgram {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation | null>;
}

interface ProgramSet {
  prepscene: ShaderProgram;
  prepjfa: ShaderProgram;
  jfa: ShaderProgram;
  distfield: ShaderProgram;
  rcInterval: ShaderProgram;
  rcMerge: ShaderProgram;
  final: ShaderProgram;
  passthrough: ShaderProgram;
}

export class RcPipeline {
  private readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private programs: ProgramSet;
  private vao: WebGLVertexArrayObject;
  private config: RcPipelineConfig;
  private state_: RcPipelineState;

  private workW = 1;
  private workH = 1;
  private atlasW = 1;
  private atlasH = 1;
  private currentCascadeCount = 3;
  private actualJfaPasses = 0;
  private renderCount = 0;
  private lastFrameMs = 0;
  private lastGLError = 0;

  private seedTarget: RenderTarget | null = null;      // [1] sceneSeed RGBA8
  private jfaA: RenderTarget | null = null;            // [2][3] JFA ping-pong RGBA8
  private jfaB: RenderTarget | null = null;
  private jfaOut: RenderTarget | null = null;
  private sdfTarget: RenderTarget | null = null;       // [4] sceneSdf RGBA8
  private cascadeA: RenderTarget | null = null;        // [5] cascade ping-pong RGBA8
  private cascadeB: RenderTarget | null = null;
  private intervalTarget: RenderTarget | null = null;  // [5b] interval pass output
  private directTarget: RenderTarget | null = null;    // 两轮模式：直射结果存档
  private radianceOut: RenderTarget | null = null;
  private finalTarget: RenderTarget | null = null;     // [6] final RGBA8（读回 + blit 上屏）

  private uploadTextures: [WebGLTexture, WebGLTexture, WebGLTexture] | null = null;
  private uploadW = 0;
  private uploadH = 0;
  private whiteTex: WebGLTexture;

  constructor(canvas: HTMLCanvasElement, config: Partial<RcPipelineConfig> = {}) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      // e2e 视觉门禁需要 drawImage 回读合成结果(480×432 小画布,开销可忽略)
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    if (gl === null) {
      throw new Error('RcPipeline: WebGL2 不可用（需要 Chrome / Edge 108+）');
    }
    if (gl.getExtension('EXT_color_buffer_float') === null) {
      console.warn('[RcPipeline] 缺少 EXT_color_buffer_float（RGBA8 管线不受影响，HDR 优化暂不可用）');
    }
    this.gl = gl;
    this.config = { ...DEFAULT_RC_CONFIG, ...config };
    this.clampConfig();
    this.state_ = this.makeState();

    this.programs = {
      prepscene: this.compile(fullscreenVert, prepsceneFrag, 'prepscene'),
      prepjfa: this.compile(fullscreenVert, prepjfaFrag, 'prepjfa'),
      jfa: this.compile(fullscreenVert, jfaFrag, 'jfa'),
      distfield: this.compile(fullscreenVert, distfieldFrag, 'distfield'),
      rcInterval: this.compile(fullscreenVert, rcIntervalFrag, 'rcInterval'),
      rcMerge: this.compile(fullscreenVert, rcMergeFrag, 'rcMerge'),
      final: this.compile(fullscreenVert, finalFrag, 'final'),
      passthrough: this.compile(fullscreenVert, passthroughFrag, 'passthrough'),
    };
    this.vao = this.setupFullscreenQuad();
    this.whiteTex = this.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.whiteTex);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA8, 1, 1, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]),
    );
    this.resize(canvas.width || 1, canvas.height || 1);
  }

  // ── 公开 API ───────────────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.recreateTargets(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));
  }

  /** ImageData 便捷入口（rc-lab 场景/调试；SceneManager 接入后可改用 renderFrame） */
  render(images: RcFrameImages, override: Partial<RcPipelineConfig> = {}): RcStageTimings {
    this.resize(images.width, images.height);
    const textures = this.ensureUploadTextures();
    const frame: RcFrameInput = {
      width: images.width,
      height: images.height,
      occlusion: this.uploadImageData(textures[0], images.occlusion),
      emission: this.uploadImageData(textures[1], images.emission),
      sceneColor: this.uploadImageData(textures[2], images.sceneColor),
      lightCount: images.lightCount,
    };
    return this.renderFrame(frame, override);
  }

  /** 完整 6 阶段管线（含两轮 cascade + final blit 上屏） */
  renderFrame(frame: RcFrameInput, override: Partial<RcPipelineConfig> = {}): RcStageTimings {
    const config: RcPipelineConfig = { ...this.config, ...override };
    this.clampConfigRef(config);
    const t0 = performance.now();
    this.currentCascadeCount = Math.max(0, Math.min(4, Math.floor(config.cascadeCount)));
    this.resize(frame.width, frame.height);
    this.saveGlState();

    const tPrepscene = performance.now();
    this.renderPrepscene(frame.occlusion, frame.emission);
    const tJfa = performance.now();
    this.renderJfa();
    const tDist = performance.now();
    this.renderDistfield();
    const tCascade = performance.now();
    this.renderCascades(config);
    const tFinal = performance.now();
    this.renderFinal(frame.sceneColor, config);
    this.blitToScreen();

    this.restoreGlState();
    this.renderCount += 1;
    this.lastFrameMs = performance.now() - t0;
    this.state_.lightCount = Math.max(0, Math.floor(frame.lightCount ?? 0));
    this.syncState(config);

    return {
      prepscene: tJfa - tPrepscene,
      jfa: tDist - tJfa,
      distfield: tCascade - tDist,
      cascade: tFinal - tCascade,
      final: performance.now() - tFinal,
      total: this.lastFrameMs,
    };
  }

  /**
   * 读回单个像素（RGBA8）。本机 ANGLE/SwiftShader 的整缓冲 readPixels 有陈旧缓存 bug，
   * 调试/断言一律用 1×1 读取。
   */
  readPixel(stage: RcReadStage, x: number, y: number): [number, number, number, number] {
    const gl = this.gl;
    const t = this.requireTarget(stage);
    const gx = Math.max(0, Math.min(t.width - 1, Math.round(x)));
    const displayH = stage === 'radiance' ? this.workH : t.height;
    const gy = Math.max(0, Math.min(t.height - 1, displayH - 1 - Math.round(y)));
    const out = new Uint8Array(4);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, t.framebuffer);
    gl.finish();
    gl.readPixels(gx, gy, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    return [out[0], out[1], out[2], out[3]];
  }

  /** 调试/展示：把某个阶段纹理直出到屏幕（随后可用 canvas.toDataURL 抓取） */
  debugShowStage(stage: RcReadStage, boost = 1): void {
    const gl = this.gl;
    const p = this.programs.passthrough;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(p.program);
    this.setTex(p, 'uTex', 0, this.requireTarget(stage).texture);
    this.setUniform1f(p, 'uBoost', boost);
    this.drawFullscreen();
    gl.finish();
  }

  state(): RcPipelineState {
    return this.state_;
  }

  setConfig(partial: Partial<RcPipelineConfig>): void {
    this.config = { ...this.config, ...partial };
    this.clampConfig();
    this.syncState(this.config);
  }

  /** 降级链（TDD §3.6 / §15.4；PerfWatchdog 调用） */
  applyDegradation(kind: RcDegradationKind): void {
    switch (kind) {
      case 'RC_CASCADE_REDUCE':
        this.config.cascadeCount = Math.max(1, this.config.cascadeCount - 1);
        break;
      case 'RC_HALF_RES':
        this.config.resolutionScale = 0.5;
        break;
      case 'RC_GI_SINGLE_PASS':
        // gi.frag 单 pass 待移植；先用 1 级 cascade 近似（效果弱于 gi，但保持可运行）
        this.config.cascadeCount = 1;
        break;
      case 'RC_OFF':
        this.config.cascadeCount = 0;
        break;
    }
    this.clampConfig();
    this.syncState(this.config);
  }

  removeDegradation(): void {
    this.config = { ...DEFAULT_RC_CONFIG };
    this.clampConfig();
    this.syncState(this.config);
  }

  destroy(): void {
    const gl = this.gl;
    for (const t of [
      this.seedTarget, this.jfaA, this.jfaB, this.sdfTarget,
      this.cascadeA, this.cascadeB, this.intervalTarget, this.directTarget, this.finalTarget,
    ]) {
      if (t !== null) {
        gl.deleteFramebuffer(t.framebuffer);
        gl.deleteTexture(t.texture);
      }
    }
    if (this.uploadTextures !== null) {
      for (const tex of this.uploadTextures) gl.deleteTexture(tex);
    }
    gl.deleteTexture(this.whiteTex);
    gl.deleteVertexArray(this.vao);
    for (const p of Object.values(this.programs)) gl.deleteProgram(p.program);
    this.seedTarget = null;
    this.jfaA = null;
    this.jfaB = null;
    this.jfaOut = null;
    this.sdfTarget = null;
    this.cascadeA = null;
    this.cascadeB = null;
    this.intervalTarget = null;
    this.directTarget = null;
    this.radianceOut = null;
    this.finalTarget = null;
    this.uploadTextures = null;
    this.uploadW = 0;
    this.uploadH = 0;
  }

  get glError(): number {
    return this.lastGLError;
  }

  isContextLost(): boolean {
    return this.gl.isContextLost();
  }

  // ── 阶段 ───────────────────────────────────────────────────────────────

  private renderPrepscene(occlusion: WebGLTexture, emission: WebGLTexture): void {
    const gl = this.gl;
    const p = this.programs.prepscene;
    const target = this.requireTarget('seed');
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uOcclusionMap', 0, occlusion);
    this.setTex(p, 'uEmissionMap', 1, emission);
    this.setUniform2f(p, 'uMousePos', 0, 0);
    this.setUniform1f(p, 'uBrushSize', 1);
    this.setUniform4f(p, 'uBrushColor', 1, 1, 1, 1);
    this.setUniform1i(p, 'uMouseLight', 0);
    this.drawFullscreen();
    this.checkGlError('prepscene');
  }

  private renderJfa(): void {
    const gl = this.gl;
    const p = this.programs.prepjfa;
    const jfaA = this.requireTarget('jfaA');
    this.bindTarget(jfaA);
    gl.useProgram(p.program);
    this.setTex(p, 'uSceneMap', 0, this.requireTarget('seed').texture);
    this.drawFullscreen();
    this.checkGlError('prepjfa');

    let read = jfaA;
    let write = this.requireTarget('jfaB');
    const jp = this.programs.jfa;
    for (let i = 0; i < this.actualJfaPasses; i += 1) {
      const jump = 1 << Math.max(0, this.actualJfaPasses - 1 - i);
      this.bindTarget(write);
      gl.useProgram(jp.program);
      this.setTex(jp, 'uCanvas', 0, read.texture);
      this.setUniform1i(jp, 'uJumpSize', jump);
      this.drawFullscreen();
      this.checkGlError(`jfa[${i}]`);
      const tmp = read;
      read = write;
      write = tmp;
    }
    this.jfaOut = read;
  }

  private renderDistfield(): void {
    const gl = this.gl;
    const p = this.programs.distfield;
    const target = this.requireTarget('sdf');
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uJFA', 0, this.requireTarget('jfaOut').texture);
    this.drawFullscreen();
    this.checkGlError('distfield');
  }

  private renderCascades(config: RcPipelineConfig): void {
    if (this.currentCascadeCount <= 0) return;
    const aTarget = this.requireTarget('cascadeA');
    const bTarget = this.requireTarget('cascadeB');

    // first loop: direct (mixFactor=0, no ambient, direct lighting = scene seed)
    const directOut = this.renderCascadeLoop(
      config,
      this.requireTarget('seed').texture,
      0,
      false,
      aTarget,
      bTarget,
    );

    if (config.twoLoop) {
      // save direct result (second loop overwrites cascadeA/B)
      this.copyTextureToTarget(directOut.texture, this.requireTarget('directTarget'));
      // second loop: indirect (mixFactor=config, ambient on, direct lighting = direct result)
      this.radianceOut = this.renderCascadeLoop(
        config,
        this.requireTarget('directTarget').texture,
        config.mixFactor,
        true,
        aTarget,
        bTarget,
      );
    } else {
      this.radianceOut = directOut;
    }
  }

  /**
   * One canonical cascade chain: descending index = cascadeCount -> stopIndex.
   * The coarsest level writes its interval result straight into a merged buffer;
   * every lower level runs an interval pass then a bilinear merge pass.
   */
  private renderCascadeLoop(
    config: RcPipelineConfig,
    directLightingTex: WebGLTexture,
    mixFactor: number,
    ambient: boolean,
    aTarget: RenderTarget,
    bTarget: RenderTarget,
  ): RenderTarget {
    const intervalBuf = this.requireTarget('interval');
    let mergedOut: RenderTarget | null = null;
    let out = aTarget;

    for (let index = this.currentCascadeCount; index >= 0; index -= 1) {
      if (index === this.currentCascadeCount) {
        // coarsest level: no upper cascade to merge with; interval is the merged output
        this.renderInterval(index, out, directLightingTex, mixFactor, ambient, config);
        mergedOut = out;
        out = out === aTarget ? bTarget : aTarget;
      } else {
        this.renderInterval(index, intervalBuf, directLightingTex, mixFactor, false, config);
        this.renderMerge(index, intervalBuf, mergedOut as RenderTarget, out, ambient, config);
        mergedOut = out;
        out = out === aTarget ? bTarget : aTarget;
      }
    }
    return mergedOut as RenderTarget;
  }

  private renderInterval(
    index: number,
    target: RenderTarget,
    directLightingTex: WebGLTexture,
    mixFactor: number,
    ambient: boolean,
    config: RcPipelineConfig,
  ): void {
    const gl = this.gl;
    const p = this.programs.rcInterval;
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uDistanceField', 0, this.requireTarget('sdf').texture);
    this.setTex(p, 'uSceneMap', 1, this.requireTarget('seed').texture);
    this.setTex(p, 'uDirectLighting', 2, directLightingTex);
    this.setUniform2f(p, 'uResolution', this.atlasW, this.atlasH);
    this.setUniform2f(p, 'uScreenSize', this.workW, this.workH);
    this.setUniform1f(p, 'uMinSide', Math.min(this.workW, this.workH));
    this.setUniform1f(p, 'uCascadeIndex', index);
    this.setUniform1f(p, 'uCascadeCount', this.currentCascadeCount);
    this.setUniform1f(p, 'uBaseIntervalPx', config.baseIntervalPx);
    this.setUniform1f(p, 'uMixFactor', mixFactor);
    this.setUniform1f(p, 'uPropagationRate', config.propagationRate);
    this.setUniform1f(p, 'uEps', config.eps);
    this.setUniform1i(p, 'uAmbient', ambient ? 1 : 0);
    this.setUniform3f(p, 'uAmbientColor', 1, 1, 1);
    this.setUniform1f(p, 'uAmbientIntensity', ambient ? config.ambientIntensity : 0);
    this.drawFullscreen();
    this.checkGlError(`rcInterval[${index}]`);
  }

  private renderMerge(
    index: number,
    intervalBuf: RenderTarget,
    upperMerged: RenderTarget,
    target: RenderTarget,
    ambient: boolean,
    config: RcPipelineConfig,
  ): void {
    const gl = this.gl;
    const p = this.programs.rcMerge;
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uInterval', 0, intervalBuf.texture);
    this.setTex(p, 'uLastPass', 1, upperMerged.texture);
    this.setUniform2f(p, 'uResolution', this.atlasW, this.atlasH);
    this.setUniform1f(p, 'uCascadeIndex', index);
    this.setUniform1f(p, 'uCascadeCount', this.currentCascadeCount);
    this.setUniform1i(p, 'uDisableMerging', 0);
    this.setUniform1i(p, 'uAmbient', ambient ? 1 : 0);
    this.setUniform3f(p, 'uAmbientColor', 1, 1, 1);
    this.setUniform1f(p, 'uAmbientIntensity', ambient ? config.ambientIntensity : 0);
    this.drawFullscreen();
    this.checkGlError(`rcMerge[${index}]`);
  }

  private copyTextureToTarget(source: WebGLTexture, target: RenderTarget): void {
    const gl = this.gl;
    const p = this.programs.passthrough;
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uTex', 0, source);
    this.setUniform1f(p, 'uBoost', 1);
    this.drawFullscreen();
    this.checkGlError('copyDirect');
  }

  private renderFinal(sceneColor: WebGLTexture, config: RcPipelineConfig): void {
    const gl = this.gl;
    const p = this.programs.final;
    const target = this.requireTarget('final');
    this.bindTarget(target);
    gl.useProgram(p.program);

    if (config.cascadeCount <= 0) {
      // RC 关闭回退：base + 白色 radiance * 0 = base
      this.setTex(p, 'uSceneMap', 0, sceneColor);
      this.setTex(p, 'uRadianceMap', 1, this.whiteTex);
      this.setUniform2f(p, 'uRadianceAtlasSize', 0, 0);
      this.setUniform1i(p, 'uDitherEnabled', 0);
      this.setUniform1f(p, 'uLightScale', 0);
      this.setUniform1f(p, 'uTime', 0);
      this.drawFullscreen();
      this.checkGlError('final-off');
      return;
    }

    this.setTex(p, 'uSceneMap', 0, sceneColor);
    this.setTex(p, 'uRadianceMap', 1, this.requireTarget('radianceOut').texture);
    this.setUniform2f(p, 'uRadianceAtlasSize', this.atlasW, this.atlasH);
    this.setUniform1i(p, 'uDitherEnabled', config.ditherEnabled ? 1 : 0);
    this.setUniform1f(p, 'uLightScale', config.lightScale);
    this.setUniform1f(p, 'uTime', 0);
    this.drawFullscreen();
    this.checkGlError('final');
  }

  // ── 基础设施 ───────────────────────────────────────────────────────────

  private recreateTargets(w: number, h: number): void {
    const gl = this.gl;
    const scaledW = Math.max(1, Math.round(w * this.config.resolutionScale));
    const scaledH = Math.max(1, Math.round(h * this.config.resolutionScale));
    const blockMax = Math.pow(2, this.currentCascadeCount + 1);
    const atlasH = Math.ceil(scaledH / blockMax) * blockMax;
    if (w === this.workW && h === this.workH && atlasH === this.atlasH && this.seedTarget !== null) return;
    this.workW = w;
    this.workH = h;
    this.atlasW = scaledW;
    this.atlasH = atlasH;
    this.canvas.width = w;
    this.canvas.height = h;

    this.seedTarget = this.recreateTarget(this.seedTarget, scaledW, scaledH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaA = this.recreateTarget(this.jfaA, scaledW, scaledH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaB = this.recreateTarget(this.jfaB, scaledW, scaledH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.sdfTarget = this.recreateTarget(this.sdfTarget, scaledW, scaledH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.cascadeA = this.recreateTarget(this.cascadeA, scaledW, atlasH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.cascadeB = this.recreateTarget(this.cascadeB, scaledW, atlasH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.intervalTarget = this.recreateTarget(this.intervalTarget, scaledW, atlasH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.directTarget = this.recreateTarget(this.directTarget, scaledW, atlasH, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.finalTarget = this.recreateTarget(this.finalTarget, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaOut = this.jfaA;
    this.radianceOut = this.cascadeA;
    this.actualJfaPasses = this.resolveJfaPasses();
  }

  private recreateTarget(
    target: RenderTarget | null,
    w: number,
    h: number,
    internal: number,
    format: number,
    type: number,
    filter: number,
  ): RenderTarget {
    const gl = this.gl;
    if (target !== null) {
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.framebuffer);
    }
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (texture === null || framebuffer === null) {
      throw new Error('创建 RC 渲染目标失败');
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`FBO 不完整: 0x${status.toString(16)}`);
    }
    return { framebuffer, texture, width: w, height: h };
  }

  private resolveJfaPasses(): number {
    if (this.config.jfaPasses >= 0) return Math.min(13, Math.floor(this.config.jfaPasses));
    return Math.max(1, Math.ceil(Math.log2(Math.min(this.workW, this.workH))));
  }

  private createTexture(): WebGLTexture {
    const gl = this.gl;
    const tex = gl.createTexture();
    if (tex === null) throw new Error('createTexture 失败');
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }

  private ensureUploadTextures(): [WebGLTexture, WebGLTexture, WebGLTexture] {
    if (this.uploadTextures === null) {
      this.uploadTextures = [this.createTexture(), this.createTexture(), this.createTexture()];
    }
    if (this.uploadW !== this.workW || this.uploadH !== this.workH) {
      for (const texture of this.uploadTextures) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA8, this.workW, this.workH, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
      }
      this.uploadW = this.workW;
      this.uploadH = this.workH;
    }
    return this.uploadTextures;
  }

  private uploadImageData(tex: WebGLTexture, image: ImageData): WebGLTexture {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // ImageData rows are top-first; flip once at upload so GL bottom-origin
    // coordinates sample the same visual row as the Canvas2D source.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, gl.RGBA, gl.UNSIGNED_BYTE, image.data);
    return tex;
  }

  private bindTarget(target: RenderTarget): void {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    gl.viewport(0, 0, target.width, target.height);
  }

  private drawFullscreen(): void {
    const gl = this.gl;
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.SCISSOR_TEST);
    gl.disable(gl.CULL_FACE);
    gl.colorMask(true, true, true, true);
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  private blitToScreen(): void {
    const gl = this.gl;
    const out = this.requireTarget('final');
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, out.framebuffer);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.blitFramebuffer(
      0, 0, out.width, out.height,
      0, 0, this.canvas.width, this.canvas.height,
      gl.COLOR_BUFFER_BIT, gl.NEAREST,
    );
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
  }

  private requireTarget(
    stage: RcReadStage | 'jfaA' | 'jfaB' | 'jfaOut' | 'cascadeA' | 'cascadeB' | 'interval' | 'radianceOut' | 'directTarget' | 'seed' | 'sdf' | 'final',
  ): RenderTarget {
    const t =
      stage === 'seed' ? this.seedTarget :
      stage === 'jfaA' ? this.jfaA :
      stage === 'jfaB' ? this.jfaB :
      stage === 'jfaOut' ? this.jfaOut :
      stage === 'sdf' ? this.sdfTarget :
      stage === 'cascadeA' ? this.cascadeA :
      stage === 'cascadeB' ? this.cascadeB :
      stage === 'interval' ? this.intervalTarget :
      stage === 'radianceOut' ? this.radianceOut :
      stage === 'directTarget' ? this.directTarget :
      this.finalTarget;
    if (t === null) throw new Error(`渲染目标未创建: ${stage}`);
    return t;
  }

  private setupFullscreenQuad(): WebGLVertexArrayObject {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    if (vao === null || vbo === null) throw new Error('VAO/VBO 创建失败');
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vao;
  }

  private compile(vertSrc: string, fragSrc: string, name: string): ShaderProgram {
    const gl = this.gl;
    const vs = this.compileStage(gl.VERTEX_SHADER, vertSrc, `${name}.vert`);
    const fs = this.compileStage(gl.FRAGMENT_SHADER, fragSrc, `${name}.frag`);
    const program = gl.createProgram();
    if (program === null) throw new Error(`createProgram 失败: ${name}`);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) {
      const log = gl.getProgramInfoLog(program) ?? '无日志';
      gl.deleteProgram(program);
      throw new Error(`program 链接失败: ${name} — ${log}`);
    }
    const uniforms = new Map<string, WebGLUniformLocation | null>();
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i += 1) {
      const info = gl.getActiveUniform(program, i);
      if (info === null) continue;
      uniforms.set(info.name, gl.getUniformLocation(program, info.name));
    }
    return { program, uniforms };
  }

  private compileStage(type: number, source: string, name: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (shader === null) throw new Error(`createShader 失败: ${name}`);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) !== true) {
      const log = gl.getShaderInfoLog(shader) ?? '无日志';
      gl.deleteShader(shader);
      throw new Error(`shader 编译失败: ${name} — ${log}`);
    }
    return shader;
  }

  private loc(p: ShaderProgram, name: string): WebGLUniformLocation | null {
    return p.uniforms.get(name) ?? null;
  }

  private setUniform1i(p: ShaderProgram, name: string, v: number): void {
    const l = this.loc(p, name);
    if (l !== null) this.gl.uniform1i(l, v);
  }

  private setUniform1f(p: ShaderProgram, name: string, v: number): void {
    const l = this.loc(p, name);
    if (l !== null) this.gl.uniform1f(l, v);
  }

  private setUniform2f(p: ShaderProgram, name: string, x: number, y: number): void {
    const l = this.loc(p, name);
    if (l !== null) this.gl.uniform2f(l, x, y);
  }

  private setUniform3f(p: ShaderProgram, name: string, x: number, y: number, z: number): void {
    const l = this.loc(p, name);
    if (l !== null) this.gl.uniform3f(l, x, y, z);
  }

  private setUniform4f(p: ShaderProgram, name: string, x: number, y: number, z: number, w: number): void {
    const l = this.loc(p, name);
    if (l !== null) this.gl.uniform4f(l, x, y, z, w);
  }

  private setTex(p: ShaderProgram, name: string, unit: number, texture: WebGLTexture): void {
    const l = this.loc(p, name);
    if (l === null) return;
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(l, unit);
  }

  private checkGlError(stage: string): void {
    const gl = this.gl;
    const err = gl.getError();
    if (err !== gl.NO_ERROR) {
      this.lastGLError = err;
      console.warn(`[RcPipeline] GL error after ${stage}: 0x${err.toString(16)}`);
    }
  }

  /** Three 接入前守卫：保存/恢复 program/VAO/纹理单元/开关状态，避免污染渲染器缓存 */
  private saveGlState(): void {
    const gl = this.gl;
    const units: (WebGLTexture | null)[] = [];
    for (let u = 0; u < 4; u += 1) {
      gl.activeTexture(gl.TEXTURE0 + u);
      units.push(gl.getParameter(gl.TEXTURE_BINDING_2D) as WebGLTexture | null);
    }
    this.glGuard = {
      program: gl.getParameter(gl.CURRENT_PROGRAM) as WebGLProgram | null,
      vao: gl.getParameter(gl.VERTEX_ARRAY_BINDING) as WebGLVertexArrayObject | null,
      units,
      blend: gl.isEnabled(gl.BLEND),
      depth: gl.isEnabled(gl.DEPTH_TEST),
      cull: gl.isEnabled(gl.CULL_FACE),
      scissor: gl.isEnabled(gl.SCISSOR_TEST),
    };
  }

  private restoreGlState(): void {
    const gl = this.gl;
    const g = this.glGuard;
    if (gl === null || g === null) return;
    for (let u = 0; u < 4; u += 1) {
      gl.activeTexture(gl.TEXTURE0 + u);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    gl.activeTexture(gl.TEXTURE0);
    if (g.blend) gl.enable(gl.BLEND);
    else gl.disable(gl.BLEND);
    if (g.depth) gl.enable(gl.DEPTH_TEST);
    else gl.disable(gl.DEPTH_TEST);
    if (g.cull) gl.enable(gl.CULL_FACE);
    else gl.disable(gl.CULL_FACE);
    if (g.scissor) gl.enable(gl.SCISSOR_TEST);
    else gl.disable(gl.SCISSOR_TEST);
    gl.useProgram(g.program);
    gl.bindVertexArray(g.vao);
    this.glGuard = null;
  }

  private glGuard: {
    program: WebGLProgram | null;
    vao: WebGLVertexArrayObject | null;
    units: (WebGLTexture | null)[];
    blend: boolean;
    depth: boolean;
    cull: boolean;
    scissor: boolean;
  } | null = null;

  private clampConfig(): void {
    this.clampConfigRef(this.config);
  }

  private clampConfigRef(c: RcPipelineConfig): void {
    c.cascadeCount = Math.max(0, Math.min(4, Math.floor(c.cascadeCount)));
    c.baseRayCount = Math.max(2, Math.min(8, Math.floor(c.baseRayCount)));
    c.baseIntervalPx = Math.max(0.1, c.baseIntervalPx);
    c.propagationRate = Math.max(0, Math.min(1, c.propagationRate));
    c.mixFactor = Math.max(0, Math.min(1, c.mixFactor));
    c.lightScale = Math.max(0, Math.min(4, c.lightScale));
    c.ambientIntensity = Math.max(0, Math.min(2, c.ambientIntensity));
    c.eps = Math.max(1 / 255, Math.min(0.1, c.eps));
    c.jfaPasses = Math.max(-1, Math.min(13, Math.floor(c.jfaPasses)));
    c.resolutionScale = c.resolutionScale <= 0.5 ? 0.5 : 1.0;
  }

  private makeState(): RcPipelineState {
    return {
      activeCascades: 0,
      resolutionScale: 1.0,
      ditherEnabled: true,
      lastFrameTimeMs: 0,
      lightCount: 0,
      jfaPasses: 0,
      propagationRate: 0,
      mixFactor: 0,
      lightScale: RC_LIGHT_SCALE,
      ambientIntensity: RC_AMBIENT_INTENSITY,
      eps: RC_EPS,
      twoLoop: true,
      degraded: false,
    };
  }

  private syncState(config: RcPipelineConfig): void {
    const s = this.state_;
    s.activeCascades = config.cascadeCount;
    s.resolutionScale = config.resolutionScale;
    s.ditherEnabled = config.ditherEnabled;
    s.lastFrameTimeMs = this.lastFrameMs;
    s.jfaPasses = this.actualJfaPasses;
    s.propagationRate = config.propagationRate;
    s.mixFactor = config.mixFactor;
    s.lightScale = config.lightScale;
    s.ambientIntensity = config.ambientIntensity;
    s.eps = config.eps;
    s.twoLoop = config.twoLoop;
    s.degraded = config.cascadeCount === 0 || config.resolutionScale < 1.0 || config.twoLoop !== true;
  }
}
