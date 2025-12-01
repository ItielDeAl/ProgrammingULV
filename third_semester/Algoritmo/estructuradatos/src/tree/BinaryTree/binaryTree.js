const Node = require("./node");

class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  insertarRaiz(valor) {
    this.raiz = new Node(valor);
  }

  insertaHijoIzquierdo(nodoPadre, valor) {
    nodoPadre.izquierda = new Node(valor);
  }

  insertaHijoDerecho(nodoPadre, valor) {
    nodoPadre.derecha = new Node(valor);
  }

  // Preorden: Raíz - Izquierda - Derecha
  preOrden(nodo = this.raiz, recorrido = []) {
    if (nodo != null) {
      recorrido.push(nodo.valor); // visitar la raíz
      this.preOrden(nodo.izquierda, recorrido);
      this.preOrden(nodo.derecha, recorrido);
    }
    return recorrido;
  }

  // Inorden: Izquierda - Raíz - Derecha
  inOrden(nodo = this.raiz, recorrido = []) {
    if (nodo != null) {
      this.inOrden(nodo.izquierda, recorrido);
      recorrido.push(nodo.valor);
      this.inOrden(nodo.derecha, recorrido);
    }
    return recorrido;
  }

  // Postorden: Izquierda - Derecha - Raíz
  postOrden(nodo = this.raiz, recorrido = []) {
    if (nodo != null) {
      this.postOrden(nodo.izquierda, recorrido);
      this.postOrden(nodo.derecha, recorrido);
      recorrido.push(nodo.valor);
    }
    return recorrido;
  }

  // Mostrar el árbol de forma visual en consola
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo == null) return;
    espacio += 5;
    this.mostrar(nodo.derecha, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierda, espacio);
  }
}

module.exports = ArbolBinario;
