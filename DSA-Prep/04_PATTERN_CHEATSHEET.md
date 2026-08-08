# Pattern Cheat Sheet — Trigger → Tool → Template

This is the file you skim before an interview, and the file you **rewrite from memory in Week 12** (gaps you find then are your real gaps).

Fill in the "My one-liner" column yourself as you finish each topic — a pattern you can't summarize in your own words isn't learned yet.

---

## Part 1 — Trigger table (read the problem, name the tool)

| What the problem says | Reach for | My one-liner |
|---|---|---|
| "sorted array", "find a pair/triplet" | two pointers from both ends | |
| "subarray/substring" + "longest/shortest/count" | sliding window | |
| "exactly K distinct/…" | `atMost(K) − atMost(K−1)` | |
| "subarray sums to k" (with negatives) | prefix sum + hashmap | |
| "range sum queries, no updates" | prefix sum array | |
| "range updates, query at the end" | difference array | |
| "range sum **with** updates" | Fenwick tree / segment tree | |
| "minimize the maximum" / "maximum minimum" / "smallest k such that" | **binary search on the answer** | |
| "sorted" + "find/insert position" | binary search (lower bound) | |
| "next greater/smaller", "span", "histogram" | monotonic stack | |
| "max/min of every window of size k" | monotonic deque | |
| "top K", "kth largest", "k closest" | heap (size k) or quickselect | |
| "running median", "balance two sides" | two heaps | |
| "merge k sorted things" | min-heap of heads | |
| "schedule / rooms / intervals overlap" | sort + sweep line, or heap of end times | |
| "all combinations/permutations/subsets" | backtracking | |
| n ≤ 12 | permutations / brute force | |
| n ≤ 20–25 + "choose a subset" | **bitmask DP** | |
| "count the ways" / "min cost to" + overlapping subproblems | DP | |
| "can I reach / shortest steps" on an unweighted structure | BFS | |
| "shortest path with weights" | Dijkstra (0-1 weights → 0-1 BFS) | |
| "prerequisites", "ordering", "dependency" | topological sort | |
| "are these connected?", "merge groups" | Union-Find | |
| "prefix", "autocomplete", "dictionary of words" | Trie | |
| "maximum XOR" | bitwise trie | |
| "cycle in a linked list / functional graph" | Floyd fast-slow | |
| "in-place, O(1) extra space" on `1..n` values | cyclic sort / index sign-marking | |
| "kth smallest in a BST", "sorted order of a tree" | inorder traversal | |
| "predecessor/successor", "closest key ≤ x" | `TreeMap` floor/ceiling | |
| "O(1) get and put" | hashmap + doubly-linked list | |
| "stream of data, need order statistics" | heap / BIT / `TreeMap` | |

---

## Part 2 — Java templates to own cold

### Binary search: lower bound (first index where `pred` is true)
```java
int lo = 0, hi = n;                 // hi is exclusive
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;   // overflow-safe
    if (pred(mid)) hi = mid;        // answer is mid or to its left
    else lo = mid + 1;
}
return lo;                          // == n if no index satisfies pred
```
Binary search **on the answer** is the same loop with `pred(x) = isFeasible(x)` over the *value* range.

### Sliding window (variable size)
```java
int left = 0, best = 0;
for (int right = 0; right < n; right++) {
    add(a[right]);
    while (!valid()) { remove(a[left]); left++; }   // maximize: shrink until valid
    best = Math.max(best, right - left + 1);
}
```
For *minimize*, invert: shrink **while** valid, recording the answer inside the while loop.

### Monotonic stack (next greater element)
```java
Deque<Integer> st = new ArrayDeque<>();          // holds indices
int[] res = new int[n]; Arrays.fill(res, -1);
for (int i = 0; i < n; i++) {
    while (!st.isEmpty() && a[st.peek()] < a[i]) res[st.pop()] = i;
    st.push(i);
}
```

### BFS on a grid (multi-source ready)
```java
int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};
Deque<int[]> q = new ArrayDeque<>();
// seed q with every source, mark them visited
int steps = 0;
while (!q.isEmpty()) {
    for (int sz = q.size(); sz > 0; sz--) {       // level by level
        int[] cur = q.poll();
        for (int[] d : DIRS) {
            int r = cur[0] + d[0], c = cur[1] + d[1];
            if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c]) continue;
            visited[r][c] = true;
            q.offer(new int[]{r, c});
        }
    }
    steps++;
}
```

### Dijkstra
```java
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> x[1] - y[1]);  // {node, dist}
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0; pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    if (cur[1] > dist[cur[0]]) continue;          // stale entry — skip
    for (int[] e : adj.get(cur[0])) {             // e = {to, weight}
        int nd = cur[1] + e[1];
        if (nd < dist[e[0]]) { dist[e[0]] = nd; pq.offer(new int[]{e[0], nd}); }
    }
}
```

### Topological sort (Kahn)
```java
int[] indeg = new int[n];
for (int u = 0; u < n; u++) for (int v : adj.get(u)) indeg[v]++;
Deque<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);
List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
    int u = q.poll(); order.add(u);
    for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
}
if (order.size() < n) { /* cycle */ }
```

### Union-Find (path compression + union by rank)
```java
int[] parent, rank;
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
boolean union(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return false;                   // already connected → a cycle
    if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
    parent[rb] = ra;
    if (rank[ra] == rank[rb]) rank[ra]++;
    return true;
}
```

### Backtracking (subsets shape — everything else is this plus constraints)
```java
void backtrack(int start, List<Integer> path) {
    res.add(new ArrayList<>(path));               // or: if (goal) record and return
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;   // skip duplicates (sorted input)
        path.add(nums[i]);
        backtrack(i + 1, path);                   // i (not i+1) if reuse is allowed
        path.remove(path.size() - 1);             // undo
    }
}
```

### Trie node
```java
class TrieNode {
    TrieNode[] next = new TrieNode[26];
    boolean isWord;
}
```

### DP drill (the 6 steps, every time)
```
1. state:      dp[i][j] = <say it in plain English>
2. recurrence: dp[i][j] = f(dp[i-1][j], dp[i][j-1], ...)
3. base case:  dp[0][*] = ?, dp[*][0] = ?
4. top-down memo  → 5. bottom-up table → 6. rolling-array space optimization
   complexity = (number of states) × (cost per transition)
```

---

## Part 3 — Java traps that cost real interviews

| Trap | Fix |
|---|---|
| `(lo + hi) / 2` overflows | `lo + (hi - lo) / 2` |
| `(a, b) -> a - b` comparator overflows | `Integer.compare(a, b)` |
| `String s += x` in a loop is O(n²) | `StringBuilder` |
| `Stack`/`LinkedList` are slow/legacy | `ArrayDeque` for both stack and queue |
| `Integer` compared with `==` beyond 127 | `.equals()` or unbox to `int` |
| `Arrays.sort(int[])` is quicksort → O(n²) adversarial | box to `Integer[]`, or shuffle first |
| Mutating a collection while iterating | iterate a copy, or use `Iterator.remove()` |
| `%` on negatives returns negative in Java | `((x % k) + k) % k` |
| `PriorityQueue` iteration order is *not* sorted | only `poll()` order is sorted |
| `Math.abs(Integer.MIN_VALUE)` is negative | use `long` |
| Deep recursion on n = 10⁵ → `StackOverflowError` | convert to an iterative/explicit stack |
