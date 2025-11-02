
class Time {
    #costo;
    
    constructor(costo, hora, minutos) {
        this.hora = hora;
        this.minutos = minutos;
        this.costo = costo;
    }
    tiempoTrabajado() {
        return `El tiempo trabajado es ${this.hora} hora(s) con ${this.minutos} minuto(s)`;
    }
    // Getter para acceder a la propiedad privada
    get costo() {
        return this.#costo; // Retornar el costo
    }
    // Setter para modificar la propiedad privada con validación
    set costo(nuevoCosto) {
        if (nuevoCosto > 0) {
            this.#costo = nuevoCosto;
        } else {
            alert("Error en la cantidad");
        }
    }

}
class CostoHora extends Time {
    constructor(hora, minutos, costo) {
        super(hora, minutos, costo);
    }
    mostrarCosto() {
        return `El costo por hora es de $ ${this.costo} pesos`;
    }
    costoCalculado() {
        return `El pago total es $ ${(this.costo * this.hora) + (this.costo * (this.minutos / 60))}`;
    }
}
class Trabajador extends CostoHora {
    constructor(hora, minutos, costo, nombre) {
        super(hora, minutos, costo);
        this.nombre = nombre;
    }
    mostrarPago() {
        return `${this.nombre}\n ${super.tiempoTrabajado()}\n ${super.costoCalculado()}`;
    }
}

const trabajador1 = new Trabajador(prompt("Ingrese horas trabajadas"), prompt("Ingrese minutos trabajados"), prompt("Ingrese costo por hora en pesos $"), prompt("Ingrese nombre de trabajador"));
console.log(trabajador1.mostrarPago());
console.log(trabajador1.mostrarCosto());