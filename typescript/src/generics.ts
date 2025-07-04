class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  move() {
    console.log("The animal moves");
  }
}

class Fish extends Animal {
  swim() {
    console.log("The fish swims");
  }

  move() {
    console.log("The fish moves");
  }
}

class Cat extends Animal {
  meow() {
    console.log("WHO LET THE DOGS OUT, WOOF WOOF WOOF");
  }

  move() {
    console.log("The cat moves");
  }
}

function createAnimal(name: string, typeOfAnimal: string = ""): Animal {
  switch (typeOfAnimal.toUpperCase()) {
    case "CAT":
      return new Cat(name);
    case "FISH":
      return new Fish(name);
    default:
      return new Animal(name);
  }
}

function moveAnimals<T extends Animal>(animals: T[]) {
  for (let animal of animals) {
    animal.move();
  }
}

const animal = createAnimal("Jack");
const cat = createAnimal("Oggy", "cat");
const fish = createAnimal("Poseidon", "fish");

console.log(animal.getName());
console.log(cat.getName());
console.log(fish.getName());

moveAnimals([animal, cat, fish]);

type RequestResponse<MetaData = { content: string }> = {
  data: MetaData;
  date: Date;
};

type BotResponse = RequestResponse<{
  aiModel: string;
  content: string;
  level: number;
}>;
type HumanResponse = RequestResponse<{ name: string; content: string }>;

const request: RequestResponse = {
  data: {
    content: "This is a response!",
  },
  date: new Date(),
};

const botResponse: BotResponse = {
  data: {
    aiModel: "gemini",
    content: "Greetings user!",
    level: 5,
  },
  date: new Date(),
};

const humanResponse: HumanResponse = {
  data: {
    name: "Marc",
    content: "Hallo there!",
  },
  date: new Date(),
};

console.log(request);
console.log(botResponse);
console.log(humanResponse);
