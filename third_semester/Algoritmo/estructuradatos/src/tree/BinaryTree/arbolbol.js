
const Node = require("./node"); 

class ArbolExpresionBooleana { 

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
// Mostrar el árbol de forma visual en consola
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo == null) return;
    espacio += 5;
    this.mostrar(nodo.derecha, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierda, espacio);
  }

  construirExpresion1() {
    // Raíz: OR
    this.insertarRaiz("OR"); 
    const raiz = this.raiz;

    // Hijo Derecho: true 
    this.insertaHijoDerecho(raiz, "true"); 

    // Hijo Izquierdo: (true AND false) -> Nodo raíz: AND
    this.insertaHijoIzquierdo(raiz, "AND"); 
    const nodoAnd = raiz.izquierda;

    // Hijos del AND
    this.insertaHijoIzquierdo(nodoAnd, "true"); // Operando izquierdo del AND
    this.insertaHijoDerecho(nodoAnd, "false"); // Operando derecho del AND

    console.log("Árbol 1 construido: (true AND false) OR true");
  }

  
  construirExpresion2() {
    // Raíz: AND
    this.insertarRaiz("AND");
    const raiz = this.raiz;

    // Rama Izquierda: (true OR false) -> Nodo raíz: OR
    this.insertaHijoIzquierdo(raiz, "OR");
    const nodoOr = raiz.izquierda;
    
    // Hijos del OR
    this.insertaHijoIzquierdo(nodoOr, "true");
    this.insertaHijoDerecho(nodoOr, "false");

    // Rama Derecha: NOT false -> Nodo raíz: NOT
    this.insertaHijoDerecho(raiz, "NOT");
    const nodoNot = raiz.derecha;
    
    // Hijo del NOT (el operador NOT solo tiene un operando, que es su hijo izquierdo por convención)
    this.insertaHijoIzquierdo(nodoNot, "false");
    // El hijo derecho del NOT se deja como null

    console.log("Árbol 2 construido: (true OR false) AND NOT false");
  }


  evaluarExpresion(nodo = this.raiz) {
    // 1. Caso Base: Si el nodo es nulo (no debería pasar si está bien construido).
    if (nodo === null) {
      return false; // Devuelve un valor por defecto
    }

    // 2. Caso Base: Si el nodo es una hoja (contiene 'true' o 'false').
    // Convertimos la cadena ('true'/'false') a un valor booleano nativo de JS.
    if (nodo.valor === "true" || nodo.valor === "false") {
      return nodo.valor === "true"; // Retorna true o false
    }

    // Evaluamos primero el subárbol izquierdo (operando izquierdo)
    const valorIzquierdo = this.evaluarExpresion(nodo.izquierda);

    // Evaluamos el operador actual
    switch (nodo.valor) {
      case "AND":
        // Evaluamos el subárbol derecho (operando derecho)
        const valorDerechoAnd = this.evaluarExpresion(nodo.derecha);
        return valorIzquierdo && valorDerechoAnd; // Retorna la operación lógica AND

      case "OR":
        const valorDerechoOr = this.evaluarExpresion(nodo.derecha);
        return valorIzquierdo || valorDerechoOr; // Retorna la operación lógica OR

      case "NOT":
        // NOT es un operador unario, solo usa el valor izquierdo
        return !valorIzquierdo; // Retorna la negación lógica NOT
        
      default:
        console.error(`Error: Operador desconocido: ${nodo.valor}`);
        return false;
    }
  }
}

module.exports = ArbolExpresionBooleana;