# DSA Prep — Progress Tracker

> **Read this file first at the start of every session.** It tells you (Claude) and the student exactly where things stand. Update it at the END of every session — tick what was completed, update "Current Status", set "Next Up", append to the Session Log.

**Student profile:** SDE2, 2.5–3 YOE. Language: **Java**. Already has a decent DSA base — this is a *mastery + interview-readiness* program, not a from-zero course. Target: Google + top product companies (Amazon, Microsoft, Meta, Atlassian, Uber, Flipkart, Rubrik, Salesforce…).

**Horizon:** 12 weeks (~2.5–3 months). Date-anchored plan **starting 2026-08-09**, but progress is checklist-driven — if a week slips, shift the plan, don't skip the checklist.

**Companion files**
- Full syllabus & technique inventory → [01_CURRICULUM.md](01_CURRICULUM.md)
- How we attack any problem in an interview → [02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md)
- **The 476-question list with per-question status** → [03_QUESTION_TRACKER.md](03_QUESTION_TRACKER.md)
- Pattern → trigger → template cheat sheet → [04_PATTERN_CHEATSHEET.md](04_PATTERN_CHEATSHEET.md)
- Revision/spaced-repetition queue → [05_REVISION_QUEUE.md](05_REVISION_QUEUE.md)
- Mock schedule, rubric & debriefs → [mocks/MOCK_LOG.md](mocks/MOCK_LOG.md)
- Per-problem solution scaffold (copy this for every problem) → [templates/SolutionTemplate.java](templates/SolutionTemplate.java)

---

## Current Status

- **Phase:** Phase 0 — In progress
- **Week:** Week 1 (Aug 09–15)
- **Last session:** 2026-08-09 — Complexity analysis at interview depth: amortized analysis (ArrayList doubling, DSU with path compression + union by rank), recurrence solving via recursion-tree counting, recursion stack space, and how to state complexity out loud.
- **Next up:** Phase 0 → self-test recall on complexity analysis, then Java DSA toolkit drill (collections, comparators, pitfalls), then Week 1 = Arrays / Prefix Sum / Two Pointers.
- **Questions solved:** 0 / 476
- **Hours logged:** 5h tracked (see Session Log)

---

## Scoreboard

| Metric | Target | Current |
|---|---|---|
| Total questions solved | 476 (min. bar = the 352 **CORE** questions) | 0 |
| Solved **cold** (no hint, ≤ target time) | 250+ | 0 |
| Topics closed out (all CORE done + notes written) | 20 / 20 | 0 |
| Timed mocks completed | 10 | 0 |
| Revision passes on flagged problems | 3 full passes | 0 |
| Hours invested (with Claude) | ~180–220h over 12 weeks at planned pace | 4h |

**Actual mix in the list:** 81 Easy (17%) / 302 Medium (63%) / 93 Hard (20%) — the right shape for a Google-and-below loop, where mediums-with-a-twist dominate and hards cluster in graphs, DP and intervals.

---

## Phase 0 — Foundations & Toolkit (Week 1, ~3 sessions — do NOT skip even with a good base)

- [~] **Complexity at interview depth** — amortized analysis (dynamic array, DSU), recurrence solving (Master theorem cases you actually need), space complexity of recursion (stack depth), and *how to state complexity out loud* without hand-waving. _(taught; recall check answered directly rather than self-tested — revisit before Mock 1)_
- [ ] **Java DSA toolkit drill** — the API you must never fumble under pressure:
  - [ ] `ArrayList`, `ArrayDeque` (as both stack and queue — and why never `Stack`/`LinkedList`), `PriorityQueue` (+ custom `Comparator`, and the `poll()` order gotcha)
  - [ ] `HashMap` idioms: `getOrDefault`, `merge`, `computeIfAbsent`, `entrySet` iteration; `LinkedHashMap` for LRU; `TreeMap`/`TreeSet` (`floorKey`, `ceilingKey`, `higherKey`, `subMap`) — the single most under-used interview tool
  - [ ] `Arrays.sort` vs `Collections.sort` (dual-pivot quicksort on primitives = O(n²) adversarial; boxing to sort stably), `Arrays.fill`, `Arrays.copyOfRange`, `System.arraycopy`
  - [ ] `StringBuilder` (and why `String +=` in a loop is O(n²)), `char[]` conversions, `s.charAt(i) - 'a'` bucketing
  - [ ] Integer overflow traps: `(lo + hi) / 2` → `lo + (hi - lo) / 2`, `Integer.MIN_VALUE` negation, `long` promotion
  - [ ] `Comparator.comparingInt(...).thenComparing(...)`, and the subtraction-overflow bug in comparators
- [ ] **Recursion re-grounding** — writing the recurrence first, base case discipline, "trust the recursion" framing, converting recursion → iteration with an explicit stack.
- [ ] **The problem-solving framework** ([02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md)) — walked through end-to-end on one toy problem out loud.
- [ ] **Set up the solving loop** — `solutions/` file naming, how a session runs, when a problem is "done" (see rules below).

---

## Phase 1 — Linear Structures & Core Patterns (Weeks 2–4)

Topic is "closed" only when: all **[CORE]** questions solved + notes file written + you can state the pattern trigger from memory.

- [ ] **T01 Arrays & Prefix/Suffix** (30 q) — prefix sums, 2D prefix, difference array, Kadane, Dutch-flag, cyclic sort, in-place index-marking, rotation
- [ ] **T02 Two Pointers & Sliding Window** (32 q) — opposite/same-direction pointers, fast-slow, variable & fixed window, "at most K → exactly K" trick, monotonic deque window
- [ ] **T03 Hashing & Frequency** (20 q) — map-as-index, prefix-sum + map, anagram signatures, hashing a state, custom key design
- [ ] **T04 Strings** (24 q) — palindromes (expand-around-center + Manacher awareness), KMP/Z-function/rolling hash, parsing, string DP entry points
- [ ] **T05 Binary Search** (28 q) — on index, on answer (predicate monotonicity), rotated arrays, first/last occurrence template discipline, real-valued search
- [ ] **T06 Stack & Monotonic Stack** (26 q) — next greater/smaller, histogram, span, expression parsing, min-stack, stack-simulated recursion
- [ ] **T07 Linked List** (22 q) — dummy-head discipline, reversal (iterative/k-group), cycle detection & entry point, merge/sort, deep copy with random ptr
- [ ] **T08 Intervals** (14 q) — sort-by-start merge, sweep line, chronological ordering with two sorted arrays, heap-of-ends
- [ ] **Checkpoint mock #1** — 2 problems, 45 min, cold (see Phase 5 rules)

## Phase 2 — Trees, Heaps & Search (Weeks 5–6)

- [ ] **T09 Binary Trees** (34 q) — traversals (rec + iterative + Morris awareness), "return-value vs global" DFS design, LCA family, path problems, serialize, views/levels, tree DP
- [ ] **T10 BST** (16 q) — inorder-is-sorted exploitation, validate, kth smallest, successor/predecessor, insert/delete, build from traversal
- [ ] **T11 Heap / Priority Queue** (22 q) — top-K family, two-heaps (median), k-way merge, scheduling by deadline/frequency, heap vs sorting vs quickselect trade-off
- [ ] **T12 Tries** (12 q) — insert/search, prefix counting, word-search-II (trie + DFS pruning), XOR-maximization trie, bitwise trie
- [ ] **Checkpoint mock #2** — 2 problems, 45 min, cold

## Phase 3 — Recursion, Backtracking, Greedy & Graphs (Weeks 7–9)

- [ ] **T13 Recursion & Backtracking** (26 q) — subsets/permutations/combinations canon, duplicate-handling rule, pruning, board problems (N-Queens, Sudoku), decision-tree complexity analysis
- [ ] **T14 Greedy** (20 q) — exchange-argument proof habit, interval scheduling, sorting-key discovery, greedy + heap combos, when greedy *fails* → DP
- [ ] **T15 Graphs — Traversal & Structure** (26 q) — adjacency modeling, BFS/DFS/multi-source BFS, grid-as-graph, cycle detection (directed vs undirected), topological sort (Kahn + DFS), bipartite, connected components, clone/build graphs
- [ ] **T16 Graphs — Weighted & Advanced** (18 q) — Dijkstra (+ modified state), 0-1 BFS, Bellman-Ford, Floyd-Warshall, MST (Kruskal/Prim), bidirectional BFS, Union-Find with path compression + rank, Eulerian path, Tarjan bridges/articulation (awareness-level for Google)
- [ ] **Checkpoint mock #3** — graph-heavy, 45 min, cold

## Phase 4 — Dynamic Programming & The Rest (Weeks 10–11)

- [ ] **T17 Dynamic Programming** (58 q) — the big one, taught as *categories*, not as 58 unrelated problems:
  - [ ] 1-D / linear (house robber, decode ways, jump game)
  - [ ] Knapsack family (0/1, unbounded, subset-sum, partition, coin change)
  - [ ] Grid / 2-D paths
  - [ ] Strings (LCS, edit distance, palindromic substrings/subsequences, wildcard & regex matching)
  - [ ] LIS family (+ patience sorting / binary-search O(n log n))
  - [ ] Interval / MCM (burst balloons, matrix chain, stone games)
  - [ ] Tree DP & DP on graphs (DAG longest path)
  - [ ] Bitmask DP (TSP, assignment)
  - [ ] Digit DP + State-machine DP (stock series) — Google flavor
  - [ ] Memo → tabulation → space-optimized, done as a mechanical drill on 10+ problems
- [ ] **T18 Bit Manipulation** (16 q) — XOR tricks, lowbit, subset enumeration, bit DP entry, single-number family
- [ ] **T19 Math & Number Theory** (14 q) — GCD/LCM, sieve, modular arithmetic & fast power, combinatorics, randomized (reservoir sampling, Fisher-Yates), geometry basics
- [ ] **T20 Design & Advanced Structures** (18 q) — LRU/LFU, iterator design, rate limiter, Segment Tree / Fenwick (BIT), sqrt decomposition (awareness), skyline, ordered-set problems
- [ ] **Checkpoint mock #4** — DP-heavy, 45 min, cold

## Phase 5 — Interview Simulation & Consolidation (Week 12)

- [ ] **Mock 5** — Google-style 45 min, 1 hard problem + follow-up variant
- [ ] **Mock 6** — Amazon/Microsoft-style 2 mediums, 45 min
- [ ] **Mock 7** — Meta-style speed round: 2 problems in 35 min, optimal-on-first-try expected
- [ ] **Mock 8** — cold hard problem, thinking out loud graded, no hints for 10 min
- [ ] **Mock 9** — mixed bag, weakest-3-topics targeted
- [ ] **Mock 10** — full-length final dry run
- [ ] Full revision pass over every **flagged** problem in [05_REVISION_QUEUE.md](05_REVISION_QUEUE.md)
- [ ] Rewrite [04_PATTERN_CHEATSHEET.md](04_PATTERN_CHEATSHEET.md) **from memory** — gaps found here are your actual gaps
- [ ] Company-specific final sweep (see 03 tracker's `Company` column: filter G / A / M / F)

---

## Week-by-week map (start 2026-08-09)

| Week | Dates | Focus | Question target | Deliverable |
|---|---|---|---|---|
| 1 | Aug 09–15 | Phase 0 toolkit + T01 Arrays | 30 | notes/00_java_toolkit.md, notes/01_arrays.md |
| 2 | Aug 16–22 | T02 Two Pointers/Sliding Window + T03 Hashing | 52 | notes/02, notes/03 |
| 3 | Aug 23–29 | T04 Strings + T05 Binary Search | 52 | notes/04, notes/05 |
| 4 | Aug 30–Sep 05 | T06 Stack + T07 Linked List + T08 Intervals | 62 | notes/06–08 + **Mock 1** |
| 5 | Sep 06–12 | T09 Binary Trees | 34 | notes/09 |
| 6 | Sep 13–19 | T10 BST + T11 Heap + T12 Trie | 50 | notes/10–12 + **Mock 2** |
| 7 | Sep 20–26 | T13 Backtracking + T14 Greedy | 46 | notes/13, notes/14 |
| 8 | Sep 27–Oct 03 | T15 Graphs traversal | 26 | notes/15 |
| 9 | Oct 04–10 | T16 Graphs weighted/advanced | 18 | notes/16 + **Mock 3** |
| 10 | Oct 11–17 | T17 DP part 1 (linear, knapsack, grid, strings) | 32 | notes/17a |
| 11 | Oct 18–24 | T17 DP part 2 (LIS, interval, tree, bitmask, digit) + T18 Bits | 42 | notes/17b, notes/18 + **Mock 4** |
| 12 | Oct 25–31 | T19 Math + T20 Design/Advanced + Mocks 5–10 + revision | 32 | Final cheat sheet from memory |

Weekly load ≈ **35–45 questions** at ~30–40 min average → roughly **15–18 hrs/week**. If that's too heavy, cut the **[STRETCH]** questions first, never the **[CORE]** ones.

---

## Rules of engagement (how a session runs)

1. **I teach the pattern first** — the trigger ("when do I reach for this?"), the invariant, the canonical template, and the 2–3 ways it gets disguised. Java-first, interview-framed.
2. **You solve** — problems from [03_QUESTION_TRACKER.md](03_QUESTION_TRACKER.md), written yourself in `solutions/`. Brute force stated out loud first, *then* optimize — this is the interview skill, not a formality.
3. **I review like an interviewer** — correctness on edge cases, complexity claims, naming, whether a cleaner pattern existed, and what follow-up I'd ask next. We iterate until it's interview-clean.
4. **We log it** — tick the question in the tracker, update this file (including Phase tag + hours spent this session, self-reported at wrap-up), and any reusable insight goes into `notes/`.

**A problem counts as DONE only when:** you solved it without looking at the editorial, you can state time & space complexity correctly, and you can explain *why* the pattern applies. Peeked at a hint? Mark `[~]` and add it to [05_REVISION_QUEUE.md](05_REVISION_QUEUE.md).

**Timeboxing (non-negotiable — this is where most people waste months):**
- Easy: 15 min → then look at *approach* hint only
- Medium: 30 min → hint at 30, full solution at 45
- Hard: 45 min → hint at 45, full solution at 60
- Any problem you needed the solution for → re-solve from scratch 3 days later, then 10 days later, then 30 days later.

**Status legend used everywhere:** `[ ]` not started · `[~]` solved with help / needs revisit · `[x]` solved cold · `[★]` mastered (re-solved cold on revision pass)

---

## Session Log
_(Append one entry per session — date, phase, hours spent working with Claude this session, what we covered, questions solved, what needs follow-up. Hours are self-reported at session end — round to the nearest quarter hour.)_

| Date | Phase | Hours | Covered | Questions | Notes / Follow-up |
|------|-------|-------|---------|-----------|--------------------|
| 2026-08-09 | Setup | — *(untracked)* | Program setup: curriculum, 12-week phase plan, 476-question tracker across 20 topics, 9-step problem-solving framework, pattern cheat sheet scaffold, revision queue. | 0 | Start Phase 0 next session: complexity depth + Java toolkit drill. Don't skip it — the toolkit fumbles are what cost time in real rounds. |
| 2026-08-09 | Setup | 4h | Built the live progress site (InterviewPrepHub): parses both trackers directly, deployed to GitHub Pages. Added Phase + Hours columns to both Session Logs. Published full curriculum, all 476 questions, LLD phase items, the pattern cheat sheet, a new Java toolkit reference sheet, and lesson notes onto the site itself. | 0 | Tracking starts from the next real study session — tell Claude the hours at wrap-up and it gets logged here. |
| 2026-08-09 | Phase 0 | 1h | Taught complexity analysis at interview depth: amortized analysis (`ArrayList` doubling, DSU with path compression + union by rank ≈ O(α(n))), recurrence solving via recursion-tree counting (merge sort O(n log n), subset enumeration T(n)=2T(n-1)+O(1) → O(2ⁿ)), recursion stack space (skewed tree O(n) vs balanced O(log n) DFS), and how to phrase complexity claims out loud. | 0 | Gave a 3-question recall check but answered it directly instead of self-testing — revisit before Mock 1: (1) DSU total time phrasing, (2) subset-enumeration recurrence, (3) skewed-tree DFS stack space. Next: Java toolkit drill. |

**Total hours logged:** 5h
