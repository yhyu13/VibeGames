export interface Vec3 { x: number; y: number; z: number }
export type Region = 'body' | 'interior';
export interface VoxelCell { x: number; y: number; z: number; gx: number; gy: number; gz: number; size: number; region: Region }
export interface VoxelModel { resolution: number; step: number; cells: readonly VoxelCell[]; occupied: Uint8Array; bounds: Vec3 }
export interface CraterPatch { removed: readonly number[]; interior: readonly VoxelCell[] }

const AXIS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]] as const;
const indexOf = (x: number, y: number, z: number, n: number) => x + n * (y + n * z);
export const ellipsoidSdf = (p: Vec3, r: Vec3): number => Math.sqrt((p.x / r.x) ** 2 + (p.y / r.y) ** 2 + (p.z / r.z) ** 2) - 1;
const noise = (x: number, seed: number) => { let v = (x ^ seed) >>> 0; v = Math.imul(v ^ (v >>> 16), 0x45d9f3b); v = Math.imul(v ^ (v >>> 16), 0x45d9f3b); return ((v ^ (v >>> 16)) >>> 0) / 0xffffffff; };

export function voxelizeEllipsoid(radii: Vec3, resolution: number): VoxelModel {
  const bound = Math.max(radii.x, radii.y, radii.z) * 1.05;
  const step = bound * 2 / resolution;
  const occupied = new Uint8Array(resolution ** 3);
  const point = (x: number, y: number, z: number): Vec3 => ({ x: -bound + (x + .5) * step, y: -bound + (y + .5) * step, z: -bound + (z + .5) * step });
  for (let z = 0; z < resolution; z++) for (let y = 0; y < resolution; y++) for (let x = 0; x < resolution; x++) if (ellipsoidSdf(point(x, y, z), radii) <= 0) occupied[indexOf(x, y, z, resolution)] = 1;
  const cells: VoxelCell[] = [];
  for (let z = 0; z < resolution; z++) for (let y = 0; y < resolution; y++) for (let x = 0; x < resolution; x++) {
    if (!occupied[indexOf(x, y, z, resolution)]) continue;
    if (!AXIS.some(([dx, dy, dz]) => x + dx < 0 || y + dy < 0 || z + dz < 0 || x + dx >= resolution || y + dy >= resolution || z + dz >= resolution || !occupied[indexOf(x + dx, y + dy, z + dz, resolution)])) continue;
    const p = point(x, y, z); cells.push({ ...p, gx: x, gy: y, gz: z, size: step * .91, region: 'body' });
  }
  const capped = cells.length <= 2200 ? cells : Array.from({ length: 2200 }, (_, i) => cells[Math.floor(i * cells.length / 2200)]!);
  return { resolution, step, cells: capped, occupied, bounds: { x: bound, y: bound, z: bound } };
}

export function selectCrater(model: VoxelModel, hit: Vec3, seed: number, minimum = 12, maximum = 240): CraterPatch {
  const ranked = model.cells.map((cell, i) => ({ i, cell, d: Math.hypot(cell.x-hit.x, cell.y-hit.y, cell.z-hit.z) / model.step - (noise(i, seed)-.5)*1.2 })).filter(v => v.cell.region === 'body' && v.d <= 3.5).sort((a,b) => a.d-b.d || a.i-b.i).slice(0, maximum);
  const removed = ranked.slice(0, Math.min(maximum, Math.max(minimum, ranked.length))).map(v => v.i);
  const interior = ranked.slice(0, Math.min(maximum, removed.length * 2)).map(({cell}) => ({ ...cell, x: cell.x - model.step * 1.5, region: 'interior' as const }));
  return { removed, interior };
}
