
const NodoAVL = require("./nodeAVL");
const ProductoInventario = require("./producinv"); 

class InventarioAVL {
  constructor() {
    this.raiz = null;
  }
  
  altura(nodo) {
    if (nodo === null) return 0;
    return nodo.altura;
  }

  factorBalance(nodo) {
    if (nodo === null) return 0;
    return this.altura(nodo.izquierdo) - this.altura(nodo.derecho);
  }

  rotarDerecha(y) {
    const x = y.izquierdo;
    const T2 = x.derecho;
    x.derecho = y;
    y.izquierdo = T2;
    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));
    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));
    return x;
  }
  
  rotarIzquierda(x) {
    const y = x.derecho;
    const T2 = y.izquierdo;
    y.izquierdo = x;
    x.derecho = T2;
    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));
    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));
    return y;
  }
  
  _encontrarMinimoNodo(nodo) {
    let actual = nodo;
    while (actual.izquierdo !== null) {
      actual = actual.izquierdo;
    }
    return actual;
  }


  // --- MÉTODO 1: INSERTAR PRODUCTO ---

  insertar(producto) {
    this.raiz = this._insertarRec(this.raiz, producto);
  }

  _insertarRec(nodo, producto) {
    const stockNuevo = producto.cantidadStock;
    
    // Inserción ABB normal
    if (nodo === null) return new NodoAVL(producto);

    // Comparaciones usando cantidadStock
    if (stockNuevo < nodo.valor.cantidadStock)
      nodo.izquierdo = this._insertarRec(nodo.izquierdo, producto);
    else if (stockNuevo > nodo.valor.cantidadStock)
      nodo.derecho = this._insertarRec(nodo.derecho, producto);
    else return nodo;

    // Actualizar altura
    nodo.altura = 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));

    // Obtener balance y rotar
    const balance = this.factorBalance(nodo);

    // Rotaciones (LL, RR, LR, RL)
    if (balance > 1 && stockNuevo < nodo.izquierdo.valor.cantidadStock)
      return this.rotarDerecha(nodo);
    if (balance < -1 && stockNuevo > nodo.derecho.valor.cantidadStock)
      return this.rotarIzquierda(nodo);
    if (balance > 1 && stockNuevo > nodo.izquierdo.valor.cantidadStock) {
      nodo.izquierdo = this.rotarIzquierda(nodo.izquierdo);
      return this.rotarDerecha(nodo);
    }
    if (balance < -1 && stockNuevo < nodo.derecho.valor.cantidadStock) {
      nodo.derecho = this.rotarDerecha(nodo.derecho);
      return this.rotarIzquierda(nodo);
    }

    return nodo;
  }
  
  // --- MÉTODO 2: ELIMINAR PRODUCTO ---
  
  eliminar(cantidadStock) {
    this.raiz = this._eliminarRec(this.raiz, cantidadStock);
  }

  _eliminarRec(nodo, stock) {
    if (nodo === null) return null;

    // 1. Buscar el nodo
    if (stock < nodo.valor.cantidadStock) {
      nodo.izquierdo = this._eliminarRec(nodo.izquierdo, stock);
    } else if (stock > nodo.valor.cantidadStock) {
      nodo.derecho = this._eliminarRec(nodo.derecho, stock);
    } 
    // 2. Nodo encontrado
    else {
      // Casos 0 o 1 hijo
      if (nodo.izquierdo === null || nodo.derecho === null) {
        nodo = nodo.izquierdo ? nodo.izquierdo : nodo.derecho;
      } 
      // Caso 2 hijos
      else {
        const sucesor = this._encontrarMinimoNodo(nodo.derecho);
        nodo.valor = sucesor.valor;
        nodo.derecho = this._eliminarRec(nodo.derecho, sucesor.valor.cantidadStock);
      }
    }
    
    if (nodo === null) return nodo;

    // 3. Actualizar altura y Rebalancear
    nodo.altura = 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));
    const balance = this.factorBalance(nodo);
    
    // El balanceo después de la eliminación (se comprueba el factor de balance de los hijos)
    
    // Izquierda-Izquierda
    if (balance > 1 && this.factorBalance(nodo.izquierdo) >= 0)
      return this.rotarDerecha(nodo);
      
    // Izquierda-Derecha
    if (balance > 1 && this.factorBalance(nodo.izquierdo) < 0) {
      nodo.izquierdo = this.rotarIzquierda(nodo.izquierdo);
      return this.rotarDerecha(nodo);
    }
    
    // Derecha-Derecha
    if (balance < -1 && this.factorBalance(nodo.derecho) <= 0)
      return this.rotarIzquierda(nodo);
      
    // Derecha-Izquierda
    if (balance < -1 && this.factorBalance(nodo.derecho) > 0) {
      nodo.derecho = this.rotarDerecha(nodo.derecho);
      return this.rotarIzquierda(nodo);
    }

    return nodo;
  }
  
  // --- MÉTODO 3: ENCONTRAR MÍNIMO Y MÁXIMO ---
  
  encontrarMenorStock() {
      // El menor valor está siempre a la izquierda
      let nodoActual = this.raiz;
      while (nodoActual && nodoActual.izquierdo !== null) {
          nodoActual = nodoActual.izquierdo;
      }
      return nodoActual ? nodoActual.valor : null;
  }

  encontrarMayorStock() {
      // El mayor valor está siempre a la derecha
      let nodoActual = this.raiz;
      while (nodoActual && nodoActual.derecho !== null) {
          nodoActual = nodoActual.derecho;
      }
      return nodoActual ? nodoActual.valor : null;
  }
  
  // Método de visualización
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecho, espacio);
    console.log(" ".repeat(espacio - 5) + `[Stock:${nodo.valor.cantidadStock}, ${nodo.valor.nombre}] (H:${nodo.altura})`);
    this.mostrar(nodo.izquierdo, espacio);
  }
}

module.exports = InventarioAVL;