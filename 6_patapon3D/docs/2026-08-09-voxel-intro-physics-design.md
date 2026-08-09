# Patapon 3D Voxel Intro and Physics Design

## 1. Goal

Ship one polished 2.5D intro scene rendered entirely with dense 3D voxels. The
scene must prove the game's actual fantasy: a small one-eyed army obeys musical
commands and attacks a giant monster. It must not resemble Pong, a four-lane
arcade cabinet, or a generic rhythm-game menu.

The work fails closed: character art is P0. Intro UI, timing polish, particles,
and broader gameplay remain blocked until the voxel characters read correctly
at gameplay distance.

## 2. Approved Visual Direction

- Full 3D rendering with true depth, PBR lighting, and contact shadows.
- 2.5D gameplay composition: movement is left-to-right on a shallow depth
  plane, with layered terrain and background parallax.
- Near-profile perspective camera. Small cinematic offsets may reveal depth,
  but must not damage the side-on army-versus-monster silhouette.
- Characters use hundreds or thousands of visible cubes. Ordinary sphere
  geometry is forbidden for bodies, eyes, pupils, horns, and clouds.
- Patapon identity comes from one dominant eye, a round voxel body, thin voxel
  limbs, three feather shapes, and an extreme scale contrast with Moloch.
- Warm natural battlefield colors replace neon drum pads as the dominant scene
  language.

## 3. Scope and Priority

| Priority | Deliverable | Gate |
|---|---|---|
| P0 | Three dense-voxel Patapons, Moloch, and terrain | Units remain distinct; Moloch is at least 4x their screen height |
| P1 | March, bow draw, attack, recoil, and idle poses | Motion preserves silhouette and does not expose non-voxel geometry |
| P2 | Arrow projectile and destructible body crater | Repeatable hit removes voxels and emits physical fragments |
| P3 | One playable `PATA PON PATA PON` ATTACK sequence | Fourth accepted beat launches the archer attack |
| P4 | Camera, lighting, impact pause, audio, and restrained particles | One replayable wow moment at arrow impact |
| P5 | Intro copy and minimal controls | UI supports the scene rather than dominating it |
| P6 | Documentation consolidation | GDD, Art Book, and Code Book are the only authorities |

## 4. Adaptive Surface Voxelization

### 4.1 Source representation

Characters are authored as combinations of signed-distance primitives:
spheres, ellipsoids, capsules, cones, boxes, and smooth unions/subtractions.
Each semantic region remains separate: body, sclera, pupil, feathers, limbs,
weapon, horns, hands, and damage interior.

Regions compose by fixed priority: pupil > sclera > weapon/horns > feathers >
limbs/hands > body > damage interior. Each grid cell belongs to the highest
priority occupied region only. Lower-priority regions are subtracted at that
cell, preventing duplicate or coplanar cubes while preserving semantic IDs.

### 4.2 Density

- Patapon near LOD: `24^3` source grid.
- Moloch near LOD: `40^3` source grid.
- Medium LOD: Patapon `16^3`, Moloch `28^3`.
- Far LOD: Patapon `10^3`, Moloch `18^3`.
- LODs generate once at initialization and remain cached.

### 4.3 Surface extraction

For every source-grid cell:

1. Evaluate the region's SDF at the cell center.
2. Mark the cell occupied when the result is at or below zero.
3. Keep an occupied cell only when at least one of its six axial neighbors is
   empty or outside the grid.
4. Emit local position, voxel scale, palette index, semantic region, and a
   quantized surface normal.

Invisible interior cells never reach the renderer. This preserves a dense
voxel surface while avoiding the cost of the full volume.

### 4.4 Rendering

- Share one unit-cube geometry across the scene.
- Batch instances by material family, not by individual body part.
- Store immutable model data in typed arrays.
- Animate rigid semantic regions through parent transforms; do not resample
  SDFs per frame.
- Use instance color and compact per-instance attributes for palette/region.
- Allocate all matrices, fragments, arrows, and effects up front.
- Never create meshes, arrays, or `Object3D` instances during the frame loop.

Target near-LOD counts are approximately 500-900 surface cubes per Patapon and
1,500-2,200 for Moloch. Standard cubes cost 12 triangles each, so density is
reduced before the section 7 hard cap is exceeded.

### 4.5 Batches, damage interior, and LOD

Six persistent batches own environment, army bodies, army articulated parts,
Moloch, arrow, and debris/dust. Each actor/semantic region owns a stable range.
Animation rewrites only dirty ranges into preallocated matrix arrays; static
body ranges do not update when limbs move.

Moloch generation also caches occupied cells one and two grid steps behind the
visible boundary. These cells normally remain hidden. A crater may expose at
most 240 of them using reserved slots in the existing Moloch batch and a dark
damage palette, adding no draw call and doing no impact-time voxel generation.
Removed surface slots are reused first; the invariant after impact is
`remainingSurface + exposedInterior <= 2,240`.
Crater selection clamps radius inward until removed surface plus exposed
interior fits 240 slots. It may not clamp below the connected 12-cell opening;
generation fails P0 if the two cached layers cannot satisfy that minimum.

The locked showcase camera uses near LOD only. Medium/far models may be
profiled, but switching during destruction is deferred so crater state cannot
pop or migrate between grids.

## 5. Physics Showcase

### 5.1 Sequence

1. A Patapon archer draws and releases an arrow.
2. The arrow follows a ballistic path through the shallow 3D lane.
3. It collides with Moloch's ellipsoid broad-phase collider.
4. The frame holds for exactly five fixed ticks (83.33 ms) for impact emphasis.
5. Voxels inside a noisy impact sphere are removed from Moloch.
6. A dark-red interior shell appears behind the removed surface.
7. Selected removed voxels become physical debris and burst outward.
8. Moloch recoils; the arrow embeds, vibrates, and settles.
9. Debris bounces, sleeps, and returns to the pool before the showcase resets.

### 5.2 Projectile model

The arrow uses fixed-step semi-implicit Euler integration:

```text
velocity += gravity * dt
position += velocity * dt
orientation = direction(velocity)
```

Collision first uses a segment-versus-ellipsoid test between the previous and
next positions. A bounded eight-step binary search then evaluates Moloch's SDF
along the hit segment to locate the visible surface. The arrow embeds at that
point plus half a voxel along the normal, preventing floating or rear hits.

### 5.3 Crater model

The hit point is transformed into Moloch's local voxel coordinates. Occupied
body surface cells are removed within 3.5 grid cells of impact and up to 2.5
cells inward. A seeded integer hash perturbs the radius by at most 0.6 cells.
The removed set must contain the nearest hit cell and a connected six-neighbor
opening of at least 12 cells. Other semantic regions cannot be removed.

Only Moloch's instance matrices are compacted and uploaded after impact. The
voxel source model, geometry, other characters, and scene remain untouched.
The crater remains for the duration of the shot and resets from cached model
data for replay.

### 5.4 Debris solver

Removed cells are ranked by visibility and distance from the impact center.
Up to 64 become debris; the remainder are represented by dust.

Each debris item contains position, previous position, velocity, quaternion,
angular velocity, scale, color, age, and sleep state. A custom fixed-step
solver provides:

- gravity;
- impact impulse plus seeded angular velocity;
- ground-plane collision;
- restitution and tangential friction;
- low-velocity sleep;
- four-second maximum lifetime;
- return to a preallocated pool.

Debris renders through one dynamic `InstancedMesh`. This project does not need
a general-purpose physics dependency for the approved showcase.

## 6. Components and Data Flow

```text
VoxelShape definitions
  -> voxelizeSurface()
  -> cached VoxelModel LODs
  -> VoxelBatchRenderer

Intro/command timeline
  -> ArcherPoseController
  -> ArrowSystem fixed-step update
  -> ellipsoid hit
  -> VoxelDestruction.applyCrater()
  -> body instance upload + DebrisSystem spawn
  -> camera/audio/impact events
```

Recommended boundaries:

- `core/voxel`: pure SDF primitives, sampling, surface extraction, crater
  selection, and seeded noise. Public contracts are `voxelizeSurface(shape,
  options): VoxelModel` and `selectCrater(model, hit, options): CraterPatch`.
- `core/physics`: pure `stepArrow(state, dt): ArrowState`,
  `intersectBoss(previous, next, collider, sdf): Hit | null`, and
  `stepDebris(pool, dt, ground): void` contracts.
- `engine/VoxelBatchRenderer`: Three.js instance buffers and material batches.
- `engine/ArrowRenderer`: pooled arrow mesh and interpolation.
- `engine/DebrisRenderer`: one dynamic instanced debris batch.
- Intro director emits `arrowReleased`, `bossHit`, `craterOpened`,
  `impactHold`, and `showcaseReset`. Engine adapters consume them; the director
  never mutates render buffers or physics state directly.

The pure modules must not import Three.js, React, Zustand, DOM, or Web Audio.

## 7. Performance Budget

- Maintain 60 FPS at 1920x1080 after a 5-second warm-up, measured for 30
  seconds: average frame time <= 16.0 ms and p95 <= 18.0 ms.
- Initial voxel and cache generation completes within 500 ms on the development
  machine. Reset restores caches and performs no generation or resource creation.
- Maximum 64 active physical debris voxels.
- Maximum one body instance-buffer upload per impact.
- One dynamic matrix upload per active debris frame.
- Broad-phase collision uses one ellipsoid, not thousands of voxel colliders.
- Physics runs at fixed `1/60`; rendering interpolates visual transforms.
- The accumulator allows at most five catch-up steps and drops excess time.
  The impact hold lasts exactly five fixed ticks (`5/60` s), not wall-clock
  time. Timeline, projectile, debris, actor animation, and interpolation all
  freeze while rendering repeats the impact state; camera shake/audio may run
  on wall-clock time. Elapsed wall time during the hold is discarded. The next
  frame resumes with an empty accumulator. Reset clears accumulator, seed,
  arrow, debris, and interpolation state.
- No new runtime dependencies.
- Ten resets may grow heap by at most 1 MB after GC; without GC access,
  geometry, material, and GPU-buffer counters must remain exactly constant.

| Batch | Calls | Max cubes | Max triangles |
|---|---:|---:|---:|
| Terrain/background | 1 | 300 | 3,600 |
| Army bodies | 1 | 1,350 | 16,200 |
| Army articulated parts | 1 | 180 | 2,160 |
| Moloch + reserved interior | 1 | 2,240 | 26,880 |
| Arrow | 1 | 24 | 288 |
| Debris/dust | 1 | 128 | 1,536 |
| **Subtotal** | **6** | **4,222** | **50,664** |

Dense voxels replace the obsolete TDD `<30k` target with `<55k` target / `65k`
hard cap. Post-processing may add three calls: complete frame <= 9 target / 12
hard maximum. This is a required frozen TDD contract change and must be the
first implementation commit; no renderer work starts until TDD records it.
Normal, impact, and post-FX frames use 5, 6, and at most 9 calls respectively.

Terrain is one shallow instanced grid: at most 180 foreground cells, 80
background slabs, and 40 props. It has no destruction or LOD, receives shadows,
and presents three visible Z layers without covering army silhouettes.

## 8. Failure and Recovery

- If voxel generation exceeds 500 ms, fall back one LOD level and
  record the downgrade.
- If the debris budget is exhausted, recycle the oldest sleeping fragments;
  never allocate additional fragments.
- If an arrow crosses the boss without a segment hit, treat it as a failed
  shot and reset; do not fabricate a crater.
- If crater compaction produces an invalid instance count, restore the cached
  undamaged model and surface a development error.
- Context loss or scene disposal must release all geometry, material, and
  instance buffers exactly once.

## 9. Verification

Automated gates:

```bash
npx tsc -b --noEmit
npm run build
npx tsc -p tsconfig.checks.json
node .checks/scripts/check-voxel-physics.js
```

`tsconfig.checks.json` emits the production pure-core modules and the harness
to `.checks/` using the repository's existing TypeScript compiler; the harness
imports those emitted modules, never duplicated algorithms. It prints one
PASS/FAIL line per invariant, exits nonzero on failure, and covers:

- surface extraction excludes interior cells;
- a voxelized sphere is symmetric within grid tolerance;
- seeded crater selection is deterministic;
- crater removal never changes unrelated semantic regions;
- segment/ellipsoid collision catches fast arrows;
- debris ground collision loses energy and eventually sleeps;
- pools never exceed their fixed capacity.

Browser acceptance:

- fixture camera is perspective FOV 31, position `(2.5, 7.5, 27)`, looking at
  `(0, 0.5, 0)`, viewport 1920x1080; its screenshot shows cube stepping on
  body, eye, and horn;
- projected actor AABBs report each unit >= 48 pixels tall, pairwise overlap
  area <= 15% of the smaller AABB, and Moloch height >= 4x mean unit height;
- arrow apex is >= 0.75 world units above the straight release-to-hit chord;
  embedded tip is within 0.6 voxel widths of the SDF hit point;
- crater opening has >= 12 connected missing surface cells and exposes dark
  interior to a measured depth >= 1.5 Moloch grid cells;
- between 20 and 64 debris entries are active within two fixed ticks of impact;
  all sleep or recycle by 4 seconds while geometry/material/buffer counters
  equal their pre-shot values;
- replay produces the same crater for the same seed;
- ten consecutive resets produce no console errors or resource growth.

## 10. Documentation Cleanup

After the visual and physics gates pass, retain three human-readable sources:

- `GDD.md`: game fantasy, rhythm commands, intro sequence, and scope.
- `docs/design/02-art-direction.md`: approved dense-voxel 2.5D art book.
- `TDD.md`: voxel/physics architecture, contracts, budgets, and verification.

Delete or merge redundant recovery-era planning and evidence after transferring
still-valid facts. Pong and 1v1 history should be reduced to one changelog note,
not repeated throughout active documentation. Agent instructions and README
must describe the actual active build and paths.

## 11. Acceptance Decision

The approved direction is:

- full 3D dense surface voxels;
- 2.5D side-view scene;
- adaptive `24^3` Patapon / `40^3` Moloch source grids;
- instanced surface-only rendering;
- arrow ballistics;
- deterministic destructible body crater;
- pooled voxel debris with lightweight custom physics;
- art and physics proof before intro UI or broader game restoration.
