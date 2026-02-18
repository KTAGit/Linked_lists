class LinkedList {
  constructor() {
    this.headNode = null;
    this.currentSize = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head()) {
      this.headNode = node;
      this.headNode.nextNode = null;
    } else {
      let currentNode = this.headNode;
      while (currentNode) {
        if (currentNode.nextNode === null) {
          const lastNode = currentNode;
          lastNode.nextNode = node;
          node.nextNode = null;
        }
        currentNode = currentNode.nextNode;
      }
    }
    this.currentSize++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head()) {
      node.nextNode = this.headNode;
      this.headNode = node;
    } else {
      this.headNode = node;
    }
    this.currentSize++;
  }

  size() {
    return this.currentSize;
  }

  head() {
    if (this.headNode !== null) {
      return this.headNode.value;
    }
    return undefined;
  }

  tail() {
    if (this.currentSize === 0) {
      return undefined;
    } else {
      let currentNode = this.headNode;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      return currentNode.value;
    }
  }

  at(index) {
    if (index < 0 || index >= this.currentSize) return undefined;

    let current = this.headNode;
    let count = 0;

    while (current) {
      if (count === index) return current.value;
      current = current.nextNode;
      count++;
    }
  }

  pop() {
    if (!this.headNode) return undefined;

    const removed = this.headNode;
    this.headNode = this.headNode.nextNode;
    this.currentSize--;

    return removed.value;
  }

  contains(value) {
    let currentNode = this.headNode;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let currentNode = this.headNode;
    let count = 0;
    while (currentNode) {
      if (value === currentNode.value) {
        return count;
      }
      currentNode = currentNode.nextNode;
      count++;
    }
    return -1;
  }

  toString() {
    let currentNode = this.headNode;
    let result = "";
    let count = 0;
    while (currentNode) {
      let add = result + `( ${currentNode.value} ) -> `;
      result = add;
      currentNode = currentNode.nextNode;
      count++;
    }
    return result + null;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.currentSize) {
      throw new RangeError();
    }
    if (index === this.currentSize) {
      values.forEach((value) => {
        this.append(value);
      });
    } else {
      let currentNode = this.headNode;
      let count = 0;
      let beforeIndexNode = null;
      let afterIndexNode = null;
      let tempIndex = index - 1;
      while (index >= count) {
        if (count === tempIndex) {
          beforeIndexNode = currentNode;
        }
        if (count === index) {
          afterIndexNode = currentNode;

          let tempNode = null;
          let countIn = 0;
          values.forEach((value) => {
            let newNode = null;
            if (countIn === 0) {
              newNode = new Node(value);
              if (beforeIndexNode !== null) {
                beforeIndexNode.nextNode = newNode;
              } else {
                this.headNode = newNode;
              }
              tempNode = newNode;
            } else if (countIn === values.length - 1) {
              newNode = new Node(value);
              tempNode.nextNode = newNode;
              newNode.nextNode = afterIndexNode;
            } else if (countIn > 0 && countIn < values.length) {
              newNode = new Node(value);
              tempNode.nextNode = newNode;
            }
            this.currentSize++;
            countIn++;
          });
        }
        currentNode = currentNode.nextNode;
        count++;
      }
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.currentSize) {
      throw new RangeError();
    }
    let currentNode = this.headNode;
    let beforeIndexNode = null;
    let afterIndexNode = null;
    let count = 0;

    while (count <= index) {
      if (index !== 0 && index - 1 === count) {
        beforeIndexNode = currentNode;
      } else if (index === 0) {
        let secondNode = currentNode.nextNode;
        this.headNode = secondNode;
        this.currentSize--;
      } else if (index === count) {
        if (!currentNode) {
          afterIndexNode = null;
        } else {
          afterIndexNode = currentNode.nextNode;
        }
        beforeIndexNode.nextNode = afterIndexNode;
        this.currentSize--;
      }
      if (currentNode) {
        currentNode = currentNode.nextNode;
      }

      count++;
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
