class Tarea {
  constructor(id, descripcion, prioridad) {
    this.id = id;
    this.descripcion = descripcion;
    this.prioridad = prioridad; // La clave para el ordenamiento AVL
  }
}

module.exports = Tarea;