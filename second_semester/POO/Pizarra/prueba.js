//creacion del metodo
class Zapato{
    constructor(talla){
        this.talla = talla;
    }
   //definimos el metodo
    mostrar_talla(){
        return `El zapato es número ${this.talla}`;

    }
}
//creacion del objeto
const zapato1 = new Zapato(25);
//ejecucion del metodo
console.log(zapato1.mostrar_talla());