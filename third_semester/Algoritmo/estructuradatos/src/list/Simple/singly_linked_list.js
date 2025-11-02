//   var frutas = ['piña','sandia','melon'];
//   frutas.push('platano');
//   //['piña','sandia','melon', 'platano'];
//     frutas.unshift('fresa')
//  //['fresa','piña','sandia','melon', 'platano'];
const Node = require("./node");

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  //insertar un nodo al final (push)
  push(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  //Inserta al inicio
  unshift(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
  }

  //Busca el primer nodo con el valor
  find(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }
  }

  //eliminar por posicion
  removeat(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) {
      const remove = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return remove;
    }
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }
    const remove = prev.next;
    prev.next = remove.next;
    if (remove === this.tail) this.tail = prev;
    this.length--;
    return remove;
  }

  //convertir a array para mostrar
  toArray() {
    const out = [];
    let curr = this.head;
    while (curr) {
      out.push(curr.value);
      curr = curr.next;
    }
    return out;
  }
  insert(index, value) {
    // índice fuera de rango
    if (index < 0 || index > this.length) return false;

    // push si es al final
    if (index === this.length) {
      this.push(value);
      return true;
    }

    //unshift si es al inicio
    if (index === 0) {
      this.unshift(value);
      return true;
    }

    //insertar en medio
    const node = new Node(value);
    let prev = this.head;
    
    // Iterar para encontrar el nodo
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }
    const temp = prev.next; 
    // Apuntar 'prev' al nuevo nodo
    prev.next = node;
    // Apuntar el nuevo nodo al resto de la lista
    node.next = temp;
    this.length++;
    return true;
  }

  pop() {
    // Lista vacía
    if (this.length === 0) return null;
    let curr = this.head;
    let prev = null; // Guardará el penúltimo nodo

    // Iteramos hasta que 'curr' sea el último nodo (la cola)
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    //Lista con un solo elemento
    if (!prev) {
      this.head = null;
      this.tail = null;
    } else {
    //Lista con > 1 elemento
      prev.next = null; // Cortar el enlace al último nodo
      this.tail = prev;  // Actualizar la cola para que sea el penúltimo
    }
    this.length--;
    return curr; // Devolver el nodo eliminado
  }
}

module.exports = { SinglyLinkedList };
