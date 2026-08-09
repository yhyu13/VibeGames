/**
 * engine/VoxelRenderer.ts - v2.0 instanced voxel rendering
 *
 * Court + particle pool + 3 army Patapons + 1 big boss.
 * Each character is TWO InstancedMeshes (body shell + details) so the whole
 * scene stays near the draw-call budget (court 1 + particles 1 + chars 8
 * + postfx passes).
 *
 * PBR: MeshStandardMaterial, per-instance colors, emissive for eyes/feathers.
 */

import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  Scene,
} from 'three';
import { PARTICLE_POOL_SIZE } from '../core/constants';
import { DEFAULT_COURT_VOXELS, DRUM_PAD_DEFS } from '../core/data/court';
import { getCharacterById, type PataCharacter } from '../core/data/patapons';
import type { BossState, Lane, SimSnapshot, Unit, Voxel } from '../core/types';

// ---------- shared visuals ----------

const COURT_EMISSIVE_INTENSITY = 0.2;
const BODY_ROUGHNESS = 0.45;
const BODY_METALNESS = 0.0;
const BODY_EMISSIVE = 0.15;
const DETAIL_ROUGHNESS = 0.5;
const LIMB_COLOR = '#0a0a0a';
const PARTICLE_HIDE_SCALE = 0;

/** voxel shell approximating a sphere (radius in grid cells) */
function computeShellVoxels(
  radius: number,
  size: number,
): Array<{ x: number; y: number; z: number; size: number }> {
  const voxels: Array<{ x: number; y: number; z: number; size: number }> = [];
  for (let ix = -radius; ix <= radius; ix++) {
    for (let iy = -radius; iy <= radius; iy++) {
      for (let iz = -radius; iz <= radius; iz++) {
        const dist = Math.sqrt(ix * ix + iy * iy + iz * iz);
        if (dist <= radius + 0.5 && dist >= radius - 0.5) {
          voxels.push({ x: ix * size, y: iy * size, z: iz * size, size });
        }
      }
    }
  }
  return voxels;
}

const ARMY_BODY_VOXELS = computeShellVoxels(3, 0.25);
const BOSS_BODY_VOXELS = computeShellVoxels(3, 0.42);

interface DetailSpec {
  offset: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
  color: string;
  emissive: number;
}

/** Build the body + detail meshes for one character (scaled). */
function buildCharacterMeshes(
  ch: PataCharacter,
  scale: number,
  bodyVoxels: Array<{ x: number; y: number; z: number; size: number }>,
  withHorns: boolean,
): {
  body: InstancedMesh;
  detail: InstancedMesh;
  bodyMat: MeshStandardMaterial;
  detailSpecs: DetailSpec[];
} {
  const bodyMat = new MeshStandardMaterial({
    color: new Color(ch.bodyColor),
    emissive: new Color(ch.bodyColor),
    emissiveIntensity: BODY_EMISSIVE,
    roughness: BODY_ROUGHNESS,
    metalness: BODY_METALNESS,
  });
  const body = new InstancedMesh(new BoxGeometry(1, 1, 1), bodyMat, bodyVoxels.length);
  const tmp = new Object3D();
  bodyVoxels.forEach((v, i) => {
    tmp.position.set(v.x * scale, v.y * scale, v.z * scale);
    tmp.scale.setScalar(v.size * scale);
    tmp.updateMatrix();
    body.setMatrixAt(i, tmp.matrix);
  });
  body.instanceMatrix.needsUpdate = true;
  body.frustumCulled = false;

  const r = 3 * scale;
  const eyeY = r * 0.42 + 0.12 * scale;
  const details: DetailSpec[] = [
    // single big eye (front +Z)
    {
      offset: { x: 0, y: eyeY, z: r },
      size: { x: 0.55, y: 0.55, z: 0.25 },
      color: ch.eyeColor,
      emissive: 0.45,
    },
    // pupil
    {
      offset: { x: 0, y: eyeY, z: r + 0.14 * scale },
      size: { x: 0.2, y: 0.2, z: 0.1 },
      color: '#0a0a0a',
      emissive: 0,
    },
    // 3 feathers
    { offset: { x: -0.32 * scale, y: r * 0.9, z: 0 }, size: { x: 0.14, y: 0.8, z: 0.14 }, color: ch.featherColors[0] ?? '#ffffff', emissive: 0.25 },
    { offset: { x: 0, y: r * 0.95, z: 0 }, size: { x: 0.14, y: 0.95, z: 0.14 }, color: ch.featherColors[1] ?? '#ffffff', emissive: 0.25 },
    { offset: { x: 0.32 * scale, y: r * 0.9, z: 0 }, size: { x: 0.14, y: 0.8, z: 0.14 }, color: ch.featherColors[2] ?? '#ffffff', emissive: 0.25 },
    // 2 legs
    { offset: { x: -0.42 * scale, y: -r - 0.3 * scale, z: 0 }, size: { x: 0.32, y: 0.7, z: 0.32 }, color: LIMB_COLOR, emissive: 0 },
    { offset: { x: 0.42 * scale, y: -r - 0.3 * scale, z: 0 }, size: { x: 0.32, y: 0.7, z: 0.32 }, color: LIMB_COLOR, emissive: 0 },
    // 2 arms
    { offset: { x: -0.75 * scale, y: 0, z: 0 }, size: { x: 0.22, y: 0.65, z: 0.22 }, color: LIMB_COLOR, emissive: 0 },
    { offset: { x: 0.75 * scale, y: 0, z: 0 }, size: { x: 0.22, y: 0.65, z: 0.22 }, color: LIMB_COLOR, emissive: 0 },
  ];
  if (withHorns && ch.hornColor) {
    details.push(
      { offset: { x: -0.35 * scale, y: r * 1.25, z: 0 }, size: { x: 0.22, y: 0.7, z: 0.22 }, color: ch.hornColor, emissive: 0.4 },
      { offset: { x: 0.35 * scale, y: r * 1.25, z: 0 }, size: { x: 0.22, y: 0.7, z: 0.22 }, color: ch.hornColor, emissive: 0.4 },
    );
  }

  const detailMat = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: DETAIL_ROUGHNESS,
    metalness: 0.0,
  });
  const detail = new InstancedMesh(new BoxGeometry(1, 1, 1), detailMat, details.length);
  const tmpColor = new Color();
  details.forEach((d, i) => {
    tmp.position.set(d.offset.x, d.offset.y, d.offset.z);
    tmp.scale.set(d.size.x, d.size.y, d.size.z);
    tmp.updateMatrix();
    detail.setMatrixAt(i, tmp.matrix);
    tmpColor.set(d.color);
    detail.setColorAt(i, tmpColor);
  });
  if (detail.instanceColor) detail.instanceColor.needsUpdate = true;
  detail.instanceMatrix.needsUpdate = true;
  detail.frustumCulled = false;

  return { body, detail, bodyMat, detailSpecs: details };
}

interface FighterCache {
  state: Unit['state'];
  squashAmount: number;
  stateTimeLeft: number;
}

export class VoxelRenderer {
  readonly courtMesh: InstancedMesh;
  readonly particleMesh: InstancedMesh;

  private readonly armyGroups: Group[] = [];
  private readonly armyCaches: FighterCache[] = [];
  private readonly bossGroup: Group;
  private readonly bossBodyMat: MeshStandardMaterial;
  private readonly bossDetail: InstancedMesh;
  private readonly bossDetailSpecs: DetailSpec[];
  private readonly armyDetailMeshes: InstancedMesh[] = [];
  private readonly armyDetailSpecs: DetailSpec[][] = [];
  private readonly armyBodyMats: MeshStandardMaterial[] = [];
  private readonly drumIndexByLane = new Map<Lane, number>();
  private readonly drumBaseColors = new Map<Lane, Color>();
  private bossDark = false;
  private readonly white = new Color('#ffffff');
  private readonly bossCache: { state: BossState['state']; squashAmount: number; stateTimeLeft: number } = {
    state: 'idle',
    squashAmount: 1,
    stateTimeLeft: 0,
  };

  private readonly geometry = new BoxGeometry(1, 1, 1);
  private readonly tmpObject = new Object3D();
  private readonly tmpColor = new Color();
  private readonly disposables: Array<{ dispose(): void }> = [];

  constructor(scene: Scene) {
    // court
    const courtMat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.2,
      emissive: new Color('#1a0a3a'),
      emissiveIntensity: COURT_EMISSIVE_INTENSITY,
    });
    this.courtMesh = new InstancedMesh(this.geometry, courtMat, DEFAULT_COURT_VOXELS.length);
    DEFAULT_COURT_VOXELS.forEach((voxel: Voxel, i: number) => {
      this.tmpObject.position.set(voxel.position.x, voxel.position.y, voxel.position.z);
      this.tmpObject.scale.setScalar(voxel.size);
      this.tmpObject.updateMatrix();
      this.courtMesh.setMatrixAt(i, this.tmpObject.matrix);
      this.tmpColor.set(voxel.emissive ?? voxel.color);
      this.courtMesh.setColorAt(i, this.tmpColor);
    });
    DRUM_PAD_DEFS.forEach((def, laneIdx) => {
      const index = DEFAULT_COURT_VOXELS.findIndex(
        (v) =>
          v.position.x === def.position.x &&
          v.position.y === def.position.y &&
          v.position.z === def.position.z,
      );
      if (index >= 0) {
        this.drumIndexByLane.set(laneIdx as Lane, index);
        this.drumBaseColors.set(laneIdx as Lane, new Color(def.color));
      }
    });
    if (this.courtMesh.instanceColor) this.courtMesh.instanceColor.needsUpdate = true;
    this.courtMesh.frustumCulled = false;

    // particle pool (owned by ParticleSystem)
    const particleMat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    });
    this.particleMesh = new InstancedMesh(this.geometry, particleMat, PARTICLE_POOL_SIZE);
    this.particleMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.tmpObject.position.set(0, 0, 0);
    this.tmpObject.scale.setScalar(PARTICLE_HIDE_SCALE);
    this.tmpObject.updateMatrix();
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
      this.particleMesh.setMatrixAt(i, this.tmpObject.matrix);
    }
    this.particleMesh.instanceMatrix.needsUpdate = true;
    this.particleMesh.frustumCulled = false;

    // 3 army units
    for (let i = 0; i < 3; i++) {
      const ch = getCharacterById(['pata-emerald', 'pata-lime', 'pata-teal'][i] ?? 'pata-emerald');
      const meshes = buildCharacterMeshes(ch, 1, ARMY_BODY_VOXELS, false);
      const group = new Group();
      group.name = `army-unit-${i}`;
      group.add(meshes.body, meshes.detail);
      this.armyGroups.push(group);
      this.armyDetailMeshes.push(meshes.detail);
      this.armyDetailSpecs.push(meshes.detailSpecs);
      this.armyBodyMats.push(meshes.bodyMat);
      this.armyCaches.push({ state: 'idle', squashAmount: 1, stateTimeLeft: 0 });
      this.disposables.push(meshes.body, meshes.detail, meshes.bodyMat, detailMatOf(meshes.detail));
      scene.add(group);
      this.setDetailScale(meshes.detail, meshes.detailSpecs[0]!, 0); // eyes closed until awaken
    }

    // boss
    const bossCh = getCharacterById('boss-moloch');
    const bossMeshes = buildCharacterMeshes(bossCh, 1.7, BOSS_BODY_VOXELS, true);
    this.bossGroup = new Group();
    this.bossGroup.name = 'boss';
    this.bossGroup.rotation.y = Math.PI; // face the army (-X)
    this.bossGroup.add(bossMeshes.body, bossMeshes.detail);
    this.bossBodyMat = bossMeshes.bodyMat;
    this.bossDetail = bossMeshes.detail;
    this.bossDetailSpecs = bossMeshes.detailSpecs;
    this.disposables.push(bossMeshes.body, bossMeshes.detail, bossMeshes.bodyMat, detailMatOf(bossMeshes.detail));
    scene.add(this.bossGroup);
    this.setDetailScale(bossMeshes.detail, bossMeshes.detailSpecs[0]!, 0); // eyes hidden in intro

    scene.add(this.courtMesh, this.particleMesh);
  }

  /** Write army + boss transforms from the snapshot every frame. */
  sync(snap: SimSnapshot): void {
    snap.army.units.forEach((unit, i) => {
      const group = this.armyGroups[i];
      const cache = this.armyCaches[i]!;
      if (group) this.writeUnitGroup(group, unit, cache);
      cache.state = unit.state;
      cache.stateTimeLeft = unit.stateTimeLeft;
      cache.squashAmount = unit.squashAmount;
    });
    this.writeBossGroup(snap.boss);
    this.bossCache.state = snap.boss.state;
    this.bossCache.stateTimeLeft = snap.boss.stateTimeLeft;
    this.bossCache.squashAmount = snap.boss.squashAmount;
  }

  /** Intro: brighten one drum pad toward white (0 = base, 1 = flash). */
  pulseDrum(lane: Lane, amount: number): void {
    const index = this.drumIndexByLane.get(lane);
    const base = this.drumBaseColors.get(lane);
    if (index === undefined || base === undefined || !this.courtMesh.instanceColor) return;
    this.tmpColor.copy(base).lerp(this.white, Math.min(1, Math.max(0, amount)));
    this.courtMesh.setColorAt(index, this.tmpColor);
    this.courtMesh.instanceColor.needsUpdate = true;
  }

  /** Intro: open the army's eyes + raise body glow (0..1, >1 allowed for pop). */
  setArmyAwake(amount: number): void {
    for (let i = 0; i < this.armyDetailMeshes.length; i++) {
      this.setUnitAwake(i, amount);
    }
  }

  /** Intro: open ONE unit's eye + body glow (0..1, >1 allowed for pop). */
  setUnitAwake(unitIndex: number, amount: number): void {
    const t = Math.max(0, amount);
    const detail = this.armyDetailMeshes[unitIndex];
    const specs = this.armyDetailSpecs[unitIndex];
    if (!detail || !specs) return;
    this.setDetailScale(detail, specs[0]!, t);
    const mat = this.armyBodyMats[unitIndex];
    if (mat) mat.emissiveIntensity = BODY_EMISSIVE + 0.25 * Math.min(1, t);
  }

  /** Intro: Moloch as a dark silhouette (eyes hidden, body glow near zero). */
  setBossSilhouette(dark: boolean): void {
    this.bossDark = dark;
    const t = dark ? 0 : 1;
    this.setDetailScale(this.bossDetail, this.bossDetailSpecs[0]!, t);
  }

  /** Intro: boss eyes flare (0 hidden, >1 overshoot pop). */
  pulseBossEyes(amount: number): void {
    this.setDetailScale(this.bossDetail, this.bossDetailSpecs[0]!, Math.max(0, amount));
  }

  dispose(): void {
    this.courtMesh.dispose();
    this.particleMesh.dispose();
    this.geometry.dispose();
    for (const d of this.disposables) d.dispose();
    this.armyGroups.length = 0;
    this.armyCaches.length = 0;
  }

  // ---------- per-frame transforms ----------

  /** Rebuild one detail instance matrix with a uniform scale (eye open/close). */
  private setDetailScale(detail: InstancedMesh, spec: DetailSpec, scale: number): void {
    this.tmpObject.position.set(spec.offset.x, spec.offset.y, spec.offset.z);
    this.tmpObject.scale.set(spec.size.x * scale, spec.size.y * scale, spec.size.z * scale);
    this.tmpObject.updateMatrix();
    // find the eye instance index: it is the first detail of every character
    detail.setMatrixAt(0, this.tmpObject.matrix);
    detail.instanceMatrix.needsUpdate = true;
  }

  private writeUnitGroup(group: Group, unit: Unit, cache: FighterCache): void {
    group.position.set(unit.position.x, unit.position.y, unit.position.z);
    group.rotation.set(0, 0, 0);
    const squashX = 1 + (unit.squashAmount - 1) * 0.5;
    const squashY = 2 - squashX;
    group.scale.set(squashX, squashY, squashX);

    let lunge = 0;
    switch (unit.state) {
      case 'march':
        lunge = 0.6;
        break;
      case 'attack':
      case 'charge':
      case 'heavy':
      case 'volley':
        lunge = 1.2;
        break;
      case 'defend':
        group.scale.y *= 0.5;
        break;
      case 'retreat':
        lunge = -0.5;
        break;
      case 'hit':
        lunge = -0.4;
        break;
      case 'defeat':
        group.rotation.x = Math.PI / 2;
        return;
      default:
        break;
    }
    group.position.x += lunge;
    void cache;
  }

  private writeBossGroup(boss: BossState): void {
    this.bossGroup.position.set(boss.position.x, boss.position.y, boss.position.z);
    this.bossGroup.rotation.set(0, Math.PI, 0);
    const squashX = 1 + (boss.squashAmount - 1) * 0.5;
    const squashY = 2 - squashX;
    this.bossGroup.scale.set(squashX, squashY, squashX);

    let lunge = 0;
    if (boss.state === 'telegraph') {
      // menacing pulse + jitter
      const pulse = 1 + 0.03 * Math.sin(boss.stateTimeLeft * 24);
      this.bossGroup.scale.multiplyScalar(pulse);
      lunge = -0.2;
    } else if (boss.state === 'attack') {
      lunge = -1.6;
    } else if (boss.state === 'hit') {
      lunge = -0.7;
    }
    this.bossGroup.position.x += lunge;

    // enrage glow / intro silhouette (intro wins while the menu is up)
    this.bossBodyMat.emissiveIntensity = boss.enraged
      ? 0.5
      : this.bossDark
        ? 0.06
        : BODY_EMISSIVE;
  }
}

function detailMatOf(detail: InstancedMesh): MeshStandardMaterial {
  return detail.material as MeshStandardMaterial;
}
