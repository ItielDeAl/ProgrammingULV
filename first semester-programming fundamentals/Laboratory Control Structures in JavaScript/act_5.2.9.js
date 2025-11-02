//Cuenta cuantos numeros entre 1 y 50 son divisibles por 5
let i=5;
let contador=0;

while (i<=50) {
    if (i%5===0) {
        contador++;
    }
    i++;
}console.log("Existen "+contador+" numeros divisibles por 5 entre el 1 y 50");
