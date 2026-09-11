// src/backend/RcWebglBackend.ts —— WebGL-first RC pipeline (three.js RawShaderMaterial port).
//
// This is a faithful, low-risk port of rc-lab's raw-WebGL2 `RcLabPipeline`:
// the shaders are byte-identical to rc-lab/shaders/* (copied verbatim into
// src/shaders/) and the pass sequence / uniforms / ping-pong / atlas sizes are
// untouched. Only the plumbing is replaced: three.js owns the GL context, the
// render targets (WebGLRenderTarget), and the fullscreen draw (one BufferGeometry
// + one RawShaderMaterial per pass). It exposes RcBackend so verify.ts consumes it
// unchapped, and a future WebGPU/TSL backend can substitute.
//
// Render-target sizes mirror rc-lab exactly:
//   seed / jfaA / jfaB / sdf / final  = W x H
//   cascadeA / cascadeB / interval / direct = W x atlasH, atlasH = ceil(h/2^(cc+2))*2^(cc+2)

import * as THREE from 'three';
import fullscreenVert from '../shaders/fullscreen.vert?raw';
import prepsceneFrag from '../shaders/prepscene.frag?raw';
import prepjfaFrag from '../shaders/prepjfa.frag?raw';
import jfaFrag from '../shaders/jfa.frag?raw';
import distfieldFrag from '../shaders/distfield.frag?raw';
import rcIntervalFrag from '../shaders/rc_interval.frag?raw';
import rcMergeFrag from '../shaders/rc_merge.frag?raw';
import finalFrag from '../shaders/final.frag?raw';
import passthroughFrag from '../shaders/passthrough.frag?raw';

import type {
  LabPipelineConfig,
  LabReadStage,
  LabSceneInput,
  LabStageTimings,
} from '../types';
import { DEFAULT_LAB_CONFIG } from '../types';
import type { BackendState, RcBackend, StageProps } from './RcBackend';

type StageKey =
  | 'seed'
  | 'sdf'
  | 'radiance'
  | 'jfaA'
  | 'jfaB'
  | 'jfaOut'
  | 'cascadeA'
  | 'cascadeB'
  | 'interval'
  | 'radianceOut'
  | 'directTarget'
  | 'final';

export class RcWebglBackend implements RcBackend {
  private renderer!: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private mesh!: THREE.Mesh;
  private geometry!: THREE.BufferGeometry;

  private matPrepscene!: THREE.RawShaderMaterial;
  private matPrepjfa!: THREE.RawShaderMaterial;
  private matJfa!: THREE.RawShaderMaterial;
  private matDistfield!: THREE.RawShaderMaterial;
  private matRcInterval!: THREE.RawShaderMaterial;
  private matRcMerge!: THREE.RawShaderMaterial;
  private matFinal!: THREE.RawShaderMaterial;
  private matPassthrough!: THREE.RawShaderMaterial;

  private workW = 1;
  private workH = 1;
  private atlasW = 1;
  private atlasH = 1;
  private currentCascadeCount = 3;
  private lastConfig: LabPipelineConfig = DEFAULT_LAB_CONFIG;
  private actualJfaPasses = 0;
  private renderCount = 0;
  private lastGLError = 0;

  private targetSeed: THREE.WebGLRenderTarget | null = null;
  private targetJfaA: THREE.WebGLRenderTarget | null = null;
  private targetJfaB: THREE.WebGLRenderTarget | null = null;
  private targetSdf: THREE.WebGLRenderTarget | null = null;
  private jfaOut: THREE.WebGLRenderTarget | null = null;
  private targetCascadeA: THREE.WebGLRenderTarget | null = null;
  private targetCascadeB: THREE.WebGLRenderTarget | null = null;
  private targetInterval: THREE.WebGLRenderTarget | null = null;
  private targetDirect: THREE.WebGLRenderTarget | null = null;
  private radianceOut: THREE.WebGLRenderTarget | null = null;
  private targetFinal: THREE.WebGLRenderTarget | null = null;

  private texOcclusion!: THREE.DataTexture;
  private texEmission!: THREE.DataTexture;
  private texSceneColor!: THREE.DataTexture;
  private texWhite!: THREE.DataTexture;
  private glCanvas!: HTMLCanvasElement;

  /** Low-level GL helper: the three.js context is always WebGL2 in this project. */
  private get gl(): WebGL2RenderingContext {
    return this.renderer.getContext() as WebGL2RenderingContext;
  }

  private readonly THREE_RT_OPTS: Partial<THREE.RenderTargetOptions> = {
    type: THREE.UnsignedByteType,
    format: THREE.RGBAFormat,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  };

  init(canvas: HTMLCanvasElement): void {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (renderer.getContext() === null) {
      throw new Error('WebGL2 unavailable (needs Chrome / Edge 108+)');
    }
    renderer.setPixelRatio(1);
    renderer.autoClear = false;
    renderer.autoClearColor = false;
    renderer.autoClearDepth = false;
    renderer.autoClearStencil = false;
    this.renderer = renderer;
    this.glCanvas = canvas;

    this.buildGeometry();
    this.buildMaterials();
    this.buildInputTextures();

    this.mesh = new THREE.Mesh(this.geometry, this.matPrepscene);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  get state(): BackendState {
    return {
      width: this.workW,
      height: this.workH,
      jfaPasses: this.actualJfaPasses,
      renderCount: this.renderCount,
    };
  }

  glError(): number {
    return this.lastGLError;
  }

  isContextLost(): boolean {
    return this.gl.isContextLost();
  }

  debugShowStage(stage: LabReadStage, boost = 1): void {
    const target = this.requireTarget(stage);
    this.draw(this.matPassthrough, null, (m) => {
      m.uniforms.uTex.value = target.texture;
      m.uniforms.uBoost.value = boost;
    });
  }

  stageProps(stage: LabReadStage): StageProps {
    const t = this.requireTarget(stage);
    return { width: t.width, height: t.height };
  }

  debugMarkRadiance(): [number, number] {
    const t = this.requireTarget('radianceOut');
    const gl = this.gl;
    // Clear the radiance atlas to a known color directly through the GL context.
    this.renderer.setRenderTarget(t);
    gl.clearColor(0.5, 0.25, 0.125, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.finish();
    this.renderer.setRenderTarget(null);
    return [t.width, t.height];
  }

  debugRenderCascade(stopIndex: number): { width: number; height: number } {
    const a = this.requireTarget('cascadeA');
    const b = this.requireTarget('cascadeB');
    this.renderPrepscene();
    this.renderJfa();
    this.renderDistfield();
    const clamped = Math.max(0, Math.min(this.currentCascadeCount, stopIndex));
    this.radianceOut = this.renderCascadeLoop(
      this.lastConfig,
      this.requireTarget('seed').texture,
      0,
      false,
      a,
      b,
      clamped,
    );
    return { width: this.workW, height: this.workH };
  }

  readJfa(stage: 'jfaA' | 'jfaB' | 'jfaOut', x: number, y: number): [number, number, number, number] {
    return this.readPixel(stage as LabReadStage, x, y);
  }

  debugReadFbStatus(): { boundOk: boolean; statusHex: string; isCascadeA: boolean; isCascadeB: boolean } {
    const t = this.requireTarget('radianceOut');
    const gl = this.gl;
    this.renderer.setRenderTarget(t);
    const bound = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    this.renderer.setRenderTarget(null);
    const fb = this.fbOf(t);
    return {
      boundOk: bound === fb,
      statusHex: status.toString(16),
      isCascadeA: this.targetCascadeA !== null && this.fbOf(this.targetCascadeA) === fb,
      isCascadeB: this.targetCascadeB !== null && this.fbOf(this.targetCascadeB) === fb,
    };
  }

  debugProbeReadback(): { readOk: boolean; drawBindingOk: boolean; bytes: number[] } {
    const t = this.requireTarget('radianceOut');
    const gl = this.gl;
    this.renderer.setRenderTarget(null);
    gl.viewport(0, 0, this.glCanvas.width, this.glCanvas.height);
    gl.clearColor(0.9, 0.1, 0.9, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.finish();
    this.renderer.setRenderTarget(t);
    const readBinding = gl.getParameter(gl.READ_FRAMEBUFFER_BINDING);
    const drawBinding = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
    const bytes = new Uint8Array(4);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
    this.renderer.setRenderTarget(null);
    return {
      readOk: readBinding === this.fbOf(t),
      drawBindingOk: drawBinding === null,
      bytes: Array.from(bytes),
    };
  }

  debugReadSizes(): Array<[number, number, number]> {
    const t = this.requireTarget('radianceOut');
    this.debugMarkRadiance();
    const out: Array<[number, number, number]> = [];
    const gl = this.gl;
    for (const size of [1, 2, 4, 8, 16, 32, 64, 128, 256, 480]) {
      this.renderer.setRenderTarget(t);
      gl.finish();
      const bytes = new Uint8Array(size * size * 4);
      gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
      this.renderer.setRenderTarget(null);
      out.push([size, bytes[0], bytes[1]]);
    }
    for (const capacity of [480 * 216 * 4, 480 * 480 * 4]) {
      this.renderer.setRenderTarget(t);
      gl.finish();
      const bytes = new Uint8Array(capacity);
      gl.readPixels(0, 0, 480, 216, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
      this.renderer.setRenderTarget(null);
      out.push([-480, bytes[0], bytes[1]]);
    }
    return out;
  }

  render(scene: LabSceneInput, config: LabPipelineConfig): LabStageTimings {
    const t0 = performance.now();
    this.currentCascadeCount = Math.max(0, Math.min(4, Math.floor(config.cascadeCount)));
    this.lastConfig = { ...config };
    this.resize(scene.width, scene.height);
    this.uploadImage(this.texOcclusion, scene.occlusion);
    this.uploadImage(this.texEmission, scene.emission);
    this.uploadImage(this.texSceneColor, scene.sceneColor);

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

  readPixel(stage: LabReadStage, x: number, y: number): [number, number, number, number] {
    const t = this.requireTarget(stage);
    const gx = Math.max(0, Math.min(t.width - 1, Math.round(x)));
    const displayH = stage === 'radiance' ? this.workH : t.height;
    const gy = Math.max(0, Math.min(t.height - 1, displayH - 1 - Math.round(y)));
    const out = new Uint8Array(4);
    this.renderer.readRenderTargetPixels(t, gx, gy, 1, 1, out);
    return [out[0], out[1], out[2], out[3]];
  }

  dispose(): void {
    this.renderer.dispose();
    for (const t of this.allTargets()) {
      if (t !== null) t.dispose();
    }
    this.geometry.dispose();
    for (const m of this.allMaterials()) m.dispose();
    for (const tex of [this.texOcclusion, this.texEmission, this.texSceneColor, this.texWhite]) {
      tex.dispose();
    }
  }

  // ─── stages (mirror rc-lab exactly) ─────────────────────────────────────

  private renderPrepscene(): void {
    const m = this.matPrepscene;
    const target = this.requireTarget('seed');
    this.draw(m, target, (mat) => {
      mat.uniforms.uOcclusionMap.value = this.texOcclusion;
      mat.uniforms.uEmissionMap.value = this.texEmission;
      (mat.uniforms.uMousePos.value as THREE.Vector2).set(0, 0);
      mat.uniforms.uBrushSize.value = 1;
      (mat.uniforms.uBrushColor.value as THREE.Vector4).set(1, 1, 1, 1);
      mat.uniforms.uMouseLight.value = 0;
    });
    this.checkGlError('prepscene');
  }

  private renderJfa(): void {
    const m = this.matPrepjfa;
    const jfaA = this.requireTarget('jfaA');
    this.draw(m, jfaA, (mat) => {
      mat.uniforms.uSceneMap.value = this.requireTarget('seed').texture;
    });
    this.checkGlError('prepjfa');

    let read = jfaA;
    let write = this.requireTarget('jfaB');
    const jp = this.matJfa;
    for (let i = 0; i < this.actualJfaPasses; i += 1) {
      const jump = 1 << Math.max(0, this.actualJfaPasses - 1 - i);
      const writeTarget = write;
      this.draw(jp, writeTarget, (mat) => {
        mat.uniforms.uCanvas.value = read.texture;
        mat.uniforms.uJumpSize.value = jump;
      });
      this.checkGlError(`jfa[${i}]`);
      const tmp = read;
      read = write;
      write = tmp;
    }
    this.jfaOut = read;
  }

  private renderDistfield(): void {
    const m = this.matDistfield;
    const target = this.requireTarget('sdf');
    this.draw(m, target, (mat) => {
      mat.uniforms.uJFA.value = this.requireTarget('jfaOut').texture;
    });
    this.checkGlError('distfield');
  }

  private renderCascades(config: LabPipelineConfig): void {
    if (this.currentCascadeCount <= 0) return;
    const a = this.requireTarget('cascadeA');
    const b = this.requireTarget('cascadeB');

    const directOut = this.renderCascadeLoop(
      config,
      this.requireTarget('seed').texture,
      0,
      false,
      a,
      b,
    );

    if (config.twoLoop) {
      this.copyTextureToTarget(directOut.texture, this.requireTarget('directTarget'));
      this.radianceOut = this.renderCascadeLoop(
        config,
        this.requireTarget('directTarget').texture,
        config.mixFactor,
        true,
        a,
        b,
      );
    } else {
      this.radianceOut = directOut;
    }
  }

  private renderCascadeLoop(
    config: LabPipelineConfig,
    directLightingTex: THREE.Texture,
    mixFactor: number,
    ambient: boolean,
    aTarget: THREE.WebGLRenderTarget,
    bTarget: THREE.WebGLRenderTarget,
    stopIndex = 0,
  ): THREE.WebGLRenderTarget {
    const intervalBuf = this.requireTarget('interval');
    let mergedOut: THREE.WebGLRenderTarget | null = null;
    let out = aTarget;

    for (let index = this.currentCascadeCount; index >= stopIndex; index -= 1) {
      if (index === this.currentCascadeCount) {
        this.renderInterval(index, out, directLightingTex, mixFactor, ambient, config);
        mergedOut = out;
        out = out === aTarget ? bTarget : aTarget;
      } else {
        this.renderInterval(index, intervalBuf, directLightingTex, mixFactor, false, config);
        this.renderMerge(index, intervalBuf, mergedOut as THREE.WebGLRenderTarget, out, ambient, config);
        mergedOut = out;
        out = out === aTarget ? bTarget : aTarget;
      }
    }
    return mergedOut as THREE.WebGLRenderTarget;
  }

  private renderInterval(
    index: number,
    target: THREE.WebGLRenderTarget,
    directLightingTex: THREE.Texture,
    mixFactor: number,
    ambient: boolean,
    config: LabPipelineConfig,
  ): void {
    const m = this.matRcInterval;
    this.draw(m, target, (mat) => {
      mat.uniforms.uDistanceField.value = this.requireTarget('sdf').texture;
      mat.uniforms.uSceneMap.value = this.requireTarget('seed').texture;
      mat.uniforms.uDirectLighting.value = directLightingTex;
      (mat.uniforms.uResolution.value as THREE.Vector2).set(this.atlasW, this.atlasH);
      (mat.uniforms.uScreenSize.value as THREE.Vector2).set(this.workW, this.workH);
      mat.uniforms.uMinSide.value = Math.min(this.workW, this.workH);
      mat.uniforms.uCascadeIndex.value = index;
      mat.uniforms.uCascadeCount.value = this.currentCascadeCount;
      mat.uniforms.uBaseIntervalPx.value = config.baseIntervalPx;
      mat.uniforms.uMixFactor.value = mixFactor;
      mat.uniforms.uPropagationRate.value = config.propagationRate;
      mat.uniforms.uEps.value = config.eps;
      mat.uniforms.uAmbient.value = ambient ? 1 : 0;
      (mat.uniforms.uAmbientColor.value as THREE.Vector3).set(1, 1, 1);
      mat.uniforms.uAmbientIntensity.value = ambient ? config.ambientIntensity : 0;
    });
    this.checkGlError(`rcInterval[${index}]`);
  }

  private renderMerge(
    index: number,
    intervalBuf: THREE.WebGLRenderTarget,
    upperMerged: THREE.WebGLRenderTarget,
    target: THREE.WebGLRenderTarget,
    ambient: boolean,
    config: LabPipelineConfig,
  ): void {
    const m = this.matRcMerge;
    this.draw(m, target, (mat) => {
      mat.uniforms.uInterval.value = intervalBuf.texture;
      mat.uniforms.uLastPass.value = upperMerged.texture;
      (mat.uniforms.uResolution.value as THREE.Vector2).set(this.atlasW, this.atlasH);
      mat.uniforms.uCascadeIndex.value = index;
      mat.uniforms.uCascadeCount.value = this.currentCascadeCount;
      mat.uniforms.uDisableMerging.value = 0;
      mat.uniforms.uAmbient.value = ambient ? 1 : 0;
      (mat.uniforms.uAmbientColor.value as THREE.Vector3).set(1, 1, 1);
      mat.uniforms.uAmbientIntensity.value = ambient ? config.ambientIntensity : 0;
    });
    this.checkGlError(`rcMerge[${index}]`);
  }

  private copyTextureToTarget(source: THREE.Texture, target: THREE.WebGLRenderTarget): void {
    const m = this.matPassthrough;
    this.draw(m, target, (mat) => {
      mat.uniforms.uTex.value = source;
      mat.uniforms.uBoost.value = 1;
    });
    this.checkGlError('copyDirect');
  }

  private renderFinal(config: LabPipelineConfig): void {
    const m = this.matFinal;
    const target = this.requireTarget('final');
    this.draw(m, target, (mat) => {
      if (config.cascadeCount <= 0) {
        mat.uniforms.uSceneMap.value = this.texSceneColor;
        mat.uniforms.uRadianceMap.value = this.texWhite;
        mat.uniforms.uEmissionMap.value = this.texEmission;
        (mat.uniforms.uRadianceAtlasSize.value as THREE.Vector2).set(0, 0);
        (mat.uniforms.uRadianceScreenSize.value as THREE.Vector2).set(0, 0);
        mat.uniforms.uDitherEnabled.value = 0;
        mat.uniforms.uLightScale.value = 0;
        mat.uniforms.uTime.value = 0;
      } else {
        mat.uniforms.uSceneMap.value = this.texSceneColor;
        mat.uniforms.uRadianceMap.value = this.requireTarget('radianceOut').texture;
        mat.uniforms.uEmissionMap.value = this.texEmission;
        (mat.uniforms.uRadianceAtlasSize.value as THREE.Vector2).set(this.atlasW, this.atlasH);
        (mat.uniforms.uRadianceScreenSize.value as THREE.Vector2).set(this.workW, this.workH);
        mat.uniforms.uDitherEnabled.value = config.ditherEnabled ? 1 : 0;
        mat.uniforms.uLightScale.value = config.lightScale;
        mat.uniforms.uTime.value = 0;
      }
    });
    this.checkGlError('final');
  }

  private blitToScreen(): void {
    const out = this.requireTarget('final');
    this.draw(this.matPassthrough, null, (mat) => {
      mat.uniforms.uTex.value = out.texture;
      mat.uniforms.uBoost.value = 1;
    });
  }

  // ─── infrastructure ─────────────────────────────────────────────────────

  private draw(
    mat: THREE.RawShaderMaterial,
    target: THREE.WebGLRenderTarget | null,
    bind?: (m: THREE.RawShaderMaterial) => void,
  ): void {
    if (bind) bind(mat);
    this.mesh.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.scene, this.camera);
  }

  private resize(width: number, height: number): void {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    const blockMax = Math.pow(2, this.currentCascadeCount + 2);
    const atlasH = Math.ceil(h / blockMax) * blockMax;
    if (w === this.workW && h === this.workH && atlasH === this.atlasH) return;
    this.workW = w;
    this.workH = h;
    this.atlasW = w;
    this.atlasH = atlasH;

    this.targetSeed = this.recreateTarget(this.targetSeed, w, h, THREE.NearestFilter);
    this.targetJfaA = this.recreateTarget(this.targetJfaA, w, h, THREE.NearestFilter);
    this.targetJfaB = this.recreateTarget(this.targetJfaB, w, h, THREE.NearestFilter);
    this.targetSdf = this.recreateTarget(this.targetSdf, w, h, THREE.LinearFilter);
    this.targetCascadeA = this.recreateTarget(this.targetCascadeA, w, atlasH, THREE.LinearFilter);
    this.targetCascadeB = this.recreateTarget(this.targetCascadeB, w, atlasH, THREE.LinearFilter);
    this.targetInterval = this.recreateTarget(this.targetInterval, w, atlasH, THREE.LinearFilter);
    this.targetDirect = this.recreateTarget(this.targetDirect, w, atlasH, THREE.LinearFilter);
    this.targetFinal = this.recreateTarget(this.targetFinal, w, h, THREE.NearestFilter);
    this.jfaOut = this.targetJfaA;
    this.radianceOut = this.targetCascadeA;

    this.actualJfaPasses = this.resolveJfaPasses();
    this.renderer.setSize(w, h, false);
  }

  private recreateTarget(
    target: THREE.WebGLRenderTarget | null,
    w: number,
    h: number,
    filter: THREE.MinificationTextureFilter | THREE.MagnificationTextureFilter,
  ): THREE.WebGLRenderTarget {
    if (target !== null) {
      target.dispose();
    }
    const rt = new THREE.WebGLRenderTarget(w, h, {
      ...this.THREE_RT_OPTS,
      minFilter: filter as THREE.MinificationTextureFilter,
      magFilter: filter as THREE.MagnificationTextureFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });
    return rt;
  }

  private resolveJfaPasses(): number {
    const minSide = Math.min(this.workW, this.workH);
    return Math.max(1, Math.ceil(Math.log2(minSide)));
  }

  private buildGeometry(): void {
    const geo = new THREE.BufferGeometry();
    // aPosition = the vert's own attribute (`layout(location=0) in vec2 aPosition`).
    // The dummy `position` attribute (itemSize 3, z=0) satisfies three's bounding-sphere
    // code so it doesn't log a NaN radius (a vec2 position attribute would read a NaN z).
    geo.setAttribute('aPosition', new THREE.BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    this.geometry = geo;
    // No need to cull — we always draw the full triangle.
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 4);
  }

  private buildMaterials(): void {
    // three.js always prepends `#define SHADER_TYPE/#define SHADER_NAME` to a
    // RawShaderMaterial's source, which must come AFTER `#version`. GLSL requires
    // `#version` to be the very first line, so we let three inject it (glslVersion
    // GLSL3) and strip the source's own `#version 300 es` line. The on-disk shader
    // files stay byte-identical to rc-lab; the math body is untouched.
    const glsl = (src: string): string => src.replace(/^#version\s+300\s+es\s*\n/, '');
    const mk = (vert: string, frag: string, uniforms: Record<string, { value: unknown }>) =>
      new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: glsl(vert),
        fragmentShader: glsl(frag),
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

    this.matPrepscene = mk(fullscreenVert, prepsceneFrag, {
      uOcclusionMap: { value: null },
      uEmissionMap: { value: null },
      uMousePos: { value: new THREE.Vector2(0, 0) },
      uBrushSize: { value: 1 },
      uBrushColor: { value: new THREE.Vector4(1, 1, 1, 1) },
      uMouseLight: { value: 0 },
    });
    this.matPrepjfa = mk(fullscreenVert, prepjfaFrag, {
      uSceneMap: { value: null },
    });
    this.matJfa = mk(fullscreenVert, jfaFrag, {
      uCanvas: { value: null },
      uJumpSize: { value: 1 },
    });
    this.matDistfield = mk(fullscreenVert, distfieldFrag, {
      uJFA: { value: null },
    });
    this.matRcInterval = mk(fullscreenVert, rcIntervalFrag, {
      uDistanceField: { value: null },
      uSceneMap: { value: null },
      uDirectLighting: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uScreenSize: { value: new THREE.Vector2(1, 1) },
      uMinSide: { value: 1 },
      uCascadeIndex: { value: 0 },
      uCascadeCount: { value: 3 },
      uBaseIntervalPx: { value: 1.5 },
      uMixFactor: { value: 0 },
      uPropagationRate: { value: 0.85 },
      uEps: { value: 3 / 255 },
      uAmbient: { value: 0 },
      uAmbientColor: { value: new THREE.Vector3(1, 1, 1) },
      uAmbientIntensity: { value: 0 },
    });
    this.matRcMerge = mk(fullscreenVert, rcMergeFrag, {
      uInterval: { value: null },
      uLastPass: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uCascadeIndex: { value: 0 },
      uCascadeCount: { value: 3 },
      uDisableMerging: { value: 0 },
      uAmbient: { value: 0 },
      uAmbientColor: { value: new THREE.Vector3(1, 1, 1) },
      uAmbientIntensity: { value: 0 },
    });
    this.matFinal = mk(fullscreenVert, finalFrag, {
      uSceneMap: { value: null },
      uRadianceMap: { value: null },
      uEmissionMap: { value: null },
      uRadianceAtlasSize: { value: new THREE.Vector2(0, 0) },
      uRadianceScreenSize: { value: new THREE.Vector2(0, 0) },
      uDitherEnabled: { value: 0 },
      uLightScale: { value: 1.35 },
      uTime: { value: 0 },
    });
    this.matPassthrough = mk(fullscreenVert, passthroughFrag, {
      uTex: { value: null },
      uBoost: { value: 1 },
    });
  }

  private buildInputTextures(): void {
    this.texOcclusion = this.createUploadTexture();
    this.texEmission = this.createUploadTexture();
    this.texSceneColor = this.createUploadTexture();
    this.texWhite = this.createUploadTexture();
    this.texWhite.image.data = new Uint8Array([255, 255, 255, 255]);
    this.texWhite.image.width = 1;
    this.texWhite.image.height = 1;
    this.texWhite.needsUpdate = true;
  }

  private createUploadTexture(): THREE.DataTexture {
    const tex = new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.flipY = true; // mirror rc-lab's UNPACK_FLIP_Y_WEBGL=1
    tex.generateMipmaps = false;
    return tex;
  }

  private uploadImage(texture: THREE.DataTexture, image: ImageData): void {
    texture.image = { data: image.data, width: image.width, height: image.height };
    texture.flipY = true;
    texture.needsUpdate = true;
  }

  private checkGlError(stage: string): void {
    const gl = this.gl;
    const err = gl.getError();
    if (err !== gl.NO_ERROR) {
      this.lastGLError = err;
      // eslint-disable-next-line no-console
      console.warn(`[rc-demo] GL error after ${stage}: 0x${err.toString(16)}`);
    }
  }

  private requireTarget(stage: StageKey): THREE.WebGLRenderTarget {
    const t =
      stage === 'seed' ? this.targetSeed :
      stage === 'jfaA' ? this.targetJfaA :
      stage === 'jfaB' ? this.targetJfaB :
      stage === 'jfaOut' ? this.jfaOut :
      stage === 'sdf' ? this.targetSdf :
      stage === 'cascadeA' ? this.targetCascadeA :
      stage === 'cascadeB' ? this.targetCascadeB :
      stage === 'interval' ? this.targetInterval :
      stage === 'radiance' ? this.radianceOut :
      stage === 'radianceOut' ? this.radianceOut :
      stage === 'directTarget' ? this.targetDirect :
      this.targetFinal;
    if (t === null) throw new Error(`render target not created: ${stage}`);
    return t;
  }

  private allTargets(): Array<THREE.WebGLRenderTarget | null> {
    return [
      this.targetSeed,
      this.targetJfaA,
      this.targetJfaB,
      this.targetSdf,
      this.targetCascadeA,
      this.targetCascadeB,
      this.targetInterval,
      this.targetDirect,
      this.targetFinal,
    ];
  }

  /** Access the three.js-internal framebuffer handle for a render target (typed erasure). */
  private fbOf(t: THREE.WebGLRenderTarget): WebGLFramebuffer | null {
    return (t as unknown as { __webglFramebuffer?: WebGLFramebuffer | null }).__webglFramebuffer ?? null;
  }

  private allMaterials(): THREE.RawShaderMaterial[] {
    return [
      this.matPrepscene,
      this.matPrepjfa,
      this.matJfa,
      this.matDistfield,
      this.matRcInterval,
      this.matRcMerge,
      this.matFinal,
      this.matPassthrough,
    ];
  }
}
