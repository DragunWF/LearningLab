/*
SLL - get Exercise
Implement the following on the SinglyLinkedList class

get

This function should find a node at a specified index in a SinglyLinkedList. It 
should return the found node.
*/

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
}
