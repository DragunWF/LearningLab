/*
Problem Description
Write a function called stringifyNumbers which takes 
in an object and finds all of the values which are 
numbers and converts them to strings. Recursion would 
be a great way to solve this!
*/

function stringifyNumbers(obj) {
  const output = {};

  function helper(obj, keys, i = 0) {
    if (i >= objKeys.length) return;

    const keys = Object.keys(obj);
    if (typeof obj[keys[i]] === "object") {
      output[keys[i]] = helper(objKeys[keys[i]]);
    }
    output[keys[i]] = obj[keys[i]].toString();

    return helper(keys, i + 1);
  }
  helper(Object.keys(obj));

  return output;
}

let obj = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};
console.log(stringifyNumbers(obj));
