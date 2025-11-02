const CNode = require("./node");

class CircularLinkedList {
  constructor() {
    this.tail = null; //tail.next es head
    this.length = 0;
  }

  //Insertar al final (enqueu)
  insert(value) {
    const node = new CNode(value);
    if (!this.tail) {
      this.tail = node;
      this.tail.next = node; //apuntando a si mimso
    } else {
      node.next = this.tail.next; //node.next = head
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  removeHead() {
    if (!this.tail) return null;
    const head = this.tail.next;
    if (head === this.tail) {
      //unico elemento
      this.tail = null;
    } else {
      this.tail.next = head.next;
    }
    this.length--;
    head.next = null;
    return head;
  }

  //recorrer N elemento (Util para evitar lopps infinitos)
  toArray() {
    const out = [];
    if (!this.tail) return out;
    let current = this.tail.next; // empieza en head
    do {
      out.push(current.value);
      current = current.next;
    } while (current !== this.tail.next);
    return out;
  }
}
module.exports = { CircularLinkedList };