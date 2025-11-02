//Actvidad 1
let edad=prompt("Ingresa edad");
let contador=-1;
if (edad>=18) {//Si se cumple se ejecuta este log
    console.log("Puede votar");
    
} else {
    console.log("No puede votar");
}

for (edad; edad <=65; edad++) {
    contador++//El contador amenta por cada año que nos haga falta para llegar a los 65 
}
console.log("Faltan "+contador+" años para que te retires");
