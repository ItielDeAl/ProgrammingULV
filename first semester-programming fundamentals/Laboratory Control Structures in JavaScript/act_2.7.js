//Verificar si un numero es divisible por 2 o por 3.
let numero = prompt("Ingrese el numero") ; // le asignamos al numero a dividir la variable de numero

let division = numero %2; // por medio del modulo realizamos la divicion.
let division2 = numero%3;
if (division==0){ //si el resultado del modulo es 0 sera verdadero y por lo tamto imprimira "es divicible por 2"
    console.log("es divisible por 2"); 
}if(division2==0){
console.log("El numero es divicible por 3");//si el resultado del modulo es 0 sera verdadero y por lo tamto imprimira "es divicible por 3"
}else{
    console.log("No es divisible por 2 y 3");//si ambos no son verdaderos imprimira no es divisible por ambos numeros
    
}