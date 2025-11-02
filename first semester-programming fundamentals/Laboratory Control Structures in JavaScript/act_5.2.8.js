//Imprime los primeros 10 terminos de la serie fibonacci
let fibonacci = [0,1];
let i=2;
while (i<10) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; // Suma de los dos anteriores    
    i++;
}
console.log("Los primeros 10 terminos de la serie fibonacci son: "+fibonacci.join(", "));


