//Imprime los primeros 10 termninos de la serie Fibonacci
let fibonacci = [0, 1]; // Inicializamos los dos primeros números de la serie

for (let i = 2; i < 10; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; // Suma de los dos anteriores
}
console.log("Los primeros 10 terminos de la serie fibonacci son: "+fibonacci.join(", "));
