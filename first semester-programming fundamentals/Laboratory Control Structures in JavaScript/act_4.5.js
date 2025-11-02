//Verifica si una cadena es "Hola", "Adiós", o "Desconocido"
let cadena1 = prompt("Ingrese cadena");
let cadena = cadena1.toLocaleLowerCase();//Convertimos a minusculas para que nos sea mas facil la comparación
switch (true) {//Se ejecutara el log correspondiente cuando la comparacion sea true (verdadera)
    case (cadena==='hola'):
        console.log("La cadena es Hola");  
        break;
    case (cadena==='adiós' || cadena==='adios'):
        console.log("La cadena es Adiós");  
        break;
    case (cadena==='desconocido'):
        console.log("La cadena es Desconocido");            ;
        break;
    default:
        console.log("La cadena es invalida");  
        break;
}
