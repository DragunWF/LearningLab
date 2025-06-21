/*
SLL - pop exercise
Implement the following on the SinglyLinkedList.prototype:

pop

This function should remove a node at the end of the SinglyLinkedList. 
It should return the node removed.
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
}
