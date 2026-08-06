// engine/PlayerShadow.ts — 玩家影子贴片（M18，概念而非实体，01 §10 / TDD §4.1）
// 沿 WORLD.shadowPath（走廊→王座）移动，长度 ∝ 1/距离；SENSE 逼近、PERFORM 交战、轮末撤退。
// 玩家命中（hitsLanded 增长）时触发红色爆发闪光环。

import * as THREE from 'three';
import { WORLD } from '../core/world/world';
import type { PlayerPresence } from '../core/types';
import { clamp, lerp } from '../core/math';

const SHADOW_DIST_MAX = 40;

function makeBlobTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 6, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0,0,0,0.9)');
  grad.addColorStop(0.65, 'rgba(0,0,0,0.55)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class PlayerShadow {
  readonly group: THREE.Group;
  private blob: THREE.Sprite;
  private flash: THREE.Mesh;
  private flashMat: THREE.MeshBasicMaterial;
  private lastHits = 0;
  private time = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'playerShadow';
    this.group.position.y = 0.02;

    this.blob = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeBlobTexture(),
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        color: 0x05070f,
      }),
    );
    this.blob.renderOrder = 3;
    this.group.add(this.blob);

    this.flashMat = new THREE.MeshBasicMaterial({
      color: 0xff2e3f,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.RingGeometry(0.35, 0.55, 28);
    ring.rotateX(-Math.PI / 2);
    this.flash = new THREE.Mesh(ring, this.flashMat);
    this.flash.position.y = 0.03;
    this.flash.renderOrder = 4;
    this.group.add(this.flash);
  }

  update(p: PlayerPresence, dt: number): void {
    this.time += dt;
    const from = WORLD.shadowPath.from;
    const to = WORLD.shadowPath.to;
    const t = 1 - clamp(p.distanceToThrone / SHADOW_DIST_MAX, 0, 1);
    this.group.position.x = lerp(from.x, to.x, t);
    this.group.position.z = lerp(from.z, to.z, t);
    const dist = Math.max(p.distanceToThrone, 2);
    const len = clamp(16 / dist, 0.5, 4.5);
    this.blob.scale.set(len, len * 0.42, 1);

    if (p.hitsLanded !== this.lastHits) {
      this.lastHits = p.hitsLanded;
      this.flashMat.opacity = 0.85;
      this.flash.scale.setScalar(0.6);
    }
    const f = this.flashMat.opacity;
    if (f > 0) {
      this.flashMat.opacity = Math.max(0, f - dt * 2.4);
      this.flash.scale.multiplyScalar(1 + dt * 3);
    }
  }
}
