//Verificar el estado del clima (frio, templado o caliente)
let grados = prompt("Ingresa los la temperatura del clima en grados Celsius");

if (grados<=10) {
    console.log("El clima es frio");//si el resultado es verdadero se ejecutara el log
    
}else if(grados<=20 && grados>10){//si los resultados estan entre 10 y 20 el resultado es verdadero y se ejecutara el log
    console.log("El clima es templado");
    
}else{
    console.log("El clima es caliente");//si el resultado de las comparaciones anteriores osn falsas se ejecutara el log
    
}