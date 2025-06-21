/*
SLL - push Exercise
Implement the following on the SinglyLinkedList class:

push

This function should take in a value and add a node to the end of the 
SinglyLinkedList. It should return the SinglyLinkedList.
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(val) {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const createdNode = new Node(val);
    if (this.head === null) {
      this.head = createdNode;
      this.tail = createdNode;
    } else {
      this.tail.next = createdNode;
      this.tail = createdNode;
    }
    this.length++;
    return this;
  }
}
