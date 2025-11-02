let continuar= true;
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
while (continuar) {
let operacion = prompt("Ingrese la acción a realizar:   1=convertir binario a decimal \n2= decimal a binario \n3=suma de binarios \n4=resta de binarios \n5=multiplicacion de binarios \n6=division de binarios \n7= terminar  ")    
    switch (operacion) {
        //Binario a decimal
        case '1': 
            let conversionB = prompt('ingrese su numero binario');
            let resultado1= binarioDecimal(conversionB);
            alert(conversionB+' El numero en decimal es '+resultado1);
                    
            break;
        //Decimal a binario
        case '2':
            let conversionD = prompt('Ingresa el numero decimal');
            let resultado2 = decimalBinario(conversionD);
            alert(conversionD+' El numero en binario es '+resultado2);
            break;
        //Suma 
        case '3':
            let binarioS1 = prompt("Ingresa el binario 1");
            let binarioS2 = prompt("Ingresa el binario 2"); 
            let sumando1 = binarioDecimal(binarioS1);
            let sumando2 = binarioDecimal(binarioS2);
            let resultado3 = sumando1+sumando2;
            let resutadoBinarioS = decimalBinario(resultado3);
            alert('El resultado de la suma es '+ resutadoBinarioS);
            break;
        //Resta
        case '4':
            let binario1 = prompt("Ingresa el binario 1");
            let binario2 = prompt("Ingresa el binario 2"); 
    
            let minuendo = binarioDecimal(binario1);
            let sustraendo = binarioDecimal(binario2);
            let resultado = minuendo-sustraendo;
            if (resultado<0) {
            let positivo = resultado*-1;
            let resutadoBinario = decimalBinario(positivo);
            alert("-"+resutadoBinario);
            }else{
            let resutadoBinario = decimalBinario(resultado);
            alert(resutadoBinario);
            }
                        
            break;
        //Multiplicacion
        case '5':
            let binarioM1 = prompt("Ingresa el binario 1");
            let binarioM2 = prompt("Ingresa el binario 2"); 
            let multiplicando = binarioDecimal(binarioM1);
            let Multiplicador = binarioDecimal(binarioM2);
            let resultado5 = multiplicando*Multiplicador;
            let resutadoBinarioM = decimalBinario(resultado5);
            alert('El resulado de la multiplicacion es '+ resutadoBinarioM);
            break;
        //Division
        case '6':
            let dividendo = prompt("Introduce el dividendo");
            let divisor = prompt("Introduce el divisor:");
            let numero1 = binarioDecimal(dividendo);
            let numero2= binarioDecimal(divisor);
            if (numero2 === 0) {
              alert("No se puede dividir entre cero");
            } else {
              let cociente = Math.floor(numero1 / numero2);  
              let residuo = numero1 % numero2; 
              let cocienteD = decimalBinario(cociente);
              let residuoD = decimalBinario(residuo);
              alert("EL cociente es: " + cocienteD);
              alert("EL Residuo es: " + residuoD);
            }
            break;
        //Salir
            case '7':
            continuar = false;
            alert("Movimientos terminados");
            break;
        default:
            alert('Accion invalida, Ingrese nueva accion')
            break;
    }
}