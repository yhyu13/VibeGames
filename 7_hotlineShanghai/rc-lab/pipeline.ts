// rc-lab/pipeline.ts —— 独立 WebGL2 RC 全管线（6 阶段），无 Three / React / zustand。
//
// 用途：在接入游戏前用确定性场景验证 2D Radiance Cascades 算法本体，
// 保证 M1 集成时一次成功。本文件 + rc-lab/shaders/* 即未来
// src/engine/RcPipeline.ts + src/engine/shaders/* 的算法参考实现。
//
// 与 demo 的差异（均为有意修正，见 rc-lab/README.md）：
//   1. shader 直接写成干净的 GLSL ES 3.00，零运行时字符串补丁；
//   2. uDirectLighting 用 uv 采样（demo 的 -uv.y 是 raylib 翻转残留）；
//   3. cascade 采用游戏契约的单循环变体：uDirectLighting=sceneSeed，
//      uMixFactor=RC_MIX_FACTOR（demo 用两轮循环，本实现把直射/间接合一）。
//   4. 中间缓冲全部 RGBA8（TDD §3.5 契约；WebGL2 无扩展依赖，读回稳定）。
//      480x216 下 UV 编码误差 ~1.9px，在 SDF 断言容差内。

import prepsceneFrag from './shaders/prepscene.frag?raw';
import prepjfaFrag from './shaders/prepjfa.frag?raw';
import jfaFrag from './shaders/jfa.frag?raw';
import distfieldFrag from './shaders/distfield.frag?raw';
import rcFrag from './shaders/rc.frag?raw';
import finalFrag from './shaders/final.frag?raw';
import fullscreenVert from './shaders/fullscreen.vert?raw';

/** 管线配置（数值默认对齐 TDD §4.4.6 / §15；baseIntervalPx 测试台默认放大以覆盖小场景） */
export interface LabPipelineConfig {
  cascadeCount: number;      // 1..4；0 = RC 关闭回退 base color
  baseRayCount: number;      // 2..8（demo uBaseRayCount）
  baseIntervalPx: number;    // demo uBaseInterval（px）
  propagationRate: number;   // demo uPropagationRate
  mixFactor: number;         // demo uMixFactor
  lightScale: number;        // final.frag uLightScale（加法合成增益）
  ambientIntensity: number;  // rc.frag uAmbientIntensity
  eps: number;               // rc.frag uEps（RGBA8 SDF 命中阈值）
  ditherEnabled: boolean;    // final.frag 4x4 Bayer（测试台默认关，避免单像素量化干扰断言）
  jfaPasses: number;         // -1 = 自动 ceil(log2(min(W,H)))；>=0 手动
  debugDisplay?: number;     // rc.frag 调试直出：-1=uSceneMap -2=uLastPass -3=uDistanceField
}

export const DEFAULT_LAB_CONFIG: LabPipelineConfig = {
  cascadeCount: 3,
  baseRayCount: 4,
  baseIntervalPx: 1.5,       // 480x270 场景下 3 级 cascade 最大可达 ~384px
  propagationRate: 0.85,
  mixFactor: 0.5,
  lightScale: 1.35,
  ambientIntensity: 0.02,    // 每个 cascade pass 都加一次；4 遍累加 ≈ 旧引擎实测 0.08
  eps: 3 / 255,              // > RGBA8 距离场量化步长 1/255
  ditherEnabled: false,
  jfaPasses: -1,
};

/** 场景输入：三张同尺寸 RGBA 纹理（ImageData 行序 = 顶部在 row 0） */
export interface LabSceneInput {
  width: number;
  height: number;
  occlusion: ImageData;   // 白 = 空，黑 = 墙（occluder）
  emission: ImageData;    // 黑 = 无光，光斑 = 发光 seed
  sceneColor: ImageData;  // final 合成的 base 色
}

export interface LabStageTimings {
  prepscene: number;
  jfa: number;
  distfield: number;
  cascade: number;
  final: number;
  total: number;
}

export type LabReadStage = 'seed' | 'sdf' | 'radiance' | 'final';

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
  rc: ShaderProgram;
  final: ShaderProgram;
}

export class RcLabPipeline {
  private gl: WebGL2RenderingContext;
  private programs: ProgramSet;
  private vao: WebGLVertexArrayObject;

  private workW = 1;
  private workH = 1;
  private actualJfaPasses = 0;
  private renderCount = 0;
  private lastGLError = 0;

  private seedTarget: RenderTarget | null = null;     // [1] sceneSeed RGBA8
  private jfaA: RenderTarget | null = null;           // [2][3] RGBA8 ping-pong
  private jfaB: RenderTarget | null = null;
  private jfaOut: RenderTarget | null = null;         // JFA 最后一次写入方（distfield 输入）
  private sdfTarget: RenderTarget | null = null;      // [4] RGBA8
  private cascadeA: RenderTarget | null = null;       // [5] RGBA8 ping-pong
  private cascadeB: RenderTarget | null = null;
  private radianceOut: RenderTarget | null = null;    // cascade 最后一次写入方（final 输入）
  private finalTarget: RenderTarget | null = null;    // [6] RGBA8（读回 + blit 上屏）

  private occlusionTex: WebGLTexture;
  private emissionTex: WebGLTexture;
  private sceneColorTex: WebGLTexture;
  private whiteTex: WebGLTexture;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (gl === null) {
      throw new Error('WebGL2 不可用（需要 Chrome / Edge 108+）');
    }
    if (gl.getExtension('EXT_color_buffer_float') === null) {
      console.warn('[rc-lab] 缺少 EXT_color_buffer_float（RGBA8 管线不受影响，HDR 优化暂不可用）');
    }
    this.gl = gl;
    this.programs = {
      prepscene: this.compile(fullscreenVert, prepsceneFrag, 'prepscene'),
      prepjfa: this.compile(fullscreenVert, prepjfaFrag, 'prepjfa'),
      jfa: this.compile(fullscreenVert, jfaFrag, 'jfa'),
      distfield: this.compile(fullscreenVert, distfieldFrag, 'distfield'),
      rc: this.compile(fullscreenVert, rcFrag, 'rc'),
      final: this.compile(fullscreenVert, finalFrag, 'final'),
    };
    this.vao = this.setupFullscreenQuad();

    this.occlusionTex = this.createUploadTexture();
    this.emissionTex = this.createUploadTexture();
    this.sceneColorTex = this.createUploadTexture();
    this.whiteTex = this.createUploadTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.whiteTex);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA8, 1, 1, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]),
    );
  }

  get state(): { width: number; height: number; jfaPasses: number; renderCount: number } {
    return {
      width: this.workW,
      height: this.workH,
      jfaPasses: this.actualJfaPasses,
      renderCount: this.renderCount,
    };
  }

  /** 最近一次 GL 错误（0 = 无） */
  get glError(): number {
    return this.lastGLError;
  }

  isContextLost(): boolean {
    return this.gl.isContextLost();
  }

  /** rc program 的 uniform location 状态（调试用） */
  debugUniforms(): Array<[string, boolean]> {
    const p = this.programs.rc;
    const out: Array<[string, boolean]> = [];
    for (const [name, loc] of p.uniforms) {
      out.push([name, loc !== null]);
    }
    return out.sort((a, b) => a[0].localeCompare(b[0]));
  }

  /** 跑一帧完整管线，返回各阶段耗时（ms） */
  render(scene: LabSceneInput, config: LabPipelineConfig): LabStageTimings {
    const t0 = performance.now();
    this.resize(scene.width, scene.height);
    this.uploadImage(this.occlusionTex, scene.occlusion);
    this.uploadImage(this.emissionTex, scene.emission);
    this.uploadImage(this.sceneColorTex, scene.sceneColor);

    const tPrepscene = performance.now();
    this.renderPrepscene();
    const tJfa = performance.now();
    this.renderJfa();
    const tDist = performance.now();
    this.renderDistfield();
    const tCascade = performance.now();
    this.renderCascades(config);
    const tFinal = performance.now();
    this.renderFinal(config);
    this.blitToScreen();
    const t1 = performance.now();
    this.renderCount += 1;

    return {
      prepscene: tJfa - tPrepscene,
      jfa: tDist - tJfa,
      distfield: tCascade - tDist,
      cascade: tFinal - tCascade,
      final: t1 - tFinal,
      total: t1 - t0,
    };
  }

  /** 读回某个中间/最终目标的 RGBA8（行序 bottom-up，与 gl_FragCoord 一致） */
  readTarget(stage: LabReadStage): Uint8Array {
    const gl = this.gl;
    const t = this.requireTarget(stage);
    const out = new Uint8Array(t.width * t.height * 4);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, t.framebuffer);
    gl.readPixels(0, 0, t.width, t.height, gl.RGBA, gl.UNSIGNED_BYTE, out);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    return out;
  }

  /** 读回目标为 0..1 浮点（RGBA8 -> 归一化，调试/断言用） */
  readTargetFloat(stage: 'sdf' | 'radiance'): Float32Array {
    const gl = this.gl;
    const t = this.requireTarget(stage);
    const bytes = new Uint8Array(t.width * t.height * 4);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, t.framebuffer);
    gl.readPixels(0, 0, t.width, t.height, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    const out = new Float32Array(bytes.length);
    for (let i = 0; i < bytes.length; i += 1) out[i] = bytes[i] / 255;
    return out;
  }

  // ─── 阶段 ───────────────────────────────────────────────────────────────

  private renderPrepscene(): void {
    const gl = this.gl;
    const p = this.programs.prepscene;
    const target = this.requireTarget('seed');
    this.bindTarget(target);
    gl.useProgram(p.program);
    this.setTex(p, 'uOcclusionMap', 0, this.occlusionTex);
    this.setTex(p, 'uEmissionMap', 1, this.emissionTex);
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

  private renderCascades(config: LabPipelineConfig): void {
    const gl = this.gl;
    const p = this.programs.rc;
    if (config.cascadeCount <= 0) return;

    let lastPass = this.requireTarget('cascadeB').texture; // 首遍（LAST_LEVEL）不读它
    let out = this.requireTarget('cascadeA');
    const aTarget = this.requireTarget('cascadeA');
    const bTarget = this.requireTarget('cascadeB');
    let lastOut: RenderTarget = aTarget;

    // demo 语义：降序 index = cascadeCount -> 0（首遍 = LAST_LEVEL 不合并）
    for (let index = config.cascadeCount; index >= 0; index -= 1) {
      this.bindTarget(out);
      gl.useProgram(p.program);
      this.setTex(p, 'uDistanceField', 0, this.requireTarget('sdf').texture);
      this.setTex(p, 'uSceneMap', 1, this.requireTarget('seed').texture);
      this.setTex(p, 'uDirectLighting', 2, this.requireTarget('seed').texture);
      this.setTex(p, 'uLastPass', 3, lastPass);
      this.setUniform2f(p, 'uResolution', this.workW, this.workH);
      this.setUniform1i(p, 'uBaseRayCount', config.baseRayCount);
      this.setUniform1i(p, 'uCascadeDisplayIndex', config.debugDisplay ?? 0);
      this.setUniform1i(p, 'uCascadeIndex', index);
      this.setUniform1i(p, 'uCascadeAmount', config.cascadeCount);
      this.setUniform1i(p, 'uSrgb', 0); // 全链路线性，final 输出时统一编码
      this.setUniform1f(p, 'uPropagationRate', config.propagationRate);
      this.setUniform1i(p, 'uDisableMerging', 0);
      this.setUniform1f(p, 'uBaseInterval', config.baseIntervalPx);
      this.setUniform1f(p, 'uMixFactor', config.mixFactor);
      this.setUniform1i(p, 'uAmbient', 1);
      this.setUniform3f(p, 'uAmbientColor', 1, 1, 1);
      this.setUniform1f(p, 'uAmbientIntensity', config.ambientIntensity);
      this.setUniform1f(p, 'uEps', config.eps);
      this.drawFullscreen();
      this.checkGlError(`cascade[${index}]`);

      lastPass = out.texture;
      lastOut = out;
      out = out === aTarget ? bTarget : aTarget;
    }
    this.radianceOut = lastOut;
  }

  private renderFinal(config: LabPipelineConfig): void {
    const gl = this.gl;
    const p = this.programs.final;
    const target = this.requireTarget('final');
    this.bindTarget(target);
    gl.useProgram(p.program);

    if (config.cascadeCount <= 0) {
      // RC 关闭回退：base + 白色 radiance * 0 = base
      this.setTex(p, 'uSceneMap', 0, this.sceneColorTex);
      this.setTex(p, 'uRadianceMap', 1, this.whiteTex);
      this.setUniform1i(p, 'uDitherEnabled', 0);
      this.setUniform1f(p, 'uLightScale', 0);
      this.setUniform1f(p, 'uTime', 0);
      this.drawFullscreen();
      this.checkGlError('final-off');
      return;
    }

    this.setTex(p, 'uSceneMap', 0, this.sceneColorTex);
    this.setTex(p, 'uRadianceMap', 1, this.requireTarget('radianceOut').texture);
    this.setUniform1i(p, 'uDitherEnabled', config.ditherEnabled ? 1 : 0);
    this.setUniform1f(p, 'uLightScale', config.lightScale);
    this.setUniform1f(p, 'uTime', 0);
    this.drawFullscreen();
    this.checkGlError('final');
  }

  // ─── 基础设施 ──────────────────────────────────────────────────────────

  private resize(width: number, height: number): void {
    const gl = this.gl;
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    if (w === this.workW && h === this.workH) return;
    this.workW = w;
    this.workH = h;

    this.seedTarget = this.recreateTarget(this.seedTarget, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaA = this.recreateTarget(this.jfaA, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaB = this.recreateTarget(this.jfaB, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.sdfTarget = this.recreateTarget(this.sdfTarget, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.cascadeA = this.recreateTarget(this.cascadeA, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.cascadeB = this.recreateTarget(this.cascadeB, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    this.finalTarget = this.recreateTarget(this.finalTarget, w, h, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
    this.jfaOut = this.jfaA;
    this.radianceOut = this.cascadeA;

    this.actualJfaPasses = this.resolveJfaPasses();
    this.canvas.width = w;
    this.canvas.height = h;
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
      throw new Error(`FBO 不完整: ${status.toString(16)}`);
    }
    return { framebuffer, texture, width: w, height: h };
  }

  private resolveJfaPasses(): number {
    const minSide = Math.min(this.workW, this.workH);
    return Math.max(1, Math.ceil(Math.log2(minSide)));
  }

  private createUploadTexture(): WebGLTexture {
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

  private uploadImage(texture: WebGLTexture, image: ImageData): void {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image.data);
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

  private checkGlError(stage: string): void {
    const gl = this.gl;
    const err = gl.getError();
    if (err !== gl.NO_ERROR) {
      this.lastGLError = err;
      console.warn(`[rc-lab] GL error after ${stage}: 0x${err.toString(16)}`);
    }
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
    stage: LabReadStage | 'jfaA' | 'jfaB' | 'jfaOut' | 'cascadeA' | 'cascadeB' | 'radianceOut' | 'seed' | 'sdf' | 'final',
  ): RenderTarget {
    const t =
      stage === 'seed' ? this.seedTarget :
      stage === 'jfaA' ? this.jfaA :
      stage === 'jfaB' ? this.jfaB :
      stage === 'jfaOut' ? this.jfaOut :
      stage === 'sdf' ? this.sdfTarget :
      stage === 'cascadeA' ? this.cascadeA :
      stage === 'cascadeB' ? this.cascadeB :
      stage === 'radianceOut' ? this.radianceOut :
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
}
