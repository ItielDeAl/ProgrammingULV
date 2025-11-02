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


// Merge Sort
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }


    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);


    return merge(mergeSort(left), mergeSort(right));
}


function merge(left, right) {
    let result = [];
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


// Quick Sort
function quickSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = partition(array, low, high);
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
    return array;
}


function partition(array, low, high) {
    let pivot = array[high];
    let i = low - 1;


    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    let swapTemp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = swapTemp;


    return i + 1;
}




// Función para generar números aleatorios


function generarArrayAleatorio(cantidad, min = -200000, max = 200000) {
    let arr = [];
    for (let i = 0; i < cantidad; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}




// Función para medir tiempo en tics (nanosegundos)


function medirTiempo(algoritmo, array, nombre) {
    let inicio = process.hrtime.bigint();
    let resultado = algoritmo([...array]);
    let fin = process.hrtime.bigint();
    let duracion = fin - inicio; // en nanosegundos (tics)
    console.log(`${nombre} tardó: ${duracion} tics`);
    return resultado;
}


// Ejecución


let cantidad = 100000; // 👈 aquí eliges la cantidad
let testArray = generarArrayAleatorio(cantidad);


//console.log("Array original:", testArray);


let bubbleResult = medirTiempo(bubbleSort, testArray, "Bubble Sort");
let mergeResult = medirTiempo(mergeSort, testArray, "Merge Sort");
let quickResult = medirTiempo(quickSort, testArray, "Quick Sort");


console.log(cantidad);
/*console.log("Bubble Sort:", bubbleResult);
console.log("Merge Sort:", mergeResult);
console.log("Quick Sort:", quickResult);
*/