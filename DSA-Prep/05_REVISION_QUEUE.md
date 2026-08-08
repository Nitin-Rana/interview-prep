# Revision Queue — Spaced Repetition

**Why this file exists:** exposure ≠ recall. A problem you needed a hint for is a problem you will fail in an interview two months later. This queue is how the 476 questions actually stick.

## The rule

Every problem marked `[~]` in [03_QUESTION_TRACKER.md](03_QUESTION_TRACKER.md) (needed a hint, took over the timebox, or had a bug you didn't catch yourself) gets a row here, with three re-solve dates:

- **R1 = +3 days** — re-solve from scratch, no notes.
- **R2 = +10 days** — re-solve from scratch, no notes.
- **R3 = +30 days** — re-solve from scratch, no notes.

Pass all three cold → promote to `[★]` in the tracker and delete the row here. Fail any one → reset the clock: that date becomes the new R1.

**Budget:** ~20% of each week's time on revision. In practice that's the first 30–45 minutes of each session — revision *before* new problems, always, because tired-brain revision is worthless.

**Cheap version if you're short on time:** don't re-code the whole thing — write only the *core loop or recurrence* from memory (5 min) and check it. That's 80% of the retention benefit at 20% of the cost. Full re-solve is reserved for problems you've failed twice.

---

## Active queue

| Problem | Topic | Why flagged (the specific gap) | Failed on | R1 (+3d) | R2 (+10d) | R3 (+30d) | Status |
|---|---|---|---|---|---|---|---|
| _example: Burst Balloons_ | T17f | _thought "which balloon first" instead of "which last"_ | 2026-10-20 | ☐ | ☐ | ☐ | active |

---

## Graduated `[★]` (re-solved cold three times)

| Problem | Topic | Graduated on |
|---|---|---|

---

## Recurring mistake log

The highest-value page in this whole folder. Every time a bug or a wrong turn repeats, add a tally — patterns here tell you what to drill, and they're usually 3–4 things, not thirty.

| Mistake | Tally | Fix / drill |
|---|---|---|
| _e.g. off-by-one in binary search bounds_ | | _re-derive the lower-bound template before each BS problem_ |
| _e.g. forgot to handle the empty/single-element input_ | | _list edge cases in step 1, before coding_ |
| _e.g. claimed O(n) when the inner loop made it O(n log n)_ | | _state complexity as states × transition, out loud_ |
