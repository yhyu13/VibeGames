// engine/SceneManager.ts — V2 舞台（王座厅 + 接地 Boss 骨架 + 替身 + 粒子 + 后期）

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { WORLD } from '../core/world/world';
import { CAMERA_DISTANCE_BASE, CAMERA_DISTANCE_PANIC, CAMERA_FOV_BASE, CAMERA_FOV_HIGH, CAMERA_SHAKE, MAX_PARTICLES, VIGNETTE } from '../core/constants';
import type { SimEvent } from '../core/simulation/events';
import type { EventConsumer } from '../core/simulation/events';
import type { SimState } from '../core/simulation/Simulation';
import { clamp, damp, randRange } from '../core/math';
import { easeOutCubic, makeTween, tweenValue, type TweenSpec } from './Tween';

interface Particle {
  mesh: THREE.Sprite;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
}

const CANDLE_COLOR = 0xff9a3c;
const GOLD = 0xffd27d;
const ARMOR_DARK = 0x232c4a;
const CAPE = 0x6a2b3f;

export class SceneManager implements EventConsumer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private vignettePass: ShaderPass;
  private flashPass: ShaderPass;
  private getState: () => Readonly<SimState>;
  private clock = new THREE.Clock();
  private raf = 0;
  private disposed = false;

  // Boss 骨架
  private bossRoot = new THREE.Group();
  private bossBody = new THREE.Group();
  private bossCape: THREE.Object3D[] = [];
  private bossSword = new THREE.Group();
  private bossHead = new THREE.Group();
  private animTimers = new Map<string, TweenSpec>();

  // 替身
  private shadowRoot = new THREE.Group();
  private shadowArm = new THREE.Group();
  private shadowTip = new THREE.Mesh();

  // 舞台
  private stageRings: THREE.Mesh[] = [];
  private stanceRing = new THREE.Mesh();
  private keyLight: THREE.SpotLight;
  private candleLights: THREE.PointLight[] = [];
  private dustPoints!: THREE.Points;
  private particles: Particle[] = [];

  private lastBossPos = new THREE.Vector3();
  private capeVel = new THREE.Vector2();
  private shake = 0;
  private flashAmount = 0;
  private sweepT = 1;

  constructor(renderer: THREE.WebGLRenderer, getState: () => Readonly<SimState>) {
    this.renderer = renderer;
    this.getState = getState;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b1024);
    this.scene.fog = new THREE.Fog(0x0b1024, 22, 42);
    this.camera = new THREE.PerspectiveCamera(CAMERA_FOV_BASE, 1, 0.1, 100);

    this.buildRoom();
    this.buildBoss();
    this.buildShadow();
    this.buildParticles();

    this.keyLight = this.buildLights();

    // ============ 后期 ============
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.55, 0.8));
    this.vignettePass = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, uStrength: { value: VIGNETTE.calm }, uColor: { value: new THREE.Color(0x05070f) } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader:
        'uniform sampler2D tDiffuse; uniform float uStrength; uniform vec3 uColor; varying vec2 vUv;' +
        'void main(){ vec2 d = vUv - 0.5; float dist = length(d)*1.4; float vig = smoothstep(0.55, 1.25, dist);' +
        ' vec3 col = mix(texture2D(tDiffuse, vUv).rgb, uColor, vig*uStrength); gl_FragColor = vec4(col, 1.0); }',
    });
    this.flashPass = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, uAmount: { value: 0 }, uColor: { value: new THREE.Color(0xfff2e0) } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader:
        'uniform sampler2D tDiffuse; uniform float uAmount; uniform vec3 uColor; varying vec2 vUv;' +
        'void main(){ vec3 col = texture2D(tDiffuse, vUv).rgb; gl_FragColor = vec4(mix(col, uColor, uAmount), 1.0); }',
    });
    this.composer.addPass(this.vignettePass);
    this.composer.addPass(this.flashPass);
    this.composer.addPass(new OutputPass());

    this.lastBossPos.copy(WORLD.thronePos);
    this.loop();
  }

  // ============ 房间 ============
  private buildRoom(): void {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 20),
      new THREE.MeshStandardMaterial({ color: 0x232e52, roughness: 0.85 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const stage = new THREE.Mesh(
      new THREE.CircleGeometry(6.2, 40),
      new THREE.MeshStandardMaterial({ color: 0x33406e, roughness: 0.7 }),
    );
    stage.rotation.x = -Math.PI / 2;
    stage.position.set(0, 0.01, 1.2);
    stage.receiveShadow = true;
    this.scene.add(stage);

    const stageEdge = new THREE.Mesh(
      new THREE.RingGeometry(6.18, 6.32, 40),
      new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.35, roughness: 0.4 }),
    );
    stageEdge.rotation.x = -Math.PI / 2;
    stageEdge.position.set(0, 0.02, 1.2);
    this.scene.add(stageEdge);

    // 后墙 + 幕布
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 8),
      new THREE.MeshStandardMaterial({ color: 0x1a2547, roughness: 0.9 }),
    );
    wall.position.set(0, 4, 9);
    this.scene.add(wall);

    const curtainMat = new THREE.MeshStandardMaterial({ color: CAPE, roughness: 0.8, side: THREE.DoubleSide });
    for (const x of [-5.5, 5.5]) {
      const curtain = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 6.4), curtainMat);
      curtain.position.set(x, 3.2, 8.2);
      this.scene.add(curtain);
      const valance = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1), curtainMat);
      valance.position.set(x, 6.4, 8.35);
      valance.rotation.z = x > 0 ? 0.12 : -0.12;
      this.scene.add(valance);
    }

    // 立柱
    const pillarGeo = new THREE.CylinderGeometry(0.55, 0.62, 5.6, 10);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x33406e, roughness: 0.7 });
    for (const c of WORLD.colliders) {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(c.center.x, 2.8, c.center.z);
      pillar.castShadow = true;
      this.scene.add(pillar);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.22, 1.3), new THREE.MeshStandardMaterial({ color: 0x44517f, roughness: 0.5, metalness: 0.6 }));
      cap.position.set(c.center.x, 5.62, c.center.z);
      this.scene.add(cap);
    }

    // 王座
    const throneMat = new THREE.MeshStandardMaterial({ color: 0x2c2033, roughness: 0.6, metalness: 0.3 });
    const thronePos = WORLD.thronePos;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 1.2), throneMat);
    seat.position.set(thronePos.x, 0.35, thronePos.z);
    this.scene.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.1, 0.35), throneMat);
    back.position.set(thronePos.x, 1.45, thronePos.z - 0.55);
    this.scene.add(back);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.14, 0.4), new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.25, roughness: 0.4 }));
    trim.position.set(thronePos.x, 2.42, thronePos.z - 0.55);
    this.scene.add(trim);
    for (const s of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, 1.2), throneMat);
      arm.position.set(thronePos.x + s * 0.95, 0.75, thronePos.z);
      this.scene.add(arm);
    }

    // 舞台站位环（走位目标）
    const ringGeo = new THREE.RingGeometry(0.55, 0.85, 24);
    const ringMat = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.3, roughness: 0.4, transparent: true, opacity: 0.9 });
    for (const m of WORLD.stageMarkers) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(m.x, 0.03, m.z);
      ring.visible = false;
      this.scene.add(ring);
      this.stageRings.push(ring);
    }

    // 脚下站位环（Boss 当前位置）
    this.stanceRing = new THREE.Mesh(
      new THREE.RingGeometry(0.72, 0.86, 24),
      new THREE.MeshStandardMaterial({ color: 0x8fd3f4, emissive: 0x8fd3f4, emissiveIntensity: 0.35, roughness: 0.4, transparent: true, opacity: 0.7 }),
    );
    this.stanceRing.rotation.x = -Math.PI / 2;
    this.scene.add(this.stanceRing);
  }

  private buildLights(): THREE.SpotLight {
    this.scene.add(new THREE.AmbientLight(0x55669a, 1.25));
    const key = new THREE.SpotLight(0xffd9a0, 120, 40, 0.62, 0.5, 1.0);
    key.position.copy(WORLD.lightAnchors.spot);
    key.target.position.set(0, 0, 1.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
    this.scene.add(key.target);
    const fill = new THREE.DirectionalLight(0x8fa8e8, 1.0);
    fill.position.set(-6, 5, -6);
    this.scene.add(fill);
    for (const x of [-7, 7]) {
      const candle = new THREE.PointLight(CANDLE_COLOR, 26, 14, 2);
      candle.position.set(x, 2.6, 7.4);
      this.scene.add(candle);
      this.candleLights.push(candle);
      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 6, 6),
        new THREE.MeshBasicMaterial({ color: CANDLE_COLOR }),
      );
      flame.position.set(x, 2.72, 7.4);
      this.scene.add(flame);
    }
    return key;
  }

  // ============ Boss 骨架（接地，面向移动方向） ============
  private buildBoss(): void {
    const armor = new THREE.MeshStandardMaterial({ color: 0x4a587e, roughness: 0.45, metalness: 0.7 });
    const dark = new THREE.MeshStandardMaterial({ color: ARMOR_DARK, roughness: 0.5, metalness: 0.6 });
    const gold = new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.35, metalness: 0.9 });
    const capeMat = new THREE.MeshStandardMaterial({ color: CAPE, roughness: 0.85, side: THREE.DoubleSide });

    // 腿
    for (const s of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.24), dark);
      leg.position.set(s * 0.15, 0.39, 0);
      this.bossBody.add(leg);
    }
    // 躯干
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.92, 0.4), armor);
    torso.position.y = 1.04;
    torso.castShadow = true;
    this.bossBody.add(torso);
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.34, 0.44), gold);
    chest.position.y = 1.22;
    this.bossBody.add(chest);
    // 肩甲 + 手臂（右手持剑）
    for (const s of [-1, 1]) {
      const pauldron = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 8), gold);
      pauldron.position.set(s * 0.44, 1.56, 0);
      this.bossBody.add(pauldron);
      const armGroup = new THREE.Group();
      armGroup.position.set(s * 0.44, 1.42, 0);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.16), armor);
      arm.position.y = -0.28;
      armGroup.add(arm);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), dark);
      hand.position.y = -0.6;
      armGroup.add(hand);
      if (s === 1) {
        this.bossSword = new THREE.Group();
        this.bossSword.position.set(0, -0.55, 0);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.95, 0.12), new THREE.MeshStandardMaterial({ color: 0xd8e4ff, roughness: 0.2, metalness: 0.9 }));
        blade.position.y = -0.62;
        blade.castShadow = true;
        this.bossSword.add(blade);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.1), gold);
        guard.position.y = -0.18;
        this.bossSword.add(guard);
        const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), dark);
        hilt.position.y = 0.02;
        this.bossSword.add(hilt);
        armGroup.add(this.bossSword);
      }
      this.bossBody.add(armGroup);
    }
    // 头 + 王冠
    this.bossHead = new THREE.Group();
    this.bossHead.position.y = 1.94;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 10), dark);
    this.bossHead.add(head);
    for (let i = -1; i <= 1; i++) {
      const crown = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 4), gold);
      crown.position.set(i * 0.09, 0.2, 0);
      this.bossHead.add(crown);
    }
    this.bossBody.add(this.bossHead);

    // 披风（弹簧链）
    for (let i = 0; i < 6; i++) {
      const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.42), capeMat);
      seg.position.set(0, 1.62 - i * 0.36, -0.24 - i * 0.03);
      this.bossBody.add(seg);
      this.bossCape.push(seg);
    }

    this.bossRoot.add(this.bossBody);
    this.bossRoot.position.set(0, 0, 1.4); // y=0：脚底接地（V2 修复浮空）
    this.scene.add(this.bossRoot);
  }

  // ============ 替身（影子勇者） ============
  private buildShadow(): void {
    const dark = new THREE.MeshStandardMaterial({ color: 0x0a0e1c, roughness: 0.4, metalness: 0.2 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.5, 4, 8), dark);
    body.position.y = 0.75;
    body.castShadow = true;
    this.shadowRoot.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), dark);
    head.position.y = 1.35;
    this.shadowRoot.add(head);
    this.shadowArm = new THREE.Group();
    this.shadowArm.position.set(0.22, 1.05, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), dark);
    arm.position.y = -0.22;
    this.shadowArm.add(arm);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.1), new THREE.MeshStandardMaterial({ color: 0x2a3560, roughness: 0.3, metalness: 0.8 }));
    blade.position.y = -0.6;
    this.shadowArm.add(blade);
    this.shadowTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0 }),
    );
    this.shadowTip.position.y = -0.98;
    this.shadowArm.add(this.shadowTip);
    this.shadowRoot.add(this.shadowArm);
    this.shadowRoot.position.set(WORLD.shadowPath.from.x, 0, WORLD.shadowPath.from.z);
    this.scene.add(this.shadowRoot);
  }

  private buildParticles(): void {
    const dustGeo = new THREE.BufferGeometry();
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = randRange(Math.random, -10, 10);
      pos[i * 3 + 1] = randRange(Math.random, 0.4, 5.2);
      pos[i * 3 + 2] = randRange(Math.random, -5, 8);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x9fb4d8, size: 0.045, transparent: true, opacity: 0.5, depthWrite: false });
    this.dustPoints = new THREE.Points(dustGeo, dustMat);
    this.scene.add(this.dustPoints);
  }

  // ============ 事件消费 ============
  onSimEvent(e: SimEvent): void {
    switch (e.type) {
      case 'bossAnim':
        this.triggerAnim(e.anim);
        break;
      case 'fx':
        if (e.fx === 'screenFlash') this.flashAmount = Math.max(this.flashAmount, 0.55 * e.strength);
        if (e.fx === 'dust') this.burstParticle(this.bossRoot.position, 0xd8d0b8, 6, 0.5);
        if (e.fx === 'sparkle') this.burstParticle(this.bossRoot.position.clone().add(new THREE.Vector3(0, 1.6, 0)), GOLD, 14, 0.65);
        if (e.fx === 'lightSweep') this.sweepT = 0;
        break;
      case 'beat':
        if (e.beat?.targetPos) {
          const target = e.beat.targetPos;
          for (const ring of this.stageRings) {
            ring.visible = ring.position.x === target.x && ring.position.z === target.z;
          }
        } else {
          for (const ring of this.stageRings) ring.visible = false;
        }
        break;
      default:
        break;
    }
  }

  private triggerAnim(anim: string): void {
    if (anim === 'attack') {
      this.animTimers.set('sword', makeTween(0, 1, 0.38, 0, easeOutCubic));
    } else if (anim === 'knockdown') {
      this.animTimers.set('knock', makeTween(0, 1, 0.4));
    } else if (anim === 'windup') {
      this.animTimers.set('dodge', makeTween(0, 1, 0.45, 0, easeOutCubic));
    } else if (anim === 'kneelPanic') {
      this.animTimers.set('kneel', makeTween(0, 1, 0.5));
    } else if (anim === 'breakCharacter') {
      this.animTimers.set('break', makeTween(0, 1, 0.9));
    } else if (anim === 'bow') {
      this.animTimers.set('bow', makeTween(0, 1, 1.2, 0, easeOutCubic));
    }
  }

  private burstParticle(at: THREE.Vector3, color: number, count: number, life: number): void {
    while (this.particles.length >= MAX_PARTICLES / 2) {
      const dead = this.particles.shift();
      if (dead) {
        this.scene.remove(dead.mesh);
        dead.mesh.material.dispose();
      }
    }
    for (let i = 0; i < count; i++) {
      const mat = new THREE.SpriteMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.1 + Math.random() * 0.14);
      sprite.position.copy(at);
      const vel = new THREE.Vector3((Math.random() - 0.5) * 1.6, Math.random() * 1.8 + 0.4, (Math.random() - 0.5) * 1.6);
      this.scene.add(sprite);
      this.particles.push({ mesh: sprite, vel, life, maxLife: life });
    }
  }

  // ============ 渲染循环 ============
  private loop = (): void => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.1);
    this.render(dt);
  };

  render(dt: number): void {
    const state = this.getState();
    const boss = state.boss;
    const player = state.player;
    const t = performance.now() / 1000;

    // Boss 同步（接地）
    this.bossRoot.position.set(boss.pos.x, 0, boss.pos.z);
    this.bossRoot.rotation.y = boss.facingYaw;
    this.stanceRing.position.set(boss.pos.x, 0.035, boss.pos.z);
    const idle = boss.innerState !== 'HIT' && boss.innerState !== 'RECOVER' && boss.innerState !== 'BREAK_CHARACTER';
    this.stanceRing.visible = state.phase === 'PERFORM' && idle;
    this.animateBoss(dt, state);

    // 替身同步
    this.shadowRoot.position.set(player.pos.x, 0, player.pos.z);
    this.shadowRoot.rotation.y = Math.atan2(player.pos.x - boss.pos.x, player.pos.z - boss.pos.z);
    const windup = player.windup;
    this.shadowArm.rotation.x = windup > 0 ? -Math.PI * 0.55 * windup : 0.12;
    (this.shadowTip.material as THREE.MeshBasicMaterial).opacity = windup > 0.3 ? (windup - 0.3) * 1.6 : 0;
    (this.shadowTip.material as THREE.MeshBasicMaterial).color.setHex(windup >= 0.55 ? 0xff3b30 : 0xffb03a);

    // 镜头（设计机位 + 焦虑推进 + 抖动）
    const bandFactor = bandIndex(boss.band);
    const dist = CAMERA_DISTANCE_BASE - (CAMERA_DISTANCE_BASE - CAMERA_DISTANCE_PANIC) * bandFactor;
    const camPos = new THREE.Vector3(WORLD.cameraAnchor.x, WORLD.cameraAnchor.y, WORLD.cameraAnchor.z);
    const look = new THREE.Vector3(0, 1.15, 1.4);
    const dir = look.clone().sub(camPos).normalize();
    camPos.sub(dir.multiplyScalar(dist - Math.hypot(camPos.x - look.x, camPos.z - look.z)));
    this.camera.position.copy(camPos);
    this.camera.lookAt(look);
    this.camera.fov = CAMERA_FOV_BASE + (CAMERA_FOV_HIGH - CAMERA_FOV_BASE) * bandFactor;
    this.shake = damp(this.shake, CAMERA_SHAKE[boss.band] * (state.phase === 'PERFORM' ? 1 : 0.4), 8, dt);
    if (this.shake > 0.001) {
      this.camera.position.x += (Math.random() - 0.5) * this.shake;
      this.camera.position.y += (Math.random() - 0.5) * this.shake * 0.6;
    }
    this.camera.updateProjectionMatrix();

    // 灯光表现
    const flicker = 1 + (boss.band === 'panic' ? Math.sin(t * 23) * 0.12 : Math.sin(t * 1.8) * 0.03);
    this.keyLight.intensity = 120 * (1 - bandFactor * 0.35) * flicker;
    this.candleLights.forEach((c, i) => {
      c.intensity = (24 + Math.sin(t * (3 + i)) * 2.5) * (1 - bandFactor * 0.25);
    });

    // 尘埃漂移
    const dustPos = this.dustPoints.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < dustPos.count; i++) {
      let x = dustPos.getX(i) + Math.sin(t * 0.4 + i) * 0.002;
      let y = dustPos.getY(i) + Math.cos(t * 0.3 + i * 2) * 0.0015;
      if (y > 5.2) y = 0.4;
      dustPos.setX(i, x);
      dustPos.setY(i, y);
    }
    dustPos.needsUpdate = true;

    // 粒子更新
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      p.mesh.position.addScaledVector(p.vel, dt);
      p.vel.y -= 1.2 * dt;
      (p.mesh.material as THREE.SpriteMaterial).opacity = Math.max(0, p.life / p.maxLife);
    }

    // 舞台扫光
    if (this.sweepT < 1) {
      this.sweepT = Math.min(1, this.sweepT + dt * 0.45);
      const sx = (this.sweepT - 0.5) * 22;
      const sweepLight = this.keyLight;
      sweepLight.position.x = sx;
    }

    // 后期 uniform
    this.vignettePass.uniforms.uStrength.value = VIGNETTE[boss.band];
    this.flashAmount = Math.max(0, this.flashAmount - dt * 2.2);
    this.flashPass.uniforms.uAmount.value = this.flashAmount;

    this.composer.render();
  }

  // ============ Boss 动画 ============
  private animateBoss(dt: number, state: SimState): void {
    const body = this.bossBody;
    const t = performance.now() / 1000;
    const moving = state.phase === 'PERFORM' && (Math.abs(state.boss.pos.x - this.lastBossPos.x) > 0.0005 || Math.abs(state.boss.pos.z - this.lastBossPos.z) > 0.0005);
    const dx = state.boss.pos.x - this.lastBossPos.x;
    const dz = state.boss.pos.z - this.lastBossPos.z;
    this.capeVel.x = damp(this.capeVel.x, moving ? dx / dt : 0, 4, dt);
    this.capeVel.y = damp(this.capeVel.y, moving ? dz / dt : 0, 4, dt);
    this.lastBossPos.copy(state.boss.pos);

    // 呼吸
    const breathe = Math.sin(t * 1.6) * 0.02;
    body.position.y = breathe;
    body.scale.set(1 + Math.sin(t * 1.6) * 0.006, 1, 1);
    body.rotation.z = Math.sin(t * 0.9) * 0.02;
    this.bossHead.rotation.y = Math.sin(t * 0.6) * 0.1 + (moving ? Math.sin(t * 6) * 0.02 : 0);

    // 披风弹簧链
    for (let i = 0; i < this.bossCape.length; i++) {
      const seg = this.bossCape[i];
      const target = i * 0.5 + this.capeVel.x * 0.055 + Math.sin(t * 2 + i) * 0.02;
      seg.rotation.x = damp(seg.rotation.x, target, 7, dt);
    }

    // 关键帧动画
    const knock = this.animTimers.get('knock');
    if (knock) {
      const r = tweenValue(knock, dt);
      this.animTimers.set('knock', r.tw);
      if (r.done) this.animTimers.delete('knock');
      body.rotation.x = -Math.PI / 2 * Math.min(1, r.value * 1.2);
      body.position.y = breathe - r.value * 0.35;
      return;
    }
    const kneel = this.animTimers.get('kneel');
    if (kneel) {
      const r = tweenValue(kneel, dt);
      this.animTimers.set('kneel', r.tw);
      if (r.done) this.animTimers.delete('kneel');
      body.rotation.x = r.value * 0.7;
      body.position.y = breathe - r.value * 0.45;
      return;
    }
    const bow = this.animTimers.get('bow');
    if (bow) {
      const r = tweenValue(bow, dt);
      this.animTimers.set('bow', r.tw);
      if (r.done) this.animTimers.delete('bow');
      body.rotation.x = r.value * 0.45;
      return;
    }
    const sword = this.animTimers.get('sword');
    if (sword) {
      const r = tweenValue(sword, dt);
      this.animTimers.set('sword', r.tw);
      if (r.done) this.animTimers.delete('sword');
      const swing = Math.sin(r.value * Math.PI);
      this.bossSword.rotation.x = -2.6 * swing;
      this.bossSword.rotation.z = 0.4 * swing;
      body.rotation.x = -0.15 * swing;
    }
    const dodge = this.animTimers.get('dodge');
    if (dodge) {
      const r = tweenValue(dodge, dt);
      this.animTimers.set('dodge', r.tw);
      if (r.done) this.animTimers.delete('dodge');
      body.rotation.z = (1 - r.value) * 0.25;
      body.position.y = breathe - r.value * 0.2;
    }
    const brk = this.animTimers.get('break');
    if (brk) {
      const r = tweenValue(brk, dt);
      this.animTimers.set('break', r.tw);
      if (r.done) this.animTimers.delete('break');
      body.rotation.x = Math.sin(t * 30) * 0.12 * r.value;
      this.bossHead.rotation.z = Math.sin(t * 40) * 0.3 * r.value;
    }
  }

  /** 替身屏幕坐标（0-1，供鼠标谱移动目标） */
  getShadowScreen(): { x: number; y: number } {
    const v = new THREE.Vector3(this.shadowRoot.position.x, 1.2, this.shadowRoot.position.z).project(this.camera);
    return { x: clamp((v.x + 1) / 2, 0.02, 0.98), y: clamp((1 - v.y) / 2, 0.05, 0.9) };
  }

  /** 相机地面轴（WASD 按屏幕方向映射：W=相机前向在地面投影，D=相机右向在地面投影） */
  getGroundAxes(): { forward: { x: number; z: number }; right: { x: number; z: number } } {
    this.camera.updateMatrixWorld(true);
    const m = this.camera.matrixWorld.elements;
    const right = { x: m[0], z: m[2] };
    const forward = { x: -m[8], z: -m[10] };
    const fl = Math.hypot(forward.x, forward.z);
    const rl = Math.hypot(right.x, right.z);
    return {
      forward: fl > 0.001 ? { x: forward.x / fl, z: forward.z / fl } : { x: 0, z: 1 },
      right: rl > 0.001 ? { x: right.x / rl, z: right.z / rl } : { x: 1, z: 0 },
    };
  }

  resize(w: number, h: number): void {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.renderer.dispose();
  }
}

function bandIndex(band: string): number {
  return band === 'panic' ? 1 : band === 'shaky' ? 0.62 : band === 'nervous' ? 0.3 : 0;
}
