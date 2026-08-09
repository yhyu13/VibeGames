/**
 * engine/ParticleSystem.ts — 粒子 TTL + matrix
 *
 * M2.1 由 agent-engine 实现:随机球面初速 + 重力 + 寿命淡出,
 * 写入共享粒子 InstancedMesh 的 matrix + instanceColor。
 */

import { Color, Object3D } from 'three';
import type { InstancedMesh } from 'three';
import {
  PARTICLE_COUNT_MAX,
  PARTICLE_COUNT_MIN,
  PARTICLE_GRAVITY,
  PARTICLE_LIFE_MAX,
  PARTICLE_LIFE_MIN,
  PARTICLE_POOL_SIZE,
  PARTICLE_SIZE,
} from '../core/constants';
import type { Vec3 } from '../core/types';

/** 初速半径下/上限(u/s) */
const PARTICLE_SPEED_MIN = 5;
const PARTICLE_SPEED_MAX = 8;
/** 最后多少秒缩小淡出(s) */
const PARTICLE_FADE_TIME = 0.2;
/** 隐藏缩放(与 VoxelRenderer 一致) */
const PARTICLE_HIDE_SCALE = 0;

/** 单个粒子槽状态 */
interface Particle {
  alive: boolean;
  /** 剩余寿命(s) */
  ttl: number;
  /** 总寿命(s,淡出进度依据) */
  life: number;
  position: Vec3;
  velocity: Vec3;
}

export class ParticleSystem {
  /** 与 VoxelRenderer 共享的粒子 InstancedMesh(256 池) */
  readonly mesh: InstancedMesh;

  /** PerfWatchdog 降级标志:true 时每次爆发数量减半 */
  halveBursts = false;

  private readonly particles: Particle[];
  private readonly tmpObject = new Object3D();
  private readonly tmpColor = new Color();
  /** 环形分配游标(缓存友好) */
  private nextSlot = 0;

  constructor(mesh: InstancedMesh) {
    this.mesh = mesh;
    this.particles = Array.from({ length: PARTICLE_POOL_SIZE }, () => ({
      alive: false,
      ttl: 0,
      life: 1,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    }));
  }

  /** 在池中找空闲实例爆发粒子(数量夹取,halveBursts 时减半) */
  spawn(position: Vec3, count: number, color: string): void {
    const divisor = this.halveBursts ? 2 : 1;
    const total = Math.floor(
      Math.min(Math.max(count, PARTICLE_COUNT_MIN), PARTICLE_COUNT_MAX) / divisor,
    );
    this.tmpColor.set(color);
    let spawned = 0;
    for (let i = 0; i < PARTICLE_POOL_SIZE && spawned < total; i++) {
      const slot = (this.nextSlot + i) % PARTICLE_POOL_SIZE;
      const particle = this.particles[slot]!;
      if (particle.alive) continue;
      this.activateParticle(particle, position);
      this.mesh.setColorAt(slot, this.tmpColor);
      spawned++;
      this.nextSlot = (slot + 1) % PARTICLE_POOL_SIZE;
    }
    if (spawned > 0 && this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  /** 每帧推进粒子 TTL / 重力 / matrix(过期粒子隐藏) */
  update(dt: number): void {
    if (dt <= 0) return;
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
      const particle = this.particles[i]!;
      if (!particle.alive) continue;
      particle.ttl -= dt;
      if (particle.ttl <= 0) {
        particle.alive = false;
        this.writeParticle(i, particle, PARTICLE_HIDE_SCALE);
        continue;
      }
      particle.velocity.y -= PARTICLE_GRAVITY * dt;
      particle.position.x += particle.velocity.x * dt;
      particle.position.y += particle.velocity.y * dt;
      particle.position.z += particle.velocity.z * dt;
      const fade = Math.min(1, particle.ttl / PARTICLE_FADE_TIME);
      this.writeParticle(i, particle, PARTICLE_SIZE * fade);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    /* 无自持资源(mesh 归 VoxelRenderer 所有) */
  }

  /** 激活一个粒子:随机球面初速 + 随机寿命 */
  private activateParticle(particle: Particle, origin: Vec3): void {
    particle.alive = true;
    particle.life = PARTICLE_LIFE_MIN + Math.random() * (PARTICLE_LIFE_MAX - PARTICLE_LIFE_MIN);
    particle.ttl = particle.life;
    particle.position = { x: origin.x, y: origin.y, z: origin.z };
    const speed = PARTICLE_SPEED_MIN + Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const sinPhi = Math.sin(phi);
    particle.velocity = {
      x: Math.sin(theta) * sinPhi * speed,
      y: Math.cos(phi) * speed,
      z: Math.cos(theta) * sinPhi * speed,
    };
  }

  /** 写粒子矩阵(位置 + 缩放) */
  private writeParticle(index: number, particle: Particle, scale: number): void {
    this.tmpObject.position.set(particle.position.x, particle.position.y, particle.position.z);
    this.tmpObject.scale.setScalar(scale);
    this.tmpObject.updateMatrix();
    this.mesh.setMatrixAt(index, this.tmpObject.matrix);
  }
}
