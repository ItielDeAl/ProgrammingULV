const Pnode = require("./node");

class PriorityQueue {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  //enqueue: insercion manteniendo el orden (mayor prioridad primero)
  enqueue(value, priority) {
    const node = new Pnode(value, priority);
    if (!this.head || priority > this.head.priority) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      while (current.next && current.next.priority >= priority) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
    }
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;
    const node = this.head;
    this.head = this.head.next;
    node.next = null;
    this.length--;
    return node;
  }

  toArray() {
    const out = [];
    let curr = this.head;
    while (curr) {
      out.push({ value: curr.value, priority: curr.priority });
      curr = curr.next;
    }
    return out;
  }
}

module.exports = { PriorityQueue };
