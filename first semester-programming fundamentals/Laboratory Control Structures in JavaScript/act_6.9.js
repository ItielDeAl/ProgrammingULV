//Actividad 9
let seguir=true
let intentos=0
do {
    let contraseña=prompt("Ingrese contraseña de 4 digitos numericos");
    switch (contraseña) {
        case '1111':
            alert("Contraseña correcta")
            seguir=false;
            break;
    
        default:
            alert("Contraseña incorrecta");
            intentos++;
            break;
    }
    if (intentos===3) {//Determinamos 3 intentos
        seguir=false;
        alert("Sin intentos")
    }
} while (seguir);