/*
Selection Sort - Challenge
- Store the first element as the smallest value you've seen so far.
- Compare this item to the next item in the array until you find a smaller number
- If a smaller number is found, designate that smaller number to be the new _"minimum"_ and continue until the end of the array
- If the _"minimum"_ is not the value (index) you initially began with, swap the two values
- Repeat this with the next element until the array is sorted
*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    const start = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        arr[start] = arr[j];
        arr[j] = min;
      }
    }
  }
}

arr = [8, 2, 5, 12, 20, 4];
selectionSort(arr);
console.log(arr);
