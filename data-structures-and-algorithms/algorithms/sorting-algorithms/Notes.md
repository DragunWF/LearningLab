# Sorting Algorithms

## General

### What is sorting?

- **Sorting** is the process of rearranging the items in a collection (e.g. am array) so that the items are in some kind of order.

#### Examples of Usage

1. Sorting numbers from smallest to largest
2. Sorting names alphabetically
3. Sorting movies based on release year
4. Sorting movies based on revenue

#### Why do we need to learn this?

- Sorting is an incredibly common task, so it's good to know how it works.
- There are many different ways to sort things, and different techniques have their own advantages and disadvantages.

#### Extra

- [Sorting Algorithm Animations](https://www.toptal.com/developers/sorting-algorithms)

## Built-In JavaScript Sort

- The built-in sort method accepts an optional _comparator_ function
- You can use this comparator function to tell JavaScript how you want it to sort
- The comparator looks at pairs of elements (a and b), determines their sort order based on the return value

### Conditions for In-Built JavaScript Sort

- If it returns a negative number, `a` should come before `b`
- If it returns a positive number, `a` should come after `b`
- If it returns 0, `a` and `b` are the same as far as the sort is concerned

### Swapping Conventions

Many sorting algorithms involve some type of swapping functionality (e.g swapping two numbers to put them in order)

```js
// ES5
function swap(arr, idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// ES2015
const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};
```
