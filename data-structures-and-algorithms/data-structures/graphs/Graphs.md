# Graphs

## Introduction

### Objectives

- Explain what a graph is
- Compare and contrast different types of graphs and their use cases in the real world
- Implement a graph using an adjacency list
- Traverse through a graph using BFS and DFS (Breadth-First and Depth-First)
- Compare and contrast graph traversal algorithms

### What are graphs?

A **graph data structure** consists of finite (and possibly mutable) set of vertices or nodes or points, together with a set of unordered pairs of these vertices for an undirected **graph** or a set of ordered pairs for a directed **graph**.

In a simpler definition, a **graph** is a collection of nodes with connections.

### Uses for Graphs

- Social Networking
- Location/Mapping
- Routing Algorithms
- Visual Hierarchy
- File System Optimizations

#### Recommendations

This is how recommendations are recommended to you as well usually referred to in these common phrases

- "People also watched"
- "You might also like..."
- "People you might know"
- "Frequently bought with"

![Image of Graphs Between Games](Screenshots/GraphsNodesInCommon.JPG)

## Types of Graphs

### Terminologies

- **Vertex** - a node
- **Edge** - a connection between nodes
- **Weighted/Unweighted** - values assigned to distances between vertices
- **Directed/Undirected** - directions assigned to distanced between vertices

#### Graph

![Image of Graph](Screenshots/Graph.JPG)

#### Undirected Graph

All connections are two-way.

![Image of Undirected Graph](Screenshots/UndirectedGraph.JPG)
![Graph of a Facebook Social Network](Screenshots/SocialNetworkGraph.JPG)

#### Directed Graph

In this graph, the connections are not a two-way thing by default.

![Image of Directed Graph](Screenshots/DirectedGraph.JPG)
![Image of Instagram Followers Graph](Screenshots/SocialNetworkDirectedGraph.JPG)

#### Weighted Graph

A graph with values associated with the edges of the graph.

![Image of Weighted Graph](Screenshots/WeightedGraph.JPG)
![Image of Weighted Graph Map](Screenshots/WeightedGraphMap.JPG)

## Representing a Graph (Code)

### Adjacency Matrix

![Image of Adjacency Matrix](Screenshots/AdjacencyMatrix.JPG)

### Adjacency List

![Image of Adjacency List](Screenshots/AdjacencyList.JPG)
![2nd Image of Adjacency List](Screenshots/AdjacencyList2.JPG)

### Adjacency Matrix vs List

#### List

- Can take up less space (in sparse graphs)
- Faster to iterate over all edges
- Can be slower to lookup specific edge

#### Matrix

- Takes up more space (in sparse graphs)
- Slower to iterate over all edges
- Faster to lookup specific edge

![AdjacencyMatrixVsList Image](Screenshots/AdjacencyMatrixVsList.JPG)

## Operations - Pseudocode

### Add Vertex

- Write a method called addVertex, which accepts a name of a vertex.
- It should add a key to the adjacency list with the name of the vertex and set its value to be an empty array.

### Add Edge

- This function should accept two vertices, we can call them vertex1 and vertex2.
- This function should find in the adjacency list the key of vertex1 and push vertex2 to the array.
- This function should find in the adjacency list the key of vertex2 and push vertex1 to the array.
- Don't worry about handling errors/invalid vertices.

### Remove Edge

- This function should accept two vertices, we'll call them vertex1 and vertex2
- The function should reassign the key of vertex1 to be an array that does not contain vertex2
- The function should reassign the key of vertex2 to be an array that does not contain vertex1.
- Don't worry about handling errors/invalid vertices.

### Remove Vertex

- This function should accept a vertex to remove
- The function should loop as long as there are any other vertices in the adjacency list for that vertex
- Inside of the loop, call out **removeEdge** function with the vertex we are removing and any values in the adjacency list for that vertex
- Delete the key in the adjacency list for that vertex
