//Comprueba si una letra es vocal o consonante
let letra = prompt("Ingresa la letra");
letra = letra.toLowerCase();//Convertimos a miniscula para hacer mas facil la comparacion
if (letra === 'a'|| letra === 'e'|| letra === 'i'|| letra === 'o'|| letra === 'u') {//ingresamos las vocales (ya que son menos) y las separamos con ||
    console.log("La letra es una vocal");
    
} else {
    console.log("La letra es una consonante");//en caso de no estar con alguna vocal es consonantea
    
}