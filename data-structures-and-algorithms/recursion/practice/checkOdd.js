function checkOdd(arr) {
  console.log(arr);
  if (!arr.length) {
    return false;
  } else if (arr[0] % 2 === 0) {
    arr.shift();
    return checkOdd(arr);
  }
  return true;
}

function test() {
  console.log(checkOdd([3142, 5798, 6550, 5914]));
}

test();
