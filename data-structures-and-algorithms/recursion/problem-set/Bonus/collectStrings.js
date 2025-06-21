/*
Problem Description
Write a function called collectStrings which accepts an object and 
returns an array of all the values in the object that have a typeof 
string
*/

function collectStrings(obj) {
  const output = [];
  function helper(values, i) {
    if (i >= values.length) return;
    if (typeof values[i] === "object") return helper(values[i], 0);
    output.push(values[i]);
    console.log(values[i]);
    return helper(values, i + 1);
  }
  helper(Object.values(obj), 0);
  console.log();
  return output;
}

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};
result = collectStrings(obj); // ["foo", "bar", "baz"]
console.log(result);
