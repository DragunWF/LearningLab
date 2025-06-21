class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const createdNode = new Node(value);
    if (!this.root) {
      this.root = createdNode;
      return;
    }

    function helper(currentNode) {
      if (currentNode.value === createdNode.value) return;
      const isGreater = createdNode.value > currentNode.value;
      const next = isGreater ? currentNode.right : currentNode.left;
      if (next !== null) return helper(next);
      if (isGreater) currentNode.right = createdNode;
      else currentNode.left = createdNode;
    }

    helper(this.root);
  }

  find(value) {
    if (!this.root) return undefined;
    if (this.root.value === value) return this.root;

    function helper(currentNode) {
      if (value === currentNode.value) return currentNode;
      const next =
        value > currentNode.value ? currentNode.right : currentNode.left;
      if (!next) return undefined;
      return helper(next);
    }

    return helper(this.root);
  }

  // Breadth-First Search
  bfs() {
    const queue = [this.root];
    const visited = [];

    while (queue.length) {
      const dequeuedNode = queue.shift();
      visited.push(dequeuedNode.value);
      if (dequeuedNode.left) queue.push(dequeuedNode.left);
      if (dequeuedNode.right) queue.push(dequeuedNode.right);
    }

    return visited;
  }

  // Depth-First Search Pre Order
  dfsPreOrder() {
    const visited = [];
    let current = this.root;

    function helper(node) {
      visited.push(node.value);
      if (node.left) helper(node.left);
      if (node.right) helper(node.right);
    }

    helper(current);
    return visited;
  }

  // Depth-First Search Post Order
  dfsPostOrder() {
    const visited = [];
    const current = this.root;

    function helper(node) {
      if (node.left) helper(node.left);
      if (node.right) helper(node.right);
      visited.push(node.value);
    }

    helper(current);
    return visited;
  }

  dfsInOrder() {
    const visited = [];
    const current = this.root;

    function helper(node) {
      if (node.left) helper(node.left);
      visited.push(node.value);
      if (node.right) helper(node.right);
    }

    helper(current);
    return visited;
  }

  print(goLeft) {
    const output = [];
    for (
      let node = this.root;
      node !== null;
      node = goLeft ? node.left : node.right
    ) {
      output.push(node.value);
    }
    console.log(`[${output.join(" ")}]`);
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const createdNode = new Node(value);
    if (!this.first) {
      this.first = createdNode;
      this.last = createdNode;
    } else {
      this.last.next = createdNode;
      this.last = createdNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.size) return undefined;
    const removedNode = this.first;
    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.size--;
    return removedNode;
  }

  print() {
    const output = [];
    for (let node = this.first; node !== null; node = node.next) {}
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function test() {
  const tree = new BinarySearchTree();
  for (let i = 5; i <= 30; i++) {
    tree.insert(i);
  }
  for (let i = 4; i >= -30; i--) {
    tree.insert(i);
  }

  console.log("Left of Tree");
  tree.print(false);
  console.log("Right of Tree");
  tree.print(true);

  console.log(tree.find(29));
}

function main() {
  const exampleTree = new BinarySearchTree();
  insertValuesFromVid(exampleTree);
  console.log(exampleTree.bfs()); // [10, 6, 15, 3, 8, 20]
  console.log(exampleTree.dfsPreOrder()); // [10, 6, 3, 8, 15, 20]
  console.log(exampleTree.dfsPostOrder()); // [3, 8, 6, 20, 15, 10]
  console.log(exampleTree.dfsInOrder()); // [3, 6, 8, 10, 15, 20]
}

function insertValuesFromVid(tree) {
  tree.insert(10);
  tree.insert(6);
  tree.insert(15);
  tree.insert(3);
  tree.insert(8);
  tree.insert(20);
  // tree.insert(10);
  // tree.insert(5);
  // tree.insert(13);
  // tree.insert(11);
  // tree.insert(2);
  // tree.insert(16);
  // tree.insert(7);
}

main();
