class NodoAVL {
  constructor(valor) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
    this.altura = 1; // Altura inicial
  }
}

module.exports = NodoAVL;
