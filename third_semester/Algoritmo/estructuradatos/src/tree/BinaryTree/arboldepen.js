
const NodoDependencia = require("./dependenciatarea");
const TareaProyecto = require("./tareaproyect");

class ArbolDependencias {
  constructor() {
    this.raiz = null;
  }

  construirArbol(tareas) {
    if (tareas.length === 0) return;

    // Mapa para acceder rápidamente al nodo por su ID
    const nodosMapa = new Map();
    tareas.forEach(tarea => {
      nodosMapa.set(tarea.id, new NodoDependencia(tarea));
    });

    // Identificar las dependencias y asignar hijos
    // Además, rastrear qué tareas son hijas de otras (para encontrar la raíz)
    const tareasConPadre = new Set();
    
    nodosMapa.forEach(nodo => {
      // Para cada nodo, revisamos las dependencias de su TareaProyecto
      const dependenciasDeEstaTarea = nodo.tarea.dependencias;
      
      // Si esta tarea (nodo.tarea) depende de [A, B, C], entonces A, B y C son sus padres
      dependenciasDeEstaTarea.forEach(idPadre => {
        const nodoPadre = nodosMapa.get(idPadre);
        if (nodoPadre) {
          // Si el padre es nodoPadre, el hijo es 'nodo' (la tarea actual)
          nodoPadre.hijos.push(nodo); 
          tareasConPadre.add(nodo.tarea.id);
        }
      });
    });

    // Encontrar la Raíz: Es la tarea que NO tiene dependencias (su ID no está en tareasConPadre)
    const tareaRaiz = tareas.find(t => !tareasConPadre.has(t.id));
    
    if (tareaRaiz) {
      this.raiz = nodosMapa.get(tareaRaiz.id);
    } else {
      console.log("Error: No se encontró una raíz (posiblemente hay un ciclo de dependencias).");
    }
  }

  // ORDEN DE EJECUCIÓN
  obtenerOrdenEjecucion() {
    const orden = [];
    if (this.raiz) {
      this.recorridopostorden(this.raiz, orden);
    }
    return orden;
  }

  recorridopostorden(nodo, listaOrden) {
    if (nodo === null) return;

    // 1. Recorrer todos los hijos (Dependencias de esta tarea)
    nodo.hijos.forEach(hijo => {
      this.recorridopostorden(hijo, listaOrden);
    });

    // 2. Visitar la Raíz (Ejecutar la tarea *después* de sus dependencias)
    listaOrden.push(nodo.tarea);
  }

  // --- MÉTODO DE VISUALIZACIÓN ---

  mostrar(nodo = this.raiz, nivel = 0) {
    if (nodo === null) return;
    const indentacion = "  ".repeat(nivel);
    console.log(`${indentacion}* [ID:${nodo.tarea.id}] ${nodo.tarea.nombre}`);

    nodo.hijos.forEach(hijo => {
        this.mostrar(hijo, nivel + 1);
    });
  }
}

module.exports = ArbolDependencias;