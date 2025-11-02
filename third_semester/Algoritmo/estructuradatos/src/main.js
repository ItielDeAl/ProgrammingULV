const Stack = require("./stack/stack");
const Queue = require("./queue/queue");
const {SinglyLinkedList}  = require('./list/Simple/singly_linked_list')
const {CircularLinkedList} = require('./list/circular/circular_linkend_list')
const { DoubleLinkedList } = require('./list/doubles/double_linked_list')

console.log('Sección I: Ejercicios de estructura de datos Pila------------------------------------\n');

console.log('Ejercicio 1 Evaluar expresión postfija (RPN)-------------------------------');

function postfija(str) {
  const stack = new Stack();
//Dividir el string 
  const tokens = str.split(' ');

  //Iterar sobre cada caracter
  for (const token of tokens) {
    
    //convertir el token a un número
    const num = parseFloat(token);

    if (!isNaN(num)) {
      // Si es un número, lo metemos en la pila
      stack.push(num);
    } else {
      // Si NO es un número, es u operador
      
      //Sacar los dos últimos operandos
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      // Verificar si había suficientes operandos en la pila
      if (operand1 === null || operand2 === null) {
        return "Error: Expresión malformada (operandos insuficientes)";
      }

      let result;
      // Realizar la operación
      switch (token) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          if (operand2 === 0) {
            return "Error: División por cero";
          }
          result = operand1 / operand2;
          break;
        default:
          return `Error: Operador desconocido '${token}'`;
      }
      
      // Agregamos el resultado a la pila
      stack.push(result);
    }
  }

  //Obtener el resultado final
  const finalResult = stack.pop();

  // Al final, la pila debe tener un resultado.
  // Si está vacía, algo salió mal
  if (finalResult === null) {
    return "Error: Expresión vacía o inválida";
  }

  // Si la pila no está vacía después de sacar el resultado,
  // significa que sobraron operandos (expresión malformada).
  if (!stack.isEmpty()) {
    return "Error: Expresión malformada (operandos sobrantes)";
  }

  return `${str} Calculado -> ${finalResult} \n`;
}

console.log(postfija('2 3 + 2 *'));

/////////////////////////////////////////////////////Convertir una Infija a postfija.
console.log('Ejercicio 2 Convertir infija a postfija------------------------------------');

// saber la "fuerza" (precedencia)

function precedencia(op) {
  if (op === '*' || op === '/') {
    return 2; // Fuerza alta
  }
  if (op === '+' || op === '-') {
    return 1; // Fuerza baja
  }
  return 0; // Para paréntesis
}

function inposfija(infija) {
  const stack = new Stack();
  //Resultado final
  let postfija = []; 
  //separamos los caracteres
  const expresion = infija.split(' ');

  for (const token of expresion) {
    
    if (!isNaN(token)) {
      //Si es numero va directo
      postfija.push(token);

    } else if (token === '(') {
      // --- REGLA 2: Es un paréntesis ( ---
      // Siempre se mete a la pila, sin preguntar
      stack.push(token);

    } else if (token === ')') {
    // Sacar todo de la pila HASTA encontrar el (
      while (!stack.isEmpty() && stack.peek() !== '(') {
        postfija.push(stack.pop());
      }
      stack.pop(); // Saca y descarta el (

    } else {
      
      // Mientras la pila NO esté vacía Y
      // el operador del tope sea "más fuerte" o "igual de fuerte" que el token
      while (!stack.isEmpty() && precedencia(stack.peek()) >= precedencia(token)) {
        // Saca el operador "fuerte" del tope y ponlo en la salida
        postfija.push(stack.pop());
      }
      
      // Ahora sí, mete el token (operador nuevo) a la pila
      stack.push(token);
    }
  }

  // Vaciamos lo que quede en la pila (los últimos operadores)
  while (!stack.isEmpty()) {
    postfija.push(stack.pop());
  }
  
  // se convierte en str
  return `${infija} convertido -> ${postfija.join(' ')} \n`;
}
console.log(inposfija('( 5 + 9 ) * 2'));

/////////////////////////Verificar si es un palindromo
console.log('Ejercicio 3 Verificar palíndromo-------------------------------------------');

function palindrome(str) {
  const stack = new Stack();
  let size = str.length
  let lap = []
  for(const palindromo of str){
    stack.push(palindromo)
  }
  for(let i = 0; i<= size; ++i){
    lap.push(stack.pop())
  }
  lap = lap.join('')
  //console.log(str);
  //console.log(lap);
  
  //se convierten a minusculas para una mejor comparación
  if(str.toLowerCase() === lap.toLowerCase()){
    return `${str} es un palindromo \n`
  }else{
    return `${str} no es un palindromo \n`
  }
}
console.log(palindrome('Cristian'));


console.log('  Palabra revertida usando pila--------------------------------------------');
function revert(str) {
  const stack = new Stack();
  let size = str.length
  let reversa = []
  for(const letra of str){
    stack.push(letra)
  }
  for (let i = 0; i<= size; ++i){
    reversa.push(stack.pop())
  }
  reversa = reversa.join('')
  return `${str} revertido -> ${reversa} \n`
}

console.log(revert('acido desoxirribonucleico'));

console.log('Sección II: Ejercicios de estructura de datos Cola------------------------------------\n');
console.log('Ejercicio 1 Clasificación de Palabras por Letra con Colas Enlazadas--------');

function clusters(str) {
  let cluster = {};
  let palabras = str.split(' ');//separamos por palabras

  for (const palabra of palabras) {
    //Tomamos la primer letra y la convertimos en minuscula para sui comparación
    let letra = palabra[0].toLowerCase();

    //si tenemos un doble espacio se tendra un '' y no se podra encolar
    //si esta vacia la saltamos
    if (!palabra) {
      continue;
    }

    // Comprobación de letra
    if (letra < 'a' || letra > 'z') {
      continue;
    }

    // Creación de cola
    if (!cluster[letra]) {
      cluster[letra] = new Queue();
      cluster[letra].enqueue(`-${letra.toUpperCase()}`); 
    }
    //se agrega a la cola.
    cluster[letra].enqueue(palabra);
  }

  // Object.keys devuelve las llaves. y el .sort() las ordena de manera alfabetica.
  const works = Object.keys(cluster).sort();
  console.log('--- Resultados de la Clasificación ---');
  for (let letra of works) {
    cluster[letra].printQueue();
    console.log('');
  }
}


clusters("Ana Banana Cebra Dedo Elefante Foca Gato Hilo Iman Jirafa Koala Leon Manzana Nido Oso Perro Queso Raton Sapo Tigre Uva Vaca Wombat Xilofono Yate Zebra anaconda barco nariz casa elfo");

console.log('Ejercicio 2 Simulación de Supermercado con Colas Enlazadas-----------------');

function supermarket(num){
  //colas a utilizar
  const espera = new Queue();
  const carritos = new Queue();
  //cajas del super
  const caja1 = new Queue();
  const caja2 = new Queue();
  const caja3 = new Queue();

  //cantidad de carritos en el super
  for(let carrito = 1; carrito <= 25; carrito ++){
    carritos.enqueue(carrito);
  }

  let customers = parseInt(num);
  //Los clientes siempre inicia en espera
  //cuando no hay nadie, pasan directo
  for(let i = 1; i <= customers; i++){
    espera.enqueue(i);
  }
  
  //declaramos las cajas, de esta manera podremos agregar mas cajas sin afectar lo delas 
  const todasLasCajas = [
  { id: 1, cola: caja1 },
  { id: 2, cola: caja2 },
  { id: 3, cola: caja3 },
];

// 2. Creamos una función reutilizable para encontrar la caja más corta
function encontrarCajaMasCorta() {
  // Empezamos asumiendo que la primera es la más corta
  let cajaMasCorta = todasLasCajas[0];

  // Recorremos el resto para comparar
  for (let i = 1; i < todasLasCajas.length; i++) {
    if (todasLasCajas[i].cola.sized() < cajaMasCorta.cola.sized()) {
      cajaMasCorta = todasLasCajas[i];
    }
  }
  return cajaMasCorta;
}

while (
  !espera.isEmpty() || !caja1.isEmpty() || !caja2.isEmpty() || !caja3.isEmpty()) {
  
  // atender cleintes
  // Usamos un bucle para pasar por las cajas
  todasLasCajas.forEach(caja => {
    if (!caja.cola.isEmpty()) {
      let atendido = caja.cola.dequeue();
      carritos.enqueue(atendido.carrito);
      console.log(`Cliente ${atendido.cliente} terminó en caja ${caja.id} y devolvió carrito ${atendido.carrito}`);
    }
  });

  // clientes a cajas
  while (!espera.isEmpty() && !carritos.isEmpty()) {
    // Sacar un cliente de espera y un carrito (esto no cambia)
    let cliente = espera.dequeue();
    let carrito = carritos.dequeue();
    let asignacion = { cliente: cliente, carrito: carrito };

    // Encontrar la caja con menos gente (lógica nueva y limpia)
    let cajaDestino = encontrarCajaMasCorta();

    // Asignar a la caja encontrada
    cajaDestino.cola.enqueue(asignacion);
    console.log(`Cliente ${cliente} va a caja ${cajaDestino.id}`);
  }

  console.log(`Carritos disponibles: `);
  carritos.printQueue();
}
}
supermarket(100);

console.log('');

console.log('Ejercicio 3 Actualización de Lista de Repartidores con Colas Enlazadas-----');
//se usa una lista enlazada para guardar a los repartidores.

class ListaRepartidores {
 constructor() {
    this.head = null;
 }
  //nuemvos metodos para ocupar
  actualizarybuscar(nss){
    let current = this.head;
    while (current) {
      if (current.value.NSS === nss) {
        // Encontrado: Actualizar días y terminar
        current.value.días++;
        return true;
      }
      current = current.next;
    }
    // No encontrado
    return false;
  }

  insertRepartidor(repartidorData) {
    const newNode = new Node(repartidorData);

    //lista está o el nuevo nodo debe ser la cabeza
    if (!this.head || this.head.value.NSS > newNode.value.NSS) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    // Insertar en medio o al final
    let current = this.head;
    while (current.next && current.next.value.NSS < newNode.value.NSS) {
      // Avanzamos hasta encontrar el lugar de inserción
      current = current.next;
    }

    // Insertamos el nuevo nodo
    newNode.next = current.next;
    current.next = newNode;
  }
  printList() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    console.log(JSON.stringify(result, null, 2));
}
}
const Node = require('./queue/node');

const listaPrincipal = new ListaRepartidores();
// Insertamos los datos iniciales (ya ordenados)
listaPrincipal.insertRepartidor({ NSS: 101, nombre: "Carlos", días: 3 });
listaPrincipal.insertRepartidor({ NSS: 103, nombre: "Lucía", días: 5 });

console.log("--- Lista Inicial ---");
listaPrincipal.printList();
//Crear la cola del día y llenarla
const colaDelDia = new Queue();
// El 'value' en la cola será un objeto con los datos del día
colaDelDia.enqueue({ nss: 102, entidad: "EmpresaX" });
colaDelDia.enqueue({ nss: 101, entidad: "EmpresaY" });
colaDelDia.enqueue({ nss: 104, entidad: "EmpresaZ" });

console.log("\n--- Procesando la cola... ---");

// 3. Procesar la cola y actualizar la lista
while (!colaDelDia.isEmpty()) {
  const trabajo = colaDelDia.dequeue();
  const nssBuscado = trabajo.nss;

  console.log(`Procesando NSS: ${nssBuscado}`);

  // Regla 4: Intentar encontrar y actualizar
  // !! CORRECCIÓN AQUÍ !!
  // Llama al método que SÍ busca y actualiza
  const fueActualizado = listaPrincipal.actualizarybuscar(nssBuscado);

  // Regla 3: Si no se actualizó (es decir, actualizarybuscar devolvió false)
  if (!fueActualizado) {
    console.log(` -> ${nssBuscado} no encontrado. Insertando...`);
    const nuevoRepartidor = {
      NSS: nssBuscado,
      nombre: "Nuevo", // Como pide el ejemplo
      días: 1,         // Es su primer día registrado
    };
    // Llama al método de insertar SÓLO si es nuevo
    listaPrincipal.insertRepartidor(nuevoRepartidor);
  } else {
    console.log(` -> ${nssBuscado} encontrado. Días incrementados.`);
  }
}

// 5. Mostrar la lista final
console.log("\n--- Lista Final Actualizada ---");
listaPrincipal.printList();

console.log('');

console.log('Ejercicio 4 Simulación de Computadores con Colas Enlazadas-----------------');
// funciones extras para ralizar la simulación
function getTiempoUsoAleatorio() {
  const min = 30;
  const max = 55;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

 //Convierte los minutos de simulación (0-600) a formato HH:MM (10:00-20:00).

function formatoHora(minutosDesdeInicio) {
  const horasBase = 10;
  let horas = horasBase + Math.floor(minutosDesdeInicio / 60);
  let minutos = minutosDesdeInicio % 60;

  // Rellena con ceros si es necesario
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

//Crea y devuelve una Cola con todos los minutos de llegada programados
//según las frecuencias especificadas.

function generarColaLlegadas() {
  const colaLlegadas = new Queue();
  const MINUTOS_CAMBIO_FRECUENCIA = 120; // 2 horas (10:00 a 12:00)
  const MINUTOS_FIN_SIMULACION = 600; // 10 horas (10:00 a 20:00)

  let minutoLlegadaActual = 0; // Primera llegada a las 10:00
  let frecuencia = 18; // Frecuencia inicial

  // Primeras 2 horas (10:00 a 11:59)
  while (minutoLlegadaActual < MINUTOS_CAMBIO_FRECUENCIA) {
    colaLlegadas.enqueue(minutoLlegadaActual);
    minutoLlegadaActual += frecuencia;
  }

  // Resto del día (12:00 a 20:00)
  frecuencia = 15;
  // 'minutoLlegadaActual' ya tiene el valor de la primera llegada post-12:00
  while (minutoLlegadaActual <= MINUTOS_FIN_SIMULACION) {
    colaLlegadas.enqueue(minutoLlegadaActual);
    minutoLlegadaActual += frecuencia;
  }

  return colaLlegadas;
}

//implementaciooooooooooooooooooooooooon/////////////////////////////////

function simularComputadores() {
  const NUM_COMPUTADORES = 15;
  const TOTAL_MINUTOS_SIMULACION = 600; // 10:00 a 20:00

  //Arreglo para computadores. 0 = libre, >0 = minutos restantes.
  //.fill() resmplaza cada uno de los computadores por un 0
  let computadores = Array(NUM_COMPUTADORES).fill(0);

  const colaLlegadas = generarColaLlegadas();
  const colaEspera = new Queue();

  console.log("--- Iniciando Simulación (10:00 a 20:00) ---");
  console.log(`Total computadores disponibles: ${NUM_COMPUTADORES}\n`);

  // Obtenemos la primera llegada
  let proximaLlegada = colaLlegadas.dequeue();

  // Simular minuto a minuto
  for (let minutoActual = 0; minutoActual <= TOTAL_MINUTOS_SIMULACION; minutoActual++) {
    const horaActual = formatoHora(minutoActual);

    //Reducir tiempo y liberar computadores ---
    for (let i = 0; i < NUM_COMPUTADORES; i++) {
      if (computadores[i] > 0) {
        computadores[i]--; // Reducir tiempo de uso

        if (computadores[i] === 0) {
          // Computador liberado
          console.log(`${horaActual} [LIBERA] Computador ${i + 1} ha terminado su sesión.`);
          
        }
      }
    }

    //Verificar si llega un alumno en este minuto ---
    if (minutoActual === proximaLlegada) {
      console.log(`${horaActual} [LLEGA] Un alumno llega.`);

      // Buscar un computador libre
      const indiceLibre = computadores.findIndex(tiempo => tiempo === 0);

      if (indiceLibre !== -1) {

        const tiempoAsignado = getTiempoUsoAleatorio();
        computadores[indiceLibre] = tiempoAsignado;
        console.log(`          -> [OCUPA] Alumno ocupa Computador ${indiceLibre + 1} por ${tiempoAsignado} minutos.`);
      } else {
        // (Regla principal: No hay computadores libres)
        console.log(`          -> [RECHAZADO] Todos los ${NUM_COMPUTADORES} computadores están ocupados. El alumno se retira.`);
        // (No se añade a la colaEspera)
      }

      // Preparar la siguiente llegada
      proximaLlegada = colaLlegadas.dequeue();
      if (proximaLlegada === null) {
        proximaLlegada = -1; // Ya no hay más llegadas programadas
      }
    }
  }
  
  console.log(`\n${formatoHora(TOTAL_MINUTOS_SIMULACION)} --- FIN DE LA SIMULACIÓN ---`);
  const ocupadosAlFinal = computadores.filter(t => t > 0).length;
  console.log(`Estado final: ${ocupadosAlFinal} computadores quedaron en uso.\n`);
}

// Ejecutar la simulación
simularComputadores();

console.log('Sección III: Ejercicios de estructura de datos Listas---------------------------------\n');
console.log('Ejercicio 1 Gestión de Palabras con Lista Enlazada-------------------------');


const fs = require('fs');

// Nombres de los archivos
const IN_FILE = 'palabras.txt';
const OUT_FILE = 'palabras_salida.txt';


 //Leer el archivo de entrada y cargar las palabras en la lista enlazada.

function cargarPalabras(lista) {
  console.log(`Regla 1: Leyendo palabras desde ${IN_FILE}...`);
  try {
    // Lee el contenido del archivo .readFileSync
    const data = fs.readFileSync(IN_FILE, 'utf8');
    
    // Divide por cualquier espacio en blanco (espacios, saltos de línea, etc.)
    // y filtra cadenas vacías que puedan resultar.
    const palabras = data.split(/\s+/).filter(p => p.length > 0);
    
    // Inserta cada palabra en la lista
    for (const palabra of palabras) {
      lista.push(palabra); // 'push' añade al final, manteniendo el orden
    }
    console.log(`Palabras cargadas exitosamente.`);
  } catch (error) {
    console.error(`Error al leer el archivo ${IN_FILE}: ${error.message}`);
    console.log('Se iniciará con una lista vacía.');
  }
}


// Permitir eliminar palabras específicas.
function borrarPalabra(lista, palabra) {
  console.log(`Regla 3: Intentando borrar "${palabra}"...`);
  // Convertimos a array para encontrar el índice fácilmente
  const palabrasArray = lista.toArray();
  const index = palabrasArray.indexOf(palabra);
  
  if (index !== -1) {
    // Usamos tu método 'removeat' para eliminar por índice
    lista.removeat(index); 
    console.log(`Palabra "${palabra}" eliminada.`);
    return true;
  } else {
    console.log(`Palabra "${palabra}" no encontrada.`);
    return false;
  }
}


//Escribir la lista completa en un archivo de salida.
function guardarPalabras(lista) {
  console.log(`\nRegla 4: Guardando lista final en ${OUT_FILE}...`);
  try {
    const palabrasArray = lista.toArray();
    // Unimos las palabras con un solo espacio, como pide el ejemplo
    const data = palabrasArray.join(' '); 
    
    fs.writeFileSync(OUT_FILE, data, 'utf8');
    console.log(`Lista guardada exitosamente.`);
  } catch (error) {
    console.error(`Error al guardar el archivo ${OUT_FILE}: ${error.message}`);
  }
}



//Función principal que ejecuta la simulación del ejercicio.
function main() {
  console.log('--- Iniciando Ejercicio 1: Gestión de Palabras ---');
  
  // Creamos la lista
  const listaDePalabras = new SinglyLinkedList();
  
  //Cargar palabras
  cargarPalabras(listaDePalabras);
  console.log('Lista inicial:', listaDePalabras.toArray().join(' -> '));
  
  console.log('\n--- Realizando operaciones de ejemplo ---');

  //Añadir: "sandía" al final 
  const palabraNueva = 'sandía';

  listaDePalabras.push(palabraNueva); 
  console.log(`Regla 2: Añadida "${palabraNueva}" al final.`);
  console.log('Lista tras añadir:', listaDePalabras.toArray().join(' -> '));
  
  //Borrar: "pera"
  const palabraABorrar = 'pera';
  borrarPalabra(listaDePalabras, palabraABorrar);
  console.log('Lista tras borrar:', listaDePalabras.toArray().join(' -> '));

  //Guardar la lista final en el archivo
  guardarPalabras(listaDePalabras);

  // Verificación final
  console.log('\n--- Proceso completado ---');
  //Escribir en el documento.
  const resultadoFinal = fs.readFileSync(OUT_FILE, 'utf8');
  console.log(`Contenido de ${OUT_FILE}: ${resultadoFinal}`);
}

// Ejecutar el programa
main();

console.log('');

console.log('Ejercicio 2 Representación de Polinomios con Lista Enlazada-------------------------');

function parseTerm(term) {
  let coef = 0;
  let exp = 0;

  if (!term.includes('x')) {
    // Término constante 
    coef = parseFloat(term);
    exp = 0;
  } else if (term.includes('x^')) {
    // Término con exponente 
    const parts = term.split('x^');
    if (parts[0] === '' || parts[0] === '+') coef = 1;
    else if (parts[0] === '-') coef = -1;
    else coef = parseFloat(parts[0]);
    exp = parseInt(parts[1]);
  } else {
    // Término linear
    const parts = term.split('x');
    if (parts[0] === '' || parts[0] === '+') coef = 1;
    else if (parts[0] === '-') coef = -1;
    else coef = parseFloat(parts[0]);
    exp = 1;
  }
  return { coef, exp };
}


function printSinglyList(list) {
  let str = "";
  let curr = list.head; 
  while (curr) {
    const { coef, exp } = curr.value;
    str += `[${coef} | ${exp}] -> `;
    curr = curr.next;
  }
  str += "NULL";
  console.log(str);
}


function evaluateSinglyList(list, x) {
  let total = 0;
  let curr = list.head; 
  while (curr) {
    const { coef, exp } = curr.value;
    total += coef * Math.pow(x, exp);
    curr = curr.next;
  }
  return total;
}

function evapoly(polyString) {
  console.log(`Polinomio: ${polyString}\n`);
  
  const list = new SinglyLinkedList(); 

  let normalizedPoly = polyString.replace(/\s/g, '');
  normalizedPoly = normalizedPoly.replace(/-/g, '+-');
  if (normalizedPoly.startsWith('+-')) {
    normalizedPoly = normalizedPoly.substring(1);
  }
  const terms = normalizedPoly.split('+').filter(t => t.length > 0);

  for (const term of terms) {
    const { coef, exp } = parseTerm(term);
    list.push({ coef, exp }); 
  }

  console.log("Lista enlazada:");
 
  printSinglyList(list); 
  
  console.log("\nSalida de evaluación:");
  for (let x = 0.0; x <= 5.0; x += 0.5) {
    // --- ACTUALIZADO ---
    const result = evaluateSinglyList(list, x); // Llama a la versión simple
    console.log(`x=${x.toFixed(1)} -> ${result}`);
  }
}

evapoly('3x^4 - 4x^2 + 11');

console.log('');

console.log('Ejercicio 3 Lista Circular de Polinomio---------------------------------------------');

// --- RENOMBRADA ---
function printCircularList(list) {
  let str = "";
  if (!list.tail) {
    str = "NULL";
    console.log(str);
    return;
  }
  let curr = list.tail.next; 
  do {
    const { coef, exp } = curr.value;
    str += `[${coef} | ${exp}] -> `;
    curr = curr.next;
  } while (curr !== list.tail.next); 

  str += "NULL";
  console.log(str);
}


function evaluateCircularList(list, x) {
  if (!list.tail) return 0;
  let total = 0;
  let curr = list.tail.next; 
  do {
    const { coef, exp } = curr.value;
    total += coef * Math.pow(x, exp);
    curr = curr.next;
  } while (curr !== list.tail.next);

  return total;
}

function evapolyCir(polyString) {
  if (typeof polyString !== 'string' || polyString.trim().length === 0) {
    console.error("Error: La función 'main' fue llamada sin un polinomio.");
    console.error("Uso correcto: main('3x^4 - 4x^2 + 11')");
    return;
  }
  console.log(`Polinomio: ${polyString}\n`);
  
  const list = new CircularLinkedList(); 

  let normalizedPoly = polyString.replace(/\s/g, '');
  normalizedPoly = normalizedPoly.replace(/-/g, '+-');
  if (normalizedPoly.startsWith('+-')) {
    normalizedPoly = normalizedPoly.substring(1);
  }
  const terms = normalizedPoly.split('+').filter(t => t.length > 0);

  for (const term of terms) {
    const { coef, exp } = parseTerm(term);
    list.insert({ coef, exp });
  }

  console.log("Lista enlazada:");

  printCircularList(list); // Llama a la versión circular
  
  console.log("\nSalida de evaluación:");
  for (let x = 0.0; x <= 5.0; x += 0.5) {
  
    const result = evaluateCircularList(list, x); // Llama a la versión circular
    console.log(`x=${x.toFixed(1)} -> ${result}`);
  }
}

evapolyCir('3x^4 - 4x^2 + 11');

console.log('');

console.log('Ejercicio 4 Gestión de Pasajeros con listas doblemente enlazada---------------------');

const prompt = require("prompt-sync")();

class PassengerManager {
  constructor() {
    this.passengerList = new DoubleLinkedList();
  }

  showMenu() {
    console.log("\n--- MENÚ GESTIÓN DE PASAJEROS ---");
    console.log("1. Insertar pasajero (al final)");
    console.log("2. Visualizar pasajero");
    console.log("3. Eliminar pasajero");
    console.log("4. Mostrar lista de pasajeros");
    console.log("5. Salir");
    return prompt("Seleccione una opción: ");
  }

  // Opción 1: Insertar
  insertPassenger() {
    const nombre = prompt("Ingrese nombre del pasajero: ");
    const vuelo = prompt("Ingrese número de vuelo: ");
    const asiento = prompt("Ingrese asiento: ");

    // El 'value' del nodo será un objeto con los datos del pasajero
    const passengerData = { nombre, vuelo, asiento };
    this.passengerList.push(passengerData);
    
    console.log("✅ Pasajero agregado correctamente.");
  }

  // Opción 2: Visualizar
  viewPassenger() {
    const num = parseInt(prompt("Ingrese el número de pasajero a visualizar (ej: 1): "));
    if (isNaN(num) || num <= 0) {
      console.log("Número inválido.");
      return;
    }

    // Convertimos el número (1-based) a índice (0-based)
    const index = num - 1;
    const node = this.passengerList.get(index);

    if (node) {
      const p = node.value;
      console.log(`\n--- Datos del Pasajero ${num} ---`);
      console.log(`  Nombre: ${p.nombre}`);
      console.log(`  Vuelo: ${p.vuelo}`);
      console.log(`  Asiento: ${p.asiento}`);
    } else {
      console.log("Error: Pasajero no encontrado.");
    }
  }

  // Opción 3: Eliminar
  deletePassenger() {
    const num = parseInt(prompt("Ingrese el número de pasajero a eliminar (ej: 1): "));
    if (isNaN(num) || num <= 0) {
      console.log("Número inválido.");
      return;
    }

    // Convertimos a índice (0-based)
    const index = num - 1;
    const removedNode = this.passengerList.removeAt(index);

    if (removedNode) {
      console.log(`✅ Pasajero "${removedNode.value.nombre}" eliminado correctamente.`);
    } else {
      console.log("Error: Pasajero no encontrado.");
    }
  }

  // Opción 4: Mostrar Lista
  showAllPassengers() {
    const list = this.passengerList.toArrayForward();
    
    if (list.length === 0) {
      console.log("\nLa lista de pasajeros está vacía.");
      return;
    }

    console.log("\n--- Lista de pasajeros (del primero al último) ---");
    list.forEach((p, index) => {
      // (index + 1) para mostrar una lista 1-based
      console.log(`${index + 1}. ${p.nombre}, Vuelo ${p.vuelo}, Asiento ${p.asiento}`);
    });
  }

  // Iniciar la aplicación
  run() {
    let running = true;
    while (running) {
      const option = this.showMenu();
      switch (option) {
        case "1":
          this.insertPassenger();
          break;
        case "2":
          this.viewPassenger();
          break;
        case "3":
          this.deletePassenger();
          break;
        case "4":
          this.showAllPassengers();
          break;
        case "5":
          running = false;
          console.log("Saliendo del sistema...");
          break;
        default:
          console.log("Opción no válida. Intente de nuevo.");
      }
    }
  }
}

// Ejecutar la aplicación
const app = new PassengerManager();
app.run();

//!Terminado 
