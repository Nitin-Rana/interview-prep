# The 9-Step LLD Interview Framework

Use this on every problem from Phase 2 onward. In a real 45-min interview you won't have time to belabor every step, but running through them keeps you from the two most common failure modes: **coding too early** (before requirements/entities are clear) and **over-engineering** (patterns for their own sake).

Rough time budget for a 40-45 min round: steps 1-4 ≈ 8-10 min, steps 5-7 (coding) ≈ 20-25 min, steps 8-9 ≈ 5-10 min.

1. **Clarify functional requirements.** Restate the problem in your own words. Ask 3-5 scoping questions (What actors exist? Single vs multi-instance? Any explicitly out-of-scope features?). Never assume — ask.

2. **Clarify non-functional requirements (briefly).** Concurrency expected? Scale hints? Persistence needed or in-memory ok? This shapes pattern choices later — don't skip it even though LLD is "low level."

3. **Identify actors & use cases.** Who interacts with the system (User, Admin, System itself)? List the core use cases as verbs (e.g., "book seat," "cancel booking," "process payment").

4. **Identify core entities/classes and enums.** Nouns from the use cases become classes. States become enums (e.g., `BookingStatus{PENDING, CONFIRMED, CANCELLED}`). Don't model everything — only what's needed for the use cases in scope.

5. **Define relationships → class diagram.** Association, aggregation, composition, inheritance/interfaces between the entities. A quick text/ASCII sketch is enough — don't over-invest in visuals.

6. **Identify applicable design patterns.** For each place where behavior varies (Strategy), object creation is complex (Factory/Builder), state transitions exist (State), or dependents need notifying (Observer) — name the pattern and *why*, not just because you know it.

7. **Define interfaces/API signatures**, then implement the core classes in Java. Prioritize the "interesting" 60% (the part that demonstrates design skill) over boilerplate getters/setters — narrate that you're skipping boilerplate rather than silently typing it all.

8. **Discuss edge cases & concurrency.** What happens with simultaneous bookings on the same resource? Thread-safety of shared state? This is where SDE2 answers separate from SDE1 — proactively raise it before being asked.

9. **Discuss extensibility.** "If we added X requirement, what changes?" Should usually be "add a new class/strategy, not modify existing ones" — this is your chance to show SOLID (specifically OCP) is more than a memorized term.

---

## Common failure modes to self-check against

- **Coding before entities are settled** → leads to messy refactors mid-interview, visibly panicked.
- **Pattern-stuffing** — using Observer/Strategy/Factory everywhere whether needed or not. Interviewers notice and will ask "why this pattern here?" — have a real answer.
- **Ignoring concurrency until asked** — at SDE2, proactively flagging "this needs a lock/this is a synchronized block" is expected, not extra credit.
- **God classes** — one class doing booking + payment + notification. Split by responsibility (SRP) — this is the single most common SDE2-level ding.
- **Not asking clarifying questions** — jumping straight to code signals junior-level instinct.
- **Perfect-code paralysis** — spending 15 minutes on a class diagram and running out of time to code. Timebox yourself.
