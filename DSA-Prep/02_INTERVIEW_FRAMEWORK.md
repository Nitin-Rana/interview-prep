# The 9-Step DSA Interview Framework

Run this on **every** problem from Phase 1 onward, including ones you find easy. The goal is that under stress you fall back to a process instead of to panic. In a real 45-min round: steps 1–4 ≈ 8–10 min, steps 5–7 (coding) ≈ 20–25 min, steps 8–9 ≈ 5–8 min.

---

### 1. Restate & clarify (2–3 min — never skip)
Restate the problem in one sentence, then ask the questions that actually change the solution:
- **Input size?** (`n ≤ 10^5` vs `n ≤ 20` picks your algorithm for you — see the constraint table below)
- Duplicates allowed? Negative numbers? Empty input? Is it sorted?
- Can I mutate the input? Is extra space allowed?
- Is the input streaming, or fully in memory?
- What should I return for the degenerate case (empty / no answer)?

Jumping straight to code signals junior instinct even when the code is right.

### 2. Walk through an example by hand
Take the given example, and then **construct your own small edge case** (empty, single element, all-equal, all-negative). Working an example by hand is where you discover the pattern; skipping it is where you discover it 20 minutes later.

### 3. State the brute force + its complexity
Out loud, always: *"The brute force is to check all pairs, O(n²) time and O(1) space."* This does three things: gives you a correct baseline, buys thinking time, and shows the interviewer your reasoning is grounded. **Never** start with the optimal solution you happen to remember — narrate the path to it.

### 4. Find the bottleneck → pick the pattern
Ask: *what is the brute force wasting?* The answer names the tool:
| Brute force waste | The fix |
|---|---|
| Re-scanning for "have I seen this?" | HashMap / HashSet |
| Re-summing a subarray | Prefix sums |
| Re-searching a sorted space | Binary search |
| Recomputing the same subproblem | Memoization → DP |
| Re-finding the min/max of a changing set | Heap |
| Recomputing next-greater for each element | Monotonic stack |
| Re-scanning a window on each shift | Sliding window |
| Repeatedly asking "same group?" | Union-Find |
| Re-walking the same prefix of strings | Trie |

Say the trigger out loud: *"'minimize the maximum' plus a monotonic feasibility check → binary search on the answer."*

### 5. Sanity-check against the constraints
| n | Acceptable complexity | Likely technique |
|---|---|---|
| ≤ 12 | O(n!) | permutations / brute-force backtracking |
| ≤ 20–25 | O(2ⁿ), O(2ⁿ·n) | subsets, **bitmask DP** |
| ≤ 100–500 | O(n³) | interval/MCM DP, Floyd–Warshall |
| ≤ 1,000–5,000 | O(n²) | 2-D DP, pairwise scans |
| ≤ 10⁵–10⁶ | O(n log n) | sorting, heap, binary search, Dijkstra |
| ≤ 10⁷–10⁸ | O(n) / O(log n) | two pointers, greedy, math, hashing |

If your idea's complexity doesn't fit the constraints, it's the wrong idea — say so and keep going rather than coding it.

### 6. Explain the approach **before** coding, and get buy-in
Describe the algorithm in 3–5 sentences, state the final time and space complexity, then ask *"does that sound reasonable to code up?"* Interviewers will course-correct you here — for free. Coding a wrong approach in silence for 15 minutes is the most common way to fail a round you could have passed.

### 7. Code it — clean, narrated, with named helpers
- Meaningful names (`left`/`right`, not `i`/`j`, when it aids reading), helper methods for distinct steps.
- Handle the edge cases you listed in step 1 up front.
- Narrate while typing — silence reads as being stuck.
- **Watch the Java traps:** `lo + (hi - lo) / 2`; `StringBuilder` not `+=` in a loop; `ArrayDeque` not `Stack`; comparator subtraction overflow; `equals` not `==` for boxed `Integer` > 127; mutating a collection while iterating.

### 8. Dry-run your own code before saying "done"
Trace it line-by-line on a small input and on one edge case, out loud, pointing at variables. Finding your own bug is a strong positive signal; having the interviewer find it is a negative one. Then restate the final complexity — including recursion stack space.

### 9. Discuss follow-ups & trade-offs
Proactively raise one: *"If the input were streaming, I'd use a heap instead."* Common follow-up axes to be ready for: reduce space to O(1) · handle duplicates · what if the data doesn't fit in memory · what if it's called repeatedly (precompute/cache) · parallelize it · return the actual path/answer rather than just the count.

---

## When you're stuck (the 5-minute unstick protocol)

1. **Re-read the constraints** — they usually name the technique (see the table in step 5).
2. **Solve a smaller version** — n=1, n=2, n=3. Look for the recurrence.
3. **Try sorting.** A surprising fraction of problems dissolve once sorted — the real question is often "sort by what?"
4. **Run the pattern checklist**: two pointers · sliding window · binary search on the answer · hashmap · prefix sum · monotonic stack · heap · graph/BFS · DP · greedy · trie · union-find. Ask "could this be X?" for each.
5. **Reframe the object**: is this a graph in disguise (states = nodes, moves = edges)? Is it an interval problem? Can I solve the *reverse* problem, or the complement?
6. **Say what you're thinking.** "I'm considering a heap because I need the running minimum, but I'm unsure how to handle deletions" invites a hint without asking for one. Silence gets no help.

---

## Common failure modes to self-check against

- **Coding before the approach is settled** → mid-interview refactor, visibly panicked.
- **Not asking clarifying questions** → reads as junior even when the answer is right.
- **Jumping to the memorized optimal** → interviewer suspects recall, not reasoning; probes harder, and you have nowhere to go.
- **Hand-wavy complexity** ("it's like O(n)-ish") → at Google this alone can sink the round. Count states × transition cost.
- **Ignoring edge cases** — empty input, single element, all duplicates, integer overflow, negative numbers.
- **Declaring done without testing** — always dry-run first.
- **Going silent when stuck** — narrate the search, not just the answer.
- **Not managing the clock** — if you're 25 min in with no working code, ship the brute force and *say* you'd optimize with X. A working suboptimal solution beats an incomplete optimal one.

---

## Post-problem debrief (do this after every solved problem — this is where learning compounds)

Answer in one line each, in the solution file's header comment:
1. What was the **trigger** that should have told me the pattern?
2. What did I get wrong or waste time on?
3. What's the **one-line takeaway** I'd want to see 3 weeks from now?
4. Flag it: solved cold `[x]` / needed a hint `[~]` → if `[~]`, add it to [05_REVISION_QUEUE.md](05_REVISION_QUEUE.md).
