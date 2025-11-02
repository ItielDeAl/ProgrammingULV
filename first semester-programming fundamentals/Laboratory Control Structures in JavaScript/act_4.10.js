//Determina el color del semaforo
let cadena1 = prompt('Ingrese el Color de semaforo (rojo, amarillo, verde)');
let cadena = cadena1.toLocaleLowerCase();//Convertimos a minusculas para que nos sea mas facil la comparación
switch (true) {//Se ejecutara el log correspondiente cuando la comparacion sea true (verdadera)
    case (cadena==='rojo'):
        console.log("El semafororo esta en rojo, no puede avanzar");  
        break;
    case (cadena==='amarillo'):
        console.log("El semaforo esta en amarillo, avance con precaucion");  
        break;
    case (cadena==='verde'):
        console.log("El semaforo esta en verde, puede avanzar");            ;
        break;
    default:
        console.log("Color invalido");  
        break;
}
