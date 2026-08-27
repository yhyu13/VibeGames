# Art direction — night SAR / IR

## DNA (Q7-A, frozen)

Black courtyard, cyan heat blobs, scanlines. Optical zoom is grey cloud; hold SAR and people light up. Extreme case: first 8s are 90% ink (limb + cloud). The sensor *is* the look.

## Palette

| token | hex | use |
|-------|-----|-----|
| ink | `#030508` | sky / courtyard floor |
| cyan | `#3dff9a` | HUD, lock, guard heat |
| heat | `#7cffd4` | VIP blob |
| van | `#ffaa44` | vehicle IR |
| kt | `#ff5533` | kill-team pip / fail |
| warn | `#ffcc33` | live beat / heat bar |
| dim | `#1a2a28` | building edges |

## Orbit shell (engine only)

- Sky sphere, not a planet mesh.
- Earth limb = large sphere parked below the origin.
- Cloud = a translucent slab between orbit camera and tile. SAR multiplies opacity down. No picking.

## Courtyard

- 20×20 m plane + grid.
- West/east wings as dark boxes with edge lines.
- Canopy as a low-opacity box that still occludes lock in core (AABB), not in the shader.
- Optical: dim silhouettes, not clickable.
- SAR-on: heat blobs, clickable.

## Forbidden

- Photoreal dusk PBR (Q7-B).
- Schematic DEFCON vector labels as the look (Q7-C) — HUD text is allowed, the world is not a board game.
- Bloom as a personality. Scanlines + ink are the post.
- Runtime image/model/font files.
