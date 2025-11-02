// Algoritmos de Ordenamiento

console.log("Algoritmos de Ordenamiento");


// Bubble Sort
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Merge Sort con recursividad (correcion)
function mergeSort(array, left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }

    let mid = Math.floor((left + right) / 2);

    // Recursión sobre la mitad izquierda y derecha
    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);

    // Merge
    let temp = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        if (array[i] <= array[j]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
        }
    }

// Copiar lo que quedó de la izquierda
    while (i <= mid) {
        temp.push(array[i++]);
    }

    // Copiar lo que quedó de la derecha
    while (j <= right) {
        temp.push(array[j++]);
    }

    // Copiar de regreso al arreglo original
    for (let k = 0; k < temp.length; k++) {
        array[left + k] = temp[k];
    }

    return array;
}

// Quick Sort en una sola funcion
function quickSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
        // Elegir un pivote aleatorio y moverlo al final
        let randomIndex = low + Math.floor(Math.random() * (high - low + 1));
        [array[randomIndex], array[high]] = [array[high], array[randomIndex]];
// Partición (el resto del código es el mismo)
        let pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        let pi = i + 1;

        // Recursividad
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
    return array;
}


// --- FUNCIONES PARA GENERAR ARREGLOS ---
// Función para generar números aleatorios
function generarArrayAleatorio(cantidad, min = -200000, max = 200000) {
    let arr = [];
    for (let i = 0; i < cantidad; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// Función para generar un arreglo ordenado
function generarArrayOrdenado(cantidad) {
    let arr = [];
    for (let i = 0; i < cantidad; i++) {
        arr.push(i);
    }
    return arr;
}

// Función para generar un arreglo en orden inverso
function generarArrayInverso(cantidad) {
    let arr = [];
    for (let i = cantidad - 1; i >= 0; i--) {
        arr.push(i);
    }
    return arr;
}


// Función para medir tiempo en tics (nanosegundos)
function medirTiempo(algoritmo, array, nombre) {
    let inicio = process.hrtime.bigint();
    let resultado = algoritmo([...array]);
    let fin = process.hrtime.bigint();
    let duracion = fin - inicio; // en nanosegundos (tics)
    console.log(`- ${nombre}: ${duracion} tics`);
return resultado;
}


// --- EJECUCIÓN ---

let cantidad = 150000; // 👈 Cambia aquí la cantidad de elementos a probar

console.log(`\n--- Pruebas con ${cantidad} elementos ---\n`);

// 1. Probar con un arreglo ordenado
let testArrayOrdenado = generarArrayOrdenado(cantidad);
console.log("--- Pruebas con Arreglo Ordenado ---");
let bubbleResult1 = medirTiempo(bubbleSort, testArrayOrdenado, "Bubble Sort");
let mergeResult1 = medirTiempo(mergeSort, testArrayOrdenado, "Merge Sort");
let quickResult1 = medirTiempo(quickSort, testArrayOrdenado, "Quick Sort");
//console.log(Resultado Bubble: [${bubbleResult1.slice(0, 5)}..., ${bubbleResult1.slice(-5)}]);
//console.log(Resultado Merge: [${mergeResult1.slice(0, 5)}..., ${mergeResult1.slice(-5)}]);
//console.log(Resultado Quick: [${quickResult1.slice(0, 5)}..., ${quickResult1.slice(-5)}]);
console.log("\n");

// 2. Probar con un arreglo aleatorio
let testArrayAleatorio = generarArrayAleatorio(cantidad);
console.log("--- Pruebas con Arreglo Aleatorio ---");
let bubbleResult2 = medirTiempo(bubbleSort, testArrayAleatorio, "Bubble Sort");
let mergeResult2 = medirTiempo(mergeSort, testArrayAleatorio, "Merge Sort");
let quickResult2 = medirTiempo(quickSort, testArrayAleatorio, "Quick Sort");
//console.log(Resultado Bubble: [${bubbleResult2.slice(0, 5)}..., ${bubbleResult2.slice(-5)}]);
//console.log(Resultado Merge: [${mergeResult2.slice(0, 5)}..., ${mergeResult2.slice(-5)}]);
//console.log(Resultado Quick: [${quickResult2.slice(0, 5)}..., ${quickResult2.slice(-5)}]);
console.log("\n");
// 3. Probar con un arreglo en orden inverso
let testArrayInverso = generarArrayInverso(cantidad);
console.log("--- Pruebas con Arreglo Inverso ---");
let bubbleResult3 = medirTiempo(bubbleSort, testArrayInverso, "Bubble Sort");
let mergeResult3 = medirTiempo(mergeSort, testArrayInverso, "Merge Sort");
let quickResult3 = medirTiempo(quickSort, testArrayInverso, "Quick Sort");
//console.log(Resultado Bubble: [${bubbleResult3.slice(0, 5)}..., ${bubbleResult3.slice(-5)}]);
//console.log(Resultado Merge: [${mergeResult3.slice(0, 5)}..., ${mergeResult3.slice(-5)}]);
//console.log(Resultado Quick: [${quickResult3.slice(0, 5)}..., ${quickResult3.slice(-5)}]);
console.log("\n");
