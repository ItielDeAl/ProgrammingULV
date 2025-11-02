//Ejemplo de clase abstracta.
class Forma{
    constructor(){
        //Verificacion para que no se pueda instanciar directamente
        if(this.constructor === Forma){
            throw new Error("No se puede instanciar una clase abstracta");
        }
    }
    //Este metodo debe ser implementado por cualquier subclase, si no se lanzara un error
    area(){
        throw new Error("El metodo abstracto 'area' debe ser implementado")
    }
}

class Cuadrado extends Forma{
    constructor(lado){
        super();
        this.lado = lado;
    }
    area(){
        console.log(`El area del cuadrado es ${this.lado * this.lado}`);
    }
}

class Circulo extends Forma{
    constructor(radio){
        super();
        this.radio = radio;
    }
    area(){
        console.log(`El area del circulo es ${Math.PI*(this.radio**2)}`);        
    }
}

const forma1 = new Cuadrado(prompt("Ingresa el valor del lado del cuadrado"))
const forma2 = new Circulo(prompt("Ingresa el valor del radio"))
forma1.area();
forma2.area();