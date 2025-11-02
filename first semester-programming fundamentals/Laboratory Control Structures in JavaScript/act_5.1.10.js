//Cuenta cuantos numeros entre 1 y 100 son divisibles por 3

let contador = 0;//Iniciamos la cantidad de numeros en 0
for (let i = 3; i <=100; i++) {
   if (i%3===0) {//Si se cumple esta condicion aumentamos 1 al contador
    contador++;
   }   
}
console.log("Existen "+contador+" Numeros divisibles por 3 entre el 1 y 100");


    