# Problem Solving Patterns

## Miscellenous

### How do you improve?

1. **Devise** a plan for solving problems.
2. **Master** common problem solving patterns.

### Other patterns not discussed in this section

1. Dynamic Programming
2. Greedy Algorithms
3. Backtracking

### Directory Description

#### Practice

- This directory contains my solutions before I learned the optimal way to solve the particular problem.

#### Exercise

- This directory contains my solutions after I learned the optimal way to solve the problem via a problem solving pattern.

## Patterns

### Frequency Counter

- This pattern uses objects or sets to collect values/frequencies of values.
- This can often avoid the need for nested loops or `O(n^2)` operations with arrays or strings.

#### Example

```js
// Write a function called same, which accepts two arrays.
// The function should return true if every value in the
// array has it's corresponding value squared in the second
// array. The frequency of values must be the same.

function same(arr1, arr2) {
  // Time Complexity: O(n)
  if (arr1.length != arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    // Counts the number of times this value occurs in the array
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
    return true;
  }
}

function naive(arr1, arr2) {
  // Time Complexity: O(n^2)
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}
```

### Multiple Pointers

- Creating **pointers** or values that correspond to an index or position and move towards the beginning, end or middle based on certain condition
- **Very** efficient for solving problems with minimal space complexity as well

```js
// Write a function called sumZero which accepts a sorted
// array of integers. The function should find the first pair
// where the sum is 0. Return an array that includes both
// values that sum to zero or undefined if a pair does not exist

function sumZero(arr) {
  // Time Complexity: O(n)
  // Space Complexity: O(1)
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

function naive(arr) {
  // Time Complexity: O(n^2)
  // Space Complexity: O(1)
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}
```

### Sliding Window

- This pattern involves creating a **window** which can either be an array or number from one position to another
- Depending on a certain condition, the window either increases or closes (and a new window is created)
- Very useful for keeping track of a subset of data in an array/string etc.

```js
/*
Problem Description:
Write a function called maxSubarraySum which accepts
an array of integers and a number called n. The function
should calculate the maximum sum of n consecutive
elements in the array.
*/

function maxSubarraySum(arr, num) {
  // Time Complexity: O(n)
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

function naive(arr, num) {
  // Time Complexity: O(n^2)
  if (arr.length < num) {
    return null;
  }
  let max = -Infinity; // accounting for arrays with only negative values
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
```

### Divide and Conquer

- This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data
- This pattern can tremendously **decrease time complexity**
- A famous example of this pattern being applied in is the _binary search algorithm_
