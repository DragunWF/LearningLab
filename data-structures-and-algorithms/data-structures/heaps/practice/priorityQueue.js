class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node) {
    this.values.push(node);
    this.bubbleUp();
  }

  //   dequeue() {
  //     const temp = this.values[0];
  //     this.values[0] = this.values[this.values.length - 1];
  //     this.values[this.values.length - 1] = temp;
  //     const removedNode = this.values.pop();

  //     let index = 0;
  //     while (true) {
  //       const leftChildIndex = 2 * index + 1,
  //         rightChildIndex = 2 * index + 2;
  //       const isLeftLesser =
  //         leftChildIndex < this.values.length &&
  //         this.values[leftChildIndex].priority < this.values[index].priority;
  //       const isRightLesser =
  //         rightChildIndex < this.values.length &&
  //         this.values[rightChildIndex].priority < this.values[index].priority;

  //       if (isLeftLesser && isRightLesser) {
  //         const lesserElement = Math.min(
  //           this.values[rightChildIndex].priority,
  //           this.values[leftChildIndex].priority
  //         );
  //         const chosenIndex =
  //           this.values[leftChildIndex] === lesserElement
  //             ? leftChildIndex
  //             : rightChildIndex;
  //         this.swap(index, chosenIndex);
  //         index = chosenIndex;
  //       } else if (isRightLesser) {
  //         this.swap(index, rightChildIndex);
  //         index = rightChildIndex;
  //       } else if (isLeftLesser) {
  //         this.swap(index, leftChildIndex);
  //         index = leftChildIndex;
  //       } else {
  //         break;
  //       }
  //     }
  //
  //    return removedNode;
  //  }

  dequeue() {
    const temp = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values[this.values.length - 1] = temp;
    const removedNode = this.values.pop();

    let index = 0;
    while (true) {
      const leftChildIndex = 2 * index + 1,
        rightChildIndex = 2 * index + 2;
      const currentElement = this.values[index]
        ? this.values[index].priority
        : null;
      const leftChildElement =
        leftChildIndex < this.values.length
          ? this.values[leftChildIndex].priority
          : Infinity;
      const rightChildElement =
        rightChildIndex < this.values.length
          ? this.values[rightChildIndex].priority
          : Infinity;

      if (
        currentElement > leftChildElement ||
        currentElement > rightChildElement
      ) {
        const swapIndex =
          leftChildElement < rightChildElement
            ? leftChildIndex
            : rightChildIndex;
        this.swap(index, swapIndex);
        index = swapIndex;
      } else {
        break;
      }
    }

    return removedNode;
  }

  swap(index, otherIndex) {
    const temp = this.values[index];
    this.values[index] = this.values[otherIndex];
    this.values[otherIndex] = temp;
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const element = this.values[index] ? this.values[index].priority : null;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex]
        ? this.values[parentIndex].priority
        : null;
      if (element >= parent) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

function main() {
  const priorityQueue = new PriorityQueue();
  const patients = [
    new Node("common cold", 5),
    new Node("gunshot wound", 1),
    new Node("high fever", 4),
    new Node("broken arm", 2),
    new Node("glass in foot", 3),
  ];
  for (let node of patients) {
    priorityQueue.enqueue(node);
  }
  console.log(priorityQueue.values);

  for (let i = 0; i < patients.length; i++) {
    console.log(priorityQueue.dequeue());
  }
}

main();
