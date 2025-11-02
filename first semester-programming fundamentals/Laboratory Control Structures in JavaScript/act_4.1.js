//Determina el dia de la semana apartir de un numero
let numero = prompt("Ingresa un numero para el dia de la semana 1-7");
switch (numero) {
    case "1":
    console.log("Domingo");
        break;
    case "2":
    console.log("Lunes");
        break;
    case "3":
     console.log("Martes");
        break;
    case "4":
        console.log("Miercoles");
        break;
    case "5":
    console.log("Jueves");
        break;
    case "6":
         console.log("Viernes");
        break;
    case "7":
        console.log("Sabado");
        break;
    default:
        console.log(numero + " "+ "no esta dentro de las opciones");
        
        break;
}