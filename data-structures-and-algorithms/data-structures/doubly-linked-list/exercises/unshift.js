/*
Implement the following on the DoublyLinkedList class

unshift

This function should accept a value and add a node to the beginning of 
the DoublyLinkedList with the given value. It should return the 
DoublyLinkedList.
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
    var node = new Node(val);
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  unshift(val) {
    const newNode = new Node(val);
    if (this.head === null) {
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
}
