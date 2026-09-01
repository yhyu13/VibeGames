# OpenWolf

@.wolf/OPENWOLF.md

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md every session. Check .wolf/cerebrum.md before generating code. Check .wolf/anatomy.md before reading files.

## Taste Score (VTS)

Every change must earn its place against the **VibeGames Taste Score** (`VTS`, 0–100). It is the single rubric this repo uses to rank work, and it is deliberately sized so overnight agents can compete on it. **Full definitions, band rubric, and the judge protocol are in [AGENTS.md](AGENTS.md#taste-score-vts).** Read that before changing anything.

Six weighted axes, judged 0–10. **The score is tech-agnostic** — it scores the *judgement* behind a change, not the toolchain (a 2D DOM game competes on equal footing with a WebGPU GI demo).

| Axis | Wt | Highest score means |
|---|---|---|
| **Feel & Juice** | 25 | moves with weight; consequences are legible; the 1-second-of-joy is present |
| **Vision Coherence** | 20 | one idea executed consistently — palette, camera, sound, UI from one world |
| **Restraint & Intentionality** | 20 | every element earned; nothing decorative that doesn't serve the idea |
| **Signature** | 15 | a voice; a 2-sentence pitch that sells it; un-interchangeable |
| **Craft & Architecture** | 10 | C.A.T-pure core, docs in sync, tsc green, no dead code, deps disciplined |
| **Scope Integrity** | 10 | finished-and-green beats half-finished; complete small loop > skeletal big one |

`VTS = Σ(wt × score) / 10`. **Coherence floor:** if Coherence < 4 or Restraint < 4, VTS is hard-capped at 60. **Restraint rule:** Restraint is only scored ≥6 when Scope Integrity ≥6.

**Golden rule — never inflate, edit.** The highest-weight axes (Feel, Coherence, Restraint) reward *removing and tightening*, not *adding*. Adding bloom, features, or third-party libs to pump the score is a Coherence/Restraint penalty and a net loss. That is the anti-gaming wall.
