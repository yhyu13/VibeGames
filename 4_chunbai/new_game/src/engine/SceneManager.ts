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
    this.scene.background = new THREE.Color(0x000000);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    this.camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);

    this.clock = new THREE.Clock();

    this.postFX = new PostFX(this.renderer, this.scene, this.camera, width, height);

    // 纯白枪骑兵原版：纯黑虚空 + 极少量暗蓝色条纹（深空感但无星星、无地球、无太阳）
    this.buildVoidBackground();
  }

  // 暗色背景：黑底 + 几道极弱的深蓝色径向条纹，模拟原版 Flash 的 "深空 + 边缘暗角" 效果
  private buildVoidBackground() {
    // 用一张大画布 + CanvasTexture 当背景，避免依赖灯光与色彩，让 mesh 保持 flat-white
    const size = 1024;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // 几条极淡的蓝色斜向条纹（中央到边缘）
    ctx.globalAlpha = 0.18;
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, 'rgba(40,60,140,0)');
    grad.addColorStop(0.5, 'rgba(40,60,140,0.5)');
    grad.addColorStop(1, 'rgba(40,60,140,0)');
    ctx.fillStyle = grad;
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((i / 5) * Math.PI * 2 + 0.2);
      ctx.fillRect(-size / 2, -8, size, 16);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    this.scene.background = tex;
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

  render() {
    this.postFX.render();
  }

  // 纯白枪骑兵原版：所有机体（包括玩家、敌人、Boss、投射物）均为纯白 flat 剪影，
  // 使用 MeshBasicMaterial（无光照、无 PBR、无 emissive、无卡通描边）。
  // 视觉上仅靠几何形状区分机体类型。
  private addPart(
    group: THREE.Group,
    geo: THREE.BufferGeometry,
    pos: [number, number, number],
    rot?: [number, number, number]
  ): THREE.Mesh {
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
    group.add(mesh);
    return mesh;
  }

  createPlayerMesh(_color: THREE.Color = new THREE.Color(0xffffff)): THREE.Group {
    const group = new THREE.Group();

    // TORSO — chest block + waist
    this.addPart(group, new THREE.BoxGeometry(1.8, 1.0, 1.4), [0, 0.5, 0]);
    this.addPart(group, new THREE.BoxGeometry(1.6, 0.7, 0.4), [0, 0.6, 0.75]);
    this.addPart(group, new THREE.BoxGeometry(1.2, 0.5, 0.2), [0, 0.6, 0.95]);
    this.addPart(group, new THREE.CylinderGeometry(0.8, 1.0, 0.4, 6), [0, 0.0, 0]);

    // HEAD — 头盔 + V 型天线（纯白剪影）
    this.addPart(group, new THREE.BoxGeometry(0.7, 0.5, 0.7), [0, 1.3, 0]);
    this.addPart(group, new THREE.BoxGeometry(0.6, 0.1, 0.1), [0, 1.3, 0.4]);
    this.addPart(group, new THREE.BoxGeometry(0.1, 0.18, 0.1), [0, 1.2, 0.4]);
    this.addPart(group, new THREE.BoxGeometry(0.08, 0.25, 0.3), [0, 1.6, 0]);
    this.addPart(group, new THREE.BoxGeometry(0.5, 0.15, 0.1), [0, 1.1, 0.35]);

    // SHOULDERS — 大型肩甲
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.8, 0.3, 0.6), [side * 1.3, 0.9, 0]);
      this.addPart(group, new THREE.BoxGeometry(0.6, 0.15, 0.4), [side * 1.3, 1.0, 0]);
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

    // LEGS — 厚腿 + 膝关节球
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.CylinderGeometry(0.3, 0.35, 0.7, 6), [side * 0.5, -0.4, 0]);
      this.addPart(group, new THREE.BoxGeometry(0.3, 0.4, 0.4), [side * 0.5, -0.3, 0.25]);
      this.addPart(group, new THREE.SphereGeometry(0.2, 6, 6), [side * 0.5, -0.8, 0]);
      this.addPart(group, new THREE.SphereGeometry(0.18, 6, 6), [side * 0.5, -0.8, 0.15]);
      this.addPart(group, new THREE.CylinderGeometry(0.25, 0.2, 0.6, 6), [side * 0.5, -1.2, 0]);
      this.addPart(group, new THREE.BoxGeometry(0.25, 0.4, 0.3), [side * 0.5, -1.2, 0.2]);
      this.addPart(group, new THREE.SphereGeometry(0.15, 6, 6), [side * 0.5, -1.55, 0]);
      this.addPart(group, new THREE.BoxGeometry(0.4, 0.12, 0.5), [side * 0.5, -1.65, 0.1]);
      this.addPart(group, new THREE.BoxGeometry(0.3, 0.06, 0.15), [side * 0.5, -1.7, 0.35]);
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
