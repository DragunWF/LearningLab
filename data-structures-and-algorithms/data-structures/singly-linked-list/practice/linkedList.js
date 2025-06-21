class LinkedList {
  #length;

  constructor(head) {
    if (head === null) {
      throw new Error("Head of a linked list cannot be null!");
    }
    this.head = head;
    this.tail = head;
    this.#length = 1;
  }

  push(value) {
    this.#length++;
    this.tail.next = new Node(null, value);
    this.tail = this.tail.next;
  }

  shift(value) {
    this.#length++;
    this.head = new Node(this.head, value);
  }

  search(target) {
    for (let node = this.head; node !== null; node = node.next) {
      if (node.value === target) {
        return node;
      }
    }
    return null;
  }

  size() {
    return this.#length;
  }

  pop() {}
}

class Node {
  constructor(next, value) {
    this.next = next;
    this.value = value;
  }
}

function main() {
  const linkedList = new LinkedList(new Node(null, 0));
  const randomizeElements = true;

  const itemsAmount = 10;
  const randomRangeLimit = 35;
  for (let i = 1; i <= itemsAmount; i++) {
    if (randomizeElements) {
      const randomNum = Math.floor(Math.random() * randomRangeLimit);
      linkedList.shift(randomNum);
    } else {
      linkedList.shift(i);
    }
  }

  let count = 0;
  for (let node = linkedList.head; node != null; node = node.next) {
    count++;
    console.log(node.value);
  }
  console.log(`Iter Count: ${count}, Linked List Length: ${linkedList.size()}`);
}

main();
