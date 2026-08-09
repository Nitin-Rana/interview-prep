# Pattern — Command (Interview Depth)

_Taught mid-way through the TV Remote framework exercise, on purpose — the `Button`/`TV`
gap in that exercise is exactly the problem this pattern solves. Come back to
`solutions/lesson4_tv_remote.md` (or wherever that exercise lives) after this and apply it._

## Intent

Turn "a request" into an object. Instead of a caller directly invoking a method on a
receiver, it invokes `execute()` on a `Command` object that wraps that call — decoupling
*who asks* for an action from *what performs* it, and letting you treat actions as
first-class values: queue them, log them, undo them, bind them to a trigger (like a
button) without that trigger knowing what it does.

## Without the pattern

```java
class Remote {
    private TV tv;

    void pressButton(String buttonId) {
        if (buttonId.equals("power")) {
            tv.togglePower();
        } else if (buttonId.equals("volUp")) {
            tv.volumeUp();
        } else if (buttonId.equals("volDown")) {
            tv.volumeDown();
        } else if (buttonId.equals("youtube")) {
            tv.openApp("YouTube");
        }
        // every new button = another else-if; Remote now knows every TV operation that exists
    }
}
```

`Remote` must be modified for every new button, it knows `TV`'s implementation details,
and there's no way to add "remember the last 5 actions for undo" without further
bloating this one method. Classic OCP violation.

## With the pattern

Four roles: **Command** (the interface), **ConcreteCommand** (one per action, holds a
reference to the receiver), **Receiver** (`TV` — where the real behavior lives),
**Invoker** (`Button` — holds a command, doesn't know what it does).

```java
interface Command {
    void execute();
}

class TV {  // Receiver — all real behavior lives here
    private boolean on = false;
    private int volume = 10;

    void turnOn()  { on = true;  System.out.println("TV on"); }
    void turnOff() { on = false; System.out.println("TV off"); }
    void volumeUp()   { volume++; System.out.println("Volume: " + volume); }
    void volumeDown() { volume--; System.out.println("Volume: " + volume); }
    void openApp(String name) { System.out.println("Opening " + name); }
}

class TurnOnCommand implements Command {
    private final TV tv;
    TurnOnCommand(TV tv) { this.tv = tv; }
    public void execute() { tv.turnOn(); }
}

class VolumeUpCommand implements Command {
    private final TV tv;
    VolumeUpCommand(TV tv) { this.tv = tv; }
    public void execute() { tv.volumeUp(); }
}

class OpenAppCommand implements Command {
    private final TV tv;
    private final String appName;
    OpenAppCommand(TV tv, String appName) { this.tv = tv; this.appName = appName; }
    public void execute() { tv.openApp(appName); }
}

class Button {  // Invoker — knows NOTHING about TV
    private final Command command;
    Button(Command command) { this.command = command; }
    void press() { command.execute(); }
}
```

Wiring:
```java
TV tv = new TV();
Button powerButton = new Button(new TurnOnCommand(tv));
Button volUpButton = new Button(new VolumeUpCommand(tv));
Button youtubeButton = new Button(new OpenAppCommand(tv, "YouTube"));

powerButton.press();   // TV on
volUpButton.press();   // Volume: 11
```

`Remote` disappears as a god-object entirely — it's just a collection of `Button`s.
Adding a new button is a new `Command` class, zero changes to existing code.

## The "why" an interviewer is actually listening for

Naming "Command" isn't the point — explaining what it buys you is:
- **Decoupling invoker from receiver** — `Button` never imports `TV`.
- **Undo/redo becomes trivial** — add `void undo()` to the `Command` interface, each
  concrete command knows how to reverse itself, and a `history: Deque<Command>` on the
  invoker gives you undo for free. Usually the follow-up question.
- **Commands are values** — queue them (job scheduling), log them (audit trail), or
  combine several into a `MacroCommand implements Command` that loops over a
  `List<Command>` — one button press that does several things atomically.

## Command vs. Strategy — the confusion everyone hits

They're structurally identical: an interface with one method, a holder class with a
reference to it, concrete implementations swapped in. So "couldn't this just be
Strategy?" is a fair question, not a naive one — GoF itself flags these two as easy to
conflate. The difference is intent, not shape.

```java
// Strategy — same fixed task, swap the algorithm
interface PaymentStrategy { void pay(double amount); }
class Checkout {
    private PaymentStrategy strategy;
    void checkout(double amt) { strategy.pay(amt); }   // takes a parameter
}

// Command — a specific, fully-bound action, receiver baked in
interface Command { void execute(); }
class Button {
    private Command command;
    void press() { command.execute(); }                 // takes nothing
}
```

**Strategy answers "how should this fixed task be done?"** — the operation itself never
changes (`pay`, `sort`, `compress`), only *which algorithm* performs it. The method
usually takes parameters, because the algorithm needs data to act on. The strategy
object is a reusable, stateless *policy* — one `CreditCardPayment` instance can serve a
thousand different checkouts.

**Command answers "what specific action should happen, to what, and when?"** — not an
interchangeable way to do one task, but a frozen, storable *unit of execution* with
everything already bound in (receiver, action, arguments), so `execute()` typically takes
nothing. `new TurnOnCommand(tv)` isn't "a way of turning on" — it's already "turn on
*this* TV," fully specified, ready to be delayed, repeated, logged, or reversed.

**The test that actually separates them:** would it ever make sense to put these objects
in a list of "things that happened" or "things to do later"? `Queue<Command>` — makes
total sense (job queue, undo history, `MacroCommand` batching). `Queue<PaymentStrategy>`
— nonsensical; a strategy isn't an event or a pending action, it's a plugged-in
algorithm. You'd never "undo a strategy." **If undo, logging, queuing, retrying, or
"execute later" is anywhere near the requirements, that's Command.**

Honest answer to "couldn't you have just used Strategy" for the bare remote (press
button, immediately do the one fixed thing, never undo it): yes, something Strategy-
shaped would technically run correctly. But (1) a `Command` binds its receiver in at
construction, which is fighting Strategy's reusable/generic shape; and (2) the moment
undo shows up — which a remote basically requires (history, last-channel) — `Command`
already has the shape for it (`void undo()`, a `Deque<Command>` history) with zero
refactor, where a Strategy-shaped version would need renaming and restructuring exactly
when the real requirement lands.

**Rule of thumb:** Strategy = one of several interchangeable ways to do a fixed task,
chosen once, used immediately. Command = a specific, storable, possibly-undoable action,
fully bound, that might not run immediately at all.

## Where this shows up beyond the remote

- **Elevator button panel** (Phase 3) — floor buttons are Invokers, the elevator car is
  the Receiver, "go to floor N" is a Command queued and executed in order.
- **Undo/redo in any editor** — the canonical use case; every user action is a Command
  pushed onto a history stack.
- **Job/task queues** — a `Runnable`-like Command submitted to a worker pool is this
  pattern; Java's own `Runnable` interface *is* a Command with one method.
- **Transaction/macro batching** — combine several commands into one atomic unit.

## Self-check

- Name the four roles (Command, ConcreteCommand, Receiver, Invoker) and what each one
  knows/doesn't know.
- Why does the Invoker (`Button`) never reference the Receiver (`TV`) directly?
- How would you add undo to this design — which role gets the new method?
- What's the difference between Command and just passing a `Runnable`/lambda? (Hint:
  when do you actually need the *object*, not just the behavior — undo, logging, queuing.)
- Command and Strategy have identical structure. State the "things that happened or
  things to do later" test in one sentence, and name one concrete requirement (not just
  "it feels different") that would force you to pick one over the other.

## Exercise

Add `RemoteWithHistory` — wraps a list of pressed commands, with an `undoLast()` method
that calls `undo()` on the most recently pressed command. Add `void undo()` to the
`Command` interface and implement it on at least `TurnOnCommand`/`TurnOffCommand` (undo
of "on" is "off" and vice versa).
