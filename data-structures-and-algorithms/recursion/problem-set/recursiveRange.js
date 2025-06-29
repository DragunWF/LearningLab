/*
Problem Description:
Write a function called recursiveRange which 
accepts a number and adds up all the numbers 
from 0 to the number passed to the function 
*/

function recursiveRange(number) {
  if (!number) return 0;
  return number + recursiveRange(number - 1);
}

function test() {
  console.log(recursiveRange(6)); // 21
  console.log(recursiveRange(10)); // 55
}

test();
