//Actividad 5
//Defino mis contadores para ambos
let aprobados=0;
let reprobados=0;
//Almaceno la calificacion
let calificacion;
while (true) {
    // Ingrese una calificación
    calificacion = prompt("Ingresa una calificación(0-100) (o escribe 'salir' para terminar):");

    // El usuario desea salir
    if (calificacion.toLowerCase() === 'salir') {
        break; // Salir del bucle
    }
    calificacion = parseFloat(calificacion);

    // Verificar si la calificación es válida
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        console.log("Por favor, ingresa una calificación válida entre 0 y 100.");
        continue; // Volver al inicio del bucle
    }

    // Determinar si la calificación es aprobada o reprobada
    if (calificacion >= 60) {//Si 
        aprobados++; 
    } else {
        reprobados++; // Incrementar contador de reprobados
    }
}
console.log("Total de aprobados "+aprobados);
console.log("Total de reprobados 10"+reprobados);

