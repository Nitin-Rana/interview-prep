# Java DSA Toolkit — Reference Sheet

_The API you must never fumble under interview pressure. Read this before Week 1, and skim it again before any mock — most of what costs people points isn't the algorithm, it's a shaky `Comparator` or an off-by-one from a boxed `Integer` comparison._

## Collections — what to reach for, and why

| Need | Reach for | Not |
|---|---|---|
| Stack | `ArrayDeque<Integer> st = new ArrayDeque<>();` — `push`/`pop`/`peek` | `Stack` (legacy, synchronized, slower) |
| Queue | `ArrayDeque<Integer> q = new ArrayDeque<>();` — `offer`/`poll`/`peek` | `LinkedList` (extra node overhead, no real benefit) |
| Deque (both ends) | `ArrayDeque` — `offerFirst/offerLast/pollFirst/pollLast` | — |
| Priority queue | `PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);` | remember: `poll()` order is sorted, iteration order is **not** |
| Ordered map (predecessor/successor) | `TreeMap<Integer,V>` — `floorKey`, `ceilingKey`, `higherKey`, `lowerKey`, `firstKey`, `subMap` | most people default to `HashMap` and miss this entirely — it's the single most under-used interview tool |
| Ordered set | `TreeSet<Integer>` — same navigation methods | — |
| Insertion-order map (LRU building block) | `LinkedHashMap` (with `accessOrder=true` + overridden `removeEldestEntry` for a one-liner LRU) | — |

## HashMap idioms that save real time

```java
map.getOrDefault(key, 0);                          // read with a default, no null check
map.merge(key, 1, Integer::sum);                    // increment-or-insert in one line
map.computeIfAbsent(key, k -> new ArrayList<>()).add(val);  // adjacency-list building, one line
for (Map.Entry<String,Integer> e : map.entrySet()) { ... }  // never map.keySet() then map.get(k) again
```

## Sorting — the traps

- `Arrays.sort(int[])` uses **dual-pivot quicksort** on primitives → **O(n²)** on an adversarial input. If you need a guaranteed sort (or the input could be adversarial), box to `Integer[]` and sort that — Java uses TimSort (stable, O(n log n) worst case) for object arrays.
- `Collections.sort(list)` — always TimSort, always safe.
- `Comparator.comparingInt(x -> x.val)` — never write `(a, b) -> a.val - b.val` for a `Comparator`; it **overflows silently** on large magnitude differences (`Integer.MIN_VALUE - 1` wraps to a positive number, corrupting sort order). Use `Integer.compare(a.val, b.val)` or the `comparingInt`/`comparing` builders.
- Chaining: `Comparator.comparingInt(Task::getPriority).thenComparing(Task::getName)`.
- `Arrays.fill(arr, val)`, `Arrays.copyOfRange(arr, from, to)`, `System.arraycopy(src, srcPos, dst, dstPos, len)` — know these exist before hand-rolling a copy loop.

## Strings

- `String s += x` inside a loop is **O(n²)** — every concatenation allocates a new string. Use `StringBuilder` and `.append()`, then `.toString()` once at the end.
- `s.toCharArray()` when you need repeated indexed access or in-place mutation.
- `s.charAt(i) - 'a'` — the standard bucket-index trick for 26-letter frequency arrays.
- `String.valueOf(charArray)` / `new String(charArray)` to go back.

## Integer overflow traps

```java
int mid = lo + (hi - lo) / 2;      // NOT (lo + hi) / 2 — that overflows when lo+hi > Integer.MAX_VALUE
long product = (long) a * b;       // widen BEFORE multiplying, not after
Math.abs(Integer.MIN_VALUE);       // still negative! there's no positive counterpart in int range — use long
```

## Boxed `Integer` traps

- `Integer a = 200, b = 200; a == b` → **false**. The JVM caches boxed values in `[-128, 127]`; outside that range, `==` compares references, not values. Always use `.equals()` (or unbox to primitive `int` and compare) unless you specifically know both values are cached.
- Mixing `int` and `Integer` in generics forces autoboxing — fine for correctness, worth knowing if a follow-up asks about micro-performance.

## Recursion & stack depth

- Java's default thread stack is modest (~512KB–1MB depending on platform); a recursion depth around **10,000–15,000** frames can blow it, and `n` up to `10^5` in constraints is a real signal to convert to an **iterative** approach with an explicit `Deque` as your stack, not a hint to "just recurse deeper."
- `StackOverflowError` is an `Error`, not an `Exception` — don't try to catch and recover from it as if it were normal control flow.

## Arrays vs Collections quick facts

- `int[]` cannot hold `null`; `Integer[]` can (useful when "unvisited" needs a sentinel other than a magic number).
- 2-D arrays: `int[][] grid = new int[m][n];` — rows are separate array objects; `Arrays.fill` doesn't cascade into a 2-D array, loop rows or use `Arrays.stream(grid).forEach(row -> Arrays.fill(row, val))`.
- `Arrays.asList(arr)` on a primitive `int[]` produces a `List<int[]>` of size 1 — the classic gotcha. Box first, or use `IntStream.of(arr).boxed().collect(...)`.

## A few method references worth having ready

```java
list.sort(Comparator.comparingInt(Integer::intValue));
Arrays.sort(people, Comparator.comparingInt((int[] p) -> p[0]).thenComparingInt(p -> p[1]));
map.entrySet().stream()
   .sorted(Map.Entry.<String,Integer>comparingByValue().reversed())
   .limit(k)
   .forEach(e -> ...);
```

---

_See also: [04_PATTERN_CHEATSHEET.md](../04_PATTERN_CHEATSHEET.md) for the algorithmic templates (binary search, sliding window, Dijkstra, backtracking, etc.) — this sheet is specifically the language-level traps, that one is the pattern-level ones._
