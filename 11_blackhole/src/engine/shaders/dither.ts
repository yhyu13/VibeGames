/**
 * Final-pass blue-noise dither to kill 8-bit banding/posterization.
 *
 * The raymarcher outputs smooth *linear* HDR color; that flows through the
 * HalfFloat target + UnrealBloomPass + OutputPass (ACES tonemap + sRGB), and is
 * only quantized to 8-bit when the last pass writes the canvas. A smooth, dim
 * glow spans just a few 8-bit levels, so without dithering each level persists
 * for many pixels → visible banding. This pass runs *after* OutputPass and adds
 * ±0.5 LSB of interleaved-gradient (blue-noise) dither right before that final
 * quantization, breaking the bands into imperceptible grain.
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

    // Interleaved-gradient noise (blue-noise dither, 0..1), stable per-pixel.
    float ign(vec2 p) {
      return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
    }

    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      // ±0.5 LSB of the 8-bit output; same offset for RGB to preserve chromaticity.
      float d = (ign(gl_FragCoord.xy) - 0.5) / 255.0;
      gl_FragColor = vec4(c.rgb + d, c.a);
    }
  `,
}

export function createDitherPass(): ShaderPass {
  return new ShaderPass(DitherShader)
}
