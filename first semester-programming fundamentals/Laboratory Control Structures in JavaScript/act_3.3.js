//Verificar si un numero es divisible por 2, 3 o ambos
let numero = prompt("Ingrese el numero") ; // le asignamos al numero a dividir la variable de numero

let division = numero %2; // por medio del modulo realizamos la divicion.
let division2 = numero%3;

if (division==0 && division2==0){ //Si ambas comparaciones son verdaderas se ejecutara el log
    console.log("El número es divisible por 2 y por 3"); 
}else if(division==0){
    console.log("El numero es divisible por 2");//si el resultado es verdadero se ejecutara el log
}else if(division2==0){
console.log("El numero es divisible por 3");//si el resultado resultado es verdadero se ejecutara el log
}else{
    console.log("El número no es divisible por 2 y 3");//si ambos no son verdaderos imprimira no es divisible por ambos numeros
    
}
