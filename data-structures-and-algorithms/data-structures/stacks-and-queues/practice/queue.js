class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    const createdNode = new Node(val);
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
    if (!this.first) {
      return null;
    }
    const removedNode = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.size--;
    return removedNode.val;
  }

  peek() {
    return this.first ? this.first.val : null;
  }

  print() {
    const output = [];
    for (let node = this.first; node !== null; node = node.next) {
      output.push(node.val);
    }
    return `[${output.join(", ")}]`;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function main() {
  const queue = new Queue();
  queue.enqueue("1");
  queue.enqueue("2");
  queue.enqueue("3");
  console.log(queue.peek());
  console.log(queue.print());
  queue.dequeue();
  console.log(queue.print());
}

main();
