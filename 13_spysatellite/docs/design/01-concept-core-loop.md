# Concept + core loop (coder-facing)

## Loop

```
ORBIT ZOOM → HOLD SAR (heat) → CLICK VIP (lock)
  → KT ASKS → FIND + CLICK ENTITY → AUTO TX
  → (×7) → KT SHOOTS @ 80s → END CARD
```

## Entity ids

| id | kind | notes |
|----|------|-------|
| vip | person | scripted path; lock target; beat 1 + 7 |
| guard_w1 / guard_w2 | person | west door; beat 2 accepts either |
| van | vehicle | idle; beat 3 |
| kt | person | visual only, never a correct click |
| canopy | structure | beat 5; occludes VIP ≥0.4s → drop lock |
| east_alley | marker | beat 4 empty-click (no police in v0) |
| west_alley | marker | beat 6 LOS floor |

## Radio script

Copied into `src/core/data/courtyard.ts` as `RADIO_BEATS`. Do not paraphrase at runtime. Click = TX tag. Cannot lie.

## Dual-scale lie

Core simulates a 20 m courtyard. Engine paints orbit (sky sphere, earth limb, cloud slab) and lerps one camera. Picking lives only on CourtyardTile and only while SAR-on and `zoom01 ≥ 0.72`.
