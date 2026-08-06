// engine/PlayerShadow.ts — 玩家影子贴片（01 §10 概念呈现）
// 沿 WORLD.shadowPath（走廊→王座）逼近/接战/撤退；scale/length ∝ 1/距离（越近越大越长）。
// SENSE 逼近、PERFORM 接战站位、EVALUATE 后撤退；玩家命中时闪爆发。

import * as THREE from 'three';
import { WORLD } from '../core/world/world';
import { clamp, lerp } from '../core/math';
import type { PlayerPresence } from '../core/types';

const PATH_LENGTH = Math.hypot(
  WORLD.shadowPath.to.x - WORLD.shadowPath.from.x,
  WORLD.shadowPath.to.z - WORLD.shadowPath.from.z,
);

/** 影子状态机（由 GameEngine/SceneManager 按 phase + player.state 驱动） */
export type ShadowMode = 'hidden' | 'approaching' | 'engaging' | 'retreating';

export class PlayerShadow {
  readonly mesh: THREE.Mesh;
  private mat: THREE.MeshBasicMaterial;
  private texture: THREE.CanvasTexture;
  private progress = 0;      // 0 = 走廊外，1 = 王座
  private flashTimer = 0;
  private time = 0;

  constructor(scene: THREE.Scene) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, 'rgba(0,0,0,0.9)');
    grad.addColorStop(0.55, 'rgba(0,0,0,0.55)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.mat = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity: 0.25, // M18：玩家影 Sprite opacity 0.25
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.9), this.mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.renderOrder = 5;
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  /** 由 SceneManager 每帧驱动。 */
  update(dt: number, mode: ShadowMode, player: PlayerPresence, time: number): void {
    this.time = time;
    const speed = player.approachSpeed > 0 ? player.approachSpeed : 1.0;

    switch (mode) {
      case 'hidden':
        this.progress = 0;
        break;
      case 'approaching':
        this.progress = Math.min(1, this.progress + (dt * speed) / PATH_LENGTH);
        break;
      case 'retreating':
        this.progress = Math.max(0, this.progress - (dt * speed * 2.5) / PATH_LENGTH);
        break;
      case 'engaging':
        // 接战：影子固定在玩家站位附近
        break;
      default:
        break;
    }

    if (this.flashTimer > 0) this.flashTimer = Math.max(0, this.flashTimer - dt);

    const p = clamp(this.progress, 0, 1);
    const along = {
      x: lerp(WORLD.shadowPath.from.x, WORLD.shadowPath.to.x, p),
      y: 0.011,
      z: lerp(WORLD.shadowPath.from.z, WORLD.shadowPath.to.z, p),
    };
    // 接战时移到站位（stageMarkers 中段附近）
    if (mode === 'engaging') {
      const m = WORLD.stageMarkers[1] ?? { x: -2, y: 0, z: 0 };
      along.x = lerp(along.x, m.x, 0.08);
      along.z = lerp(along.z, m.z, 0.08);
    }

    this.mesh.position.set(along.x, along.y, along.z);

    // 门洞外不可见：跨右墙 x=12 后淡入（y 方向朝向门，视觉收敛）
    const door = 11.6;
    const inRoom = Math.max(0, Math.min(1, (door - along.x) / 1.5));
    this.mesh.visible = inRoom > 0.001 && this.progress > 0.001;

    // scale/length ∝ 1/距离（到王座）；越近越大越长，沿路径方向拉伸
    const dist = Math.max(2.5, Math.hypot(along.x - WORLD.thronePos.x, along.z - WORLD.thronePos.z));
    const s = clamp(5.2 / dist, 0.5, 1.15);
    const pathAngle = Math.atan2(WORLD.shadowPath.to.z - WORLD.shadowPath.from.z, WORLD.shadowPath.to.x - WORLD.shadowPath.from.x);
    const engageSway = mode === 'engaging' ? 0.03 * Math.sin(this.time * 2.1) : 0;
    this.mesh.scale.set((s * 0.9) * inRoom, 1, (s * 1.9 + engageSway) * inRoom);
    this.mesh.rotation.z = -pathAngle;

    // 攻击命中闪爆发：color 转血橙、opacity 抬升、0.25s 回落
    const flash = this.flashTimer > 0 ? this.flashTimer / 0.25 : 0;
    this.mat.color.setRGB(0.1 + 0.9 * flash, 0.1 + 0.4 * flash, 0.1);
    this.mat.opacity = 0.25 + 0.65 * flash;
  }

  /** 玩家命中 Boss 时的光效爆发（由 SceneManager 事件转发）。 */
  flash(): void {
    this.flashTimer = 0.25;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.mat.dispose();
    this.texture.dispose();
  }
}
