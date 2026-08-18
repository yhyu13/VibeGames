/**
 * core/reservoir.ts — ReSTIR Reservoir 数学(纯函数,无副作用,无 THREE 依赖)
 *
 * 移植自 NVIDIA RTXDI 的 ReSTIR GI 变体(GI/Reservoir.hlsli),这是方案 A
 * (WebGL2 Reservoir-lite)所需的精简形态——不含 PT 路径重放字段(RandomSeed /
 * RcVertexLength / PathLength / PartialJacobian 等),见 RESTIR.md §3:
 * "跳过完整 PT 重连、只做次级光线 + 表面校验 + 合并"。
 *
 * 核心无偏机制(RESTIR.md §关键机制 1):流式加权水库采样。
 *   - combine: 每合并一个候选,按 `random * weightSum < risWeight` 加权接受/拒绝;
 *     `M` 逐帧累积(有效采样数),`weightSum` 累积所有候选权重。
 *   - finalize: `weightSum = numerator * weightSum / denominator`,把流式权重和
 *     归一化为无偏积分估计。典型调用 denominator = M * p̂(选中样本的目标函数)。
 *
 * 打包对照 GI/Reservoir.hlsli RTXDI_PackGIReservoir + Utils/TypePacking.hlsli:
 *   - 法线 → 八面体映射 + 2×16-bit snorm(节省 3 float → 1 uint32)
 *   - M + age → 各 8-bit 夹紧打包进 1 uint32(精度关键计数器)
 *   - radiance 的 LogLuv 压缩留到 M2(现按原始 3 float 存,无损但占空间)
 */

import type { Vec3 } from './types.js';

/** ReSTIR GI 水库(未打包内存态)。weightSum 流式阶段为权重和,最终化后为逆 PDF。 */
export interface Reservoir {
  /** 二次反弹表面位置(世界坐标) */
  position: Vec3;
  /** 二次反弹表面单位法线 */
  normal: Vec3;
  /** 来自二次反弹表面的入射辐亮度(亦是 GI 目标函数的自然载体) */
  radiance: Vec3;
  /** 流式 RIS 权重和(Σ w);finalize 后重载为逆 PDF */
  weightSum: number;
  /** 已见候选总数(ReSTIR 的"有效采样数",逐帧累积可达数百) */
  m: number;
  /** 选中样本存活帧数(时间复用防错误累积) */
  age: number;
}

/** 打包态(WebGL2 纹理友好:法线与 M/age 各压成 1 uint32)。 */
export interface PackedReservoir {
  position: Vec3;
  /** 法线:八面体映射 + 2×16-bit snorm(见 packNormal) */
  packedNormal: number;
  /** (age << 8) | m,各自 8-bit 夹紧(见 packAgeM) */
  packedAgeM: number;
  /** weightSum */
  weight: number;
  radiance: Vec3;
}

/** Rec.709 亮度(Color.hlsli:19),用于从辐亮度推 targetPdf = luminance(radiance)。 */
export function luminance(c: Vec3): number {
  return 0.2126 * c.x + 0.7152 * c.y + 0.0722 * c.z;
}

/** 空水库(M = 0,weightSum = 0;RTXDI_IsValidReservoir 以 M > 0 判有效)。 */
export function emptyReservoir(): Reservoir {
  return {
    position: { x: 0, y: 0, z: 0 },
    normal: { x: 0, y: 0, z: 0 },
    radiance: { x: 0, y: 0, z: 0 },
    weightSum: 0,
    m: 0,
    age: 0,
  };
}

/**
 * 从单条原始样本构造水库(GI/Reservoir.hlsli RTXDI_MakeGIReservoir)。
 * weightSum = 1/samplePdf(原始 PDF 可内嵌进 radiance 时传 samplePdf=1)。
 */
export function makeReservoir(
  position: Vec3,
  normal: Vec3,
  radiance: Vec3,
  samplePdf: number,
): Reservoir {
  return {
    position: { ...position },
    normal: { ...normal },
    radiance: { ...radiance },
    weightSum: samplePdf > 0 ? 1 / samplePdf : 0,
    m: 1,
    age: 0,
  };
}

/**
 * 流式合并单个候选(InternalSimpleResample / GI 标量 targetPdf 形态)。
 *
 * @param targetPdf            新候选在当前水库空间的目标函数值(p̂)
 * @param sampleNormalization  归一化因子(基本形态 = candidate.weightSum * candidate.m)
 * @param sampleM              该候选代表的样本数(基本形态 = candidate.m)
 * @param random               [0,1) 均匀随机
 * @returns 是否选中了该候选的样本
 */
export function combineCandidate(
  target: Reservoir,
  candidate: Reservoir,
  targetPdf: number,
  sampleNormalization: number,
  sampleM: number,
  random: number,
): boolean {
  let risWeight = targetPdf * sampleNormalization;
  if (!Number.isFinite(risWeight)) risWeight = 0;

  target.m += sampleM;
  target.weightSum += risWeight;

  const select = random * target.weightSum < risWeight;
  if (select) {
    target.position = { ...candidate.position };
    target.normal = { ...candidate.normal };
    target.radiance = { ...candidate.radiance };
    target.age = candidate.age;
  }
  return select;
}

/**
 * 把另一条(通常已归一化的)水库合并进目标水库(CombineGIReservoirs)。
 * 等价于 combineCandidate 且 sampleNormalization = other.weightSum * other.m、
 * sampleM = other.m;用于时间/空间重采样。
 */
export function combineReservoirs(
  target: Reservoir,
  other: Reservoir,
  targetPdf: number,
  random: number,
): boolean {
  return combineCandidate(target, other, targetPdf, other.weightSum * other.m, other.m, random);
}

/**
 * 流式采样结束后的归一化(FinalizeGIResampling)。
 * 典型调用:finalizeReservoir(r, 1, r.m * p̂_selected) → weightSum = W/(M·p̂) 无偏权重。
 */
export function finalizeReservoir(
  reservoir: Reservoir,
  numerator: number,
  denominator: number,
): void {
  reservoir.weightSum = denominator > 0 ? (numerator * reservoir.weightSum) / denominator : 0;
}

// ─── 打包 / 解包(对照 TypePacking.hlsli + GI/Reservoir.hlsli PackGIReservoir) ───

/** 归一化方向 → 八面体映射(非等面积,带符号归一化),返回 [-1,1] 坐标对。 */
function normalizedToOctahedral(n: Vec3): { x: number; y: number } {
  const l1 = Math.abs(n.x) + Math.abs(n.y) + Math.abs(n.z);
  if (l1 < 1e-9) return { x: 0, y: 0 };
  let px = n.x / l1;
  let py = n.y / l1;
  if (n.z < 0) {
    const ox = (1 - Math.abs(py)) * (px >= 0 ? 1 : -1);
    const oy = (1 - Math.abs(px)) * (py >= 0 ? 1 : -1);
    px = ox;
    py = oy;
  }
  return { x: px, y: py };
}

/** 八面体映射 → 归一化方向(逆映射 + 下半球折叠 + normalize)。 */
function octahedralToNormal(p: { x: number; y: number }): Vec3 {
  let nx = p.x;
  let ny = p.y;
  const nz = 1 - Math.abs(p.x) - Math.abs(p.y);
  if (nz < 0) {
    const ox = (1 - Math.abs(ny)) * (nx >= 0 ? 1 : -1);
    const oy = (1 - Math.abs(nx)) * (ny >= 0 ? 1 : -1);
    nx = ox;
    ny = oy;
  }
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  if (len < 1e-9) return { x: 0, y: 0, z: 1 };
  return { x: nx / len, y: ny / len, z: nz / len };
}

/**
 * 单位法线 → 1 uint32(八面体 + 2×16-bit snorm)。
 * 返回无符号 32-bit 位型(与 HLSL uint 一致,JS 侧用 `>>> 0` 得到)。
 */
export function packNormal(n: Vec3): number {
  const oct = normalizedToOctahedral(n);
  const x = Math.round(Math.min(Math.max(oct.x, -1), 1) * 32767);
  const y = Math.round(Math.min(Math.max(oct.y, -1), 1) * 32767);
  return ((x & 0xffff) | (y << 16)) >>> 0;
}

/** 1 uint32 → 单位法线(packNormal 的逆)。 */
export function unpackNormal(packed: number): Vec3 {
  const u = packed >>> 0;
  let lo = u & 0xffff;
  let hi = (u >>> 16) & 0xffff;
  if (lo >= 0x8000) lo -= 0x10000;
  if (hi >= 0x8000) hi -= 0x10000;
  return octahedralToNormal({ x: Math.max(lo / 32767, -1), y: Math.max(hi / 32767, -1) });
}

/** age、M → 1 uint32((age << 8) | m),各自 8-bit 夹紧(GI 打包约定)。 */
export function packAgeM(age: number, m: number): number {
  const a = Math.min(Math.max(Math.floor(age), 0), 0xff);
  const mm = Math.min(Math.max(Math.floor(m), 0), 0xff);
  return ((a & 0xff) << 8) | (mm & 0xff);
}

/** 1 uint32 → { age, m }(packAgeM 的逆)。 */
export function unpackAgeM(packed: number): { age: number; m: number } {
  const u = packed >>> 0;
  return { age: (u >>> 8) & 0xff, m: u & 0xff };
}

/** Reservoir → 打包态(radiance 现按原始 3 float 存;LogLuv 留待 M2)。 */
export function packReservoir(r: Reservoir): PackedReservoir {
  return {
    position: { ...r.position },
    packedNormal: packNormal(r.normal),
    packedAgeM: packAgeM(r.age, r.m),
    weight: r.weightSum,
    radiance: { ...r.radiance },
  };
}

/** 打包态 → Reservoir(packReservoir 的逆)。 */
export function unpackReservoir(p: PackedReservoir): Reservoir {
  const { age, m } = unpackAgeM(p.packedAgeM);
  return {
    position: { ...p.position },
    normal: unpackNormal(p.packedNormal),
    radiance: { ...p.radiance },
    weightSum: p.weight,
    m,
    age,
  };
}
