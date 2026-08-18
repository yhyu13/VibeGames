import {
  combineCandidate,
  combineReservoirs,
  emptyReservoir,
  finalizeReservoir,
  luminance,
  makeReservoir,
  packAgeM,
  packNormal,
  packReservoir,
  unpackAgeM,
  unpackNormal,
  unpackReservoir,
} from '../src/core/reservoir.js';

declare const process: { exitCode?: number };
const check = (name: string, value: boolean) => {
  console.log(`${value ? 'PASS' : 'FAIL'} ${name}`);
  if (!value) process.exitCode = 1;
};
const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) =>
  a.x * b.x + a.y * b.y + a.z * b.z;

// ── 1. luminance (Color.hlsli:19, Rec.709) ────────────────────────────────
// 0.2126 + 0.7152 + 0.0722 = 1.0
check('luminance white == 1', near(luminance({ x: 1, y: 1, z: 1 }), 1, 1e-12));
check('luminance red == 0.2126', luminance({ x: 1, y: 0, z: 0 }) === 0.2126);
check('luminance black == 0', luminance({ x: 0, y: 0, z: 0 }) === 0);

// ── 2. makeReservoir (GI/Reservoir.hlsli MakeGIReservoir) ─────────────────
// weightSum = 1/samplePdf; M=1; age=0
{
  const r = makeReservoir({ x: 1, y: 2, z: 3 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }, 4);
  check('make weightSum == 1/4', r.weightSum === 0.25);
  check('make M == 1', r.m === 1);
  check('make age == 0', r.age === 0);
}
// samplePdf <= 0 → weightSum 0 (不产生 NaN/Inf)
check('make pdf<=0 → weightSum 0', makeReservoir({ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 }, 0).weightSum === 0);

// ── 3. combineReservoirs (GI CombineGIReservoirs) ─────────────────────────
// 手算:target 空;合并 other(weightSum=0.5,M=1,targetPdf=2) →
//   risWeight = 2 * (0.5*1) = 1.0; weightSum=1.0; M=1; random 0.25 → 0.25<1 → 选中
// 再合并 other2(weightSum=2.0,M=1,targetPdf=0.25) →
//   risWeight = 0.25 * (2.0*1) = 0.5; weightSum=1.5; M=2; random 0.9 → 1.35<0.5 → 不选
{
  const posB = { x: 10, y: 0, z: 10 };
  const posC = { x: -10, y: 0, z: -10 };
  const target = emptyReservoir();
  const other = makeReservoir(posB, { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }, 2); // weightSum 0.5
  const other2 = makeReservoir(posC, { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 0 }, 0.5); // weightSum 2.0

  const s1 = combineReservoirs(target, other, 2.0, 0.25);
  check('combine #1 selects', s1 === true);
  const s2 = combineReservoirs(target, other2, 0.25, 0.9);
  check('combine #2 rejects', s2 === false);

  check('combine weightSum == 1.5', target.weightSum === 1.5);
  check('combine M == 2 (候选累积)', target.m === 2);
  check('combine keeps first sample', target.position.x === 10 && target.position.z === 10);
}

// ── 4. finalizeReservoir (GI FinalizeGIResampling) ────────────────────────
{
  const r = emptyReservoir();
  r.weightSum = 1.5;
  finalizeReservoir(r, 1, 3);
  check('finalize weightSum == 0.5', r.weightSum === 0.5);
  finalizeReservoir(r, 1, 0);
  check('finalize denom 0 → 0', r.weightSum === 0);
}

// ── 5. packNormal / unpackNormal (TypePacking.hlsli 八面体 + snorm2x16) ────
// 轴对齐手算值:
//   {0,0,1} → oct(0,0) → 0
//   {1,0,0} → oct(1,0) → 32767 = 0x7fff
//   {0,0,-1} → 折叠 oct(1,1) → 0x7fff7fff = 2147450879
//   {0,-1,0} → oct(0,-1) → 0x80010000 = 2147549184
check('packNormal +Z == 0', packNormal({ x: 0, y: 0, z: 1 }) === 0);
check('packNormal +X == 32767', packNormal({ x: 1, y: 0, z: 0 }) === 32767);
check('packNormal -Z == 2147450879', packNormal({ x: 0, y: 0, z: -1 }) === 2147450879);
check('packNormal -Y == 2147549184', packNormal({ x: 0, y: -1, z: 0 }) === 2147549184);
// 轴对齐 roundtrip 精确
{
  const n = unpackNormal(packNormal({ x: 0, y: -1, z: 0 }));
  check('unpackNormal -Y exact', near(n.x, 0) && near(n.y, -1) && near(n.z, 0));
}
// 对角法线(含下半球折叠)roundtrip 在 snorm 精度内
{
  const d = { x: 1, y: 1, z: -1 };
  const len = Math.sqrt(3);
  const n = { x: d.x / len, y: d.y / len, z: d.z / len };
  const back = unpackNormal(packNormal(n));
  check('unpackNormal diagonal roundtrip', dot(back, n) > 1 - 1e-3);
}

// ── 6. packAgeM / unpackAgeM ──────────────────────────────────────────────
check('packAgeM(5,3) == 1283', packAgeM(5, 3) === ((5 << 8) | 3));
check('packAgeM clamps age>255', packAgeM(300, 3) === ((255 << 8) | 3));
check('packAgeM clamps m>255', packAgeM(5, 300) === ((5 << 8) | 255));
{
  const { age, m } = unpackAgeM((5 << 8) | 3);
  check('unpackAgeM roundtrip', age === 5 && m === 3);
}

// ── 7. packReservoir / unpackReservoir roundtrip ──────────────────────────
{
  const r = makeReservoir({ x: 1, y: 2, z: 3 }, { x: 0, y: 1, z: 0 }, { x: 0.5, y: 0.5, z: 0.5 }, 2);
  r.age = 4;
  const back = unpackReservoir(packReservoir(r));
  check('roundtrip position exact', back.position.x === 1 && back.position.y === 2 && back.position.z === 3);
  check('roundtrip weight exact', back.weightSum === 0.5);
  check('roundtrip radiance exact', back.radiance.x === 0.5 && back.radiance.y === 0.5 && back.radiance.z === 0.5);
  check('roundtrip normal exact (axis)', near(back.normal.y, 1) && near(back.normal.x, 0) && near(back.normal.z, 0));
  check('roundtrip m/age exact', back.m === 1 && back.age === 4);
}

// ── 8. combineCandidate 直接形态(InternalSimpleResample) ─────────────────
// 手算:target 空;candidate M=1;targetPdf=1,sampleNormalization=1,sampleM=1 →
//   risWeight=1; weightSum=1; M=1; random 0 → 0<1 → 选中
{
  const target = emptyReservoir();
  const cand = makeReservoir({ x: 5, y: 0, z: 5 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }, 1);
  const sel = combineCandidate(target, cand, 1, 1, 1, 0);
  check('combineCandidate selects', sel === true && target.m === 1 && target.weightSum === 1);
  // NaN targetPdf → risWeight 0,不污染(仅累积 M)
  const t2 = emptyReservoir();
  combineCandidate(t2, cand, NaN, 1, 1, 0);
  check('combineCandidate NaN targetPdf → weightSum 0', t2.weightSum === 0 && t2.m === 1);
}
