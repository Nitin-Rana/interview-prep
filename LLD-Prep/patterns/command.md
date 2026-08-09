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

## Strategy vs. Command — explained like you're 10

**Strategy 🎮** — imagine a video game character who can move in different ways: walk,
run, or swim. The character is always doing the same job (moving), but *how* it moves
changes depending on which one you picked.

```java
Character.move(WalkStrategy)  // walks
Character.move(SwimStrategy)  // swims
Character.move(RunStrategy)   // runs
```

You have one job to do, but you can swap out the method for doing it.

**Command 📝** — imagine a TV remote. Each button is a little card that says "do this one
specific thing" — like "turn on the TV" or "turn up the volume." You can press the button
now, save it for later, put it in a queue, or even hit "undo" to take it back.

```java
PowerOnCommand.execute()
VolumeUpCommand.execute()
remote.pressButton(SavedCommand)  // could run it now or later
remote.undo()                     // command remembers how to reverse itself
```

You wrap an action/request into an object so you can pass it around, delay it, queue it,
log it, or undo it.

| | Strategy | Command |
|---|---|---|
| What it wraps | An algorithm or way of doing something | A request or action |
| Question it answers | "Which method should I use to do this?" | "What action should happen, and can I control when/how?" |
| Swappable at | The "how" | The "what" and "when" |
| Supports undo/queue/log? | Not really | Yes, naturally |
| Typical shape | One method, interchangeable implementations | `execute()`, often paired with `undo()` |

Simplest way to remember it: **Strategy = different recipes for cooking the same dish.
Command = a written order slip you hand to the kitchen** — could be cooked now, later, or
cancelled.

### When to choose Strategy

Use it when you have one operation that can be done in multiple interchangeable ways, and
you want to swap the "how" without changing the code that calls it.

- **Sorting** — `sort(list, strategy)` where strategy is QuickSort, BubbleSort, MergeSort.
- **Payment processing** — `checkout(cart, paymentStrategy)` where strategy is CreditCard,
  PayPal, or Crypto.
- **Route planning** (Google Maps) — `getRoute(strategy)` where strategy is Fastest,
  Shortest, or AvoidTolls.
- **Compression** — `compress(file, strategy)` where strategy is ZIP, RAR, or GZIP.
- **Game AI difficulty** — `enemy.attack(strategy)` where strategy is Easy, Medium, Hard.

### When to choose Command

Use it when you need to treat an action as an object — because you want to queue it,
delay it, log it, send it over a network, or undo it.

- **Undo/Redo in a text editor** — `TypeCommand`, `DeleteCommand`, each stores enough
  info to reverse itself.
- **GUI buttons/menus** — every click is a Command object, so the same "Save" logic works
  whether triggered by a button, a keyboard shortcut, or a menu item.
- **Task queues / job systems** — `EmailCommand`, `ResizeImageCommand` pushed into a
  queue, executed later by workers.
- **Remote control / smart home** — `TurnOnLightCommand`, `LockDoorCommand`, sent over
  the network to a device.
- **Transaction logs / macro recording** — record a sequence of commands, replay them
  exactly.

**Quick gut-check:** "Do I just need to swap an algorithm, and I always call it right
away?" → Strategy. "Do I need to store, queue, delay, log, or undo an action?" → Command.
They can even work together: a Command object might internally use a Strategy to decide
*how* to perform its action.

## Implementation examples

### 1. Strategy alone — "different ways to move"

The character always does `move()`, but *how* it moves is swappable.

```java
// The "recipe" all strategies must follow
interface MoveStrategy {
    void move();
}

// Different "recipes" (interchangeable ways of doing the same job)
class WalkStrategy implements MoveStrategy {
    public void move() { System.out.println("Walking step by step"); }
}
class SwimStrategy implements MoveStrategy {
    public void move() { System.out.println("Swimming through water"); }
}
class FlyStrategy implements MoveStrategy {
    public void move() { System.out.println("Flying through the sky"); }
}

// The character HOLDS a strategy and just calls it
class Character {
    private MoveStrategy moveStrategy;
    Character(MoveStrategy moveStrategy) { this.moveStrategy = moveStrategy; }
    void setMoveStrategy(MoveStrategy moveStrategy) { this.moveStrategy = moveStrategy; }
    void move() { moveStrategy.move(); }  // doesn't care HOW, just delegates
}

public class StrategyDemo {
    public static void main(String[] args) {
        Character hero = new Character(new WalkStrategy());
        hero.move();                             // Walking step by step
        hero.setMoveStrategy(new SwimStrategy());
        hero.move();                             // Swimming through water
        hero.setMoveStrategy(new FlyStrategy());
        hero.move();                             // Flying through the sky
    }
}
```

Kid explanation: the character is always "moving," but you can hand it a different
move-card (walk, swim, fly) and it does that instead. Same job, different method.

### 2. Command alone — "order slips you can save, queue, or undo"

Each remote button is an order slip that says "do this exact thing," and it remembers
how to undo itself.

```java
interface Command {
    void execute();
    void undo();
}

class Light {  // Receiver
    void turnOn()  { System.out.println("Light is ON"); }
    void turnOff() { System.out.println("Light is OFF"); }
}

class TurnOnCommand implements Command {
    private final Light light;
    TurnOnCommand(Light light) { this.light = light; }
    public void execute() { light.turnOn(); }
    public void undo()    { light.turnOff(); }  // opposite action
}
class TurnOffCommand implements Command {
    private final Light light;
    TurnOffCommand(Light light) { this.light = light; }
    public void execute() { light.turnOff(); }
    public void undo()    { light.turnOn(); }
}

class RemoteControl {  // Invoker — doesn't know what the button does
    private Command lastCommand;
    void pressButton(Command command) {
        command.execute();
        lastCommand = command;  // remember it so we can undo later
    }
    void pressUndo() {
        if (lastCommand != null) lastCommand.undo();
    }
}

public class CommandDemo {
    public static void main(String[] args) {
        Light light = new Light();
        RemoteControl remote = new RemoteControl();

        remote.pressButton(new TurnOnCommand(light));   // Light is ON
        remote.pressUndo();                             // Light is OFF (undo)
        remote.pressButton(new TurnOffCommand(light));  // Light is OFF
        remote.pressUndo();                             // Light is ON (undo)
    }
}
```

Kid explanation: the remote button doesn't know what "turning on a light" even means —
it just presses an order slip. The order slip knows how to do the thing and how to
undo it.

### 3. Strategy + Command together — a remote-controlled robot

A Command ("Move the robot") that internally uses a Strategy to decide *how* to move.
This combo is common in the real world — e.g. a "Save" command that uses different save
strategies (local disk vs. cloud).

```java
// ---- Strategy part: HOW the robot moves ----
interface MoveStrategy {
    void move();
}
class WalkStrategy implements MoveStrategy {
    public void move() { System.out.println("Robot walks"); }
}
class SwimStrategy implements MoveStrategy {
    public void move() { System.out.println("Robot swims"); }
}

// ---- Receiver: actually does things ----
class Robot {
    private MoveStrategy moveStrategy;
    Robot(MoveStrategy moveStrategy) { this.moveStrategy = moveStrategy; }
    void setMoveStrategy(MoveStrategy moveStrategy) { this.moveStrategy = moveStrategy; }
    void performMove() { moveStrategy.move(); }
}

// ---- Command part: WHAT action, queueable/undoable ----
interface Command {
    void execute();
}
class MoveCommand implements Command {
    private final Robot robot;
    MoveCommand(Robot robot) { this.robot = robot; }
    public void execute() { robot.performMove(); }  // delegates to whatever strategy is set
}

// ---- Invoker: fires commands, doesn't care about strategies ----
class RemoteControl {
    void pressButton(Command command) { command.execute(); }
}

public class CombinedDemo {
    public static void main(String[] args) {
        Robot robot = new Robot(new WalkStrategy());
        RemoteControl remote = new RemoteControl();
        Command moveCommand = new MoveCommand(robot);

        remote.pressButton(moveCommand);          // Robot walks

        // Switch HOW the robot moves — the command itself doesn't change!
        robot.setMoveStrategy(new SwimStrategy());
        remote.pressButton(moveCommand);          // Robot swims
    }
}
```

Kid explanation: the remote button ("Move!") is the Command — it's the order slip. How
the robot actually moves (walking vs. swimming) is the Strategy — the recipe card inside
the robot. You can press the same "Move" button, but if you swap the robot's recipe card
first, the same button now does something different. That's the real-world split:
**Command decides when/whether something happens** (and can undo/queue it); **Strategy
decides how it happens once it does.**

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
