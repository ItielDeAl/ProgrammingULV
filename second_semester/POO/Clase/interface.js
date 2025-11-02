//Ejemplo de interfas

//definimos el objeto ue simula la interfaz
const FormaInterfas = {
    area: function(){
        throw new Error("El metodo 'area' debe de ser implementado");
    },//
    perimetro: function(){
        throw new Error("El metodo 'perimetro' debe ser implementado");
    }

};
//Clases que implementaran la interfas::::::::::::::
class Cuadrado{
    constructor(lado){
        this.lado = lado;
        this.interface = FormaInterfas; //Copia la interfaz
    }
    area(){
        console.log(`El area del cuadrado es: ${this.lado**2}`);
    }
    perimetro(){
        console.log(`El perimetro del cuadro es ${this.lado*4}`);
    }
}
class Circulo{
    constructor(radio){
        this.radio = radio;
        this.interface = FormaInterfas;
    }
    area(){
        console.log(`El area el circulo es ${Math.PI*(this.radio**2)}`);        
    }
    perimetro(){
        console.log(`El perimetro del circulo es ${2*Math.PI*this.radio}`);
    }
}
const forma1 = new Cuadrado(prompt("Ingresa El lado del cuadrado"))
const forma2 = new Circulo(prompt("Ingresa el radio del circulo"))

forma1.area();
forma1.perimetro();
forma2.area();
forma2.perimetro();