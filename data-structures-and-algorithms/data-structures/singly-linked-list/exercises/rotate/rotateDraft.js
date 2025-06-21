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

  rotate() {
    const half = Math.ceil(this.length / 2);
    let firstHalf = null,
      secondHalf = this.tail;
    let newHead = null,
      newTail = null;
    for (let node = this.head, i = 0; i < this.length; node = node.next, i++) {
      console.log(i);
      console.log("Value: " + node.val);
      if (i < half) {
        secondHalf.next = node;
        secondHalf = node;
        if (i === half - 1) {
          newTail = node;
          newTail.next = null;
          console.log(newTail);
        }
      } else {
        if (firstHalf !== null) firstHalf.next = node;
        firstHalf = node;
        if (i === half) {
          newHead = node;
          newHead.next = node.next;
        }
      }
    }
    this.head = newHead;
    this.tail = newTail;
    return this;
  }
}

function seeLead(startNode) {
  let currentNode = startNode;
  while (currentNode !== null) {
    console.log(`${currentNode.val} -> `);
    currentNode = currentNode.next;
  }
}

function printList(list) {
  let output = "";
  for (let node = list.head, i = 0; i < list.length; node = node.next, i++) {
    console.log(output);
    console.log(node.next);
    if (i !== list.length - 1) {
      output += `${node.val} -> `;
    } else {
      output += node.val;
    }
  }
  console.log(output);
}

function test() {
  const linkedList = new SinglyLinkedList();
  linkedList.push(1).push(2).push(3).push(4).push(5);
  linkedList.rotate();
  printList(linkedList);
}

test();
