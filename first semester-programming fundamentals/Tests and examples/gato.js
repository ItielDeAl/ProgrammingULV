
//Creamos un array bidimencional para el tablero
let tablero= [
    ['','',''],
    ['','',''],
    ['','','']
] 
//Funcion para imprimir el tablero
function imprimirTablero(){
    console.log(
        `
        0  1  2
        ------
        0| ${tablero[0][0]} | ${tablero[0][1]} |${tablero[0][2]}
        ------
        1|${tablero[1][0]} | ${tablero[1][1]} |${tablero[1][2]}
        ------
        2|${tablero[2][0]} | ${tablero[2][1]} |${tablero[2][2]}
        ------`);
    
}
//Verifica si hay ganador
function verificaGanador(jugador){
    //Verificar si las columnas y diagonales
    for(let i=0; i<3;i++){
        if(tablero [i][0]=== jugador&& tablero[i][1]===jugador && tablero[i][2]===jugador) return true;
        if(tablero [0][i]=== jugador&& tablero[1][i]===jugador && tablero[2][i]===jugador) return true;
}
    if(tablero [0][0]=== jugador && tablero[1][1]===jugador && tablero[2][2]===jugador) return true; 
    if(tablero [0][2]=== jugador && tablero[1][1]===jugador && tablero[2][0]===jugador) return true;
    return false;

}

//Verificar si hay empate
function verificaEmpate(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if (tablero[i][j]==='') return false;
        }
    }
    return true;
}
//Jugar
function jugar(){
    let jugadorActual= 'X';
    let juegoTerminado=false;

    while(!juegoTerminado){
        imprimirTablero();
        console.log(`turno del jugador ${jugadorActual}`);
        let fila= prompt(`jugador ${jugadorActual}, ingresa la fila (0,1);`);
        let columna= prompt(`jugador ${jugadorActual}, ingresa la columna (0,1);`);
        
        //Validar si la posicion es valida
        if (tablero[fila][columna] =' ' && fila>=0 && fila<3 && columna>=0 && columna<3){
            tablero[fila][columna] = jugadorActual;

            //Ganador
            if (verificaGanador(jugadorActual)){
                imprimirTablero();
                console.log(`¡El jugador ${jugadorActual} ha ganado!`);
                juegoTerminado=true;
            }else{
                jugadorActual = jugadorActual=== 'X' ? 'O' : 'X'
            }
        }else{
            console.log("Movimiento invalido, intenta de nuevo");
            
        }
    }
}
//Iniciar juego
jugar();