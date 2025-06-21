/*
Problem Description
Write a recursive function called capitalizeFirst. Given an array of strings, 
capitalize the first letter of each string in the array.
*/

function capitalizeFirst(arr) {
  const output = [];
  function helper(arr, i) {
    if (i >= arr.length) return;
    output.push(`${arr[i][0].toUpperCase()}${arr[i].substring(1)}`);
    return helper(arr, i + 1);
  }
  helper(arr, 0);
  return output;
}

function test() {
  console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']
}

test();
