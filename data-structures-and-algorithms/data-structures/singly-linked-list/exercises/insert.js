/*
SLL - insert Exercise
Implement the following on the SinglyLinkedList class

insert

This should insert a node at a specified index in a SinglyLinkedList. It should return true if 
the index is valid, and false if the index is invalid (less than 0 or greater than the length of 
the list).
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
  unshift(val) {
    const createdNode = new Node(val);
    if (!this.head) {
      this.head = createdNode;
      this.tail = createdNode;
    } else {
      createdNode.next = this.head;
      this.head = createdNode;
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
  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === this.length) {
      return !!this.push(val);
    } else if (index === 0) {
      return !!this.unshift(val);
    }

    const createdNode = new Node(val);
    const node = this.get(index - 1);
    createdNode.next = node.next;
    node.next = createdNode;
    this.length++;
    return true;
  }
}

function test() {
  var singlyLinkedList = new SinglyLinkedList();
  singlyLinkedList.push(5).push(10).push(15).push(20);
  console.log(singlyLinkedList.insert(2, 12)); // true
  console.log(singlyLinkedList.insert(100, 12)); // false
  console.log(singlyLinkedList.length); // 5
  console.log(singlyLinkedList.head.val); // 5
  console.log(singlyLinkedList.head.next.val); // 10
  console.log(singlyLinkedList.head.next.next.val); // 12
  console.log(singlyLinkedList.head.next.next.next.val); // 15
  console.log(singlyLinkedList.head.next.next.next.next.val); // 20

  console.log(singlyLinkedList.insert(5, 25)); // true
  console.log(singlyLinkedList.head.next.next.next.next.next.val); //25
  console.log(singlyLinkedList.tail.val); // 25
}

test();
