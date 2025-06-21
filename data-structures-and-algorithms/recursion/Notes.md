# Recursion

## Objectives

- Define what recursion is and how it can be used
- Understand the two essential components of a recursive function
- Visualize the call stack to better debug and understand recursive functions
- Use helper method recursion and pure recursion to solve more difficult problems

## Miscellaneous

### Why We Use Recursion

- `JSON.parse` / `JSON.stringify` - uses recyrsion
- `document.getElementById` and DOM traversal algorithms - uses recursion
- Object traversal
- It's sometimes a cleaner alternative to iteration

### How Recursive Functions Work

- Invoke the **same** function with a different input until you reach your base case!

## Terms

- **Recursion** - A **process** (a function in our case) that calls **itself**
- **Base Case** - The point or condition that stops the recursion.

### The Call Stack

- It's a **stack** data structure.
- Any time a function is invoked it is placed (**pushed**) on top of the call stack
- When JavaScript sees the `return` keyword or when the function ends, the compiler will remove (**pop**)

### Two Essential Parts of a Recursive Function

1. Base Case
2. Different Input
