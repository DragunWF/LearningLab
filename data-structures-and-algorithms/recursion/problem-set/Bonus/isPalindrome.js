/*
Problem Description:
Write a recursive function called isPalindrome 
which returns true if the string passed to it is 
a palindrome (reads the same forward and backward). 
Otherwise it returns false.
*/

function isPalindrome(str) {
  let reversed = [];
  function helper(str, i) {
    if (i < 0) return;
    reversed.push(str[i]);
    return helper(str, --i);
  }
  helper(str, str.length);
  return reversed.join("") === str;
}

function test() {
  console.log(isPalindrome("awesome")); // false
  console.log(isPalindrome("foobar")); // false
  console.log(isPalindrome("tacocat")); // true
  console.log(isPalindrome("amanaplanacanalpanama")); // true
  console.log(isPalindrome("amanaplanacanalpandemonium")); // false
}

test();
