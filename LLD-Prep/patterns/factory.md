# Pattern — Factory (Interview Depth)

_First creational pattern. The single most misused word in LLD interviews: "factory" names
**three different things**, and candidates who use it as one blurry term get found out
immediately. Knowing which one you mean — and why — is most of the value here._

## The problem all three solve

`new ConcreteClass()` is a hard dependency. The moment a class calls `new`, it is welded
to that exact type — you can't swap it, subclass it, mock it in a test, or choose it from
config. This is exactly the DIP violation from [Lesson 2](../notes/02_solid.md): high-level
policy reaching down and naming a low-level detail.

You can't eliminate `new` — someone must call it. Factories **relocate** it: pull every
`new` into one place that exists specifically to make that decision, so the rest of the
code depends only on abstractions.

> Corollary worth saying out loud in an interview: `new` in a **composition root**
> (`main()`, a config class, a Spring `@Configuration`) is not a DIP violation. Wiring code
> is *supposed* to know concrete types. DIP is about business logic not naming them.

## Without the pattern

```java
class NotificationService {
    void send(String type, String msg) {
        if (type.equals("email")) {
            EmailSender s = new EmailSender();       // welded to a concrete class
            s.connectSmtp(); s.send(msg);
        } else if (type.equals("sms")) {
            SmsSender s = new SmsSender();
            s.authenticate(); s.send(msg);
        }
        // and this same if/else is duplicated in ReportMailer, AlertService, ...
    }
}
```

Three separate problems: the construction logic (`connectSmtp()`, `authenticate()`) leaks
into business code; new channel = edit this method (OCP); and the same branch gets
copy-pasted everywhere a sender is needed.

---

## 1. Simple Factory — *not* a GoF pattern

An idiom, not one of the 23. One class, usually one static method, owning the `switch`.

```java
class SenderFactory {
    static Sender create(ChannelType type) {
        switch (type) {
            case EMAIL: return new EmailSender();
            case SMS:   return new SmsSender();
            case PUSH:  return new PushSender();
            default: throw new IllegalArgumentException("Unknown channel: " + type);
        }
    }
}

// callers now depend only on Sender
Sender sender = SenderFactory.create(type);
sender.send(msg);
```

**Be honest about what this does and doesn't fix.** It does *not* satisfy OCP — a new
channel still means editing that `switch`. What it buys you is that the violation now
lives in **exactly one place** instead of smeared across every caller, and business code
depends on `Sender` instead of `EmailSender`. That's a real, defensible improvement, and
for most interview problems it's the right amount of machinery.

Saying *"this is a simple factory, technically not GoF, and it still violates OCP — but it
centralizes the violation"* is a strong signal. Claiming it's OCP-clean is a weak one.

### Making it actually OCP-clean: the registry

The senior version. Replace the `switch` with a map of constructors:

```java
class SenderFactory {
    private final Map<ChannelType, Supplier<Sender>> registry = new EnumMap<>(ChannelType.class);

    void register(ChannelType type, Supplier<Sender> ctor) { registry.put(type, ctor); }

    Sender create(ChannelType type) {
        Supplier<Sender> ctor = registry.get(type);
        if (ctor == null) throw new IllegalArgumentException("Unknown channel: " + type);
        return ctor.get();
    }
}

factory.register(ChannelType.EMAIL, EmailSender::new);
factory.register(ChannelType.SMS,   SmsSender::new);
// new channel = one more register() call at the composition root, zero edits inside the factory
```

`Supplier<Sender>` + method reference (`EmailSender::new`) is idiomatic modern Java and
gets you genuine OCP. Reach for this when the set of types is open-ended or plugin-like.

---

## 2. Factory Method — the GoF one

**Intent:** define an interface for creating an object, but let *subclasses* decide which
class to instantiate. Creation is deferred down the inheritance hierarchy.

The critical structural detail everyone misses: **the creator class has real business
logic that consumes the product.** It is not a class whose only job is to create.

```java
abstract class Dialog {
    abstract Button createButton();          // the factory method — subclass decides

    void render() {                          // business logic, identical for all subclasses
        Button button = createButton();
        button.onClick(this::close);
        button.render();
    }
    void close() { System.out.println("Dialog closed"); }
}

class WindowsDialog extends Dialog {
    Button createButton() { return new WindowsButton(); }
}
class WebDialog extends Dialog {
    Button createButton() { return new HtmlButton(); }
}
```

`render()` is written once against the `Button` abstraction. Each subclass supplies the
concrete product. Adding `MacDialog` touches nothing that already exists — genuine OCP,
achieved through inheritance rather than a map.

**The tell that you actually want Factory Method:** you have a class with a fixed algorithm
that needs to create a collaborator, and the *only* thing varying across subclasses is
which collaborator. If your subclass has one method and it's the factory method, you don't
have a Factory Method — you have a `Supplier<T>` with extra ceremony.

**In the JDK:** `Collection.iterator()` is a textbook Factory Method — every collection
subclass returns its own `Iterator` implementation, while all the code in
`AbstractCollection` (`contains`, `toString`, …) is written against the `Iterator`
interface. Worth citing; it also pre-builds the Iterator pattern.

---

## 3. Abstract Factory

**Intent:** create *families* of related objects without naming their concrete classes,
and guarantee the pieces you get are **mutually compatible**.

The guarantee is the entire point. Not "creating several things" — preventing an
incompatible mix.

```java
interface NotificationFactory {          // the family
    Formatter createFormatter();
    Sender    createSender();
}

class EmailFactory implements NotificationFactory {
    public Formatter createFormatter() { return new HtmlFormatter(); }     // rich HTML ok
    public Sender    createSender()    { return new SmtpSender(); }
}

class SmsFactory implements NotificationFactory {
    public Formatter createFormatter() { return new PlainTextFormatter(); } // 160 chars, no HTML
    public Sender    createSender()    { return new SmsGatewaySender(); }
}

class NotificationService {
    private final Formatter formatter;
    private final Sender sender;

    NotificationService(NotificationFactory factory) {   // one family, chosen once
        this.formatter = factory.createFormatter();
        this.sender    = factory.createSender();
    }
    void notify(String raw) { sender.send(formatter.format(raw)); }
}
```

Handing `NotificationService` an `HtmlFormatter` with an `SmsGatewaySender` is a real bug —
HTML down an SMS gateway. With two independent simple factories, nothing stops it. With
Abstract Factory, that combination is **unconstructible**. That's the sentence to say.

### Abstract Factory's real cost — cite this, it shows depth

It is open for extension along one axis and **closed along the other**:

- **New family** (add `PushFactory`) — trivial, one new class, nothing else changes. ✅
- **New product in the family** (add `createRetryPolicy()`) — you must edit the interface
  **and every existing implementation**. ❌

So Abstract Factory is the right call when families change often and the product set is
stable. If you expect to keep adding products, it will fight you. Naming this tradeoff
unprompted is a strong senior signal.

---

## Telling them apart — the discriminator questions

| | Simple Factory | Factory Method | Abstract Factory |
|---|---|---|---|
| GoF? | No (idiom) | Yes | Yes |
| Produces | one product | one product | a **family** of products |
| Varies by | a parameter | **subclassing** the creator | **which factory object** you hold |
| Creator's other job | none — it only creates | has real business logic using the product | none — it only creates |
| OCP | violated (unless registry) | satisfied | satisfied for families, violated for new products |

Ask yourself, in order:

1. **Am I creating several things that must match each other?** → Abstract Factory.
2. **Does the creating class have real logic that *uses* what it creates, varying only by
   subclass?** → Factory Method.
3. **Otherwise** → Simple Factory (registry version if the type set is open).

**Factory vs Builder** (next creational pattern): Factory answers *"which class do I
instantiate?"* and typically returns in one call. Builder answers *"how do I assemble one
complicated object?"* step by step — many optional parameters, no type choice. Different
questions; they compose fine (a factory can return a builder).

**Factory vs Strategy** — they *look* identical (interface + interchangeable impls), same
trap as Command vs Strategy in [command.md](command.md). Difference: a factory **creates
and returns** an object and then steps out of the way; a strategy **is** the object you
call to perform work. `create()` returns a thing; `pay()` does a thing.

## The modern honest take

With a DI container (Spring), much classic factory usage is replaced by the container
wiring dependencies — that's the container acting as a giant configurable factory.
Factories still earn their place when the choice is **runtime data-dependent**:
`create(order.getPaymentType())` where the type arrives in the request and no container
can know it at startup. In an LLD interview there's no Spring, so you write the factory —
but saying "in production a lot of this is DI-container work; the factory matters where
the choice depends on runtime data" is exactly the kind of framing that reads as SDE2.

## Where this shows up in our problem set

- **Vending Machine / Parking Lot** (Phase 2) — creating product or vehicle/spot types
  from an enum or config.
- **Logging Framework** (Phase 2) — appender creation from config strings
  (`console`, `file`, `db`); the canonical registry-factory case.
- **Notification System** (Phase 3) — Abstract Factory for channel families, usually
  paired with Strategy for retry/priority policy.
- **Chess** (Phase 3) — building pieces from a board setup string; a
  `Map<Character, Supplier<Piece>>` registry beats an 12-arm switch.
- **JDK sightings** — `Calendar.getInstance()`, `NumberFormat.getInstance()` (simple),
  `Collection.iterator()` (factory method), `ThreadFactory` (a factory interface by name).

## Self-check

- Name the three things called "factory" and say which is not GoF.
- Why does Simple Factory *not* satisfy OCP, and why is it still worth doing?
- How do you make a simple factory OCP-clean without subclassing? (registry + `Supplier`)
- What structural feature must the creator class have for it to be a true Factory Method
  rather than a `Supplier` in disguise?
- State Abstract Factory's guarantee in one sentence, and give a concrete bug it prevents.
- Which axis is Abstract Factory *closed* against, and what does that cost you?
- Factory vs Builder in one line each. Factory vs Strategy in one line.

## Exercise

See [`solutions/lesson6_factory.java`](../solutions/lesson6_factory.java).

**Part A —** refactor a `NotificationService` that hard-codes `new EmailSender()` /
`new SmsSender()` behind an if/else into a **registry-based factory** where adding a
`PushSender` requires zero edits inside the factory class.

**Part B —** the formatter/sender mismatch is a live bug in the starter code (HTML down an
SMS gateway). Fix it with an **Abstract Factory** so the bad pairing cannot be constructed
at all — not merely discouraged by convention.

Then answer, in a comment at the bottom of the file: *if the requirement changed to "every
family must also supply a retry policy," what exactly would you have to edit, and what does
that tell you about Abstract Factory?*
