//Verifica el estado de una bateria (bajo, medio alto)
let estado = prompt("Ingresa el porcentaje de la bateria en números (0-100)");

if (estado>=0 && estado<=20) {//Ambas comparaciones se deben de cumplir para que se ejecute el log
    console.log("Batería baja");
    
} else if (estado>20 && estado<=80) {
    console.log("Batería media");
}else if(estado>80 && estado<=100){
    console.log("Bateria alta");
}else{
    console.log("El porcentaje de la bateria debe estar entre 0 y 100");
    
}