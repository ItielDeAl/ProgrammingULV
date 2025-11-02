// Verificar si un numero es multiplo de 5 
let numero = prompt("Ingrese numero a verificar");

let multiplo = numero %5; //le sacamos si modulo para saber si al dividir entre 5 tenemos residuos

if (multiplo==0) {//en caso de no tener residuos nuestra condición sera verdadera y sera multiplo de 5  
    console.log("el numero es multiplo de 5");   //en caso de que tenga residuos no es multiplo de 5
}else{
    console.log("El numero no es multiplo de 5 ");
    
}
