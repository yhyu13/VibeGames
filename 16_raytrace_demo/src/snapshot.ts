/**
 * src/snapshot.ts — demo 的帧快照 + 相机/光照工厂
 *
 * RcSnapshot 取代 patapon 的 rc 快照:demo 只关心时间与轨道角。
 * CameraState / LightingState 直接复用 SceneContract.ts 的接口(raycast shader
 * 与 SceneRenderer.render 消费的形态),这里提供工厂 + 每帧更新函数:
 *   - updateCameraState: 绕世界原点缓慢轨道飞行的相机(射线基向量形式)
 *   - updateLightingState: 昼夜循环的太阳/月亮(驱动 visual.lighting)
 */

import * as THREE from 'three';
import type { CameraState, LightingState } from './engine/raytrace/SceneContract';

// 复用临时向量,避免每帧分配
const _fwd = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _worldUp = new THREE.Vector3(0, 1, 0);
const _target = new THREE.Vector3();
const _sunDir = new THREE.Vector3();
const _moonDir = new THREE.Vector3();

/** demo 的帧快照类型(替代 patapon RcSnapshot) */
export interface RcSnapshot {
  /** 自启动起的秒数 */
  time: number;
  /** 轨道角(弧度,随时间递增 → 慢速环绕) */
  orbit: number;
}

export function makeSnapshot(time: number): RcSnapshot {
  return { time, orbit: time * 0.08 };
}

export function createCameraState(): CameraState {
  return {
    position: new THREE.Vector3(),
    right: new THREE.Vector3(1, 0, 0),
    up: new THREE.Vector3(0, 1, 0),
    fwd: new THREE.Vector3(0, 0, -1),
    tanHalfFov: Math.tan((55 * Math.PI) / 180 / 2),
    motionVector: new THREE.Vector3(),
  };
}

export function createLightingState(): LightingState {
  return {
    sunDir: new THREE.Vector3(0.6, 0.55, 0.6),
    sunColor: new THREE.Color(1, 0.95, 0.85),
    moonDir: new THREE.Vector3(-0.42, 0.3, -0.85),
    moonColor: new THREE.Color(1, 0.95, 0.8),
    moonIntensity: 1,
    ambientScale: 1,
    skyExposure: 1,
  };
}

/**
 * 每帧更新相机:绕世界中心(0, 4.5, -2)做半径 34、高度 10.5 的慢速轨道。
 * 射线基向量: right = fwd × worldUp,  up = right × fwd(右手系,与 shader 的
 * ndc.x→right / ndc.y→up 约定一致)。
 */
export function updateCameraState(cam: CameraState, snapshot: RcSnapshot): void {
  const ang = snapshot.orbit;
  const radius = 34;
  const height = 10.5;
  cam.position.set(Math.cos(ang) * radius, height, Math.sin(ang) * radius);

  _target.set(0, 4.5, -2);
  _fwd.subVectors(_target, cam.position).normalize();
  _right.crossVectors(_fwd, _worldUp);
  if (_right.lengthSq() < 1e-6) _right.set(1, 0, 0);
  _right.normalize();
  _up.crossVectors(_right, _fwd).normalize();

  cam.right.copy(_right);
  cam.up.copy(_up);
  cam.fwd.copy(_fwd);
  // 连续慢速轨道:运动矢量微小,首帧设零即可;此处留零(时间重采样依据 snapshot 差分)。
  cam.motionVector.set(0, 0, 0);
}

/**
 * 每帧更新光照:昼夜循环。
 * 太阳绕 X 轴旋转(t),低于地平线(sunY<0)时让位于月亮 —— 太阳/月亮互换,
 * 环境光与天空曝光随太阳高度平滑变化(演示无 emissive 的纯光照驱动)。
 */
export function updateLightingState(state: LightingState, snapshot: RcSnapshot): void {
  const t = snapshot.time;
  const dayAngle = t * 0.12; // 昼夜周期 ≈ 52 秒

  _sunDir.set(Math.cos(dayAngle), Math.sin(dayAngle) * 0.9, 0.35).normalize();
  state.sunDir.copy(_sunDir);

  // 月亮近似太阳相反方向(黄昏后升起)
  _moonDir.set(-Math.cos(dayAngle), -Math.sin(dayAngle) * 0.9, -0.35).normalize();
  state.moonDir.copy(_moonDir);

  const sunY = _sunDir.y;
  const day = Math.max(0, Math.min(1, sunY * 2 + 0.5)); // 0 夜 → 1 昼

  state.sunColor.setRGB(1.0, 0.95, 0.85); // 白天暖白
  state.moonColor.setRGB(1.0, 0.93, 0.78);
  state.moonIntensity = 1 - day; // 夜里月亮更亮
  state.ambientScale = 0.18 + 0.82 * day; // 夜里环境更暗
  state.skyExposure = 0.25 + 0.75 * day; // 夜里天空更暗
}
