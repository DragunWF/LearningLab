/*
Problem Description:
Write a function called findLongestSubstring, which accepts a string 
and returns the length of the longest substring with all distinct 
characters.

Constraints:
Time Complexity - O(n)
*/

function findLongestSubstring(str) {
  if (!str.length) {
    return 0;
  }
  const charCounter = {};
  let maxLen = 0,
    currentLen = 0;
  let left = 0,
    right = 0;
  while (right < str.length) {
    if (charCounter[str[right]] > 1) {
      charCounter[str[left]]--;
      left++;
      currentLen--;
    } else {
      charCounter[str[right]] = (charCounter[str[right]] || 1) + 1;
      currentLen++;
      right++;
    }
    if (currentLen > maxLen) {
      maxLen = currentLen;
    }
  }
  return maxLen;
}

function test() {
  console.log(findLongestSubstring("")); // 0
  console.log(findLongestSubstring("rithmschool")); // 7
  console.log(findLongestSubstring("thisisawesome")); // 6
  console.log(findLongestSubstring("thecatinthehat")); // 7
  console.log(findLongestSubstring("bbbbbb")); // 1
  console.log(findLongestSubstring("longestsubstring")); // 8
  console.log(findLongestSubstring("thisishowwedoit")); // 6
}

test();
