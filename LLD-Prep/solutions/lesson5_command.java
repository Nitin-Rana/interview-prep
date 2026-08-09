/*
 * Lesson 5 Exercise — Command pattern: add undo + a history-tracking remote
 *
 * (see patterns/command.md for the full lesson this builds on)
 *
 * Requirements:
 *  - Add `void undo()` to the Command interface.
 *  - Implement undo() on at least TurnOnCommand/TurnOffCommand — undo of "on" is "off"
 *    and vice versa.
 *  - Add a new RemoteWithHistory class that wraps a list of pressed commands and
 *    exposes undoLast(), which calls undo() on the most recently pressed command.
 *
 * Write your solution below. Think about:
 *  - Where does the history live — on the Invoker, or somewhere else?
 *  - What data structure fits "give me back the last thing that happened"?
 *  - What should undoLast() do if nothing has been pressed yet?
 */

import java.util.ArrayDeque;
import java.util.Deque;
// FIX: added — Deque/ArrayDeque aren't imported by default, needed for the history below.

interface Command {
    void execute();
    void undo();
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
    public void undo() { tv.turnOff(); }  // correct — undo of "on" is "off"
}

class TurnOffCommand implements Command {
    private final TV tv;
    TurnOffCommand(TV tv) { this.tv = tv; }
    public void execute() { tv.turnOff(); }
    public void undo() { tv.turnOn(); }  // correct — undo of "off" is "on"
}

class VolumeUpCommand implements Command {
    private final TV tv;
    VolumeUpCommand(TV tv) { this.tv = tv; }
    public void execute() { tv.volumeUp(); }
    public void undo() { tv.volumeDown(); }  // correct — the optional stretch, done right
}

class Button {  // Invoker — knows NOTHING about TV
    private final Command command;
    Button(Command command) { this.command = command; }
    void press() { command.execute(); }
}

class RemoteWithHistory {
    // FIX: dropped the volUp/turnOn/turnOff Button fields that were here. Two separate bugs
    // were tangled together:
    //   1) `new VolumeUpCommand()` / `new TurnOnCommand()` called those constructors with no
    //      TV — every ConcreteCommand requires a receiver, so this couldn't compile.
    //   2) Even with a TV threaded in, pressing one of those Buttons calls command.execute()
    //      directly (see Button.press() above) — it never goes through THIS class's
    //      pressButton(), so it would never land in history. Two invokers wired to the same
    //      commands, only one of them undo-aware.
    //   RemoteWithHistory doesn't need to hold Buttons or a TV at all — every Command already
    //   carries its own receiver (that's the point of binding it in at construction; see the
    //   "fully bound" discussion in patterns/command.md). This class's only job is to remember
    //   what was pressed.

    // FIX: java.util.Stack extends Vector — the exact LSP trap from the Lesson 1 Bird/Ostrich
    // exercise (legacy, synchronized, and Vector's index-based methods let you violate stack
    // discipline through the same reference). Deque is the modern idiomatic stack in Java —
    // push()/pop() give the same LIFO behavior with none of that baggage.
    private final Deque<Command> history = new ArrayDeque<>();

    void pressButton(Command command) {  // FIX: "commmand" typo in the parameter — the body
                                          // used the correct spelling, so this didn't compile
        command.execute();
        history.push(command);  // FIX: no separate `lastCommand` field needed — the history
                                 // deque already IS the record of the last (and every prior)
                                 // command; a redundant field is just one more thing to keep
                                 // in sync and get wrong
    }

    void undoLast() {  // FIX: renamed from pressUndo() — the exercise spec asked for
                        // undoLast() specifically
        if (history.isEmpty()) {
            System.out.println("There is nothing to undo.");
        } else {
            Command lastCommand = history.pop();  // FIX: offerLast() is an insertion method
                                                    // (adds to the tail, returns boolean) — it
                                                    // can't retrieve anything. pop() removes and
                                                    // returns the most recently pushed command,
                                                    // exactly "the last thing pressed".
            lastCommand.undo();  // FIX: Command declares undo(), not pressUndo() — that method
                                  // doesn't exist on the interface, so this couldn't compile
        }
    }
}

public class lesson5_command {

    public static void main(String[] args) {
        TV tv = new TV();

        // Button is the plain Invoker from the main lesson (command.md) — press it, the
        // bound Command fires, done. It never appears in RemoteWithHistory because it CAN'T:
        // Button.press() calls command.execute() directly with no hook to record anything,
        // so a Button press can never be undone. It's the right tool when you truly never
        // need undo/queue/log (a light switch); RemoteWithHistory is the right tool the
        // moment you do. Same Command objects, two different Invokers, different guarantees.
        Button power = new Button(new TurnOnCommand(tv));
        power.press();  // TV on — and now permanently un-undoable through this Button

        RemoteWithHistory remote = new RemoteWithHistory();

        // FIX: RemoteWithHistory has no execute() method — pressButton() is what records
        // history, so that's what the demo needs to drive.
        remote.pressButton(new TurnOnCommand(tv));    // TV on
        remote.pressButton(new VolumeUpCommand(tv));  // Volume: 11
        remote.pressButton(new VolumeUpCommand(tv));  // Volume: 12

        remote.undoLast();  // pops 2nd VolumeUpCommand -> Volume: 11
        remote.undoLast();  // pops 1st VolumeUpCommand -> Volume: 10
        remote.undoLast();  // pops TurnOnCommand        -> TV off
        remote.undoLast();  // history empty -> exercises your own "nothing to undo" branch
    }
}
