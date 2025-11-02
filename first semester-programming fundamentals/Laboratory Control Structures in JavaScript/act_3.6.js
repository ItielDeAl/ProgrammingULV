//Verifica si un numero esta entre el 0 y 50, 51 y 100 o mas de 100
let numero = prompt("Ingresa un número positivo");
//Solo si ambas comparaciones son verdaderas se ejecutara el log, si no se pasara al siguiente, y en caso de que no ninguna lo se si imprimira el ultimo log
if (numero>=0 && numero<=50){
    console.log("El numero se encuentra entre el 0 y 50");
    
}else if((numero>=51 && numero<=100)){
    console.log("El numero se encuetra entre 51 y 100");
    
}else{
    console.log("El numero " + numero + " es mayor a 100");
    
}