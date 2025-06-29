// Implement a function called countUniqueValues,
// which accepts a sorted array, and counts the
// unique values in the array. There can be negative
// numbers in the array, but it will always be sorted

function countUniqueValues(arr) {
  return [...new Set(arr)].length;
}

function imperativeWay(arr) {
  // Same way of solving it but imperatively
  // Time Complexity: O(n)
  // Space Complexity: O(n)
  const unique = [];
  for (let num of arr) {
    if (!unique.includes(num)) {
      unique.push(num);
    }
  }
  return unique.length;
}

function test() {
  console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
  console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
  console.log(countUniqueValues([])); // 0
  console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
}

test();
