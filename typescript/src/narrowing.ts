function narrowingTest(
  value: number | string | boolean
): number | string | boolean {
  // Testing the concept of narrowing
  if (typeof value === "number") {
    return value * 5;
  } else if (typeof value === "string") {
    return `${value} ${value} ${value}`;
  }
  return value && value;
}

console.log(narrowingTest(32));
console.log(narrowingTest("hallo"));
console.log(narrowingTest(true));
