let binario1 = prompt("Ingresa el binario 1");
let binario2 = prompt("Ingresa el binario 2"); 


function binarioDecimal(bn){
//Conversion de binario a decimal
//let bn = prompt("Ingresa el numero binario"); // Numero en binario
let bnar = bn.split(''); //areglo del numero binario
let e = bnar.length; // Longitud del num binario
let n = 0; // Posicion del digito
let d = 0; // Valor en decimal

//Condicion para saber si lo ingresado por el usuario es valido.
//se busca si el arreglo contiene los digitos 1 o 0 que son los validos.
if (bnar.some(digito => digito !== '0' && digito !== '1')){
    //si no es un binario, se manda un mesaje que se ingrese un numero valido.
    console.log("Ingresa un número binario válido (solo 0 y 1).");
}else{
    //mientras la posicion es menor a la longitud del array
    while(n<e){
        //se recorre cada digito de derecha a izquierda
        let ud = parseInt(bnar[e - 1 - n]);
        //al ultimo digito se multiplica por 2 a la posicion
        d = d + (ud*2**n)
        //se incrementa la posicion del digito
        n++
    }
    //se muestra el resultado
    return d;  
}
}
function decimalBinario(dc){
//Definimos una variable vacía en donde se estará agregando unos y ceros.
let Bin = '';
//Hacemos una condición en donde si el número ingresado es cero, la consola mostrará un 0.
if(dc <= 0){
    console.log("El número en binario convertido es: 0");
//Hacemos otra condición si no cumple con la primera.
}else{
    //Mientras el número ingresado sea mayor a cero,
    while (dc > 0) {
        /*Se ejecutará una operación en donde se sacará el modulo 2 del número ingresado y se le agregará 
        la variable de la cadena a la que se le estarán agregando los números, y esto se guardará en la misma variable.*/
        Bin = (dc % 2) + Bin;
        /*Hacemos una operación/función en donde el resultado del modulo se le hará un redondeo al número 
        hacia abajo hasta el múltiplo entero más cercano. Esto se hace para seguir la lógica de conversiones binarias.*/
        dc = Math.floor(dc / 2);
    }
    //La consola va a mostrar los números de la conversión realizada.
    return Bin;
}
}

let minuendo = binarioDecimal(binario1);
let sustraendo = binarioDecimal(binario2);
let resultado = minuendo-sustraendo;
if (resultado<0) {
    let positivo = resultado*-1;
    let resutadoBinario = decimalBinario(positivo);
    console.log("-"+resutadoBinario);
}else{
    let resutadoBinario = decimalBinario(resultado);
    console.log(resutadoBinario);
}


