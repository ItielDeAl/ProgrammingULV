//Verifica si una letra es vocal (Solo considera minusculas)
    let letra = prompt("Ingresa letra en minuscula");
switch (true) {//El log se ejecutara si alguna de las comparaciones dentro del case, es true
    case (letra==='a'|| letra==='e'||letra==='i'|| letra==='o'||letra==='u'):
        console.log("La letra es una vocal");
        
        break;

    default:
        console.log(letra+" Es una consonante");
        
        break;
} 