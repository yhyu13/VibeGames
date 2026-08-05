import * as THREE from 'three';
import { Vector3 } from '../types';
import { CAMERA_DISTANCE, CAMERA_HEIGHT, CAMERA_SPRING_STIFFNESS, FOV_BASE, FOV_BOOST } from '../utils/constants';
import { PostFX } from './postfx';

export class SceneManager {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  playerMeshes: Map<number, THREE.Group> = new Map();
  enemyMeshes: Map<number, THREE.Group> = new Map();
  projectileMeshes: Map<number, THREE.Mesh> = new Map();
  particleMeshes: Map<number, THREE.Points> = new Map();
  bossMeshes: Map<number, THREE.Group> = new Map();
  lockIndicators: Map<number, THREE.Line> = new Map();
  private clock: THREE.Clock;
  private postFX: PostFX;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.scene = new THREE.Scene();
    // 纯黑虚空保留为 scene.background — 让白色机体剪影在任何方向都有最高对比度。
    // 纯白枪骑兵原版：纯黑虚空 + 白色机甲剪影 + 远端星点
    // （无城市天际线、无彩色雾、无体积光。色彩只在 UI 里出现。）
    this.scene.background = new THREE.Color(0x000000);
    // 远雾：让远端星点淡入黑（300 → 900 单位距离）
    this.scene.fog = new THREE.Fog(0x000000, 300, 900);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    this.camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);

    this.clock = new THREE.Clock();

    this.postFX = new PostFX(this.renderer, this.scene, this.camera, width, height);

    // C1 — 赛博朋克氛围：城市环 + 体积雾 + 全息粒子
    this.buildCyberpunkBackground();
  }

  // === C1 Atmosphere ===
  private starfield!: THREE.Points;
  private hologramParticles!: THREE.Points;
  private particleData!: { velocities: Float32Array };

  // === C0 Intro ===
  private introActive = false;
  private introT = 0;
  private introOnComplete: (() => void) | null = null;
  private introCamStart!: THREE.Vector3;
  private introCamEnd!: THREE.Vector3;
  private introLookStart!: THREE.Vector3;
  private introLookEnd!: THREE.Vector3;
  private readonly INTRO_DURATION = 2.4; // seconds

  /** 启动 3 秒开场序列：黑屏 → 城市亮起 → 镜头俯冲 → 摄像机切到追击位 */
  startIntro(target: Vector3, onComplete: () => void) {
    this.introActive = true;
    this.introT = 0;
    this.introOnComplete = onComplete;
    // 起点：高远后方 + 上仰（让城市占满上方 1/3）
    this.introCamStart = new THREE.Vector3(target.x, target.y + 35, target.z + 45);
    // 终点：标准 chase cam 位置
    this.introCamEnd = new THREE.Vector3(
      target.x,
      target.y + CAMERA_HEIGHT,
      target.z + CAMERA_DISTANCE
    );
    // 起点注视：远方城市（高 30 单位）
    this.introLookStart = new THREE.Vector3(target.x, target.y + 30, target.z - 100);
    // 终点注视：玩家本体
    this.introLookEnd = new THREE.Vector3(target.x, target.y, target.z);
    // 立即把相机放到起点
    this.camera.position.copy(this.introCamStart);
    this.camera.lookAt(this.introLookStart);
    // 开场期间粒子 / 星点 0 透明度（淡入）
    if (this.hologramParticles) {
      (this.hologramParticles.material as THREE.PointsMaterial).opacity = 0;
    }
    if (this.starfield) {
      (this.starfield.material as THREE.PointsMaterial).opacity = 0;
    }
  }

  introIsActive(): boolean { return this.introActive; }

  private buildCyberpunkBackground() {
    this.buildStarfield();
    this.buildHologramParticles();
  }

  // 远端城市天际线：60+ 座高低不一的塔楼围成圆环，body 暗、window 亮
  // === 深空星点（替代原城市环） ===
  // ~280 个白色 / 微灰白色 distant points，分散在大球面上。
  // 部分较亮（白）、大部分较暗（带微弱 alpha 抖动），无色彩，无霓虹。
  // 极慢自转（90 秒一圈）维持"深邃宇宙感"。
  private buildStarfield() {
    const count = 280;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // 球面分布，半径 700–900（远雾外缘，星点仅在远处呈现）
      const r = 700 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      // 偏向赤道 ±50°：星点更集中在水平面附近（地平线一带）
      const phi = (Math.random() - 0.5) * Math.PI * 0.55;
      positions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
      // 亮度：10% 亮星（接近白）、90% 暗星（带轻微 alpha 衰减后几乎看不见）
      const bright = Math.random() < 0.10;
      const v = bright ? (0.85 + Math.random() * 0.15) : (0.35 + Math.random() * 0.4);
      colors[i * 3] = v;
      colors[i * 3 + 1] = v;
      colors[i * 3 + 2] = v;
      sizes[i] = bright ? 2.0 + Math.random() * 1.5 : 0.8 + Math.random() * 0.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
      fog: true, // 让远处星点被雾衰减，与虚空融合
    });
    this.starfield = new THREE.Points(geo, mat);
    this.scene.add(this.starfield);
  }

  // （已移除 buildHazePlane / skyCap — 它们是 CP2077 风格的彩色雾面。
  //  深空场景保留纯黑虚空 + 远端白色星点，无色彩。）

  // 全息粒子：缓慢漂移的数据尘埃 — CP2077 招牌的"空气中飘着数据"
  // 空间尘埃（替代原"全息粒子"）：散布在玩家周围的白色细小尘埃。
  // 比星点更近、更密，slow drift，没有任何颜色 — 给"太空中飘的灰尘"质感。
  private buildHologramParticles() {
    const count = 350;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 60 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;
      positions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r * 0.55 + 25;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
      // 极慢漂移 — 远不及 CP2077 数据粒子的"活跃感"
      velocities[i * 3] = (Math.random() - 0.5) * 0.15;
      velocities[i * 3 + 1] = 0.05 + Math.random() * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      // 全部白色，带轻微 alpha 衰减（远处自然变暗）
      const v = 0.55 + Math.random() * 0.4;
      colors[i * 3] = v;
      colors[i * 3 + 1] = v;
      colors[i * 3 + 2] = v;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.9,        // 原 1.6 → 0.9（更小）
      vertexColors: true,
      transparent: true,
      opacity: 0.55,     // 原 0.85 → 0.55（更淡）
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      fog: true,
    });
    this.hologramParticles = new THREE.Points(geo, mat);
    this.scene.add(this.hologramParticles);
    this.particleData = { velocities };
  }

  // 每帧调用：漂移粒子 + 星点极慢自转 + C0 引爆序列
  updateAtmosphere(dt: number) {
    // === C0 Intro animation ===
    if (this.introActive) {
      this.introT += dt;
      const t = this.introT;

      // 1) 粒子 / 星点 1.0s 开始渐入（深空淡入）
      const fadeT = Math.max(0, Math.min(1, (t - 1.0) / 0.5));
      if (this.hologramParticles) {
        (this.hologramParticles.material as THREE.PointsMaterial).opacity = 0.55 * fadeT;
      }
      if (this.starfield) {
        (this.starfield.material as THREE.PointsMaterial).opacity = 0.9 * fadeT;
      }

      // 2) 相机插值：1.6s → 2.4s 区段 ease-out cubic 俯冲到 chase 位
      const diveT = Math.max(0, Math.min(1, (t - 1.6) / 0.8));
      const ease = 1 - Math.pow(1 - diveT, 3);
      this.camera.position.lerpVectors(this.introCamStart, this.introCamEnd, ease);
      const look = new THREE.Vector3().lerpVectors(this.introLookStart, this.introLookEnd, ease);
      this.camera.lookAt(look);

      // 3) 完成
      if (t >= this.INTRO_DURATION) {
        this.introActive = false;
        if (this.introOnComplete) {
          this.introOnComplete();
          this.introOnComplete = null;
        }
      }
      return; // intro 期不执行后续环境更新（避免扰动）
    }

    // === 正常帧：漂移粒子 + 星点极慢自转（120 秒一圈，几乎察觉不到） ===
    if (this.particleData) {
      const { velocities } = this.particleData;
      const attr = this.hologramParticles.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const count = arr.length / 3;
      for (let i = 0; i < count; i++) {
        arr[i * 3] += velocities[i * 3] * dt;
        arr[i * 3 + 1] += velocities[i * 3 + 1] * dt;
        arr[i * 3 + 2] += velocities[i * 3 + 2] * dt;
        if (arr[i * 3 + 1] > 200) {
          arr[i * 3 + 1] = -50;
          arr[i * 3] += (Math.random() - 0.5) * 30;
          arr[i * 3 + 2] += (Math.random() - 0.5) * 30;
        }
      }
      attr.needsUpdate = true;
    }

    if (this.starfield) {
      // 极慢 Y 轴自转：120s/圈，深空感而非"地面"
      this.starfield.rotation.y += dt * (Math.PI * 2) / 120;
    }
  }

  updateCamera(target: Vector3, dt: number, yaw: number, stiffness: number = CAMERA_SPRING_STIFFNESS) {
    const desiredPos = new THREE.Vector3(
      target.x - Math.sin(yaw) * CAMERA_DISTANCE,
      target.y + CAMERA_HEIGHT,
      target.z - Math.cos(yaw) * CAMERA_DISTANCE
    );
    const smoothFactor = 1 - Math.exp(-stiffness * dt);
    this.camera.position.lerp(desiredPos, smoothFactor);
    this.camera.lookAt(target.x, target.y, target.z);
  }

  // 速度感：FOV 随速度呼吸（60° → 66°）
  setSpeedRatio(ratio: number) {
    const targetFov = FOV_BASE + FOV_BOOST * Math.max(0, Math.min(1, ratio));
    if (Math.abs(this.camera.fov - targetFov) > 0.01) {
      this.camera.fov += (targetFov - this.camera.fov) * 0.1;
      this.camera.updateProjectionMatrix();
    }
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.postFX.setSize(width, height);
  }

  render(dt: number = 1 / 60) {
    this.updateAtmosphere(dt);
    this.postFX.render();
  }

  // 纯白枪骑兵原版：所有机体（包括玩家、敌人、Boss、投射物）均为纯白 flat 剪影，
  // 使用 MeshBasicMaterial（无光照、无 PBR、无 emissive、无卡通描边）。
  // 视觉上仅靠几何形状区分机体类型。
  private addPart(
    group: THREE.Group,
    geo: THREE.BufferGeometry,
    pos: [number, number, number],
    rot?: [number, number, number],
    color: number = 0xffffff
  ): THREE.Mesh {
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
    group.add(mesh);
    return mesh;
  }

  createPlayerMesh(color: THREE.Color = new THREE.Color(0xffffff)): THREE.Group {
    const group = new THREE.Group();

    // TORSO — chest block + waist + 胸口反应堆（玩家色细环）
    this.addPart(group, new THREE.BoxGeometry(1.8, 1.0, 1.4), [0, 0.5, 0]);
    this.addPart(group, new THREE.BoxGeometry(1.6, 0.7, 0.4), [0, 0.6, 0.75]);
    this.addPart(group, new THREE.BoxGeometry(1.2, 0.5, 0.2), [0, 0.6, 0.95]);
    this.addPart(group, new THREE.CylinderGeometry(0.22, 0.22, 0.08, 12), [0, 0.55, 0.8], [Math.PI / 2, 0, 0]);
    this.addPart(group, new THREE.CylinderGeometry(0.27, 0.27, 0.06, 12), [0, 0.55, 0.84], [Math.PI / 2, 0, 0], color.getHex());
    this.addPart(group, new THREE.CylinderGeometry(0.8, 1.0, 0.4, 6), [0, 0.0, 0]);

    // HEAD — 头盔 + 独眼面罩（玩家色）+ 后掠 V 天线（25°）
    this.addPart(group, new THREE.BoxGeometry(0.7, 0.5, 0.7), [0, 1.3, 0]);
    this.addPart(group, new THREE.BoxGeometry(0.62, 0.09, 0.1), [0, 1.27, 0.4], undefined, color.getHex());
    this.addPart(group, new THREE.BoxGeometry(0.09, 0.32, 0.06), [0, 1.56, 0.1], [-0.44, 0, 0]);

    // SHOULDERS — 大型肩甲 + 前倾尖角
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.85, 0.35, 0.5), [side * 1.35, 0.95, -0.1], [0, 0, side * 0.35]);
      this.addPart(group, new THREE.ConeGeometry(0.34, 0.6, 4), [side * 1.78, 0.85, 0.2], [0, 0, side * -0.5]);
      this.addPart(group, new THREE.SphereGeometry(0.2, 6, 6), [side * 1.1, 0.7, 0]);
    }

    // ARMS — 含右臂长管长枪（纯白剪影，无金属感）
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.CylinderGeometry(0.2, 0.25, 0.7, 6), [side * 1.2, 0.3, 0]);
      this.addPart(group, new THREE.CylinderGeometry(0.15, 0.18, 0.55, 6), [side * 1.2, 0.3, 0.15]);
      this.addPart(group, new THREE.SphereGeometry(0.14, 6, 6), [side * 1.2, -0.1, 0]);
      this.addPart(group, new THREE.CylinderGeometry(0.16, 0.14, 0.5, 6), [side * 1.2, -0.45, 0]);
      this.addPart(group, new THREE.BoxGeometry(0.2, 0.3, 0.15), [side * 1.2, -0.45, 0.2]);
      this.addPart(group, new THREE.SphereGeometry(0.1, 6, 6), [side * 1.2, -0.7, 0]);

      if (side > 0) {
        this.addPart(group, new THREE.CylinderGeometry(0.08, 0.1, 0.8, 6), [side * 1.35, -0.3, 0.6], [0, 0, Math.PI / 2]);
        this.addPart(group, new THREE.CylinderGeometry(0.05, 0.06, 1.0, 6), [side * 1.35, -0.3, 1.0], [0, 0, Math.PI / 2]);
        this.addPart(group, new THREE.CylinderGeometry(0.07, 0.09, 0.1, 6), [side * 1.35, -0.3, 1.1], [0, 0, Math.PI / 2]);
        this.addPart(group, new THREE.BoxGeometry(0.2, 0.12, 0.3), [side * 1.35, -0.3, 0.3]);
      }
    }

    // LEGS — 反关节跖行足（大腿前倾、小腿后折、楔形足板）
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.34, 0.65, 0.4), [side * 0.5, -0.32, 0.32], [side * -0.12, 0, 0.12]);
      this.addPart(group, new THREE.SphereGeometry(0.22, 6, 6), [side * 0.5, -0.62, 0.4]);
      this.addPart(group, new THREE.BoxGeometry(0.3, 0.72, 0.36), [side * 0.5, -0.98, -0.08], [side * 0.28, 0, 0]);
      this.addPart(group, new THREE.SphereGeometry(0.16, 6, 6), [side * 0.5, -1.32, -0.25]);
      this.addPart(group, new THREE.BoxGeometry(0.42, 0.14, 0.55), [side * 0.5, -1.44, 0.18], [side * 0.18, 0, 0]);
    }

    // BACKPACK — 背包 + 推进器（白色实心，无发光尾焰）
    this.addPart(group, new THREE.BoxGeometry(1.0, 0.6, 0.4), [0, 0.5, -0.95]);
    this.addPart(group, new THREE.CylinderGeometry(0.35, 0.4, 0.4, 8), [0, 0.4, -1.2]);
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.CylinderGeometry(0.2, 0.25, 0.35, 6), [side * 0.45, 0.4, -1.15]);
      this.addPart(group, new THREE.CylinderGeometry(0.15, 0.18, 0.25, 6), [side * 0.35, 0.85, -0.95]);
    }

    // WAIST ARMOR
    this.addPart(group, new THREE.BoxGeometry(0.7, 0.2, 0.15), [0, -0.1, 0.55]);
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.15, 0.2, 0.4), [side * 0.65, -0.1, 0.2]);
    }

    // THRUSTERS — 推进器火苗（足底 ×2 + 背包 ×1，加法混合，随输入伸缩；boost 时转白蓝）
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa44, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const addFlame = (pos: [number, number, number], rot: [number, number, number]) => {
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 6), flameMat);
      f.name = 'thruster';
      f.position.set(pos[0], pos[1], pos[2]);
      f.rotation.set(rot[0], rot[1], rot[2]);
      f.scale.set(1, 1, 0.001);
      group.add(f);
    };
    addFlame([-0.5, -1.8, 0.05], [Math.PI, 0, 0]);
    addFlame([0.5, -1.8, 0.05], [Math.PI, 0, 0]);
    addFlame([0, 0.4, -1.38], [-Math.PI / 2, 0, 0]);

    return group;
  }

  updateThrusters(playerId: number, intensity: number, boost: boolean) {
    const group = this.playerMeshes.get(playerId);
    if (!group) return;
    const s = Math.max(0, Math.min(1, intensity)) * (boost ? 1.6 : 1);
    group.children.forEach(c => {
      if (c.name === 'thruster') {
        const m = c as THREE.Mesh;
        m.visible = s > 0.02;
        m.scale.set(1, 1, Math.max(0.001, s));
        (m.material as THREE.MeshBasicMaterial).color.set(boost ? 0xd0e8ff : 0xffaa44);
      }
    });
  }

  // 描边：反向膨胀壳（BackSide + 加法混合），作为原机体的子对象随动
  createOutline(group: THREE.Group, color: string): THREE.Group {
    const out = new THREE.Group();
    group.children.forEach(c => {
      if (!(c instanceof THREE.Mesh)) return;
      if (c.name === 'thruster') return;
      if (!(c.geometry instanceof THREE.BufferGeometry)) return;
      const mat = new THREE.MeshBasicMaterial({
        color, side: THREE.BackSide, transparent: true, opacity: 0.35,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const m = new THREE.Mesh(c.geometry.clone(), mat);
      m.position.copy(c.position);
      m.rotation.copy(c.rotation);
      m.scale.copy(c.scale).multiplyScalar(1.04);
      out.add(m);
    });
    return out;
  }

  createEnemyMesh(_color: THREE.Color, size: number, type: string): THREE.Group {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const addM = (geo: THREE.BufferGeometry, pos: [number, number, number], rot?: [number, number, number]) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(pos[0], pos[1], pos[2]);
      if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
      group.add(m);
    };

    switch (type) {
      case 'scout': {
        addM(new THREE.OctahedronGeometry(size * 0.7, 1), [0, 0, 0]);
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          addM(new THREE.ConeGeometry(size * 0.08, size * 0.5, 4),
            [Math.cos(angle) * size * 0.6, 0, Math.sin(angle) * size * 0.6]);
        }
        addM(new THREE.CylinderGeometry(0.02, 0.03, size * 0.4), [0, size * 0.5, 0]);
        break;
      }
      case 'assault': {
        addM(new THREE.BoxGeometry(size * 1.0, size * 0.8, size * 0.7), [0, 0, 0]);
        addM(new THREE.BoxGeometry(size * 0.7, size * 0.4, size * 0.2), [0, 0, size * 0.45]);
        addM(new THREE.BoxGeometry(size * 0.3, size * 0.25, size * 0.3), [0, size * 0.55, 0]);
        addM(new THREE.BoxGeometry(size * 0.25, size * 0.06, 0.05), [0, size * 0.55, size * 0.17]);
        for (let side = -1; side <= 1; side += 2) {
          addM(new THREE.CylinderGeometry(size * 0.08, size * 0.1, size * 0.4, 6),
            [side * size * 0.6, size * 0.1, size * 0.3], [Math.PI / 2, 0, 0]);
        }
        break;
      }
      case 'sniper': {
        addM(new THREE.CylinderGeometry(size * 0.2, size * 0.3, size * 1.0, 6), [0, 0, 0]);
        addM(new THREE.CylinderGeometry(size * 0.06, size * 0.06, size * 0.15, 6), [0, size * 0.6, 0]);
        addM(new THREE.SphereGeometry(size * 0.08, 6, 6), [0, size * 0.68, 0]);
        addM(new THREE.CylinderGeometry(size * 0.04, size * 0.06, size * 1.2, 6),
          [0, 0, size * 0.7], [Math.PI / 2, 0, 0]);
        for (let side = -1; side <= 1; side += 2) {
          addM(new THREE.CylinderGeometry(size * 0.04, size * 0.06, size * 0.3, 4),
            [side * size * 0.2, -size * 0.55, 0]);
        }
        break;
      }
      case 'shield': {
        addM(new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.5), [0, 0, 0]);
        addM(new THREE.BoxGeometry(size * 1.1, size * 0.8, size * 0.15), [0, 0, size * 0.35]);
        addM(new THREE.SphereGeometry(size * 0.15, 6, 6), [0, 0, size * 0.45]);
        for (let side = -1; side <= 1; side += 2) {
          addM(new THREE.CylinderGeometry(size * 0.1, size * 0.15, size * 0.2, 6),
            [side * size * 0.4, 0, -size * 0.3]);
        }
        break;
      }
      case 'bomber': {
        addM(new THREE.SphereGeometry(size * 0.6, 8, 8), [0, 0, 0]);
        for (let i = 0; i < 8; i++) {
          const theta = (i / 8) * Math.PI * 2;
          const phi = Math.PI * 0.5;
          const dir = new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi));
          const m = new THREE.Mesh(new THREE.ConeGeometry(size * 0.06, size * 0.35, 4), mat);
          m.position.set(dir.x * size * 0.6, dir.y * size * 0.6, dir.z * size * 0.6);
          m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          group.add(m);
        }
        break;
      }
      case 'commander': {
        addM(new THREE.DodecahedronGeometry(size * 0.6), [0, 0, 0]);
        addM(new THREE.ConeGeometry(size * 0.1, size * 0.5, 4), [0, size * 0.6, 0]);
        for (let side = -1; side <= 1; side += 2) {
          addM(new THREE.SphereGeometry(size * 0.25, 6, 6), [side * size * 0.55, size * 0.2, 0]);
        }
        addM(new THREE.BoxGeometry(size * 0.4, size * 0.3, size * 0.2), [0, 0, -size * 0.4]);
        break;
      }
      default: {
        addM(new THREE.OctahedronGeometry(size * 0.8), [0, 0, 0]);
        break;
      }
    }

    return group;
  }

  createBossMesh(_color: THREE.Color = new THREE.Color(0xffffff), size: number = 4): THREE.Group {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 原版 Boss 也是纯白剪影：一个核心体 + 周围若干小型附属几何体
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(size), mat);
    group.add(body);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(size * 0.4), mat);
    group.add(inner);

    for (let i = 0; i < 6; i++) {
      const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.8, 6), mat);
      const angle = (i / 6) * Math.PI * 2;
      turret.position.set(Math.cos(angle) * size * 1.1, 0, Math.sin(angle) * size * 1.1);
      turret.rotation.z = Math.PI / 2;
      turret.rotation.y = -angle;
      group.add(turret);
    }
    return group;
  }

  createProjectileMesh(_color: string, type: string): THREE.Mesh {
    // 原版投射物在黑底上是白色小点；保留类型差异的尺寸
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let geo: THREE.BufferGeometry;
    switch (type) {
      case 'beam': case 'sniper':
        geo = new THREE.SphereGeometry(0.3, 6, 6);
        break;
      case 'missile':
        geo = new THREE.ConeGeometry(0.2, 0.6, 6);
        break;
      default:
        geo = new THREE.SphereGeometry(0.15, 4, 4);
    }
    return new THREE.Mesh(geo, mat);
  }

  createExplosion(position: Vector3, color: string, size: number = 1) {
    const count = 30;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = size * (0.5 + Math.random() * 0.5);
      positions[i * 3] = position.x + r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = position.y + r * Math.cos(phi);
      positions[i * 3 + 2] = position.z + r * Math.sin(phi) * Math.sin(theta);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.5, vertexColors: true, transparent: true, opacity: 1,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    this.scene.add(points);

    let life = 1;
    const animate = () => {
      life -= 0.02;
      if (life <= 0) {
        this.scene.remove(points);
        geo.dispose();
        mat.dispose();
        return;
      }
      mat.opacity = life;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const array = pos.array as Float32Array;
      for (let i = 0; i < count; i++) {
        array[i * 3] += (Math.random() - 0.5) * 0.5;
        array[i * 3 + 1] += (Math.random() - 0.5) * 0.5;
        array[i * 3 + 2] += (Math.random() - 0.5) * 0.5;
      }
      pos.needsUpdate = true;
      requestAnimationFrame(animate);
    };
    animate();
  }

updateLockIndicator(playerId: number, from: Vector3, to: Vector3 | null, color: string = '#00ff44') {
    const existing = this.lockIndicators.get(playerId);
    if (!to) {
      if (existing) {
        this.scene.remove(existing);
        this.lockIndicators.delete(playerId);
      }
      return;
    }
    if (existing) {
      const pos = existing.geometry.attributes.position as THREE.BufferAttribute;
      const array = pos.array as Float32Array;
      array[0] = from.x; array[1] = from.y; array[2] = from.z;
      array[3] = to.x; array[4] = to.y; array[5] = to.z;
      pos.needsUpdate = true;
      const mat = existing.material as THREE.LineBasicMaterial;
      if (mat.color.getStyle() !== color) mat.color.set(color);
    } else {
      const geo = new THREE.BufferGeometry();
      const verts = new Float32Array([from.x, from.y, from.z, to.x, to.y, to.z]);
      geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      const mat = new THREE.LineBasicMaterial({
        color, transparent: true, opacity: 0.5, linewidth: 1,
      });
      const line = new THREE.Line(geo, mat);
      this.scene.add(line);
      this.lockIndicators.set(playerId, line);
    }
  }

  dispose() {
    this.postFX.dispose();
    this.renderer.dispose();
  }
}
