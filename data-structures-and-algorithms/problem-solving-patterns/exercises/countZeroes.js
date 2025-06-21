// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410620#content

// Time Complexity - O(log n)

function countZeroes(arr) {
  let output = 0;
  for (let num of arr) {
    if (num === 0) output++;
  }
  return output;
}

function test() {
  console.log(countZeroes([1, 1, 1, 1, 0, 0])); // 2
  console.log(countZeroes([1, 0, 0, 0, 0])); // 4
  console.log(countZeroes([0, 0, 0])); // 3
  console.log(countZeroes([1, 1, 1, 1])); // 0
}

test();
