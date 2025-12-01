const NodoAVL = require("./nodeAVL");

class ArbolAVL {
  constructor() {
    this.raiz = null;
  }

  // Obtener la altura de un nodo
  altura(nodo) {
    if (nodo === null) return 0;
    return nodo.altura;
  }

  // Calcular el factor de equilibrio
  factorBalance(nodo) {
    if (nodo === null) return 0;
    return this.altura(nodo.izquierdo) - this.altura(nodo.derecho);
  }

  // Rotación simple a la derecha
  rotarDerecha(y) {
    const x = y.izquierdo;
    const T2 = x.derecho;

    // Realizar rotación
    x.derecho = y;
    y.izquierdo = T2;

    // Actualizar alturas
    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));
    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));

    // Nueva raíz del subárbol
    return x;
  }

  // Rotación simple a la izquierda
  rotarIzquierda(x) {
    const y = x.derecho;
    const T2 = y.izquierdo;

    // Rotar
    y.izquierdo = x;
    x.derecho = T2;

    // Actualizar alturas
    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));
    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));

    return y;
  }

  // Insertar un valor en el árbol AVL
  insertar(valor) {
    this.raiz = this._insertarRec(this.raiz, valor);
  }

  _insertarRec(nodo, valor) {
    // Inserción normal de ABB
    if (nodo === null) return new NodoAVL(valor);

    if (valor < nodo.valor)
      nodo.izquierdo = this._insertarRec(nodo.izquierdo, valor);
    else if (valor > nodo.valor)
      nodo.derecho = this._insertarRec(nodo.derecho, valor);
    else return nodo; // No se permiten duplicados

    // Actualizar altura
    nodo.altura =
      1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));

    // Obtener el factor de balance
    const balance = this.factorBalance(nodo);

    // Casos de rotaciones
    if (balance > 1 && valor < nodo.izquierdo.valor)
      return this.rotarDerecha(nodo); // Izquierda-Izquierda
    if (balance < -1 && valor > nodo.derecho.valor)
      return this.rotarIzquierda(nodo); // Derecha-Derecha
    if (balance > 1 && valor > nodo.izquierdo.valor) {
      // Izquierda-Derecha
      nodo.izquierdo = this.rotarIzquierda(nodo.izquierdo);
      return this.rotarDerecha(nodo);
    }
    if (balance < -1 && valor < nodo.derecho.valor) {
      // Derecha-Izquierda
      nodo.derecho = this.rotarDerecha(nodo.derecho);
      return this.rotarIzquierda(nodo);
    }

    return nodo; // Nodo balanceado
  }

  // Recorrido Inorden (para ver orden)
  inorden(nodo = this.raiz) {
    if (nodo !== null) {
      this.inorden(nodo.izquierdo);
      console.log(nodo.valor);
      this.inorden(nodo.derecho);
    }
  }

  // Mostrar árbol visualmente
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecho, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierdo, espacio);
  }
}

// ======= Ejemplo de uso =======

const avl = new ArbolAVL();
const valoresAVL = [10, 20, 30, 40, 50, 25];

// Insertamos uno a uno
for (let i = 0; i < valoresAVL.length; i++) {
  avl.insertar(valoresAVL[i]);
}

console.log("Estructura visual del Árbol AVL balanceado:");
avl.mostrar();

console.log("\nRecorrido Inorden del AVL:");
avl.inorden();
