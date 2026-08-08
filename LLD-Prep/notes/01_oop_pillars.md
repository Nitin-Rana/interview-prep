# Lesson 1 — OOP Pillars (Interview Depth)

_Crazy-notes version. Reference this before any mock interview — these are the exact traps interviewers probe for._

## 1. Encapsulation

**Not** "private fields + getters/setters." **Is**: protecting an object's invariants by controlling how its state can change.

- Getters/setters that expose raw state with no validation ≠ encapsulation. `setBalance(-500)` succeeding is a broken invariant.
- **"Tell, Don't Ask"**: don't pull state out and decide externally (`if (acct.getBalance() >= amt) acct.setBalance(...)`) — tell the object what you want (`acct.withdraw(amt)`) and let it enforce its own rules. Lots of getters feeding external `if` logic = design smell.
- **Defensive copying**: never return a direct reference to mutable internal state (`List`, custom mutable objects). Return `List.copyOf(...)` or an unmodifiable view, or expose only intent-revealing methods (`addSeat`, `getAvailableSeats`) instead of the raw collection.

```java
// bad
class BankAccount {
    private double balance;
    public void setBalance(double b) { balance = b; } // no invariant protection
}

// good
class BankAccount {
    private double balance;
    public void deposit(double amt) {
        if (amt <= 0) throw new IllegalArgumentException();
        balance += amt;
    }
    public void withdraw(double amt) {
        if (amt <= 0 || amt > balance) throw new IllegalArgumentException();
        balance -= amt;
    }
}
```

## 2. Abstraction

- **Encapsulation** = hiding *state*, within one class (implementation-level).
- **Abstraction** = hiding *complexity*, across classes, by exposing only relevant behavior via a simpler interface (design-level).
- These two get conflated constantly — know the distinction cold, common interview probe.
- In LLD: mainly means **program to an interface, not an implementation**.

```java
interface PaymentStrategy { void pay(double amount); }
class CreditCardPayment implements PaymentStrategy { ... }
class UpiPayment implements PaymentStrategy { ... }

class Checkout {
    private PaymentStrategy strategy; // depends on abstraction
    void checkout(double amt) { strategy.pay(amt); }
}
```
`Checkout` never changes when a new payment method is added. This is the seed of the **Strategy pattern** and **Dependency Inversion Principle** (SOLID "D") — same shape, will reappear constantly.

Trap in the other direction: **premature abstraction** — an interface with exactly one implementation and no planned variation is over-engineering (YAGNI). But in an *LLD interview*, extensibility is usually explicitly being tested, so erring toward interfaces at natural variation points is usually correct there even if production code would think twice.

## 3. Inheritance

Models **IS-A** — a heavier commitment than it looks: subclass inherits the *entire behavioral contract*, must honor it everywhere it's substituted.

**Liskov Substitution Principle (LSP)**: anywhere `Base b` is used, substituting any subclass must not break correctness.

Two canonical violations to know cold:
- **Ostrich/Bird**: `Ostrich extends Bird` where `Bird.fly()` exists, but `Ostrich.fly()` throws. Syntactically IS-A, behaviorally broken.
- **Rectangle/Square**:
```java
class Rectangle {
    protected int width, height;
    void setWidth(int w) { width = w; }
    void setHeight(int h) { height = h; }
    int area() { return width * height; }
}
class Square extends Rectangle {
    void setWidth(int w) { width = w; height = w; }
    void setHeight(int h) { width = h; height = h; }
}
// resize(Rectangle r) { r.setWidth(5); r.setHeight(10); assert r.area()==50; } fails for Square (100)
```
Mathematically square IS-A rectangle; behaviorally, `Square` changed the contract of `setWidth`/`setHeight`. **"IS-A in English" is not sufficient justification for `extends`** — need "IS-A in behavioral contract."

Other things to know:
- **Fragile base class problem**: changing a base class can silently break distant subclasses; deep inheritance chains make it worse — real reason production code favors composition.
- **Java**: no multiple inheritance of classes (avoids diamond problem), but multiple interface implementation is allowed. Java 8+ `default` methods can reintroduce a diamond-ish conflict — implementing class must override if two defaults collide. Rarely deep-dived in LLD rounds, but know it exists.
- Inheritance is the *right* choice when: subclasses are a **closed, small set**, share **genuine implementation**, and every subclass can honestly substitute for the base with no surprises. Template Method pattern (Phase 1) is built around "safe" inheritance use.

## 4. Polymorphism

- **Runtime polymorphism** (overriding/dynamic dispatch) is what matters for LLD.
- **Compile-time** (overloading) is mostly Java syntax, rarely load-bearing in design discussions.
- Mechanically: dispatch resolves against the object's *runtime* type, not the variable's *declared* type.

**The rule to apply directly**: if you're writing `if/else` or `switch` on an object's *type* to decide behavior, that's a sign you want polymorphism instead.

```java
// smell
void notify(User u) {
    if (u.getType() == UserType.PREMIUM) sendPriorityEmail(u);
    else sendRegularEmail(u);
}
// polymorphic: User holds a NotificationBehavior reference, delegates instead of branching
```

Every behavioral pattern in Phase 1 (Strategy, State, Observer, Command...) is fundamentally "replace a type-check with polymorphism." This one rule turns Phase 1 into pattern-*spotting* rather than pattern-memorizing.

## 5. Composition over Inheritance

- **IS-A** (inheritance) vs **HAS-A + delegation** (composition).
- The formal fix to Ostrich/Rectangle-Square problems.
- Canonical example: **SimUDuck** (*Head First Design Patterns* — worth knowing by name, interviewers sometimes reference it):

```java
interface FlyBehavior { void fly(); }
class FlyWithWings implements FlyBehavior { public void fly() {...} }
class CannotFly implements FlyBehavior { public void fly() {...} }

abstract class Duck {
    protected FlyBehavior flyBehavior; // Duck HAS-A FlyBehavior
    void performFly() { flyBehavior.fly(); }
}
class MallardDuck extends Duck { MallardDuck(){ flyBehavior = new FlyWithWings(); } }
class RubberDuck extends Duck { RubberDuck(){ flyBehavior = new CannotFly(); } }
```

Benefits over inheritance: behavior varies without touching the hierarchy, no subclass forced to implement something it can't honor, and behavior can even be swapped **at runtime** (`duck.setFlyBehavior(...)`) — inheritance can never do that since a class's parent is fixed at compile time.

**Rule of thumb for interviews**: "favor composition over inheritance" ≠ never use inheritance. Use inheritance only when the IS-A relationship is behaviorally airtight; reach for composition whenever behavior varies across instances or might vary later.

## 6. Interface vs Abstract Class

| | Interface | Abstract class |
|---|---|---|
| Relationship | "can do" (capability/contract) | "is a" (shared identity + implementation) |
| State | No instance state (constants only) | Can hold instance state |
| Implementation | Java 8+ `default` methods, no constructors | Full method implementations + constructors |
| Multiple inheritance | A class can implement many | A class can extend only one |
| Use when | Unrelated classes share a capability (`Comparable`, `Flyable`) | Closely related classes share real, non-trivial implementation |

**Heuristic**: default to interfaces. Reach for an abstract class only when you catch yourself about to copy-paste the same method body into multiple sibling classes — that duplicated implementation is the real justification, not the "is-a" label alone.

---

## Self-check questions (use before mocks)
- Can you explain the difference between encapsulation and abstraction in one sentence each?
- Can you name and explain both canonical LSP violations from memory?
- Given a class with an `if/else` on `.getType()`, can you redesign it polymorphically in under 2 minutes?
- Can you state the interface-vs-abstract-class heuristic without the table?

## Exercise (pending)
Fix the Bird/Ostrich LSP violation: `Bird` has `name` + `eat()` shared by all; some birds fly (not all), some swim (not all), some do both. Design so adding a new bird type never requires modifying existing classes. → `solutions/lesson1_bird.java`
