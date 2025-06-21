/*
Psuedocode
- If there are no nodes in the list, return `undefined`
- Loop through the list until you reach the tail
- Set the next property of the 2nd to last node to be null
- Set the tail to be the 2nd to last node
- Decrement the length of the list by 1
- Return the value of the node removed
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

  pop() {
    let nodeRemoved = undefined;
    for (let node = this.head; node != null; node = node.next) {
      if (!node.next.next) {
        nodeRemoved = node.next;
        node.next = null;
        this.tail = node;
        this.length--;
        break;
      }
    }
    return nodeRemoved;
  }
}

function checkList(linkedList, onlyValue = false) {
  for (let node = linkedList.head; node != null; node = node.next) {
    console.log(onlyValue ? node.val : node);
  }
}

function main() {
  var list = new SinglyLinkedList();
  list.push("HELLO");
  list.push("GOODBYE");
  list.push("MAN");

  console.log("Before pop");
  checkList(list, true);

  list.pop();
  // console.log(list.pop());

  console.log("After pop");
  checkList(list, true);
}

main();
