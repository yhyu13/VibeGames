import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { usePatapongStore, type IntroState } from '../store';
import type { NoteType } from '../intro/types';
import type { UiCommand } from '../store';
import { intersectEllipsoid } from '../core/physics';
import { selectCrater, voxelizeEllipsoid } from '../core/voxel';
import { acceptsNextNote, BEAT_SECONDS, debrisCountForPower, distanceToBeat, timingGrade, timingPower, type TimingGrade } from '../intro/rhythm';

const FIXED_DT = 1 / 60;
const COMMAND: readonly NoteType[] = ['PATA', 'PON', 'PATA', 'PON'];
const KEY_NOTES: Record<string, NoteType> = { KeyW: 'PATA', KeyA: 'PON', KeyS: 'DON', KeyD: 'CHAKA' };
const NOTE_KEYS: Record<NoteType, string> = { PATA: 'W', PON: 'A', DON: 'S', CHAKA: 'D' };
const GROUND_Y = -2.2;

interface Voxel { p: THREE.Vector3; size: number; active: boolean }
interface Debris { active: boolean; p: THREE.Vector3; v: THREE.Vector3; rotation: THREE.Vector3; spin: THREE.Vector3; size: number; age: number }
interface PataponRig { root: THREE.Group; body: THREE.Group; leftArm: THREE.Group; rightArm: THREE.Group; leftLeg: THREE.Group; rightLeg: THREE.Group; bow: THREE.Group | null }

function hash(value: number): number {
  const result = Math.sin(value * 127.1 + 311.7) * 43758.5453;
  return result - Math.floor(result);
}

function surfaceEllipsoid(rx: number, ry: number, rz: number, resolution: number): Voxel[] {
  const points: Voxel[] = [];
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

class VoxelIntroStage {
  readonly impactLight = new THREE.PointLight(0xff6b28, 0, 9, 2);
  private readonly cube = new THREE.BoxGeometry(1, 1, 1);
  private readonly dummy = new THREE.Object3D();
  private readonly army: PataponRig[] = [];
  private readonly armyBase: THREE.Vector3[] = [];
  private readonly dance = [0, 0, 0];
  private readonly boss = new THREE.Group();
  private readonly bossBase = new THREE.Vector3(7.1, 0.9, -0.4);
  private readonly bossModel = voxelizeEllipsoid({ x: 3.2, y: 4.45, z: 2.15 }, 44);
  private readonly bossVoxels = this.bossModel.cells.map((cell) => ({ p: new THREE.Vector3(cell.x, cell.y, cell.z), size: cell.size, active: true }));
  private readonly bossMesh: THREE.InstancedMesh;
  private readonly interior: Voxel[] = [];
  private readonly interiorMesh: THREE.InstancedMesh;
  private readonly arrow = new THREE.Group();
  private readonly debris: Debris[] = Array.from({ length: 64 }, () => ({ active: false, p: new THREE.Vector3(), v: new THREE.Vector3(), rotation: new THREE.Vector3(), spin: new THREE.Vector3(), size: 0.2, age: 0 }));
  private readonly debrisMesh: THREE.InstancedMesh;
  private arrowPosition = new THREE.Vector3();
  private arrowVelocity = new THREE.Vector3();
  private readonly arrowPrevious = new THREE.Vector3();
  private readonly arrowDirection = new THREE.Vector3();
  private state: 'input' | 'flight' | 'hold' | 'debris' | 'ending' = 'input';
  private holdTicks = 0;
  private titleDelay = 0;
  private impact = 0;
  private recoil = 0;
  private attackPower = 0.5;

  constructor(private readonly scene: THREE.Scene, private readonly onImpact: (debris: number, crater: number) => void, private readonly onEnding: () => void) {
    this.scene.add(this.impactLight);
    this.buildTerrain();
    this.army.push(this.buildPatapon(-8, 1.35, 0x42a878), this.buildPatapon(-5.2, 0, 0xe2b62e, true), this.buildPatapon(-7.7, -1.45, 0x3e78b7));
    this.army.forEach((unit) => this.armyBase.push(unit.root.position.clone()));
    this.boss.position.copy(this.bossBase);
    this.scene.add(this.boss);
    this.bossMesh = this.instanced(this.bossVoxels, 0x84291f, 0.72);
    this.boss.add(this.bossMesh);
    this.boss.add(this.instanced(surfaceEllipsoid(1.5, 1.4, 0.48, 26).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.5, 1.72)) })), 0xf0db8a, 0.52));
    this.boss.add(this.instanced(surfaceEllipsoid(0.68, 0.7, 0.3, 18).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.5, 2.12)) })), 0x25120f, 0.7));
    this.buildHorns();
    for (let x = -2.5; x <= 2.5; x += 0.25) for (let y = -3; y <= 3; y += 0.25) for (let z = 0.5; z <= 1.65; z += 0.25) {
      if ((x / 2.55) ** 2 + (y / 3.05) ** 2 + (z / 1.65) ** 2 <= 1) this.interior.push({ p: new THREE.Vector3(x, y, z), size: 0.22, active: false });
    }
    this.interiorMesh = new THREE.InstancedMesh(this.cube, this.material(0x35100e, 0.94), 240);
    this.interiorMesh.count = 0;
    this.boss.add(this.interiorMesh);
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.1), this.material(0x54351f, 0.8));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.55, 4), this.material(0xd7cfb6, 0.35));
    tip.rotation.z = -Math.PI / 2; tip.position.x = 1.38;
    this.arrow.add(shaft, tip); this.arrow.visible = false; this.scene.add(this.arrow);
    this.debrisMesh = new THREE.InstancedMesh(this.cube, this.material(0x7b251e, 0.76), this.debris.length);
    this.debrisMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.debrisMesh.count = 0; this.scene.add(this.debrisMesh);
  }

  pulseDance(progress: number): void { this.dance.fill(progress); }
  launch(power = 0.5): void {
    if (this.state !== 'input') return;
    this.attackPower = power; const release = new THREE.Vector3(-5.2, 1.15, 0.3); const target = new THREE.Vector3(5.4, 1.2, 0.55); const flight = 1.05 / (0.9 + power * 0.25);
    this.arrowPosition.copy(release);
    this.arrowVelocity.set((target.x - release.x) / flight, (target.y - release.y + 4.9 * flight * flight) / flight, (target.z - release.z) / flight);
    this.arrow.visible = true; this.arrow.position.copy(release); this.state = 'flight';
  }
  reset(): void {
    this.state = 'input'; this.holdTicks = 0; this.titleDelay = 0; this.impact = 0; this.recoil = 0; this.arrow.visible = false;
    this.bossVoxels.forEach((voxel) => { voxel.active = true; }); this.writeBoss(); this.interiorMesh.count = 0; this.interiorMesh.instanceMatrix.needsUpdate = true;
    this.debris.forEach((piece) => { piece.active = false; }); this.writeDebris(); this.boss.position.copy(this.bossBase); this.dance.fill(0);
  }
  update(dt: number, time: number): void {
    if (this.state === 'flight') {
      this.arrowPrevious.copy(this.arrowPosition); this.arrowVelocity.y -= 9.8 * dt; this.arrowPosition.addScaledVector(this.arrowVelocity, dt); this.arrow.position.copy(this.arrowPosition);
      this.arrow.quaternion.setFromUnitVectors(this.arrowDirection.set(1, 0, 0), this.arrowDirection.copy(this.arrowVelocity).normalize());
      const hit = intersectEllipsoid(this.arrowPrevious, this.arrowPosition, { center: this.boss.position, radii: { x: 3.2, y: 4.45, z: 2.15 } });
      if (hit) { this.arrowPosition.set(hit.point.x + hit.normal.x * this.bossModel.step * .5, hit.point.y + hit.normal.y * this.bossModel.step * .5, hit.point.z + hit.normal.z * this.bossModel.step * .5); this.arrow.position.copy(this.arrowPosition); this.openCrater(new THREE.Vector3(hit.point.x, hit.point.y, hit.point.z)); }
    } else if (this.state === 'hold') {
      this.holdTicks--;
      if (this.holdTicks <= 0) { this.state = 'debris'; this.titleDelay = 1.15; }
    } else if (this.state === 'debris') {
      this.stepDebris(dt); this.titleDelay -= dt;
      if (this.titleDelay <= 0) { this.state = 'ending'; this.onEnding(); }
    } else if (this.state === 'ending') this.stepDebris(dt);
    this.impact = Math.max(0, this.impact - dt * 4.2); this.impactLight.intensity = this.impact * 42;
    this.recoil = Math.max(0, this.recoil - dt * 1.8); this.boss.position.x = this.bossBase.x + this.recoil;
    this.army.forEach((rig, index) => {
      this.dance[index] = Math.max(0, (this.dance[index] ?? 0) - dt * 3.8); const pulse = this.dance[index] ?? 0; const base = this.armyBase[index]!;
      const idle = Math.sin(time * .003 + index) * .045; const tap = Math.sin((1 - pulse) * Math.PI) * pulse;
      rig.root.position.set(base.x, base.y + idle + tap * .42, base.z);
      rig.body.rotation.z = Math.sin((1 - pulse) * Math.PI * 2 + index * .6) * pulse * .15;
      rig.leftArm.rotation.z = -.18 - tap * .8; rig.rightArm.rotation.z = .18 + tap * .8;
      rig.leftLeg.rotation.z = tap * .24; rig.rightLeg.rotation.z = -tap * .24;
      if (rig.bow) { const draw = Math.max(0, ...this.dance); rig.rightArm.rotation.y = -draw * .75; rig.bow.rotation.y = draw * .18; if (this.state === 'flight') { rig.rightArm.rotation.z = -1.05; rig.leftArm.rotation.z = .9; } }
      if (this.state === 'hold' || this.state === 'debris') rig.body.rotation.z -= .08 * this.impact;
    });
  }

  private material(color: THREE.ColorRepresentation, roughness: number): THREE.MeshPhysicalMaterial { return new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0.02, clearcoat: 0.12, clearcoatRoughness: 0.5, envMapIntensity: 0.85 }); }
  private instanced(points: Voxel[], color: THREE.ColorRepresentation, roughness: number): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(this.cube, this.material(color, roughness), points.length); mesh.castShadow = true; mesh.receiveShadow = true;
    points.forEach((voxel, index) => { this.dummy.position.copy(voxel.p); this.dummy.scale.setScalar(voxel.size); this.dummy.updateMatrix(); mesh.setMatrixAt(index, this.dummy.matrix); }); mesh.instanceMatrix.needsUpdate = true; return mesh;
  }
  private buildPatapon(x: number, z: number, accent: number, archer = false): PataponRig {
    const group = new THREE.Group(); const body = new THREE.Group(); group.position.set(x, -0.2, z); group.add(body); this.scene.add(group);
    body.add(this.instanced(surfaceEllipsoid(1.05, 1.02, 0.72, 24), 0x12100e, 0.78));
    group.add(this.instanced(surfaceEllipsoid(0.72, 0.72, 0.25, 16).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0, 0.05, 0.67)) })), 0xf4eed7, 0.5));
    group.add(this.instanced(surfaceEllipsoid(0.28, 0.3, 0.16, 10).map((v) => ({ ...v, p: v.p.add(new THREE.Vector3(0.05, 0.05, 0.9)) })), 0x11100e, 0.7));
    ([[-0.42, 1.8, 0xdb4c34], [0, 2.05, accent], [0.42, 1.82, 0xe0b62e]] as const).forEach(([px, height, color]) => { const points: Voxel[] = []; for (let y = 1.05; y < height; y += 0.16) points.push({ p: new THREE.Vector3(px, y, 0), size: 0.14, active: true }); group.add(this.instanced(points, color, 0.6)); });
    const limb = (px: number, py: number) => { const pivot = new THREE.Group(); pivot.position.set(px, py, 0); const mesh = new THREE.Mesh(new THREE.BoxGeometry(.16, .9, .16), this.material(0x17130f, .8)); mesh.position.y = -.4; pivot.add(mesh); body.add(pivot); return pivot; };
    const leftArm = limb(-.92, .45); const rightArm = limb(.92, .45); const leftLeg = limb(-.43, -.75); const rightLeg = limb(.43, -.75);
    let bowGroup: THREE.Group | null = null;
    if (archer) { bowGroup = new THREE.Group(); const bow: Voxel[] = []; for (let i = -8; i <= 8; i++) bow.push({ p: new THREE.Vector3(.9 + Math.abs(i) * .045, i * .15, .35), size: .11, active: true }); for (let i = -8; i <= 8; i++) bow.push({ p: new THREE.Vector3(.92, i * .15, .35), size: .055, active: true }); bowGroup.add(this.instanced(bow, 0xd8aa4c, .62)); body.add(bowGroup); }
    return { root: group, body, leftArm, rightArm, leftLeg, rightLeg, bow: bowGroup };
  }
  private buildTerrain(): void {
    const points: Voxel[] = []; for (let x = -18; x < 18; x += 2) for (let z = -4; z < 6; z++) points.push({ p: new THREE.Vector3(x + (z % 2) * 0.14, GROUND_Y, z), size: 0.92, active: true });
    const ground = this.instanced(points, 0x895433, 0.9); ground.scale.set(2.08, 0.52, 1); this.scene.add(ground);
    const sun = new THREE.Mesh(new THREE.CircleGeometry(3.8, 48), new THREE.MeshBasicMaterial({ color: 0xffd47d, fog: false })); sun.position.set(-11, 7, -16); this.scene.add(sun);
    this.buildScenery();
  }
  private buildScenery(): void {
    const add = (geometry: THREE.BufferGeometry, color: number, positions: readonly (readonly [number, number, number])[], scale: readonly [number, number, number]) => {
      const mesh = new THREE.InstancedMesh(geometry, this.material(color, .88), positions.length);
      positions.forEach(([x, y, z], index) => { this.dummy.position.set(x, y, z); this.dummy.rotation.set(0, hash(index + x) * Math.PI, 0); this.dummy.scale.set(...scale); this.dummy.updateMatrix(); mesh.setMatrixAt(index, this.dummy.matrix); });
      mesh.instanceMatrix.needsUpdate = true; mesh.receiveShadow = true; this.scene.add(mesh);
    };
    add(new THREE.TorusKnotGeometry(.32, .09, 24, 4), 0x5b3926, [[-12,-1.45,4.2],[-9,-1.55,4.7],[10,-1.5,4.4],[13,-1.45,4.8]], [1.8,.55,1.2]);
    add(new THREE.CylinderGeometry(.5,.72,.28,10), 0xb9412f, [[-13,-1.45,3.5],[-10.8,-1.5,4.5],[11.2,-1.5,4.7],[14,-1.48,3.8]], [1,1,1]);
    add(new THREE.DodecahedronGeometry(.5,0), 0x776b58, [[-14,-1.55,2.8],[-11.8,-1.62,4.8],[9.7,-1.55,4.9],[13,-1.55,3]], [1.35,.75,1]);
    add(new THREE.ConeGeometry(2.4,3.8,7), 0x697754, [[-15,3,-14],[-9,4.2,-18],[12,4,-18],[17,2.8,-14]], [1.5,1,1]);
    add(new THREE.ConeGeometry(2.8,2.2,8), 0x735039, [[-13,7,-20],[14,7.5,-21]], [1.8,.7,1.2]);
    add(new THREE.CylinderGeometry(2.7,1.1,.45,10), 0x87a85e, [[-13,8.1,-20],[14,8.6,-21]], [1.4,1,1]);
  }
  private buildHorns(): void { for (const side of [-1, 1]) { const points: Voxel[] = []; for (let i = 0; i < 15; i++) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) points.push({ p: new THREE.Vector3(side * (1.2 + i * 0.065) + a * 0.12, 2.7 + i * 0.18, b * 0.12), size: 0.2, active: true }); this.boss.add(this.instanced(points, 0xc6a44e, 0.55)); } }
  private openCrater(worldHit: THREE.Vector3): void {
    const local = worldHit.clone().sub(this.boss.position); const removed: Voxel[] = []; const patch = selectCrater(this.bossModel, local, Math.round(5 + this.attackPower * 4));
    patch.removed.forEach((index) => { const voxel = this.bossVoxels[index]; if (voxel?.active) { voxel.active = false; removed.push(voxel); } }); this.writeBoss();
    const exposed = this.interior.filter((voxel) => voxel.p.distanceTo(local) < 0.9).slice(0, 240); exposed.forEach((voxel, index) => { this.dummy.position.copy(voxel.p); this.dummy.scale.setScalar(voxel.size); this.dummy.updateMatrix(); this.interiorMesh.setMatrixAt(index, this.dummy.matrix); }); this.interiorMesh.count = exposed.length; this.interiorMesh.instanceMatrix.needsUpdate = true;
    const count = debrisCountForPower(this.attackPower); for (let i = 0; i < count; i++) { const source = removed[i % Math.max(1, removed.length)]!; const piece = this.debris[i]!; piece.active = true; piece.p.copy(source.p).add(this.boss.position); const direction = piece.p.clone().sub(worldHit).normalize(); piece.v.copy(direction.multiplyScalar(3 + hash(i + 80) * 5)).add(new THREE.Vector3(-1, 2 + hash(i + 31) * 3, (hash(i + 17) - 0.5) * 4)); piece.rotation.set(0, 0, 0); piece.spin.set((hash(i + 2) - 0.5) * 9, (hash(i + 4) - 0.5) * 9, (hash(i + 6) - 0.5) * 9); piece.size = source.size; piece.age = 0; }
    this.writeDebris(); this.impactLight.position.copy(worldHit); this.impact = this.attackPower; this.recoil = this.attackPower * 1.2; this.holdTicks = 5; this.state = 'hold'; this.onImpact(count, removed.length);
  }
  private writeBoss(): void { let count = 0; this.bossVoxels.forEach((voxel) => { if (!voxel.active) return; this.dummy.position.copy(voxel.p); this.dummy.scale.setScalar(voxel.size); this.dummy.updateMatrix(); this.bossMesh.setMatrixAt(count++, this.dummy.matrix); }); this.bossMesh.count = count; this.bossMesh.instanceMatrix.needsUpdate = true; }
  private stepDebris(dt: number): void { this.debris.forEach((piece) => { if (!piece.active) return; piece.age += dt; piece.v.y -= 9.8 * dt; piece.p.addScaledVector(piece.v, dt); piece.rotation.addScaledVector(piece.spin, dt); if (piece.p.y - piece.size < GROUND_Y + 0.42) { piece.p.y = GROUND_Y + 0.42 + piece.size; if (piece.v.y < 0) piece.v.y *= -0.38; piece.v.x *= 0.72; piece.v.z *= 0.72; piece.spin.multiplyScalar(0.8); } if (piece.age > 4) piece.active = false; }); this.writeDebris(); }
  private writeDebris(): void { let count = 0; this.debris.forEach((piece) => { if (!piece.active) return; this.dummy.position.copy(piece.p); this.dummy.rotation.set(piece.rotation.x, piece.rotation.y, piece.rotation.z); this.dummy.scale.setScalar(piece.size); this.dummy.updateMatrix(); this.debrisMesh.setMatrixAt(count++, this.dummy.matrix); }); this.debrisMesh.count = count; this.debrisMesh.instanceMatrix.needsUpdate = true; }
}

export class IntroEngine {
  private stage: VoxelIntroStage | null = null;
  private input: NoteType[] = [];
  private lastTime = 0;
  private accumulator = 0;
  private beatClock = 0;
  private grades: TimingGrade[] = [];
  private running = false;

  start(): void {
    if (this.running) return;
    const container = document.getElementById('three-canvas-container'); if (!container) { requestAnimationFrame(() => this.start()); return; } this.running = true;
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }); renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(container.clientWidth, container.clientHeight); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.18; container.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0xcfb66f); scene.fog = new THREE.Fog(0xcfb66f, 36, 65);
    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / Math.max(1, container.clientHeight), 0.1, 100); camera.position.set(2.2, 7.2, 28); camera.lookAt(0, 0.65, 0);
    const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; pmrem.dispose(); scene.add(new THREE.HemisphereLight(0xffe6a6, 0x30263b, 1.35));
    const key = new THREE.DirectionalLight(0xffc96f, 5.2); key.position.set(-9, 14, 11); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); scene.add(key); const rim = new THREE.DirectionalLight(0x6b9dff, 3.4); rim.position.set(10, 7, -11); scene.add(rim); const fill = new THREE.DirectionalLight(0xff7650, 1.15); fill.position.set(5, 3, 9); scene.add(fill);
    this.stage = new VoxelIntroStage(scene, (debris, crater) => this.patch({ stage: 'impact', debrisCount: debris, craterVoxels: crater }), () => this.patch({ stage: 'ending', complete: true })); this.reset();
    window.addEventListener('keydown', (event) => { if (event.code === 'KeyR') { this.reset(); return; } const note = KEY_NOTES[event.code]; if (note && !event.repeat) this.accept(note); });
    window.addEventListener('resize', () => { renderer.setSize(container.clientWidth, container.clientHeight); camera.aspect = container.clientWidth / Math.max(1, container.clientHeight); camera.updateProjectionMatrix(); });
    const frame = (time: number) => { const dt = Math.min(0.05, this.lastTime ? (time - this.lastTime) / 1000 : 0); this.lastTime = time; const state = usePatapongStore.getState().intro; if (state.stage === 'input') { this.beatClock += dt; if (this.beatClock >= BEAT_SECONDS) { this.beatClock -= BEAT_SECONDS; this.patch({ beatPulse: state.beatPulse + 1, timing: 'ready' }); } } this.accumulator += dt; let loops = 0; while (this.accumulator >= FIXED_DT && loops++ < 5) { this.stage?.update(FIXED_DT, time); this.accumulator -= FIXED_DT; } renderer.render(scene, camera); requestAnimationFrame(frame); }; requestAnimationFrame(frame);
  }

  handleUiCommand(command: UiCommand): void { if (command === 'replay' || command === 'skipIntro') this.reset(); }
  private accept(note: NoteType): void { const state = usePatapongStore.getState().intro; if (state.stage !== 'input') return; const expected = COMMAND[this.input.length]; if (!acceptsNextNote(COMMAND, this.input.length, note)) { this.fail(`MISS - EXPECTED ${NOTE_KEYS[expected!]}`); return; } const grade = timingGrade(distanceToBeat(this.beatClock)); this.input.push(note); this.grades.push(grade); const power = this.grades.reduce((sum, item) => sum + timingPower(item), 0) / this.grades.length; this.stage?.pulseDance(this.input.length / 4); this.patch({ input: [...this.input], grades: [...this.grades], power, timing: grade === 'OFF BEAT' ? 'miss' : 'ready', message: this.input.length === 4 ? 'ATTACK!' : grade }); if (this.input.length === 4) { this.patch({ stage: 'flight' }); window.setTimeout(() => this.stage?.launch(power), 160); } }
  private fail(message: string): void { this.input = []; this.patch({ input: [], timing: 'miss', message }); window.setTimeout(() => { if (usePatapongStore.getState().intro.stage === 'input') this.patch({ timing: 'ready', message: 'COMMAND THE ARMY' }); }, 500); }
  private reset(): void { this.input = []; this.grades = []; this.accumulator = 0; this.beatClock = 0; this.stage?.reset(); usePatapongStore.setState({ intro: { stage: 'input', input: [], grades: [], power: 0, complete: false, beatPulse: 0, timing: 'ready', message: 'COMMAND THE ARMY', debrisCount: 0, craterVoxels: 0, finalGrade: null } }); }
  private patch(patch: Partial<IntroState>): void { const current = usePatapongStore.getState().intro; usePatapongStore.setState({ intro: { ...current, ...patch } }); }
}

export { NOTE_KEYS };
