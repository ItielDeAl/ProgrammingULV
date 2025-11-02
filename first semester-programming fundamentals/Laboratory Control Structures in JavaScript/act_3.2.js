//Verifica si una persona puede votar, condicir o ambas
let edad = prompt("Ingresa la edad");
let licencia = prompt("Si tiene licencia ingresa Si, de lo contrario ingresa no");
licencia.toLowerCase();//Convertimos a minusculas el resultado de licencia, para hacer mas facil la comparecion

if (edad >=18 && licencia == 'si') {//Si ambas condiciones se cumplen, el log se ejecutara, en casi de que no, pasara al siguiente else
    console.log("Puede votar y conducir");
    
} else if(licencia == 'si'){//Si se cumple, el log se ejecutara, en casi de que no, pasara al siguiente else
    console.log("Puede Conducir, pero no votar")    
}else if(edad >=18){//Si se cumple, el log se ejecutara, en casi de que no, pasara al siguiente else
    console.log("Puede Votar, pero no conducir");
    
}else{//Si nunguna de las anteriores se cumple, se ejcutara el log
    console.log("No puede votar ni conducir");
    
}