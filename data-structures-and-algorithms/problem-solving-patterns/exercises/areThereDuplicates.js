/*
Problem Description:
Implement a function called, areThereDuplicates 
which accepts a variable number of arguments, and 
checks whether there are any duplicates among the 
arguments passed in.  You can solve this using the 
frequency counter pattern OR the multiple pointers pattern.

Requirements:
Time Complexity: O(n)
Space Complexity: O(n)

Bonus:
Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function areThereDuplicates(...args) {
  return [...new Set(args)].length !== args.length;
}

function test() {
  console.log(areThereDuplicates(1, 2, 3)); // false
  console.log(areThereDuplicates(1, 2, 2)); // true
  console.log(areThereDuplicates("a", "b", "c", "a")); // true
}

test();
