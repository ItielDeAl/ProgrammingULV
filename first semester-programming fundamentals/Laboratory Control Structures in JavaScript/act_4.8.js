//Convierte un número del 1 al 5 en su nombre en ingles
let numero = prompt("Ingresa un numero del 1-5");
switch (numero) {//Numero debe estar contenido entre las opciones, en caso de que no, se ejecutara el log del default
    case "1":
        console.log("El número "+numero+" en ingles es: One");
        break;
    case "2":
        console.log("El número "+numero+" en ingles es: Two");
        break;
    case "3":
        console.log("El número "+numero+" en ingles es: Three");
        break;
    case "4":
        console.log("El número "+numero+" en ingles es: Four");
        break;
    case "5":
        console.log("El número "+numero+" en ingles es: Five");
        break;
    default:
        console.log(numero + " no esta dentro de las opciones");
        
        break;
    }