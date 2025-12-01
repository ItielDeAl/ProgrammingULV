
class Directorio {
  constructor(nombre) {
    this.nombre = nombre;
    this.contenidos = []; // Lista de objetos
    this.tipo = 'directorio';
  }

  // Método para agregar archivos y directorios
  agregar(elemento) {
    this.contenidos.push(elemento);
  }

  // --- Método 1: Listar archivos en este directorio ---
  
  listarArchivosDirectos() {
    return this.contenidos.filter(item => item.tipo === 'archivo');
  }

  // --- Método 2: Listar subdirectorios en este directorio ---
  
  obtenerSubdirectorio(nombreDir) {
      return this.contenidos.find(item => item.tipo === 'directorio' && item.nombre === nombreDir);
  }

  // --- Método 3: Calcular el tamaño

  calcularTamañoTotal() {
    let tamañoTotal = 0;

    // Recorremos todos los contenidos
    for (const item of this.contenidos) {
      if (item.tipo === 'archivo') {
        // Si es un archivo, sumamos su tamaño
        tamañoTotal += item.tamaño;
      } else if (item.tipo === 'directorio') {
        // Si es un directorio, llamamos recursivamente a su método para sumar su contenido
        tamañoTotal += item.calcularTamañoTotal();
      }
    }
    
    return tamañoTotal;
  }
}

module.exports = Directorio;