// M1.0 Day 1 acceptance(09 §13):3 个 mock 位置,3 个返回值正确。
// 运行:node --experimental-strip-types scripts/lightfield-check.ts
import { LightFieldCache } from '../src/core/world/lightField.ts';

const cache = new LightFieldCache({ x: 0, y: 0 }, { x: 16, y: 9 });
// 2×2 mock radiance:左上=1(亮)/ 右上=0 / 左下=1 / 右下=0
cache.update(new Float32Array([1, 0, 1, 0]), 2, 2);

const cases: Array<{
  name: string;
  pos: { x: number; y: number };
  wantShielded: boolean;
  wantExposed: boolean;
}> = [
  { name: 'lit-corner', pos: { x: 1, y: 1 }, wantShielded: true, wantExposed: true },
  { name: 'dark-corner', pos: { x: 15, y: 8 }, wantShielded: false, wantExposed: false },
  { name: 'mid-lit', pos: { x: 0, y: 8 }, wantShielded: true, wantExposed: true },
];

let failed = 0;
for (const c of cases) {
  const shielded = cache.isShielded(c.pos);
  const exposed = cache.isExposed(c.pos);
  const ok = shielded === c.wantShielded && exposed === c.wantExposed;
  console.log(
    `${ok ? 'PASS' : 'FAIL'} ${c.name}: pos=(${c.pos.x},${c.pos.y}) shielded=${shielded} exposed=${exposed}`,
  );
  if (!ok) failed += 1;
}

if (failed > 0) {
  console.error(`${failed} case(s) failed`);
  process.exit(1);
}
console.log('lightField mock check: 3/3 PASS');
