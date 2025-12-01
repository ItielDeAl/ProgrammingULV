// registroContactos.js

const NodoABB = require("./nodoABB");
const Contacto = require("./contacto"); 

class RegistroContactos {
  constructor() {
    this.raiz = null;
  }

  // --- MÉTODO 1: INSERTAR CONTACTO ---

  insertar(contacto) {
    if (this.raiz === null) {
      this.raiz = new NodoABB(contacto);
    } else {
      this.insertarnodo(this.raiz, contacto);
    }
  }

  insertarnodo(nodo, contactoNuevo) {
    const nombreNuevo = contactoNuevo.nombre.toLowerCase();
    const nombreActual = nodo.valor.nombre.toLowerCase();

    // Utilizamos comparación de cadenas de texto
    if (nombreNuevo < nombreActual) {
      if (nodo.izquierdo === null) {
        nodo.izquierdo = new NodoABB(contactoNuevo);
      } else {
        this.insertarnodo(nodo.izquierdo, contactoNuevo);
      }
    } 
    else if (nombreNuevo > nombreActual) {
      if (nodo.derecho === null) {
        nodo.derecho = new NodoABB(contactoNuevo);
      } else {
        this.insertarnodo(nodo.derecho, contactoNuevo);
      }
    }
    // Si los nombres son iguales, no se insertan duplicados (o puedes manejarlo como desees)
  }

  // --- MÉTODO 2: BUSCAR CONTACTO ---

  buscar(nombre, nodo = this.raiz) {
    if (nodo === null) return null;

    const nombreBuscado = nombre.toLowerCase();
    const nombreActual = nodo.valor.nombre.toLowerCase();

    if (nombreBuscado === nombreActual) return nodo.valor;

    if (nombreBuscado < nombreActual) {
      return this.buscar(nombre, nodo.izquierdo);
    }
    
    return this.buscar(nombre, nodo.derecho);
  }

  // --- MÉTODO 3: LISTAR EN ORDEN ALFABÉTICO (Recorrido Inorden) ---

  listarContactos() {
    const listaContactos = [];
    this.recorinorden(this.raiz, listaContactos);
    return listaContactos;
  }

  recorinorden(nodo, lista) {
    if (nodo !== null) {
      this.recorinorden(nodo.izquierdo, lista); // Izquierda (Nombres menores)
      lista.push(nodo.valor); // Raíz (Contacto actual)
      this.recorinorden(nodo.derecho, lista); // Derecha (Nombres mayores)
    }
  }
}

module.exports = RegistroContactos;