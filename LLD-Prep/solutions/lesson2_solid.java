/*
 * Lesson 2 Exercise — Refactor a class that violates all 5 SOLID principles
 *
 * Below is BEFORE.java's smell, described (not compiled) so you design the fix yourself
 * rather than patching given code. Here's the bad design, as an interviewer might describe it:
 *
 *   class OrderProcessor {
 *       double calculateTotal(Order o) { ... }
 *
 *       double applyDiscount(Order o) {
 *           if (o.getCustomerType() == REGULAR) return o.getTotal();
 *           if (o.getCustomerType() == PREMIUM) return o.getTotal() * 0.9;
 *           if (o.getCustomerType() == VIP)     return o.getTotal() * 0.8;
 *       }
 *
 *       void saveToDatabase(Order o) {
 *           MySQLConnection conn = new MySQLConnection();   // hard-wired to a concrete DB
 *           conn.save(o);
 *       }
 *
 *       void printInvoice(Order o) { ... }
 *       void sendEmailReceipt(Order o) { ... }
 *       void exportToExcel(Order o) { ... }   // forced onto every processor, most don't need it
 *   }
 *
 *   class GiftOrderProcessor extends OrderProcessor {
 *       // gift orders can't be discounted -- so this throws instead of returning a value
 *       @Override double applyDiscount(Order o) { throw new UnsupportedOperationException(); }
 *   }
 *
 * ============================================================================================
 * REVIEW PASS 4 — every class below now carries a detailed comment explaining EXACTLY which
 * SOLID principle(s) it protects, which original violation it fixes, and what would break if
 * that protection were removed. This is the "narrate the principle out loud" habit interviewers
 * are listening for -- these comments are what that narration sounds like in writing.
 * ============================================================================================
 */

public class lesson2_solid {

    /*
     * Order -- not itself a SOLID letter, but the encapsulation habit from Lesson 1 that every
     * SOLID principle below assumes is already in place. Fields are `private final`: nothing
     * outside this class can mutate name/price after construction. If these were public/package-
     * private mutable fields (like the original draft had), then ANY class holding an Order --
     * OrderProcessor, OrderRepository, PrintInvoice -- could silently corrupt it, which would
     * make every "single responsibility" boundary below meaningless (the data itself wouldn't
     * be trustworthy regardless of how cleanly the behavior is split up).
     */
    static class Order {
        private final String name;
        private final double price;

        Order(String name, double price) {
            this.name = name;
            this.price = price;
        }

        public String getName() { return name; }
        public double getPrice() { return price; }
    }

    /*
     * OrderProcessor protects THREE principles at once:
     *
     *   S (Single Responsibility) -- its only job is "compute a total given an order and a
     *   discount." It does not persist, print, email, or export. Only one actor (finance/pricing)
     *   can ever force this class to change. In the original bad design, OrderProcessor also
     *   saved to the DB, printed invoices, sent emails, and exported to Excel -- five unrelated
     *   stakeholders all editing one class.
     *
     *   O (Open/Closed) -- it depends on the Discount INTERFACE, not on any concrete discount
     *   class or an if/else chain on customer type. Adding a new discount tier never requires
     *   touching this method's body -- see the Discount section below.
     *
     *   D (Dependency Inversion) -- calculateTotal takes a `Discount` abstraction as a parameter
     *   rather than constructing a concrete discount class itself (no `new VIPDiscount()` inside
     *   this method). The high-level pricing policy depends on an abstraction; the caller decides
     *   which concrete implementation to plug in.
     */
    static class OrderProcessor {
        double calculateTotal(Order o, Discount discount) {
            return discount.applyDiscount(o.getPrice());
        }
    }

    /*
     * Discount protects O and sets up L:
     *
     *   O (Open/Closed) -- this is the seam. Every implementation below (Regular/VIP/Premium/
     *   NoDiscount) is a NEW class, not an edit to an EXISTING one. In the bad design,
     *   applyDiscount() was a single method with an if/else on customer type -- adding a new
     *   tier meant opening that method and adding another branch, risking every existing branch
     *   every time. Here, OrderProcessor and every existing Discount class are never touched
     *   again no matter how many new tiers get added.
     *
     *   Sets up L -- because this is an interface (a contract), every implementation MUST return
     *   a double. There's no way for an implementation to throw instead of returning a value
     *   without visibly breaking the contract everyone can see. That's what makes the L fix
     *   (NoDiscount, below) possible in the first place.
     */
    interface Discount {
        double applyDiscount(double amount);
    }

    static class RegularDiscount implements Discount {
        @Override
        public double applyDiscount(double amount) {
            return amount;
        }
    }

    static class VIPDiscount implements Discount {
        @Override
        public double applyDiscount(double amount) {
            return 0.9 * amount;
        }
    }

    static class PremiumDiscount implements Discount {
        @Override
        public double applyDiscount(double amount) {
            return 0.8 * amount;
        }
    }

    /*
     * NoDiscount is the direct, deliberate fix for L (Liskov Substitution):
     *
     *   The original GiftOrderProcessor extended OrderProcessor and overrode applyDiscount() to
     *   THROW UnsupportedOperationException -- a subclass that could not honor the behavioral
     *   contract of its parent (return a discounted amount). Any code holding an OrderProcessor
     *   reference and calling applyDiscount() would work fine for every type EXCEPT this one,
     *   which is precisely what LSP forbids: substituting a subtype must never break the caller.
     *
     *   NoDiscount fixes this by turning "no discount" into DATA (a Discount implementation
     *   that returns the full amount) instead of a special CASE that breaks the type hierarchy.
     *   It is 100% substitutable anywhere a Discount is expected -- same as every other
     *   implementation, no special-casing required by the caller, no exception, ever.
     */
    static class NoDiscount implements Discount {
        public double applyDiscount(double amount) { return amount; }
    }

    /*
     * DBConnection protects D (Dependency Inversion):
     *
     *   In the bad design, OrderProcessor.saveToDatabase() did `new MySQLConnection()` directly
     *   inside the method body -- a high-level policy (order processing) hard-wired to a
     *   low-level detail (a specific database driver). Swapping databases, or writing a unit
     *   test with a fake connection, meant editing that method.
     *
     *   Here, OrderRepository (below) depends only on THIS interface. It has no idea whether
     *   the real implementation talks to SQL, a NoSQL store, or an in-memory fake for testing --
     *   that decision is made by whoever constructs the OrderRepository (see main(), the
     *   "composition root" -- more on that term below), not by OrderRepository itself.
     */
    interface DBConnection {
        void save(Order o);
    }

    static class SQLConnection implements DBConnection {
        @Override
        public void save(Order o) {
            System.out.println("Saved " + o.getName() + " to SQL database.");
        }
    }

    /*
     * OrderRepository protects S and D together:
     *
     *   S -- persistence is its only responsibility. It doesn't calculate totals, print, or
     *   email. Only one actor (the ops/infra team) can force this class to change.
     *
     *   D -- it takes a DBConnection through its CONSTRUCTOR (constructor injection) rather than
     *   creating one internally. This is Dependency Injection, the TECHNIQUE, being used to
     *   satisfy Dependency Inversion, the PRINCIPLE: OrderRepository is a high-level module that
     *   depends only on the DBConnection abstraction, never on SQLConnection directly.
     */
    static class OrderRepository {
        private final DBConnection connection;

        OrderRepository(DBConnection connection) {
            this.connection = connection;
        }

        void saveOrder(Order o) {
            connection.save(o);
        }
    }

    /*
     * PrintInvoice protects S -- printing is its only reason to change, split out from
     * OrderProcessor/OrderRepository so the product team (invoice formatting) never has to
     * touch pricing or persistence code to change how a receipt looks.
     */
    static class PrintInvoice {
        void print() {
            System.out.println("Invoice printed.");
        }
    }

    /*
     * Notification / EmailNotification protect S and I together:
     *
     *   S -- notification is split out into its own class/reason-to-change, independent of
     *   pricing, persistence, printing, or export.
     *
     *   I -- Notification declares ONLY sendMessage(). A class that needs to notify a customer
     *   is never forced to also implement export or persistence methods just because they
     *   happened to live on some larger "Worker"-style interface.
     */
    interface Notification {
        void sendMessage();
    }

    static class EmailNotification implements Notification {
        @Override
        public void sendMessage() {
            System.out.println("Email Sent to the user.");
        }
    }

    /*
     * Exportable / ExcelExport protect I (Interface Segregation) most directly of anything in
     * this file:
     *
     *   In the bad design, exportToExcel() lived directly on OrderProcessor -- meaning EVERY
     *   processor, including ones that never need Excel export, was forced to carry that method
     *   (and if a future processor genuinely couldn't support it, it would be tempted to throw,
     *   the same UnsupportedOperationException smell as the L violation). By pulling export into
     *   its own single-method interface, only the classes that actually need export depend on
     *   it -- nothing is forced onto a class that doesn't use it.
     */
    interface Exportable {
        void export();
    }

    static class ExcelExport implements Exportable {
        @Override
        public void export() {
            System.out.println("Order got exported to Excel.");
        }
    }

    /*
     * main() is the "composition root" -- the one place in the whole program where concrete
     * classes are allowed to be `new`'d up directly. This is not a DIP violation: DIP says
     * HIGH-LEVEL POLICY code (OrderProcessor, OrderRepository) must not depend on low-level
     * concrete details -- it says nothing about the entry point that WIRES everything together.
     * Every DI-based system (Spring, Guice, or just plain constructor injection like here) has
     * exactly one place like this. If you find `new SQLConnection()` showing up inside
     * OrderRepository or OrderProcessor instead of here, that's when DIP is actually broken.
     */
    public static void main(String[] args) {
        Order iphone = new Order("iPhone 17", 500.49);
        OrderProcessor orderProcessor = new OrderProcessor();
        OrderRepository orderRepository = new OrderRepository(new SQLConnection());
        PrintInvoice printInvoice = new PrintInvoice();

        // O + L together: every Discount -- including NoDiscount for a "gift order" -- flows through
        // the SAME OrderProcessor.calculateTotal(). No type-check, no subclass, no UnsupportedOperationException.
        Discount[] discounts = { new RegularDiscount(), new VIPDiscount(), new PremiumDiscount(), new NoDiscount() };
        for (Discount d : discounts) {
            double total = orderProcessor.calculateTotal(iphone, d);
            System.out.println(d.getClass().getSimpleName() + " -> total: " + total);
        }

        orderRepository.saveOrder(iphone);
        printInvoice.print();

        Notification notification = new EmailNotification();
        notification.sendMessage();

        Exportable exporter = new ExcelExport();
        exporter.export();
    }
}
