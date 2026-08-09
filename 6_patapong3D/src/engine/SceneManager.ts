/**
 * engine/SceneManager.ts — scene + camera + lights + 观众(PBR 升级版)
 *
 * M1.4 by agent-engine。
 * PBR 升级(M1.5 / M2.4 / M3.3):
 * - 渲染管线:ACESFilmicToneMapping,exposure 1.1,sRGBColorSpace
 * - 灯光:Key(warm)+ Fill(cool)+ Rim + Hemisphere
 * - 环境:RoomEnvironment(Three.js 自带 IBL,免费,无外部 HDR 文件)
 * - 后处理:UnrealBloom(threshold 0.85,strength 0.6,radius 0.8) + Vignette
 *
 * 相机:TDD §3 调整,FOV 40°,近 0.1,远 100,位置 (0, 2, 18) 看向 (0, 0, 0)。
 * 街机俯视感,完整呈现 X/Y/Z 三维体素 + 节奏条。
 *
 * 观众:独立 InstancedMesh 12 实例(z=-8,4×3),cheer 时全体弹跳 + 点光 bump。
 */

import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  DirectionalLight,
  HemisphereLight,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DEFAULT_AUDIENCE } from '../core/data/audience';
import { COLORS } from '../core/data/colors';
import type { Vec3 } from '../core/types';

// ─── 相机 ───
const CAMERA_FOV = 40;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 100;
const CAMERA_BASE_POS: Vec3 = { x: 0, y: 2, z: 18 };
const CAMERA_LOOK_AT: Vec3 = { x: 0, y: 0, z: 0 };

// ─── 灯光(PBR 三点光 + 半球光) ───
const LIGHT_HEMI_SKY = 0x6a4aff; // 蓝紫顶光
const LIGHT_HEMI_GROUND = 0xff3a8a; // 暗粉底光
const LIGHT_HEMI_INTENSITY = 0.6;

const LIGHT_KEY_COLOR = 0xfff0d0; // warm
const LIGHT_KEY_INTENSITY = 1.2;
const LIGHT_KEY_POS: Vec3 = { x: 6, y: 10, z: 6 };

const LIGHT_FILL_COLOR = 0x88aaff; // cool
const LIGHT_FILL_INTENSITY = 0.5;
const LIGHT_FILL_POS: Vec3 = { x: -8, y: 4, z: 4 };

const LIGHT_RIM_COLOR = 0xff7a3a; // rim 高光
const LIGHT_RIM_INTENSITY = 0.6;
const LIGHT_RIM_POS: Vec3 = { x: 0, y: 6, z: -10 };

const LIGHT_POINT_COLOR = new Color(COLORS.FLOOR_LINE);
const LIGHT_POINT_INTENSITY = 0.5;
const LIGHT_POINT_POS: Vec3 = { x: 0, y: 0, z: -8 };

// ─── 观众 ───
const AUDIENCE_SIZE = 0.6;
const AUDIENCE_BOUNCE_Y = 0.8;
const AUDIENCE_BOUNCE_DECAY = 5;
const AUDIENCE_LIGHT_BUMPS: Record<'small' | 'large' | 'max', number> = {
  small: 0.2,
  large: 0.4,
  max: 0.6,
};
const AUDIENCE_LIGHT_BUMP_DURATION = 0.2;
const AUDIENCE_MAT_ROUGHNESS = 0.5;
const AUDIENCE_MAT_METALNESS = 0.1;
const AUDIENCE_EMISSIVE_INTENSITY = 0.2;
/** intro darkness clamps (lights never fully die; silhouette needs the rim) */
const INTRO_DARK_HIGH = 0.92;
const INTRO_DARK_MID = 0.9;
const INTRO_DARK_LOW = 0.4;
const INTRO_CAMERA_PUSH_MAX = 3;

export type CheerIntensity = 'small' | 'large' | 'max';

export class SceneManager {
  private camera: PerspectiveCamera | null = null;
  private scene: Scene | null = null;
  private hemiLight: HemisphereLight | null = null;
  private keyLight: DirectionalLight | null = null;
  private fillLight: DirectionalLight | null = null;
  private rimLight: DirectionalLight | null = null;
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
  private pmrem: PMREMGenerator | null = null;
  private envTarget: import('three').Texture | null = null;
  private introCameraPush = 0;
  private readonly black = new Color('#000000');

  /** 创建 scene / camera / lights / 观众,并挂到 renderer 对应画布尺寸 */
  attach(renderer: WebGLRenderer): { scene: Scene; camera: PerspectiveCamera } {
    // PBR 渲染管线
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const scene = new Scene();
    scene.background = new Color(COLORS.BG_TOP);

    // RoomEnvironment IBL(程序化环境,无外部 HDR)
    this.pmrem = new PMREMGenerator(renderer);
    this.envTarget = this.pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = this.envTarget;

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

    // 半球光(顶蓝紫 + 底粉)
    const hemi = new HemisphereLight(LIGHT_HEMI_SKY, LIGHT_HEMI_GROUND, LIGHT_HEMI_INTENSITY);
    scene.add(hemi);

    // 三点光:Key + Fill + Rim
    const key = new DirectionalLight(LIGHT_KEY_COLOR, LIGHT_KEY_INTENSITY);
    key.position.set(LIGHT_KEY_POS.x, LIGHT_KEY_POS.y, LIGHT_KEY_POS.z);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    this.hemiLight = hemi;
    this.keyLight = key;

    const fill = new DirectionalLight(LIGHT_FILL_COLOR, LIGHT_FILL_INTENSITY);
    fill.position.set(LIGHT_FILL_POS.x, LIGHT_FILL_POS.y, LIGHT_FILL_POS.z);
    scene.add(fill);
    this.fillLight = fill;

    const rim = new DirectionalLight(LIGHT_RIM_COLOR, LIGHT_RIM_INTENSITY);
    rim.position.set(LIGHT_RIM_POS.x, LIGHT_RIM_POS.y, LIGHT_RIM_POS.z);
    scene.add(rim);
    this.rimLight = rim;

    // 氛围点光(球场后方)
    const point = new PointLight(LIGHT_POINT_COLOR, LIGHT_POINT_INTENSITY, 0);
    point.position.set(LIGHT_POINT_POS.x, LIGHT_POINT_POS.y, LIGHT_POINT_POS.z);
    scene.add(point);

    this.pointLight = point;
    this.camera = camera;
    this.scene = scene;
    this.buildAudience(scene);
    return { scene, camera };
  }

  /** 相机基准位置 + 震动偏移 */
  applyCameraOffset(offset: Vec3): void {
    if (!this.camera) return;
    const baseZ = CAMERA_BASE_POS.z - this.introCameraPush;
    this.camera.position.set(
      CAMERA_BASE_POS.x + offset.x,
      CAMERA_BASE_POS.y + offset.y,
      baseZ + offset.z,
    );
    this.camera.lookAt(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z);
  }

  /** Intro: dim lights toward black (0 = battle, 1 = near-black). */
  setIntroDarkness(darkness: number): void {
    const d = Math.min(1, Math.max(0, darkness));
    if (this.hemiLight) this.hemiLight.intensity = LIGHT_HEMI_INTENSITY * (1 - d * INTRO_DARK_HIGH);
    if (this.keyLight) this.keyLight.intensity = LIGHT_KEY_INTENSITY * (1 - d * INTRO_DARK_HIGH);
    if (this.fillLight) this.fillLight.intensity = LIGHT_FILL_INTENSITY * (1 - d * INTRO_DARK_MID);
    if (this.rimLight) this.rimLight.intensity = LIGHT_RIM_INTENSITY * (1 - d * INTRO_DARK_LOW);
    if (this.scene) {
      this.tmpColor.set(COLORS.BG_TOP).lerp(this.black, d);
      (this.scene.background as Color).copy(this.tmpColor);
    }
  }

  /** Intro: push camera forward (0..3 units; positive = closer to the stage). */
  setIntroCameraPush(push: number): void {
    this.introCameraPush = Math.min(INTRO_CAMERA_PUSH_MAX, Math.max(0, push));
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
    this.scene = null;
    this.hemiLight = null;
    this.keyLight = null;
    this.fillLight = null;
    this.rimLight = null;
    this.pmrem?.dispose();
    this.pmrem = null;
    this.envTarget = null;
  }

  /** 构建观众 InstancedMesh(位置与颜色取自 DEFAULT_AUDIENCE) */
  private buildAudience(scene: Scene): void {
    this.audienceGeo = new BoxGeometry(AUDIENCE_SIZE, AUDIENCE_SIZE, AUDIENCE_SIZE);
    this.audienceMat = new MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
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
