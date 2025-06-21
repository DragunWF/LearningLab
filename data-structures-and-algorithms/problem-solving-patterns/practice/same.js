// Write a function called same, which accepts two arrays.
// The function should return true if every value in the
// array has it's corresponding value squared in the second
// array. The frequency of values must be the same.

function same(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] ** 2 != arr2[i]) {
      return false;
    }
  }

  return true;
}

console.log(same([1, 2, 3, 4], [1, 4, 9, 16]));
