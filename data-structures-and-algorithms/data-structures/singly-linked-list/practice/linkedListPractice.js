class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    let nodeRemoved = undefined;
    for (let node = this.head; node != null; node = node.next) {
      if (!node.next.next) {
        nodeRemoved = node.next;
        node.next = null;
        this.tail = node;
        this.length--;
        if (!this.length) this.tail = null;
        break;
      }
    }
    return nodeRemoved;
  }

  shift() {
    if (!this.head) {
      return undefined;
    }
    const removedNode = this.head;
    this.head = this.head.next;
    this.length--;
    if (!this.length) this.tail = null;
    return removedNode;
  }

  unshift(val) {
    const createdNode = new Node(val);
    if (!this.head) {
      this.head = createdNode;
      this.tail = createdNode;
    } else {
      createdNode.next = this.head;
      this.head = createdNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let currentIndex = 0;
    for (let node = this.head; node != null; node = node.next) {
      if (currentIndex === index) {
        return node;
      }
      currentIndex++;
    }
  }

  set(val, index) {
    const node = this.get(index);
    if (node === null) {
      return false;
    }
    node.val = val;
    return true;
  }

  insert(val, index) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === this.length - 1) {
      this.push(val);
      return true;
    } else if (index === 0) {
      this.unshift(val);
      return true;
    }

    const newNode = new Node(val);
    const node = this.get(index);
    newNode.next = node.next;
    node.next = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return undefined;
    } else if (index === this.length - 1) {
      return this.pop();
    } else if (index === 0) {
      return this.shift();
    }
    const previousNode = this.get(index);
    const removedNode = previousNode.next;
    previousNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }

  reverse() {
    let start = this.tail;
    let currentHead = this.tail;

    while (this.head.next != null) {
      checkLinks(start);
      for (let node = this.head; node != null; node = node.next) {
        if (node.next.next === null) {
          node.next = null;
          currentHead.next = node;
          currentHead = node;
          break;
        }
      }
    }

    currentHead.next = this.head;
    this.head.next = null;
    this.head = this.tail;
    this.tail = currentHead;

    checkLinks(start);
    return this;
  }
}

function checkLinks(head) {
  output = [];
  for (let node = head; node != null; node = node.next) {
    output.push(node.val);
  }
  console.log(output.join(" -> "));
}

function checkList(linkedList, onlyValue = false) {
  for (let node = linkedList.head; node != null; node = node.next) {
    console.log(onlyValue ? node.val : node);
  }
}

function main() {
  var list = new SinglyLinkedList();
  list.push("HELLO");
  list.push("THERE");
  list.push("MAN");
  list.push("GOODBYE");
  // list.unshift("ALIEN");

  // console.log("\nBefore operation\n");
  // checkList(list, true);

  // // list.shift();
  // // list.pop();
  // list.set("MONSTER", 2);
  // list.insert("AFTER GOODBYE", 1);
  // // list.remove(1);
  // // list.remove(0);
  // // console.log(list.pop());

  // console.log("\nAfter operation\n");
  // checkList(list, true);

  console.log("\n-------> Before Reverse <-------\n");
  checkLinks(list.head);
  console.log("\n-------> Reverse in Process <-------\n");
  list.reverse();
  console.log("\n-------> After Reverse <-------\n");
  checkLinks(list.head);
  // checkList(list, true);

  console.log();
  // console.log("Get GOODBYE Index:");
  // console.log(list.get(1));
}

main();
