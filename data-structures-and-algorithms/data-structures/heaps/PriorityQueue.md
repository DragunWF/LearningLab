# Priority Queue

## Introduction

### What is a priority queue?

A data structure where each element has a priority. Elements with higher prioerities are served before elements with lower priorities.

### Example

![Priority Queue Example](Screenshots/PriorityQueue.JPG)

## Pseudocode

- Write a Min Binary Heap - lower numbers means higher priority
- Each Node has a `val` and a `priority`. Use the priority to build the heap
- **Enqueue** method accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority
- **Dequeue** method removes root element, returns it, and rearranges heap using priority.
