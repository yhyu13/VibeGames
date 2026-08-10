/**
 * engine/IntroRasterAdapter.ts — intro 的 raster(PBR)回退适配器
 *
 * 能力探测失败时,intro 保持今天完全一致的画面:Three 场景 + instanced
 * 体素舞台 + 点光/阴影 + ACES。场景内容与网格构建逐字保留原
 * VoxelIntroStage(曾内联于 IntroEngine.ts);全部物理/状态机委托
 * engine/introStage.ts 的 IntroStageState(raytrace 路径共享),
 * 本文件只做"状态 → instanced mesh 矩阵"的视图写入。
 *
 * 相机由引擎经 CameraState 驱动(与 raytrace 同一视角)。
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { IntroState } from '../store';
import { SCENERY_COUNTS, TERRAIN_LAYOUT } from '../intro/stageVisuals';
import {
  BOSS_BASE,
  GROUND_Y,
  INTRO_ARMY,
  IntroStageState,
  type IntroStageCallbacks,
  type IntroStageDriver,
  type StageVoxel,
} from './introStage';
import type { CameraState, SceneRenderer, VisualState } from './raytrace/SceneContract';

interface PataponRig {
  root: THREE.Group;
  body: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  bow: THREE.Group | null;
}

function hash(value: number): number {
  const result = Math.sin(value * 127.1 + 311.7) * 43758.5453;
  return result - Math.floor(result);
}

function surfaceEllipsoid(rx: number, ry: number, rz: number, resolution: number): StageVoxel[] {
  const points: StageVoxel[] = [];
  const bound = Math.max(rx, ry, rz) * 1.05;
  const step = (2 * bound) / resolution;
  const occupied = new Uint8Array(resolution ** 3);
  const index = (x: number, y: number, z: number) => x + resolution * (y + resolution * z);
  for (let z = 0; z < resolution; z++) for (let y = 0; y < resolution; y++) for (let x = 0; x < resolution; x++) {
    const px = -bound + (x + 0.5) * step;
    const py = -bound + (y + 0.5) * step;
    const pz = -bound + (z + 0.5) * step;
    if ((px / rx) ** 2 + (py / ry) ** 2 + (pz / rz) ** 2 <= 1) occupied[index(x, y, z)] = 1;
  }
  const neighbors = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  for (let z = 0; z < resolution; z++) for (let y = 0; y < resolution; y++) for (let x = 0; x < resolution; x++) {
    if (!occupied[index(x, y, z)]) continue;
    const surface = neighbors.some(([dx = 0, dy = 0, dz = 0]) => {
      const nx = x + dx; const ny = y + dy; const nz = z + dz;
      return nx < 0 || ny < 0 || nz < 0 || nx >= resolution || ny >= resolution || nz >= resolution || !occupied[index(nx, ny, nz)];
    });
    if (surface) points.push({ p: new THREE.Vector3(-bound + (x + 0.5) * step, -bound + (y + 0.5) * step, -bound + (z + 0.5) * step), size: step * 0.91, active: true });
  }
  return points;
}

/** 原 VoxelIntroStage 的视图部分:构造全部 mesh,每帧从 IntroStageState 同步 */
class VoxelIntroView {
  readonly impactLight = new THREE.PointLight(0xff6b28, 0, 9, 2);
  private readonly cube = new THREE.BoxGeometry(1, 1, 1);
  private readonly dummy = new THREE.Object3D();
  private readonly army: PataponRig[] = [];
  private readonly boss = new THREE.Group();
  private readonly bossMesh: THREE.InstancedMesh;
  private readonly interiorMesh: THREE.InstancedMesh;
  private readonly arrow = new THREE.Group();
  private readonly debrisMesh: THREE.InstancedMesh;

  constructor(private readonly scene: THREE.Scene, private readonly state: IntroStageState) {
    this.scene.add(this.impactLight);
    this.buildTerrain();
    this.army.push(
      this.buildPatapon(INTRO_ARMY[0]!.x, INTRO_ARMY[0]!.z, INTRO_ARMY[0]!.accent),
      this.buildPatapon(INTRO_ARMY[1]!.x, INTRO_ARMY[1]!.z, INTRO_ARMY[1]!.accent, true),
      this.buildPatapon(INTRO_ARMY[2]!.x, INTRO_ARMY[2]!.z, INTRO_ARMY[2]!.accent),
    );
    this.boss.position.set(BOSS_BASE.x, BOSS_BASE.y, BOSS_BASE.z);
    this.scene.add(this.boss);
    this.bossMesh = this.instanced(state.bossVoxels, 0x84291f, 0.72);
    this.boss.add(this.bossMesh);
    this.boss.add(this.instanced(surfaceEllipsoid(1.5, 1.4, 0.48, 26).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.5, 1.72)) })), 0xf0db8a, 0.52));
    this.boss.add(this.instanced(surfaceEllipsoid(0.68, 0.7, 0.3, 18).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.5, 2.12)) })), 0x25120f, 0.7));
    this.buildHorns();
    this.interiorMesh = new THREE.InstancedMesh(this.cube, this.material(0x35100e, 0.94), 240);
    this.interiorMesh.count = 0;
    this.boss.add(this.interiorMesh);
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.1), this.material(0x54351f, 0.8));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.55, 4), this.material(0xd7cfb6, 0.35));
    tip.rotation.z = -Math.PI / 2; tip.position.x = 1.38;
    this.arrow.add(shaft, tip); this.arrow.visible = false; this.scene.add(this.arrow);
    this.debrisMesh = new THREE.InstancedMesh(this.cube, this.material(0x7b251e, 0.76), this.state.debris.length);
    this.debrisMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.debrisMesh.count = 0; this.scene.add(this.debrisMesh);
  }

  /** 每帧:把 IntroStageState 写进 mesh(物理已在 state.update 完成) */
  sync(): void {
    const state = this.state;
    this.impactLight.intensity = state.impact * 42;
    this.impactLight.position.copy(state.impactPoint);
    this.boss.position.copy(state.bossPos);

    this.army.forEach((rig, index) => {
      const pose = state.armyPose[index]!;
      const base = INTRO_ARMY[index]!;
      rig.root.position.set(base.x, pose.y, base.z);
      rig.body.rotation.z = pose.bodyRotZ;
      rig.leftArm.rotation.z = pose.leftArmZ;
      rig.rightArm.rotation.z = pose.rightArmZ;
      rig.leftLeg.rotation.z = pose.leftLegZ;
      rig.rightLeg.rotation.z = pose.rightLegZ;
      if (rig.bow) {
        rig.rightArm.rotation.y = pose.rightArmY;
        rig.bow.rotation.y = pose.bowRotY;
      }
    });

    this.arrow.visible = state.arrowVisible;
    if (state.arrowVisible) {
      this.arrow.position.copy(state.arrowPosition);
      this.arrow.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), state.arrowDirection);
    }

    this.writeBoss();
    this.writeInterior();
    this.writeDebris();
  }

  private writeBoss(): void {
    let count = 0;
    this.state.bossVoxels.forEach((voxel) => {
      if (!voxel.active) return;
      this.dummy.position.copy(voxel.p);
      this.dummy.rotation.set(0, 0, 0);
      this.dummy.scale.setScalar(voxel.size);
      this.dummy.updateMatrix();
      this.bossMesh.setMatrixAt(count++, this.dummy.matrix);
    });
    this.bossMesh.count = count;
    this.bossMesh.instanceMatrix.needsUpdate = true;
  }

  private writeInterior(): void {
    const indices = this.state.exposedInterior;
    indices.forEach((interiorIndex, index) => {
      const voxel = this.state.interior[interiorIndex]!;
      this.dummy.position.copy(voxel.p);
      this.dummy.rotation.set(0, 0, 0);
      this.dummy.scale.setScalar(voxel.size);
      this.dummy.updateMatrix();
      this.interiorMesh.setMatrixAt(index, this.dummy.matrix);
    });
    this.interiorMesh.count = indices.length;
    this.interiorMesh.instanceMatrix.needsUpdate = true;
  }

  private writeDebris(): void {
    let count = 0;
    this.state.debris.forEach((piece) => {
      if (!piece.active) return;
      this.dummy.position.copy(piece.p);
      this.dummy.rotation.set(piece.rotation.x, piece.rotation.y, piece.rotation.z);
      this.dummy.scale.setScalar(piece.size);
      this.dummy.updateMatrix();
      this.debrisMesh.setMatrixAt(count++, this.dummy.matrix);
    });
    this.debrisMesh.count = count;
    this.debrisMesh.instanceMatrix.needsUpdate = true;
  }

  private material(color: THREE.ColorRepresentation, roughness: number): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0.02, clearcoat: 0.12, clearcoatRoughness: 0.5, envMapIntensity: 0.85 });
  }

  private instanced(points: StageVoxel[], color: THREE.ColorRepresentation, roughness: number): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(this.cube, this.material(color, roughness), points.length);
    mesh.castShadow = true; mesh.receiveShadow = true;
    points.forEach((voxel, index) => {
      this.dummy.position.copy(voxel.p);
      this.dummy.scale.setScalar(voxel.size);
      this.dummy.updateMatrix();
      mesh.setMatrixAt(index, this.dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  private buildPatapon(x: number, z: number, accent: number, archer = false): PataponRig {
    const group = new THREE.Group(); const body = new THREE.Group(); group.position.set(x, -0.2, z); group.add(body); this.scene.add(group);
    body.add(this.instanced(surfaceEllipsoid(1.05, 1.02, 0.72, 24), 0x12100e, 0.78));
    group.add(this.instanced(surfaceEllipsoid(0.72, 0.72, 0.25, 16).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.05, 0.67)) })), 0xf4eed7, 0.5));
    group.add(this.instanced(surfaceEllipsoid(0.28, 0.3, 0.16, 10).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0.05, 0.05, 0.9)) })), 0x11100e, 0.7));
    ([[-0.42, 1.8, 0xdb4c34], [0, 2.05, accent], [0.42, 1.82, 0xe0b62e]] as const).forEach(([px, height, color]) => {
      const points: StageVoxel[] = [];
      for (let y = 1.05; y < height; y += 0.16) points.push({ p: new THREE.Vector3(px, y, 0), size: 0.14, active: true });
      group.add(this.instanced(points, color, 0.6));
    });
    const limb = (px: number, py: number) => {
      const pivot = new THREE.Group(); pivot.position.set(px, py, 0);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.9, 0.16), this.material(0x17130f, 0.8));
      mesh.position.y = -0.4; pivot.add(mesh); body.add(pivot); return pivot;
    };
    const leftArm = limb(-0.92, 0.45); const rightArm = limb(0.92, 0.45); const leftLeg = limb(-0.43, -0.75); const rightLeg = limb(0.43, -0.75);
    let bowGroup: THREE.Group | null = null;
    if (archer) {
      bowGroup = new THREE.Group();
      const bow: StageVoxel[] = [];
      for (let i = -8; i <= 8; i++) bow.push({ p: new THREE.Vector3(0.9 + Math.abs(i) * 0.045, i * 0.15, 0.35), size: 0.11, active: true });
      for (let i = -8; i <= 8; i++) bow.push({ p: new THREE.Vector3(0.92, i * 0.15, 0.35), size: 0.055, active: true });
      bowGroup.add(this.instanced(bow, 0xd8aa4c, 0.62)); body.add(bowGroup);
    }
    return { root: group, body, leftArm, rightArm, leftLeg, rightLeg, bow: bowGroup };
  }

  private buildTerrain(): void {
    const tops: StageVoxel[] = [];
    const earth: StageVoxel[] = [];
    for (let x = TERRAIN_LAYOUT.xMin; x <= TERRAIN_LAYOUT.xMax; x += TERRAIN_LAYOUT.tilePitch) for (let z = TERRAIN_LAYOUT.zMin; z <= TERRAIN_LAYOUT.zMax; z += TERRAIN_LAYOUT.tilePitch) {
      tops.push({ p: new THREE.Vector3(x, GROUND_Y, z), size: 1, active: true });
      earth.push({ p: new THREE.Vector3(x, GROUND_Y - 0.78, z), size: 1, active: true });
    }
    const top = this.instanced(tops, 0x6f9b45, 0.9); top.scale.set(TERRAIN_LAYOUT.tileFootprint, TERRAIN_LAYOUT.topThickness, TERRAIN_LAYOUT.tileFootprint); this.scene.add(top);
    const sides = this.instanced(earth, 0x6d4328, 0.96); sides.scale.set(TERRAIN_LAYOUT.tileFootprint, TERRAIN_LAYOUT.earthDepth, TERRAIN_LAYOUT.tileFootprint); this.scene.add(sides);
    const sun = new THREE.Mesh(new THREE.CircleGeometry(3.6, 48), new THREE.MeshBasicMaterial({ color: 0xffd477, fog: false })); sun.position.set(-11, 8, -24); this.scene.add(sun);
    this.buildScenery();
  }

  private buildScenery(): void {
    const add = (geometry: THREE.BufferGeometry, color: number, positions: readonly (readonly [number, number, number])[], scale: readonly [number, number, number], roughness = 0.88) => {
      const mesh = new THREE.InstancedMesh(geometry, this.material(color, roughness), positions.length);
      positions.forEach(([x, y, z], index) => {
        this.dummy.position.set(x, y, z);
        this.dummy.rotation.set(0, hash(index + x) * Math.PI, 0);
        this.dummy.scale.set(...scale);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(index, this.dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true; mesh.receiveShadow = true; this.scene.add(mesh);
    };
    const spread = (count: number, make: (i: number) => readonly [number, number, number]) => Array.from({ length: count }, (_, i) => make(i));
    add(new THREE.ConeGeometry(1, 1, 4), 0x487aa0, spread(9, (i) => [-20 + i * 5, 3 + hash(i) * 2, -30 - (i % 2) * 3]), [4.2, 7.5, 2.2]);
    add(new THREE.ConeGeometry(1, 1, 4), 0x315f82, spread(8, (i) => [-18 + i * 5.2, 1.8 + hash(i + 30) * 1.5, -25]), [3.5, 6.2, 2]);
    add(new THREE.ConeGeometry(1, 1, 4), 0x244a68, spread(7, (i) => [-16 + i * 5.4, 0.7 + hash(i + 60), -21]), [2.8, 4.8, 1.8]);

    const treeX = [-16, -12, -8.5, -4.5, 5, 10.5, 15.5];
    add(new THREE.BoxGeometry(1, 1, 1), 0x30251f, treeX.map((x, i) => [x, 3.1 + (i % 2) * 0.7, -16 - (i % 3)]), [1.05, 10, 1.05]);
    add(new THREE.BoxGeometry(1, 1, 1), 0x3d3022, spread(SCENERY_COUNTS.branches, (i) => [treeX[i % treeX.length]! + (i % 2 ? 1.15 : -1.15), 6 + (i % 3) * 1.1, -16 - (i % 3)]), [2.2, 0.48, 0.55]);
    add(new THREE.BoxGeometry(1, 1, 1), 0x4a3524, spread(SCENERY_COUNTS.roots, (i) => [treeX[i % treeX.length]! + (i % 2 ? 0.8 : -0.8), -1.2, -15.5 - (i % 3)]), [1.8, 0.42, 0.7]);
    add(new THREE.BoxGeometry(1, 1, 1), 0x326f3d, spread(SCENERY_COUNTS.canopyClusters, (i) => [treeX[i % treeX.length]! + ((i % 4) - 1.5) * 1.15, 8.1 + (i % 3) * 1.15, -16 - (i % 3)]), [2.4, 2.15, 2.1]);
    add(new THREE.BoxGeometry(1, 1, 1), 0x579348, spread(18, (i) => [treeX[i % treeX.length]! + ((i % 3) - 1) * 1.45, 9.2 + (i % 2), -15.4 - (i % 3)]), [1.65, 1.45, 1.6]);

    const islands = [[-14, 4, -20], [-7, 6, -24], [1, 8, -28], [9, 5.4, -23], [16, 7, -27]] as const;
    add(new THREE.ConeGeometry(1, 2.4, 6), 0x65422d, islands, [2.3, 2.2, 1.6]);
    add(new THREE.CylinderGeometry(1, 1, 0.32, 6), 0x649b49, islands.map(([x, y, z]) => [x, y + 1.25, z]), [2.35, 1, 1.65]);
    add(new THREE.BoxGeometry(1, 1, 1), 0xf5f0df, spread(SCENERY_COUNTS.clouds * 3, (i) => [-19 + (i % 9) * 4.8 + (i % 3) * 0.75, 9 + (i % 3) * 0.6, -22 - (i % 2) * 3]), [2.2, 0.65, 0.75], 0.7);
  }

  private buildHorns(): void {
    for (const side of [-1, 1]) {
      const points: StageVoxel[] = [];
      for (let i = 0; i < 15; i++) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) points.push({ p: new THREE.Vector3(side * (1.2 + i * 0.065) + a * 0.12, 2.7 + i * 0.18, b * 0.12), size: 0.2, active: true });
      this.boss.add(this.instanced(points, 0xc6a44e, 0.55));
    }
  }
}

export class IntroRasterAdapter implements SceneRenderer<IntroState>, IntroStageDriver {
  readonly kind = 'raster' as const;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly state: IntroStageState;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private view: VoxelIntroView | null = null;

  constructor(renderer: THREE.WebGLRenderer, callbacks: IntroStageCallbacks) {
    this.renderer = renderer;
    this.state = new IntroStageState(callbacks);
  }

  get impact(): number {
    return this.state.impact;
  }

  activate(): void {
    // raster 路径恢复 tone mapping / 像素比(raytrace 曾关闭/压限)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x78acd0);
    scene.fog = new THREE.Fog(0xa9c7c0, 32, 72);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffe6a6, 0x30263b, 1.35));
    const key = new THREE.DirectionalLight(0xffc96f, 5.2);
    key.position.set(-9, 14, 11);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6b9dff, 3.4);
    rim.position.set(10, 7, -11);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xff7650, 1.15);
    fill.position.set(5, 3, 9);
    scene.add(fill);

    this.scene = scene;
    this.camera = camera;
    this.view = new VoxelIntroView(scene, this.state);
  }

  render(_snapshot: IntroState, _visual: VisualState, camera: CameraState, _elapsed: number): void {
    if (!this.scene || !this.camera) return;
    this.camera.position.copy(camera.position);
    this.camera.up.copy(camera.up);
    this.camera.lookAt(
      camera.position.x + camera.fwd.x,
      camera.position.y + camera.fwd.y,
      camera.position.z + camera.fwd.z,
    );
    this.renderer.render(this.scene, this.camera);
  }

  setQuality(_level: number): void {
    // raster intro 无质量阶梯(回退路径保持今天一致的画面)
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
    if (this.camera) {
      this.camera.aspect = width / Math.max(1, height);
      this.camera.updateProjectionMatrix();
    }
  }

  dispose(): void {
    this.view = null;
    this.camera = null;
    this.scene = null;
  }

  pulseDance(progress: number): void {
    this.state.pulseDance(progress);
  }

  launch(power?: number): void {
    this.state.launch(power);
  }

  reset(): void {
    this.state.reset();
  }

  update(dt: number, timeMs: number): void {
    this.state.update(dt, timeMs);
    this.view?.sync();
  }
}
