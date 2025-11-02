//Comprueba si una letra es vocal o consonante, mayuscula o minuscula
let letra = prompt("Ingresa la letra");

let letra1 = letra.toLowerCase();//Convertimos a miniscula para hacer mas facil la comparacion
//Verificamos si es mayuscula o minuscula
if (letra === letra1) {
    console.log("La letra es minuscula");
}else{
    console.log("La letra es mayuscula");   
}
//Verificamos es vocal o consonante
if (letra1 === 'a'|| letra1 === 'e'|| letra1 === 'i'|| letra1 === 'o'|| letra1 === 'u') {//ingresamos las vocales (ya que son menos) y las separamos con ||
    console.log("La letra es una vocal");
    
} else {
    console.log("La letra es una consonante");//en caso de no estar con alguna vocal es consonantea   
}
