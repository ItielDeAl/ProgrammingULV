//Calcula el factorial de un numero
let numero=prompt("Ingresa el numero");
let i=1;
let fact=1;
do {
    fact*=i;
    i++;
} while (i<=numero);//Cuando no se cumpla la condicion, finaliza
console.log("El factorial de "+numero+" Es: "+fact);
