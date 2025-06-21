// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/424830#content

function selectionSort(arr, comparator) {
  const swap = (arr, idx1, idx2) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (
        comparator ? comparator(arr[lowest], arr[j]) > 0 : arr[lowest] > arr[j]
      ) {
        lowest = j;
      }
    }
    if (i !== lowest) swap(arr, i, lowest);
  }

  return arr;
}
