// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/424838#content

function quickSort(arr, comp, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, comp, left, right);
    quickSort(arr, comp, left, pivotIndex - 1);
    quickSort(arr, comp, pivotIndex + 1, right);
  }
  return arr;
}

function pivot(arr, comp, start, end = arr.length + 1) {
  const pivot = arr[start];
  let pivotIndex = start;
  for (let i = start + 1; i <= end; i++) {
    if (comp ? comp(pivot, arr[i]) > 0 : pivot > arr[i]) {
      pivotIndex++;
      swap(arr, pivotIndex, i);
    }
  }
  swap(arr, start, pivotIndex);
  return pivotIndex;
}

function swap(arr, index, otherIndex) {
  const temp = arr[index];
  arr[index] = arr[otherIndex];
  arr[otherIndex] = temp;
}
