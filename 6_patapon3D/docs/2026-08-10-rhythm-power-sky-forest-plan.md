# Rhythm Power and Sky-Forest Polish Plan

## 1. Player-facing goal

Keep the approved voxel characters, PBR rendering, arrow destruction, and
stationary tap dances. Improve the intro in three places:

1. off-beat taps remain valid command input instead of erasing progress;
2. accurate taps visibly increase ATTACK power;
3. replace the broken-looking tiled floor with a coherent sky-forest diorama.

The scene remains one intro vertical slice. This pass does not restore the full
battle or implement the other nine command effects.

## 2. Rhythm contract

The command sequence remains `W A W A` (`PATA PON PATA PON`). Every correct
drum advances the four-slot command, regardless of timing. Wrong drum order
still breaks and resets the command because it is a different command.

Each correct tap receives one timing grade:

| Grade | Distance from beat | Power |
|---|---:|---:|
| PERFECT | <= 80 ms | 1.00 |
| GOOD | <= 160 ms | 0.75 |
| OK | <= 300 ms | 0.50 |
| OFF BEAT | > 300 ms | 0.25 |

The UI keeps all accepted inputs and shows the grade on each slot. The command
power is the average of four grades. No timing grade resets command progress.

## 3. Power feedback

Power must affect the actual attack, not only a label:

- arrow launch speed scales from 0.90x to 1.15x;
- crater selection radius scales from 5 to 9 grid cells;
- debris count scales from 20 to 64;
- localized impact light and boss recoil scale with power;
- the ending reports `ATTACK POWER` as a percentage and names the overall
  command grade.

The target remains deterministic for a given four-grade sequence.

## 4. Sky-forest level composition

The ground becomes one continuous raised island instead of stretched cube
instances with visible gaps. The 2.5D scene gets three depth layers:

- **foreground**: mossy voxel ledge, roots, mushrooms, grass clumps, and stones;
- **play lane**: continuous earth/grass platform under the army and Moloch;
- **background**: tall voxel tree trunks, layered canopies, floating rock
  islands, distant mountains, and volumetric-looking cloud clusters.

All scenery is procedural and uses shared instanced cube geometry. Colors use
warm sunset gold against forest greens and cool atmospheric blues. Scenery must
frame the actors without overlapping their profile silhouettes.

## 5. Implementation seams

- `src/intro/rhythm.ts`: timing-grade and command-power pure functions.
- `src/store.ts`: per-slot grades and final attack power.
- `src/App.tsx`: grade labels, power meter, and ending power result.
- `src/engine/IntroEngine.ts`: accept correct off-beat taps; scale projectile,
  crater, debris, recoil, and impact light; rebuild terrain/background.
- `checks/check-voxel-physics.ts`: timing boundaries, nonzero off-beat power,
  monotonic power scaling, and existing physics/composition checks.

## 6. Acceptance gates

- Entering correct `W A W A` at arbitrary timing always launches ATTACK.
- Perfect timing produces greater crater/debris/recoil than four off-beat taps.
- Wrong key order still resets with clear feedback.
- Input slots retain and display all timing grades.
- The floor reads as one continuous platform at desktop and mobile sizes.
- At least three foreground prop types and three background scenery types are
  visible without obscuring the army or Moloch.
- `npm run harness`, `npm run typecheck`, and `npm run build` pass.
- Browser playthrough covers both perfect-biased and off-beat commands, replay,
  desktop, mobile, and zero console errors.

## 7. Stop condition

This pass is done when timing changes attack strength, off-beat input is
non-destructive, and the intro reads as a coherent voxel sky forest rather than
a combat test on a broken tiled floor.
