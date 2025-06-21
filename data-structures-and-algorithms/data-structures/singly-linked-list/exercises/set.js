/*
SLL - set Exercise
Implement the following on the SinglyLinkedList class

set

This function should accept an index and a value and update the value of 
the node in the SinglyLinkedList at the index with the new value. It should 
return true if the node is updated successfully, or false if an invalid 
index is passed in.
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
    if (index < 0 || index >= this.length) return null;
    var counter = 0;
    var current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(val, index) {
    const node = this.get(index);
    if (node === null) {
      return false;
    }
    node.val = val;
    return true;
  }
}
