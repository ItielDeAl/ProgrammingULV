// arbolBinario.js

const Node = require("./node"); // Importa la clase Node

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
      recorrido.push(nodo.valor); // 1. Visitar la raíz
      this.preOrden(nodo.izquierda, recorrido); // 2. Recorrer izquierda
      this.preOrden(nodo.derecha, recorrido); // 3. Recorrer derecha
    }
    return recorrido;
  }

  // Inorden: Izquierda - Raíz - Derecha
  inOrden(nodo = this.raiz, recorrido = []) {
    if (nodo != null) {
      this.inOrden(nodo.izquierda, recorrido); // 1. Recorrer izquierda
      recorrido.push(nodo.valor); // 2. Visitar la raíz
      this.inOrden(nodo.derecha, recorrido); // 3. Recorrer derecha
    }
    return recorrido;
  }

  // Postorden: Izquierda - Derecha - Raíz
  postOrden(nodo = this.raiz, recorrido = []) {
    if (nodo != null) {
      this.postOrden(nodo.izquierda, recorrido); // 1. Recorrer izquierda
      this.postOrden(nodo.derecha, recorrido); // 2. Recorrer derecha
      recorrido.push(nodo.valor); // 3. Visitar la raíz
    }
    return recorrido;
  }

  // --- MÉTODO DE VISUALIZACIÓN ---

  // Mostrar el árbol de forma visual en consola
  mostrar(nodo = this.raiz, espacio = 0) {
    if (nodo == null) return;
    espacio += 5;
    this.mostrar(nodo.derecha, espacio);
    console.log(" ".repeat(espacio - 5) + nodo.valor);
    this.mostrar(nodo.izquierda, espacio);
  }
  
  construirArbolDecision() {
    this.insertarRaiz("PREGUNTA:rojo"); // Raíz: ¿Es rojo?

    const raiz = this.raiz;

    // RAMA IZQUIERDA (SÍ, es rojo): ¿Es redonda?
    this.insertaHijoIzquierdo(raiz, "PREGUNTA:redonda");
    const nodoRojo = raiz.izquierda;

    // RAMA DERECHA (NO, no es rojo): ¿Es largo?
    this.insertaHijoDerecho(raiz, "PREGUNTA:largo");
    const nodoNoRojo = raiz.derecha;
    
    // Hijos de nodoRojo
    this.insertaHijoIzquierdo(nodoRojo, "CLASIFICACION:Manzana"); 
    this.insertaHijoDerecho(nodoRojo, "CLASIFICACION:Fresa"); 

    // Hijos de nodoNoRojo
    this.insertaHijoIzquierdo(nodoNoRojo, "CLASIFICACION:Platano")

    console.log("Árbol de decisiones de frutas construido.");
  }

  
  clasificarFruta(caracteristicas) {
    let nodoActual = this.raiz;

    // Recorre mientras no estemos en un nodo hoja (que tiene "CLASIFICACION:")
    while (nodoActual !== null && !nodoActual.valor.startsWith("CLASIFICACION:")) {
      
      //PREGUNTA:rojo
      const clavePregunta = nodoActual.valor.split(":")[1]; 
      const respuesta = caracteristicas[clavePregunta];

      console.log(`- Pregunta: ¿Es ${clavePregunta}? Respuesta: ${respuesta ? 'Sí' : 'No'}.`);

      // TRUE (Sí), va a la izquierda.
      //FALSE (No), va a la derecha.
      if (respuesta === true) {
        nodoActual = nodoActual.izquierda;
      } else if (respuesta === false) {
        nodoActual = nodoActual.derecha;
      } else {
        return `ERROR: Falta la característica '${clavePregunta}' para clasificar.`;
      }
    }
    
    // Extraemos y retornamos la clasificación final
    if (nodoActual !== null && nodoActual.valor.startsWith("CLASIFICACION:")) {
      return nodoActual.valor.split(":")[1];
    } else {
      return "ERROR: Clasificación no encontrada o árbol mal estructurado.";
    }
  }
}

module.exports = ArbolBinario;