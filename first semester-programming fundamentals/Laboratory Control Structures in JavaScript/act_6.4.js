//Actividad 4
let dia= prompt('Ingrese el dia de nacimiento ejemplo:"12"');
let mes1= prompt('Ingrese su mes de nacimiento ejemplo: "enero"');
//Convertimos a minusculas para hacer facil la comparacion
let mes=mes1.toLocaleLowerCase();

if (mes==='marzo' && dia>=21 || mes==='abril'&& dia<=20) {
    console.log("Tu signo es Aries");
    
}else if (mes==='abril' && dia>=21 || mes==='mayo'&& dia<=20) {
    console.log("Tu signo es Tauro");
 
    
}else if (mes==='mayo' && dia>=21 || mes==='junio'&& dia<=20) {
    console.log("Tu signo es Géminis");
    
}else if (mes==='junio' && dia>=21 || mes==='julio' && dia<=21) {
   console.log("Tu signo es Cáncer");
       
}else if (mes==='julio' && dia>=22 || mes==='agosto'&& dia<=22) {
    console.log("Tu signo es Leo");
    
}else if (mes==='agosto' && dia>=23 || mes==='septiembre'&& dia<=22) {
    console.log("Tu signo es Virgo");
    
}else if (mes==='septiembre' && dia>=23 || mes==='octubre'&& dia<=22) {
    console.log("Tu signo es libra");
      
}else if (mes==='octubre' && dia>=23 || mes==='noviembre'&& dia<=22) {
    console.log("Tu signo es Escorpion");
    
}else if (mes==='noviembre' && dia>=23 || mes==='diciembre'&& dia<=21) {
    console.log("Tu signo es Sagitario");
    
}else if (mes==='diciembre' && dia>=22 || mes==='enero'&& dia<=19) {
    console.log("Tu signo es Capricornio");
    
}else if (mes==='enero' && dia>=20 || mes==='febrero'&& dia<=19) {
    console.log("Tu signo es Acuario");
    
}else if (mes==='febrero' && dia>=20 || mes==='marzo'&& dia<=20) {
    console.log("Tu signo es Piscis");
    
} else{
    console.log("Mes invalido");
    
}