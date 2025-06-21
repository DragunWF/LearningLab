class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    var newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    var current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  findSecondLargest() {
    var data = [];
    function traverse(node) {
      if (node === null) return;
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    if (data.length <= 1) return undefined;
    data.sort((a, b) => b - a);
    return data[1];
  }
}

function test() {
  var binarySearchTree = new BinarySearchTree();
  binarySearchTree.insert(15);
  binarySearchTree.insert(20);
  binarySearchTree.insert(10);
  binarySearchTree.insert(12);
  console.log(binarySearchTree.findSecondLargest()); // returns 15

  var binarySearchTree2 = new BinarySearchTree();
  binarySearchTree2.insert(10);
  console.log(binarySearchTree2.findSecondLargest()); // returns undefined
}

test();
