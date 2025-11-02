//Calcula el factorial de un numero
let numero= prompt("Ingresa el numero");
if (numero>0) {
let fact=1;
    let i=1;//Inicamos en 1 por que no podemos multiplicar por 0
while (i<=numero) {
    fact*=i;
    i++;
}
console.log("El factorial de "+numero+" es: " +fact);
}else{
    console.log("El factorial solo esta definido para numeros positivos");
    
}