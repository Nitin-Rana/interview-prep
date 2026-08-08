# Lesson 3 Exercise — Sketch a class diagram for a Library Management System

No code this time — this is the "first 5-10 minutes of the interview, before you write anything"
skill. Use the text shorthand from the lesson (`--|>`, `..|>`, `--*`/`*--`, `--o`/`o--`, `--`/`-->`, `..>`)
plus multiplicities, and **justify each relationship choice in a comment** — that justification is
the actual thing being evaluated, not just picking the "correct" arrow.

## Scenario

- `Person` is a shared base with common attributes (name, id). `Member` and `Librarian` are both
  kinds of `Person` but have different responsibilities.
- A `Library` maintains its own catalog of `Book`s — if the library's catalog were wiped out, those
  book records wouldn't exist independently anywhere else.
- A `Library` employs several `Librarian`s, but a `Librarian` could transfer to a different branch
  without ceasing to exist as an entity in the system.
- A `Member` can borrow many `Book`s over time, and a `Book` can be borrowed by many different
  `Member`s over time (not at once) — model this as its own `Loan` entity capturing which member
  borrowed which book and when, rather than a direct many-to-many.
- Search functionality lives in a separate `Catalog` class (not on `Library` itself — think back to
  Lesson 2's SRP) which implements a `Searchable` interface.
- When a `Loan` becomes overdue, a `LoanService` sends a reminder through a `NotificationService` —
  but `LoanService` doesn't hold onto a `NotificationService` as a field, it's just passed in for
  that one call.

## Your diagram

Write your text-shorthand diagram below, one relationship per line, with a `//` comment on each
line explaining WHY you picked that relationship type (not just what it's called).

```
// TODO: Person / Member / Librarian relationship

// TODO: Library / Book relationship

// TODO: Library / Librarian relationship

// TODO: Member / Loan / Book relationships (with multiplicities)

// TODO: Catalog / Searchable relationship

// TODO: LoanService / NotificationService relationship
```

## Follow-up question to answer after sketching

If someone on the interview panel asked "why isn't `Library`-to-`Book` an aggregation instead of a
composition?" — what's your answer? Write 2-3 sentences.
