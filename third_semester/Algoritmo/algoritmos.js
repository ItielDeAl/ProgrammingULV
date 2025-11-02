// Bubble Sort Implementation
function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Intercambiar elementos
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

// Merge Sort Implementation
function mergeSort(array) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Quick Sort Implementation
function quickSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = partition(array, low, high);
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
}

function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const swapTemp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = swapTemp;

    return i + 1;
}

// Función para generar un arreglo aleatorio
function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100)); // Números aleatorios entre 0 y 99
    }
    return array;
}

// Definir el tamaño del arreglo aquí
const size = 150000; // Cambia este valor según sea necesario

// Generar el arreglo aleatorio
const array = generateRandomArray(size);

console.log(size);

// Medir el tiempo de ejecución para Bubble Sort
const startBubble = process.hrtime.bigint();
bubbleSort([...array]); // Usar una copia del arreglo
const endBubble = process.hrtime.bigint();
console.log(`Bubble Sort - Tiempo de ejecución: ${endBubble - startBubble} Tics`);

// Medir el tiempo de ejecución para Merge Sort
const startMerge = process.hrtime.bigint();
const sortedMerge = mergeSort([...array]); // Usar una copia del arreglo
const endMerge = process.hrtime.bigint();
console.log(`Merge Sort - Tiempo de ejecución: ${endMerge - startMerge} Tics`);

// Medir el tiempo de ejecución para Quick Sort
const startQuick = process.hrtime.bigint();
quickSort([...array]); // Usar una copia del arreglo
const endQuick = process.hrtime.bigint();
console.log(`Quick Sort - Tiempo de ejecución: ${endQuick - startQuick} Tics`);