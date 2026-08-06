// engine/SceneManager.ts — 程序化王座厅 / 烛火 / 固定相机 / Boss 网格 + 顶点动画 / mesh 调和 / FX
// 实现依据：docs/design/03-art-direction.md §2–§8；世界锚点（王座/柱子/烛光）取自 core/world/world.ts。
// 事件契约：EventConsumer（TDD §5.3）——bossAnim → 动画；phase → 灯光；fx/explosion → 特效；music/sound 忽略。

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { WORLD } from '../core/world/world';
import { MAX_PARTICLES } from '../core/constants';
import { clamp, easeInCubic, easeInOutCubic, easeOutBack, easeOutCubic, lerp, mulberry32, pick } from '../core/math';
import type { EaseFn } from '../core/math';
import type { AnxietyBand, BossAnimKind, FxKind, GamePhase, Vector3 } from '../core/types';
import type { SimState } from '../core/simulation/Simulation';
import type { EventConsumer, SimEvent } from '../core/simulation/events';
import { PlayerShadow, type ShadowMode } from './PlayerShadow';
import { PostFX } from './postfx';
import { TweenManager, Timeline } from './Tween';

// ============ 03 §3.1 调色板 ============
const C = {
  night: '#0B1026', stone: '#1A2138', brightStone: '#232B4A', deepBlue: '#0A0E22',
  flame: '#FF9E4F', flameCore: '#FFB066', deepFlame: '#FF7A2F',
  blood: '#FF2E3F', bloodDark: '#8B0000', bloodOrange: '#FF5A3C',
  gold: '#C9A227', goldBright: '#E8C66A',
  steelDark: '#2E3954', steelBright: '#4A5878', glass: '#9FD8FF',
  skin: '#8A6E5E', bookA: '#4A3326', bookB: '#5C4433', bookC: '#3A2A1E',
} as const;

// ============ 03 §2 场景常量（坐标已按 WORLD 锚点重定位） ============
const ROOM = { halfX: 12, halfZ: 9, top: 10 } as const;
const THRONE_YAW = Math.PI / 2; // 王座/Boss 面向 +x（挑战者来向）
const DAIS_CENTER = { x: WORLD.thronePos.x, z: WORLD.thronePos.z };
const CAM_BASE = new THREE.Vector3(9.5, 6.5, 8.5);
const CAM_LOOK = new THREE.Vector3(-1, 1.8, -6.5);
const PLAYER_STAND = { x: 1.5, z: -1 }; // 03 §8.1 预警环站位

// ============ 程序化纹理（启动时同步生成一次） ============
function makeFloorTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0A0E22';
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.strokeStyle = '#101A3A';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 1024; i += 64) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
  }
  const rng = mulberry32(7);
  for (let i = 0; i < 5000; i++) {
    const v = 0.05 * (rng() - 0.5);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, v)})`;
    ctx.fillRect(rng() * 1024, rng() * 1024, 1, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeRugTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const ctx = c.getContext('2d')!;
  const rings = ['#6E1E2E', '#8A2A3A', '#5A1626', '#8A2A3A', '#6E1E2E'];
  for (let i = 0; i < rings.length; i++) {
    ctx.beginPath();
    ctx.arc(512, 512, 500 - i * 90, 0, Math.PI * 2);
    ctx.fillStyle = rings[i];
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(512, 512, 120, 0, Math.PI * 2);
  ctx.fillStyle = '#C9A227';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(512, 512, 96, 0, Math.PI * 2);
  ctx.fillStyle = '#5A1626';
  ctx.fill();
  const grad = ctx.createRadialGradient(512, 512, 420, 512, 512, 512);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const NAME_POOL = ['无名骑士', '阿汤', '卷毛', 'Tian', 'Luna', 'Pro-2049', '小哑', 'HAT'] as const;

function makeScratchTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#49597A';
  ctx.fillRect(0, 0, 256, 256);
  const rng = mulberry32(42);
  for (let i = 0; i < 16; i++) {
    ctx.save();
    ctx.translate(rng() * 256, rng() * 256);
    ctx.rotate(rng() * Math.PI);
    ctx.strokeStyle = `rgba(26,33,56,${0.5 + rng() * 0.4})`;
    ctx.lineWidth = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.moveTo(-30 - rng() * 30, 0);
    ctx.lineTo(30 + rng() * 30, 0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.font = 'bold 22px "Microsoft YaHei", sans-serif';
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.translate(30 + rng() * 196, 26 + rng() * 204);
    ctx.rotate((rng() - 0.5) * 0.28);
    ctx.fillStyle = 'rgba(199,211,232,0.8)';
    ctx.fillText(pick(rng, NAME_POOL), 0, 0);
    ctx.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeFlameTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(255,255,255,0.95)');
  grad.addColorStop(0.35, 'rgba(255,217,160,0.8)');
  grad.addColorStop(0.7, 'rgba(255,158,79,0.4)');
  grad.addColorStop(1, 'rgba(255,122,47,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeWindowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0A0E22');
  grad.addColorStop(0.45, '#1A2A52');
  grad.addColorStop(1, '#5A7BB0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = 'rgba(10,14,34,0.9)';
  ctx.lineWidth = 6;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(i * 128, 0); ctx.lineTo(i * 128, 512); ctx.stroke();
  }
  for (let j = 0; j <= 3; j++) {
    ctx.beginPath(); ctx.moveTo(0, j * 128); ctx.lineTo(512, j * 128); ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(256, 384, 244, Math.PI, 0);
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeLaneTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ============ 几何合并工具（减 draw call） ============
interface PartSpec {
  geo: THREE.BufferGeometry;
  pos: Vector3;
  rot?: Vector3;
  scale?: Vector3;
}

function placed(geo: THREE.BufferGeometry, pos: Vector3, rot?: Vector3, scale?: Vector3): THREE.BufferGeometry {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(pos.x, pos.y, pos.z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rot?.x ?? 0, rot?.y ?? 0, rot?.z ?? 0)),
    new THREE.Vector3(scale?.x ?? 1, scale?.y ?? 1, scale?.z ?? 1),
  );
  return geo.clone().applyMatrix4(m);
}

function mergeParts(parts: PartSpec[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts.map((p) => placed(p.geo, p.pos, p.rot, p.scale)), false);
  return merged ?? parts[0].geo.clone();
}

// ============ 粒子池（MAX_PARTICLES=128 硬上限，Points 实例化） ============
const PARTICLE_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(aSize * uPixelRatio * (180.0 / -mv.z), 0.5, 64.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const PARTICLE_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.1, d) * vAlpha;
    if (a <= 0.002) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

class ParticlePool {
  private readonly capacity = MAX_PARTICLES;
  private readonly dustCount = 40; // 前 40 粒为常驻环境尘埃
  private positions = new Float32Array(this.capacity * 3);
  private velocities = new Float32Array(this.capacity * 3);
  private colors = new Float32Array(this.capacity * 3);
  private sizes = new Float32Array(this.capacity);
  private alphas = new Float32Array(this.capacity);
  private life = new Float32Array(this.capacity);
  private maxLife = new Float32Array(this.capacity);
  private gravity = new Float32Array(this.capacity);
  private count = 0;
  private burstHead = this.dustCount;
  readonly points: THREE.Points;
  private material: THREE.ShaderMaterial;
  private geo: THREE.BufferGeometry;

  constructor(scene: THREE.Scene) {
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setDrawRange(0, 0);
    this.material = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(this.geo, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  spawn(
    pos: Vector3,
    rgb: [number, number, number],
    n: number,
    opts: { speed?: number; life?: [number, number]; size?: [number, number]; gravity?: number; alpha?: number; spread?: number } = {},
  ): void {
    const speed = opts.speed ?? 3;
    const life = opts.life ?? [0.35, 0.6];
    const size = opts.size ?? [0.03, 0.06];
    const gravity = opts.gravity ?? 0;
    const alpha = opts.alpha ?? 0.9;
    const spread = opts.spread ?? 1;
    for (let k = 0; k < n; k++) {
      let i: number;
      if (this.count < this.capacity) {
        i = this.count++;
      } else {
        // 池满：循环覆盖瞬态区（dustCount..capacity-1）
        i = this.burstHead;
        this.burstHead = this.dustCount + ((this.burstHead - this.dustCount + 1) % (this.capacity - this.dustCount));
      }
      this.positions[i * 3] = pos.x;
      this.positions[i * 3 + 1] = pos.y;
      this.positions[i * 3 + 2] = pos.z;
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() * spread, Math.random() - 0.5).normalize();
      const v = speed * (0.5 + Math.random() * 0.8);
      this.velocities[i * 3] = dir.x * v;
      this.velocities[i * 3 + 1] = dir.y * v + speed * 0.25;
      this.velocities[i * 3 + 2] = dir.z * v;
      const jitter = 0.75 + Math.random() * 0.5;
      this.colors[i * 3] = clamp(rgb[0] * jitter, 0, 1);
      this.colors[i * 3 + 1] = clamp(rgb[1] * jitter, 0, 1);
      this.colors[i * 3 + 2] = clamp(rgb[2] * jitter, 0, 1);
      this.sizes[i] = size[0] + Math.random() * (size[1] - size[0]);
      this.alphas[i] = alpha * (0.6 + Math.random() * 0.4);
      this.maxLife[i] = life[0] + Math.random() * (life[1] - life[0]);
      this.life[i] = this.maxLife[i];
      this.gravity[i] = gravity;
    }
    this.geo.setDrawRange(0, this.count);
  }

  /** 环境尘埃：漂移 0.02 m/s，lifetime 8–15s，死亡即重生（循环） */
  spawnAmbientDust(center: Vector3, n: number): void {
    for (let k = 0; k < n && this.count < this.capacity; k++) {
      const i = this.count++;
      const r = 0.6 + Math.random() * 2.4;
      const a = Math.random() * Math.PI * 2;
      this.positions[i * 3] = center.x + Math.cos(a) * r;
      this.positions[i * 3 + 1] = center.y + Math.random() * 2.6;
      this.positions[i * 3 + 2] = center.z + Math.sin(a) * r;
      this.velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      this.velocities[i * 3 + 1] = 0.02 + Math.random() * 0.02;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      this.colors[i * 3] = 0.9;
      this.colors[i * 3 + 1] = 0.72;
      this.colors[i * 3 + 2] = 0.45;
      this.sizes[i] = 0.025;
      this.alphas[i] = 0.06;
      this.maxLife[i] = 8 + Math.random() * 7;
      this.life[i] = this.maxLife[i];
      this.gravity[i] = 0;
    }
    this.geo.setDrawRange(0, this.count);
  }

  update(dt: number, dustCenter: Vector3): void {
    for (let i = 0; i < this.count; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        if (i < this.dustCount) {
          // 尘埃重生（循环）
          const r = 0.6 + Math.random() * 2.4;
          const a = Math.random() * Math.PI * 2;
          this.positions[i * 3] = dustCenter.x + Math.cos(a) * r;
          this.positions[i * 3 + 1] = dustCenter.y + Math.random() * 2.6;
          this.positions[i * 3 + 2] = dustCenter.z + Math.sin(a) * r;
          this.life[i] = 8 + Math.random() * 7;
          this.alphas[i] = 0.06;
        } else {
          // 瞬态粒子死亡 → 与尾部交换
          this.count -= 1;
          const j = this.count;
          for (const off of [0, 1, 2]) {
            this.positions[i * 3 + off] = this.positions[j * 3 + off];
            this.velocities[i * 3 + off] = this.velocities[j * 3 + off];
            this.colors[i * 3 + off] = this.colors[j * 3 + off];
          }
          this.sizes[i] = this.sizes[j];
          this.alphas[i] = this.alphas[j];
          this.life[i] = this.life[j];
          this.maxLife[i] = this.maxLife[j];
          this.gravity[i] = this.gravity[j];
          i -= 1;
          continue;
        }
      }
      this.positions[i * 3] += this.velocities[i * 3] * dt;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * dt;
      this.velocities[i * 3 + 1] -= this.gravity[i] * dt;
      this.alphas[i] = Math.max(0, this.alphas[i] - dt * (this.maxLife[i] > 4 ? 0 : 1.6 / this.maxLife[i]));
    }
    (this.geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    this.geo.setDrawRange(0, this.count);
  }

  dispose(): void {
    this.geo.dispose();
    this.material.dispose();
  }
}

// ============ 烛火 1D 值噪声（03 §4.1） ============
function hash1(n: number): number {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}
function valueNoise(t: number): number {
  const i = Math.floor(t);
  const f = t - i;
  const u = f * f * (3 - 2 * f);
  return lerp(hash1(i), hash1(i + 1), u);
}

// ============ Boss 姿态代理（数字字段供 Tween 驱动，applyPose 写回网格） ============
interface RigParts {
  root: THREE.Group;
  torso: THREE.Group;
  chest: THREE.Group;
  head: THREE.Group;
  armL: THREE.Group;
  elbowL: THREE.Group;
  handL: THREE.Group;
  armR: THREE.Group;
  elbowR: THREE.Group;
  handR: THREE.Group;
  cape: THREE.Group;
  sword: THREE.Group;
  swordGlow: THREE.Sprite;
}

class BossRig {
  readonly anchor: THREE.Group; // 世界朝向/位置（由 sim 调和）
  readonly root: THREE.Group;   // 髋部 pivot（动画根）
  readonly pose: Record<string, number> = {
    rootY: 1.0, rootZ: 0, rootRx: 0, rootRz: 0,
    torsoRx: 0.02, chestSy: 1.0,
    headY: 0, headRx: -0.05, headRz: 0,
    armRx: -0.15, armRz: 0.55, elbowRx: 0.3, handRrx: -0.1, handRrz: 0,
    handRPx: 0, handRPy: 0, handRPz: 0,
    armLx: -0.15, armLz: -0.55, elbowLx: 0.3, handLrx: 0.1, handLrz: 0,
    capeRz: 0, swordGlow: 0,
  };
  private parts!: RigParts;
  private swordVisible = true;
  private timeline: Timeline | null = null;

  constructor(scene: THREE.Scene, mats: Record<string, THREE.Material>, tex: { flame: THREE.CanvasTexture }) {
    this.anchor = new THREE.Group();
    this.anchor.rotation.y = THRONE_YAW;
    this.anchor.position.set(WORLD.thronePos.x, 0, WORLD.thronePos.z);
    this.root = new THREE.Group();
    this.anchor.add(this.root);
    this.build(mats, tex.flame);
    scene.add(this.anchor);
  }

  private mesh(
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: Vector3,
    rot?: Vector3,
    scale?: Vector3,
  ): THREE.Mesh {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos.x, pos.y, pos.z);
    if (rot) m.rotation.set(rot.x, rot.y, rot.z);
    if (scale) m.scale.set(scale.x, scale.y, scale.z);
    m.castShadow = true;
    return m;
  }

  private build(mats: Record<string, THREE.Material>, flame: THREE.CanvasTexture): void {
    const M = (id: string): THREE.Material => mats[id];
    const root = this.root;

    // —— 下摆 + 躯干（同材质合并，减 draw call；躯干 z 0.44 防胸甲 z-fight）——
    root.add(this.mesh(mergeParts([
      { geo: new THREE.BoxGeometry(0.6, 0.35, 0.4), pos: { x: 0, y: 0.05, z: 0.02 } },
      { geo: new THREE.BoxGeometry(0.75, 1.0, 0.44), pos: { x: 0, y: 0.68, z: 0 } },
    ]), M('M06'), { x: 0, y: 0, z: 0 }));

    // —— 躯干 pivot（后仰/跌倒）——
    const torso = new THREE.Group();
    torso.position.set(0, 0.68, 0);
    root.add(torso);

    // 胸甲 pivot（呼吸 scale）
    const chest = new THREE.Group();
    chest.position.set(0, 0.27, 0.16);
    torso.add(chest);
    chest.add(this.mesh(new THREE.BoxGeometry(0.8, 0.55, 0.28), M('M08'), { x: 0, y: 0, z: 0 }));
    chest.add(this.mesh(mergeParts([
      { geo: new THREE.BoxGeometry(0.82, 0.06, 0.08), pos: { x: 0, y: 0.78, z: 0.18 } },
      { geo: new THREE.BoxGeometry(0.82, 0.06, 0.08), pos: { x: 0, y: 0.92, z: 0.18 } },
      { geo: new THREE.BoxGeometry(0.82, 0.06, 0.08), pos: { x: 0, y: 1.06, z: 0.18 } },
    ]), M('M07'), { x: 0, y: 0, z: 0 }));

    // 肩甲 + 肩刺（静态于 torso）
    torso.add(this.mesh(new THREE.SphereGeometry(0.36, 12, 10), M('M07'), { x: 0.6, y: 0.54, z: 0 }, undefined, { x: 1, y: 0.72, z: 0.83 }));
    torso.add(this.mesh(new THREE.SphereGeometry(0.36, 12, 10), M('M07'), { x: -0.6, y: 0.54, z: 0 }, undefined, { x: 1, y: 0.72, z: 0.83 }));
    torso.add(this.mesh(new THREE.ConeGeometry(0.06, 0.28, 6), M('M02'), { x: 0.72, y: 0.67, z: 0 }, { x: 0, y: 0, z: -0.52 }));
    torso.add(this.mesh(new THREE.ConeGeometry(0.06, 0.28, 6), M('M02'), { x: -0.72, y: 0.67, z: 0 }, { x: 0, y: 0, z: 0.52 }));

    // 头 pivot
    const head = new THREE.Group();
    head.position.set(0, 0.84, 0.02);
    torso.add(head);
    head.add(this.mesh(new THREE.SphereGeometry(0.31, 14, 12), M('M14'), { x: 0, y: 0, z: 0 }, undefined, { x: 0.92, y: 1.06, z: 0.92 }));
    // 角（主段 + 尖段，左右各合并；外倾 ∓0.5 rad）
    head.add(this.mesh(mergeParts([
      { geo: new THREE.ConeGeometry(0.08, 0.4, 6), pos: { x: 0.2, y: 0.3, z: 0.02 } },
      { geo: new THREE.ConeGeometry(0.05, 0.2, 6), pos: { x: 0.26, y: 0.56, z: 0.03 } },
    ]), M('M13'), { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -0.5 }));
    head.add(this.mesh(mergeParts([
      { geo: new THREE.ConeGeometry(0.08, 0.4, 6), pos: { x: -0.2, y: 0.3, z: 0.02 } },
      { geo: new THREE.ConeGeometry(0.05, 0.2, 6), pos: { x: -0.26, y: 0.56, z: 0.03 } },
    ]), M('M13'), { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0.5 }));
    // 眼镜（框×2 + 桥合并）+ 镜片 ×2 + 胡子
    head.add(this.mesh(mergeParts([
      { geo: new THREE.BoxGeometry(0.19, 0.06, 0.02), pos: { x: 0.12, y: 0.04, z: 0.26 } },
      { geo: new THREE.BoxGeometry(0.19, 0.06, 0.02), pos: { x: -0.12, y: 0.04, z: 0.26 } },
      { geo: new THREE.BoxGeometry(0.09, 0.02, 0.02), pos: { x: 0, y: 0.04, z: 0.26 } },
    ]), M('M13'), { x: 0, y: 0, z: 0 }));
    const lens = this.mesh(new THREE.PlaneGeometry(0.15, 0.1), M('M15'), { x: 0.12, y: 0.04, z: 0.28 });
    lens.rotation.x = -0.2;
    head.add(lens);
    const lens2 = this.mesh(new THREE.PlaneGeometry(0.15, 0.1), M('M15'), { x: -0.12, y: 0.04, z: 0.28 });
    lens2.rotation.x = -0.2;
    head.add(lens2);
    head.add(this.mesh(new THREE.BoxGeometry(0.24, 0.3, 0.1), M('beard'), { x: 0, y: -0.22, z: 0.24 }));

    // —— 双臂（pivot 层级：肩 → 肘 → 手）——
    const armL = new THREE.Group();
    armL.position.set(-0.55, 1.18, 0);
    root.add(armL);
    const armR = new THREE.Group();
    armR.position.set(0.55, 1.18, 0);
    root.add(armR);
    const buildArm = (arm: THREE.Group): { elbow: THREE.Group; hand: THREE.Group } => {
      arm.add(this.mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.52, 10), M('M06'), { x: 0, y: -0.25, z: 0 }));
      const elbow = new THREE.Group();
      elbow.position.set(0, -0.5, 0);
      arm.add(elbow);
      elbow.add(this.mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.46, 10), M('M06'), { x: 0, y: -0.23, z: 0 }));
      const hand = new THREE.Group();
      hand.position.set(0, -0.46, 0);
      elbow.add(hand);
      hand.add(this.mesh(new THREE.BoxGeometry(0.16, 0.16, 0.14), M('M14'), { x: 0, y: -0.02, z: 0 }));
      hand.add(this.mesh(mergeParts([
        { geo: new THREE.SphereGeometry(0.035, 6, 5), pos: { x: 0.05, y: -0.02, z: 0.07 } },
        { geo: new THREE.SphereGeometry(0.035, 6, 5), pos: { x: -0.05, y: -0.02, z: 0.07 } },
      ]), M('M14'), { x: 0, y: 0, z: 0 }));
      return { elbow, hand };
    };
    const aL = buildArm(armL);
    const aR = buildArm(armR);

    // —— 披风（A12 摆动 pivot）——
    const cape = new THREE.Group();
    root.add(cape);
    cape.add(this.mesh(new THREE.ConeGeometry(0.78, 1.45, 12, 1, true), M('M09'), { x: 0, y: 0.62, z: -0.34 }));
    cape.add(this.mesh(new THREE.ConeGeometry(0.74, 1.4, 12, 1, true), M('M06'), { x: 0, y: 0.6, z: -0.33 }, undefined, { x: 1, y: 1, z: 0.9 }));

    // —— 剑（挂右手）+ 蓄力辉光 sprite ——
    const sword = new THREE.Group();
    sword.add(this.mesh(new THREE.BoxGeometry(0.04, 0.05, 0.6), M('M07'), { x: 0, y: -0.06, z: 0.35 }));
    sword.add(this.mesh(new THREE.BoxGeometry(0.16, 0.03, 0.03), M('M05'), { x: 0, y: 0, z: 0.06 }));
    sword.add(this.mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.14, 6), M('M02'), { x: 0, y: 0.02, z: 0 }, { x: Math.PI / 2, y: 0, z: 0 }));
    sword.add(this.mesh(new THREE.SphereGeometry(0.025, 6, 5), M('M05'), { x: 0, y: 0.05, z: -0.06 }));
    sword.position.set(0.12, -0.26, 0.06);
    aR.hand.add(sword);
    sword.visible = this.swordVisible;

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: flame,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0,
      }),
    );
    glow.scale.setScalar(0.5);
    glow.position.set(0.15, -0.3, 0.35);
    aR.hand.add(glow);

    this.parts = {
      root, torso, chest, head,
      armL, elbowL: aL.elbow, handL: aL.hand,
      armR, elbowR: aR.elbow, handR: aR.hand,
      cape, sword, swordGlow: glow,
    };
  }

  showSword(v: boolean): void {
    this.swordVisible = v;
    this.parts.sword.visible = v;
  }

  setTimeline(tl: Timeline): void {
    this.timeline = tl;
  }

  /** 剑尖世界坐标（命中火花发射点）。 */
  swordTipWorld(out: THREE.Vector3): THREE.Vector3 {
    return this.parts.swordGlow.getWorldPosition(out);
  }

  stopAnim(): void {
    if (this.timeline) this.timeline.stop();
    this.timeline = null;
  }

  /** 每帧：分带颤抖（03 §7.5）+ 呼吸（A1）+ 披风摆（A12）+ 姿态写入。 */
  applyPose(time: number, anxiety: number): void {
    const p = this.pose;
    const breathe = Math.sin(time * Math.PI * 2 * 0.22);
    // 分带颤抖：两正弦和，相位每秒重掷
    const freq = anxiety < 31 ? 0 : anxiety < 61 ? 1.5 : anxiety < 86 ? 2.2 : 4.5;
    const amp = anxiety < 31 ? 0 : anxiety < 61 ? 0.01 : anxiety < 86 ? 0.02 : 0.045;
    const per = Math.floor(time);
    const ph = per * 1.7 + 2.3;
    const n = Math.sin(time * Math.PI * 2 * freq + ph) * 0.7 + Math.sin(time * Math.PI * 2 * freq * 1.37 + ph * 1.9) * 0.3;
    const trem = amp * n;

    this.root.position.set(trem * 0.6, p.rootY + 0.03 * breathe, p.rootZ + trem * 0.4);
    this.root.rotation.set(p.rootRx, 0, p.rootRz);
    this.parts.torso.rotation.x = p.torsoRx;
    this.parts.chest.scale.set(1, p.chestSy * (1 + 0.012 * breathe), 1);
    this.parts.head.position.y = p.headY + 0.008 * breathe + trem * 0.35;
    this.parts.head.rotation.set(p.headRx, 0, p.headRz);

    this.parts.armL.rotation.set(p.armLx, 0, p.armLz);
    this.parts.elbowL.rotation.x = p.elbowLx;
    this.parts.handL.rotation.set(p.handLrx, 0, p.handLrz);
    this.parts.armR.rotation.set(p.armRx, 0, p.armRz);
    this.parts.elbowR.rotation.x = p.elbowRx;
    this.parts.handR.rotation.set(p.handRrx, 0, p.handRrz);
    this.parts.handR.position.set(p.handRPx, -0.46 + p.handRPy, p.handRPz);

    // 披风摆 ±2° @0.6Hz（根动时幅度放大）
    const cape = this.parts.cape;
    cape.rotation.z = p.capeRz + (0.035 + Math.min(0.035, Math.abs(trem) * 2)) * Math.sin(time * Math.PI * 2 * 0.6);

    // 剑蓄力辉光（toneMapped:false 是 Bloom 唯一来源之一）
    const glow = this.parts.swordGlow;
    glow.material.opacity = p.swordGlow;
    glow.scale.setScalar(0.5 + 1.1 * p.swordGlow);
  }
}

// ============ SceneManager ============
export class SceneManager implements EventConsumer {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  private postfx: PostFX;
  private tweenMgr = new TweenManager();
  private rig: BossRig;
  private shadow: PlayerShadow;
  private particles: ParticlePool;

  private candleLight!: THREE.PointLight;
  private candleScale = { v: 1 }; // phase 灯光系数（Tween 驱动）
  private flickerPhase = Math.random() * Math.PI * 2;
  private bowBoost = false;
  private sweepLight!: THREE.PointLight;
  private sweepT = 0;

  private telegraphRing!: THREE.Mesh;
  private telegraphTimer = 0;

  private anxiety = 0;
  private band: AnxietyBand = 'calm';
  private shakePulse = 0;
  private camA = 0.08;
  private lastAnim: BossAnimKind | null = null;
  private vigBase = 0.55;
  private vigPulse = { v: 0 };
  private vigTimeline: Timeline | null = null;
  private disposed = false;
  private onResize: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(C.deepBlue);
    this.scene.fog = new THREE.Fog(0x0a0e22, 12, 44);

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.5, 80);
    this.camera.position.copy(CAM_BASE);
    this.camera.lookAt(CAM_LOOK);

    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.buildLights();
    const tex = { flame: makeFlameTexture(), scratch: makeScratchTexture() };
    const mats = this.buildMaterials(tex);
    this.buildRoom(mats, tex.flame);

    this.postfx = new PostFX(this.renderer, this.scene, this.camera);
    this.particles = new ParticlePool(this.scene);
    this.particles.spawnAmbientDust(WORLD.lightAnchors.candle, 40);
    this.shadow = new PlayerShadow(this.scene);
    this.rig = new BossRig(this.scene, mats, tex);

    this.buildTelegraph();
    this.playBossAnim('idleSway');
  }

  // ============ 材质表（03 §6.4：16 Standard + 2 Basic，实例 < 20） ============
  private buildMaterials(tex: { flame: THREE.CanvasTexture; scratch: THREE.CanvasTexture }): Record<string, THREE.Material> {
    const std = (color: string, roughness: number, metalness: number, extra: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    const basic = (color: string): THREE.MeshBasicMaterial =>
      new THREE.MeshBasicMaterial({ color, toneMapped: false });
    return {
      M01: std(C.stone, 0.9, 0.05),
      M02: std(C.brightStone, 0.85, 0.1),
      M03: std(C.bookC, 0.6, 0.15),
      M04: std(C.bookA, 0.55, 0.2),
      M04b: std(C.bookB, 0.55, 0.2),
      M04c: std(C.bookC, 0.55, 0.2),
      M05: std(C.gold, 0.4, 0.85),
      M06: std(C.steelDark, 0.45, 0.75),
      M07: std(C.steelBright, 0.4, 0.8),
      M08: std('#49597A', 0.45, 0.7, { map: tex.scratch }),
      M09: std('#5A1626', 0.8, 0.1),
      M10: std(C.bloodDark, 0.9, 0.05, { map: makeRugTexture() }),
      M11: std('#E8D9B0', 0.35, 0),
      M12: basic(C.flameCore),
      M13: std('#3E3A34', 0.5, 0.3),
      M14: std(C.skin, 0.65, 0.05),
      M15: new THREE.MeshStandardMaterial({ color: C.glass, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0, depthWrite: false }),
      M16: basic('#5A7BB0'),
      beard: std('#2B2E3A', 0.6, 0.4),
      floor: std(C.stone, 0.9, 0.05, { map: makeFloorTexture() }),
      lane: new THREE.MeshStandardMaterial({ color: C.bloodDark, roughness: 0.9, metalness: 0.05, map: makeLaneTexture(), transparent: true, opacity: 0.08, depthWrite: false }),
    };
  }

  // ============ 场景搭建（03 §2） ============
  private mesh(geo: THREE.BufferGeometry, mat: THREE.Material, pos: Vector3, rot?: Vector3, opts: { cast?: boolean; recv?: boolean } = {}): THREE.Mesh {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos.x, pos.y, pos.z);
    if (rot) m.rotation.set(rot.x, rot.y, rot.z);
    m.castShadow = opts.cast ?? false;
    m.receiveShadow = opts.recv ?? false;
    return m;
  }

  private buildRoom(mats: Record<string, THREE.Material>, flameTex: THREE.CanvasTexture): void {
    const M = (id: string): THREE.Material => mats[id];
    const recv = { recv: true };
    const halfX = ROOM.halfX;
    const halfZ = ROOM.halfZ;
    const top = ROOM.top;

    // —— 地板 / 墙体（静态合并，1 个 draw call）——
    const roomStatic = mergeParts([
      { geo: new THREE.BoxGeometry(24, 0.2, 18), pos: { x: 0, y: -0.1, z: 0 } },
      { geo: new THREE.PlaneGeometry(24, top), pos: { x: 0, y: top / 2, z: -halfZ } },
      { geo: new THREE.PlaneGeometry(18, top), pos: { x: -halfX, y: top / 2, z: 0 }, rot: { x: 0, y: Math.PI / 2, z: 0 } },
      { geo: new THREE.PlaneGeometry(18, top), pos: { x: halfX, y: top / 2, z: 0 }, rot: { x: 0, y: -Math.PI / 2, z: 0 } },
    ]);
    this.scene.add(this.mesh(roomStatic, M('M01'), { x: 0, y: 0, z: 0 }, undefined, recv));

    // —— 地板瓷砖纹理层（y=0.001 防 z-fight）——
    this.scene.add(this.mesh(new THREE.PlaneGeometry(24, 18), M('floor'), { x: 0, y: 0.001, z: 0 }, { x: -Math.PI / 2, y: 0, z: 0 }, recv));

    // —— 立柱 ×4（WORLD.colliders 定位；贴墙两根内收 0.5 防穿模）——
    for (const col of WORLD.colliders) {
      const inset = Math.abs(col.center.x) > halfX - 0.6 ? (col.center.x > 0 ? 1 : -1) * 0.5 : 0;
      const x = col.center.x - inset;
      const z = col.center.z;
      const g = new THREE.Group();
      g.add(this.mesh(new THREE.CylinderGeometry(0.35, 0.45, 8, 10), M('M01'), { x, y: 4, z }, undefined, { cast: true, recv: true }));
      g.add(this.mesh(new THREE.BoxGeometry(1.1, 0.3, 1.1), M('M02'), { x, y: 0.15, z }, undefined, { cast: true, recv: true }));
      g.add(this.mesh(new THREE.BoxGeometry(1.0, 0.3, 1.0), M('M02'), { x, y: 8.15, z }, undefined, { cast: true, recv: true }));
      this.scene.add(g);
    }

    // —— 台阶（王座基座）——
    this.scene.add(this.mesh(new THREE.BoxGeometry(6.5, 0.2, 4.5), M('M01'), { x: DAIS_CENTER.x, y: 0.1, z: DAIS_CENTER.z }, undefined, { cast: true, recv: true }));
    this.scene.add(this.mesh(new THREE.BoxGeometry(5.2, 0.3, 3.4), M('M01'), { x: DAIS_CENTER.x, y: 0.3, z: DAIS_CENTER.z }, undefined, { cast: true, recv: true }));

    // —— 王座（03 §2.2）——
    this.buildThrone(M);

    // —— 档案架 + 24 本书（InstancedMesh）——
    this.buildArchive(M);

    // —— 拱窗 ×2 + 门洞 + 锁链 ——
    this.buildWindows(M);
    this.buildDoor(M);
    this.buildChains(M);

    // —— 地毯 + 玩家走道标记 ——
    const rug = this.mesh(new THREE.CircleGeometry(4.4, 32), M('M10'), { x: -5, y: 0.012, z: -0.5 }, { x: -Math.PI / 2, y: 0, z: 0 }, { recv: true });
    rug.scale.set(1, 1, 0.72);
    this.scene.add(rug);
    const lane = this.mesh(new THREE.PlaneGeometry(7, 1.2), M('lane'), { x: 4, y: 0.011, z: 0.75 }, { x: -Math.PI / 2, y: 0, z: 0.35 });
    this.scene.add(lane);

    // —— 蜡烛 ×6 ——
    this.buildCandles(M, flameTex);
  }

  private buildThrone(M: (id: string) => THREE.Material): void {
    const group = new THREE.Group();
    group.position.set(DAIS_CENTER.x, 0.45, DAIS_CENTER.z);
    group.rotation.y = THRONE_YAW;
    const seat = mergeParts([
      { geo: new THREE.BoxGeometry(1.2, 0.25, 1.0), pos: { x: 0, y: 0.42, z: 0.25 } },
      { geo: new THREE.CylinderGeometry(0.07, 0.08, 0.42, 8), pos: { x: 0.48, y: 0.21, z: 0 } },
      { geo: new THREE.CylinderGeometry(0.07, 0.08, 0.42, 8), pos: { x: -0.48, y: 0.21, z: 0 } },
      { geo: new THREE.CylinderGeometry(0.07, 0.08, 0.42, 8), pos: { x: 0.48, y: 0.21, z: 0.5 } },
      { geo: new THREE.CylinderGeometry(0.07, 0.08, 0.42, 8), pos: { x: -0.48, y: 0.21, z: 0.5 } },
      { geo: new THREE.BoxGeometry(1.3, 1.8, 0.25), pos: { x: 0, y: 1.5, z: -0.35 }, rot: { x: -0.105, y: 0, z: 0 } },
      { geo: new THREE.BoxGeometry(0.7, 0.1, 0.35), pos: { x: 0.85, y: 0.72, z: 0.25 } },
      { geo: new THREE.BoxGeometry(0.7, 0.1, 0.35), pos: { x: -0.85, y: 0.72, z: 0.25 } },
      { geo: new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8), pos: { x: 0.85, y: 0.21, z: 0.25 } },
      { geo: new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8), pos: { x: -0.85, y: 0.21, z: 0.25 } },
    ]);
    group.add(this.mesh(seat, M('M01'), { x: 0, y: 0, z: 0 }, undefined, { cast: true, recv: true }));
    const gold = mergeParts([
      { geo: new THREE.BoxGeometry(1.24, 0.03, 1.04), pos: { x: 0, y: 0.555, z: 0.25 } },
      { geo: new THREE.BoxGeometry(0.7, 0.03, 0.35), pos: { x: 0.85, y: 0.755, z: 0.25 } },
      { geo: new THREE.BoxGeometry(0.7, 0.03, 0.35), pos: { x: -0.85, y: 0.755, z: 0.25 } },
      { geo: new THREE.ConeGeometry(0.35, 0.6, 8), pos: { x: 0, y: 3.2, z: -0.35 } },
      { geo: new THREE.BoxGeometry(0.7, 0.08, 0.7), pos: { x: 0, y: 2.96, z: -0.35 } },
    ]);
    group.add(this.mesh(gold, M('M05'), { x: 0, y: 0, z: 0 }, undefined, { cast: true, recv: true }));
    const spikes = mergeParts([
      { geo: new THREE.ConeGeometry(0.08, 0.5, 6), pos: { x: -0.52, y: 2.6, z: -0.42 } },
      { geo: new THREE.ConeGeometry(0.08, 0.5, 6), pos: { x: -0.26, y: 2.6, z: -0.42 } },
      { geo: new THREE.ConeGeometry(0.08, 0.5, 6), pos: { x: 0, y: 2.6, z: -0.42 } },
      { geo: new THREE.ConeGeometry(0.08, 0.5, 6), pos: { x: 0.26, y: 2.6, z: -0.42 } },
      { geo: new THREE.ConeGeometry(0.08, 0.5, 6), pos: { x: 0.52, y: 2.6, z: -0.42 } },
      { geo: new THREE.BoxGeometry(0.6, 1.2, 0.08), pos: { x: 0.92, y: 1.45, z: -0.35 }, rot: { x: 0, y: 0, z: -0.44 } },
      { geo: new THREE.BoxGeometry(0.6, 1.2, 0.08), pos: { x: -0.92, y: 1.45, z: -0.35 }, rot: { x: 0, y: 0, z: 0.44 } },
    ]);
    group.add(this.mesh(spikes, M('M02'), { x: 0, y: 0, z: 0 }, undefined, { cast: true, recv: true }));
    group.add(this.mesh(new THREE.BoxGeometry(1.0, 0.12, 0.9), M('M09'), { x: 0, y: 0.48, z: 0.27 }, undefined, { cast: true, recv: true }));
    this.scene.add(group);
  }

  private buildArchive(M: (id: string) => THREE.Material): void {
    const g = new THREE.Group();
    g.position.set(2.2, 0, -8.35);
    const frame = mergeParts([
      { geo: new THREE.BoxGeometry(0.08, 2.6, 0.7), pos: { x: -1.6, y: 1.3, z: 0 } },
      { geo: new THREE.BoxGeometry(0.08, 2.6, 0.7), pos: { x: 1.6, y: 1.3, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 0.08, 0.7), pos: { x: 0, y: 0.04, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 0.08, 0.7), pos: { x: 0, y: 0.68, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 0.08, 0.7), pos: { x: 0, y: 1.32, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 0.08, 0.7), pos: { x: 0, y: 1.96, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 0.08, 0.7), pos: { x: 0, y: 2.6, z: 0 } },
      { geo: new THREE.BoxGeometry(3.2, 2.6, 0.03), pos: { x: 0, y: 1.3, z: -0.35 } },
    ]);
    g.add(this.mesh(frame, M('M03'), { x: 0, y: 0, z: 0 }, undefined, { cast: true, recv: true }));
    const bookGeo = new THREE.BoxGeometry(0.12, 0.25, 0.08);
    const books = new THREE.InstancedMesh(bookGeo, M('M04'), 24);
    books.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    books.castShadow = true;
    const rng = mulberry32(11);
    const bookColors = [C.bookA, C.bookB, C.bookC];
    const dummy = new THREE.Object3D();
    for (let row = 0; row < 4; row++) {
      for (let i = 0; i < 6; i++) {
        dummy.position.set(-1.44 + i * 0.56, 0.1 + row * 0.64 + 0.125, -0.31);
        dummy.rotation.y = (rng() - 0.5) * 0.21;
        dummy.updateMatrix();
        books.setMatrixAt(row * 6 + i, dummy.matrix);
        books.setColorAt(row * 6 + i, new THREE.Color(bookColors[Math.floor(rng() * 3)]));
      }
    }
    books.instanceMatrix.needsUpdate = true;
    if (books.instanceColor) books.instanceColor.needsUpdate = true;
    g.add(books);
    this.scene.add(g);
  }

  private buildWindows(M: (id: string) => THREE.Material): void {
    const glassMat = M('M16') as THREE.MeshBasicMaterial;
    glassMat.map = makeWindowTexture();
    for (const x of [-0.5, 5.5]) {
      const g = new THREE.Group();
      g.position.set(x, 4.6, -8.92);
      g.add(this.mesh(new THREE.PlaneGeometry(1.6, 3.2), glassMat, { x: 0, y: 0.2, z: 0.05 }));
      const frame = mergeParts([
        { geo: new THREE.BoxGeometry(0.1, 3.4, 0.1), pos: { x: -0.85, y: 0.1, z: 0 } },
        { geo: new THREE.BoxGeometry(0.1, 3.4, 0.1), pos: { x: 0.85, y: 0.1, z: 0 } },
        { geo: new THREE.BoxGeometry(1.8, 0.1, 0.1), pos: { x: 0, y: 1.95, z: 0 } },
      ]);
      g.add(this.mesh(frame, M('M01'), { x: 0, y: 0, z: 0 }));
      this.scene.add(g);
    }
  }

  private buildDoor(M: (id: string) => THREE.Material): void {
    const g = new THREE.Group();
    g.position.set(11.95, 0, 2);
    g.rotation.y = Math.PI / 2;
    const frame = mergeParts([
      { geo: new THREE.BoxGeometry(0.25, 2.3, 0.25), pos: { x: -0.9, y: 1.15, z: 0 } },
      { geo: new THREE.BoxGeometry(0.25, 2.3, 0.25), pos: { x: 0.9, y: 1.15, z: 0 } },
      { geo: new THREE.BoxGeometry(2.05, 0.25, 0.25), pos: { x: 0, y: 2.3, z: 0 } },
    ]);
    g.add(this.mesh(frame, M('M01'), { x: 0, y: 0, z: 0 }));
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.25, 8, 12, Math.PI), M('M01'));
    arch.position.set(0, 2.3, 0);
    g.add(arch);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 });
    g.add(this.mesh(new THREE.PlaneGeometry(1.8, 3.2), holeMat, { x: 0, y: 1.6, z: -0.15 }));
    this.scene.add(g);
  }

  private buildChains(M: (id: string) => THREE.Material): void {
    const chains = new THREE.InstancedMesh(new THREE.TorusGeometry(0.09, 0.025, 6, 10), M('M01'), 20);
    const dummy = new THREE.Object3D();
    let ci = 0;
    for (const x of [0.5, -8.5]) {
      for (let i = 0; i < 10; i++) {
        dummy.position.set(x, 8.5 - i * 0.2, -8.9);
        dummy.updateMatrix();
        chains.setMatrixAt(ci, dummy.matrix);
        ci += 1;
      }
    }
    chains.instanceMatrix.needsUpdate = true;
    this.scene.add(chains);
  }

  private buildCandles(M: (id: string) => THREE.Material, flameTex: THREE.CanvasTexture): void {
    const spots: { pos: Vector3; baseY: number }[] = [
      { pos: { x: -4.9, y: 0, z: -1.4 }, baseY: 0.45 },
      { pos: { x: -4.9, y: 0, z: 1.4 }, baseY: 0.45 },
      { pos: { x: -10, y: 0, z: -2.85 }, baseY: 1.4 },
      { pos: { x: -6, y: 0, z: -2.85 }, baseY: 1.4 },
      { pos: { x: -2, y: 0, z: -2.85 }, baseY: 1.4 },
      { pos: { x: -8, y: 0, z: 2.85 }, baseY: 1.4 },
    ];
    const waxParts: PartSpec[] = [];
    const discParts: PartSpec[] = [];
    for (const s of spots) {
      waxParts.push({ geo: new THREE.CylinderGeometry(0.05, 0.065, 0.35, 10), pos: { x: s.pos.x, y: s.baseY + 0.175, z: s.pos.z } });
      discParts.push({ geo: new THREE.CylinderGeometry(0.12, 0.09, 0.03, 10), pos: { x: s.pos.x, y: s.baseY - 0.015, z: s.pos.z } });
    }
    this.scene.add(this.mesh(mergeParts(waxParts), M('M11'), { x: 0, y: 0, z: 0 }));
    this.scene.add(this.mesh(mergeParts(discParts), M('M02'), { x: 0, y: 0, z: 0 }));
    for (const s of spots) {
      const flame = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: flameTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false }),
      );
      flame.position.set(s.pos.x, s.baseY + 0.37, s.pos.z);
      flame.scale.setScalar(0.16);
      this.scene.add(flame);
    }
  }

  private buildTelegraph(): void {
    const ringMat = new THREE.MeshBasicMaterial({
      color: C.deepFlame,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.telegraphRing = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.9, 32), ringMat);
    this.telegraphRing.rotation.x = -Math.PI / 2;
    this.telegraphRing.position.set(PLAYER_STAND.x, 0.02, PLAYER_STAND.z);
    this.telegraphRing.visible = false;
    this.scene.add(this.telegraphRing);
  }

  // ============ 灯光（03 §4） ============
  private buildLights(): void {
    const candlePos = WORLD.lightAnchors.candle;
    this.candleLight = new THREE.PointLight(C.flame, 50, 22, 2);
    this.candleLight.position.set(candlePos.x, candlePos.y, candlePos.z);
    this.scene.add(this.candleLight);

    const dirLight = new THREE.DirectionalLight(0x6e8fbf, 0.35);
    dirLight.position.set(-6, 9, 2);
    dirLight.target.position.set(-2, 1, -4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.left = -14;
    dirLight.shadow.camera.right = 14;
    dirLight.shadow.camera.top = 14;
    dirLight.shadow.camera.bottom = -14;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    this.scene.add(dirLight);
    this.scene.add(dirLight.target);

    this.scene.add(new THREE.HemisphereLight(0x2a3e66, 0x0a0c16, 0.35));
    this.scene.add(new THREE.AmbientLight(0x141b33, 0.25));

    this.sweepLight = new THREE.PointLight(C.flame, 0, 20, 2);
    this.sweepLight.position.set(11, 1.5, 2);
    this.scene.add(this.sweepLight);
  }

    // ============ 相机（03 §5：固定对角 + 呼吸漂移 + 焦虑 FOV） ============
  private updateCamera(dt: number, time: number): void {
    const anxiety = this.anxiety;
    this.shakePulse *= Math.exp(-dt * 2.8);
    const targetA = (0.08 + (0.16 - 0.08) * clamp((anxiety - 60) / 25, 0, 1)) + this.shakePulse;
    this.camA += (targetA - this.camA) * Math.min(1, dt * 4);

    const s1 = Math.sin(0.11 * Math.PI * 2 * time);
    const s2 = Math.sin(0.23 * Math.PI * 2 * time + 1.7);
    const offset = new THREE.Vector3(
      this.camA * (s1 * 1.0 + 0.5 * s2 * 0.6),
      this.camA * (s1 * 0.35 + 0.5 * s2 * 0.15),
      this.camA * (s1 * 0.8 + 0.5 * s2 * 0.5),
    );
    if (anxiety > 85) {
      offset.x += Math.sin(time * Math.PI * 2 * 2.5 + 1.3) * 0.01;
      offset.z += Math.cos(time * Math.PI * 2 * 2.5) * 0.01;
    }
    if (this.shakePulse > 0.002) {
      offset.x += (Math.random() - 0.5) * this.shakePulse * 2;
      offset.y += (Math.random() - 0.5) * this.shakePulse;
      offset.z += (Math.random() - 0.5) * this.shakePulse * 2;
    }
    const k = Math.min(1, dt * 2.4); // ≈ 0.04/帧
    this.camera.position.lerp(CAM_BASE.clone().add(offset), k);

    const look = CAM_LOOK.clone();
    look.x += s1 * 0.03 + 0.5 * s2 * 0.6 * 0.018;
    look.y += s1 * 0.35 * 0.018 + 0.5 * s2 * 0.15 * 0.018;
    look.z += s1 * 0.8 * 0.018 + 0.5 * s2 * 0.5 * 0.018;
    this.camera.lookAt(look);

    const fovTarget = 40 - 6 * clamp(anxiety / 100, 0, 1);
    this.camera.fov += (fovTarget - this.camera.fov) * Math.min(1, dt * 1.8);
    this.camera.updateProjectionMatrix();
  }

  // ============ 烛火闪烁（03 §4.1 精确公式） ============
  private updateCandle(time: number): void {
    const n = valueNoise(time * 11.3);
    const flick = 1 + 0.13 * n + 0.07 * Math.sin(Math.PI * 2 * 0.7 * time + this.flickerPhase);
    const phaseScale = this.candleScale.v * (this.bowBoost ? 1.15 : 1);
    this.candleLight.intensity = 50 * flick * phaseScale;
    const base = WORLD.lightAnchors.candle;
    this.candleLight.position.set(
      base.x + (n - 0.5) * 0.01,
      base.y,
      base.z + (n - 0.5) * 0.01,
    );
  }

  // ============ 地面预警环（03 §8.1：0.35→0.8 两次脉动后 0.3s 淡出） ============
  private updateTelegraph(dt: number): void {
    if (this.telegraphTimer <= 0) {
      this.telegraphRing.visible = false;
      return;
    }
    this.telegraphTimer -= dt;
    const t = 0.9 - this.telegraphTimer; // 已过去
    let opacity: number;
    if (t < 0.5) {
      opacity = 0.35 + 0.45 * (0.5 - 0.5 * Math.cos(Math.PI * 2 * 2 * t));
    } else {
      opacity = 0.8 * Math.max(0, 1 - (t - 0.5) / 0.4);
    }
    this.telegraphRing.visible = opacity > 0.01;
    (this.telegraphRing.material as THREE.MeshBasicMaterial).opacity = opacity;
  }

  // ============ 光扫（fx lightSweep：门→王座） ============
  private updateSweep(dt: number): void {
    if (this.sweepT <= 0) {
      this.sweepLight.intensity = 0;
      return;
    }
    this.sweepT -= dt;
    const u = clamp(1 - this.sweepT / 1.2, 0, 1);
    this.sweepLight.position.set(lerp(11, DAIS_CENTER.x, u), 1.5, lerp(2, DAIS_CENTER.z, u));
    this.sweepLight.intensity = 8 * Math.sin(Math.PI * u);
  }

  // ============ 每帧（TDD §7 第 7 步：render → postfx → present） ============
  render(dt: number, state: SimState, time: number): void {
    this.tweenMgr.update(dt);
    this.rig.applyPose(time, this.anxiety);
    this.shadow.update(dt, this.shadowModeFor(state.phase), state.player, time);
    this.particles.update(dt, WORLD.lightAnchors.candle);
    this.updateCandle(time);
    this.updateCamera(dt, time);
    this.updateTelegraph(dt);
    this.updateSweep(dt);
    this.reconcile(dt, state);
    // 暗角 = 基础 0.55 + 焦虑带 + 命中脉冲（03 §8.4）
    this.postfx.setVignette(this.vigBase + this.bandBonus + this.vigPulse.v);
    this.postfx.update(dt);
    this.postfx.render();
  }

  private shadowModeFor(phase: GamePhase): ShadowMode {
    switch (phase) {
      case 'SENSE': return 'approaching';
      case 'PERFORM': return 'engaging';
      case 'EVALUATE':
      case 'DIARY':
      case 'ENDING_NORMAL':
      case 'ENDING_HIDDEN': return 'retreating';
      default: return 'hidden';
    }
  }

  // ============ mesh 调和（id→object 映射，TDD §4.1 K04） ============
  private reconcile(dt: number, state: SimState): void {
    const boss = state.boss;
    const target = new THREE.Vector3(boss.pos.x, boss.pos.y, boss.pos.z);
    this.rig.anchor.position.lerp(target, Math.min(1, dt * 8));
    this.rig.anchor.rotation.y = THRONE_YAW + (boss.rot.y ?? 0);
    if (boss.anim !== this.lastAnim) {
      this.lastAnim = boss.anim;
      this.playBossAnim(boss.anim);
    }
  }

  // ============ 焦虑代理（05 §2.1 L1/L3：手抖 + 暗角 + 相机） ============
  private bandBonus = 0;
  setAnxiety(anxiety: number, band: AnxietyBand): void {
    this.anxiety = anxiety;
    if (band !== this.band) {
      this.band = band;
      this.bandBonus = band === 'calm' ? 0 : band === 'nervous' ? 0.08 : band === 'shaky' ? 0.18 : 0.32;
    }
  }

  getRendererInfo(): { drawCalls: number; triangles: number; geometries: number; textures: number } {
    const i = this.renderer.info;
    return {
      drawCalls: i.render.calls,
      triangles: i.render.triangles,
      geometries: i.memory.geometries,
      textures: i.memory.textures,
    };
  }

  // ============ 事件消费（TDD §5.3） ============
  onSimEvent(e: SimEvent): void {
    switch (e.type) {
      case 'bossAnim':
        this.playBossAnim(e.anim);
        break;
      case 'phase':
        this.onPhase(e.phase);
        break;
      case 'fx':
        this.onFx(e.fx, e.pos, e.value);
        break;
      case 'explosion':
        this.onExplosion(e.pos, e.color, e.size);
        break;
      default:
        break; // sound/music/dialogue/barrage/rating/persist 由其他适配层消费
    }
  }

  private onPhase(phase: GamePhase): void {
    if (phase === 'WAIT') this.flickerPhase = Math.random() * Math.PI * 2;
    const target = phase === 'PERFORM' ? 1.3 : phase === 'EVALUATE' ? 0.8 : phase === 'DIARY' ? 0.9 : phase === 'MENU' ? 0.5 : 1;
    this.tweenMgr.kill(this.candleScale);
    this.tweenMgr.tween(this.candleScale, 'v', this.candleScale.v, target, 1.2, easeInOutCubic);
  }

  private onFx(fx: FxKind, pos?: Vector3, value?: number): void {
    switch (fx) {
      case 'screenFlash':
        this.postfx.setFlash(0.35);
        if (this.vigTimeline) this.vigTimeline.stop();
        const tl = this.tweenMgr.timeline(this.vigPulse);
        tl.to(this.vigPulse, 'v', 0, 0.2, 0.12, easeOutCubic);
        tl.to(this.vigPulse, 'v', () => this.vigPulse.v, 0, 0.4, easeInOutCubic);
        this.vigTimeline = tl;
        tl.play();
        break;
      case 'shake':
        this.shakePulse = Math.min(0.12, this.shakePulse + (value ?? 0.06));
        break;
      case 'bloomPulse':
        this.postfx.setBloomPulse(value ?? 0.3);
        break;
      case 'lightSweep':
        this.sweepT = 1.2;
        break;
      case 'dust':
        this.particles.spawn(pos ?? WORLD.lightAnchors.candle, [0.55, 0.6, 0.65], 10, {
          speed: 0.5, life: [1.2, 2.4], size: [0.02, 0.05], alpha: 0.25,
        });
        break;
      default:
        break;
    }
  }

  private onExplosion(pos: Vector3, color: string, size: number): void {
    const rgb = hexToRgb(color);
    this.particles.spawn(pos, rgb, clamp(Math.round(size * 12), 10, 30), {
      speed: 4, life: [0.3, 0.55], size: [0.03, 0.06], gravity: 6, spread: 1.6,
    });
    this.shadow.flash();
  }

  // ============ Boss 动画（03 §7，bossAnim 事件映射） ============
  playBossAnim(anim: BossAnimKind, _speed?: number): void {
    switch (anim) {
      case 'idleSway': this.animIdleSway(); break;
      case 'armorFiddle': this.animArmorFiddle(); break;
      case 'standUp': this.animStandUp(); break;
      case 'swordRaise': this.animSwordRaise(); break;
      case 'attack': this.animAttack(); break;
      case 'knockdown': this.animKnockdown(); break;
      case 'hairTidy': this.animHairTidy(); break;
      case 'breakCharacter': this.animBreakCharacter(); break;
      case 'kneelPanic': this.animKneelPanic(); break;
      case 'pickUpSword': this.animPickUpSword(); break;
      case 'bow': this.animBow(); break;
      default: break;
    }
  }

  private anim(build: (tl: Timeline, p: Record<string, number>) => void, onComplete?: () => void): void {
    this.rig.stopAnim();
    this.tweenMgr.kill(this.rig.pose);
    const p = this.rig.pose;
    const tl = this.tweenMgr.timeline(p);
    build(tl, p);
    if (onComplete) tl.onComplete(onComplete);
    this.rig.setTimeline(tl);
    tl.play();
  }

  /** A1：坐姿回归 + 缓慢左右摆动 */
  private animIdleSway(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'rootRx', () => p.rootRx, 0, 1.0, easeInOutCubic);
        b.to(p, 'torsoRx', () => p.torsoRx, 0.02, 1.0, easeInOutCubic);
        b.to(p, 'armRz', () => p.armRz, 0.55, 1.0, easeInOutCubic);
        b.to(p, 'armLz', () => p.armLz, -0.55, 1.0, easeInOutCubic);
        b.to(p, 'armRx', () => p.armRx, -0.15, 1.0, easeInOutCubic);
        b.to(p, 'armLx', () => p.armLx, -0.15, 1.0, easeInOutCubic);
        b.to(p, 'swordGlow', () => p.swordGlow, 0, 0.6);
      });
      tl.to(p, 'rootRz', () => p.rootRz, 0.03, 1.6, easeInOutCubic);
      tl.to(p, 'rootRz', () => p.rootRz, -0.03, 3.2, easeInOutCubic);
      tl.to(p, 'rootRz', () => p.rootRz, 0, 1.6, easeInOutCubic);
    });
  }

  /** A3：整理盔甲 0.8s（右肩 + 2 次拍胸） */
  private animArmorFiddle(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, -0.2, 0.3, easeOutCubic);
        b.to(p, 'armRx', () => p.armRx, -0.05, 0.3);
      });
      tl.to(p, 'handRrx', () => p.handRrx, -0.25, 0.1, easeOutCubic);
      tl.to(p, 'handRrx', () => p.handRrx, 0, 0.1, easeInOutCubic);
      tl.to(p, 'handRrx', () => p.handRrx, -0.25, 0.1, easeOutCubic);
      tl.to(p, 'handRrx', () => p.handRrx, 0, 0.1, easeInOutCubic);
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, 0.55, 0.3, easeInOutCubic);
        b.to(p, 'armRx', () => p.armRx, -0.15, 0.3, easeInOutCubic);
      });
    });
  }

  /** 站立（03 §6.2 注：根 y→1.35 + 躯干后仰 5° + 手下垂） */
  private animStandUp(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'rootY', () => p.rootY, 1.35, 0.6, easeOutCubic);
        b.to(p, 'torsoRx', () => p.torsoRx, -0.09, 0.6, easeOutCubic);
        b.to(p, 'armRx', () => p.armRx, 0.35, 0.6, easeOutCubic);
        b.to(p, 'armLx', () => p.armLx, 0.35, 0.6, easeOutCubic);
        b.to(p, 'armRz', () => p.armRz, 0.12, 0.6);
        b.to(p, 'armLz', () => p.armLz, -0.12, 0.6);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.25, 0.6);
        b.to(p, 'elbowLx', () => p.elbowLx, 0.25, 0.6);
        b.to(p, 'headRx', () => p.headRx, 0.05, 0.6);
      });
      tl.call(() => this.rig.showSword(true));
    });
  }

  /** A5 前半：抬臂蓄力 + 剑 glow（OutBack） */
  private animSwordRaise(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'armRx', () => p.armRx, -1.55, 0.5, easeOutBack);
        b.to(p, 'armRz', () => p.armRz, 0.85, 0.5, easeOutBack);
        b.to(p, 'elbowRx', () => p.elbowRx, -0.7, 0.5);
        b.to(p, 'swordGlow', () => p.swordGlow, 1, 0.4);
      });
      tl.to(p, 'handRrz', () => p.handRrz, -0.6, 0.4);
    });
  }

  /** A5 完整：蓄力 → 横扫 60°→-60° → 收臂；出手瞬间火花 + 预警环 */
  private animAttack(): void {
    this.anim((tl, p) => {
      this.triggerTelegraph();
      tl.parallel((b) => {
        b.to(p, 'armRx', () => p.armRx, -1.7, 0.5, easeOutBack);
        b.to(p, 'armRz', () => p.armRz, 0.9, 0.5, easeOutBack);
        b.to(p, 'elbowRx', () => p.elbowRx, -0.8, 0.5);
        b.to(p, 'swordGlow', () => p.swordGlow, 1, 0.4);
      });
      tl.parallel((b) => {
        b.to(p, 'armRx', () => p.armRx, 1.25, 0.8, easeInOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, 1.1, 0.8, easeInOutCubic);
        b.to(p, 'rootRz', () => p.rootRz, 0.14, 0.4, easeOutCubic);
        b.to(p, 'rootZ', () => p.rootZ, 0.18, 0.35, easeOutCubic);
      });
      tl.call(() => this.onSwordHit());
      tl.parallel((b) => {
        b.to(p, 'rootZ', () => p.rootZ, 0, 0.45);
        b.to(p, 'rootRz', () => p.rootRz, 0, 0.4);
        b.to(p, 'armRx', () => p.armRx, 0.35, 0.4, easeInOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.25, 0.4);
        b.to(p, 'armRz', () => p.armRz, 0.12, 0.4);
        b.to(p, 'swordGlow', () => p.swordGlow, 0.15, 0.4);
      });
    });
  }

  /** A7：跌倒 + 整理头发（3.35s 精确节拍，喜剧核心 1.15s 绝不动） */
  private animKnockdown(): void {
    this.anim((tl, p) => {
      // 0–0.7 踉跄 + 跌倒
      tl.parallel((b) => {
        b.to(p, 'rootZ', () => p.rootZ, 0.15, 0.35, easeInOutCubic);
        b.to(p, 'rootRx', () => p.rootRx, -1.31, 0.7, easeInCubic);
        b.to(p, 'rootY', () => p.rootY, 0.35, 0.7, easeInCubic);
        b.to(p, 'headRz', () => p.headRz, 0.26, 0.7);
        b.to(p, 'swordGlow', () => p.swordGlow, 0, 0.2);
        b.to(p, 'armRx', () => p.armRx, -0.4, 0.5);
      });
      // 0.7–1.15 趴地静止（披风 settle）
      tl.to(p, 'capeRz', () => p.capeRz, 0.12, 0.3, easeOutCubic);
      tl.wait(0.15);
      // 1.15–1.37 右手到头部（喜剧 beat）
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, 1.35, 0.22, easeOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, -1.2, 0.22, easeOutCubic);
        b.to(p, 'handRPx', () => p.handRPx, 0.05, 0.22);
        b.to(p, 'handRPy', () => p.handRPy, -0.42, 0.22);
        b.to(p, 'handRPz', () => p.handRPz, 0.18, 0.22);
        b.to(p, 'headRx', () => p.headRx, -0.17, 0.22, easeOutCubic);
      });
      // 1.37–1.87 捋发 2 下（4Hz）
      tl.to(p, 'handRrz', () => p.handRrz, 0.1, 0.125, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, -0.1, 0.25, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, 0.1, 0.25, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, 0, 0.125, easeInOutCubic);
      // 1.87–2.15 收手抬头
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, 0.55, 0.28, easeInOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.3, 0.28);
        b.to(p, 'handRPx', () => p.handRPx, 0, 0.28);
        b.to(p, 'handRPy', () => p.handRPy, 0, 0.28);
        b.to(p, 'handRPz', () => p.handRPz, 0, 0.28);
        b.to(p, 'headRx', () => p.headRx, -0.05, 0.28);
        b.to(p, 'headRz', () => p.headRz, 0, 0.28);
      });
      // 2.15–2.95 起身 + 左手撑膝
      tl.parallel((b) => {
        b.to(p, 'rootY', () => p.rootY, 1.0, 0.7, easeOutCubic);
        b.to(p, 'rootRx', () => p.rootRx, 0, 0.7, easeOutCubic);
        b.to(p, 'rootZ', () => p.rootZ, 0, 0.7, easeOutCubic);
        b.to(p, 'armLx', () => p.armLx, 0.65, 0.35, easeOutCubic);
      });
      tl.to(p, 'armLx', () => p.armLx, 0.35, 0.35, easeInOutCubic);
      // 2.95–3.35 整理盔甲收尾（幅度 ×0.7）
      tl.to(p, 'armRz', () => p.armRz, 0.4, 0.2, easeOutCubic);
      tl.to(p, 'armRz', () => p.armRz, 0.55, 0.4, easeInOutCubic);
    });
  }

  /** 整理头发 1.5s（HIT→RECOVER，GDD 情感节拍 3:00） */
  private animHairTidy(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, 1.2, 0.35, easeOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, -1.0, 0.35);
        b.to(p, 'handRPx', () => p.handRPx, 0.04, 0.35);
        b.to(p, 'handRPy', () => p.handRPy, -0.38, 0.35);
        b.to(p, 'handRPz', () => p.handRPz, 0.12, 0.35);
        b.to(p, 'headRx', () => p.headRx, -0.12, 0.35);
      });
      tl.to(p, 'handRrz', () => p.handRrz, 0.08, 0.15, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, -0.08, 0.3, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, 0.08, 0.3, easeInOutCubic);
      tl.to(p, 'handRrz', () => p.handRrz, 0, 0.15, easeInOutCubic);
      tl.parallel((b) => {
        b.to(p, 'armRz', () => p.armRz, 0.55, 0.4, easeInOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.3, 0.4);
        b.to(p, 'handRPx', () => p.handRPx, 0, 0.4);
        b.to(p, 'handRPy', () => p.handRPy, 0, 0.4);
        b.to(p, 'handRPz', () => p.handRPz, 0, 0.4);
        b.to(p, 'headRx', () => p.headRx, -0.05, 0.4);
      });
    });
  }

  /** 出戏 0.5s：踉跄 + 挥臂 */
  private animBreakCharacter(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'rootRx', () => p.rootRx, 0.3, 0.18, easeInCubic);
        b.to(p, 'rootZ', () => p.rootZ, -0.2, 0.18, easeInCubic);
        b.to(p, 'armRx', () => p.armRx, -1.5, 0.12, easeOutCubic);
        b.to(p, 'armRz', () => p.armRz, 0.9, 0.12);
        b.to(p, 'armLx', () => p.armLx, -1.2, 0.12, easeOutCubic);
      });
      tl.parallel((b) => {
        b.to(p, 'rootRx', () => p.rootRx, 0, 0.32, easeOutCubic);
        b.to(p, 'rootZ', () => p.rootZ, 0, 0.32);
        b.to(p, 'armRx', () => p.armRx, 0.35, 0.3, easeInOutCubic);
        b.to(p, 'armRz', () => p.armRz, 0.12, 0.3);
        b.to(p, 'armLx', () => p.armLx, 0.35, 0.3, easeInOutCubic);
        b.to(p, 'armLz', () => p.armLz, -0.12, 0.3);
      });
    });
  }

  /** 恐慌崩溃：原地跪下喘息 2s（PANIC_KNEEL_TIME） */
  private animKneelPanic(): void {
    this.anim((tl, p) => {
      tl.parallel((b) => {
        b.to(p, 'rootY', () => p.rootY, 0.45, 0.5, easeInCubic);
        b.to(p, 'rootRx', () => p.rootRx, -1.15, 0.5, easeInCubic);
        b.to(p, 'headRx', () => p.headRx, -0.5, 0.5, easeInCubic);
        b.to(p, 'armLx', () => p.armLx, 0.75, 0.4, easeOutCubic);
        b.to(p, 'armRx', () => p.armRx, 0.75, 0.4, easeOutCubic);
        b.to(p, 'armRz', () => p.armRz, -0.3, 0.4);
        b.to(p, 'armLz', () => p.armLz, 0.3, 0.4);
      });
      tl.wait(0.9);
      tl.parallel((b) => {
        b.to(p, 'rootY', () => p.rootY, 1.0, 0.6, easeOutCubic);
        b.to(p, 'rootRx', () => p.rootRx, 0, 0.6, easeOutCubic);
        b.to(p, 'headRx', () => p.headRx, -0.05, 0.6);
        b.to(p, 'armLx', () => p.armLx, 0.35, 0.5);
        b.to(p, 'armRx', () => p.armRx, 0.35, 0.5);
        b.to(p, 'armRz', () => p.armRz, 0.12, 0.5);
        b.to(p, 'armLz', () => p.armLz, -0.12, 0.5);
      });
    });
  }

  /** 捡剑 1.2s（SWORD_PICKUP_TIME）：俯身 → 拾起 → 归位 */
  private animPickUpSword(): void {
    this.anim((tl, p) => {
      tl.call(() => this.rig.showSword(false));
      tl.parallel((b) => {
        b.to(p, 'torsoRx', () => p.torsoRx, 0.5, 0.45, easeOutCubic);
        b.to(p, 'armRx', () => p.armRx, -1.85, 0.45, easeOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, -1.3, 0.45);
        b.to(p, 'handRPy', () => p.handRPy, -0.12, 0.45);
        b.to(p, 'headRx', () => p.headRx, -0.3, 0.45);
      });
      tl.wait(0.3);
      tl.call(() => this.rig.showSword(true));
      tl.parallel((b) => {
        b.to(p, 'torsoRx', () => p.torsoRx, 0.02, 0.45, easeInOutCubic);
        b.to(p, 'armRx', () => p.armRx, 0.35, 0.45, easeInOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.25, 0.45);
        b.to(p, 'handRPy', () => p.handRPy, 0, 0.45);
        b.to(p, 'headRx', () => p.headRx, -0.05, 0.45);
      });
    });
  }

  /** A8：鞠躬谢幕 3.0s（烛光 ×1.15 + Bloom 0.7） */
  private animBow(): void {
    this.anim((tl, p) => {
      tl.call(() => {
        this.bowBoost = true;
        this.postfx.setBloomPulse(0.15);
      });
      tl.parallel((b) => {
        b.to(p, 'rootRx', () => p.rootRx, 0.49, 1.1, easeOutCubic);
        b.to(p, 'armRz', () => p.armRz, 0.9, 0.9, easeOutCubic);
        b.to(p, 'elbowRx', () => p.elbowRx, -0.8, 0.9);
        b.to(p, 'handRrz', () => p.handRrz, -1.4, 0.9);
        b.to(p, 'headRx', () => p.headRx, -0.35, 1.1, easeOutCubic);
        b.to(p, 'armLz', () => p.armLz, -0.3, 0.9);
      });
      tl.wait(1.0);
      tl.parallel((b) => {
        b.to(p, 'rootRx', () => p.rootRx, 0, 0.9, easeInCubic);
        b.to(p, 'armRz', () => p.armRz, 0.12, 0.9);
        b.to(p, 'elbowRx', () => p.elbowRx, 0.25, 0.9);
        b.to(p, 'handRrz', () => p.handRrz, 0, 0.9);
        b.to(p, 'headRx', () => p.headRx, -0.05, 0.9);
        b.to(p, 'armLz', () => p.armLz, -0.12, 0.9);
      });
      tl.call(() => {
        this.bowBoost = false;
      });
    });
  }

  private triggerTelegraph(): void {
    this.telegraphTimer = 0.9;
  }

  private onSwordHit(): void {
    const tip = new THREE.Vector3();
    this.rig.swordTipWorld(tip);
    this.particles.spawn({ x: tip.x, y: tip.y, z: tip.z }, hexToRgb(C.blood), 22, {
      speed: 5, life: [0.3, 0.55], size: [0.03, 0.06], gravity: 6, spread: 1.4,
    });
    this.shadow.flash();
  }

  // ============ 尺寸 / 释放 ============
  private resize(): void {
    const w = Math.max(1, this.renderer.domElement.clientWidth);
    const h = Math.max(1, this.renderer.domElement.clientHeight);
    this.renderer.setSize(w, h, false);
    this.postfx?.setSize(Math.floor(w * this.renderer.getPixelRatio()), Math.floor(h * this.renderer.getPixelRatio()));
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    window.removeEventListener('resize', this.onResize);
    this.tweenMgr.clear();
    this.rig.stopAnim();
    this.shadow.dispose();
    this.particles.dispose();
    this.postfx.dispose();
    const mats = new Set<THREE.Material>();
    const geos = new Set<THREE.BufferGeometry>();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh || (o as THREE.Points).isPoints) {
        const g = m.geometry as THREE.BufferGeometry;
        if (g) geos.add(g);
        const mat = m.material;
        if (Array.isArray(mat)) mat.forEach((x) => mats.add(x));
        else if (mat) mats.add(mat);
      }
      if (o instanceof THREE.Sprite) {
        const sm = o.material as THREE.SpriteMaterial;
        if (sm.map) sm.map.dispose();
        mats.add(sm);
      }
    });
    geos.forEach((g) => g.dispose());
    mats.forEach((mt) => {
      const anyMat = mt as THREE.MeshStandardMaterial;
      if (anyMat.map) anyMat.map.dispose();
      mt.dispose();
    });
    this.renderer.dispose();
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export type { EaseFn };



