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

## Diagram

```
// Person / Member / Librarian — "kind of" in the scenario is the IS-A trigger word.
// This is inheritance, not aggregation: Member and Librarian extend the full
// behavioral contract of Person, they don't just hold a reference to one.
Member --|> Person
Librarian --|> Person

// Library / Book — composition. The scenario states the test directly: if the
// library's catalog were wiped out, the book records wouldn't exist independently
// anywhere else. Lifecycle of the part (Book) is bound to the whole (Library) —
// that's the composition test passing, so it's the filled diamond, not aggregation.
Library "1" *-- "*" Book

// Library / Librarian — aggregation, the mirror case of the one above. A Librarian
// can transfer to a different branch and keep existing as the same entity, so its
// lifecycle does NOT depend on this particular Library — weak ownership, hollow diamond.
Library "1" o-- "*" Librarian

// Member / Loan and Book / Loan — plain association, not aggregation. A Loan is an
// independent transaction record that references which Member borrowed which Book;
// neither Member nor Book "owns" the Loan's lifecycle the way Library owns a Book's,
// so there's no aggregation/composition ownership relationship here, just two
// stored references. This is also what turns the Member-Book many-to-many into two
// clean one-to-many associations through Loan.
Member "1" -- "*" Loan
Book "1" -- "*" Loan

// Catalog / Searchable — realization: Catalog implements the Searchable interface.
Catalog ..|> Searchable

// LoanService / NotificationService — dependency: passed in for the one overdue-
// reminder call, never stored as a field, so it's the weakest coupling on the
// scale (dashed open arrow), not a stored association.
LoanService ..> NotificationService
```

## Follow-up question

If someone on the interview panel asked "why isn't `Library`-to-`Book` an aggregation instead of a
composition?" — what's your answer?

Because the scenario explicitly fails the aggregation test: aggregation means the part can outlive
the whole and still make sense on its own (like a `Player` transferring off a `Team`), but here
wiping out the library's catalog wipes out the book records with it — there's nowhere else for them
to keep existing. That's strong, lifecycle-bound ownership, which is exactly what the filled-diamond
composition relationship means. If a `Book` could plausibly move to a different library's catalog
and keep being the same book record, aggregation would be the right call instead — that's not the
case in this scenario.

---

_First attempt mixed up two things worth naming explicitly, since both are common interview tells:_
_(1) used aggregation for Person→Member/Librarian instead of inheritance — "kind of" in a prompt is_
_always the IS-A signal; (2) had the aggregation/composition diamonds swapped on Library↔Book and_
_Library↔Librarian (hollow = weak/survives, filled = strong/doesn't) — corrected above with the test_
_applied to each one explicitly rather than just flipping the arrows._
