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

`--brief` picks the target for you: the **lowest current score**, because the
normalized reward is `ΔVTS / (base/100)` — +5 on a 46-point game is worth twice
what +5 on a 92-point game is worth. Lift the floor.

**One game is deliberately withheld from selection at a time.** A game whose
latest landed round has no verdict yet is *skipped*, and `--brief` says so
(`waiting on a verdict before re-choosing: <game>`) while naming the next-lowest
game as the target. The reason is that an unjudged round leaves the game sitting
on the number it had before the round, so re-choosing it would redo the work just
done and call it a fresh target — the loop improving one game forever, each pass
reporting progress. So: when you see that line, **record the outstanding verdict
before starting anything new**, then let the next `--brief` re-rank. Do not
"fix" the driver to re-select the skipped game — skipping is the fix. (Only if
*every* scored game is unjudged does it fall back to the floor rather than stall.)

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

## Step 5 — record it

The brief reads a memory that only this step writes. Step 0 opens `.wolf/cerebrum.md` for its
Do-Not-Repeat list, Step 3's hand-off feeds the next `--brief`, and `--brief` re-ranks off the
driver's ledger — so a round that skips this leaves the next round reading a file that stopped
describing reality several rounds ago. None of `.wolf/` is tracked by git (`git status` does not
list a byte of it), which is exactly why it rots unnoticed.

Do this once the commit exists, so the sha is real, and fold the verdict into the same row when
the judge returns:

- **`.wolf/STATUS.md`** — prepend this round's paragraph to the header line and push the previous
  header into its `(Earlier: …)` tail; add the round's bullet as the newest entry under `## ✅ Done`.
- **`.wolf/memory.md`** — one row: `| HH:MM | what | files | outcome | ~tokens |`.
- **`.wolf/buglog.json`** — every defect found or fixed, through `scripts/buglog.mjs` (`add`,
  `close`, `declare-legacy`), never a hand-edit.
- **`.wolf/cerebrum.md`** — anything a later round would otherwise pay to rediscover.

**Write them through `scripts/wolf-file.mjs`.** Not for convenience — these files have already been
damaged three times by throwaway scripts (wall 7), and it is the only path here that refuses the
damage instead of reporting it afterwards. A write a shell one-liner can do is a write a shell
one-liner can get wrong.

None of it belongs in the commit. `.wolf/` is untracked and stays untracked: the round's diff is
the target's files and nothing else.

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
7. **The bookkeeping writes are the dangerous part, and they have no undo.**
   `.wolf/` is untracked — `git status` lists none of it, so a bad write there is
   recoverable only from the session transcript. Write those files through
   `scripts/wolf-file.mjs`, and it will stop you the way it was built to: it
   refuses to replace a line unless you state that line's current length (on this
   repo the `Last updated` header is an accumulating stack of every previous
   round's header, and one round replaced 11,856 characters with 347), it refuses
   an anchor that does not match exactly once, and it refuses to leave lone LF in a
   file that had none. All three accidents have already happened here.
8. **A checker whose instruction its own tool cannot follow stays red.** When
   `scripts/buglog.mjs check` says "allocate it with `buglog.mjs add`", that advice
   is about entries that do not exist yet — there is no path to repair a timestamp
   on one that does, so the error can only be cleared by the hand-edit the tool
   exists to prevent. Route the write through the tool, and if the tool cannot do
   it, that is the bug to log.

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
