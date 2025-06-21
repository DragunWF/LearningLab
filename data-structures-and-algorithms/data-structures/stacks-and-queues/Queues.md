# Queues

## Introduction

### Objectives

- Define what a queue is
- Understand use cases for a queue
- Implement operations on a queue data structure

### What is a queue?

- This is a **FIFO** data structure - First In, First Out

### Uses in programming

- Background tasks
- Uploading resources
- Printing / Task processing

```js
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
}

class Node {
  constructor() {
    this.value = value;
    this.next = null;
  }
}
```

## Big O Time Complexity of Queues

### Time Complexities of Operations - Linked List Implementation

- **Insertion** - `O(1)`
- **Removal** - `O(1)`
- **Searching** - `O(n)`
- **Access** - `O(n)`

## Queue Operations

### Enqueue

#### Definition

Adds an element to the beginning of the queue. Like the `unshift` method from arrays and linked lists.

#### Pseudocode

- This function accepts some value
- Create a new node using that value passed to the function
- If there are no nodes in the queue, set this node to hbe the first and last proeprty of the queue
- Otherwise, set the next property on the current last to be that node, and then set the last property of the queue to be that node
- Increment the size by 1 and return the updated size

### Dequeue

#### Definition

Pops an element from the beginning of the queue. Like the `shift` method from arrays and linked lists.

#### Pseudocode

- If there is no first property, just return null
- Store the first property in a variable
- See if the first is the same as the last (check if there is only 1 node). If so, set the first and last to be null.
- If there is more than 1 node, set the first property to be the next property of first.
- Decrement the size by 1
- Return the value of the node dequeued

## Summary

- Queues are a **FIFO** data structure, all elements are first in first out.
- Queues are useful for processing tasks and are foundational for more complex data structures
- Insertion and removal can be done in `O(1)`
