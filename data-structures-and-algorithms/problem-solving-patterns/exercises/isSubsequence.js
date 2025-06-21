/*
Problem Description:
Write a function called isSubsequence which takes in two strings and 
checks whether the characters in the first string form a subsequence 
of the characters in the second string. In other words, the function 
should check whether the characters in the first string appear somewhere 
in the second string, without their order changing.

Your solution MUST have AT LEAST the following complexities:
Time Complexity - O(N + M)
Space Complexity - O(1)
*/

function isSubsequence(str1, str2) {
  if (!str1.length || str1.length > str2.length) {
    return false;
  }
  let pointer1 = 0,
    pointer2 = 0;
  while (pointer1 < str1.length) {
    if (pointer2 === str2.length) {
      return false;
    }
    if (str1[pointer1] === str2[pointer2]) {
      pointer1++;
    }
    pointer2++;
  }
  return true;
}

function test() {
  console.log(isSubsequence("hello", "hello world")); // true
  console.log(isSubsequence("sing", "sting")); // true
  console.log(isSubsequence("abc", "abracadabra")); // true
  console.log(isSubsequence("abc", "acb")); // false (order matters)
}

test();
