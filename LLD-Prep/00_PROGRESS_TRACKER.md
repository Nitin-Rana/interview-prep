# LLD Prep — Progress Tracker

> **Read this file first at the start of every session.** It tells you (Claude) and the student exactly where things stand. Update it at the END of every session — check off what was completed, update "Current Status", and set "Next Up".

**Student profile:** SDE2, 2.5–3 YOE, targeting SDE2 interviews. Language: **Java**. Pace: weekends/irregular — no fixed daily schedule, progress is checklist-driven, not date-driven.

**Full syllabus:** see [01_CURRICULUM.md](01_CURRICULUM.md)
**Interview approach we drill every problem with:** see [02_INTERVIEW_FRAMEWORK.md](02_INTERVIEW_FRAMEWORK.md)

---

## Current Status

- **Phase:** Phase 0 — Foundations
- **Last session:** SOLID deep dive done (S/O/L/I/D with violation→fix code, the "OCP+LSP+ISP → depend on abstractions, DIP formalizes it" throughline) + exercise (`OrderProcessor` refactor hitting all 5 violations) completed across 3 review rounds, compiles and runs. Notes saved to notes/02_solid.md + handwritten notes/02_solid_handwritten.html.
- **Next up:** UML class diagram notation (assoc., aggregation, composition, inheritance)

---

## Phase 0 — Foundations
- [x] OOP pillars deep dive (interview-depth, not textbook-depth)
- [x] SOLID principles — with violation/fix code examples
- [ ] UML class diagram notation (assoc., aggregation, composition, inheritance)
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
- [ ] Strategy
- [ ] Observer
- [ ] State
- [ ] Command
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
_(Append one entry per session — date, what we covered, what needs follow-up)_

| Date | Covered | Notes / Follow-up |
|------|---------|--------------------|
| 2026-08-08 | Phase 0: OOP pillars (encapsulation, abstraction, inheritance/LSP incl. Stack-extends-Vector & Circle/Ellipse, polymorphism, composition over inheritance/SimUDuck, interface vs abstract class, thread-safety × encapsulation: synchronized/volatile/double-checked locking/deadlock ordering/immutability). Exercise: Bird/Ostrich LSP fix via composition — iterated 4 rounds to a clean compile, runs correctly. JDK 21 (IntelliJ's bundled JBR) added to PATH. | Sparrow-only in demo — Penguin/Duck variants left as optional polish, not blocking. Next: SOLID. |
| 2026-08-09 | Phase 0: SOLID (S/O/L/I/D, each with violation→fix code; LSP reframed as "what makes OCP safe"; DI-vs-DIP distinction; UnsupportedOperationException as the shared tell for LSP/ISP violations). Exercise: refactor a 5-violation `OrderProcessor` god class — 3 review rounds (signature mismatches, missing `public` on overrides, undefined `Connection` type, non-static inner classes, method-name typos in `main`), final pass fixed directly with inline `FIX:` comments per change, compiles and runs end to end. Both notes formats (plain .md + handwritten artifact) delivered per lesson going forward. | Concurrency checklist expanded into its own full sub-list per user request — synced treatment across tracker + curriculum. Next: UML notation + 9-step framework. |
