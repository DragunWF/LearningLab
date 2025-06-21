# Tree Traversal

## Summary

- Trees are a non-linear data structures that contain a root and child nodes
- Binary Trees can have values of any type, but at most two children for each parent
- Binary Search Trees are a more specific version of binary trees where every node to the left of a parent is less than it's value and every node to the right is greater
- We can search through trees using BFS and DFS

## When to use BFS and DFS

- **BFS** - More nodes to keep track of
- **DFS** - Fewer nodes to keep track of
- **Pre-Order DFS** - Can be used to _export_ a tree structure so that it is easily reconstructed or copied.

## Breadth-First Search (BFS)

### Steps/Pseudocode

- Create a queue (this can be an array) and a variable to store the values of nodes visited
- Place the root node in the queue
- Loop as long as there is anything in the queue
  - Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
  - If there is a left property on the node dequeued - add it to the queue
  - If there is a right property on the node dequeued
  - Add it to the queue
- Return the variable that stores the values

## Depth-First Search (DFS)

### Steps/Pseudocode

#### Pre-Order

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
- Write a helper function which accepts a node
  - Push the value of the node to the variable that stores the values
  - If the node has a left property, call the helper function with the left property on the node
  - If the node has a right property, call the helper function with the right property on the node
- Invoke the helper function with the current variable
- Return the array of values

#### Post-Order

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
- Write a helper function which accepts a node
  - If the node has a left property, call the helper function with the left property on the node
  - If the node has a right property, call the helper function with the right property on the node
  - Push the value of the node to the variable that stores the values
- Invoke the helper function with the current variable
- Return the array of values

#### In-Order

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
  - If the node has a left property, call the helper function with the left property on the node
  - Push the value of the node to the variable that stores the values
  - If the node has a right property, call the helper function with the right property on the node
- Invoke the helper function
- Return the array of values
