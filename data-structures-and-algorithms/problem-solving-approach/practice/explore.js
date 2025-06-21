// Write a function which takes in a string
// and returns counts of each character
// in the string

function countChar(string) {
  if (typeof string !== "string") {
    return null;
  }

  const characters = {};
  for (let char of string) {
    if (!characters.hasOwnProperty(char)) {
      characters[char] = 1;
    } else {
      characters[char]++;
    }
  }

  return characters;
}

const input = "Manila";
console.log(countChar(input));
