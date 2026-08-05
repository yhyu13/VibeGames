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
    // 城市天际线、体积雾霾、全息粒子以独立 Object3D 加入场景（不是背景图），
    // 这样它们就有真实的世界坐标，可被相机剔除 / 雾化。
    this.scene.background = new THREE.Color(0x000000);
    // 远雾：让远端城市与雾面柔和地溶进黑色虚空（CP2077 经典深度感）
    this.scene.fog = new THREE.Fog(0x000000, 180, 600);

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
  private cityRing!: THREE.Group;
  private hazePlane!: THREE.Mesh;
  private skyCap!: THREE.Mesh;
  private hologramParticles!: THREE.Points;
  private particleData!: { velocities: Float32Array };
  private cityMaterials: THREE.MeshBasicMaterial[] = [];

  private buildCyberpunkBackground() {
    this.buildCityRing();
    this.buildHazePlane();
    this.buildHologramParticles();
  }

  // 远端城市天际线：60+ 座高低不一的塔楼围成圆环，body 暗、window 亮
  // 配色：黄(主) + 青(次) + 品红(偶) — CP2077 招牌三色霓虹
  private buildCityRing() {
    const group = new THREE.Group();
    const ringRadius = 380;
    const towerCount = 72;
    const windowPalette = [
      new THREE.Color(0xffdd44), // Cyberpunk yellow (主)
      new THREE.Color(0x44ddff), // Cyan
      new THREE.Color(0xff44aa), // Magenta
      new THREE.Color(0xffaa22), // Amber
    ];

    for (let i = 0; i < towerCount; i++) {
      const angle = (i / towerCount) * Math.PI * 2;
      const dist = ringRadius + (Math.random() - 0.5) * 40;
      const width = 8 + Math.random() * 10;
      const depth = 8 + Math.random() * 10;
      const height = 30 + Math.random() * 90;

      // 暗色塔身 — body 用近黑色 MeshBasicMaterial，不依赖灯光
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshBasicMaterial({ color: 0x05060a })
      );
      body.position.set(
        Math.cos(angle) * dist,
        height / 2 - 10,
        Math.sin(angle) * dist
      );
      group.add(body);

      // 窗户贴片 — 多个细长 box 贴在塔身表面，霓虹色，无灯光自发光
      const floors = 4 + Math.floor(Math.random() * 6);
      const winRows = 2 + Math.floor(Math.random() * 3);
      for (let f = 0; f < floors; f++) {
        for (let r = 0; r < winRows; r++) {
          if (Math.random() < 0.35) continue;
          const baseColor = windowPalette[Math.floor(Math.random() * windowPalette.length)];
          const mat = new THREE.MeshBasicMaterial({
            color: baseColor,
            transparent: true,
            opacity: 1,
          });
          this.cityMaterials.push(mat);
          const win = new THREE.Mesh(
            new THREE.BoxGeometry(width * 0.7, 0.6, 0.2),
            mat
          );
          const fy = -10 + (f + 1) * (height / floors);
          const ry = (r - (winRows - 1) / 2) * 1.2;
          const dx = -Math.cos(angle);
          const dz = -Math.sin(angle);
          win.position.set(
            Math.cos(angle) * (dist - depth / 2 - 0.1) + dx * ry,
            fy,
            Math.sin(angle) * (dist - depth / 2 - 0.1) + dz * ry
          );
          win.lookAt(win.position.x + dx, fy, win.position.z + dz);
          group.add(win);
        }
      }
    }

    this.cityRing = group;
    this.scene.add(this.cityRing);
  }

  // 体积雾：水平大圆盘 + 天空顶盖，additive blend，从远处城市霓虹色"接"过来
  private buildHazePlane() {
    const size = 1024;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0.0, 'rgba(120, 80, 180, 0.55)');
    grad.addColorStop(0.4, 'rgba(60, 100, 200, 0.30)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 20 + Math.random() * 80;
      const sg = ctx.createRadialGradient(x, y, 0, x, y, r);
      sg.addColorStop(0, 'rgba(80, 120, 220, 0.10)');
      sg.addColorStop(1, 'rgba(80, 120, 220, 0)');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;

    const geo = new THREE.PlaneGeometry(900, 900, 1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0.7,
    });
    this.hazePlane = new THREE.Mesh(geo, mat);
    this.hazePlane.rotation.x = -Math.PI / 2;
    this.hazePlane.position.y = -8;
    this.scene.add(this.hazePlane);

    this.skyCap = new THREE.Mesh(
      new THREE.PlaneGeometry(900, 500),
      new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        opacity: 0.25,
      })
    );
    this.skyCap.position.y = 80;
    this.skyCap.rotation.x = Math.PI;
    this.scene.add(this.skyCap);
  }

  // 全息粒子：缓慢漂移的数据尘埃 — CP2077 招牌的"空气中飘着数据"
  private buildHologramParticles() {
    const count = 450;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(0xffdd44),
      new THREE.Color(0x44ddff),
      new THREE.Color(0xff44aa),
    ];
    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      positions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r * 0.6 + 30;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
      velocities[i * 3] = (Math.random() - 0.5) * 0.6;
      velocities[i * 3 + 1] = 0.2 + Math.random() * 0.4;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.hologramParticles = new THREE.Points(geo, mat);
    this.scene.add(this.hologramParticles);
    this.particleData = { velocities };
  }

  // 每帧调用：漂移粒子 + 雾面跟随相机 + 城市环缓慢自转
  updateAtmosphere(dt: number) {
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

    if (this.hazePlane) {
      this.hazePlane.position.x = this.camera.position.x;
      this.hazePlane.position.z = this.camera.position.z;
    }
    if (this.skyCap) {
      this.skyCap.position.x = this.camera.position.x;
      this.skyCap.position.z = this.camera.position.z;
    }

    if (this.cityRing) {
      this.cityRing.rotation.y += dt * (Math.PI * 2) / 90;
    }
  }

  // 城市霓虹的"亮起进度"（0→1）— C0 intro 会用它做"城市一区一区点亮"
  setCityIgnition(progress: number) {
    const p = Math.max(0, Math.min(1, progress));
    for (const m of this.cityMaterials) {
      m.opacity = p;
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
