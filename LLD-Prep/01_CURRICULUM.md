# LLD Curriculum — Full Syllabus

Goal: take a 2.5–3 YOE engineer to "confidently ace SDE2 LLD rounds" — meaning: can gather requirements, produce a clean class diagram, justify pattern choices, write compiling-quality Java in ~35-40 minutes, and handle follow-up extensibility/concurrency questions.

This file is the **reference syllabus** (what and why). The checklist with live status lives in [00_PROGRESS_TRACKER.md](00_PROGRESS_TRACKER.md) — always update that one, this one rarely changes.

---

## How each session will work (teacher/student loop)

1. **I teach** a concept or pattern — short, concrete, Java-first, interview-framed (not academic).
2. **You implement** — I give you a small spec, you write the Java code yourself in `solutions/`.
3. **I review** your code like an interviewer would — correctness, SOLID adherence, naming, missed edge cases, better pattern choice — and we iterate.
4. **We log it** — tracker checkbox ticked, session log updated (including a Phase tag and hours spent this session, asked for at wrap-up), any reusable notes saved to `notes/` or `patterns/`.

For LLD *problems* (Phase 2+), the loop is stricter and mirrors the real interview:
1. I give you only a one-paragraph prompt (like an interviewer would).
2. You ask clarifying questions; I answer as the interviewer.
3. You propose entities/class diagram (text form is fine) before coding.
4. You code it.
5. I review, then we discuss 2-3 "what if" extensions (this is what separates SDE2 from SDE1 answers).

---

## Phase 0 — Foundations

**Why first:** interviewers probe *why* you made a design choice. Shaky SOLID/OOP fundamentals is the #1 reason otherwise-working designs get dinged at SDE2 level.

- OOP pillars at interview depth: not "what is inheritance" but *when composition beats inheritance*, why favor interfaces over abstract classes, how encapsulation shapes API design.
- SOLID — each principle gets a "bad code" → "refactored code" pair in Java.
- UML basics — enough to sketch class diagrams fast in text/ASCII during an interview (no tooling needed): class box notation, `--|>` inheritance, `--*` composition, `--o` aggregation, `-->` association/dependency.
- **The 9-step framework** (see [02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md)) — the repeatable process applied to every problem from Phase 2 onward.
- **Concurrency — dedicated lesson, not a footnote.** SDE2 LLD rounds routinely ask "what if two threads call this?", and it's one of the clearest signals separating SDE2 from SDE1 answers. Full scope: `synchronized` (instance vs. class lock), `volatile` (visibility ≠ atomicity), `Atomic*` classes, `ReentrantLock`/`ReadWriteLock`, thread-safe collections (`ConcurrentHashMap`, `CopyOnWriteArrayList`, `BlockingQueue`), `ExecutorService`/thread pools, coordination primitives (`wait`/`notify`, `CountDownLatch`, `Semaphore`, `CyclicBarrier`), deadlock/livelock/starvation + lock-ordering prevention, thread-safe double-checked-locking Singleton, producer-consumer, immutability as the strongest thread-safety tool. See live checklist status in [00_PROGRESS_TRACKER.md](00_PROGRESS_TRACKER.md).
  - This isn't one-and-done — it gets **actively reapplied** in Phase 3/4 problems where concurrency is core to the design, not optional: Rate Limiter (concurrent request counting), Parking Lot / Movie & Flight Booking (concurrent seat/slot locking), Elevator System (concurrent request scheduling). Expect me to explicitly ask "how does this hold up under concurrent access?" on those problems even if you don't bring it up first.

## Phase 1 — Design Patterns (Gang of Four, interview-relevant subset)

**Why:** patterns are the *vocabulary* interviewers expect. Not "use a pattern because you know it" but recognizing which real design pressure (varying algorithm, object creation complexity, notifying dependents, etc.) maps to which pattern.

Each pattern note in `patterns/` will have: intent, a bad-without-pattern example, the pattern applied, a real LLD problem where it shows up, and a tiny exercise.

- **Creational** — Singleton, Factory Method, Abstract Factory, Builder, Prototype
- **Structural** — Adapter, Decorator, Facade, Composite, Proxy, Flyweight
- **Behavioral** — Strategy, Observer, State, Command, Chain of Responsibility, Template Method, Iterator, Mediator, Visitor

Not every GoF pattern is included — the above ~20 cover essentially every pattern that shows up in real LLD interviews.

## Phase 2 — Easy Problems

Single-actor systems, 1-2 patterns, small state machines. Goal: build muscle memory for the framework without getting overwhelmed by scope.

Parking Lot, Vending Machine, Traffic Light, ATM, Library Management, Logging Framework.

## Phase 3 — Medium Problems

Multi-class systems with real state machines, 2-3 patterns combined, some concurrency considerations.

LRU Cache, Elevator System, Tic-Tac-Toe/Chess, Rate Limiter, Notification System, Car Rental, simplified Movie Ticket Booking.

## Phase 4 — Hard / Capstone Problems

Multi-actor systems (customer/vendor/platform), require explicit concurrency handling (e.g. seat locking), often need an algorithm embedded in the design (e.g. Splitwise debt simplification), and have many reasonable extensions to discuss.

Splitwise, Ride-Sharing, full Booking System (movie/flight/hotel), Food Delivery, Chat System, Distributed Rate Limiter/ID Generator, In-memory File System, Meeting Scheduler.

These are the ones companies actually ask SDE2s: Splitwise and Booking-system variants are among the most common at this level.

## Phase 5 — Mock Interviews & Polish

Timed, cold-start mocks with me acting as interviewer (asking probing questions, not giving hints unless stuck >5 min). Followed by a debrief on what an interviewer would actually flag.

---

## Reference material philosophy

We're not memorizing solutions. Every problem review ends with "what would you change if requirement X changed" — that's the actual skill being tested (adaptability of a design), not recall of a canonical answer.
