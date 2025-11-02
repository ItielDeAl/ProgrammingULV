/*
class Empleado {
    constructor(nombre, puesto) {
        this.nombre = nombre;
        this.puesto = puesto;
    }

    mostrarInfo() {
        console.log(`Empleado: ${this.nombre}, Puesto: ${this.puesto}`);
    }
}

class Gerente {
    constructor(nombre) {
        this.nombre = nombre;
        this.empleados = []; // Composición
    }

    agregarEmpleado(empleado) {
        this.empleados.push(empleado);
    }

    mostrarEmpleados() {
        console.log(`Gerente: ${this.nombre}`);
        this.empleados.forEach(empleado => empleado.mostrarInfo());
    }
}

// Uso
const empleado1 = new Empleado('Juan', 'Desarrollador');
const empleado2 = new Empleado('Ana', 'Diseñadora');
const gerente = new Gerente('Carlos');

gerente.agregarEmpleado(empleado1);
gerente.agregarEmpleado(empleado2);
gerente.mostrarEmpleados();
*/

/*
class Proyecto {
    constructor(nombre) {
        this.nombre = nombre;
        this.tareas = []; // Composición
    }

    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    mostrarTareas() {
        console.log(`Proyecto: ${this.nombre}`);
        this.tareas.forEach(tarea => console.log(`- Tarea: ${tarea}`));
    }
}

class GerenteDeProyecto {
    constructor(nombre) {
        this.nombre = nombre;
        this.proyectos = []; // Composición
    }

    agregarProyecto(proyecto) {
        this.proyectos.push(proyecto);
    }

    mostrarProyectos() {
        console.log(`Gerente de Proyecto: ${this.nombre}`);
        this.proyectos.forEach(proyecto => proyecto.mostrarTareas());
    }
}

// Uso
const proyecto1 = new Proyecto('Desarrollo Web');
proyecto1.agregarTarea('Implementar Frontend');
proyecto1.agregarTarea('Implementar Backend');

const gerenteProyecto = new GerenteDeProyecto('Laura');
gerenteProyecto.agregarProyecto(proyecto1);
gerenteProyecto.mostrarProyectos();
*/
class Recurso {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
    }

    mostrarInfo() {
        console.log(`Recurso: ${this.nombre}, Tipo: ${this.tipo}`);
    }
}

class GerenteDeRecursos {
    constructor(nombre) {
        this.nombre = nombre;
        this.recursos = []; // Composición
    }

    agregarRecurso(recurso) {
        this.recursos.push(recurso);
    }

    mostrarRecursos() {
        console.log(`Gerente de Recursos: ${this.nombre}`);
        this.recursos.forEach(recurso => recurso.mostrarInfo());
    }
}

// Uso
const recurso1 = new Recurso('Laptop', 'Tecnológico');
const recurso2 = new Recurso('Silla', 'Mobiliario');

const gerenteRecursos = new GerenteDeRecursos('Miguel');
gerenteRecursos.agregarRecurso(recurso1);
gerenteRecursos.agregarRecurso(recurso2);
gerenteRecursos.mostrarRecursos();
