/*
Write a function called power which accepts a base and 
an exponent. The function should return the power of 
the base to the exponent. This function should mimic 
the functionality of Math.pow()  - do not worry about 
negative bases and exponents.
*/

function power(number, exponent) {
  if (exponent == 0) return 1;
  return number * power(number, exponent - 1);
}

function test() {
  console.log(power(2, 0)); // 1
  console.log(power(2, 2)); // 4
  console.log(power(2, 4)); // 16
}

test();
