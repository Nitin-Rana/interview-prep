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

## Exercise

Add `RemoteWithHistory` — wraps a list of pressed commands, with an `undoLast()` method
that calls `undo()` on the most recently pressed command. Add `void undo()` to the
`Command` interface and implement it on at least `TurnOnCommand`/`TurnOffCommand` (undo
of "on" is "off" and vice versa).
