//Examen Hugo
//definimos clase 
class Animal{ 
    constructor(salvaje, agresivo){
    this.salvaje = salvaje;
    this.agresivo = agresivo;
//definimos metodo
saludar(){
 retur`El ${this.salvaje} es un animal ${this.agresivo}`;
}
}
//instanciacion
const animal1 = new Animal("Leon","peligroso");
Console.log(animal1.saludar());
