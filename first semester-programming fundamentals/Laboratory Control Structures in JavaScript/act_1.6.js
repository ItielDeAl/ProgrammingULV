//verificar si un numero es impar

let numero = prompt("Ingrese numero") ;

let impar = numero %2; //sacamos su modulo 2 para saber si tenemos residuos de la divición.

if (impar==1){ //en caso de ser verdadera la comparacion es por que hay residuos, por lo tanto es impar 
    console.log("El número es impar");
    
}