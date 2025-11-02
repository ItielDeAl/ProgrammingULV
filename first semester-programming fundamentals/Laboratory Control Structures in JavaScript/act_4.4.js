//Clasifica una nota enletras (A, B, C, D, F)
let nota = prompt("Ingrese la nota 1-100");

switch (true) {//Si alguna comparacion es verdadera se ejecutara el log correspondiente
 //el && funciona como un compardor and, solo sera verdadero si ambos lo son.
    case (nota<=100 && nota>= 90):
            console.log("La nota es A");  
            break;
        case (nota<90 && nota>=80):
            console.log("La nota es B");  
            break;
        case (nota<80 && nota>=70):
            console.log("La nota es C");  
            break;
        case (nota<70 && nota>=60):
            console.log("La nota es D");  
            break;
        case (nota<60):
            console.log("La nota es F");            ;
            break;
        default:
            console.log("Numero invalido");  
            break;
    }
 