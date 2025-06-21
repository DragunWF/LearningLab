// Given two strings, write a function to determine if the
// second string is an anagram of the first. An anagram is
// a word, phrase, or name formed by rearranging the
// letters of another, such as cinema, formed from iceman.

// All inputs are single words, lowercase.

function validAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  const frequencyCounter1 = assignCounter(str1),
    frequencyCounter2 = assignCounter(str2);
  for (let key in frequencyCounter1) {
    if (
      !frequencyCounter2.hasOwnProperty(key) ||
      frequencyCounter1[key] !== frequencyCounter2[key]
    ) {
      return false;
    }
  }
  return true;
}

function assignCounter(str) {
  const output = {};
  for (let val of str) {
    output[val] = (output[val] || 0) + 1;
  }
  return output;
}

function test() {
  console.log(validAnagram("", "")); // true
  console.log(validAnagram("aaz", "zza")); // false
  console.log(validAnagram("anagram", "nagaram")); // true
  console.log(validAnagram("rat", "car")); // false
  console.log(validAnagram("awesome", "awesom")); // false
  console.log(validAnagram("amanaplanacanalpanama", "acanalmanplanpamana")); // false
  console.log(validAnagram("qwerty", "qeywrt")); // true
  console.log(validAnagram("texttwisttime", "timetwisttext")); // true
}

test();
