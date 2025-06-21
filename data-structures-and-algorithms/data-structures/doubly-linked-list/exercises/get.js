/*
DLL get - Exercise
Implement the following on the DoublyLinkedList.prototype

get

This internal/helper function should find a node at a specified index 
in a DoublyLinkedList. It should return the found node.
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
}
