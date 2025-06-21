// Wild West Exercise

function mergeSort(arr, comparator) {
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

function merge(arrA, arrB, comparator) {
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

function test() {
  mergeSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
  mergeSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
  mergeSort([1, 2, 3]); // [1, 2, 3]
  mergeSort([]);

  var nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67,
    4342, 32,
  ];
  mergeSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

  var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

  function strComp(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  mergeSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

  var moarKittyData = [
    {
      name: "LilBub",
      age: 7,
    },
    {
      name: "Garfield",
      age: 40,
    },
    {
      name: "Heathcliff",
      age: 45,
    },
    {
      name: "Blue",
      age: 1,
    },
    {
      name: "Grumpy",
      age: 6,
    },
  ];

  function oldestToYoungest(a, b) {
    return b.age - a.age;
  }

  mergeSort(moarKittyData, oldestToYoungest); // sorted by age in descending order
}

test();
