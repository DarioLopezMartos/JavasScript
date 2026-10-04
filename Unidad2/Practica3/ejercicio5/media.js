let suma = 0;
let cantidad = 0;
let numero;

do {
    numero = Number(prompt("Introduce un número:"));
    if (numero >= 0) {
        suma = suma + numero;
        cantidad++;
    }
} while (numero >= 0);
let media = suma / cantidad;

console.log("Suma: " + suma);
console.log("Media: " + media);