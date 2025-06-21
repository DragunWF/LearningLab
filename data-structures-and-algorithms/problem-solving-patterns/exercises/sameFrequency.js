/*
Problem Description:
Write a function called sameFrequency. 
Given two positive integers, find out if the 
two numbers have the same frequency of digits.

Your solution MUST have the following complexities:
- Time: O(n)
*/

function sameFrequency(a, b) {
  (a = a.toString()), (b = b.toString());
  if (a.length !== b.length) {
    return false;
  }
  const counter1 = assignValues(a),
    counter2 = assignValues(b);
  for (let key in counter1) {
    if (!counter2.hasOwnProperty(key) || counter1[key] !== counter2[key]) {
      return false;
    }
  }
  return true;
}

function assignValues(str) {
  const output = {};
  for (let val of str) {
    output[val] = (output[val] || 0) + 1;
  }
  return output;
}

function test() {
  console.log(sameFrequency(182, 281)); // true
  console.log(sameFrequency(34, 14)); // false
  console.log(sameFrequency(3589578, 5879385)); // true
  console.log(sameFrequency(22, 222)); // false
}

test();
