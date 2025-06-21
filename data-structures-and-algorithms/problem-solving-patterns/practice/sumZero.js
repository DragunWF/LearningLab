// Write a function called sumZero which accepts a sorted
// array of integers. The function should find the first pair
// where the sum is 0. Return an array that includes both
// values that sum to zero or undefined if a pair does not exist

function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i === j) continue;
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
  return undefined;
}

function test() {
  console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [-3, 3]
  console.log(sumZero([-2, 0, 1, 3])); // undefined
  console.log(sumZero([1, 2, 3])); // undefined
}

test();
