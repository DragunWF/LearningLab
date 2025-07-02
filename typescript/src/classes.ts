class Human {
  attack() {
    console.log("The human attacks!");
  }

  defend() {
    console.log("The human defends!");
  }
}

class Zombie {
  attack() {
    console.log("The zombie attacks!");
  }
}

const human: Human = new Human();
const zombie: Zombie = new Zombie();

human.attack();
human.defend();
zombie.attack();
