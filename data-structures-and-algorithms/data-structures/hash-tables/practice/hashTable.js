class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  hash(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const pair = this.keyMap[index];
    if (pair) {
      for (let i = 0; i < pair.length; i++) {
        if (pair[i][0] === key) {
          return pair[i];
        }
      }
    }
    return undefined;
  }

  keys() {
    return this.grab(true);
  }

  values() {
    return this.grab(false);
  }

  grab(isKeys) {
    const output = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        output.push(this.keyMap[i][j][isKeys ? 0 : 1]);
      }
    }
    return output;
  }
}

function main() {
  const hashTable = new HashTable();
  hashTable.set("hello world", "goodbye!!");
  hashTable.set("dogs", "are cool");
  hashTable.set("cats", "are fine");
  hashTable.set("i love", "pizza");
  console.log(hashTable.keyMap);
  console.log(hashTable.get("dogs"));
}

main();
