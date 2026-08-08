# Lesson 2 — SOLID Principles (Interview Depth)

_Crazy-notes version. SOLID is one idea — control coupling to control the blast radius of change — viewed from five angles. Interviewers show you a class and ask "what's wrong," expecting you to name the violated principle live, not recite definitions._

## S — Single Responsibility Principle

**Not** "a class should do one thing" — too vague, every god-class claims that. Precise version (Uncle Bob's later clarification): **a class should have one reason to change — one actor/stakeholder it answers to.**

```java
// violates SRP — 3 different stakeholders (finance, ops, product) can force a change
class Order {
    double calculateTotal() { ... }
    void saveToDatabase() { ... }
    void printInvoice() { ... }
}
// fix: split by actor
class Order { double calculateTotal() { ... } }
class OrderRepository { void save(Order o) { ... } }
class InvoicePrinter { void print(Order o) { ... } }
```
Trap: don't over-apply into 40 one-method classes. The test is "who forces the change," not "how few lines."

## O — Open/Closed Principle

**Open for extension, closed for modification** — add new behavior without editing existing, tested code. Achieved almost entirely via the Lesson-1 rule: **replace type-checks with polymorphism.**

```java
// violates OCP — new customer type means editing this method again
double applyDiscount(Customer c, double amt) {
    if (c.getType()==REGULAR) return amt;
    if (c.getType()==PREMIUM) return amt*0.9;
}
// fix — new type = new class, zero edits to existing code
interface DiscountStrategy { double apply(double amt); }
class VipDiscount implements DiscountStrategy { public double apply(double amt){ return amt*0.8; } }
```
Honest caveat: you can't be closed to modification everywhere forever. OCP = correctly predicting **where** variation happens and sealing that seam with an abstraction. Guessing wrong seams is over-engineering — a real, unsolved tension, worth saying out loud in an interview.

## L — Liskov Substitution Principle

Full depth already in [01_oop_pillars.md](01_oop_pillars.md) (Ostrich, Rectangle/Square, `Stack extends Vector`, Circle/Ellipse, formal contract: no strengthened preconditions, no weakened postconditions, no violated invariants).

**New frame**: LSP is what makes OCP *safe*. OCP says "extend via new subclasses without touching existing code"; LSP guarantees those new subclasses won't silently break callers using the base type. The two are load-bearing for each other.

## I — Interface Segregation Principle

**No client should be forced to depend on methods it doesn't use.** LSP's sibling smell: LSP = behavior contract breaks; ISP = **fat interfaces** force irrelevant methods onto implementers.

```java
// violates ISP
interface Worker { void work(); void eat(); }
class Robot implements Worker {
    public void work() { ... }
    public void eat() { throw new UnsupportedOperationException(); } // Ostrich again
}
// fix — segregate by capability
interface Workable { void work(); }
interface Eatable { void eat(); }
class Robot implements Workable { ... }  // never forced to implement eat()
```
**`UnsupportedOperationException` is the universal tell for both LSP and ISP violations.** If you write it, ask: is a subclass breaking a behavioral contract (LSP), or is an interface bundling unrelated capabilities (ISP)?

## D — Dependency Inversion Principle

**High-level modules shouldn't depend on low-level modules — both depend on abstractions.**

```java
// violates DIP — high-level policy hard-wired to a low-level detail
class NotificationService {
    private EmailSender sender = new EmailSender();
    void notify(String msg) { sender.sendEmail(msg); }
}
// fix — both depend on an abstraction, wired from outside
interface MessageSender { void send(String msg); }
class NotificationService {
    private final MessageSender sender;
    NotificationService(MessageSender sender) { this.sender = sender; } // constructor injection
    void notify(String msg) { sender.send(msg); }
}
```
**Know this distinction cold**: *Dependency Injection* (constructor/setter injection, or a framework/IoC container like Spring) is a **technique**. *Dependency Inversion* is the **principle** that technique serves. No framework needed to satisfy DIP in an LLD interview — manual constructor injection is enough.

---

## The throughline

O, L, and I are three faces of "depend on abstractions, not concrete branching / fat contracts." D makes that dependency direction explicit and swappable. This is the on-ramp into Phase 1: Strategy is OCP made concrete; Factory/Builder exist partly to keep DIP-compliant code from scattering `new ConcreteClass()` everywhere.

## Self-check questions
- Can you state the "one reason to change" version of SRP, not the "one thing" version?
- Given a class, can you say which stakeholder/actor would force each method to change?
- Can you explain why LSP is what makes OCP *safe* rather than just "another rule"?
- Do you know the ISP vs LSP distinction when you see `UnsupportedOperationException`?
- Can you state the DI vs DIP distinction without hedging?

## Exercise (done)
Refactored a smelly `OrderProcessor` class that violates all 5 principles simultaneously → [`solutions/lesson2_solid.java`](../solutions/lesson2_solid.java). Compiles and runs. Every class in that file carries a detailed comment explaining exactly which principle(s) it protects and which original violation it fixes — worth re-reading as a worked reference before mocks, especially the "composition root" note on `main()` (why `new`-ing concrete classes there doesn't violate DIP).
