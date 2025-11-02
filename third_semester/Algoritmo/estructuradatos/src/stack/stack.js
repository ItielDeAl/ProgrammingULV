const Node = require("./node");

class Stack {
  constructor() {
    this.top = null;
    this.count = 0;
  }

  push(value) {
    //inserta un elemento arriba en la pila
    const newNode = new Node(value); //intancia de node
    newNode.next = this.top; // el nuevo nodo apunta al anterior tope
    this.top = newNode;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) return null;
    const value = this.top.value;
    this.top = this.top.next; // el tope baja al siguiente nodo
    this.count--;
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.top.value;
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  print() {
    let current = this.top;
    let output = "";
    while (current) {
      output += current.value + " -> ";
      current = current.next;
    }
    console.log(output + "null");
  }
}

module.exports = Stack;
