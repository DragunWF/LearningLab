# Trees

## Introduction

### Objective

- Define what a tree is
- Compare and contrast trees and lists
- Explain the difference between trees, binary trees, and binary search trees
- Implement operations on binary search trees

### What is a tree?

A data structure that consists of nodes in a **parent / child** relationship.

### General

- **Lists** - Linear
- **Trees** - Non-Linear

### Tree Terminology

- **Root** - The top node in a tree
- **Child** - A node directly connected to another node when moving away from the root.
- **Parent** - The converse notion of a child
- **Sibling** - A group of nodes with the same parent.
- **Leaf** - A node with no children
- **Edge** - The connection between one node and another.

### Uses/Applications for trees

- HTML DOM
- Network Routing
- Abstract Syntax Tree
- Artificial Intelligence
- Decision Trees
- Folders/Directories in Operating Systems
- Computer File Systems
- JSON

## Big O of BST

- **Insertion** - `O(log n)`
- **Searching** - `O(log n)`

**Note:** These are not guaranteed!. Watch [this video](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/8344784#content) to learn why.

## Kinds of Trees

### Binary Trees

### Binary Search Tree

- Every parent node has at most **two** children
- Every node to the left of a parent node is **always less** than the parent
- Every node to the right of a parent node is **always greater** than the parent

Skeleton structure of a BST class.

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

#### Insertion Pseudocode

- Create a new node
- Starting at the root
  - Check if there is a root, if not - the root now becomes that new node
  - If there is a root, check if the value of the new node is greater than or less than the value of the root
  - If it is greater
    - Check to see if there is a node to the right
    - If there is, move to that node and repeat these steps
    - If there is not, add that node as the right property
  - If it is less
    - Check to see if there is a node to the left
    - If there is, move to that node and repeat these steps
    - If there is not, add that node as the left property

#### Finding a Node Pseudocode

- Starting at the root
  - Check if there is a root, if not - we're done searching!
  - If there is a root, check if the value of the new node is the value we are looking for. If it is, then we're done
  - If not, check to see if the value is greater than or less than the value of the root
  - If it is greater
    - If there is, move to that node and repeat these steps
    - If there is not, we're done searching
  - If it is less
    - If there is, move to that node and repeat these steps
    - If there is not, we're done searching
