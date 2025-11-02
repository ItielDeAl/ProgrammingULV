//Actividad 6
let continuar=true;
let dinero=0;

while (continuar) {
    let actividad = prompt("Seleccione el numero de la accion a realizar 1=consultar saldo, 2=Depositar, 3=Retirar dinero, 4=donar a becalos, 5=terminar");
    

switch (actividad) {
    case '1':
        alert("Su saldo es $"+dinero);
        
        break;
    case '2':
        let deposito=parseFloat(prompt("Ingrese la cantidad a depositar $"));
        if (deposito>0) {
            dinero+=deposito;
            alert("Se ha depositado $"+deposito+" Su saldo es $"+dinero);
            
        }else{
            alert("Cantidad invalida, intente de nuevo")
        }
        
        break;

    case '3':
        let retiro=parseFloat(prompt("Ingrese la cantidad a retirar $"));
        if (retiro>0 && retiro<=dinero) {
            dinero-=retiro;
            alert("Se ha retirado $"+retiro+" Su saldo es $"+dinero);
            
        }else{
            alert("Cantidad invalida o saldo insuficiente, intente de nuevo")
        }
        break;

    case '4':
        let donacion=parseFloat(prompt("Ingrese la cantidad a donar $"));
        if (donacion>0 && donacion<=dinero) {
            dinero-=donacion;
            alert("Se ha retirado $"+donado+" Su saldo es $"+dinero);
            
        }else{
            alert("Cantidad invalida o saldo insuficiente, intente de nuevo")
        }    
        break;
        case '5':
            continuar=false;
            alert("Gracias por usas BanCoUlV")
        break;       


    default:
console.log("Accion invalida, selecione una valida");
    break;
}
}