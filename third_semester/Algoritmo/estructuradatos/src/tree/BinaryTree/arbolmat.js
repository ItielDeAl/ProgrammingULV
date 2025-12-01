
const NodoOperacion = require("./node");

class ArbolExpresionMatematica {
  constructor() {
    this.raiz = null;
  }

  insertarRaiz(valor) {
    this.raiz = new NodoOperacion(valor);
  }

  insertaHijoIzquierdo(nodoPadre, valor) {
    nodoPadre.izquierda = new NodoOperacion(valor);
  }

  insertaHijoDerecho(nodoPadre, valor) {
    nodoPadre.derecha = new NodoOperacion(valor);
  }

  
  construirDesdePostfija(tokens) {
    const pila = []; // Usaremos un array como pila (stack)
    const operadores = ['+', '-', '*', '/'];

    for (const token of tokens) {
      if (operadores.includes(token)) {
        // Si es un OPERADOR:
        const nodoOperador = new NodoOperacion(token);
        
        // 1. Desapilamos el operando DERECHO
        // (Debe existir, si no, la expresión es inválida)
        nodoOperador.derecha = pila.pop(); 
        
        // 2. Desapilamos el operando IZQUIERDO
        nodoOperador.izquierda = pila.pop();
        
        // 3. Apilamos el nodo de la subexpresión (el nuevo subárbol)
        pila.push(nodoOperador);
      } else {
        // Si es un OPERANDO (número):
        // Lo convertimos a número y creamos el nodo hoja, apilándolo
        const valorNumerico = typeof token === 'string' ? parseFloat(token) : token;
        pila.push(new NodoOperacion(valorNumerico));
      }
    }

    // Al finalizar, el único elemento que queda en la pila es la raíz del árbol
    this.raiz = pila.pop();
  }

  
// Evalúa recursivamente la expresión usando el recorrido Postorden.

  evaluarExpresion(nodo = this.raiz) {
    if (nodo === null) return 0;
    
    // Si es un número (hoja), lo retornamos
    if (typeof nodo.valor === 'number') {
      return nodo.valor;
    }

    // Evaluamos los operandos de forma recursiva
    const valorIzquierdo = this.evaluarExpresion(nodo.izquierda);
    const valorDerecho = this.evaluarExpresion(nodo.derecha);

    // Aplicamos el operador
    switch (nodo.valor) {
      case '+':
        return valorIzquierdo + valorDerecho;
      case '-':
        return valorIzquierdo - valorDerecho;
      case '*':
        return valorIzquierdo * valorDerecho;
      case '/':
        if (valorDerecho === 0) {
          throw new Error("División por cero.");
        }
        return valorIzquierdo / valorDerecho;
      default:
        throw new Error(`Operador desconocido: ${nodo.valor}`);
    }
  }

  // Método de visualización
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecha, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierda, espacio);
  }
}

module.exports = ArbolExpresionMatematica;