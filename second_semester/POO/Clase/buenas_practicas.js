
let espacios = ["==Espacios=="];
let nombres = ["==Nombres=="];
let pisos = ["==Pisos=="];

class Edificio{
    constructor(nombre, pisos, espacios){
        this.nombre=nombre;
        this.pisos=pisos;
        this.espacios=espacios;
    }
    consultarEspacios(){
        return`Los espacios disponibles en el edificio ${this.nombre} son: ${this.espacios*this.pisos} espacios.`;        
    }
    consultarNombresEdificios(){
        return`Edificio ${this.nombre}`;        
    }
    consultarPisosEdificios(){
        return`El edificio ${this.nombre} es de ${this.pisos} pisos`
    }
}
let continuar = true;
while (continuar) {
    
    let opcion = prompt(`Ingrese el numero de el movimiento deseado:\n 1. Agregar edificios \n ===Consultas===\n 2. Espacios disponibles \n 3. Nombres de los edificios\n 4. Pisos de los edificios\n 5. salir`)  
    
    switch (opcion) {
        case '1':
            let cantidad_edificios = prompt("Ingrese la cantidad de edificios anexar")
            for (let i = 1; i <= cantidad_edificios; i++) {
                const edificio_nuevo= new Edificio(prompt(`Ingrese el nombre del edificio ${i}`),prompt(`Ingrese los pisos del edificio ${i}`),prompt("Ingrese espacios por piso"))
                espacios.push(edificio_nuevo.consultarEspacios());
                nombres.push(edificio_nuevo.consultarNombresEdificios());
                pisos.push(edificio_nuevo.consultarPisosEdificios());
            }
            alert("Agregado Exitosamente");     
            break;
        
        case '2':
            espacios.forEach(list_espacios => {
                console.log(list_espacios);});
            break;
        
        case'3':
            nombres.forEach(list_nombre => {
                console.log(list_nombre);});
            break;
        case '4':
            pisos.forEach(list_piso => {
                console.log(list_piso);});
            break;
        case '5':
            continuar = false;
            alert("Movimientos terminados");
            break;

            default:
            alert('Accion invalida, Ingrese nueva accion')
            break;
    } 
    }
