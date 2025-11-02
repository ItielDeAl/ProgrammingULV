class SortingAlgorithms {
    static mergeSort(array) {
        if (array.length <= 1) return array;

        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    static merge(left, right) {
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
}

// Función para crear arreglos
function createArray(type, size) {
    switch (type) {
        case 'ascendente':
            return Array.from({ length: size }, (_, i) => i + 1);
        case 'descendente':
            return Array.from({ length: size }, (_, i) => size - i);
        case 'repetido':
            return Array(size).fill(size); // Rellenar con el mismo número
        default:
            throw new Error('Tipo de arreglo no válido');
    }
}

// Medir tiempo en nanosegundos
function measureExecutionTime(type, size) {
    const array = createArray(type, size);
   //onsole.log(`Arreglo original (${type}):`, array); // Imprimir arreglo original
    const startTime = process.hrtime.bigint(); // Obtiene el tiempo en nanosegundos
    const sortedArray = SortingAlgorithms.mergeSort(array);
    const endTime = process.hrtime.bigint();
    const duration = endTime - startTime; // Duración en nanosegundos
    //nsole.log(`Arreglo ordenado:`, sortedArray); // Imprimir arreglo ordenado
    console.log(`Tiempo de ejecución para ${type} de tamaño ${size}: ${duration} nanosegundos`);
}

// Ejemplo de uso
const size =150000
measureExecutionTime('ascendente', size);
measureExecutionTime('descendente', size);
measureExecutionTime('repetido', size);
