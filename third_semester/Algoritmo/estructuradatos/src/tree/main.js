
//!EJERCICIO 1 
const ArbolBinario = require("./BinaryTree/arbolfrutas"); // Asegúrate de la ruta correcta

// 1. Crear el árbol y construir la estructura de decisiones
const arbolDecisiones = new ArbolBinario();
arbolDecisiones.construirArbolDecision();

// --- Prueba 1: Manzana (Rojo: Sí, Redonda: Sí) ---
console.log("\n--- Clasificación 1: Manzana ---");
const caracteristicasManzana = {
  rojo: true,
  redonda: true
};

const resultadoManzana = arbolDecisiones.clasificarFruta(caracteristicasManzana);
console.log(`\n**Resultado:** ¡La fruta es una **${resultadoManzana}**!\n`);

// --- Prueba 2: Plátano (Rojo: No, Largo: Sí) ---
console.log("--- Clasificación 2: Plátano ---");
const caracteristicasPlatano = {
  rojo: false,
  largo: true
};

const resultadoPlatano = arbolDecisiones.clasificarFruta(caracteristicasPlatano);
console.log(`\n**Resultado:** ¡La fruta es un **${resultadoPlatano}**!\n`);
arbolDecisiones.mostrar();

//! EJERCICIO 2
console.log("\n --------------------------------------------------Ejercicio 2-------------------------------------------------- \n");

const ArbolExpresionBooleana = require("./BinaryTree/arbolbol"); 

// --- PRUEBA 1: (true AND false) OR true ---
const arbol1 = new ArbolExpresionBooleana();
arbol1.construirExpresion1(); 

const resultado1 = arbol1.evaluarExpresion();
console.log(`\n**Resultado de Expresión 1 ( (true AND false) OR true ):** ${resultado1}`); 
// Debería imprimir: true
arbol1.mostrar();
console.log("\n-------------------------------------\n");

// --- PRUEBA 2: (true OR false) AND NOT false ---
const arbol2 = new ArbolExpresionBooleana();
arbol2.construirExpresion2();


const resultado2 = arbol2.evaluarExpresion();
console.log(`\n**Resultado de Expresión 2 ( (true OR false) AND NOT false ):** ${resultado2}`);
arbol2.mostrar();

//! EJERCICIO 3
console.log("\n --------------------------------------------------Ejercicio 3-------------------------------------------------- \n");

const ArbolInventario = require("./BinaryTreeSearch/arbolinv");
const Producto = require("./BinaryTreeSearch/producto");

const inventario = new ArbolInventario();

// Productos de prueba (el orden de inserción define el árbol, basado en el ID)
const productos = [
  new Producto(50, "Laptop", 1200),
  new Producto(30, "Teclado", 80),
  new Producto(70, "Monitor", 350),
  new Producto(20, "Mouse", 25),
  new Producto(40, "Webcam", 50),
  new Producto(60, "Disco Duro", 150),
  new Producto(80, "Impresora", 200)
];

console.log("--- 1. Insertando Productos y Estructura del ABB ---");

productos.forEach(p => inventario.insertar(p));
inventario.mostrar();

console.log("\n----------------------------------------------------");

// --- PRUEBA DE BÚSQUEDA ---
console.log("--- 2. Buscando Productos por ID ---");
const producto40 = inventario.buscar(40);
const producto99 = inventario.buscar(99);

console.log("Producto ID 40 encontrado:", producto40 ? producto40.nombre : "No encontrado");
console.log("Producto ID 99 encontrado:", producto99 ? producto99.nombre : "No encontrado");

console.log("\n----------------------------------------------------");

// --- PRUEBA DE LISTADO POR PRECIO ---
console.log("--- 3. Listando Productos en Orden Ascendente por Precio ---");
const productosOrdenados = inventario.listarPorPrecio();

productosOrdenados.forEach(p => {
  console.log(`$${p.precio.toFixed(2)} - ID ${p.id} - ${p.nombre}`);
});

console.log("\n----------------------------------------------------");

// --- PRUEBA DE ELIMINACIÓN (Eliminamos el ID 70, que tiene dos hijos) ---
console.log("--- 4. Eliminando Producto (ID 70 - Monitor) ---");
inventario.eliminar(70);
console.log("Producto con ID 70 (Monitor) eliminado. Nueva estructura:");
inventario.mostrar();

// Verificamos si realmente se eliminó
console.log("\nBuscar 70 →", inventario.buscar(70) ? "Encontrado" : "No encontrado");
