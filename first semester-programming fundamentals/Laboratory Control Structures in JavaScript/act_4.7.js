//Verifica la estación del año apartir de un mes
let mes1 = prompt("Ingresa el mes");
let mes = mes1.toLocaleLowerCase();

let dia = prompt("Ingrese el día")

switch (true) {//SoLo sera true, cuando los datos ingresados sean verdaderos ya se mes y dia, o solo el mes
    case (mes=== 'marzo' && dia>=21 || mes==='abril'|| mes==='mayo' || mes==='junio' && dia<=20):
        console.log("En la fecha: " +dia +" de " +mes1 +" La estación es Otoño");
        break;
    case (mes=== 'junio' && dia>=21 || mes==='julio'|| mes==='agosto' || mes==='septiembre' && dia<=20):
        console.log("En la fecha: " +dia+ " de " +mes1+ " La estación es Invierno");
        break;
    case (mes=== 'septiembre' && dia>=21 || mes==='octubre'|| mes==='noviembre' || mes==='diciembre' && dia<=20):
        console.log("En la fecha: " +dia+ " de " +mes1+ " La estación es Primavera");
        break;
    case (mes==='diciembre' && dia>=21 || mes==='enero'|| mes==='febrero' || mes==='marzo' && dia<=20):
        console.log("En la fecha: " +dia+ " de " +mes1+ ", La estación es Verano");
        break;
    default:
        console.log("Datos invalido");
        break;
}