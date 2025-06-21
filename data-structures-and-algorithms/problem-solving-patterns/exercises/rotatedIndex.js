// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410610#content

function findRotatedIndex(arr, n) {
  // Easily solved with returning arr.indexOf(n) but let's do this imperatively;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i;
  }
  return -1;
}

function test() {
  console.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1
  console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)); // 2
  console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6
  console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1
  console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1
  console.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5
}

test();
