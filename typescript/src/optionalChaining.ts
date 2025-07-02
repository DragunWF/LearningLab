class Dog {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const dogs: Dog[] = [new Dog("Butcher", 3), new Dog("Nacho", 2)];
const emptyDogList: Dog[] = [];

function getDog(name: string, dogs: Dog[]): Dog | null {
  for (let dog of dogs) {
    if (dog.name.toLowerCase() === name.toLowerCase()) {
      return dog;
    }
  }
  return null;
}

const foundDog = getDog("nacho", dogs);
const notFoundDog = getDog("butcher", emptyDogList);

console.log(`You have found ${foundDog?.name}`);
console.log(`The other dog you tried to search for is ${notFoundDog?.age}`);
