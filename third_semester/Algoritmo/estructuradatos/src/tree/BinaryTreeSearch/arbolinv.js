const NodoABB = require("./nodoABB");
const Producto = require("./producto"); // Asumiendo que has creado la clase Producto

class ArbolInventario {
  constructor() {
    this.raiz = null;
  }


  insertar(producto) {
    if (this.raiz === null) {
      this.raiz = new NodoABB(producto);
    } else {
      this.insertarnodo(this.raiz, producto);
    }
  }

  insertarnodo(nodo, producto) {
    // Usamos producto.id para la comparación
    if (producto.id < nodo.valor.id) {
      if (nodo.izquierdo === null) {
        nodo.izquierdo = new NodoABB(producto);
      } else {
        this.insertarnodo(nodo.izquierdo, producto);
      }
    } else if (producto.id > nodo.valor.id) {
      if (nodo.derecho === null) {
        nodo.derecho = new NodoABB(producto);
      } else {
        this.insertarnodo(nodo.derecho, producto);
      }
    }
    // No se insertan si el ID es igual
  }

 
  buscar(id, nodo = this.raiz) {
    if (nodo === null) return null; // No encontrado
    
    // Si el ID es igual al ID del nodo actual
    if (id === nodo.valor.id) return nodo.valor; // Devuelve el objeto Producto

    // Si el ID es menor, busca a la izquierda
    if (id < nodo.valor.id) return this.buscar(id, nodo.izquierdo);
    
    // Si el ID es mayor, busca a la derecha
    return this.buscar(id, nodo.derecho);
  }

 
  eliminar(id) {
    this.raiz = this._eliminarNodo(this.raiz, id);
  }

  _eliminarNodo(nodo, id) {
    if (nodo === null) return null;

    // 1. Recorrer el árbol para encontrar el nodo a eliminar
    if (id < nodo.valor.id) {
      nodo.izquierdo = this._eliminarNodo(nodo.izquierdo, id);
      return nodo;
    } else if (id > nodo.valor.id) {
      nodo.derecho = this._eliminarNodo(nodo.derecho, id);
      return nodo;
    } 
    // Si llegamos aquí, el nodo actual (nodo.valor.id === id) eliminar
    else {
      
      // 2. Caso 1: El nodo no tiene hijos o tiene un solo hijo.
      if (nodo.izquierdo === null) {
        // Reemplaza el nodo con su hijo derecho (o null si no tiene hijos)
        return nodo.derecho;
      } else if (nodo.derecho === null) {
        // Reemplaza el nodo con su hijo izquierdo
        return nodo.izquierdo;
      }

      // 3. Caso 2: El nodo tiene DOS hijos.
      
      // Encontramos el sucesor inmediato (el nodo más pequeño del subárbol derecho)
      const sucesor = this.encontrarminimo(nodo.derecho); 
      
      // Reemplazamos el valor del nodo a eliminar con el valor del sucesor
      nodo.valor = sucesor.valor;
      
      // Eliminamos el sucesor de donde estaba originalmente
      // Nota: El sucesor no puede tener hijo izquierdo, por lo que cae en el Caso 1
      nodo.derecho = this._eliminarNodo(nodo.derecho, sucesor.valor.id);
      
      return nodo;
    }
  }
  
  // nodo con el valor más pequeño
  encontrarminimo(nodo) {
    if (nodo.izquierdo === null) return nodo;
    return this.encontrarminimo(nodo.izquierdo);
  }



  listarPorPrecio() {
    // 1. Extraemos todos los productos usando un recorrido Inorden (por ID)
    const productosDesordenados = [];
    this.recorreryextraer(this.raiz, productosDesordenados);
    
    // 2. Ordenamos el array de productos por el precio
    // Usamos el método sort de JS, ya que el árbol no está ordenado por precio.
    productosDesordenados.sort((a, b) => a.precio - b.precio);
    
    return productosDesordenados;
  }
  
  // Función auxiliar para extraer todos los valores (productos)
  recorreryextraer(nodo, lista) {
    if (nodo !== null) {
      this.recorreryextraer(nodo.izquierdo, lista);
      lista.push(nodo.valor); // Añade el objeto Producto a la lista
      this.recorreryextraer(nodo.derecho, lista);
    }
  }
  
  // Método de visualización (utiliza el de tu estructura original)
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo === null) return;
    espacio += 5;
    this.mostrar(nodo.derecho, espacio);
    console.log(" ".repeat(espacio - 5) + `[ID:${nodo.valor.id}, ${nodo.valor.nombre}, $${nodo.valor.precio}]`);
    this.mostrar(nodo.izquierdo, espacio);
  }
}

module.exports = ArbolInventario;