/*
//Clase 1.

class Boletos{
    constructor(lugar){
        this.lugar = lugar;        
    }
    mostrarlugar(){
        return `El lugar es ${this.lugar}`;
    }
}
class Costo extends Boletos{
    constructor(lugar,costo){
        super(lugar);
        this.costo = costo;
    }
    mostrarInformación(){
        return `${super.mostrarlugar()}, El costo es ${this.costo}`;
    }
}
let cant_boletos = prompt("Ingrese cantidad de tipos de boletos");
let lista = [];

for (let i = 1;i<=cant_boletos;i++) {
    const ticket = new Costo(prompt(`Ingrese lugar ${i}`),prompt(`Ingrese costo ${i}`));    
    lista.push(ticket.mostrarInformación());
}
lista.forEach(tickets => {
    console.log(tickets);
});

//Clase 2

class Time{
    constructor(hora,minutos){
        this.hora = hora;
        this.minutos = minutos;
    }
    tiempoTrabajado(){
        return `El tiempo trabajado es ${this.hora} hora(s) con ${this.minutos} minuto(s)`;
    }
}
class CostoHora extends Time{
    constructor(hora,minutos,costo){
        super(hora,minutos);
        this.costo = costo;
    }
    mostrarCosto(){
        return `El costo por hora es de $ ${this.costo} pesos`;
    }
    costoCalculado(){
        return `El pago total es $ ${(this.costo*this.hora)+(this.costo*(this.minutos/60))}`;
    }
} 
class Trabajador extends CostoHora{
    constructor(hora,minutos,costo,nombre){
        super(hora,minutos,costo);
        this.nombre = nombre;
    }
    mostrarPago(){
        return `${this.nombre}\n ${super.tiempoTrabajado()}\n ${super.costoCalculado()}`;
        }
}

const trabajador1 = new Trabajador(prompt("Ingrese horas trabajadas"),prompt("Ingrese minutos trabajados"),prompt("Ingrese costo por hora en pesos $"),prompt("Ingrese nombre de trabajador"));
console.log(trabajador1.mostrarPago());
console.log(trabajador1.mostrarCosto());


*/

//En proceso,no imprime la mitad.
// Clase 3


class Comida{
    constructor(cantidad,costo){
        this.cantidad = cantidad;
        this.costo =costo;
    }
    
} 
class Vegetariana extends Comida{
   constructor(nombre, cantidad, costo){
       super(cantidad, costo);
       this.nombre = nombre;
    } 
   mostrarVeg(){
    return`${this.nombre} = ${super.cantidad}`
   }
   mostrarcostoVeg(){
    return `${this.nombre} = ${super.costo} por c/u`
   }
}

class Omnivoros extends Comida{
    constructor(nombreo, cantidad, costo){
        super(cantidad, costo);
        this.nombreo = nombreo;
    } 
    mostrarOmn(){
        return`${this.nombreo} = ${super.cantidad}`
    }
    mostrarcostoOmn(){
        return `${this.nombreo} = ${super.costo} por c/u`
    }
}
let continuar = true;

while (continuar) {
let operacion = prompt("Menu sin inventarios, agregar comidas \n Vegetariana = 1 \n Omnivora = 2 \n Salir = 3")

switch (operacion) {
    case '1':
        let espacios= prompt("Ingresa la cantidad de platillos")
            console.log("Vegetariano");
            
            for (let i = 1; i <= espacios ; i++) {
                const platillo = new Vegetariana(prompt("Ingresa el nombre del platillo Vegetariano"), String(prompt("Ingresa la cantidad disponible")), String(prompt("Ingresa el costo")));
               console.log(platillo.mostrarVeg(), platillo.mostrarcostoVeg());
            }

            break;  

            case '2':
            let espacios2= prompt("Ingresa la cantidad de platillos")
            console.log("Omnivoro");
            for (let i = 1; i <= espacios2; i++) {
                const platillo1 = new Omnivoros(prompt("Ingresa el nombre del platillo Omnivoro"), String(prompt("Ingresa la cantidad disponible")), String(prompt("Ingresa el costo")));
                console.log(platillo1.mostrarOmn()  , platillo1.mostrarcostoOmn());
            }
        
            break;

        case '3':
            continuar = false;
            alert("Movimientos terminados");
            break;

            default:
            alert('Accion invalida, Ingrese nueva accion')
            break;
    }

}