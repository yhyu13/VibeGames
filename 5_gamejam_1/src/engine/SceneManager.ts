// engine/SceneManager.ts — 程序化王座厅/烛火/固定相机/Boss mesh+顶点动画/mesh 调和（03 §2–§8）
// 实现 EventConsumer：bossAnim → 动画，phase → 灯光/相机，fx → 后处理/粒子，explosion → Points 爆发。

import * as THREE from 'three';
import { WORLD } from '../core/world/world';
import type { SimState } from '../core/simulation/Simulation';
import type { EventConsumer, SimEvent } from '../core/simulation/events';
import type { AnxietyBand, BossAnimKind, FxKind, GamePhase, Vector3 } from '../core/types';
import { MAX_PARTICLES } from '../core/constants';
import {
  clamp,
  easeInCubic,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  lerp,
  mulberry32,
} from '../core/math';
import { damp, TweenManager } from './Tween';
import { Postfx } from './postfx';
import { PlayerShadow } from './PlayerShadow';

// ============ 调色板（03 §3.1，精确 hex） ============
const C = {
  night: 0x0b1026, stone: 0x1a2138, stoneLight: 0x232b4a, dark: 0x0a0e22,
  flame: 0xff9e4f, flameCore: 0xffb066,
  blood: 0xff2e3f, bloodDark: 0x8b0000,
  gold: 0xc9a227,
  steelDark: 0x2e3954, steelLight: 0x4a5878,
  glass: 0x9fd8ff, skin: 0x8a6e5e, skinBright: 0x9a7f6e,
  book1: 0x4a3326, book2: 0x5c4433, book3: 0x3a2a1e,
  clothRed: 0x5a1626, wax: 0xe8d9b0, horn: 0x3e3a34,
  windowLight: 0x5a7bb0, beard: 0x2b2e3a,
} as const;

const PLAYER_NAMES = ['无名骑士', '阿汤', '卷毛', 'Tian', 'Luna', 'Pro-2049', '小哑', 'HAT'] as const;

const BAND_TREMOR: Record<AnxietyBand, { amp: number; freq: number; head: number }> = {
  calm: { amp: 0, freq: 0, head: 0 },
  nervous: { amp: 0.01, freq: 1.5, head: 0.005 },
  shaky: { amp: 0.035, freq: 3.2, head: 0.02 },
  panic: { amp: 0.06, freq: 4.5, head: 0.03 },
};

const CANDLE_PHASE_MULT: Record<GamePhase, number> = {
  MENU: 0.5, WAIT: 1.0, SENSE: 1.1, PERFORM: 1.3,
  EVALUATE: 0.8, DIARY: 0.9, ENDING_NORMAL: 1.15, ENDING_HIDDEN: 1.0, PAUSE: 0.9,
};

// ============ 噪声（03 §4.1 烛火闪烁：hash + smoothstep 1D 值噪声） ============
function hash1(x: number): number {
  const s = Math.sin(x * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function valueNoise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return lerp(hash1(i), hash1(i + 1), u);
}

// ============ 程序化 Canvas 纹理（03 §9，启动时同步生成一次） ============
function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function floorTexture(): THREE.Texture {
  const [c, g] = makeCanvas(1024, 1024);
  g.fillStyle = '#0A0E22';
  g.fillRect(0, 0, 1024, 1024);
  g.fillStyle = '#101A3A';
  for (let y = 0; y < 1024; y += 64) g.fillRect(0, y, 1024, 1);
  for (let x = 0; x < 1024; x += 64) g.fillRect(x, 0, 1, 1024);
  const rng = mulberry32(0xb055);
  for (let i = 0; i < 1200; i++) {
    const v = Math.floor(rng() * 40);
    g.fillStyle = `rgba(${10 + v},${16 + v},${34 + v},0.5)`;
    g.fillRect(Math.floor(rng() * 1024), Math.floor(rng() * 1024), 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(24, 18.67); // 1.5m/格
  return t;
}

function rugTexture(): THREE.Texture {
  const [c, g] = makeCanvas(1024, 1024);
  const cx = 512;
  const rings = [470, 380, 300, 230, 150, 70];
  const colors = ['#6E1E2E', '#8A2A3A', '#6E1E2E', '#8A2A3A', '#6E1E2E', '#8A2A3A'];
  for (let i = 0; i < rings.length; i++) {
    g.beginPath();
    g.arc(cx, cx, rings[i], 0, Math.PI * 2);
    g.fillStyle = colors[i];
    g.fill();
  }
  g.beginPath();
  g.arc(cx, cx, 26, 0, Math.PI * 2);
  g.fillStyle = 'rgba(201,162,39,0.55)';
  g.fill();
  g.beginPath();
  g.arc(cx, cx, 96, 0, Math.PI * 2);
  g.lineWidth = 8;
  g.strokeStyle = 'rgba(201,162,39,0.35)';
  g.stroke();
  const fade = g.createRadialGradient(cx, cx, 400, cx, cx, 512);
  fade.addColorStop(0, 'rgba(0,0,0,0)');
  fade.addColorStop(1, 'rgba(10,14,34,1)');
  g.fillStyle = fade;
  g.beginPath();
  g.arc(cx, cx, 512, 0, Math.PI * 2);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function scratchTexture(): THREE.Texture {
  const [c, g] = makeCanvas(256, 256);
  const rng = mulberry32(Math.floor(Math.random() * 1e9));
  const draw = (): void => {
    g.fillStyle = '#49597A';
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 16; i++) {
      g.save();
      g.translate(128, 128);
      g.rotate(rng() * Math.PI);
      g.strokeStyle = `rgba(26,33,56,${0.5 + rng() * 0.4})`;
      g.lineWidth = 0.5 + rng() * 1.5;
      g.beginPath();
      g.moveTo(-128, 0);
      g.lineTo(128, 0);
      g.stroke();
      g.restore();
    }
    g.font = 'bold 22px "Microsoft YaHei", sans-serif';
    const names = [...PLAYER_NAMES].sort(() => rng() - 0.5).slice(0, 6);
    for (const name of names) {
      g.save();
      g.translate(20 + rng() * 200, 20 + rng() * 200);
      g.rotate((rng() - 0.5) * 0.28);
      g.fillStyle = 'rgba(199,211,232,0.8)';
      g.fillText(name, 0, 0);
      g.restore();
    }
  };
  draw();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function flameTexture(): THREE.Texture {
  const [c, g] = makeCanvas(128, 128);
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 62);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,217,160,0.9)');
  grad.addColorStop(0.7, 'rgba(255,158,79,0.45)');
  grad.addColorStop(1, 'rgba(255,122,47,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function windowTexture(): THREE.Texture {
  const [c, g] = makeCanvas(512, 512);
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0A0E22');
  grad.addColorStop(0.5, '#24324F');
  grad.addColorStop(1, '#5A7BB0');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = 'rgba(10,14,34,0.9)';
  g.lineWidth = 6;
  for (let i = 1; i < 4; i++) {
    g.beginPath();
    g.moveTo((512 / 4) * i, 0);
    g.lineTo((512 / 4) * i, 512);
    g.stroke();
  }
  for (let i = 1; i < 3; i++) {
    g.beginPath();
    g.moveTo(0, (512 / 3) * i);
    g.lineTo(512, (512 / 3) * i);
    g.stroke();
  }
  g.beginPath();
  g.arc(256, 256, 240, Math.PI, 0);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function dotTexture(): THREE.Texture {
  const [c, g] = makeCanvas(32, 32);
  const grad = g.createRadialGradient(16, 16, 1, 16, 16, 15);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ============ Boss 姿态（03 §7：pivot Group + damp 过渡） ============
interface BossPose {
  rootY: number; rootPitch: number; rootYaw: number; rootRoll: number;
  chestPitch: number;
  headPitch: number; headYaw: number; headRoll: number;
  shL: number; shLp: number; shR: number; shRp: number;
  elL: number; elR: number; hdL: number; hdR: number;
  cape: number; swordGlow: number; chestScaleY: number;
  [key: string]: number; // 兼容 Tween 的 Record<string, number> 目标
}
const NEUTRAL_POSE: BossPose = {
  rootY: 1, rootPitch: 0, rootYaw: 0, rootRoll: 0, chestPitch: 0,
  headPitch: 0, headYaw: 0, headRoll: 0,
  shL: 0, shLp: 0, shR: 0, shRp: 0, elL: 0, elR: 0, hdL: 0, hdR: 0,
  cape: 0, swordGlow: 0, chestScaleY: 1,
};
const POSE_KEYS = Object.keys(NEUTRAL_POSE) as (keyof BossPose)[];

interface ArmRig {
  group: THREE.Group;   // 肩 pivot（yaw：横扫）
  shoulder: THREE.Group; // 上臂 pivot（pitch：前伸/抬起）
  elbow: THREE.Group;
  hand: THREE.Group;
}

export class SceneManager implements EventConsumer {
  readonly scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private stageRing!: THREE.Mesh;
  private stageRingMat!: THREE.MeshBasicMaterial;
  private postfx: Postfx;
  private tweens = new TweenManager();
  private simStateRef: (() => Readonly<SimState>) | null;
  private shadow: PlayerShadow;
  private sceneTime = 0;

  // 灯光
  private candleLight!: THREE.PointLight;
  private candleAnchor = new THREE.Vector3();
  private mainFlame!: THREE.Sprite;
  private flameMat!: THREE.SpriteMaterial;
  private flamePhase = Math.random() * Math.PI * 2;
  private candlePhaseMult = 1;
  private sweep!: THREE.SpotLight;
  private sweepInt = { v: 0 };

  // 相机（03 §5）
  private cameraBasePos = new THREE.Vector3(8.2, 5.2, 7.2);
  private cameraLookAt = new THREE.Vector3(-4.2, 1.2, 0.4);
  private cameraHitPulse = 0;
  private cameraTremorPhase = Math.random() * Math.PI * 2;
  private fovCurrent = 40;
  private camPos = new THREE.Vector3();
  private camOffset = new THREE.Vector3();
  private camLook = new THREE.Vector3();

  // Boss
  private bossRoot!: THREE.Group;
  private bodyGroup!: THREE.Group;
  private chestGroup!: THREE.Group;
  private headPivot!: THREE.Group;
  private capePivot!: THREE.Group;
  private armL!: ArmRig;
  private armR!: ArmRig;
  private chestMat!: THREE.MeshStandardMaterial;
  private swordGlowMat!: THREE.MeshBasicMaterial;
  private chestPulse = { e: 0 };
  private pose: BossPose = { ...NEUTRAL_POSE };
  private poseTarget: BossPose = { ...NEUTRAL_POSE };
  private currentAnim: BossAnimKind = 'idleSway';
  private lastAnim: BossAnimKind = 'idleSway';
  private lastPhase: GamePhase = 'MENU';
  private lastHp = 100;
  private anxietyBand: AnxietyBand = 'calm';
  private tremorAmp = 0;
  private tremorPhase = Math.random() * Math.PI * 2;
  private tremorTimer = 0;

  // 粒子
  private burstPoints!: THREE.Points;
  private burstPos!: Float32Array;
  private burstVel!: Float32Array;
  private burstCol!: Float32Array;
  private burstLife!: Float32Array;
  private burstActive = 0;
  private dustPoints!: THREE.Points;
  private dustPos!: Float32Array;
  private dustVel!: Float32Array;
  private dustLife!: Float32Array;

  private mats: Record<string, THREE.Material>;

  constructor(renderer: THREE.WebGLRenderer, getSimState?: () => Readonly<SimState>) {
    this.renderer = renderer;
    this.simStateRef = getSimState ?? null;
    this.scene = new THREE.Scene();
    this.scene.name = 'throneRoom';
    this.scene.background = new THREE.Color(C.dark);
    this.scene.fog = new THREE.Fog(C.dark, 12, 44);

    const tex = {
      floor: floorTexture(),
      rug: rugTexture(),
      scratch: scratchTexture(),
      flame: flameTexture(),
      window: windowTexture(),
      dot: dotTexture(),
    };
    this.mats = this.buildMaterials(tex);
    this.candleAnchor.copy(WORLD.lightAnchors.candle);

    this.buildLights();
    this.buildRoom();
    const boss = this.buildBoss();
    this.bossRoot = boss.root;
    this.bodyGroup = boss.body;
    this.chestGroup = boss.chest;
    this.headPivot = boss.head;
    this.capePivot = boss.cape;
    this.armL = boss.armL;
    this.armR = boss.armR;
    this.chestMat = boss.chestMat;
    this.swordGlowMat = boss.glowMat;
    this.scene.add(this.bossRoot);

    this.shadow = new PlayerShadow();
    this.scene.add(this.shadow.group);

    this.burstPoints = this.buildBurstPool();
    this.dustPoints = this.buildDustPool();
    this.scene.add(this.burstPoints, this.dustPoints);

    // 走位目标圈（move beat 的落点指示）
    this.stageRing = new THREE.Mesh(
      new THREE.RingGeometry(1.15, 1.6, 48),
      new THREE.MeshBasicMaterial({ color: 0xff9a3c, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }),
    );
    this.stageRing.rotation.x = -Math.PI / 2;
    this.stageRing.position.y = 0.04;
    this.stageRing.visible = false;
    this.stageRing.renderOrder = 5;
    this.scene.add(this.stageRing);
    this.stageRingMat = this.stageRing.material as THREE.MeshBasicMaterial;

    const aspect = renderer.domElement.width / Math.max(1, renderer.domElement.height);
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.5, 80);
    this.camera.position.copy(this.cameraBasePos);
    this.camera.lookAt(this.cameraLookAt);
    this.postfx = new Postfx(renderer, this.scene, this.camera, renderer.domElement.width, renderer.domElement.height);
  }

  // ============ 公共 API ============
  setSimStateRef(ref: () => Readonly<SimState>): void {
    this.simStateRef = ref;
  }

  /** 焦虑代理（devtools/调试用；常规路径每帧从 sim 读取） */
  setAnxiety(band: AnxietyBand): void {
    this.anxietyBand = band;
  }

  resize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
    this.postfx.setSize(width, height);
  }

  dispose(): void {
    this.postfx.dispose();
  }

  // ============ EventConsumer ============
  onSimEvent(e: SimEvent): void {
    switch (e.type) {
      case 'bossAnim':
        this.playAnim(e.anim);
        break;
      case 'phase':
        this.onPhaseChange(e.phase);
        break;
      case 'fx':
        this.handleFx(e.fx, e.pos, e.value);
        break;
      case 'explosion':
        this.spawnBurst(e.pos, 24, e.color, 5);
        break;
      default:
        // sound/music/dialogue/barrage/rating/persist → 由其他适配层消费
        break;
    }
  }

  // ============ 渲染 ============
  render(dt: number): void {
    this.sceneTime += dt;
    this.tweens.update(dt);
    this.syncSim(dt);
    this.applyPose(dt);
    this.updateIdleMotion();
    this.updateTremor();
    this.updateCandle();
    this.updateCamera();
    this.updateBursts(dt);
    this.updateDust(dt);
    this.sweep.intensity = this.sweepInt.v;
    this.postfx.update(dt);
    this.postfx.render();
  }

  // ============ 材质（03 §6.4） ============
  private buildMaterials(tex: { floor: THREE.Texture; rug: THREE.Texture; scratch: THREE.Texture; flame: THREE.Texture; window: THREE.Texture; dot: THREE.Texture }): Record<string, THREE.Material> {
    const std = (color: number, roughness: number, metalness: number, extra?: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    this.flameMat = new THREE.SpriteMaterial({
      map: tex.flame,
      color: C.flame,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    return {
      M01: std(C.stone, 0.9, 0.05),
      M02: std(C.stoneLight, 0.85, 0.1),
      M03: std(C.book1, 0.6, 0.15),
      M04: std(C.book1, 0.55, 0.2),
      M05: std(C.gold, 0.4, 0.85),
      M06: std(C.steelDark, 0.45, 0.75),
      M07: std(C.steelLight, 0.4, 0.8),
      M08: std(0x49597a, 0.45, 0.7, { map: tex.scratch }),
      M09: std(C.clothRed, 0.8, 0.1),
      M10: std(0xffffff, 0.9, 0.05, { map: tex.rug }),
      M11: std(C.wax, 0.35, 0),
      M12: new THREE.MeshBasicMaterial({ color: C.flameCore, map: tex.flame, transparent: true, depthWrite: false, toneMapped: false }),
      M13: std(C.horn, 0.5, 0.3),
      M14: std(C.skin, 0.65, 0.05),
      M15: std(C.glass, 0.1, 0, { transparent: true, opacity: 0.35, depthWrite: false }),
      M16: new THREE.MeshBasicMaterial({ color: C.windowLight, map: tex.window, toneMapped: false }),
      floor: std(0xffffff, 0.9, 0.05, { map: tex.floor }),
      beard: std(C.beard, 0.6, 0.2),
      callus: std(C.skinBright, 0.65, 0.05),
      swordGlow: new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
      doorHole: new THREE.MeshBasicMaterial({ color: 0x05070a }),
      dust: new THREE.PointsMaterial({ color: 0xffd9a0, size: 0.06, map: tex.dot, transparent: true, opacity: 0.06, depthWrite: false, sizeAttenuation: true }),
      burst: new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, map: tex.dot, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: true, sizeAttenuation: true }),
    };
  }

  private std(key: string): THREE.MeshStandardMaterial {
    return this.mats[key] as THREE.MeshStandardMaterial;
  }

  // ============ 灯光（03 §4） ============
  private buildLights(): void {
    this.candleLight = new THREE.PointLight(C.flame, 50, 22, 2);
    this.candleLight.position.copy(this.candleAnchor);
    this.scene.add(this.candleLight);

    const dir = new THREE.DirectionalLight(0x6e8fbf, 0.35);
    dir.position.set(-6, 9, 2);
    dir.target.position.set(-2, 1, -4);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.left = -14;
    dir.shadow.camera.right = 14;
    dir.shadow.camera.top = 14;
    dir.shadow.camera.bottom = -14;
    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 30;
    dir.shadow.bias = -0.0005;
    dir.shadow.normalBias = 0.02;
    this.scene.add(dir, dir.target);

    this.scene.add(new THREE.HemisphereLight(0x2a3e66, 0x0a0c16, 0.35));
    this.scene.add(new THREE.AmbientLight(0x141b33, 0.25));

    this.sweep = new THREE.SpotLight(0xffd9a0, 0, 30, 0.65, 0.5);
    this.sweep.position.copy(WORLD.lightAnchors.spot);
    this.sweep.target.position.set(-2, 0, 0);
    this.scene.add(this.sweep, this.sweep.target);
  }

  // ============ 房间（03 §2，房间尺寸用 WORLD.roomBounds） ============
  private buildRoom(): void {
    const room = new THREE.Group();
    room.name = 'room';

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(36, 28), this.std('floor'));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

    const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(36, 10), this.std('M01'));
    wallBack.position.set(0, 5, -14);
    room.add(wallBack);
    const wallSideGeo = new THREE.PlaneGeometry(28, 10);
    const wallLeft = new THREE.Mesh(wallSideGeo, this.std('M01'));
    wallLeft.position.set(-18, 5, 0);
    wallLeft.rotation.y = Math.PI / 2;
    room.add(wallLeft);
    const wallRight = new THREE.Mesh(wallSideGeo, this.std('M01'));
    wallRight.position.set(18, 5, 0);
    wallRight.rotation.y = -Math.PI / 2;
    room.add(wallRight);

    // 柱子 ×4（位置 = WORLD.colliders）
    for (const col of WORLD.colliders) {
      const g = new THREE.Group();
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 8, 10), this.std('M01'));
      cyl.position.y = 4;
      cyl.castShadow = true;
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.3, 1.1), this.std('M02'));
      base.position.y = 0.15;
      base.castShadow = true;
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, 1.0), this.std('M02'));
      cap.position.y = 8.15;
      g.add(cyl, base, cap);
      g.position.set(col.center.x, 0, col.center.z);
      room.add(g);
    }

    // 台阶（王座前，面向 +z）
    const lower = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.2, 4.5), this.std('M01'));
    lower.position.set(-8, 0.1, 1.6);
    lower.castShadow = true;
    lower.receiveShadow = true;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 3.4), this.std('M01'));
    upper.position.set(-8, 0.3, 1.1);
    upper.castShadow = true;
    upper.receiveShadow = true;
    room.add(lower, upper);

    this.buildThrone(room);
    this.buildShelf(room);
    this.buildChains(room);
    this.buildWindows(room);
    this.buildDoor(room);
    this.buildCandles(room);

    const rug = new THREE.Mesh(new THREE.CircleGeometry(4.4, 32), this.std('M10'));
    rug.rotation.x = -Math.PI / 2;
    rug.scale.set(1, 1, 0.72);
    rug.position.set(-4, 0.012, 0);
    rug.receiveShadow = true;
    room.add(rug);

    this.scene.add(room);
  }

  private buildThrone(room: THREE.Group): void {
    const throne = new THREE.Group();
    throne.name = 'throne';
    throne.position.set(-8, 0.45, -0.4); // 座面顶 ≈ y 1.0 = Boss 髋部
    const M01 = this.std('M01');
    const M02 = this.std('M02');
    const M05 = this.std('M05');
    const M09 = this.std('M09');

    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 1.0), M01);
    seat.position.set(0, 0.42, 0.25);
    seat.castShadow = true;
    const seatGold = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 0.02), M05);
    seatGold.position.set(0, 0.55, 0.74);
    throne.add(seat, seatGold);
    for (const lx of [-0.48, 0.48]) {
      for (const lz of [0, 0.5]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.42, 8), M01);
        leg.position.set(lx, 0.21, lz);
        throne.add(leg);
      }
    }
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.8, 0.25), M01);
    back.position.set(0, 1.5, -0.35);
    back.rotation.x = 0.105;
    back.castShadow = true;
    throne.add(back);
    for (const sx of [-0.52, -0.26, 0, 0.26, 0.52]) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 6), M02);
      spike.position.set(sx, 2.6, -0.42);
      throne.add(spike);
    }
    for (const s of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.35), M01);
      arm.position.set(0.85 * s, 0.72, 0.25);
      const armGold = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.35), M05);
      armGold.position.set(0.85 * s, 0.78, 0.25);
      const armLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8), M01);
      armLeg.position.set(0.85 * s, 0.21, 0.25);
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.08), M02);
      wing.position.set(0.92 * s, 1.45, -0.35);
      wing.rotation.z = -0.44 * s;
      throne.add(arm, armGold, armLeg, wing);
    }
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.6, 8), M05);
    crown.position.set(0, 3.2, -0.35);
    const crownBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.7), M05);
    crownBase.position.set(0, 2.95, -0.35);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 0.9), M09);
    cushion.position.set(0, 0.48, 0.27);
    throne.add(crown, crownBase, cushion);
    room.add(throne);
  }

  private buildShelf(room: THREE.Group): void {
    const shelf = new THREE.Group();
    shelf.name = 'archive';
    const wood = this.std('M03');
    for (const sx of [-1.6, 1.6]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.6, 0.7), wood);
      side.position.set(sx, 1.3, 0);
      shelf.add(side);
    }
    for (const sy of [0.56, 1.16, 1.76, 2.36]) {
      const board = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.7), wood);
      board.position.set(0, sy, 0);
      shelf.add(board);
    }
    const back = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.6, 0.03), wood);
    back.position.set(0, 1.3, -0.35);
    shelf.add(back);
    shelf.position.set(2.2, 0, -12.6);
    shelf.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = true;
    });
    room.add(shelf);

    // 24 本书 InstancedMesh（03 §2.1：每层 6 本，±6° 随机旋转，3 色变体）
    const bookGeo = new THREE.BoxGeometry(0.12, 0.25, 0.08);
    const books = new THREE.InstancedMesh(bookGeo, this.std('M04'), 24);
    const dummy = new THREE.Object3D();
    const rng = mulberry32(0xb00b);
    const variants = [C.book1, C.book2, C.book3];
    let idx = 0;
    for (const level of [0.56, 1.16, 1.76, 2.36]) {
      for (let i = 0; i < 6; i++) {
        dummy.position.set(-1.45 + i * 0.58, level + 0.13, 0.3);
        dummy.rotation.y = (rng() - 0.5) * 0.21;
        dummy.updateMatrix();
        books.setMatrixAt(idx, dummy.matrix);
        books.setColorAt(idx, new THREE.Color(variants[Math.floor(rng() * 3)]));
        idx++;
      }
    }
    if (books.instanceColor) books.instanceColor.needsUpdate = true;
    shelf.add(books);
  }

  private buildChains(room: THREE.Group): void {
    const chainGeo = new THREE.TorusGeometry(0.09, 0.025, 8, 12);
    const chains = new THREE.InstancedMesh(chainGeo, this.std('M01'), 20);
    const dummy = new THREE.Object3D();
    for (let c = 0; c < 2; c++) {
      const sx = c === 0 ? 0.5 : -8.5;
      for (let i = 0; i < 10; i++) {
        dummy.position.set(sx, 8.5 - i * 0.2, -13.6);
        dummy.rotation.y = Math.PI / 2 + i * 0.4;
        dummy.updateMatrix();
        chains.setMatrixAt(c * 10 + i, dummy.matrix);
      }
    }
    room.add(chains);
  }

  private buildWindows(room: THREE.Group): void {
    for (const wx of [-0.5, 5.5]) {
      const win = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.4), this.mats.M16);
      glass.position.set(0, 1.7, 0);
      const archGlass = new THREE.Mesh(new THREE.CircleGeometry(0.8, 16), this.mats.M16);
      archGlass.position.set(0, 3.4, 0);
      for (const sx of [-0.85, 0.85]) {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.5, 0.12), this.std('M01'));
        frame.position.set(sx, 1.7, 0.02);
        win.add(frame);
      }
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 0.12), this.std('M01'));
      top.position.set(0, 3.35, 0.02);
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.1, 6, 14, Math.PI), this.std('M01'));
      arch.position.set(0, 3.4, 0.02);
      arch.rotation.z = Math.PI;
      win.add(glass, archGlass, top, arch);
      win.position.set(wx, 2.6, -13.92);
      room.add(win);
    }
  }

  private buildDoor(room: THREE.Group): void {
    const door = new THREE.Group();
    const hole = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 3.2), this.mats.doorHole);
    hole.rotation.y = -Math.PI / 2;
    hole.position.set(0, 1.6, 0);
    for (const sy of [0, 1.6]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.25, sy === 0 ? 3.2 : 0.7, 0.25), this.std('M01'));
      side.position.set(sy === 0 ? -0.95 : 0, sy === 0 ? 1.6 : 3.5, 0);
      door.add(side);
    }
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.2, 0.25), this.std('M01'));
    right.position.set(0.95, 1.6, 0);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.25, 6, 12, Math.PI), this.std('M01'));
    arch.position.set(0, 3.2, 0);
    arch.rotation.z = Math.PI;
    door.add(hole, right, arch);
    door.position.set(17.8, 0, 2);
    room.add(door);
  }

  private buildCandles(room: THREE.Group): void {
    const spots: { x: number; y: number; z: number; main?: boolean }[] = [
      { x: -5.6, y: 0.45, z: -4.6 },
      { x: -2.8, y: 0.45, z: -4.6 },
      { x: -7.6, y: 1.4, z: -13.4 },
      { x: 0.2, y: 1.4, z: -13.4 },
      { x: 6.6, y: 1.4, z: -13.4 },
      { x: 17.6, y: 1.5, z: -3 },
      { x: this.candleAnchor.x, y: this.candleAnchor.y - 0.37, z: this.candleAnchor.z, main: true },
    ];
    for (const s of spots) {
      const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, 0.35, 10), this.std('M11'));
      wax.position.set(s.x, s.y + 0.175, s.z);
      const saucer = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.03, 10), this.std('M02'));
      saucer.position.set(s.x, s.y - 0.015, s.z);
      const flame = new THREE.Sprite(this.flameMat);
      flame.position.set(s.x, s.y + 0.37, s.z);
      flame.scale.setScalar(0.16);
      flame.renderOrder = 2;
      room.add(wax, saucer, flame);
      if (s.main) this.mainFlame = flame;
      // 主烛台支杆（lightAnchors.candle 处）
      if (s.main) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, this.candleAnchor.y - 0.37, 8), this.std('M02'));
        pole.position.set(s.x, (this.candleAnchor.y - 0.37) / 2, s.z);
        room.add(pole);
      }
    }
    // 侧墙烛台（右墙）挂墙小碟
  }

  // ============ Boss（03 §6.2，局部坐标根 = 髋部 y=0） ============
  private buildBoss(): {
    root: THREE.Group; body: THREE.Group; chest: THREE.Group; head: THREE.Group;
    cape: THREE.Group; armL: ArmRig; armR: ArmRig;
    chestMat: THREE.MeshStandardMaterial; glowMat: THREE.MeshBasicMaterial; glowMesh: THREE.Mesh;
  } {
    const root = new THREE.Group();
    root.name = 'boss';
    root.position.set(WORLD.thronePos.x, 1, WORLD.thronePos.z);

    const body = new THREE.Group();
    body.name = 'bossBody';
    const M06 = this.std('M06');

    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.4), M06);
    skirt.position.set(0, 0.05, 0.02);
    body.add(skirt);

    const chest = new THREE.Group();
    chest.position.set(0, 0.68, 0);
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.0, 0.5), M06);
    chest.add(torso);
    const breast = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.55, 0.28), this.std('M08'));
    breast.position.set(0, 0.27, 0.16);
    const chestMat = breast.material as THREE.MeshStandardMaterial;
    chest.add(breast);
    const ribMat = this.std('M07');
    for (let i = 0; i < 3; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.06, 0.3), ribMat);
      rib.position.set(0, 0.1 + i * 0.14, 0.18);
      chest.add(rib);
    }
    body.add(chest);

    const head = new THREE.Group();
    head.position.set(0, 1.52, 0.02);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.31, 14, 12), this.std('M14'));
    skull.scale.set(0.92, 1.06, 0.92);
    head.add(skull);
    const hornMat = this.std('M13');
    for (const s of [1, -1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 6), hornMat);
      horn.position.set(0.2 * s, 0.3, 0.02);
      horn.rotation.z = -0.5 * s;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 6), hornMat);
      tip.position.set(0.26 * s, 0.56, 0.03);
      tip.rotation.z = -0.5 * s;
      head.add(horn, tip);
    }
    for (const s of [1, -1]) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.06, 0.02), hornMat);
      frame.position.set(0.12 * s, 0.04, 0.26);
      const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.1), this.std('M15'));
      lens.position.set(0.12 * s, 0.04, 0.28);
      head.add(frame, lens);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.02), hornMat);
    bridge.position.set(0, 0.04, 0.26);
    const beard = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.1), this.std('beard'));
    beard.position.set(0, -0.22, 0.24);
    head.add(bridge, beard);
    body.add(head);

    const armL = this.buildArm(-1);
    const armR = this.buildArm(1);
    body.add(armL.group, armR.group);

    // 剑（右手，刃沿 +x）
    const sword = new THREE.Group();
    sword.position.set(0.3, 0.05, 0.15);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.03), this.std('M07'));
    blade.position.x = 0.65;
    const glowMat = this.mats.swordGlow as THREE.MeshBasicMaterial;
    const glowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.1), glowMat);
    glowMesh.position.set(0.62, 0, 0.02);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.05), this.std('M05'));
    guard.position.x = 0.02;
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.2, 8), hornMat);
    grip.position.x = -0.1;
    sword.add(blade, glowMesh, guard, grip);
    armR.hand.add(sword);

    // 披风
    const cape = new THREE.Group();
    cape.position.set(0, 0, -0.34);
    const capeCone = new THREE.Mesh(new THREE.ConeGeometry(0.78, 1.45, 12, 1, true), this.std('M09'));
    capeCone.position.y = 0.62;
    const capeLiner = new THREE.Mesh(new THREE.ConeGeometry(0.74, 1.4, 12, 1, true), M06);
    capeLiner.position.y = 0.6;
    capeLiner.scale.z = 0.9;
    cape.add(capeCone, capeLiner);
    body.add(cape);

    root.add(body);
    root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && o !== glowMesh) o.castShadow = true;
    });
    chestMat.emissive = new THREE.Color(C.blood);
    chestMat.emissiveIntensity = 0;
    return { root, body, chest, head, cape, armL, armR, chestMat, glowMat, glowMesh };
  }

  private buildArm(s: number): ArmRig {
    const group = new THREE.Group();
    group.position.set(0.55 * s, 1.18, 0);
    const pauldron = new THREE.Mesh(new THREE.SphereGeometry(0.36, 12, 10), this.std('M07'));
    pauldron.scale.set(1, 0.72, 0.83);
    group.add(pauldron);
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 6), this.std('M02'));
    spike.position.set(0.17 * s, 0.17, 0);
    spike.rotation.z = -0.52 * s;
    group.add(spike);

    const shoulder = new THREE.Group();
    group.add(shoulder);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.52, 10), this.std('M06'));
    upper.position.y = -0.25;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.5;
    shoulder.add(elbow);
    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.46, 10), this.std('M06'));
    forearm.position.y = -0.23;
    elbow.add(forearm);

    const hand = new THREE.Group();
    hand.position.y = -0.46;
    elbow.add(hand);
    const handMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.14), this.std('M14'));
    hand.add(handMesh);
    for (const dx of [-0.05, 0.05]) {
      const callus = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), this.std('callus'));
      callus.position.set(dx, 0, 0.07);
      hand.add(callus);
    }
    return { group, shoulder, elbow, hand };
  }

  // ============ 粒子池（03 §8.5，上限 MAX_PARTICLES，禁止动态 new） ============
  private buildBurstPool(): THREE.Points {
    this.burstPos = new Float32Array(MAX_PARTICLES * 3);
    this.burstVel = new Float32Array(MAX_PARTICLES * 3);
    this.burstCol = new Float32Array(MAX_PARTICLES * 3);
    this.burstLife = new Float32Array(MAX_PARTICLES);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.burstPos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.burstCol, 3));
    const points = new THREE.Points(geo, this.mats.burst as THREE.PointsMaterial);
    points.frustumCulled = false;
    points.renderOrder = 5;
    geo.setDrawRange(0, 0);
    return points;
  }

  private spawnBurst(pos: Vector3, count: number, color: THREE.ColorRepresentation, speed: number): void {
    const col = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      if (this.burstActive >= MAX_PARTICLES) return;
      const idx = this.burstActive;
      this.burstPos[idx * 3] = pos.x;
      this.burstPos[idx * 3 + 1] = pos.y;
      this.burstPos[idx * 3 + 2] = pos.z;
      let dx = Math.random() - 0.5;
      let dy = Math.random() * 0.8 + 0.2;
      let dz = Math.random() - 0.5;
      const l = Math.hypot(dx, dy, dz) || 1;
      const v = speed * (0.4 + Math.random() * 0.8);
      this.burstVel[idx * 3] = (dx / l) * v;
      this.burstVel[idx * 3 + 1] = (dy / l) * v;
      this.burstVel[idx * 3 + 2] = (dz / l) * v;
      this.burstLife[idx] = 0.3 + Math.random() * 0.25;
      this.burstCol[idx * 3] = col.r;
      this.burstCol[idx * 3 + 1] = col.g;
      this.burstCol[idx * 3 + 2] = col.b;
      this.burstActive++;
    }
    this.burstPoints.geometry.setDrawRange(0, this.burstActive);
  }

  private updateBursts(dt: number): void {
    const pos = this.burstPos;
    const vel = this.burstVel;
    const life = this.burstLife;
    for (let i = 0; i < this.burstActive; i++) {
      vel[i * 3 + 1] -= 6 * dt; // 重力
      pos[i * 3] += vel[i * 3] * dt;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      life[i] -= dt;
      if (life[i] <= 0) {
        this.burstActive--;
        if (i < this.burstActive) {
          const last = this.burstActive;
          pos[i * 3] = pos[last * 3]; pos[i * 3 + 1] = pos[last * 3 + 1]; pos[i * 3 + 2] = pos[last * 3 + 2];
          vel[i * 3] = vel[last * 3]; vel[i * 3 + 1] = vel[last * 3 + 1]; vel[i * 3 + 2] = vel[last * 3 + 2];
          this.burstCol[i * 3] = this.burstCol[last * 3];
          this.burstCol[i * 3 + 1] = this.burstCol[last * 3 + 1];
          this.burstCol[i * 3 + 2] = this.burstCol[last * 3 + 2];
          life[i] = life[last];
        }
        i--;
      }
    }
    this.burstPoints.geometry.setDrawRange(0, this.burstActive);
    (this.burstPoints.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.burstPoints.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }

  private buildDustPool(): THREE.Points {
    const N = 40;
    this.dustPos = new Float32Array(N * 3);
    this.dustVel = new Float32Array(N * 3);
    this.dustLife = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      this.dustPos[i * 3] = -10 + Math.random() * 4;
      this.dustPos[i * 3 + 1] = 1.5 + Math.random() * 3;
      this.dustPos[i * 3 + 2] = Math.random() * 6;
      this.dustVel[i * 3] = (Math.random() - 0.5) * 0.04;
      this.dustVel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      this.dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      this.dustLife[i] = 8 + Math.random() * 7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.dustPos, 3));
    const points = new THREE.Points(geo, this.mats.dust as THREE.PointsMaterial);
    points.frustumCulled = false;
    points.renderOrder = 4;
    return points;
  }

  private updateDust(dt: number): void {
    const pos = this.dustPos;
    const vel = this.dustVel;
    for (let i = 0; i < 40; i++) {
      vel[i * 3] += Math.sin(this.sceneTime + i) * 0.002 * dt;
      vel[i * 3 + 1] += Math.cos(this.sceneTime * 0.7 + i) * 0.002 * dt;
      vel[i * 3 + 2] += Math.sin(this.sceneTime * 1.3 + i) * 0.002 * dt;
      pos[i * 3] += vel[i * 3] * dt;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      this.dustLife[i] -= dt;
      if (this.dustLife[i] <= 0) {
        pos[i * 3] = -10 + Math.random() * 4;
        pos[i * 3 + 1] = 1.5 + Math.random() * 3;
        pos[i * 3 + 2] = Math.random() * 6;
        this.dustLife[i] = 8 + Math.random() * 7;
      }
    }
    (this.dustPoints.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  }

  // ============ 动画（03 §7：Tween 驱动 poseTarget，damp 应用） ============
  playAnim(anim: BossAnimKind): void {
    if (this.currentAnim === anim) return;
    this.currentAnim = anim;
    this.tweens.kill(this.poseTarget);
    const T = this.poseTarget;
    const p = this.pose;
    const from = (k: keyof BossPose): number => p[k];
    const backToIdle = (): void => {
      if (this.currentAnim === anim) this.currentAnim = 'idleSway';
    };
    const tl = this.tweens.timeline();
    switch (anim) {
      case 'idleSway':
        for (const k of POSE_KEYS) tl.to(T, k as string, from(k), NEUTRAL_POSE[k], 0.8, easeOutCubic);
        break;
      case 'armorFiddle': // A3：右肩 yaw -15°→0 + 2 次拍胸
        tl.to(T, 'shR', from('shR'), -0.35, 0.3, easeOutCubic)
          .to(T, 'shR', -0.35, 0, 0.3, easeOutCubic)
          .call(() => {
            this.tweens.timeline()
              .to(T, 'hdR', from('hdR'), -0.21, 0.1, easeInOutCubic)
              .to(T, 'hdR', -0.21, 0, 0.1, easeInOutCubic);
          })
          .delay(0.2)
          .call(() => {
            this.tweens.timeline()
              .to(T, 'hdR', from('hdR'), -0.21, 0.1, easeInOutCubic)
              .to(T, 'hdR', -0.21, 0, 0.1, easeInOutCubic);
          })
          .onComplete(backToIdle);
        break;
      case 'standUp': // 站姿：根 y 1.0→1.35 + 躯干后仰 5° + 手下垂
        tl.to(T, 'rootY', from('rootY'), 1.35, 0.8, easeOutCubic)
          .to(T, 'chestPitch', from('chestPitch'), 0.09, 0.8, easeOutCubic)
          .to(T, 'shLp', from('shLp'), -0.7, 0.6, easeOutCubic)
          .to(T, 'shRp', from('shRp'), -0.7, 0.6, easeOutCubic)
          .onComplete(backToIdle);
        break;
      case 'swordRaise': // A5 前半：抬臂（OutBack）+ 剑 glow 亮起
        tl.to(T, 'shRp', from('shRp'), -1.35, 0.5, easeOutBack)
          .to(T, 'swordGlow', from('swordGlow'), 1, 0.3, easeOutCubic)
          .onComplete(backToIdle);
        break;
      case 'attack': // A5：横扫 60°→-60° + glow 脉冲
        tl.to(T, 'shRp', from('shRp'), -1.2, 0.15, easeInOutCubic)
          .to(T, 'shR', from('shR'), -1.05, 0.8, easeInOutCubic)
          .to(T, 'swordGlow', from('swordGlow'), 1.4, 0.15, easeOutCubic)
          .to(T, 'swordGlow', 1.4, 0, 0.3, easeInOutCubic)
          .onComplete(backToIdle);
        break;
      case 'knockdown': // A7 精确节拍 3.35s：跌 → 趴 → 先整理头发 → 起身 → 整甲
        tl.to(T, 'rootPitch', from('rootPitch'), -1.31, 0.7, easeInCubic)
          .to(T, 'rootY', from('rootY'), 0.35, 0.7, easeInCubic)
          .to(T, 'headRoll', from('headRoll'), 0.26, 0.7, easeInCubic)
          .delay(0.45)
          .to(T, 'shRp', from('shRp'), -0.55, 0.22, easeOutCubic)
          .to(T, 'headPitch', from('headPitch'), -0.17, 0.22, easeOutCubic)
          .to(T, 'hdR', -0.105, 0.105, 0.125)
          .to(T, 'hdR', 0.105, -0.105, 0.125)
          .to(T, 'hdR', -0.105, 0.105, 0.125)
          .to(T, 'hdR', 0.105, -0.105, 0.125)
          .to(T, 'shRp', -0.55, -0.2, 0.28, easeInOutCubic)
          .to(T, 'headPitch', -0.17, 0, 0.28, easeInOutCubic)
          .to(T, 'rootY', 0.35, 1, 0.8, easeOutCubic)
          .to(T, 'rootPitch', -1.31, 0, 0.8, easeOutCubic)
          .to(T, 'headRoll', 0.26, 0, 0.8, easeOutCubic)
          .to(T, 'shR', from('shR'), -0.3, 0.3, easeOutCubic)
          .to(T, 'shR', -0.3, 0, 0.3, easeOutCubic)
          .onComplete(backToIdle);
        break;
      case 'hairTidy': // B04：1.5s 整理发型
        tl.to(T, 'shRp', from('shRp'), -0.55, 0.22, easeOutCubic)
          .to(T, 'headPitch', from('headPitch'), -0.17, 0.22, easeOutCubic)
          .to(T, 'hdR', from('hdR'), -0.105, 0.125)
          .to(T, 'hdR', -0.105, 0.105, 0.125)
          .to(T, 'hdR', 0.105, -0.105, 0.125)
          .to(T, 'hdR', -0.105, 0.105, 0.125)
          .to(T, 'shRp', -0.55, -0.2, 0.28, easeInOutCubic)
          .to(T, 'headPitch', -0.17, 0, 0.28, easeInOutCubic)
          .onComplete(backToIdle);
        break;
      case 'breakCharacter': // 出戏：双臂乱舞 + 摇头
        tl.to(T, 'shL', from('shL'), 0.9, 0.12)
          .to(T, 'shR', from('shR'), -0.9, 0.12)
          .to(T, 'shL', 0.9, -0.9, 0.12)
          .to(T, 'shR', -0.9, 0.9, 0.12)
          .to(T, 'headYaw', from('headYaw'), 0.35, 0.12)
          .to(T, 'headYaw', 0.35, -0.35, 0.12)
          .to(T, 'headYaw', -0.35, 0, 0.1)
          .onComplete(backToIdle);
        break;
      case 'kneelPanic': // 恐慌崩溃：原地跪下喘息 2s
        tl.to(T, 'rootY', from('rootY'), 0.5, 0.4, easeInCubic)
          .to(T, 'rootPitch', from('rootPitch'), -0.5, 0.4, easeInCubic)
          .to(T, 'headPitch', from('headPitch'), -0.4, 0.4, easeInCubic)
          .delay(1.2)
          .to(T, 'rootY', 0.5, 1, 0.4, easeOutCubic)
          .to(T, 'rootPitch', -0.5, 0, 0.4, easeOutCubic)
          .to(T, 'headPitch', -0.4, 0, 0.4, easeOutCubic)
          .onComplete(backToIdle);
        break;
      case 'pickUpSword': // 剑脱手：俯身捡剑 1.2s
        tl.to(T, 'rootPitch', from('rootPitch'), -0.85, 0.35, easeInCubic)
          .to(T, 'rootY', from('rootY'), 0.8, 0.35, easeInCubic)
          .to(T, 'shRp', from('shRp'), -1.2, 0.35, easeInCubic)
          .delay(0.25)
          .to(T, 'shRp', -1.2, -0.4, 0.3, easeOutCubic)
          .to(T, 'rootPitch', -0.85, 0, 0.35, easeOutCubic)
          .to(T, 'rootY', 0.8, 1, 0.35, easeOutCubic)
          .onComplete(backToIdle);
        break;
      case 'bow': // A8 谢幕鞠躬：烛光 ×1.15 + Bloom 脉冲
        this.candlePhaseMult = 1.15;
        this.postfx.setBloomPulse(0.15);
        tl.to(T, 'rootPitch', from('rootPitch'), -0.49, 1.1, easeOutCubic)
          .to(T, 'shR', from('shR'), -1.57, 0.9, easeOutCubic)
          .to(T, 'headPitch', from('headPitch'), -0.35, 0.9, easeOutCubic)
          .delay(1.0)
          .to(T, 'rootPitch', -0.49, 0, 0.9, easeInCubic)
          .to(T, 'shR', -1.57, 0, 0.9, easeInCubic)
          .to(T, 'headPitch', -0.35, 0, 0.9, easeInCubic)
          .onComplete(() => {
            this.candlePhaseMult = 1;
            backToIdle();
          });
        break;
    }
  }

  private applyPose(dt: number): void {
    const p = this.pose;
    const t = this.poseTarget;
    for (const k of POSE_KEYS) {
      p[k] = damp(p[k], t[k], 12, dt);
    }
    this.bodyGroup.position.y = p.rootY;
    this.bodyGroup.rotation.set(p.rootPitch, p.rootYaw, p.rootRoll);
    this.chestGroup.rotation.x = p.chestPitch;
    this.chestGroup.scale.set(1, p.chestScaleY, 1);
    this.headPivot.rotation.set(p.headPitch, p.headYaw, p.headRoll);
    this.armL.group.rotation.y = p.shL;
    this.armL.shoulder.rotation.x = p.shLp;
    this.armL.elbow.rotation.x = p.elL;
    this.armL.hand.rotation.x = p.hdL;
    this.armR.group.rotation.y = p.shR;
    this.armR.shoulder.rotation.x = p.shRp;
    this.armR.elbow.rotation.x = p.elR;
    this.armR.hand.rotation.x = p.hdR;
    this.capePivot.rotation.z = p.cape;
    this.swordGlowMat.opacity = p.swordGlow;
    this.chestMat.emissiveIntensity = this.chestPulse.e;
  }

  private updateIdleMotion(): void {
    if (this.currentAnim !== 'idleSway') return;
    const b = Math.sin(Math.PI * 2 * 0.22 * this.sceneTime);
    this.poseTarget.rootY = 1 + 0.03 * b;
    this.poseTarget.chestScaleY = 1 + 0.012 * b;
    this.poseTarget.cape = 0.04 * Math.sin(Math.PI * 2 * 0.6 * this.sceneTime);
    this.headPivot.position.y = 1.52 + 0.008 * b;
  }

  private updateTremor(): void {
    this.tremorTimer -= 1 / 60;
    if (this.tremorTimer <= 0) {
      this.tremorPhase = Math.random() * Math.PI * 2;
      this.tremorTimer = 1;
    }
    const spec = BAND_TREMOR[this.anxietyBand];
    this.tremorAmp = lerp(this.tremorAmp, spec.amp, 0.08);
    const tt = this.sceneTime;
    const f = spec.freq;
    if (f <= 0) return;
    const shake =
      Math.sin(tt * Math.PI * 2 * f + this.tremorPhase) +
      Math.sin(tt * Math.PI * 2 * f * 0.73 + this.tremorPhase * 1.7);
    this.bodyGroup.position.y += this.tremorAmp * 0.5 * shake;
    this.bodyGroup.rotation.z += this.tremorAmp * 0.4 * Math.sin(tt * Math.PI * 2 * f * 1.3 + this.tremorPhase);
    this.headPivot.rotation.x += spec.head * Math.sin(tt * Math.PI * 2 * f + this.tremorPhase * 0.5);
    const h = spec.head * 0.6 * Math.sin(tt * Math.PI * 2 * (f + 4) + this.tremorPhase);
    this.armL.hand.rotation.x += h;
    this.armR.hand.rotation.x += h;
  }

  // ============ 烛火（03 §4.1：noise(t·11.3) 公式） ============
  private updateCandle(): void {
    const t = this.sceneTime;
    const n = valueNoise(t * 11.3);
    this.candleLight.intensity = 50 * this.candlePhaseMult * (1 + 0.13 * n + 0.07 * Math.sin(Math.PI * 2 * 0.7 * t + this.flamePhase));
    this.candleLight.position.x = this.candleAnchor.x + (n - 0.5) * 0.02;
    this.candleLight.position.z = this.candleAnchor.z + (n - 0.5) * 0.02;
    this.mainFlame.scale.setScalar(0.16 * (1 + 0.15 * n));
    this.flameMat.color.setHex(C.flame).lerp(new THREE.Color(C.flameCore), n);
  }

  // ============ 相机（03 §5：固定对角 + 漂移 + 焦虑 FOV） ============
  private updateCamera(): void {
    const st = this.getSim();
    const anxiety = st ? st.boss.anxiety : 30;
    this.cameraHitPulse = Math.max(0, this.cameraHitPulse - 1 / 60 / 0.6);
    const A = lerp(0.08, 0.16, clamp((anxiety - 60) / 25, 0, 1)) + this.cameraHitPulse * 0.05;
    const t = this.sceneTime;
    const k1 = Math.sin(0.11 * Math.PI * 2 * t);
    const k2 = Math.sin(0.23 * Math.PI * 2 * t + 1.7);
    this.camOffset.set(
      A * (k1 * 1.0 + 0.5 * k2 * 0.6),
      A * (k1 * 0.35 + 0.5 * k2 * 0.15),
      A * (k1 * 0.8 + 0.5 * k2 * 0.5),
    );
    this.camPos.copy(this.cameraBasePos).add(this.camOffset);
    if (anxiety > 85) {
      const tr = 0.01 * Math.sin(t * Math.PI * 2 * 2.5 + this.cameraTremorPhase);
      this.camPos.x += tr;
      this.camPos.y += tr * 0.5;
    }
    this.camera.position.lerp(this.camPos, 0.04);
    this.camLook.set(
      this.cameraLookAt.x + 0.6 * A * k1 * 1.0,
      this.cameraLookAt.y + 0.6 * A * k1 * 0.35,
      this.cameraLookAt.z + 0.6 * A * k1 * 0.8,
    );
    this.camera.lookAt(this.camLook);
    const bandExtra = this.anxietyBand === 'shaky' ? 1.5 : this.anxietyBand === 'panic' ? 3 : 0;
    const fovTarget = 40 - 6 * (anxiety / 100) - bandExtra;
    this.fovCurrent = lerp(this.fovCurrent, fovTarget, 0.03);
    if (Math.abs(this.camera.fov - this.fovCurrent) > 0.01) {
      this.camera.fov = this.fovCurrent;
      this.camera.updateProjectionMatrix();
    }
  }

  // ============ sim 调和 + FX ============
  private getSim(): Readonly<SimState> | null {
    return this.simStateRef ? this.simStateRef() : null;
  }

  private syncSim(dt: number): void {
    const st = this.getSim();
    if (!st) return;
    const boss = st.boss;
    this.bossRoot.position.x = boss.pos.x;
    this.bossRoot.position.z = boss.pos.z;
    if (boss.anim !== this.lastAnim) {
      this.lastAnim = boss.anim;
      this.playAnim(boss.anim);
    }
    this.anxietyBand = boss.band;
    if (boss.hp < this.lastHp) this.hitPulse();
    this.lastHp = boss.hp;
    if (st.phase !== this.lastPhase) {
      this.lastPhase = st.phase;
      this.onPhaseChange(st.phase);
    }
    // 走位目标圈：move beat 显示在落点，Boss 进圈变绿
    const beat = st.beat;
    if (beat && beat.type === 'move' && beat.targetPos) {
      this.stageRing.visible = true;
      this.stageRing.position.x = beat.targetPos.x;
      this.stageRing.position.z = beat.targetPos.z;
      const dx = boss.pos.x - beat.targetPos.x;
      const dz = boss.pos.z - beat.targetPos.z;
      const inside = Math.sqrt(dx * dx + dz * dz) < 0.8;
      this.stageRingMat.color.setHex(inside ? 0x3ddc84 : 0xff9a3c);
      this.stageRingMat.opacity = inside ? 0.9 : 0.55;
    } else {
      this.stageRing.visible = false;
    }
    this.shadow.update(st.player, dt);
  }

  private onPhaseChange(phase: GamePhase): void {
    this.candlePhaseMult = CANDLE_PHASE_MULT[phase];
    if (phase === 'WAIT') {
      this.flamePhase = Math.random() * Math.PI * 2;
      this.tweens.kill(this.poseTarget);
      this.currentAnim = 'idleSway';
      this.candlePhaseMult = 1;
    }
    if (phase === 'EVALUATE') this.postfx.setVignette(0.12);
    if (phase === 'PERFORM') this.cameraHitPulse = Math.min(1, this.cameraHitPulse + 0.1);
  }

  private handleFx(fx: FxKind, pos: Vector3 | undefined, value: number | undefined): void {
    switch (fx) {
      case 'bloomPulse':
        this.postfx.setBloomPulse(value ?? 0.3);
        break;
      case 'vignette':
        this.postfx.setVignette(value ?? 0.15);
        break;
      case 'screenFlash':
        this.postfx.setFlash(0.35);
        this.hitPulse();
        break;
      case 'shake':
        this.cameraHitPulse = Math.min(1, this.cameraHitPulse + (value ?? 0.05));
        break;
      case 'lightSweep':
        this.tweens.timeline()
          .to(this.sweepInt, 'v', 0, 2.5, 0.6, easeOutCubic)
          .to(this.sweepInt, 'v', 2.5, 0, 0.9, easeInCubic);
        break;
      case 'dust':
        if (pos) this.spawnBurst(pos, 6, 0x6e8fbf, 0.5);
        break;
    }
  }

  private hitPulse(): void {
    this.tweens.timeline()
      .to(this.chestPulse, 'e', 0, 0.8, 0.12, easeOutCubic)
      .to(this.chestPulse, 'e', 0.8, 0, 0.13, easeInCubic);
  }
}
