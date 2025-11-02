/*
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }
    
    presentarse() {
        console.log(`Hola, me llamo ${this.nombre}`);
    }
}

class Alumno extends Persona {
    constructor(nombre, curso) {
        super(nombre);
        this.curso = curso;
    }

    presentarse() {
        super.presentarse();
        console.log(`Estoy en el curso de ${this.curso}`);
    }
}

const alumno1 = new Alumno("Juan", "Programacion");
alumno1.presentarse();
*/

let contador = prompt("Ingresa Espacios disponibles")
let espacios = [];

class Persona {
    constructor(nombre,edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    mostrarInformacion() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}`;
    }
}

class Alumno extends Persona {
    constructor(nombre, edad, curso) {
        super(nombre, edad);
        this.curso = curso;
    }
    mostrarInformacion() {
        return `${super.mostrarInformacion()}, Curso: ${this.curso}`;
    }
}
for (let i = 0; i < contador; i++){
    const alumno1 = new Alumno(prompt("Ingresa tu nombre"),prompt("Ingresa tu edad"), prompt("Ingresa tu curso"));    
    espacios.push(alumno1.mostrarInformacion());
}

alert("Sin espacios");

console.log("Alumnos Ingresados");
espacios.forEach(alumno => {
    console.log(alumno);
});