# Big O Notation

## Objectives

- Motivate the need for something like Big O Notation
- Describe what Big O Notation is
- Simplify Big O Expressions
- Define "time complexity" and "space complexity"
- Evaluate the time complexity and space complexity of different algorithms using Big O Notation describe what a logarithm is

## Rules of Simplifying Big O Expressions

### Rules

1. Constants Don't Matter
2. Smaller Terms Don't Matter

### Big O Shorthands

1. Arithmetic operations are constant
2. Variable assignment is constant
3. Accessing elements in an array (by index) or object (by key) is constant.
4. In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop.

## Definitions

- **Auxiliary Space Complexity** - It refers to the space required by the algorithm, not including space taken up by the inputs.
- `log == log base 2`, when refering to the logarithm in calculating the space or time complexity of an algorithm, we are mainly refering to it with a base number of 2.
- **Rule of thumb for logarithms:** The logarithm of a number rougly measures the number of times you can divide that number by 2 before you get a value that's less or equal to one.

## Chart

![Big O Notation Chart](Images/BigOChart.JPG)

## Space Complexity

### Rules of Thumb

- Most primitives (booleans, numbers, `undefined`, `null`) are constant space.
- Strings require `O(n)` space (where `n` is the string length)
- Reference types are generally `O(n)`, where `n` is the length (for arrays) or the number of keys (for objects).

### Examples

- [O(1)](/Self-Studies/Data%20Structures%20and%20Algorithms/Big%20O%20Notation/Images/SpaceComplexityEx1.JPG)
- [O(n)](/Self-Studies/Data%20Structures%20and%20Algorithms/Big%20O%20Notation/Images/SpaceComplexityEx2.JPG)

## Miscellaneous

The time complexity of this function will always be `O(n)` primarily because `O` represents the worst case scenario.

```js
function logAtLeast5(n) {
  for (let i = 1; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}
```

The time complexity of this function will always be `O(1)` because as `n` grows, the number of operations will always be `5` which is constant.

```js
function logAtMost5(n) {
  for (let i = 1; i <= Math.min(5, n); i++) {
    console.log(i);
  }
}
```
