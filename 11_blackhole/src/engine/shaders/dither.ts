/**
 * Final-pass blue-noise dither to kill 8-bit banding/posterization.
 *
 * The raymarcher outputs smooth *linear* HDR color; that flows through the
 * HalfFloat target + UnrealBloomPass + OutputPass (ACES tonemap + sRGB), and is
 * only quantized to 8-bit when the last pass writes the canvas. A smooth, dim
 * glow spans just a few 8-bit levels, so without dithering each level persists
 * for many pixels → visible banding.
 *
 * This pass runs *after* OutputPass and adds triangular (TPDF) dither right
 * before that final quantization. A ±0.5 LSB *uniform* dither has a dead zone:
 * when the value sits exactly on an 8-bit level the whole ±0.5 range rounds
 * back to that level, leaving flat plateaus. Summing two decorrelated
 * interleaved-gradient samples gives a ±1.0 LSB *triangular* distribution with
 * no dead zone — even an exact-integer value spreads over three levels
 * (≈75% center, 12.5% each neighbor) so bands dissolve into fine grain. The
 * same offset is applied to RGB to preserve chromaticity.
 */
import * as THREE from 'three'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

const DitherShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    // Interleaved-gradient (low-discrepancy) noise, 0..1, stable per-pixel.
    float ign(vec2 p) {
      return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
    }

    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      // Two decorrelated IGN samples sum to a ±1.0 LSB triangular (TPDF) dither.
      float d = (ign(gl_FragCoord.xy) + ign(gl_FragCoord.xy + 31.416) - 1.0) / 255.0;
      gl_FragColor = vec4(c.rgb + d, c.a);
    }
  `,
}

export function createDitherPass(): ShaderPass {
  return new ShaderPass(DitherShader)
}
