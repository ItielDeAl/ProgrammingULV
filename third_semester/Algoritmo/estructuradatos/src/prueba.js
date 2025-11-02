const Stack = require ('./stack/stack')
const prompt = require("prompt-sync")();
//TORRES DE HANOI CON PILAS
/*
function hanoi(){
    const A = new Stack();
    const B = new Stack();//Auxiliar
    const C = new Stack();//Destino
    
    for(let i = 3; i>=1; i--){
        A.push(i)
    }

    function moverDiscos(possnt,posig) {
    }


    A.push('A')
    B.push('B')
    C.push('C')
    A.print();
    B.print();
    C.print();
    
}

hanoi();
*/
// Asumo que tu clase Stack tiene:
function moverDiscos(n, origen, destino, auxiliar, imprimirEstado) {
    // Caso base: si no hay discos que mover, no hagas nada.
    if (n > 0) {
        // 1. Mover n-1 discos de Origen a Auxiliar
        moverDiscos(n - 1, origen, auxiliar, destino, imprimirEstado);

        // 2. Mover el disco n (el más grande) de Origen a Destino
        const disco = origen.pop();
        destino.push(disco);
        console.log(`\n--> Moviendo disco ${disco} de Torre ${origen.name} a Torre ${destino.name}`);
        imprimirEstado(); // Imprimir estado después de mover

        // 3. Mover n-1 discos de Auxiliar a Destino
        moverDiscos(n - 1, auxiliar, destino, origen, imprimirEstado);
    }
}

// --- Función Principal ---
function hanoi() {
    const A = new Stack(); // Origen
    const B = new Stack(); // Auxiliar
    const C = new Stack(); // Destino

    // Damos nombres a las pilas para imprimir mejor
    A.name = 'A';
    B.name = 'B';
    C.name = 'C';

    // El número de discos. ¡Puedes cambiar este valor!
    const numDiscos = 4; 
    
    // Llenar la pila A (Origen)
    // El disco más grande (3) va al fondo, el más pequeño (1) va arriba.
    for (let i = numDiscos; i >= 1; i--) {
        A.push(i);
    }

    // --- Función para imprimir el estado actual ---
    const imprimirEstado = () => {
        console.log("---------------------");
        // process.stdout.write es como console.log pero sin el salto de línea final
        process.stdout.write(`Torre A: `); A.print();
        process.stdout.write(`Torre B: `); B.print();
        process.stdout.write(`Torre C: `); C.print();
        console.log("---------------------");
    };
    
    console.log("=== ESTADO INICIAL ===");
    imprimirEstado();

    // --- Iniciar el algoritmo ---
    // Queremos mover 'numDiscos' de A (origen) a C (destino), usando B (auxiliar)
    moverDiscos(numDiscos, A, C, B, imprimirEstado);
    
    console.log("\n=== ESTADO FINAL ===");
    imprimirEstado();
}

hanoi();