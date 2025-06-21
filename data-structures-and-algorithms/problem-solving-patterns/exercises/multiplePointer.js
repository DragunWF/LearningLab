// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410618#content

function findPair(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] - arr[j] === n) {
        return true;
      }
    }
  }
  return false;
}

function test() {
  console.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true
  console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true
  console.log(findPair([4, -2, 3, 10], -6)); // true
  console.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false
  console.log(findPair([], 0)); // false
  console.log(findPair([5, 5], 0)); // true
  console.log(findPair([-4, 4], -8)); // true
  console.log(findPair([-4, 4], 8)); // true
  console.log(findPair([1, 3, 4, 6], -2)); // true
  console.log(findPair([0, 1, 3, 4, 6], -2)); // true
}

test();
