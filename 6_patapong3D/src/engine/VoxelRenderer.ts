/**
 * engine/VoxelRenderer.ts — InstancedMesh 管理(4 个 mesh:court / paddle / ball / particle)
 *
 * M1.4 由 agent-engine 实现。
 * 4 个 InstancedMesh 共享 1 个 BoxGeometry;动态 mesh 用 per-instance 矩阵每帧写入。
 * 球场/球拍用 instanceColor 区分颜色;emissive 体素取其 emissive 色模拟自发光(V1 无 bloom)。
 */

import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  Scene,
} from 'three';
import { DEFAULT_COURT_VOXELS } from '../core/data/court';
import { COLORS } from '../core/data/colors';
import {
  BALL_EMISSIVE_INTENSITY,
  BALL_SIZE,
  PADDLE_SIZE_X,
  PADDLE_SIZE_Y,
  PADDLE_SIZE_Z,
  PADDLE_SQUASH_AMOUNT,
  PARTICLE_POOL_SIZE,
} from '../core/constants';
import type { Paddle, SimSnapshot, Voxel } from '../core/types';

// ─── 材质与视觉常量(TDD §9 / 02-art-direction §3) ───
const MATERIAL_ROUGHNESS = 0.5;
const MATERIAL_METALNESS = 0.2;
const COURT_EMISSIVE_INTENSITY = 0.2; // matFloor: #1a0a3a × 0.2
const PADDLE_SQUASH_Y_SHRINK = 0.15; // 对应美术 squash 1.2 ×宽 / 0.85 ×高
const PADDLE_INDEX_P1 = 0;
const PADDLE_INDEX_AI = 1;
const BALL_INDEX = 0;
const PARTICLE_HIDE_SCALE = 0;

export class VoxelRenderer {
  readonly courtMesh: InstancedMesh;
  readonly paddleMesh: InstancedMesh;
  readonly ballMesh: InstancedMesh;
  /** 256 池,与 ParticleSystem 共享(V2 由其写入矩阵) */
  readonly particleMesh: InstancedMesh;

  private readonly geometry: BoxGeometry;
  private readonly courtMat: MeshStandardMaterial;
  private readonly paddleMat: MeshStandardMaterial;
  private readonly ballMat: MeshStandardMaterial;
  private readonly particleMat: MeshStandardMaterial;
  private readonly tmpObject = new Object3D();
  private readonly tmpColor = new Color();

  /** 创建 4 个 InstancedMesh 并加入 scene */
  constructor(scene: Scene) {
    this.geometry = new BoxGeometry(1, 1, 1);

    // ── 1. 球场(静态,含 emissive 体素) ──
    this.courtMat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: MATERIAL_ROUGHNESS,
      metalness: MATERIAL_METALNESS,
      emissive: new Color(COLORS.BG_BOTTOM),
      emissiveIntensity: COURT_EMISSIVE_INTENSITY,
    });
    this.courtMesh = new InstancedMesh(this.geometry, this.courtMat, DEFAULT_COURT_VOXELS.length);
    DEFAULT_COURT_VOXELS.forEach((voxel: Voxel, i: number) => {
      this.tmpObject.position.set(voxel.position.x, voxel.position.y, voxel.position.z);
      this.tmpObject.scale.setScalar(voxel.size);
      this.tmpObject.updateMatrix();
      this.courtMesh.setMatrixAt(i, this.tmpObject.matrix);
      this.tmpColor.set(voxel.emissive ?? voxel.color);
      this.courtMesh.setColorAt(i, this.tmpColor);
    });
    if (this.courtMesh.instanceColor) this.courtMesh.instanceColor.needsUpdate = true;

    // ── 2. 球拍(P1 / AI 2 实例) ──
    this.paddleMat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: MATERIAL_ROUGHNESS,
      metalness: MATERIAL_METALNESS,
    });
    this.paddleMesh = new InstancedMesh(this.geometry, this.paddleMat, 2);
    this.tmpColor.set(COLORS.P1_BODY);
    this.paddleMesh.setColorAt(PADDLE_INDEX_P1, this.tmpColor);
    this.tmpColor.set(COLORS.AI_BODY);
    this.paddleMesh.setColorAt(PADDLE_INDEX_AI, this.tmpColor);
    if (this.paddleMesh.instanceColor) this.paddleMesh.instanceColor.needsUpdate = true;
    this.paddleMesh.instanceMatrix.setUsage(DynamicDrawUsage);

    // ── 3. 球(1 实例,emissive 1.0) ──
    this.ballMat = new MeshStandardMaterial({
      color: new Color(COLORS.BALL),
      emissive: new Color(COLORS.BALL),
      emissiveIntensity: BALL_EMISSIVE_INTENSITY,
      roughness: MATERIAL_ROUGHNESS,
      metalness: MATERIAL_METALNESS,
    });
    this.ballMesh = new InstancedMesh(this.geometry, this.ballMat, 1);
    this.ballMesh.instanceMatrix.setUsage(DynamicDrawUsage);

    // ── 4. 粒子池(256,初始全部隐藏) ──
    this.particleMat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: MATERIAL_ROUGHNESS,
      metalness: MATERIAL_METALNESS,
    });
    this.particleMesh = new InstancedMesh(this.geometry, this.particleMat, PARTICLE_POOL_SIZE);
    this.particleMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.tmpObject.position.set(0, 0, 0);
    this.tmpObject.scale.setScalar(PARTICLE_HIDE_SCALE);
    this.tmpObject.updateMatrix();
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
      this.particleMesh.setMatrixAt(i, this.tmpObject.matrix);
    }
    this.particleMesh.instanceMatrix.needsUpdate = true;

    // 实例散布在世界范围,关闭逐 mesh 视锥剔除避免误裁剪
    this.courtMesh.frustumCulled = false;
    this.paddleMesh.frustumCulled = false;
    this.ballMesh.frustumCulled = false;
    this.particleMesh.frustumCulled = false;

    scene.add(this.courtMesh, this.paddleMesh, this.ballMesh, this.particleMesh);
  }

  /** 每帧写入 ball / paddle matrix(位置 + squash 预读,V1 squashAmount 恒 0) */
  sync(snap: SimSnapshot): void {
    this.writePaddle(PADDLE_INDEX_P1, snap.p1, snap.juice.paddleSquash.P1);
    this.writePaddle(PADDLE_INDEX_AI, snap.ai, snap.juice.paddleSquash.AI);
    this.tmpObject.position.set(snap.ball.position.x, snap.ball.position.y, snap.ball.position.z);
    this.tmpObject.scale.setScalar(BALL_SIZE);
    this.tmpObject.updateMatrix();
    this.ballMesh.setMatrixAt(BALL_INDEX, this.tmpObject.matrix);
    this.paddleMesh.instanceMatrix.needsUpdate = true;
    this.ballMesh.instanceMatrix.needsUpdate = true;
  }

  /** 释放几何与材质资源 */
  dispose(): void {
    this.courtMesh.dispose();
    this.paddleMesh.dispose();
    this.ballMesh.dispose();
    this.particleMesh.dispose();
    this.geometry.dispose();
    this.courtMat.dispose();
    this.paddleMat.dispose();
    this.ballMat.dispose();
    this.particleMat.dispose();
  }

  /** 写单个球拍实例(位置 + squash 缩放) */
  private writePaddle(index: number, paddle: Paddle, squashAmount: number): void {
    const squashX = 1 + (PADDLE_SQUASH_AMOUNT - 1) * squashAmount;
    const squashY = 1 - PADDLE_SQUASH_Y_SHRINK * squashAmount;
    this.tmpObject.position.set(paddle.position.x, paddle.position.y, paddle.position.z);
    this.tmpObject.scale.set(PADDLE_SIZE_X * squashX, PADDLE_SIZE_Y * squashY, PADDLE_SIZE_Z);
    this.tmpObject.updateMatrix();
    this.paddleMesh.setMatrixAt(index, this.tmpObject.matrix);
  }
}
