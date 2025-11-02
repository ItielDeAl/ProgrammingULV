//Determina si una cadenas es "Si" o "No"
let cadena1 = prompt("Ingrese cadena");
let cadena = cadena1.toLocaleLowerCase();
switch (true) {//Solo se ejecutara el log correspondiente cuando sea verdadero (true) la comparacion
    case (cadena==='si'):
        console.log("La cadena es Si");  
        break;
    case (cadena==='no'):
        console.log("La cadena es No");  
        break;
    default:
        console.log("La cadena es invalida");  
        break;
}