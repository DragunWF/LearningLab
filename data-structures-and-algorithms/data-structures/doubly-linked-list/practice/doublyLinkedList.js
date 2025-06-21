class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(startVal) {
    this.head = startVal ? new Node(startVal) : null;
    this.tail = startVal ? this.head : null;
    this.length = this.head ? 1 : 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
    return this;
  }

  pop() {
    if (!this.head) {
      return undefined;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return null;
    }

    const removedNode = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    removedNode.prev = null;
    this.length--;

    return removedNode;
  }

  shift() {
    if (this.length <= 0) {
      return undefined;
    }
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      oldHead.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (this.length <= 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let currentIndex = 0;
    let startAtHead = index <= this.length;
    for (
      let node = startAtHead ? this.head : this.tail;
      node != null;
      node = startAtHead ? node.next : node.prev
    ) {
      if (currentIndex === index) {
        return node;
      }
      currentIndex++;
    }
  }

  set(index, val) {
    const node = this.get(index);
    if (!node) {
      return false;
    }
    node.val = val;
    return true;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      return !!this.unshift(val);
    } else if (index === this.length) {
      return !!this.push(val);
    } else {
      const newNode = new Node(val);
      const prevNode = this.get(index - 1);
      newNode.next = prevNode.next;
      newNode.prev = prevNode;
      newNode.next.prev = newNode;
      prevNode.next = newNode;
    }
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    }
    const removedNode = this.get(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    (removedNode.prev = null), (removedNode.next = null);
    this.length--;
    return removedNode;
  }

  reverse() {
    this.head = this.tail;
    let currentNode = this.tail;
    let prevNode = null;
    while (currentNode !== null) {
      const tempNode = currentNode.prev;
      currentNode.next = currentNode.prev;
      currentNode.prev = prevNode;
      currentNode = tempNode;
      prevNode = currentNode;
    }
    this.tail = prevNode;
    return this;
  }

  print() {
    const output = [];
    for (let node = this.head; node != null; node = node.next) {
      output.push(node.val);
    }
    console.log(output.join(" <-> "));
  }
}

function main() {
  const list = new DoublyLinkedList("Marc");

  list.push("Ace");
  list.push("Jana");
  list.push("Josh");
  list.push("Miguel");

  list.shift();
  list.unshift("Marc");
  list.set(0, "Marc the Second");

  list.reverse();
  list.print();

  list.insert(3, "The Inserted One");
  list.remove(3);

  list.print();

  // console.log(list.get(3));
  // console.log(list.get(1));
}

main();
