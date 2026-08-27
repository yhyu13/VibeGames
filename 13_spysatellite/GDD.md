# EYE-13 — GDD

Night SAR satellite. Radio operator. One courtyard. 90 seconds.

## 1. One line

You are a night SAR satellite. Zoom from orbit, hold-pierce cloud, click-lock a VIP, and click what the kill team asks about until they take the shot. You never pull a trigger.

## 2. Player fantasy

Radio operator (timed intel answers). Not eye-only, not JTAC.

## 3. Intro scene (frozen)

ONE BLOCK · ~90s · 7 RADIO BEATS.

| t | beat |
|---|------|
| 0s | ORBIT |
| 8s | PIERCE (hold SAR through cloud) |
| 18s | LOCK VIP |
| 22–80s | RADIO (7 scripted asks) |
| 80s | SHOT |
| 90s | END CARD |

20×20 m courtyard, night SAR/IR. West wing, east wing, canopy that breaks lock, VIP, 2 west-door guards, idle van, kill-team pip, east-alley empty marker, west-alley floor.

## 4. Core loop

ORBIT ZOOM → HOLD SAR (heat) → CLICK VIP (lock) → KT ASKS → FIND + CLICK ENTITY → AUTO TX → (repeat 7) → KT SHOOTS → END CARD

The click *is* the answer. No lying.

## 5. Win / lose

- **Win** = VIP down with lock held for the last 2s and beat 7 GO sent in time.
- **Lose** = 2 failed beats (abort), lock dropped at shot, beat 7 fail, or 90s timeout.
- Restart is instant (R).

## 6. Input

- Wheel / RMB-drag = zoom (orbit ↔ tile)
- LMB = lock VIP / click entity (SAR-on, on courtyard)
- Hold Space or MMB = SAR
- Esc = pause · R = restart

## 7. Scope thirds

| Ship | Data-frozen | M2+ |
|------|-------------|-----|
| 1 courtyard, 1 VIP, 1 weather, 1 assassination, 7 beats, dual-scale orbit, night SAR | extra beats, 2nd VIP path, police car, 2P radio, LLM paraphrase | city, live LLM, globe, JTAC trigger |

## 8. “完美” (stop when you say stop)

- **Visual:** 8s of 90% ink (limb + cloud); hold SAR and people become cyan blobs; 10s “I am a satellite”.
- **Feel:** every KT question has a clickable answer in view if you SAR+zoom; lock drop is readable; overheat is scary not cheap.
- **Perf:** 60 fps @1080p; cold start ≤1s; 0 console errors.
- **Replay:** same 90s script; skill = zoom/SAR/click timing; 0/7–7/7 is the score.
