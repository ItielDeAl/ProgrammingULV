class Persona { //nombre
    constructor(nombre, edad) { //Atributos
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        return `Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`;
    }
}
// Uso de la clase
const persona1 = new Persona("Juan", 30);
console.log(persona1.saludar()); 