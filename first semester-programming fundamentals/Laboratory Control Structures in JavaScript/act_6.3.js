//Actividad 3
let numero = parseInt(prompt("Introduce un número:"));
//Verivficamos si numero es primo
if (primo(numero)) {
    console.log(numero+" es un número primo.");
} else {
    console.log(numero+" no es un número primo.");
}
//divisores del numero
function primo(num) {
    if (num < 2) return false;
    let i = 2;//divisor
    while (i * i <= num) {
        if (num % i === 0) return false;
        i++;
    }
    return true;//sera true si no se encuentra ninguno
}
//verifica los de mas numeros
function imprimir(n) {
    console.log("Números primos entre 1 y "+n);
    let num = 1;
    while (num <= n) {
        if (primo(num)) {
            console.log(num);
        }
        num++;
    }
}
//se imprimen todos los numeros de la funcion imprimir
imprimir(numero);