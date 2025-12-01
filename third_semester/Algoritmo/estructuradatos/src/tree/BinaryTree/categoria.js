
const Productocat = require("./producto");

class Categoria {
  constructor(nombre) {
    this.nombre = nombre;
    this.contenidos = [];
    this.tipo = 'categoria';
  }

  // --- Método 1: Agregar productos o subcategorías ---
  
  agregar(elemento) {
    this.contenidos.push(elemento);
  }

  // --- Método 2: Listar todos los productos (incluyendo subcategorías) ---

  listarTodosLosProductos() {
    let listaProductos = [];

    // Recorremos todos los contenidos de esta categoría
    for (const item of this.contenidos) {
      if (item.tipo === 'producto') {
        // Si es un producto, lo agregamos a la lista
        listaProductos.push(item);
      } else if (item.tipo === 'categoria') {
        // Si es una subcategoría, llamamos recursivamente a su método
        // y concatenamos los resultados a la lista actual.
        listaProductos = listaProductos.concat(item.listarTodosLosProductos());
      }
    }
    
    return listaProductos;
  }
  
  // Función auxiliar para navegar
  obtenerSubcategoria(nombreCat) {
      return this.contenidos.find(item => item.tipo === 'categoria' && item.nombre === nombreCat);
  }
}

module.exports = Categoria;