// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425972#content

function flatten(arr) {
  let output = [];
  for (let item of arr) {
    if (typeof item === "number") {
      output.push(item);
    } else {
      output = [...output, ...flatten(item)];
    }
  }
  return output;
}

function test() {
  console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
  // flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
  // flatten([[1],[2],[3]]) // [1,2,3]
  // flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3
}

test();
