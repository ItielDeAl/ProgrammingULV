const Node = require("./node");

class queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  //agregar un elemento a la cola
  enqueue(value) {
    const newNode = new Node(value);
    if (!this.rear) {
      // si la cola esta vacia
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  //Elimina un elemento en la cola
  dequeue() {
    if (!this.front) return null; //cola vacia
    const remove = this.front;
    this.front = this.front.next;

    if (!this.front) {
      this.rear = null; //cola queda vacia
    }

    this.size--;

    return remove.value;
  }

  printQueue() {
    let current = this.front;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }

  peek() {
    return this.front ? this.front.value : null;
  }

  isEmpty() {
    return this.size === 0;
  }

  sized() {
    return this.size;
  }
}

module.exports = queue;
