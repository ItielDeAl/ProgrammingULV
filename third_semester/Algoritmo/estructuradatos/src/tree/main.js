
//!EJERCICIO 1 
console.log("\n --------------------------------------------------Ejercicio 1-------------------------------------------------- \n");

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

//! EJERCICIO 4
console.log("\n --------------------------------------------------Ejercicio 4-------------------------------------------------- \n");

const ArbolPrioridadAVL = require("./BinaryTreeSearchBalanced/arboltare");
const Tarea = require("./BinaryTreeSearchBalanced/tarea");

const arbol = new ArbolPrioridadAVL();

// Tareas de prueba
const tareas = [
  new Tarea(1, "Llamar a cliente", 5),
  new Tarea(2, "Revisar código", 2),
  new Tarea(3, "Desplegar producción", 8), // Más alta
  new Tarea(4, "Enviar informe", 1),
  new Tarea(5, "Ajustar servidor", 4),
  new Tarea(6, "Reunión equipo", 6),
  new Tarea(7, "Actualizar documentación", 3),
  new Tarea(8, "Preparar demo", 7)
];

console.log("--- 1. Insertando Tareas (Se balancea automáticamente) ---");

tareas.forEach(t => arbol.insertar(t));

console.log("\nEstructura Visual del Árbol AVL (ordenado por Prioridad):");
arbol.mostrar();
// Deberías ver el nodo con Prioridad 8 en la raíz o cerca de ella (el árbol se balanceó)

console.log("\n---------------------------------------------------------");

// --- PRUEBA DE LISTADO DESCENDENTE ---
console.log("--- 2. Tareas en Orden Descendente de Prioridad ---");

const listaDescendente = arbol.listarEnOrdenDescendente();
listaDescendente.forEach(t => {
  console.log(`Prioridad ${t.prioridad}: ${t.descripcion}`);
});

console.log("\n---------------------------------------------------------");

// --- PRUEBA DE EXTRACCIÓN (Debe ser la Prioridad 8: Desplegar producción) ---
console.log("--- 3. Extrayendo la Tarea de Mayor Prioridad ---");

const tareaMaxima = arbol.extraerMayorPrioridad();
console.log(`TAREA EXTRAÍDA: Prioridad ${tareaMaxima.prioridad}: ${tareaMaxima.descripcion}`);

console.log("\nEstructura del Árbol AVL después de la extracción:");
arbol.mostrar();

console.log("\n--- FIN DE PRUEBAS ---");
//! EJERCICIO 5
console.log("\n --------------------------------------------------Ejercicio 5-------------------------------------------------- \n");

const ArbolDependencias = require("./BinaryTree/arboldepen");
const TareaProyecto = require("./BinaryTree/tareaproyect");

// Definición de Tareas
const listaTareas = [
  new TareaProyecto(1, "Planificación inicial", []),           // Raíz
  new TareaProyecto(2, "Diseño de base de datos", [1]),
  new TareaProyecto(3, "Implementación Front-end", [2]),
  new TareaProyecto(4, "Implementación Back-end", [2]),
  new TareaProyecto(5, "Pruebas de Integración", [3, 4]),
  new TareaProyecto(6, "Despliegue final", [5])
];

const proyecto = new ArbolDependencias();
proyecto.construirArbol(listaTareas);

console.log("--- 1. Estructura del Árbol de Dependencias ---");
console.log("El orden visual indica qué tareas *dependen* de la superior.");
proyecto.mostrar();

console.log("\n---------------------------------------------------------");

// --- 2. Determinando el Orden de Ejecución ---
console.log("--- 2. Orden de Ejecución de Tareas (Debe ir de menos a más dependiente) ---");

const ordenEjecucion = proyecto.obtenerOrdenEjecucion();

ordenEjecucion.forEach((tarea, indice) => {
  // Las tareas se muestran en el orden en que DEBEN ser ejecutadas.
  // Es decir, las tareas sin dependencias aparecen primero.
  console.log(`${indice + 1}. [ID:${tarea.id}] ${tarea.nombre}`);
});

//! EJERCICIO 6
console.log("\n --------------------------------------------------Ejercicio 6-------------------------------------------------- \n");

const ArbolExpresionMatematica = require("./BinaryTree/arbolmat");

// La expresión (3 + 5) * (2 - 4) en notación Postfija (tokens)
const expresionPostfija = [
  3, 
  5, 
  '+', 
  2, 
  4, 
  '-', 
  '*'
];

const arbolExp = new ArbolExpresionMatematica();

console.log("--- 1. Construyendo el Árbol desde la Expresión Postfija ---");
arbolExp.construirDesdePostfija(expresionPostfija);

console.log("\nEstructura del Árbol de Expresión:");
arbolExp.mostrar();

console.log("\n-------------------------------------------");

// Lógica: (3 + 5) * (2 - 4) = 8 * (-2) = -16

console.log("--- 2. Evaluación de la Expresión ---");
try {
  const resultado = arbolExp.evaluarExpresion();
  console.log(`\nTokens Postfijos: [${expresionPostfija.join(', ')}]`);
  console.log(`Resultado= ${resultado}`); 
} catch (error) {
  console.error(`Error de Evaluación: ${error.message}`);
}
//! EJERCICIO 7
console.log("\n --------------------------------------------------Ejercicio 7-------------------------------------------------- \n");

const Directorio = require("./BinaryTree/directorio");
const Archivo = require("./BinaryTree/archivo");

// --- 1. CONSTRUCCIÓN DE LA ESTRUCTURA ---

// Raíz del sistema de archivos
const raiz = new Directorio("C:");

// 1. Directorio Raíz
const dirUsuarios = new Directorio("Usuarios");
raiz.agregar(dirUsuarios);

// 2. Directorio Nivel 1 (dentro de Usuarios)
const dirMiUsuario = new Directorio("Itiel_Delgadillo");
dirUsuarios.agregar(dirMiUsuario);

// 3. Directorios Nivel 2 (dentro de Itiel_Delgadillo)
const dirCodigo = new Directorio("CodigoJS");
dirMiUsuario.agregar(dirCodigo);
const dirDocs = new Directorio("Documentos");
dirMiUsuario.agregar(dirDocs);

// 4. Archivos
// Archivos en la raíz C:
raiz.agregar(new Archivo("boot.ini", 1));

// Archivos en Documentos
dirDocs.agregar(new Archivo("reporte.pdf", 50)); // 50MB
dirDocs.agregar(new Archivo("vacaciones.jpg", 15)); // 15MB

// Archivos en CodigoJS
dirCodigo.agregar(new Archivo("arbol.js", 2)); // 2MB
dirCodigo.agregar(new Archivo("main.js", 3)); // 3MB

// Subdirectorio extra para prueba de recursividad
const dirTests = new Directorio("Tests");
dirCodigo.agregar(dirTests);
dirTests.agregar(new Archivo("test.log", 10)); // 10MB

//└
console.log("--- ESTRUCTURA DEL SISTEMA DE ARCHIVOS (Árbol) ---");
console.log(`C: [Tamaño: ${raiz.calcularTamañoTotal()}MB]`);
raiz.contenidos.forEach(item => {
    if (item.tipo === 'directorio') {
        console.log(` └── DIR: ${item.nombre}`);
        item.contenidos.forEach(subItem => {
            if (subItem.tipo === 'directorio') {
                console.log(`    └── DIR: ${subItem.nombre}`);
                subItem.contenidos.forEach(subSubItem => {
                    console.log(`      └── ${subSubItem.tipo.toUpperCase()}: ${subSubItem.nombre}`);
                });
            } else {
                console.log(`    └── ${subItem.tipo.toUpperCase()}: ${subItem.nombre}`);
            }
        });
    } else {
        console.log(` └── ARCHIVO: ${item.nombre}`);
    }
});

console.log("\n---------------------------------------------------------");

// --- PRUEBA 1: LISTAR ARCHIVOS ---
console.log("--- 1. Listar Archivos Directos en /Itiel_Delgadillo/CodigoJS ---");

const refCodigoJS = dirMiUsuario.obtenerSubdirectorio("CodigoJS");
if (refCodigoJS) {
    const archivos = refCodigoJS.listarArchivosDirectos();
    archivos.forEach(a => {
        console.log(`- ${a.nombre} (${a.tamaño}MB)`);
    });
}

console.log("\n---------------------------------------------------------");

// --- PRUEBA 2: CALCULAR TAMAÑO TOTAL ---
console.log("--- 2. Cálculo del Tamaño Total de Directorios ---");

// Archivos en 'Documentos': 50 + 15 = 65 MB
console.log(`Tamaño total de /Documentos: ${dirDocs.calcularTamañoTotal()}MB`); // 65

// Archivos en 'CodigoJS': 2 + 3 + (Test: 10) = 15 MB
console.log(`Tamaño total de /CodigoJS: ${dirCodigo.calcularTamañoTotal()}MB`); // 15

// Tamaño total del disco C: (1 + 65 + 15) = 81 MB
console.log(`Tamaño total de C: (Raíz): ${raiz.calcularTamañoTotal()}MB`); // 81
//! EJERCICIO 8
console.log("\n --------------------------------------------------Ejercicio 8-------------------------------------------------- \n");


const Categoria = require("./BinaryTree/categoria");
const Productocat = require("./BinaryTree/producto");

// --- 1. CONSTRUCCIÓN DE LA ESTRUCTURA JERÁRQUICA ---

// Raíz del catálogo
const catalogo = new Categoria("Catálogo Principal");

// 1. Categoría Principal: Electrónica
const catElectronica = new Categoria("Electrónica");
catalogo.agregar(catElectronica);

// Producto directo en Electrónica
catElectronica.agregar(new Productocat("Cable USB", "ACC001"));

// 2. Subcategoría 1: Computación (dentro de Electrónica)
const subCatComputacion = new Categoria("Computación");
catElectronica.agregar(subCatComputacion);

// Productos en Computación
subCatComputacion.agregar(new Productocat("Laptop Pro", "LAP100"));
subCatComputacion.agregar(new Productocat("Monitor Curvo", "MON200"));

// 3. Subcategoría 2: Almacenamiento (dentro de Computación)
const subCatAlmacenamiento = new Categoria("Almacenamiento");
subCatComputacion.agregar(subCatAlmacenamiento);

// Productos en Almacenamiento
subCatAlmacenamiento.agregar(new Productocat("SSD 1TB", "SSD300"));
subCatAlmacenamiento.agregar(new Productocat("USB Stick 64GB", "USB400"));

// 4. Otra Categoría Principal
const catRopa = new Categoria("Ropa");
catalogo.agregar(catRopa);
catRopa.agregar(new Productocat("Camiseta", "CAM500"));


console.log("--- ESTRUCTURA DEL ÁRBOL DE CATEGORÍAS ---");
console.log(`Catálogo: ${catalogo.nombre}`);
// (La visualización detallada es compleja, nos enfocamos en el listado funcional)


console.log("\n---------------------------------------------------------");

// --- PRUEBA: LISTAR TODOS LOS PRODUCTOS DE UNA CATEGORÍA ---
console.log("--- Listando todos los productos en 'Electrónica' (incluyendo subcategorías) ---");

// Electrónica debe listar: Cable USB, Laptop Pro, Monitor Curvo, SSD 1TB, USB Stick 64GB (5 productos)
const productosElectronica = catElectronica.listarTodosLosProductos();

productosElectronica.forEach(p => {
    console.log(`- SKU: ${p.sku} | Nombre: ${p.nombre}`);
});

console.log(`\n**Total de Productos encontrados en Electrónica:** ${productosElectronica.length}`);

console.log("\n---------------------------------------------------------");

// --- PRUEBA 2: LISTAR SÓLO UNA SUB-RAMA ---
console.log("--- Listando todos los productos en 'Computación' (incluyendo subcategorías) ---");

// Computación debe listar: Laptop Pro, Monitor Curvo, SSD 1TB, USB Stick 64GB (4 productos)
const productosComputacion = subCatComputacion.listarTodosLosProductos();

productosComputacion.forEach(p => {
    console.log(`- SKU: ${p.sku} | Nombre: ${p.nombre}`);
});

console.log(`\n**Total de Productos encontrados en Computación:** ${productosComputacion.length}`);
//! EJERCICIO 9
console.log("\n --------------------------------------------------Ejercicio 9-------------------------------------------------- \n");

const RegistroContactos = require("./BinaryTreeSearch/registrocontacto");
const Contacto = require("./BinaryTreeSearch/contacto");

const agenda = new RegistroContactos();

// Insertamos contactos
const contactos = [
  new Contacto("Carlos Gómez", "555-4000", "carlos@mail.com"),
  new Contacto("Ana Pérez", "555-1000", "ana@mail.com"),
  new Contacto("Roberto Díaz", "555-8000", "roberto@mail.com"),
  new Contacto("Elena Ruiz", "555-2000", "elena@mail.com"),
  new Contacto("David López", "555-6000", "david@mail.com")
];

console.log("--- 1. Insertando Contactos ---");
contactos.forEach(c => {
    agenda.insertar(c);
    console.log(`Insertado: ${c.nombre}`);
});

console.log("\n----------------------------------------------------");

// --- PRUEBA 1: LISTADO ALFABÉTICO (Recorrido Inorden) ---
console.log("--- 2. Listado de Contactos en Orden Alfabético ---");

const listaOrdenada = agenda.listarContactos();

listaOrdenada.forEach((c, index) => {
  console.log(`${index + 1}. Nombre: ${c.nombre} | Tel: ${c.telefono}`);
});


console.log("\n----------------------------------------------------");

// --- PRUEBA 2: BÚSQUEDA ---
console.log("--- 3. Buscando Contacto por Nombre ---");
const contactoBuscado = agenda.buscar("Elena Ruiz");

if (contactoBuscado) {
    console.log(`Contacto encontrado: ${contactoBuscado.nombre}`);
    console.log(`Teléfono: ${contactoBuscado.telefono}`);
} else {
    console.log("Contacto no encontrado.");
}
//! EJERCICIO 10
console.log("\n --------------------------------------------------Ejercicio 10-------------------------------------------------- \n");

const InventarioAVL = require("./BinaryTreeSearchBalanced/inventario");
const ProductoInventario = require("./BinaryTreeSearchBalanced/producinv");

const inventarioavl = new InventarioAVL();

// Insertamos productos en orden ascendente de Stock para forzar rotaciones
console.log("--- 1. Insertando Productos y Balanceando ---");

inventarioavl.insertar(new ProductoInventario(101, "A-Tornillo", 0.5, 10)); // Mínimo
inventarioavl.insertar(new ProductoInventario(102, "B-Clavo", 0.2, 20)); 
inventarioavl.insertar(new ProductoInventario(103, "C-Martillo", 15.0, 30));
inventarioavl.insertar(new ProductoInventario(104, "D-Destornillador", 8.0, 40));
inventarioavl.insertar(new ProductoInventario(105, "E-Sierra", 35.0, 15)); // Causa rotaciones
inventarioavl.insertar(new ProductoInventario(106, "F-Metro", 5.0, 50)); // Máximo

inventarioavl.mostrar();

console.log("\n----------------------------------------------------");

// --- PRUEBA 1: ENCONTRAR MÍNIMO Y MÁXIMO ---
console.log("--- 2. Búsqueda de Extremos de Stock ---");

const productoMinimo = inventarioavl.encontrarMenorStock();
const productoMaximo = inventarioavl.encontrarMayorStock();

console.log(`Menor Stock (Artículos a reponer): ${productoMinimo.nombre} (${productoMinimo.cantidadStock} uds)`);
console.log(`Mayor Stock (Artículos más abundantes): ${productoMaximo.nombre} (${productoMaximo.cantidadStock} uds)`);

console.log("\n----------------------------------------------------");

// --- PRUEBA 2: ELIMINACIÓN ---
console.log("--- 3. Eliminando el producto con 20 unidades de Stock (B-Clavo) ---");

inventarioavl.eliminar(20);

console.log("\nÁrbol AVL después de la eliminación (debe seguir balanceado):");
inventarioavl.mostrar();