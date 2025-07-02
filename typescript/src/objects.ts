let player: {
  readonly username: string;
  health: number;
  level: number;
  optionalGuardian?: string; // The "?" makes this key optional
  pay: (amount: number) => void;
} = {
  username: "dragunwf",
  health: 100,
  level: 25,
  pay: (amount) => {
    console.log(`The player has paid ${amount} gold coins!`);
  },
};

// player.username = "Luq"; // readonly property so this is not allowed

type SkeletonKnight = {
  name: string;
  health: number;
};

type CharmableEnemy = {
  bondLevel: number;
};

let enemy: SkeletonKnight = {
  name: "Bones",
  health: 15,
};

// Union types
let tamableEnemy: SkeletonKnight & CharmableEnemy = {
  name: "Skeleton Dog",
  health: 25,
  bondLevel: 1,
};

console.log(player);
console.log(enemy);
console.log(tamableEnemy);
