function radixSort(arr) {
  const maxDigitCount = mostDigits(arr);
  let buckets = resetBucket();
  let currentArr = [...arr];
  for (let i = 1; i <= maxDigitCount; i++) {
    for (let num of currentArr) {
      buckets[getDigit(num, i)].push(num);
    }
    currentArr = bucketToArr(buckets);
    buckets = resetBucket();
  }

  for (let key in buckets) {
    for (let num of buckets[key]) {
      output.push(num);
    }
  }
  return currentArr;
}

function bucketToArr(buckets) {
  const output = [];
  for (let key in buckets) {
    for (let num of buckets[key]) {
      output.push(num);
    }
  }
  return output;
}

function resetBucket() {
  return {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };
}

function getDigit(num, place) {
  const numStr = Math.abs(num).toString();
  if (place > numStr.length) return 0;
  return parseInt(numStr[numStr.length - place]);
}

function digitCount(num) {
  return Math.abs(num).toString().length;
}

function mostDigits(nums) {
  if (nums.length === 0) return 0;
  return Math.max(...nums.map((n) => digitCount(n)));
}

function test() {
  console.log(radixSort([8, 6, 1, 12])); // [1, 6, 8, 12])
  console.log(radixSort([8392, 573, 1234, 8532, 3, 5, 1]));
}

function helperMethodTest() {
  console.log(getDigit(12345, 0)); // 5
  console.log(getDigit(12345, 1)); // 4
  console.log(getDigit(12345, 2)); // 3
  console.log(getDigit(12345, 3)); // 2
  console.log(getDigit(12345, 4)); // 1
  console.log(getDigit(12345, 5)); // 0

  console.log(getDigit(8987, 0)); // 7
  console.log(getDigit(8987, 1)); // 8
  console.log(getDigit(8987, 2)); // 9
  console.log(getDigit(8987, 3)); // 8
  console.log(getDigit(8987, 4)); // 0

  console.log("-----------------");
  console.log(mostDigits([1, 11, 11111, 242]));
}

test();
