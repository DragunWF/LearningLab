# Graph Traversal

## Introduction

- **Traversal:** It is about visiting/update/checkijng each vertex in a graph.

### Graph Traversal Uses

- Peer to peer networking
- Web crawlers
- Finding "closest" matches/recommendations
- Shortest path problems
  - GPS Navigation
  - Solving mazes
  - AI (shortest path to win the game)

## Depth-First Traversal

### Recursive Function Pseudocode

- if vertex is empty
  - return (this is the base case)
- add vertex to results list
- mark vertex as visited
- for each neighbor in vertex's neighbors:
  - if neighbor is not visited
    - recursively call DFS on neighbor

### Alternative Pseudocode (Recursive)

- The function should accept a starting node
- Create a list to store the end result, to be returned at the very end
- Create an object to store visited vertices
- Create a helper function which accepts a vertex
  - The helper function should return early if the vertex is empty
  - The helper function should place the vertex it accepts into the visited object and push that vertex into the result array
  - Loop over all of the values in the adjacencyList for that vertex
  - If any of those values have not been visited, recursively invoke the helper function with that vertex
- Invoke the helper function with the starting vertex
- Return the result array

### Iterative Function Pseudocode

- The function should accept a starting node
- Create a stack to help use keep track of vertices (use a list/array)
- Create a list to store the end result, to be returned at the very end
- Create an object to store visited vertices
- Add the starting vertex to the stack, and mark it visited
- While the stack has something in it:
  - Pop the next vertex from the stack
  - If that vertex hasn't been visited yet:
    - Mark it as visited
    - Add it to the result list
    - Push all of its neighbors into the stack
- Return the result array

## Breadth First

### Pseudocode

- The function should accept a starting vertex
- Create a queue (you can use an array) and place the starting vertex in it
- Create an array to store the nodes visited
- Create an object to store nodes visited
- Mark the starting vertex as visited
- Loop as long as there is anything in the queue
- Remove the first vertext from the queue and push it into the array that stores nodes visited
- Loop over each vertex in the adjacency list for the vertex you are visiting.
- If it is not inside the object that stores nodes visisted, mark it as visited and enqueue that vertex
- Once you have finished looping, return the array of visited nodes
