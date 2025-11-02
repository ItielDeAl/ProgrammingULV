//Verificar si una cadena tiene entre 5 caracteres y 10 caracteres.
let cadena = prompt("Ingrese la cadena") ; //asignamos a la cadena su variable
//Utilizaremos "length" es cual nos ayudara identificar el largo de la cadena.
if (cadena.length>=5 && cadena.length<=10){ //si se cumplen ambas comparaciones se ejecutara el log
    console.log("La cadena contiene entre 5 y 10 caracteres"); 
}else if (cadena.length<5){
        console.log("La cadena tiene menos de 5 caracteres");        
}else{
    console.log("la cadena tiene más de 10 caracteres");//en caso de que no se cumplan las comparaciones anteriores se ejecutara el log.
}console.log("La cadena contiene:" + cadena.length + " caracteres");


