//Actividad 8
let numeros = [];

// Solicitar 5 números al usuario
for (let i = 0; i < 5; i++) {
    numeros.push(parseFloat(prompt("Ingresa el número "+(i+1) )));
}

numeros.sort((a, b) => b - a);// Ordenar los números de mayor a menor

// Imprimir los números ordenados
console.log("Números ordenados de mayor a menor:");
console.log(numeros);