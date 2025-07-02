function funcMain() {
  const nums: number[] = [4, 2, 1, 5, 2, 1];
  console.log(sumNumbers(nums));
  console.log(sumNumbers(nums, 2));
  console.log(sumNumbers(nums, 0));
}

function sumNumbers(arr: number[], multiplier?: number): number {
  let sum: number = 0;
  for (let number of arr) {
    if (multiplier !== undefined) {
      sum += number * multiplier;
    } else {
      sum += number;
    }
  }
  return sum;
}

funcMain();
