/**
 * engine/raytrace/capability.ts — raytrace 路径能力探测
 *
 * 设计契约(docs/design/2026-08-10-global-voxel-raytrace-water-design.md):
 * - WebGL2 + Data3DTexture 可用 → raytrace 为默认渲染路径。
 * - 能力失败 → 显式回退到 raster PBR 适配器(结果必须可观测)。
 *
 * 探测做法:离屏 canvas 创建 webgl2 上下文,做一次 2×2×2 R8
 * texImage3D + texSubImage3D 冒烟上传,随后主动 loseContext 释放。
 * 不依赖 three.js,可在引擎构造渲染器之前调用。
 */

export type RendererKind = 'raytrace' | 'raster';

export interface CapabilityResult {
  readonly kind: RendererKind;
  /** 回退原因(仅 raster 时有值,用于调试表面展示) */
  readonly reason?: string;
}

let cached: CapabilityResult | null = null;

/** 探测 raytrace 能力;结果缓存(上下文创建开销只付一次) */
export function probeCapabilities(): CapabilityResult {
  if (cached) return cached;
  cached = doProbe();
  if (cached.kind === 'raster') {
    console.warn(`[raytrace] 能力探测失败,回退 raster:${cached.reason ?? 'unknown'}`);
  } else {
    console.info('[raytrace] 能力探测通过:WebGL2 + Data3DTexture 可用');
  }
  return cached;
}

function doProbe(): CapabilityResult {
  const canvas = document.createElement('canvas');
  let gl: WebGL2RenderingContext | null = null;
  try {
    gl = canvas.getContext('webgl2', {
      antialias: false,
      depth: false,
      stencil: false,
      failIfMajorPerformanceCaveat: false,
    }) as WebGL2RenderingContext | null;
  } catch {
    gl = null;
  }
  if (!gl) return { kind: 'raster', reason: 'webgl2-unavailable' };

  try {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_3D, tex);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
    // UNPACK_ALIGNMENT 默认 4:2 字节宽的 R8 行会被填充到 4 字节,
    // 8 字节缓冲在严格实现(SwiftShader)上判 "not big enough" → 显式设为 1
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    const pixels = new Uint8Array(8);
    gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, 2, 2, 2, 0, gl.RED, gl.UNSIGNED_BYTE, pixels);
    gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, 2, 2, 2, gl.RED, gl.UNSIGNED_BYTE, pixels);
    const err = gl.getError();
    gl.deleteTexture(tex);
    gl.bindTexture(gl.TEXTURE_3D, null);
    if (err !== gl.NO_ERROR) return { kind: 'raster', reason: `tex3d-error-${err}` };
  } catch {
    return { kind: 'raster', reason: 'tex3d-exception' };
  } finally {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return { kind: 'raytrace' };
}
