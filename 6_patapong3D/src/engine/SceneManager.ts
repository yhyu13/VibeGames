/**
 * engine/SceneManager.ts — scene + camera + lights
 *
 * M1.4 由 agent-engine 实现。
 * 相机:高位俯视球场(见 02-art-direction §1;取高位俯视以完整呈现 X/Y/Z 三维体素)。
 * 灯光:ambient + directional + 1 点光(街机氛围,02-art-direction §2.1 简化)。
 * 观众交互(M3 激活)目前为骨架。
 */

import {
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
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

export class SceneManager {
  private camera: PerspectiveCamera | null = null;

  /** 创建 scene / camera / lights,并挂到 renderer 对应画布尺寸 */
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
    this.camera = camera;
    return { scene, camera };
  }

  /** 相机基准位置 + 震动偏移(V1 offset 恒 0) */
  applyCameraOffset(offset: Vec3): void {
    if (!this.camera) return;
    this.camera.position.set(
      CAMERA_BASE_POS.x + offset.x,
      CAMERA_BASE_POS.y + offset.y,
      CAMERA_BASE_POS.z + offset.z,
    );
    this.camera.lookAt(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z);
  }

  /** 观众弹跳更新(V1 骨架:观众 M3 激活) */
  updateAudience(_dt: number): void {
    /* TODO M3: audience bounce + point light 闪烁 */
  }

  /** 观众欢呼(V1 骨架:只留接口,不做反应) */
  cheer(_intensity: 'small' | 'large' | 'max'): void {
    /* TODO M3: bounceAmount = 1.0 + 灯光增强 */
  }
}
