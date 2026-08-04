import * as THREE from 'three';
import { Vector3 } from '../types';
import { CAMERA_SPRING_STIFFNESS, CAMERA_SPRING_DAMPING } from '../utils/constants';

export class SceneManager {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  camera2: THREE.PerspectiveCamera | null = null;
playerMeshes: Map<number, THREE.Group> = new Map();
  enemyMeshes: Map<number, THREE.Group> = new Map();
  projectileMeshes: Map<number, THREE.Mesh> = new Map();
  particleMeshes: Map<number, THREE.Points> = new Map();
  bossMeshes: Map<number, THREE.Group> = new Map();
  lockIndicators: Map<number, THREE.Line> = new Map();
  ground: THREE.Mesh;
  grid: THREE.GridHelper;
  ambientLight: THREE.AmbientLight;
  dirLight: THREE.DirectionalLight;
  pointLight: THREE.PointLight;
  private clock: THREE.Clock;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a1a);
    this.scene.fog = new THREE.Fog(0x0a0a1a, 100, 300);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);
    this.camera.position.set(0, 20, 25);

    this.clock = new THREE.Clock();

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0x224466, 0.8);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.dirLight.position.set(50, 100, 50);
    this.dirLight.castShadow = true;
    this.scene.add(this.dirLight);

    this.pointLight = new THREE.PointLight(0x4488ff, 2, 50);
    this.pointLight.position.set(0, 10, 0);
    this.scene.add(this.pointLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(400, 400);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a20,
      roughness: 0.8,
      metalness: 0.2,
    });
    this.ground = new THREE.Mesh(groundGeo, groundMat);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -0.5;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // Grid
    this.grid = new THREE.GridHelper(400, 80, 0x224488, 0x112244);
    this.grid.position.y = 0;
    this.scene.add(this.grid);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 800;
      starPos[i * 3 + 1] = Math.random() * 400 + 50;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 800;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true });
    const stars = new THREE.Points(starsGeo, starMat);
    this.scene.add(stars);
  }

updateCamera(target: Vector3, dt: number, splitScreen: boolean, isRight: boolean = false, yaw: number = 0) {
    const cam = isRight && this.camera2 ? this.camera2 : this.camera;

    const facing = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    const desiredPos = new THREE.Vector3(
      target.x - facing.x * 15,
      target.y + 8,
      target.z - facing.z * 15
    );

    const smoothFactor = 1 - Math.exp(-CAMERA_SPRING_STIFFNESS * dt);
    cam.position.lerp(desiredPos, smoothFactor);

    cam.lookAt(target.x, target.y, target.z);
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    if (this.camera2) {
      this.camera2.aspect = width / height;
      this.camera2.updateProjectionMatrix();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  renderSplit(leftCam: THREE.PerspectiveCamera, rightCam: THREE.PerspectiveCamera) {
    const canvas = this.renderer.domElement;
    const w = canvas.width / 2;
    const h = canvas.height;

    this.renderer.setScissorTest(true);

    this.renderer.setViewport(0, 0, w, h);
    this.renderer.setScissor(0, 0, w, h);
    this.renderer.render(this.scene, leftCam);

    this.renderer.setViewport(w, 0, w, h);
    this.renderer.setScissor(w, 0, w, h);
    this.renderer.render(this.scene, rightCam);

    this.renderer.setScissorTest(false);
  }

private addPart(
    group: THREE.Group,
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: [number, number, number],
    rot?: [number, number, number],
    edgeColor: number = 0x666688,
    edgeThreshold: number = 15
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    group.add(mesh);
    // Edge lines for silhouette clarity
    const edges = new THREE.EdgesGeometry(geo, edgeThreshold);
    const lineMat = new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.4 });
    const line = new THREE.LineSegments(edges, lineMat);
    line.position.copy(mesh.position);
    if (rot) line.rotation.set(rot[0], rot[1], rot[2]);
    group.add(line);
    return mesh;
  }

  createPlayerMesh(color: THREE.Color = new THREE.Color(0x4488ff)): THREE.Group {
    const group = new THREE.Group();
    const armorMat = new THREE.MeshStandardMaterial({ color: 0xe0e4f0, metalness: 0.5, roughness: 0.3 });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x555566, metalness: 0.8, roughness: 0.2 });
    const accentMat = new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.3 });
    const accentDarkMat = new THREE.MeshStandardMaterial({ color: color.clone().multiplyScalar(0.6), metalness: 0.7, roughness: 0.3 });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: color, emissiveIntensity: 1.0, metalness: 0.3, roughness: 0.1,
    });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x333344, metalness: 0.9, roughness: 0.2 });
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x222233, metalness: 0.3, roughness: 0.8 });

    // Helper to add panel edge lines
    const addPanelLine = (geo: THREE.BufferGeometry, pos: [number, number, number], rot?: [number, number, number]) => {
      const edges = new THREE.EdgesGeometry(geo, 25);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x222233, transparent: true, opacity: 0.25 }));
      line.position.set(pos[0], pos[1], pos[2]);
      if (rot) line.rotation.set(rot[0], rot[1], rot[2]);
      group.add(line);
    };

    // === TORSO ===
    // Main torso (wider chest, narrower waist)
    this.addPart(group, new THREE.BoxGeometry(1.8, 1.0, 1.4), armorMat, [0, 0.5, 0]);
    addPanelLine(new THREE.BoxGeometry(1.8, 1.0, 1.4), [0, 0.5, 0]);
    // Chest armor plate (layered)
    this.addPart(group, new THREE.BoxGeometry(1.6, 0.7, 0.4), accentMat, [0, 0.6, 0.75]);
    // Inner chest
    this.addPart(group, new THREE.BoxGeometry(1.2, 0.5, 0.2), accentDarkMat, [0, 0.6, 0.95]);
    // Cockpit (glowing)
    this.addPart(group, new THREE.SphereGeometry(0.25, 8, 8), glowMat, [0, 0.5, 0.9]);
    // Side vents
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.15, 0.3, 0.5), ventMat, [side * 0.95, 0.4, 0.4]);
    }
    // Waist (narrower)
    this.addPart(group, new THREE.CylinderGeometry(0.8, 1.0, 0.4, 6), frameMat, [0, 0.0, 0]);

    // === HEAD ===
    // Head base (angular)
    this.addPart(group, new THREE.BoxGeometry(0.7, 0.5, 0.7, 2, 2, 2), armorMat, [0, 1.3, 0]);
    addPanelLine(new THREE.BoxGeometry(0.7, 0.5, 0.7, 2, 2, 2), [0, 1.3, 0]);
    // Visor (T-shaped)
    this.addPart(group, new THREE.BoxGeometry(0.6, 0.1, 0.1), glowMat, [0, 1.3, 0.4]);
    this.addPart(group, new THREE.BoxGeometry(0.1, 0.18, 0.1), glowMat, [0, 1.2, 0.4]);
    // Head crest / antenna
    this.addPart(group, new THREE.BoxGeometry(0.08, 0.25, 0.3), accentMat, [0, 1.6, 0]);
    // Jaw plate
    this.addPart(group, new THREE.BoxGeometry(0.5, 0.15, 0.1), frameMat, [0, 1.1, 0.35]);

    // === SHOULDERS ===
    for (let side = -1; side <= 1; side += 2) {
      // Large shoulder pauldron
      this.addPart(group, new THREE.BoxGeometry(0.8, 0.3, 0.6, 2, 2, 2), armorMat, [side * 1.3, 0.9, 0]);
      addPanelLine(new THREE.BoxGeometry(0.8, 0.3, 0.6, 2, 2, 2), [side * 1.3, 0.9, 0]);
      // Shoulder armor accent
      this.addPart(group, new THREE.BoxGeometry(0.6, 0.15, 0.4), accentMat, [side * 1.3, 1.0, 0]);
      // Shoulder joint
      this.addPart(group, new THREE.SphereGeometry(0.2, 6, 6), jointMat, [side * 1.1, 0.7, 0]);
    }

    // === ARMS ===
    for (let side = -1; side <= 1; side += 2) {
      // Upper arm armor
      this.addPart(group, new THREE.CylinderGeometry(0.2, 0.25, 0.7, 6), armorMat, [side * 1.2, 0.3, 0]);
      this.addPart(group, new THREE.CylinderGeometry(0.15, 0.18, 0.55, 6), accentMat, [side * 1.2, 0.3, 0.15]);
      // Elbow joint
      this.addPart(group, new THREE.SphereGeometry(0.14, 6, 6), jointMat, [side * 1.2, -0.1, 0]);
      // Lower arm
      this.addPart(group, new THREE.CylinderGeometry(0.16, 0.14, 0.5, 6), armorMat, [side * 1.2, -0.45, 0]);
      // Forearm armor plate
      this.addPart(group, new THREE.BoxGeometry(0.2, 0.3, 0.15), accentMat, [side * 1.2, -0.45, 0.2]);
      // Hand
      this.addPart(group, new THREE.SphereGeometry(0.1, 6, 6), jointMat, [side * 1.2, -0.7, 0]);

      // Right arm weapon
      if (side > 0) {
        // Main gun barrel
        this.addPart(group, new THREE.CylinderGeometry(0.08, 0.1, 0.8, 6), frameMat, [side * 1.35, -0.3, 0.6], [0, 0, Math.PI / 2]);
        // Second barrel
        this.addPart(group, new THREE.CylinderGeometry(0.05, 0.06, 1.0, 6), frameMat, [side * 1.35, -0.3, 1.0], [0, 0, Math.PI / 2]);
        // Muzzle flash area
        this.addPart(group, new THREE.CylinderGeometry(0.07, 0.09, 0.1, 6), accentMat, [side * 1.35, -0.3, 1.1], [0, 0, Math.PI / 2]);
        // Gun body
        this.addPart(group, new THREE.BoxGeometry(0.2, 0.12, 0.3), accentMat, [side * 1.35, -0.3, 0.3]);
      }
    }

    // === LEGS ===
    for (let side = -1; side <= 1; side += 2) {
      // Upper leg (thick)
      this.addPart(group, new THREE.CylinderGeometry(0.3, 0.35, 0.7, 6), armorMat, [side * 0.5, -0.4, 0]);
      addPanelLine(new THREE.CylinderGeometry(0.3, 0.35, 0.7, 6), [side * 0.5, -0.4, 0]);
      // Thigh armor plate
      this.addPart(group, new THREE.BoxGeometry(0.3, 0.4, 0.4), accentMat, [side * 0.5, -0.3, 0.25]);
      // Knee joint
      this.addPart(group, new THREE.SphereGeometry(0.2, 6, 6), jointMat, [side * 0.5, -0.8, 0]);
      // Knee armor
      this.addPart(group, new THREE.SphereGeometry(0.18, 6, 6), accentMat, [side * 0.5, -0.8, 0.15]);
      // Lower leg
      this.addPart(group, new THREE.CylinderGeometry(0.25, 0.2, 0.6, 6), armorMat, [side * 0.5, -1.2, 0]);
      // Shin armor
      this.addPart(group, new THREE.BoxGeometry(0.25, 0.4, 0.3), accentMat, [side * 0.5, -1.2, 0.2]);
      // Ankle joint
      this.addPart(group, new THREE.SphereGeometry(0.15, 6, 6), jointMat, [side * 0.5, -1.55, 0]);
      // Foot
      this.addPart(group, new THREE.BoxGeometry(0.4, 0.12, 0.5), armorMat, [side * 0.5, -1.65, 0.1]);
      addPanelLine(new THREE.BoxGeometry(0.4, 0.12, 0.5), [side * 0.5, -1.65, 0.1]);
      // Foot armor toe
      this.addPart(group, new THREE.BoxGeometry(0.3, 0.06, 0.15), accentMat, [side * 0.5, -1.7, 0.35]);
    }

    // === BACKPACK ===
    // Backpack base
    this.addPart(group, new THREE.BoxGeometry(1.0, 0.6, 0.4), frameMat, [0, 0.5, -0.95]);
    // Main thruster
    this.addPart(group, new THREE.CylinderGeometry(0.35, 0.4, 0.4, 8), frameMat, [0, 0.4, -1.2]);
    // Side thrusters
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.CylinderGeometry(0.2, 0.25, 0.35, 6), frameMat, [side * 0.45, 0.4, -1.15]);
    }
    // Upper thrusters
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.CylinderGeometry(0.15, 0.18, 0.25, 6), frameMat, [side * 0.35, 0.85, -0.95]);
    }
    // Thruster glow
    const glowGeo = new THREE.CylinderGeometry(0.3, 0.1, 0.15, 8);
    const glowMat2 = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
    const thrusterGlow = new THREE.Mesh(glowGeo, glowMat2);
    thrusterGlow.position.set(0, 0.3, -1.4);
    group.add(thrusterGlow);
    // Side thruster glows
    for (let side = -1; side <= 1; side += 2) {
      const sg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.06, 0.1, 6), glowMat2);
      sg.position.set(side * 0.45, 0.3, -1.35);
      group.add(sg);
    }

    // === WAIST ARMOR ===
    // Front skirt armor
    this.addPart(group, new THREE.BoxGeometry(0.7, 0.2, 0.15), accentMat, [0, -0.1, 0.55]);
    // Side skirt armor
    for (let side = -1; side <= 1; side += 2) {
      this.addPart(group, new THREE.BoxGeometry(0.15, 0.2, 0.4), accentMat, [side * 0.65, -0.1, 0.2]);
    }

    return group;
  }

createEnemyMesh(color: THREE.Color, size: number, type: string): THREE.Group {
    const group = new THREE.Group();
    const matBody = new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.3 });
    const matDark = new THREE.MeshStandardMaterial({ color: 0x444466, metalness: 0.7, roughness: 0.3 });
    const matCore = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 0.6 });
    const matGlow = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.3 });

    const addEdgeLine = (geo: THREE.BufferGeometry, pos: [number, number, number], rot?: [number, number, number]) => {
      const edges = new THREE.EdgesGeometry(geo, 20);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 }));
      line.position.set(pos[0], pos[1], pos[2]);
      if (rot) line.rotation.set(rot[0], rot[1], rot[2]);
      group.add(line);
    };

    switch (type) {
      case 'scout': {
        // Small drone-like body
        const body = new THREE.Mesh(new THREE.OctahedronGeometry(size * 0.7, 1), matBody);
        body.castShadow = true;
        group.add(body);
        const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.2, 6, 6), matCore);
        group.add(core);
        // 4 small wings
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const wing = new THREE.Mesh(new THREE.ConeGeometry(size * 0.08, size * 0.5, 4), matGlow);
          wing.position.set(Math.cos(angle) * size * 0.6, 0, Math.sin(angle) * size * 0.6);
          wing.rotation.z = Math.PI / 2;
          wing.rotation.y = -angle;
          group.add(wing);
        }
        // Top antenna
        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, size * 0.4), matDark);
        antenna.position.set(0, size * 0.5, 0);
        group.add(antenna);
        break;
      }
      case 'assault': {
        // Boxy, aggressive humanoid upper body
        const body = new THREE.Mesh(new THREE.BoxGeometry(size * 1.0, size * 0.8, size * 0.7), matBody);
        body.castShadow = true;
        group.add(body);
        addEdgeLine(new THREE.BoxGeometry(size * 1.0, size * 0.8, size * 0.7), [0, 0, 0]);
        // Chest armor plate
        const chest = new THREE.Mesh(new THREE.BoxGeometry(size * 0.7, size * 0.4, size * 0.2), matGlow);
        chest.position.set(0, 0, size * 0.45);
        group.add(chest);
        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(size * 0.3, size * 0.25, size * 0.3), matDark);
        head.position.set(0, size * 0.55, 0);
        group.add(head);
        const visor = new THREE.Mesh(new THREE.BoxGeometry(size * 0.25, size * 0.06, 0.05), matCore);
        visor.position.set(0, size * 0.55, size * 0.17);
        group.add(visor);
        // Shoulder weapons
        for (let side = -1; side <= 1; side += 2) {
          const gun = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.08, size * 0.1, size * 0.4, 6), matDark);
          gun.position.set(side * size * 0.6, size * 0.1, size * 0.3);
          gun.rotation.x = Math.PI / 2;
          group.add(gun);
        }
        break;
      }
      case 'sniper': {
        // Tall, thin frame
        const body = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.2, size * 0.3, size * 1.0, 6), matBody);
        body.castShadow = true;
        group.add(body);
        addEdgeLine(new THREE.CylinderGeometry(size * 0.2, size * 0.3, size * 1.0, 6), [0, 0, 0]);
        // Scope on top
        const scope = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.06, size * 0.06, size * 0.15, 6), matDark);
        scope.position.set(0, size * 0.6, 0);
        group.add(scope);
        const lens = new THREE.Mesh(new THREE.SphereGeometry(size * 0.08, 6, 6), matCore);
        lens.position.set(0, size * 0.68, 0);
        group.add(lens);
        // Long barrel
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.04, size * 0.06, size * 1.2, 6), matDark);
        barrel.position.set(0, 0, size * 0.7);
        barrel.rotation.x = Math.PI / 2;
        group.add(barrel);
        // Stabilizer legs
        for (let side = -1; side <= 1; side += 2) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.04, size * 0.06, size * 0.3, 4), matDark);
          leg.position.set(side * size * 0.2, -size * 0.55, 0);
          group.add(leg);
        }
        break;
      }
      case 'shield': {
        // Wide, heavy defensive frame
        const body = new THREE.Mesh(new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.5, 2, 2, 2), matBody);
        body.castShadow = true;
        group.add(body);
        addEdgeLine(new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.5, 2, 2, 2), [0, 0, 0]);
        // Large shield face
        const shield = new THREE.Mesh(new THREE.BoxGeometry(size * 1.1, size * 0.8, size * 0.15), matGlow);
        shield.position.set(0, 0, size * 0.35);
        group.add(shield);
        // Shield edge lines
        const edgeShield = new THREE.EdgesGeometry(new THREE.BoxGeometry(size * 1.1, size * 0.8, size * 0.15), 15);
        const lineShield = new THREE.LineSegments(edgeShield, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
        lineShield.position.set(0, 0, size * 0.35);
        group.add(lineShield);
        // Core glow
        const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.15, 6, 6), matCore);
        core.position.set(0, 0, size * 0.45);
        group.add(core);
        // Back thrusters
        for (let side = -1; side <= 1; side += 2) {
          const thruster = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.1, size * 0.15, size * 0.2, 6), matDark);
          thruster.position.set(side * size * 0.4, 0, -size * 0.3);
          group.add(thruster);
        }
        break;
      }
      case 'bomber': {
        // Round, explosive body
        const body = new THREE.Mesh(new THREE.SphereGeometry(size * 0.6, 8, 8), matBody);
        body.castShadow = true;
        group.add(body);
        // Spikes protruding
        for (let i = 0; i < 8; i++) {
          const theta = (i / 8) * Math.PI * 2;
          const phi = Math.PI * 0.5;
          const spike = new THREE.Mesh(new THREE.ConeGeometry(size * 0.06, size * 0.35, 4), matGlow);
          spike.position.set(Math.cos(theta) * Math.sin(phi) * size * 0.6, Math.cos(phi) * size * 0.6, Math.sin(theta) * Math.sin(phi) * size * 0.6);
          spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi)));
          group.add(spike);
        }
        // Bright core
        const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.2, 6, 6), new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1 }));
        core.position.set(0, 0, 0);
        group.add(core);
        break;
      }
      case 'commander': {
        // Larger, commanding presence
        const body = new THREE.Mesh(new THREE.DodecahedronGeometry(size * 0.6), matBody);
        body.castShadow = true;
        group.add(body);
        // Command crest
        const crest = new THREE.Mesh(new THREE.ConeGeometry(size * 0.1, size * 0.5, 4), matGlow);
        crest.position.set(0, size * 0.6, 0);
        group.add(crest);
        // Broad shoulders
        for (let side = -1; side <= 1; side += 2) {
          const shoulder = new THREE.Mesh(new THREE.SphereGeometry(size * 0.25, 6, 6), matDark);
          shoulder.position.set(side * size * 0.55, size * 0.2, 0);
          group.add(shoulder);
        }
        // Core
        const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.15, 6, 6), matCore);
        group.add(core);
        // Backpack
        const pack = new THREE.Mesh(new THREE.BoxGeometry(size * 0.4, size * 0.3, size * 0.2), matDark);
        pack.position.set(0, 0, -size * 0.4);
        group.add(pack);
        break;
      }
      default: {
        // Fallback generic enemy
        const body = new THREE.Mesh(new THREE.OctahedronGeometry(size * 0.8), matBody);
        body.castShadow = true;
        group.add(body);
        const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.3, 6, 6), matCore);
        group.add(core);
        break;
      }
    }

    return group;
  }

  createBossMesh(color: THREE.Color = new THREE.Color(0xff4444), size: number = 4): THREE.Group {
    const group = new THREE.Group();
    // Main body
    const body = new THREE.Mesh(
      new THREE.DodecahedronGeometry(size),
      new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.3,
        metalness: 0.7, roughness: 0.3,
      })
    );
    body.castShadow = true;
    group.add(body);
    // Inner core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(size * 0.4),
      new THREE.MeshStandardMaterial({
        color: 0xffffff, emissive: 0xff8800, emissiveIntensity: 1,
        transparent: true, opacity: 0.8,
      })
    );
    group.add(core);
    // Rings
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(size * 1.2, 0.1, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff4400, emissiveIntensity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    // Turrets
    for (let i = 0; i < 6; i++) {
      const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 0.8, 6),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 })
      );
      const angle = (i / 6) * Math.PI * 2;
      turret.position.set(Math.cos(angle) * size * 1.1, 0, Math.sin(angle) * size * 1.1);
      turret.rotation.z = Math.PI / 2;
      turret.rotation.y = -angle;
      group.add(turret);
    }
    return group;
  }

  createProjectileMesh(color: string, type: string): THREE.Mesh {
    const c = new THREE.Color(color);
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
    const mat = new THREE.MeshBasicMaterial({ color: c });
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
      blending: THREE.AdditiveBlending, depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    this.scene.add(points);

    // Animate and remove
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

updateLockIndicator(playerId: number, from: Vector3, to: Vector3 | null) {
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
    } else {
      const geo = new THREE.BufferGeometry();
      const verts = new Float32Array([from.x, from.y, from.z, to.x, to.y, to.z]);
      geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      const mat = new THREE.LineBasicMaterial({
        color: 0x00ff88, transparent: true, opacity: 0.4, linewidth: 1,
      });
      const line = new THREE.Line(geo, mat);
      this.scene.add(line);
      this.lockIndicators.set(playerId, line);
    }
  }

  dispose() {
    this.renderer.dispose();
  }
}
