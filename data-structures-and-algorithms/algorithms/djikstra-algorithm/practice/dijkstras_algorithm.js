class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  dijkstra(start, finish) {
    const priorityQueue = new PriorityQueue();
    const distances = {},
      previous = {};
    const path = [];
    for (let vertex in this.adjacencyList) {
      distances[vertex] = vertex !== start ? Infinity : 0;
      previous[vertex] = null;
      priorityQueue.enqueue(vertex, distances[vertex]);
    }

    while (priorityQueue.values.length) {
      let smallest = priorityQueue.dequeue().val;
      if (finish === smallest) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let vertex in this.adjacencyList[smallest]) {
          const nextNode = this.adjacencyList[smallest][vertex];
          const candidate = distances[smallest] + nextNode.weight;
          const nextVertex = nextNode.node;
          if (candidate < distances[nextVertex]) {
            distances[nextVertex] = candidate;
            previous[nextVertex] = smallest;
            priorityQueue.enqueue(nextVertex, candidate);
          }
        }
      }
    }
    path.reverse();
    path.unshift(start);
    return path;
  }
}

function test() {
  var graph = new WeightedGraph();
  graph.addVertex("A");
  graph.addVertex("B");
  graph.addVertex("C");
  graph.addVertex("D");
  graph.addVertex("E");
  graph.addVertex("F");

  graph.addEdge("A", "B", 4);
  graph.addEdge("A", "C", 2);
  graph.addEdge("B", "E", 3);
  graph.addEdge("C", "D", 2);
  graph.addEdge("C", "F", 4);
  graph.addEdge("D", "E", 3);
  graph.addEdge("D", "F", 1);
  graph.addEdge("E", "F", 1);

  console.log(graph.dijkstra("A", "E"));

  // ["A", "C", "D", "F", "E"]
}

test();
