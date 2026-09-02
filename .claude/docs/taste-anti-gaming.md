# Taste Score — Anti-Goodhart Protocol

`VTS` is judged by an LLM and chased by an LLM. The two share a prior for "what
sounds tasteful," so a rubric alone — however many axes or walls — collapses to
"optimize for what a competent LLM calls taste." Textual rules can be stepped
around; the mechanisms below are meant to be *harder to game, not better
described*. Anything that is only a rule (a sentence saying "don't add bloom")
is a wall. Everything here is a **check, an anchor, or an asymmetry** the
chaser cannot move.

Sections: [1] Blind judge (fixes the author self-scores hole) ·
[2] Essence anchors (a reference the agent cannot move) ·
[3] Mutation gate (score-integrity as a tested artifact) · [4] Normalized reward.

---

## 1. Blind judge — the author does not assign VTS

The single biggest Goodhart hole is that the round's `STEP 4` had the *author*
write "VTS 79→81" in its own commit message. That is self-scoring, and a chase
agent learns to write persuasive judge-lines rather than make better changes.

**Rules:**

1. **Split authorship from scoring.** The author of a change **never** emits a
   VTS number. It may state a *claim* in a single line ("the boss hit now reads
   as a hit, not IDLE") — no scores, no total.
2. **A blind judge scores the diff only.** A fresh-context `taste-score` agent
   receives (a) the `git diff`, (b) the game's **Essence anchor** (below), and
   (c) *nothing* the author wrote about quality. It emits the score report per
   the existing Judge protocol (one idea, 2-sentence pitch, per-axis score +
   named evidence, VTS total).
3. **Divergence monitoring.** The author may still submit a self-estimate, but
   it is treated as *telemetry, not the score*. Track `author_claim − blind_verdict`
   per author per axis. If an author's div > +2 on any axis over ≥3 rounds, that
   author is flagged **report-inflation** and its subsequent rounds are
   down-weighted. This turns self-serving language from a free raise into a
   measurable, decelerating signal.

---

## 2. Essence anchors — the reference the author cannot move

Rubric axes are positive criteria and can be optimized toward. Taste must be
anchored to a **fixed, human-owned statement** the agent reads but cannot edit,
so "coherent" is scored *against the essence*, not against "feels cohesive to an
LLM." Each essence is one sentence (what the thing is *for*) + 2–3 exclusion
examples (the box the agent must stay inside).

> These are drafted from each game's existing GDD/design authority. **They are
> human anchors: ratification is the maintainer's call, and a draft here is
> provisional until it lives in the game's own docs.** An agent optimizing this
> list is itself a Goodhart case; the anchors are meant to be *stable*, not
> re-derived each round.

| Game | Essence (one sentence) | Exclusions (the box) |
|---|---|---|
| 6_patapon3D | 鼓点即军队：你的节奏是因，大军的行动是果。 | 不是 Pong；不是 1v1 格斗；不是带背包/商店/RPG 成长的节奏游戏。 |
| 7_hotlineShanghai | 弄堂静默枪战：一击必杀，影子与光，撤离而非清场。 | 不是弹幕刷怪；不是计量型战斗（不做血量/刮痧）；节奏重于爽快。 |
| 8_lifegame | 小镇做题家的一生：骰子定概率，你控头脑与身体，财富是结果。 | 不是数值规划器；不做自由沙盒人生；目标=达成「第一桶金」叙事。 |
| 9_3dplatform | 跳跃的物理感：跳、落地、惯性，一步有一步的重量。 | 不是跑步游戏；不做战斗；关卡是跳台不是收集马拉松。 |
| 10_phasewalk | 四相切换穿塔：相位即解谜——固跳/液泳/气飘/焰爆冲。 | 不是动作战斗；四相是钥匙不是武器；解谜前置、操作后置。 |
| 11_blackhole | 克尔黑洞的物理精确可视化：让广义相对论可观、可量。 | 不是炫技屏保；不糊物理；每条标注必须能对回 kerr 常数。 |
| 12_ddgi | 实时 GI 探针体的展示窗：让光传播质量本身成为主角。 | 不是玩法 demo；不靠后期特效掩盖；展示的是 GI 不是花哨粒子。 |
| 13_spysatellite | 夜空 SAR 侦察的紧绷：热量是风险，锁定是目标。 | 不是射击游戏；不降低侦察的纪律感；每一个隐蔽后果要可读。 |
| 14_neuraltexture | 浏览器内训练解码器：让损失曲线「看得见地下降」。 | 不是竞速；不隐藏训练本质；展示的是收敛不是外壳。 |

**How judges use it.** The blind judge scores `Coherence` and `Signature`
against the essence sentence: does this change make the thing *more* its stated
idea, or just more polished? A well-crafted addition that is off-essence is
Coherence-negative even at Craft 10.

---

## 3. Mutation gate — score integrity as a tested artifact

Do not trust "the score is right this time." For every candidate, run a fixed
**exploit battery** and assert the score cannot be fooled by known gaming moves.
Modeled on mutation testing, but applied to *the metric*: inject a known-bad or
known-decorative mutation and confirm the score drops (or fails to rise) in the
right axis. If any attack yields a score it shouldn't, that judge / rule is
distrusted.

The battery lives in [`../../../scripts/vts-mutation-guard.mjs`](../../scripts/vts-mutation-guard.mjs).

| Attack (mutation) | Required response | If it instead gains points |
|---|---|---|
| Add a decorative glow / shimmer to a HUD element | `Restraint` ↓ | the metric rewards decoration → gamed |
| Replace a punch hit-stop with a constant shimmer | `Restraint` ↓ | — |
| Remove a named info surface (round counter, HP) | `Craft` / `ScopeIntegrity` ↓ | — |
| Wrap a 1-line fix into a fake 5-file refactor | `Restraint` ↓ | — |
| Reword copy to sound "more cinematic" (no mechanic change) | `Coherence`/`Signature` must not rise | it rose → motivated reasoning |
| Strip a real feedback beat (a shake, a flash, a pop) | `Feel` ↓ | — |

**Gate rule:** `bad-mutation < honest-tighten < honest-tighten+improvement`.
A round only lands if every attack's required response held. If an attack made
the wrong axis move, the score report is rejected and the round is re-judged.

---

## 4. Normalized reward — raise the floor, not the ceiling

An un-normalized score rewards polishing already-strong games (9→9.5 is safe and
low-risk) — precisely the wrong target. The VTS intent is to lift the weakest.
So the *round gain* is normalized by the game's current baseline:

```
round_value = ΔVTS / (base_score / 100)   ← a 6→7 (Δ1 at base 60) outranks a 9→9.5 (Δ0.5 at base 90)
```

Concretely: `6→7` yields `1 / 0.60 ≈ 1.67`; `9→9.5` yields `0.5 / 0.90 ≈ 0.56`.
The agent is penalized for grazing the top and rewarded for lifting the bottom —
which is the actual goal. Target selection must therefore prefer the **lowest**
baseline, not "most recently touched."

---

## Enforcement summary (what "done" looks like)

- A round's score comes from a **blind judge on the diff**, never from the author.
- Each landed change is **recorded as a claim**; the claim is checked against the
  blind verdict for **divergence** over time.
- Before landing, the **mutation battery** runs and every required response held.
- **Coherence/Signature** are scored against the game's **essence anchor**.
- **Round gain is normalized** by baseline, biasing toward the weakest game.

These four are checkable (scriptable or monitorable), not just stated — that is the
difference between an anti-gaming *wall* and an anti-gaming *foundation*.
