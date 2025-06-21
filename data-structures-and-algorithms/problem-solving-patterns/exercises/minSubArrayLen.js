/*
Problem Description:
Write a function called minSubArrayLen which accepts two parameters:
an array of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray 
of which the sum is greater than or equal to the integer passed to the 
function. If there isn't one, return 0 instead.

Requirements:
Time Complexity - O(n)
Space Complexity - O(1)
*/

function minSubArrayLen(arr, len) {
  if (!arr.length) {
    return 0;
  }

  let right = 0,
    left = 0,
    currentSum = 0,
    currentLen = 0,
    minLen = 0;
  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    if (currentSum >= len) {
      right = i;
      minLen = i + 1;
      currentLen = minLen;
      break;
    }
  }

  while (right < arr.length) {
    if (currentSum >= len) {
      currentSum -= arr[left];
      currentLen--;
      left++;
    } else if (currentSum < len) {
      right++;
      if (right !== arr.length) {
        currentLen++;
        currentSum += arr[right];
      }
    }
    if (currentLen < minLen && currentSum >= len) {
      minLen = currentLen;
    }
  }

  return minLen;
}

function test() {
  console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray
  console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray
  console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52
  console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // 3
  console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)); // 5
  console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
  console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0
}

test();
