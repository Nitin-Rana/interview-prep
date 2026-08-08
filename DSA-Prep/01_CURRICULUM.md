# DSA Curriculum — Full Syllabus & Technique Inventory

Goal: take an engineer who already *knows* DSA to someone who **cannot be surprised** in a Google/top-product-company algorithms round — meaning: recognizes the pattern within 3–5 minutes, states brute force → optimal with correct complexity, writes bug-free Java in ~20 minutes, handles the follow-up variant, and can prove why the approach is correct.

This file is the **reference syllabus** (what and why). The live checklist is [00_PROGRESS_TRACKER.md](00_PROGRESS_TRACKER.md); the per-question list is [03_QUESTION_TRACKER.md](03_QUESTION_TRACKER.md). Always update those two — this one rarely changes.

---

## The philosophy: patterns, not problems

476 problems solved as 476 unrelated puzzles is mostly wasted effort. The same ~35 techniques generate essentially every interview question. So every topic below is taught as:

**Trigger** (what in the problem statement tells you to use this) → **Invariant** (what stays true, which is *why* it's correct) → **Template** (the Java skeleton you own cold) → **Disguises** (3+ ways interviewers hide it) → **Complexity** (and the trade-off against the alternative approach).

You should end the program able to say, for any problem: *"the constraint n ≤ 20 plus 'choose a subset' means bitmask DP"*, or *"'minimum largest X' means binary search on the answer"* — before writing any code.

### Why 476 and not 150
- **352 [CORE]** = the non-negotiable spine. These cover every pattern and are the minimum bar to be interview-ready.
- **124 [STRETCH]** = harder variants and Google-flavored twists. These are what separate "passes the phone screen" from "clears the onsite loop at a bar-raising company."

If time collapses, the priority order is: CORE → mocks → revision passes → STRETCH. Never sacrifice revision for new problems; recall beats exposure.

---

## How each session works (teacher/student loop)

1. **I teach** the pattern — trigger, invariant, template, disguises. Concrete, Java-first, interview-framed (not academic).
2. **You solve** the assigned problems yourself in `solutions/`. Rule: state the brute force and its complexity *out loud/in comments* before optimizing.
3. **I review like an interviewer** — I attack edge cases, question your complexity claim, ask "why is this correct?", propose the follow-up variant, and point out where a cleaner pattern existed.
4. **We log it** — tracker ticked, session log updated, reusable insight into `notes/`, anything shaky into `05_REVISION_QUEUE.md`.

For problems from Phase 3 onward the loop tightens to mirror a real round:
1. I give the problem cold, with constraints, and start a timer.
2. You ask clarifying questions (input range? duplicates? sorted? can I mutate the input? memory limit?).
3. You state brute force + complexity, then walk me through the optimization *before* coding.
4. You code it, narrating.
5. I dry-run your code on an adversarial input, then ask the follow-up ("what if the array is streaming?", "what if it doesn't fit in memory?", "make it O(1) space").

---

## Phase 0 — Foundations & Java Toolkit

**Why first, even with a good base:** at SDE2+, points are lost on *execution* — an off-by-one in a binary search, a `PriorityQueue` comparator that overflows, `String` concatenation in a loop turning O(n) into O(n²). This phase removes those.

- **Complexity at interview depth** — amortized (dynamic array growth, DSU near-O(1)), recursion stack space, recurrence intuition, and *how to state complexity out loud* precisely ("O(n log n) time from the sort, O(n) auxiliary space from the map").
- **Java toolkit** — `ArrayDeque` over `Stack`/`LinkedList`, `PriorityQueue` + comparators, the `TreeMap`/`TreeSet` navigation API (`floorKey`/`ceilingKey`/`higherEntry`/`subMap` — massively under-used and it solves whole classes of problems), `HashMap.merge`/`computeIfAbsent`, `StringBuilder`, overflow-safe midpoint, `Comparator` composition.
- **Recursion re-grounding** — recurrence first, base case discipline, converting recursion to an explicit stack.
- **The framework** — [02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md), applied end-to-end once.

---

## Phase 1 — Linear Structures & Core Patterns

### T01 Arrays & Prefix/Suffix
Prefix sums (1-D and 2-D), difference arrays for range updates, suffix/prefix product, Kadane's (and its "why greedy works here" argument), Dutch national flag, cyclic sort for `1..n` values, index-as-hashmap / sign-marking for O(1) space, in-place rotation via reversal, quickselect.
*Google angle:* they love the O(1)-extra-space variant. Expect "now do it without the auxiliary array."

### T02 Two Pointers & Sliding Window
Opposite-direction (sorted pair sums, container-with-water, trapping rain water), same-direction (dedup in place, remove element), fast/slow (cycle, middle), fixed-size window, **variable window with a shrink condition**, the "**at most K** minus **at most K-1** = exactly K" transform, monotonic-deque window for min/max.
*Invariant discipline:* every window problem is "what must be true of the window; shrink until it is."

### T03 Hashing & Frequency
Map as index lookup, **prefix-sum + hashmap** (the single highest-yield combo in interviews: subarray sum = k, divisible by k, equal 0/1s), frequency maps, anagram signature design, hashing a canonical state (sorted string, count-vector, coordinate tuple), designing a good composite key, `HashSet` for O(1) membership in graph/array problems.

### T04 Strings
Palindrome techniques (expand-around-center; Manacher at awareness level), pattern matching (KMP failure function, Z-algorithm, Rabin-Karp rolling hash), parsing & tokenizing (calculators, expression evaluation), in-place char manipulation, string DP entry points, encode/decode.

### T05 Binary Search
Two templates you own cold: **first-true (lower bound)** and **last-true**. Then: search in rotated array (with and without duplicates), find peak, search a 2-D matrix, **binary search on the answer** (min/max feasible value under a monotonic predicate — ship capacity, split array, koko bananas, minimize max distance), real-valued binary search, binary search on a function/index space rather than an array.
*This is the pattern most often disguised.* Trigger words: "minimize the maximum", "maximum minimum", "smallest k such that…".

### T06 Stack & Monotonic Stack
Matching/validity, expression evaluation & parsing, min-stack, **monotonic increasing/decreasing stack** for next-greater / previous-smaller / span / histogram / rain-water / stock span / sum-of-subarray-minimums, and using a stack to convert a recursive traversal to iterative.

### T07 Linked List
Dummy-head discipline (removes 80% of edge cases), iterative reversal + reverse-in-k-groups, Floyd cycle detection *and* finding the entry node, merge sorted lists, merge-sort on a list, palindrome check in O(1) space, deep copy with random pointers, LRU's doubly-linked-list + map.

### T08 Intervals
Sort-by-start merge, insert-interval, non-overlapping/erase, **sweep line with delta events**, chronological ordering via two sorted arrays (start times / end times), min-rooms via heap-of-end-times, interval intersection of two lists, employee free time.

---

## Phase 2 — Trees, Heaps & Search

### T09 Binary Trees
All traversals recursively, iteratively, and level-order; the key design decision — **"what does my recursive function return, and what do I aggregate?"** (return-value DFS vs. mutating a field vs. passing state down); LCA family (plain, with parent pointers, BST, deepest-leaves); path problems (max path sum, path sum I/II/III, diameter — all the same "answer through node vs. answer returned upward" shape); serialize/deserialize; build from traversals; views (right/left/top/bottom), vertical order; tree DP (rob-the-house-on-a-tree, distribute coins); Morris traversal (awareness — the O(1)-space answer to a follow-up).

### T10 BST
The one insight everything derives from: **inorder traversal of a BST is sorted**. Validate BST (min/max bounds, not just local checks), kth smallest (+ the follow-up: what if it's modified often → augment with subtree sizes), successor/predecessor, insert/delete (delete is the one people fumble — practice it), build balanced BST from sorted array, recover a swapped BST, BST iterator with O(h) space.

### T11 Heap / Priority Queue
Top-K family (k largest, k frequent, k closest — and the heap-vs-quickselect-vs-sort trade-off, stated explicitly), **two heaps** for running median, k-way merge (merge k lists, smallest range, kth smallest in sorted matrix), scheduling problems (task scheduler, meeting rooms II, CPU scheduling by deadline), heap + greedy combos, `PriorityQueue` custom comparator mechanics in Java.

### T12 Tries
Insert/search/startsWith, prefix counting, autocomplete/search-suggestions, **Trie + DFS with pruning** (word search II — the classic that unlocks the pattern), word-break with a trie, **bitwise trie for maximum-XOR** problems, replace-words / longest common prefix.

---

## Phase 3 — Recursion, Backtracking, Greedy & Graphs

### T13 Recursion & Backtracking
The canon first (subsets, subsets-with-duplicates, permutations, permutations-with-duplicates, combinations, combination-sum I/II/III) because every other backtracking problem is one of these with a different constraint. Then: **the duplicate-handling rule** (sort + skip `i > start && a[i]==a[i-1]`), **pruning** (the actual skill — sort and break early), board problems (N-Queens, Sudoku, word search), partitioning (palindrome partitioning, matchsticks-to-square), expression building, and **how to state backtracking complexity** (branching^depth × work-per-node) without hand-waving.

### T14 Greedy
When greedy is legal: **exchange argument** and matroid intuition — you must be able to *justify* greedy, since "it passed the tests" is not an interview answer. Interval scheduling, the sorting-key discovery skill (the entire problem is often "sort by what?"), greedy + heap (task scheduling, IPO, reorganize string), jump game family, gas station, partition labels, candy, and **the counter-examples** — cases where greedy fails and DP is required, so you can tell them apart.

### T15 Graphs — Traversal & Structure
Modeling first (adjacency list vs. matrix vs. implicit grid vs. state-graph where a node is a tuple), BFS/DFS templates, **multi-source BFS** (rotting oranges, walls-and-gates, 01-matrix), grid-as-graph (islands, surrounded regions, flood fill, shortest bridge), BFS for shortest path in an *unweighted* graph, cycle detection (undirected via parent, directed via 3-color), **topological sort** (Kahn's + DFS-based, with cycle detection), course-schedule family, bipartite check, connected components & counting, clone graph, word ladder, and **implicit-graph problems** (open the lock, minimum genetic mutation) — the Google favorite, where recognizing "this is a graph" *is* the whole problem.

### T16 Graphs — Weighted & Advanced
Dijkstra (+ variants where the node is an augmented state: `(node, stops)`, `(node, fuel)`), **0-1 BFS with a deque**, Bellman-Ford & the k-stops constraint, Floyd-Warshall, MST (Kruskal with DSU, Prim with heap), **Union-Find with path compression + union by rank** (and its uses: accounts merge, redundant connection, number of provinces, DSU-on-sorted-edges tricks), bidirectional BFS, Euler path (reconstruct itinerary), Tarjan bridges/articulation points (awareness — comes up at Google for "critical connections").

---

## Phase 4 — Dynamic Programming & The Rest

### T17 Dynamic Programming
Taught as **categories with a shared method**, not as a pile of problems. For every problem we run the same drill:
1. Define the **state** in words before writing code ("dp[i][j] = the answer for the first i of A and first j of B").
2. Write the **recurrence** and the **base case**.
3. Code the **top-down memoized** version (easier to get right under pressure).
4. Convert to **bottom-up tabulation**.
5. **Space-optimize** (rolling rows / 1-D) — the standard interview follow-up.
6. State the complexity as `states × transition cost`.

Categories: 1-D linear · knapsack family (0/1, unbounded, subset-sum, partition-equal-subset, coin change I/II, target sum) · grid paths · string DP (LCS, edit distance, distinct subsequences, palindromic substrings/subsequences, wildcard & regex matching) · LIS family (n² and the n log n patience/binary-search version, plus its disguises: russian dolls, max envelopes, longest chain) · interval/MCM DP (burst balloons, matrix chain, stone game, remove boxes) · tree DP · DP on DAGs (longest path, cheapest flights) · bitmask DP (TSP, assignment, partition-to-k-subsets) · state-machine DP (best-time-to-buy-and-sell-stock as a *family*, with cooldown/fee/k-transactions) · digit DP (Google flavor).

**Recognizing DP:** optimal substructure + overlapping subproblems, "count the number of ways", "min/max cost to…", exponential brute force with repeated states. And the discriminator to practice: **greedy vs. DP** — why does the coin-change greedy fail?

### T18 Bit Manipulation
XOR properties (`a^a=0`, `a^0=a`, and why they solve single-number problems), `n & (n-1)` and `n & -n` (lowbit), mask/set/clear/toggle, **enumerating all subsets of a bitmask** (`for (int s = m; s > 0; s = (s-1) & m)`), counting bits with DP, bit tricks for swapping/sign, single-number I/II/III, and the bridge into bitmask DP.

### T19 Math & Number Theory
GCD/LCM & Euclid, sieve of Eratosthenes, prime factorization, modular arithmetic + fast exponentiation (`pow(a,b,mod)`), combinatorics (nCr with modular inverse, catalan intuition), overflow-safe arithmetic, randomized algorithms (Fisher–Yates shuffle, reservoir sampling, random-pick-with-weight — a real interview favorite), and basic computational geometry (convex hull awareness, points-on-a-line, rectangle overlap).

### T20 Design & Advanced Structures
Data-structure design problems (LRU, LFU, insert-delete-getRandom O(1), min-stack, hit counter, snapshot array, time-based key-value store, design Twitter, iterator design: flatten nested list / peeking iterator / zigzag), plus advanced structures that *do* appear at the top end: **Fenwick tree (BIT)** and **Segment tree** (range sum/min, lazy-propagation awareness) for count-of-smaller-numbers, range-sum-mutable, skyline; **ordered set** emulation in Java via `TreeMap`; sqrt decomposition (awareness).

---

## Phase 5 — Interview Simulation

Timed, cold, with me as the interviewer: I don't hint for the first 10 minutes, I question every complexity claim, I dry-run your code against an adversarial input, and I always ask the follow-up variant. Debrief after each covers: did you clarify constraints, was your brute-force→optimal narration clean, did you test before declaring done, and how you handled being stuck.

Company flavors we simulate (the `Company` column in [03_QUESTION_TRACKER.md](03_QUESTION_TRACKER.md) tags problems by where they're common):
- **Google (G)** — hardest bar. Novel problems, heavy on graphs/DP/intervals/design-an-algorithm; expects you to *prove* correctness and handle an open-ended follow-up.
- **Amazon (A)** — high-frequency medium set, BFS/heap/tree-heavy, plus behavioral weight (LP) around the coding.
- **Meta (F)** — speed and optimality on the first try; well-known mediums, 2 problems in ~35 min.
- **Microsoft (M)** — trees, linked lists, strings, clean code emphasis.
- **Others (U = Uber, At = Atlassian, etc.)** — mostly the standard medium canon plus a design-y problem.

---

## Reference material philosophy

We are not memorizing solutions. Every review ends with "what changes if the input is streaming / doesn't fit in memory / has duplicates / must be O(1) space?" — that adaptability is the thing actually being tested. A problem you can only reproduce from memory is a problem you haven't learned; that's why the revision queue exists and why the cheat sheet gets rewritten **from memory** in Week 12.
