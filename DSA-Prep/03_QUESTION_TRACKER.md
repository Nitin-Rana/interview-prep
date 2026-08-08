# DSA Question Tracker — 476 Problems

**Status legend:** `[ ]` not started · `[~]` solved with help / needs revisit · `[x]` solved cold · `[★]` mastered (re-solved cold on a later revision pass)

**Tier:** **C** = CORE (non-negotiable, 352 of these — this is the minimum interview-ready set) · **S** = STRETCH (harder/rarer, the top-company differentiator).

**Company tags:** `G` Google · `A` Amazon · `M` Microsoft · `F` Meta · `U` Uber · `At` Atlassian · `All` = asked essentially everywhere.

**How to use:** work a topic top-to-bottom — the ordering inside each table is deliberate (pattern-building first, variants after). Tick the box, and when a problem needed a hint, mark `[~]` and copy the row into [05_REVISION_QUEUE.md](05_REVISION_QUEUE.md). Timebox per [00_PROGRESS_TRACKER.md](00_PROGRESS_TRACKER.md) rules: E 15m / M 30m / H 45m.

**Progress:** 0 / 476 · CORE 0 / 352 · Hard 0 / 93

| Topic | Count | Done |
|---|---|---|
| T01 Arrays & Prefix Sum | 30 | 0 |
| T02 Two Pointers & Sliding Window | 32 | 0 |
| T03 Hashing & Frequency | 20 | 0 |
| T04 Strings | 24 | 0 |
| T05 Binary Search | 28 | 0 |
| T06 Stack & Monotonic Stack | 26 | 0 |
| T07 Linked List | 22 | 0 |
| T08 Intervals | 14 | 0 |
| T09 Binary Trees | 34 | 0 |
| T10 BST | 16 | 0 |
| T11 Heap / Priority Queue | 22 | 0 |
| T12 Trie | 12 | 0 |
| T13 Recursion & Backtracking | 26 | 0 |
| T14 Greedy | 20 | 0 |
| T15 Graphs — Traversal | 26 | 0 |
| T16 Graphs — Weighted & Advanced | 18 | 0 |
| T17 Dynamic Programming | 58 | 0 |
| T18 Bit Manipulation | 16 | 0 |
| T19 Math & Number Theory | 14 | 0 |
| T20 Design & Advanced Structures | 18 | 0 |
| **Total** | **476** | **0** |

---

## T01 — Arrays & Prefix/Suffix Sums (30)

> Master: prefix/suffix accumulation, 2-D prefix, difference arrays, Kadane, Dutch flag, cyclic sort, index-as-hash (O(1) space), in-place rotation, quickselect.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | E | C | running-min scan; the "one pass carrying state" mindset | All |
| 2 | [ ] | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | M | C | **Kadane** — and be able to argue *why* the greedy reset is correct | All |
| 3 | [ ] | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | M | C | Kadane variant: track min *and* max (negatives flip) | A M |
| 4 | [ ] | [Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/) | E | C | prefix sum, the primitive everything else builds on | All |
| 5 | [ ] | [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) | E | C | prefix + total-suffix in one pass | A |
| 6 | [ ] | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | M | C | prefix × suffix, no division, O(1) extra | All |
| 7 | [ ] | [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) | E | C | precompute-once design | M |
| 8 | [ ] | [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) | M | C | **2-D prefix sum** + inclusion–exclusion | G F |
| 9 | [ ] | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | M | C | prefix + hashmap — highest-yield combo in interviews | All |
| 10 | [ ] | [Contiguous Array](https://leetcode.com/problems/contiguous-array/) | M | C | map 0→-1, then it's #9 | F G |
| 11 | [ ] | [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) | M | C | prefix mod k + map | F |
| 12 | [ ] | [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) | M | C | negative-mod handling in Java (the real gotcha) | G |
| 13 | [ ] | [Move Zeroes](https://leetcode.com/problems/move-zeroes/) | E | C | stable in-place partition | F |
| 14 | [ ] | [Sort Colors](https://leetcode.com/problems/sort-colors/) | M | C | **Dutch national flag**, one pass | All |
| 15 | [ ] | [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | E | C | fill from the back — the trick worth owning | F M |
| 16 | [ ] | [Rotate Array](https://leetcode.com/problems/rotate-array/) | M | C | triple reversal, O(1) space | A M |
| 17 | [ ] | [Rotate Image](https://leetcode.com/problems/rotate-image/) | M | C | transpose + reflect, in place | All |
| 18 | [ ] | [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) | M | C | boundary-shrinking; pure edge-case discipline | All |
| 19 | [ ] | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) | M | C | use row 0/col 0 as the marker → O(1) space | All |
| 20 | [ ] | [Missing Number](https://leetcode.com/problems/missing-number/) | E | C | cyclic sort / XOR / sum formula — know all three | A |
| 21 | [ ] | [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) | E | C | **index-as-hash, sign marking** — O(1) space | A |
| 22 | [ ] | [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) | M | C | array-as-linked-list → Floyd cycle | G |
| 23 | [ ] | [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) | H | C | cyclic sort in place; classic "O(n) time, O(1) space" ask | G A |
| 24 | [ ] | [Next Permutation](https://leetcode.com/problems/next-permutation/) | M | C | the pivot→swap→reverse algorithm; memorize the shape | G F |
| 25 | [ ] | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | M | C | **quickselect** vs heap vs sort — state the trade-off | All |
| 26 | [ ] | [Majority Element](https://leetcode.com/problems/majority-element/) | E | C | Boyer–Moore voting | A |
| 27 | [ ] | [Majority Element II](https://leetcode.com/problems/majority-element-ii/) | M | S | generalized voting to ⌊n/3⌋ | G |
| 28 | [ ] | [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) | M | C | **difference array** for range updates | G |
| 29 | [ ] | [Car Pooling](https://leetcode.com/problems/car-pooling/) | M | C | difference array / sweep on a bounded axis | U |
| 30 | [ ] | [Max Sum of Rectangle No Larger Than K](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/) | H | S | 2-D → Kadane + TreeSet prefix search; a real Google-tier composite | G |

---

## T02 — Two Pointers & Sliding Window (32)

> Master: opposite-direction pointers, same-direction, fast/slow, fixed window, variable window with a shrink invariant, "at most K − at most K−1 = exactly K", monotonic deque.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | M | C | opposite pointers — the base template | All |
| 2 | [ ] | [3Sum](https://leetcode.com/problems/3sum/) | M | C | sort + fix one + two pointers; **duplicate skipping** | All |
| 3 | [ ] | [3Sum Closest](https://leetcode.com/problems/3sum-closest/) | M | C | same shape, track best delta | A |
| 4 | [ ] | [4Sum](https://leetcode.com/problems/4sum/) | M | S | generalizing k-sum recursively; overflow → use `long` | G |
| 5 | [ ] | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | M | C | greedy pointer move — be able to *prove* it | All |
| 6 | [ ] | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | H | C | two pointers with prefix-max invariant (also a monotonic-stack classic) | All |
| 7 | [ ] | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | E | C | same-direction write pointer | All |
| 8 | [ ] | [Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | M | C | generalize the write-pointer rule to k copies | F |
| 9 | [ ] | [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) | E | C | opposite pointers + character filtering | F |
| 10 | [ ] | [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) | E | C | one-skip branch; clean helper-function design | F |
| 11 | [ ] | [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/) | E | C | fill from the back with two pointers | A |
| 12 | [ ] | [Boats to Save People](https://leetcode.com/problems/boats-to-save-people/) | M | C | greedy two-pointer pairing | A |
| 13 | [ ] | [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) | E | C | fixed-size window template | All |
| 14 | [ ] | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | M | C | **variable window** + last-seen map; the canonical one | All |
| 15 | [ ] | [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) | M | C | window valid iff `len - maxFreq ≤ k`; the non-shrinking-window trick | G A |
| 16 | [ ] | [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) | M | C | "at most k zeros" window | G F |
| 17 | [ ] | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | M | C | shrink-while-valid (minimize) vs grow-while-valid (maximize) | A |
| 18 | [ ] | [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/) | M | C | "at most 2 distinct" — disguised window | G |
| 19 | [ ] | [Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | M | C | the generalized form of #18 | G F |
| 20 | [ ] | [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) | H | C | **exactly K = atMost(K) − atMost(K−1)** — learn this transform | G |
| 21 | [ ] | [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) | M | S | same atMost transform, sum flavor | G |
| 22 | [ ] | [Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/) | M | S | atMost transform again — until it's automatic | A |
| 23 | [ ] | [Permutation in String](https://leetcode.com/problems/permutation-in-string/) | M | C | fixed window + count-vector match | M |
| 24 | [ ] | [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | M | C | same as #23, collect all starts | All |
| 25 | [ ] | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | H | C | the hardest standard window; own the `have/need` counter | All |
| 26 | [ ] | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | H | C | **monotonic deque** — the answer to "window max in O(n)" | All |
| 27 | [ ] | [Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/) | M | C | window with one allowed violation | G |
| 28 | [ ] | [Minimum Operations to Reduce X to Zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/) | M | S | reframe: complement → longest middle window summing to total−x | G |
| 29 | [ ] | [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) | H | S | two heaps + lazy deletion (or `TreeSet` of indices) | G |
| 30 | [ ] | [Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | H | S | windowed by word length; nasty bookkeeping | A |
| 31 | [ ] | [Shortest Unsorted Continuous Subarray](https://leetcode.com/problems/shortest-unsorted-continuous-subarray/) | M | S | two-pass boundary scan with running max/min | G |
| 32 | [ ] | [Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) | M | C | ends → complement middle window | A |

---

## T03 — Hashing & Frequency (20)

> Master: map-as-index, canonical state hashing, frequency counting, composite keys, set-based O(1) membership.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Two Sum](https://leetcode.com/problems/two-sum/) | E | C | complement lookup — the origin of the whole idea | All |
| 2 | [ ] | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | E | C | set membership | All |
| 3 | [ ] | [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) | E | C | map of last index / window set | A |
| 4 | [ ] | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | E | C | count-vector signature | All |
| 5 | [ ] | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | M | C | **canonical key design** (sorted string vs count string) | All |
| 6 | [ ] | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | M | C | freq map + bucket sort (beats the heap — say so) | All |
| 7 | [ ] | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | M | C | set + only-start-from-sequence-heads → O(n) | G |
| 8 | [ ] | [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/) | E | C | multiset intersect; follow-up: what if sorted / on disk | F |
| 9 | [ ] | [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) | E | C | **bijection needs two maps** — the classic miss | M |
| 10 | [ ] | [Word Pattern](https://leetcode.com/problems/word-pattern/) | E | C | same bijection idea across types | M |
| 11 | [ ] | [Ransom Note](https://leetcode.com/problems/ransom-note/) | E | C | frequency subtraction | A |
| 12 | [ ] | [First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/) | E | C | count then scan | A M |
| 13 | [ ] | [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) | M | C | hashing vs. index-marking O(1) space | A |
| 14 | [ ] | [Number of Good Pairs](https://leetcode.com/problems/number-of-good-pairs/) | E | C | count pairs incrementally (n·(n−1)/2 reasoning) | All |
| 15 | [ ] | [Line Reflection / Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/) | H | S | hashing a normalized slope (gcd-reduced fraction key) | G |
| 16 | [ ] | [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/) | M | C | map + array with swap-to-end deletion | All |
| 17 | [ ] | [Longest Palindrome](https://leetcode.com/problems/longest-palindrome/) | E | C | parity counting | A |
| 18 | [ ] | [4Sum II](https://leetcode.com/problems/4sum-ii/) | M | C | **meet in the middle** with a map — O(n²) not O(n⁴) | G |
| 19 | [ ] | [Brick Wall](https://leetcode.com/problems/brick-wall/) | M | S | count edge positions — reframing "min crossings" as "max gaps" | G |
| 20 | [ ] | [Number of Boomerangs](https://leetcode.com/problems/number-of-boomerangs/) | M | S | hashing squared distances per anchor point | G |

---

## T04 — Strings (24)

> Master: palindrome expansion, pattern matching (KMP / Z / rolling hash), parsing & tokenizing, in-place char work.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Reverse String](https://leetcode.com/problems/reverse-string/) | E | C | in-place two pointers | All |
| 2 | [ ] | [Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) | M | C | in-place reverse-all-then-reverse-each (do it without `split`) | M |
| 3 | [ ] | [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) | E | C | vertical scan; trie as the follow-up | All |
| 4 | [ ] | [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | M | C | **expand around center** (2n−1 centers); Manacher as awareness | All |
| 5 | [ ] | [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) | M | C | same expansion, counting | All |
| 6 | [ ] | [Implement strStr()](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | E | C | naive → then implement **KMP** properly | G |
| 7 | [ ] | [Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/) | E | C | KMP failure-function insight (or the `(s+s)` trick) | G |
| 8 | [ ] | [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/) | H | S | KMP on `s + '#' + reverse(s)` | G |
| 9 | [ ] | [Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/) | M | C | **rolling hash** / bit-encoded window | G |
| 10 | [ ] | [String Compression](https://leetcode.com/problems/string-compression/) | M | C | in-place write pointer with run counting | A |
| 11 | [ ] | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | E | C | stack matching (bridges to T06) | All |
| 12 | [ ] | [Valid Number](https://leetcode.com/problems/valid-number/) | H | S | state-machine parsing — brutal edge cases, great practice | G F |
| 13 | [ ] | [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) | M | C | overflow-safe parsing; clarify spec before coding | A M |
| 14 | [ ] | [Multiply Strings](https://leetcode.com/problems/multiply-strings/) | M | C | digit-array grade-school multiplication | F |
| 15 | [ ] | [Add Binary](https://leetcode.com/problems/add-binary/) | E | C | carry loop discipline | F |
| 16 | [ ] | [Text Justification](https://leetcode.com/problems/text-justification/) | H | S | pure implementation stamina; Google asks this | G |
| 17 | [ ] | [Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/) | M | S | index-math simulation | A |
| 18 | [ ] | [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) | M | C | length-prefix framing — a real protocol-design question | G F |
| 19 | [ ] | [Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/) | M | S | normalized-difference key | G |
| 20 | [ ] | [Compare Version Numbers](https://leetcode.com/problems/compare-version-numbers/) | M | C | tokenized comparison, unequal lengths | M |
| 21 | [ ] | [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/) | M | C | stack-based precedence parsing | G |
| 22 | [ ] | [Decode String](https://leetcode.com/problems/decode-string/) | M | C | nested structure via two stacks or recursion | G |
| 23 | [ ] | [Word Break](https://leetcode.com/problems/word-break/) | M | C | string DP entry point (revisited in T17) | All |
| 24 | [ ] | [Minimum Window Subsequence](https://leetcode.com/problems/minimum-window-subsequence/) | H | S | two-pointer forward/backward sweep (≠ min window *substring*) | G |

---

## T05 — Binary Search (28)

> Master: lower-bound & upper-bound templates, rotated arrays, peak finding, 2-D search, **binary search on the answer**, real-valued search.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Binary Search](https://leetcode.com/problems/binary-search/) | E | C | own the exact template; no off-by-one, ever | All |
| 2 | [ ] | [Search Insert Position](https://leetcode.com/problems/search-insert-position/) | E | C | **lower bound** — the template you'll reuse most | All |
| 3 | [ ] | [First Bad Version](https://leetcode.com/problems/first-bad-version/) | E | C | first-true predicate form | F |
| 4 | [ ] | [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | M | C | lower + upper bound together | All |
| 5 | [ ] | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | M | C | identify the sorted half each step | All |
| 6 | [ ] | [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) | M | C | duplicates break the invariant → O(n) worst case; explain why | A |
| 7 | [ ] | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | M | C | compare mid against `hi`, not `lo` | All |
| 8 | [ ] | [Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/) | H | S | the `hi--` degenerate case | G |
| 9 | [ ] | [Find Peak Element](https://leetcode.com/problems/find-peak-element/) | M | C | binary search without a sorted array — the mind-opener | G F |
| 10 | [ ] | [Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) | M | C | same, cleaner | A |
| 11 | [ ] | [Find in Mountain Array](https://leetcode.com/problems/find-in-mountain-array/) | H | S | three binary searches + a call budget | G |
| 12 | [ ] | [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) | M | C | flatten index math | All |
| 13 | [ ] | [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) | M | C | staircase from the top-right — O(m+n) | A |
| 14 | [ ] | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | H | C | binary search on the **partition**; the hardest template to hold | G A |
| 15 | [ ] | [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) | M | C | binary search on value + count ≤ mid | G |
| 16 | [ ] | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | M | C | **binary search on the answer** — the canonical intro | G F |
| 17 | [ ] | [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) | M | C | same shape; "minimize the maximum" | A |
| 18 | [ ] | [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) | H | C | same shape again (also solvable by DP — compare both) | G |
| 19 | [ ] | [Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/) | M | C | predicate design practice | G |
| 20 | [ ] | [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) | M | S | "maximize the minimum" — the mirror form | G |
| 21 | [ ] | [Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/) | M | C | binary search on the window start | A |
| 22 | [ ] | [Search in a Sorted Array of Unknown Size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/) | M | S | exponential (galloping) search first | G |
| 23 | [ ] | [Sqrt(x)](https://leetcode.com/problems/sqrtx/) | E | C | integer binary search + overflow care | All |
| 24 | [ ] | [Divide Two Integers](https://leetcode.com/problems/divide-two-integers/) | M | S | doubling/bit-shift division, `MIN_VALUE` edge case | G F |
| 25 | [ ] | [H-Index II](https://leetcode.com/problems/h-index-ii/) | M | C | translating the condition into a monotone predicate | G |
| 26 | [ ] | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/) | M | C | binary search inside a design problem | G |
| 27 | [ ] | [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) | H | S | sort trick + LIS via binary search (bridges to T17) | G |
| 28 | [ ] | [Minimize Max Distance to Gas Station](https://leetcode.com/problems/minimize-max-distance-to-gas-station/) | H | S | **real-valued** binary search (precision loop) | G |

---

## T06 — Stack & Monotonic Stack (26)

> Master: matching/validity, expression parsing, min-stack, monotonic increasing/decreasing stacks, recursion→iteration via explicit stack.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | E | C | the base stack pattern | All |
| 2 | [ ] | [Min Stack](https://leetcode.com/problems/min-stack/) | M | C | carry the auxiliary min; O(1) everything | All |
| 3 | [ ] | [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | M | C | postfix evaluation | A |
| 4 | [ ] | [Basic Calculator](https://leetcode.com/problems/basic-calculator/) | H | C | sign stack for nested parens | G |
| 5 | [ ] | [Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii/) | H | S | full precedence + parens; recursion or two stacks | G |
| 6 | [ ] | [Simplify Path](https://leetcode.com/problems/simplify-path/) | M | C | stack over path tokens | F M |
| 7 | [ ] | [Remove All Adjacent Duplicates In String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/) | M | C | stack of (char, count) pairs | G |
| 8 | [ ] | [Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/) | E | C | stack, then the O(1)-space two-pointer follow-up | G F |
| 9 | [ ] | [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/) | M | C | stack simulation with a tricky inner loop | All |
| 10 | [ ] | [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | M | C | **monotonic decreasing stack** — the intro | All |
| 11 | [ ] | [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) | E | C | monotonic stack + map indirection | A |
| 12 | [ ] | [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) | M | C | circular array → iterate 2n | A |
| 13 | [ ] | [Online Stock Span](https://leetcode.com/problems/online-stock-span/) | M | C | previous-greater as a streaming design | A |
| 14 | [ ] | [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | H | C | the monotonic-stack keystone problem | All |
| 15 | [ ] | [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) | H | C | per-row histogram + #14 | G A |
| 16 | [ ] | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | H | C | re-solve it with a **stack** this time | All |
| 17 | [ ] | [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) | M | C | contribution technique: count spans per element | G A |
| 18 | [ ] | [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) | M | C | greedy + monotonic stack | G |
| 19 | [ ] | [Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/) | M | S | monotonic stack + "can I see it later?" check | G |
| 20 | [ ] | [132 Pattern](https://leetcode.com/problems/132-pattern/) | M | S | stack scanned right-to-left with a candidate value | G |
| 21 | [ ] | [Car Fleet](https://leetcode.com/problems/car-fleet/) | M | C | sort + monotonic stack on arrival times | G |
| 22 | [ ] | [Binary Tree Inorder Traversal (iterative)](https://leetcode.com/problems/binary-tree-inorder-traversal/) | E | C | recursion → explicit stack | All |
| 23 | [ ] | [Flatten Nested List Iterator](https://leetcode.com/problems/flatten-nested-list-iterator/) | M | C | stack-based lazy iterator design | G F |
| 24 | [ ] | [Exclusive Time of Functions](https://leetcode.com/problems/exclusive-time-of-functions/) | M | S | call-stack simulation — very Google/Meta | G F |
| 25 | [ ] | [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) | H | C | stack of indices (or the two-pass counter trick) | G |
| 26 | [ ] | [Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/) | H | S | stack-of-stacks-by-frequency design | G A |

---

## T07 — Linked List (22)

> Master: dummy head, reversal (incl. k-groups), fast/slow, merge & sort, deep copy, list-backed structures.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) | E | C | iterative + recursive; the atom of every list problem | All |
| 2 | [ ] | [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) | M | C | reverse a sublist — dummy head earns its keep | M |
| 3 | [ ] | [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) | H | C | the pointer-surgery boss problem | All |
| 4 | [ ] | [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) | M | C | k=2 special case, done cleanly | M |
| 5 | [ ] | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | E | C | dummy-head merge | All |
| 6 | [ ] | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | H | C | heap vs divide-and-conquer — state both complexities | All |
| 7 | [ ] | [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) | E | C | Floyd fast/slow | All |
| 8 | [ ] | [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) | M | C | find the entry node — know the *proof*, it gets asked | All |
| 9 | [ ] | [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) | E | C | fast/slow; watch which middle on even length | A |
| 10 | [ ] | [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | M | C | gap pointers + dummy head | All |
| 11 | [ ] | [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) | E | C | middle + reverse half, O(1) space | F A |
| 12 | [ ] | [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) | E | C | the two-pointer switch trick | A |
| 13 | [ ] | [Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) | M | C | prev-pointer bookkeeping | M |
| 14 | [ ] | [Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/) | M | C | two chains, then splice | M |
| 15 | [ ] | [Partition List](https://leetcode.com/problems/partition-list/) | M | C | two dummy heads, stable | A |
| 16 | [ ] | [Rotate List](https://leetcode.com/problems/rotate-list/) | M | C | close the ring, cut at `n − k%n` | A |
| 17 | [ ] | [Sort List](https://leetcode.com/problems/sort-list/) | M | C | **merge sort on a list**, O(1) space follow-up | G F |
| 18 | [ ] | [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) | M | C | carry handling | All |
| 19 | [ ] | [Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/) | M | C | no-reverse variant → stacks | A M |
| 20 | [ ] | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) | M | C | map clone, then the O(1)-space interleaving trick | All |
| 21 | [ ] | [Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/) | M | S | DFS over a list structure | G |
| 22 | [ ] | [Reorder List](https://leetcode.com/problems/reorder-list/) | M | C | middle + reverse + merge — three primitives in one | All |

---

## T08 — Intervals (14)

> Master: sort-by-start merging, sweep line with delta events, heap-of-end-times, two-sorted-arrays chronological ordering.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | M | C | sort by start, extend or push — the base pattern | All |
| 2 | [ ] | [Insert Interval](https://leetcode.com/problems/insert-interval/) | M | C | three-phase scan without re-sorting | All |
| 3 | [ ] | [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) | M | C | greedy by **end** time — know why end, not start | G |
| 4 | [ ] | [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) | M | C | the same greedy, restated | A |
| 5 | [ ] | [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/) | E | C | sort + adjacent overlap check | F |
| 6 | [ ] | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | M | C | heap of end times **or** two sorted arrays sweep — do both | All |
| 7 | [ ] | [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/) | M | C | two-pointer over two interval lists | F |
| 8 | [ ] | [Employee Free Time](https://leetcode.com/problems/employee-free-time/) | H | S | merge-all then invert; k-way merge flavor | G F |
| 9 | [ ] | [My Calendar I](https://leetcode.com/problems/my-calendar-i/) | M | C | `TreeMap.floorKey/ceilingKey` — the ordered-map tool | G |
| 10 | [ ] | [My Calendar II](https://leetcode.com/problems/my-calendar-ii/) | M | S | double-booking via delta sweep | G |
| 11 | [ ] | [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) | H | S | sweep line + max-heap; a Google staple | G A |
| 12 | [ ] | [Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals/) | M | C | sort by start asc, end desc — the sorting-key skill | G |
| 13 | [ ] | [Data Stream as Disjoint Intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals/) | H | S | `TreeMap` of live intervals, merge on insert | G |
| 14 | [ ] | [Divide Intervals Into Minimum Number of Groups](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/) | M | S | max concurrent overlap = answer (same as #6) | G |

---

## T09 — Binary Trees (34)

> Master: all traversals (rec/iter/level), "what does the recursion return?" design, LCA family, path problems, serialize, views, tree DP.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) | E | C | recursive + iterative | All |
| 2 | [ ] | [Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/) | E | C | iterative with a stack | All |
| 3 | [ ] | [Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/) | E | C | the awkward one — two-stack or reverse-preorder | All |
| 4 | [ ] | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | M | C | BFS with level-size batching | All |
| 5 | [ ] | [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) | M | C | level order + direction flag | A M |
| 6 | [ ] | [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) | M | C | last node per level (or DFS with depth) | F |
| 7 | [ ] | [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | E | C | the return-value DFS archetype | All |
| 8 | [ ] | [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | E | C | the leaf-vs-null-child trap | A |
| 9 | [ ] | [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) | E | C | return height **and** validity in one pass (sentinel −1) | All |
| 10 | [ ] | [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) | E | C | **"answer through node vs. value returned up"** — learn this shape | All |
| 11 | [ ] | [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | H | C | #10's shape with negatives clamped at 0 | All |
| 12 | [ ] | [Path Sum](https://leetcode.com/problems/path-sum/) | E | C | root-to-leaf DFS | A |
| 13 | [ ] | [Path Sum II](https://leetcode.com/problems/path-sum-ii/) | M | C | DFS + backtracking the path list | A |
| 14 | [ ] | [Path Sum III](https://leetcode.com/problems/path-sum-iii/) | M | C | **prefix sum + map on a tree** — beautiful cross-pattern | G |
| 15 | [ ] | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | M | C | the postorder LCA idiom | All |
| 16 | [ ] | [LCA of a Binary Tree III (parent pointers)](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/) | M | S | the "intersection of two lists" trick, reused | F |
| 17 | [ ] | [Lowest Common Ancestor of Deepest Leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/) | M | S | return (depth, node) pairs | G |
| 18 | [ ] | [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) | E | C | the famous warm-up | G |
| 19 | [ ] | [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) | E | C | two-pointer recursion over a tree | All |
| 20 | [ ] | [Same Tree](https://leetcode.com/problems/same-tree/) | E | C | structural equality base case | All |
| 21 | [ ] | [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/) | E | C | #20 at every node; hashing as the optimization | A |
| 22 | [ ] | [Construct Binary Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | M | C | index map + range recursion | All |
| 23 | [ ] | [Construct Binary Tree from Inorder and Postorder](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | M | C | the mirrored version | M |
| 24 | [ ] | [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | H | C | preorder with null markers — design + code | All |
| 25 | [ ] | [Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | M | C | reverse-preorder or Morris-style O(1) | M |
| 26 | [ ] | [Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/) | M | C | level linking with O(1) space | F |
| 27 | [ ] | [Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/) | M | S | O(log²n) using completeness — the "don't just traverse" lesson | G |
| 28 | [ ] | [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) | M | C | **build a parent map → BFS**: tree-as-graph | F A |
| 29 | [ ] | [Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) | M | S | same tree-as-graph BFS | A |
| 30 | [ ] | [Vertical Order Traversal of a Binary Tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) | H | C | coordinate map + tie-breaking rules | A F |
| 31 | [ ] | [Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/) | H | S | greedy **tree DP** with 3 states | G |
| 32 | [ ] | [House Robber III](https://leetcode.com/problems/house-robber-iii/) | M | C | tree DP returning a (take, skip) pair | A |
| 33 | [ ] | [Distribute Coins in Binary Tree](https://leetcode.com/problems/distribute-coins-in-binary-tree/) | M | S | flow-along-edges accumulation | G |
| 34 | [ ] | [Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/) | M | S | index arithmetic per level + overflow care | A |

---

## T10 — Binary Search Trees (16)

> Master: inorder-is-sorted, bound-based validation, order statistics, successor/predecessor, insert/delete, `TreeMap` as the Java stand-in.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) | M | C | min/max bounds (the local-check bug is the point) | All |
| 2 | [ ] | [Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/) | E | C | the BST walk | All |
| 3 | [ ] | [Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/) | M | C | insertion at a leaf | M |
| 4 | [ ] | [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/) | M | C | the three cases — most-fumbled BST operation | G M |
| 5 | [ ] | [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | M | C | inorder with early stop; follow-up: augment with subtree sizes | All |
| 6 | [ ] | [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | M | C | use the ordering — O(h), no recursion needed | All |
| 7 | [ ] | [Convert Sorted Array to BST](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | E | C | mid-as-root balanced build | A |
| 8 | [ ] | [Convert Sorted List to BST](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) | M | S | inorder simulation over a list | G |
| 9 | [ ] | [Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/) | M | C | controlled inorder in O(h) space | All |
| 10 | [ ] | [Inorder Successor in BST](https://leetcode.com/problems/inorder-successor-in-bst/) | M | C | the successor rule, both cases | F M |
| 11 | [ ] | [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/) | M | S | find the two inorder inversions; Morris for O(1) space | G |
| 12 | [ ] | [Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/) | E | C | pruned traversal | G F |
| 13 | [ ] | [Closest Binary Search Tree Value](https://leetcode.com/problems/closest-binary-search-tree-value/) | E | C | track best while walking down | G |
| 14 | [ ] | [Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/) | M | C | reverse inorder with a running sum | A |
| 15 | [ ] | [Unique Binary Search Trees II](https://leetcode.com/problems/unique-binary-search-trees-ii/) | M | S | catalan-structured construction (bridges to DP) | G |
| 16 | [ ] | [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | H | S | BIT / merge-sort counting — the order-statistics boss | G |

---

## T11 — Heap / Priority Queue (22)

> Master: top-K, two heaps, k-way merge, scheduling, and the heap-vs-quickselect-vs-sort trade-off argument.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | E | C | size-k min-heap — the top-K invariant | A |
| 2 | [ ] | [Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | M | C | comparator with a tie-break on lexicographic order | A |
| 3 | [ ] | [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) | M | C | heap vs quickselect — say both, pick one | All |
| 4 | [ ] | [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) | M | C | freq + heap or bucket | A |
| 5 | [ ] | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | H | C | **two heaps**, balanced — a must-own design | All |
| 6 | [ ] | [IPO](https://leetcode.com/problems/ipo/) | H | S | two heaps + greedy unlocking | G |
| 7 | [ ] | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | H | C | k-way merge (re-solve from the heap angle) | All |
| 8 | [ ] | [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/) | H | S | k-way merge + window over heads | G |
| 9 | [ ] | [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) | M | C | lazy expansion of the frontier | G |
| 10 | [ ] | [Ugly Number II](https://leetcode.com/problems/ugly-number-ii/) | M | C | heap or 3-pointer DP — compare | A |
| 11 | [ ] | [Task Scheduler](https://leetcode.com/problems/task-scheduler/) | M | C | greedy by frequency (heap, plus the O(1) formula) | All |
| 12 | [ ] | [Reorganize String](https://leetcode.com/problems/reorganize-string/) | M | C | max-heap greedy, feasibility check first | G F |
| 13 | [ ] | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | M | C | heap of end times (re-solve from T08) | All |
| 14 | [ ] | [Single-Threaded CPU](https://leetcode.com/problems/single-threaded-cpu/) | M | S | event-time simulation with a heap | G |
| 15 | [ ] | [Minimum Cost to Connect Sticks](https://leetcode.com/problems/minimum-cost-to-connect-sticks/) | M | C | Huffman-style repeated-min greedy | A |
| 16 | [ ] | [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) | E | C | max-heap simulation warm-up | A |
| 17 | [ ] | [Furthest Building You Can Reach](https://leetcode.com/problems/furthest-building-you-can-reach/) | M | S | heap to "undo" a greedy choice — a great trick | G |
| 18 | [ ] | [Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/) | H | S | sort by one key + heap on the other | G |
| 19 | [ ] | [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) | H | S | two heaps + lazy deletion | G |
| 20 | [ ] | [Rearrange String k Distance Apart](https://leetcode.com/problems/rearrange-string-k-distance-apart/) | H | S | heap + cooldown queue | G |
| 21 | [ ] | [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) | M | C | heap solution vs binary-search solution — contrast them | G |
| 22 | [ ] | [Design Twitter](https://leetcode.com/problems/design-twitter/) | M | S | k-way merge inside a design problem | A |

---

## T12 — Trie (12)

> Master: insert/search, prefix aggregation, trie + DFS pruning, bitwise trie for XOR.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) | M | C | the node/array-26 structure you'll reuse everywhere | All |
| 2 | [ ] | [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | M | C | wildcard `.` → DFS over children | All |
| 3 | [ ] | [Replace Words](https://leetcode.com/problems/replace-words/) | M | C | shortest-prefix lookup | G |
| 4 | [ ] | [Map Sum Pairs](https://leetcode.com/problems/map-sum-pairs/) | M | C | prefix aggregation stored on nodes | G |
| 5 | [ ] | [Word Search II](https://leetcode.com/problems/word-search-ii/) | H | C | **trie + grid DFS + pruning** — the pattern-unlocking problem | All |
| 6 | [ ] | [Design Search Autocomplete System](https://leetcode.com/problems/design-search-autocomplete-system/) | H | S | trie + top-k per node; a real system-y question | G |
| 7 | [ ] | [Search Suggestions System](https://leetcode.com/problems/search-suggestions-system/) | M | C | trie or sorted+binary search — compare | A |
| 8 | [ ] | [Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/) | M | C | trie walk with buildability check | G |
| 9 | [ ] | [Maximum XOR of Two Numbers in an Array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) | M | C | **bitwise trie** — greedy bit-by-bit | G |
| 10 | [ ] | [Maximum XOR With an Element From Array](https://leetcode.com/problems/maximum-xor-with-an-element-from-array/) | H | S | offline queries + bitwise trie | G |
| 11 | [ ] | [Concatenated Words](https://leetcode.com/problems/concatenated-words/) | H | S | trie + memoized word-break | A |
| 12 | [ ] | [Stream of Characters](https://leetcode.com/problems/stream-of-characters/) | H | S | reversed-suffix trie over a stream | G |

---
## T13 — Recursion & Backtracking (26)

> Master: the subsets/permutations/combinations canon, the duplicate-skip rule, pruning, board problems, and stating branching^depth complexity.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Subsets](https://leetcode.com/problems/subsets/) | M | C | the include/exclude decision tree — the root of everything here | All |
| 2 | [ ] | [Subsets II](https://leetcode.com/problems/subsets-ii/) | M | C | **the duplicate rule**: sort + skip `i>start && a[i]==a[i-1]` | All |
| 3 | [ ] | [Permutations](https://leetcode.com/problems/permutations/) | M | C | used-array vs swap-in-place — know both | All |
| 4 | [ ] | [Permutations II](https://leetcode.com/problems/permutations-ii/) | M | C | duplicate rule applied to permutations | A |
| 5 | [ ] | [Combinations](https://leetcode.com/problems/combinations/) | M | C | the `start` index that prevents re-picking | M |
| 6 | [ ] | [Combination Sum](https://leetcode.com/problems/combination-sum/) | M | C | unlimited reuse → do not advance `start` | All |
| 7 | [ ] | [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) | M | C | each element once + duplicates in the input | A |
| 8 | [ ] | [Combination Sum III](https://leetcode.com/problems/combination-sum-iii/) | M | C | two simultaneous constraints + pruning | M |
| 9 | [ ] | [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | M | C | cartesian-product backtracking | All |
| 10 | [ ] | [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | M | C | constraint-guided generation (never generate-then-filter) | All |
| 11 | [ ] | [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) | M | C | partition backtracking + palindrome check (memoize it) | All |
| 12 | [ ] | [Word Search](https://leetcode.com/problems/word-search/) | M | C | grid DFS with visit-mark/unmark | All |
| 13 | [ ] | [N-Queens](https://leetcode.com/problems/n-queens/) | H | C | constraint sets for column and both diagonals — the classic | All |
| 14 | [ ] | [N-Queens II](https://leetcode.com/problems/n-queens-ii/) | H | S | same engine, count only; bitmask version as the flex | G |
| 15 | [ ] | [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) | H | C | constraint propagation + backtracking | All |
| 16 | [ ] | [Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/) | M | C | bounded segment partitioning | A |
| 17 | [ ] | [Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/) | M | C | branch only on letters | M |
| 18 | [ ] | [Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/) | M | S | pruning by divisibility; bridges to bitmask DP | G |
| 19 | [ ] | [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | H | C | the pruning masterclass (sort desc, skip equal buckets) | A |
| 20 | [ ] | [Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/) | M | S | problem 19 with k=4 | G |
| 21 | [ ] | [Word Break II](https://leetcode.com/problems/word-break-ii/) | H | C | backtracking **+ memoization** — the hybrid to internalize | G |
| 22 | [ ] | [Expression Add Operators](https://leetcode.com/problems/expression-add-operators/) | H | S | carrying the last operand for `*` precedence — a Google favorite | G |
| 23 | [ ] | [Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/) | H | S | BFS-by-level, or backtracking with dedup | F |
| 24 | [ ] | [Split a String Into the Max Number of Unique Substrings](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/) | M | S | partitioning under a set constraint | G |
| 25 | [ ] | [Path with Maximum Gold](https://leetcode.com/problems/path-with-maximum-gold/) | M | S | grid backtracking maximizing a path value | A |
| 26 | [ ] | [24 Game](https://leetcode.com/problems/24-game/) | H | S | pick-two-and-combine recursion, with floating-point care | G |

---

## T14 — Greedy (20)

> Master: the exchange argument (be able to *justify* greedy), sorting-key discovery, greedy+heap, and knowing when greedy fails so DP is required.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Jump Game](https://leetcode.com/problems/jump-game/) | M | C | furthest-reach invariant | All |
| 2 | [ ] | [Jump Game II](https://leetcode.com/problems/jump-game-ii/) | M | C | implicit BFS levels — say it that way out loud | All |
| 3 | [ ] | [Gas Station](https://leetcode.com/problems/gas-station/) | M | C | total-sum feasibility + restart point; prove the uniqueness | All |
| 4 | [ ] | [Candy](https://leetcode.com/problems/candy/) | H | C | two-pass left/right sweep | A |
| 5 | [ ] | [Partition Labels](https://leetcode.com/problems/partition-labels/) | M | C | last-occurrence map + running boundary | A |
| 6 | [ ] | [Assign Cookies](https://leetcode.com/problems/assign-cookies/) | E | C | sorted two-pointer greedy matching | A |
| 7 | [ ] | [Lemonade Change](https://leetcode.com/problems/lemonade-change/) | E | C | spend the largest bill first — the exchange argument in miniature | A |
| 8 | [ ] | [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) | M | C | sum the positive deltas; contrast with the DP formulation | All |
| 9 | [ ] | [Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/) | M | S | sort by height desc then insert at index — pure sorting-key insight | G |
| 10 | [ ] | [Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) | H | S | greedy + heap, retroactively "taking" the best past fuel | G |
| 11 | [ ] | [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) | M | C | sort by the cost *difference* — the key discovery | A |
| 12 | [ ] | [Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/) | M | S | count direction changes (greedy beats the O(n²) DP) | G |
| 13 | [ ] | [Hand of Straights](https://leetcode.com/problems/hand-of-straights/) | M | C | always start from the smallest remaining card (`TreeMap`) | G |
| 14 | [ ] | [Advantage Shuffle](https://leetcode.com/problems/advantage-shuffle/) | M | S | the "greedy tennis strategy" over sorted arrays | G |
| 15 | [ ] | [Maximum Units on a Truck](https://leetcode.com/problems/maximum-units-on-a-truck/) | E | C | fractional-knapsack-style sort | A |
| 16 | [ ] | [Minimum Deletions to Make Character Frequencies Unique](https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/) | M | C | greedy with a used-frequency set | A |
| 17 | [ ] | [Score After Flipping Matrix](https://leetcode.com/problems/score-after-flipping-matrix/) | M | S | greedy by bit significance — column-value reasoning | G |
| 18 | [ ] | [Bag of Tokens](https://leetcode.com/problems/bag-of-tokens/) | M | S | two-pointer greedy with a trade-off decision each step | A |
| 19 | [ ] | [Least Number of Unique Integers after K Removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/) | M | C | remove the rarest first | A |
| 20 | [ ] | [Split Array into Consecutive Subsequences](https://leetcode.com/problems/split-array-into-consecutive-subsequences/) | M | S | greedy choice: extend an existing run vs. start a new one | G |

---

## T15 — Graphs: Traversal & Structure (26)

> Master: graph modeling (including implicit/state graphs), BFS/DFS, multi-source BFS, cycle detection, topological sort, bipartiteness, components.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Number of Islands](https://leetcode.com/problems/number-of-islands/) | M | C | grid-as-graph, connected components | All |
| 2 | [ ] | [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | M | C | DFS that returns a size | A |
| 3 | [ ] | [Flood Fill](https://leetcode.com/problems/flood-fill/) | E | C | the simplest traversal template | F |
| 4 | [ ] | [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) | M | C | **invert the problem**: start from the borders | A |
| 5 | [ ] | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) | M | C | reverse-direction multi-source DFS, then intersect | All |
| 6 | [ ] | [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | M | C | components on an adjacency matrix (DFS or DSU) | A |
| 7 | [ ] | [Clone Graph](https://leetcode.com/problems/clone-graph/) | M | C | traversal + visited map for cycle safety | All |
| 8 | [ ] | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | M | C | **multi-source BFS** — seed the queue with every source | All |
| 9 | [ ] | [01 Matrix](https://leetcode.com/problems/01-matrix/) | M | C | multi-source BFS as a distance transform | G |
| 10 | [ ] | [Walls and Gates](https://leetcode.com/problems/walls-and-gates/) | M | C | the same pattern, third disguise | F |
| 11 | [ ] | [Shortest Bridge](https://leetcode.com/problems/shortest-bridge/) | M | S | DFS to mark one island, then BFS outward | G |
| 12 | [ ] | [Word Ladder](https://leetcode.com/problems/word-ladder/) | H | C | **implicit graph** + BFS; bidirectional BFS as the follow-up | All |
| 13 | [ ] | [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/) | H | S | BFS layering + DFS path reconstruction | A |
| 14 | [ ] | [Open the Lock](https://leetcode.com/problems/open-the-lock/) | M | C | state-space BFS — recognizing "this is a graph" *is* the problem | G |
| 15 | [ ] | [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) | M | S | the same state-space BFS | A |
| 16 | [ ] | [Course Schedule](https://leetcode.com/problems/course-schedule/) | M | C | cycle detection in a digraph (Kahn or 3-color DFS) | All |
| 17 | [ ] | [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) | M | C | **topological sort** producing an order | All |
| 18 | [ ] | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) | H | C | build the graph from constraints, then topo-sort; edge cases matter | G F |
| 19 | [ ] | [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) | M | S | peel leaves layer by layer (topological order on a tree) | G |
| 20 | [ ] | [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/) | M | C | 2-coloring via BFS/DFS | F |
| 21 | [ ] | [Possible Bipartition](https://leetcode.com/problems/possible-bipartition/) | M | S | problem 20 in disguise — practice the recognition | G |
| 22 | [ ] | [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) | M | C | n−1 edges + connected + acyclic (DSU or BFS) | G F |
| 23 | [ ] | [Course Schedule IV](https://leetcode.com/problems/course-schedule-iv/) | M | S | transitive closure (Floyd over reachability) | G |
| 24 | [ ] | [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | M | C | BFS = shortest path on an unweighted grid (8 directions) | A |
| 25 | [ ] | [Evaluate Division](https://leetcode.com/problems/evaluate-division/) | M | C | weighted-edge DFS (or weighted DSU) — a lovely modeling exercise | G |
| 26 | [ ] | [All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/) | M | C | DFS enumerating every path on a DAG | A |

---

## T16 — Graphs: Weighted & Advanced (18)

> Master: Dijkstra (plus augmented state), 0-1 BFS, Bellman-Ford, Floyd-Warshall, MST, Union-Find, Euler path, bridges.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Network Delay Time](https://leetcode.com/problems/network-delay-time/) | M | C | **Dijkstra** — the template you own cold | All |
| 2 | [ ] | [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | M | C | Bellman-Ford by rounds, or Dijkstra over `(node, stops)` | All |
| 3 | [ ] | [Path with Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) | M | C | Dijkstra minimizing a max edge (or binary search + BFS) | G |
| 4 | [ ] | [Path With Maximum Minimum Value](https://leetcode.com/problems/path-with-maximum-minimum-value/) | M | S | the max-heap mirror of problem 3 | G |
| 5 | [ ] | [Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/) | H | C | same family; Dijkstra vs. DSU-over-sorted-cells — do both | G |
| 6 | [ ] | [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) | H | C | **BFS where a node is `(cell, remainingK)`** — the key generalization | G |
| 7 | [ ] | [Minimum Cost to Make at Least One Valid Path in a Grid](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) | H | S | **0-1 BFS** with a deque | G |
| 8 | [ ] | [The Maze II](https://leetcode.com/problems/the-maze-ii/) | M | S | Dijkstra where a "move" rolls until it hits a wall | G |
| 9 | [ ] | [Find the City With the Smallest Number of Neighbors](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) | M | C | **Floyd–Warshall** — and knowing when all-pairs is the right call | G |
| 10 | [ ] | [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) | M | C | **MST** (Prim on a dense graph) | All |
| 11 | [ ] | [Optimize Water Distribution in a Village](https://leetcode.com/problems/optimize-water-distribution-in-a-village/) | H | S | MST with a **virtual node** — genuinely clever modeling | G |
| 12 | [ ] | [Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) | M | C | DSU component counting | A |
| 13 | [ ] | [Redundant Connection](https://leetcode.com/problems/redundant-connection/) | M | C | **Union-Find** cycle detection — write it with path compression + rank | All |
| 14 | [ ] | [Accounts Merge](https://leetcode.com/problems/accounts-merge/) | M | C | DSU over strings; the classic DSU application | A F |
| 15 | [ ] | [Most Stones Removed with Same Row or Column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/) | M | S | union by row/column index — the reframing *is* the problem | G |
| 16 | [ ] | [Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/) | M | S | DSU in two phases: all unions first, then all checks | G |
| 17 | [ ] | [Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) | H | S | **Tarjan bridges** (low-link values) — Google asks this by name | G |
| 18 | [ ] | [Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/) | H | S | **Hierholzer** Eulerian path | G |

---

## T17 — Dynamic Programming (58)

> The big one. Do these **grouped by category**, and run the same 6-step drill on every single problem: state in words → recurrence + base case → top-down memo → bottom-up → space-optimize → complexity as `states × transition`.

### 17a — 1-D / Linear (7)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | E | C | the "hello world" recurrence; do all 3 forms | All |
| 2 | [ ] | [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) | E | C | cost on the state vs. on the transition | A |
| 3 | [ ] | [House Robber](https://leetcode.com/problems/house-robber/) | M | C | take/skip — the archetype of half of all DP | All |
| 4 | [ ] | [House Robber II](https://leetcode.com/problems/house-robber-ii/) | M | C | circular constraint → run the linear DP twice | All |
| 5 | [ ] | [Decode Ways](https://leetcode.com/problems/decode-ways/) | M | C | counting DP with nasty zero edge cases | F |
| 6 | [ ] | [Delete and Earn](https://leetcode.com/problems/delete-and-earn/) | M | C | **reduce to House Robber** by bucketing values | G |
| 7 | [ ] | [Word Break](https://leetcode.com/problems/word-break/) | M | C | boolean DP over string prefixes | All |

### 17b — Knapsack Family (9)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 8 | [ ] | [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) | M | C | **0/1 knapsack** as subset-sum; bitset trick as the flex | All |
| 9 | [ ] | [Target Sum](https://leetcode.com/problems/target-sum/) | M | C | +/− assignment reduced to subset-sum | F |
| 10 | [ ] | [Coin Change](https://leetcode.com/problems/coin-change/) | M | C | **unbounded knapsack**, minimizing | All |
| 11 | [ ] | [Coin Change II](https://leetcode.com/problems/coin-change-ii/) | M | C | counting combinations — **loop order decides combos vs permutations** | All |
| 12 | [ ] | [Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/) | M | C | the permutation-counting mirror of #11 — contrast them explicitly | G |
| 13 | [ ] | [Perfect Squares](https://leetcode.com/problems/perfect-squares/) | M | C | unbounded knapsack in disguise (also solvable by BFS) | A |
| 14 | [ ] | [Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/) | M | S | "minimize the difference" → subset-sum closest to half | G |
| 15 | [ ] | [Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/) | M | S | **two-dimensional** knapsack capacity | G |
| 16 | [ ] | [Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/) | M | C | DP over a time axis with variable-length jumps | A |

### 17c — Grid / 2-D Paths (6)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 17 | [ ] | [Unique Paths](https://leetcode.com/problems/unique-paths/) | M | C | grid counting; combinatorial closed form as the follow-up | All |
| 18 | [ ] | [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/) | M | C | obstacles = zeroed states | A |
| 19 | [ ] | [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) | M | C | grid minimization, in-place variant | All |
| 20 | [ ] | [Triangle](https://leetcode.com/problems/triangle/) | M | C | bottom-up beats top-down here — explain why | A |
| 21 | [ ] | [Maximal Square](https://leetcode.com/problems/maximal-square/) | M | C | state = "largest square ending here"; the min-of-three recurrence | All |
| 22 | [ ] | [Dungeon Game](https://leetcode.com/problems/dungeon-game/) | H | S | **must traverse backwards** — the direction-of-DP lesson | G |

### 17d — String DP (9)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 23 | [ ] | [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) | M | C | the two-string DP grid; everything below is a variant | All |
| 24 | [ ] | [Edit Distance](https://leetcode.com/problems/edit-distance/) | M | C | three-way transition; the most-asked hard-ish DP | All |
| 25 | [ ] | [Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/) | H | S | counting-flavored LCS | G |
| 26 | [ ] | [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) | M | C | LCS with its own reverse; interval-DP flavor | A |
| 27 | [ ] | [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) | H | S | precomputed palindrome table + cut DP | G |
| 28 | [ ] | [Interleaving String](https://leetcode.com/problems/interleaving-string/) | M | C | 2-D state over two pointers | M |
| 29 | [ ] | [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) | H | C | the `*` case analysis — do it slowly, once, properly | G F |
| 30 | [ ] | [Wildcard Matching](https://leetcode.com/problems/wildcard-matching/) | H | S | the cleaner sibling of #29 | G |
| 31 | [ ] | [Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence/) | H | S | LCS + **reconstructing the answer** from the DP table | G |

### 17e — LIS Family (4)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 32 | [ ] | [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) | M | C | O(n²) DP **and** the O(n log n) patience/binary-search version | All |
| 33 | [ ] | [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) | M | S | carrying counts alongside lengths | G |
| 34 | [ ] | [Longest String Chain](https://leetcode.com/problems/longest-string-chain/) | M | C | LIS over a predecessor relation + a map | G A |
| 35 | [ ] | [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/) | M | C | LIS vs. interval greedy — recognize both work, pick the better | G |

### 17f — Interval / MCM DP (4)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 36 | [ ] | [Burst Balloons](https://leetcode.com/problems/burst-balloons/) | H | C | think **last** balloon, not first — the interval-DP epiphany | G |
| 37 | [ ] | [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/) | H | S | matrix-chain shape on cut positions | G |
| 38 | [ ] | [Stone Game](https://leetcode.com/problems/stone-game/) | M | C | game DP: value from the current player's perspective | F |
| 39 | [ ] | [Remove Boxes](https://leetcode.com/problems/remove-boxes/) | H | S | 3-D interval DP — the hardest standard DP; do it last | G |

### 17g — State-Machine DP (stocks) (5)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 40 | [ ] | [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | M | C | hold/sold/rest state machine — draw it before coding | G |
| 41 | [ ] | [Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) | M | C | same machine, fee on the transition | A |
| 42 | [ ] | [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) | H | C | at most 2 transactions → 4 states | All |
| 43 | [ ] | [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) | H | C | generalize to k; the whole family collapses into one template | All |
| 44 | [ ] | [Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/) | H | C | **DP + binary search** over sorted intervals | G A |

### 17h — Tree / Graph DP (4)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 45 | [ ] | [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/) | M | C | Catalan recurrence via "pick the root" | G |
| 46 | [ ] | [Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | H | C | **memoized DFS on an implicit DAG** — the pattern to own | G |
| 47 | [ ] | [Cherry Pickup](https://leetcode.com/problems/cherry-pickup/) | H | S | two simultaneous walks → shared-time state | G |
| 48 | [ ] | [Cherry Pickup II](https://leetcode.com/problems/cherry-pickup-ii/) | H | S | the cleaner two-robot formulation | G |

### 17i — Bitmask DP (4)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 49 | [ ] | [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | H | C | BFS over `(node, visitedMask)` — TSP-flavored, `n ≤ 12` is the tell | G |
| 50 | [ ] | [Find the Shortest Superstring](https://leetcode.com/problems/find-the-shortest-superstring/) | H | S | TSP bitmask DP + overlap precomputation | G |
| 51 | [ ] | [Number of Ways to Wear Different Hats to Each Other](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/) | H | S | assignment DP — mask over people, iterate hats | G |
| 52 | [ ] | [Maximum Students Taking Exam](https://leetcode.com/problems/maximum-students-taking-exam/) | H | S | row-by-row profile DP with mask compatibility | G |

### 17j — Counting, Digit & Misc DP (6)

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 53 | [ ] | [Arithmetic Slices](https://leetcode.com/problems/arithmetic-slices/) | M | C | "count subarrays ending here" — a reusable counting idiom | A |
| 54 | [ ] | [Knight Dialer](https://leetcode.com/problems/knight-dialer/) | M | C | DP over a small state graph + modular arithmetic | G |
| 55 | [ ] | [Domino and Tromino Tiling](https://leetcode.com/problems/domino-and-tromino-tiling/) | M | S | tiling recurrence with partial-state tracking | G |
| 56 | [ ] | [Count Numbers with Unique Digits](https://leetcode.com/problems/count-numbers-with-unique-digits/) | M | S | combinatorial DP — the gateway to digit DP | G |
| 57 | [ ] | [Numbers At Most N Given Digit Set](https://leetcode.com/problems/numbers-at-most-n-given-digit-set/) | H | S | **digit DP** with a tight/loose flag | G |
| 58 | [ ] | [Frog Jump](https://leetcode.com/problems/frog-jump/) | H | S | state = (stone, lastJump); map-based memo | G |

---

## T18 — Bit Manipulation (16)

> Master: XOR identities, `n & (n-1)`, `n & -n`, mask enumeration, and the bridge into bitmask DP.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Single Number](https://leetcode.com/problems/single-number/) | E | C | `a^a=0` — the identity everything rests on | All |
| 2 | [ ] | [Single Number II](https://leetcode.com/problems/single-number-ii/) | M | C | per-bit counting mod 3 (state-machine version as the flex) | G |
| 3 | [ ] | [Single Number III](https://leetcode.com/problems/single-number-iii/) | M | S | partition by the lowest differing bit (`x & -x`) | G |
| 4 | [ ] | [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | E | C | `n & (n-1)` clears the lowest set bit | All |
| 5 | [ ] | [Counting Bits](https://leetcode.com/problems/counting-bits/) | E | C | DP on bits — `dp[i] = dp[i>>1] + (i&1)` | All |
| 6 | [ ] | [Reverse Bits](https://leetcode.com/problems/reverse-bits/) | E | C | bit-by-bit build; follow-up: what if called a million times | A |
| 7 | [ ] | [Power of Two](https://leetcode.com/problems/power-of-two/) | E | C | one-liner with `n & (n-1)` | A |
| 8 | [ ] | [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/) | M | C | addition via XOR + carry shifting | M |
| 9 | [ ] | [Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/) | M | S | common prefix of the range endpoints | G |
| 10 | [ ] | [Total Hamming Distance](https://leetcode.com/problems/total-hamming-distance/) | M | S | per-bit contribution counting | F |
| 11 | [ ] | [Gray Code](https://leetcode.com/problems/gray-code/) | M | S | `i ^ (i>>1)` — and why it works | G |
| 12 | [ ] | [Number Complement](https://leetcode.com/problems/number-complement/) | E | C | building a mask of the right width | A |
| 13 | [ ] | [Maximum Product of Word Lengths](https://leetcode.com/problems/maximum-product-of-word-lengths/) | M | C | **bitmask as a set** — 26-bit signatures | G |
| 14 | [ ] | [UTF-8 Validation](https://leetcode.com/problems/utf-8-validation/) | M | S | bit-pattern parsing against a spec | G |
| 15 | [ ] | [Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/) | M | C | per-bit case analysis | A |
| 16 | [ ] | [Concatenation of Consecutive Binary Numbers](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/) | M | S | shift-and-accumulate with modular arithmetic | G |

---

## T19 — Math & Number Theory (14)

> Master: fast power, sieve, gcd, modular arithmetic, randomized algorithms (a real interview favorite), light geometry.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [Pow(x, n)](https://leetcode.com/problems/powx-n/) | M | C | **fast exponentiation**; negative-exponent & overflow edges | All |
| 2 | [ ] | [Happy Number](https://leetcode.com/problems/happy-number/) | E | C | cycle detection outside a linked list | A |
| 3 | [ ] | [Count Primes](https://leetcode.com/problems/count-primes/) | M | C | **sieve of Eratosthenes** + its complexity argument | A |
| 4 | [ ] | [Greatest Common Divisor of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings/) | E | C | Euclid's algorithm applied to a non-numeric domain | G |
| 5 | [ ] | [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/) | E | C | 1-indexed base conversion (the off-by-one is the test) | M |
| 6 | [ ] | [Integer to Roman](https://leetcode.com/problems/integer-to-roman/) | M | C | greedy table lookup | A |
| 7 | [ ] | [Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal/) | M | S | long division + remainder map for cycle detection | G |
| 8 | [ ] | [Rectangle Area](https://leetcode.com/problems/rectangle-area/) | M | C | overlap arithmetic — clean case analysis | G |
| 9 | [ ] | [Random Pick with Weight](https://leetcode.com/problems/random-pick-with-weight/) | M | C | prefix sums + binary search — asked constantly | G F |
| 10 | [ ] | [Shuffle an Array](https://leetcode.com/problems/shuffle-an-array/) | M | C | **Fisher–Yates**; be able to argue uniformity | G |
| 11 | [ ] | [Linked List Random Node](https://leetcode.com/problems/linked-list-random-node/) | M | C | **reservoir sampling** (k=1) with the probability proof | G F |
| 12 | [ ] | [Random Pick Index](https://leetcode.com/problems/random-pick-index/) | M | S | reservoir sampling over duplicates | F |
| 13 | [ ] | [Implement Rand10() Using Rand7()](https://leetcode.com/problems/implement-rand10-using-rand7/) | M | S | rejection sampling + expected-value analysis | G |
| 14 | [ ] | [Super Pow](https://leetcode.com/problems/super-pow/) | M | S | modular exponentiation over a digit-array exponent | G |

---

## T20 — Design & Advanced Structures (18)

> Master: designing data structures to hit a complexity contract, iterator design, and the advanced structures (BIT / segment tree / ordered map) that show up at the top end.

| # | St | Problem | Diff | Tier | Pattern / why it's here | Co |
|---|---|---|---|---|---|---|
| 1 | [ ] | [LRU Cache](https://leetcode.com/problems/lru-cache/) | M | C | hashmap + doubly-linked list; the single most-asked design problem | All |
| 2 | [ ] | [LFU Cache](https://leetcode.com/problems/lfu-cache/) | H | C | frequency buckets + LRU inside each — O(1) is the whole point | A |
| 3 | [ ] | [Design HashMap](https://leetcode.com/problems/design-hashmap/) | E | C | buckets + chaining; discuss load factor and resizing | M |
| 4 | [ ] | [Design Circular Queue](https://leetcode.com/problems/design-circular-queue/) | M | C | ring-buffer index arithmetic | A |
| 5 | [ ] | [Design Underground System](https://leetcode.com/problems/design-underground-system/) | M | C | composite-key maps + running averages | A |
| 6 | [ ] | [Logger Rate Limiter](https://leetcode.com/problems/logger-rate-limiter/) | E | C | map of timestamps; follow-up: bound the memory | G |
| 7 | [ ] | [Design Hit Counter](https://leetcode.com/problems/design-hit-counter/) | M | C | circular buffer / queue over a time window | G |
| 8 | [ ] | [Snapshot Array](https://leetcode.com/problems/snapshot-array/) | M | S | versioned entries + binary search per index | G |
| 9 | [ ] | [Design In-Memory File System](https://leetcode.com/problems/design-in-memory-file-system/) | H | S | trie-of-directories; the LLD/DSA crossover question | G A |
| 10 | [ ] | [Peeking Iterator](https://leetcode.com/problems/peeking-iterator/) | M | C | one-element lookahead buffering | G |
| 11 | [ ] | [Zigzag Iterator](https://leetcode.com/problems/zigzag-iterator/) | M | S | queue of iterators — generalizes to k lists (that's the follow-up) | G |
| 12 | [ ] | [Flatten 2D Vector](https://leetcode.com/problems/flatten-2d-vector/) | M | S | lazy advancement, empty-sublist edge cases | G |
| 13 | [ ] | [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) | M | C | **Fenwick tree (BIT)** or segment tree — build one from scratch | G |
| 14 | [ ] | [Range Sum Query 2D - Mutable](https://leetcode.com/problems/range-sum-query-2d-mutable/) | H | S | 2-D BIT | G |
| 15 | [ ] | [My Calendar III](https://leetcode.com/problems/my-calendar-iii/) | H | S | segment tree with lazy propagation (or a delta `TreeMap`) | G |
| 16 | [ ] | [Design Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe/) | M | C | O(1) move via row/col/diag counters — the "don't scan" insight | A M |
| 17 | [ ] | [Insert Delete GetRandom O(1) - Duplicates allowed](https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/) | H | S | map of index-sets + swap-to-end | G |
| 18 | [ ] | [Design Browser History](https://leetcode.com/problems/design-browser-history/) | M | C | two stacks or a doubly-linked list — compare the trade-offs | A |

---

## Company quick-filters

Use the `Co` column to build a final-week sweep. Rough guidance:

- **Google (G)** — the `G`-tagged Hards, especially: Alien Dictionary, Shortest Path with Obstacles Elimination, Critical Connections, Expression Add Operators, Burst Balloons, Text Justification, Skyline, Random Pick with Weight, Median of Two Sorted Arrays, Word Ladder, Subarrays with K Different Integers.
- **Amazon (A)** — high-frequency mediums: Number of Islands, LRU Cache, Copy List with Random Pointer, K Closest Points, Task Scheduler, Word Ladder, Merge Intervals, Rotting Oranges, Analyze User Website Visit Pattern-style map problems, Critical Connections.
- **Meta (F)** — speed set: Valid Palindrome II, Subarray Sum Equals K, Binary Tree Right Side View, LCA III, Random Pick Index, Merge Sorted Array, Minimum Remove to Make Valid Parentheses, Kth Largest, Interval List Intersections, Remove Invalid Parentheses.
- **Microsoft (M)** — Reverse Linked List II, Reverse Words in a String, Design Tic-Tac-Toe, Serialize/Deserialize, Compare Version Numbers, Isomorphic Strings, Combination Sum III, Delete Node in a BST.

---

## Weekly log

_Append a row each week — this is what tells you if the pace is real._

| Week | Topics | Planned | Solved | Cold `[x]` | Needed help `[~]` | Notes |
|---|---|---|---|---|---|---|
| 1 | Phase 0 + T01 | 30 | 0 | 0 | 0 | |

