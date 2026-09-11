# The round — operating brief

> This is the prompt the forever-pipeline feeds a fresh agent, once per round.
> It replaces the original bulleted checklist. `.claude/docs/taste-anti-gaming.md`
> is the *protocol* (why each wall exists); this file is the *brief* (what to do).

---

## The job

**Raise one game's taste score by one genuine, observable improvement, and land it
green.**

Not "improve the games". Not "work on the backlog". One game, one change, one
commit. The loop's whole value comes from being able to read 40 commits later and
say what each one did.

You are not the judge of your own work. You are the author. Someone else scores it.

---

## Step 0 — read the state before you touch anything

```bash
node scripts/vts-round.mjs --brief        # target, anchor, policy, budget
node scripts/vts-round.mjs --status       # what previous rounds landed
```

`--brief` picks the target for you: the **lowest measured baseline**, because the
normalized reward is `ΔVTS / (base/100)` — +5 on a 46-point game is worth twice
what +5 on a 92-point game is worth. Lift the floor.

Then read `.wolf/cerebrum.md` (§ Do-Not-Repeat) and the target project's own docs
before reading its code. Past rounds have already paid for several lessons.

---

## Step 1 — find the change

This is the only step that is not mechanical, and it is the whole job.

**Score the artifact, not your idea of it.** Play the game. Build it, open it,
run it. A defect you can see is worth ten you can infer.

**Look for an incoherence, not an absence.** The highest-weight axes — Feel (25),
Coherence (20), Restraint (20) — reward *removing* and *tightening*, not adding.
The cheapest large win is almost always one of:

| Symptom | What it usually is |
|---|---|
| Two systems that both implement the same mechanic, and only one is wired | Dead surface — delete one, or wire it |
| A number, label or bar that cannot change | A surface pretending to be information |
| Documentation that describes code that no longer exists | Craft — and it *lies to the next agent* |
| A signal derived from a smoothed stream | A beat that fires unreliably (see cerebrum) |
| A screen the design says is the point, that ships blank | The premise, undelivered |

**Verify the mechanism before you size the fix.** If a judge or a hunch says
"X is broken", reproduce X and measure it first. A fix sized to an unverified
claim is over-built. (Cerebrum: *trust a blind judge's DIRECTION, verify its
MAGNITUDE*.)

**Prefer the smallest change that moves the axis.** A 12-line diff that makes a
lost beat reliable is a better round than a 300-line feature, and it is a better
round even when the feature would score higher — because you can still explain
the 12 lines in six months.

### Two hard walls inside this freedom

- **No new runtime dependencies.** `package.json` dependencies do not change.
  CLAUDE.md names third-party libs as the anti-gaming wall explicitly; a new dep
  is also a supply-chain change.
- **Stay inside the target.** `--brief` prints the paths you may touch, and the
  frozen list. Editing a frozen path makes a verbatim extraction study fail its
  own README.

Everything else is open. Features are allowed now — but a feature is only worth
it if it makes the game *more itself*, and the diff budget is 400 lines.

---

## Step 2 — gate it

```bash
node scripts/vts-round.mjs --verify
```

That runs the mutation guard (both modes), the scope wall, the diff budget, and
the project's own `typecheck` / `test` / `build`. **Non-zero exit means the round
does not land.** Revert or fix; do not commit around it.

A green gate proves the code compiles, not that the change is real. The gate has
been green through every defect this repo has shipped. It is a floor, not a
verdict.

---

## Step 3 — land it

```bash
node scripts/vts-round.mjs --land <game> \
  --subject "<one line>" \
  --claim "<what a player can now observe>"
```

`--land` re-gates, stages **only** the target's paths (so unrelated churn in the
tree can never be swept in), refuses build output, and validates the message
before the commit exists. Commit messages look like:

```
enhance(9_3dplatform): stop the start press from also firing a jump

Pressing Space to begin a run no longer adds an unasked-for hop.

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

**The body states an observable claim and nothing else.** No VTS numbers, no axis
names, no score delta — the validator rejects them. An author who prints their own
score is grading their own homework, and the entire protocol exists to prevent
that. "Landing squash now fires at 144 Hz" is a claim anyone can check. "+1 Feel"
is not.

---

## Step 4 — hand it to a judge

You do **not** score your own round. Spawn a **fresh-context** judge agent — one
that has not seen this conversation — give it the commit, the target's essence
anchor from `.claude/docs/taste-anti-gaming.md`, and its rubric, and have it score
**the shipped artifact**.

**Ask for a PAIRED verdict: one judge, both ends.** Have it score this commit *and*
the parent artifact (the previous commit that touched this game) in the same
session, and report both totals:

```bash
node scripts/vts-round.mjs --verdict <commit> --vts <thisScore> --vs <parentScore>
```

This matters more than it looks. Blind judges disagree with each other far more
than a round moves — three judges have scored `9_3dplatform` at **46.5, 46.0 and
66.0**, a 19-point spread that utterly swamps the 4.5-point improvement an input fix
actually made. An unpaired verdict against the stored baseline is comparing two
instruments and calling the difference signal.

- **Paired and negative** → a real regression. Revert.
- **Unpaired and negative** → *not yet evidence*. `--verdict` will tell you to get a
  paired re-score of the parent before touching anything. Do that; do not revert on
  a cross-judge comparison, and do not keep a change that a paired judge calls worse.

---

## Failure modes this pipeline has already been bitten by

Read these as walls, not advice. Each one cost a real round.

1. **A judge scoring a DIFF will move artifact-level axes.** Scope Integrity
   describes the shipped game, not your changeset. Tell the judge which level it
   is scoring, explicitly.
2. **Green gates prove nothing when the project has no tests.** Every regression
   this repo shipped passed `typecheck && build`.
3. **When you smooth a stream, every consumer that differentiates it breaks — not
   just the loud one.** Grep them all in the same commit.
4. **A fixed frame count is not rate-independent.** Settle on a state, never on a
   number of frames. Same for a fixed timestep: ask whether *every* frame delivers
   the input edge, or only the frames that step.
5. **One keypress can be two logical events.** Whichever consumer spends the
   event must say so — and ask which consumer actually *spent* it.
6. **A judge optimises the rubric; your constraints bound what you may spend.**
   When a finding's remedy is "add a feature", check it against the walls first.

---

## The report

End the round with exactly this, and nothing else:

```
target:   <game>  (baseline <VTS>, rank <n>/11)
change:   <the one change, in one sentence>
gate:     <green | reverted>  (<what ran>)
commit:   <sha or none>
claim:    <the observable claim, verbatim>
verdict:  <blind judge's VTS, or "pending — judge spawned">
```

If the round did not land, say so plainly and say why. **A round that reports
"no change landed, here is what I found" is a successful round.** A round that
lands a padded commit to have something to show is not.
