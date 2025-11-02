//Encuentra el primer numero divisible por 9 despues de 50
let numero=50;
let contador=0;
do {
    if (numero%9===0) {//Solo se aumentara a contador si se cumple la condicion.
        contador++;
    }
    numero++;
} while (contador<1);//Cuando no se cumpla la condicion, finaliza
console.log(numero+" Es el primer numero divisible por 9 despues de 50");
