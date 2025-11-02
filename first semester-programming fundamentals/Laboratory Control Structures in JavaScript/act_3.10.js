//determina si un número es positivo y divisible por 5
let numero = prompt("Ingresa un número");

let divisible = numero %5;

if(numero>0 && divisible ==0){
    console.log("El número es positivo y divisible por 5");
}else if(numero>0 && divisible!=0){
 console.log("El numero es positivo pero no es divisible por 5");
}else if(numero<0 && divisible==0){
    console.log("El numero es negativo pero es divisible por 5");
}else{
    console.log("El número es negativo y no es divisible por 5");
    
}