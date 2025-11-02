//Actividad 10.
let numero = parseInt(prompt("Ingresa un número"));
let divisores = 0;

// Calcular la suma de los divisores propios
for (let i = 1; i < numero; i++) {
    if (numero % i === 0) {
        divisores += i; // Sumar el divisor
    }
}

// Verificar si el número es perfecto
if (divisores === numero) {
    console.log(numero +" Es un número perfecto.");
} else {
    console.log(numero+ "no es un número perfecto.");
}