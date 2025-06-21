// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4413456#content

function pivot(arr, comp, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (comp ? comp(pivot, arr[i]) > 0 : pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, start, swapIdx);
  return swapIdx;
}

function swap(arr, index, otherIndex) {
  const temp = arr[index];
  arr[index] = arr[otherIndex];
  arr[otherIndex] = temp;
}
