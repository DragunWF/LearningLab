// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410606#content

function findAllDuplicates(arr) {
  const output = [];
  const seen = [];
  for (let num of arr) {
    if (!seen.includes(num)) seen.push(num);
    else output.push(num);
  }
  return output;
}

function test() {
  console.log(findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // array with 2 and 3
  console.log(findAllDuplicates([4, 3, 2, 1, 0])); // []
  console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2, and 1
}

test();
