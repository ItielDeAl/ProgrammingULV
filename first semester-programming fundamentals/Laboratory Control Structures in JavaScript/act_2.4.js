//Verificar si el año es bisiesto o no
let año = prompt("Ingrese el año"); //le asignamos un la variable año.

let bisiesto = año %4; // Sacamos el modulo de 4 con el año para saber si fue bisiesto

if (bisiesto==0){//si el resultado del modulo es 0, entonces sera verdadero y por lo tanto es bisiesto. 
    console.log("El año es bisiesto");
}else{
    console.log("El año no es bisiesto");//Si es falso se imprimira no es bisiesto
}