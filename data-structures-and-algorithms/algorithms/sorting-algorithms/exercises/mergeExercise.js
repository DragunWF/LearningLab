// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4413454#content

function merge(arrA, arrB, comp) {
  let i = 0,
    j = 0;
  const output = [];
  while (i < arrA.length && j < arrB.length) {
    if (comp ? comp(arrA[i], arrB[j]) < 1 : arrA[i] < arrB[j]) {
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
