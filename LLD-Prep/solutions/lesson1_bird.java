/*
 * Lesson 1 Exercise — Fix the Bird/Ostrich LSP violation
 *
 * Requirements:
 *  - Bird has a name and a shared eat() behavior (all birds eat the same way, for this exercise).
 *  - Some birds fly (e.g. Sparrow), some don't (e.g. Ostrich).
 *  - Some birds swim (e.g. Penguin, Duck), some don't (e.g. Sparrow).
 *  - Some birds do both (e.g. Duck), some do neither (e.g. Ostrich... unless you want a swimming Ostrich, your call).
 *  - Adding a NEW bird type must never require modifying existing classes (Open/Closed Principle).
 *  - No subclass should ever throw UnsupportedOperationException for a capability it lacks.
 *
 * Write your solution below. Think about:
 *  - Composition over inheritance (recall the SimUDuck FlyBehavior example from the lesson).
 *  - Where does "fly" / "swim" capability belong — as an interface a Bird optionally implements,
 *    or as a behavior object a Bird holds a reference to?
 *  - Keep it simple — this doesn't need more than ~40-60 lines.
 */

class Bird {
    private String name;
    private flyBehavior fly;
    private swimBehavior swim;

    Bird(String name, flyBehavior fly, swimBehavior swim) {
        this.name = name;
        this.fly = fly;
        this.swim = swim;
    }

    public void fly() {
        fly.fly();
    }

    public void swim() {
        swim.swim();
    }

    public void eat() {
        System.out.println("The bird is eating!");
    }
}

interface flyBehavior {
    void fly();
}

interface swimBehavior {
    void swim();
}

class canFly implements flyBehavior {
    @Override
    public void fly() {
        System.out.println("I can fly.");
    }
}

class cannotFly implements flyBehavior {
    @Override
    public void fly() {
        System.out.println("I cannot fly.");
    }
}

class canSwim implements swimBehavior {
    @Override
    public void swim() {
        System.out.println("I can swim.");
    }
}

class cannotSwim implements swimBehavior {
    @Override
    public void swim() {
        System.out.println("I cannot swim.");
    }
}

public class lesson1_bird {

    // TODO: your design goes here

    public static void main(String[] args) {
        // TODO: demo instantiating a few different bird types and calling their behaviors
        Bird sparrow = new Bird("Sparrow", new canFly(), new cannotSwim());
        sparrow.fly();
        sparrow.swim();
        sparrow.eat();
    }
}
