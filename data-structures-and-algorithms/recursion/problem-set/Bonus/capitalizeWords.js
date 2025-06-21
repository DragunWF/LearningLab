/*
Problem Description
Write a recursive function called capitalizeWords. 
Given an array of words, return a new array 
containing each word capitalized.
*/

function capitalizeWords(words, index = 0) {
  if (index >= words.length) {
    return words;
  }
  words[index] = words[index].toUpperCase();
  return capitalizeWords(words, ++index);
}

function test() {
  console.log(capitalizeWords(["Welcome", "to", "Recursion"]));
  console.log(capitalizeWords(["i", "am", "upgrading"]));
}

test();
