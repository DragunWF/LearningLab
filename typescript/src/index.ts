function main() {
  let a: number = 3;

  a += 2;

  console.log(a);

  console.log(duplicateStr("I love TypeScript ", 50));

  let b: 50 | 20 = 20; // Restricts the values that this can receive to either only 50 or 20
  console.log(b);
}

function duplicateStr(word: string, count: number): string {
  let output: string = word;
  for (let i = 1; i < count; i++) {
    output += word;
  }
  return output;
}

main();
