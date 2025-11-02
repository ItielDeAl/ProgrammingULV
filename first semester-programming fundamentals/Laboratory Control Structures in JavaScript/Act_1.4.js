//determinar si un año es bisiesto

let año = prompt("Ingrese el año"); //le asignamos un la variable año.

let bisiesto = año %4; // Sacamos el modulo de 4 con el año para saber si fue bisiesto

if (bisiesto==0){//si ekl resultado del modulo es 0, entonces sera verdadero y por lo tanto es bisiesto. 
    console.log("Año bisiesto");//En caso de no ser sierto, no aparecera nada
}