function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right); //3
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function pivot(arr, start, end = arr.length + 1) {
  const pivot = arr[start];
  let pivotIndex = start;
  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
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

function main() {
  const arr = [4, 6, 9, 1, 2, 5, 3];
  console.log("Original:", arr);
  quickSort(arr);
  // Expected output: [1, 2, 3, 4, 5, 6, 9]
  console.log("Sorted:", arr);
}

main();
