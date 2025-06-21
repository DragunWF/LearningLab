/*
Problem Description:
Write a recursive function called reverse which 
accepts a string and returns a new string in 
reverse.
*/

function reverse(str, left = 0) {
  const right = str.length - left - 1;
  if (typeof str === "string") {
    str = str.split("");
  }
  if (left > right) {
    return str.join("");
  }

  const temp = str[left];
  str[left] = str[right];
  str[right] = temp;
  return reverse(str, ++left);
}

function test() {
  console.log(reverse("awesome")); // 'emosewa'
  console.log(reverse("rithmschool")); // 'loohcsmhtir'
}

test();
