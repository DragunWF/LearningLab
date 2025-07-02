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

function greet(entity: Human | Zombie | null) {
  if (typeof entity === "object") {
    console.log("You are greeting either a human or a zombie");
  } else {
    console.log("There is no one in front of you... Who are you greeting? Heh");
  }
}

greet(human);
greet(zombie);
greet(null);
