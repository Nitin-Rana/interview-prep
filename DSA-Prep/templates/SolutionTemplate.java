/*
 * ============================================================================
 * Problem : <name + LeetCode link>
 * Topic   : <T0x — topic name>       Difficulty: <E/M/H>       Date: <yyyy-mm-dd>
 * Timebox : <15 / 30 / 45 min>       Actual: <min>             Result: [x] cold / [~] needed a hint
 * ============================================================================
 *
 * 1. CLARIFYING QUESTIONS I ASKED (or should have)
 *    - constraints / n range:
 *    - duplicates? negatives? sorted?
 *    - can I mutate the input? extra space allowed?
 *
 * 2. BRUTE FORCE
 *    idea:
 *    complexity: time O(?)   space O(?)
 *
 * 3. BOTTLENECK -> PATTERN
 *    what the brute force wastes:
 *    pattern chosen and the TRIGGER that named it:
 *
 * 4. OPTIMAL APPROACH (3-5 sentences, as I'd say it out loud)
 *
 *    complexity: time O(?)   space O(?)  (including recursion stack)
 *
 * 5. EDGE CASES
 *    - empty / single element:
 *    - all duplicates / all negatives:
 *    - overflow:
 *
 * 6. FOLLOW-UPS I'D EXPECT
 *    - O(1) space version?
 *    - streaming input?
 *    - called repeatedly -> precompute?
 *
 * 7. DEBRIEF (fill in AFTER solving — this is the part that compounds)
 *    - trigger I should have spotted sooner:
 *    - what I got wrong / wasted time on:
 *    - one-line takeaway for 3 weeks from now:
 * ============================================================================
 */

import java.util.*;

public class SolutionTemplate {

    // ---- solution ----------------------------------------------------------

    public int solve(int[] nums) {
        // TODO
        return 0;
    }

    // ---- quick tests (run these BEFORE declaring done) ----------------------

    public static void main(String[] args) {
        SolutionTemplate s = new SolutionTemplate();

        check("example",      s.solve(new int[]{1, 2, 3}), 0);
        check("empty",        s.solve(new int[]{}),        0);
        check("single",       s.solve(new int[]{5}),       0);
        check("all equal",    s.solve(new int[]{2, 2, 2}), 0);
        check("negatives",    s.solve(new int[]{-1, -2}),  0);
    }

    private static void check(String name, int actual, int expected) {
        System.out.printf("%-12s %s (got %d, expected %d)%n",
                name, actual == expected ? "PASS" : "FAIL", actual, expected);
    }
}
