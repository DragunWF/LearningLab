// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4410600#content

// Correction: Not a recursion problem

function constructNote(str1, str2) {
  const counter = {};
  for (let char of str1) {
    if (Object.keys(counter).includes(char)) counter[char]++;
    else counter[char] = 1;
  }
  for (let key in counter) {
    if (count(str2, key) < counter[key]) return false;
  }
  return true;
}

function count(str, target) {
  let count = 0;
  for (let char of str) {
    if (char === target) count++;
  }
  return count;
}

function test() {
  console.log(constructNote("aa", "abc")); // false
  console.log(constructNote("abc", "dcba")); // true
  console.log(constructNote("aabbcc", "bcabcaddff")); // true
}

test();
