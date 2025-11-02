//Verifica el tipo de usuario (admin, editor, usuario)
let cadena1 = prompt('Ingrese el tipo de usuario (admin, editor, usuario)');
let cadena = cadena1.toLocaleLowerCase();//Convertimos a minusculas para que nos sea mas facil la comparación
switch (true) {//Se ejecutara el log correspondiente cuando la comparacion sea true (verdadera)
    case (cadena==='admin'):
        console.log("El usuario es Admin");  
        break;
    case (cadena==='editor'):
        console.log("El usuario es Editor");  
        break;
    case (cadena==='usuario'):
        console.log("El usuario es usuario");            ;
        break;
    default:
        console.log("Tipo de usuario invalido");  
        break;
}
