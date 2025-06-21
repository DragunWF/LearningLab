// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410614#content

function sortedFrequency(arr, n) {
  const result = arr.filter((i) => n === i).length;
  return result > 0 ? result : -1;
}

function test() {
  console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
  console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1
  console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)); // 2
  console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1
}

test();
