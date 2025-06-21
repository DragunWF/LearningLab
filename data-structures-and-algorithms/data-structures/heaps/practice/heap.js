class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp(this.values.length - 1);
  }

  extractMax() {
    const temp = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values[this.values.length - 1] = temp;
    const removedNode = this.values.pop();

    let index = 0;
    while (true) {
      let tempParent = this.values[index];
      const leftChild = 2 * index + 1,
        rightChild = 2 * index + 2;
      const isLeftGreater =
        leftChild < this.values.length &&
        this.values[leftChild] > this.values[index];
      const isRightGreater =
        rightChild < this.values.length &&
        this.values[rightChild] > this.values[index];

      if (isLeftGreater && isRightGreater) {
        const greaterElement = Math.max(
          this.values[rightChild],
          this.values[leftChild]
        );
        const chosenIndex =
          this.values[leftChild] === greaterElement ? leftChild : rightChild;
        this.values[index] = this.values[chosenIndex];
        this.values[chosenIndex] = tempParent;
        index = chosenIndex;
      } else if (isLeftGreater) {
        this.values[index] = this.values[leftChild];
        this.values[leftChild] = tempParent;
        index = leftChild;
      } else if (isRightGreater) {
        this.values[index] = this.values[rightChild];
        this.values[rightChild] = tempParent;
        index = rightChild;
      } else {
        break;
      }
    }

    return removedNode;
  }

  bubbleUp(currentIndex) {
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    if (this.values[currentIndex] > this.values[parentIndex]) {
      const temp = this.values[currentIndex];
      this.values[currentIndex] = this.values[parentIndex];
      this.values[parentIndex] = temp;
      this.bubbleUp(parentIndex);
    }
  }
}

function test() {
  const heap = new MaxBinaryHeap();
  heap.values = [41, 39, 33, 18, 27, 12];
  heap.insert(55);
  console.log(heap.values);

  const secondHeap = new MaxBinaryHeap();
  heap.values = [41, 39, 33, 18, 27, 12];
  heap.extractMax();
  console.log(heap.values); // [39, 27, 33, 18, 12]
}

test();
