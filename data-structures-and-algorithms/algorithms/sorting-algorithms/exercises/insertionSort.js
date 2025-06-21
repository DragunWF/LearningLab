// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/424832#content

function insertionSort(arr, comp) {
  var currentVal;
  for (var i = 1; i < arr.length; i++) {
    currentVal = arr[i];
    for (
      var j = i - 1;
      j >= 0 && (comp ? comp(arr[j], currentVal) > 0 : arr[j] > currentVal);
      j--
    ) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}

// (comp ? comp(arr[j], currentVal) > 0 : arr[j] > currentVal)
