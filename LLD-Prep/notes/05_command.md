# Lesson 5 — Command Pattern (Interview Depth)

_Crazy-notes version. Taught mid-way through the TV Remote framework exercise on purpose — the Button/TV design gap in that exercise is exactly the problem this pattern solves. Full depth (roles, worked example, self-check) in [`patterns/command.md`](../patterns/command.md); this is the condensed reference._

## Intent

Turn **"a request" into an object.** Instead of a caller directly invoking a method on a receiver, it invokes `execute()` on a `Command` object that wraps that call — decoupling *who asks* from *what performs*, and making actions first-class values you can queue, log, undo, or bind to a trigger that knows nothing about what it does.

```java
// bad — Remote knows every TV operation; OCP violation, new button = new else-if
void pressButton(String id) {
    if (id.equals("power")) tv.togglePower();
    else if (id.equals("volUp")) tv.volumeUp();
}

// good — four roles: Command (interface), ConcreteCommand (holds Receiver),
// Receiver (TV — real behavior), Invoker (Button — doesn't know what it does)
interface Command { void execute(); }
class TurnOnCommand implements Command {
    private final TV tv;
    TurnOnCommand(TV tv) { this.tv = tv; }
    public void execute() { tv.turnOn(); }
}
class Button {
    private final Command command;
    Button(Command c) { command = c; }
    void press() { command.execute(); }
}
```

## Why it matters (not just naming the pattern)

- **Decoupling invoker from receiver** — `Button` never imports `TV`.
- **Undo/redo becomes trivial** — add `void undo()` to `Command`, each concrete command knows how to reverse itself, a `Deque<Command>` history gives undo for free.
- **Commands are values** — queue them (job scheduling), log them (audit trail), or combine several into a `MacroCommand implements Command` looping over a `List<Command>`.

## Command vs Strategy — the confusion everyone hits

Structurally identical (interface, one method, holder + concrete implementations swapped in). The difference is **intent**, not shape.

```java
// Strategy — same fixed task, swap the algorithm. Reusable, stateless policy.
interface PaymentStrategy { void pay(double amt); }
class Checkout { void checkout(double amt) { strategy.pay(amt); } }  // takes a parameter

// Command — a specific, fully-bound action. Frozen, storable unit of execution.
interface Command { void execute(); }
class Button { void press() { command.execute(); } }  // takes nothing
```

**The test that separates them:** would it ever make sense in a `Queue<...>` of "things that happened or things to do later"? `Queue<Command>` — normal (job queue, undo history). `Queue<PaymentStrategy>` — nonsensical, you'd never "undo a strategy."

**Rule of thumb:** Strategy = one of several interchangeable ways to do a fixed task, chosen once, used immediately. Command = a specific, storable, possibly-undoable action, fully bound, that might not run immediately at all. **If undo, logging, queuing, retrying, or "execute later" is anywhere near the requirements — that's Command.** They can combine: a Command may use a Strategy internally to decide *how* it performs its action.

Kid version: *Strategy = different recipes for cooking the same dish. Command = a written order slip you hand to the kitchen — could be cooked now, later, or cancelled.*

## Where this shows up beyond the remote

- **Elevator button panel** (Phase 3) — floor buttons are Invokers, the car is the Receiver, "go to floor N" is a queued Command.
- **Undo/redo in any editor** — every user action is a Command pushed onto a history stack.
- **Job/task queues** — Java's own `Runnable` *is* a Command with one method.
- **Transaction/macro batching** — combine several commands into one atomic unit.

## Self-check questions

- Name the four roles and what each one knows/doesn't know.
- Why does the Invoker (`Button`) never reference the Receiver (`TV`) directly?
- How would you add undo — which role gets the new method?
- What's the difference between Command and just passing a `Runnable`/lambda?
- State the "things that happened or things to do later" test in one sentence.

## Exercise (done)

Added `undo()` to `Command`, implemented it on `TurnOnCommand`/`TurnOffCommand`/`VolumeUpCommand`, and wrote `RemoteWithHistory` (history-tracking Invoker with `undoLast()`) → [`solutions/lesson5_command.java`](../solutions/lesson5_command.java). Compiles and runs. Reviewed with inline `FIX:` comments per change — wrong collection choice (`Stack`→`Deque`, the same LSP trap as `Stack extends Vector` from Lesson 1), `offerLast()` misused as if it were a retrieval method instead of `pop()`, a typo'd parameter, a redundant field, and a couple of half-wired `Button` fields that structurally could never record history. `main()` also demos `Button` vs `RemoteWithHistory` side by side — same `Command` objects, two different Invokers, only one of them undo-aware.
