/*
Doubly Linked Lists insert / remove - Exercise
Implement the following on the DoublyLinkedList class

insert

This internal/helper function should insert a node at a specified 
index in a DoublyLinkedList. It should return true if the index is 
valid, and false if the index is invalid (less than 0 or greater than 
the length of the list).

remove

This function should remove a node at a specified index in a 
DoublyLinkedList. It should return the removed node. if the index is 
valid, or undefined if the index is invalid.
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
  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    }
    const removedNode = this.get(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    (removedNode.prev = null), (removedNode.next = null);
    this.length--;
    return removedNode;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      return !!this.unshift(val);
    } else if (index === this.length) {
      return !!this.push(val);
    } else {
      const newNode = new Node(val);
      const prevNode = this.get(index - 1);
      newNode.next = prevNode.next;
      newNode.prev = prevNode;
      newNode.next.prev = newNode;
      prevNode.next = newNode;
    }
    this.length++;
    return true;
  }
}
