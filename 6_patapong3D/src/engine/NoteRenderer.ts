/**
 * engine/NoteRenderer.ts — 4 lane 节奏音符渲染
 *
 * v1.0 — 4 键节奏条音符
 * - 4 lane(0=PATA / 1=PON / 2=DON / 3=CHAKA)从右(X=+RHYTHM_BAR_LENGTH_X/2)
 *   滚到左(X=HIT_ZONE_X_P1=-8),y=RHYTHM_BAR_Y=-7
 * - 每个 lane 一个 InstancedMesh(共享 BoxGeometry),最大预分配 32 个 instance
 * - 颜色:沿用 core/data/colors.ts 的 NOTE_PATA/PON/DON/CHAKA
 * - 显示窗口:note.timeToHit ∈ [0, NOTE_TRAVEL_TIME] 的 note 渲染
 *   NOTE_TRAVEL_TIME = RHYTHM_BAR_LENGTH_X / NOTE_SCROLL_SPEED
 *
 * 设计取舍:不做 InstancedMesh per-note 同步,改为"instance 池 + 复用"
 * 每帧把 activeChart 即将 hit 的所有 note 写入对应 lane 的 instance。
 * (res 超出 32 时忽略;MVP 谱面密度 0.4 note/s × 60s = 24 note,够用)
 */

import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
} from 'three';
import { COLORS } from '../core/data/colors';
import {
  HIT_ZONE_X_P1,
  NOTE_SCROLL_SPEED,
  RHYTHM_BAR_LENGTH_X,
  RHYTHM_BAR_Y,
} from '../core/constants';
import type { Chart, Note, RhythmState } from '../core/types';

const LANE_X_BASE = RHYTHM_BAR_LENGTH_X / 2; // 音符起点(最右)
const LANE_X_END = -RHYTHM_BAR_LENGTH_X / 2; // 音符终点(最左,过 P1 hit zone)
const NOTE_TRAVEL_TIME = (LANE_X_BASE - HIT_ZONE_X_P1) / NOTE_SCROLL_SPEED;

/** 每 lane 最多渲染的 note 数(预分配 instance 池) */
const POOL_PER_LANE = 32;
const HIDE_SCALE = 0;

const LANE_COLORS: readonly string[] = [
  COLORS.NOTE_PATA,
  COLORS.NOTE_PON,
  COLORS.NOTE_DON,
  COLORS.NOTE_CHAKA,
];

/** 计算 note 的 x 位置(基于 timeToHit) */
function noteXFromTime(timeToHit: number): number {
  // timeToHit = 0 → HIT_ZONE_X_P1(-8)
  // timeToHit = NOTE_TRAVEL_TIME → LANE_X_BASE(+8)
  return HIT_ZONE_X_P1 + timeToHit * NOTE_SCROLL_SPEED;
}

export class NoteRenderer {
  private readonly geometry: BoxGeometry;
  /** 4 lane × 1 mesh */
  private readonly laneMeshes: InstancedMesh[] = [];
  private readonly laneMats: MeshStandardMaterial[] = [];
  private readonly tmpObject = new Object3D();

  constructor() {
    this.geometry = new BoxGeometry(0.6, 0.6, 0.6);

    for (let lane = 0; lane < 4; lane++) {
      const mat = new MeshStandardMaterial({
        color: new Color(LANE_COLORS[lane] ?? '#ffffff'),
        emissive: new Color(LANE_COLORS[lane] ?? '#ffffff'),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.1,
      });
      const mesh = new InstancedMesh(this.geometry, mat, POOL_PER_LANE);
      mesh.instanceMatrix.setUsage(DynamicDrawUsage);
      mesh.frustumCulled = false;
      // 初始全部隐藏
      this.tmpObject.scale.setScalar(HIDE_SCALE);
      this.tmpObject.updateMatrix();
      for (let i = 0; i < POOL_PER_LANE; i++) {
        mesh.setMatrixAt(i, this.tmpObject.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      this.laneMeshes.push(mesh);
      this.laneMats.push(mat);
    }
  }

  /** 获取所有 lane mesh(供 SceneManager/GameEngine add 到 scene) */
  getMeshes(): InstancedMesh[] {
    return this.laneMeshes;
  }

  /** 每帧同步:从 rhythm 读 activeChart,把即将 hit 的 note 写入对应 lane instance */
  sync(rhythm: RhythmState): void {
    const chart: Chart | undefined = rhythm.charts[rhythm.songIndex];
    if (!chart) {
      this.hideAll();
      return;
    }
    // 按 lane 分组
    const perLane: Note[][] = [[], [], [], []];
    for (const note of chart.notes) {
      if (note.resolved) continue;
      if (note.timeToHit > NOTE_TRAVEL_TIME) continue; // 还没滚出
      if (note.timeToHit < -1.0) continue; // 已过 hit zone 太久
      const lane = note.lane;
      if (lane < 0 || lane > 3) continue;
      perLane[lane]!.push(note);
    }
    for (let lane = 0; lane < 4; lane++) {
      const mesh = this.laneMeshes[lane]!;
      const notes = perLane[lane]!;
      const renderCount = Math.min(notes.length, POOL_PER_LANE);
      for (let i = 0; i < renderCount; i++) {
        const note = notes[i]!;
        const x = noteXFromTime(note.timeToHit);
        this.tmpObject.position.set(x, RHYTHM_BAR_Y, 0);
        this.tmpObject.scale.setScalar(1);
        this.tmpObject.updateMatrix();
        mesh.setMatrixAt(i, this.tmpObject.matrix);
      }
      // 剩余 instance 隐藏
      for (let i = renderCount; i < POOL_PER_LANE; i++) {
        this.tmpObject.scale.setScalar(HIDE_SCALE);
        this.tmpObject.updateMatrix();
        mesh.setMatrixAt(i, this.tmpObject.matrix);
      }
      mesh.count = POOL_PER_LANE;
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  /** 全部 lane 隐藏(phase !== SONG 时) */
  hideAll(): void {
    this.tmpObject.scale.setScalar(HIDE_SCALE);
    this.tmpObject.updateMatrix();
    for (const mesh of this.laneMeshes) {
      for (let i = 0; i < POOL_PER_LANE; i++) {
        mesh.setMatrixAt(i, this.tmpObject.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  dispose(): void {
    this.geometry.dispose();
    for (const mat of this.laneMats) mat.dispose();
    for (const mesh of this.laneMeshes) mesh.dispose();
  }
}

// 导出供测试 / devtools 用
export { NOTE_TRAVEL_TIME, noteXFromTime, LANE_X_BASE, LANE_X_END };
