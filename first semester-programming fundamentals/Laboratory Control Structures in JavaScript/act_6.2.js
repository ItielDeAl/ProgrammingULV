//Actividad 2
let monto=prompt("Ingresa el total a pagar");
let cliente=prompt("Ingresa que tipo de cliente eres: normal, VIP, miembro");
let cliente1=cliente.toLocaleLowerCase();

let monto1=monto-(monto/100*10);//Definimos descuentos para cliente VIP
let monto2=monto-(monto/100*20);//definimos descuentos para cliente miembro
switch (true) {
    case (cliente1==='normal'):
        console.log("Su total a pagar es $"+monto);
        break;
    case (cliente1==='vip'):
            console.log("Su total a pagar es $"+monto1+" Se aplico el 10% de descuento");
        break;
        case (cliente1==='miembro'):
            console.log("Su total a pagar es $"+monto2+" Se aplico el 20% de descuento");
        break;
    default:
        console.log("Dato invalido");
        
        break;
}