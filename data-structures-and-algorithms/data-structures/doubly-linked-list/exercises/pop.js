/*
DLL pop - Exercise
Implement the following on the DoublyLinkedList class

pop

This function should remove a node at the end of the DoublyLinkedList. It 
should return the node removed.
*/

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
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
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
}
