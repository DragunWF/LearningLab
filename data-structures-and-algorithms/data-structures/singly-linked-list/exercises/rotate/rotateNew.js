/*
Link: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/4413070#content

SLL - Rotate Exercise
Implement the following on the SinglyLinkedList class

rotate

This function should rotate all the nodes in the list by some number passed 
in. For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you 
rotate by 2, the list should be modified to 3 -> 4 -> 5 -> 1 -> 2. The 
number passed in to rotate can be any integer.

Time Complexity: O(N), where N is the length of the list.
Space Complexity: O(1)
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
    let newNode = new Node(val);
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

  rotate(n) {
    // test code
    const original = [];
    const rotated = [];
    for (let node = this.head; node !== null; node = node.next) {
      original.push(node.val);
    }

    const head = new Node(
      this.get(n >= 0 ? n % this.length : this.length + n).val
    );
    let tail = head;
    rotated.push(head.val);
    for (let i = 1; i < this.length; i++) {
      let index = Math.abs(n >= 0 ? n + i : i + n) % this.length;
      const createdNode = new Node(this.get(index).val);
      tail.next = createdNode;
      tail = createdNode;

      // test code
      rotated.push(createdNode.val);
    }
    this.head = head;
    this.tail = tail;

    console.log(original);
    console.log(rotated);
  }
}

function test() {
  console.log("Checking Values:");
  var singlyLinkedList = new SinglyLinkedList();
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
  console.log(singlyLinkedList.head.val); // 5
  console.log(singlyLinkedList.tail.val); // 25;
  console.log();

  console.log("Test #1");
  // ssl = 5 -> 10 -> 15 -> 20 -> 25
  // ssl.rotate(3) = 20 -> 25 -> 5 -> 10 -> 15
  singlyLinkedList.rotate(3);
  console.log(singlyLinkedList.head.val); // 20
  console.log(singlyLinkedList.head.next.val); // 25
  console.log(singlyLinkedList.head.next.next.val); // 5
  console.log(singlyLinkedList.head.next.next.next.val); // 10
  console.log(singlyLinkedList.head.next.next.next.next.val); // 15
  console.log(singlyLinkedList.tail.val); // 15
  console.log(singlyLinkedList.tail.next); // null

  console.log("\nTest #2");
  var singlyLinkedList = new SinglyLinkedList();
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
  console.log(singlyLinkedList.head.val); // 5
  console.log(singlyLinkedList.tail.val); // 25;
  // ssl = 5 -> 10 -> 15 -> 20 -> 25
  // ssl.rotate(-1) = 25 -> 5 -> 10 -> 15 -> 20
  singlyLinkedList.rotate(-1);
  console.log(singlyLinkedList.head.val); // 25
  console.log(singlyLinkedList.head.next.val); // 5
  console.log(singlyLinkedList.head.next.next.val); // 10
  console.log(singlyLinkedList.head.next.next.next.val); // 15
  console.log(singlyLinkedList.head.next.next.next.next.val); // 20
  console.log(singlyLinkedList.tail.val); // 20
  console.log(singlyLinkedList.tail.next); // null

  console.log("\nTest #3");
  var singlyLinkedList = new SinglyLinkedList();
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
  console.log(singlyLinkedList.head.val); // 5
  console.log(singlyLinkedList.tail.val); // 25;

  singlyLinkedList.rotate(1000);
  console.log(singlyLinkedList.head.val); // 5
  console.log(singlyLinkedList.head.next.val); // 10
  console.log(singlyLinkedList.head.next.next.val); // 15
  console.log(singlyLinkedList.head.next.next.next.val); // 20
  console.log(singlyLinkedList.head.next.next.next.next.val); // 25
  console.log(singlyLinkedList.tail.val); // 25
  console.log(singlyLinkedList.tail.next); // null
}

test();
