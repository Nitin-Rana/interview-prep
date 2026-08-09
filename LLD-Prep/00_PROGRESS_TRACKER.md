# LLD Prep — Progress Tracker

> **Read this file first at the start of every session.** It tells you (Claude) and the student exactly where things stand. Update it at the END of every session — check off what was completed, update "Current Status", and set "Next Up".

**Student profile:** SDE2, 2.5–3 YOE, targeting SDE2 interviews. Language: **Java**. Pace: weekends/irregular — no fixed daily schedule, progress is checklist-driven, not date-driven.

**Full syllabus:** see [01_CURRICULUM.md](01_CURRICULUM.md)
**Interview approach we drill every problem with:** see [02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md)

---

## Current Status

- **Phase:** Phase 0 — Foundations (Phase 1 Command/Strategy done out of order, see below)
- **Last session:** `patterns/command.md` extended with a full Strategy-vs-Command comparison (kid-friendly explanation, when-to-choose lists, and complete Java implementations for Strategy alone, Command alone, and the two combined). Then did the Command lesson's exercise — `solutions/lesson5_command.java`: `Command.undo()`, `TurnOnCommand`/`TurnOffCommand`/`VolumeUpCommand` undo implementations (all correct on first attempt), and `RemoteWithHistory` (history-tracking Invoker with `undoLast()`) — reviewed and fixed through inline `FIX:` comments (wrong collection choice `Stack`→`Deque`, `offerLast()` used as if it were a retrieval method instead of `pop()`, a typo'd parameter, a redundant field, a couple of dangling half-wired `Button` fields that could never record history). Added a short `Button` vs `RemoteWithHistory` demo to the file's `main()` to make the "same Command objects, two different Invokers, different guarantees" point concrete.
- **Next up:** Resume the TV Remote exercise (framework steps 5+: relationships, then apply Command to the Button/TV design directly), then the remaining framework steps 6-9.
- **Hours logged:** 8.5h tracked (2 earlier sessions predate hour tracking — see Session Log)

---

## Phase 0 — Foundations
- [x] OOP pillars deep dive (interview-depth, not textbook-depth)
- [x] SOLID principles — with violation/fix code examples
- [x] UML class diagram notation (assoc., aggregation, composition, inheritance)
- [ ] The 9-step LLD interview framework (walkthrough + practice on a toy example)
- [~] **Concurrency for LLD** (own dedicated lesson — this is a top SDE2 interview area, gets full treatment, not a footnote):
  - [x] synchronized (instance vs static lock), volatile (visibility ≠ atomicity), thread-safe double-checked-locking Singleton, deadlock via lock ordering, immutability as thread-safety — covered as part of Lesson 1 (encapsulation × concurrency)
  - [ ] Atomic classes (AtomicInteger/AtomicLong/AtomicReference) — lock-free counters
  - [ ] ReentrantLock, ReadWriteLock, tryLock — when to reach for these over `synchronized`
  - [ ] Thread-safe collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue
  - [ ] ExecutorService & thread pools (fixed/cached/scheduled) — how LLD problems model worker pools (e.g. delivery partner matching, notification dispatch)
  - [ ] wait/notify vs CountDownLatch vs Semaphore vs CyclicBarrier — coordination primitives
  - [ ] Producer-consumer pattern, worked example with BlockingQueue
  - [ ] Livelock & starvation (deadlock's lesser-known cousins) — what they are, how to avoid
  - [ ] Interview-question drill: "what if two threads call X concurrently" — practiced on 3+ of our own LLD problems (Parking Lot slot allocation, Rate Limiter, Booking seat-lock)

## Phase 1 — Design Patterns
### Creational
- [ ] Singleton (incl. thread-safe variants)
- [ ] Factory Method
- [ ] Abstract Factory
- [ ] Builder
- [ ] Prototype
### Structural
- [ ] Adapter
- [ ] Decorator
- [ ] Facade
- [ ] Composite
- [ ] Proxy
- [ ] Flyweight
### Behavioral
- [x] Strategy (taught comparatively inside `patterns/command.md` — kid-friendly explanation, when-to-choose criteria, full Java implementation; no standalone `patterns/strategy.md` exists yet)
- [ ] Observer
- [ ] State
- [x] Command
- [ ] Chain of Responsibility
- [ ] Template Method
- [ ] Iterator
- [ ] Mediator
- [ ] Visitor

## Phase 2 — Easy Problems (apply 1–2 patterns each)
- [ ] Parking Lot
- [ ] Vending Machine
- [ ] Traffic Light Control System
- [ ] ATM Machine
- [ ] Library Management System
- [ ] Logging Framework (mini Log4j)

## Phase 3 — Medium Problems
- [ ] LRU Cache (design, not just leetcode)
- [ ] Elevator System
- [ ] Tic-Tac-Toe (+ extensibility to N×N / Connect4)
- [ ] Chess Engine (core move/board model)
- [ ] Rate Limiter (multiple algorithms)
- [ ] Notification System (multi-channel, Observer + Strategy)
- [ ] Car Rental System
- [ ] Movie Ticket Booking (BookMyShow — simplified, single show)

## Phase 4 — Hard / Capstone Problems
- [ ] Splitwise (expense sharing + debt simplification algorithm)
- [ ] Ride-Sharing (Uber/Lyft — matching, pricing, states)
- [ ] Movie/Flight/Hotel Booking System (full — seat locking, concurrency, payment flow)
- [ ] Food Delivery System (Swiggy/Zomato — multi-actor: customer, restaurant, delivery partner)
- [ ] Chat/Messaging System (WhatsApp — 1:1, groups, delivery/read receipts)
- [ ] Distributed Rate Limiter / ID Generator (scale-aware LLD)
- [ ] In-memory File System (S3-like or local FS with directories)
- [ ] Meeting Scheduler (Google Calendar — conflict detection, recurring events)

## Phase 5 — Mock Interviews & Polish
- [ ] Mock 1 — timed 45 min, easy/medium problem, Claude plays interviewer
- [ ] Mock 2 — timed 45 min, hard problem
- [ ] Mock 3 — timed 45 min, hard problem, cold (no hints)
- [ ] Review common mistake patterns across all mocks
- [ ] Build personal 1-page cheat sheet (patterns → problems mapping)

---

## Session Log
_(Append one entry per session — date, phase, hours spent working with Claude this session, what we covered, what needs follow-up. Hours are self-reported at session end — round to the nearest quarter hour.)_

| Date | Phase | Hours | Covered | Notes / Follow-up |
|------|-------|-------|---------|--------------------|
| 2026-08-08 | Phase 0 | — *(untracked)* | Phase 0: OOP pillars (encapsulation, abstraction, inheritance/LSP incl. Stack-extends-Vector & Circle/Ellipse, polymorphism, composition over inheritance/SimUDuck, interface vs abstract class, thread-safety × encapsulation: synchronized/volatile/double-checked locking/deadlock ordering/immutability). Exercise: Bird/Ostrich LSP fix via composition — iterated 4 rounds to a clean compile, runs correctly. JDK 21 (IntelliJ's bundled JBR) added to PATH. | Sparrow-only in demo — Penguin/Duck variants left as optional polish, not blocking. Next: SOLID. |
| 2026-08-09 | Phase 0 | — *(untracked)* | Phase 0: SOLID (S/O/L/I/D, each with violation→fix code; LSP reframed as "what makes OCP safe"; DI-vs-DIP distinction; UnsupportedOperationException as the shared tell for LSP/ISP violations). Exercise: refactor a 5-violation `OrderProcessor` god class — 3 review rounds (signature mismatches, missing `public` on overrides, undefined `Connection` type, non-static inner classes, method-name typos in `main`), final pass fixed directly with inline `FIX:` comments per change, compiles and runs end to end. Both notes formats (plain .md + handwritten artifact) delivered per lesson going forward. | Concurrency checklist expanded into its own full sub-list per user request — synced treatment across tracker + curriculum. Next: UML notation + 9-step framework. |
| 2026-08-09 | Phase 0 | 6.5h | Phase 0: UML class diagram notation — class box notation, 6 relationships ranked weakest→strongest coupling, aggregation-vs-composition lifecycle test, the "UML composition" vs "composition over inheritance" naming-collision trap, multiplicity, PlantUML-compatible text shorthand. Exercise: text-notation diagram for a Library Management System covering inheritance (Person/Member/Librarian), composition (Library/Book), aggregation (Library/Librarian), an association class (Member/Loan/Book), realization (Catalog/Searchable), and dependency (LoanService/NotificationService). | Diagram-sketching skill, not coding — deliberately different muscle than Lessons 1-2. Next: the 9-step LLD interview framework. |
| 2026-08-09 | Phase 0 | — *(untracked)* | Lesson 3 exercise reviewed and corrected: first attempt used aggregation instead of inheritance for Person→Member/Librarian ("kind of" = IS-A), and had the aggregation/composition diamonds swapped on Library↔Book (should be composition — catalog wipeout takes the books with it) and Library↔Librarian (should be aggregation — a librarian survives a transfer). Member/Loan/Book also had a duplicated line with Book↔Loan missing entirely. Corrected diagram with the lifecycle test applied to each relationship, plus the follow-up "why not aggregation" answer, written to solutions/lesson3_uml.md. | The composition/aggregation diamond swap was systematic (backwards on both), not a one-off — worth a quick self-test before Phase 1 to confirm it's actually fixed, not just corrected once. |
| 2026-08-09 | Phase 0 | — *(untracked)* | Lesson 4 (9-step framework) started on a TV Remote toy problem, sketched live in Excalidraw — steps 1-4 (requirements incl. self-identifying a non-functional question, actors, use-case verbs, entities) across 2 revision rounds; reviewed each round like an interviewer (missing `TV`/receiver entity flagged, then added; use cases tightened from a sentence into verbs). Paused mid-exercise, deliberately out of curriculum order, to teach **Lesson 5 — Command pattern**: the `Button`/`TV` design gap in the remote exercise *is* the motivating problem for Command, so taught it using the remote itself as the worked example (Receiver=`TV`, Invoker=`Button`, ConcreteCommand per action). `patterns/command.md` written. | TV Remote exercise still open at framework step 5 (relationships) — resume next session and apply Command directly to the Button/TV design. Two small canvas items still unresolved: exact wording of the concurrency question and one garbled verb, both cut off at the screen edge when reviewed. |
| 2026-08-10 | Phase 1 | 2h | Strategy vs Command taught as a paired lesson inside `patterns/command.md` (kid-friendly explanation, comparison table, when-to-choose lists, full Java implementations for Strategy alone / Command alone / combined). Command's own exercise completed: `solutions/lesson5_command.java` — undo() added to the interface and implemented correctly on the first attempt for TurnOn/TurnOff/VolumeUp; `RemoteWithHistory` written, reviewed, and fixed (Stack→Deque, offerLast() misused as a retrieval call, a typo'd parameter, a redundant field, half-wired Button fields that structurally could never record history). Also produced the plain-white/black-ink handwritten-notes UI change across all three published notes pages. | Strategy checked off the tracker on the strength of this comparative treatment — still no dedicated `patterns/strategy.md` with its own from-scratch exercise; flag if a standalone Strategy problem is wanted later. |

**Total hours logged:** 8.5h *(2 earlier sessions predate hour tracking — see rows above)*
