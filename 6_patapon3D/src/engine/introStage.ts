/**
 * engine/introStage.ts — intro 舞台的渲染无关状态机(觉醒 cinematic 逻辑)
 *
 * 从原 VoxelIntroStage 抽取的全部可变状态与更新数学(逐字保留:
 * 箭矢弹道 / intersectEllipsoid 命中 / 弹坑 selectCrater / 碎屑弹跳
 * v.y*=-0.38 · x/z*=0.72 · age>4 / 舞蹈脉冲衰减 / impact·recoil 衰减),
 * 供两个渲染路径共用:
 * - engine/IntroRasterAdapter.ts(raster 回退,Three instanced meshes)
 * - engine/raytrace/introScene.ts(raytrace 体素构建器)
 *
 * 本类只维护状态,不做任何绘制;视图每帧读 armyPose / bossVoxels /
 * exposedInterior / debris / arrow / crater 写各自的表现层。
 */

import * as THREE from 'three';
import { intersectEllipsoid } from '../core/physics';
import { selectCrater, voxelizeEllipsoid } from '../core/voxel';
import { debrisCountForPower } from '../intro/rhythm';

export const GROUND_Y = -2.2;

/** 军队站位与配色(x/z + 强调色;archer 持弓) */
export const INTRO_ARMY = [
  { x: -8, z: 1.35, accent: 0x42a878, archer: false },
  { x: -5.2, z: 0, accent: 0xe2b62e, archer: true },
  { x: -7.7, z: -1.45, accent: 0x3e78b7, archer: false },
] as const;

export const BOSS_BASE = { x: 7.1, y: 0.9, z: -0.4 } as const;
export const BOSS_RADII = { x: 3.2, y: 4.45, z: 2.15 } as const;

export interface StageVoxel {
  p: THREE.Vector3;
  size: number;
  active: boolean;
}

export interface Debris {
  active: boolean;
  p: THREE.Vector3;
  v: THREE.Vector3;
  rotation: THREE.Vector3;
  spin: THREE.Vector3;
  size: number;
  age: number;
}

/** 每帧由 update() 计算的单个 patapon 姿态(视图直接消费) */
export interface ArmyPose {
  /** root.y(含 idle 浮动 + 舞蹈 tap 抬升) */
  y: number;
  tap: number;
  pulse: number;
  bodyRotZ: number;
  leftArmZ: number;
  rightArmZ: number;
  rightArmY: number;
  leftLegZ: number;
  rightLegZ: number;
  bowRotY: number;
}

export type StagePhase = 'input' | 'flight' | 'hold' | 'debris' | 'ending';

export interface IntroStageCallbacks {
  onImpact: (debrisCount: number, craterVoxels: number) => void;
  onEnding: () => void;
}

/** 视图每帧调用的驱动接口(IntroEngine 只依赖这个) */
export interface IntroStageDriver {
  readonly impact: number;
  pulseDance(progress: number): void;
  launch(power?: number): void;
  reset(): void;
  update(dt: number, timeMs: number): void;
}

function hash(value: number): number {
  const result = Math.sin(value * 127.1 + 311.7) * 43758.5453;
  return result - Math.floor(result);
}

export class IntroStageState implements IntroStageDriver {
  readonly dance = [0, 0, 0];
  readonly armyPose: ArmyPose[] = [
    { y: -0.2, tap: 0, pulse: 0, bodyRotZ: 0, leftArmZ: -0.18, rightArmZ: 0.18, rightArmY: 0, leftLegZ: 0, rightLegZ: 0, bowRotY: 0 },
    { y: -0.2, tap: 0, pulse: 0, bodyRotZ: 0, leftArmZ: -0.18, rightArmZ: 0.18, rightArmY: 0, leftLegZ: 0, rightLegZ: 0, bowRotY: 0 },
    { y: -0.2, tap: 0, pulse: 0, bodyRotZ: 0, leftArmZ: -0.18, rightArmZ: 0.18, rightArmY: 0, leftLegZ: 0, rightLegZ: 0, bowRotY: 0 },
  ];

  readonly bossModel = voxelizeEllipsoid(BOSS_RADII, 44);
  readonly bossVoxels: StageVoxel[] = this.bossModel.cells.map((cell) => ({
    p: new THREE.Vector3(cell.x, cell.y, cell.z),
    size: cell.size,
    active: true,
  }));
  /** 体腔暗部(raster 用;raytrace 用 crater 描述符近似) */
  readonly interior: StageVoxel[] = [];
  /** 弹坑暴露出的体腔体素索引(openCrater 时重算) */
  exposedInterior: number[] = [];

  readonly bossPos = new THREE.Vector3(BOSS_BASE.x, BOSS_BASE.y, BOSS_BASE.z);
  /** 弹坑:boss 局部坐标中心 + 世界半径(raytrace 镂空用;raster 走 bossVoxels.active) */
  crater: { local: THREE.Vector3; radius: number } | null = null;
  /** 最近一次命中的世界坐标(raster impact 点光定位;reset 时回零) */
  readonly impactPoint = new THREE.Vector3();

  readonly debris: Debris[] = Array.from({ length: 64 }, () => ({
    active: false,
    p: new THREE.Vector3(),
    v: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    spin: new THREE.Vector3(),
    size: 0.2,
    age: 0,
  }));

  readonly arrowPosition = new THREE.Vector3();
  readonly arrowVelocity = new THREE.Vector3();
  readonly arrowDirection = new THREE.Vector3(1, 0, 0);
  private readonly arrowPrevious = new THREE.Vector3();
  arrowVisible = false;

  phase: StagePhase = 'input';
  private holdTicks = 0;
  private titleDelay = 0;
  /** 撞击闪光 0..1(衰减中;intro 光照/点光强度由它驱动) */
  impact = 0;
  recoil = 0;
  attackPower = 0.5;

  constructor(private readonly callbacks: IntroStageCallbacks) {
    for (let x = -2.5; x <= 2.5; x += 0.25) {
      for (let y = -3; y <= 3; y += 0.25) {
        for (let z = 0.5; z <= 1.65; z += 0.25) {
          if ((x / 2.55) ** 2 + (y / 3.05) ** 2 + (z / 1.65) ** 2 <= 1) {
            this.interior.push({ p: new THREE.Vector3(x, y, z), size: 0.22, active: false });
          }
        }
      }
    }
  }

  pulseDance(progress: number): void {
    this.dance.fill(progress);
  }

  launch(power = 0.5): void {
    if (this.phase !== 'input') return;
    this.attackPower = power;
    const release = new THREE.Vector3(-5.2, 1.15, 0.3);
    const target = new THREE.Vector3(5.4, 1.2, 0.55);
    const flight = 1.05 / (0.9 + power * 0.25);
    this.arrowPosition.copy(release);
    this.arrowVelocity.set(
      (target.x - release.x) / flight,
      (target.y - release.y + 4.9 * flight * flight) / flight,
      (target.z - release.z) / flight,
    );
    this.arrowVisible = true;
    this.phase = 'flight';
  }

  reset(): void {
    this.phase = 'input';
    this.holdTicks = 0;
    this.titleDelay = 0;
    this.impact = 0;
    this.recoil = 0;
    this.arrowVisible = false;
    this.bossVoxels.forEach((voxel) => {
      voxel.active = true;
    });
    this.exposedInterior = [];
    this.crater = null;
    this.debris.forEach((piece) => {
      piece.active = false;
    });
    this.bossPos.set(BOSS_BASE.x, BOSS_BASE.y, BOSS_BASE.z);
    this.dance.fill(0);
  }

  update(dt: number, time: number): void {
    if (this.phase === 'flight') {
      this.arrowPrevious.copy(this.arrowPosition);
      this.arrowVelocity.y -= 9.8 * dt;
      this.arrowPosition.addScaledVector(this.arrowVelocity, dt);
      this.arrowDirection.copy(this.arrowVelocity).normalize();
      const hit = intersectEllipsoid(this.arrowPrevious, this.arrowPosition, {
        center: this.bossPos,
        radii: BOSS_RADII,
      });
      if (hit) {
        this.arrowPosition.set(
          hit.point.x + hit.normal.x * this.bossModel.step * 0.5,
          hit.point.y + hit.normal.y * this.bossModel.step * 0.5,
          hit.point.z + hit.normal.z * this.bossModel.step * 0.5,
        );
        this.openCrater(new THREE.Vector3(hit.point.x, hit.point.y, hit.point.z));
      }
    } else if (this.phase === 'hold') {
      this.holdTicks--;
      if (this.holdTicks <= 0) {
        this.phase = 'debris';
        this.titleDelay = 1.15;
      }
    } else if (this.phase === 'debris') {
      this.stepDebris(dt);
      this.titleDelay -= dt;
      if (this.titleDelay <= 0) {
        this.phase = 'ending';
        this.callbacks.onEnding();
      }
    } else if (this.phase === 'ending') {
      this.stepDebris(dt);
    }

    this.impact = Math.max(0, this.impact - dt * 4.2);
    this.recoil = Math.max(0, this.recoil - dt * 1.8);
    this.bossPos.x = BOSS_BASE.x + this.recoil;

    for (let index = 0; index < 3; index++) {
      this.dance[index] = Math.max(0, (this.dance[index] ?? 0) - dt * 3.8);
      const pulse = this.dance[index] ?? 0;
      const pose = this.armyPose[index]!;
      const idle = Math.sin(time * 0.003 + index) * 0.045;
      const tap = Math.sin((1 - pulse) * Math.PI) * pulse;
      pose.y = -0.2 + idle + tap * 0.42;
      pose.tap = tap;
      pose.pulse = pulse;
      pose.bodyRotZ = Math.sin((1 - pulse) * Math.PI * 2 + index * 0.6) * pulse * 0.15;
      if (this.phase === 'hold' || this.phase === 'debris') pose.bodyRotZ -= 0.08 * this.impact;
      pose.leftArmZ = -0.18 - tap * 0.8;
      pose.rightArmZ = 0.18 + tap * 0.8;
      pose.leftLegZ = tap * 0.24;
      pose.rightLegZ = -tap * 0.24;
      const draw = Math.max(0, ...this.dance);
      pose.rightArmY = -draw * 0.75;
      pose.bowRotY = draw * 0.18;
      if (this.phase === 'flight') {
        pose.rightArmZ = -1.05;
        pose.leftArmZ = 0.9;
      }
    }
  }

  private openCrater(worldHit: THREE.Vector3): void {
    const local = worldHit.clone().sub(this.bossPos);
    const removed: StageVoxel[] = [];
    const patch = selectCrater(this.bossModel, local, Math.round(5 + this.attackPower * 4));
    patch.removed.forEach((index) => {
      const voxel = this.bossVoxels[index];
      if (voxel?.active) {
        voxel.active = false;
        removed.push(voxel);
      }
    });
    this.exposedInterior = [];
    this.interior.forEach((voxel, index) => {
      if (voxel.p.distanceTo(local) < 0.9 && this.exposedInterior.length < 240) {
        this.exposedInterior.push(index);
      }
    });
    // raytrace 镂空描述符:以被移除体素的最大散布为半径
    let radius = 0.5;
    for (const voxel of removed) {
      radius = Math.max(radius, voxel.p.distanceTo(local) + voxel.size * 0.5);
    }
    this.crater = { local: local.clone(), radius: Math.min(1.2, radius) };
    this.impactPoint.copy(worldHit);

    const count = debrisCountForPower(this.attackPower);
    for (let i = 0; i < count; i++) {
      const source = removed[i % Math.max(1, removed.length)]!;
      const piece = this.debris[i]!;
      piece.active = true;
      piece.p.copy(source.p).add(this.bossPos);
      const direction = piece.p.clone().sub(worldHit).normalize();
      piece.v
        .copy(direction.multiplyScalar(3 + hash(i + 80) * 5))
        .add(new THREE.Vector3(-1, 2 + hash(i + 31) * 3, (hash(i + 17) - 0.5) * 4));
      piece.rotation.set(0, 0, 0);
      piece.spin.set((hash(i + 2) - 0.5) * 9, (hash(i + 4) - 0.5) * 9, (hash(i + 6) - 0.5) * 9);
      piece.size = source.size;
      piece.age = 0;
    }
    this.impact = this.attackPower;
    this.recoil = this.attackPower * 1.2;
    this.holdTicks = 5;
    this.phase = 'hold';
    this.callbacks.onImpact(count, removed.length);
  }

  private stepDebris(dt: number): void {
    this.debris.forEach((piece) => {
      if (!piece.active) return;
      piece.age += dt;
      piece.v.y -= 9.8 * dt;
      piece.p.addScaledVector(piece.v, dt);
      piece.rotation.addScaledVector(piece.spin, dt);
      if (piece.p.y - piece.size < GROUND_Y + 0.42) {
        piece.p.y = GROUND_Y + 0.42 + piece.size;
        if (piece.v.y < 0) piece.v.y *= -0.38;
        piece.v.x *= 0.72;
        piece.v.z *= 0.72;
        piece.spin.multiplyScalar(0.8);
      }
      if (piece.age > 4) piece.active = false;
    });
  }
}
