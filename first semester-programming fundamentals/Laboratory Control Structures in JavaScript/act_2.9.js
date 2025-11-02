//Verifica si una persona es adolescente(entre 13 y 19 años)

let edad = prompt("Ingrese edad en numero"); 

if (edad<=19 && edad>=13){ //&& nos dice que sera verdadero cuando ambas comparaciones lo sean
    console.log("La persona es adolescente"); //Si se cumple la conparacion se imprimira esto.
}else{
    console.log("La persona no es adolescente");//Si no se cumple la conparacion se imprimira esto.
    
}