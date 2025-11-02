//Imprime el factorial de un numero
let numero = prompt("Ingresa el número");
if (numero>0) {

let fact=1;
for (let i = 1; i <= numero; i++) {
    fact *= i;
}//Iniciamos en 1 por que no podemos iniciar de 0 al realizar la multiplicacion
console.log("El factorial de "+numero+" es "+fact);

}else{
    console.log("El factorial no esta definido para números positivos");
}