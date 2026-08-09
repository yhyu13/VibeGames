// src/core/world/lightField.ts — 光暗查询(2026-08-09 v3.1;09 §2.3 + §7.2,TDD §4.6)
// C.A.T:core 零平台 —— 不 import THREE / DOM / WebGL。glReadPixels 由 engine 完成,
// 只把降采样后的 Float32Array 写入 cache;Simulation 只读,不直接碰 RC framebuffer。
import type { Vec2 } from '../types';
import { LIGHT_EXPOSED_THRESHOLD, LIGHT_SHIELD_THRESHOLD } from '../constants.ts';

export interface LightField {
  /** 每帧从 RC pipeline 同步;返回 0..1 归一化辐射强度 */
  sampleAt(worldPos: Vec2): number;
  /** lightAt(pos) > LIGHT_SHIELD_THRESHOLD → 受光护甲(光下无敌) */
  isShielded(entityPos: Vec2): boolean;
  /** lightAt(pos) > LIGHT_EXPOSED_THRESHOLD → 暴露(≤ 阈值 = 暗中隐身) */
  isExposed(entityPos: Vec2): boolean;
  /** 灯被破坏时调用;引擎每帧 drainInvalidated() 触发 RC 重算 / deadLight 标记 */
  invalidateLight(lightId: string): void;
}

/**
 * 把 w×h 的降采样 radiance(默认 240×135,见 09 §7.2)映射到世界矩形;
 * 双线性采样,越界钳制;无数据时返回 0(全暗,机制退化为"全员可杀"安全底)。
 */
export class LightFieldCache implements LightField {
  private data: Float32Array | null = null;
  private width = 0;
  private height = 0;
  private readonly worldMin: Vec2;
  private readonly worldMax: Vec2;
  private readonly invalidated = new Set<string>();

  constructor(worldMin: Vec2, worldMax: Vec2) {
    this.worldMin = { ...worldMin };
    this.worldMax = { ...worldMax };
  }

  /** engine 每帧把 glReadPixels 结果写入;core 不碰 WebGL(C.A.T) */
  update(data: Float32Array, width: number, height: number): void {
    if (data.length !== width * height) {
      throw new Error(`lightField size mismatch: ${data.length} != ${width}*${height}`);
    }
    this.data = data;
    this.width = width;
    this.height = height;
  }

  sampleAt(worldPos: Vec2): number {
    const d = this.data;
    if (!d || this.width <= 0 || this.height <= 0) return 0;
    const spanX = this.worldMax.x - this.worldMin.x;
    const spanY = this.worldMax.y - this.worldMin.y;
    if (spanX <= 0 || spanY <= 0) return 0;
    const wx = clamp01((worldPos.x - this.worldMin.x) / spanX);
    const wy = clamp01((worldPos.y - this.worldMin.y) / spanY);
    const gx = wx * (this.width - 1);
    const gy = wy * (this.height - 1);
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const x1 = Math.min(this.width - 1, x0 + 1);
    const y1 = Math.min(this.height - 1, y0 + 1);
    const fx = gx - x0;
    const fy = gy - y0;
    const v00 = d[y0 * this.width + x0];
    const v10 = d[y0 * this.width + x1];
    const v01 = d[y1 * this.width + x0];
    const v11 = d[y1 * this.width + x1];
    return clamp01((v00 * (1 - fx) + v10 * fx) * (1 - fy) + (v01 * (1 - fx) + v11 * fx) * fy);
  }

  isShielded(entityPos: Vec2): boolean {
    return this.sampleAt(entityPos) > LIGHT_SHIELD_THRESHOLD;
  }

  isExposed(entityPos: Vec2): boolean {
    return this.sampleAt(entityPos) > LIGHT_EXPOSED_THRESHOLD;
  }

  invalidateLight(lightId: string): void {
    this.invalidated.add(lightId);
  }

  /** 引擎每帧取走本轮失效灯 id(供 RC 重算 / deadLight 标记),取后清空。 */
  drainInvalidated(): string[] {
    if (this.invalidated.size === 0) return [];
    const out = [...this.invalidated];
    this.invalidated.clear();
    return out;
  }
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
