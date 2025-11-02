//Cuenta cuantos numeros entre 1 y 30 son divisibles por 3
let i=3;
let contador=0;

do {
    if (i%3===0) {//Solo se aumentara a contador si se cumple la condicion
        contador++;
    }
    i++;
} while (i<=30);//Cuando no se cumpla la condicion, finaliza
console.log("Existen "+contador+ " numeros divisibles por 3 entre el 1 y 30" );
