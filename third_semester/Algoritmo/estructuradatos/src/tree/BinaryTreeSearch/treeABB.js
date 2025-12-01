const NodoABB = require("./nodoABB");

// Clase Árbol Binario de Búsqueda
class ArbolBinarioBusqueda {
  constructor() {
    this.raiz = null;
  }

  // Insertar un valor siguiendo las reglas del ABB
  insertar(valor) {
    // Si no hay raíz, el nuevo nodo se convierte en la raíz
    if (this.raiz === null) {
      this.raiz = new NodoABB(valor);
    } else {
      // Si ya hay raíz, insertamos recursivamente
      this._insertarNodo(this.raiz, valor);
    }
  }

  // Función auxiliar para insertar en el lugar correcto
  _insertarNodo(nodo, valor) {
    // Si el valor es menor, va al subárbol izquierdo
    if (valor < nodo.valor) {
      if (nodo.izquierdo === null) {
        nodo.izquierdo = new NodoABB(valor);
      } else {
        this._insertarNodo(nodo.izquierdo, valor);
      }
    }
    // Si el valor es mayor, va al subárbol derecho
    else if (valor > nodo.valor) {
      if (nodo.derecho === null) {
        nodo.derecho = new NodoABB(valor);
      } else {
        this._insertarNodo(nodo.derecho, valor);
      }
    }
    // Si es igual, no se insertan duplicados
  }

  // Buscar un valor en el árbol
  buscar(valor, nodo = this.raiz) {
    if (nodo === null) return false; // Árbol vacío o fin del camino
    if (valor === nodo.valor) return true; // Encontrado
    if (valor < nodo.valor) return this.buscar(valor, nodo.izquierdo);
    return this.buscar(valor, nodo.derecho);
  }

  // Preorden: Raíz – Izquierda – Derecha
  preOrden(nodo = this.raiz, recorrido = []) {
    if (nodo !== null) {
      recorrido.push(nodo.valor);
      this.preOrden(nodo.izquierdo, recorrido);
      this.preOrden(nodo.derecho, recorrido);
    }
    return recorrido;
  }

  // Inorden: Izquierda – Raíz – Derecha
  inOrden(nodo = this.raiz, recorrido = []) {
    if (nodo !== null) {
      this.inOrden(nodo.izquierdo, recorrido);
      recorrido.push(nodo.valor);
      this.inOrden(nodo.derecho, recorrido);
    }
    return recorrido;
  }

  // Postorden: Izquierda – Derecha – Raíz
  postOrden(nodo = this.raiz, recorrido = []) {
    if (nodo !== null) {
      this.postOrden(nodo.izquierdo, recorrido);
      this.postOrden(nodo.derecho, recorrido);
      recorrido.push(nodo.valor);
    }
    return recorrido;
  }

  // Recorrido Inorden (Izq - Raíz - Der)
  inorden(nodo = this.raiz) {
    if (nodo !== null) {
      this.inorden(nodo.izquierdo);
      console.log(nodo.valor);
      this.inorden(nodo.derecho);
    }
  }

  // Mostrar el árbol visualmente
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecho, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierdo, espacio);
  }
}

// como usarlo

const abb = new ArbolBinarioBusqueda();

// Insertamos los valores
const valores = [50, 30, 70, 20, 40, 60, 80];
for (let i = 0; i < valores.length; i++) {
  abb.insertar(valores[i]);
}

console.log("Estructura del Arbol Binario de Busqueda:");
abb.mostrar();

// Mostrar recorridos
console.log("\nRecorrido Preorden:");
console.log(abb.preOrden().join(", "));

console.log("\nRecorrido Inorden:");
console.log(abb.inOrden().join(", "));

console.log("\nRecorrido Postorden:");
console.log(abb.postOrden().join(", "));

// Buscar valores
console.log("\nBuscar valores:");
console.log("Buscar 40 →", abb.buscar(40));
console.log("Buscar 100 →", abb.buscar(100));
