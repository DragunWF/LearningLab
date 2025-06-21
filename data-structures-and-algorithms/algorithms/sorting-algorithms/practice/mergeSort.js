/*
Pseudocode
- Create an empty array, take a look at the smallest values in each input array.
- While there are still values we haven't looked at.
  - If the value in the first array is smaller than the value in the second array, push the value in the first array into our results and move on to the next value in the first array.
  - If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next value in the second array
  - Once we exhaust one array, push in all remaining values from the other array.
*/

function mergeSort(arr) {
  let result = arr.map((n) => [n]);
  let temp = [];
  let i = 1;
  let last = null;

  if (arr.length % 2 !== 0) {
    last = result[result.length - 1];
  }
  while (result.length !== 1) {
    console.log(result[i]);
    temp.push(merge(result[i - 1], result[i]));
    i += 2;
    if (i >= result.length) {
      result = [...temp];
      temp = [];
      i = 1;
    }
  }
  arr = [...result];
  return last ? merge(arr[0], last) : arr[0];
}

function merge(arrA, arrB) {
  let i = 0,
    j = 0;
  const output = [];
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] < arrB[j]) {
      output.push(arrA[i]);
      i++;
    } else {
      output.push(arrB[j]);
      j++;
    }
  }
  if (i < arrA.length) output.push(...addRemaining(arrA, i));
  if (j < arrB.length) output.push(...addRemaining(arrB, j));
  return output;
}

function addRemaining(arr, currentIndex) {
  const output = [];
  for (let i = currentIndex; i < arr.length; i++) {
    output.push(arr[i]);
  }
  return output;
}

function main() {
  const arr = [8, 3, 5, 4, 7, 6, 1, 2, 9];
  console.log(mergeSort(arr));
  // console.log(merge([4, 5, 6], [1, 2, 3]));
}

main();
