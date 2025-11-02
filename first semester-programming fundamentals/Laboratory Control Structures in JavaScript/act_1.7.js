// Verificar si un numero es multiplo de 3 
let numero = prompt("Ingrese numero a verificar");

let multiplo = numero %3; //le sacamos si modulo para saber si al dividir entre 3 tenemos residuos

if (multiplo==0) {//en caso de no tener residuos nuestra condición sera verdadera y sera multiplo de 3  
    console.log("el numero es multiplo de 3");   //en caso de que tenga residuos no es multiplo de 3
}
