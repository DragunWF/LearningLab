/*
DLL reverse - Exercise
reverse

This function should reverse all of the nodes in a DoublyLinkedList, 
and should return the list.
*/

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    var node = new Node(val);
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
      this.length++;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.length++;
    }
    return this;
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
}
