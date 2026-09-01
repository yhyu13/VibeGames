# SOP-GDS — Operating Claude Game Studio · v1.0

> **Purpose.** A single, repeatable recipe for taking a game from idea to shipped using the Claude Game Studio tooling in `.claude/` (49 tiered agents + ~90 slash commands + 7-phase pipeline + 41 templates). Read this before starting a *new* game; use it to *normalize* an existing one.
>
> **Precedence.** Where a game already has a per-game `GAME-SOP.md` (e.g. `7_hotlineShanghai/`), that per-game doc wins for game-specific rules; this doc supplies the process skeleton. On conflict, the per-game doc is authoritative for that game only.
>
> **Last updated:** 2026-09-01.

---

## 0. What this is

"Claude Game Studio" is not a separate application — it is an agent architecture layered on top of Claude Code. Its building blocks:

| Layer | What's there | Count |
|---|---|---|
| **Agents** | 3 tiers — Tier-1 directors (`creative-director`, `technical-director`, `producer`) → Tier-2 leads (`game-designer`, `lead-programmer`, `art-director`, `qa-lead`, …) → Tier-3 specialists (49 total, incl. Godot/Unity/Unreal sub-specialists) | 49 |
| **Skills / slash commands** | `/start`, `/brainstorm`, `/design-system`, `/create-epics`, `/dev-story`, `/gate-check`, `/release-checklist`, … | ~90 |
| **Workflow catalog** | 7-phase pipeline (`workflow-catalog.yaml`) read by `/help` and `/gate-check` | 7 phases |
| **Templates** | GDD, ADR, art bible, sprint plan, UX spec, post-mortem, … | 41 |
| **Hooks + rules** | Session context, asset validation, commit/push guards, path rules | ~12 / 11 |

The pipeline is the spine: **Concept → Systems Design → Technical Setup → Pre-Production → Production → Polish → Release**. Each phase has *required* vs *optional* steps and a machine-checkable artifact (a `glob`/`pattern` on a file), which is what lets `/help` and `/gate-check` auto-detect where you are.

---

## 1. The 4-doc floor (every game must carry this)

A fresh session can only resume a game if four documents exist. This is the minimum bar, independent of phase:

| Doc | Role | Question it answers |
|---|---|---|
| `AGENTS.md` | Rules + current state | "What are the rules, and where are we *right now*?" |
| `GDD.md` | Design authority | "Why does it work this way (mechanics/vision)?" |
| `TDD.md` | Number & contract authority | "What are the exact numbers/signatures?" |
| `JOURNEY.md` | Decision log | "What did we decide and why, in order?" |

A game missing any of the four is **non-resumable** and must be treated as the highest-priority gap.

### The three hard rules (from 7_hotlineShanghai's GAME-SOP, generalized)

1. **One number lives in one place.** Numbers live only in `TDD.md`. Any other doc that states a number must reference TDD, not copy it. A duplicated number is a defect.
2. **Version is declared once.** The current version appears only in `AGENTS.md` + `TDD.md` headers. No other doc self-reports a version.
3. **Every reference resolves.** Any `path` a doc cites must exist. A missing reference must be added, deleted, or marked `待确认`.

---

## 2. The 7 phases (with entry/exit artifacts)

### Phase 0 — Entry (every time)
1. Run `/start`. Answer the 4-way question honestly (A no idea / B vague / C clear / D existing work).
2. Let it route you. Phase gates exist to catch missing artifacts, not to slow you down.

### Phase 1 — Concept — exit: `design/gdd/game-concept.md` + `technical-preferences.md`
1. `/brainstorm [open | hint]` → concept, pillars, MDA analysis, Visual Identity Anchor.
2. `/setup-engine [engine] [version]` — **required**, pins engine + writes `technical-preferences.md`.
3. `/art-bible` → visual identity (before systems).
4. `/map-systems` → systems index with dependency order + priority tiers.
5. `/design-review` the concept.

### Phase 2 — Systems Design — exit: every MVP system GDD is `Approved`
1. `/design-system [system]` **in dependency order**, one per system.
2. `/design-review` each GDD — no `MAJOR REVISION` verdict.
3. `/review-all-gdds` → cross-GDD consistency + design-theory review.
4. `/consistency-check` → contradictions + undefined refs.

### Phase 3 — Technical Setup — exit: `architecture.md` + ≥3 ADRs + control-manifest + accessibility tier
1. `/create-architecture` → master architecture doc.
2. `/architecture-decision` ×N (min 3 foundation ADRs).
3. `/architecture-review` → ordering + engine compatibility.
4. `/create-control-manifest` → flat rules sheet for programmers.
5. `/gate-check`.

### Phase 4 — Pre-Production — exit: epics + stories + first sprint + validated fun
1. `/asset-spec` (optional) → entity/asset inventory.
2. `/ux-design` ×3 minimum (main menu, HUD, pause).
3. `/ux-review` → GDD + accessibility alignment.
4. `/prototype` (optional, recommended for new mechanics).
5. `/vertical-slice` (recommended) → full core-loop pass before committing scope.
6. `/create-epics` by layer (foundation → core).
7. `/create-stories [epic]`.
8. `/sprint-plan new`.

### Phase 5 — Production — repeat per sprint
1. `/sprint-plan` → prioritize ready stories.
2. `/story-readiness [story]`.
3. `/dev-story [story]` → routes to the correct programmer agent.
4. `/code-review` → architectural review before close.
5. `/story-done` → verify acceptance criteria.
6. `/qa-plan [epic]` / `/smoke-check` / `/regression-suite`.
7. `/bug-report` → `/bug-triage` → fix → `/retrospective` at sprint end.
8. `/scope-check` when stories are added mid-sprint.

### Phase 6 — Polish — exit: 3 playtests + polish team pass
1. `/perf-profile` → `/balance-check` → `/asset-audit`.
2. `/playtest-report` ×3 (new-player, mid-game systems, difficulty curve).
3. `/team-polish`.

### Phase 7 — Release — exit: launch
1. `/release-checklist` → `/changelog` → `/patch-notes` → `/launch-checklist`.
2. Post-launch: `/team-live-ops`, `/hotfix`, `/day-one-patch`, `/localize`.

---

## 3. Cross-cutting rules

- **One source of truth per fact.** Numbers → TDD; version → AGENTS+TDD headers; references → must resolve.
- **Delegate by department.** "What team would own this in a real studio?" → use that agent.
- **Never skip a `required` artifact.** `/gate-check` verdicts are advisory, but skipping a required artifact is what later causes design pivots.
- **Doc-driven, ship-in-one-commit.** Code and its GDD/TDD ship together. A doc drifting from code is a defect.
- **Ground reverse-documentation.** When filling a missing doc from existing code, never invent mechanics or numbers — read the actual source and mark unknowns `[待确认]`.

---

## 4. Game conformance index (games 4–14)

Status key: ✓ present · ✗ missing · △ partial. "Floor" = the 4-doc floor from §1.

| Game | AGENTS | GDD | TDD | JOURNEY | Floor | Current phase (approx) |
|---|---|---|---|---|---|---|
| `4_chunbai` | ✗ | ✗ | ✗ | ✗ | ✗ | Production (raw code, no docs) |
| `5_gamejam_1` | ✗ | △ (`boss-anxiety-gdd.md`) | ✓ | ✗ | △ | Shipped |
| `6_patapon3D` | ✓ | ✓ | ✓ | ✓ | ✓ | Intro showcase |
| `7_hotlineShanghai` | ✓ + `GAME-SOP.md` | ✓ | ✓ | ✓ | ✓ | Intro polished (reference impl) |
| `8_lifegame` | ✓ | ✓ | ✓ | ✓ | ✓ | Intro complete |
| `9_3dplatform` | ✓ | ✓ | ✓ | ✓ | ✓ | Design-doc only |
| `10_phasewalk` | ✓ | ✓ | ✓ | ✓ | ✓ | In progress |
| `11_blackhole` | ✓ | ✓ | ✓ | ✓ | ✓ | Playable |
| `12_ddgi` | ✓ | ✗ | ✗ | ✓ | △ | Playable |
| `13_spysatellite` | ✓ | ✓ | ✓ | ✓ | ✓ | In progress |
| `14_neuraltexture` | ✓ | ✓ | ✓ | ✓ | ✓ | In progress |
