/**
 * engine/SceneManager.ts — scene + camera + lights + 观众
 *
 * M1.4 由 agent-engine 实现,观众在 M2 激活。
 * 相机:高位俯视球场(见 02-art-direction §1;取高位俯视以完整呈现 X/Y/Z 三维体素)。
 * 灯光:ambient + directional + 1 点光(街机氛围,02-art-direction §2.1 简化)。
 * 观众:独立 InstancedMesh 12 实例(z=-8,4×3),cheer 时全体弹跳 + 点光 bump。
 */

import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { DEFAULT_AUDIENCE } from '../core/data/audience';
import { COLORS } from '../core/data/colors';
import type { Vec3 } from '../core/types';

// ─── 相机(02-art-direction §1:FOV 45°,近 0.1,远 100) ───
const CAMERA_FOV = 45;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 100;
/** 高位俯视球场:约 (0,14,22) 看向原点 */
const CAMERA_BASE_POS: Vec3 = { x: 0, y: 14, z: 22 };
const CAMERA_LOOK_AT: Vec3 = { x: 0, y: 0, z: 0 };

// ─── 灯光(02-art-direction §2.1 简化:hemisphere → ambient) ───
const LIGHT_AMBIENT_INTENSITY = 0.35;
const LIGHT_AMBIENT_COLOR = 0x4a3aff; // 蓝紫氛围(对应 hemisphere sky)
const LIGHT_DIRECTIONAL_INTENSITY = 1.0;
const LIGHT_DIRECTIONAL_POS: Vec3 = { x: 5, y: 8, z: 6 };
const LIGHT_POINT_INTENSITY = 0.5;
const LIGHT_POINT_POS: Vec3 = { x: 0, y: 0, z: -8 };
const LIGHT_COLOR_WHITE = 0xffffff;

// ─── 观众(02-art-direction §6 / TDD §4.4) ───
/** 观众立方体边长(u) */
const AUDIENCE_SIZE = 0.6;
/** 弹跳 Y 偏移系数(bounceAmount × 该值) */
const AUDIENCE_BOUNCE_Y = 0.8;
/** 弹跳回落速率(1/s,≈200ms 归零) */
const AUDIENCE_BOUNCE_DECAY = 5;
/** 点光 bump 幅度(intensity → 强度增量) */
const AUDIENCE_LIGHT_BUMPS: Record<'small' | 'large' | 'max', number> = {
  small: 0.2,
  large: 0.4,
  max: 0.6,
};
/** 点光 bump 回落时长(s) */
const AUDIENCE_LIGHT_BUMP_DURATION = 0.2;
/** 观众材质(02-art-direction §3.1 matAudience) */
const AUDIENCE_MAT_ROUGHNESS = 0.5;
const AUDIENCE_MAT_METALNESS = 0.1;
const AUDIENCE_EMISSIVE_INTENSITY = 0.2;

/** 欢呼强度类型 */
export type CheerIntensity = 'small' | 'large' | 'max';

export class SceneManager {
  private camera: PerspectiveCamera | null = null;
  private pointLight: PointLight | null = null;
  private audienceMesh: InstancedMesh | null = null;
  private audienceGeo: BoxGeometry | null = null;
  private audienceMat: MeshStandardMaterial | null = null;
  private readonly audienceBaseY: number[] = [];
  private readonly audienceBounce: number[] = [];
  private lightBoost = 0;
  private lightBoostDecay = 0;
  private readonly tmpObject = new Object3D();
  private readonly tmpColor = new Color();

  /** 创建 scene / camera / lights / 观众,并挂到 renderer 对应画布尺寸 */
  attach(renderer: WebGLRenderer): { scene: Scene; camera: PerspectiveCamera } {
    const scene = new Scene();
    scene.background = new Color(COLORS.BG_TOP);

    const w = renderer.domElement.width;
    const h = renderer.domElement.height;
    const camera = new PerspectiveCamera(
      CAMERA_FOV,
      h > 0 ? w / h : 1,
      CAMERA_NEAR,
      CAMERA_FAR,
    );
    camera.position.set(CAMERA_BASE_POS.x, CAMERA_BASE_POS.y, CAMERA_BASE_POS.z);
    camera.lookAt(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z);

    const ambient = new AmbientLight(LIGHT_AMBIENT_COLOR, LIGHT_AMBIENT_INTENSITY);
    const dir = new DirectionalLight(LIGHT_COLOR_WHITE, LIGHT_DIRECTIONAL_INTENSITY);
    dir.position.set(LIGHT_DIRECTIONAL_POS.x, LIGHT_DIRECTIONAL_POS.y, LIGHT_DIRECTIONAL_POS.z);
    const point = new PointLight(new Color(COLORS.FLOOR_LINE), LIGHT_POINT_INTENSITY, 0);
    point.position.set(LIGHT_POINT_POS.x, LIGHT_POINT_POS.y, LIGHT_POINT_POS.z);

    scene.add(ambient, dir, point);
    this.pointLight = point;
    this.camera = camera;
    this.buildAudience(scene);
    return { scene, camera };
  }

  /** 相机基准位置 + 震动偏移 */
  applyCameraOffset(offset: Vec3): void {
    if (!this.camera) return;
    this.camera.position.set(
      CAMERA_BASE_POS.x + offset.x,
      CAMERA_BASE_POS.y + offset.y,
      CAMERA_BASE_POS.z + offset.z,
    );
    this.camera.lookAt(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z);
  }

  /** 观众弹跳衰减 + 点光 bump 回落(每帧) */
  updateAudience(dt: number): void {
    if (!this.audienceMesh) return;
    for (let i = 0; i < this.audienceBounce.length; i++) {
      const bounce = Math.max(0, this.audienceBounce[i]! - dt * AUDIENCE_BOUNCE_DECAY);
      this.audienceBounce[i] = bounce;
      const member = DEFAULT_AUDIENCE[i]!;
      this.tmpObject.position.set(
        member.position.x,
        (this.audienceBaseY[i] ?? 0) + bounce * AUDIENCE_BOUNCE_Y,
        member.position.z,
      );
      this.tmpObject.scale.setScalar(1);
      this.tmpObject.updateMatrix();
      this.audienceMesh.setMatrixAt(i, this.tmpObject.matrix);
    }
    this.audienceMesh.instanceMatrix.needsUpdate = true;

    if (this.pointLight && this.lightBoost > 0) {
      this.lightBoost = Math.max(0, this.lightBoost - dt * this.lightBoostDecay);
      this.pointLight.intensity = LIGHT_POINT_INTENSITY + this.lightBoost;
    }
  }

  /** 观众欢呼:全部 bounce 满值 + 点光短促 bump(intensity 决定幅度) */
  cheer(intensity: CheerIntensity): void {
    for (let i = 0; i < this.audienceBounce.length; i++) this.audienceBounce[i] = 1.0;
    if (this.pointLight) {
      const bump = AUDIENCE_LIGHT_BUMPS[intensity];
      this.lightBoost = Math.max(this.lightBoost, bump);
      this.lightBoostDecay = this.lightBoost / AUDIENCE_LIGHT_BUMP_DURATION;
    }
  }

  /** 释放观众几何与材质 */
  dispose(): void {
    this.audienceMesh?.dispose();
    this.audienceGeo?.dispose();
    this.audienceMat?.dispose();
    this.audienceMesh = null;
    this.audienceGeo = null;
    this.audienceMat = null;
  }

  /** 构建观众 InstancedMesh(位置与颜色取自 DEFAULT_AUDIENCE) */
  private buildAudience(scene: Scene): void {
    this.audienceGeo = new BoxGeometry(AUDIENCE_SIZE, AUDIENCE_SIZE, AUDIENCE_SIZE);
    this.audienceMat = new MeshStandardMaterial({
      color: LIGHT_COLOR_WHITE,
      emissive: LIGHT_COLOR_WHITE,
      emissiveIntensity: AUDIENCE_EMISSIVE_INTENSITY,
      roughness: AUDIENCE_MAT_ROUGHNESS,
      metalness: AUDIENCE_MAT_METALNESS,
    });
    this.audienceMesh = new InstancedMesh(this.audienceGeo, this.audienceMat, DEFAULT_AUDIENCE.length);
    DEFAULT_AUDIENCE.forEach((member, i) => {
      this.audienceBaseY.push(member.position.y);
      this.audienceBounce.push(0);
      this.tmpColor.set(member.color);
      this.audienceMesh!.setColorAt(i, this.tmpColor);
      this.tmpObject.position.set(member.position.x, member.position.y, member.position.z);
      this.tmpObject.scale.setScalar(1);
      this.tmpObject.updateMatrix();
      this.audienceMesh!.setMatrixAt(i, this.tmpObject.matrix);
    });
    if (this.audienceMesh.instanceColor) this.audienceMesh.instanceColor.needsUpdate = true;
    this.audienceMesh.frustumCulled = false;
    scene.add(this.audienceMesh);
  }
}
