//Actividad 7
for (let i = 1; i <= 150; i++) {
    let salida = '';//Guardamos si hay mas de 1

    if (i % 3 === 0) {
        salida += 'Múltiplo de 3';
    }
    if (i % 5 === 0) {
        salida += (salida ? ', ' : '') + 'Múltiplo de 5';
    }
    if (i % 7 === 0) {
        salida += (salida ? ', ' : '') + 'Múltiplo de 7';
    }

    if (salida) {//Imprimimostodas las salidas de i
        console.log(i +": "+salida);
    }
}