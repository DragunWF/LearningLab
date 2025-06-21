# Searching Algorithms

## General

### Objectives

- Describe what a searching algorithm is
- Implement linear search on arrays
- Implement binary search on sorted arrays
- Implement a naive string searching algorithm
- Implement the KMP searching algorithm

### In-Built JavaScript Search

- `.indexOf` - Time Complexity: `O(n)`
- `.includes`
- `.find`
- `.findIndex`

## Binary Search

- Binary search is much faster form of search
- Rather than eliminating one element at a time, you can eliminate _half_ of the remaining elements at a time.
- Binary search only works on _sorted_ arrays!

### Time Complexity

- Best Case: `O(1)`
- Average Case: `O(log n)`
- Worst Case: `O(log n)`

### Pseudocode

- This function accepts a sorted array and a value
- Create a left pointer at the start of the array, and a right pointer at the end of the array
- While the left pointer comes before the right pointer
- Create a pointer in the middle
- If you find the value you want, return the index
- If the value is too small, move the left pointer up
- If the value is too large, move the right pointer down
- If you never find the value, return -1

### Implementation

```js
function binarySearch(arr, elem) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (arr[middle] !== elem && start <= end) {
    if (elem < arr[middle]) end = middle - 1;
    else start = middle + 1;
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === elem ? middle : -1;
}

binarySearch([2, 5, 6, 9, 13, 15, 28, 30], 103);
```

## Naive String Search

- Suppose you want to count the number of times a smaller string appears in a longer string
- A straightforward approach involves checking pairs of characters individually

### Pseudocode

- Loop over the longer string
- Loop over the shorter string
- If the characters don't match, break out of the inner loop
- If the characters do match, keep goinjg
- If you complete the inner loop and find a match, increment the count matches
- Return the count

### Implementation

```js
function naiveSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (short[j] !== long[i + j]) break;
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

naiveSearch("lorie loled", "lol");
```

## Linear Search

- Searches every element of the array until it finds the target element

### Time Complexity

- Best Case: `O(1)`
- Average: `O(n)`
- Worst: `O(n)`

### Pseudocode

- This function accepts an array and a value
- Loop through the array and check if the current array element is equal to the value.
- If it is, return the index at which the element is found
- If the value is never found, return -1

### Implementation

```js
students = ["Marc", "Josh", "Jethro"];
function search(target) {
  for (let i = 0; i < students.length; i++) {
    if (students[i] === target) {
      return i;
    }
  }
  return -1;
}
search(students("Jethro"));
```
