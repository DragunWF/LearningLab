# Stacks

## Introduction

### Objective

- Define what a stack is
- Understand use cases for a stack
- Implement operations on a stack data structure

### Summary

- Stacks are a **LIFO** _(Last in, First out)_ data structure where the last value in is always the first one out.
- Stacks are used to handle function invocations (the call stack), for operations like undo/redo, and for routing (remember pages you have visited and go back/forward) and much more!
- They are not a build in data structure in JavaScript, but are relatively simple to implement

### What is a stack?

- A **LIFO** data structure! _(Last in, First out)_
- The last element added to the stack will be the first element removed from the stack

### How is it used?

- Think about a stack of **plates**, or a stack of **markers**, or a stack of **anything**.
- As you pile it up the last thing (or the topmost thing) is what gets removed first

### Where stacks are used

- Managing function invocations
- Undo / Redo
- Routing (the history object) is treated like a stack!
- The **call stack** is an example that uses this data structure.

### Miscellaneous

- There is more than one way to implement a stack!
- **Array Implementation**, **Linked List Implementation**, etc.
- A stack is just a concept. It's basically a set of rules that says, okay, we need to be able to store data in such a way that the first thing added in is the last thing removed, the last thing added in is the first thing removed and it doesn't really define how you do that. It's just a concept.

## Big O Notations of Stacks

- Insertion - `O(1)`
- Removal - `O(1)`
- Searching - `O(n)`
- Accessing - `O(n)` - \_Unless you're peeking into the array (Looking at the value on top of the stack) which is `O(1)` constant time complexity.

## Array Implementation

- This approach is generally discouraged because `unshift` has `O(n)` linear time complexity and adding elements into a stack is fairly common. Which as a result, makes this implementation quite inefficient.

```js
stack = [];
stack.unshift("Math Notebook");
stack.unshift("English Notebook");
stack.unshift("Filipino Notebook");
stack.pop();
console.log(stack);
```

## Linked List Implementation

### Pushing Pseudocode

- The function should accept a value
- Create a new node with that value
- If there are no nodes in the stack, set the first and last property to be the newly created node
- If there is at least one node, create a variable that stores the current first property on the stack
- Reset the first property to be the newly created node
- Set hte next property on the node to be the previously created variable
- Increment the size of the stack by 1

### Popping Pseudocode

- If there are no nodes in the stack, return null
- Create a temporary variable to store the first property on the stack
- If there is only 1 node, set hte first and last property to be null
- If there is more than one node, set the first property to be the next property on the current first
- Decrement the size by 1
- Return the value of the removed node

### Code

- This is the preferred implementation as unshifting elements into a linked list is `O(1)` constant time complexity.

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      var temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.size;
  }
  pop() {
    if (!this.first) return null;
    var temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}
```
