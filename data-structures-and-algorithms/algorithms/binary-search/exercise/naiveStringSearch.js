/*
Pseudocode
- Loop over the longer string
- Loop over the shorter string
- If the characters don't match, break out of the inner loop
- If the characters do match, keep goinjg
- If you complete the inner loop and find a match, increment the count matches
- Return the count
*/

function naiveStringSearch(str, subStr) {
  let count = 0;
  const loopCount = str.length - subStr.length + 1;
  for (let i = 0; i < loopCount; i++) {
    let isMatch = true;
    for (let j = i, n = 0; n < subStr.length; j++, n++) {
      if (str[j] !== subStr[n]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) count++;
  }
  return count;
}

console.log(naiveStringSearch("wowomgzomg", "omg"));
