// engine/PlayerShadow.ts — v3 玩家替身实体（替代 v1 的纯贴片概念）
// 一个黑色剪影小人从走廊沿 WORLD.shadowPath 走向王座；走位时摆臂摆腿，命中时向前突刺 + 红色爆发。
// SENSE 逼近、PERFORM 交战、轮末撤退；hitsLanded 增长触发突刺与闪光环。

import * as THREE from 'three';
import { WORLD } from '../core/world/world';
import type { PlayerPresence } from '../core/types';
import { clamp, lerp } from '../core/math';
import { damp } from './Tween';

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
  private torso: THREE.Group;
  private head: THREE.Mesh;
  private legL: THREE.Group;
  private legR: THREE.Group;
  private armL: THREE.Group;
  private armR: THREE.Group;
  private mat: THREE.MeshStandardMaterial;
  private lastHits = 0;
  private time = 0;
  private lunge = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'playerShadow';
    this.group.position.y = 0;

    // 地面阴影（保持 v1 的柔和贴片作为脚底接触）
    this.blob = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeBlobTexture(),
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        color: 0x05070f,
      }),
    );
    this.blob.renderOrder = 3;
    this.blob.position.y = 0.015;
    this.group.add(this.blob);

    // v3 剪影小人
    this.mat = new THREE.MeshStandardMaterial({ color: 0x0c0f18, roughness: 0.9, metalness: 0.1 });
    const fig = new THREE.Group();
    fig.name = 'heroFigure';
    fig.rotation.y = -Math.PI / 2; // 面朝 -x（王座方向）

    this.torso = new THREE.Group();
    this.torso.position.y = 0.85;
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.46, 0.16), this.mat);
    this.torso.add(trunk);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.18), this.mat);
    this.head.position.y = 1.06;
    this.torso.add(this.head);

    // 腿（髋部枢轴，前后摆动）
    this.legL = this.makeLimb(0.07, 0.42, 0.07, 0.0);
    this.legR = this.makeLimb(-0.07, 0.42, 0.07, 0.0);
    this.armL = this.makeLimb(0.17, 0.36, 0.05, 0.42);
    this.armR = this.makeLimb(-0.17, 0.36, 0.05, 0.42);

    fig.add(this.torso, this.legL, this.legR, this.armL, this.armR);
    this.group.add(fig);

    // 命中爆发环
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

  private makeLimb(x: number, len: number, w: number, pivotY: number): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 0.85, 0);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, len, w), this.mat);
    mesh.position.y = -len / 2 + pivotY;
    g.add(mesh);
    return g;
  }

  update(p: PlayerPresence, dt: number): void {
    this.time += dt;
    const from = WORLD.shadowPath.from;
    const to = WORLD.shadowPath.to;
    const t = 1 - clamp(p.distanceToThrone / SHADOW_DIST_MAX, 0, 1);
    this.group.position.x = lerp(from.x, to.x, t);
    this.group.position.z = lerp(from.z, to.z, t);
    const dist = Math.max(p.distanceToThrone, 2);
    const len = clamp(16 / dist, 0.5, 3.2);
    this.blob.scale.set(len, len * 0.5, 1);

    // 走位活动度：越靠近王座走得越急
    const activity = 1 - clamp(p.distanceToThrone / SHADOW_DIST_MAX, 0, 1);
    const amp = 0.25 + 0.45 * activity;
    const freq = 2 + 3.2 * activity;
    const swing = Math.sin(this.time * Math.PI * freq) * amp;
    this.legL.rotation.x = swing;
    this.legR.rotation.x = -swing;
    this.armL.rotation.x = -swing * 0.8;
    this.armR.rotation.x = swing * 0.8;
    // 行走时躯干微微前倾
    this.torso.rotation.x = damp(this.torso.rotation.x, 0.06 + 0.12 * activity, 6, dt);

    // 命中突刺：手前推 + 前倾脉冲
    this.lunge = Math.max(0, this.lunge - dt * 2.2);
    const l = this.lunge;
    this.armR.rotation.x += l * 1.6;
    this.torso.rotation.x -= l * 0.5;

    if (p.hitsLanded !== this.lastHits) {
      this.lastHits = p.hitsLanded;
      this.lunge = 1;
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
