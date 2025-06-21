# Heaps

## Introduction

### Objectives

- Define what a binary heap is
- Compare and contrast min and max heaps
- Implement basic methods on heaps
- Understand where heaps are used in the real world and what other data structure can be construted from heaps

### Big O of Binary Heaps

- **Insertion** - `O(log n)`
- **Removal** - `O(log n)`
- **Search** - `O(n)`

![Big O of Binary Heap](Screenshots/BinaryHeapBigO.JPG)

### What is a Binary Heap?

- Very similar to a binary search tree, but with some different rules!
- In a **MaxBinaryHeap**, parent nodes are always larger than child nodes. IN a **MinBinaryHeap**, parent nodes are always smaller than child nodes

### Max Binary Heap

- Each parent has at most two child nodes
- The value of each parent node is **always** greater than its child nodes
- In a max Binary Heap the parent is greater than the children, but there are no guarantees between siblin nodes
- A binary heap is as compact as possible. ALl the children of each node are as full as they can be and left children are filled out first

### Min Binary Heap

### Why do we need to know this?

Binary Heaps are used to implement Priority Queues, which are **very** commonly used data structures.

They are also used quite a bit, with **graph traversal** algorithms.

### Sink Down

The procedure for deleting the root from the heap (effectively extracting the maximum element in a max-heap or the minimum element in a min-heap) and restoring the properties is called _down-heap_ (also known as sink-down, bubble-down, percolate-down, sift-down, trickle down, heapify-down, cascade-down, and extract-min/max).

## Operations Pseudocode

### Insertion

- Push the value into the values property on the heap
- Bubble Up:
  - Create a variable called index which is the length of the values property `- 1`
  - Create a variable called parentIndex which is the floor of `(index - 1) / 2`
  - Keep looping as long as teh values element at the parentIndex is less than the values element at the child index
    - Swap the value of the values element at the parentIndex with the value of the element property at the child index
    - Set the index to be the parentIndex, and start over!

### Removal

#### Simplification

- Remove the root
- Replace with the most recently added
- Adjust (sink down)

#### ExtractMax

- Swap the first value in the values property with the last one
- Pop from the values property, so you can return the value at the end
- Have the new root "sink down" to the correct spot
  - Your parent index starts at 0 (the root)
  - Find the index of the left child: `2 * index + 1` (make sure its not out of bounds)
  - Find the index of the rigth child: `2 * index + 1` (make sure its not out of bounds)
  - If the left or right child is greater than the element... swap. If both left and right children are larger, swap with the largest child.
  - The child index you swapped to now becomes the new parent index.
  - Keep looping and swapping until neither child is larger than the element
  - Return the old root!

## Summary

- Binary Heaps are very useful data structures for sorting, and implementing other data structures like priority queues.
- Binary Heaps are either MaxBinaryHeaps or MinBinaryHeaps with parents either being smaller or larger than their children.
- With just a little bit of math, we can represent heaps using arrays!
