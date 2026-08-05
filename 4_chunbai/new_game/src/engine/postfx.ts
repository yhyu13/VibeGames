import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// 保留常量兼容外部引用（B1 等模块）
export const BLOOM_STRENGTH = 0;
export const BLOOM_RADIUS = 0;
export const BLOOM_THRESHOLD = 1;

// === C3 PostFX：径向色差 + 扫描线 + 颗粒 ===
// 一个 ShaderPass 整合三个效果，避免多 pass 性能损失
const CyberpunkShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uChroma: { value: 0.0 },          // 色差关闭（CP2077 街景感；深空场景不需要）
    uScanline: { value: 0.04 },       // 扫描线（轻微）
    uGrain: { value: 0.035 },         // 颗粒（轻微）
    uVignette: { value: 0.40 },       // 暗角（深空感）
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
    uniform float uTime;
    uniform float uChroma;
    uniform float uScanline;
    uniform float uGrain;
    uniform float uVignette;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      vec2 offset = uv - center;
      float dist = length(offset);
      // 色差：越靠近边缘越强
      float chroma = uChroma * smoothstep(0.0, 0.7, dist);
      vec2 dir = normalize(offset + vec2(1e-5));

      float r = texture2D(tDiffuse, uv + dir * chroma).r;
      float gC = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - dir * chroma).b;
      vec3 col = vec3(r, gC, b);

      // 扫描线：水平细线
      float scan = sin(uv.y * 720.0) * 0.5 + 0.5;
      col *= 1.0 - uScanline * scan;

      // 颗粒：基于时间和屏幕坐标（变量名避开 g 避免遮蔽绿通道）
      float n = hash(uv * 800.0 + uTime * 13.0) - 0.5;
      col += n * uGrain;

      // 暗角
      float vig = 1.0 - dist * uVignette;
      col *= clamp(vig, 0.0, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export class PostFX {
  readonly composer: EffectComposer;
  private readonly cyberpass: ShaderPass;
  private readonly outputPass: OutputPass;
  private clock = 0;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    width: number,
    height: number
  ) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.cyberpass = new ShaderPass(CyberpunkShader);
    this.composer.addPass(this.cyberpass);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
    this.composer.setSize(width, height);
  }

  setSize(width: number, height: number) {
    this.composer.setSize(width, height);
  }

  render(deltaTime?: number) {
    if (deltaTime) this.clock += deltaTime;
    (this.cyberpass.uniforms.uTime as { value: number }).value = this.clock;
    this.composer.render(deltaTime);
  }

  dispose() {
    this.composer.dispose();
    this.outputPass.dispose();
  }
}
