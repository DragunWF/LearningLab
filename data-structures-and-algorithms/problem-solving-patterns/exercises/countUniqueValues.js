/*
Problem Description:
- Implement a function called countUniqueValues,
which accepts a sorted array, and counts the
unique values in the array. There can be negative
numbers in the array, but it will always be sorted

Requirements:
- Time Complexity must be O(n)
- Space Complexity must be O(1)
*/

function countUniqueValues(arr) {
  if (arr.length <= 1) {
    return arr.length;
  }
  let pointer = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[pointer] !== arr[i]) {
      pointer++;
      arr[pointer] = arr[i];
    }
  }
  return pointer + 1;
}

function test() {
  console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
  console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
  console.log(countUniqueValues([])); // 0
  console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
}

test();
