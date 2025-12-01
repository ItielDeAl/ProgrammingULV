
class TareaProyecto {
  constructor(id, nombre, dependencias = []) {
    this.id = id;
    this.nombre = nombre;
    // Lista de IDs de tareas de las que esta tarea *depende*
    this.dependencias = dependencias; 
  }
}

module.exports = TareaProyecto;