
const NodoAVL = require("./nodeAVL"); 
const Tarea = require("./tarea"); 

class ArbolPrioridadAVL {
  constructor() {
    this.raiz = null;
  }

  // --- MÉTODOS AUXILIARES DE AVL (Tus métodos, adaptados) ---

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

    x.derecho = y;
    y.izquierdo = T2;

    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));
    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));

    return x;
  }

  // Rotación simple a la izquierda
  rotarIzquierda(x) {
    const y = x.derecho;
    const T2 = y.izquierdo;

    y.izquierdo = x;
    x.derecho = T2;

    x.altura = 1 + Math.max(this.altura(x.izquierdo), this.altura(x.derecho));
    y.altura = 1 + Math.max(this.altura(y.izquierdo), this.altura(y.derecho));

    return y;
  }
  
  // Función auxiliar para encontrar el nodo con el valor MÍNIMO
  // Esto es necesario para la eliminación.
  encontrarminimo(nodo) {
    let actual = nodo;
    while (actual.izquierdo !== null) {
      actual = actual.izquierdo;
    }
    return actual;
  }

  
  insertar(tarea) {
    this.raiz = this.insertarrec(this.raiz, tarea);
  }

  insertarrec(nodo, tarea) {
    // 1. Inserción normal de ABB
    if (nodo === null) return new NodoAVL(tarea);

    // Las comparaciones se hacen con tarea.prioridad
    if (tarea.prioridad < nodo.valor.prioridad)
      nodo.izquierdo = this.insertarrec(nodo.izquierdo, tarea);
    else if (tarea.prioridad > nodo.valor.prioridad)
      nodo.derecho = this.insertarrec(nodo.derecho, tarea);
    else return nodo; // No se permiten duplicados

    // 2. Actualizar altura
    nodo.altura =
      1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));

    // 3. Obtener el factor de balance
    const balance = this.factorBalance(nodo);

    // 4. Casos de rotaciones (Las comprobaciones usan la prioridad de la tarea)
    
    // Izquierda-Izquierda
    if (balance > 1 && tarea.prioridad < nodo.izquierdo.valor.prioridad)
      return this.rotarDerecha(nodo); 
    
    // Derecha-Derecha
    if (balance < -1 && tarea.prioridad > nodo.derecho.valor.prioridad)
      return this.rotarIzquierda(nodo); 
    
    // Izquierda-Derecha
    if (balance > 1 && tarea.prioridad > nodo.izquierdo.valor.prioridad) {
      nodo.izquierdo = this.rotarIzquierda(nodo.izquierdo);
      return this.rotarDerecha(nodo);
    }
    
    // Derecha-Izquierda
    if (balance < -1 && tarea.prioridad < nodo.derecho.valor.prioridad) {
      nodo.derecho = this.rotarDerecha(nodo.derecho);
      return this.rotarIzquierda(nodo);
    }

    return nodo; // Nodo balanceado
  }
  
  
  eliminarRec(nodo, prioridad) {
    if (nodo === null) return null;

    // 1. Buscar el nodo a eliminar
    if (prioridad < nodo.valor.prioridad) {
      nodo.izquierdo = this.eliminarRec(nodo.izquierdo, prioridad);
    } else if (prioridad > nodo.valor.prioridad) {
      nodo.derecho = this.eliminarRec(nodo.derecho, prioridad);
    } 
    // 2. Nodo encontrado
    else {
      
      // Casos 1 y 2: 0 o 1 hijo
      if (nodo.izquierdo === null || nodo.derecho === null) {
        // Reemplaza el nodo con su único hijo o con null
        nodo = nodo.izquierdo ? nodo.izquierdo : nodo.derecho;
      } 
      // Caso 3: Dos hijos
      else {
        // Encontramos el sucesor inorden (mínimo del subárbol derecho)
        const sucesor = this.encontrarminimo(nodo.derecho);
        
        // Reemplazamos el valor del nodo actual con el valor del sucesor
        nodo.valor = sucesor.valor;
        
        // Eliminamos recursivamente el sucesor
        nodo.derecho = this.eliminarRec(nodo.derecho, sucesor.valor.prioridad);
      }
    }
    
    if (nodo === null) return nodo;

    // 3. Actualizar altura y rebalancear (Misma lógica que la inserción)
    nodo.altura = 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));
    const balance = this.factorBalance(nodo);
    
    // El balanceo después de la eliminación es ligeramente diferente:
    
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
  
 
  extraerMayorPrioridad() {
    if (this.raiz === null) return null;
    
    // 1. Encontrar el nodo de mayor prioridad (el más a la derecha)
    const nodoMaximo = this.encontrarmaximo(this.raiz);
    const tareaExtraida = nodoMaximo.valor;
    
    // 2. Eliminar el nodo y rebalancear el árbol
    this.raiz = this.eliminarRec(this.raiz, tareaExtraida.prioridad);
    
    return tareaExtraida;
  }
  
  encontrarmaximo(nodo) {
      let actual = nodo;
      while (actual && actual.derecho !== null) {
          actual = actual.derecho;
      }
      return actual;
  }


  listarEnOrdenDescendente() {
    const listaTareas = [];
    this._recorridoInverso(this.raiz, listaTareas);
    return listaTareas;
  }

  _recorridoInverso(nodo, lista) {
    if (nodo !== null) {
      this._recorridoInverso(nodo.derecho, lista); // 1. Recorrer Derecha (Prioridad más alta)
      lista.push(nodo.valor); // 2. Visitar Raíz
      this._recorridoInverso(nodo.izquierdo, lista); // 3. Recorrer Izquierda
    }
  }

  // --- MÉTODO DE VISUALIZACIÓN ---

  // Mostrar árbol
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecho, espacio);
    console.log(" ".repeat(espacio - 5) + `[P:${nodo.valor.prioridad} - ${nodo.valor.descripcion}] (H:${nodo.altura})`);
    this.mostrar(nodo.izquierdo, espacio);
  }
}

module.exports = ArbolPrioridadAVL;