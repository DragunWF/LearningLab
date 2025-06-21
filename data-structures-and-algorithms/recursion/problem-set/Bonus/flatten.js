/*
Problem Description:
Write a recursive function called flatten which 
accepts an array of arrays and returns a new array 
with all values flattened.
*/

function flatten(arr) {
  const output = [];
  function helper(arr, i) {
    if (i >= arr.length) return;
    if (typeof arr[i] === "object") return helper(arr[i], 0);
    output.push(arr[i]);
    return helper(arr, i + 1);
  }
  helper(arr, 0);
  return output;
}

function test() {
  console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
  console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
  console.log(flatten([[1], [2], [3]])); // [1,2,3]
  console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3
}

test();
