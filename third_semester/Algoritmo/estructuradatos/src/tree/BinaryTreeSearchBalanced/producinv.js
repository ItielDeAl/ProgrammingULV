
class ProductoInventario {
  constructor(id, nombre, precio, cantidadStock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidadStock = cantidadStock; //clave para el ordenamiento y balanceo
  }
}

module.exports = ProductoInventario;