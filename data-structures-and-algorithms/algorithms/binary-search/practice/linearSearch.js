/*
Pseudocode
- This function accepts an array and a value
- Loop through the array and check if the current array element is equal to the value.
- If it is, return the index at which the element is found
- If the value is never found, return -1
*/

students = ["Marc", "Josh", "Jethro"];

function search(target) {
  for (let i = 0; i < students.length; i++) {
    if (students[i] === target) {
      return i;
    }
  }
  return -1;
}

search(students("Jethro"));
