// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/424828#content

function bubbleSort(arr, comparator) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      let swapCurrent = comparator
        ? comparator(arr[j], arr[j + 1]) > 0
        : arr[j] > arr[j + 1];
      if (swapCurrent) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}
