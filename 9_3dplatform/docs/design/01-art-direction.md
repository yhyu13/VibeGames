# 01 — Art Direction: PRISM LEDGE (棱镜断崖)

Rendering DNA inherited from `6_patapong3D`'s PBR Patapon look — warm rim-lit ceramic figures on dramatic dark stages, `RoomEnvironment` IBL + ACES Filmic tone mapping — rebuilt for **real PBR meshes** (no voxels) and extended with a ray-traced tier. This document is the frozen art bible; the renderer constants it references live in `TDD.md` §4/§5.

## 1. The look in one sentence

**"1937 电影感的反面"**: not film-noir, but *lantern-core* — a tiny warm figure carrying the only bright thing in a huge indigo dusk, with mirror-still water and polished brass that reflect the light you bring. The player character is a light source; the world is a reflector.

## 2. Palette (frozen, ≤ 8 colors)

| Token | Hex | Use |
|---|---|---|
| night indigo | `#1a1b2e` | sky zenith, fog base, shadow side of all materials |
| dusk violet | `#3a3f5c` | mid-sky, ambient bounce color (IBL tint) |
| ember orange | `#ff6b35` | sun core, lantern glow, gate beam |
| warm sand | `#f2c57c` | sandstone platforms, sun-lit edges |
| lantern gold | `#ffd166` | keeper ceramic, prism glints, checkpoints |
| sea teal | `#2ec4b6` | tide-pool reflections, glass tint |
| rust brass | `#8c6a3f` | brass metal, lighthouse machinery |
| deep void | `#0d0e18` | below-island void, RT shadow terminator |

Saturation law (from the patapong v1.1 palette rule): materials are 80% patapong-flat + 20% dusk-graded — the *lighting* does the drama, not the albedo.

## 3. Material cheat-sheet (`MaterialId` → PBR recipe)

| MaterialId | Albedo | metalness | roughness | clearcoat | extras |
|---|---|---|---|---|---|
| sandstone | sand `#f2c57c` | 0 | 0.9 | 0 | — |
| brass | rust `#8c6a3f` | 1.0 | 0.25 | 0 | RT bounce target |
| ceramic (keeper) | gold `#ffd166` | 0 | 0.35 | 1.0 | emissive lantern core 2.0 |
| glass (shard) | teal `#2ec4b6` | 0 | 0.05 | 0 | transmission 1.0, emissive 0.35 |
| water (tide pool) | teal deep | 0.9 | 0.02 | 0 | THE mirror — SSR in raster, true bounce in RT |
| lantern | gold | 0 | 0.4 | 0.5 | emissive 4.0, casts light |
| wood | `#6b4a2f` | 0 | 0.7 | 0 | docks, Mist Harbor |

## 4. Lighting model

- **One sun, always setting**: elevation 8–14°, azimuth per island (see `LevelVisual`), warm `#ffb347`, cast shadows at 2048. The sun is never overhead — every figure is rim-lit from behind/side against the void, the patapong silhouette law.
- **IBL**: `RoomEnvironment` PMREM, tinted dusk violet, exposure 1.1 ACES Filmic. Indirect is cool; direct is warm — the classic two-temperature contrast that reads "magic hour".
- **The player is the key light**: the keeper's lantern is an emissive core + point light; in the RT tier it is an actual light source that bounces off brass and water. The 顶灯室 level is lit *almost entirely* by it (see §6).
- **Fog**: per-island color (indigo → violet → void), density chosen so the horizon line of each island reads at exactly one jump-height silhouette.

## 5. Raster ↔ RT equivalence matrix (frozen)

| Scene feature | Tier 1 raster | Tier 2 RT | Rule |
|---|---|---|---|
| tide-pool reflection | SSR (screen-space ray trace) | true ray bounce | must look "same at a glance" — SSR blur 3 |
| brass bounce (lighthouse) | envmap highlight only | true bounce | brass stays small so raster isn't embarrassed |
| soft shadows | 2048 PCFSoft | RT direct shadow + 1 bounce | RT must be *softer*, never harder |
| glass prisms | transmission + emissive | emissive + tinted bounce | transmission is NOT ray traced (cost) |
| lantern light | point light ≤ 8 | emissive + bounce | RT glow falls off with real inverse-square |
| shadow terminator | raster baked AO | RT ambient terminator | deep void `#0d0e18` on the night side |
| ghost prism visibility (幽光棱) | SSR reflection | true bounce reflection | identical read by construction — both tiers show *a reflection* |

**Equivalence rule (frozen)**: no material may rely on a feature only one tier has. The raster tier is the reviewable baseline (headless-safe); the RT tier may only *improve* the same read, never change it. "90% at a glance" is the acceptance bar from GDD.md §4.

## 6. Per-island art plan

1. **灯塔岛 (Lighthouse Isle, sun elevation 12°)**: golden hour — the tutorial island where the water mirrors everything; first reflection is the 5-second wow. Sandstone beveled platforms spiral up a lathe-built lighthouse; lantern gold glints mark the prism route.
2. **雾港 (Mist Harbor, elevation 8°, fog violet)**: dusk over wooden docks; brass lanterns on poles; moving platforms are brass winch-arms over mirror water; prisms hang inside glass buoy lanterns.
3. **顶灯室 (The Lantern Room, elevation 5°, fog void)**: interior vertical ascent in near-dark; the ONLY lights are the keeper's lantern and the prism glints; the RT tier's indirect bounce is what makes brass railings legible — the level is designed to be played in light you carry.

## 7. Procedural geometry rules

- Every platform is a `RoundedBoxGeometry` (bevel 0.08) — the 3D answer to patapong's chunky flat silhouettes; never sharp-edged (the void eats sharp edges).
- Character silhouette: one lathe body + capsule limbs + spherical lantern head — readable at 3/4 low angle, in silhouette (frozen: readability in silhouette beats detail).
- Shards are `IcosahedronGeometry` (radius 0.28, bob ± 0.1 @ 1 Hz) — they must read as "light caught in a net", not as gems.
- Sea is a large near-planar quad with a 0.05 amplitude sine normal wobble (SSR-stable, RT-cheap).
- Total triangle budget per island ≤ 40k (TDD §5.1) — procedural, zero texture files.
