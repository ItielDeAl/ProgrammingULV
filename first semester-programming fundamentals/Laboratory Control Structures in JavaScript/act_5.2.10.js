//Encuentra el primer numero divisible por 7 despues de 100
let i=100;
let contador=0;
//El tope sera cuando contador logre encontrar el primer numero.
while (i>=100 && contador<1) {
    if (i%7===0) {
    console.log(i+" Es el primer primer numero divisible por 7 despues de 100");   
    contador++;    
}
    i++;
}
