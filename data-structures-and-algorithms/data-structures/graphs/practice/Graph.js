class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex, otherVertex) {
    if (!this.adjacencyList[otherVertex]) {
      this.addVertex(otherVertex);
    }
    if (this.adjacencyList[vertex]) {
      this.adjacencyList[vertex].push(otherVertex);
    }
    this.adjacencyList[otherVertex].push(vertex);
  }

  removeEdge(vertex, otherVertex) {
    if (this.adjacencyList[vertex] && this.adjacencyList[otherVertex]) {
      Utils.remove(this.adjacencyList[vertex], otherVertex);
      Utils.remove(this.adjacencyList[otherVertex], vertex);
    }
  }

  removeVertex(vertex) {
    // to improve this function, use the removeEdge function
    for (let key of this.adjacencyList[vertex]) {
      for (let i = 0; i < this.adjacencyList[key].length; i++) {
        if (this.adjacencyList[key][i] === vertex) {
          this.adjacencyList[key].splice(i, 1);
          break;
        }
      }
    }
    delete this.adjacencyList[vertex];
  }

  dfs(vertex) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    function helper(vertex) {
      if (!adjacencyList[vertex]) {
        return;
      }
      visited[vertex] = true;
      result.push(vertex);
      for (let node of adjacencyList[vertex]) {
        if (!visited[node]) {
          helper(node);
        }
      }
    }

    helper(vertex);
    return result;
  }

  dfsIterative(vertex) {
    const stack = [vertex];
    const result = [];
    const visited = {};
    visited[vertex] = true;
    while (stack.length) {
      const popped = stack.pop();
      result.push(popped);
      for (let node of this.adjacencyList[popped]) {
        if (!visited[node]) {
          visited[node] = true;
          stack.push(node);
        }
      }
    }
    return result;
  }

  bfs(vertex) {
    const queue = [vertex];
    const result = [];
    const visited = {};
    visited[vertex] = true;
    while (queue.length) {
      const shiftedNode = queue.shift();
      result.push(shiftedNode);
      for (let node of this.adjacencyList[shiftedNode]) {
        if (!visited[node]) {
          visited[node] = true;
          queue.push(node);
        }
      }
    }
    return result;
  }
}

class Utils {
  static remove(array, element) {
    let indexToRemove = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        indexToRemove = i;
        break;
      }
    }
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
  }
}

function videoExample() {
  const graph = new Graph();

  graph.addVertex("A");
  graph.addVertex("B");
  graph.addVertex("C");
  graph.addVertex("D");
  graph.addVertex("E");
  graph.addVertex("F");

  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("B", "D");
  graph.addEdge("C", "E");
  graph.addEdge("D", "E");
  graph.addEdge("D", "F");
  graph.addEdge("E", "F");

  return graph;
}

function ownExample() {
  const graph = new Graph();
  graph.addVertex("Manila");
  graph.addVertex("Antipolo");
  graph.addVertex("Quezon");
  graph.addVertex("Cainta");
  graph.addEdge("Manila", "Quezon");
  graph.addEdge("Antipolo", "Cainta");
  graph.addEdge("Manila", "Cainta");
  graph.addEdge("Antipolo", "Manila");
  // graph.removeVertex("Manila");
  // graph.removeEdge("Antipolo", "Cainta");
  return graph;
}

function bfsTest() {
  let g = new Graph();

  g.addVertex("A");
  g.addVertex("B");
  g.addVertex("C");
  g.addVertex("D");
  g.addVertex("E");
  g.addVertex("F");

  g.addEdge("A", "B");
  g.addEdge("A", "C");
  g.addEdge("B", "D");
  g.addEdge("C", "E");
  g.addEdge("D", "E");
  g.addEdge("D", "F");
  g.addEdge("E", "F");

  return g;
}

function main() {
  const graph = videoExample();
  console.log(graph.dfs("A"));
  console.log(graph.dfsIterative("A"));
  console.log(graph.adjacencyList);

  const bfsGraph = bfsTest();
  console.log(bfsGraph.bfs("A")); // [A, B, C, D, E, F]
}

main();
