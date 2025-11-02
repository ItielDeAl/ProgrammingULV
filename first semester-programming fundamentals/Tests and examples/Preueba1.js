//
let cadena1=prompt("Ingresa palabra");
let cadena=cadena1.toLocaleLowerCase();
let contador=0;
let letra=0
let cant=cadena1.length;

for (letra; letra <= cant; letra++) {
    let cadena2=cadena.charAt(letra);
    if (cadena2==='a'||cadena2==='e'||cadena2==='i'||cadena2==='o'||cadena2==='u') {
        contador++
    }
}
console.log("La palabra "+cadena1+" tiene "+contador+" Vocales");
