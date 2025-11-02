//Determinar si un numero es multiplo de 2, 3 o ambos
let numero = prompt("Ingrese el numero") ; // le asignamos al numero a dividir la variable de numero

let multiplo = numero %2; // por medio del modulo realizamos la divicion.
let multiplo2 = numero%3;
if (multiplo ==0 && multiplo2==0){//Se tiene que cumplir, ambas comparaciones
    console.log("El numero es multiplo de 2 y 3");
}else if(multiplo==0){
    console.log("El numero es multiplo de 2");
}else if(multiplo2==0){
    console.log("El numero es multiplo de 3");
}else{//Si ninguna de las anteriores se cumple se ejecutara el log.
    console.log("El numero no es multiplo de 2 y 3");
    
}