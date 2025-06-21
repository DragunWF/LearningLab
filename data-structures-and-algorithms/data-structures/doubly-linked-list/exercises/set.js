/*
DLL set - Exercise
Implement the following on the DoublyLinkedList.prototype

set

This function should accept an index and a value and update the value of the 
node in the DoublyLinkedList at the index with the new value. It should 
return true if the node is updated successfully, or false if an invalid 
index is passed in.
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
  set(index, val) {
    const node = this.get(index);
    if (!node) {
      return false;
    }
    node.val = val;
    return true;
  }
}
