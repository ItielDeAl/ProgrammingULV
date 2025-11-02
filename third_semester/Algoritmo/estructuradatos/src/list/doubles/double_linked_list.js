//regla o caracteristica:
//cada nodo tiene value, next y un prev.
const DNode = require("./node");

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }

  unshift(value) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
  }

  pop() {
    if (!this.tail) return null;
    const remove = this.tail;
    this.tail = remove.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    remove.prev = null;
    this.length--;
    return remove;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) return null;

    //Eliminando la cabeza
    if (index === 0) {
      const remove = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      remove.next = null; 
      this.length--;
      return remove;
    }

    //Eliminando la cola
    if (index === this.length - 1) return this.pop();

    //Eliminando en medio
    let current;
    // Buscar el nodo
    if (index < this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }
    current.prev.next = current.next;
    current.next.prev = current.prev;

    // Limpiar punteros del nodo eliminado
    current.next = null;
    current.prev = null;

    this.length--;
    return current;
  }

  toArrayForward() {
    const out = [];
    let curr = this.head;
    while (curr) {
      out.push(curr.value);
      curr = curr.next;
    }
    return out;
  }

  toArrayBackward() {
    const out = [];
    let curr = this.tail;
    while (curr) {
      out.push(curr.value);
      curr = curr.prev;
    }
    return out;
  }
}

module.exports = { DoubleLinkedList };
