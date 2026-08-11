/*
 * Lesson 6 Exercise — Factory: registry factory (Part A) + Abstract Factory (Part B)
 *
 * (see patterns/factory.md for the full lesson this builds on)
 *
 * This starter COMPILES AND RUNS as-is. Run it first — the output shows the bug you're
 * being asked to design away. Don't fix it by adding an if-check; fix it structurally.
 *
 * ---------------------------------------------------------------------------
 * PART A — kill the if/else with a registry-based factory
 *
 *   NotificationService.sendNaive() below hard-codes `new EmailSender()` / `new SmsSender()`
 *   behind an if/else. Replace it with a factory such that adding a THIRD channel
 *   (PushSender, already written for you at the bottom) requires ZERO edits inside the
 *   factory class itself.
 *
 *   Think about:
 *    - A switch inside a factory still violates OCP. What replaces the switch?
 *    - What type describes "a thing that can construct a Sender on demand"?
 *    - Where should the registration calls live? (hint: composition root — see main())
 *
 * ---------------------------------------------------------------------------
 * PART B — make the bad pairing unconstructible with an Abstract Factory
 *
 *   Run the code: the last line of output sends HTML down an SMS gateway. Nothing in the
 *   current design prevents it, because the formatter and the sender are chosen
 *   independently.
 *
 *   Introduce a NotificationFactory family so that a formatter and a sender can only ever
 *   be obtained together, as a matched pair. The goal is NOT "validate and throw" — it's
 *   that a caller cannot even express the wrong combination.
 *
 *   Think about:
 *    - What does the family interface need to expose?
 *    - Who calls it — and how many times per NotificationService?
 *
 * ---------------------------------------------------------------------------
 * FINALLY, answer in a comment at the bottom of this file:
 *   If the requirement changed to "every family must also supply a retry policy," what
 *   exactly would you have to edit? What does that tell you about Abstract Factory?
 */

interface Formatter {
    String format(String raw);
}

class HtmlFormatter implements Formatter {
    public String format(String raw) {
        return "<html><body><b>" + raw + "</b></body></html>";
    }
}

class PlainTextFormatter implements Formatter {
    public String format(String raw) {
        return raw.length() <= 160 ? raw : raw.substring(0, 157) + "...";
    }
}

interface Sender {
    void send(String msg);
}

class SmtpSender implements Sender {
    public void send(String msg) {
        System.out.println("[SMTP]  " + msg);
    }
}

class SmsGatewaySender implements Sender {
    public void send(String msg) {
        if (msg.contains("<")) {
            System.out.println("[SMS]   !! BUG — HTML markup down an SMS gateway: " + msg);
        } else {
            System.out.println("[SMS]   " + msg);
        }
    }
}

// Written for you — Part A is done when adding this to the mix needs no factory edits.
class PushSender implements Sender {
    public void send(String msg) {
        System.out.println("[PUSH]  " + msg);
    }
}

class NotificationService {

    // PART A: this if/else is what the factory replaces.
    void sendNaive(String channel, String raw) {
        Sender sender;
        if (channel.equals("email")) {
            sender = new SmtpSender();
        } else if (channel.equals("sms")) {
            sender = new SmsGatewaySender();
        } else {
            throw new IllegalArgumentException("Unknown channel: " + channel);
        }
        sender.send(raw);
    }

    // PART B: formatter and sender are picked independently — nothing enforces that they match.
    void sendFormatted(Formatter formatter, Sender sender, String raw) {
        sender.send(formatter.format(raw));
    }
}

// TODO Part A: your registry-based factory goes here

// TODO Part B: your NotificationFactory family (+ implementations) goes here

public class lesson6_factory {

    public static void main(String[] args) {
        NotificationService service = new NotificationService();

        // --- current behaviour, for reference ---
        service.sendNaive("email", "Your order shipped");
        service.sendNaive("sms", "Your order shipped");

        // --- the bug Part B must make impossible ---
        service.sendFormatted(new HtmlFormatter(), new SmsGatewaySender(), "Your order shipped");

        // TODO: replace the calls above with your factory-driven versions once A and B are done.
    }
}
