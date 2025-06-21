class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(val) {
    const createdNode = new Node(val);
    if (this.size === 0) {
      this.first = createdNode;
      this.last = createdNode;
    } else {
      const tempNode = this.first;
      this.first = createdNode;
      this.first.next = tempNode;
    }
    return ++this.size;
  }

  pop() {
    if (this.size === 0) {
      return null;
    }
    const tempNode = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.size--;
    return tempNode.val;
  }

  peek() {
    return this.first ? this.first.val : null;
  }
}

function main() {
  const stack = new Stack();
  stack.push("Math Notebook");
  stack.push("English Notebook");
  console.log(stack.peek()); // English Notebook
  stack.push("Filipino Notebook");
  console.log(stack.peek()); // Filipino Notebook
  stack.pop();
  stack.pop();
  console.log(stack.peek()); // Math Notebook
  console.log(stack.size); // 1
}

main();

// For reference, ignore this
class LinkedList {
  constructor(val) {
    this.head = val ? new Node(val) : null;
    this.tail = this.head;
    this.size = this.head ? 1 : 0;
  }

  push(val) {
    if (this.size === 0) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      const newNode = new Node(val);
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }

  pop() {
    const removedNode = this.tail;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
    } else if (this.size > 0) {
      for (let node = this.head; node !== null; node = node.next) {
        if (node.next.next === null) {
          node.next = null;
          this.tail = node;
          break;
        }
      }
      this.size--;
    }
    return removedNode;
  }

  peek() {
    return this.tail ? this.tail.val : null;
  }
}
