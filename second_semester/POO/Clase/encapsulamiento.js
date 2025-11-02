
class CuentaBancaria {
    constructor(saldoInicial) {
        let saldo = saldoInicial; // saldo es privado

        this.obtenerSaldo = function() {
            return saldo; // método público para acceder al saldo
        };

        this.depositar = function(monto) {
            if (monto > 0) {
                saldo += monto; // permite modificar el saldo
            }
        };

        this.retirar = function(monto) {
            if (monto > 0 && monto <= saldo) {
                saldo -= monto; // permite modificar el saldo
            }
        };
    }
}

// Uso de la clase
const cuenta = new CuentaBancaria(prompt("Ingresa cantidad a depositar"));
console.log(cuenta.obtenerSaldo());
cuenta.retirar(prompt("Ingresa cantidad a retirar"));
console.log(cuenta.obtenerSaldo());