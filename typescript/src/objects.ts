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

// player.username = "Luq";

console.log(player);
