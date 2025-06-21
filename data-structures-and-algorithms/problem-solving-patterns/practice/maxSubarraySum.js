/*
Problem Description:
Write a function called maxSubarraySum which accepts
an array of integers and a number called n. The function
should calculate the maximum sum of n consecutive
elements in the array.
*/

function maxSubarraySum(arr, n) {
  if (arr.length < n) {
    return null;
  }
  let maxSum = -Infinity; // accounting for arrays with only negative values
  for (let i = 0; i < arr.length - n + 1; i++) {
    let sum = 0;
    let elementsPassed = 0;
    for (let j = i; elementsPassed < n; j++) {
      sum += arr[j];
      elementsPassed++;
    }
    if (sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
}

function test() {
  console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
  console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
  console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
  console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5
  console.log(maxSubarraySum([2, 3], 3)); // null
}

test();
